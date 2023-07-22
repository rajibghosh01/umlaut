module.exports = (sequelize, Sequelize) => {
    const TBL_ProductSizeCode = sequelize.define("TBL_ProductSizeCode", {
        productSizeCodeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        sizeName: {
            type: Sequelize.STRING(255),
            field: 'SizeName'
        },
        sizeCode: {
            type: Sequelize.STRING(255),
            field: 'SizeCode'
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
    TBL_ProductSizeCode.removeAttribute('id');
    return TBL_ProductSizeCode;
};