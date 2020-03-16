var naver = require("../config/naver_secret")
var express = require('express')
var router = express.Router()
var request = require('request')
var bookVO = require("../models/naverVO")


var reqOptions = (api_url)=>{
    var options = {
        url : api_url,
        headers : {
            'X-Naver-Client-Id' : naver.client_id,
            'X-Naver-Client-Secret' : naver.client_secret
        }
    }
    return options
}

module.exports = (app)=> {

    router.get("/",(req,res)=>{
        res.json(naver)
    })

    router.get('/book',(req,res)=>{
        let searchName = req.query.search
        let api_url = naver.book_url
        api_url += '?query=' + encodeURI(searchName)

        request.get(reqOptions(api_url),(err,response,body)=>{

            if(err) {
                console.log(err)
                res.send(response.statusMessage)
            } else if(response.statusCode == 200) {

                var naverJson = JSON.parse(body).items
                naverJson.forEach(function(result){
                    result.search = searchName

                })
                // res.json(naverJson)

                // if(Object.keys(naverJson).length > 1 ) {
                // naverJson.forEach(function(books){
                //     var bookNVO = new bookVO(books)
                //     bookNVO.save(function(err,data){
                //         // res.json(data)
                //         // res.render('book/list',{books:naverJson})
                //     })
                // })  
                // } else {
                    // res.render('book/list',{books:naverJson})
                // }
                bookVO.find({search:searchName},(err,data)=>{

                    
                    if(Object.keys(data).length > 0) {
                        res.render('book/list',{books:naverJson})

                    } else {
                        bookVO.collection.insertMany(naverJson,(err,result)=>{
                            console.log(result)
                            if(err) {
                                res.send("Data Bulk Insert Error")
                            } else {
                                res.json(naverJson)
                            }
                        })
                    }
                // res.json(naverJson)
                // res.render('book/list',{books:naverJson})
                })
            } else {
                res.send("unKnown Error response")
            }
        })
    })
    return router
}