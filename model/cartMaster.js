module.exports = (sequelize, Sequelize) => {
    const TBL_CartMaster = sequelize.define("TBL_CartMaster", {
        cartId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive',
            allowNull: false
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_CartMaster.removeAttribute('id');
    return TBL_CartMaster;
};