<script setup>
  const props = defineProps({
    cardValue: { type: [String, Number], required: true },
    isRevealed: { type: Boolean, default: false },
    isMatched: { type: Boolean, default: false },
  })

  const emit = defineEmits(['flip'])

  function onClick() {
    if (props.isMatched) return
    emit('flip')
  }
</script>

<template>
  <button
    class="card"
    :class="{ revealed: isRevealed || isMatched, matched: isMatched }"
    @click="onClick"
    :disabled="isMatched"
    aria-label="Carte"
  >
    <span class="card-content">{{ isRevealed || isMatched ? cardValue : '?' }}</span>
  </button>
</template>

<style scoped>
  .card {
    aspect-ratio: 1;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 28px;
    font-weight: 600;
    color: #1a1a1a;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .card:hover:not(.matched) {
    border-color: #003049;
    box-shadow: 0 2px 8px rgba(0, 48, 73, 0.1);
  }

  .card:active:not(.matched) {
    transform: scale(0.95);
  }

  .card.revealed {
    background: #f5f5f5;
    border-color: #003049;
  }

  .card.matched {
    background: #e8f4f8;
    border-color: #003049;
    opacity: 0.8;
    cursor: not-allowed;
  }

  .card-content {
    display: block;
  }

  @media (max-width: 768px) {
    .card {
      font-size: 24px;
    }
  }
</style>