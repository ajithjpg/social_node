// import User from '../Model/userModel'
// import { getToken } from '../utils'
// import {OAuth2Client} from 'google-auth-library'
// import nodemailer from 'nodemailer'
// import {hash,compare} from 'bcryptjs'
// import { restart } from 'nodemon'

// import { EMAIL, PASSWORD, JWT_SECRET_KEY } from '../config'
// import { transport } from '../emailService'
const { getToken } = require('../validator')
const nodemailer = require('nodemailer')
require("dotenv").config()
const { sign, verify } = require('jsonwebtoken')
const { hash, compare } = require('bcrypt')
const UserModel = require('../models/UserModel');
const { isEmpty } = require('../validator')
const {welcomeEmail} = require('../emailTemplate')
const {getprofiledetails} = require('../models/profileModel')
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

                return res.send({
                    'code': 1,
                    'message': 'User Already Registered here',
                })
            }

            const HashedPassword = await hash(userRegisterData.password, 10)
            const user = {
                Name: userRegisterData['name'],
                Email: userRegisterData.email_id,
                PhoneNumber: userRegisterData.phone_number,
                Password: HashedPassword,
                IsVerify: false
            }

            const newuser = await UserModel.create(user)
      

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
                // client_url
                // const url = `http://localhost:51397/pages/email_verify/${accessToken}`;

                const liveurl =  process.env.client_url+'pages/email_verify/'+accessToken

                const output =  welcomeEmail(userRegisterData['name'],liveurl)
                // res.status(200)
                // res.send({ code: 0, message: 'Mail Sent Your Register Mail ID',link:liveurl });
                transport.sendMail({
                   // userRegisterData.email_id
                    to: userRegisterData.email_id,
                    subject: 'Photogram-Email-Conformation',
                    html: output
                }, (err, info) => {
                    console.log(res)
                    if (err) {
                        return err
                    } else {
                        console.log(info)
                        res.status(200)
                        res.send({ code: 0, message: 'Mail Sent Your Register Mail ID' });
                    }
                })
            }
            else {
                console.log('some error')
                return res.send({ code: 1, message: 'user not created' });

            }

        }
    },
    //########################################+++sign-in+++#############################################################################
    async signinroute(req, res) {

        if (req.body.email_id == '' && req.body.password == '') {

            return res.status(200).send({
                code: 1,
                message: 'invalid credentials'
            })
        }
        try {
            const users = await UserModel.signByemail(req.body.email_id)


            if (users.status == true) {
                const isMatch = await compare(req.body.password, users.result.Password)
                if (isMatch == true) {
                    if (users.result.IsVerify == 1) {


                        var usertoken = getToken(users.result.ID, users.result.Name, users.result.Email, users.result.PhoneNumber)
                        var sessiondata = {
                            "user_id": users.result.Id,
                            "start_time": new Date(),
                            "end_time": new Date(),
                            "ip_address": "111",
                            "user_agent": req.body.user_agent,
                            "token":usertoken
                        }

                        const sessionresult = await UserModel.createSession(sessiondata);
                        const data = await getprofiledetails(users.result.Id);
                     
                        if(data != null && data != undefined){
                            if (sessionresult == 1) {
                                return res.send({
                                    code: 0,
                                    message: 'login-success111',
                                    id: users.result.Id,
                                    name: users.result.Name,
                                    email: users.result.Email,
                                    email_verified: users.result.IsVerify,
                                    token: usertoken,
                                    user_details:data
                                })
                            } else {
                                return res.status(200).send({
                                    'code': 1,
                                    "message": "something went wrong"
                                })
                            }
                        }
                        
                    } else {
                        return res.send({
                            code: 1,
                            message: 'email not confirmed'
                        })
                    }
                } else {
                    return res.send({
                        code: 1,
                        message: 'Invalid Credentials'
                    })
                }
            } else {
                return res.send({
                    code: 1,
                    message: 'Invalid email'
                })
            }


        } catch (error) {
            return res.status(404).send({ message: error.message })
        }
    },
    //########################################   EMAIL VARIFICATION    ##############################################
    async EmailVerification(req, res) {

        try {

            const { id } = verify(req.params.id, process.env.JWT_SECRET_KEY)

            const id_check = await UserModel.checkuserId(id);
            if (id_check.access == 1) {
                if (id_check['response']['IsVerify'] == 0) {
                    const nModified = await UserModel.update(id)

                    if (nModified == 1) {

                        var default_img =process.env.client_url+'/posts/images/default.jpg';
                        var datas = {
                            "User_Id":id_check.response['Id'],
                            "username":id_check.response['Name'],
                            "Email":id_check.response['Email'],
                            "full_name":id_check.response['Name'],
                            "bio":"",
                            "profile_picture_url":default_img,
                            "created_at":new Date(),
                            "last_login":new Date(),
                        }

                        const profilests = await UserModel.createprofile(datas)
                        if (profilests == 1) {
                            console.log('Email verify Success')
                            res.status(200).send({
                                code: 0,
                                message: 'Email Verify Success'
                            })

                        } else {
                            return res.status(200).send({
                                code: 1,
                                message: 'some thing went wrong'
                            })
                        }

                    } else {
                        res.send({
                            code: 1,
                            message: 'some thing went wrong'
                        })
                    }
                } else {
                    return res.status(200).send({
                        code: 1,
                        message: 'Already verified'
                    })
                }


            } else {
                return res.status(200).send({
                    code: 1,
                    message: 'Invalid User Id'
                })
            }


        } catch (err) {
            console.log(err.message)
        }

    }


}