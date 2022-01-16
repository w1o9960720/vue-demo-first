<template>
  <div ref="header" class="header-contanier" :style="rgba">
    <span>555</span>
    <span>875432542</span>
    <div class="add" @click="add" ></div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      scrollTop: "",
      miaodian: 500,
      opacity: {
        opacity: "",
      },
      rgba: {
        height: 0,
      },
      myheghtL: 100,
    };
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.scrollto);
  },
  updated() {},
  methods: {
    add() {
      this.myheghtL += 100;
    },
    scrollto() {
      let a = document.documentElement.scrollTop / this.miaodian;
      let b = a > 1 ? 1 : a;
      //   this.opacity.opacity = b;
      this.rgba.backgroundColor = `rgba(0,0,0,${b})`;
      console.log(this.rgba.backgroundColor);
    },
  },
  computed: {
    sty() {
      return {
        height: `${this.myheghtL}px`,
        backgroundColor: "",
      };
    },
  },
  watch: {},
};
</script>
<style lang="scss" scope>
.header-contanier {
  height: 40px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: red;
  .add {
    position: fixed;
    right: 200px;
    bottom: 200px;
    background-color: chartreuse;
  }
}
</style>