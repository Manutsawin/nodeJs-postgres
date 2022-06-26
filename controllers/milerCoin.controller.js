const db = require("../models");
const milerCoin = db.milerCoin;
const Op = db.Sequelize.Op;
const sha256 = require('crypto-js/sha256.js');
const { Sequelize } = require("../models");

class Block {
    constructor(
        index,
        timestamp,
        transaction,
        precedingHash = ''
    ) {
        this.index = index;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    }
  
    computeHash() {
        return sha256(
            this.index +
            this.precedingHash + 
            this.timestamp + 
            JSON.stringify(this.transaction)
        ).toString();
    }
}
  
class BlockChain {
    constructor() {
        this.id = '';
        this.name = '';
        this.blockchain = '';
        this.difficulty = '';
    }
  
    create(id, name, genesis) {
        const block = {
            name : name,
            blockchain : [this.startGenesisblock(genesis)],
            difficulty : 4
        };
        milerCoin.create(block)  
    }
  
    startGenesisblock(genesis) {
        return new Block(
            0,
            genesis.date,
            genesis.transaction,
            "0"
        );
    }
  
    obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
  
    addNewBlock(newBlock) {
       
    }
  
    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];
  
            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }
  
            if (currentBlock.precedingHash !== precedingBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
  
const GlobalChain = new BlockChain();

class MilerCoin {
    constructor() {
        this.chain = [];
    }
  
    validateNewChain (req, res, next){
        if (req.body) {
            if (req.body.id &&
                req.body.name &&
                req.body.genesis &&
                req.body.genesis.date &&
                req.body.genesis.transaction
                ) {
                next();
            } else {
                res.status(400).json({ message: 'Request format is not correct!'});
            }
        } else {
            res.status(400).json({ message: 'Request format is not correct!'});
        }
    }
  
    createNewChain (req, res) {
        const block = GlobalChain.create(
            req.body.id,
            req.body.name,
            req.body.genesis,
        )
        res.status(200).json({ message: 'Chain created!', data: GlobalChain });
    }
  
    appendNewChild  (req, res){
        const block = new Block(
            2,
            req.body.timestamp,
            req.body.transaction
        )
        GlobalChain.addNewBlock(block);
        res.status(200).json({ message: 'Block added!'});
    }
  
    getChain (req, res) {
        res.status(200).json({ chain: GlobalChain });
    }
}

module.exports = MilerCoin
  