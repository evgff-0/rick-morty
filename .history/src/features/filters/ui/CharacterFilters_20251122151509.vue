<template>
  <div class="filters-container glass-effect">
    <n-space vertical :size="20">
      <!-- Поиск с иконкой -->
      <n-input
        v-model:value="localSearch"
        placeholder="🔍 Search across dimensions..."
        clearable
        round
        size="large"
        @update:value="handleSearchChange"
        class="search-input"
      >
        <template #prefix>
          <span style="opacity: 0.7">🌀</span>
        </template>
      </n-input>

      <!-- Группа фильтров -->
      <n-space :size="12" wrap>
        <!-- Статус -->
        <n-select
          v-model:value="localStatus"
          :options="statusOptions"
          placeholder="⚡ Status"
          style="min-width: 140px"
          @update:value="handleStatusChange"
          class="glass-select"
        />

        <!-- Сортировка -->
        <n-select
          v-model:value="localSort"
          :options="sortOptions"
          placeholder="📊 Sort by"
          style="min-width: 160px"
          @update:value="handleSortChange"
          class="glass-select"
        />

        <!-- Локация -->
        <n-input
          v-model:value="localLocation"
          placeholder="🌍 Filter by location..."
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
  { label: '🌌 All Statuses', value: 'all' },
  { label: '💚 Alive', value: 'Alive' },
  { label: '💀 Dead', value: 'Dead' },
  { label: '❓ Unknown', value: 'unknown' },
]

const sortOptions = [
  { label: '🔤 Alphabetical', value: 'name' },
  { label: '🎬 Episode Count', value: 'episodes' },
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

// Watchers остаются такими же
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

/* Кастомизация выпадающих списков */
:deep(.n-base-select-option) {
  background: rgba(30, 41, 59, 0.9) !important;
  backdrop-filter: blur(10px);
}

:deep(.n-base-select-option:hover) {
  background: rgba(99, 102, 241, 0.2) !important;
}
</style>
