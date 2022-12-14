const setHttpPlugin = {
  async requestDidStart() {
    return {
      // eslint-disable-next-line no-unused-vars
      async willSendResponse({
        response,
        contextValue: {
          res: { CODE },
        },
      }) {
        // add headers, set status

        // response.http.headers.set('custom-header', 'hello');
        // if (response.body.kind === 'single' &&
        //     response.body.singleResult.errors?.[0]?.extensions?.code === 'TEAPOT') {
        //   response.http.status = 418;
        // }

        // assigned .CODE at resolvers
        // http status code to send
        if (null != CODE) response.http.status = CODE;
      },
    };
  },
};

module.exports = setHttpPlugin;

// logger: [Logger],
// cache: [InMemoryLRUCache],
// schema: [GraphQLSchema],
// request: [Object],
// response: [Object],
// contextValue: [Object],
// metrics: [Object],
// overallCachePolicy: [Object],
// queryHash: 'fcd3f1b435fe66df034c4d552dbfeed5b456ae0c4b0c0ed258752f9baedc056c',
// source: 'mutation { addMessage(content: "222") { id, content } }',
// document: [Object],
// operation: [Object],
// operationName: null
