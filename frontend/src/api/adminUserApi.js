import apiClient from "./apiClient";

export const adminUserApi = {
  getAllUsers: async (params = {}) => {
    const res = await apiClient.get("/users", { params });
    return res;
  },

  deleteUser: async (id) => {
    const res = await apiClient.delete(`/users/${id}`);
    return res;
  },
};

export default adminUserApi;

