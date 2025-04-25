import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface PaginatedResponse<T> {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
}

export const getCharacters = async (page = 1) => {
  const response = await api.get<PaginatedResponse<Character>>(`/character?page=${page}`);
  return response.data;
};

export const getCharacter = async (id: number) => {
  const response = await api.get<Character>(`/character/${id}`);
  return response.data;
};

export const getLocations = async (page = 1) => {
  const response = await api.get<PaginatedResponse<Location>>(`/location?page=${page}`);
  return response.data;
};

export const getLocation = async (id: number) => {
  const response = await api.get<Location>(`/location/${id}`);
  return response.data;
};

export const getEpisodes = async (page = 1) => {
  const response = await api.get<PaginatedResponse<Episode>>(`/episode?page=${page}`);
  return response.data;
};

export const getEpisode = async (id: number) => {
  const response = await api.get<Episode>(`/episode/${id}`);
  return response.data;
};

export const searchCharacters = async (name: string, page = 1) => {
  const response = await api.get<PaginatedResponse<Character>>(`/character/?name=${name}&page=${page}`);
  return response.data;
};

export const searchLocations = async (name: string, page = 1) => {
  const response = await api.get<PaginatedResponse<Location>>(`/location/?name=${name}&page=${page}`);
  return response.data;
};

export const searchEpisodes = async (name: string, page = 1) => {
  const response = await api.get<PaginatedResponse<Episode>>(`/episode/?name=${name}&page=${page}`);
  return response.data;
};