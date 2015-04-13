Package.describe({
  name: 'geekforbrains:schemakit',
  version: '0.0.3',
  summary: 'A dead-easy package for validating schemas in Meteor.',
  git: 'https://github.com/geekforbrains/meteor-schemakit',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('underscore');
  api.addFiles(['schemakit.js', 'property.js', 'validations.js']);
  api.export('SchemaKit', ['client', 'server']);
});
