module.exports = (sequelize, Sequelize) => {
    const TBL_ProductDecorationTypeCode = sequelize.define("TBL_ProductDecorationTypeCode", {
        decorationTypeCodeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        decorationTypeName: {
            type: Sequelize.STRING(55),
            field: 'DecorationTypeName'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductDecorationTypeCode.removeAttribute('id');
    return TBL_ProductDecorationTypeCode;
};