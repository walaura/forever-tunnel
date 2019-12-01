require("dotenv").config();

const postEndpoint = require("./aws/save");
const read = require("./aws/read");

const main = async (port = 80) => {
  const localtunnel = require("localtunnel");
  console.log("Handshake... " + port);
  const { url } = await localtunnel({ port });
  console.log("Tunnel set up, waiting for aws");
  console.log(url);
  await postEndpoint({ url, port });
  console.log("done, dont close me!!");
};

module.exports = { main, read };
