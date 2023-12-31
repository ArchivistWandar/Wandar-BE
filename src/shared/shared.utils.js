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
    // console.log(file)
    // const filePromise = await file.promise
    // console.log(filePromise)
    const { filename, createReadStream } = await file;
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
    
    const fileUrl = await fileUrls[i]
    //console.log(fileUrl, fileUrl.split("/uploads/"))
    const filePath = String(fileUrl).split("/uploads/")[1]; // 파일명만 split 후 선택
    console.log(filePath)

    const params = {
      Bucket: `${BucketName}/${folderName}`, // Bucket에 폴더 명 uploads 추가
      Key: filePath,
    };
    await new AWS.S3().deleteObject(params).promise(); //파일 이름에 한글 들어있으면 삭제가 안됨..환장한다 진짜
    //한글이 문제가 아니고 띄어쓰기가 문제인듯. key에 들어갈때인지 filePath로 split할때인지 암튼 띄어쓰기가 %로 대체됨
  } 

};