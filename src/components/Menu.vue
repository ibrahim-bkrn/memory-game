<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function startGame(difficulty) {
  router.push(`/game/${difficulty}`);
}
</script>

<template>
  <main class="page">
    <section class="carte-panel">
      <h1 class="titre">Memory Game</h1>
      <p>Niveau de difficulté</p>
      <div class="boutons-niveau">
        <button class="bouton-niveau" @click="startGame(4)">4x4</button>
        <button class="bouton-niveau" @click="startGame(5)">5x5</button>
        <button class="bouton-niveau" @click="startGame(6)">6x6</button>
      </div>
    </section>
  </main>
</template>

<style scoped>


  .page h1{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page p {
    padding: 20px;
    font-size: 20px;
    text-align: center;
  }

  .boutons-niveau {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  .bouton-niveau {
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #4CAF50;
    color: white;
    transition: background-color 0.3s;
  }
</style>