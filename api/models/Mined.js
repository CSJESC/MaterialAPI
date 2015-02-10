/**
 * minedIn
 *
 * @module      :: Model
 * @description :: A through relationship between the Material and the Country model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'country_materials__material_minedin',
 
  junctionTable: true,
  schema: true,
  autoCreatedAt : false,
  autoUpdatedAt : false,
  attributes: {
    country_materials: {
        type: "integer",
        foreignKey: true,
        references: "country",
        on: "id",
        via: "material_minedIn"
      },
    material_minedIn: {
        type: "integer",
        foreignKey: true,
        references: "material",
        on: "id",
        via: "country_materials"
    },
    share: {
      type: "integer",
      min: 0,
      max: 100
    }
  }
};
