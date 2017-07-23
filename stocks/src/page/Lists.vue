<template>
    <div>
        <div>
            <Loading v-show="loading" />
            <transition name="fade">
                <ul class="clearfix strategy_ul" v-show="!loading">
                    <h4 class='strategy_title text-center' v-text="labelTxt"></h4>
                    <li class="stock text-center">
                        <p @click="sortBy('t')">时间 &#8645</p>
                        <p>名称／代码</p>
                        <p @click="sortBy('rate3')">3日收益 &#8645</p>
                        <p @click="sortBy('rate6')">6日收益 &#8645</p>
                        <p @click="sortBy('rate9')">9日收益 &#8645</p>
                        <p @click="sortBy('rate12')">12日收益 &#8645</p>
                    </li>
                    <router-link tag="li"
                                 class="stock text-center"
                                 :class="lowOpenAndHighCloseRateClass(stock)"
                                 :to="'/detail/'+stock.code"
                                 v-for="(stock,index) in dataLists"
                    >
                        <p v-text="stock.buyTime||stock.t"></p>
                        <p ><span v-text="stock.name"></span> <span v-text="stock.code"></span></p>
                        <p v-text="stock.rate3.toFixed(2)+'%'"></p>
                        <p v-text="stock.rate6.toFixed(2)+'%'"></p>
                        <p v-text="stock.rate9.toFixed(2)+'%'"></p>
                        <p v-text="stock.rate12.toFixed(2)+'%'"></p>
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
                dataLists:[],
                apiConfog:{
                    T:{
                        label:'最近收T',
                        url:'/api/getAllCodeRecentT',
                    },
                    singleSunKeepDays:{
                        label:'最近单阳不破',
                        url:'/api/selectSingleSunKeepedDays'
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
            sortBy(key){
                let self=this;
                this.sortDirection=this.sortDirection*-1;
                this.dataLists=this.dataLists.sort(function(prev,next){
                    if(key=='t'){
                        return new Date(next[key])-new Date(prev[key])*self.sortDirection;
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

            this.$http.get(url).then((res)=>{

                this.loading=false;
                self.$data.dataLists=res.body.lists.sort(function(prev,next){
                    let t=prev.buyTime?'buyTime':'t';
                    return new Date(next[t])-new Date(prev[t]);
                });

            },(res)=>{
                this.loading=false;
                console.log("error")
            });
        },
        mounted(){

        },
        components: {
            Loading
        }
    }
</script>


<style rel="stylesheet/scss" scoped lang="sass">

    @import "../assets/css/ignore/mixin.scss";



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
        display: flex;
        background-color:#fff;
        border:0.012rem solid #f9f9f9;
        p{
            flex:1;
        }
    }
    .label{
        padding:0.05rem 0.1rem;
        border:1px solid #f93;
        margin:0.2rem;
        display: inline-block;
    }
</style>
