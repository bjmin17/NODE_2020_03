var express = require('express');
var router = express.Router();

var bookVO = require("../models/bookVO")

router.get("/list",function(req,res){
    bookVO.find(function(err,data){
        res.render("list",{books:data})
    })
})
router.get("/insert",function(req,res){
    var data = new bookVO()
    res.render("write",{
        item:data,
        action:'/book/insert',
        pageTitle : '도서정보 추가'
    })
})
router.post("/insert",function(req,res){

    var book = new bookVO(req.body)
    console.log(book)
    book.save(function(err,data){
        // res.redirect("/book/list")
        res.json(data)
    })

    // res.end("insert_post")
})
router.get("/update/:id",function(req,res){

    var id = req.params.id

    bookVO.findOne({_id:id},function(err,data){
        res.render("write",{
            item:data,
            action:'/book/update',
            pageTitle : '도서정보 수정'
        })
    })
    // res.end("update")
})
router.post("/update/:id",function(req,res){
    let id = req.params.id
    bookVO.update({_id:id},{$set:req.body},function(err,data){
        res.redirect("/book/list")
    })

    // res.end("update_put")
})
router.get("/delete/:id",function(req,res){

    let id = req.params.id
    bookVO.deleteOne({_id:id},function(err,data){
        res.redirect("/book/list")
    })
})

module.exports = router