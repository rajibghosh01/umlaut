module.exports = (sequelize, Sequelize) => {
    const TBL_Brands = sequelize.define("TBL_Brands", {
        brandId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        brandName: {
            type: Sequelize.STRING(255),
            field: 'BrandName',
            allowNull: false
        },
        image: {
            type: Sequelize.STRING(255),
            field: 'Image',
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive',
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
    TBL_Brands.removeAttribute('id');
    return TBL_Brands;
};