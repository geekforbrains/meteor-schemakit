SchemaKit
=========

SchemaKit is a package for easily working with schemas in Meteor.


Install
-------

```
meteor add geekforbrains:schemakit
```

Creating A Schema
-----------------

```javascript
PersonSchema = new SchemaKit({
  name: {
    type: String,
    validate: {required: true}
  },
  age: {
    type: Number,
    validate: {
      required: {is: true, message: "Holy shit, you're how old!?"} // custom message example
    }
  },
  email: {
    type: String,
    validate: {
      email: true,
      custom: function(property) { // custom validator example
        if(People.findOne({email: property.value})) {
          property.error = 'Email already in use';
        }
      }
    },
    lowercase: true,
    trim: true
  },
  created_at: {
    type: Date,
    default: function() { // default value example
      return new Date();
    }
  }
});
```

Validating Data
---------------

```javascript
var invalidData = {
  name: '',
  age: false,
  not_in_schema: true
}

PersonSchema.validate(invalidData);
```

The above throws a `Meteor.Error` with `error: validation` and the
`details` property set to the failed validations.

```javascript
{
  name: Name is required,
  age: Invalid type,
  email: Must be a valid email address
}
```

Notice that the `not_in_schema` field was stripped (because its not defined in the schema).

Now, legit data.

```javascript
var legitData = {
  name: 'Foo Bar',
  age: 87,
  email: 'foo@bar.com',
  not_in_schema: true // this is still ignored!
}

var validatedData = PersonSchema.validate(legitData);
```

In the example above, the `validate` method succeeds and returns a copy of the
valid data with any defaults set. This ensures the data you get back matches
your schema exactly.

The `validatedData` variable would have `created_at` set automatically and the
`not_in_schema` property would be stripped.


To Do
=====

- validate array types ex: `type: [String]`
- fix negative checks ex: `validate: {required: false}`
- support embedded schemas (ie: sub-schemas)
- ~~make data being validated available to `default` function~~
- ~~add method for validating individual properties~~
