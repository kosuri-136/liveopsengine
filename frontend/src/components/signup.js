import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavBar from "./Nav"
import "../styles/signup.css";
function Signup() {
    const [data, setData] = useState({
        username: "",
        password: "",
        email: ""
    })
    const navigate = useNavigate()
    const sendData = (data) => {
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
            return alert("Write email in proper format") 
        }
        fetch("http://localhost:8080/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
                email: data.email
            })
        }).then(result => result.json()
        ).then(data => {
            console.log(data)
            if (data.error) {
                alert(data.error)
            }
            else {
                alert(data.message)
                navigate("/signin")

            }
        })
    }
    return <>
        <NavBar />
        <div className="signupbox">
            <div className="card" style={{ padding: "10px", height: "fit-content", maxWidth: "500px", margin: "60px auto", textAlign: "center" }}>
                <h2 className="waves-light">Live Ops signup</h2>
                <input placeholder="Name" type="text" onChange={(e) => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            username: e.target.value
                        }
                    })

                }} value={data.username} />
                <input placeholder="Email" type="email" onChange={(e) => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            email: e.target.value
                        }
                    })
                }} value={data.email} />
                <input placeholder="password" type="password" onChange={(e) => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            password: e.target.value
                        }
                    })

                }} value={data.password} />
                <button style={{
                    backgroundColor: 'red',
                    padding: '6px 14px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }} onClick={() => {
                    console.log(data)
                    sendData(data)
                }}>Submit</button>
                <Link to="/signin"><h6 className="footer" >Already have an account?</h6 ></Link>
            </div>
        </div>
    </>
}
export default Signup