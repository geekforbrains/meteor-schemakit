validations = {
  required: function(property, bool, message) {
    if(!message) message = property.createMessage('is required');
    if(!property.value || property.value.length <= 0) property.error = message;
  },

  min: function(proprety, min, message) {
    if(!message) message = property.createMessage('must be at least ' + min + ' characters');
    if(property.value.length < min) property.error = message;
  },

  email: function(property, bool, message) {
    console.log('validating email on %s', property.name);
    if(!message) message = property.createMessage('must be a valid email address');
    var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(pattern.test(property.value) !== bool) property.error = message;
  }
};
