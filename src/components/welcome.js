import React,{useState,useEffect} from 'react';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import "./welcome.css";

 const Welcome = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isRegIstering,setIsRegistering]=useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [registerInformation,setRegistorinformation]=useState({
        email: "",
        confirmEmail:"",
        password: "",
        confirmPassword:"",

    });



    const navigate = useNavigate();


    useEffect(()=>{
     auth.onAuthStateChanged((user)=>{
        if(user){
            navigate("/homepage");
        }
     });
    },[navigate]);




    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    };
    const handleSignIn = ()=>{
        signInWithEmailAndPassword(auth, email, password).then(()=>{
            navigate("/homepage");
        }).catch((err) => alert(err.message));
    };

    const handleRegister = ()=>{
        if(registerInformation.email !== registerInformation.confirmEmail ){
            alert("Please confirm that email are the same");
            return;
        }
        else if( registerInformation.password !== registerInformation.confirmPassword){
            alert("Please confirm that password are the same");
            return;
        }


        createUserWithEmailAndPassword(auth,registerInformation.email,registerInformation.password).then(()=>{
            navigate("/homepage");
        })
        .catch((err)=> alert(err.message));
    };

    const handleForgotPassword = () => {
        sendPasswordResetEmail(auth, resetEmail)
          .then(() => {
            alert("Password reset email sent. Check your email inbox.");
          })
          .catch((err) => {
            alert(err.message);
          });
      };





  return (
    <div className='welcome'>
      <h1>Todo-List</h1>
      <div className='login-register-container'>
        {!isRegIstering?(
        <div className='login-container'>
           <input type="email" onChange={handleEmailChange}  placeholder='Email' value={email} />
            <input type="password" onChange={handlePasswordChange} placeholder='Password' value={password} />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={()=>setIsRegistering(true)}>Create an Account</button>
            <div className='forgot-password-container'>
              <input type="email" onChange={(e) => setResetEmail(e.target.value)} placeholder='Enter your email for password reset' value={resetEmail} />
              <button onClick={handleForgotPassword}>Forgot Password</button>
            </div>
            
        </div>

        
        ):(
            <div className='register-container'>
            <input type="email"onChange={(e)=>{setRegistorinformation({...registerInformation,email:e.target.value})}} placeholder='Email' value={registerInformation.email} /> 
            <input type="Confirm email"onChange={(e)=>{setRegistorinformation({...registerInformation,confirmEmail:e.target.value})}} placeholder='Confirm Email' value={registerInformation.confirmEmail} />
            <input type="password" onChange={(e)=>{setRegistorinformation({...registerInformation,password:e.target.value})}} placeholder='Password'  value={registerInformation.password} />
            <input type="confirm password" onChange={(e)=>{setRegistorinformation({...registerInformation,confirmPassword:e.target.value})}} placeholder='confirm password' value={registerInformation.confirmPassword} />
            <button onClick={handleRegister}>Register</button>
            <button onClick={()=>setIsRegistering(false)}>Go back</button>
            </div>
        )
        
    
    }
        
      </div>
    </div>
  );
}

export default Welcome;
