<template>
  <transition :name="defaultname">
    <slot> </slot>
  </transition>
</template>
<script>


export default {
  data() {
    return {
      defaultname: "slide",
    };
  },
  created() {},
  mounted() {},
  updated() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>
<style  scoped>
.slide-leave-active {
  animation: slideout;
}
.slide-enter-active {
  animation: slideout reverse;
}
@keyframes slideout {
  0% {
    opacity: 1;
  }
  100% {
      opacity: 0;
  }
}
</style>