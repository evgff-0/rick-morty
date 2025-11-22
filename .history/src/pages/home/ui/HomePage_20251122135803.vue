<template>
  <div class="home-page">
    <div class="header">
      <h1 class="title">🛸 Rick and Morty Characters</h1>
      <p class="subtitle">Explore the multiverse!</p>
    </div>

    <CharacterFilters
      :search-query="searchQuery"
      :status-filter="statusFilter"
      :sort-type="sortType"
      :location-filter="locationFilter"
      @update:search-query="setSearchQuery"
      @update:status-filter="setStatusFilter"
      @update:sort-type="setSortType"
      @update:location-filter="setLocationFilter"
    />

    <CharacterList
      :characters="characters"
      :loading="loading"
      :error="error"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharacters } from '@/shared/composables/useCharacters'
import CharacterFilters from '@/features/filters/ui/CharacterFilters.vue'
import CharacterList from '@/widgets/character-list/ui/CharacterList.vue'
import { useCharacterStore } from '@/entities/character/model/characterStore'

const {
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
} = useCharacters()

const store = useCharacterStore()

onMounted(() => {
  console.log('HomePage mounted')
  console.log('Characters:', characters)
  console.log('Loading:', loading)
  console.log('Error:', error)
})

function handlePageChange(page: number) {
  store.fetchCharacters(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.home-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 20px;
}

.title {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  margin: 10px 0 0 0;
  font-size: 20px;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
  }

  .subtitle {
    font-size: 16px;
  }
}
</style>
