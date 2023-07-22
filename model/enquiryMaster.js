module.exports = (sequelize, Sequelize) => {
    const TBL_EnquiryMaster = sequelize.define("TBL_EnquiryMaster", {
        enquiryMasterId: {
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
    TBL_EnquiryMaster.removeAttribute('id');
    return TBL_EnquiryMaster;
};