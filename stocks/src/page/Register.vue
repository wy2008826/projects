<template>
    <div class="wrap">
        <vInput >
            <input v-model="username"  placeholder="6至12位字符" />
        </vInput>
        <vInput >
            <input v-model="password"  placeholder="请输入密码" />
        </vInput>
        <vInput >
            <input v-model="password1"  placeholder="请确认密码" />
        </vInput>
        <p class="login_row">
            <router-link tag="span" to="/login">已有账号？立即登陆</router-link>
        </p>
        <Btn :label="'注册'" :click="doRegister" :type="'red'"></Btn>
    </div>
</template>

<script type="text/babel">

    import vInput from '@/components/Input/Input.vue';
    import Btn from '@/components/Btn/Btn.vue';

    export default {
        data: function () {
            return {
                username:'',
                password:'',
                password1:''
            }
        },
        computed: {},
        methods: {
            doRegister(){
                let userName_reg=/^[0-9a-zA-Z]{6,12}$/;
                let pass_reg=/^[0-9a-zA-Z]{6,12}$/;

                if(!userName_reg.test(this.username)){
                    alert('账户名必须为6-12位字符');
                    return;
                }
                if(!pass_reg.test(this.password)){
                    alert('密码必须为6-12位字符');
                    return;
                }
                if(this.password!=this.password1){
                    alert('两次密码不一致！');
                    return;
                }

                this.$http.get(`/api/register?username=${this.username}&password=${this.password}`).then((res)=>{
                    let data=res.body;
                    if(data.save){
                        this.$store.dispatch('login',data.username);
                        this.$router.replace('/index')
                    }else{
                        alert(data.msg);
                    }
                    console.log(res);
                });
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
