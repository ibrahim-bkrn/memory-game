import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Importation des composants
import Menu from './components/Menu.vue'
import GameBoard from './components/GameBoard.vue'
import History from './components/History.vue'
import ScoreDisplay from './components/ScoreDisplay.vue'
import Carte from './components/Card.vue'

// Création des routes  
const routes = [
  { path: '/', component: Menu },
  { path: '/game/:difficulty', component: GameBoard },
  { path: '/history', component: History }
]

// Création du routeur
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Création et configuration de l'app
const app = createApp(App)
app.use(router)
app.mount('#app')