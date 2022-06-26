module.exports = (sequelize, Sequelize) => {
    const MilerCoin = sequelize.define("miler_coin", {
      name: {
        type: Sequelize.STRING
      },
      blockchain: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      difficulty:{
        type: Sequelize.INTEGER
      }
    });
    return MilerCoin;
  };