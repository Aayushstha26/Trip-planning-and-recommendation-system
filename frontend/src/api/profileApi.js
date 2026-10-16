import apiClient from "./apiClient";

export const profileApi = {
  getProfile: async () => {
    return await apiClient.get("/users/me");
  },

  updateProfile: async (data) => {
    // If data is an instance of FormData, send with multipart/form-data
    if (data instanceof FormData) {
      return await apiClient.patch("/users/me", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    return await apiClient.patch("/users/me", data);
  },

  updateAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return await apiClient.patch("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  removeAvatar: async () => {
    return await apiClient.delete("/users/avatar");
  },

  changePassword: async ({ currentPassword, newPassword }) => {
    return await apiClient.patch("/users/change-password", {
      currentPassword,
      newPassword,
    });
  },

  deleteAccount: async (id) => {
    return await apiClient.delete(`/users/${id}`);
  },
};

export default profileApi;
