<template>
    <div >
        <p class="title_desc">
            <span v-text="code"></span>
            <span v-text="historyData.name"></span>
            <span v-text="start"></span>至<span v-text="end"></span>
            <span v-if="!zixuan[code]" class="iconfont icon-tianjia search" @click="clickAddZixuan">加入自选</span>
            <span v-if="zixuan[code]" @click="clickAddZixuan(code)">添加备注</span>
        </p>
        <div class="svgWraper" id="svgWraper">
            <svg ref="svg" preserveAspectRatio="none" class="svg"  xmlns="http://www.w3.org/2000/svg" @click="resetStatus">
                <polyline v-show="averLineStatus.aver5"  id="aver5"></polyline>
                <polyline v-show="averLineStatus.aver10" id="aver10"></polyline>
                <polyline v-show="averLineStatus.aver20" id="aver20"></polyline>
                <polyline v-show="averLineStatus.aver30" id="aver30"></polyline>
                <polyline v-show="averLineStatus.aver60" id="aver60"></polyline>
            </svg>
            <ul class="average_set_ul">
                <p @click="toggleAverageSettingStatus">均线设置</p>
                <transition name="scaleY">
                    <div v-show="show_average_settings">
                        <li :style="{color:averLineColor['_'+aver]}" :class="{selected:averLineStatus['aver'+aver]}" @click="()=>{setLineStatus(aver)}" v-for="aver in [5,10,20,30,60]" >
                            {{aver}}日
                            <span v-show="averLineStatus['aver'+aver]" class="iconfont icon-wancheng fn-fr"></span>
                        </li>
                    </div>
                </transition>
            </ul>
        </div>
        <p id="count"></p>
        <vDialog  :show="showDialog" :close="()=>{showDialog=false}">
            <div class="dialog_wraper">
                <vInput >
                    <textarea v-model="comment" cols="30" placeholder="请输入自选备注" rows="10"></textarea></vInput>
                <Btn :label="'确定'" :click="()=>{addZixuan(code)}" :type="'red'"></Btn>
            </div>
        </vDialog>
    </div>
</template>

<script>
    import vDialog from '@/components/Dialog/Dialog.vue';
    import vInput from '@/components/Input/Input.vue';
    import Btn from '@/components/Btn/Btn.vue';

    import { mapState } from 'vuex';
    let isLowOpenAndHighClose=require("strategy/isLowOpenAndHighClose.js");
    let calProfitFromOneDay=require("utils/calProfitFromOneDay.js");
    let calAverageLineData=require("utils/calAverageLineData.js");
    const averLineColor={
        _5:"#fafafa",
        _10:"#f5fd00",
        _20:"#de00dd",
        _30:"#00f91b",
        _60:"#707070"
    };

    export default {
        data:function(){

            return {
                zixuan:this.$store.state.zixuan,
                averLineColor,
                suits:[],
                historyData:{
                    historyData:{

                    }
                },
                sortData:[],
                showDialog:false,
                comment:'',
                start:'',
                end:'',
                show_average_settings:false,//显示设置均线选项
                averLineStatus:this.$store.averLineStatus||{
                    aver5:true,
                    aver10:true,
                    aver20:true,
                    aver30:true,
                    aver60:true,
                }
            }
        },
        computed:{
            code(){
                let self=this;
                return self.$route.params.code;
            },
        },
        methods:{
            clickAddZixuan(){
                if(this.$store.state.user){
                    this.showDialog=true;
                }else{
                    this.$router.push('/login');
                }

            },
            addZixuan(code){
                this.$store.dispatch('addZixuan',{code,name:this.historyData.name,comment:this.comment});
                this.showDialog=false;
            },
            toggleAverageSettingStatus(){
                this.$data.show_average_settings=!this.$data.show_average_settings;
            },
            setLineStatus(days){
                this.$data.averLineStatus['aver'+days]=!this.$data.averLineStatus['aver'+days];
            },
            resetStatus(){
                this.show_average_settings=false;
            }
        },
        created(){
            var self=this;
            this.$store.averLineStatus=this.$data.averLineStatus;

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
                this.start=this.sortData[0][0];
                this.end=this.sortData[this.sortData.length-1][0];

                // console.log('sortData:',self.$data.sortData)
                let length=self.$data.sortData.length;
                window.draw=new drawKLine(self.$refs["svg"],length>400?self.$data.sortData.slice(length-400):self.$data.sortData);
            },(res)=>{
                console.log("error")
            });

        },
        components:{
            vDialog,
            vInput,
            Btn
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
            this.averageConfig=averLineColor;
            this.init();

            let maxMin=this.calMaxMinVal(0,data.length);
            this.max=maxMin.max;
            this.min=maxMin.min;
            this.draw();
            this.drawAverage();

            let start=this.length-50>=0?this.length-50:0;
            this.start=start;
            this.end=this.length;

            this.setViewBox(start,this.length);
//            this.drawLabel();
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
//            console.log(start,end)
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
            this.svg.setAttribute("viewBox",`${x} ${-max-hight*0.08} ${width} ${hight*1.16}`)
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
            let avers=[5,10,20,30,60];
            for(let i=0;i<avers.length;i++){
                this.drawAverageLine(avers[i]);
            }
        }
        drawAverageLine(days){
            let self=this;
            let polyline=document.getElementById(`aver${days}`)
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
        drawLabel(){
            let self=this;
            let averageData=this.averageData;
            let historyData=this.data;
            let hisLength=averageData.length;
            let suitsIndex=[];
            for(let i=60;i<hisLength-3;i++){
                let {_5,_10,_20,_30,_60}=averageData[i];
                let [buyTime,open,hign,low,close]=historyData[i+3];

                let max_aver=Math.max.apply(null,[_5,_10,_20,_30,_60]);
                let min_aver=Math.min.apply(null,[_5,_10,_20,_30,_60]);
                if( (max_aver-min_aver)/close<0.015 &&nextDaysUp(i,averageData)){
                    self.markOneDay(i+3);
                    suitsIndex.push(i);
                }
            }
            console.log('suitsIndex:',suitsIndex);

            function nextDaysUp(i,averageData){
                return averageData[i+1]['_5']<averageData[i+2]['_5']&&averageData[i+2]['_5']<averageData[i+3]['_5']
            }

        }
        markOneDay(i){
            let self=this;
            let averageData=this.averageData;
            let historyData=this.data;

            let {_5,_10,_20,_30,_60}=averageData[i];
            let [buyTime,open,hign,low,close]=historyData[i];

            let rect=document.createElementNS("http://www.w3.org/2000/svg", "rect");
            let x=(self.barSize+self.barGap)*i;
            let y=-low*0.99;
            let height=low*0.03;

            rect.setAttribute("x",x);
            rect.setAttribute("y",y);

            rect.setAttribute("width",self.barSize*0.4);
            rect.setAttribute("height",height);
            rect.setAttribute("stroke",'#f93');
            rect.setAttribute("stroke-width",self.strokeWidth);
            rect.setAttribute("fill",'#f93');
            rect.setAttribute("vector-effect","non-scaling-stroke");
            self.svg.appendChild(rect);

        }
        move(){
            const self=this;
            let start_x0,start_x1;
            let start_y0,start_y1;
            let move_x0,move_x1;
            let move_y0,move_y1;
            let startViewBox;
            let _start=self.start;
            let click_relativeX;
            let cickStart=self.start;
            let wraper=document.querySelector('#svgWraper');
            wraper.addEventListener('touchstart',(e)=>{
                e.preventDefault();
                let touch0=e.touches[0];

                let pageX0=touch0['pageX'];
                let pageY0=touch0['pageY'];
                start_x0=move_x0=pageX0;
                start_y0=move_y0=pageY0;

                if(e.touches[1]){
                    let touch1=e.touches[1];
                    let pageX1=touch1['pageX'];
                    let pageY1=touch1['pageY'];
                    start_x1=move_x1=pageX1;
                    start_y1=move_y1=pageY1;

                    click_relativeX=start_x1-start_x0;
                    cickStart=self.start;
                }

                startViewBox=self.svg.getAttribute('viewBox').split(' ');
                _start=self.start

            });
            wraper.addEventListener('touchmove',(e)=>{
                e.preventDefault();
                let touch0=e.touches[0];
                let pageX0=touch0['pageX'];
                let pageY0=touch0['pageY'];

                let dis_x0=move_x0-start_x0;
                let move_dis_x0=(pageX0-move_x0)*self.perSize;

                if(e.touches.length==2){
                    let touch1=e.touches[1];
                    let pageX1=touch1['pageX'];
                    let pageY1=touch1['pageY'];


                    let move_relativeX=pageX1-pageX0;

                    let count=3*Math.round((move_relativeX-click_relativeX) / (self.barSize+self.barGap));

                    document.getElementById('count').innerHTML=count;

                    _start=cickStart-count>=0?cickStart-count:0;

                    if(_start<0){
                        _start=self.start=0
                    }
                    if(_start>self.length-5){
                        _start=self.start=self.length-5 ;
                    }

                    document.getElementById('count').innerHTML=`count:${count},_start:${_start}`;

                    self.setViewBox(_start,self.end);
                    move_x1=pageX1;
                    move_y1=pageY1;

                }else{


                    let count=Math.round(move_dis_x0 / (self.barSize+self.barGap));
                    if(_start-count<0){
                        _start=0
                    }
                    if(_start-count>self.length-self.canviewCount){
                        return ;
                    }
                    _start=_start-count>=0?_start-count:0;
                    let end=_start+(self.end-self.start);

                    self.setViewBox(_start,end);
                    self.start=_start;
                    self.end=end;

                    move_x0=pageX0;
                    move_y0=pageY0;
                }

            });
        }
    }
</script>


<style rel="stylesheet/scss" scoped lang="scss">
  
    @import "../assets/css/ignore/mixin.scss";
    .strategy_title{
        text-align: center;
        line-height: 0.6rem;
        color:#456;
    }
    .title_desc{
        font-size: 0.24rem;
        line-height: 0.6rem;
        padding-left: 0.3rem;
        span{
            margin:0 0.05rem;
        }
    }
    .svgWraper{
        position: relative;
    }
    .svg{
        display: block;
        width:7.5rem;
        margin:0 auto;
        border:1px solid red;
        background-color:#000;
    }
    .dialog_wraper{
        @include box((p:0.3rem 0.2rem));
    }
    .average_set_ul {
        position: absolute;
        right: 0.1rem;
        top: 0;
        line-height: 0.4rem;
        color:#fff;
        border:1px solid red;
        background-color: rgba(0,0,0,0.7);
        li {
            padding: 0 0.1rem;
            border-bottom:1px solid red;
        }
    }
</style>
