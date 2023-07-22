const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
const nodemailer = require('nodemailer');
const uuid = require('uuid');

const { Console } = require('console');

// Add a new Subscribe.
router.post('/', async(req, res) => {
    try {
        if (req.body.subscribeId) {
            const category = await model.TBL_Subscribe.update(req.body, {
                where: {
                    subscribeId: req.body.subscribeId
                }
            });
            res.json({ status: 200, response: 'success', msg: 'Subscribe data updated successfully.', subscribeId: req.body.subscribeId });
        }
        const data = await model.TBL_Subscribe.findAll({
            where: {
                emailId: req.body.emailId
            },

        });
        if (typeof req.body.emailId === 'undefined' || req.body.emailId == '' || req.body.emailId == null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter emailId.' });
            return false;
        }
        if (data && data.length > 0) {
            res.json({ status: 200, response: 'validationerror', msg: 'You already Subscribed.' });
        } else {
            const inData = await model.TBL_Subscribe.create(req.body);
            res.json({ status: 200, response: 'success', msg: 'Subscribe has been added.', subscribeId: inData.subscribeId });
        }
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all Subscribe list.
router.post('/getSubscribeList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Subscribe.findAll({
            where: req.body,

        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// delete a Subscribe.
router.post('/deleteSubscribe', async(req, res) => {
    try {

        console.log(req.body)

        const subCategoryDlt = await model.TBL_Subscribe.destroy({
            where: {
                subscribeId: req.body.subscribeId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Subscribe has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});



module.exports = router;