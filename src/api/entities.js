// Mock entities for standalone operation
// These would normally come from Base44 SDK

export const Query = {
  // Mock query functionality - in a real app you'd implement actual querying
  find: async (entity, options) => {
    console.log('Mock Query.find called with:', entity, options);
    return [];
  },
  findOne: async (entity, options) => {
    console.log('Mock Query.findOne called with:', entity, options);
    return null;
  },
  create: async (entity, data) => {
    console.log('Mock Query.create called with:', entity, data);
    return data;
  },
  update: async (entity, id, data) => {
    console.log('Mock Query.update called with:', entity, id, data);
    return data;
  },
  delete: async (entity, id) => {
    console.log('Mock Query.delete called with:', entity, id);
    return true;
  }
};

// Mock User entity - auth is now handled in AuthContext
export const User = {
  // Mock user methods
  me: async () => {
    console.log('Mock User.me called');
    return null;
  },
  login: async (credentials) => {
    console.log('Mock User.login called with:', credentials);
    return null;
  },
  logout: async () => {
    console.log('Mock User.logout called');
    return true;
  }
};