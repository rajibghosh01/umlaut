module.exports = (sequelize, Sequelize) => {
    const TBL_Homebanner = sequelize.define("TBL_Homebanner", {
        bannerId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        bannerName: {
            type: Sequelize.STRING(255),
            field: 'BannerName',
            allowNull: false
        },
        bigimage: {
            type: Sequelize.STRING(255),
            field: 'Bigimage',
            allowNull: false
        },
        bannerStatus: {
            type: Sequelize.BOOLEAN,
            field: 'BannerStatus'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive'
        },
        serial: {
            type: Sequelize.INTEGER,
            field: 'Serial'
        }

    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Homebanner.removeAttribute('id');
    return TBL_Homebanner;
};