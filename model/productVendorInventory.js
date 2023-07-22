module.exports = (sequelize, Sequelize) => {
    const TBL_ProductVendorInventory = sequelize.define("TBL_ProductVendorInventory", {
        productVendorInventoryId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            field: 'quantity'
        },
        pricePerUnit: {
            type: Sequelize.FLOAT,
            field: 'pricePerUnit'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'isActive',
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ProductVendorInventory.removeAttribute('id');
    return TBL_ProductVendorInventory;
};