const { create } = require('../models/messageModel')

module.exports = {

    async sendmessage(req, res) {

        console.log(req)
        const date = new Date();
        const formatData = (input) => {
            if (input > 9) {
                return input;
            } else return `0${input}`;
        };

        // Function to convert
        // 24 Hour to 12 Hour clock
        const formatHour = (input) => {
            if (input > 12) {
                return input - 12;
            }
            return input;
        };

        // Data about date
        const format = {
            dd: formatData(date.getDate()),
            mm: formatData(date.getMonth() + 1),
            yyyy: date.getFullYear(),
            HH: formatData(date.getHours()),
            hh: formatData(formatHour(date.getHours())),
            MM: formatData(date.getMinutes()),
            SS: formatData(date.getSeconds()),
        };

        const format12Hour = ({ dd, mm, yyyy, hh, MM, SS }) => {
            return `${mm}/${dd}/${yyyy} ${hh}:${MM}:${SS}`;
        };

        // Time in 24 Hour format
        // Time in 12 Hour format
        const current_date = format12Hour(format);
        console.log(current_date)

        const datas = {
            'SenderID': req.body.SenderID,
            'ReceiverID': req.body.ReceiverID,
            'TIME': current_date,
            'CONTENT': req.body.message,
            'Status': 0,

        }

        const data = await create(datas);
        console.log(data)
        if (data == 1) {
            res.send({
                "code": 0,
                'message': "message send successfully"
            })
        } else {
            res.send({
                "code": 1,
                'message': "something went wrong"
            })
        }

        res.send(req.body)

    }
}

