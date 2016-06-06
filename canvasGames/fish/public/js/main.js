function canvasUtil(){//canvas常用的绘图api
	this.drawImg=function(img,option){//img img_x img_y img_w img_h c_x c_y c_w c_h ctx canvas
		var o=option;
		var ctx=o.ctx;
		img.onload=function(){
			console.log("loaded");
			var width=img.width;
			var height=img.height;
			ctx.save();
			ctx.drawImage(img,o.img_x,o.img_y,o.img_w,o.img_h,o.c_x,o.c_y,o.c_w,o.c_h);
			ctx.restore();
		}
	}
};
var canvasUtil=new canvasUtil();



(function(){
	var Anemone=function(){//海葵对象

	};
	Anemone.prototype={
		draw:function(){

		}
	};

	var App=function (){

		var wraper=document.getElementsByClassName("wraper")[0];
		
		this.dpr=2;//设置canvas的清晰度

		this.cssWidth=wraper.offsetWidth;
		this.cssHeight=wraper.offsetHeight;

		this.canvas1=document.getElementById("canvas1");
		this.canvas2=document.getElementById("canvas2");
		
		this.init();
		this.drawCanvas1();//绘制背景  海葵  果实等
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

		},
		drawCanvas1:function(){
			var self=this;
			var ctx1=self.ctx1;

			var big_bg=new Image();
			big_bg.src="./public/images/background.jpg";
			canvasUtil.drawImg(big_bg,{
				ctx:ctx1,
				canvas:self.canvas1,

			});


			big_bg.onload=function(){
				var width=big_bg.width;
				var height=big_bg.height;
				ctx1.save();
				ctx1.drawImage(big_bg,0,0,width,height,0,0,self.dprWidth,self.dprHeight);
				ctx1.restore();
			}
		}
	};



	app=new App();

})();