require("dotenv").config();

const postEndpoint = require("./aws/save");
const read = require("./aws/read");

const main = async ({ port = 80, identifier = port }) => {
  const localtunnel = require("localtunnel");
  console.log("Handshake... ");
  const { url } = await localtunnel({ port });
  console.log("Tunnel set up, waiting for AWS");
  console.log(url);
  await postEndpoint({ url, port, identifier });
  console.log("done, dont close me!!");
};

module.exports = { main, read };
