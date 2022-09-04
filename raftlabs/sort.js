


module.exports=function sortdata(data){


    function merge(left,right){
    let left_index=0;
    let right_index=0;
    let result=[];
    console.log("leftt",left,right)
    while(left_index<left.length && right_index<right.length){
      if(left[left_index].title < right[right_index].title){
      result.push(left[left_index])
      left_index++
      }else if(left[left_index].title>right[right_index].title){
        console.log("truee")
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
    console.log("got res",result)

    return result
    }
    
    
    function sort(b){
    console.log("enter",b)
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

