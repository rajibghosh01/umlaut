const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

// get enquiryMasterId.
router.post('/', async(req, res) => {
    try {

        const data = await model.TBL_EnquiryMaster.findAll({
            where: {
                userId: req.body.userId,
                isActive: 1
            },

        });
        if (data && data.length > 0) {
            res.json({ status: 200, response: 'success', msg: 'CartId.', enquiryMasterId: data[0].enquiryMasterId });
        } else {
            const inData = await model.TBL_EnquiryMaster.create({ userId: req.body.userId, isActive: 1 });
            res.json({ status: 200, response: 'success', msg: 'CartId.', enquiryMasterId: inData.enquiryMasterId });
        }
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});



router.post('/getAllEnquiries', async(req, res) => {
    try {
        const data = await model.TBL_EnquiryMaster.findAll({
            where: {
                userId: req.body.userId,
                isActive: 0
            },
            include: [{
                    model: model.TBL_EnquiryProduct,
                    as: 'enquiryProduct',
                    include: [{
                        model: model.TBL_Product,
                        as: 'product',
                    }]
                },
                {
                    model: model.TBL_Enquiries,
                    as: 'enquiries',
                    include: [{
                        model: model.TBL_EnquirieFeedBack,
                        as: 'enquirieFeedBack'
                    }]
                }
            ]

        });
        res.json({ status: 200, response: 'success', data: data || [] });

    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});


module.exports = router;