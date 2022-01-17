<template>
  <div class="Input-content">
    <div class="real" @mouseenter="real">
      <span class="left">姓名</span>
      <input
        @blur="shiqu"
        @focus="juji"
        class="int"
        type="text"
        v-model="val"
      />

      <div v-show="isshow" class="pla" :class="plachoder">请输入姓名</div>
      <div class="underline"></div>
    </div>
    <Search />
  </div>
</template>

<script>
import Search from "../search/search.vue";
export default {
  components: {
    Search,
  },
  data() {
    return {
      plachoder: "",
      val: "",
      isshow: true,
    };
  },
  computed: {},
  methods: {
    shiqu() {
      if (this.val) return;
      this.isshow = true;
    },
    juji() {
      this.isshow = false;
    },
    real() {
      this.plachoder = "plachoder";
    },
  },
};
</script>

<style lang="scss" scoped>
.Input-content {
  margin: 100px auto;
  width: 200px;
  .real {
    position: relative;
    width: 100%;
    .left {
      position: absolute;
      right: -1%;
      top: 0;
      font-size: 15px;
    }
    &:hover > .underline {
      transform: scale(1);
    }
    &:hover .plachoder {
      transform: translateY(-15px);
      opacity: 0;
    }
    .pla {
      position: absolute;
      bottom: 2px;
      font-size: 13px;
      pointer-events: none;
      left: 6px;
    }

    .underline {
      position: absolute;
      height: 2px;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: blue;
      transform: scale(0);
      transition: all 0.3s ease;
    }
    .int {
      border: none;
      outline: none;
      border-bottom: 1px solid;
    }
  }
}
</style>
