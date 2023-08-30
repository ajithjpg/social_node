// import User from '../Model/userModel'
// import { getToken } from '../utils'
// import {OAuth2Client} from 'google-auth-library'
// import nodemailer from 'nodemailer'
// import {hash,compare} from 'bcryptjs'
// import { restart } from 'nodemon'

// import { EMAIL, PASSWORD, JWT_SECRET_KEY } from '../config'
// import { transport } from '../emailService'

const nodemailer = require('nodemailer')
require("dotenv").config()
const { sign, verify } = require('jsonwebtoken')
const { hash, compare } = require('bcrypt')
const UserModel = require('../models/UserModel');
const { isEmpty } = require('../validator')

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.email,
        pass: process.env.email_password
    }
})

// const client =new OAuth2Client('"485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"')
module.exports = {
    //########################################+++Register+++#############################################################################
    async registerroute(req, res) {
        const userRegisterData = req.body

        if (isEmpty(userRegisterData)) {
            res.send({ msg: 'please enter all feild' })
        } else {
            var userExist = await UserModel.findByemail(userRegisterData.email_id)
            if (userExist == 1) {
                console.log('User Already Registered here')
                return res.send({
                    'code': 1,
                    'message': 'User Already Registered here',
                })
            }

            const HashedPassword = await hash(userRegisterData.confirm_password, 10)
            const user = {
                Name: userRegisterData['name'],
                Email: userRegisterData.email_id,
                PhoneNumber: userRegisterData.phone_number,
                Password: HashedPassword,
                IsVerify: false
            }
            const newuser = await UserModel.create(user)
            console.log(newuser)

            if (newuser.status == 1) {
                console.log('user register success')
                // return res.send({
                //     'code': 0,
                //     'message': 'User Register Successfully',
                // })
                const accessToken = sign({ id: newuser.Id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                })
                console.log(accessToken)

                const url = `http://localhost:8080/users/emailconfirm/${accessToken}`;
               
                transport.sendMail({
                    to: userRegisterData.email_id,
                    subject: 'Photogram-Email-Conformation',
                    html: `please click on <a href=${url}>Confirm </a> `
                },(err,res)=>{
                    if(err){
                        return err
                    }else{
                        res.status(200)
                        res.json({code:0, msg: 'Mail Sent Your Register Mail ID'});
                        
                    }
                })
               
               
            }
            else {
                console.log('some error')
                return res.send('user not created')
            }

        }
    },
    //########################################+++sign-in+++#############################################################################
    async signinroute(req, res) {
        if (!req.body.name && !req.body.password) {
            console.log('invalid credetials')
            return res.status(404).send('invalid credentials')
        }
        try {
            const { _id, name, email, password, email_verified, isAdmin, Address } = await User.findOne({ email: req.body.email })
            const isMatch = await compare(req.body.password, password)
            if (!email_verified === false) {
                if (email && isMatch) {
                    console.log('login success')
                    return res.send({
                        msg: 'login-success',
                        id: _id,
                        name: name,
                        email: email,
                        email_verified: email_verified,
                        isAdmin: isAdmin,
                        token: getToken({ name, email, password, _id, isAdmin }),
                        address: Address
                    })

                }
                else {
                    return res.send({ msg: 'Invalid Credentials' })
                }
            }
            else {
                console.log('email not confirmed')
                return res.send({ message: 'email not confirmed' })
            }

        } catch (error) {
            return res.status(404).send({ message: error.message })
        }
    },
    //########################################   EMAIL VARIFICATION    ##############################################
    async EmailVerification(req, res) {
        
        try {

            const { id } = verify(req.params.id, process.env.JWT_SECRET_KEY)
            console.log(id)
            const { nModified } = await UserModel.update(id)
            if (nModified == 1) {
                console.log('Email verify Success')
                return res.send('Email Verify Success')

            }

        }
        catch (err) {
            console.log('ddd'+err.message)
        }

    }
}