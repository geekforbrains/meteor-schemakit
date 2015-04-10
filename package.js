Package.describe({
  name: 'geekforbrains:schemakit',
  version: '0.0.2',
  summary: 'A dead-easy package for validating schemas in Meteor.',
  git: 'https://github.com/geekforbrains/meteor-schemakit',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('schemakit.js');
  api.export('SchemaKit', ['client', 'server']);
});

// No tests yet (I'm a baaad, baaad boy)
