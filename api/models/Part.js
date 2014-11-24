/**
* Part.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  descriptions: {
    name: "The name of the electronic part",
    weight: "The weight of the electronic part",
    materials: "The IDs of included materials",
    included: "The IDs of the included component",
    manufacturer: "The ID of the manufacturer"
  },
  attributes: {
  	name: {
  		type: "string",
  		notEmpty: true,
  		unique: true,
  		required: true
  	},
    weight: {
      type: "integer",
      int: true
    },
    materials: {
    	collection: "material",
    	via: "inPart"
    },
    included: {
    	model: "component"
    },
    manufacturer: {
    	model: "manufacturer"
    }
  }
};

