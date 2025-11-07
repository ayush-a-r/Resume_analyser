import bcrypt from "bcrypt";
import jwt    from "jsonwebtoken";
import {pool} from "../db.js";

export async function signup(req,res){
  const {name,email,password}=req.body;
  const hash=await bcrypt.hash(password,10);
  await pool.query("INSERT INTO users(name,email,password) VALUES($1,$2,$3)",[name,email,hash]);
  res.json({message:"User created"});
}

export async function login(req,res){
  const {email,password}=req.body;
  const {rows}=await pool.query("SELECT * FROM users WHERE email=$1",[email]);
  const u=rows[0];
  if(!u||!(await bcrypt.compare(password,u.password)))
    return res.status(401).json({message:"Bad credentials"});
  const token=jwt.sign({id:u.id,email:u.email},process.env.JWT_SECRET,{expiresIn:"1h"});
  res.json({token});
}