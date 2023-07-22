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

// Add a new DecorationMappingMaster.
router.post('/', async(req, res) => {
    try {
        console.log(req.body)
        if (req.body.decorationMappingMasterId) {
            const priceSlabCode = await model.TBL_ProductDecorationMappingMaster.update(req.body, {
                where: {
                    decorationMappingMasterId: req.body.decorationMappingMasterId
                }
            });

            res.json({ status: 200, response: 'success', msg: 'product Slab Master data updated successfully.' });

        }

        const data = await model.TBL_ProductDecorationMappingMaster.findAll({
            where: {
                productId: req.body.productId,
                decorationTypeCodeId: req.body.decorationTypeCodeId

            }
        })
        if (data && data.length > 0) {
            res.json({ status: 401, response: 'validationerror', msg: 'DecorationType already exists.' });
        } else {

            const inData = await model.TBL_ProductDecorationMappingMaster.create(req.body);

            if (req.body.priceSlab) {

                for (var k = 0; k < req.body.priceSlab.length; k++) {
                    req.body.priceSlab[k].decorationMappingMasterId = inData.decorationMappingMasterId;
                    req.body.priceSlab[k].priceSlabCodeId = parseInt(req.body.priceSlab[k].priceSlabCodeId);
                    // req.body.priceSlab[k].productPrice = req.body.productPrice
                }

                console.log(req.body.priceSlab)

                const ProductSlab = await model.TBL_ProductSlabMappingMaster.bulkCreate(req.body.priceSlab);

            }

            res.json({ status: 200, response: 'success', msg: 'product Slab has been added.', decorationMappingMasterId: inData.decorationMappingMasterId });
        }

    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all productSlabMaster list.
router.post('/getDecorationMappingMasterList', async(req, res) => {
    try {
        const data = await model.TBL_ProductDecorationMappingMaster.findAll({
            where: req.body,
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
                {
                    model: model.TBL_ProductSlabMappingMaster,
                    as: 'productSlab',
                    attributes: ['productSlabMasterId', 'decorationMappingMasterId', 'priceSlabCodeId', 'price'],
                    include: [{
                        model: model.TBL_PriceSlabCode,
                        as: 'Slab',
                        attributes: ['priceSlabCodeId', 'minSlab', 'maxSlab']
                    }]
                }
            ]
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

// delete a DecorationMappingMaster.
router.post('/deleteDecorationMappingMaster', async(req, res) => {
    try {
        await model.TBL_ProductSlabMappingMaster.destroy({
            where: {
                decorationMappingMasterId: req.body.decorationMappingMasterId
            }
        });
        const productSlabMasterDlt = await model.TBL_ProductDecorationMappingMaster.destroy({
            where: {
                decorationMappingMasterId: req.body.decorationMappingMasterId
            }
        });

        res.json({ status: 200, response: 'success', msg: 'product Slab Master has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;