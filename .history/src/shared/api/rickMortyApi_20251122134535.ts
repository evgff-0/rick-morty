import axios from 'axios'
import type { ApiResponse } from '../types/character'

const API_BASE_URL = 'https://rickandmortyapi.com/api'

export const rickMortyApi = {
  async getCharacters(page: number = 1, name?: string, status?: string) {
    const params: any = { page }
    if (name) params.name = name
    if (status && status !== 'all') params.status = status

    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/character`, {
      params,
    })
    return response.data
  },
}
