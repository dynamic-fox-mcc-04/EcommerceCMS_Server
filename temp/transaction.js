'use strict';
module.exports = (sequelize, DataTypes) => {
  
  class Transaction extends sequelize.Sequelize.Model{}

  Transaction.init({
    ProductsId :{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notNull:{
          args:true,
          msg : "Productid required"
        }
      }
    }, 
    Customer_detailsId :{
    type:DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg : "detailid required"
      }
    }
  }, 
  price:{
    type: DataTypes.INTEGER,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"Price required"
      }
    }
  }, 
  status:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"Status required"
      }
    }
  }, 
  payment_method:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notNull:{
        args:true,
        msg:"payment Method required"
      }
    }
  }   
},{
  sequelize,
  modelName:"Transaction"  
})

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Custumer_detail)
    Transaction.belongsTo(models.Product)
    // associations can be defined here
  };
  return Transaction;
};