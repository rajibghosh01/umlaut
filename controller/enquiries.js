const express = require('express');
const router = express.Router();
const model = require('../model');
const nodemailer = require('nodemailer');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
const path = require('path');
const ejs = require('ejs');






// Add a new enquiry.
router.post('/', async(req, res) => {
    try {
        const template = path.join(__dirname, "../view/index.ejs")

        const data = await model.TBL_Settings.findAll({

        });
        let transporter = nodemailer.createTransport({
            host: data[0].host, //"mail.thevocalhub.com",
            port: data[0].port, //587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: data[0].user, //'support@thevocalhub.com',
                pass: data[0].pass //'Debashissaha2@'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: '"Creative Swag Business" ritwik.itv@gmail.com',
            // to: 'mahiruddinseikh@gmail.com',
            to: req.body.emailId,
            cc: 'mahiruddinseikh@gmail.com',

            subject: 'Creative Swag Enquiry',
            html: `Hello ${req.body.fullName},<br><br>
            Thank you for your enquiry. <br>A team member will reach out to you within the next 24 working hours to understand your requirement better. 
            <br>Have a nice day!  <br><br><br>
            Regards,<br>Creative Swag Business`,
            // attachments: [
            //     { filename: 'YGQUTHBM.jpg.png', path: './YGQUTHBM.jpg.png' }
            // ],
        };

        transporter.sendMail(mailOptions, async(error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent:' + info.response);
            }
        });


        const inData = await model.TBL_Enquiries.create(req.body);

        await model.TBL_EnquiryMaster.update({ isActive: 0 }, {
            where: {
                enquiryMasterId: req.body.enquiryMasterId
            }
        });

        const Data = await model.TBL_Enquiries.findAll({
            where: {
                enquirieId: inData.enquirieId
            },
            include: [{
                    model: model.TBL_EnquiryMaster,
                    as: 'enquiryMaster',
                    include: [{
                        model: model.TBL_EnquiryProduct,
                        as: 'enquiryProduct',
                        include: [{
                            model: model.TBL_Product,
                            as: 'product',
                        }]
                    }],
                },
                {
                    model: model.TBL_EnquirieFeedBack,
                    as: 'enquirieFeedBack'
                }
            ]
        });
        let xyz = Data[0].enquiryMaster.enquiryProduct[0].product;
        console.log(xyz);

        const mail = await ejs.renderFile(template, { data: Data, })
            // console.log(data);
            // res.render('index', { data: Data });

        let adminMail = {
            from: '"Creative Swag Business" ritwik.itv@gmail.com',
            to: 'mahiruddinseikh@gmail.com',
            cc: '',
            subject: 'Creative Swag Customer Enquiry',
            html: mail,
            // attachments: [
            //     { filename: 'YGQUTHBM.jpg.png', path: './YGQUTHBM.jpg.png' }
            // ],
        };

        transporter.sendMail(adminMail, async(error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('sent:' + info.response);
            }
        });

        res.json({ status: 200, response: 'success', msg: 'enquiriy has been placed.', enquirieId: inData.enquirieId || {} });


    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

router.post('/getEnquiriesList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Enquiries.findAll({
            where: req.body,
            include: [{
                    model: model.TBL_EnquiryMaster,
                    as: 'enquiryMaster',
                    include: [{
                        model: model.TBL_EnquiryProduct,
                        as: 'enquiryProduct',
                        include: [{
                            model: model.TBL_Product,
                            as: 'product',
                        }]
                    }],
                },
                {
                    model: model.TBL_EnquirieFeedBack,
                    as: 'enquirieFeedBack'
                }
            ]
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

router.post('/deleteEnquiry', async(req, res) => {
    try {
        const createResult = await model.TBL_Enquiries.destroy({
            where: {
                enquirieId: req.body.enquirieId,
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Enquiry has been deleted.' });
    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;