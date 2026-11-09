import apiClient from "./apiClient";

export const destinationApi = {
  getAllDestinations: async (params = {}) => {
    const res = await apiClient.get("/destinations", { params });
    return res;
  },

  getDestinationById: async (id) => {
    const res = await apiClient.get(`/destinations/${id}`);
    return res.data;
  },

  createDestination: async (data) => {
    const isFormData = data instanceof FormData;
    const res = await apiClient.post("/destinations", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return res.data;
  },

  updateDestination: async (id, data) => {
    const isFormData = data instanceof FormData;
    const res = await apiClient.patch(`/destinations/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return res.data;
  },

  deleteDestination: async (id) => {
    const res = await apiClient.delete(`/destinations/${id}`);
    return res;
  },
};

export default destinationApi;

