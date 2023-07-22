module.exports = (sequelize, Sequelize) => {
    const TBL_SubCategory = sequelize.define("TBL_SubCategory", {
        subCategoryId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        subCategoryName: {
            type: Sequelize.STRING(255),
            field: 'SubCategoryName'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive',
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
    TBL_SubCategory.removeAttribute('id');
    return TBL_SubCategory;
};