import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth,db} from '../FirebaseConfigs/firebaseConfig'
import {collection,addDoc}from 'firebase/firestore'
import './Signup.css'


const Signup =() =>{
    const [username, setUsername] = useState ("")
    const [password, setPassword] = useState ("") 
    const [email, setEmail] = useState ("")
    const [phonenumber, setPhonenumber]= useState("")
    const [address, setAddress] = useState("")

    const navigate=useNavigate()

    const [errorMsg,setErrorMsg]=useState()
    const [successMsg,setSuccessMsg]=useState()

    const handleSubmit=(e)=>{

        e.preventDefault();//prevents refreshing while submiting
        createUserWithEmailAndPassword(auth,email,password)

        .then((userCredential)=>{
            const user=userCredential.user;
            const initialCartvalue=0;
            console.log(user);

            addDoc(collection(db,"user"),{
                username: username, email: email, phonenumber:
                phonenumber, password: password, cart: initialCartvalue,
                address: address, uid: user.uid}
            )
            .then(()=>{
                setSuccessMsg('New user added successfully,You will now be automatically redirected to login page');
                setUsername('')
                setPassword('')
                setPhonenumber('')
                setEmail('')
                setAddress('')
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/login');
                },2000);
            })
            .catch((error)=>{setErrorMsg(error.message)});
        })
        .catch((error)=>{
            if(error.message==='Firebase: Error (auth/invalid-email).'){
                setErrorMsg('Please fil all the required fields')
            }
            if(error.message==='Firebase: Error (auth/email-already-in-use).'){
                setErrorMsg('Email is already in use')
            }
        })
      
    }

  return (
    <><Navbar /><div className='signup-container'>
          <form className='signup-form' onSubmit={handleSubmit}>
              <p>Create Account</p>
              {successMsg && <><div className='success-msg'>{successMsg}</div></>}
              {errorMsg && <><div className='error-msg'>{errorMsg}</div></>}
              <label>Your Name</label>
              <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder='First and Last name' />
              <label>Mobile Number</label>
              <input onChange={(e) => setPhonenumber(e.target.value)} type='tel' placeholder='mobile number with country code' />
              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='abc@email.com' />
              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='strong password' />
              <label>Pick-up spot</label>
              <textarea onChange={(e) => setAddress(e.target.value)} type='address' placeholder='Delivery address' />
              <button type='submit'>Signup</button>
              <div>
                  <span>Already have an account?</span>
                  <Link to='/login'>Login</Link>
              </div>
          </form>

      </div></>
   
  )
}

export default Signup