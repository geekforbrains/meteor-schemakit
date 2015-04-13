SchemaKit = function(schema) {
  var self = this;
  self.schema = schema;
  self.properties = [];

  _.each(this.schema, function(config, field) {
    self.properties.push(new SchemaProperty(field, config));
  });
}

SchemaKit.prototype.validate = function(data) {
  var errors = {};
  var validData = {};

  _.each(this.properties, function(property) {
    if(!property.validate(data)) errors[property.field] = property.error;
    else validData[property.field] = property.value;
  });

  if(_.size(errors) > 0) {
    throw new Meteor.Error('validation', 'Missing or invalid fields', errors);
  }

  return validData;
}
