SchemaKit = function(schema) {
  this.schema = schema;
}

SchemaKit.prototype.validate = function(data) {
  errors = {};
  validData = {};

  for(var field in this.schema) {
    if(this.schema.hasOwnProperty(field)) {
      validData[field] = data[field];

      var fieldValue = validData[field];
      var schemaProperty = this.schema[field];

      if(!fieldValue && schemaProperty.default) {
        fieldValue = schemaProperty.default();
      }

      if(schemaProperty.trim) fieldValue = fieldValue.trim();
      if(schemaProperty.lowercase) fieldValue = fieldValue.toLowerCase();

      validData[field] = fieldValue;

      if(fieldValue && !Match.test(fieldValue, schemaProperty.type)) {
        errors[field] = 'Invalid type';
      } else {
        for(var method in schemaProperty.validate) {
          if(schemaProperty.validate.hasOwnProperty(method)) {
            var options = schemaProperty.validate[method];
            if(typeof options === 'function') {
              fieldError = options(field, fieldValue);
            } else if(typeof options === 'object') {
              fieldError = this.validations[method](field, fieldValue, options.is, options.message);
            } else {
              fieldError = this.validations[method](field, fieldValue, options)
            }
          }

          if(fieldError)  {
            errors[field] = fieldError;
            break;
          }
        }
      }
    }
  }

  if(Object.keys(errors).length > 0) {
    throw new Meteor.Error('validation', 'Missing or invalid fields', errors);
  }

  return validData;
}

SchemaKit.prototype.validations = {
  required: function(field, value, bool, message) {
    if(!message) message = fieldToMessage(field, 'is required');
    if(!value || value.length <= 0) return message;
  },

  min: function(field, value, min, message) {
    if(!message) message = fieldToMessage(field, 'must be at least ' + min + ' characters');
    if(value.length < min) return message;
  },

  email: function(field, value, bool, message) {
    if(!message) message = fieldToMessage(field, 'must be a valid email address');
    var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(pattern.test(value) !== bool) return message;
  }
}

function fieldToMessage(field, message) {
  return capitalize(field.replace(/[-_]/g, ' ')) + ' ' + message;
}

function capitalize(str) {
  return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
