SchemaProperty = function(field, config) {
  this.error = null;
  this.field = field;
  this.config = config;
  this.value = null;
}

SchemaProperty.prototype.validate = function(data) {
  var self = this;
  self.error = null;
  self.value = data[self.field];

  if(!self.value && _.isFunction(self.config.default)) {
    self.value = self.config.default(data);
  } else if(!self.value) {
    self.value = self.config.default;
  }

  if(self.config.trim) self.value = self.value.trim();
  if(self.config.lowercase) self.value = self.value.toLowerCase();

  if(self.value && !Match.test(self.value, self.type)) {
    return 'Invalid type';
  } else {
    _.each(self.config.validate, function(option, action) {
      if(_.isNull(self.error)) { // Ignore further checks if error is set
        if(_.isFunction(option)) option(self, data);
        else if(_.isObject(option)) validations[action](self, option.is, option.message);
        else validations[action](self, option);
      }
    });
  }

  return _.isNull(self.error);
}

SchemaProperty.prototype.createMessage = function(message) {
  return (function(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  })(this.field.replace(/[-_]/g, ' ')) + ' ' + message;
}
