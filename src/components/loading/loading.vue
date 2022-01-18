<template>
<div>
<div @click="close" :class="{'zhezhao':loading}">

</div>
  <div v-show="loading" :class="{'xuanzhuan':loading}" class="loading1">
 </div>

 

</div>
   
</template>

<script>
export default {
data(){
    return {
        loading:true,
   
    }
},
methods:{
    close(){
        this.loading=false
    }
}
}
</script>

<style lang="scss" scoped>

.zhezhao{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, .1);
}
.loading1 {
            position: fixed;
            height: 50px;
            width: 50px;
            top: 50%;
            margin-left: -25px;
             margin-top: -25px;
            left: 50%;
            border-radius: 50%;
            border-top: 2px solid red;
z-index: 20001;
        }
        
.xuanzhuan{
            animation: xuanzhuan infinite ease 1s;
        }



@keyframes xuanzhuan{
    from{
        transform: rotate(0deg);
    }to{
        transform: rotate(360deg);
    }
}
</style>