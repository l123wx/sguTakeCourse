// ==UserScript==
// @name        韶关学院选课脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @include      http://jwc.sgu.edu.cn/jsxsd/xsxk/xklc_view
// @author       llwxi
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @match        http://*/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    var result = {};  //搜索结果
    var name = "";    //课程名称

    var search = function(name){ //搜索课程信息的相关函数
        name=encodeURI(encodeURI(name))
        $.ajax({
            type:"post",
            url:"http://jwc.sgu.edu.cn/jsxsd/xsxkkc/xsxkGgxxkxk?kcxx="+name+"&skls=&skxq=&skjc=&sfym=false&sfct=false&szjylb=&sfxx=true",
            data:{
                sEcho: 1,
                iColumns: 13,
                sColumns:"",
                iDisplayStart: 0,
                iDisplayLength: 15,
                mDataProp_0: "dwmc",
                mDataProp_1: "kch",
                mDataProp_2: "kcmc",
                mDataProp_3: "xf",
                mDataProp_4: "skls",
                mDataProp_5: "sksj",
                mDataProp_6: "skdd",
                mDataProp_7: "xqmc",
                mDataProp_8: "xkrs",
                mDataProp_9: "syrs",
                mDataProp_10: "ctsm",
                mDataProp_11: "szkcflmc",
                mDataProp_12: "czOper"
            },
            success:function(resp){
                result=$.parseJSON(resp).aaData[0];
                xsxkOper(result.jx0404id,'','',result.jx02id,"null")
            }
        });
    }
    var box_html = `<div style="position:absolute;top:0;right:0;z-index:100;height:100px;width:200px;background-color:#eee;">课程名称：<input value="教师口才训练" id="classNameInput" type="text" /><button id="searchButton">确认</button></div>`
    $("body").append(box_html);
    $("#searchButton").click(function(){
        search($("#classNameInput").val());
    })

    function xsxkOper(jx0404id,xkzy,trjf,kcid,cfbs){ //选课代码
			var yxjx0404id ="";
			var yxcfbs ="";
			var param = "?kcid="+kcid+"&cfbs="+cfbs;
			var rev = eval('(' + $.ajax({
				url:"/jsxsd/xsxkkc/ggxxkxkOper"+param,
				data:{
					jx0404id:jx0404id,
					xkzy:xkzy,
					trjf:trjf
				},
				async:false
			}).responseText + ')');
        alert(rev.message);
    }
})();