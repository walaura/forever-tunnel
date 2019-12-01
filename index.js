#!/usr/bin/env node

require("dotenv").config({ path: __dirname + "/.env" });
const localtunnel = require("localtunnel");
const postEndpoint = require("./save.js");

const main = async () => {
  const port = parseInt(process.argv.pop()) || 80;
  console.log("Handshake... " + port);
  const { url } = await localtunnel({ port });
  console.log("Tunnel set up, waiting for aws");
  console.log(url);
  await postEndpoint({ url, port });
  console.log("done, dont close me!!");
};
main();
