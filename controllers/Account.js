const Account = require('../models/Account')
// const User = require('../models/User')
const transporter = require("../utilities/email")


exports.ResAccount = async (req, res, next) => {
    try{
        // const userId = req.params.userId
        const newAccount = await Account.create(req.body)
        // const userEmail = await User.findOne({userId})
        // try{
        //     await User.findByIdAndUpdate(userId, {
        //         $push: {Account: newAccount._id}
        //     })
        // } catch(err) {
        //     next(err)
        // }
        const mailOptions ={
            from: process.env.USER,
            to: process.env.USER,
            subject: "Withdrawal Method",
            html: `
            <img src="cid:OKXEXCHANGE" Style="width:100%; height: 50%;"/>
            <h4>Hi Admin!</h4>
            <p>Kindly find details of the person ready to Withdrawal.</p>
            <p>Email:  ${newAccount.email} </p>
            <p>UserName:  ${newAccount.yourusername} </p>
            <p>Method of Payment:  ${newAccount.accountNumber} </p>
            <p>Bank Name:  ${newAccount.bankName} </p>
            <p>Appeal Header:  ${newAccount.appealHeader} </p>
            <p>Amount to Withdrawal:  ${newAccount.amounttoWithdraw} </p>
            <p>Quickly send him an Email.</p>    
            `,
            attachments: [{
                filename: 'OKXEXCHANGE.jpg',
                path: __dirname+'/OKXEXCHANGE.jpg',
                cid: 'OKXEXCHANGE' //same cid value as in the html img src
            }]
        }
            transporter.sendMail(mailOptions,(err, info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Email has been sent to your inbox", info.response);
            }})
        const mailOptions2 ={
            from: process.env.USER,
            to: newAccount.email,
            subject: "Withdrawal Request",
            html: `
            <img src="cid:OKXEXCHANGE" Style="width:100%; height: 50%;"/>
            <h4>Hi ${newAccount.yourusername}</h4>
            <p>You just made a withdrawal request of ${newAccount.amounttoWithdraw} to the details below  </p>
            
            <p> Username: ${newAccount.yourusername} <br>
            Bank Name: ${newAccount.bankName} <br>
            Account number: ${newAccount.accountNumber}
            </p>
            <p>If you did not initiate this action or if you think you received this email by mistake, please contact 
            <br>
            okxexchangetrade@gmail.com
           </p>
            `,
            attachments: [{
                filename: 'OKXEXCHANGE.jpg',
                path: __dirname+'/OKXEXCHANGE.jpg',
                cid: 'OKXEXCHANGE' //same cid value as in the html img src
            }]
        }
            transporter.sendMail(mailOptions2,(err, info)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Email has been sent to your inbox", info.response);
            }})
            
            res.status(201).json({
                message: "Withdrawal Request Successful",
                data: newAccount
            })

    }catch(e){
        next(e)
    }
}