import { onMounted, watch } from 'vue'
import { useCharacterStore } from '@/entities/character/model/characterStore'

export function useCharacters() {
  const store = useCharacterStore()

  onMounted(() => {
    // Загружаем данные только если их нет
    if (store.characters.length === 0) {
      store.fetchCharacters()
    }
  })

  // Следим за изменениями и перезагружаем при необходимости
  watch(
    () => store.characters.length,
    (newLength) => {
      // Если данные пропали, загружаем снова
      if (newLength === 0 && !store.loading && !store.error) {
        store.fetchCharacters()
      }
    },
  )

  return {
    characters: store.filteredAndSortedCharacters,
    loading: store.loading,
    error: store.error,
    currentPage: store.currentPage,
    totalPages: store.totalPages,
  }
}
