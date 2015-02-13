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
    minedIn: "The country where the material originally come from",
    description: "A description of the material",
    links: "Some informative links about this material",
    youtube: "A link to the episode of Table Of Periodic Videos about this material",
    usedIn: "The ID of the parts/components where this material is used for"
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
    links: {
      type: "array",
      array: true,
      url: true
    },
    youtube: {
      type: "url",
      url: true
    },
    recyclingRating: {
      type: "integer",
      int: true,
      min: 1,
      max: 4
    },
    healthRating: {
      type: "integer",
      int: true,
      min: 0,
      max: 4
    },
    minedIn: {
      collection: "country",
      via: "materials"
    },
    usedIn: {
      collection: "part",
      via: "materials",
      dominant: true
    }
  }
};

