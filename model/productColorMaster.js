module.exports = (sequelize, Sequelize) => {
    const TBL_ProductColorMaster = sequelize.define("TBL_ProductColorMaster", {
        productColorMasterId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive',
            defaultValue: 1
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductColorMaster.removeAttribute('id');
    return TBL_ProductColorMaster;
};