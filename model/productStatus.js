module.exports = (sequelize, Sequelize) => {
    const TBL_ProductStatus = sequelize.define("TBL_ProductStatus", {
        productStatusId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        isActive: {
            type: Sequelize.STRING(255),
            field: 'IsActive'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductStatus.removeAttribute('id');
    return TBL_ProductStatus;
};