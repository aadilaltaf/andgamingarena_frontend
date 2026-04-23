import { api } from "boot/axios";

export const getTournaments = () => api.get("/tournaments");
export const getSingleTournaments = (id) => api.get(`/tournaments/${id}`);
export const createTournament = (payload) => api.post("/tournaments", payload);
export const updateTournament = (id, payload) => api.put(`/tournaments/${id}`, payload);
export const deleteTournament = (id) => api.delete(`/tournaments/${id}`);
