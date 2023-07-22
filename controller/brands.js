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

// var uploadMultiple = upload.fields([{ name: 'image', maxCount: 10 }])

// Add a new brand.
router.post('/', async(req, res) => {
    try {
        if (typeof req.body.serial === 'undefined' || req.body.serial == '' || req.body.serial == null) {

            const maxSerial = await model.TBL_Brands.findAll({
                // attributes: [sequelize.fn("MAX", sequelize.col("serial")), 'maxSerial'],
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('serial')), 'maxSerial']
                ],
                raw: true
            });

            console.log(maxSerial[0].maxSerial)

            req.body.serial = maxSerial[0].maxSerial + 1;
        }
        if (req.body.brandId) {
            const product = await model.TBL_Brands.update(req.body, {
                where: {
                    brandId: req.body.brandId
                }
            });

            res.json({ status: 200, response: 'success', msg: 'Brand data updated successfully.' });

        }
        req.body.isActive = 1;
        const inData = await model.TBL_Brands.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Brand has been added.', brandId: inData.brandId });


    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all Brands list.
router.post('/getBrandsList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Brands.findAll({
            where: req.body
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

// update specific brand data.
router.post('/updateBrand', async(req, res) => {
    try {
        const brand = await model.TBL_Brands.update(req.body, {
            where: {
                brandId: req.body.brandId
            }
        });
        console.log(brand);
        res.json({ status: 200, response: 'success', msg: 'Brand data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a brand.
router.post('/deleteBrand', async(req, res) => {
    try {
        const brandDlt = await model.TBL_Brands.destroy({
            where: {
                brandId: req.body.brandId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Brand has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;