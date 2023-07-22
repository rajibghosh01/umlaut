module.exports = (sequelize, Sequelize) => {
    const TBL_EnquiryProduct = sequelize.define("TBL_EnquiryProduct", {
        enquiryProductId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.NUMERIC,
            field: 'Quantity'
        },

        price: {
            type: Sequelize.FLOAT,
            field: 'Price'
        },
        color: {
            type: Sequelize.STRING(255),
            field: 'Color'
        },
        size: {
            type: Sequelize.STRING(255),
            field: 'Size'
        },
        productImage: {
            type: Sequelize.STRING(255),
            field: 'ProductImage'
        },


    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_EnquiryProduct.removeAttribute('id');
    return TBL_EnquiryProduct;
};