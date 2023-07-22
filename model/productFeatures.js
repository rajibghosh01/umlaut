module.exports = (sequelize, Sequelize) => {
    const TBL_ProductFeatures = sequelize.define("TBL_ProductFeatures", {
        productFeaturesId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        icon: {
            type: Sequelize.TEXT,
            field: 'Icon',
            defaultValue: "https://s3.ap-south-1.amazonaws.com/cdn.creativeswag.in/no_image.jpg"
        },
        feature: {
            type: Sequelize.TEXT,
            field: 'Feature'
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
    TBL_ProductFeatures.removeAttribute('id');
    return TBL_ProductFeatures;
};