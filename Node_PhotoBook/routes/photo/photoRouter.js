var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var photoVO = require("../../models/photoBook");
var photo_dir = path.join(__dirname, "/../../", "public", "images");

// 파일 업로드를 도와줄 middleware
var multer = require("multer");

var saveFiles = multer.diskStorage({
  destination: (req, file, func) => {
    // let photo_dir = path.join(__dirname, "/../../", "public", "images");
    func(null, photo_dir);
  },
  filename: (req, file, func) => {
    // console.log(file.originalname);
    func(null, Date.now() + "_" + file.originalname);
  },
});

var saveFile = multer({ storage: saveFiles }).single("pFile");

router.get("/", function (req, res) {
  // render() method는 view 파일과 데이터를
  // rendering하여 web browser에게
  // html로 전송하는 method
  photoVO.find({}).exec(function (err, data) {
    res.render("photo/list", { photos: data });
  });
});

router.get("/upload", function (req, res) {
  let vo = new photoVO();
  res.render("photo/upload", { photo: vo });
});

router.post("/upload", function (req, res) {
  saveFile(req, res, function (error) {
    if (error) res.send("파일 업로드 오류");
    // multer가 파일을 정상적으로 Upload하고 나면
    // req.file 변수에 값들을 설정(Setting) 해 놓는다.
    // req.file 변수에 있는 속성 값들을 가지고 DB저장을 수행
    if (req.file) {
      // 원본 파일이름
      let originalname = req.file.originalname;
      // multer의 filename에 의해서 변경된 파일 이름
      // 실제 업로드 저장된 파일이 된다.
      let photoname = req.file.filename;

      /*
      form에서 업로드한 pText, pTitle은 req.body에 담겨서 여기까지 오고
      multer에 의해서 업로드가 된 파일의 정보(원본이름, 변경이름)를
      req.body에 변수를 설정하면서 등록해준다.
      */

      req.body.pOriginalName = originalname;
      req.body.pPhotoName = photoname;

      // req.body로 photoVO매개변수에 전달하여 vo를 만들면
      // model에 설정한 값들이 모두 채워진 VO가 만들어진다.
      let vo = new photoVO(req.body);
      // vo.save() method만 호출하면 DB에 4개의 변수가 모두 저장이 된다.
      vo.save(function (err, data) {
        res.redirect("/");
      });
    }
    // res.send("사진 업로드 하기");
  });
});
router.get("/view/:id", function (req, res) {
  let id = req.params.id;
  photoVO.findOne({ _id: id }).exec(function (err, data) {
    res.render("photo/view", { photo: data });
  });
});

router.get("/delete/:id", function (req, res) {
  let id = req.params.id;
  photoVO.findByIdAndDelete({ _id: id }).exec(function (err, data) {
    let del_file = path.join(photo_dir, data.pPhotoName);
    fs.unlinkSync(del_file);
    res.redirect("/");
  });
});

router.get("/update/:id", function (req, res) {
  let id = req.params.id;
  photoVO.findOne({ _id: id }).exec(function (err, data) {
    res.render("photo/upload", { photo: data });
  });
});

router.post("/update/:id", function (req, res) {
  saveFile(req, res, function (error) {
    // $set : mongo의 Keyword
    // table의 모든 칼럼에 일치하는 내용이 있으면
    // update를 수행하라
    // _id = id와 일치하는 데이터가 있으면
    let id = req.params.id;

    if (req.file) {
      let originalname = req.file.originalname;
      let photoname = req.file.filename;

      req.body.pOriginalName = originalname;
      req.body.pPhotoName = photoname;
    }

    // update 되기 이전의 데이터를 exec() 함수의 data부분에 임시저장하고
    // update를 수행한 후에 해당 데이터를 참조할 수 있도록
    // 남겨놓은 함수
    photoVO
      .findByIdAndUpdate({ _id: id }, { $set: req.body })
      .exec(function (err, data) {
        if (req.file) {
          // 파일 삭제코드 추가
          let del_file = path.join(photo_dir, data.pPhotoName);

          // 파일 삭제를 하기 위한 코드
          // yarn add fs
          fs.unlinkSync(del_file);
        }

        res.redirect("/photo/view/" + id);
      });
  });
});

module.exports = router;
