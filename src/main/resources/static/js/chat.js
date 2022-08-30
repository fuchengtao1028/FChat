
var ws;
var user;
var defaultImg = "/images/user-10.png"
var users = []
var friends = []
var notFriends = []
var haveSession=false
function showimg(x) {
    var reads = new FileReader();
    f = document.getElementById('f' + x).files[0];
    if (f) {
        reads.readAsDataURL(f);
        reads.onload = function (e) {
            $("#i" + x).show()
            document.getElementById('i' + x).src = this.result;
        };
    }

}
function validateImgB(ele){
    // 返回 KB，保留小数点后两位
    //alert((ele.files[0].size/(1024*1024)).toFixed(2));
    var file = ele.value;

    if(!/.(gif|jpg|jpeg|png|GIF|JPG|bmp)$/.test(file)){

        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        $(ele).val("")
        $(ele).next().hide()
        return false;

    }else{

        //alert((ele.files[0].size).toFixed(2));
        //返回Byte(B),保留小数点后两位
        if(((ele.files[0].size).toFixed(2))>=(97*1024)){

            alert("请上传小于100kb的图片");
            $(ele).val("")
            $(ele).next().hide()
            return false;
        }
    }
}
function validateImg(ele){
    // 返回 KB，保留小数点后两位
    //alert((ele.files[0].size/(1024*1024)).toFixed(2));
    alert("因服务器原因，该功能暂停使用！")
    return false
    var file = ele.value;

    if(!/.(gif|jpg|jpeg|png|GIF|JPG|bmp)$/.test(file)){

        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        $(ele).val("")
        $(ele).next().hide()
        return false;

    }else{

        //alert((ele.files[0].size).toFixed(2));
        //返回Byte(B),保留小数点后两位
        if(((ele.files[0].size).toFixed(2))>=(96*1024)){

            alert("请上传小于96kb的图片");
            $(ele).val("")
            return false;
        }
    }
    $.ajax({
        type:"post",
        url:"file/image",
        data:new FormData($("#ph-up")[0]),
        dataType:"json",
        cache: false,
        processData: false,
        contentType: false,
        success:function (data) {
            if(data.code==100){
                var image_path=data.extend.FileName
                var mes = {
                    "conversationId":$(".open").val(),
                    "fromId": user.id,
                    "toId": $("#tid_c").val(),
                    "type": 4,
                    "status": 3,
                    "isPush": 0,
                    "content": image_path
                }
                ws.send(JSON.stringify(mes))
                $("#messages-content").append('' +
                    '                    <div class="message-item outgoing-message">\n' +
                    '                        <div class="message-user">\n' +
                    '                            <figure class="avatar">\n' +
                    '                                <img src="'+(user.img == null ? defaultImg :user.img)+'" alt="image">\n' +
                    '                            </figure>\n' +
                    '                            <div>\n' +
                    '                                <h5>我</h5>\n' +
                    '                                <div class="time">'+timestampToTime(new Date())+'</div>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    ' <figure> <img src="'+image_path+'" class="w-75 img-fluid rounded" alt="image"></figure>'+
                    '                    </div>')
                $(".open p").text("[图片]")
                scl()
            }else{
                alert("图片传输失败!")
            }
            // alert("jo")
        }
    })
    $(ele).val("")
}
function validateFile(ele){
    // 返回 KB，保留小数点后两位
    //alert((ele.files[0].size/(1024*1024)).toFixed(2));
    alert("因服务器原因，该功能暂停使用！")
    return false
    var file = ele.value;

    if(((ele.files[0].size).toFixed(2))>=(200*1024)){

        alert("请上传小于200kb的图片");
        $(ele).val("")
        return false;
    }

    $.ajax({
        type:"post",
        url:"file/file",
        data:new FormData($("#fl-up")[0]),
        dataType:"json",
        cache: false,
        processData: false,
        contentType: false,
        success:function (data) {
            if(data.code==100){
                var file_path=data.extend.FileName
                var mes = {
                    "conversationId":$(".open").val(),
                    "fromId": user.id,
                    "toId": $("#tid_c").val(),
                    "type": 5,
                    "status": 3,
                    "isPush": 0,
                    "content": file_path
                }
                ws.send(JSON.stringify(mes))
                $("#messages-content").append('' +
                    '                    <div class="message-item outgoing-message">\n' +
                    '                        <div class="message-user">\n' +
                    '                            <figure class="avatar">\n' +
                    '                                <img src="'+(user.img == null ? defaultImg :user.img)+'" alt="image">\n' +
                    '                            </figure>\n' +
                    '                            <div>\n' +
                    '                                <h5>我</h5>\n' +
                    '                                <div class="time">'+timestampToTime(new Date())+'</div>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    ' <div class="message-wrap"><figure> <img src="/images/file_pic.jpg" class="img-fluid rounded" alt="file" style="height: 50px;width: 50px" ><a href="'+file_path+'" style="color: red"> &nbsp;&nbsp;&nbsp;点击接收</a></figure></div>'+
                    '                    </div>')
                $(".open p").text("[文件]")
                scl()
            }else{
                alert("文件传输失败!")
            }
            // alert("jo")
        }
    })
    $(ele).val("")
}
function init() {

    user = JSON.parse(sessionStorage.getItem("user"))
    //console.log(selectById(2))
    $("#i1").hide()
    $(".bk").hide()
    var flag = sessionStorage.getItem("flag");
    //console.log(flag)
    if (flag == 0) {
        $("#pagetour .slider-1").html('\t<div class="item">\n' +
            '\t\t\t\t\t\t<h2 style="margin-top: 45px">欢迎回来</h2>\n' +
            '\t\t\t\t\t\t<button type="button" class="btn btn-link tour-close-btn" style="display: none" data-dismiss="modal" aria-label="Close">Skip</button>\n' +
            '\n' +
            '\t\t\t\t\t</div>')
        //$("#cMOdel").html("")
        setTimeout(function () {
            $(".tour-close-btn").click()
        }, 500)
        //$(".tour-close-btn").click()
        // $("#pagetour").html("")
        // // $(".model-bg").hide()
    }
    //console.log(user.username)
    $("#myId").val(user.id)
    //console.log(user.phone)
    $(".myAva").prop("src", user.img == null ? defaultImg : user.img)
    $("#me small").text(filterPhoneNumber(user.phone))
    $("#me h5").text((user.username === "" || user.username === null) ? "匿名用户" : user.username)
    $(".myAva").next().val(user.id)

    $("#account_info input[name='username']").val(user.username == null ? "匿名用户" : user.username);
    if (user.sex == 0) {
        $("#account_info option[name='male']").prop("selected", true);
        $("#mySex").text("男")
    } else if (user.sex == 1) {
        $("#account_info option[name='female']").prop("selected", true);
        $("#mySex").text("女")
    } else {
        $("#account_info option[name='unknow']").prop("selected", true);
        $("#mySex").text("未知")
    }
    $("#account_info input[name='city']").val(user.city == null ? "" : user.city)
    $("#account_info textarea[name='describex']").val(user.describex == null ? "" : user.describex)
    showSomeone(user)
    //console.log(user.status)
    if (user.status == 0) {
        $("#checkbox1").prop("checked", "checked")
    }

    selectAll();
    showPrompt();
    showUnreadWarning();
}
function showSomeone(u) {
    $("#me2>small").text(filterPhoneNumber(u.phone))
    $("#me2 h5").text((u.username === "" || u.username === null) ? "匿名用户" : u.username)
    $("#me2>figure>img").prop("src", u.img == null ? defaultImg : u.img)
    if (u.sex == 0) {
        $("#mySex").text("男")
    } else if (u.sex == 1) {
        $("#mySex").text("女")
    } else {
        $("#mySex").text("未知")
    }
    $("#myPhone").text(filterPhoneNumber(u.phone))
    $("#myCity").text(u.city == null ? "未知" : u.city)
    $("#myDescribe").text(u.describex == null ? "这个人很懒，没有留下相关描述" : u.describex)
}
function selectAll() {
    $.ajax({
        url: "user/user",
        dataType: "json",
        type: "get",
        async: false,
        success: function (data) {
            if (data.code == 100) {
                users = data.extend.UserList
            } else {
                alert("用户信息获取失败！")
                users = null
            }
        }
    })
    $.ajax({
        url: "user/Friend",
        dataType: "json",
        type: "get",
        data: "id=" + user.id,
        async: false,
        success: function (data) {
            if (data.code == 100) {
                friends = data.extend.FriendList
                for (var u of users) {
                    if (JSON.stringify(friends).indexOf(JSON.stringify(u)) == -1) {
                        notFriends.push(u)
                    }
                }
                //console.log(notFriends)
            } else {
                alert("朋友信息获取失败！")
                friends = null
            }
        }
    })
    selectReqList()
    selectRelation()
    selectChatList()
}
function showThree() {
    // console.log(users)
    // console.log(notFriends)
    var arrNew = []
    var usersx = $.extend(true, [], notFriends);
    if(usersx.length<=3){
        for (let i = 0; i <usersx.length ; i++) {
            var mm = usersx[i];
            if (mm.id == user.id) {
                continue;
            }
            arrNew.push(mm)
        }
    }else{
        for (var i = 0; i < 3; i++) {
            var _num = Math.floor(Math.random() * usersx.length)
            var mm = usersx[_num];

            if (mm.id == user.id) {
                i--;
                continue;
            }
            usersx.splice(_num, 1)
            arrNew.push(mm)
        }
    }
    // console.log(arrNew)
    $("#make_friends").html("")
    var x="";

    for (let u of arrNew) {
        if(u.id==12)x='style="border: 5px solid yellow"'
        else x=''
        $("#make_friends").append(
            '<div class="item">' +
            '<div class="recent-chat float-left">' +
            '<input type="hidden" class="fid" value="' + u.id + '">' +
            '<div class="user" '+x+'><img src=' + (u.img == null ? defaultImg : u.img) + ' alt="" class="canShow" ><input type="hidden" value="'+u.id+'"></div>' +
            '<h3 class="mb-1">' + (u.username == null ? "匿名用户" : u.username) + '</h3>' +
            '<span>' + filterPhoneNumber(u.phone) + '</span>' +
            '<button type="button" class="btn-success addfriend-btn" style="margin-bottom: 10px;border-radius: 15px">添加好友</button>' +
            '</div>' +
            '</div>'
        )
    }
}
function getUrlParam(id) {
    var regExp = new RegExp('([?]|&)' + id + '=([^&]*)(&|$)');
    var result = window.location.href.match(regExp);
    if (result) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }

}
function filterPhoneNumber(phoneNumber) {
    // let reg = /^1[3456789]{1}\d{9}$/	//必须是以1开头，第二位必须是3-9中的任意一个数，后面9位必须是数字
    // //校验手机号是否正确
    // if (reg.test(phoneNumber)) {
    phoneNumber = phoneNumber.toString()	//先强制转换成字符串类型
    return phoneNumber.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    // } else {
    // 	return ''
    // }
}
function formToJson(formArray) {
    var formObject = {};
    formArray.forEach(function (item) {
        formObject[item.name] = item.value;
    });
    return JSON.stringify(formObject);
}
function selectById(id) {
    var result = null
    $.ajax({
        url: "user/user/" + id,
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code == 100) {
                result = data.extend.newUser
            } else {
                alert("新信息获取失败！")
            }
        }
    })
    return result
}
function isFriend(id1, id2) {
    var f = null
    $.ajax({
        url: "relation/relation/" + id1 + "/" + id2,
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code == 100) {
             //   console.log(data)
                f = data.extend.msg
            }
        }
    })
    //console.log(f)
    return f
}
function selectRltByIds(id1, id2) {
    var f = null
    $.ajax({
        url: "relation/relation" ,
        type: "get",
        data:{
            "id1":id1,
            "id2":id2
        },
        async: false,
        dataType: "json",
        success: function (data) {
            if (data.code == 100) {
                f = data.extend.Relation
            }else{
                alert("获取关系信息失败！")
            }
        }
    })
    return f
}
function showReq(msg) {
    var from_user = selectById(msg.fromId)
    var c = '<button class="btn-mini showApply" style="background-color: cornflowerblue;color: #fff">查看</button><input type="hidden" value="' + (from_user.username == null ? "匿名用户" : from_user.username) + '"><input type="hidden" value="' + filterPhoneNumber(from_user.phone) + '"><input type="hidden" value="' + msg.id + '">' + '<input type="hidden" value="' + msg.fromId + '">'
    if (msg.status == 1) c = "<span style='color: green'>已接受</span>"
    if (msg.status == 2) c = "<span style='color: red'>已拒绝</span>"
    $("#apply_list").prepend(
        '<li class="chat-list-item">\n' +
        '\t<figure class="avatar user-online">\n' +
        '\t  <span class="avatar-title bg-secondary rounded-circle"><img src=' + (from_user.img == null ? defaultImg : from_user.img) + ' alt="" class="canShow"><input type="hidden" value="'+from_user.id+'"></span>\n' +
        '\t</figure>\n' +
        '\t<div class="list-body">\n' +
        '\t  <div class="chat-bttn">\n' +
        '\t     <h3 class="mb-1 mt-1">' + (from_user.username == null ? "匿名用户" : from_user.username) + '<span  style="float: right;margin-right: 10px">请求加你为好友</span></h3>\n' +
        // <button class="btn-mini acc" style="background-color: green;color: #fff">接受</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn-mini rej" style="background-color: red;color: #fff">拒绝</button>
        '\t     <p>' + msg.content + '<span style="float: right;margin-right: 10px">' + c + '</span></p>\n' +
        '\t  </div>\n' +
        '\t</div>\n' +
        '</li>'
    )
    showReqWarning()
}
function selectReqList() {
    $.ajax({
        url: "message/reqMessage/" + user.id,
        type: "get",
        dataType: "json",
        async:false,
        success: function (data) {
            if (data.code == 100) {
                var reqMsgList = data.extend.ReqMsgList
                $("#apply_list").html("")
                for (let msg of reqMsgList) {
                    showReq(msg)
                }
                showReqWarning()
            } else {
                alert("获取申请消息列表失败！")
            }
        }
    })
}
function showFriend(rlt) {
    var u = rlt.guest
    var n = "匿名用户"
    if (rlt.remarks != null) {
        n = rlt.remarks
    } else if (u.username != null) {
        n = u.username
    }
    $("#friend_list").prepend('\t<li class="chat-list-item" value="'+u.id+'">\n' +
        '\t                \t\t\t<figure class="avatar user-online">\n' +
        '\t                                <img src=' + (u.img == null ? defaultImg : u.img) + ' alt="image" class="canShow">\n' +
        '\t                                <input type="hidden" value="'+u.id+'">\n' +
        '\t                            </figure>\n' +
        '\t                            <div class="list-body">\n' +
        '\t                            \t<div class="chat-bttn">\n' +
        '\t                                    <h3 class="mb-1 mt-1">' + n + '</h3>\n' +
        '\t                                    <p>' + ((u.describex == null || u.describex === "") ? "暂无介绍" : "个性签名：  " + u.describex) + '<p>\n' +
        '\t                                </div>\n' +
        '\t                                <div class="list-action mt-2 text-right">\n' +
        '\t                                    <a href="#" class="btn-plus dropdown-toggle" data-toggle="dropdown"><i class="ti-plus"></i></a>\n' +
        '\t\t\t\t\t\t\t\t\t\t<div class="dropdown-menu dropdown-menu-right">\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="dropdown-item update-remark">修改备注</a>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<div class="dropdown-divider"></div>\n' +
        '\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="dropdown-item text-danger delete-friend">删除好友</a>\n' +
        '\t\t\t\t\t\t\t\t\t\t</div>\n' +
        '\t                                </div>\n' +
        '\t                            </div>\n' +
        '\t                \t\t</li>')

}
function selectRelation() {
    $.ajax({
        url: "relation/relation/" + user.id,
        dataType: "json",
        type: "get",
        async: false,
        success: function (data) {
            if (data.code == 100) {
                var list = data.extend.RelationList
                $("#friend_list").html("")
                for (let rlt of list) {
                    showFriend(rlt)
                }

            } else {
                alert("朋友列表信息获取失败！")
            }
        }
    })
}
function omit(s) {
    if (s.length <= 8) {
        return s
    }
    return s.substr(0, 8) + " . . ."

}
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '/';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + " " + h + m + s;
}
function selectConversationByMsg(msg) {
    var c = null;
    $.ajax({
        url: "conversation/conversation",
        type: "get",
        data: "msg_id=" + msg.id,
        async: false,
        success: function (data) {
            if (data.code == 100) {
                c = data.extend.Conversation
            } else {
                alert("依据信息获取会话失败！")
            }
        }
    })
    //console.log(c)
    return c
}
function selectConversationById(id) {
    var c = null;
    $.ajax({
        url: "conversation/conversation/plus",
        type: "get",
        data: "conversation_id=" + id,
        async: false,
        success: function (data) {
            if (data.code == 100) {
                c = data.extend.Conversation
            } else {
                alert("依据id获取会话失败！")
            }
        }
    })
    //console.log(c)
    return c
}
function renderSessionList(conversation) {
    var x=""
    var from_id = conversation.firstId == user.id ? conversation.secondId : conversation.firstId;
    var from_user = selectById(from_id)
    var rlt=selectRltByIds(user.id,from_id)
    //  console.log(rlt)
    var u = rlt.guest
    var n = "匿名用户"
    if (rlt.remarks != null) {
        n = rlt.remarks
    } else if (u.username != null) {
        n = u.username
    }
    var msg = conversation.lastMsg
    var c='\t                                    <p>' + omit(msg.content) + '</p>\n'
    if(msg.type==4)c='\t                                    <p>' + '[图片]' + '</p>\n'
    if(msg.type==5)c='\t                                    <p>' + '[文件]' + '</p>\n'
    var unreadC= getValue(user.id+"-"+conversation.id)
    //console.log(unreadC)
    if(unreadC==0||unreadC==null||unreadC=="null")x="style='visibility:hidden'"
    $("#chat_list").prepend('<li class="chat-list-item c_item" value="'+conversation.id+'">\n' +
        '<img src="/images/close.png" class="close-img">'+
        '\t                \t\t\t<figure class="avatar user-online">\n' +
        '\t                               <img src=' + (from_user.img == null ? defaultImg : from_user.img) + ' alt="">\n' +
        '\t                            </figure>\n' +
        '\t                            <div class="list-body">\n' +
        '\t                            \t<div class="chat-bttn">\n' +
        '\t                                    <h3 class="mb-0 mt-2">' + n + '</h3>\n' +
        c+
        '\t                                </div>\n' +
        '\t                                <div class="list-action mt-2 text-right">\n' +
        '\t                                    <div class="message-count bg-primary unread-count" '+x+'>'+unreadC+'</div>\n' +
        '\t                                    <small class="text-primary">' + timestampToTime(msg.time) + '</small>\n' +
        '\t                                </div>\n' +
        '\t                            </div>\n' +
        '\t                \t\t</li>')
}
function showChatByConversationList(c_list) {
    $("#chat_list").html("")
    for (let c of c_list) {
        renderSessionList(c)
    }


}
function selectChatList() {
    $.ajax({
        url: "conversation/conversation/" + user.id,
        dataType: "json",
        type: "get",
        async: false,
        success: function (data) {
            if (data.code == 100) {
                showChatByConversationList(data.extend.ConversationList)
            } else {
                alert("会话列表信息获取失败！")
            }
        }
    })
}
function renderChatContent(conversation){
    var other_user_id=conversation.firstId==user.id?conversation.secondId:conversation.firstId
    var rlt=selectRltByIds(user.id,other_user_id)
    var u = rlt.guest
    var n = "匿名用户"
    if (rlt.remarks != null) {
        n = rlt.remarks
    } else if (u.username != null) {
        n = u.username
    }
    var other_user= selectById(other_user_id)
    $("#a>img").prop("src",other_user.img == null ? defaultImg : other_user.img);
    $("#a>img").addClass("canShow")
    $("#a>img").next().val(other_user_id)
    $("#a").next().find("h5").text(n)
    $("#a").next().find("small").text((other_user.describex == null || other_user.describex === "") ? "暂无介绍" : "个性签名：  " + other_user.describex)
    $("#messages-content").html("")
    for (let m of conversation.messageList) {
        var x="outgoing-message"
        var face=user.img
        var name="我"
        if(m.fromId==other_user_id){
            x="";
            face=other_user.img;
            name=n;
        }
        var c='                        <div class="message-wrap">'+m.content+'</div>\n'
        if(m.type==4){
            c=' <figure> <img src="'+m.content+'" class="w-75 img-fluid rounded" alt="image"></figure>'
        }
        if(m.type==5){
            c=' <div class="message-wrap"><figure> <img src="/images/file_pic.jpg" class="img-fluid rounded" alt="file" style="height: 50px;width: 50px" ><a href="'+m.content+'" style="color: red"> &nbsp;&nbsp;&nbsp;点击接收</a></figure></div>'
        }
        $("#messages-content").append('' +
            '                    <div class="message-item '+x+'">\n' +
            '                        <div class="message-user">\n' +
            '                            <figure class="avatar">\n' +
            '                                <img src="'+(face == null ? defaultImg : face)+'" alt="image">\n' +
            '                            </figure>\n' +
            '                            <div>\n' +
            '                                <h5>'+name+'</h5>\n' +
            '                                <div class="time">'+timestampToTime(m.time)+'</div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            c+
            '                    </div>')

    }
}
function renderChatMsg(msg){
    var p=selectById(msg.fromId)
    var face=p.img
    var name=p.username
    var c='                        <div class="message-wrap">'+msg.content+'</div>\n'
    if(msg.type==4)c=' <figure> <img src="'+msg.content+'" class="w-75 img-fluid rounded" alt="image"></figure>'
    if(msg.type==5)c=' <div class="message-wrap"><figure> <img src="/images/file_pic.jpg" class="img-fluid rounded" alt="file" style="height: 50px;width: 50px" ><a href="'+msg.content+'" style="color: red"> &nbsp;&nbsp;&nbsp;点击接收</a></figure></div>'
    $("#messages-content").append('' +
        '                    <div class="message-item ">\n' +
        '                        <div class="message-user">\n' +
        '                            <figure class="avatar">\n' +
        '                                <img src="'+(face == null ? defaultImg : face)+'" alt="image">\n' +
        '                            </figure>\n' +
        '                            <div>\n' +
        '                                <h5>'+(name == null ? "匿名用户" : name)+'</h5>\n' +
        '                                <div class="time">'+timestampToTime(msg.time)+'</div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        c+
        '                    </div>')


}
function selectOffLineReq(){
    $.ajax({
        url: "message/reqMessage/offline/" + user.id,
        dataType: "json",
        type: "get",
        success: function (data) {
            if (data.code == 100) {
                var offlineReqMsgList= data.extend.OfflineReqMsgList
                for (let o of offlineReqMsgList ) {
                    showReq(o)
                }
            } else {
                alert("离线请求消息获取失败！")
            }
        }
    })
}
function selectOffLineChat(){
    $.ajax({
        url: "message/chatMessage/offline/" + user.id,
        dataType: "json",
        type: "get",
        success: function (data) {
            if (data.code == 100) {
                var offlineChatMsgList= data.extend.OfflineChatMsgList
                for (let o of offlineChatMsgList ) {
                    var the_selecter="#chat_list>li[value='"+o.conversationId+"']"
                    //   console.log($(".open").val())
                    if($(the_selecter).length>0){
                        if($("#chat_list>li:first").val()!=o.conversationId){
                            var $temp=$(the_selecter).remove()
                            $("#chat_list").prepend($temp)
                            if(o.type==2||o.type==3){
                                $(the_selecter).text(omit(o.content))
                            }else if(o.type==4){
                                $(the_selecter).text("[图片]")
                            }else if(o.type==5){
                                $(the_selecter).text("[文件]")
                            }

                            add_unread(o.conversationId,1)
                        }
                    }else{
                        renderSessionList(selectConversationById(o.conversationId))
                        //add_unread(o.conversationId,1)

                    }
                }
                showUnreadWarning()
            } else {
                alert("离线请求消息获取失败！")
            }
        }
    })
}
function addKey(key){
    $.ajax({
        url: "redis/unread",
        type: "post",
        data: "key="+key,
        dataType: "json",
        success: function (data) {
            if (data.code == 100) {
             //   console.log("添加redis key="+key)
            } else {
                alert("添加redis key失败！")
            }
        }
    })
}
function deleteKey(key){
    $.ajax({
        url: "redis/unread",
        type: "delete",
        data: "key="+key,
        dataType: "json",
        success: function (data) {
            if (data.code == 100) {
          //      console.log("删除redis key="+key)
            } else {
                alert("删除redis key失败！")
            }
        }
    })
}
function getValue(key){
    var v=null;
    $.ajax({
        url: "redis/unread",
        type: "get",
        data: "key="+key,
        async:false,
        dataType: "json",
        success: function (data) {
            if (data.code == 100) {
                v=data.extend.Value
         //       console.log("获取redis key="+v)
            } else {
                alert("获取redis key失败！")
            }
        }
    })
    return v
}
function add_unread(conversationId,add_num){
    var the_selecter="#chat_list>li[value='"+conversationId+"']"
    var newN=$(the_selecter).find(".unread-count").html()=="null"?1:Number($(the_selecter).find(".unread-count").html())+add_num
    $(the_selecter).find(".unread-count").css("visibility","visible")
    $(the_selecter).find(".unread-count").html(newN)
}
function showReqWarning(){
    //    console.log($(".showApply").length)
    if($("button.btn-mini.showApply").length>0){
        $("#req-warning").show()
    }else{
        $("#req-warning").hide()
    }
}
function showUnreadWarning(){
    var chatList=$("#chat_list").find(".unread-count")
    //  console.log(chatList)
    var f=false
    for (let i = 0; i <chatList.length ; i++) {
      //  console.log($(chatList[i]).html())
        if($(chatList[i]).html()!=null&&$(chatList[i]).html()!='null'&&$(chatList[i]).html()!=0&&$(chatList[i]).html()!="0"){
            f=true
            break
        }
    }
    if(f)$("#cc span").show()
    else $("#cc span").hide()
}
function noChat(){
    haveSession=false;
    $("#a>img").prop("src","images/add.png")
    $("#a").next().find("h5").text("暂无会话")
    $("#a").next().find("small").text("点击加号选择好友发起会话")
    $(".chat-footer button").prop("disabled",true)
    $(".chat-footer input").val("")
    $("#messages-content").html("")
    $(".open").removeClass("open")
    $("#a>img").removeClass("canShow")
    $("#a>img").next().val("")

}
function updateConversationViewFlag(conversation_id,target,value) {
    $.ajax({
        url:"conversation/conversation/view",
        type:"put",
        data:{
            "conversation_id":conversation_id,
            "target":target,
            "value":value
        },
        dataType:"json",
        success:function (data) {
            if(data.code==100){

            }else{
                alert("隐藏会话失败！")
            }
        }
    })
}
function hidden_conversation(conversation_id){
    var conversation=selectConversationById(conversation_id)
    var target=1
    if(user.id==conversation.secondId)target=2
    updateConversationViewFlag(conversation_id,target,1)
}
function show_conversation(conversation_id){
    var conversation=selectConversationById(conversation_id)
    var target=1
    if(user.id==conversation.secondId)target=2
    updateConversationViewFlag(conversation_id,target,0)
}
function scl() {
    var div=document.getElementById("chat-body")
    div.scrollTo(0,99999999)
}
function showPrompt() {
    if($("#chat_list>li").length<=0){
        $("#chat_list").html('<span style="text-align: center;font-size: 12px;color: #6c757d;margin-top: 15px">暂无会话</span>')
    }
    if($("#friend_list>li").length<=0){
        $("#friend_list").html('<span style="text-align: center;font-size: 12px;color: #6c757d;margin-top: 15px">暂无好友</span>')
    }
    if($("#apply_list>li").length<=0){
        $("#apply_list").html('<span style="text-align: center;font-size: 12px;color: #6c757d;margin-top: 15px">暂无申请</span>')
    }
}
$(function () {
    //var str=sessionStorage.getItem("user")
    // alert((typeof str=='string')&&str.constructor==String)
    if (sessionStorage.getItem("flag")==null||sessionStorage.getItem("user")==null){
        window.location.href="login"
    }
    $("#s").css("overflow","auto")
    $("#chat-body").css("overflow","auto")
    $("#sb").css("overflow","auto")
    $("#clc").css("overflow","auto")
    //$(".main-wrapper .right-content .left-sidebar .sidebar").css("overflow","none")
    $("#fl").css("overflow","auto")
    $("#rl").css("overflow","auto")
    init()
    $("#status").text("连接中...")
    var host = window.location.host;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        ws = new WebSocket('ws://' + window.location.host + "/chat/" + user.id);
    } else {
        alert('Not support websocket');
    }

    ws.onopen = function (evt) {
        $("#status").text("在线")
        $("#status").css("color", "green");
        //selectOffLineReq()
        //selectOffLineChat()
    }
    //接受消息
    ws.onmessage = function (evt) {
        var msg = JSON.parse(evt.data);
     //   console.log(msg)
        var the_selecter="#chat_list>li[value='"+msg.conversationId+"']"
        var f = $(the_selecter).length>0;
        if (msg.type == 0) {

        }
        if(msg.type==2){
            // var the_selecter="#chat_list>li[value='"+msg.conversationId+"']"
            //   console.log($(".open").val())
            if($(".open").val()==msg.conversationId){
                $(".open p").text(omit(msg.content))
                renderChatMsg(msg)
                scl()
            }else if(f){
                if($("#chat_list>li:first").val()!=msg.conversationId){
                    var $temp=$(the_selecter).remove()
                    $("#chat_list").prepend($temp)
                    $(the_selecter).find("p").text(omit(msg.content))
                }else{
                    $(the_selecter).find("p").text(omit(msg.content))
                }
            }else{
                renderSessionList(selectConversationById(msg.conversationId))

            }

        }
        if (msg.type == 1) {
            showReq(msg)

        }
        if (msg.type == 3) {
            var rlt=selectRltByIds(user.id,msg.fromId)
            rlt.guest=selectById(msg.fromId)
            //console.log(rlt)
            showFriend(rlt)
            var conversation = selectConversationByMsg(msg)
            conversation.lastMsg = msg
            renderSessionList(conversation)
        }
        if (msg.type == 4) {
            if($(".open").val()==msg.conversationId){
                $(".open p").text("[图片]")
                renderChatMsg(msg)
                scl()
            }else if(f){
                if($("#chat_list>li:first").val()!=msg.conversationId){
                    var $temp=$(the_selecter).remove()
                    $("#chat_list").prepend($temp)
                    $(the_selecter).find("p").text("[图片]")
                }else{
                    $(the_selecter).find("p").text("[图片]")
                }
            }else{
                renderSessionList(selectConversationById(msg.conversationId))

            }
        }
        if (msg.type == 5) {
            if($(".open").val()==msg.conversationId){
                $(".open p").text("[文件]")
                renderChatMsg(msg)
                scl()
            }else if(f){
                if($("#chat_list>li:first").val()!=msg.conversationId){
                    var $temp=$(the_selecter).remove()
                    $("#chat_list").prepend($temp)
                    $(the_selecter).find("p").text("[文件]")
                }else{
                    $(the_selecter).find("p").text("[文件]")
                }
            }else{
                renderSessionList(selectConversationById(msg.conversationId))

            }
        }
        if(msg.type!=1){

            if($(".open").val()!=msg.conversationId&&f){
                add_unread(msg.conversationId,1)
                // $(this).find(".unread-count").html("0")
            }
            showUnreadWarning()
        }
        // //获取服务端推送的消息
        // var dataStr = evt.data;
        // //将dataStr转换为json对象
        // var res = JSON.parse(dataStr);
        //
        // //判断是否是系统消息
        // if(res.system){
        //
        // }else {
        //
        // };
    }
    ws.onclose = function () {
        ws.close(user.id,"ws-close")
        $("#status").text("离线")
        $("#status").css("color", "red");
    }

    showThree();

    $("#account_info button").click(function () {
        var regu = "^[\u4e00-\u9fa5]{0,}$"
        var uname=$("#account_info input[name='username']").val()
        var re = new RegExp(regu);
        if(!re.test(uname)){
            alert("用户名只能由汉字组成！")
            return false
        }
        $.ajax({
            url: "user/user",
            type: "put",
            data: $("#account_info").serialize(),
            dataType: "json",
            success: function (data) {
                if (data.code == 100) {
                    alert("信息更新成功！")
                    catchNewUser(user.id);
                    init()
                    $("#info-toggle").click()
                } else {
                    alert("信息更新失败！")
                }
            }
        })
    })

    function catchNewUser(id) {
        $.ajax({
            url: "user/user/" + id,
            async: false,
            type: "get",
            dataType: "json",
            success: function (data) {
                if (data.code == 100) {
                    sessionStorage.setItem("user", JSON.stringify(data.extend.newUser))
                    localStorage.setItem("user",JSON.stringify(data.extend.newUser))
                } else {
                    alert("新信息获取失败！")
                }
            }
        })
    }


    $("#myFace button").click(function () {
        var img = document.getElementById('i1').src
        $.ajax({
            url: "user/user",
            type: "put",
            data: {
                "img": img,
                "id": user.id
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 100) {
                    alert("头像更新成功！")
                    catchNewUser(user.id);
                    init()
                    $("#img-toggle").click()
                } else {
                    alert("头像更新失败！")
                }
            }
        })
    })

    $(".update-phone-btn").on("click", function () {
        var data = {};
        data.number = $.trim($("input[name=number]").val());
        data.verifyCode = $.trim($("input[name=verifyCode]").val());
        if (data.verifyCode == '') {
            alert("请输入验证码");
            return;
        }
        $.ajax({
            url: "login/vMes",
            async: true,
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
                if (data.code == 100) {
                    //alert("注册成功");
                    $.ajax({
                        url: "user/user",
                        async: true,
                        type: "put",
                        dataType: "json",
                        data: {
                            "id": user.id,
                            "phone": $.trim($("input[name=number]").val())
                        },
                        success: function (data) {
                            if (data.code == 100) {
                                alert("手机号已更改")
                                catchNewUser(user.id);
                                init()
                                $("#phone-toggle").click()
                            } else {
                                alert("更改失败")
                            }
                        }
                    })
                } else {
                    alert("验证码错误！")
                }

            }
        });
    })

    $("#checkbox1").click(function () {
        var status = 0
        if ($(this).is(":checked")) {

        } else {
            status = 1
        }
        $.ajax({
            url: "user/user",
            async: true,
            type: "put",
            dataType: "json",
            data: {
                "id": user.id,
                "status": status
            },
            success: function (data) {
                if (data.code == 100) {
                  //  console.log("status已更改为" + status)
                    catchNewUser(user.id)
                }

            }
        })
    })


    $(".main-wrapper .right-content .left-sidebar .sidebar .form-content .c").click(function () {
        var phone_number = $("#phone_number").val()
        // if(filterPhoneNumber(phone_number)){
        $.ajax({
            url: "user/user/number/" + phone_number,
            async: true,
            type: "get",
            dataType: "json",
            success: function (data) {
                if (data.code == 100 && data.extend.user.status==0) {
                    $(".cg").hide()
                    $(".bk").show()
                    var u = data.extend.user
                    var bt = '<button type="button" class="btn-success addfriend-btn" style="margin-bottom: 10px;border-radius: 15px">添加好友</button>'
                    if (isFriend(user.id, u.id)) {
                        bt = '<button class="btn-info" style="margin-bottom: 10px;border-radius: 15px" disabled>已是好友</button>'
                    }
                    $("#make_friends").html("")
                    $("#make_friends").append(
                        '<div class="item">' +
                        '<div class="recent-chat float-left">' +
                        '<input type="hidden" class="fid" value="' + u.id + '">' +
                        '<div class="user"><img src=' + (u.img == null ? defaultImg : u.img) + ' alt=""></div>' +
                        '<h3 class="mb-1">' + (u.username == null ? "匿名用户" : u.username) + '</h3>' +
                        '<span>' + filterPhoneNumber(u.phone) + '</span>' +
                        bt +
                        '</div>' +
                        '</div>'
                    )

                } else {
                    alert("未找到该联系人！")
                }
            }
        })
        // }
    })

    $(".bk").click(function () {
        $(".bk").hide()
        $(".cg").show()
        showThree()
        $("#phone_number").val("")
    })

    $("#req_form_send").click(function () {
        var r=isFriend($("#to_id").val(),user.id)
        if(!r){
            $("#from_id").val(user.id)
            //console.log($("#req_form").serialize())
            ws.send(formToJson($("#req_form").serializeArray()))
            alert("请求已发送！")
        }else{
            alert(r)
        }
        $("#req_form")[0].reset()
        $('#addfriend-close').click()
    })

    $("body").on("click", ".acc", function () {

        var remark = $("#friend_remark").val()

        $.ajax({
            url: "message/reqMessage/acc/" + $.trim($("#rid").val()),
            type: "put",
            data: "remark=" + remark,
            dataType: "json",
            success: function (data) {
                if (data.code == 100) {
                    var mes = {
                        "fromId": user.id,
                        "toId": $("#tid").val(),
                        "type": 3,
                        "status": 3,
                        "isPush": 0,
                        "content": "我们已经是好友啦，快来和我聊天吧！"
                    }
                    ws.send(JSON.stringify(mes));
                    $(".ac").parent().html("<span style='color: green'>已接受</span>")
                    $(".ac").removeClass(".ac");
                    $("#addfriend-close2").click()
                    selectRelation()
                    showReqWarning()
                } else {
                    alert("通过操作失败！")
                }

            }
        })
    })
    $("body").on("click", ".rej", function () {
        $.ajax({
            url: "message/reqMessage/rej/" + $("#rid").val(),
            type: "put",
            dataType: "json",
            success: function (data) {
                if (data.code == 100) {
                    $(".ac").parent().html("<span style='color: red'>已拒绝</span>")
                    $(".ac").removeClass(".ac");
                    $("#addfriend-close2").click()
                    showReqWarning()
                } else {
                    alert("拒绝操作失败！")
                }

            }
        })
    })

    $("#chat_list").on("click",".c_item",function () {
        if($(".open").length>0){
            addKey(user.id+"-"+selectConversationById($(".open").val()).id)
            $(".open").removeClass("open")
        }
        $(this).addClass("open")
        $(this).find(".unread-count").html("0")
        $(this).find(".unread-count").css("visibility","hidden")
        haveSession=true
        $(".chat-footer button").prop("disabled",false)
        //console.log($(this).val())
        var conversation= selectConversationById($(this).val())
        deleteKey(user.id+"-"+conversation.id)
        var tid=conversation.firstId==user.id?conversation.secondId:conversation.firstId
        $("#tid_c").val(tid)
        //   console.log(conversation)
        renderChatContent(conversation)
        showUnreadWarning()
        scl()
    })

    $("#chat_list .c_item").on("click",".close-img",function (e) {
        e.stopPropagation();
        hidden_conversation($(this).parent().val())
        if($(".open").val()==$(this).parent().val()){
            noChat()
        }
        $(this).parent().remove()

        //return false
    })


    $("#a").click(function () {
        if(!haveSession){
            $("#fa").click()
        }
    })

    $("#friend_list ").on('click','.chat-list-item .chat-bttn',function () {
        var other_user_id=$(this).parent().parent().val()
        var other_user= selectById(other_user_id)
        $.ajax({
            url:"conversation/conversation/"+user.id+"/"+other_user_id,
            dataType:"json",
            success:function (data) {
                if(data.code==100){
                    var conversation=data.extend.Conversation
                    var the_selecter="#chat_list>li[value='"+conversation.id+"']"
                    $("#cc").click()
                    if((conversation.firstId==user.id && conversation.firstView==0) || (conversation.secondId==user.id && conversation.secondView==0) && $(the_selecter).length>0){
                        $(the_selecter).click()
                    }else if ($(the_selecter).length===0){
                        show_conversation(conversation.id)
                        renderSessionList(conversation)
                        $(the_selecter).click()
                    }



                }else{
                    alert("获取会话消息失败!")
                }

            }
        })
    })

    $(".chat-footer button").click(function(){
        var ct=$.trim( $(".chat-footer input").val())
        if(ct==""){
            return false
        }
        // console.log(ct)
        var mes = {
            "conversationId":$(".open").val(),
            "fromId": user.id,
            "toId": $("#tid_c").val(),
            "type": 2,
            "status": 3,
            "isPush": 0,
            "content": ct
        }
        ws.send(JSON.stringify(mes))
        $("#messages-content").append('' +
            '                    <div class="message-item outgoing-message">\n' +
            '                        <div class="message-user">\n' +
            '                            <figure class="avatar">\n' +
            '                                <img src="'+(user.img == null ? defaultImg :user.img)+'" alt="image">\n' +
            '                            </figure>\n' +
            '                            <div>\n' +
            '                                <h5>我</h5>\n' +
            '                                <div class="time">'+timestampToTime(new Date())+'</div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="message-wrap">'+ct+'</div>\n' +
            '                    </div>')
        $(".open p").text(omit(ct))
        $(".chat-footer input").val("")
        scl()
    })

    // if($(".unread-count").html()==""){
    //     $(this).hide()
    // }else{
    //     $(this).show()
    // }
    $("#images").click(function () {
        if(haveSession){
            $("#image").click()
        }else{
            alert("请先发起会话哦！")
        }

    })
    $("#files").click(function () {
        if(haveSession){
            $("#file").click()
        }else{
            alert("请先发起会话哦！")
        }

    })
    $("#friend_list").on("click",".delete-friend",function () {
        alert("程序员偷懒了，没有写该功能！")
    })
    $("#friend_list").on("click",".update-remark",function () {
        var f_id=$(this).parents("li").val()
        var new_name=prompt("请输入新备注：")
        if(new_name){
            var update_node=$(this).parents(".list-body").find("h3")
            $.ajax({
                url: "relation/relation" ,
                type: "put",
                data:{
                    "id1":user.id,
                    "id2":f_id,
                    "new_name":new_name
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 100) {
                        alert("修改成功！")
                        update_node.html(new_name)
                        selectChatList()
                        noChat()
                    }else{
                        alert("修改备注失败！")
                    }
                }
            })
        }


    })
    $("body").on("click",".canShow",function () {
        var userId=$(this).next().val()
        var user=selectById(userId)
        showSomeone(user)
        $("#showDetail").click()
    })

    $("#quit_btn").click(function () {
        sessionStorage.clear()
        localStorage.clear()
        ws.onclose

        window.location.href="login"
    })
})






