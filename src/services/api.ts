import axios from 'axios'
import type { Game, GameDetail } from '../types'

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY as string
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST as string

const api = axios.create({
  baseURL: `https://${API_HOST}/api`,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
})

export const fetchPopularGames = async (): Promise<Game[]> => {
  try {
    const { data } = await api.get('/games', {
      params: { 'sort-by': 'relevance' },
    })
    return data
  } catch (err) {
    console.warn('Falling back to default games fetch due to CORS/API error', err)
    const { data } = await api.get('/games')
    return data.sort(() => 0.5 - Math.random())
  }
}

export const fetchGamesByParams = async (searchParams: URLSearchParams): Promise<Game[]> => {
  const params: Record<string, string> = {}
  searchParams.forEach((value, key) => {
    if (value && value !== 'all') params[key] = value
  })

  const { data } = await api.get('/games', { params })
  return data
}

export const fetchGameById = async (id: string): Promise<GameDetail> => {
  const { data } = await api.get('/game', {
    params: { id },
  })
  return data
}
