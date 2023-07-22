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



// var uploadMultiple = upload.fields([{ name: 'bigimage', maxCount: 10 }])

// Add a new banner.
router.post('/', async(req, res) => {
    try {
        if (typeof req.body.serial === 'undefined' || req.body.serial == '' || req.body.serial == null) {

            const maxSerial = await model.TBL_Homebanner.findAll({
                // attributes: [sequelize.fn("MAX", sequelize.col("serial")), 'maxSerial'],
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('serial')), 'maxSerial']
                ],
                raw: true
            });

            console.log(maxSerial[0].maxSerial)

            req.body.serial = maxSerial[0].maxSerial + 1;
        }
        if (req.body.bannerId) {
            // if (req.files.bigimage) {
            //     if (req.files) {
            //         req.body.bigimage = req.files.bigimage[0].filename;
            //     }
            // }

            const product = await model.TBL_Homebanner.update(req.body, {
                where: {
                    bannerId: req.body.bannerId
                }
            });
            console.log(product);
            res.json({ status: 200, response: 'success', msg: 'banner updated successfully.' });

        }
        // req.body.isActive = 1;
        // if (req.files) {
        //     req.body.bigimage = req.files.bigimage[0].filename;
        // }
        console.log(req.body);
        const inData = await model.TBL_Homebanner.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'banner has been added.', bannerId: inData.bannerId });


    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all banner list.
router.post('/BannersList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Homebanner.findAll({
            where: req.body,
            include: [{
                model: model.TBL_MainCategory,
                as: 'mainCategory',
                include: [{
                    model: model.TBL_Product,
                    as: 'product'
                }]
            }]
        });
        res.json({
            status: 200,
            response: 'success',
            // api_static_url: config.api_static_url, 
            data: data || []
        });
    } catch (error) {
        res.json(errResBody);
    }
});

// update specific banner data.
router.post('/updateBanner', async(req, res) => {
    try {
        const brand = await model.TBL_Homebanner.update(req.body, {
            where: {
                bannerId: req.body.bannerId
            }
        });
        console.log(brand);
        res.json({ status: 200, response: 'success', msg: 'banner data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a banner.
router.post('/deleteBanner', async(req, res) => {
    try {
        const brandDlt = await model.TBL_Homebanner.destroy({
            where: {
                bannerId: req.body.bannerId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'banner has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;