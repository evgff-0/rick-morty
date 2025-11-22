<template>
  <n-card class="character-card glass-card" hoverable content-style="padding: 0;">
    <div class="card-content">
      <div class="avatar-container">
        <n-image
          :src="character.image"
          :alt="character.name"
          class="character-image"
          object-fit="cover"
        />
        <div class="status-glow" :class="statusColor"></div>
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
import { NCard, NImage, NTag } from 'naive-ui'
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

const statusColor = computed(() => {
  switch (props.character.status) {
    case 'Alive':
      return 'alive'
    case 'Dead':
      return 'dead'
    default:
      return 'unknown'
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
  border-radius: 16px;
  overflow: hidden;
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
}

.avatar-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.character-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.character-card:hover .character-image {
  transform: scale(1.05);
}

.status-glow {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  filter: blur(2px);
  animation: pulse 2s infinite;
}

.status-glow.alive {
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
}

.status-glow.dead {
  background: #ef4444;
  box-shadow: 0 0 10px #ef4444;
}

.status-glow.unknown {
  background: #f59e0b;
  box-shadow: 0 0 10px #f59e0b;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
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

  .character-image {
    height: 220px;
  }
}
</style>
