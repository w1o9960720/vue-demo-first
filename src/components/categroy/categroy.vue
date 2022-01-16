<template>
  <div id="contanier">
    <div class="categroy">
      <div class="left">
        <ul class="left1">
          <li
            :class="{ active: true }"
            v-for="(item, index) in arrleft"
            :key="index"
            @click="liandong(index)"
          >
            {{ item.proname }}
          </li>
        </ul>
      </div>

      <div class="right" ref="slide">
        <div class="box">
          <ul class="all" v-for="(item, index) in arrright" :key="index">
            <div class="first">{{ item.proname }}</div>
            <div class="second">
              <li v-for="(item1, index) in item.arrlist" :key="index">
                {{ item1.fruitname }}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import betterscroll from "better-scroll";
export default {
  data() {
    return {
      arrleft: [
        { proname: "水果" },
        { proname: "衣服" },
        { proname: "鞋类" },
        { proname: "电脑" },
        { proname: "手机" },
        { proname: "汽车" },
      ],
      arrright: [
        {
          proname: "水果",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
        {
          proname: "衣服",
          arrlist: [
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
            {
              id: 1,
              fruitname: "苹果",
            },
          ],
        },
      ],
      arr5: [],
      scroll1: "",

    };
  },
  created() {},
  mounted() {
    this.setarr();
    this.scroll1 = new betterscroll(".right", {
      probeType: 1,
      click: true,
    });

   
  },
  updated() {},
  methods: {
    setarr() {
      let num = 0;
      this.arr5 = [];
      let m = Array.from(this.$refs.slide.getElementsByClassName("all"));
      this.arr5.push(num);
      m.forEach((item) => {
        let k = item.clientHeight;
        num += k;
        this.arr5.push(num);
      });
    },
    liandong(index) {
      this.scroll1.scrollTo(0, -this.arr5[index]);
      console.log(-this.arr5[index]);
    },
  },
  computed: {
    currentindex(){
      return this.arr5.findIndex((item)=>{
        console.log(item);
      })
    }
  },
  watch: {},
};
</script>
<style lang="scss" scope>
.categroy {
  display: flex;
  .left {
    width: 100px;

    height: 100%;
    .left1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .active {
        color: red;
      }
      & > li {
        padding: 10px 0;
      }
    }
  }
  .right {
    flex: 1;
    height: 600px;
    overflow: hidden;
    .box {
      .all {
        .first {
          width: 100%;
          text-align: center;
          padding: 10px 0;
        }
        .second {
          margin-top: 50px;
          display: flex;
          flex-wrap: nowrap;
          & > li {
            width: 24%;
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>