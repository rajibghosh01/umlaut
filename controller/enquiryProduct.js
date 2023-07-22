const express = require('express');
const router = express.Router();
const model = require('../model');
var errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };


// router.post('/addToCart', async (req, res) => {
//     try {

//         let Cart = await model.TBL_Carts.findAll({
//             where: {
//                 cartId: req.body.cartId,
//                 productId: req.body.productId
//             },

//         });
//         if (Cart && Cart.length > 0) {
//             res.json({ status: 400, response: 'invalid', msg: 'This product already exists.', });
//         } else {

//             req.body.quantity = 1;

//             const createUserResult = await model.TBL_Carts.create(req.body);

//             res.json({ status: 200, response: 'success', msg: 'carts has been saved.', cartProductId: createUserResult.cartProductId });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json(errResBody);
//     }
// });


router.post('/addToEnquiryProduct', async(req, res) => {
    try {

        let Cart = await model.TBL_EnquiryProduct.findAll({
            where: {
                enquiryMasterId: req.body.enquiryMasterId,
                productId: req.body.productId
            },

        });
        if (Cart && Cart.length > 0) {
            res.json({ status: 400, response: 'invalid', msg: 'This product already exists.', });
        } else {



            const createUserResult = await model.TBL_EnquiryProduct.create(req.body);

            res.json({ status: 200, response: 'success', msg: 'Product enquiry has been saved.', enquiryProductId: createUserResult.enquiryProductId });
        }
    } catch (error) {
        console.log(error);
        res.json(errResBody);
    }
});

router.post('/getEnquiryProducts', async(req, res) => {
    try {
        let enquiry = await model.TBL_EnquiryProduct.findAll({
            where: req.body,
            include: [
                // {
                //     model: model.TBL_CartMaster,
                //     as: 'cartMaster'
                // },
                {
                    model: model.TBL_Product,
                    as: 'product',
                    include: [{
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
                                attributes: ['image']
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
                    }]
                }

            ]
        });
        res.json({ status: 200, response: 'success', data: enquiry });
    } catch (error) {
        res.json(errResBody);
    }
});

router.post('/updateCartProduct', async(req, res) => {
    try {
        let enquiryProduct = await model.TBL_EnquiryProduct.update(req.body, {
            where: {
                enquiryProductId: req.body.enquiryProductId
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Cart updated successfully.' });
        console.log(enquiryProduct);
    } catch (error) {
        res.json(errResBody);
    }
});

router.post('/deleteEnquiryProduct', async(req, res) => {
    try {
        const createResult = await model.TBL_EnquiryProduct.destroy({
            where: {
                enquiryProductId: req.body.enquiryProductId,
            }
        });
        res.json({ status: 200, response: 'success', msg: 'Product has been deleted from cart.', cartProductId: createResult.cartProductId });
    } catch (error) {
        res.json(errResBody);
    }
});

module.exports = router;