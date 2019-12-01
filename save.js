require("dotenv").config();
const AWS = require("aws-sdk");

const postEndpoint = ({ url, port = 80 }) => {
  const [accessKeyId, secretAccessKey] = process.env.AWS_KEY.split(",");

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey
  });
  const object = {
    Bucket: process.env.BUCKET,
    Key: "endpoints.json"
  };

  let json = {};

  return new Promise(yay => {
    s3.getObject(object, (err, data) => {
      if (err) {
        s3.upload(
          {
            ...object,
            Body: "{}"
          },
          function(err) {
            if (err) {
              throw err;
            }
            yay(postEndpoint({ url, port }));
          }
        );
      }
      try {
        json = JSON.parse(data.Body.toString());
      } catch {
        console.info("oops, json was broken - starting over");
      }
      s3.upload(
        {
          ...object,
          Body: JSON.stringify({ ...json, [port]: url })
        },
        function(err, data) {
          if (err) {
            throw err;
          }
          console.log(`Synced with AWS`);
          yay();
        }
      );
    });
  });
};

module.exports = postEndpoint;
