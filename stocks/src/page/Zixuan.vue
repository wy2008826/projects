<template>
    <div class="wrap">
        <Loading v-show="loading" />
        <p class="no_lists" v-show="zixuan.lists.length==0">暂无自选股票....</p>
        <transition name="fade">
            <ul class="clearfix strategy_ul" v-show="!loading&&zixuan.lists.length">
                <li class="stock head text-center">
                    <p >名称 &#8645</p>
                    <div>备注</div>
                </li>
                <li class="stock text-center" v-for="(code,index) in zixuan.lists">
                    <router-link tag="p" :to="'/detail/'+code">
                        <span class="name" v-text="zixuan[code].name"></span>
                        <span class="code" v-text="code"></span>
                        <span class="time" v-text="zixuan[code].time.split(' ')[0]"></span>
                    </router-link>
                    <div class="desc" @click="showComments($event,code)">
                        <p v-for="comment in zixuan[code].comments">
                            <span class="comment" v-text="comment.comment"></span>
                        </p>
                    </div>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script type="text/babel">

    import Loading from "@/components/Loading/Loading.vue";
    import {mapGetters,mapActions} from 'vuex'

    export default {
        data: function () {
            return {
                zixuan:{
                    lists:[]
                },
                loading:true,
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        methods: {
            showComments(e,code){
                e.preventDefault();
                alert(code);
            }
        },
        created(){
            if(this.user){
                this.$http.get(`/api/getZixuan?user=${this.user}`).then((res)=>{
                    let {body}=res;
                    this.zixuan=body.zixuan;

                    this.loading=false;
                })
            }

        },
        mounted(){

        },
        components: {
            Loading
        }
    }
</script>


<style rel="stylesheet/scss" scoped lang="scss">

    @import "../assets/css/ignore/mixin.scss";
    .wrap{

    }
    .no_lists{
        @include box((lh:2rem,ta:center,fs:0.24rem,c:#666));
    }
    .strategy_ul{
        background-color: #090a0a;
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
        >p{
            flex:1;
            line-height: 0.3rem;
        }
        >div{
            line-height: 0.3rem;
            flex:2;
            text-align: left;
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
        .desc{
            color:#f93;
            .comment{
                font-size: 0.28rem;
            }
            .time{
                font-size: 0.2rem;
                color:#f9f9f9;
            }
        }
    }
    .label{
        padding:0.05rem 0.1rem;
        border:1px solid #f93;
        margin:0.2rem;
        display: inline-block;
    }
</style>
