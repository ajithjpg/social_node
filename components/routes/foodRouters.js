const express = require('express')

require("dotenv").config()

const router = express.Router({ mergeParams: true })

router.get('/:type', async (req, res) => {
    var datas = [];


    try {
        datas = require('../food/' + req.params.type + '.json');
    } catch {
        datas = [];
    }

    return res.send({
        'code': 0,
        "message": "",
        "data": datas
    })
})

module.exports = router