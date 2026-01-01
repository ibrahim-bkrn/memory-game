<script setup>
  import { ref, computed, onUnmounted, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ScoreDisplay from './ScoreDisplay.vue'
  import Carte from './Card.vue'

  // Ajouter car il y avait un bug avec useRouter dans saveGame
  const router = useRouter()

  // Définitions des variables dont on a besoin pour le jeu
  const cards = ref([])
  const revealed = ref([]) // Les indices des cartes actuellement retournées (max 2)
  const matched = ref([]) //Les indices des cartes qui ont trouvé leur paire
  const nbEssais = ref(0) 
  const time = ref(0) //compteur de secondes
  const gameActive = ref(true)
  const timerInterval = ref(null) // La référence de l'intervalle (pour le nettoyer)
  const difficulty = ref(4)
  const won = computed(() => {
    let totalPairs = 0
    if (difficulty.value === 4) totalPairs = 8
    else if (difficulty.value === 5) totalPairs = 12
    else if (difficulty.value === 6) totalPairs = 18
    
    return matched.value.length === totalPairs
    })
  const showMessage = ref(false)
  const playerPseudo = ref('')

  // Fonctions principales du jeu
  function initGame(){
    difficulty.value = parseInt(useRoute().params.difficulty) || 4
    let selectedTab
    switch (difficulty.value){
      case 4:
        selectedTab = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
        break
      case 5:
        selectedTab = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12]
        break
      case 6:
        selectedTab = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18]
        break
    }

    selectedTab.sort(() => Math.random() - 0.5)

    //Réinitialiser tous les compteurs revealed = [], matched = [], moves = 0, time = 0
    revealed.value = []
    matched.value =  []
    nbEssais.value = 0
    time.value = 0

    gameActive.value = true

    cards.value = selectedTab

  }

  function startTimer(){
    timerInterval.value = setInterval(()=>{
      time.value++
    },1000)
  }

  function stopTimer(){
    clearInterval(timerInterval.value)
  }

  function flipCard(index){
    // Les vérifications : Plus de 2 cartes déja retournées? Carte déjà matchée? Jeu inactif?
    if(revealed.value.length >= 2) return
    if(matched.value.includes(index)) return 
    if(gameActive.value === false) return

    revealed.value.push(index)

    if(revealed.value.length === 1) return // Si c'est la première carte, on s'arrête là

    const firstCard = cards.value[revealed.value[0]]
    const secondCard = cards.value[revealed.value[1]]

    if(firstCard === secondCard){
      matched.value.push(revealed.value[0])
      matched.value.push(revealed.value[1])
      revealed.value = []
      nbEssais.value++
    } else{
      nbEssais.value++ 
      gameActive.value = false

      setTimeout(()=>{
        revealed.value = []
        gameActive.value = true
      },500)
    }

    if (won.value) {
      console.log("VICTOIRE! showMessage va passer à true")
      stopTimer()
      gameActive.value = false
      showMessage.value = true
    }
  }

  function saveGame() {
    try {
      const game = {
        id: Date.now(),
        pseudo: playerPseudo.value,
        time: time.value,
        moves: nbEssais.value,
        difficulty: difficulty.value
      }
      
      console.log("Game object créé:", game)
      
      const games = JSON.parse(localStorage.getItem('games') || '[]')
      games.push(game)
      
      console.log("Parties sauvegardées:", games)
      
      localStorage.setItem('games', JSON.stringify(games))
      
      console.log("localStorage mis à jour")
      
      router.push('/')
      
    } catch (error) {
      console.error("ERREUR dans saveGame:", error)
    }
  }

  onMounted(() => {
    initGame()
    startTimer()
  })

  onUnmounted(() => {
  stopTimer()
  })

</script>

<template>
  <div class="game-container">
    <ScoreDisplay :time="time" :try="nbEssais" :difficulty="useRoute().params.difficulty" />
    
    <div class="grid">
      <Carte 
        v-for="(card, index) in cards"
        :key="index"
        :cardValue="card"
        :isRevealed="revealed.includes(index)"
        :isMatched="matched.includes(index)"
        @flip="flipCard(index)"
      />
    </div>
  </div>

  <div v-if="showMessage" class="modal">
    <div class="modal-content">
      <h2>Bravo! 🎉</h2>
      <p>Temps: {{ time }}s</p>
      <p>Essais: {{ nbEssais }}</p>
      
      <input 
        v-model="playerPseudo" 
        type="text" 
        placeholder="Entrez votre pseudo"
      />
      
      <button @click="saveGame()">Sauvegarder et continuer</button>
    </div>
  </div>
</template>

<style scoped>
  .game-container {
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
}

.game-header {
  margin-bottom: 40px;
  text-align: center;
}

.game-header h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 12px;
  margin-top: 30px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  padding: 40px;
  border-radius: 5px;
  text-align: center;
  min-width: 320px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #003049;
}

.modal-content p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.modal-content input {
  width: 100%;
  padding: 12px;
  margin: 25px 0 30px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  font-family: inherit;
}

.modal-content input:focus {
  outline: none;
  border-color: #003049;
  box-shadow: 0 0 0 2px rgba(0, 48, 73, 0.1);
}

.modal-content button {
  padding: 12px 30px;
  background: #003049;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}

.modal-content button:hover {
  background: #002540;
}

@media (max-width: 768px) {
  .game-container {
    padding: 20px;
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 8px;
  }

  .modal-content {
    min-width: 280px;
    padding: 30px;
  }
}
</style>