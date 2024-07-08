
import { useEffect, useState } from 'react'
import './App.css'
import ContactList from './ContactList'
import ContactForm from './ContactForm'

function App() {
  const [contacts,setcontacts]=useState([])
  const [isModelOpen,setisModelOpen]=useState(false)
  const [currentContact,setcurrentContact ]=useState({})
  useEffect(()=>{
    fetchcontacts()
  },[])

  const fetchcontacts=async()=>{
    const response=await fetch("http://127.0.0.1:5000/contacts")
    const data=await response.json()
    setcontacts(data.contacts)
    //console.log(data.contacts)

   };
   const closeModel=()=>{
      setisModelOpen(false)
      setcurrentContact({})
   }
   const opencreatemodel=()=>{
    if(!isModelOpen) setisModelOpen(true)
   }
   const openEditModel=(contact)=>{
    if (isModelOpen) return
    setcurrentContact(contact)
    setisModelOpen(true)
   }

   const onUpdate=()=>{
    closeModel()
    fetchcontacts()
   }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModel} updateCallback={onUpdate}/>
      <button onClick={opencreatemodel}>Create new contact</button>
      {isModelOpen &&  <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModel}>&times;</span>
        <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
        </div>
      </div>   }
      
      </>
  )
}

export default App
