module.exports = (sequelize, Sequelize) => {
    const TBL_ProductSlabMappingMaster = sequelize.define("TBL_ProductSlabMappingMaster", {
        productSlabMasterId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        price: {
            type: Sequelize.FLOAT,
            field: 'Price',
            allowNull: false
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductSlabMappingMaster.removeAttribute('id');
    return TBL_ProductSlabMappingMaster;
};