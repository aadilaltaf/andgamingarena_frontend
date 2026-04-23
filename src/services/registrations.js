import { api } from "boot/axios";

export const getRegistrations = () => api.get("/registrations");

export const getRegistrationById = (id) => api.get(`/registrations/${id}`); // ✅ NEW

export const createRegistration = (payload) =>
  api.post("/registrations", payload);

export const updateRegistration = (id, payload) =>
  api.put(`/registrations/${id}`, payload);

export const deleteRegistration = (id) =>
  api.delete(`/registrations/${id}`);


export const getRegistrationsByTournament = (tournamentId) =>
  api.get(`/registrations/tournament/${tournamentId}`)
