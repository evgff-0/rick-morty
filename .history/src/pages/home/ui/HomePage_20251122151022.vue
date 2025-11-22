<template>
  <div class="home-page">
    <div class="header">
      <h1 class="title">🛸 Rick and Morty Characters</h1>
      <p class="subtitle">Explore the multiverse!</p>
    </div>

    <CharacterFilters
      :search-query="store.searchQuery"
      :status-filter="store.statusFilter"
      :sort-type="store.sortType"
      :location-filter="store.locationFilter"
      @update:search-query="store.setSearchQuery"
      @update:status-filter="store.setStatusFilter"
      @update:sort-type="store.setSortType"
      @update:location-filter="store.setLocationFilter"
    />

    <CharacterList
      :characters="store.filteredAndSortedCharacters"
      :loading="store.loading"
      :error="store.error"
      :current-page="store.currentPage"
      :total-pages="store.totalPages"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from '@/entities/character/model/characterStore'
import CharacterFilters from '@/features/filters/ui/CharacterFilters.vue'
import CharacterList from '@/widgets/character-list/ui/CharacterList.vue'

const store = useCharacterStore()

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
