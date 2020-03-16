var naver = require("../config/naver_secret")
var express = require('express')
var router = express.Router()
var request = require('request')
var bookVO = require('../models/naver_book')

var reqOptions = (api_url)=>{
    var options = {
        url : api_url,
        // 네이버는 client id와 client secret을 header 방식으로 보내야 한다.
        headers : {
            'X-Naver-Client-Id' : naver.client_id,
            'X-Naver-Client-Secret' : naver.client_secret
        }
    }
    return options
}


    // router.get("/",function(req,res){
    router.get("/",(req,res)=>{
        res.json(naver)
    })

    router.post('/book',(req,res)=>{

        /*
            method=GET(router.get) 방식으로 form에서 값을 전달하면
            req.query에 변수가 담겨서 전달되고
            
            method=POST(router.post) 방식으로 form에서 값을 전달하면
            req.body에 변수가 담겨서 전달된다.
        */
        // let searchName = req.query.search
        let searchName = req.body.search
        let api_url = naver.book_url
        api_url += '?query=' + encodeURI(searchName)

        /*
        검색을 실행했을 때
        1. DB에 해당하는 검색어가 저장되어 있는지 찾아보고
        2. 있으면 DB 내용을 화면에 보여주고
        3. 만약 없으면 naver에서 조회하여 가져온 후
        4. DB에 저장하고
        5. 결과를 화면에 보여라

        */

        bookVO.find({search:searchName}).exec((err,data)=>{
            if(err) {
                res.send(err)
            } else {
                if(data.length > 0){
                    res.json(data)
                } else {
                    request.get(reqOptions(api_url),(err,response,body)=>{
                        // 오류가 없으면 err은 null값이 된다.
                        if(err) {
                            console.log(err)
                            res.send(response.statusMessage)
                        } else if(response.statusCode == 200) {
                            var naverJson = JSON.parse(body).items
                            for(let book of naverJson) {
                                book.search = searchName
                            }
                            bookVO.collection.insertMany(naverJson,(err,data)=>{
                                res.json(data)
                            })

                            // res.render('movie/list',{movies:naverJson})
                        } else {
                            res.send("unKnown Error response")
                        }
                    })
                }
            }
        })

    })

module.exports = router