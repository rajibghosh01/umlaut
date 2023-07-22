module.exports = (sequelize, Sequelize) => {
    const TBL_ProductWarrentyInfo = sequelize.define("TBL_ProductWarrentyInfo", {
        productWarrentyInfoId: {
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
    TBL_ProductWarrentyInfo.removeAttribute('id');
    return TBL_ProductWarrentyInfo;
};