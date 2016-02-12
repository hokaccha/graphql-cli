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
