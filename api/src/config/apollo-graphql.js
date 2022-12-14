const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const setHttpPlugin = require('./apollo-graphql-http-plugin');
// const {
//   ApolloServerPluginDrainHttpServer,
// } = require('@apollo/server/plugin/drainHttpServer');

const typeDefs = require('../graphql/schema.graphql');
const resolvers = require('../graphql/resolvers');
const {
  auth: { authorize },
} = require('../middlewares');
const { resolverContext } = require('../utils');

module.exports = new Promise(async (resolve, reject) => {
  // // enable gracefull server shutdown
  // const httpServer = http.createServer(app);

  let error;

  try {
    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
      // skip gui
      playground: false,
      plugins: [
        setHttpPlugin,
        // ApolloServerPluginDrainHttpServer({ httpServer }),
      ],

      // formatError: (formattedError, error) => {
      //   // Return a different error message
      //   if (
      //     formattedError.extensions.code ===
      //     ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
      //   ) {
      //     return formatError(formattedError, error);
      //   }
      //   // Otherwise return the formatted error. This error can also
      //   // be manipulated in other ways, as long as it's returned.
      //   return formattedError;
      // },
    });

    await apollo.start();

    const apolloMiddleware = [
      // token access level
      authorize(),
      // apollo route handler
      expressMiddleware(apollo, {
        // @context return services object shared in *resolvers, 3rd argument
        context: resolverContext,
      }),
    ];

    return resolve(apolloMiddleware);
  } catch (err) {
    error = err;
  }

  reject(error);
});
