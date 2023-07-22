module.exports = (sequelize, Sequelize) => {
    const TBL_EnquirieFeedBack = sequelize.define("TBL_EnquirieFeedBack", {
        enquirieFeedBackId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        comments: {
            type: Sequelize.TEXT('long'),
            field: 'Comments'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_EnquirieFeedBack.removeAttribute('id');
    return TBL_EnquirieFeedBack;
};