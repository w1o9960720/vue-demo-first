<template>
  <div class="scro" @scroll="it">
    <div class="hr"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    it(e) {
      console.log(e.target.scrollTop);
    },
  },
};
</script>

<style>
.scro {
  height: 1000px;
  overflow: auto;
}
.hr {
  height: 2000px;
  background-color: salmon;
  width: 500px;
}
</style>