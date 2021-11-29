import { authService,firebaseInstance } from "fbase";
import { useState } from "react";

const AuthForm = () => {
    const[email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const [newAccount,setAccount] =useState(true);
    const [error,setError] =useState("");

    const onChange =(event) =>{
      const {
          target:{name,value},
      } = event;
      if (name==="email") {
          setEmail(value);
      }else if (name==="password"){
          setPassword(value);
      }
    };

    const onSubmit =async(event) =>{
        event.preventDefault();
        try {
            let data;
        
        if (newAccount) {
            data = await authService.createUserWithEmailAndPassword(email,password);

        }else{
            data = await authService.signInWithEmailAndPassword(email,password);
            
        }
    

    }catch (error) {
        setError(error.message);
    }
    };
    
    const toggleAccount = () => setAccount((prev)=> !prev);
    const onSocialClick =async(event) =>{
       const {
           target : {name},
       } = event;
       let provider;
       if(name==="google"){
           provider = new firebaseInstance.auth.GoogleAuthProvider();
       }else if (name==="github"){
           provider = new firebaseInstance.auth.GithubAuthProvider();
       }
       const data = await authService.signInWithPopup(provider);
      
    };
return(
    <>
        <form onSubmit={onSubmit} className="container">
        <input
        name="email"
        type="text"
         placeholder="Email"
          required
          value={email}
          onChange={onChange} 
          className="authInput"
          />

          <input
        name="password"
        type="password"
         placeholder="Password"
          required
          value={password}
          onChange={onChange} />
        
        <input type="submit" value={newAccount ? "Create Account":"Log In "} 
        className = "authInput authSubmit"
        />
    
        {error && <span className = "authError">{error}</span>}
        </form>
        <span onClick={toggleAccount} className="authSwitch" >
            {newAccount ? "sign In" :"Create Account"}
            </span>

</>
);
};
export default AuthForm;