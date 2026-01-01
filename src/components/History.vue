<script setup>
  import { onMounted, ref, computed } from 'vue'

  const sortKey = ref(null)
  const sortDir = ref('asc')
  const games = ref([])

  const sortedGames = computed(() => {
    const list = [...games.value]
    if (!sortKey.value) return list

    list.sort((a, b) => {
      const aVal = a[sortKey.value]
      const bVal = b[sortKey.value]
      
      if (typeof aVal === 'string') {
        return sortDir.value === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      
      return sortDir.value === 'asc' ? aVal - bVal : bVal - aVal
    })

    return list
  })

  onMounted(() => {
    const storedGames = JSON.parse(localStorage.getItem('games') || '[]')
    games.value = storedGames
  })

  function resetAll() {
    if (confirm('Vider tout l\'historique?')) {
      localStorage.setItem('games', JSON.stringify([]))
      games.value = []
    }
  }

  function deleteGame(id) {
    if (confirm('Supprimer cette partie?')) {
      games.value = games.value.filter(g => g.id !== id)
      localStorage.setItem('games', JSON.stringify(games.value))
    }
  }

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
  <div class="history-container">
    <h2>Historique des parties</h2>

    <p v-if="games.length === 0" class="empty-message">
      Aucune partie enregistrée
    </p>

    <div v-else class="table-wrapper">
      <table class="history-table">
        <thead>
          <tr>
            <th @click="sortBy('pseudo')" class="sortable">Pseudo</th>
            <th @click="sortBy('time')" class="sortable">Temps</th>
            <th @click="sortBy('moves')" class="sortable">Essais</th>
            <th @click="sortBy('difficulty')" class="sortable">Difficulté</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in sortedGames" :key="game.id">
            <td>{{ game.pseudo }}</td>
            <td>{{ game.time }}s</td>
            <td>{{ game.moves }}</td>
            <td>{{ game.difficulty }}×{{ game.difficulty }}</td>
            <td>
              <button class="btn-delete" @click="deleteGame(game.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="actions" v-if="games.length > 0">
      <button class="btn btn-reset" @click="resetAll">Vider l'historique</button>
    </div>
  </div>
</template>

<style scoped>
  .history-container {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 30px;
    color: #1a1a1a;
  }

  .empty-message {
    text-align: center;
    color: #666;
    padding: 40px 20px;
    font-size: 14px;
  }

  .table-wrapper {
    overflow-x: auto;
    margin-bottom: 30px;
  }

  .history-table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
  }

  .history-table thead {
    background: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  }

  .history-table th {
    padding: 15px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #1a1a1a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .history-table th.sortable {
    cursor: pointer;
    user-select: none;
    transition: background 0.2s ease;
  }

  .history-table th.sortable:hover {
    background: #e8f4f8;
  }

  .history-table td {
    padding: 15px;
    font-size: 14px;
    color: #1a1a1a;
    border-top: 1px solid #e0e0e0;
  }

  .history-table tbody tr:hover {
    background: #f5f5f5;
  }

  .btn-delete {
    padding: 6px 12px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    font-size: 12px;
    color: #666;
    transition: all 0.2s ease;
  }

  .btn-delete:hover {
    border-color: #003049;
    color: #003049;
  }

  .actions {
    display: flex;
    justify-content: center;
  }

  .btn-reset {
    padding: 12px 30px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    transition: all 0.2s ease;
  }

  .btn-reset:hover {
    border-color: #003049;
    color: #003049;
    background: #f5f5f5;
  }

  @media (max-width: 768px) {
    .history-container {
      padding: 20px;
    }

    .history-table {
      font-size: 13px;
    }

    .history-table th,
    .history-table td {
      padding: 10px;
    }

    .btn-delete {
      padding: 4px 8px;
      font-size: 11px;
    }
  }
</style>