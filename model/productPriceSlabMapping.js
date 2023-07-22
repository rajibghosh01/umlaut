module.exports = (sequelize, Sequelize) => {
    const TBL_ProductPriceSlabMapping = sequelize.define("TBL_ProductPriceSlabMapping", {
        productPriceSlabId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        MOQ: {
            type: Sequelize.FLOAT,
            field: 'MOQ',
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            field: 'Price',
            allowNull: false
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductPriceSlabMapping.removeAttribute('id');
    return TBL_ProductPriceSlabMapping;
};