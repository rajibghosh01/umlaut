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

// Add a new category.
router.post('/', async(req, res) => {
    try {
        if (typeof req.body.serial === 'undefined' || req.body.serial == '' || req.body.serial == null) {

            const maxSerial = await model.TBL_MainCategory.findAll({
                // attributes: [sequelize.fn("MAX", sequelize.col("serial")), 'maxSerial'],
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('serial')), 'maxSerial']
                ],
                raw: true
            });

            req.body.serial = maxSerial[0].maxSerial + 1;
        }
        if (req.body.mainCategoryId) {

            await model.TBL_MainCategory.update(req.body, {
                where: {
                    mainCategoryId: req.body.mainCategoryId
                }
            });

            res.json({ status: 200, response: 'success', msg: 'Category data updated successfully.', mainCategoryId: req.body.mainCategoryId });
        }

        const inData = await model.TBL_MainCategory.create(req.body);

        res.json({ status: 200, response: 'success', msg: 'Category has been added.', mainCategoryId: inData.mainCategoryId });

    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

//Get all category list.
router.post('/categoryList', async(req, res) => {
    try {

        console.log(req.body)
            // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_MainCategory.findAll({
            where: req.body,
            include: [{
                model: model.TBL_SubCategory,
                as: 'subCategory',
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
        console.log(error);
        res.json(errResBody);
    }
});

// //Get specific category details.
// router.post('/:mainCategoryId', async(req, res) => {
//     try {
//         const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
//         const data = await model.TBL_MainCategory.findOne({
//             where: {
//                 mainCategoryId: req.params.mainCategoryId
//             },
//             include: include
//         });
//         res.json({ status: 200, response: 'success', data: data || {} });
//     } catch (error) {
//         res.json(errResBody);
//     }
// });

// update specific category data.
router.put('/:mainCategoryId', async(req, res) => {
    try {

        await model.TBL_MainCategory.update(req.body, {
            where: {
                mainCategoryId: req.params.mainCategoryId
            }
        });

        res.json({ status: 200, response: 'success', msg: 'Category data updated successfully.' });

    } catch (error) {
        res.json(errResBody);
    }
});

// delete a category.
router.delete('/:mainCategoryId', async(req, res) => {
    try {
        await model.TBL_SubCategory.destroy({
            where: {
                mainCategoryId: req.params.mainCategoryId
            }
        });
        await model.TBL_MainCategory.destroy({
            where: {
                mainCategoryId: req.params.mainCategoryId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Category has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;