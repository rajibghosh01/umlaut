module.exports = (sequelize, Sequelize) => {
    const TBL_ProductColorCode = sequelize.define("TBL_ProductColorCode", {
        productColorCodeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        color: {
            type: Sequelize.STRING(255),
            field: 'Color',
            allowNull: false
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
    TBL_ProductColorCode.removeAttribute('id');
    return TBL_ProductColorCode;
};