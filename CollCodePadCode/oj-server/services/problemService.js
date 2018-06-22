//
// var pp=[{
//     id:1,
//     name:"Two sum",
//     desc:"Given an array of integers, return indices of the two numbers such that they add up to a specific target.\n" +
//     "\n" +
//     "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
//     difficulty:"easy"
// },{
//     id:2,
//     name:"Median of Two Sorted Arrays",
//     desc:"There are two sorted arrays nums1 and nums2 of size m and n respectively.\n" +
//     "\n" +
//     "Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
//     difficulty:"medium"
// },{
//     id:3,
//     name:"Longest Palindromic Substring",
//     desc:"Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.",
//     difficulty:"hard"
// },{
//     id:4,
//     name:"ZigZag Conversion",
//     desc:"GThe string \"PAYPALISHIRING\" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)",
//     difficulty:"hard"
// }];


var ProblemModel=require("../models/problemModel");

var getProblems=function(){
    return new Promise((resolve,reject)=>{
            ProblemModel.find({},function (err,problems) {
                if(err){
                    reject(err);
                }else {
                    resolve(problems);
                }
            });
        });
}
var getProblem=function(id){
    return new Promise((resolve,reject)=>{
        ProblemModel.findOne({id:id},function (err,problem) {
            if(err){
                reject(err);
            }else {
                resolve(problem);
            }
        });
    });
}

var addProblem=function(newProblem){
    return new Promise((resolve ,reject)=>{
        ProblemModel.findOne({name:newProblem.name},function (err,problem) {
            if(problem){
                reject("Problem name already exists");
            }else {
                ProblemModel.count({}, function (err, num) {
                    newProblem.id = num + 1;
                    //console.log(newProblem);
                    var mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(newProblem);
                })
            }
            });
    });
}


module.exports={
    getProblems:getProblems,
    getProblem:getProblem,
    addProblem:addProblem
}