import AWS from "aws-sdk"

import { S3 } from "@aws-sdk/client-s3";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  }
})

export const uploadToS3 = async (files, userId, folderName) => {
  const BucketName = "wander-uploadss"
  let locationArray = [];
  for (let i = 0; i < files.length; i++) {
    const file = await files[i]
    const filePromise = await file.promise
    const { filename, createReadStream } = await filePromise;
    const readStream = createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const { Location } = await new AWS.S3().upload({
      Key: objectName,
      Bucket: BucketName,
      ACL: "public-read",
      Body: readStream
    }).promise()
    locationArray.push(Location)
  }
  return locationArray
}

export const delPhotoS3 = async (fileUrls, folderName) => {
  const BucketName = "wander-uploadss"
  for (let i = 0; i < fileUrls.length; i++) {
    const fileUrl= await fileUrls[i]
    const filePath = fileUrl.split("/uploads/")[1]; // 파일명만 split 후 선택

    const params = {
      Bucket: `${BucketName}/${folderName}`, // Bucket에 폴더 명 uploads 추가
      Key: filePath,
    };
    await new AWS.S3().deleteObject(params).promise(); //파일 이름에 한글 들어있으면 삭제가 안됨..환장한다 진짜
  } 

};