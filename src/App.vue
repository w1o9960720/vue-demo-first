<template>
  <div id="app">
       <Ioading></Ioading>
  <span v-show="ishow">我我哦我</span>
    <input type="text" v-model="int" />
    <button @click="dianji">点击</button>
    <Iput1 />

  <Table></Table>
  
   
  </div>
</template>

<script>
import Ioading from "./components/loading/loading.vue";
import Table from './components/table/tabel.vue'
import Iput1 from "./components/Input/Input.vue";
export default {
  name: "App",
  components: {
    Iput1,
    Ioading,
    Table
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
      ht:null
    };
  },
  mounted() {
    this. ht=document.getElementsByTagName('html')[0]
    window.addEventListener('resize',this.resize)
    // this.a = this.tree1();
    // console.log(this.a);
    // let arr = [];
    // arr = this.$refs.list1;
    // // console.log(arr);
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
    resize(){
      console.log(this.ht.getBoundingClientRect().width);
    }
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
