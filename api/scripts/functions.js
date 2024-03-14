var jwt = require("jsonwebtoken");
var crypto = require("crypto");
var env = require("./env");

module.exports.decodeToken = authHeader => {
  const token = authHeader.split(" ").slice(-1)[0];
  return jwt.verify(token, env.jwtKey);
};

//how to use cipher + decipher
//https://gist.github.com/Vitsaus/3798537

module.exports.encodeId = payload => {
  var cipher = crypto.createCipher("aes192", env.idKey);
  let output = cipher.update(JSON.stringify(payload), "utf8", "hex");
  return output + cipher.final("hex");
};

module.exports.decodeId = payload => {
  var decipher = crypto.createDecipher("aes192", env.idKey);
  let output = decipher.update(payload, "hex", "ascii");
  return output + decipher.final("ascii");
};

module.exports.hashString = payload => {
  var shasum = crypto.createHash("sha1");
  shasum.update(payload, "utf8");
  return shasum.digest("hex");
};

module.exports.query = async (channelName, contractName, inputs) => {
  const { FileSystemWallet, Gateway } = require("fabric-network"); //Creates a new gateway and use it to connect to the network
  const path = require("path");

  const ccpPath = path.resolve(
    __dirname,
    "..",
    "config",
    "connection-org1.json"
  );

  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = new FileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the user.
  const userExists = await wallet.exists("user1");
  if (!userExists) {
    console.log(
      'An identity for the user "user1" does not exist in the wallet'
    );
    console.log("Run the registerUser.js application before retrying");
    return;
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  // use the identity of user1 from wallet to connect
  await gateway.connect(ccpPath, {
    wallet,
    identity: "user1",
    discovery: { enabled: true, asLocalhost: true }
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork(channelName);

  // Get the contract from the network.
  const contract = network.getContract(contractName);

  // Evaluate the specified transaction.
  // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
  // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
  const result = await contract.evaluateTransaction(...inputs);
  return JSON.parse(result.toString());
};

module.exports.invoke = async (channelName, contractName, inputs) => {
  const { FileSystemWallet, Gateway } = require("fabric-network");
  const path = require("path");

  const ccpPath = path.resolve(
    __dirname,
    "..",
    "config",
    "connection-org1.json"
  );

  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = new FileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the user.
  const userExists = await wallet.exists("user1");
  if (!userExists) {
    console.log(
      'An identity for the user "user1" does not exist in the wallet'
    );
    console.log("Run the registerUser.js application before retrying");
    return;
  }

  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccpPath, {
    wallet,
    identity: "user1",
    discovery: { enabled: true, asLocalhost: true }
  });

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork(channelName);

  // Get the contract from the network.
  const contract = network.getContract(contractName);

  // Submit the specified transaction.
  await contract.submitTransaction(...inputs);
  console.log("Transaction has been submitted");

  // Disconnect from the gateway.
  await gateway.disconnect();
};
