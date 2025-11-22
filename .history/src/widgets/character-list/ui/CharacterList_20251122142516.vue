<template>
  <div class="character-list">
    <n-spin :show="loading" size="large">
      <div v-if="error" class="error-message">
        <n-alert type="error" :title="error" />
      </div>

      <div v-else-if="characters.length === 0 && !loading" class="empty-message">
        <n-empty description="Персонажи не найдены" />
      </div>

      <div v-else class="cards-grid">
        <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
      </div>
    </n-spin>

    <!-- Пагинация -->
    <div v-if="!error && totalPages > 0" class="pagination">
      <n-pagination
        v-model:page="page"
        :page-count="totalPages"
        :page-slot="7"
        :disabled="loading"
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { NSpin, NAlert, NEmpty, NPagination } from 'naive-ui'
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
  gap: 24px;
  min-height: 400px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.error-message,
.empty-message {
  padding: 40px;
  text-align: center;
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
