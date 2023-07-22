var Sequelize = require('sequelize'); //sequelize module import
var fs = require("fs"); //fs module import
var path = require("path"); //path module import

require('dotenv').config();

const env = process.env.NODE_ENV || 'local'; //process env or DEVELOPMENT in default. development
const config = require("../config/config.json")[env];

console.log("ENV : - " + env)

//connection instances creation for SQl with sequelize.
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mssql',
//     port: '3306', //-------------> change port here
//     driver: 'tedious',
//     // dialectOptions: {
//     //     instanceName: MSSQLSERVER
//     // },
//     define: {
//         timestamps: false
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     },
// })

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        // var model = sequelize.import(path.join(__dirname, file));
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.TBL_Users.belongsTo(db.TBL_Groups, {
    as: 'group',
    foreignKey: {
        name: 'groupId'
    }
});

db.TBL_Groups.hasMany(db.TBL_Users, {
    as: 'users',
    foreignKey: {
        name: 'groupId'
    }
});

db.TBL_GroupPermissions.belongsTo(db.TBL_Groups, {
    as: 'group',
    foreignKey: {
        name: 'groupId'
    }
});

db.TBL_Groups.hasMany(db.TBL_GroupPermissions, {
    as: 'permission',
    foreignKey: {
        name: 'groupId'
    }
});

db.TBL_GroupPermissions.belongsTo(db.TBL_PermissionTypes, {
    as: 'permissionType',
    foreignKey: {
        name: 'permissionTypeId'
    }
});

db.TBL_PermissionTypes.hasMany(db.TBL_GroupPermissions, {
    as: 'permissions',
    foreignKey: {
        name: 'permissionTypeId'
    }
});
// db.TBL_State.belongsTo(db.TBL_Country, {
//     as: 'country',
//     foreignKey: {
//         name: 'countryId'
//     }
// });

// db.TBL_Country.hasMany(db.TBL_State, {
//     as: 'state',
//     foreignKey: {
//         name: 'countryId'
//     }
// });
// db.TBL_City.belongsTo(db.TBL_State, {
//     as: 'state',
//     foreignKey: {
//         name: 'stateId'
//     }
// });

// db.TBL_State.hasMany(db.TBL_City, {
//     as: 'city',
//     foreignKey: {
//         name: 'stateId'
//     }
// });
// db.TBL_Address.belongsTo(db.TBL_Country, {
//     as: 'country',
//     foreignKey: {
//         name: 'countryId'
//     }
// });

// db.TBL_Country.hasMany(db.TBL_Address, {
//     as: 'address',
//     foreignKey: {
//         name: 'countryId'
//     }
// });
// db.TBL_Address.belongsTo(db.TBL_State, {
//     as: 'state',
//     foreignKey: {
//         name: 'stateId'
//     }
// });

// db.TBL_State.hasMany(db.TBL_Address, {
//     as: 'address',
//     foreignKey: {
//         name: 'stateId'
//     }
// });
// db.TBL_Address.belongsTo(db.TBL_City, {
//     as: 'city',
//     foreignKey: {
//         name: 'cityId'
//     }
// });

// db.TBL_City.hasMany(db.TBL_Address, {
//     as: 'address',
//     foreignKey: {
//         name: 'cityId'
//     }
// });
// db.TBL_AddressType.belongsTo(db.TBL_Users, {
//     as: 'users',
//     foreignKey: {
//         name: 'userId'
//     }
// });

// db.TBL_Users.hasMany(db.TBL_AddressType, {
//     as: 'addressType',
//     foreignKey: {
//         name: 'userId'
//     }
// });
db.TBL_Address.belongsTo(db.TBL_Users, {
    as: 'users',
    foreignKey: {
        name: 'userId'
    }
});

db.TBL_Users.hasMany(db.TBL_Address, {
    as: 'address',
    foreignKey: {
        name: 'userId'
    }
});
db.TBL_Address.belongsTo(db.TBL_AddressType, {
    as: 'addressType',
    foreignKey: {
        name: 'addressTypeId'
    }
});

db.TBL_AddressType.hasMany(db.TBL_Address, {
    as: 'address',
    foreignKey: {
        name: 'addressTypeId'
    }
});
db.TBL_SubCategory.belongsTo(db.TBL_MainCategory, {
    as: 'mainCategory',
    foreignKey: {
        name: 'mainCategoryId'
    }
});
db.TBL_MainCategory.hasMany(db.TBL_SubCategory, {
    as: 'subCategory',
    foreignKey: {
        name: 'mainCategoryId'
    }
});
db.TBL_Product.belongsTo(db.TBL_SubCategory, {
    as: 'subCategory',
    foreignKey: {
        name: 'subCategoryId'
    }
});

db.TBL_SubCategory.hasMany(db.TBL_Product, {
    as: 'Product',
    foreignKey: {
        name: 'subCategoryId'
    }
});
db.TBL_Product.belongsTo(db.TBL_SubCategory, {
    as: 'SubCategory',
    foreignKey: {
        name: 'ecoFriendlySubCategoryId'
    }
});

db.TBL_SubCategory.hasMany(db.TBL_Product, {
    as: 'products',
    foreignKey: {
        name: 'ecoFriendlySubCategoryId'
    }
});
db.TBL_Product.belongsTo(db.TBL_SubCategory, {
    as: 'SubCategories',
    foreignKey: {
        name: 'festiveOfferesSubCategoryId'
    }
});

db.TBL_SubCategory.hasMany(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'festiveOfferesSubCategoryId'
    }
});
db.TBL_Product.belongsTo(db.TBL_MainCategory, {
    as: 'mainCategory',
    foreignKey: {
        name: 'mainCategoryId'
    }
});

db.TBL_MainCategory.hasMany(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'mainCategoryId'
    }
});
db.TBL_Product.belongsTo(db.TBL_MainCategory, {
    as: 'category',
    foreignKey: {
        name: 'ecoFriendlyCategoryId'
    }
});

db.TBL_MainCategory.hasMany(db.TBL_Product, {
    as: 'Products',
    foreignKey: {
        name: 'ecoFriendlyCategoryId'
    }
});
db.TBL_Product.belongsTo(db.TBL_MainCategory, {
    as: 'Category',
    foreignKey: {
        name: 'festiveOfferesCategoryId'
    }
});

db.TBL_MainCategory.hasMany(db.TBL_Product, {
    as: 'Product',
    foreignKey: {
        name: 'festiveOfferesCategoryId'
    }
});
db.TBL_Product.belongsTo(db.TBL_ProductStatus, {
    as: 'productStatus',
    foreignKey: {
        name: 'productStatusId'
    }
});

db.TBL_ProductStatus.hasMany(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productStatusId'
    }
});

db.TBL_EnquiryMaster.belongsTo(db.TBL_Users, {
    as: 'users',
    foreignKey: {
        name: 'userId'
    }
});

db.TBL_Users.hasMany(db.TBL_EnquiryMaster, {
    as: 'enquiryMaster',
    foreignKey: {
        name: 'userId'
    }
});

db.TBL_ProductVendorInventory.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ProductVendorInventory, {
    as: 'productVendorInventory',
    foreignKey: {
        name: 'productId'
    }
});
db.TBL_ProductVendorInventory.belongsTo(db.TBL_VendorMaster, {
    as: 'vendorMaster',
    foreignKey: {
        name: 'vendorId'
    }
});

db.TBL_VendorMaster.hasMany(db.TBL_ProductVendorInventory, {
    as: 'productVendorInventory',
    foreignKey: {
        name: 'vendorId'
    }
});
db.TBL_EnquiryProduct.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_EnquiryProduct, {
    as: 'enquiryProduct',
    foreignKey: {
        name: 'productId'
    }
});
db.TBL_EnquiryProduct.belongsTo(db.TBL_EnquiryMaster, {
    as: 'enquiryMaster',
    foreignKey: {
        name: 'enquiryMasterId'
    }
});

db.TBL_EnquiryMaster.hasMany(db.TBL_EnquiryProduct, {
    as: 'enquiryProduct',
    foreignKey: {
        name: 'enquiryMasterId'
    }
});


db.TBL_ProductColorMaster.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ProductColorMaster, {
    as: 'colors',
    foreignKey: {
        name: 'productId'
    }
});
db.TBL_ProductColorMaster.belongsTo(db.TBL_ProductColorCode, {
    as: 'colorCode',
    foreignKey: {
        name: 'productColorCodeId'
    }
});

db.TBL_ProductColorCode.hasMany(db.TBL_ProductColorMaster, {
    as: 'colors',
    foreignKey: {
        name: 'productColorCodeId'
    }
});
db.TBL_ProductSizeMaster.belongsTo(db.TBL_ProductSizeCode, {
    as: 'sizeCode',
    foreignKey: {
        name: 'productSizeCodeId'
    }
});

db.TBL_ProductSizeCode.hasMany(db.TBL_ProductSizeMaster, {
    as: 'productSizeMaster',
    foreignKey: {
        name: 'productSizeCodeId'
    }
});
db.TBL_ProductSizeMaster.belongsTo(db.TBL_ProductColorMaster, {
    as: 'colors',
    foreignKey: {
        name: 'productColorMasterId'
    }
});

db.TBL_ProductColorMaster.hasMany(db.TBL_ProductSizeMaster, {
    as: 'sizes',
    foreignKey: {
        name: 'productColorMasterId'
    }
});





// db.TBL_ProductColorMaster.belongsTo(db.TBL_ProductImageMaster, {
//     as: 'image',
//     foreignKey: {
//         name: 'productImageMasterId'
//     }
// });

db.TBL_ProductColorMaster.hasMany(db.TBL_ProductImageMaster, {
    as: 'image',
    foreignKey: {
        name: 'productColorMasterId'
    }
});

db.TBL_ProductImageMaster.belongsTo(db.TBL_ProductColorMaster, {
    as: 'colors',
    foreignKey: {
        name: 'productColorMasterId'
    }
});

db.TBL_Homebanner.belongsTo(db.TBL_MainCategory, {
    as: 'mainCategory',
    foreignKey: {
        name: 'mainCategoryId'
    }
});

db.TBL_MainCategory.hasMany(db.TBL_Homebanner, {
    as: 'homebanner',
    foreignKey: {
        name: 'mainCategoryId'
    }
});


db.TBL_ProductImageMaster.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ProductImageMaster, {
    as: 'image',
    foreignKey: {
        name: 'productId'
    }
});
db.TBL_ProductImageMaster.belongsTo(db.TBL_ImageTypeCode, {
    as: 'imageTypeCode',
    foreignKey: {
        name: 'imageTypeCodeId'
    }
});

db.TBL_ImageTypeCode.hasMany(db.TBL_ProductImageMaster, {
    as: 'image',
    foreignKey: {
        name: 'imageTypeCodeId'
    }
});
db.TBL_CartMaster.belongsTo(db.TBL_Users, {
    as: 'users',
    foreignKey: {
        name: 'userId'
    }
});

db.TBL_Users.hasMany(db.TBL_CartMaster, {
    as: 'cartMaster',
    foreignKey: {
        name: 'userId'
    }
});
db.TBL_Carts.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_Carts, {
    as: 'carts',
    foreignKey: {
        name: 'productId'
    }
});
db.TBL_Carts.belongsTo(db.TBL_CartMaster, {
    as: 'cartMaster',
    foreignKey: {
        name: 'cartId'
    }
});

db.TBL_CartMaster.hasMany(db.TBL_Carts, {
    as: 'carts',
    foreignKey: {
        name: 'cartId'
    }
});

db.TBL_Order.belongsTo(db.TBL_CartMaster, {
    as: 'cartMaster',
    foreignKey: {
        name: 'cartId'
    }
});

db.TBL_CartMaster.hasMany(db.TBL_Order, {
    as: 'order',
    foreignKey: {
        name: 'cartId'
    }
});

db.TBL_Order.belongsTo(db.TBL_Users, {
    as: 'users',
    foreignKey: {
        name: 'userId'
    }
});

db.TBL_Users.hasMany(db.TBL_Order, {
    as: 'order',
    foreignKey: {
        name: 'userId'
    }
});

db.TBL_Order.belongsTo(db.TBL_ChangeOrderStatus, {
    as: 'changeOrderStatus',
    foreignKey: {
        name: 'orderStatusId'
    }
});
db.TBL_ChangeOrderStatus.hasMany(db.TBL_Order, {
    as: 'order',
    foreignKey: {
        name: 'orderStatusId'
    }
});

db.TBL_Enquiries.belongsTo(db.TBL_EnquiryMaster, {
    as: 'enquiryMaster',
    foreignKey: {
        name: 'enquiryMasterId'
    }
});

db.TBL_EnquiryMaster.hasMany(db.TBL_Enquiries, {
    as: 'enquiries',
    foreignKey: {
        name: 'enquiryMasterId'
    }
});
db.TBL_EnquirieFeedBack.belongsTo(db.TBL_Enquiries, {
    as: 'enquiries',
    foreignKey: {
        name: 'enquirieId'
    }
});

db.TBL_Enquiries.hasMany(db.TBL_EnquirieFeedBack, {
    as: 'enquirieFeedBack',
    foreignKey: {
        name: 'enquirieId'
    }
});



db.TBL_ColorCategoryMaping.belongsTo(db.TBL_MainCategory, {
    as: 'mainCategory',
    foreignKey: {
        name: 'mainCategoryId'
    }
});
db.TBL_MainCategory.hasMany(db.TBL_ColorCategoryMaping, {
    as: 'colorCategoryMapingory',
    foreignKey: {
        name: 'mainCategoryId'
    }
});

db.TBL_ColorCategoryMaping.belongsTo(db.TBL_ProductColorCode, {
    as: 'colorCode',
    foreignKey: {
        name: 'productColorCodeId'
    }
});

db.TBL_ProductColorCode.hasMany(db.TBL_ColorCategoryMaping, {
    as: 'colorCategoryMapingory',
    foreignKey: {
        name: 'productColorCodeId'
    }
});


db.TBL_SizeCategoryMaping.belongsTo(db.TBL_MainCategory, {
    as: 'mainCategory',
    foreignKey: {
        name: 'mainCategoryId'
    }
});
db.TBL_MainCategory.hasMany(db.TBL_SizeCategoryMaping, {
    as: 'sizeCategoryMaping',
    foreignKey: {
        name: 'mainCategoryId'
    }
});

db.TBL_SizeCategoryMaping.belongsTo(db.TBL_ProductSizeCode, {
    as: 'sizeCode',
    foreignKey: {
        name: 'productSizeCodeId'
    }
});

db.TBL_ProductSizeCode.hasMany(db.TBL_SizeCategoryMaping, {
    as: 'SizeCategoryMaping',
    foreignKey: {
        name: 'productSizeCodeId'
    }
});

db.TBL_Product.belongsTo(db.TBL_ProductGenderCode, {
    as: 'productGenderCode',
    foreignKey: {
        name: 'productGenderCodeId'
    }
});

db.TBL_ProductGenderCode.hasMany(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productGenderCodeId'
    }
});
db.TBL_GenderCategoryMaping.belongsTo(db.TBL_ProductGenderCode, {
    as: 'productGenderCode',
    foreignKey: {
        name: 'productGenderCodeId'
    }
});

db.TBL_ProductGenderCode.hasMany(db.TBL_GenderCategoryMaping, {
    as: 'genderCategoryMaping',
    foreignKey: {
        name: 'productGenderCodeId'
    }
});

db.TBL_GenderCategoryMaping.belongsTo(db.TBL_MainCategory, {
    as: 'mainCategory',
    foreignKey: {
        name: 'mainCategoryId'
    }
});
db.TBL_MainCategory.hasMany(db.TBL_GenderCategoryMaping, {
    as: 'genderCategoryMaping',
    foreignKey: {
        name: 'mainCategoryId'
    }
});

db.TBL_ProductDecorationMappingMaster.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ProductDecorationMappingMaster, {
    as: 'productDecoration',
    foreignKey: {
        name: 'productId'
    }
});
db.TBL_ProductPriceSlabMapping.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ProductPriceSlabMapping, {
    as: 'slab',
    foreignKey: {
        name: 'productId'
    }
});
db.TBL_ProductSlabMappingMaster.belongsTo(db.TBL_PriceSlabCode, {
    as: 'Slab',
    foreignKey: {
        name: 'priceSlabCodeId'
    }
});

db.TBL_PriceSlabCode.hasMany(db.TBL_ProductSlabMappingMaster, {
    as: 'productSlab',
    foreignKey: {
        name: 'priceSlabCodeId'
    }
});

db.TBL_ProductSlabMappingMaster.belongsTo(db.TBL_ProductDecorationMappingMaster, {
    as: 'productDecoration',
    foreignKey: {
        name: 'decorationMappingMasterId'
    }
});

db.TBL_ProductDecorationMappingMaster.hasMany(db.TBL_ProductSlabMappingMaster, {
    as: 'productSlab',
    foreignKey: {
        name: 'decorationMappingMasterId'
    }
});

// db.TBL_ProductSlabMaster.belongsTo(db.TBL_ProductDecorationTypeCode, {
//     as: 'decorationType',
//     foreignKey: {
//         name: 'decorationTypeCodeId'
//     }
// });

// db.TBL_ProductDecorationTypeCode.hasMany(db.TBL_ProductSlabMaster, {
//     as: 'productSlabMaster',
//     foreignKey: {
//         name: 'decorationTypeCodeId'
//     }
// });

db.TBL_ProductDecorationMappingMaster.belongsTo(db.TBL_ProductDecorationTypeCode, {
    as: 'decorationType',
    foreignKey: {
        name: 'decorationTypeCodeId'
    }
});

db.TBL_ProductDecorationTypeCode.hasMany(db.TBL_ProductDecorationMappingMaster, {
    as: 'productDecoration',
    foreignKey: {
        name: 'decorationTypeCodeId'
    }
});

db.TBL_SizeChartMaster.belongsTo(db.TBL_SubCategory, {
    as: 'subCategory',
    foreignKey: {
        name: 'subCategoryId'
    }
});

db.TBL_SubCategory.hasMany(db.TBL_SizeChartMaster, {
    as: 'sizeChartMaster',
    foreignKey: {
        name: 'subCategoryId'
    }
});

//Product Features
db.TBL_ProductFeatures.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ProductFeatures, {
    as: 'features',
    foreignKey: {
        name: 'productId'
    }
});


//TBL_ProductShippingReturnsInfo
db.TBL_ProductShippingReturnsInfo.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ProductShippingReturnsInfo, {
    as: 'shippingReturnsInfo',
    foreignKey: {
        name: 'productId'
    }
});


//TBL_ProductWarrentyInfo
db.TBL_ProductWarrentyInfo.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ProductWarrentyInfo, {
    as: 'warrentyInfo',
    foreignKey: {
        name: 'productId'
    }
});


//TBL_ReviewRating
db.TBL_ReviewRating.belongsTo(db.TBL_Product, {
    as: 'product',
    foreignKey: {
        name: 'productId'
    }
});

db.TBL_Product.hasMany(db.TBL_ReviewRating, {
    as: 'reviewRatings',
    foreignKey: {
        name: 'productId'
    }
});

module.exports = db;