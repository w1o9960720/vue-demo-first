<template>
  <div class="contanier">
    帅选组件

    <ul class="shuaixuan">
      <li
        class="item"
        :class="{ active: selectedobj === item }"
        @click.self="selected(item)"
        v-for="item in arr"
        :key="item.id"
      >
        {{ item.nicname }}

        <transition name="slide">
          <div class="pop" v-show="selectedobj === item">
            <div v-for="item1 in item.chilidren" :key="item1.id">
              {{ item1 }}
            </div>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: {
    filterarr: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      isshow: false,
      active: "active",

      arr: [
        {
          id: "1",
          nicname: "综合",
          chilidren: [
            {
              id: "1-2",
              ciname: "向上排序",
            },
          ],
        },
        {
          id: "2",
          nicname: "价格",
          chilidren: [
            {
              id: "1-3",
              ciname: "1",
            },
            {
              id: "1-4",
              ciname: "1",
            },
            {
              id: "1-5",
              ciname: "1",
            },

            {
              id: "1-8",
              ciname: "1",
            },
          ],
        },

        {
          id: "3",
          nicname: "更多",
          chilidren: [
            {
              id: "1-2",
              ciname: "排序",
            },
          ],
        },
      ],
      selectedobj: { id: "1", nicname: "综合" },
    };
  },
  computed: {},
  methods: {
    selected(e) {
      if (this.selectedobj === e) {
        this.selectedobj = {};
        return;
      }
      this.selectedobj = e;
      this.isshow = true;
      this.isshowzhezhao = true;
    },
  },
};
</script>

<style>
.contanier {
  width: 100%;
}
.shuaixuan {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  position: relative;
}
.shuaixuan > .active {
  color: red;
}
.slide-enter-active,
.slide-leave-active {
  max-height: 500px;
  opacity: 1;
  transition: all 0.6s ease;
}
.slide-enter,
.slide-leave-to {
  height: 0px;
  opacity: 0;
}

.item {
  position: relative;
}
.item::after {
  width: 0;
  content: "";
  height: 0;
  position: absolute;
  display: block;
  right: 20px;
  top: 50%;
  border: 3px transparent transparent transparent red;
}
.pop {
  position: fixed;
  z-index: 999;
  border: 1px solid red;
  top: 55px;
  max-height: 80%;
  width: 100%;
  color: black;
  left: 0;
  right: 0;
}
</style>
