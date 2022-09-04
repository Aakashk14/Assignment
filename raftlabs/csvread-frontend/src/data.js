import 'bootstrap/dist/css/bootstrap.min.css';

import {Form, Nav,Modal,Button} from 'react-bootstrap'
import {useState,useRef} from 'react'
import styles from './App.module.css'
import axios from 'axios'

function AddNew(props){

const [data,setdata]=useState({
  
  ISBN:"",
  Title:"",
  author:"",
  Description:"",
  PublishedAt:""
})
const[selectedType,setType]=useState(0)
const[openForm,setform]=useState(false)
const [disabled,setdisable]=useState(false)
const NewData=()=>{
  setdisable(true)
  axios.post(`/api/data/add?type=${selectedType}`,{data:data}).then((response)=>{
    if(response.data.success){

      props.setshow(false)
    }else{
      alert("Invalid Values")
    }
    setdisable(false)

  })
}

const closeModal=()=>{
  setdata({
    ISBN:"",
    Title:"",
    Description:"",
    PublishedDate:""
  })
  setform(false)
  setType(0)
  props.setshow(false)
}
    return (
    <>
     <Modal show={props.show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        {!openForm?
        
        <div className={styles.selection}>
        <select onChange={e=>{setType(e.target.value)}}><option value="0">Book</option><option value="1">Magazine</option></select>
        <Button variant="outline-primary" size="sm" onClick={e=>{setform(true)}}>Add</Button>
        
        </div>
        
        :<div className="AddForm"><Form >
      <Form.Group className="mb-3">
        <Form.Label>Enter ISBN</Form.Label>
        <Form.Control type="text" placeholder="" onChange={e=>{setdata({...data,ISBN:e.target.value})}}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Enter Title</Form.Label>
        <Form.Control type="text" placeholder="" onChange={e=>{setdata({...data,Title:e.target.value})}}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Enter Author</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" onChange={e=>{setdata({...data,author:e.target.value})}}/>
      </Form.Group>

      {selectedType==0?<Form.Group className="mb-3">
        <Form.Label>Enter Description</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={e=>{setdata({...data,Description:e.target.value})}} />
      </Form.Group>:
      <Form.Group className="mb-3">
        <Form.Label>Purcahse Date</Form.Label>
        <Form.Control type="date" onChange={e=>{setdata({...data,PublishedAt:e.target.value})}} />
      </Form.Group>}
     
      
    </Form>
    <Button variant="primary" disabled={disabled} onClick={NewData}>
           Add Data
          </Button>
   
          </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
     
  </>
    )
}
export default AddNew