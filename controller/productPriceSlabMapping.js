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

// Add a new productSlabMaster.
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

        console.log(req.body)
        if (req.body.productPriceSlabId) {
            const priceSlabCode = await model.TBL_ProductPriceSlabMapping.update(req.body, {
                where: {
                    productPriceSlabId: req.body.productPriceSlabId
                }
            });

            res.json({ status: 200, response: 'success', msg: 'product Slab data updated successfully.' });

        }

        if (req.body.priceSlab) {

            for (var k = 0; k < req.body.priceSlab.length; k++) {
                req.body.priceSlab[k].productId = req.body.productId;

            }
            await model.TBL_ProductPriceSlabMapping.bulkCreate(req.body.priceSlab);
        }

        res.json({ status: 200, response: 'success', msg: 'product Slab has been added.' });


    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all productPriceSlab list.
router.post('/getProductPriceSlabList', async(req, res) => {
    try {
        const data = await model.TBL_ProductPriceSlabMapping.findAll({
            where: req.body,
            include: [{
                model: model.TBL_Product,
                as: 'product',
                attributes: ['productId', 'productName', 'code']
            }]

        });
        res.json({
            status: 200,
            response: 'success',
            data: data || []
        });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// delete a productPriceSlab.
router.post('/updateProductPriceSlab', async(req, res) => {
    try {
        await model.TBL_ProductPriceSlabMapping.update(req.body, {
            where: {
                productPriceSlabId: req.body.productPriceSlabId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'product Slab data updated successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});
router.post('/deleteProductPriceSlab', async(req, res) => {
    try {
        const productSlabDlt = await model.TBL_ProductPriceSlabMapping.destroy({
            where: {
                productPriceSlabId: req.body.productPriceSlabId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'product Slab has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;