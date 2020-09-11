'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.hasMany(models.Task)
    }
  };
  Organization.init({
    organization_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          args : true,
          msg : 'Organization name must not empty!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};