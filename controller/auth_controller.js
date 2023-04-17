const user = require("../model/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const {username, password,} = req.body;
    try{
        if(!username || !password){
            res.status(409).json({message:"please provide valid username and password"})
        }{
            auth_user = await user.findOne({username});
            if(auth_user){
                const verify = await bcrypt.compare(password, auth_user.password); 
                if(verify){
                  tk =  await jwt.sign({auth_user}, process.env.SECRET_KEY, {expiresIn:"2h"},);
                    res.status(200).json({token:tk});
                }
                else{
                    res.status(401).json({message:"username or password incorrect"});
                }
            }
            else{
                res.status(401).json({message:`user with ${username} no found`});
            }
        }


    }catch(error){
        res.status(500).json({error:error.message});
    }

};
const signup = async (req, res) => {
    const {username, password, email , phone} = req.body;
  
    try{
        if(!username || !password || !email || !phone){
            res.status(403).json({"invalid":"please provide all data"});
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = await user.create({username, password:hashedPassword, email, phone});
            res.status(200).json(newUser);
        }

    }catch(error){
        res.status(400).json({error:error.message});
    }

};

module.exports = {
  login,
  signup,
};
