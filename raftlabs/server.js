const express = require('express')
const path=require('path')
const app = express()



app.use(express.static(path.join(__dirname,'build')))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(require("./main"))




app.listen(process.env.PORT,"0.0.0.0")