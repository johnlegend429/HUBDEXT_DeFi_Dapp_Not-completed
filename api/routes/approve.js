var express = require("express");
var functions = require("../scripts/functions");
var router = express.Router();

/* GET users listing. */
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

    functions.invoke("mychannel", "eKYC", [
      "approveCompany",
      userId,
      req.body.companyId
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.sendStatus(400);
  }

  // res.send('user approved a company');
  // res.json(JSON.parse(result.toString()));
});

router.get("/", async function(req, res) {
  try {
    const decoded = await functions.decodeToken(req.headers.authorization); //checks validity of token (throws error if not valid)
    const userId = functions.hashString(
      JSON.stringify({
        username: decoded.username,
        password: decoded.password
      })
    );

    const relations = await functions.query("mychannel", "eKYC", ["getRelations", userId]);
    const companies = await functions.query("mychannel", "eKYC", ["getCompanies"]);

    const parsedRelations = relations.map(id => {
      // const trimLength = (id.length - 192)/2
      // id = id.length > 192 ? id.slice(trimLength, id.length-trimLength) : id;
      id = id.replace("\'","")
      let decoded = functions.decodeId(id);
      return {username: JSON.parse(decoded).username, id};
    });

    const parsedCompanies = companies.list.map(id => {
      const decoded = functions.decodeId(id);
      return {username: JSON.parse(JSON.parse(decoded)).username, id};
    });

    res.json({ approved: parsedRelations, all: parsedCompanies });
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.sendStatus(400);
  }
  // res.send("user gets list of companies (approved & unapproved)")
});

module.exports = router;
