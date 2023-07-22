module.exports = (sequelize, Sequelize) => {
    const TBL_Settings = sequelize.define("TBL_Settings", {
        settingsId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        host: {
            type: Sequelize.STRING(255),
            field: 'Host',
            allowNull: false
        },
        port: {
            type: Sequelize.INTEGER,
            field: 'Port'
        },
        user: {
            type: Sequelize.STRING(255),
            field: 'User'
        },
        pass: {
            type: Sequelize.STRING(255),
            field: 'Pass'
        },
        referBalance: {
            type: Sequelize.FLOAT,
            field: 'ReferBalance'
        },
        referStatus: {
            type: Sequelize.BOOLEAN,
            field: 'ReferStatus'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Settings.removeAttribute('id');
    return TBL_Settings;
};