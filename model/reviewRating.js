module.exports = (sequelize, Sequelize) => {
    const TBL_ReviewRating = sequelize.define("TBL_ReviewRating", {
        reviewRatingId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        email_id: {
            type: Sequelize.STRING(255),
            field: 'Email_id'
        },
        fullName: {
            type: Sequelize.STRING(255),
            field: 'FullName',
        },
        review: {
            type: Sequelize.STRING(255),
            field: 'Review'
        },
        rating: {
            type: Sequelize.FLOAT,
            field: 'Rating',
        },
        isShow: {
            type: Sequelize.BOOLEAN,
            field: 'IsShow',
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_ReviewRating.removeAttribute('id');
    return TBL_ReviewRating;
};