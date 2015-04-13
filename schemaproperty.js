SchemaProperty = function(field, config) {
  this.error = null;
  this.field = field;
  this.config = config;
  this.value = null;
}

SchemaProperty.prototype.validate = function(data) {
  this.error = null;
  this.value = data[this.field];

  if(!this.value && _.isFunction(this.config.default)) {
    this.value = this.config.default(data);
  } else if(!this.value) {
    this.value = this.config.default;
  }

  if(this.config.trim) this.value = this.value.trim();
  if(this.config.lowercase) this.value = this.value.toLowerCase();

  if(this.value && !Match.test(this.value, this.type)) {
    return 'Invalid type';
  } else {
    _.each(this.config.validate, function(options, action) {
      if(this.error) return;
      else if(_.isFunction(option)) option(this.value);
      else if(_.isObject(option)) this.validations[action](option.is, option.message);
      else this.validations[action](option);
    });
  }

  return !!this.error;
}

SchemaProperty.prototype.createMessage = function(message) {
  return (function(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  })(this.field.replace(/[-_]/g, ' ')) + ' ' + message;
}

SchemaProperty.prototype.validations = {
  required: function(bool, message) {
    if(!message) message = this.createMessage('is required');
    if(!value || value.length <= 0) this.error = message;
  },

  min: function(min, message) {
    if(!message) message = this.createMessage('must be at least ' + min + ' characters');
    if(value.length < min) this.error = message;
  },

  email: function(bool, message) {
    if(!message) message = this.createMessage('must be a valid email address');
    var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(pattern.test(value) !== bool) this.error = message;
  }
}
