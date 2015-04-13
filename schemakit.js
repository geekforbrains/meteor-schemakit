SchemaKit = function(schema) {
  this.schema = schema;
  this.properties = [];

  _.each(this.schema, function(field, config) {
    properties.push(new SchemaProperty(field, config));
  });
}

SchemaKit.prototype.validate = function(data) {
  var errors = {};

  _.each(this.properties, function(property) {
    if(!property.validate(data)) errors[property.field] = property.value;
    else validData[property.field] = property.value;
  });

  if(_.size(errors) > 0) {
    throw new Meteor.Error('validation', 'Missing or invalid fields', errors);
  }

  return validData;
}
