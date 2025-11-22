<template>
  <n-card class="character-card glass-card" hoverable content-style="padding: 0;">
    <div class="card-content">
      <div class="avatar-container">
        <img :src="character.image" :alt="character.name" class="character-image" />
      </div>

      <div class="character-info">
        <h3 class="character-name">{{ character.name }}</h3>

        <div class="info-grid">
          <div class="info-item">
            <span class="label">Статус</span>
            <n-tag :type="statusType" size="small" class="status-tag">
              {{ statusText }}
            </n-tag>
          </div>

          <div class="info-item">
            <span class="label">Вид</span>
            <span class="value">{{ character.species }}</span>
          </div>

          <div class="info-item">
            <span class="label">Происхождение</span>
            <span class="value">{{ character.origin.name }}</span>
          </div>

          <div class="info-item">
            <span class="label">Локация</span>
            <span class="value">{{ character.location.name }}</span>
          </div>

          <div class="info-item">
            <span class="label">Эпизоды</span>
            <span class="episodes-value">{{ character.episode.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NCard, NTag } from 'naive-ui'
import type { Character } from '@/shared/types/character'

const props = defineProps<{
  character: Character
}>()

const statusType = computed(() => {
  switch (props.character.status) {
    case 'Alive':
      return 'success'
    case 'Dead':
      return 'error'
    default:
      return 'warning'
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
  transition: all 0.3s ease;
  border-radius: 20px;
  margin: 8px;
}

.character-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 60px rgba(99, 102, 241, 0.3);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
}

.avatar-container {
  width: 100%;
  display: flex;
  padding: 0;
}

.character-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
  flex-shrink: 0;
}

.character-card:hover .character-image {
  transform: scale(1.1);
}

.character-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  padding: 20px;
}

.character-name {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  text-align: center;
  line-height: 1.2;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.value {
  font-size: 0.9rem;
  color: white;
  text-align: right;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.episodes-value {
  font-size: 1rem;
  font-weight: 700;
  color: #00d8ff;
  background: rgba(0, 216, 255, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
}

.status-tag {
  font-weight: 600;
  border: none;
}

@media (max-width: 768px) {
  .character-name {
    font-size: 1.1rem;
  }

  .info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .value {
    max-width: 100%;
    text-align: left;
  }

  .character-card {
    margin: 6px;
    border-radius: 18px;
  }

  .card-content {
    border-radius: 18px;
  }
}
</style>
