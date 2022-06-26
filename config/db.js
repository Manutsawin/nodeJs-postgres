
module.exports = {
    HOST: "localhost",
    USER: "tuser",
    port: 5432,
    PASSWORD: "369361",
    DB: "postgres",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };