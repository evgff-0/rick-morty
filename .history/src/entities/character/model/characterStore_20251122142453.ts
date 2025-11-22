import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character, StatusFilter, SortType } from '@/shared/types/character'
import { rickMortyApi } from '@/shared/api/rickMortyApi'

export const useCharacterStore = defineStore('character', () => {
  // State
  const characters = ref<Character[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)
  const initialized = ref(false)

  // Filters
  const searchQuery = ref('')
  const statusFilter = ref<StatusFilter>('all')
  const sortType = ref<SortType>('name')
  const locationFilter = ref('')

  // Computed
  const filteredAndSortedCharacters = computed(() => {
    let result = [...characters.value]

    // Фильтрация по локации (клиентская)
    if (locationFilter.value) {
      result = result.filter((char) =>
        char.location.name.toLowerCase().includes(locationFilter.value.toLowerCase()),
      )
    }

    // Сортировка (клиентская)
    if (sortType.value === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortType.value === 'episodes') {
      result.sort((a, b) => b.episode.length - a.episode.length)
    }

    return result
  })

  // Actions
  async function fetchCharacters(page: number = 1) {
    loading.value = true
    error.value = null

    try {
      const data = await rickMortyApi.getCharacters(page, searchQuery.value, statusFilter.value)

      characters.value = data.results
      currentPage.value = page
      totalPages.value = data.info.pages
      initialized.value = true
    } catch (e: any) {
      error.value = e.response?.data?.error || 'Ошибка загрузки данных'
      characters.value = []
    } finally {
      loading.value = false
    }
  }

  async function setSearchQuery(query: string) {
    searchQuery.value = query
    currentPage.value = 1
    await fetchCharacters(1)
  }

  async function setStatusFilter(status: StatusFilter) {
    statusFilter.value = status
    currentPage.value = 1
    await fetchCharacters(1)
  }

  function setSortType(type: SortType) {
    sortType.value = type
  }

  function setLocationFilter(location: string) {
    locationFilter.value = location
  }

  async function nextPage() {
    if (currentPage.value < totalPages.value) {
      await fetchCharacters(currentPage.value + 1)
    }
  }

  async function prevPage() {
    if (currentPage.value > 1) {
      await fetchCharacters(currentPage.value - 1)
    }
  }

  return {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    initialized,
    searchQuery,
    statusFilter,
    sortType,
    locationFilter,
    filteredAndSortedCharacters,
    fetchCharacters,
    setSearchQuery,
    setStatusFilter,
    setSortType,
    setLocationFilter,
    nextPage,
    prevPage,
  }
})
