/**
* Material.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var RATINGS = [1, 2, 3, 4, 5];

module.exports = {
  descriptions: {
    name: "The name of the material",
    weight: "The weight of the material in a specific part"
  },
  attributes: {
  	name: {
  		type: "string",
  		notEmpty: true,
  		unique: true,
  		required: true
    },
    ratingEnv: {
      type: 'integer',
      enum: RATINGS,
      int: true
    },
    ratingSoc: {
      type: 'integer',
      enum: RATINGS,
      int: true
    },
    ratingHum: {
      type: 'integer',
      enum: RATINGS,
      int: true
    },
    minedIn: {
      type: 'array',
      array: true
    },
    weight: {
      type: "integer",
      int: true
    },
    inPart: {
      model: "part"
    }
  }
};

