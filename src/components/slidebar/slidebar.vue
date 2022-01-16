<template>
  <div class="slidebar">
    <div class="slide">
      <ul class="slide-contanier">
        <li
          class="silde-item"
          v-for="(item, index) in arrlist1"
          :class="{ 'active': currentindex === index }"
          :key="item.id"
          @click="to(index)"
        >
          {{ item.mickname }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    heightlist: { //外部页面高度数组
      type: Array,
    },
    arrlist1: { //需要渲染的数组
      type: Array,
    },
  },
  data() {
    return {
      height: [],
      scrollstance: 0, //页面滚动距离
    };
  },
  created() {},
  mounted() {
    window.addEventListener("scroll", this.scrollToview);
  },
  updated() {},
  methods: {
    to(index) {
      window.scrollTo(0, this.heightlist[index]);
      this.cureentindex = index;
      console.log(this.heightlist[index]);
    },
    scrollToview() {
      this.scrollstance =
        document.body.scrollTop || document.documentElement.scrollTop;
      console.log(this.scrollstance);
    },
  },
  computed: {
    currentindex() {
      return this.heightlist.findIndex((item, index) => {
        return (
          this.scrollstance > item &&
          this.scrollstance < this.heightlist[index + 1]
        );
      });
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToview);
  },
  watch: {},
};
</script>
<style lang="scss" scope>
.slidebar {
  position: fixed;
  left: 50px;
  top: 50%;
  transform: translate(0, -50%);

  .slide {
    width: 150px;
    .slide-contanier {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.3);
      .silde-item {
        padding: 20px 5px;
      }
      .active {
        color: red;
      }
    }
  }
}
</style>