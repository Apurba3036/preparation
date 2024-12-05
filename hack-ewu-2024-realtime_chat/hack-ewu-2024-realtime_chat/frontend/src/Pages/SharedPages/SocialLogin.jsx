import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


const SocialLogin = () => {
    const {googleSignin}=useContext(AuthContext);
    const handleGooglesignin=()=>{
        googleSignin()
        .then(result=>{
          const loggedinuser=result.user
            const saveUser={name: loggedinuser.displayName
                  , email: loggedinuser.email}
          fetch('http://localhost:5000/users',{
            method: 'POST',
            headers:{
              'content-type':'application/json'
            },
            body: JSON.stringify(saveUser)
           })
           .then(res=>res.json())
           .then(data=>{
            
           })
        })
        .catch(error=>console.log(error))
    }
    return (
        <div>
             <div className="divider">OR</div>
             <div>
             <button onClick={handleGooglesignin} className="btn">
                       
                    <img alt=".." src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"></img>
             </button>
             </div>
            
        </div>
    );
};

export default SocialLogin;