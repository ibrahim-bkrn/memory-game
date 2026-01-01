<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    time: { type: Number, default: 0 },
    try: { type: Number, default: 0 },
    difficulty: { type: [String, Number], default: 4 }
  })

  const formattedTime = computed(() => {
    const t = Math.max(0, props.time || 0)
    const mm = String(Math.floor(t / 60)).padStart(2, '0')
    const ss = String(t % 60).padStart(2, '0')
    return `${mm}:${ss}`
  })
</script>

<template>
  <section class="score">
    <div class="score-item">
      <span class="label">Temps</span>
      <span class="value">{{ formattedTime }}</span>
    </div>

    <div class="score-item">
      <span class="label">Essais</span>
      <span class="value">{{ try }}</span>
    </div>

    <div class="score-item">
      <span class="label">Difficulté</span>
      <span class="value">{{ difficulty }}×{{ difficulty }}</span>
    </div>
  </section>
</template>

<style scoped>
  .score {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 30px;
    padding: 20px;
    background: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    margin: -40px -40px 0 -40px;
    padding: 20px 40px;
  }

  .score-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .label {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .value {
    font-size: 18px;
    color: #003049;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .score {
      margin: -20px -20px 0 -20px;
      padding: 15px 20px;
      gap: 20px;
    }

    .value {
      font-size: 16px;
    }
  }
</style>