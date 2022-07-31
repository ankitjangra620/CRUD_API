import express from 'express'
import { getUsers , getSingleUser , createUser, updateUser, deleteUser,translateText} from '../controllers/users.js';
import { checkUser , getUser } from '../middlewares/users.js';
const router = express.Router();

router.get("/", async (req,res) => getUsers(req,res))

router.get("/:id", getUser , async (req,res)=> getSingleUser(req,res))

router.post("/", checkUser ,async (req,res)=>createUser(req,res))

router.patch("/:id", getUser, async (req,res)=>updateUser(req,res))

router.delete("/:id", getUser, async (req,res)=>deleteUser(req,res))

router.post("/translate" , async (req,res)=> translateText(req,res))

export default router;