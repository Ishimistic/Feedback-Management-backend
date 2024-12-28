
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid email or password"});

        const validPassword= await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({message: "Invalid email or password"});

        const token = jwt.sign(
            {_id: user._id, role: user.isAdmin ? 'Admin' : 'User'},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({message: 'Login Successful.', token});
    }catch(err){
        res.status(500).json({message: 'Error Loggin in.', error: err});
    }
}
