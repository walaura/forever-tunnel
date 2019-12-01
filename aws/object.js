const object = (bucket = process.env.FOREVERTUNNEL_BUCKET) => ({
  Bucket: bucket,
  Key: "endpoints.json"
});

module.exports = object;
