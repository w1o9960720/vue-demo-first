<template>
  <div id="contanier">
    <div class="nav">
      <div class="left">
        <i class="iconfont icon-arrow-right"></i>
        <slot name="left">左边 </slot>
      </div>
      <div class="center">
        <slot name="left">中间</slot>
      </div>
      <div class="right">
        <span>youbian</span>
        <slot name="left"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    icon: {
      type: String,
    },
  },
  created() {},
  mounted() {},
  updated() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>
<style lang="scss" scope>


</style>