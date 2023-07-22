module.exports = (sequelize, Sequelize) => {
    const TBL_Enquiries = sequelize.define("TBL_Enquiries", {
        enquirieId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        fullName: {
            type: Sequelize.STRING(255),
            field: 'FullName',
            allowNull: false
        },
        emailId: {
            type: Sequelize.STRING(255),
            field: 'EmailId',
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING(255),
            field: 'PhoneNumber',
            allowNull: false
        },

        notes: {
            type: Sequelize.TEXT('long'),
            field: 'Notes'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Enquiries.removeAttribute('id');
    return TBL_Enquiries;
};