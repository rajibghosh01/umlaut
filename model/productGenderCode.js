module.exports = (sequelize, Sequelize) => {
    const TBL_ProductGenderCode = sequelize.define("TBL_ProductGenderCode", {
        productGenderCodeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        genderName: {
            type: Sequelize.STRING(255),
            field: 'GenderName'
        },
        genderCode: {
            type: Sequelize.STRING(255),
            field: 'GenderCode'
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
    TBL_ProductGenderCode.removeAttribute('id');
    return TBL_ProductGenderCode;
};