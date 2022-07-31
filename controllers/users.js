import users from '../models/users.js'
import bodyParser from 'body-parser'
import {translate} from 'free-translate'
import { response } from 'express'

export const getUsers = async (req,res) =>{
    try {
        res.json(await users.find())
    } catch (error) {
        res.status(500).json({message:`Some error occured = ${error}`})
    }
}

export const getSingleUser = (req,res) =>{
    res.status(201).json(res.user)
}

export const createUser = async (req,res) =>{
    const user= new users({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        registeredDate: req.body.date,
    })
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json(`Unable to create user due to error = ${error}`)
    }
}

export const updateUser =async (req,res) =>{
    try {
       Object.keys(req.body).map(key=>{
            res.user[key]=req.body[key];
       })
       console.log(res.user);
       const updatedUser =await res.user.save().then(response=>response)
       res.status(201).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteUser = async (req,res) =>{
    try {
        await res.user.remove();
        res.json({message:`Deleted Successfully with first name = ${res.user.firstName}`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export const translateText = async (req,res) => {
    console.log(req.body)
    await translate(req.body.text, { from: 'en', to: 'hi' })
    .then(response=>res.status(200).json({message:response}))
    .catch((error)=> res.status(500).json({message:error.message}))
}