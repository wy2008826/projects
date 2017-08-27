<template>
    <div class="wrap">

        <div class="top_bar clearfix">
            <span class="iconfont icon-wodedingdan search" @click="toggleStocks"></span>
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
                <label class="item_cirle xiao_fei bottom" @click="selectCircle('bottom')" :class="[rotateClass(curDir),{active:curDir=='bottom'}]"  >
                    <p>策略</p>
                </label>
                <label class="item_cirle xiao_fei right" @click="selectCircle('right')" :class="[rotateClass(curDir,'right'),{active:curDir=='right'}]"  >
                    <p>
                        <span class="iconfont icon-jushoucang"></span>
                        <label >我的自选</label>
                    </p>
                </label>
                <label class="item_cirle xiao_fei top" @click="selectCircle('top')" :class="[rotateClass(curDir,'top'),{active:curDir=='top'}]" >
                    <p>top</p>
                </label>
                <label class="item_cirle xiao_fei left" @click="selectCircle('left')" :class="[rotateClass(curDir,'left'),{active:curDir=='left'}]" >
                    <p>left</p>
                </label>
            </div>
        </div>
        <div class="tree bottom" :class="{fadeout:curDir!='bottom'}">
            <ul class="navs_ul">
                <li>
                    <router-link tag="p" to="/lists/T">最近收T</router-link>
                </li>
                <li>
                    <router-link tag="p" to="/lists/bouncePrice">最近涨幅较大</router-link>
                </li>
                <li>
                    <router-link tag="p" to="/lists/singleSunKeepDays">最近单阳不破</router-link>
                </li>
            </ul>
        </div>
        <div class="tree right" :class="{fadeout:curDir!='right'}">
            <ul class="navs_ul">
                <li>
                    <router-link tag="p" to="/zixuan">我的自选</router-link>
                </li>
            </ul>
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
    import {mapGetters,mapActions} from 'vuex'

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
                curDir:'bottom',
            }
        },
        computed:{
            ...mapGetters([
                'zixuan',
                'user'
            ]),
            showStocks(){
                return this.$store.state.stocksIsPlain;
            }
        },
        methods:{
            ...mapActions([
                'login',
                'setZixuan'
            ]),
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
            if(this.user){
                this.$http.get(`/api/online?user=${this.user}&ua=${window.navigator.appVersion}`).then((res)=>{
                    if(!res.body.r){
                        localStorage.setItem('user','');
                        this.login('');
                    }
                });
                this.$http.get(`/api/getZixuan?user=${this.user}`).then((res)=>{
                    let {body}=res;
                    this.zixuan=body.zixuan;
                    this.setZixuan(body.zixuan);
                })
            }
        },
        components:{
            Stocks
        }
    }
</script>

<style rel="stylesheet/scss"  lang="scss">
    @import "../assets/css/ignore/mixin.scss";
    @import "../assets/css/base.scss";
    html,body{

    }
</style>

<style rel="stylesheet/scss" scoped lang="scss">
    @import "../assets/css/icon/iconfont.css";
    @import "../assets/css/ignore/mixin.scss";
    .wrap {
        background-color: #532452;
        min-height: 14rem;
    }

    .top_bar{
        line-height: 0.9rem;
        font-size:0.4rem;
        background-color: #532452;
        .search{
            font-size:0.34rem;
            margin:0 0.1rem;
            color:#ff0000;
        }
    }
    $wrapSize:6rem;
    $circleWrap:1.2rem;
    $activeColor:#00dae2;
    .circle_wrap {
        width: $wrapSize;
        height: $wrapSize;
        margin: 0 auto;
        border-radius: 50%;
        position: relative;
        /*border: 0.01rem solid red;*/
        z-index: 1;
        background: -webkit-radial-gradient(#83376a 0%,#532452 100%);
        .items_wraper{
            position: absolute;
            top:0;
            left:0;
            z-index: 1;
            width:100%;
            height:100%;

            -webkit-transition: all ease 600ms;
            transition: all ease 600ms;
            &.rotate1{
                -webkit-transform: rotate(90deg);
                transform: rotate(90deg);
            }
            &.rotate2{
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
            }
            &.rotate3{
                -webkit-transform: rotate(270deg);
                transform: rotate(270deg);
            }
        }
        .item_cirle{
            $color:#cfbaa6;
            display: block;
            width:$circleWrap;
            height:$circleWrap;
            position: absolute;
            z-index: 1;
            cursor: pointer;
            border:1px solid $color;
            border-radius: 50%;
            -webkit-transition: all ease 600ms;
            transition: all ease 600ms;
            text-align: center;
            color:$color;
            span.iconfont{
                font-size: 0.4rem;
            }
            label{
                display: block;
                font-size: 0.2rem;
            }
            &.active{
                color:$activeColor;
                border:1px solid $activeColor;
            }
            &.top{
                top:0.3rem;
                left:50%;
                margin-left:-0.6rem;
            }
            &.left{
                top:50%;
                left:0.3rem;
                margin-top:-0.6rem;
            }
            &.right{
                top:50%;
                left:4.5rem;
                margin-top:-0.6rem;
            }
            &.bottom{
                bottom:0.3rem;
                left:50%;
                margin-left:-0.6rem;
            }
            &.rotate1{
                -webkit-transform: rotate(-90deg);
                transform: rotate(-90deg);
            }
            &.rotate2{
                -webkit-transform: rotate(-180deg);
                transform: rotate(-180deg);
            }
            &.rotate3{
                -webkit-transform: rotate(-270deg);
                transform: rotate(-270deg);
            }
        }
    }

    .tree{
        left:50%;
        opacity: 1;
        width:6rem;
        margin:0.5rem 0 0 -3rem;
        height:3rem;
        line-height: 3rem;
        border-top:1px solid $activeColor;
        -webkit-transform: translateY(0);
        transform: translateY(0);

        -webkit-transition: all ease 600ms;
        transition: all ease 600ms;
        position: absolute;
        z-index: 0;
        &:before{
            display: block;
            position: absolute;
            background: $activeColor;
            top:-0.5rem;
            left:50%;
            height:0.5rem;
            width:0.012rem;
            content:'';
        }
    }
    .tree .navs_ul{
        display:flex;
        border-bottom:1px solid $activeColor;
        border-left:1px solid $activeColor;
    }
    .tree .navs_ul li{
        line-height: 0.6rem;
        border-right:1px solid $activeColor;
        flex:1;
        -webkit-flex:1;
        text-align: center;
        color:#fff;
        font-size: 0.2rem;
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
        -webkit-transform:translateY(-100%);
        transform:translateY(-100%);
        opacity: 0;
    }


</style>
