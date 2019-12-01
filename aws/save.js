const AWS = require("aws-sdk");
const object = require("./object");
const read = require("./read");

const postEndpoint = ({ url, port = 80, identifier = port }) => {
  const [
    accessKeyId,
    secretAccessKey
  ] = process.env.FOREVERTUNNEL_AWS_KEY.split(",");

  const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey
  });

  return read()
    .then(
      json =>
        new Promise(yay => {
          s3.upload(
            {
              ...object(process.env.FOREVERTUNNEL_BUCKET),
              Body: JSON.stringify({ ...json, [identifier]: url })
            },
            function(err, data) {
              if (err) {
                throw err;
              }
              console.log(`Synced ${identifier} with AWS`);
              yay();
            }
          );
        })
    )
    .catch(
      () =>
        new Promise(yay => {
          s3.upload(
            {
              ...object(process.env.FOREVERTUNNEL_BUCKET),
              Body: "{}"
            },
            function(err) {
              if (err) {
                throw err;
              }
              yay(postEndpoint({ url, port }));
            }
          );
        })
    );
};

module.exports = postEndpoint;
