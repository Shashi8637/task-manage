import React,{useState,useEffect} from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged , createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';

 const Welcome = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [isRegIstering,setIsRegistering]=useState(false);
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
    },[])




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





  return (
    <div className='welcome'>
      <h1>Todo-List</h1>
      <div className='login-register-container'>
        {!isRegIstering?(
        <>
            <input type="email"onChange={(e)=>{setRegistorinformation({...registerInformation,email:e.target.value})}} placeholder='Email' value={registerInformation.email} /> 
            <input type="Confirm email"onChange={(e)=>{setRegistorinformation({...registerInformation,confirmEmail:e.target.value})}} placeholder='Confirm Email' value={registerInformation.confirmEmail} />
            <input type="password" onChange={(e)=>{setRegistorinformation({...registerInformation,password:e.target.value})}} placeholder='Password'  value={registerInformation.password} />
            <input type="confirm password" onChange={(e)=>{setRegistorinformation({...registerInformation,confirmPassword:e.target.value})}} placeholder='confirm password' value={registerInformation.confirmPassword} />
            <button onClick={handleRegister}>Register</button>
            <button onClick={()=>setIsRegistering(true)}>Go back</button>
        </>
        ):(
            <>

            <input type="email"onChange={handleEmailChange} value={email} />
            <input type="password" onChange={handlePasswordChange} value={password} />
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={()=>setIsRegistering(false)}>Create an Account</button>
            </>
        )
        
    
    }
        {/* <input type="email"onChange={handleEmailChange} value={email} />
        <input type="password" onChange={handlePasswordChange} value={password} />
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={()=>setIsRegistering(true)}>Create an Account</button> */}
        <>
        </>
      </div>
    </div>
  );
}

export default Welcome;
