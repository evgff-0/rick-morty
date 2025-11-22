import { onMounted } from 'vue'
import { useCharacterStore } from '@/entities/character/model/characterStore'

export function useCharacters() {
  const store = useCharacterStore()

  onMounted(() => {
    // Всегда загружаем данные при первом монтировании
    store.fetchCharacters()
  })

  return {
    characters: store.filteredAndSortedCharacters,
    loading: store.loading,
    error: store.error,
    currentPage: store.currentPage,
    totalPages: store.totalPages,
  }
}
