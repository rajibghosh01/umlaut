module.exports = (sequelize, Sequelize) => {
    const TBL_ColorCategoryMaping = sequelize.define("TBL_ColorCategoryMaping", {
        colorCategoryMapingId: {
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
    TBL_ColorCategoryMaping.removeAttribute('id');
    return TBL_ColorCategoryMaping;
};