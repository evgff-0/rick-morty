import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Character, StatusFilter, SortType } from '@/shared/types/character'
import { rickMortyApi } from '@/shared/api/rickMortyApi'

export const useCharacterStore = defineStore(
  'character',
  () => {
    const characters = ref<Character[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const currentPage = ref(1)
    const totalPages = ref(1)
    const totalCharacters = ref(0)

    const searchQuery = ref('')
    const statusFilter = ref<StatusFilter>('all')
    const sortType = ref<SortType>('name')
    const locationFilter = ref('')

    const filteredAndSortedCharacters = computed(() => {
      let result = [...characters.value]

      if (locationFilter.value) {
        result = result.filter((char) =>
          char.location.name.toLowerCase().includes(locationFilter.value.toLowerCase()),
        )
      }

      if (sortType.value === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortType.value === 'episodes') {
        result.sort((a, b) => b.episode.length - a.episode.length)
      }

      return result.slice(0, 18)
    })

    async function fetchCharacters(page: number = 1) {
      loading.value = true
      error.value = null

      try {
        const data = await rickMortyApi.getCharacters(page, searchQuery.value, statusFilter.value)

        characters.value = data.results
        currentPage.value = page
        totalPages.value = data.info.pages
        totalCharacters.value = data.info.count
      } catch (e: any) {
        error.value = e.response?.data?.error || 'Ошибка загрузки данных'
        characters.value = []
      } finally {
        loading.value = false
      }
    }

    function setSearchQuery(query: string) {
      searchQuery.value = query
      currentPage.value = 1
      fetchCharacters(1)
    }

    function setStatusFilter(status: StatusFilter) {
      statusFilter.value = status
      currentPage.value = 1
      fetchCharacters(1)
    }

    function setSortType(type: SortType) {
      sortType.value = type
    }

    function setLocationFilter(location: string) {
      locationFilter.value = location
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) {
        fetchCharacters(currentPage.value + 1)
      }
    }

    function prevPage() {
      if (currentPage.value > 1) {
        fetchCharacters(currentPage.value - 1)
      }
    }

    return {
      characters,
      loading,
      error,
      currentPage,
      totalPages,
      totalCharacters,
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
  },
  {
    persist: true,
  },
)
