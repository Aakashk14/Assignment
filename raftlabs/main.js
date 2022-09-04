const express = require('express')
const router = express.Router()
const db = require("./Database/data_query")
const {Worker}= require('worker_threads')
const sortdata = require("./sort")
const {data,authors} =require("./Database/main_model")
const fs =require('fs')


router.get("/api/data",async(req,res)=>{
    let result = await db.getData()

    res.send(result)
})

router.get("/api/data/sort",async(req,res)=>{
    let result = await db.getData()

    let sortedData = await sortdata(result.data)
    res.send(sortedData)
})

router.post("/api/data/add",async(req,res)=>{
    if(req.body.data.ISBN.length==0 || req.body.data.Title.length==0 || req.body.authors==0){
        res.json({success:false})
        return
    }
    req.query.type=="0"?await db.AddBook(req.body.data.ISBN,req.body.data.Title,req.body.data.author,req.body.data.Description):db.AddMagazine(req.body.data.ISBN,req.body.data.Title,req.body.data.author,req.body.data.TitlepublishedAt)
    res.json({success:true})
})



// I was implementing this client side but we have to traverse the whole array might me bad for performance

router.get("/api/data/search",async(req,res)=>{

   

    let result = req.query.type=="author"?await db.fetchByAuthor(req.query.data):await db.fetchByIsbn(req.query.data)
    res.json({success:result!=0?true:false,result:result})
})

router.get("/export",(req,res)=>{
    let workerone = new Worker('./export_worker.js')

    workerone.on('message',(data)=>{
        res.sendFile("newcsv.csv",{root:"./Storage"})
    })
    
})



//Fn to read csv to Mongodb . to maintain performance I have used Mongodb instead directly files
// fs.readFile('./Storage/authors.csv','utf-8',(err,filedata)=>{
//     filedata=filedata.split("\n")


//     console.log("Fff",filedata)
//      for(let i=1;i<filedata.length;i++){
//         let tm = filedata[i].split(";")
        
//         console.log("chk",tm)
//         authors.create({
//             email:tm[0],
//             firstname:tm[1],
//             lastname:tm[2],
//         })
//     }
// })

// fs.readFile('./Storage/books.csv','utf-8',(err,filedata)=>{
//     filedata=filedata.split("\n")


//     console.log("Fff",filedata)
//      for(let i=1;i<filedata.length;i++){
//         let tm = filedata[i].split(";")
        
//         console.log("chk",tm)
//         data.create({
//             title:tm[0],
//             isbn:tm[1],
//             authors:tm[2],
//             description:tm[3]
//         })
//     }
// })
// fs.readFile('./Storage/magazines.csv','utf-8',(err,filedata)=>{
//     filedata=filedata.split("\n")


//      for(let i=1;i<filedata.length;i++){
//         let tm = filedata[i].split(";")
        
//         data.create({
//             title:tm[0],
//             isbn:tm[1],
//             authors:tm[2],
//             publishedAt:tm[3]
//         })
//     }
// })

module.exports=router