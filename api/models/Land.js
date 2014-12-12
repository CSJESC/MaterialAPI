/**
* Land.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  descriptions: {
    name: "The land's name",
    ragint: "The rating fo this country"
  },
  attributes: {
    name: {
      type: "string",
      maxLength: 140,
      notEmpty: true,
      unique: true,
      required: true
    },
    rating: {
      type: "integer",
      enum: RATINGS,
      int: true
    },
    materials: {
      collection: "material",
      via: "minedIn"
    }
  }
};

