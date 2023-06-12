const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require('mongoose')
const JWT_SECRET ="asdfghjkl"
const router = express.Router();
const offer = require('../models/offer')
const getUserByToken=(token)=>{
    return new Promise((resolve,reject)=>{
        if(token){
            let userData
            try{
                userData = jwt.verify(token,JWT_SECRET);
                if(!userData){
                    return reject("Invalid token")
                }
                console.log(userData)
                resolve(userData)
            }catch(err){
                reject("Invalid token")
            }
        }
        else{
            reject("Token not found")
        }
    })
}

router.get("/alloffers",async(req,res)=>{
    let data = await offer.find()
    res.status(200).json(data)
})
router.post("/createoffer",(req,res)=>{
    // console.log(req.headers.authorization)
    let flag = true;
    for(let x in req.body){
        if(req.body[x]==""){
            flag = false
            break
        }
    }
    if(flag==false){
        return res.status(422).json({error:"please fill all the fields"})

    }else{
        getUserByToken(req.headers.authorization)
        .then(userDetails=>{
            const {username} = userDetails
            offer.create({...req.body,username:username}).then(offer=>{
                res.status(200).json(offer)
            }).catch(err=>{
                res.status(400).send({message:err.message})
            })
            /*userDetails will look like
            {
                _id: '640efbe497eadd12d7f1e780',
                username: 'Anuvrat',
                iat: 1678708704
            }
            */
        }).catch(err=>console.log(err))
    }

})

router.post("/offerlist",(req,res)=>{
    // console.log(req.body)
    if(!req.body.age || !req.body.installed_days){
       return res.status(422).json({error:"Please the required fields"})
    }
    let validOffers = []
    offer.find().then(allOffers=>{
        // res.status(200).json(allOffers)

        allOffers.filter((offer)=>{
            // const obj1 = {}
            // const obj2 = {}
            let obj = {age:"",installed_days:""}

            const rules= offer.target
            // const age = rules.split("and")[0]
            // const installedDays = rules.split("and")[1]
            let x = rules.split("and")[0]
            let y = rules.split("and")[1]
            if(x.includes(">") && y.includes("<")){
                x = x.split(">")[1].trim()
                y = y.split("<")[1].trim()
                obj.age = x;
                obj.installed_days=y
                // console.log(x,y)
                if(req.body.age >obj.age && req.body.installed_days<obj.installed_days){
                    // console.log(req.body.age,req.body.installed_days)
                    // console.log(obj.age,obj.installed_days)
                    // console.log(obj.age<req.body.installed_days)

                    console.log("")

                    validOffers.push(offer)
                }

            }
            else if(x.includes(">") && y.includes(">")){
                x = x.split(">")[1].trim()
                y = y.split(">")[1].trim()
                // console.log(x,x.length)
                // console.log(y,y.length)
                obj.age=x
                obj.installed_days=y
                if(req.body.age>obj.age && req.body.installed_days>obj.installed_days){
                    validOffers.push(offer)
                }
                
            }
            else if(x.includes("<") && y.includes(">")){
                x = x.split("<")[1].trim()
                y = y.split(">")[1].trim()
                obj.age = x
                obj.installed_days=y
                if(req.body.age < obj.age && req.body.installed_days>obj.installed_days ){
                    validOffers.push(offer)
                }
            }
            else{
                x = x.split("<")[1].trim()
                y = y.split("<")[1].trim()
                obj.age = x
                obj.installed_days=y
                if(req.body.age < obj.age && req.body.installed_days<obj.installed_days ){
                    validOffers.push(offer)
                }
            }
        })
        // console.log(validOffers)

        res.status(200).send(validOffers)

    }).catch(err=>{
        res.status(500).json({message:"Internal server Error"})
    })
})

router.put("/update",(req,res)=>{
    const token = req.headers.authorization
    getUserByToken(token).then(userData=>{
        const {username} = userData
        offer.findOne({username:username})
        .then(data=>{
            if(!data){
                return res.status(422).json({error:"error in finding the user"})
            }
            res.status(200).json(data)
            // console.log(data)
        })
    })
})


router.delete("/delete",(req,res)=>{
    const {username} = req.body
    offer.findOne({username:username})
    .then(savedUser=>{
        if(!savedUser){
            console.log(username)
            return res.status(401).json({error:`${username} doesnot exist`})
        }
        getUserByToken(req.headers.authorization).then(userData=>{
            const {username} = userData
            offer.deleteOne({username:username}).then(result=>{
                res.json({message:`${username} is deleted`})
            })
    
        }).catch(err=>console.log(err))
    })

})
module.exports = router