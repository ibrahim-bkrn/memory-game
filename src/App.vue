<script setup>
  import { useRoute } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <!-- Sidebar Navigation -->
    <nav class="sidebar">
      <div class="sidebar-header">
        <h1>Memory</h1>
      </div>
      
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">
          <span>Accueil</span>
        </RouterLink>
        <RouterLink to="/history" class="nav-link">
          <span>Historique</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
  .app-container {
    display: flex;
    height: 100vh;
  }

  /* Sidebar */
  .sidebar {
    width: 200px;
    background: #ffffff;
    border-right: 1px solid #e0e0e0;
    padding: 30px 0;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .sidebar-header {
    padding: 0 20px 40px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 30px;
  }

  .sidebar-header h1 {
    font-size: 24px;
    font-weight: 600;
    color: #003049;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .nav-link {
    padding: 15px 20px;
    color: #1a1a1a;
    font-size: 14px;
    font-weight: 500;
    border-left: 3px solid transparent;
    transition: all 0.2s ease;
    display: block;
  }

  .nav-link:hover {
    background: #f5f5f5;
    border-left-color: #003049;
  }

  .nav-link.router-link-active {
    background: #f5f5f5;
    color: #003049;
    border-left-color: #003049;
  }

  /* Main Content */
  .main-content {
    margin-left: 200px;
    flex: 1;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    .sidebar {
      width: 150px;
    }

    .main-content {
      margin-left: 150px;
    }
  }
</style>