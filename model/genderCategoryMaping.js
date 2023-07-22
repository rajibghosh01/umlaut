module.exports = (sequelize, Sequelize) => {
    const TBL_GenderCategoryMaping = sequelize.define("TBL_GenderCategoryMaping", {
        genderCategoryMapingId: {
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
    TBL_GenderCategoryMaping.removeAttribute('id');
    return TBL_GenderCategoryMaping;
};