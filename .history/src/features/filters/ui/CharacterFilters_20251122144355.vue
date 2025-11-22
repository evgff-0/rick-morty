<template>
  <div class="filters-container">
    <n-space vertical :size="16">
      <!-- Поиск -->
      <n-input v-model:value="searchQuery" placeholder="Поиск по имени..." clearable>
        <template #prefix>
          <span>🔍</span>
        </template>
      </n-input>

      <!-- Фильтры и сортировка в одной строке -->
      <n-space :size="12">
        <!-- Статус -->
        <n-select
          v-model:value="statusFilter"
          :options="statusOptions"
          placeholder="Статус"
          style="min-width: 150px"
        />

        <!-- Сортировка -->
        <n-select
          v-model:value="sortType"
          :options="sortOptions"
          placeholder="Сортировка"
          style="min-width: 180px"
        />

        <!-- Фильтр по локации -->
        <n-input
          v-model:value="locationFilter"
          placeholder="Фильтр по локации..."
          clearable
          style="min-width: 200px"
        />
      </n-space>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NInput, NSelect, NSpace } from 'naive-ui'
import type { StatusFilter, SortType } from '@/shared/types/character'

const props = defineProps<{
  searchQuery: string
  statusFilter: StatusFilter
  sortType: SortType
  locationFilter: string
}>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:statusFilter': [value: StatusFilter]
  'update:sortType': [value: SortType]
  'update:locationFilter': [value: string]
}>()

const statusOptions = [
  { label: 'Все статусы', value: 'all' },
  { label: 'Живые', value: 'Alive' },
  { label: 'Мёртвые', value: 'Dead' },
  { label: 'Неизвестно', value: 'unknown' },
]

const sortOptions = [
  { label: 'По алфавиту', value: 'name' },
  { label: 'По кол-ву эпизодов', value: 'episodes' },
]

// Используем computed с getter и setter для двусторонней связи
const searchQuery = computed({
  get: () => props.searchQuery,
  set: (value: string) => {
    emit('update:searchQuery', value)
  },
})

const statusFilter = computed({
  get: () => props.statusFilter,
  set: (value: StatusFilter) => {
    emit('update:statusFilter', value)
  },
})

const sortType = computed({
  get: () => props.sortType,
  set: (value: SortType) => {
    emit('update:sortType', value)
  },
})

const locationFilter = computed({
  get: () => props.locationFilter,
  set: (value: string) => {
    emit('update:locationFilter', value)
  },
})
</script>

<style scoped>
.filters-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
