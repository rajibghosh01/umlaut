module.exports = (sequelize, Sequelize) => {
    const TBL_VendorMaster = sequelize.define("TBL_VendorMaster", {
        vendorId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        vendorName: {
            type: Sequelize.STRING(255),
            field: 'VendorName'
        },
        vendorAddress: {
            type: Sequelize.STRING(255),
            field: 'VendorAddress'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_VendorMaster.removeAttribute('id');
    return TBL_VendorMaster;
};