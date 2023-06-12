import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/offerlist.css"
function Offer() {

    const [data, setData] = useState({
        offer_id: "",
        offer_title: "",
        offer_description: "",
        offer_image: "",
        offer_sort_order: "",
        content: "",
        schedule: "",
        target: "",
        pricing: ""
    })
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (url) {
            // data.offer_image=url
            setData(prevData => {
                return {
                    ...prevData,
                    offer_image: url
                }
            })
            fetch("http://localhost:8080/createoffer", {
                method: "POSt",
                headers: {
                    "Authorization": localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(offer => {
                    if(offer.username ===undefined){
                        return alert("click on submit again")
                    }
                    alert(`${offer.username} created offer successfully`)
                    console.log(offer)
                })
              
        }
    }, [url])

    const postDetails = () => {
        const details = new FormData()
        details.append("file", data.offer_image)
        details.append("upload_preset", "liveops")
        details.append("cloud_name", "dd6nmz761")
        fetch("https://api.cloudinary.com/v1_1/dd6nmz761/image/upload", {//api base url
            method: "POST",
            body: details
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
                console.log(data.url)
            })//after clicking on submit we will have a data in the browser console,inside the data there is a url try to run this url in different tab u will see yr image there
            .catch(err => console.log(err))
    }
    return(<>
    <center>
    <div className="cardcontainer">
    
    <div >

        <h2>EDIT THE OFFER</h2>
        <form className="form" onSubmit={e => e.preventDefault()}>
            <div>
                <label htmlFor="offer_id">OFFER ID</label>
                <input type="text" placeholder="OFF 1000" required onChange={(e) => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            offer_id: e.target.value
                        }
                    })
                }} value={data.offer_id} />
            </div>
            <div>
                <label htmlFor="offer_title">OFFER NAME</label>
                <input type="text" placeholder="Diwali Offer" required onChange={(e) => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            offer_title: e.target.value
                        }
                    })
                }} value={data.offer_title} />
            </div>
            <div>
                <label htmlFor="offer_description">OFFER DESCR</label>
                <input type="text" placeholder="Only for next 10 days" required onChange={(e) => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            offer_description: e.target.value
                        }
                    })
                }} value={data.offer_description} />
            </div>
            <div className="file">
                {/* <label>upload</label> */}
                <input type="file" onChange={e => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            offer_image: e.target.files[0]
                        }
                    })
                }} />
            </div>
            <div>
                <label htmlFor="offer_sort_order"> SORT ORDER BY</label>
                <input type="text" placeholder="100" onChange={(e) => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            offer_sort_order: e.target.value
                        }
                    })
                }} value={data.offer_sort_order} />
            </div>
            <div>
                <label htmlFor="content">CONTENT</label>
                <input type="text" placeholder='["quantity": 10]' onChange={(e) => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            content: e.target.value
                        }
                    })
                }} value={data.content} />
            </div>
            <div>
                <label htmlFor="schedule">TIMING</label>
                <input type="text" placeholder='{ "days_of_week": [1, 2, 3], "dates_of_month": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], "months_of_year": [11]}' onChange={(e) => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            schedule: e.target.value
                        }
                    })
                }} value={data.schedule} />
            </div>
            <div>
                <label htmlFor="target">TARGET</label>
                <input type="text" placeholder="age > 30 and installed_days < 5" required onChange={e => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            target: e.target.value
                        }
                    })
                }} />
            </div>
            <div>
                <label htmlFor="pricing">PRICE</label>
                <input type="number" placeholder='1000' required onChange={e => {
                    setData(prevData => {
                        return {
                            ...prevData,
                            pricing: e.target.value
                        }
                    })
                }} />
            </div>
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <button className="btn waves-effect waves-light blue" type="submit" name="action" onClick={() => {
                    // console.log(data)
                    postDetails()
                }}>Submit</button>

            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/"><div style={{ textDecoration: "underline" }}><button    style={{
                    backgroundColor: 'red',
                    padding: '6px 14px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}>Go to Home</button></div></Link>
                <Link to="/getoffers"><div style={{ marginLeft: "20px", textDecoration: "underline" }}><button    style={{
                    backgroundColor: 'red',
                    padding: '6px 14px',
                    fontSize: '10px',
                    borderRadius: '4px',
                    color: 'white',
                    cursor: 'pointer',
                  }}>Available offers</button></div></Link>
            </div>
        </form>
    </div>
    </div>
    </center>

    </>)
}
export default Offer