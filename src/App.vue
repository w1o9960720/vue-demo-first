<template>
  <div id="app">
    <!-- <categroy></categroy> -->
    <!-- <demo></demo> -->
    <!-- <headerl></headerl> -->
    <!-- <waterfull /> -->
    <!-- <slidebar :arrlist1="arrlist" :heightlist="heightlist" />
    <list ref="list1" v-for="item in arr7" :key="item.id"></list> -->
    <!-- <div v-for="(key, index) in obj" :key="index">{{ key }}</div>
    <div @click="de">登录</div> -->
    <!-- <load/>
    <scroll/> -->
    <span v-show="ishow">我我哦我</span>
    <input type="text" v-model="int" />
    <button @click="dianji">点击</button>

    <!-- <shuaixuan/> -->
  </div>
</template>

<script>
// import categroy from "./components/categroy/categroy.vue";
// import demo from'./components/demo/demo.vue'
// import waterfull from "./components/waterfull/waterfull.vue";
// import headerl from "./components/heeader/header.vue";
// import slidebar from "./components/slidebar/slidebar.vue";
// import list from "./components/list/list.vue";
// import Load from './components/load/load.vue';
// import scroll from './components/scroll/scroll.vue';
// import shuaixuan from "./components/shuaixuan/shuaixuan.vue";
export default {
  name: "App",
  components: {
    // Load,
    //  categroy,
    // demo,
    // waterfull,
    // scroll,
    // headerl,
    // slidebar,
    // list,
    // shuaixuan
  },
  data() {
    return {
      a: [],
      nicname: "",
      ishow: true,
      arr555: [],
      arrlist: [
        { id: "2", mickname: "我的购物车1" },
        { id: "7", mickname: "我的购物车2" },
        { id: "6", mickname: "我的购物车2" },
        { id: "8", mickname: "我的购物车3" },
        { id: "5", mickname: "我的购物车4" },
        { id: "12", mickname: "我的购物车7" },
        { id: "36", mickname: "我的购物车8" },
        { id: "89", mickname: "我的购物车9" },
      ],

      arr7: [
        { id: "1" },
        { id: "2" },
        { id: "5" },
        { id: "8" },
        { id: "7" },
        { id: "4" },
      ],
      arr: [
        {
          id: 1,
          pareid: 0,
        },
        {
          id: 11,
          pareid: 1,
        },
        {
          id: 111,
          pareid: 11,
        },
        {
          id: 2,
          pareid: 0,
        },
        {
          id: 21,
          pareid: 2,
        },
        {
          id: 211,
          pareid: 21,
        },
        {
          id: 3,
          pareid: 0,
        },
        {
          id: 31,
          pareid: 3,
        },
      ],
      arr4: [],
      heightlist: [],
      obj: {
        a: "1",
        b: "2",
      },
    };
  },
  mounted() {
    this.a = this.tree1();
    console.log(this.a);
    let arr = [];
    arr = this.$refs.list1;
    console.log(arr);
    // let num = 0;
    // let arr3 = [];

    // arr.forEach((item, index) => {
    //   console.log(item.$el.offsetTop, index);
    //   num += item.$el.offsetTop;
    //   arr3.push(num);
    // });
    // this.heightlist = arr3;
  },
  computed: {
    int: {
      get() {
        return this.nicname;
      },
      set(val) {
        console.log(val);
        this.nicname = val;
      },
    },
  },
  methods: {
    // 递归树形结构
    tree1(id = 0) {
      return this.arr.reduce((pre, item) => {
        if (item.pareid === id) {
          pre.push(item);
          if (this.tree1(item.id).length > 0) {
            item.children = this.tree1(item.id);
          }
        }
        return pre;
      }, []);
    },
    dianji() {
      console.log(1);
      this.ishow = !this.ishow;
    },

  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
li {
  list-style: none;
  cursor: pointer;
}

</style>
