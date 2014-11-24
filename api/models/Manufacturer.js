/**
* Manufacturer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  descriptions: {
    name: "The manufacturer's name",
    email: "The manufacturer's email contact"
  },
  attributes: {
  	name: {
  		type: "string",
  		maxLength: 140,
  		notEmpty: true,
  		unique: true,
  		required: true
  	},
    email: {
      type: 'email',
      unique: true,
      email: true
    },
    devices: {
      collection: "device",
      via: "manufacturer"
    },
    components: {
      collection: "component",
      via: "manufacturer"
    },
    parts: {
      collection: "part",
      via: "manufacturer"
    }
  }
};