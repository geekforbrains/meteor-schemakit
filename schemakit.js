SchemaKit = function(schema) {
  var self = this;
  self.schema = schema;
  self.properties = {};

  _.each(this.schema, function(config, name) {
    self.properties[name] = new SchemaProperty(name, config);
  });
}

/**
 * Validate all properties in this schema against the given data.
 */
SchemaKit.prototype.validate = function(data) {
  var errors = {};
  var validData = {};

  _.each(this.properties, function(property) {
    try {
      validData[property.name] = property.validate(data[property.name], data);
    } catch(e) {
      errors = _.extend(errors, e.details);
    }
  });

  if(_.size(errors) > 0) {
    throw new Meteor.Error('validation', 'Missing or invalid fields', errors);
  }

  return validData;
}

/**
 * Validate an individual property against a value.
 */
SchemaKit.prototype.validateProperty = function(name, value) {
  return this.properties[name].validate(value);
}
