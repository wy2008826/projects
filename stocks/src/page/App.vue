<template>
  <div>
    <div class="top_bar clearfix">
      <span class="iconfont icon-sousuo search" @click="toggleStocks"></span>
    </div>
    <div>
      <h4 class='strategy_title text-center'>今日收T</h4>
      <ul class="clearfix">
        <router-link tag="li" 
          class="stock text-center"
          :to="'/detail/'+stock.code" 
          v-for="(stock,index) in nowT" >
          <p v-text="formatTime(stock.nowData[0])"></p>
          <p ><span v-text="stock.name"></span> <span v-text="stock.code"></span></p>
        </router-link>
      </ul>
    </div>
    
    <div>
      <h4 class='strategy_title text-center'>最近单阳不破</h4>
      <ul class="clearfix">
        <router-link tag="li" 
          class="stock text-center"
          :to="'/detail/'+stock.code" 
          v-for="(stock,index) in nowKeepedDays" >
          <p v-text="stock.buyTime"></p>
          <p ><span v-text="stock.name"></span> <span v-text="stock.code"></span></p>
        </router-link>
      </ul>
    </div>

    <Stocks :class="{active:showStocks}" />
  </div>
</template>

<script type="text/babel">
  import Stocks from "@/components/Stocks/Stocks.vue";

  export default {
    data:function(){
      return {
          nowT:[],
          nowKeepedDays:[]
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
      },
        formatTime(_time){
            let time=_time?new Date(_time):new Date();

            let o= {
                year:time.getFullYear(),
                month:prefix(time.getMonth()+1),
                date:prefix(time.getDate()),
                day:time.getDay(),
                hour:prefix(time.getHours()),
                minute:prefix(time.getMinutes()),
                second:prefix(time.getSeconds())
            };
            function prefix(num){
                return num<10?'0'+num:num;
            }
            return o.year+"-"+o.month+"-"+o.date+"  "+o.hour+":"+o.minute+":"+o.second;
        }
    },
    created(){
        let self=this;
        this.$http.get("/api/getAllCodeNowT").then((res)=>{
            console.log(res,123);
            self.$data.nowT=res.body.lists;

        },(res)=>{
            console.log("error")
        });

        this.$http.get("/api/selectSingleSunKeepedDays").then((res)=>{
            console.log(res,123);
            self.$data.nowKeepedDays=res.body.lists.sort(function(prev,next){
              return new Date(next["buyTime"])-new Date(prev['buyTime']);
            });

        },(res)=>{
            console.log("error")
        });
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
    .search{
      font-size:0.34rem;
        margin:0 0.1rem;
          color:#ff0000;
    }
  }
  .stock{
    display: flex;
    background-color:#fff;
    border:0.012rem solid #f9f9f9;
    line-height: 0.4rem;
    p{
      flex:1;
    }
  }
  .strategy_title{
    line-height: 0.5rem;
  }
  
</style>
