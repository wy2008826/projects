<template>
    <div>
        <a v-if="!href" v-text="label" :class="type" @click="clickEvent"></a>
        <router-link v-if="href" :to="href" :class="type">{{label}}</router-link>
    </div>
</template>
<script>
    export default {
        name: 'Btn',
        props: ['label','click','href','type'],
        mounted() {
        },
        methods:{
            clickEvent(){
                if(typeof this.click == 'function'){
                    this.click()
                }
            }
        },
        computed: {},
        components: {}
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/ignore/mixin.scss';
    .btn{
        @include box((d:block,h:0.8rem,lh:0.8rem,ta:center,fs:0.32rem,bdr:0.4rem));
    }
    .red{
        @extend .btn;
        @include box((c:#fff,bg:$red));
    }
    .blue{
        @extend .btn;
        @include box((c:#fff,bg:$blue));
    }
    .red-b{
        @extend .btn;
        @include box((c:$red,bg:$white));
        @include thin(all,$red);
    }
    .blue-b{
        @extend .btn;
        @include box((c:$blue,bg:$white));
        @include thin(all,$blue);
    }
</style>