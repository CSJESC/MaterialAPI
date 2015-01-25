/**
* Land.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  descriptions: {
    name: "The country's name",
    mineralIndustryRating: "The Mineral Industry rating fo this country",
    workingConditionRating: "The rating about the Rating Codintions in this country",
    humanRightsRating: "The rating about Human Rights in this country",
    localAvarageSalary: "The local avarage salary in this country"
  },
  attributes: {
    name: {
      type: "string",
      maxLength: 140,
      notEmpty: true,
      unique: true,
      required: true
    },
    mineralIndustryRating: {
      type: "integer",
      int: true,
      min: 0,
      max: 70
    },
    workingConditionsRating: {
      type: "integer",
      int: true,
      min: 1,
      max: 5
    },
    humanRightsRating: {
      type: "integer",
      int: true,
      min: 0,
      max: 100
    },
    localAvarageSalary: {
      type: "integer",
      int: true
    },
    totalRating: {
      type: "integer",
      int: true,
      min: 0,
      max: 5
    },
    materials: {
      collection: "material",
      via: "minedIn"
    }
  },
  beforeValidate: function(values, cb) {
    // TODO: Calculate the total rating
    values.totalRating = 1;
    cb();
  }
};

