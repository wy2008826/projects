<template>
  <div>
    <div class="top_bar clearfix">
      <span class="iconfont icon-sousuo search" @click="toggleStocks"></span>
    </div>
    <div>

      <ul class="clearfix row">
        <li v-for="stock in nowT" class="fn-fl stock col-all-4 text-center">
          <p v-text="stock.name"></p>
          <p v-text="stock.code"></p>
          <p v-text="formatTime(stock.nowData[0])"></p>
        </li>
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
        background-color:#fff;
        border:0.012rem solid red;
  }
  
</style>
