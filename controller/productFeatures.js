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

// Add a new product Feature.
router.post('/', async(req, res) => {
    try {
        if (typeof req.body.serial === 'undefined' || req.body.serial == '' || req.body.serial == null) {

            const maxSerial = await model.TBL_ProductFeatures.findAll({
                // attributes: [sequelize.fn("MAX", sequelize.col("serial")), 'maxSerial'],
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('serial')), 'maxSerial']
                ],
                raw: true
            });

            console.log(maxSerial[0].maxSerial)

            req.body.serial = maxSerial[0].maxSerial + 1;
        }
        if (req.body.productFeaturesId) {
            const product = await model.TBL_ProductFeatures.update(req.body, {
                where: {
                    productFeaturesId: req.body.productFeaturesId
                }
            });
            console.log(product);
            res.json({ status: 200, response: 'success', msg: 'Feature info updated successfully.' });

        }
        const inData = await model.TBL_ProductFeatures.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Product feature has been added.', productFeaturesId: inData.productFeaturesId });


    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all Blogs list.
router.post('/getFeatureList', async(req, res) => {
    try {
        const data = await model.TBL_ProductFeatures.findAll({
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

// update specific Blog data.
router.post('/updateFeatureInfo', async(req, res) => {
    try {
        const Blog = await model.TBL_ProductFeatures.update(req.body, {
            where: {
                productFeaturesId: req.body.productFeaturesId
            }
        });
        console.log(Blog);
        res.json({ status: 200, response: 'success', msg: 'Feature data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a Blog.
router.post('/deleteFeatureInfo', async(req, res) => {
    try {
        const BlogDlt = await model.TBL_ProductFeatures.destroy({
            where: {
                productFeaturesId: req.body.productFeaturesId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Feature info has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;