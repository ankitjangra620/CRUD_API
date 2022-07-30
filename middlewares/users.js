 import users from '../models/users.js'
 import mongodb from 'mongodb'
import { response } from 'express';

 const ObjectId = mongodb.ObjectId;
 export const checkUser = async (req,res,next) => {
    let user;
    try {
        user=await users.findOne({firstName:req.body.firstName}).then(response=>{
            return response
        })
        console.log(user)
        if(user){
            return res.status(404).json({message:"User exists with this firstName"})
        }
        else{
            next();
        }
    } catch (error) {
        return res.status(500).json({message:`Some error occured = ${error}`})
    }
 }

 export const getUser = async (req,res,next) => {
    let user;
    try {
        await users.findById(ObjectId.createFromHexString(req.params.id)).then(response=>{
            if(response) { 
                res.user=response
                next();
            }
            else{
                res.status(400).json({message:"User not exist with given id "})
            } 
        })
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
 }