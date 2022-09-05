const {parentPort, workerData}=require('worker_threads')

const db = require('./Database/data_query')



async function sortedData(){
let data = await db.getData()
data=data.data

function merge(left,right){
    let left_index=0;
    let right_index=0;
    let result=[];

    while(left_index<left.length && right_index < right.length){

      if(left[left_index].title < right[right_index].title){
      result.push(left[left_index])
      left_index++
      }else if(left[left_index].title>right[right_index].title){
      result.push(right[right_index])
      right_index++;
      }
    
    }
    if(left_index<left.length ){
    while(left_index<left.length){
    result.push(left[left_index])
    left_index++
    }
    }else if(right_index<right.length){
    result.push(right[right_index])
    right_index++
    }

    return result
    }
    
    
    function sort(b){
    if(b.length<=1){
    return b
    }
    let mid=(b.length/2).toFixed()

    let left = sort(b.slice(0,mid))
    let right = sort(b.slice(mid,b.length))
     return merge(left,right)
    

    }

return sort(data)
    
  }

sortedData().then((data)=>{

  parentPort.postMessage({status:"done",data:JSON.stringify(data)})
})






