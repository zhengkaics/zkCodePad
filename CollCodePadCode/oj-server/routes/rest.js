
var express=require("express");
var router=express.Router();
var problemService=require("../services/problemService");
var bodyParser=require("body-parser");
var jsonParser=bodyParser.json();//we user jsonParser which is part of bodyParser

//有人要请求这个/problems 的时候，我会交给problemService去处理，他会返回一个promise，我把结果返回给请求的人
router.get("/problems",function(req,res){
     problemService.getProblems()
         .then(problems=>res.json(problems));
});
//parems offered by express
router.get("/problems/:id",function (req,res) {
    var id=req.params.id;
     problemService.getProblem(+id)
         .then(problem=>res.json(problem));
});



router.post("/problems",jsonParser,function (req,res) {
    problemService.addProblem(req.body)//body 是bodyParser给生成的JSON
        .then(function (problem) {
            res.json(problem);
        },function (error) {
                res.status(400).send("Problem name already exists!");

        });
});
module.exports=router;