<template>
  <n-card class="character-card" hoverable>
    <div class="card-content">
      <n-image
        :src="character.image"
        :alt="character.name"
        class="character-image"
        object-fit="cover"
      />

      <div class="character-info">
        <h3 class="character-name">{{ character.name }}</h3>

        <div class="info-row">
          <n-tag :type="statusColor" size="small">
            {{ statusText }}
          </n-tag>
        </div>

        <div class="info-item">
          <span class="label">Вид:</span>
          <span class="value">{{ character.species }}</span>
        </div>

        <div class="info-item">
          <span class="label">Откуда:</span>
          <span class="value">{{ character.origin.name }}</span>
        </div>

        <div class="info-item">
          <span class="label">Локация:</span>
          <span class="value">{{ character.location.name }}</span>
        </div>

        <div class="info-item">
          <span class="label">Эпизоды:</span>
          <span class="value episodes">{{ character.episode.length }}</span>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NCard, NImage, NTag } from 'naive-ui'
import type { Character } from '@/shared/types/character'

const props = defineProps<{
  character: Character
}>()

const statusColor = computed(() => {
  switch (props.character.status) {
    case 'Alive':
      return 'success'
    case 'Dead':
      return 'error'
    default:
      return 'default'
  }
})

const statusText = computed(() => {
  switch (props.character.status) {
    case 'Alive':
      return 'Жив'
    case 'Dead':
      return 'Мёртв'
    default:
      return 'Неизвестно'
  }
})
</script>

<style scoped>
.character-card {
  height: 100%;
  transition: transform 0.2s;
}

.character-card:hover {
  transform: translateY(-4px);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.character-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
}

.character-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.character-name {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.label {
  font-weight: 500;
  color: #666;
}

.value {
  color: #333;
  text-align: right;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.episodes {
  font-weight: 600;
  color: #18a058;
}
</style>
