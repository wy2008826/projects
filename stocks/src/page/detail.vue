<template>
  <div >
    <p>{{code}}:{{name}}</p>
    <table class="table">
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
      curStockIndex(){
        return this.$store.state.curStockIndex;
      },
      code(){
        let curStockIndex=this.curStockIndex;
        
        return this.$store.state.stocks[curStockIndex]["code"];
      },
      name(){
        let curStockIndex=this.curStockIndex;
        return this.$store.state.stocks[curStockIndex]["name"];
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
