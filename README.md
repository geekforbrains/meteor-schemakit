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
      required: {is: true, message: "Holy shit, you're how old!?"}
    }
  },
  email: {
    type: String,
    validate: {
      email: true,
      custom: function(field, value) {
        if(People.findOne({email: value})) {
          return 'Email already in use'
        }
      }
    },
    lowercase: true,
    trim: true
  },
  created_at: {
    type: Date,
    default: function() {
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

The above throws a `Meteor.Error` with the an `errorType: schemakit` and the
`details` property set to:

```javascript
{
  name: Name is required,
  age: Invalid type,
  email: Must be a valid email address
}
```

Notice that the not_in_schema field was stripped (because its not in the schema).

Now legit data.

```javascript
var legitData = {
  name: 'Foo Bar',
  age: 87,
  email: 'foo@bar.com',
  not_in_schema: true // this is still ignored!
}

var validatedData = PersonSchema.validate(legitData);
```

In the example above, `validatedData` would have `created_at` set automatically
and the `not_in_schema` property would be stripped.
