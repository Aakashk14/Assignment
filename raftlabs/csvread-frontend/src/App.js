import logo from './logo.svg';
import styles from './App.module.css';
import AddNew from './data'
import { useEffect,useState } from 'react';
import axios from 'axios'
function App() {
const [data,setdata]=useState([])
const [EnableSearch,setEnableSearch]=useState(0)
const [filterdata,setfilterData]=useState("")
const [originalData,setoriginalData]=useState([])
const [openModal,setModal]=useState("")
  useEffect(()=>{
       axios.get("/api/data").then((response)=>{
        setdata(response.data.data)
        setoriginalData(response.data.data)
       })
  },[])
const sort = ()=>{
  axios.get("/api/data/sort").then((response)=>{
    setdata(response.data)
  })
}

const Search =(e)=>{
 if(filterdata==""){
  setdata(originalData)
  return
 }
  axios.get(`/api/data/search?type=${e.target.id}&data=${filterdata}`).then((response)=>{
    if(response.data.success){
      setdata(response.data.result)
    }else{
      alert("No Data")
    }
  })
}

const exportCSV=()=>{
  axios("/export",{
    method:'GET',
    responseType:'blob'
  }).then((response=>{
    const file = new Blob(
      [response.data],
      {type:'text/csv'}
    )
    window.open(URL.createObjectURL(file))
  }))
}
  return (
    <>
    <div className={styles.App}>

<div className={styles.container}>

     <div className={styles.search}>
     <button type="button" onClick={e=>{setEnableSearch(1)}} >Search by Author</button>
      <button type="button" onClick={e=>{setEnableSearch(2)}}>Search by ISBN</button>
      <button type="button"  onClick={e=>{setModal(true)}}>Add New</button>
      <button tyoe="button" onClick={sort}>Sort By Title </button>
      <button type="button" onClick={exportCSV}>Export CSV</button>


     {/* <input type="text" placeholder="Author's Email"/>
     <input type="text" placeholder="Isbn" onChange={e=>{setisbn(e.target.value)}} /> */}
     </div>

     {EnableSearch==1?<div className={styles.searchBar}>
     
<input type="text" placeholder="Author's Email"   onChange={e=>{setfilterData(e.target.value)}}/><button type="button" id="author" onClick={Search}>Search</button>


      </div>:EnableSearch==2?<div className={styles.searchBar}>
     
     <input type="text" placeholder="Search by ISBN" onChange={e=>{setfilterData(e.target.value)}}/><button type="button" id="isbn" onClick={Search}  >Search</button>
     
     
           </div>:null}
      

     </div>
     <div className={styles.data}>
     <table>
      <thead>
        <tr>
        <th>ISBN</th>
        <th>Title</th>
        <th>Author</th>
        <th>Description</th>
        <th>Published Date</th>
        </tr>
      </thead>
      <tbody>

        {data.map(x=>{

        
          return(
            <tr>
              <td>{x.isbn}</td>
              <td>{x.title}</td>
              <td>{x.authors}</td>
              <td>{x.description?x.description:"__"}</td>
              <td>{x.publishedAt?x.publishedAt:"__"}</td>

            </tr>
          
       
          )
        
        })
      }
      
      </tbody>
     </table>
     </div>

     
    </div>
    <AddNew show={openModal} setshow={setModal}/>
    
      </>

  );
}

export default App;
