module.exports = (sequelize, Sequelize) => {
    const TBL_ImageTypeCode = sequelize.define("TBL_ImageTypeCode", {
        imageTypeCodeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        imageType: {
            type: Sequelize.STRING(255),
            // unique: true,
            field: 'ImageType'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ImageTypeCode.removeAttribute('id');
    return TBL_ImageTypeCode;
};