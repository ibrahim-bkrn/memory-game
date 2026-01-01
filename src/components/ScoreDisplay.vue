<script setup>
  import { computed } from 'vue'

  defineProps({
    time: { type: Number, default: 0 },
    try: { type: Number, default: 0 },
    difficulty: { type: String, default: 4 }
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
      <div class="label">Temps</div>
      <div class="value">{{ time }}</div>
    </div>

    <div class="score-item">
      <div class="label">Essais</div>
      <div class="value">{{ try }}</div>
    </div>

    <div class="score-item">
      <div class="label"> Difficulté </div>
      <div class="value">{{ difficulty }}</div>
    </div>
  </section>
</template>

<style scoped>
</style>