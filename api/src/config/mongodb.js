// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { mongo: { uri } } = require('./vars');
// // const uri = "mongodb+srv://<USER>:<PASSWORD>@<HOST>/<DB>;

// let mongo = null;

// module.exports = new Promise((resolve, reject) => {
//   if (mongo)
//     return resolve(mongo);

//   try {
//     const client = new MongoClient(uri,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverApi: ServerApiVersion.v1,
//       });

//     client.connect(error => {
//       if (error)
//         return reject(error)

//       mongo = {
//         client,
//         db: client.db()
//       }
//       //
//       resolve(mongo);
//     });

//   } catch (error) {
//     reject(error);
//   }
// });
