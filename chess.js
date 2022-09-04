const readline = require('readline')

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})


rl.question("Enter cordinates of Knight separate i j with comma then Enter\n ",(data)=>{

let total=0;
data = data.split(",")

let [i,j]=data
total+=(i+2<8 && i+2 >-1)&&(j+1<8 && j+1>-1)?1:0
total+=(i+1<8 && i+1 >-1)&&(j+2<8 && j+2>-1)?1:0

total+=(i-2<8 && i-2 >-1)&&(j+1<8 && j+1>-1)?1:0

total+=(i-1<8 && i-1 >-1)&&(j+2<8 && j+2>-1)?1:0

 total+=(i-1<8 && i-1 >-1)&&(j-2<8 && j-2>-1)?1:0

 total+=(i-2<8 && i-2 >-1)&&(j-1<8 && j-1>-1)?1:0
 total+=(i+1<8 && i+1 >-1)&&(j-2<8 && j-2>-1)?1:0
  total+=(i+2<8 && i+2 >-1)&&(j-1<8 && j-1>-1)?1:0

console.log("Total Moves",total)
})