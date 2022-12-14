// // session setup, server side pages
// // $ yarn add \
// //     express-session \
// //     connect-mongodb-session \
// //     connect-flash

// const session = require('express-session');
// const MongoDbStore = require('connect-mongodb-session')(session);
// const flash = require('connect-flash');

// // session store setup
// const sessionStore = new MongoDbStore({
//   uri: '<store.uri@mongo.db>',
//   collection: '<sessions --collection-name>',
// });

// // session setup
// app.use(session({
//   secret: "<id>",
//   // store update sessions only
//   resave: false,
//   // dont save blank sessions
//   saveUninitialized: false,
//   // session cookie setup
//   cookie: {
//     maxAge: "<date>",
//     expires: "<date>"
//   },
//   store: sessionStore,
// }));

// // flash setup
// // add flash messages to session; api: `req.flash()`
// // adds temp messages to session available for next request
// // @write req.flash("<key>", "<message>");
// // @read req.flash("<key>"), only avaiable for next request
// // can pass info/outcome of previous page actions to views
// app.use(flash());

// // usage
// req.session.foo = 'bar';
