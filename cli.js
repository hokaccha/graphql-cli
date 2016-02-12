#!/usr/bin/env node

'use strict';

var cwd = process.cwd();
var path = require('path');
var program = require('commander');
var pkg = require('./package.json');

program
  .version(pkg.version)
  .option('-s, --schema-file <path>', 'schema file path')
  .option('-m, --member <name>', 'schema member')
  .option('-b, --babel', 'use babel')
  .option('-p, --print-schema', 'print schema')
  .option('-q, --query <query>', 'graphql query string')
  .parse(process.argv);

if (!program.schemaFile) {
  console.error('schema file is required');
  process.exit(1);
}

// load schema
module.paths.push(cwd, path.join(cwd, 'node_modules'));
if (program.babel) {
  require('babel-register');
}
var schema = require(path.join(process.cwd(), program.schemaFile));
if (program.member) {
  schema = schema[program.member];
}
if (schema.constructor.name !== 'GraphQLSchema') {
  console.error('Error: Imported object is not `GraphQLSchema`');
  process.exit(1);
}

if (program.printSchema) {
  var printSchema = require('graphql/utilities').printSchema;
  console.log(printSchema(schema));
}
else if (program.query) {
  var graphql = require('graphql').graphql;
  graphql(schema, program.query).then(function(result) {
    if (result.errors) {
      result.errors.forEach(function(err) {
        console.error(err.message);
      });
      process.exit(1);
    }
    else {
      console.log(JSON.stringify(result, null, 2));
    }
  }).catch(function(err) {
    console.error(err);
    process.exit(1);
  });
}
else {
  console.error('Error: --print-schema or --query <query> is required');
  process.exit(1);
}
