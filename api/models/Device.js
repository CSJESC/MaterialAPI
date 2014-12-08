/**
* Device.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  descriptions: {
    name: "The name of the device",
    weight: "The total weight of the device"
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
  	manufacturer: {
  		model: "manufacturer"
  	},
    parts: {
      collection: "part",
      via: "inDevices"
    }
  }
};

