module.exports = (sequelize, Sequelize) => {
    const TBL_SizeChartMaster = sequelize.define("TBL_SizeChartMaster", {
        sizeChartMasterId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        categoryType: {
            type: Sequelize.STRING(255),
            field: 'CategoryType'
        },
        brandSize: {
            type: Sequelize.STRING(255),
            field: 'BrandSize'
        },
        standerSize: {
            type: Sequelize.STRING(255),
            field: 'StanderSize'
        },
        size: {
            type: Sequelize.STRING(255),
            field: 'Size'
        },
        chest: {
            type: Sequelize.STRING(255),
            field: 'Chest'
        },
        shoulder: {
            type: Sequelize.STRING(255),
            field: 'Shoulder'
        },
        length: {
            type: Sequelize.STRING(255),
            field: 'Length'
        },
        waist: {
            type: Sequelize.STRING(255),
            field: 'Waist'
        },
        sleeveLength: {
            type: Sequelize.STRING(255),
            field: 'SleeveLength'
        },
        // serial: {
        //     type: Sequelize.INTEGER,
        //     field: 'Serial'
        // }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_SizeChartMaster.removeAttribute('id');
    return TBL_SizeChartMaster;
};