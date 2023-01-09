const { DataTypes } = require('sequelize');

const connection = require('../../config/sequelize');

const configureMain = require('./main');
const configureMessage = require('./messages');
const configureSession = require('./session');
const configureRole = require('./roles');
const configureRoleUser = require('./role-user');
const configureTokens = require('./tokens');
const configureUpload = require('./upload');
const configureComment = require('./comments');
const configureTag = require('./tag');
const configureCollection = require('./collection');

module.exports = new Promise(async (resolve, reject) => {
  try {
    const client = await connection;

    const Main = configureMain(client);
    const Message = configureMessage(client);
    const Role = configureRole(client);
    const RoleUser = configureRoleUser(client);
    const Session = configureSession(client);
    const Tokens = configureTokens(client);
    const Upload = configureUpload(client);
    const Comment = configureComment(client);

    const Tag = configureTag(client);
    const Collection = configureCollection(client);
    const CollectionTag =
      client.define('CollectionTag',
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          CollectionId: {
            type: DataTypes.UUID,
            index: true,
            references: {
              model: Collection,
              key: 'id'
            }
          },
          TagId: {
            type: DataTypes.UUID,
            index: true,
            references: {
              model: Tag,
              key: 'id'
            }
          },
        }, {
        tableName: 'ln_collection_tag',
        timestamps: true,
      });
    Tag.belongsToMany(Collection, { through: CollectionTag });
    Collection.belongsToMany(Tag, { through: CollectionTag });

    // // https://sequelize.org/docs/v6/core-concepts/assocs/
    // // declare schema.relations here
    // // 1-m
    // Post.belongsTo(User, { constraints: true, onDelete: 'CASCADE', as: 'author', foreignKey: 'user_id' });
    // User.hasMany(Post);
    // // 1-1
    // User.hasOne(Cart);
    // Cart.belongsTo(User);
    // // 1-m
    // Order.belongsTo(User);
    // User.hasMany(Order);
    // // m-n
    // Cart.belongsToMany(Product, { through: CartItem });
    // Product.belongsToMany(Cart, { through: CartItem });
    // // m-n
    // Order.belongsToMany(Product, { through: OrderItem });
    // Product.belongsToMany(Order, { through: OrderItem, uniqueKey: string/name | false/dont-create-uniq-key });

    // To create a One-To-One relationship, the hasOne and belongsTo associations are used together;
    // To create a One-To-Many relationship, the hasMany and belongsTo associations are used together;
    // To create a Many-To-Many relationship, two belongsToMany calls are used together.

    // const Movie = sequelize.define('Movie', { name: DataTypes.STRING });
    // const Actor = sequelize.define('Actor', { name: DataTypes.STRING });
    // const ActorMovies = sequelize.define('ActorMovies', {
    //   MovieId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: Movie, // 'Movies' would also work
    //       key: 'id'
    //     }
    //   },
    //   ActorId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //       model: Actor, // 'Actors' would also work
    //       key: 'id'
    //     }
    //   }
    // });
    // Movie.belongsToMany(Actor, { through: ActorMovies });
    // Actor.belongsToMany(Movie, { through: ActorMovies });

    /*
      # https://sequelize.org/docs/v6/core-concepts/assocs/#association-aliases--custom-foreign-keys
      # https://sequelize.org/docs/v6/core-concepts/assocs/#defining-an-alias
      # https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
      # create alias for the foreign key
      # creates `Ship.leaderId`
      # eager-load: await Ship.findAll({ include: 'leader' }); ...ship.leader.name
      # lazy-load: await ship.getLeader();
      Ship.belongsTo(Captain, { as: 'leader' });
    */

    // quick shortcut in models
    // ..or, RoleUser.Role = client.models.Role

    RoleUser.Role = Role;
    // Tag.CollectionTag = CollectionTag;
    Collection.Tag = Tag;
    Collection.CollectionTag = CollectionTag;

    // collect all models in namespace
    const model = {
      client,
      Main,
      Message,
      Session,
      Role,
      RoleUser,
      Tokens,
      Upload,
      Comment,
      Tag,
      Collection,
      CollectionTag,
    };

    // schema.push
    await client

      // create new tables, dont drop-create
      .sync();

    // drop/rebuild *tables
    // .sync({ force: true });

    // drop/rebuild tables matchig regex
    // .sync({ force: true, match: /_temp$/ });

    // modify table schema and columns
    // .sync({ alter: true });

    resolve(model);
  } catch (error) {
    reject(error);
  }
});
