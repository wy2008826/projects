<template>
    <div>

        <div class="top_bar clearfix hide">
            <span class="iconfont icon-sousuo search" @click="toggleStocks"></span>
        </div>
        <ul class="navs_ul hide">
            <li>
                <router-link tag="p" to="/lists/T">最近收T</router-link>
                <router-link tag="p" to="/lists/singleSunKeepDays">最近单阳不破</router-link>
            </li>
            <li>
                <router-link tag="p" to="/lists/bouncePrice">最近涨幅较大</router-link>
            </li>
        </ul>
        <div class="circle_wrap">
            <div class="items_wraper" :class="rotateClass(curDir)">
                <label class="item_cirle xiao_fei bottom active" @click="selectCircle('bottom')" :class="rotateClass(curDir)"  >
                    <p>bottom</p>
                </label>
                <label class="item_cirle xiao_fei right" @click="selectCircle('right')" :class="rotateClass(curDir)"  >
                    <p>right</p>
                </label>
                <label class="item_cirle xiao_fei top" @click="selectCircle('top')" :class="rotateClass(curDir)" >
                    <p>top</p>
                </label>
                <label class="item_cirle xiao_fei left" @click="selectCircle('left')" :class="rotateClass(curDir)" >
                    <p>left</p>
                </label>
            </div>
        </div>
        <div class="tree bottom" :class="{fadeout:curDir!='bottom'}">
            <ul class="navs_ul">
                <li>

                </li>
                <li>

                </li>
            </ul>
        </div>
        <div class="tree right" :class="{fadeout:curDir!='right'}">
            right
        </div>
        <div class="tree top" :class="{fadeout:curDir!='top'}">
            top
        </div>
        <div class="tree left" :class="{fadeout:curDir!='left'}">
            left
        </div>
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
                curDir:'bottom'
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
            selectCircle(dir){
                this.curDir=dir;
            },
            rotateClass(curDir){
                this.curDir=curDir;
                let config={
                    'bottom':'rotate0',
                    'right':'rotate1',
                    'top':'rotate2',
                    'left':'rotate3',
                }
                return config[curDir];
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
            border: 1px solid #e5e5e5;
            p{
                border-right:1px solid #e5e5e5;
                text-align: center;
                -webkit-flex:1;
                flex:1;
                &:last-child{
                    border-right: 0;
                }
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
    $wrapSize:6rem;
    $circleWrap:1.2rem;
    .circle_wrap{
        width:$wrapSize;
        height:$wrapSize;
        margin:0 auto;
        border-radius:50%;
        background-color:#fafcff;
        position: relative;
        border:0.01rem solid red;
    }

    .circle_wrap .items_wraper{
        position: absolute;
        top:0;
        left:0;
        z-index: 1;
        width:100%;
        height:100%;
        -webkit-transition: all ease 600ms;
        -moz-transition: all ease 600ms;
        -ms-transition: all ease 600ms;
        -o-transition: all ease 600ms;
        transition: all ease 600ms;
    }
    .circle_wrap .item_cirle{
        display: block;
        width:$circleWrap;
        height:$circleWrap;
        position: absolute;
        z-index: 1;
        cursor: pointer;
        border:1px solid #f94;
        -webkit-transition: all ease 600ms;
        -moz-transition: all ease 600ms;
        -ms-transition: all ease 600ms;
        -o-transition: all ease 600ms;
        transition: all ease 600ms;
    }

    .circle_wrap .items_wraper.rotate1{
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
    }
    .circle_wrap .items_wraper.rotate2{
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform:rotate(180deg);
        transform: rotate(180deg);
    }
    .circle_wrap .items_wraper.rotate3{
        -webkit-transform: rotate(270deg);
        -moz-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        -o-transform:rotate(270deg);
        transform: rotate(270deg);
    }

    .circle_wrap .item_cirle.top{
        top:0.3rem;
        left:50%;
        margin-left:-0.6rem;
    }
    .circle_wrap .item_cirle.left{
        top:50%;
        left:0.3rem;
        margin-top:-0.6rem;
    }
    .circle_wrap .item_cirle.right{
        top:50%;
        left:4.5rem;
        margin-top:-0.6rem;
    }
    .circle_wrap .item_cirle.bottom{
        bottom:0.3rem;
        left:50%;
        margin-left:-0.6rem;
    }

    .circle_wrap .item_cirle.rotate1{
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }
    .circle_wrap .item_cirle.rotate2{
        -webkit-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -o-transform:rotate(-180deg);
        transform: rotate(-180deg);
    }
    .circle_wrap .item_cirle.rotate3{
        -webkit-transform: rotate(-270deg);
        -moz-transform: rotate(-270deg);
        -ms-transform: rotate(-270deg);
        -o-transform:rotate(-270deg);
        transform: rotate(-270deg);
    }
    .tree{
        left:50%;
        opacity: 1;
        width:6rem;
        margin-left:-3rem;
        height:6rem;
        line-height: 6rem;
        border-top:1px solid #f99;
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -ms-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0);

        -webkit-transition: all ease 600ms;
        -moz-transition: all ease 600ms;
        -ms-transition: all ease 600ms;
        -o-transition: all ease 600ms;
        transition: all ease 600ms;
        position: absolute;
        z-index: 0;
    }
    .tree:before{
        display: block;
        position: absolute;
        background: #f93;
        top:-0.5rem;
        left:50%;
        height:0.5rem;
        width:0.012rem;
        content:'';
    }
    .tree.bottom{

    }
    .tree.right{

    }
    .tree.top{

    }
    .tree.left{

    }

    .tree.fadeout{
        -webkit-transform: translateY(-100%);
        -moz-transform: translateY(-100%);
        -ms-transform: translateY(-100%);
        -o-transform: translateY(-100%);
        transform: translateY(-100%);
        opacity: 0;
    }


</style>
