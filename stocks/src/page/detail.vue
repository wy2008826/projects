<template>
  <div >
    <p>{{code}}:{{name}}</p>
    <table class="table text-center">
      <thead>
        <td>时间</td>
        <td>开盘</td>
        <td>最高</td>
        <td>最低</td>
        <td>收盘</td>
      </thead>
      <tbody>
        <tr v-for="item in suits">
          <td v-text="item[0]"></td>
          <td v-text="item[1]"></td>
          <td v-text="item[2]"></td>
          <td v-text="item[3]"></td>
          <td v-text="item[4]"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data:function(){
      return {
        suits:[]
      }
    },
    computed:{
      curStock(){
        return this.$store.state.curStock;
      },
      code(){
        let self=this;
        return self.curStock&&self.curStock.code ||self.$route.params.code;
      },
      name(){
        let self=this;
        return self.curStock&&self.curStock.name ||""
      }
    },
    methods:{
      
    },
    created(){
      var self=this;
      console.log(this)
      this.$http.get(`/api/getOneCodeAllT?code=${self.code}`).then((res)=>{
        console.log(res,12);
        self.$data.suits=res.body.lists;
      },(res)=>{
        console.log("error")
      });
    },
    components:{

    }
  }
</script>


<style rel="stylesheet/scss" scoped lang="sass">
  
  @import "../assets/css/ignore/mixin.scss";
  .table{
    width:100%;
  }
</style>
