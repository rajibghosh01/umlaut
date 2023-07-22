const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };




// Add a new productColorMaster.
// router.post('/', uploadMultiple, async(req, res) => {
router.post('/', async(req, res) => {
    try {
        if (req.body.productColorMasterId) {

            const productColorMaster = await model.TBL_ProductColorMaster.update(req.body, {
                where: {
                    productColorMasterId: req.body.productColorMasterId
                }
            });

            console.log(productColorMaster);

            if (req.body.images) {

                for (var k = 0; k < req.body.images.length; k++) {
                    req.body.images[k].productColorMasterId = req.body.productColorMasterId
                    req.body.images[k].productId = req.body.productId
                    req.body.images[k].imageTypeCodeId = req.body.imageTypeCodeId
                }

                console.log(req.body.images)

                await model.TBL_ProductImageMaster.bulkCreate(req.body.images);

            }

            if (req.body.sizes) {

                for (var i = 0; i < req.body.sizes.length; i++) {
                    req.body.sizes[i].productColorMasterId = req.body.productColorMasterId
                }

                await model.TBL_ProductSizeMaster.bulkCreate(req.body.sizes);
            }


            res.json({ status: 200, response: 'success', msg: 'productColorMaster data updated successfully.' });
        } else {

            console.log(req.body);
            const inData = await model.TBL_ProductColorMaster.create(req.body);

            const data = await model.TBL_ProductImageMaster.findAll({
                where: {
                    productId: req.body.productId,
                    defaultPicture: 1
                }
            });
            if (data && data.length > 0) {
                if (req.body.images) {
                    for (var k = 0; k < req.body.images.length; k++) {
                        req.body.images[k].productColorMasterId = inData.productColorMasterId
                        req.body.images[k].productId = req.body.productId
                        req.body.images[k].defaultPicture = 0;
                        req.body.images[k].imageTypeCodeId = req.body.imageTypeCodeId
                    }
                }
                await model.TBL_ProductImageMaster.bulkCreate(req.body.images);
            } else {



                if (req.body.images) {

                    for (var k = 0; k < req.body.images.length; k++) {
                        req.body.images[k].productColorMasterId = inData.productColorMasterId
                        req.body.images[k].productId = req.body.productId
                        req.body.images[0].defaultPicture = 1;
                        req.body.images[k].imageTypeCodeId = req.body.imageTypeCodeId
                    }
                }

                console.log(req.body.images)

                await model.TBL_ProductImageMaster.bulkCreate(req.body.images);

            }

            // const imageMaster = await model.TBL_ProductImageMaster.create(req.body);

            // req.body.productImageMasterId = imageMaster.productImageMasterId;

            // const inData = await model.TBL_ProductColorMaster.create(req.body);

            if (req.body.sizes) {

                for (var i = 0; i < req.body.sizes.length; i++) {
                    req.body.sizes[i].productColorMasterId = inData.productColorMasterId
                }

                await model.TBL_ProductSizeMaster.bulkCreate(req.body.sizes);
            }
            res.json({ status: 200, response: 'success', msg: 'productColorMaster has been added.', productColorMasterId: inData.productColorMasterId });
        }

    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all productColorMaster list.
router.post('/getproductColorMasterList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ProductColorMaster.findAll({
            where: req.body,
            include: [{
                    model: model.TBL_Product,
                    as: 'product'
                },
                {
                    model: model.TBL_ProductColorCode,
                    as: 'colorCode'
                }
            ]
        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// delete a productColorMaster.
router.post('/deleteproductColorMaster', async(req, res) => {
    try {
        const productColorMasterDlt = await model.TBL_ProductColorMaster.destroy({
            where: {
                productColorMasterId: req.body.productColorMasterId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'productColorMaster has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json({...errResBody, error });
    }
});
// edit productColorMaster.
router.post('/editeproductColorMaster', async(req, res) => {
    try {
        const productColor = await model.TBL_ProductColorMaster.update(req.body, {
            where: {
                productColorMasterId: req.body.productColorMasterId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Color availability status updated successfully.' });
    } catch (error) {
        console.log(error)
        res.json({...errResBody, error });
    }
});


router.post('/deleteproductColorMasterAndSize', async(req, res) => {
    try {
        await model.TBL_ProductImageMaster.destroy({
            where: {
                productColorMasterId: req.body.productColorMasterId
            }
        });
        await model.TBL_ProductSizeMaster.destroy({
            where: {
                productColorMasterId: req.body.productColorMasterId
            }
        });
        const productColorMasterDlt = await model.TBL_ProductColorMaster.destroy({
            where: {
                productColorMasterId: req.body.productColorMasterId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'productColorMaster has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json({...errResBody, error });
    }
});



module.exports = router;