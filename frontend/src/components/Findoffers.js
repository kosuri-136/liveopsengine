import { useState } from "react"
import { Link } from "react-router-dom"




function FindOffer() {
    const [playerId, setPlayerId] = useState("")
    const [coins, setCoins] = useState("")
    const [installedDays, setInstalledDays] = useState("")
    const [age, setAge] = useState("")
    const [offer, setOffer] = useState([])
    const [count,setCount] = useState(1)
    // const [offerPhoto,setOfferPhoto]= useState([])

    const postData = () => {
        fetch("http://localhost:8080/offerlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                player_id: playerId,
                age: age,
                installed_days: installedDays,
                coins: coins
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    // console.log(data.error)
                    alert(data.error)
                    setCount(1)
                }
                else {
                    setOffer([...data])
                    if (offer.length) {
                        console.log(offer)
                        // console.log(data.offer_image)
                    }
                }
            })
        
    }
    function countHandler(){
        setCount(()=>count+1)
        // console.log(count)
    }


    return <>
    <center>
    {count<3 && <div id="signin-container">
        <div className="card" style={{ padding: "10px", height: "fit-content", maxWidth: "500px", margin: "60px auto", textAlign: "center" }}>
            <h2 className="waves-light">Player Details</h2>
            <input placeholder="player_id" type="text" onChange={e => {
                setPlayerId(e.target.value)
            }} value={playerId} />
            <input placeholder="age" type="Number" onChange={e => {
                setAge(e.target.value)
            }} value={age} />
            <input placeholder="installed_days" type="Number" onChange={e => {
                setInstalledDays(e.target.value)
            }} value={installedDays} />
            <input placeholder="coins" type="Number" onChange={e => {
                setCoins(e.target.value)
            }} value={coins} />
            <button className="btn waves-effect waves-light blue" onClick={() => {
                // console.log(username, password)
                postData()
                // console.log(offerDetails)
                countHandler()


            }}>save</button>
            <h6 style={{ fontSize: ".8rem", color: "red" }}>click on save twice to see available offers</h6>

            <Link to="/"><h6 className="footer" >Home</h6 ></Link>
        </div>

    </div>}
    {count>2 && offer.map((item,i)=>{
        return<div key={i} className="card">
            {/* {getPhoto()} */}
            <div>
                <img src={item.offer_image} alt="offer_image"/>
            </div>
            <div>
                Created By: {item.username}
            </div>
            <span>
                Offer Description: {item.offer_description}
            </span>
            <div>
                Offer type: {item.offer_title}
            </div>
            <div>
                Price: ₹{item.pricing}
            </div>
        </div>
    })}
    {count>1 && <button onClick={()=>{
        setCount(1)
        setAge("")
        setCoins("")
        setInstalledDays("")
        setPlayerId("")
        }}>Go back</button>}
</center>
    </>


}
export default FindOffer