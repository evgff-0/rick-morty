import { onMounted } from 'vue'
import { useCharacterStore } from '@/entities/character/model/characterStore'

export function useCharacters() {
  const store = useCharacterStore()

  onMounted(() => {
    store.fetchCharacters()
  })

  return {
    characters: store.filteredAndSortedCharacters,
    loading: store.loading,
    error: store.error,
    currentPage: store.currentPage,
    totalPages: store.totalPages,
    searchQuery: store.searchQuery,
    statusFilter: store.statusFilter,
    sortType: store.sortType,
    locationFilter: store.locationFilter,
    setSearchQuery: store.setSearchQuery,
    setStatusFilter: store.setStatusFilter,
    setSortType: store.setSortType,
    setLocationFilter: store.setLocationFilter,
    nextPage: store.nextPage,
    prevPage: store.prevPage,
    refresh: () => store.fetchCharacters(store.currentPage),
    fetchCharacters: store.fetchCharacters,
  }
}
