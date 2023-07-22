module.exports = (sequelize, Sequelize) => {
    const TBL_ProductShippingReturnsInfo = sequelize.define("TBL_ProductShippingReturnsInfo", {
        productShippingReturnsInfoId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        info: {
            type: Sequelize.TEXT,
            field: 'Feature'
        },
        icon: {
            type: Sequelize.TEXT,
            field: 'Icon'
        },
        serial: {
            type: Sequelize.INTEGER,
            field: 'Serial'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductShippingReturnsInfo.removeAttribute('id');
    return TBL_ProductShippingReturnsInfo;
};