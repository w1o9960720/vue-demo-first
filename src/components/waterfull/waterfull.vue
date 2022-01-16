<template>
  <div class="contanier">
    <div class="waterfull">
      <div
        ref="item"
        v-for="(item, index) in arrlist"
        :key="item.id"
        class="item"
        :style="wate[index]"
      >
        <div class="img" :style="imglist[index]"></div>
        <div class="descrption">
          <span>{{ item.nick }}</span>
          <span>{{ item.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arrlist: [
        {
          id: "1",
          nickname: "手机",
          img: "/public/assates/img/1.jpg",
          price: 500,
        },
        {
          id: "7",
          nickname: "手机",
          img: "/public/assates/img/2.jpg",
          price: 500,
        },
        {
          id: "15",
          nickname: "手机",
          img: "/public/assates/img/3.jpg",
          price: 500,
        },
        {
          id: "33",
          nickname: "手机",
          img: "/public/assates/img/4.jpg",
          price: 500,
        },
        {
          id: "18",
          nickname: "手机",
          img: "/public/assates/img/5.jpg",
          price: 500,
        },
        {
          id: "16",
          nickname: "手机",
          img: "/public/assates/img/5.jpg",
          price: 500,
        },
        {
          id: "2",
          nickname: "手机",
          img: "/public/assates/img/4.jpg",
          price: 500,
        },
        {
          id: "3",
          nickname: "手机",
          img: "/public/assates/img/3.jpg",
          price: 500,
        },

        {
          id: "4",
          nickname: "手机",
          img: "/public/assates/img/3.jpg",
          price: 500,
        },
        {
          id: "5",
          nickname: "手机",
          img: "/public/assates/img/3.jpg",
          price: 500,
        },
      ],
      imglist: [],
      wate: [],
      width:200
    };
  },
  created() {},
  mounted() {
    let arr5 = this.$refs.item;
    console.log(this.randomheght());
    this.setimglist(arr5);
    console.log(this.imglist);
    this.setwaterfull(this.arrlist);
  },
  updated() {},
  methods: {
    randomheght() {
      return -Math.round(Math.random() * (480 - 300) - 300) + "px";
    },
    setwaterfull(a) {
      const arr6 = [];
      for (let i = 0; i < a.length; i++) {
 
        if (i < 4) {

          let obj = {
            position: "absolute",
            top: 0 + 'px',
            left:`${i*(this.width)}`+ 'px'
          };
        
          
          arr6.push(obj);
        }
      }
      this.wate = arr6;
    },
    setimglist(arr) {
      let length = arr.length;
      // const arr6=[]
      for (let i = 0; i < length; i++) {
        const obj6 = {
          height: this.randomheght(),
        };
        this.imglist.push(obj6);
      }
    },
  },
  computed: {},
  watch: {},
};
</script>
<style lang="scss" scope>
.contanier {
  margin: 100px auto;
  width: 800px;
  .waterfull {
    position: relative;
    width: 100%;
    .item {
      width: 200px;

      border: 1px solid red;
      padding: 5px;

      .img {
      }
    }
  }
}
</style>