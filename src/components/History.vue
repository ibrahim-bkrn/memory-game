<script setup>
  import { onMounted, ref, computed } from 'vue'


  const games = ref([])
  const sortedGames = computed(() => {
  const list = [...games.value]

  if (!sortKey.value) return list

  list.sort((a, b) => {
    if (sortDir.value === 'asc') {
      return a[sortKey.value] - b[sortKey.value]
    } else {
      return b[sortKey.value] - a[sortKey.value]
    }
  })

  return list
})

  onMounted(() => {
    const storedGames = JSON.parse(localStorage.getItem('games') || '[]')
    games.value = storedGames

  })


function resetAll() {
  localStorage.setItem('games', JSON.stringify([]))
  games.value = []
}

function deleteGame(id) {
  console.log("deleteGame appelé avec id =", id) 

  if (!confirm("Supprimer cette partie ?")) return

  games.value = games.value.filter(g => g.id !== id)
  localStorage.setItem('games', JSON.stringify(games.value))
}

const sortKey = ref(null)
const sortDir = ref('asc')

function sortBy(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

</script>

<template>
  <h1>Historique</h1>

  <p v-if="games.length === 0">
    Aucun jeu enregistré.
  </p>
  <table v-else>
    <thead>
      <tr>
        <th @click="sortBy('time')">Temps</th>
        <th>Essais</th>
        <th>Difficulté</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="game in sortedGames" :key="game.id">
        <td>{{ game.time }}</td>
        <td>{{ game.moves }}</td>
        <td>{{ game.difficulty }}</td>
        <td>
          <button @click="deleteGame(game.id)">Supprimer</button>
        </td>
      </tr>
    </tbody>
  </table>
 
  <td>
    <button @click="resetAll" :disabled="games.length === 0">
            Réinitialiser l'historique
          </button>
  </td>

</template>

<style scoped>
</style>