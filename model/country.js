module.exports = (sequelize, Sequelize) => {
    const TBL_Country = sequelize.define("TBL_Country", {
        countryId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        countryName: {
            type: Sequelize.STRING(255),
            field: 'CountryName'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Country.removeAttribute('id');
    return TBL_Country;
};