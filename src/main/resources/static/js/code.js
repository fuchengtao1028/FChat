$(function(){
	//console.log(sessionStorage.getItem("flag")!=null&&sessionStorage.getItem("user")!=null)


	//短信验证码倒计时
	var countdownHandler = function(){
		var $button = $(".sendVerifyCode");
		var number = 60;
		var countdown = function(){
			if (number == 0) {
				$button.attr("disabled",false);
				$button.html("发送验证码");
				number = 60;
				return;
			} else {
				$button.attr("disabled",true);
				$button.html(number + "秒 重新发送");
				number--;
			}
			setTimeout(countdown,1000);
		}
		//console.log("sa")
		setTimeout(countdown,1000);
	}
	//发送短信验证码
	$(".sendVerifyCode").on("click", function(){
		var $number = $("input[name=number]");
		var data = {};
		data.number = $.trim($("input[name=number]").val());
		data.templateId = $.trim($("input[name=templateId]").val());
		if(data.number == ''){
			alert("请输入手机号码");
			return ;
		}
		if(data.templateId == ''){
			alert("请输入模板ID");
			return ;
		}
		countdownHandler();
		$.ajax({
			url: "login/sendSms",
			async : true,
			type: "post",
			dataType: "json",
			data: data,
			success: function (data) {
			}
		});
	})
	//提交
	$(".sub-btn").on("click", function(){
		var data = {};
		data.number = $.trim($("input[name=number]").val());
		data.verifyCode = $.trim($("input[name=verifyCode]").val());
		if(data.verifyCode == ''){
			alert("请输入验证码");
			return ;
		}
		$.ajax({
			url:"login/vMes",
			async : true,
			type: "post",
			dataType: "json",
			data: data,
			success: function (data) {
				if(data.code == 100){
					//alert("注册成功");
					$.ajax({
						url:"login/selectByNumber",
						async : true,
						type: "post",
						dataType: "json",
						data: {
							"number":$.trim($("input[name=number]").val())
						},
						success:function(data){
							if(data.code==100){
							//	console.log(data.extend.user)
								sessionStorage.setItem("user",JSON.stringify(data.extend.user))
								sessionStorage.setItem("flag",data.extend.flag)
								localStorage.setItem("user",JSON.stringify(data.extend.user))
								localStorage.setItem("flag",0)
								window.location.href="index";
							}else{
								alert("登陆失败")
							}
						}
					})
				}
				//console.log(data)
			}
		});
	})



});
