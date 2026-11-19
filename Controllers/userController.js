const users = require("../Model/userModel")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');

exports.registerController = async (req,res) => {
    console.log(`Inside register function`);
    try{
        const {name,email,phonenumber,password} = req.body
        const existingUser = await users.findOne({email})
        if(existingUser){
            return res.status(200).json({
                success: false,
                message: "User Already Exists"
            })
        }
        else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = await users.create({
                name, email, phonenumber, password: hashedPassword
            })
            res.status(201).json({
                success: true,
                message: "User Registered Successfully",
                data: newUser
            })
        }
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Error in Register API",
            error: err.message
        })
    }
}

// user login
exports.loginController = async (req, res) => {
    console.log(`Inside login function`);
    try{const { email, password } = req.body
    const existingUser = await users.findOne({ email: email })
    console.log(existingUser);
    if (existingUser) {
        const isPswdMatch = await bcrypt.compare(password, existingUser.password)
        console.log(isPswdMatch);
        if (isPswdMatch) {
            // const token = jwt.sign(
            //     {
            //         email: existingUser.email,
            //         id: existingUser._id
            //     },
            //     process.env.secretKey,{expiresIn: "1h"}
            // )
            res.status(200).json({ existingUser, message: `Login Successful!!!` })
        } else {
            res.status(409).json({ message: `Invalid Credentials!!!` })
        }
    } else {
        res.status(400).json({ message: `Account doesnot Existis!!! Please Resigister!!!` })
    }}
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}