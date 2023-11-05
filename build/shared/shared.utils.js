import "core-js/modules/es.promise.js";
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import AWS from "aws-sdk";
import { S3 } from "@aws-sdk/client-s3";
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
  }
});
export const uploadToS3 = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (files, userId, folderName) {
    const BucketName = "wander-uploadss";
    let locationArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = yield files[i];
      const filePromise = yield file.promise;
      const {
        filename,
        createReadStream
      } = yield filePromise;
      const readStream = createReadStream();
      const objectName = "".concat(folderName, "/").concat(userId, "-").concat(Date.now(), "-").concat(filename);
      const {
        Location
      } = yield new AWS.S3().upload({
        Key: objectName,
        Bucket: BucketName,
        ACL: "public-read",
        Body: readStream
      }).promise();
      locationArray.push(Location);
    }
    return locationArray;
  });
  return function uploadToS3(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
export const delPhotoS3 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (fileUrls, folderName) {
    const BucketName = "wander-uploadss";
    for (let i = 0; i < fileUrls.length; i++) {
      const fileUrl = yield fileUrls[i];
      //console.log(fileUrl, fileUrl.split("/uploads/"))
      const filePath = String(fileUrl).split("/uploads/")[1]; // 파일명만 split 후 선택
      console.log(filePath);
      const params = {
        Bucket: "".concat(BucketName, "/").concat(folderName),
        // Bucket에 폴더 명 uploads 추가
        Key: filePath
      };
      yield new AWS.S3().deleteObject(params).promise(); //파일 이름에 한글 들어있으면 삭제가 안됨..환장한다 진짜
      //한글이 문제가 아니고 띄어쓰기가 문제인듯. key에 들어갈때인지 filePath로 split할때인지 암튼 띄어쓰기가 %로 대체됨
    }
  });
  return function delPhotoS3(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();