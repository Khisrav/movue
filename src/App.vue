<script>
import { initFlowbite } from 'flowbite'
import HeaderLayout from './components/HeaderLayout.vue';
import FooterLayout from './components/FooterLayout.vue';

export default {
  mounted() {
    initFlowbite();
  },
  components: { HeaderLayout, FooterLayout }
}
</script>

<template>
  <HeaderLayout/>
  <router-view></router-view>
  <FooterLayout/>
</template>
