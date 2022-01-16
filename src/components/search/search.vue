<template>
  <div id="contanier">
    7524287542
    <div>
      <button @click="changehello">切换</button>
      <transition-group :name='sty'>
        <div v-if="show" key="1" class="a">854</div>
        <div v-show="!show" key="2" class="b">8745</div>
      </transition-group>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      sty:'',
      world:'world',
      hello:'hello'
    };
  },
  created() {},
  mounted() {},
  updated() {},
  methods: {
    changehello(){
      this.show = !this.show
      if(this.show){
        this.sty=this.hello
      }else{
        this.sty=this.world
      }
      console.log(this);
    }
  },
  computed: {},
  watch: {},
};
</script>
<style scope>
.hello-enter-active {
 
  animation: slide1 1s ;
}
.hello-leave-active {
   animation: slide3 1s ;
}
@keyframes slide1 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes slide3 {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}
.world-enter-active {
  animation: slide2 1s reverse;
}
.world-leave-active {
  animation: slide4 1s ;
}

@keyframes slide2 {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
  }
  @keyframes slide4 {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
  }
.a{
  background-color: yellow;
  position: absolute;
  width: 500px;
  height: 500px;
}
.b{
  background-color: red;
  position: absolute;
   width: 500px;
   height: 500px;
}
</style>