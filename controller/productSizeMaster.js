const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

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



// Add a new productSizeMaster.
router.post('/', async(req, res) => {
    try {
        if (req.body.productSizeMasterId) {

            const productSizeMaster = await model.TBL_ProductSizeMaster.update(req.body, {
                where: {
                    productSizeMasterId: req.body.productSizeMasterId
                }
            });
            console.log(productSizeMaster);
            res.json({ status: 200, response: 'success', msg: 'productSizeMaster data updated successfully.' });

        } else {
            req.body.isActive = 1;
            const inData = await model.TBL_ProductSizeMaster.create(req.body);
            res.json({ status: 200, response: 'success', msg: 'productSizeMaster has been added.', productSizeMasterId: inData.productSizeMasterId });
        }

    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all productSizeMaster list.
router.post('/getproductSizeMasterList', async(req, res) => {
    try {
        // const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_ProductSizeMaster.findAll({
            where: req.body,
            // include: [{
            //         model: model.TBL_MainCategory,
            //         as: 'mainCategory'
            //     },
            //     {
            //         model: model.TBL_SubCategory,
            //         as: 'subCategory'
            //     }
            // ]

        });
        res.json({ status: 200, response: 'success', data: data || [] });
    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// delete a productSizeMaster.
router.post('/deleteproductSizeMaster', async(req, res) => {
    try {
        const productSizeMasterDlt = await model.TBL_ProductSizeMaster.destroy({
            where: {
                productSizeMasterId: req.body.productSizeMasterId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'productSizeMaster has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json({...errResBody, error });
    }
});


module.exports = router;