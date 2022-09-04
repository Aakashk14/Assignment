const {data,authors} = require('./main_model')

function getData(){

    let result={}
    return new Promise(resolve=>{

        data.find({}).then((data)=>{

            authors.find({}).then((authors)=>{
                result['data']=data;
                result['authors']=authors;

                resolve(result)
            })
           
        })


    })
}


function AddBook(isbn,title,authors,description)
{
console.log("adding book",isbn,title,authors,description)
    return new Promise(resolve=>{
        let tn = new data({
            title:title,
            isbn:isbn,
            authors:authors,
            description:description
        })
        tn.save((err)=>{
            err?resolve(0):resolve(1)
        })
    })
}

function AddMagazine(isbn,title,authors,publishedAt){
    return new Promise(resolve=>{
        let tn = new data({
            title:title,
            isbn:isbn,
            authors:authors,
            publishedAt:publishedAt
        })
        tn.save((err)=>{
            err?resolve(0):resolve(1)
        })
    })

}

function fetchByIsbn(isbn){
    console.log("fetch by isbn",isbn)
    return new Promise(resolve=>{
        data.find({
            isbn:isbn
        }).then((result)=>{
            resolve(result.length>0?result:0)
        })
    })
}
function fetchByAuthor(x){
    console.log("hereeeauthor")
    return new Promise(resolve=>{
        data.find({
            authors:x
        }).then((result)=>{
            resolve(result.length>0?result:0)
        })
    })
}
module.exports={
   getData:getData,
   AddBook:AddBook,
   AddMagazine:AddMagazine,
   fetchByAuthor:fetchByAuthor,
   fetchByIsbn:fetchByIsbn
}