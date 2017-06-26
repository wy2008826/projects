<template>
  <div >
    <p>{{code}}:{{historyData.name}}</p>
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
        <span v-text="historyData.historyData.end"></span>
      </p>
      <svg ref="svg" preserveAspectRatio="none" class="svg"  xmlns="http://www.w3.org/2000/svg"></svg>
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
        return self.$route.params.code;
      },
      name(){
        let self=this;
        return ""
      }
    },
    methods:{

    },
    created(){
        var self=this;
        console.log(this)
        this.$http.get(`/api/getOneCodeAllT?code=${self.code}`).then((res)=>{
          self.$data.suits=res.body.lists;
        },(res)=>{
          console.log("error")
        });

        this.$http.get(`/api/getOneCodeHistoryData?code=${self.code}`).then((res)=>{
            console.log(res);
            self.$data.historyData=res.body.result;
            self.name=res.body.result.name;
            window.draw=new drawKLine(self.$refs["svg"],res.body.result);
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
        this.length=this.data.length;
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

        let maxMin=this.calMaxMinVal(0,length-1);
        self.max=maxMin.max;
        self.min=maxMin.min;

        this.draw();
        this.setViewBox(this.length-40,this.length-1);
    }
    init(){
        let self=this;

        let client=self.svg.getBoundingClientRect();
        let width=self.width=client.width;
        let height=self.height=client.width * 0.7;
        self.svg.setAttribute("height",height);
        self.svg.setAttribute("width",width );

    }
    calMaxMinVal(start,end){
        let self=this;
        let max=-1000000;
        let min=10000000;

        for(let i=start;i<end;i++){
            let day=self.data[i];
            let high=day[2];
            let low=day[3];
            if(high>max){
                max=high;
            }
            if(low<min){
                min=low;
            }
        }
        return {
          max,
          min
        }
    }
    setViewBox(start,end){
      let self=this;

      let {max,min}=this.calMaxMinVal(start,end);
      let hight=max-min;
      let barRelative=self.barSize+self.barGap;
      let width=(end-start+3)*barRelative;
      let x=start*barRelative;
      this.svg.setAttribute("viewBox",`${x} ${-max-hight*0.05} ${width} ${hight*1.1}`)
    }
    draw(){
        let self=this;
        for(let i=0;i<self.barCount;i++){
            let bar=self.data[i];
            self.drawOneK(bar,i);

        }
    }
    drawOneK(bar,index){
        let self=this;

        let _open=bar[1];
        let _high=bar[2];
        let _low=bar[3];
        let _close=bar[4];


        let _height=_close-_open;

        let x=(self.barSize+self.barGap) * index;
        let y=_height>=0?-_close:-_open;
        // let y=start_y * 1;
        let height=Math.abs(_height);

        
        let stroke=_height>=0?"#ff0000":"#00b252";
        let fill=_height>=0?"transparent":"#00b252";
        let high=-_high;
        let low=-_low;

        
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

        let line_top=document.createElementNS("http://www.w3.org/2000/svg", "line");
        line_top.setAttribute("x1",x+self.barSize*0.5);
        line_top.setAttribute("y1",high);
        line_top.setAttribute("x2",x+self.barSize*0.5);
        line_top.setAttribute("y2",y);

        line_top.setAttribute("stroke",stroke);
        line_top.setAttribute("stroke-width",self.strokeWidth);
        line_top.setAttribute("vector-effect","non-scaling-stroke");
        self.svg.appendChild(line_top);



        let line_bottom=document.createElementNS("http://www.w3.org/2000/svg", "line");
        line_bottom.setAttribute("x1",x+self.barSize*0.5);
        line_bottom.setAttribute("y1",y+height);
        line_bottom.setAttribute("x2",x+self.barSize*0.5);
        line_bottom.setAttribute("y2",low);

        line_bottom.setAttribute("stroke",stroke);
        line_bottom.setAttribute("stroke-width",self.strokeWidth);
        line_bottom.setAttribute("vector-effect","non-scaling-stroke");
        self.svg.appendChild(line_bottom);
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
