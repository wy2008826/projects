// 1.图片加载完成后绘制  同一个canvas上面绘制多张图片的绘制顺序问题
// 2.不同的对象怎么去组织内部代码
// 3.不同canvas之间对象的交互  以及碰撞检测问题
// 4.合理的布局应该是各种对象是分离的  app对象只负责将各种对象组织到一起，形成一个完整的业务逻辑


//canvas常用的绘图api  绘制图片  线条  圆弧 。。。。
function canvasUtil(){
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



var Background=function(option){//背景
	var o=this.o=option;
	this.ctx=o.ctx;
	this.canvas=o.canvas;
	this.init();
};


Background.prototype={
	init:function(){
		this.bg=new Image();
		this.bg.src="./public/images/background.jpg";
	},
	draw:function(){
		var self=this;
		canvasUtil._drawImg(self.bg,{//img_x img_y img_w img_h c_x c_y c_w c_h ctx canvas
			c_x:0,
			c_y:0,
			c_w:self.canvas.width,
			c_h:self.canvas.height,
			ctx:self.ctx,
			canvas:self.canvas
		});
	}
};


//海葵对象
var Ane=function(option){//海葵对象 canvas ctx
	var o=this.o=option;
	this.canvas=o.canvas;
	this.ctx=o.ctx;
	this.c_w=o.canvas.width;
	this.c_h=o.canvas.height;
	this.num=30;
	this.aver=this.c_w / this.num;
	this.x=[];//海葵的x坐标集合
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

//果实对象
var Fruit=function(o){

	this.num=30;//果实数量
	this.fruit=[];
};

Fruit.prototype={
	init:function(){
		var self=this;
		for(var i=0;i<self.num;i++){
			self.fruit[i]={//放置果实对象
				type:"",//果实类型
				x:"",
				y:"",
				alive:false,//是否是活动的
			};
		}
	},
	draw:function(){

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

			self.canvas1.width=self.canvas2.width=dprWidth;
			self.canvas1.height=self.canvas2.height=dprHeight;

			this.ctx1=self.canvas1.getContext("2d");
			this.ctx2=self.canvas2.getContext("2d");


			this.background=new Background({//背景
				canvas:self.canvas1,
				ctx:self.ctx1
			});

			this.ane=new Ane({//海葵
				canvas:self.canvas1,
				ctx:self.ctx1
			});

			this.fruit=new Fruit({//果实
				canvas:self.canvas1,
				ctx:self.ctx1
			});

			
		},
		gameLoop:function(){
			var self=this;
			self.lastTime=new Date().getTime();
			function loop(){
				window.requestAnimationFrame(loop);

				self.background.draw();//绘制背景图片
				self.ane.draw();//绘制摆动的海葵
				// self.fruit.draw();//绘制果实

				var now=new Date().getTime();
				console.log(now-self.lastTime);
				self.lastTime=new Date().getTime();
			}
			loop();
		}
	};

	app=new App();
	
})();