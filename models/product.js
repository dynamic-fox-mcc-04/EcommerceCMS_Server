'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model }  = sequelize.Sequelize;

  class Product extends Model {}

  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Name cannot be null'
        }
      }
    },

    image_url: {
       type :  DataTypes.STRING,
       allowNull : false,
       validate : {
         isUrl : {
           args : true,
           msg : 'must Url format (http://foo.com)'
         },
         notEmpty : {
          args : true,
          msg : 'Image_url cannot be null'
        }
       }
    },
    price: {
     type : DataTypes.INTEGER,
     allowNull : false,
     validate : {
      notEmpty : {
        args : true,
        msg : 'Price cannot be null'
      },
      isInt : {
        args : true,
        msg : 'Price must be a number'
      },
      minValue(value){
        if ( value < 0 ){
          throw new Error('Price must greater than or equal to 0')
        }
      }
     }
    },
    stock: {
     type : DataTypes.INTEGER,
     allowNull : false,
     validate : {
      notEmpty : {
        args : true,
        msg : 'Stock cannot be null'
      },
      isInt : {
        args : true,
        msg : 'Stock must be a number'
      },
      minValue(value){
        if ( value < 0 ){
          throw new Error('Stock must greater than or equal to 0')
        }
      }
     }
    }
  }, {
    sequelize
  })
 
  Product.associate = function(models) {
    Product.belongsTo(models.User)
  };
  return Product;
};