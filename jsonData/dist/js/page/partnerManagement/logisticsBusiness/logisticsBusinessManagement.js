/*
 *
 * 订单贷
 * @name 物流管理
 *
 */

define(function(require,exports,module){

  require("jquery");
  require("kkpager");
  require("kkpagerCss");
  template=require("artTemplate");
  require("artTemplateHelper");

  template.helper("wuliuStatus",function(status){//启用状态
    return status==0?"停用":"正常";
  });

  template.helper("wuliuStatusBtn",function(status){//启用状态按钮
    return status==0?"启用":"停用";
  });


  $(function(){

    var App=function(){
      var weburl=$("#webUrl").val();
      this.url={
        webUrl:weburl,
        listUrl:weburl+"/partnerManagement/logistics/getLogisticsList.html",//渠道列表
        switchWuliu:weburl+"/partnerManagement/logistics/updateLoginsticsRegisterStatus.html",//更改物流状态
        delWuliu:weburl+"/partnerManagement/logistics/deleteLoginstics.html"//删除物流
      };

      this.tpl={
        wuliuTpl:template.compile($("#wuliuTpl").html())
      };
      this.getQueryData=function(){//获取查询参数
        var $wuliuInp=$("#wuliuInp");
        var $hezuoSelect=$("#hezuoSelect");

        var wuliu=$wuliuInp.val();
        var hezuoStatus=$hezuoSelect.find("option:selected").attr("value");
        var param={"companyName":wuliu,"cooperationStatus":hezuoStatus};
        return param;
      };

      this.loadList=function(query){//根据不同的请求参数加载不同的查询列表
        var self=this;
        var $wuliuTable=$("#wuliuTable");
        var $wuliuTbody=$("#wuliuBody");
        var pageSize=10;
        
        var param={
          current:1,
          pageSize:pageSize,
          companyName:query["companyName"],
          cooperationStatus:query["cooperationStatus"]
        };

        $.ajax({
          url:self.url.listUrl,
          type:"get",
          data:param,
          dataType:"json",
          success:function(data){
            if(data.result){
              if(data.pages&&data.pages.total > 0){
                var html=self.tpl.wuliuTpl(data);
                $wuliuTbody.html(html);
                $wuliuTable.removeClass("hide");
                kkpager.generPageHtml({
                  pagerid: 'kkpager',
                  pno : data.pages.currentPage,//当前页码
                  total : data.pages.pages,//总页码
                  totalRecords : data.pages.total,//总数据条数
                  isShowFirstPageBtn  : false,
                  isShowLastPageBtn : false,
                  isShowTotalPage   : false,
                  isShowTotalRecords  : false,
                  isGoPage      : true,
                  isShowCurrPage      : false,
                  lang:{
                      prePageText       : '<',
                      nextPageText        :'>'
                  },
                  mode:'click',//click模式匹配getHref 和 click
                  click:function(n,total,totalRecords){
                    param.current=n;
                    $.ajax({
                        type:"get",
                        url:self.url.listUrl,
                        data:param,
                        dataType:"json",
                        success:function(data){
                          var html=self.tpl.wuliuTpl(data);
                          $wuliuTbody.html(html);
                        }
                    });
                    this.selectPage(n);
                  },
                  getHref : function(n){
                      return 'javascript:;';
                  }
                })
              }else{
                $wuliuTable.addClass("hide");
                $("#kkpager").html('<p style="line-height:200px;">'+data.msg+'</p>');
              }
            }
            else{
              $wuliuTable.addClass("hide");
              $("#kkpager").html('<p style="line-height:200px;">'+data.msg+'</p>');
            }
          },
          error:function(){
            console.log("error");
          }
        });
      }


      this.init();//页面初始化准备工作
      this.formFun();//查询 清除
      this.loadList(this.getQueryData());//加载物流商列表
      this.operateTable();//停用 修改 删除 查看
    };

    App.prototype={
      init:function(){
        var self=this;

      },
      formFun:function(){
        var self=this;
        var $wuliuInp=$("#wuliuInp");
        var $hezuoSelect=$("#hezuoSelect");

        $("#searchBtn").on("click",function(){//点击查询列表功能
          self.loadList(self.getQueryData());
        });


        $("#clearBtn").on("click",function(){//清空输入框内容
            $wuliuInp.val("");
            $hezuoSelect.find("option:selected").attr("selected",false);
            $hezuoSelect.find("option").eq(0).attr("selected",true);
        });


      },
      operateTable:function(){
        var self=this;
       
        $("#wuliuTable").on("click",".operate-td .stop",function(){//停用 启用
          var $btn=$(this);
          var $statusTd=$btn.closest("tr").find(".status-td").eq(0);
          var id=$btn.attr("data-id");
          var status=$btn.attr("data-status");
          var titleText=$btn.text();

          var param={status:status==0?1:0,id:id};
          parent.layer.confirm('是否'+titleText+'该渠道?', 
            {btn: ['确认','取消']}, //按钮
            function(){
              $.ajax({
                url:self.url.switchWuliu,
                data:param,
                type:"get",
                dataType:"json",
                success:function(data){
                  if(data.result){
                    var statusText=(status==0?"正常":"停用");
                    var btnText=(status==0?"停用":"启用");
                    var newStatus=(status==0?1:0);

                    $btn.text(btnText).attr("data-status",newStatus);
                    $statusTd.text(statusText);
                    parent.layer.closeAll();
                  }
                }
              });
            },
            function(){
              
            }
          );

        }).on("click",".operate-td .del",function(){//删除
          var $btn=$(this);
          var id=$btn.attr("data-id");
          parent.layer.confirm('是否删除该物流商?', 
            {btn: ['确认','取消']}, //按钮
            function(){
              $.ajax({
                url:self.url.delWuliu+"?id="+id,
                type:"get",
                dataType:"json",
                success:function(data){
                  if(data.result){
                    self.loadList(self.getQueryData());
                    parent.layer.closeAll();
                  }
                }
              });
            },
            function(){
              
            }
          );
        });
      },
      
    }


    app=new App();


  })
})
