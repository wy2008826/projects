<template>
  <div>
    <div class="top_bar clearfix">
      <span class="iconfont icon-sousuo search" @click="toggleStocks"></span>
    </div>
    <div>
      <h4 class='strategy_title text-center'>最近收T</h4>
      <ul class="clearfix strategy_ul">
        <router-link tag="li" 
          class="stock text-center"
          :class="lowOpenAndHighCloseRateClass(stock)"
          :to="'/detail/'+stock.code" 
          v-for="(stock,index) in nowT" >
          <p v-text="stock.buyTime"></p>
          <p ><span v-text="stock.name"></span> <span v-text="stock.code"></span></p>
          <p v-text="stock.rate3.toFixed(2)+'%'"></p>
          <p v-text="stock.rate6.toFixed(2)+'%'"></p>
          <p v-text="stock.rate9.toFixed(2)+'%'"></p>
          <p v-text="stock.rate12.toFixed(2)+'%'"></p>
          <p v-text="stock.pos.toFixed(2)+'%'"></p>
        </router-link>
      </ul>
    </div>
    
    <div>
      <h4 class='strategy_title text-center'>最近单阳不破</h4>
      <ul class="clearfix strategy_ul">
        <router-link tag="li" 
          class="stock text-center"
          :class="lowOpenAndHighCloseRateClass(stock)"
          :to="'/detail/'+stock.code" 
          v-for="(stock,index) in nowKeepedDays" >
          <p v-text="stock.buyTime"></p>
          <p ><span v-text="stock.name"></span> <span v-text="stock.code"></span></p>
          <p v-text="stock.rate3.toFixed(2)+'%'"></p>
          <p v-text="stock.rate6.toFixed(2)+'%'"></p>
          <p v-text="stock.rate9.toFixed(2)+'%'"></p>
          <p v-text="stock.rate12.toFixed(2)+'%'"></p>
        </router-link>
      </ul>
    </div>

    <Stocks :class="{active:showStocks}" />
  </div>
</template>

<script type="text/babel">
    import Stocks from "@/components/Stocks/Stocks.vue";
    const FastClick = require('fastclick');
    window.onload=function(){
        FastClick.attach(document.body);
    }

  export default {
      data:function(){
          return {
              nowT:[],
              nowKeepedDays:[],
              count3:0,
              count6:0,
              count9:0,
              count12:0,
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
        },
        lowOpenAndHighCloseRateClass(item){
          let {rate3,rate6,rate9,rate12}=item;
          let averRate=(rate3*1+rate6*1+rate9*1+rate12*1)/4;
          if( averRate>=3){
              return "high";
          }else if(item.rate3<2){
            return "low"
          }
        }
      },
      created(){
          let self=this;
          this.$http.get("/api/getAllCodeRecentT").then((res)=>{
              self.$data.nowT=res.body.lists.sort(function(prev,next){
                return new Date(next.buyTime)-new Date(prev.buyTime);
              });
              const nowT=self.$data.nowT;

              for(let i=0;i<nowT.length;i++){
                let item=nowT[i];
                if(item.rate3>=8){
                  self.$data.count3+=1;
                }
                if(item.rate6>=12){
                  self.$data.count6+=1;
                }
                if(item.rate9>=16){
                  self.$data.count9+=1;
                }
                if(item.rate12>=12){
                  self.$data.count12+=1;
                }
              }
              console.log(`length:${nowT.length} count3:${self.$data.count3} count6:${self.$data.count6} count9:${self.$data.count9} count12:${self.$data.count12}`)

          },(res)=>{
              console.log("error")
          });

          this.$http.get("/api/selectSingleSunKeepedDays").then((res)=>{
              self.$data.nowKeepedDays=res.body.lists.sort(function(prev,next){
                return new Date(next["buyTime"])-new Date(prev['buyTime']);
              });
              console.log(res,self.$data.nowKeepedDays)

          },(res)=>{
              console.log("error")
          });
      },
      mounted(){

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
    line-height: 1rem;
    background-color:#fff;
    border:0.02rem solid #d8d8d8;
    border-left:0;
    border-right:0;
  }
  .strategy_ul{
    li{
      &.high{
        background-color:#FF7256
      }
      &.low{
        background-color:#98FB98
      }
    }
  }
  
</style>
