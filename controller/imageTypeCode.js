const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
const nodemailer = require('nodemailer');
const uuid = require('uuid');

const { Console } = require('console');

// Add a new imageTypeCode.
router.post('/', async(req, res) => {
    try {
        if (req.body.imageTypeCodeId) {
            const category = await model.TBL_ImageTypeCode.update(req.body, {
                where: {
                    imageTypeCodeId: req.body.imageTypeCodeId
                }
            });
            res.json({ status: 200, response: 'success', msg: 'image type data updated successfully.', imageTypeCodeId: req.body.imageTypeCodeId });
        }
        const inData = await model.TBL_ImageTypeCode.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'image type has been added.', imageTypeCodeId: inData.imageTypeCodeId });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all imageTypeCode list.
router.post('/getimageTypeCodeList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ImageTypeCode.findAll({
            where: req.body,

        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// delete a imageTypeCode.
router.delete('/deleteimageTypeCode', async(req, res) => {
    try {
        const imageTypeCodeDlt = await model.TBL_ImageTypeCode.destroy({
            where: {
                imageTypeCodeId: req.body.imageTypeCodeId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'image type has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});



module.exports = router;