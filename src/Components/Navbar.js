import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'
import cartlogo from '../Components/assets/cartlogo.png'
import profilelogo from '../Components/assets/profilelogo.png'
import logo from '../Components/assets/logo.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import {collection,getDocs,query,where} from 'firebase/firestore' 
import {auth,db} from '../FirebaseConfigs/firebaseConfig'



const Navbar = () => {
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
  const navigate=useNavigate();
  const handleLogout=()=>{
    auth.signOut().then(()=>{navigate("/login")})
  }


  return (
    <nav>
        <div className='logoDiv'><Link to='/'><img src={logo} alt='Aatma logo'/></Link></div>
        <div className='flexContainer'>
        <Link to='/'><div className='titleDiv'>Aatma International</div></Link>
        <div className='subtextDiv'><p align="center">" Building trust across the globe "</p></div>


          {!loggeduser && 
                      <div className='buttonLinks'>      
                        <Link to='/'><button>home</button></Link>
                        <Link to='/signup'><button>signup</button></Link>
                        <Link to='/login'><button>login</button></Link>
                    </div>
          }
          {loggeduser && 
                      <div className='buttonLinks'>      
                      <Link to='/'><button>home</button></Link>
                      <Link to='/cart'>
                        <button>
                            <div className='cart-btn'>
                                <img src={cartlogo} alt="cart icon"/>
                                <span className='cart-icon-css'>{loggeduser[0].cart}</span>
                            </div>
                        </button>
                        </Link>
                        <Link to='/userprofile'>
                          <button>
                            <img src={profilelogo} className='profile-logo' alt="profile icon"/>
                          </button>
                        </Link>
                        <button className='logout-btn' onClick={handleLogout}>logout</button>
                    </div>
          }
        </div>
    </nav>
  )
}

export default Navbar