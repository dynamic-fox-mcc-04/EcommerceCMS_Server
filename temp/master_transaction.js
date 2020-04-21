'use strict';
module.exports = (sequelize, DataTypes) => {
  const Master_transaction = sequelize.define('Master_transaction', {
    number_trans: DataTypes.STRING,
    total_price: DataTypes.INTEGER,
    trasaction_date: DataTypes.DATE
  }, {});
  Master_transaction.associate = function(models) {
    // associations can be defined here
  };
  return Master_transaction;
};