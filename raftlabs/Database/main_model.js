const mongoose = require('mongoose')
const fs = require('fs')
const csv2json = require('csvtojson')
var config = JSON.parse(process.env.APP_CONFIG);

// mongoose.connect("mongodb://localhost:27017/data-assignment",{autoIndex:true})
var mongoPassword="aakash14"
mongoose.connect("mongodb://"+config.mongo.user+":"+encodeURIComponent("aakash14")+"@"+config.mongo.hostString,{autoIndex:true})






const author_schema= new mongoose.Schema({
email:String,
firstname:String,
lastname:String
})
const data_schema = new mongoose.Schema({
title:{type:String,required:true},
isbn:{type:String,required:true},
authors:String,
publishedAt:String, // not using date type since the date is of different format
description:String,

})

const data = mongoose.model("data",data_schema,"data")
const authors = mongoose.model("authors",author_schema)




    


module.exports={
    data:data,
    authors:authors
}