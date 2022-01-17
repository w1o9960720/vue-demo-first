<template>
  <div id="Search-contanier">
    <div class="Search">
      <div class="int">
        <input
          @focus="focu"
          @blur="bl"
          class="int1"
          v-model="inputcontext"
          type="text"
          @keydown="kp"
        />
      </div>
      <Listreault v-if="isshowhistory" />
      <Suggesion v-else-if="inputcontext" />
      <History v-else />
    </div>
  </div>
</template>
<script>
// 搜索联想建议
import History from "../search/useSearch/History1.vue";
import Listreault from "../search/useSearch/Listreasult.vue";
import Suggesion from "../search/useSearch/Suggession1.vue";
export default {
  components: {
    History,
    Listreault,
    Suggesion,
  },
  data() {
    return {
      inputcontext: "",
      isshowhistory: false,
    };
  },
  created() {},
  mounted() {},
  updated() {},
  methods: {
    focu() {
      this.isshowhistory = false;
    },
    kp(e) {
      console.log(e);
      if (e.keyCode === 13) {
        this.isshowhistory = true;
      }
    },
    bl() {},
  },
  computed: {},
  watch: {},
};
</script>
<style lang="scss" scoped>
.Search-contanier {
  margin-top: 10px;
  .Search {
    .int {
      width: 200px;
      height: 50px;
      .int1 {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        border-bottom: 2px solid red;
      }
    }
  }
}
</style>