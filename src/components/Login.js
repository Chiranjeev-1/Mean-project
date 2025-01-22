import React , {useState} from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import './static/Login.css';

function Login(){


    const history = useNavigate();

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    async function submit(e){
        e.preventDefault();
        try{

            await axios.post("https://mean-project-ten.vercel.app/",{
                email,password
            })
            .then(res=>{
                if (res.data === "exist"){
                    let token = true;
                    localStorage.setItem('accessToken', token);
                    history(`/home/${email}`,{state:{id:email}})

                }
                else if (res.data == "not exist"){
                    alert("user is not authenticated.");

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
        <h1>Login</h1>
        <form action="POST">
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Username"/>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"/>

            <input type="submit" onClick={submit} />
        </form>
        <br/>
        <p>OR</p>
        <Link to="/signup">SignUp</Link>
        </div>
        
        
    
)
    }

export default Login