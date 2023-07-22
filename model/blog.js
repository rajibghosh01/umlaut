module.exports = (sequelize, Sequelize) => {
    const TBL_Blog = sequelize.define("TBL_Blog", {
        blogId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(255),
            field: 'Title',
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(255),
            field: 'Content',
            allowNull: false
        },
        blogImage: {
            type: Sequelize.STRING(255),
            field: 'BlogImage',
        },
        serial: {
            type: Sequelize.INTEGER,
            field: 'Serial'
        }
        // dateLastChange: {
        //     type: Sequelize.INTEGER(255),
        //     field: 'DateLastChange',
        // }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    TBL_Blog.removeAttribute('id');
    return TBL_Blog;
};