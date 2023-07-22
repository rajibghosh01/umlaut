const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
// var config = require('../config/config.json')
require('dotenv').config();

const env = process.env.NODE_ENV || 'local'; //process env or DEVELOPMENT in default.
const config = require("../config/config.json")[env];
console.log(env);

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

// var uploadMultiple = upload.fields([{ name: 'blogImage', maxCount: 10 }])


// Add a new Blog.
router.post('/', async(req, res) => {
    try {
        if (typeof req.body.serial === 'undefined' || req.body.serial == '' || req.body.serial == null) {

            const maxSerial = await model.TBL_Blog.findAll({
                // attributes: [sequelize.fn("MAX", sequelize.col("serial")), 'maxSerial'],
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('serial')), 'maxSerial']
                ],
                raw: true
            });

            console.log(maxSerial[0].maxSerial)

            req.body.serial = maxSerial[0].maxSerial + 1;
        }
        if (req.body.blogId) {
            const product = await model.TBL_Blog.update(req.body, {
                where: {
                    blogId: req.body.blogId
                }
            });
            console.log(product);
            res.json({ status: 200, response: 'success', msg: 'Blog data updated successfully.' });

        }
        const inData = await model.TBL_Blog.create(req.body);
        res.json({ status: 200, response: 'success', msg: 'Blog has been added.', blogId: inData.blogId });


    } catch (error) {
        console.log(error);
        res.json({...errResBody, error });
    }
});

// Get all Blogs list.
router.post('/getBlogsList', async(req, res) => {
    try {
        const data = await model.TBL_Blog.findAll({
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

// update specific Blog data.
router.post('/updateBlog', async(req, res) => {
    try {
        const Blog = await model.TBL_Blog.update(req.body, {
            where: {
                blogId: req.body.blogId
            }
        });
        console.log(Blog);
        res.json({ status: 200, response: 'success', msg: 'Blog data updated successfully.' });
    } catch (error) {
        res.json(errResBody);
    }
});

// delete a Blog.
router.post('/deleteBlog', async(req, res) => {
    try {
        const BlogDlt = await model.TBL_Blog.destroy({
            where: {
                blogId: req.body.blogId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Blog has been deleted successfully.' });
    } catch (error) {
        console.log(error)
        res.json(errResBody);
    }
});

module.exports = router;