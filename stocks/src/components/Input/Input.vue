<template>
    <div>
        <div  class="input_border">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'InputBorder',
        data() {
            return {}
        },
        mounted() {
        },
        props:[],
        methods: {},
        computed: {},
        components: {}
    }
</script>
<style lang="scss" scoped>
    /**带边框的输入框**/
    @import '../../assets/css/ignore/mixin.scss';
    .input_border {
        @include box((lh:0.8rem, fs:0.28rem, d: flex,m:0 0 0.4rem 0));
        min-height: 0.8rem;
        @include thin(all,#e5e5e5);
        input,textarea,select{
            @include box(( fs:0.28rem));
            text-indent: 0.2rem;
            flex:1;
        }
        textarea{
            padding:0.2rem 0 0.2rem;
            min-height:1rem;
            max-height:2.4rem;
        }
        a{
            @include box((w:1.6rem,ta:center,c:$blue));
        }
    }
</style>