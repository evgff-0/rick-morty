<template>
  <div class="home-page">
    <div class="cosmic-header">
      <div class="stars"></div>
      <div class="content">
        <h1 class="title">Рик и Морти</h1>
        <p class="subtitle">Персонажт мультивселенной</p>
      </div>
    </div>

    <div class="glass-panel">
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
    </div>

    <div class="main-content">
      <CharacterList
        :characters="store.filteredAndSortedCharacters"
        :loading="store.loading"
        :error="store.error"
        :current-page="store.currentPage"
        :total-pages="store.totalPages"
        @page-change="handlePageChange"
      />
    </div>
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
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
}

.cosmic-header {
  position: relative;
  padding: 80px 20px 60px;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(15, 12, 41, 0.9) 0%, transparent 100%);
}

.stars {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(2px 2px at 20px 30px, #eee, transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(99, 102, 241, 0.5), transparent),
    radial-gradient(1px 1px at 90px 40px, #fff, transparent);
  background-repeat: repeat;
  background-size: 100px 100px;
  animation: stars-move 100s linear infinite;
}

@keyframes stars-move {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 1000px 1000px;
  }
}

.content {
  position: relative;
  z-index: 2;
}

.title {
  margin: 0;
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00d8ff 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
}

.subtitle {
  margin: 10px 0 0 0;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
}

.glass-panel {
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 20px;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .cosmic-header {
    padding: 60px 20px 40px;
  }
}
</style>
