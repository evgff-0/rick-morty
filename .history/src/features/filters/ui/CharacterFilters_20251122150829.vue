<template>
  <div class="filters-container">
    <n-space vertical :size="16">
      <!-- Поиск -->
      <n-input
        v-model:value="localSearch"
        placeholder="Поиск по имени..."
        clearable
        @update:value="handleSearchChange"
      >
        <template #prefix>
          <span>🔍</span>
        </template>
      </n-input>

      <!-- Фильтры и сортировка в одной строке -->
      <n-space :size="12">
        <!-- Статус -->
        <n-select
          v-model:value="localStatus"
          :options="statusOptions"
          placeholder="Статус"
          style="min-width: 150px"
          @update:value="handleStatusChange"
        />

        <!-- Сортировка -->
        <n-select
          v-model:value="localSort"
          :options="sortOptions"
          placeholder="Сортировка"
          style="min-width: 180px"
          @update:value="handleSortChange"
        />

        <!-- Фильтр по локации -->
        <n-input
          v-model:value="localLocation"
          placeholder="Фильтр по локации..."
          clearable
          style="min-width: 200px"
          @update:value="handleLocationChange"
        />
      </n-space>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
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
  { label: 'По кол-ву эпизодов', value: 'episodes' },
]

function handleSearchChange(value: string) {
  emit('update:searchQuery', value)
}

function handleStatusChange(value: StatusFilter) {
  emit('update:statusFilter', value)
}

function handleSortChange(value: SortType) {
  emit('update:sortType', value)
}

function handleLocationChange(value: string) {
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
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
