var uploadify_onSelectError = function(file, errorCode, errorMsg) {  
        var msgText = "上传失败\n";  
        switch (errorCode) {  
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:  
                //this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";  
                msgText += "每次最多上传 " + this.settings.queueSizeLimit + "个文件";  
                break;  
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:  
                msgText += "文件大小超过限制( " + this.settings.fileSizeLimit + " )";  
                break;  
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:  
                msgText += "文件大小为0";  
                break;  
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:  
                msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;  
                break;  
            default:  
                msgText += "错误代码：" + errorCode + "\n" + errorMsg;  
        }  
        alert(msgText);  
    };  
   
var uploadify_onUploadError = function(file, errorCode, errorMsg, errorString) {  
        // 手工取消不弹出提示  
        if (errorCode == SWFUpload.UPLOAD_ERROR.FILE_CANCELLED  
                || errorCode == SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED) {
            return;  
        }  
        var msgText = "上传失败\n";  
        switch (errorCode) {  
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:  
                msgText += "HTTP 错误\n" + errorMsg;  
                break;  
            case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:  
                msgText += "上传文件丢失，请重新上传";  
                break;  
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:  
                msgText += "IO错误";  
                break;  
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:  
                msgText += "安全性错误\n" + errorMsg;  
                break;  
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:  
                msgText += "每次最多上传 " + this.settings.uploadLimit + "个";  
                break;  
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:  
                msgText += errorMsg;  
                break;  
            case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:  
                msgText += "找不到指定文件，请重新操作";  
                break;  
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:  
                msgText += "参数错误";  
                break;  
            default:  
                msgText += "文件:" + file.name + "\n错误码:" + errorCode + "\n"  
                        + errorMsg + "\n" + errorString;  
        }
        alert(msgText);
}  
   
var uploadify_onSelect = function(){  
};  
   
var uploadify_onUploadSuccess = function(file, data, response) {  
    //alert(file.name + "\n\n" + response + "\n\n" + data);  
};  
//var uploadify_config = {  
//    'swf' : 'resources/uploadify.swf',  
//    'wmode' : 'transparent', 
//    'queueID':'queue',
//    "uploader":"file",
//    'removeTimeout' : 0,  
//    'width' : 80,  
//    'height' : 30,  
//    'multi' : false,  
//    'auto' : false,  
//    'buttonText' : '上传',  
//    'hideButton' : 'true',  
//    'fileTypeExts' : '*.png;*.jpg;*.jpeg',  
//    'fileSizeLimit' : '3MB',
//    'formData': {
//		'timestamp' :  Date.parse(new Date()),
//		'folder'         : 'test\\images',
//		'hideName'         :'true',
//		
//	},
//    'fileTypeDesc' : 'Image Files',  
//    //'formData' : {"action": "upload", "sid" : ""},  
//    'overrideEvents' : [ 'onDialogClose', 'onUploadSuccess', 'onUploadError', 'onSelectError' ],  
//    'onSelect' : uploadify_onSelect,  
//    'onSelectError' : uploadify_onSelectError,  
//    'onUploadError' : uploadify_onUploadError,  
//    'onUploadSuccess' : uploadify_onUploadSuccess  
//};

var appenImge =function(id,width,height,src,multi){
	var objNewImg = $('<img>',{"src":src, "width":width, "height":height}); 
	if(!multi){
		$(id).html("");
	}
	$(id).append(objNewImg); 
	
}
var getUploadConfig=function(){
	return jQuery.extend(true,{}, uploadify_config);
}

$(function() {
	//var fileconfig=getUploadConfig();
	//fileconfig["onUploadSuccess"]=loadsuccess;
	//对每个文件标签处理
	$(".fileScan").each(function(){
		var $this = $(this);//获取当前的文件标签的jquery对象
		var siblQuene = $this.siblings(".queue").attr("id");//获取当前文件标签的传输队列兄弟节点
		var siblPreview =  $this.siblings(".preview").attr("id");//获取当前文件标签上传成功后的显示节点
		$this.uploadify({  
		    'swf' : '/statics/js/uploadify/uploadify.swf',  
		    'wmode' : 'transparent', 
		    'queueID':siblQuene,
		    "uploader":"http://192.168.199.113:8081/file",
		    'removeTimeout' : 0,  
		    'width' : 80,  
		    'height' : 30,  
		    'multi' : false,  
		    'auto' : false,  
		    'buttonText' : '上传',  
		    'hideButton' : 'true',  
		    'fileTypeExts' : '*.png;*.jpg;*.jpeg',  
		    'fileSizeLimit' : '3MB',
		    'formData': {
				'timestamp' :  Date.parse(new Date()),
				'folder'         : 'test\\images',
				'hideName'         :'true',
				
			},
		    'fileTypeDesc' : 'Image Files',  
		    //'formData' : {"action": "upload", "sid" : ""},  
		    'overrideEvents' : [ 'onDialogClose', 'onUploadSuccess', 'onUploadError', 'onSelectError' ],  
		    'onSelect' : uploadify_onSelect,  
		    'onSelectError' : uploadify_onSelectError,  
		    'onUploadError' : uploadify_onUploadError,  
		    'onUploadSuccess' : function(file, data, response){
		    	alert(data);
				 appenImge("#"+siblPreview,150,150,"http://192.168.199.122:9002/zaimages/data/upload/zizhi/qbmimg/"+data,true);
		    	}
		    });
	});
});
//$("#id").uploadify(uploadify_config);  