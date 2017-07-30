<template>
    <div class="wrap">
        <vInput >
            <input v-model="username"  placeholder="请输入账户名" />
        </vInput>
        <vInput >
            <input v-model="password"  placeholder="请输入密码" />
        </vInput>
        <p class="login_row">
            <router-link tag="span" to="/register">没有账号？立即注册</router-link>
        </p>
        <Btn :label="'登录'" :click="doLogin" :type="'red'"></Btn>
    </div>
</template>

<script type="text/babel">

    import vInput from '@/components/Input/Input.vue';
    import Btn from '@/components/Btn/Btn.vue';

    export default {
        data: function () {
            return {
                username:'',
                password:''
            }
        },
        computed: {},
        methods: {
            doLogin(){
                if(!this.username){
                    alert('账户名不能为空！');
                    return;
                }
                if(!this.password){
                    alert('密码不能为空！');
                    return;
                }
                this.$http.get(`/api/login?username=${this.username}&password=${this.password}`).then((res)=>{
                    let data=res.body;
                    if(data.r){
                        this.$store.dispatch('login',data.username);
                        this.$router.back()
                    }else{
                        alert(data.msg);
                    }
                    console.log(res);
                });
                console.log(this.username,this.password);
            }
        },
        created(){
            let self = this;

        },
        mounted(){

        },
        components: {
            vInput,
            Btn
        }
    }
</script>


<style rel="stylesheet/scss" scoped lang="scss">

    @import "../assets/css/ignore/mixin.scss";
    .wrap{
        padding:0.6rem 0.3rem;
    }
    .login_row{
        line-height: 0.6rem;
        text-align: right;
        margin-bottom: 0.4rem;
        span{
            color:$blue;
        }
    }
</style>
