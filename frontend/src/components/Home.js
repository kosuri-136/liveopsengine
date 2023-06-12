import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./Nav";
import  "../styles/Home.css";
const Home = () => {
    return (<nav>
        <NavBar />
        <center>
        <div className="image-container">
            <img className="background-img" src="https://app.gamezone.io/images/bg.png" width="100%" height="100%" />
            <div className="text-overlay">
         
            <span>
            <Link to="/player"><button 
            
            style={{
                backgroundColor: 'red',
                padding: '12px 24px',
                fontSize: '24px',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
              }}
            
            >OFFERS</button></Link></span> 
            <span>
            <Link to="/getoffers"><button
            
            
            
            style={{
                backgroundColor: 'red',
                padding: '12px 24px',
                fontSize: '16px',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
              }}>ALL AVAILABLE OFFERS</button></Link></span> 
   
        </div>
        </div>
        </center>
       
    </nav>)
}
export default Home