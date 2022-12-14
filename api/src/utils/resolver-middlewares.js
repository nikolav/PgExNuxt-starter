const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require('@apollo/server/errors');
const httpStatus = require('http-status');
//
module.exports = (...middleware) => {
  const handler = middleware.pop();
  return async (...resolverArguments) => {
    try {
      // run each middlware in turn
      // skip resolver @error
      for (let i = 0, l = middleware.length; i < l; i++) {
        const allowed = await middleware[i](...resolverArguments);
        if (true !== allowed)
          // throw custom 400 @graphql
          // https://www.apollographql.com/docs/apollo-server/data/errors/
          throw new GraphQLError(`invalid input`, {
            // https://www.apollographql.com/docs/apollo-server/data/errors/#built-in-error-codes
            // https://www.apollographql.com/docs/apollo-server/data/errors/#setting-http-status-code-and-headers
            extensions: {
              code: ApolloServerErrorCode.BAD_REQUEST,
              http: { status: httpStatus.BAD_REQUEST },
            },
          });
      }
      // all middleware checks, resolver g2g here
      return handler(...resolverArguments);
    } catch (error) {
      throw error;
    }
  };
};
