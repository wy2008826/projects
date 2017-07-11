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
    let calProfitFromOneDay=require("utils/calProfitFromOneDay.js");
    let calAverageLineData=require("utils/calAverageLineData.js");

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
                    if(isLowOpenAndHighClose(recentData).isSuit){
                        let rates=calProfitFromOneDay(i,self.$data.sortData);

                        let buyTimeClose=recentData[1][4];
                        suits.push({
                            time:recentData[1][0],
                            buyTimeClose,
                            rate3:rates.rate3,
                            rate6:rates.rate6,
                        });
                    }
                };
                suits=suits.reverse();
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
            this.$http.get(`/api/getOneCodeAllT?code=${self.code}`).then((res)=>{
                self.$data.suits=res.body.lists;
            },(res)=>{
                console.log("error")
            });

            this.$http.get(`/api/getOneCodeHistoryData?code=${self.code}`).then((res)=>{
                // console.log(res);
                self.$data.historyData=res.body.result;
                self.name=res.body.result.name;

                let data=[];
                Object.keys(self.$data.historyData.historyData.dataColects).forEach(function(timeKey){
                    data.push(self.$data.historyData.historyData.dataColects[timeKey]);
                });
                self.$data.sortData=data.sort(function(prev,next){
                  return new Date(prev[0])-new Date(next[0]);
                });

                // console.log('sortData:',self.$data.sortData)
                window.draw=new drawKLine(self.$refs["svg"],self.$data.sortData);
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
            this.data=data;
            this.averageData=calAverageLineData(this.data);
            this.length=data.length;
            this.barCount=data.length;
            this.barSize=6;
            this.strokeWidth=1;
            this.barGap=3;
            this.topSpace=0;
            this.bottomSpace=0;
            this.rightSpace=30;
            this.max=-10000000;
            this.min=100000000;
            this.perSize=0;
            this.averageConfig={
              _5:"#fafafa",
              _10:"#f5fd00",
              _20:"#de00dd",
              _30:"#00f91b",
              _60:"#707070"
            }
            this.init();

            let maxMin=this.calMaxMinVal(0,data.length);
            this.max=maxMin.max;
            this.min=maxMin.min;
            this.draw();
            this.drawAverage();

            let start=this.length-100>=0?this.length-100:0;
            this.setViewBox(start,this.length);
        }
        init(){
            let self=this;

            let client=self.svg.getBoundingClientRect();
            let width=self.width=client.width;
            let height=self.height=client.width * 0.7;
            self.svg.setAttribute("height",height);
            self.svg.setAttribute("width",width );
            this.move();

        }
        calMaxMinVal(start,end){
            console.log(start,end)
            let self=this;
            let max=-1000000;
            let min=10000000;
            let highs=[];
            let lows=[];

            for(let i=start;i<end;i++){
                let day=self.data[i];
                let high=day[2];
                let low=day[3];
                highs.push(high);
                lows.push(low);
            }
            max=Math.max.apply(null,highs);
            min=Math.min.apply(null,lows);
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

            this.perSize=width / this.width;
            this.start=start;
            this.canviewCount=end-start;
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


            let stroke=_height>=0?"#ff0000":"#00ffff";
            let fill=_height>=0?"transparent":"#00ffff";
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
        drawAverage(){
            let avers=[10,30,60];
            for(let i=0;i<avers.length;i++){
                this.drawAverageLine(avers[i]);
            }
        }
        drawAverageLine(days){
            let self=this;
            let polyline=document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            let avers=[];
            for(let i=0;i<this.averageData.length;i++){
                let averDay=this.averageData[i][`_${days}`]
                let x=(self.barSize+self.barGap) * i;

                if(averDay){
                    avers.push(`${x},${-averDay}`);
                }
            }
            let points=avers.join(' ');

            polyline.setAttribute("points",points);
            polyline.setAttribute("fill",'transparent');
            polyline.setAttribute("stroke",self.averageConfig[`_${days}`]);
            polyline.setAttribute("stroke-width",self.strokeWidth);
            polyline.setAttribute("vector-effect","non-scaling-stroke");
            self.svg.appendChild(polyline);
        }
        move(){
            const self=this;
            let start_x;
            let start_y;
            let move_x;
            let move_y;
            let startViewBox;
            let _start;

            this.svg.addEventListener('touchstart',(e)=>{
                let touch=e.touches[0];
                let {pageX,pageY}=touch;
                start_x=move_x=pageX;
                start_y=move_y=pageY;
                startViewBox=self.svg.getAttribute('viewBox').split(' ');
                _start=self.start
                console.log(pageX,e.touches);
            });
            this.svg.addEventListener('touchmove',(e)=>{
                let touch=e.touches[0];
                let {pageX,pageY}=touch;

                let dis_x=move_x-start_x;

                let viewBoxDis=dis_x*self.perSize;
                let move_dis_x=(pageX-move_x)*self.perSize;

                let count=Math.round(move_dis_x / (self.barSize+self.barGap));
                if(_start-count<0){
                    _start=0
                }
                if(_start-count>self.length-self.canviewCount){
                    return ;
                }
                _start=_start-count>=0?_start-count:0;
                let end=_start+self.canviewCount;
                console.log(_start,end)
                self.setViewBox(_start,end);
                move_x=pageX;
                move_y=pageY;
            });
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
        background-color:#000;
    }
</style>
