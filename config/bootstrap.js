/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var fs = require("fs-extra");
var YAML = require("js-yaml");

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports.bootstrap = function(cb) {

	// It's very important to trigger this callback method when you are finished
	// with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

	var models = global.sails.models;
	var apis = [];
	var specs = [];
	var docsDir = "./api/docs/";
	var operations = ["GET", "POST", "PUT", "DELETE"];
	var blacklist = ["createdAt", "updatedAt", "id"];

	fs.ensureDir(docsDir, function(err) {
		if (err) throw err;

		_.keys(models).forEach(function(path) {
			var resources = {};

			resources.path = "/" + path + "s";
			resources.operations = [];

			spec = {
				"resourcePath": resources.path,
				"swaggerVersion": "2.0",
				"basePath": "http://localhost:1337/api/v1",
				"apis": []
			};

			operations.forEach(function(method, i) {
				resources.operations[i] = {};
				resources.operations[i].parameters = []
				resources.operations[i].httpMethod = method;
				resources.operations[i].consumes = ["application/json"];
				resources.operations[i].produces = ["application/json"];
				resources.operations[i].protocols = ["http"];
				resources.operations[i].nickname = (method + path).toLowerCase();


				_.keys(models[path]._attributes).forEach(function(attribute) {
					if (blacklist.indexOf(attribute) == -1) {
						var attributes = models[path]._attributes;
						var attr = attributes[attribute];
						var result = {
							name: attribute,
							description: require('../api/models/' + capitalize(path)).descriptions[attribute] || "",
							dataType: attr.type || "foreign key",
							paramType: "query"
						};


						if (attr.unique)
							result.unique = attr.unique

						if (attr.required && (method !== "GET"))
							result.required = attr.required

						resources.operations[i].parameters.push(result);
					}
				});
				if (method !== "POST") {
					resources.operations[i].parameters.push({
						name: "id",
						description: "The ID",
						dataType: "ID",
						paramType: "query",
						required: (method === "DELETE")
					});
				}

			});
			spec.apis.push(resources);

			fs.writeFile(docsDir + path + ".yml", YAML.dump(spec), function(err) {
				if (err) throw err;
			});
		});

	});

	cb();

};