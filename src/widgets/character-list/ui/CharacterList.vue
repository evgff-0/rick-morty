<template>
  <div class="character-list">
    <n-spin :show="loading" size="large">
      <template #description>
        <span class="loading-text">Загрузка персонажей...</span>
      </template>

      <div v-if="error" class="error-message">
        <n-alert type="error" :title="error" class="glass-effect" />
      </div>

      <div v-else-if="characters.length === 0 && !loading" class="empty-message">
        <n-empty description="Персонажи не найдены">
          <template #extra>
            <n-button size="small" @click="$emit('pageChange', 1)" class="glass-effect">
              Попробовать снова
            </n-button>
          </template>
        </n-empty>
      </div>

      <div v-else class="cosmic-grid">
        <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
      </div>
    </n-spin>

    <div v-if="!error && characters.length > 0" class="pagination-container">
      <n-pagination
        v-model:page="page"
        :page-count="totalPages"
        :page-slot="7"
        @update:page="handlePageChange"
        class="glass-pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { NSpin, NAlert, NEmpty, NPagination, NButton } from 'naive-ui'
import CharacterCard from '@/entities/character/ui/CharacterCard.vue'
import type { Character } from '@/shared/types/character'

const props = defineProps<{
  characters: Character[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const page = ref(props.currentPage)

function handlePageChange(newPage: number) {
  emit('pageChange', newPage)
}

watch(
  () => props.currentPage,
  (newPage) => {
    page.value = newPage
  },
)
</script>

<style scoped>
.character-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.loading-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.cosmic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.error-message,
.empty-message {
  padding: 60px 20px;
  text-align: center;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.glass-pagination :deep(.n-pagination-item) {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(10px);
}

.glass-pagination :deep(.n-pagination-item:hover) {
  background: rgba(99, 102, 241, 0.3) !important;
}

.glass-pagination :deep(.n-pagination-item.n-pagination-item--active) {
  background: rgba(99, 102, 241, 0.5) !important;
  border-color: rgba(99, 102, 241, 0.7) !important;
}

@media (max-width: 768px) {
  .cosmic-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .pagination-container {
    padding: 20px 0;
  }
}
</style>
