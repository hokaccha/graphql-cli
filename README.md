# graphql-cli

**under development**.

Command line utilities for GraphQL.

## Examples

There is schema.js that is schema implementation of GraphQL.

```javascript
import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';

let users = [
  { id: "1", name: 'foo' },
  { id: "2", name: 'bar' },
  { id: "3", name: 'baz' },
];

let userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }
});

let queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(userType),
      resolve: () => new Promise(resolve => resolve(users)),
    },
  }
});

export default new GraphQLSchema({ query: queryType });
```

print schema:

```
$ graphql --schema-file schema.js --member default --babel --print-schema
type Query {
  users: [User]
}

type User {
  id: ID
  name: String
}
```

execute query:

```
$ graphql --schema-file schema.js --member default --babel --query '{ users { id, name } }'
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "foo"
      },
      {
        "id": "2",
        "name": "bar"
      },
      {
        "id": "3",
        "name": "baz"
      }
    ]
  }
}
```
