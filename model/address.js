module.exports = (sequelize, Sequelize) => {
    const TBL_Address = sequelize.define("TBL_Address", {
        addressId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING(255),
            field: 'Email',
            allowNull: false
        },
        mobileNumber: {
            type: Sequelize.STRING(12),
            field: 'MobileNumber',
            allowNull: false
        },
        address: {
            type: Sequelize.STRING(255),
            field: 'Address'
        },
        addressOPT: {
            type: Sequelize.STRING(255),
            field: 'AddressOPT'
        },
        firstName: {
            type: Sequelize.STRING(255),
            field: 'FirstName'
        },
        lastName: {
            type: Sequelize.STRING(255),
            field: 'LastName'
        },
        pinCode: {
            type: Sequelize.STRING(55),
            field: 'PinCode'
        },
        country: {
            type: Sequelize.STRING(55),
            field: 'Country'
        },
        state: {
            type: Sequelize.STRING(55),
            field: 'State'
        },
        city: {
            type: Sequelize.STRING(55),
            field: 'City'
        },
        locality: {
            type: Sequelize.STRING(55),
            field: 'Locality'
        },
        landMark: {
            type: Sequelize.STRING(55),
            field: 'LandMark'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Address.removeAttribute('id');
    return TBL_Address;
};