/**
 * Swagger Docs generator
 *
 *
 * This is a quick&dirty script to generate the YAML files needed by Swagger-express
 *
 */

"use strict";
var YAML = require("yamlish"),
    fs = require("fs-extra"),
    path = require("path"),

    config = require(path.resolve(__dirname, '..', 'config', 'swagger')).swagger,

    modelsDir = path.resolve(__dirname, '..', config.modelsFolder);


fs.readdir(modelsDir, function(err, files) {
  fs.ensureDir(config.docsFolder, function(err) {
    if (err) throw err;

    files.forEach(function(file) {
      if (file !== 'Passport.js' && file !== 'User.js') {
        var model = require(path.resolve(__dirname, '..', modelsDir, file));
        var modelName = file.replace(".js", "").toLowerCase() + "s";
        var resourcePath = "/" + modelName;

        var spec = {
            resourcePath: resourcePath,
            swaggerVersion: config.swaggerVersion,
            basePath: config.apiURL,
            apis: [{
              path: resourcePath,
              operations: []
            }]
        };

        config.operations.forEach(function(method) {
          var result = {
            httpMethod: method,
            consumes: "application/json",
            produces: "application/json",
            protocols: "http",
            nickname: method.toLowerCase() + modelName,
            parameters: []
          };

          Object.keys(model.attributes).forEach(function(attribute) {

            var type = model.attributes[attribute].type;
            if (type === "array") {
              type = "string";
            } else if (!type) {
              type = "foreignKey";
            }

            var param = {
              name: attribute,
              description: model.descriptions[attribute] || "",
              dataType: type,
              paramType: "query"
            };

            if (model.attributes[attribute].required)
              param.required = model.attributes[attribute].required;

            if (model.attributes[attribute].unique)
              param.unique = model.attributes[attribute].unique;

            result.parameters.push(param);

          });

          spec.apis[0].operations.push(result);

          // fs.writeFile(path.resolve(__dirname, outputFolder, modelName + ".json"), JSON.stringify(spec), function(err) {
          //   if (err) throw err;
          // });

          fs.writeFile(path.resolve(__dirname, '..', config.docsFolder, modelName + ".yml"), YAML.encode(spec), function(err) {
            if (err) throw err;
          });
        });
      
      }

    });
  });
});
