/**
* Material.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  descriptions: {
    name: "The name of the material",
    recyclingRating: "The environment-rating of this material",
    healthRating: "The health-risks related to this material",
    countryRating: "The rating of working and political conditions in the country where this material is mined",
    minedIn: "The land where the material originally come from"
  },
  attributes: {
    name: {
      type: "string",
      notEmpty: true,
      unique: true,
      required: true
    },
    description: {
      type: "string"
    },
    recyclingRating: {
      type: "integer",
      int: true,
      min: 1,
      max: 5
    },
    healthRating: {
      type: "integer",
      int: true,
      min: 0,
      max: 4
    },
    countryRating: {
      type: "int",
      int: true,
      min: 1,
      max: 5
    },
    minedIn: {
      collection: "land",
      via: "materials"
    },
    usedIn: {
      model: "part"
    },
  },
  beforeCreate: function(values, cb) {
    
    if (typeof values.minedIn === "Array") {
      var sum = 0;
      values.minedIn.forEach(function(countryID) {
        Land.find({id: countryID}).exec(function(err, response) {
          if (err) sails.log(err);

          sum += response.totalRating
        });
      });

      values.countryRating = sum / values.minedIn.length;
      cb();
    } else {
      Land.find({id: values.minedIn}).exec(function(err, response) {
        if (err) sails.log(err);

        values.countryRating = response[0].totalRating;
        cb();
      }); 
    }

  }
};

