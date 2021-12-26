'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        fund.belongsToMany(models.User, {
            as: "userDonate",
            through: {
                model: "Payment",
                as: "payment"
            }
            // foreignKey: "userId"
        })

        fund.hasMany(models.Payment, {
            as: "payment",
            // foreignKey: {
            //     name: "fundId"
            // }
        })
    }
  };
  fund.init({
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    goal: DataTypes.INTEGER,
    description: DataTypes.STRING,
    adminId: DataTypes.INTEGER
    // paymentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fund',
  });
  return fund;
};