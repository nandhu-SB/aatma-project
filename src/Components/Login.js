import React,{useState} from 'react'
import Navbar from './Navbar'
import './Login.css'
import {Link} from 'react-router-dom'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


const Login = () => {
  const [password, setPassword] = useState ("") 
  const [email, setEmail] = useState ("")
  const [errorMsg,setErrorMsg]=useState()
  const [successMsg,setSuccessMsg]=useState()

  const navigate=useNavigate()//navigates to another page after succesful authentication
  const auth=getAuth()

  const handleLogin=(e)=>{

    e.preventDefault()//prevents refreshing on function call by button
    signInWithEmailAndPassword(auth,email,password)
    
    .then((userCredential)=>{
      setSuccessMsg('Logged in successfully,You will be redirected to home page now');
      setErrorMsg('')
      setPassword('')
      setEmail('')
      setTimeout(()=>{
          setSuccessMsg('');
          navigate('/home');
      },2000);
    })
    .catch((error)=>{
      console.log(error.message)
      if(error.message==='Firebase: Error (auth/invalid-email).'){
          setErrorMsg('Please fill all required fields correctly')
      }
      if(error.message==='Firebase: Error (auth/user-not-found).'){
          setErrorMsg('Please confrm you are entering the correct email')
      }
      if(error.message==='Firebase: Error (auth/wrong-password).'){
        setErrorMsg('Password incorrect')
    }

     })

  }




  return (

    <><Navbar/>
    <div className='login-container'>
          <form className='login-form'>{/*for signup handleSubmit inside form tag,but here,handleLogin on button */}

              <p>Login</p>

              {successMsg && <><div className='success-msg'>{successMsg}</div></>}{/*if anything inside successmssg,then show successmssg */}
              {errorMsg && <><div className='error-msg'>{errorMsg}</div></>}

              <label>Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='abc@email.com' />

              <label>Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='strong password' />

              <button onClick={handleLogin}>Login</button>

              <div>
                  <span>Don't have an account?</span>
                  <Link to='/signup'>Sign up</Link>
              </div>
          </form>

      </div></>
   

  )
}

export default Login