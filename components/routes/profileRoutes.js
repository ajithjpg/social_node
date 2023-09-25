const express = require('express')
const router = express.Router({ mergeParams: true })
const {getprofile} = require('../controller/profilecontroller')


router.get('/:userId',getprofile)

module.exports = router