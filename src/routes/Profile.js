import { ENETDOWN } from "constants";
import { authService,dbService } from "fbase";
import {useState,useEffect} from "react";
import { useHistory } from "react-router";
const Profile=({userObj,refreshUser})=>{
    const history = useHistory();
    const [newDisplayName,setNewDisplayName] = useState(userObj.displayName)
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
const onChange = (event) => {
    const {
        target:{ value },
    } = event;

    setNewDisplayName(value);
};
    const onSubmit = async(event) =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName:newDisplayName});
            refreshUser();
        }
    };

    return (
        <div className="container">
        <form onSubmit={onSubmit} className="profileForm">
            <input onChange={onChange}
            type="text"
             placeholder="Display name"
             value={newDisplayName}
             autoFocus
             className="FormInput"
             />
                                                                                        
            <input type="submit" placeholder="Update Profile" className="formBtn"style={{marginTop:10,}} />
        </form>
        <span className="formBtn cancleBtn logout" onClick ={onLogOutClick}>Log Out</span>
        </div>
    );
};
export default Profile;