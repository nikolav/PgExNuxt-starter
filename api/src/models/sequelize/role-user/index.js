const { DataTypes, Model, Op } = require('sequelize');
const map = require('lodash/map');
const User = require('../../user.model');
// eslint-disable-next-line no-unused-vars
const { ROLE_HAS_ALL_POLICIES } = require('../../../config/vars');

class RoleUser extends Model {
  static async matchesRoles(user, rolesList) {
    const userRoles = await RoleUser.rolesByUser(user);
    return (
      // userRoles.includes(ROLE_HAS_ALL_POLICIES) ||
      rolesList.every((role) => userRoles.includes(role))
    );
  }

  static async rolesByUser(user) {
    const { Role } = RoleUser;
    const { id: userId } = user;

    // roleIds where userId = user._id
    const roleIds = map(
      await RoleUser.findAll({
        where: { userId },
        attributes: ['roleId'],
      }),
      'roleId'
    );

    // rolenames from roles where id in [ roleIds ]
    const roleNames = map(
      await Role.findAll(
        {
          where: {
            id: {
              [Op.in]: roleIds,
            },
          },
        },
        { attributes: ['name'] }
      ),
      'name'
    );

    return roleNames;
  }

  static async usersByRole(roleName) {
    const { Role } = RoleUser;

    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) return [];

    // userIds from roles-users where roleId = role-id
    const userIds = map(
      await RoleUser.findAll({
        where: { roleId: role.id },
        attributes: ['userId'],
      }),
      'userId'
    );

    // user from users where id in [ userIds ]
    const users = map(
      await User.find({ _id: { $in: userIds } }),
      (user) => user.transform()
    );

    return users;
  }
}

module.exports = (client) => {
  RoleUser.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: client,
      modelName: 'RoleUser',
      tableName: 'roles_users',
      timestamps: true,
    }
  );

  return RoleUser;
};
