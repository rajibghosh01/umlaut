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
        if (req.body.productSlabMasterId) {
            const priceSlabCode = await model.TBL_ProductSlabMappingMaster.update(req.body, {
                where: {
                    productSlabMasterId: req.body.productSlabMasterId
                }
            });

            res.json({ status: 200, response: 'success', msg: 'product Slab Master data updated successfully.' });

        }

        if (req.body.priceSlab) {

            for (var k = 0; k < req.body.priceSlab.length; k++) {
                req.body.priceSlab[k].decorationMappingMasterId = req.body.decorationMappingMasterId;
                req.body.priceSlab[k].priceSlabCodeId = parseInt(req.body.priceSlab[k].priceSlabCodeId);
                // req.body.priceSlab[k].productPrice = req.body.productPrice
            }

            console.log(req.body.priceSlab)

            const ProductSlab = await model.TBL_ProductSlabMappingMaster.bulkCreate(req.body.priceSlab);

        }

        res.json({ status: 200, response: 'success', msg: 'product Slab Master has been added.' });


    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all productSlabMaster list.
router.post('/getProductSlabMasterList', async(req, res) => {
    try {
        const data = await model.TBL_ProductSlabMappingMaster.findAll({
            where: req.body,
            include: [{
                    model: model.TBL_ProductDecorationMappingMaster,
                    as: 'productDecoration',
                    attributes: ['productId', 'decorationTypeCodeId', 'decorationMappingMasterId'],
                    include: [{
                            model: model.TBL_Product,
                            as: 'product',
                            attributes: ['productId', 'productName', 'code']
                        },
                        {
                            model: model.TBL_ProductDecorationTypeCode,
                            as: 'decorationType',
                            attributes: ['decorationTypeCodeId', 'decorationTypeName'],
                        },
                    ]
                },
                {
                    model: model.TBL_PriceSlabCode,
                    as: 'Slab',
                    attributes: ['priceSlabCodeId', 'minSlab', 'maxSlab']
                },

            ]
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
// Get all productSlabMaster list.
router.post('/getProductDecorationTypeCodeList', async(req, res) => {
    try {
        const data = await model.TBL_ProductDecorationTypeCode.findAll({
            where: req.body,
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

// delete a productSlabMaster.
router.post('/updateProductSlabMaster', async(req, res) => {
    try {
        await model.TBL_ProductSlabMappingMaster.update(req.body, {
            where: {
                productSlabMasterId: req.body.productSlabMasterId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'product Slab Master data updated successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});
router.post('/deleteproductSlabMaster', async(req, res) => {
    try {
        const productSlabMasterDlt = await model.TBL_ProductSlabMappingMaster.destroy({
            where: {
                productSlabMasterId: req.body.productSlabMasterId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'product Slab Master has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;