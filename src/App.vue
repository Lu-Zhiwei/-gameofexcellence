<template>
    <div id="app" class="min-h-screen flex flex-col">
      <Header />
      <main class="flex-grow">
        <router-view />
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/components/common/Header.vue'
  import Footer from '@/components/common/Footer.vue'
  
  export default {
    name: 'App',
    components: {
      Header,
      Footer
    }
  }
  </script>