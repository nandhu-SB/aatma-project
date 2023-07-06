import React from 'react'
// import {useState,useEffect} from 'react'
import Navbar from './Navbar'
import Products from './Products'
import Banner from './Banner'
// import {auth,db} from '../FirebaseConfigs/firebaseConfig'
// import {collection,getDocs,query,where} from 'firebase/firestore'
// import { async } from '@firebase/util'

const Home = () => {
  // function GetCurrentUser(){
  //   const [user,setUser]=useState('')
  //   // const usersCollectionRef=collection(db,"user")

  //   useEffect(()=>{
  //     auth.onAuthStateChanged(userlogged=>{
  //       if(userlogged){
  //         const getUsers=async()=>{
  //           const q=query(collection(db,"user"),where("uid","==",userlogged.uid))
  //           // console.log(q)
  //           const data=await getDocs(q);//firest we checked whether the user uid in database==user loggedin uid,then we are getting the full data of the user q in data
  //           setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
  //         }
  //         getUsers();
  //       }
  //       else{
  //         setUser(null);
  //       }
  //     })
  //   },[])
    
  //   return user
  // }

  // const loggeduser=GetCurrentUser();
  // console.log(loggeduser)



  return (
    <div>
        <Navbar/>
        <Banner/>
        <Products/>
        {/* <p>{loggeduser?loggeduser[0].email:"no user"}</p> */}
    </div>
  )
}

export default Home