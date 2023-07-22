module.exports = (sequelize, Sequelize) => {
    const TBL_City = sequelize.define("TBL_City", {
        cityId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        cityName: {
            type: Sequelize.STRING(255),
            field: 'CityName'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_City.removeAttribute('id');
    return TBL_City;
};