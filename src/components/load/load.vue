<template>
  <div ref="h" class="scrr">到底了</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("scroll", this.scr);
    this.heght = document.documentElement.clientHeight;
  },
  methods: {
    scr() {
      // let sc = document.documentElement.scrollTop;
      // let b = this.$refs.h.scrollHeight;
      // console.log(sc, this.heght,b);
      // if(sc+this.heght>b){
      //     console.log('触底了');
      // }
    },
  },
};
</script>

<style>
.scrr {
  height: 2000px;
}
</style>