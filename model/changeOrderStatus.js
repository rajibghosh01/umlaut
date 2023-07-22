module.exports = (sequelize, Sequelize) => {
    const TBL_ChangeOrderStatus = sequelize.define("TBL_ChangeOrderStatus", {
        orderStatusId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        orderStatus: {
            type: Sequelize.STRING(255),
            field: 'OrderStatus'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ChangeOrderStatus.removeAttribute('id');
    return TBL_ChangeOrderStatus;
};