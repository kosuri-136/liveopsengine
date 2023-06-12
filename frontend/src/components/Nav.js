import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";
const NavBar = () => {
    return (<>
      
        <div className="navbar">
        <center>
            <div>
                <div>
            <h1 className="title">GAMERS ZONE </h1>
            </div>
            <div className="buttons">
            <span>
            <Link to="/"><button
                style={{
                    backgroundColor: 'red',
                    padding: '6px 14px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}>HOME</button></Link></span>
            <span>
            <Link to="/signin"><button   style={{
                    backgroundColor: 'red',
                    padding: '6px 14px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}>LOGIN</button></Link></span>
            <span>  <Link to="/signup"><button    style={{
                    backgroundColor: 'red',
                    padding: '6px 14px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}>SIGNUP</button></Link></span>
            </div>
            </div>
            </center>
        </div>
        
        </> )
}
export default NavBar