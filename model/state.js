module.exports = (sequelize, Sequelize) => {
    const TBL_State = sequelize.define("TBL_State", {
        stateId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        stateName: {
            type: Sequelize.STRING(255),
            field: 'StateName'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_State.removeAttribute('id');
    return TBL_State;
};