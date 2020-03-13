var express = require('express')
var router = express.Router()
var galleryVO = require('../models/galleryVO')

var path = require('path')

// 파일(이미지) 업로드를 위해서
// multer를 설정하기
var multer = require('multer')

// 파일을 "어디에 어떻게" 업로드 할 것인가를 설정하는
//      객체를 만들기
// destnation : 어디에 저장할 것인가에 대한 실행코드
// filename : 업로드할 때 
//      원본파일이름 -> uploadFileName으로 변경하는 코드가 있고
//      그 코드에서 filename을 생성해준다.
//      filename : 업로드할 때 변환된 파일정보를 갖고 있다.
var saveOptions = multer.diskStorage({
    destination : (req,file,callBackFunc) => {
        var uploadPath = path.join(__dirname,"/../","public","uploads")
        // Node_Gallery_V1/public/uploads 형식으로 문자열 생성
        console.log(uploadPath)
        // 파일을 저장할 위치를 uploadPath에 다시 지정?
        callBackFunc(null,uploadPath)
    },
    filename : (req,file,callBackFunc)=>{
        // 업로드된 파일이름을 변환하여
        // 해킹에 대비
        var uploadFileName = Date.now() + "_" + file.originalname
        callBackFunc(null,uploadFileName)
    }
})

// 실제로 파일을 업로드하는 함수
// gOriginalPhotoName로 넘어오는 파일 이름을 저장하라.
var saveFile = multer({storage:saveOptions}).single("gOriginalPhotoName")

router.get('/',(req,res)=>{
    galleryVO.find({})
    .exec((err,galleries)=>{
        res.render('index',{galleryList:galleries})
    })

})

router.get("/view/:id",(req,res)=>{
    let id = req.params.id
    galleryVO.findOne({_id:id})
    .exec((err,data)=>{
        res.render('gallery/view',{gallery:data})
    })
})

router.get('/update/:id',(req,res)=>{
    let id = req.params.id
    galleryVO.findOne({_id:id}).exec((err,data)=>{
        res.render('gallery/upload',{gallery:data})
    })
})

// put method
// RESTfull 방식에서 사용할 수 있는 4가지 method
//  get, post, put, delete
// 이 중 put과 delete는 ajax를 사용해야만 구현이 된다.
router.put('/update/:id',(req,res)=>{
    var id = req.params.id
    galleryVO.update({_id:id},{$set : req.body})
    .exec((err,data)=>{
        if(err) {
            res.json({
                msg : 'UPDATE FAIL',
                data : data
            })
        } else {
            res.json({
                msg : 'OK',
                data : data
            })
        }
        // res.redirect('/gallery/view/' + id)

    })
})

router.get('/upload',(req,res)=>{
    var gallery = new galleryVO()
    res.render('gallery/upload',{gallery:gallery})
})

/*
    파일 업로드
    1. multer를 사용해서 생성해 둔 saveFile() 함수를 사용해서
        파일을 업로드 하고
    2. saveFile() callback 함수 내에서 변경된 파일 이름을 추출하고
    3. DB에 저장
*/
router.post('/upload',(req,res)=>{

    saveFile(req,res,(err)=>{
        if(err) {
            console.log(err)
            res.send('파일 업로드 오류')
        } else {
            // 원래 req.file 객체는
            // web form에서 업로드한 파일에 대한 정보만 담겨 있다.
            // 그중 .originalname은 원본 파일이름이다.
            let originalname = req.file.originalname
            // 마치 web form에 input tag에 gOriginalPhotoName tag가
            // 원래 있었던 것처럼 새로운 변수가 추가되고
            // 그곳에 originalname 값이 세팅
            req.body.gOriginalPhotoName = originalname

            // 원래 tag에 있던 gUpLoadPhotoName에는
            // 새로 변경된 파일 이름을 저장해둔다.
            // req.file.filename은
            //  saveOptions에 설정된 
            //      filename : 의 값이 세팅되어 있다.
            req.body.gUpLoadPhotoName = req.file.filename

            var vo = new galleryVO(req.body)
            vo.save((err,data)=>{
                res.redirect('/gallery')
            })

        }
    })

})

module.exports = router