const  express = require("express");
const  router = express.Router();
const tutorials = require("./controllers/tutorial.controller.js");
const { verifySignUp } = require("./middleware");
const controller = require("./controllers/auth.controller");
const milerCoin =  require("./controllers/milerCoin.controller");



//Authen------->

router.post(
  "/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
  ],
  controller.signup
);

router.post("/auth/signin", controller.signin);

//------->



//Tutorial------->

// Create a new Tutorial
router.post("/tutorials", tutorials.create);

// Retrieve all Tutorials
router.get("/tutorials", tutorials.findAll);

// Retrieve all published Tutorials
router.get("/published", tutorials.findAllPublished);

// Retrieve a single Tutorial with id
router.get("/:id", tutorials.findOne);

// Update a Tutorial with id
router.put("/:id", tutorials.update);

// Delete a Tutorial with id
router.delete("/:id", tutorials.delete);

// Delete all Tutorials
router.delete("/", tutorials.deleteAll);

//------->

const milerCoinController= new milerCoin();
router.post('/blockchain', milerCoinController.validateNewChain, milerCoinController.createNewChain);
router.get('/blockchain', milerCoinController.getChain);
router.post('/blockchain/append', milerCoinController.appendNewChild);

module.exports = router;