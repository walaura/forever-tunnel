const AWS = require("aws-sdk");
const object = require("./object");

const read = async ({ key = process.env.FOREVERTUNNEL_AWS_KEY, bucket }) => {
  const [accessKeyId, secretAccessKey] = key.split(",");

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey
  });

  let json = {};
  return new Promise(yay => {
    s3.getObject(object(bucket), (err, data) => {
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
