const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
// const uuidv4 = require('uuid/v4');
const APIError = require('../errors/api-error');
const {
  env,
  jwtSecret,
  jwtExpirationInterval,
  JWT_SECRET_SESSION,
  JWT_SECRET_SESSION_EXPIRE,
} = require('../config/vars');

const roles = ['user', 'admin'];

const withAccessTokens = (user) => ({
  user,
  accessToken: user.token(),
  sessionToken: user.sessionToken(),
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      index: true,
    },
    // services: {
    //   facebook: String,
    //   google: String,
    // },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    picture: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      'id',
      'name',
      'email',
      'picture',
      'role',
      'createdAt',
    ];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const payload = {
      sub: this._id,
      exp: moment().add(jwtExpirationInterval, 'seconds').unix(),
      iat: moment().unix(),
    };
    return jwt.encode(payload, jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },

  sessionToken() {
    const payload = {
      sub: this._id,
      exp: moment().add(JWT_SECRET_SESSION_EXPIRE, 'seconds').unix(),
      iat: moment().unix(),
      user_id: this._id,
    };
    return jwt.encode(payload, JWT_SECRET_SESSION);
  },

  verifySessionToken(token) {
    const { user_id } = jwt.decode(token, JWT_SECRET_SESSION);
    // protected data matches this user
    return user_id === this._id.toString();
  },
});

userSchema.statics = {
  roles,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    let user;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await this.findById(id).exec();
    }
    if (user) {
      return user;
    }

    throw new APIError({
      message: 'User does not exist',
      status: httpStatus.NOT_FOUND,
    });
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(auth) {
    const { email, password, refreshObject } = auth;
    if (!email)
      throw new APIError({
        message: 'An email is required to generate a token',
      });

    const user = await this.findOne({ email }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (password) {
      if (user && (await user.passwordMatches(password))) {
        return withAccessTokens(user);
      }
      err.message = 'Incorrect email or password';
    } else if (refreshObject && refreshObject.userEmail === email) {
      if (moment(refreshObject.expires).isBefore()) {
        err.message = 'Invalid refresh token.';
      } else {
        return withAccessTokens(user);
      }
    } else {
      err.message = 'Incorrect email or refreshToken';
    }
    throw new APIError(err);
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ page = 1, perPage = 30, name, email, role }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [
          {
            field: 'email',
            location: 'body',
            messages: ['"email" already exists'],
          },
        ],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

  // async oAuthLogin({
  //   service, id, email, name, picture,
  // }) {
  //   const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
  //   if (user) {
  //     user.services[service] = id;
  //     if (!user.name) user.name = name;
  //     if (!user.picture) user.picture = picture;
  //     return user.save();
  //   }
  //   const password = uuidv4();
  //   return this.create({
  //     services: { [service]: id }, email, password, name, picture,
  //   });
  // },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
