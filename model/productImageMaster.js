module.exports = (sequelize, Sequelize) => {
    const TBL_ProductImageMaster = sequelize.define("TBL_ProductImageMaster", {
        productImageMasterId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        image: {
            type: Sequelize.STRING(255),
            field: 'Image',
            allowNull: false
        },
        defaultPicture: {
            type: Sequelize.BOOLEAN,
            field: 'DefaultPicture',
            defaultValue: 0
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductImageMaster.removeAttribute('id');
    return TBL_ProductImageMaster;
};