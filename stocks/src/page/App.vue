<template>
  <div>
    <div class="top_bar clearfix">
      <span class="fn-fr" @click="toggleStocks">点击</span>
    </div>
    
    
    <Stocks :class="{active:showStocks}" />
  </div>
</template>

<script type="text/babel">
  import Stocks from "@/components/Stocks/Stocks.vue";

  export default {
    data:function(){
      return {
        stocks:[],

      }
    },
    computed:{
      showStocks(){
        return this.$store.state.stocksIsPlain;
      }
    },
    methods:{
      toggleStocks:function(){
        this.$store.dispatch("toggleStocks",!this.showStocks);
      }
    },
    created(){
      
    },
    components:{
      Stocks
    }
  }
</script>

<style rel="stylesheet/scss"  lang="sass">
  @import "../assets/css/base.scss";
</style>

<style rel="stylesheet/scss" scoped lang="sass">
  
  @import "../assets/css/ignore/mixin.scss";
  .top_bar{
    line-height: 0.9rem;
    font-size:0.4rem;
  }
  
</style>
