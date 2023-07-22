module.exports = (sequelize, Sequelize) => {
    const TBL_ProductSizeMaster = sequelize.define("TBL_ProductSizeMaster", {
        productSizeMasterId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductSizeMaster.removeAttribute('id');
    return TBL_ProductSizeMaster;
};