function canvasUtil(){//canvas常用的绘图api
	this._drawImg=function(img,option){//img img_x img_y img_w img_h c_x c_y c_w c_h ctx canvas
		var o=option;
		var ctx=o.ctx;
		img.onload=function(){
			console.log("loaded");
			ctx.save();
			ctx.drawImage(img,o.img_x||0,o.img_y||0,o.img_w||img.width,o.img_h||img.height,o.c_x,o.c_y,o.c_w,o.c_h);
			ctx.restore();
		}
	},
	this._line=function(option){//绘制线条
		var o=option
		var ctx=o.ctx;
		ctx.save();

		ctx.beginPath();
		ctx.moveTo();
		ctx.lineTo();
		ctx.lineWidth=12;
		ctx.restore();
	}
};
var canvasUtil=new canvasUtil();

var Background=function(){

}

var Ane=function(option){//海葵对象 canvas ctx
	var o=option;
	this.canvas=o.canvas;
	this.ctx=o.ctx;
	this.c_w=o.canvas.width;
	this.c_h=o.canvas.height;
	this.num=30;
	this.aver=this.c_w / this.num;
	this.x=[];
	this.y=[];
	this.len=[];

	this.init();//初始化 需要在生成对象的时候自动调用
};
Ane.prototype={
	init:function(){//生成海葵的各种坐标信息
		var self=this;
		var baseLen=self.c_h * 0.25;

		for(var i=0;i<self.num;i++){
			self.x[i]=i*self.aver+(Math.random()-0.5)*self.aver*0.7;
			self.len[i]=baseLen+Math.random()*baseLen*0.3;
			self.y[i]=self.c_h-self.len[i];
		}
		console.log(self.x,self.y,self.len);
	},
	draw:function(){
		var self=this;
		var ctx=self.ctx;
		ctx.save();
		ctx.globalAlpha=0.2;
		ctx.lineWidth=self.aver * 0.7;
		ctx.strokeStyle="#3be54e";
		ctx.lineCap="round";

		for(var i=0;i<self.num;i++){
			ctx.beginPath();
			ctx.moveTo(self.x[i],self.c_h);
			ctx.lineTo(self.x[i],self.y[i]);
			ctx.stroke();
		}
		ctx.restore();
	}
};

(function(){

	var App=function (){

		var wraper=document.getElementsByClassName("wraper")[0];
		
		this.dpr=2;//设置canvas的清晰度

		this.cssWidth=wraper.offsetWidth;
		this.cssHeight=wraper.offsetHeight;

		this.canvas1=document.getElementById("canvas1");
		this.canvas2=document.getElementById("canvas2");
		
		
		this.init();
		this.gameLoop();
	};
	App.prototype={
		init:function(){
			var self=this;

			var dprWidth=self.dprWidth=self.dpr*self.cssWidth;
			var dprHeight=self.dprHeight=self.dpr*self.cssHeight;

			self.canvas1.width=dprWidth;
			self.canvas2.width=dprWidth;

			self.canvas1.height=dprHeight;
			self.canvas2.height=dprHeight;

			this.ctx1=self.canvas1.getContext("2d");
			this.ctx2=self.canvas2.getContext("2d");

			this.ane=new Ane({
				canvas:self.canvas1,
				ctx:self.ctx2
			});
		},
		drawBackground:function(){
			var self=this;
			var ctx1=self.ctx1;

			var big_bg=new Image();
			big_bg.src="./public/images/background.jpg";
			
			canvasUtil._drawImg(big_bg,{//img_x img_y img_w img_h c_x c_y c_w c_h ctx canvas
				c_x:0,
				c_y:0,
				c_w:self.dprWidth,
				c_h:self.dprHeight,
				ctx:ctx1,
				canvas:self.canvas1
			});
		},
		gameLoop:function(){
			var self=this;
			self.lastTime=new Date().getTime();
			function loop(){
				// self.ctx1.clearRect(0,0,self.dprWidth,self.dprHeight);
				self.drawBackground();
				self.ane.draw();
				window.requestAnimationFrame(loop);
				var now=new Date().getTime();
				console.log(now-self.lastTime);
				self.lastTime=new Date().getTime();
			}
			loop();
		}
	};

	app=new App();
	
})();