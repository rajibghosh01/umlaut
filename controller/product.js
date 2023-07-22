const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };
var sequelize = require('sequelize'); //sequelize module import
const { Op } = require('sequelize');
const uuid = require('uuid');

require('dotenv').config();

const env = process.env.NODE_ENV || 'local'; //process env or DEVELOPMENT in default.
const config = require("../config/config.json")[env];

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



// Add a new product.
router.post('/', async (req, res) => {
    try {
        if (req.body.productId) {
            if (typeof req.body.ecoFriendlyCategoryId === 'undefined' || req.body.ecoFriendlyCategoryId === "" || req.body.ecoFriendlyCategoryId === null) {
                req.body.ecoFriendlySubCategoryId = null;
            }

            const product = await model.TBL_Product.update(req.body, {
                where: {
                    productId: req.body.productId
                }
            });
            res.json({ status: 200, response: 'success', msg: 'product data updated successfully.' });

        }
        if (typeof req.body.ecoFriendlyCategoryId === 'undefined' || req.body.ecoFriendlyCategoryId === "" || req.body.ecoFriendlyCategoryId === null) {
            req.body.ecoFriendlySubCategoryId = null;
        }
        if (typeof req.body.code === 'undefined' || req.body.code === "" || req.body.code === null) {
            res.json({ status: 401, response: 'validationerror', msg: 'Please enter product code.' });
        }
        const inData = await model.TBL_Product.create(req.body);

        if (req.body.priceSlab) {

            for (var k = 0; k < req.body.priceSlab.length; k++) {
                req.body.priceSlab[k].productId = inData.productId;

            }
            await model.TBL_ProductPriceSlabMapping.bulkCreate(req.body.priceSlab);
        }
        console.log(req.body.priceSlab);
        // if request body have colors
        // then you have to bulk insert in productColo
        // if (req.body.colors) {

        //     req.body.colors = JSON.parse(req.body.colors);

        //     for (var i = 0; i < req.body.colors.length; i++) {
        //         console.log(req.body.colors[i])

        //         req.body.colors[i].productId = inData.productId

        //     }

        //     const colorMasterData = await model.TBL_ProductColorMaster.bulkCreate(req.body.colors);
        // }

        // if request body have sizes
        // then you have to bulk insert in productSizeMaster
        // if (req.body.sizes) {

        //     req.body.sizes = JSON.parse(req.body.sizes);

        //     for (var i = 0; i < req.body.sizes.length; i++) {
        //         console.log(req.body.sizes[i])

        //         req.body.sizes[i].productId = inData.productId

        //     }

        //     const sizeMasterData = await model.TBL_ProductSizeMaster.bulkCreate(req.body.sizes);
        // }

        res.json({ status: 200, response: 'success', msg: 'product has been added.', productId: inData.productId });
    } catch (error) {
        console.log(error);
        res.json({ ...errResBody, error });
    }
});


// Get all product list for dropdown list.
router.post('/getProductListForDropdown', async (req, res) => {
    try {
        const totalData = await model.TBL_Product.findAll({
            order: [
                ['productId', 'DESC']
            ],
        });

        res.json({
            status: 200,
            response: 'success',
            count: totalData.length,
            data: totalData || []
        });
    } catch (error) {
        console.log(error);
        res.json({ ...errResBody, error });
    }
});

// Get all product list.
router.post('/getProductList', async (req, res) => {
    try {

        var skip = 0;
        var limit = req.body.limit || 12;

        var orderType = 'ASC'

        var pageNumber = req.body.pageNumber || 1;

        if (req.body.pageNumber) {
            skip = (pageNumber - 1) * limit
        }

        // [Op.or]: [{authorId: 12}, {authorId: 13}]

        delete req.body.pageNumber;
        delete req.body.limit;

        if (req.body.mainCategoryId) {

            req.body = {
                ...req.body,
                [Op.or]: [{
                    mainCategoryId: req.body.mainCategoryId
                },
                {
                    ecoFriendlyCategoryId: req.body.mainCategoryId
                },
                {
                    festiveOfferesCategoryId: req.body.mainCategoryId
                }
                ]

            }

            delete req.body.mainCategoryId;
        }

        if (req.body.subCategoryId) {

            req.body = {
                ...req.body,
                [Op.or]: [{
                    subCategoryId: req.body.subCategoryId
                },
                {
                    ecoFriendlySubCategoryId: req.body.subCategoryId
                }
                ]
            }

            delete req.body.subCategoryId;
        }
        if (req.body.orderBy == 0) {
            orderType = 'DESC'
        }

        delete req.body.orderBy;

        const totalData = await model.TBL_Product.findAll({
            where: req.body
        });

        // var pageNumber = totalData.length / limit;

        const data = await model.TBL_Product.findAll({
            where: req.body,
            include: [{
                model: model.TBL_MainCategory,
                as: 'mainCategory',
                include: [{
                    model: model.TBL_SubCategory,
                    as: 'subCategory',

                }]
            },
            {
                model: model.TBL_SubCategory,
                as: 'subCategory'
            },
            {
                model: model.TBL_ProductColorMaster,
                as: 'colors',
                attributes: ['productColorMasterId', 'isActive'],
                include: [{
                    model: model.TBL_ProductColorCode,
                    as: 'colorCode',
                    attributes: ['color']
                },
                {
                    model: model.TBL_ProductImageMaster,
                    as: 'image',
                    attributes: ['image', 'productImageMasterId', 'defaultPicture']
                },
                {
                    model: model.TBL_ProductSizeMaster,
                    as: 'sizes',
                    attributes: ['productSizeMasterId'],
                    include: [{
                        model: model.TBL_ProductSizeCode,
                        as: 'sizeCode',
                        attributes: ['sizeName', 'sizeCode']
                    }]
                }
                ]
            },
            {
                model: model.TBL_ProductImageMaster,
                as: 'image',
                attributes: ['image', 'productImageMasterId', 'defaultPicture']
            },
            {
                model: model.TBL_ProductGenderCode,
                as: 'productGenderCode',
                attributes: ['genderName', 'genderCode', 'productGenderCodeId', 'serial']
            },
            {
                model: model.TBL_ProductPriceSlabMapping,
                as: 'slab',
                attributes: ['productPriceSlabId', 'MOQ', 'price']
            },
            {
                model: model.TBL_ProductFeatures,
                as: 'features',
                attributes: ['productFeaturesId', 'feature', 'icon', 'serial']
            },
            {
                model: model.TBL_ProductShippingReturnsInfo,
                as: 'shippingReturnsInfo',
                attributes: ['productShippingReturnsInfoId', 'info', 'icon', 'serial']
            },
            {
                model: model.TBL_ProductWarrentyInfo,
                as: 'warrentyInfo',
                attributes: ['productWarrentyInfoId', 'info', 'icon', 'serial']
            },
            {
                model: model.TBL_ReviewRating,
                as: 'reviewRatings'
            },
                // {
                //     model: model.TBL_ProductDecorationMappingMaster,
                //     as: 'productDecoration',
                //     attributes: ['productId', 'decorationTypeCodeId', 'decorationMappingMasterId'],
                //     include: [{
                //             model: model.TBL_ProductDecorationTypeCode,
                //             as: 'decorationType',
                //             attributes: ['decorationTypeCodeId', 'decorationTypeName'],
                //         },
                //         {
                //             model: model.TBL_ProductSlabMappingMaster,
                //             as: 'productSlab',
                //             attributes: ['productSlabMasterId', 'decorationMappingMasterId', 'priceSlabCodeId', 'price'],
                //             include: [{
                //                 model: model.TBL_PriceSlabCode,
                //                 as: 'slab',
                //                 attributes: ['priceSlabCodeId', 'minSlab', 'maxSlab']
                //             }]
                //         }
                //         // {
                //         //     model: model.TBL_ProductSlabMaster,
                //         //     as: 'productSlabMaster',
                //         //     attributes: ['productSlabMasterId', 'priceSlabCodeId', 'price'],
                //         //     include: [{
                //         //         model: model.TBL_PriceSlabCode,
                //         //         as: 'Slab',
                //         //         attributes: ['priceSlabCodeId', 'minSlab', 'maxSlab']
                //         //     }]
                //         // }
                //     ]
                // },

                // {
                //     model: model.TBL_ProductSlabMaster,
                //     as: 'priceSlab',
                //     attributes: ['productSlabMasterId', 'priceSlabCodeId', 'productId', 'price'],
                //     include: [{
                //             model: model.TBL_PriceSlabCode,
                //             as: 'slab',
                //             attributes: ['priceSlabCodeId', 'minSlab', 'maxSlab']
                //         },
                //         {
                //             model: model.TBL_ProductDecorationTypeCode,
                //             as: 'decorationType',
                //             attributes: ['decorationTypeCodeId', 'decorationTypeName']
                //         }
                //     ]
                // }
            ],
            order: [
                ['productPrice', orderType],
            ],
            offset: skip,
            limit: limit
        });

        res.json({
            status: 200,
            response: 'success',
            count: totalData.length,
            data: data || [],
            pagination: {
                skip: skip,
                limit: limit,
                inPageCount: data.length
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ ...errResBody, error });
    }
});


router.post('/getFilterProductList', async (req, res) => {
    try {

        var skip = 0;

        var limit = req.body.limit || 12;

        var orderType = 'ASC'

        var pageNumber = req.body.pageNumber || 1;

        if (req.body.pageNumber) {
            skip = (pageNumber - 1) * limit
        }

        delete req.body.pageNumber;

        var query = {}

        query.isActive = 1

        if (req.body.searchString) {
            query.searchString = req.body.searchString;

        }
        if (req.body.mainCategoryId) {
            query.mainCategoryId = req.body.mainCategoryId;

            // query.mainCategoryId = {
            //     [Op.or]: {
            //         mainCategoryId: req.body.mainCategoryId,
            //         ecoFriendlyCategoryId: req.body.mainCategoryId,
            //         ecoFriendlyCategoryId: req.body.mainCategoryId
            //     }
            // }

        }
        // if (req.body.ecoFriendlyCategoryId) {
        //     query.ecoFriendlyCategoryId = req.body.ecoFriendlyCategoryId;

        // }
        // if (req.body.festiveOfferesCategoryId) {
        //     query.festiveOfferesCategoryId = req.body.festiveOfferesCategoryId;

        // }
        if (req.body.subCategoryId) {
            query.subCategoryId = req.body.subCategoryId;
        }

        if (req.body.subCategoryIds) {
            // query.productGenderCodeId = req.body.productGenderCodeId;
            query.subCategoryId = {
                [Op.in]: req.body.subCategoryIds
            }
        }

        if (req.body.minPrice || req.body.maxPrice) {
            query.productPrice = {
                [Op.and]: {
                    [Op.gte]: req.body.minPrice,
                    [Op.lte]: req.body.maxPrice
                }
            }
        }

        if (req.body.productGenderCodeIds) {
            // query.productGenderCodeId = req.body.productGenderCodeId;
            query.productGenderCodeId = {
                [Op.in]: req.body.productGenderCodeIds
            }
        }

        var sizesQuery = {
            model: model.TBL_ProductSizeMaster,
            as: 'sizes',
            attributes: ['productSizeMasterId'],
            include: [{
                model: model.TBL_ProductSizeCode,
                as: 'sizeCode',
                attributes: ['sizeName', 'sizeCode']
            }]
        }

        // if (req.body.sizes) {
        //     sizes = {
        //         productSizeCodeId: {
        //             [Op.in]: req.body.sizes
        //         }
        //     }
        // }
        if (req.body.sizes) {
            sizesQuery = {
                model: model.TBL_ProductSizeMaster,
                as: 'sizes',
                where: {
                    productSizeCodeId: {
                        [Op.in]: req.body.sizes
                    }
                },
                attributes: ['productSizeMasterId'],
                include: [{
                    model: model.TBL_ProductSizeCode,
                    as: 'sizeCode',
                    attributes: ['sizeName', 'sizeCode']
                }]
            }
        }

        var color = {
            model: model.TBL_ProductColorMaster,
            as: 'colors',
            attributes: ['productColorMasterId', 'isActive'],
            include: [{
                model: model.TBL_ProductColorCode,
                as: 'colorCode',
                attributes: ['color']
            },
            {
                model: model.TBL_ProductImageMaster,
                as: 'image',
                attributes: ['image', 'productImageMasterId', 'defaultPicture']
            },
                sizesQuery
            ],

            // required: true
        }

        if (req.body.colors) {
            color = {
                model: model.TBL_ProductColorMaster,
                where: {
                    productColorCodeId: {
                        [Op.in]: req.body.colors
                    }
                },
                as: 'colors',
                attributes: ['productColorMasterId', 'productColorCodeId'],
                include: [{
                    model: model.TBL_ProductColorCode,
                    as: 'colorCode',
                    attributes: ['color']
                },
                {
                    model: model.TBL_ProductImageMaster,
                    as: 'image',
                    attributes: ['image', 'productImageMasterId', 'defaultPicture']
                },
                    sizesQuery
                ],
                // required: true
            }

        }

        if (!req.body.colors && req.body.sizes) {

            color = {
                model: model.TBL_ProductColorMaster,
                as: 'colors',
                attributes: ['productColorMasterId', 'productColorCodeId'],
                include: [{
                    model: model.TBL_ProductColorCode,
                    as: 'colorCode',
                    attributes: ['color']
                },
                {
                    model: model.TBL_ProductImageMaster,
                    as: 'image',
                    attributes: ['image', 'productImageMasterId', 'defaultPicture']
                },
                    sizesQuery
                ],
                required: true
            }

        }

        if (req.body.orderBy == 0) {
            orderType = 'DESC'
        }

        delete req.body.orderBy;

        console.log(query)



        const totalData = await model.TBL_Product.findAll({
            where: query,
            include: [
                color
            ]
        });

        const data = await model.TBL_Product.findAll({
            where: query,
            include: [{
                model: model.TBL_MainCategory,
                as: 'mainCategory',
                // include: [{
                //     model: model.TBL_SubCategory,
                //     as: 'subCategory',

                // }]
            },
            {
                model: model.TBL_SubCategory,
                as: 'subCategory',
            },
                color,
            {
                model: model.TBL_ProductImageMaster,
                as: 'image',
                attributes: ['image', 'productImageMasterId', 'defaultPicture']
            },
            {
                model: model.TBL_ProductGenderCode,
                as: 'productGenderCode',
                attributes: ['genderName', 'genderCode', 'productGenderCodeId', 'serial']
            },
            {
                model: model.TBL_ProductPriceSlabMapping,
                as: 'slab',
                attributes: ['productPriceSlabId', 'MOQ', 'price']
            },
            {
                model: model.TBL_ProductFeatures,
                as: 'features',
                attributes: ['productFeaturesId', 'feature', 'icon', 'serial']
            },
            {
                model: model.TBL_ProductShippingReturnsInfo,
                as: 'shippingReturnsInfo',
                attributes: ['productShippingReturnsInfoId', 'info', 'icon', 'serial']
            },
            {
                model: model.TBL_ProductWarrentyInfo,
                as: 'warrentyInfo',
                attributes: ['productWarrentyInfoId', 'info', 'icon', 'serial']
            },
            {
                model: model.TBL_ReviewRating,
                as: 'reviewRatings'
            },
                // {
                //     model: model.TBL_ProductDecorationMappingMaster,
                //     as: 'productDecoration',
                //     attributes: ['productId', 'decorationTypeCodeId', 'decorationMappingMasterId'],
                //     include: [{
                //             model: model.TBL_ProductDecorationTypeCode,
                //             as: 'decorationType',
                //             attributes: ['decorationTypeCodeId', 'decorationTypeName'],
                //         },
                //         {
                //             model: model.TBL_ProductSlabMappingMaster,
                //             as: 'productSlab',
                //             attributes: ['productSlabMasterId', 'decorationMappingMasterId', 'priceSlabCodeId', 'price'],
                //             include: [{
                //                 model: model.TBL_PriceSlabCode,
                //                 as: 'Slab',
                //                 attributes: ['priceSlabCodeId', 'minSlab', 'maxSlab']
                //             }]
                //         }
                //     ]
                // },
            ],
            order: [
                ['productPrice', orderType],
            ],
            offset: skip,
            limit: limit
        });

        res.json({
            status: 200,
            response: 'success',
            count: totalData.length,
            // api_static_url: config.api_static_url,
            data: data || [],
            pagination: {
                skip: skip,
                limit: limit,
                inPageCount: data.length
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ ...errResBody, error });
    }
});

//Get all product list.
router.post('/getFilterParameter', async (req, res) => {
    try {

        // var queryBody = req.body.query;

        // var query = JSON.parse(queryBody)

        let query = {}

        if (req.body.mainCategoryId) {
            query.mainCategoryId = req.body.mainCategoryId;
        }

        if (req.body.subCategoryId) {
            query.subCategoryId = req.body.subCategoryId;
        }

        const data = await model.TBL_Product.findAll({
            where: query,
            attributes: [
                [sequelize.fn('MIN', sequelize.col('productPrice')), 'minSerial'],
                [sequelize.fn('MAX', sequelize.col('productPrice')), 'maxSerial'],
            ],
            raw: true
        });

        var min;
        var max;

        if (data && data.length > 0) {
            min = data[0].minSerial || 0,
                max = data[0].maxSerial || 0
        }

        if (!req.body.mainCategoryId && req.body.subCategoryId) {

            const subData = await model.TBL_SubCategory.findAll({
                where: {
                    subCategoryId: req.body.subCategoryId
                }
            });

            if (subData && subData.length > 0) {
                query = {
                    mainCategoryId: subData[0].mainCategoryId
                }
            }
        }

        var subCatData = []

        if (req.body.mainCategoryId && !req.body.subCategoryId) {

            subCatData = await model.TBL_SubCategory.findAll({
                where: {
                    isActive: 1,
                    mainCategoryId: req.body.mainCategoryId
                },
                attributes: ['subCategoryId', 'subCategoryName', 'isActive', 'serial', 'mainCategoryId'],
            });
        }

        //console.log(query)

        const genders = await model.TBL_GenderCategoryMaping.findAll({
            where: query,
            attributes: ['genderCategoryMapingId', 'mainCategoryId'],
            include: [{
                model: model.TBL_ProductGenderCode,
                as: 'productGenderCode',
                attributes: ['genderName', 'genderCode', 'productGenderCodeId', 'serial'],
                required: true
            }]
        });


        var genArr = []

        genders.forEach(gender => {
            genArr.push(gender.productGenderCode)
        });

        const colors = await model.TBL_ColorCategoryMaping.findAll({
            where: query,
            attributes: ['colorCategoryMapingId', 'mainCategoryId'],
            include: [{
                model: model.TBL_ProductColorCode,
                as: 'colorCode',
                attributes: ['color', 'productColorCodeId'],
                required: true
            }

            ]
        });
        var colArr = []

        colors.forEach(color => {
            colArr.push(color.colorCode)
        });

        const sizes = await model.TBL_SizeCategoryMaping.findAll({
            where: query,
            attributes: ['mainCategoryId'],
            include: [{
                model: model.TBL_ProductSizeCode,
                as: 'sizeCode',
                attributes: ['sizeName', 'sizeCode', 'productSizeCodeId'],
                required: true
            }]
        })

        var sizeArr = [];

        sizes.forEach(size => {
            sizeArr.push(size.sizeCode)
        });

        var price = {
            minPrice: min,
            maxPrice: max
        }




        const colorKey = 'productColorCodeId';

        var unique_colArr = [...new Map(colArr.map(item =>
            [item[colorKey], item])).values()];

        // console.log(unique_colArr);

        // Note: this will pick the last duplicated item in the list.


        const sizeKey = 'productSizeCodeId';

        var unique_sizeArr = [...new Map(sizeArr.map(item =>
            [item[sizeKey], item])).values()];

        // console.log(unique_sizeArr);


        const genderKey = 'productGenderCodeId';

        var unique_genArr = [...new Map(genArr.map(item =>
            [item[genderKey], item])).values()];

        // console.log(unique_sizeArr);


        var resp = {
            price: price,
            colors: unique_colArr,
            sizes: unique_sizeArr,
            genders: unique_genArr,
            subCategories: subCatData
        };

        res.json({ status: 200, response: 'success', data: resp || {} });

    } catch (error) {
        console.log(error);
        res.json({ ...errResBody, error });
    }
});

// router.post('/productStatus', async(req, res) => {
//     try {
//         if (req.body.productStatusId) {
//             const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
//             const data = await model.TBL_Product.findAll({
//                 where: {
//                     productStatusId: req.body.productStatusId
//                 },

//             });
//             res.json({ status: 200, response: 'success', products: data || [] })
//         } else {
//             const Data = await model.TBL_Product.findAll({

//             });

//             res.json({ status: 200, response: 'success', data: Data || [] });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({...errResBody, error });
//     }
// });
// Get all patientDocumentVerification list.
router.post('/searchProducts', async (req, res) => {
    try {

        var skip = 0;

        var limit = req.body.limit || 12;

        var pageNumber = req.body.pageNumber || 1;

        if (req.body.pageNumber) {
            skip = (pageNumber - 1) * limit
        }

        delete req.body.pageNumber;

        var query = {};

        query.isActive = 1;

        if (req.body.searchString) {
            query = {
                [Op.or]: [{
                    productName: {
                        [Op.like]: `%${req.body.searchString}%`
                    }
                },
                {
                    code: {
                        [Op.like]: `%${req.body.searchString}%`
                    }
                },
                {
                    productId: {
                        [Op.like]: `%${req.body.productId}%`
                    }
                }
                ]
            }
        }

        if (req.body.price || req.body.price) {
            query.productPrice = {
                [Op.and]: [{
                    [Op.gte]: req.body.price.from,
                    [Op.lte]: req.body.price.to
                }]
            }
        }

        if (req.body.mainCategoryId) {
            query.mainCategoryId = req.body.mainCategoryId;
        }

        const totalData = await model.TBL_Product.findAll({
            where: query
        });

        const data = await model.TBL_Product.findAll({
            where: query,
            include: [{
                model: model.TBL_MainCategory,
                as: 'mainCategory',
                include: [{
                    model: model.TBL_SubCategory,
                    as: 'subCategory',

                }]
            },
            {
                model: model.TBL_SubCategory,
                as: 'subCategory',
            },
            {
                model: model.TBL_ProductColorMaster,
                as: 'colors',
                attributes: ['productColorMasterId'],
                include: [{
                    model: model.TBL_ProductColorCode,
                    as: 'colorCode',
                    attributes: ['color']
                },
                {
                    model: model.TBL_ProductImageMaster,
                    as: 'image',
                    attributes: ['image', 'productImageMasterId', 'defaultPicture']
                },
                {
                    model: model.TBL_ProductSizeMaster,
                    as: 'sizes',
                    attributes: ['productSizeMasterId'],
                    include: [{
                        model: model.TBL_ProductSizeCode,
                        as: 'sizeCode',
                        attributes: ['sizeName', 'sizeCode']
                    }]
                }
                ]
            },
            {
                model: model.TBL_ProductImageMaster,
                as: 'image',
                attributes: ['image', 'productImageMasterId']
            },
            {
                model: model.TBL_ProductGenderCode,
                as: 'productGenderCode',
                attributes: ['genderName', 'genderCode', 'productGenderCodeId', 'serial']
            },
            {
                model: model.TBL_ProductPriceSlabMapping,
                as: 'slab',
                attributes: ['productPriceSlabId', 'MOQ', 'price']
            },
            {
                model: model.TBL_ProductFeatures,
                as: 'features',
                attributes: ['productFeaturesId', 'feature', 'serial']
            },
            {
                model: model.TBL_ProductShippingReturnsInfo,
                as: 'shippingReturnsInfo',
                attributes: ['productShippingReturnsInfoId', 'info', 'icon', 'serial']
            },
            {
                model: model.TBL_ProductWarrentyInfo,
                as: 'warrentyInfo',
                attributes: ['productWarrentyInfoId', 'info', 'icon', 'serial']
            },
            {
                model: model.TBL_ReviewRating,
                as: 'reviewRatings'
            },
            ],
            offset: skip,
            limit: limit
        });

        res.json({
            status: 200,
            response: 'success',
            count: totalData.length,
            data: data || [],
            pagination: {
                skip: skip,
                limit: limit,
                inPageCount: data.length
            }
        });
    } catch (error) {
        console.log(error)
        res.json({ ...errResBody, error });
    }
});

router.get('/:productId', async (req, res) => {
    try {
        const include = req.query.include === 'all' ? [{ all: true, nested: true }] : [];
        const data = await model.TBL_Product.findOne({
            where: {
                productId: req.params.productId
            }

        });
        res.json({ status: 200, response: 'success', product: data || {} });
    } catch (error) {
        res.json({ ...errResBody, error });
    }
});


// update specific product data.
router.post('/updateProduct', async (req, res) => {
    try {
        const product = await model.TBL_Product.update(req.body, {
            where: {
                productId: req.params.productId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'product data updated successfully.' });
    } catch (error) {
        console.log(error);
        res.json({ ...errResBody, error });
    }
});

// delete a product.
router.post('/deleteProduct', async (req, res) => {
    try {

        await model.TBL_ProductColorMaster.destroy({
            where: {
                productId: req.body.productId
            }
        });
        await model.TBL_ProductImageMaster.destroy({
            where: {
                productId: req.body.productId
            }
        });
        await model.TBL_ProductPriceSlabMapping.destroy({
            where: {
                productId: req.body.productId
            }
        });
        const productDlt = await model.TBL_Product.destroy({
            where: {
                productId: req.body.productId
            }
        });

        res.json({ status: 200, response: 'success', msg: 'Product has been deleted with all association successfully.' });

    } catch (error) {
        console.log(error)
        res.json({ ...errResBody, error });
    }
});

router.post('/autocomplete', async (req, res) => {
    try {
        const productNames = await model.TBL_Product.findAll({
            where: {
                productName: {
                    [Op.like]: `%${req.body.searchString}%`
                },
            },
            attributes: ['productId', 'productName', 'productPrice'],
            limit: 5
        });

        res.json({
            status: 200,
            response: 'success',
            data: productNames || []
        });
    } catch (error) {
        console.log(error);
        res.json({ ...errResBody, error });
    }

})

module.exports = router;