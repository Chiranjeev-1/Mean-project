import React , { useState} from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";



function Signup(){
    const history = useNavigate();

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')



    async function submit(e){
        e.preventDefault();
        try{

            await axios.post(`http://127.0.0.1:8000/signup`,{
                email,password
            })
            .then(res=>{
                console.log(res.data)
                if (res.data == "exist"){
                    alert("user already exist");
                    
                }
                else if (res.data == "not exist"){
                    let token = true;
                    localStorage.setItem('accessToken', token);
                    
                    history(`/home/${email}`,{state:{id:email}});
                }
            })
            .catch(e=>{
                alert("wrong credentials");
                console.log(e);

            })
        }
        catch(e){
            console.log(e);
        }
    }
    
    return (
        <div className="login">
        <h1>SignUp</h1>
        <form action="POST">
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Username"/>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>

            <input type="submit" onClick={submit} />
        </form>
        <br/>
        <p>OR</p>
        <Link to="/">Login</Link>
        </div>
        
        
    
)
    }

export default Signup