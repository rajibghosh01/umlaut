module.exports = (sequelize, Sequelize) => {
    const TBL_AddressType = sequelize.define("TBL_AddressType", {
        addressTypeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        addressType: {
            type: Sequelize.STRING(255),
            field: 'AddressType'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_AddressType.removeAttribute('id');
    return TBL_AddressType;
};