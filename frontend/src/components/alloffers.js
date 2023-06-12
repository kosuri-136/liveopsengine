import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/getoffes.css"
function GetAllOffers(){
    const [offerData,setOfferData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:8080/alloffers",{
            method:"GET"
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            setOfferData([...data])
        })
    },[])
    const deleteOffer=(username)=>{
        // console.log(deletedItem)
        console.log(username)
        fetch("http://localhost:8080/delete",{
            method:"DELETE",
            headers:{
                "Authorization":localStorage.getItem("token"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username:username})
        }).then(res=>res.json())
        .then(data=>{
            alert(data.message)
        })
        window.location.reload()
    }
    return<>
    {offerData.map((item,i)=>{
        return <div key={i} className="card ">
            <img style={{height:"150px",width:"150px"}} src={item.offer_image} alt="offer/img"/>
            <div>Offer_id: {item.offer_id}</div>
            <div>Created by: {item.username}</div>
            <div>Title: {item.offer_title}</div>
            <div>Description: {item.offer_description}</div>
            <div>Price: ₹ {item.pricing}</div>
            <button    style={{
                    backgroundColor: 'red',
                    padding: '6px 14px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                    marginleft: "20px",
                  }} onClick={()=>{
                deleteOffer(item.username)
            }}> delete</button>
        </div>
    })}
    <center><Link to="/"><button style={{
                    backgroundColor: 'red',
                    padding: '6px 14px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                    marginleft: "20px",
                  }} >Go back</button></Link></center>
    </>
}
export default GetAllOffers