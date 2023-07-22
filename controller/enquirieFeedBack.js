const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };


router.post('/', async(req, res) => {
    try {
        const createUserResult = await model.TBL_EnquirieFeedBack.create(req.body);

        res.json({ status: 200, response: 'success', msg: 'Enquiry feedback has been saved.', enquirieFeedBackId: createUserResult.enquirieFeedBackId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

router.post('/getEnquiryFeedBack', async(req, res) => {
    try {
        let enquiry = await model.TBL_EnquirieFeedBack.findAll({
            where: req.body,
        });
        res.json({ status: 200, response: 'success', data: enquiry });
    } catch (error) {
        res.json(errResBody);
    }
});

router.post('/updateEnquiryFeedBack', async(req, res) => {
    try {
        let EnquiryFeedBack = await model.TBL_EnquirieFeedBack.update(req.body, {
            where: {
                enquirieFeedBackId: req.body.enquirieFeedBackId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Enquiry feedbac updated successfully.' });
        // console.log(EnquiryFeedBack);
    } catch (error) {
        res.json(errResBody);
    }
});

router.post('/deleteEnquiryFeedBack', async(req, res) => {
    try {
        const createResult = await model.TBL_EnquirieFeedBack.destroy({
            where: {
                enquirieFeedBackId: req.body.enquirieFeedBackId,
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Enquiry feedbac has been deleted.' });
    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;