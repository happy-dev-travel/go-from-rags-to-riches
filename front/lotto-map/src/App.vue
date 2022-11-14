<template>
  <v-app>
    <v-main>
      <KakaoMap/>
    </v-main>
  </v-app>
</template>

<script>
import KakaoMap from './components/KakaoMap.vue';

export default {
  name: 'App',

  components: {
    KakaoMap
},

  data: () => ({
    //
  }),
};
</script>
