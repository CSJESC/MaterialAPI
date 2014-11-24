/**
* Component.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  descriptions: {
    name: "The name of the component",
    weight: "The weight of the component in mg"
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
    parts: {
    	collection: "part",
    	via: "included"
    },
    manufacturer: {
    	model: "manufacturer"
    }
  }
};

