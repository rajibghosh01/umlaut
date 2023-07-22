module.exports = (sequelize, Sequelize) => {
    const TBL_SizeCategoryMaping = sequelize.define("TBL_SizeCategoryMaping", {
        sizeCategoryMapingId: {
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
    TBL_SizeCategoryMaping.removeAttribute('id');
    return TBL_SizeCategoryMaping;
};