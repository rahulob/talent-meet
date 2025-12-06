import axiosInstance from "../lib/axios";

export const sessionApi = {
  createSession: async (data: any) => {
    const response = await axiosInstance.post("/session", data);
    return response.data;
  },

  getActiveSessions: async () => {
    const response = await axiosInstance.get("/session/active");
    return response.data;
  },
  getCompletedSessions: async () => {
    const response = await axiosInstance.get("/session/completed");
    return response.data;
  },

  getSessionById: async (id: string) => {
    const response = await axiosInstance.get(`/session/${id}`);
    return response.data;
  },

  joinSession: async (id: string) => {
    const response = await axiosInstance.post(`/session/${id}/join`);
    return response.data;
  },
  endSession: async (id: string) => {
    const response = await axiosInstance.post(`/session/${id}/end`);
    return response.data;
  },
  getStreamToken: async () => {
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
  },
};