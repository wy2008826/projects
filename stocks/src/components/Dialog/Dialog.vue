<template>
    <div>
        <transition name="fade1">
            <div class="shade" v-show="showStatus" @click="closeSelf"></div>
        </transition>
        <transition name="bounce">
            <div class="dialog" v-show="showStatus">
                <span class="close" @click="closeSelf"></span>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'Dialog',
        data() {
            return {
                showStatus: this.show || false
            }
        },
        props:['show','close'],
        mounted() {
        },
        methods: {
            closeSelf(){
                this.showStatus=false;
                this.close&&this.close();
            }
        },
        computed: {
        },
        watch:{
            show(n,old){
                this.showStatus = n;
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/ignore/mixin.scss';
    .shade {
        @include box((w:100%, h:100%, bg:rgba(100, 100, 100, 0.5)));
        @include position((p:fixed, t:0, r:0, b:0, l:0));
    }
    .dialog {
        @include box((bg:$white, w:6rem,bdr:0.1rem,m:0 0 0 -3rem));
        @include position((p:fixed, t:20%, l:50%));
        min-height:1rem;
        .close{
            @include box((w:0.34rem,h:0.34rem));
            @include position((p:absolute,t:0.16rem,r:0.16rem));
        }
    }
</style>