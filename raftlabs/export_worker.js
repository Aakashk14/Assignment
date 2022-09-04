const {parentPort} = require('worker_threads')
const mongoose = require('mongoose')
const db = require('./Database/data_query')
const fs = require('fs')


db.getData().then((data)=>{

let export_result ='isbn,title,author,description,publishedAt \n'
    for(x of data.data){
        console.log("exporting",export_result,x)
       let description=x.description?x.description:"__"
       let publishedAt=x.publishedAt?x.publishedAt:"__"
       
        export_result = export_result+x.isbn+","+x.title+","+x.authors+","+description+","+publishedAt+","
        export_result=export_result+"\n"
        console.log("exported",export_result,x.isbn,x.title,x.authors)

    }


fs.writeFile('./Storage/newcsv.csv',export_result,(err)=>{
    if(err){ //writeto log
    }

})
    
})

parentPort.postMessage({status:"done"})