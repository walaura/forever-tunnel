require("dotenv").config();

const postEndpoint = require("./aws/save");
const read = require("./aws/read");

const main = async ({ port = 80, identifier = port }) => {
  try {
    const localtunnel = require("localtunnel");
    console.log("Handshake... ");
    const { url } = await localtunnel({ port });
    console.log("Tunnel set up, waiting for AWS");
    console.log(url);
    await postEndpoint({ url, port, identifier });
    console.log("done, dont close me!!");
  } catch (e) {
    console.info("!! Nu. something failed: ");
    console.error(e);
    process.exit(1);
  }
};

module.exports = { main, read };
