module.exports = (sequelize, Sequelize) => {
    const TBL_ProductDecorationMappingMaster = sequelize.define("TBL_ProductDecorationMappingMaster", {
        decorationMappingMasterId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductDecorationMappingMaster.removeAttribute('id');
    return TBL_ProductDecorationMappingMaster;
};