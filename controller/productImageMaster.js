const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
const env = process.env.NODE_ENV || 'local'; //process env or DEVELOPMENT in default.
const config = require("../config/config.json")[env];
const nodemailer = require('nodemailer');
const uuid = require('uuid');

const { Console } = require('console');
// const multer = require('multer');
// const path = require('path');
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "./uploads");
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     },
// });

// var upload = multer({ storage: storage });

// var uploadMultiple = upload.fields([{ name: 'image', maxCount: 10 }])

// Add a new productImageMaster.
router.post('/', async(req, res) => {
    try {
        if (req.body.productImageMasterId) {
            req.body.image = req.body.image;
            const category = await model.TBL_ProductImageMaster.update(req.body, {
                where: {
                    productImageMasterId: req.body.productImageMasterId
                }
            });
            res.json({ status: 200, response: 'success', msg: 'product image master data updated successfully.' });
        }
        const data = await model.TBL_ProductImageMaster.findAll({
            where: {
                productId: req.body.productId,
                defaultPicture: 1
            }
        });
        if (data && data.length > 0) {
            for (var k = 0; k < req.body.images.length; k++) {
                req.body.images[k].productId = parseInt(req.body.productId)
                req.body.images[k].imageTypeCodeId = req.body.imageTypeCodeId
                req.body.images[k].defaultPicture = 0;
                // req.body.images[k].image = req.body.image
            }

            console.log(req.body.images)

            const inData = await model.TBL_ProductImageMaster.bulkCreate(req.body.images);

        } else {

            for (var k = 0; k < req.body.images.length; k++) {
                req.body.images[k].productId = parseInt(req.body.productId)
                req.body.images[k].imageTypeCodeId = req.body.imageTypeCodeId
                req.body.images[0].defaultPicture = 1;
                // req.body.images[k].image = req.body.image
            }

            console.log(req.body.images)

            const inData = await model.TBL_ProductImageMaster.bulkCreate(req.body.images);

        }
        // if (req.files) {
        //     req.body.image = req.files.image[0].filename;
        // }
        // const inData = await model.TBL_ProductImageMaster.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'image type has been added.' });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// Get all productImageMaster list.
router.post('/getproductImageMasterList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ProductImageMaster.findAll({
            where: req.body,
            include: [{
                model: model.TBL_Product,
                as: 'product'
            }]
        });
        res.json({
            status: 200,
            response: 'success',
            // api_static_url: config.api_static_url,
            data: data || []
        });
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

// delete a productImageMaster.
router.post('/deleteproductImageMaster', async(req, res) => {
    try {
        const productImageMasterDlt = await model.TBL_ProductImageMaster.destroy({
            where: {
                productImageMasterId: req.body.productImageMasterId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'product image master has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});



module.exports = router;