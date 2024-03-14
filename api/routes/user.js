var express = require("express");
var functions = require("../scripts/functions");
var router = express.Router();

/* GET users listing. */
router.get("/", async function(req, res) {
  try {
    const decoded = await functions.decodeToken(req.headers.authorization); //checks validity of token (throws error if not valid)
    const userId = functions.hashString(
      JSON.stringify({
        username: decoded.username,
        password: decoded.password
      })
    );

    const data = await functions.query("mychannel", "eKYC", ["getData", userId]);
    res.json(data);
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.sendStatus(400);
  }
});

router.post("/", async function(req, res) {
  try {
    const decoded = await functions.decodeToken(req.headers.authorization); //checks validity of token (throws error if not valid)
    const userId = functions.hashString(
      JSON.stringify({
        username: decoded.username,
        password: decoded.password
      })
    );
    //future: add data checks

    await functions.invoke("mychannel", "eKYC", ["inputData", userId, JSON.stringify(req.body)]);
    res.sendStatus(200);
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.sendStatus(400);
  }
});

module.exports = router;
