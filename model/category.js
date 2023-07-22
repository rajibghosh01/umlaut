module.exports = (sequelize, Sequelize) => {
    const TBL_MainCategory = sequelize.define("TBL_MainCategory", {
        mainCategoryId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        productCategoryName: {
            type: Sequelize.STRING(255),
            field: 'ProductCategoryName',
            allowNull: false
        },
        image: {
            type: Sequelize.STRING(255),
            field: 'Image',
            defaultValue: "https://s3.ap-south-1.amazonaws.com/cdn.creativeswag.in/no_image.jpg"
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive',
            allowNull: false
        },
        isPromotional: {
            type: Sequelize.BOOLEAN,
            field: 'IsPromotional'
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
    TBL_MainCategory.removeAttribute('id');
    return TBL_MainCategory;
};