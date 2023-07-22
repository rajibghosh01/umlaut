"use strict";

const user_controller = require("./user/users.js");
const groups_controller = require("./user/groups.js");
const settings_controller = require("./user/settings.js");
const permissiontypes_controller = require("./user/permissionTypes.js");
const grouppermission_controller = require("./user/groupPermission.js");
const country_controller = require("./country.js");
const state_controller = require("./state.js");
const city_controller = require("./city.js");
const category_controller = require("./category.js");
const product_controller = require("./product.js");
const address_controller = require("./address.js");
const productStatus_controller = require("./productStatus.js");
const subCategory_controller = require("./subCategory.js");
const brands_controller = require("./brands.js");
const reviewRating_controller = require("./reviewRating.js");
const homebanner_controller = require("./homebanner.js");
const enquiryMaster_controller = require("./enquiryMaster.js");
const enquiryProduct_controller = require("./enquiryProduct.js");
const blog_controller = require("./blog.js");
const productColorCode_controller = require("./productColorCode");
const productSizeCode_controller = require("./productSizeCode");
const productColorMaster_controller = require("./productColorMaster");
const productSizeMaster_controller = require("./productSizeMaster");
const subscribe_controller = require("./subscribe");
const imageTypeCode_controller = require("./imageTypeCode");
const productImageMaster_controller = require("./productImageMaster");
const cartMaster_controller = require("./cartMaster");
const carts_controller = require("./carts");
const enquiries_controller = require("./enquiries");
const enquirieFeedBack_controller = require("./enquirieFeedBack");
const productGenderCode_controller = require("./productGenderCode");
const priceSlabCode_controller = require("./priceSlabCode");
const productSlabMaster_controller = require("./productSlabMaster");
const productDecorationMappingMaster_controller = require("./productDecorationMappingMaster");
const productPriceSlabMapping_controller = require("./productPriceSlabMapping");
const sizeChartMaster_controller = require("./sizeChartMaster");
const order_controller = require("./order");
const addressType_controller = require("./addressType");
const changeOrderStatus_controller = require("./changeOrderStatus");
// const ProductVendorInventory_controller = require("./ProductVendorInventory");
const vendorMaster_controller = require("./vendorMaster");
const productFeature_controller = require("./productFeatures.js");
const shippingReturnInfo_controller = require("./productShippingReturnsInfo.js");
const warrentyInfo_controller = require("./productWarrenty.js");

const token = require("../token.js");

const errResBody = { status: 400, response: 'error', msg: 'Some thing went wrong.' };

require('dotenv').config();

const env = process.env.NODE_ENV || 'local'; //process env or DEVELOPMENT in default.
const config = require("../config/config.json")[env];
console.log(env);
module.exports = function(app) {

    //middleware for checking the auth.
    function verifyToken(req, res, next) {
        // next();
        try {
            if (req.originalUrl === '/api/v1/api-docs' || req.originalUrl === '/api/v1/users/login' || req.originalUrl === '/api/v1/users') {
                next();
            } else {
                const bearerHeader = req.headers['authorization'];
                if (bearerHeader) {
                    const bearer = bearerHeader.split(' ');
                    const bearerToken = bearer[1];
                    const tokenIn = bearerToken;

                    const token_data = token.verify(tokenIn);

                    if (token_data) {
                        req.body.UserId = token_data.UserId;
                        next();
                    } else {
                        res.status(404).json({ status: 403, response: 'notauthorized', msg: 'Invalid Token.' });
                    }
                } else {
                    //Forbidden
                    res.status(403).json({ status: 403, response: 'notauthorized', msg: 'Not authorized.' });
                }
            }
        } catch (err) {
            res.json({...errResBody, err });
        }
    }

    //passing all the routes throught the auth checking middleware.
    //app.all('/*', verifyToken, function(req, res, next) {
    app.all('/*', function(req, res, next) {
        next();
    })

    //rouing here.
    app.use('/api/v1/users', user_controller);
    app.use('/api/v1/groups', groups_controller);
    app.use('/api/v1/permissionTypes', permissiontypes_controller);
    app.use('/api/v1/groupPermission', grouppermission_controller);
    app.use('/api/v1/settings', settings_controller);
    app.use('/api/v1/country', country_controller);
    app.use('/api/v1/state', state_controller);
    app.use('/api/v1/city', city_controller);
    app.use('/api/v1/mainCategory', category_controller);
    app.use('/api/v1/product', product_controller);
    app.use('/api/v1/address', address_controller);
    app.use('/api/v1/productStatus', productStatus_controller);
    app.use('/api/v1/subCategory', subCategory_controller);
    app.use('/api/v1/brands', brands_controller);
    app.use('/api/v1/reviewRating', reviewRating_controller);
    app.use('/api/v1/banner', homebanner_controller);
    app.use('/api/v1/getEnquiry', enquiryMaster_controller);
    app.use('/api/v1/enquiryProduct', enquiryProduct_controller);
    app.use('/api/v1/blogs', blog_controller);
    app.use('/api/v1/productColorCode', productColorCode_controller);
    app.use('/api/v1/productSizeCode', productSizeCode_controller);
    app.use('/api/v1/productColorMaster', productColorMaster_controller);
    app.use('/api/v1/productSizeMaster', productSizeMaster_controller);
    app.use('/api/v1/subscribe', subscribe_controller);
    app.use('/api/v1/imageTypeCode', imageTypeCode_controller);
    app.use('/api/v1/productImageMaster', productImageMaster_controller);
    app.use('/api/v1/cartMaster', cartMaster_controller);
    app.use('/api/v1/carts', carts_controller);
    app.use('/api/v1/enquiries', enquiries_controller);
    app.use('/api/v1/enquirieFeedBack', enquirieFeedBack_controller);
    app.use('/api/v1/productGenderCode', productGenderCode_controller);
    app.use('/api/v1/priceSlabCode', priceSlabCode_controller);
    app.use('/api/v1/productSlabMaster', productSlabMaster_controller);
    app.use('/api/v1/decorationMappingMaster', productDecorationMappingMaster_controller);
    app.use('/api/v1/productPriceSlabMapping', productPriceSlabMapping_controller);
    app.use('/api/v1/sizeChartMaster', sizeChartMaster_controller);
    app.use('/api/v1/orders', order_controller);
    app.use('/api/v1/addressType', addressType_controller);
    app.use('/api/v1/changeOrderStatus', changeOrderStatus_controller);
    // app.use('/api/v1/productVendorInventory', ProductVendorInventory_controller);
    app.use('/api/v1/vendorMaster', vendorMaster_controller);
    app.use('/api/v1/productFeature', productFeature_controller);
    app.use('/api/v1/productShippingReturnInfo', shippingReturnInfo_controller);
    app.use('/api/v1/productWarrentyInfo', warrentyInfo_controller);
};