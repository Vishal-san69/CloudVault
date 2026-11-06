
const {
  S3Client,
  HeadBucketCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
});

const checkS3Connection = async () => {
  try {
    await s3Client.send(
      new HeadBucketCommand({
        Bucket: process.env.AWS_S3_BUCKET,
      })
    );

    console.log("AWS S3 connection successful");
    return true;
  } catch (error) {
    console.error("AWS S3 connection failed:", error.name);
    return false;
  }
};

module.exports = {
  s3Client,
  checkS3Connection,
};
