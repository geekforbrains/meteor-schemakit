SchemaKit = function(schema) {
  var self = this;
  self.schema = schema;
  self.properties = [];

  _.each(this.schema, function(config, name) {
    self.properties.push(new SchemaProperty(name, config));
  });
}

SchemaKit.prototype.validate = function(data) {
  var errors = {};
  var validData = {};

  _.each(this.properties, function(property) {
    if(!property.validate(data)) errors[property.name] = property.error;
    else validData[property.name] = property.value;
  });

  if(_.size(errors) > 0) {
    throw new Meteor.Error('validation', 'Missing or invalid fields', errors);
  }

  return validData;
}
