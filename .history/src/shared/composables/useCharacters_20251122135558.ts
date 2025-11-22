import { ref, computed } from 'vue'
import { useCharacterStore } from '@/entities/character/model/characterStore'

export function useCharacters() {
  const store = useCharacterStore()

  const searchQuery = ref('')
  const statusFilter = ref('')
  const sortType = ref('')
  const locationFilter = ref('')

  const characters = computed(() => store.characters)
  const loading = computed(() => store.loading)
  const error = computed(() => store.error)
  const currentPage = computed(() => store.currentPage)
  const totalPages = computed(() => store.totalPages)

  // ... остальные функции

  return {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    statusFilter,
    sortType,
    locationFilter,
    setSearchQuery,
    setStatusFilter,
    setSortType,
    setLocationFilter,
  }
}
