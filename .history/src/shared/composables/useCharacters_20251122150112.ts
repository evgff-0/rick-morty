import { onMounted } from 'vue'
import { useCharacterStore } from '@/entities/character/model/characterStore'

export function useCharacters() {
  const store = useCharacterStore()

  onMounted(async () => {
    // Всегда загружаем при монтировании
    await store.fetchCharacters()
  })

  return {
    characters: store.filteredAndSortedCharacters,
    loading: store.loading,
    error: store.error,
    currentPage: store.currentPage,
    totalPages: store.totalPages,
  }
}
