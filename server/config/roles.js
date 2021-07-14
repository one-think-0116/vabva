const allRoles = {
  user: ['manageBasket','getBaskets'],
  admin: ['getUsers', 'manageUsers', 'getLocations', 'manageLocations'],
  business: ['getLocations', 'manageLocations', 'manageProducts','manageBasket','getBaskets']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
