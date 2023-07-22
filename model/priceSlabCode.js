module.exports = (sequelize, Sequelize) => {
    const TBL_PriceSlabCode = sequelize.define("TBL_PriceSlabCode", {
        priceSlabCodeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        minSlab: {
            type: Sequelize.INTEGER,
            field: 'MinSlab',
            allowNull: false
        },
        maxSlab: {
            type: Sequelize.INTEGER,
            field: 'MaxSlab',
            allowNull: false
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_PriceSlabCode.removeAttribute('id');
    return TBL_PriceSlabCode;
};