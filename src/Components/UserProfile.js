import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import {auth,db} from '../FirebaseConfigs/firebaseConfig'
import {collection,getDocs,query,where} from 'firebase/firestore'
// import { updateProfile } from 'firebase/auth'
import './UserProfile.css'
import profilelogo from '../Components/assets/profilelogo.png'



const UserProfile = () => {
  function GetCurrentUser(){
    const [user,setUser]=useState('')
    // const usersCollectionRef=collection(db,"user")

    useEffect(()=>{
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          const getUsers=async()=>{
            const q=query(collection(db,"user"),where("uid","==",userlogged.uid))
            // console.log(q)
            const data=await getDocs(q);//firest we checked whether the user uid in database==user loggedin uid,then we are getting the full data of the user q in data
            setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
          }
          getUsers();
        }
        else{
          setUser(null);
        }
      })
    },[])
    
    return user
  }

  const loggeduser=GetCurrentUser();

  return (
    <>
    <Navbar />
    <div className='userprofile-outercontainer'>     
        <h3>Account Details</h3>
        <div className='user-profile'>
          <div className='left-container'>
            <div className='userprofile-image'>
              <img src={profilelogo} alt="user pic"/>
            </div>
          </div>
          <div className='right-container'>
            <p>{loggeduser?loggeduser[0].username:"no user"}</p>
            <p>{loggeduser?loggeduser[0].email:"no user"}</p>

            <p>{loggeduser?loggeduser[0].phonenumber:"no user"}</p>

            <p>{loggeduser?loggeduser[0].address:"no user"}</p>

          </div>

        </div>

    </div>
    </>

  )
}

export default UserProfile