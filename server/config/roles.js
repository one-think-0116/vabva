const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'getLocations', 'manageLocations'],
  business: ['getLocations', "manageLocations", "manageProducts"]
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
