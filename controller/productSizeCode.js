const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
var sequelize = require('sequelize'); //sequelize module import

router.post('/', async(req, res) => {
    try {
        console.log(req.body);
        if (typeof req.body.serial === 'undefined' || req.body.serial == '' || req.body.serial == null) {

            const maxSerial = await model.TBL_ProductSizeCode.findAll({
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('serial')), 'maxSerial']
                ],
                raw: true
            });

            req.body.serial = maxSerial[0].maxSerial + 1;
        }
        if (req.body.productSizeCodeId) {

            console.log('req.body.productSizeCodeId');
            console.log(req.body.productSizeCodeId);
            if (req.body.sizes) {
                await model.TBL_SizeCategoryMaping.destroy({
                    where: {
                        productSizeCodeId: req.body.productSizeCodeId
                    }
                });

                for (var i = 0; i < req.body.sizes.length; i++) {
                    req.body.sizes[i].productSizeCodeId = req.body.productSizeCodeId
                }

                await model.TBL_SizeCategoryMaping.bulkCreate(req.body.sizes);

            }
            req.body.serial = req.body.serial;
            await model.TBL_ProductSizeCode.update(req.body, {
                where: {
                    productSizeCodeId: req.body.productSizeCodeId
                }
            });


            res.json({ status: 200, response: 'success', msg: 'productSizeCode data updated successfully.' });

        }

        const inData = await model.TBL_ProductSizeCode.create(req.body);

        if (req.body.sizes) {

            for (var i = 0; i < req.body.sizes.length; i++) {
                req.body.sizes[i].productSizeCodeId = inData.productSizeCodeId
            }

            await model.TBL_SizeCategoryMaping.bulkCreate(req.body.sizes);
        }

        res.json({ status: 200, response: 'success', msg: 'productSizeCode has been added.', productSizeCodeId: inData.productSizeCodeId });

    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all productSizeCode list.
router.post('/getproductSizeCodeList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ProductSizeCode.findAll({
            where: req.body,
            include: [{
                model: model.TBL_SizeCategoryMaping,
                as: 'SizeCategoryMaping',
                // attributes: ['sizeName', 'sizeCode', 'productSizeCodeId'],
                // required: true
                include: [{
                    model: model.TBL_MainCategory,
                    as: 'mainCategory'
                }]
            }]

        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// delete a productSizeCode.
router.post('/deleteproductSizeCode', async(req, res) => {
    try {
        const productSizeCodeDlt = await model.TBL_ProductSizeCode.destroy({
            where: {
                productSizeCodeId: req.body.productSizeCodeId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'productSizeCode has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json({...errResBody, error });
    }
});

module.exports = router;