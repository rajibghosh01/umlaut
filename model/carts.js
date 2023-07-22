module.exports = (sequelize, Sequelize) => {
    const TBL_Carts = sequelize.define("TBL_Carts", {
        cartProductId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.NUMERIC,
            field: 'Quantity'
        },
        color: {
            type: Sequelize.STRING(255),
            field: 'Color'
        },
        sizeCode: {
            type: Sequelize.STRING(255),
            field: 'SizeCode'
        },
        price: {
            type: Sequelize.FLOAT,
            field: 'Price'
        },
        image: {
            type: Sequelize.STRING(255),
            field: 'Image'
        }

    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Carts.removeAttribute('id');
    return TBL_Carts;
};