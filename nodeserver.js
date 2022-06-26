const express = require('express'); // ติดตั้ง terminal -- npm i express --save
const cors = require("cors");
const { urlencoded } = require('express')
const routers=require('./routes');
const app = express()
const sha256 = require('crypto-js/sha256.js');

app.use(cors());
app.use(express.json(urlencoded({extended:true})))

const db = require("./models");
db.sequelize.sync();



app.listen(process.env.PORT||1000,()=>{
    console.log('Sever started')
})


app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use("/api",routers);





// class MilerCoin {
//   constructor() {
//       this.chain = [];
//   }

//   validateNewChain (req, res, next){
//       if (req.body) {
//           if (req.body.id &&
//               req.body.name &&
//               req.body.genesis &&
//               req.body.genesis.date &&
//               req.body.genesis.transaction
//               ) {
//               next();
//           } else {
//               res.status(400).json({ message: 'Request format is not correct!'});
//           }
//       } else {
//           res.status(400).json({ message: 'Request format is not correct!'});
//       }
//   }

//   createNewChain (req, res) {
//       const block = GlobalChain.create(
//           req.body.id,
//           req.body.name,
//           req.body.genesis,
//       )
//       res.status(200).json({ message: 'Chain created!', data: GlobalChain });
//   }

//   appendNewChild  (req, res){
//       const block = new Block(
//           this.chain.length,
//           req.body.timestamp,
//           req.body.transaction
//       )
//       GlobalChain.addNewBlock(block);
//       res.status(200).json({ message: 'Block added!'});
//   }

//   getChain (req, res) {
//       res.status(200).json({ chain: GlobalChain });
//   }
// }

// const Controller = new MilerCoin();

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Welcome to my blockchain'});
// });
// app.post('/api/blockchain', Controller.validateNewChain, Controller.createNewChain);
// app.get('/api/blockchain', Controller.getChain);
// app.post('/api/blockchain/append', Controller.appendNewChild);

