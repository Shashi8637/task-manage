import React ,{useEffect}from 'react';
import {signOut} from "firebase/auth";
import {auth} from "../firebase.js";
import { useNavigate, onAuthStateChanged} from 'react-router-dom';
const Homepage = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(!user){
                navigate("/");
            }
        })
    },[])

    const handleSingOut=()=>{
        signOut(auth).then(()=>{
         navigate("/");
      }).catch(err=>{alert(err.message);});
    };





  return (
    <div>
      <h1>test</h1>
      <button onClick={handleSingOut}>signout</button>
    </div>
  );
}

export default Homepage;
