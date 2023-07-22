module.exports = (sequelize, Sequelize) => {
    const TBL_Subscribe = sequelize.define("TBL_Subscribe", {
        subscribeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        emailId: {
            type: Sequelize.STRING(255),
            field: 'EmailId'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Subscribe.removeAttribute('id');
    return TBL_Subscribe;
};