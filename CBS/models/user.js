'use-strict';

const {model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        // define association here
      }
    }
    CBS.init({
        firstName:DataTypes.STRING,
        lastName:DataTypes.STRING,
        email:DataTypes.STRING,
        phoneNumber:DataTypes.STRING,
        address:DataTypes.STRING,
        password:DataTypes.STRING
    },{
        sequelize,
        modelName:'CBS'
    })
    return CBS;
}