import {useNavigate} from "react-router-dom";
const Login=()=>{
    const navigate=useNavigate();
    return(
        <>
        <button className="absolute top-5 right-10 border-2 px-4 py-2 rounded-2xl z-10" onClick={()=>navigate("/Login")}>LogIn</button>
        </>
    )
}

export default Login;