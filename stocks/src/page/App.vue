<template>
    <div>

        <div class="top_bar clearfix">
            <span class="iconfont icon-sousuo search" @click="toggleStocks"></span>
        </div>
        <ul class="navs_ul">
            <li>
                <router-link tag="p" to="/lists/T">最近收T</router-link>
                <router-link tag="p" to="/lists/singleSunKeepDays">最近单阳不破</router-link>
            </li>
        </ul>
        <Stocks :class="{active:showStocks}" />
    </div>
</template>

<script type="text/babel">
    import Stocks from "@/components/Stocks/Stocks.vue";
    const FastClick = require('fastclick');
    const calAverageLineData=require("utils/calAverageLineData.js");

    window.onload=function(){
        FastClick.attach(document.body);
    }

    export default {
        data:function(){
            return {
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
        },
        created(){

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
    .navs_ul{
        li{
            display: -webkit-flex;
            display: flex;
            line-height: 0.6rem;
            padding:0.2rem 0;
            border-bottom: 1px solid #e5e5e5;

            p{
                border-right:1px solid #e5e5e5;
                text-align: center;
                -webkit-flex:1;
                flex:1;

            }
        }
    }

    .top_bar{
        line-height: 0.9rem;
        font-size:0.4rem;
        .search{
            font-size:0.34rem;
            margin:0 0.1rem;
            color:#ff0000;
        }
    }



</style>
