<template>
  <div class="filters-container glass-effect">
    <n-space vertical :size="20">
      <n-input
        v-model:value="localSearch"
        placeholder="Поиск по имени..."
        clearable
        round
        size="large"
        @update:value="handleSearchChange"
        class="search-input"
      />

      <n-space :size="12" wrap>
        <n-select
          v-model:value="localStatus"
          :options="statusOptions"
          placeholder="Статус"
          style="min-width: 140px"
          @update:value="handleStatusChange"
          class="glass-select"
        />

        <n-select
          v-model:value="localSort"
          :options="sortOptions"
          placeholder="Сортировка"
          style="min-width: 160px"
          @update:value="handleSortChange"
          class="glass-select"
        />

        <n-input
          v-model:value="localLocation"
          placeholder="Фильтр по локации..."
          clearable
          style="min-width: 200px"
          @update:value="handleLocationChange"
          class="glass-input"
        />
      </n-space>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NInput, NSelect, NSpace } from 'naive-ui'
import type { StatusFilter, SortType } from '@/shared/types/character'

interface Props {
  searchQuery: string
  statusFilter: StatusFilter
  sortType: SortType
  locationFilter: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:statusFilter': [value: StatusFilter]
  'update:sortType': [value: SortType]
  'update:locationFilter': [value: string]
}>()

const localSearch = ref(props.searchQuery)
const localStatus = ref(props.statusFilter)
const localSort = ref(props.sortType)
const localLocation = ref(props.locationFilter)

const statusOptions = [
  { label: 'Все статусы', value: 'all' },
  { label: 'Живые', value: 'Alive' },
  { label: 'Мёртвые', value: 'Dead' },
  { label: 'Неизвестно', value: 'unknown' },
]

const sortOptions = [
  { label: 'По алфавиту', value: 'name' },
  { label: 'По эпизодам', value: 'episodes' },
]

const handleSearchChange = (value: string) => {
  emit('update:searchQuery', value)
}

const handleStatusChange = (value: StatusFilter) => {
  emit('update:statusFilter', value)
}

const handleSortChange = (value: SortType) => {
  emit('update:sortType', value)
}

const handleLocationChange = (value: string) => {
  emit('update:locationFilter', value)
}

watch(
  () => props.searchQuery,
  (newVal) => {
    localSearch.value = newVal
  },
)

watch(
  () => props.statusFilter,
  (newVal) => {
    localStatus.value = newVal
  },
)

watch(
  () => props.sortType,
  (newVal) => {
    localSort.value = newVal
  },
)

watch(
  () => props.locationFilter,
  (newVal) => {
    localLocation.value = newVal
  },
)
</script>

<style scoped>
.filters-container {
  padding: 24px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
}

.search-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-input :deep(.n-input__input) {
  color: white;
}

.search-input :deep(.n-input__input::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

.glass-select :deep(.n-base-selection) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.glass-input :deep(.n-input) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.glass-input :deep(.n-input__input) {
  color: white;
}

.glass-input :deep(.n-input__input::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

:deep(.n-base-select-option) {
  background: rgba(30, 41, 59, 0.9) !important;
  backdrop-filter: blur(10px);
}

:deep(.n-base-select-option:hover) {
  background: rgba(99, 102, 241, 0.2) !important;
}
</style>
