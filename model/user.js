module.exports = (sequelize, Sequelize) => {
    const TBL_Users = sequelize.define("TBL_Users", {
        userId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING(255),
            field: 'FirstName',
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(255),
            field: 'LastName',
            allowNull: false
        },
        emailId: {
            type: Sequelize.STRING(255),
            field: 'EmailId',
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(20),
            field: 'Password',
            allowNull: false
        },
        phoneNumber: {
            type: Sequelize.STRING(12),
            field: 'PhoneNumber',
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive',
            allowNull: false
        },
        subscribe: {
            type: Sequelize.BOOLEAN,
            field: 'Subscribe'
        },
        resetPasswordToken: {
            type: Sequelize.STRING(255),
            field: 'ResetPasswordToken'
        }
        // image: {
        //     type: Sequelize.STRING(255),
        //     field: 'Image'
        // },

    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Users.removeAttribute('id');
    return TBL_Users;
};