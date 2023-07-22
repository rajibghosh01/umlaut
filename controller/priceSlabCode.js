const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
var sequelize = require('sequelize'); //sequelize module import
// var config = require('../config/config.json')

require('dotenv').config();

const env = process.env.NODE_ENV || 'local'; //process env or DEVELOPMENT in default.
const config = require("../config/config.json")[env];
console.log(env);

// Add a new priceSlabCode.
router.post('/', async(req, res) => {
    try {
        // if (typeof req.body.serial === 'undefined' || req.body.serial == '' || req.body.serial == null) {

        //     const maxSerial = await model.TBL_Brands.findAll({
        //         // attributes: [sequelize.fn("MAX", sequelize.col("serial")), 'maxSerial'],
        //         attributes: [
        //             [sequelize.fn('MAX', sequelize.col('serial')), 'maxSerial']
        //         ],
        //         raw: true
        //     });

        //     console.log(maxSerial[0].maxSerial)

        //     req.body.serial = maxSerial[0].maxSerial + 1;
        // }
        if (req.body.priceSlabCodeId) {
            const priceSlabCode = await model.TBL_PriceSlabCode.update(req.body, {
                where: {
                    priceSlabCodeId: req.body.priceSlabCodeId
                }
            });

            res.json({ status: 200, response: 'success', msg: 'Price Slab Code data updated successfully.' });

        }
        const inData = await model.TBL_PriceSlabCode.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Price Slab Code has been added.', priceSlabCodeId: inData.priceSlabCodeId });


    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all priceSlabCode list.
router.post('/getPriceSlabCodeList', async(req, res) => {
    try {
        const data = await model.TBL_PriceSlabCode.findAll({
            where: req.body
        });
        res.json({
            status: 200,
            response: 'success',
            data: data || []
        });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a priceSlabCode.
router.post('/deletePriceSlabCode', async(req, res) => {
    try {
        const priceSlabCodeDlt = await model.TBL_PriceSlabCode.destroy({
            where: {
                priceSlabCodeId: req.body.priceSlabCodeId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Price Slab Code has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;