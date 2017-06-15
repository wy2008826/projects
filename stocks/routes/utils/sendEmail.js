let nodemailer = require("nodemailer");//发送邮件所需要的module

function sendEmail(html){
	let transport = nodemailer.createTransport( {
	    host: 'smtp.163.com',
	    port: 465,
	    secure: true,
	    auth: {
	        user: "wy760104178@163.com",
	        pass: "wy1479285"
	    }
	});

	return new Promise(function(resolve,reject){
		transport.sendMail({
		    from : "wy760104178@163.com",
		    to : "760104178@qq.com",
		    subject: "now kLine is T",
		    generateTextFromHTML : true,
		    // text:"hello word",
		    html : html
		}, function(error, response){
		    if(error){
		        console.log(error);
		        reject(error);
		    }else{
		        console.log("Message sent: " , response);
		    	resolve(response);
		    }
		    transport.close();
		});
	});

}

module.exports=sendEmail;