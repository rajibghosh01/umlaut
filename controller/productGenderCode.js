const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
var sequelize = require('sequelize'); //sequelize module import

// var config = require('../config/config.json')

// const multer = require('multer');
// const path = require('path');
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "./uploads/");
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//     },
// });

// var upload = multer({ storage: storage });

// var uploadMultiple = upload.fields([{ name: 'thumbnailImage', maxCount: 10 }, { name: 'zoomImage', maxCount: 10 }, { name: 'image', maxCount: 10 }])



// Add a new productColorCode.
router.post('/', async(req, res) => {
    try {

        console.log(req.body)

        if (typeof req.body.serial === 'undefined' || req.body.serial == '' || req.body.serial == null) {

            const maxSerial = await model.TBL_ProductGenderCode.findAll({
                // attributes: [sequelize.fn("MAX", sequelize.col("serial")), 'maxSerial'],
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('serial')), 'maxSerial']
                ],
                raw: true
            });

            // console.log(maxSerial[0].maxSerial)

            req.body.serial = maxSerial[0].maxSerial + 1;
        }
        if (req.body.productGenderCodeId) {

            if (req.body.categories) {
                await model.TBL_GenderCategoryMaping.destroy({
                    where: {
                        productGenderCodeId: req.body.productGenderCodeId
                    }
                });
                for (var i = 0; i < req.body.categories.length; i++) {
                    req.body.categories[i].productGenderCodeId = req.body.productGenderCodeId
                }
                // console.log(req.body.categories);

                await model.TBL_GenderCategoryMaping.bulkCreate(req.body.categories);

            }
            req.body.serial = req.body.serial;
            const productColorCode = await model.TBL_ProductGenderCode.update(req.body, {
                where: {
                    productGenderCodeId: req.body.productGenderCodeId
                }
            });
            console.log(productColorCode);
            res.json({ status: 200, response: 'success', msg: 'productColorCode data updated successfully.' });

        }
        req.body.isActive = 1;

        const inData = await model.TBL_ProductGenderCode.create(req.body);

        if (req.body.categories) {


            console.log(req.body.categories)

            // req.body.colorAndCategory = JSON.parse(req.body.colorAndCategory);

            for (var i = 0; i < req.body.categories.length; i++) {
                req.body.categories[i].productGenderCodeId = inData.productGenderCodeId
            }
            console.log(req.body.categories);

            const data = await model.TBL_GenderCategoryMaping.bulkCreate(req.body.categories);
        }
        res.json({ status: 200, response: 'success', msg: 'productColorCode has been added.', productGenderCodeId: inData.productGenderCodeId });


    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all productColorCode list.
router.post('/getProductGenderCodeList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ProductGenderCode.findAll({
            where: req.body,
            include: [{
                model: model.TBL_GenderCategoryMaping,
                as: 'genderCategoryMaping',
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

// delete a productColorCode.
router.post('/deleteProductGenderCode', async(req, res) => {
    try {
        const productGenderCode = await model.TBL_ProductGenderCode.destroy({
            where: {
                productGenderCodeId: req.body.productGenderCodeId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'productColorCode has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json({...errResBody, error });
    }
});

module.exports = router;