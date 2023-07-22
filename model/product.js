module.exports = (sequelize, Sequelize) => {
    const TBL_Product = sequelize.define("TBL_Product", {
        productId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        productName: {
            type: Sequelize.STRING(255),
            field: 'ProductName',
            allowNull: false
        },
        code: {
            type: Sequelize.STRING(255),
            field: 'Code',
        },
        productPrice: {
            type: Sequelize.FLOAT,
            field: 'ProductPrice',
            allowNull: false
        },
        longDescription: {
            type: Sequelize.TEXT('long'),
            field: 'LongDescription'
        },
        shortDescription: {
            type: Sequelize.TEXT('long'),
            field: 'ShortDescription'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive',
            allowNull: false
        },
        isBestSeller: {
            type: Sequelize.BOOLEAN,
            field: 'IsBestSeller',
            allowNull: false
        },

    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Product.removeAttribute('id');
    return TBL_Product;
};