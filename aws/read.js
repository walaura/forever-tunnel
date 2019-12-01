const AWS = require("aws-sdk");
const object = require("./object");

const read = async () => {
  const [
    accessKeyId,
    secretAccessKey
  ] = process.env.FOREVERTUNNEL_AWS_KEY.split(",");

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey
  });

  let json = {};
  return new Promise(yay => {
    s3.getObject(object, (err, data) => {
      if (err) {
        nay(err);
      }
      try {
        json = JSON.parse(data.Body.toString());
      } catch {
        console.info("oops, json was broken - starting over");
      }
      yay(json);
    });
  });
};

module.exports = read;
