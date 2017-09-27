<template>
    <div class="wrap">
        <div>
            <Loading v-show="loading" />
            <transition name="fade">
                <ul class="clearfix strategy_ul" v-show="!loading">
                    <h4 class='strategy_title text-center' v-text="labelTxt"></h4>
                    <p class="amount_line text-right">共<span v-text="dataLists.length"></span>条 更新时间:<i v-text="createTime"></i></p>
                    <li class="stock head text-center">
                        <p @click="sortBy('t')">名称／代码 &#8645</p>
                        <p @click="sortBy('close')">现价</p>
                        <p @click="sortBy('baseRate')">涨幅％</p>
                        <!--<p @click="sortBy('rate3')">3日收益 &#8645</p>-->
                        <p @click="sortBy('rate6')">6日收益 &#8645</p>
                        <!--<p @click="sortBy('rate9')">9日收益 &#8645</p>-->
                        <p @click="sortBy('rate12')">12日收益 &#8645</p>
                    </li>
                    <router-link tag="li"
                                 class="stock text-center"
                                 :to="'/detail/'+stock.code"
                                 v-for="(stock,index) in dataLists">
                        <p >
                            <span class="index" v-text="index"></span>
                            <span class="name" v-text="stock.name"></span>
                            <span class="code" v-text="stock.code"></span>
                            <span class="time" v-text="stock.buyTime||stock.t"></span>
                        </p>
                        <p :class="color(stock.baseData[4]>=stock.baseData[1])" v-text="stock.baseData[4]"></p>
                        <p :class="color(getRate(stock.baseData)>=0)" v-text="getRate(stock.baseData)"></p>
                        <!--<p v-text="stock.rate3.toFixed(2)+'%'"></p>-->
                        <p :class="color(stock.rate6>=4)" v-text="stock.rate6.toFixed(2)+'%'"></p>
                        <!--<p v-text="stock.rate9.toFixed(2)+'%'"></p>-->
                        <p :class="color(stock.rate12>=8)" v-text="stock.rate12.toFixed(2)+'%'"></p>
                    </router-link>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script type="text/babel">
    import Loading from "@/components/Loading/Loading.vue";

    export default {
        data: function () {
            return {
                type:this.$route.params.type,
                loading:true,
                sortDirection:1,
                createTime:'',
                dataLists:[],
                apiConfog:{
                    T:{
                        label:'最近收T',
                        url:'/api/getAllCodeRecentT',
                    },
                    singleSunKeepDays:{
                        label:'最近单阳不破',
                        url:'/api/selectSingleSunKeepedDays'
                    },
                    bouncePrice:{
                        label:'最近涨幅居前',
                        url:'/api/bouncePrice'
                    },
                    bounceVol:{
                        label:'最近成交量暴增',
                        url:'/api/bounceVol'
                    },
                    singleSunUpClosedAverage:{
                        label:'最近单阳突破密集均线',
                        url:'/api/singleSunUpClosedAverage'
                    },
                    jumpUpWithSpace:{
                        label:'最近跳空上涨',
                        url:'/api/jumpUpWithSpace'
                    }
                }
            }
        },
        computed: {
            labelTxt:function(){
                return this.apiConfog[this.type].label;
            }
        },
        methods: {
            toggleStocks:function(){
                this.$store.dispatch("toggleStocks",!this.showStocks);
            },
            color(cal){
                return cal?'red':'green';
            },
            getRate(nowData){
                return (((nowData[4]-nowData[1])/nowData[1])*100).toFixed(2);
            },
            sortBy(key){
                let self=this;
                this.sortDirection=this.sortDirection*-1;
                this.dataLists=this.dataLists.sort(function(prev,next){
                    if(key=='t'){
                        return (new Date(next[key])-new Date(prev[key]))*self.sortDirection;
                    }
                    if(key=='close'){
                        return (next.baseData[4]-prev.baseData[4])*self.sortDirection;
                    }
                    if(key=='baseRate'){
                        let prevRate=(prev.baseData[4]-prev.baseData[1])/prev.baseData[1];
                        let nextRate=(next.baseData[4]-next.baseData[1])/next.baseData[1];
                        return (nextRate-prevRate)*self.sortDirection;
                    }
                    return (next[key]-prev[key])*self.sortDirection;
                });
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
                let {rate3,rate6,rate9,rate12,isTuPo,diepo}=item;
                let averRate=(rate3*1+rate6*1+rate9*1+rate12*1)/4;

                if(diepo){
                    return 'diepo';
                }
                if(isTuPo){
                    return 'tupo';
                }

                if( averRate>=3){
                    return "high";
                }else if(item.rate3<2){
                    return "low"
                }
            },
        },
        created(){
            let self=this;
            let url=this.$data.apiConfog[this.$data.type].url;
            let type=this.$data.type;

            const storeLists=this.$store[type];
            console.log(this.$store,storeLists);
            if(storeLists){
                self.$data.dataLists=self.$store[type]['dataLists'];
                self.createTime=self.$store[type]['createTime'];
                this.loading=false;
            }else{
                this.$http.get(url).then((res)=>{

                    this.loading=false;
                    self.$data.dataLists=res.body.lists.sort(function(prev,next){
                        let t=prev.buyTime?'buyTime':'t';
                        return new Date(next[t])-new Date(prev[t]);
                    });
                    self.$data.createTime=res.body.createTime;

                    self.$set(self.$store,type,{});
                    self.$store[type]['dataLists']=self.$data.dataLists;
                    self.$store[type]['createTime']=self.$data.createTime;

                },(res)=>{
                    this.loading=false;
                    console.log("error")
                });
            }

        },
        mounted(){
            console.log(1,localStorage.getItem('scrollY'));
            let sessionScrollY=localStorage.getItem('scrollY');
            let curScrollY=0;

            setTimeout(()=>{
                let scrollInterval=setInterval(()=>{
                    curScrollY+=50;
                    if(curScrollY<=sessionScrollY){
                        document.body.scrollTop=curScrollY;
                    }else{
                        document.body.scrollTop=sessionScrollY;
                        clearInterval(scrollInterval)
                    }
                },2)
            },10)


        },
        beforeRouteLeave(to,from,next){
            let scrollY=document.body.scrollTop;
            localStorage.setItem('scrollY',scrollY);
            next();
        },
        components: {
            Loading
        }
    }
</script>


<style rel="stylesheet/scss" scoped lang="scss">

    @import "../assets/css/ignore/mixin.scss";


    .wrap{
        background-color: #090a0a;
    }
    .red{
        color:#ff0000;
    }
    .green{
        color:#00a649;
    }
    .strategy_title{
        line-height: 1rem;
        background-color: #17191e;
        color:#cc001f;
        border-bottom:0.01rem solid #585858;
    }
    .amount_line{
        line-height: 0.8rem;
        color:#e9e9e9;
        fs:0.3rem;
        padding-right:0.3rem;
        span{
            color:#f93;
            margin:0 0.05rem;
        }
    }
    .strategy_ul{
        li{
            &.high{
                background-color:#FF7256
            }
            &.low{
                background-color:#98FB98
            }
            &.tupo{
                background-color:#f93
            }
            &.diepo{
                background-color:#3f3
            }
        }
    }
    .stock{
        line-height: 0.6rem;
        padding:0.15rem 0;
        display: flex;
        border-bottom:0.011rem solid #1c1922;
        &.head{
            background-color: #0d0c12;
            color:#646464;
        }
        p{
            flex:1;
            line-height: 0.3rem;
        }
        .index{
            color:#f93;
            font-size:0.2rem;
            margin:0 0.06rem;
        }
        .name{
            font-size:0.28rem;
            color:#e9e9e9;
        }
        .code{
            display: block;
            margin:0.07rem 0;
            color:#606060;
            font-size:0.24rem;
        }
        .time{
            color:#606060;
            font-size:0.26rem;
        }
    }
    .label{
        padding:0.05rem 0.1rem;
        border:1px solid #f93;
        margin:0.2rem;
        display: inline-block;
    }
</style>
