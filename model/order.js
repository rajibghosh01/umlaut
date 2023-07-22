module.exports = (sequelize, Sequelize) => {
    const TBL_Order = sequelize.define("TBL_Order", {
        orderId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        payableAmount: {
            type: Sequelize.FLOAT,
            field: 'PayableAmount'
        },
        totalPrice: {
            type: Sequelize.FLOAT,
            field: 'TotalPrice'
        },
        payerId: {
            type: Sequelize.STRING(255),
            field: 'PayerId'
        },
        transactionId: {
            type: Sequelize.STRING(255),
            field: 'TransactionId'
        },
        discount: {
            type: Sequelize.STRING(255),
            field: 'discount'
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
        },
        cancellationNotes: {
            type: Sequelize.TEXT('long'),
            field: 'cancellationNotes'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Order.removeAttribute('id');
    return TBL_Order;
};