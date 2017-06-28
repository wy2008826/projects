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
    <div>
      <h3 class="strategy_title">所有的低开高走收益</h3>
      <table>
        <thead>
          <tr>
            <th>时间</th>
            <th>3日内最高收益</th>
            <th>6日内最高收益</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in allLowOpenAndHighClose" :class="lowOpenAndHighCloseRateClass(item)">
            <td v-text="item.time"></td>
            <td v-text="item.rate3.toFixed(2)"></td>
            <td v-text="item.rate6.toFixed(2)"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  let isLowOpenAndHighClose=require("strategy/isLowOpenAndHighClose.js");


  export default {
    data:function(){
      return {
          suits:[],
          historyData:{
              historyData:{
                
              }
          },
          sortData:[]
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
      },
      allLowOpenAndHighClose(){
        let self=this;
        let sortData=self.$data.sortData;
        let suits=[];
        for(let i=1;i<sortData.length;i++){
          let recentData=sortData.slice(i-1,i+1);
          console.log(recentData.length)
          if(isLowOpenAndHighClose(recentData).isSuit){
            let laterDays3=sortData.slice(i+1,i+4);
            let laterDays6=sortData.slice(i+1,i+7);

            let max=0;
            let max3=0;
            let max6=0;
            for(let j=0;j<laterDays3.length;j++){
              if(laterDays3[j][2]>max){
                max=laterDays3[j][2];
              }
            }
            max3=max;

            for(let j=0;j<laterDays6.length;j++){
              if(laterDays6[j][2]>max){
                max=laterDays6[j][2];
              }
            }
            max6=max;

            let buyTimeClose=recentData[1][4];
            suits.push({
              time:recentData[1][0],
              buyTimeClose,
              max3,
              rate3:( (max3-buyTimeClose)/buyTimeClose )*100,
              max6,
              rate6:( (max6-buyTimeClose)/buyTimeClose )*100
            });
          }
        };
        suits=suits.reverse();
        console.log(suits);
        return suits;
        
      }
      
    },
    methods:{
      lowOpenAndHighCloseRateClass(item){
        if(item.rate3>4&&item.rate6>4){
            return "high";
        }else if(item.rate3<2){
          return "low"
        }
      }
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

            let data=[];
            Object.keys(self.$data.historyData.historyData.dataColects).forEach(function(timeKey){
                data.push(self.$data.historyData.historyData.dataColects[timeKey]);
            });
            self.$data.sortData=data.sort(function(prev,next){
              return new Date(prev[0])-new Date(next[0]);
            });

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
        let self=this;
        this.svg=window.svg=svg;
        this.data=[];
        Object.keys(data.historyData.dataColects).forEach(function(timeKey){
            self.data.push(data.historyData.dataColects[timeKey]);
        });
        this.data=this.data.sort(function(prev,next){
          return new Date(prev[0])-new Date(next[0]);
        });

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
        this.setViewBox(this.length-100,this.length);
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
  .strategy_title{
    text-align: center;
    line-height: 0.6rem;
    color:#456;
  }
  table{
    width:100%;
    text-align: center;
    tbody{
      tr{
        &.high{
          background-color:#FF7256
        }
        &.low{
          background-color:#98FB98
        }
      }
    }
  }

    .svg{
        display: block;
        width:7rem;
        margin:0.2rem auto;
          border:1px solid red;
    }
</style>
