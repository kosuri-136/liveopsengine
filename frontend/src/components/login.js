import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavBar from "./Nav"
import "../styles/login.css"

function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
    const postData = () => {
        fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                "Authorization":localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })

        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                }
                else {
                    alert(data.message)
                    console.log(data)
                    localStorage.setItem("token", data.token)
                    setUsername("")
                    setPassword("")
                    navigate("/offer")
                }
            })
    }
    return <>
        <NavBar />
        <center>
        <div className="signinbox">
            <div className="card">
                <h2 className="waves-light">SIGNIN</h2>
                <input placeholder="Name" type="text" onChange={e => {
                    setUsername(e.target.value)
                }} value={username} />
                <input placeholder="password" type="password" onChange={e => {
                    setPassword(e.target.value)
                }} value={password} />
                <button   style={{
                    backgroundColor: 'red',
                    padding: '6px 14px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }} onClick={() => {
                    console.log(username, password)
                    postData()
                }}>Submit</button>
                <Link to="/signup"><h6 className="footer" >Don't have an account?</h6 ></Link>
            </div>
        </div>
        </center>
    </>
}
export default Signin