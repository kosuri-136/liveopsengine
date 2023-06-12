const express = require('express');
const bcrypt = require("bcrypt");
const salt = 10; // at what level we want to encrypt it
const router = express.Router();
// const { user } = require('../schemas/user-schema')
const  user  = require('../models/player')

const JWT_SECRET ="asdfghjkl"
const jwt = require('jsonwebtoken')

router.post("/signup", (req, res) => {
    //create a user in db
    // console.log(req.body)
    const {username,email,password} = req.body
    if(!username || !email || !password){
        return res.status(422).json({error:"Please fill all the fields"})
    }
    user.findOne({ username: username })
        .then(savedUser => {
            if (savedUser) {
                console.log(req.body)
                return res.status(422).json({ error: "username is already taken" })
            }
            
            bcrypt.genSalt(salt, (saltErr, saltVal) => {
                if (saltErr) {
                    res.status(401).send("Unable to process")
                }
                else {
                    bcrypt.hash(req.body.password, saltVal, (hashErr, hashVal) => {
                        if (hashErr) {
                            res.status(401).send("Unable to process")

                        }
                        else {
                            user.create({
                                username: req.body.username,
                                password: hashVal,
                                email: req.body.email || "",
                                mobile: req.body.mobile || "",

                            }).then((user) => {
                                res.status(200).send({ message: `${user.username} signuped successfully` })
                                console.log(user)
                            }).catch(err => res.status(400).send(err.message))//????
                        }
                    })
                }
            })

        })

})


router.post("/signin", (req, res) => {
    //read a user in db
    const { username, password } = req.body
    // console.log(username,password)
    if(!username || !password){
        return res.json(422).json({error:"Please fill all the fields"})
    }
    user.findOne({ username: username })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(401).json({ error: "invalid username or password" })
            }
            /*
            note ->bcrypy.compare returns promise but comparesync do not return promise 
            */
            else{
                if(!bcrypt.compareSync(password,savedUser.password)){
                    return res.status(401).json({ error: "invalid password" })

                }
                const token = jwt.sign({_id:savedUser._id,username:savedUser.username},JWT_SECRET)
                res.json({message: `${username}successfully logged in`,token})
                
                // res.status(200).json({message: "successfully logged in"})
            }
        
        }).catch(err=>console.log(err))

})

module.exports = router