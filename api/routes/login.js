var express = require("express");
var jwt = require("jsonwebtoken");
var env = require("../scripts/env");
var functions = require("../scripts/functions");
var router = express.Router();

//login end point for getting token
router.post("/", async function(req, res) {
  //check body for only 3 valid parameters
  if (
    Object.keys(req.body).length !== 3 ||
    !req.body.username ||
    !req.body.password ||
    (req.body.type !== "user" && req.body.type !== "company")
  ) {
    return res.sendStatus(400);
  }

  try {
    //hash password for security
    req.body.password = functions.hashString(req.body.password);
    console.log(req.body.password);

    //create token
    const token = await jwt.sign(req.body, env.jwtKey, { expiresIn: "10hr" });

    //if it's a company, save it to the list (create id using encode/decode to be able to get username later)
    if (req.body.type === "company") {
      const companyId = functions.encodeId(
        JSON.stringify({
          username: req.body.username,
          password: req.body.password
        })
      );
      await functions.invoke("mychannel", "eKYC", ["saveCompany", companyId]);
    }
    res.send(token);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/", async function(req, res) {
  try {
    const decoded = await functions.decodeToken(req.headers.authorization); //checks validity of token (throws error if not valid)
    res.send(true);
  } catch (e) {
    console.log(e);
    res.send(false);
  }
});

module.exports = router;
