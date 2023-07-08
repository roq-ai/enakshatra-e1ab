import axios from 'axios';
import queryString from 'query-string';
import { ConsultationInterface, ConsultationGetQueryInterface } from 'interfaces/consultation';
import { GetQueryInterface } from '../../interfaces';

export const getConsultations = async (query?: ConsultationGetQueryInterface) => {
  const response = await axios.get(`/api/consultations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createConsultation = async (consultation: ConsultationInterface) => {
  const response = await axios.post('/api/consultations', consultation);
  return response.data;
};

export const updateConsultationById = async (id: string, consultation: ConsultationInterface) => {
  const response = await axios.put(`/api/consultations/${id}`, consultation);
  return response.data;
};

export const getConsultationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/consultations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteConsultationById = async (id: string) => {
  const response = await axios.delete(`/api/consultations/${id}`);
  return response.data;
};
