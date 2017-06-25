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
    <div>
      <p>
        <span v-text="historyData.name"></span>
        <span v-text="historyData.historyData.start"></span>
        <span v-text="historyData.historyData.start"></span>
      </p>
      <svg ref="svg" version="1.1" class="svg"  xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data:function(){
      return {
          suits:[],
          historyData:{
              historyData:{}
          }
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
          console.log(res);
          self.$data.suits=res.body.lists;
        },(res)=>{
          console.log("error")
        });

        this.$http.get(`/api/getOneCodeHistoryData?code=${self.code}`).then((res)=>{
            console.log(res.body.result);
            self.$data.historyData=res.body.result;
            new drawKLine(self.$refs["svg"],res.body.result);
        },(res)=>{
            console.log("error")
        });

    },
    components:{

    }
  }

  class drawKLine{
    constructor(svg,data){
        this.svg=window.svg=svg;
        this.data=data.historyData.lists;
        this.barCount=this.data.length;
        this.barSize=6;
        this.strokeWidth=1;
        this.barGap=3;
        this.topSpace=0;
        this.bottomSpace=0;
        this.rightSpace=30;
        this.max=-10000000;
        this.min=100000000;
        this.init();

        this.calMaxMinVal(this.data);
        console.log(this.max,this.min);
        this.perH=(this.height - this.topSpace -this.bottomSpace)/(this.max-this.min);
        this.draw();
//        this.drawOneK();
        console.log(this);
    }
    init(){
        let self=this;

        let client=self.svg.getBoundingClientRect();
        let width=self.width=client.width;
        let height=self.height=client.width * 0.7;
        self.svg.setAttribute("height",height);
        self.svg.setAttribute("width",width );



    }
    calMaxMinVal(data){
        let self=this;
        let max=-1000000;
        let min=10000000;

        for(let i=0;i<data.length;i++){
            let day=data[i];
            let high=day[2];
            let low=day[2];
            if(high>max){
                max=high;
            }
            if(low<min){
                min=low;
            }
        }
        self.max=max;
        self.min=min;
    }
    calPosition(price){

    }
    draw(){
        let self=this;
        for(let i=0;i<self.barCount;i++){
            let bar=self.data[i];
            let open=bar[1];
            let high=bar[2];
            let low=bar[3];
            let close=bar[4];

            let open_y=(self.max-open)*self.perH;
            let close_y=(self.max-close)*self.perH;

            let height=close_y-open_y;

            let x=(self.barSize+self.barGap) * i;
            let start_y=height>=0?close_y:open_y;
            let stroke=height>=0?"#00b252":"#ff0000";
            let option={
                x,
                y:self.topSpace+start_y,
                height:Math.abs(height),
                stroke,
                fill:height>=0?"#00b252":"transparent"
            };

//            console.log(option);
            self.drawOneK(option);
        }
    }
    drawOneK(option){
        let {x,y,height,stroke,fill}=option;
        let self=this;
        let rect=document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x",x);
        rect.setAttribute("y",y);

        rect.setAttribute("width",self.barSize);
        rect.setAttribute("height",height);
        rect.setAttribute("stroke",stroke);
        rect.setAttribute("stroke-width",self.strokeWidth);
        rect.setAttribute("fill",fill);
        rect.setAttribute("vector-effect","non-scaling-stroke");
        self.svg.appendChild(rect);
    }
  }
</script>


<style rel="stylesheet/scss" scoped lang="sass">
  
  @import "../assets/css/ignore/mixin.scss";
  .table{
    width:100%;
  }
    .svg{
        display: block;
        width:7rem;
        margin:0.2rem auto;
          border:1px solid red;
    }
</style>
