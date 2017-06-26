<template>
  <div class="left_stocks">
    <div class="shade" @click="toggleStocks"></div>
    <ul>
      <router-link tag="li" 
        :to="'/detail/'+stock.code" 
        v-for="(stock,index) in stocks" 
        :class="{active:index==curStockIndex}">
        <p v-on:click="selectStock(stock)" class="clearfix box">
          <span v-text="stock.code" class="fn-fl"></span><span class="fn-fr" v-text="stock.name"></span>
        </p>
      </router-link>
    </ul>
  </div>
</template>

<script>

  export default {
    data:function(){
      return {

      }
    },
    computed:{
      showStocks(){
        return this.$store.state.stocksIsPlain;
      },
      curStockIndex(){
        return this.$store.state.stocks.indexOf(this.$store.state.curStock);
      },
      stocks(){
        return this.$store.state.stocks.slice(0,100);
      }
    },
    methods:{
      toggleStocks:function(){
        this.$store.dispatch("toggleStocks",!this.showStocks);
      },
      selectStock(stock){
        this.$store.dispatch("setCurStock",stock);
      }
    },
    created(){
      var self=this;
      let stocks=this.stocks;

      if(!stocks.length){
        this.$http.get("/api/getAllCodes?page=0&pageSize=100",{page:0,pageSize:100}).then((res)=>{
          self.$store.dispatch("setStocks",res.body.stocks);
          
        },(res)=>{
          console.log("error")
        });
      }
    },
    components:{

    }
  }
</script>

<style rel="stylesheet/scss"  lang="sass">
  @import "../../assets/css/base.scss";
</style>

<style rel="stylesheet/scss" scoped lang="sass">
  
  @import "../../assets/css/ignore/mixin.scss";

  .left_stocks{
    position: fixed;
    left:0;
    top:0;
    width:7.5rem;
    height: 100%;
    opacity: 0;
    transition:all cubic-bezier(.35,.12,.95,.76) 200ms;
    transform: translateX(-100%);
    .shade{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      height: 100%;
      background:transparent;
      z-index: 1;
    }
    ul{
      position: fixed;
      left:0;
      top:0;
      width:3.5rem;
      height: 100%;
      overflow-y: scroll;
      z-index: 2;
      box-shadow:0.03rem 0 0.02rem #d8d8d8;
      li{
        line-height: 0.5rem;
        border-bottom:0.01rem solid #fafafa;
        border-top:0.01rem solid #f0f0f0;
        background: #f7f7f7;
        font-size:0.14rem;
        p{
          height: 100%;
          padding:0.05rem 0.1rem;
        }
        &.active{
          color:#f93;
        }
      }
    }
    &.active{
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
