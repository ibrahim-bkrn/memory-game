<script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();

  function startGame(difficulty) {
    router.push(`/game/${difficulty}`);
  }
</script>

<template>
  <div class="menu-container">
    <div class="menu-content">
      <h2>Choisissez votre niveau</h2>
      
      <div class="difficulty-buttons">
        <button class="btn btn-difficulty" @click="startGame(4)">
          <span class="difficulty-label">4×4</span>
          <span class="difficulty-info">8 paires</span>
        </button>
        
        <button class="btn btn-difficulty" @click="startGame(5)">
          <span class="difficulty-label">5×5</span>
          <span class="difficulty-info">12 paires</span>
        </button>
        
        <button class="btn btn-difficulty" @click="startGame(6)">
          <span class="difficulty-label">6×6</span>
          <span class="difficulty-info">18 paires</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .menu-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  }

  .menu-content {
    text-align: center;
    max-width: 400px;
  }

  .menu-content h2 {
    font-size: 28px;
    margin-bottom: 50px;
    color: #1a1a1a;
    font-weight: 600;
  }

  .difficulty-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .btn-difficulty {
    padding: 25px;
    background: #ffffff;
    border: 2px solid #e0e0e0;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .btn-difficulty:hover {
    border-color: #003049;
    background: #f5f5f5;
  }

  .difficulty-label {
    font-size: 20px;
    font-weight: 600;
    color: #003049;
  }

  .difficulty-info {
    font-size: 12px;
    color: #666;
  }
</style>