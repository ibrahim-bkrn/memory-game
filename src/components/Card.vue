<script setup>
  const props = defineProps({
      cardValue: { type: [String, Number], required: true },
      isRevealed: { type: Boolean, default: false },
      isMatched: { type: Boolean, default: false },
    })

    const emit = defineEmits(['flip']) // Émet l'événement 'flip' au parent

  function onClick() {
    if (props.isMatched) return // Bloque si déjà matchée
    emit('flip')
  }
</script>

<template>
  <div class="affichage-carte">

      <div class="face carte-front" v-if="props.isRevealed || props.isMatched">
        {{ props.cardValue }}
      </div>

      <div class="face carte-back" v-else>

    <button
      class="carte"
      :class="{ flipped: props.isRevealed || props.isMatched, matched: props.isMatched }"
      @click="onClick"
      :disabled="props.isMatched"
      aria-label="Carte"
      >
      RETOURNER
    </button>

  </div>

  </div>
</template>

<style scoped>
</style>