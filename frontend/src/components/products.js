import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Products = () => {
    const [data, setData] = useState(null)
    const [name, setName] = useState("")

    const fetchData = async () => {
        const token = sessionStorage.getItem("token")
        const resp = await fetch('http://localhost:5050/product', {
            headers: { Authorization: token }
        })
        setData(await resp.json())
        // console.log(serverResponse)
        console.log(data)


        const response = await fetch("http://localhost:5050/product/user", {
            headers: { Authorization: token }
        })

        const user = await response.json();
        setName(user.name)
        console.log(name)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = (id) => {
        const token = sessionStorage.getItem("token")
        fetch(`http://localhost:5050/product/remove` , { 
            method:"DELETE",
            headers:{Authorization:token}
        })
    }

    return (
        <>
            <div id='main-box' >
                {data?.map((data, index) => {
                    return (
                        <div className="product-div" key={index} >
                            <div className="offertitle" >
                                <h2>{data.offerTitle}</h2>
                                {
                                    name === "Asra123" ? (
                                        <div>
                                        <div>
                                        < DeleteIcon onClick={handleDelete(data.id)} />
                                        <EditIcon/>
                                            </div>
                                      
                                        </div>
                                    ):(
                                        null
                                    )
                                }
                               
                                </div>
                            <div className="image" >
                                <img src={data.image} className="pro-image" />
                            </div>
                            <div>
                                <h4>{data.description}</h4>
                                </div>
                                <div className="cost" >
                                    <h4>{data.currency}</h4>
                                    <h4>{data.cost}</h4>
                                    </div>
                                <div> 
                                    <button className="btn"  id="btn">
                                        Buy Now
                                    </button>
                                    </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Products;




