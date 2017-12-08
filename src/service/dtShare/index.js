import appJs from './../appAccess.js'
import api from '@/api'
import helper from '@/utils/helper.js'
import store from '@/module/index/store'

var appState = {
    appOs : navigator.userAgent.toLowerCase().indexOf("android") !== -1 ? "android":"ios",
}
    // 显示分享按钮
    // dtShare.showAppShareButton(1,1);
    // kbShareBtnShow('1','0');
let shareTile = '';
let shareDesc = '';
let shareLink = '';
let shareCodeImage = '';		//二维码背景图片
let shareImg = '';				//缩略图
let isDoc = false;				//是否是学吧分享，如果是学吧相关文章分享则是四个参数，无二维码，否则五个参数
let isActApp = false;           //true，去触发app的分享，false通过window暴露出去，app自动触发
function showAppShareButton(share,pay){
	appJs.appAccessJs.showShareBtn(share,pay);
}

function transformData(sTitle, sDesc, sLink, sImg, sCodeImg, sIsDoc, isActApp){
	shareTile = decodeURI(sTitle);
	shareDesc = decodeURI(sDesc);
	shareLink = decodeURI(sLink);
	shareImg = sImg;
	shareCodeImage = sCodeImg;
	isDoc = sIsDoc;
    if (isActApp) {
        if (appState.appOs == 'android') {
            window.kbShare.kbShareAction(shareTile, shareDesc, shareLink, shareImg)
        }else{
          if (isDoc) {
                jsCallOCShareAction(shareTile, shareDesc, shareLink, shareImg);
            }else{
                jsCallOCShareAction(shareTile, shareDesc, shareLink, shareCodeImage, shareImg);
            }  
        }
    }
}

window.iosCallJS = function(){

	if (isDoc) {
		jsCallOCShareAction(shareTile, shareDesc, shareLink, shareImg);
	}else{
		jsCallOCShareAction(shareTile, shareDesc, shareLink, shareCodeImage, shareImg);
	}
	// return 'h5Share'
}

window.androidCallJS = function(){
	window.kbShare.kbShareAction(shareTile, shareDesc, shareLink, shareImg)
}

// h5分享参数：分享标题，分享描述，分享链接，分享图片
function h5ShareJs(share_title, share_desc, share_link, share_img){

	helper.pageAddScript('https://res.wx.qq.com/open/js/jweixin-1.0.0.js');
	helper.pageAddScript('https://qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js')

	api.getShareAppid({'shareUrl':share_link},function(isSuccess,data,err){
		wx.config({
            debug: false,
            appId: data.body.appId,
            timestamp: data.body.timestamp,
            nonceStr: data.body.nonceStr,
            signature: data.body.sign,
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
        });
        wx.ready(function () {
            wx.checkJsApi({
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
                success: function (res) {
                    var checkResult = res.checkResult;
                    if (!checkResult.onMenuShareTimeline || !checkResult.onMenuShareAppMessage) {
                        //alert("您当前浏览器不支持分享，请尝试其他浏览器打开");
                        //window.close();
                    }
                }
            });
            var funcObj = {
                title: share_title, // 分享标题
                desc: share_desc, // 分享描述
                link: share_link,
                imgUrl: share_img,
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '',
                success: function () {}
            };
            wx.onMenuShareTimeline(funcObj);
            wx.onMenuShareAppMessage(funcObj);
            wx.onMenuShareQQ(funcObj);
            wx.onMenuShareQZone(funcObj);
        });
        wx.error(function (res) {
            // alert(res)
        });
        //QQ分享
        setShareInfo({
            title: share_title,
            summary: share_desc,
            url: share_link,
            pic: share_img
        });
	})
}

// function h5ShareJs(share_title, share_desc, share_link, share_img){

//     helper.pageAddScript('https://res.wx.qq.com/open/js/jweixin-1.0.0.js');
//     helper.pageAddScript('https://qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js')

//     api.getShareAppid({'shareUrl':'https://tm.kbao123.com/h5/dt/product'},function(isSuccess,data,err){
//         wx.config({
//             debug: true,
//             appId: data.body.appId,
//             timestamp: data.body.timestamp,
//             nonceStr: data.body.nonceStr,
//             signature: data.body.sign,
//             jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
//         });
//         wx.ready(function () {
//             wx.checkJsApi({
//                 jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
//                 success: function (res) {
//                     var checkResult = res.checkResult;
//                     if (!checkResult.onMenuShareTimeline || !checkResult.onMenuShareAppMessage) {
//                         //alert("您当前浏览器不支持分享，请尝试其他浏览器打开");
//                         //window.close();
//                     }
//                 }
//             });
//             var funcObj = {
//                 title: '测试标题', // 分享标题
//                 desc: '测试标题mianshu', // 分享描述
//                 link: 'https://tm.kbao123.com/h5/dt/product',
//                 imgUrl: 'https://f12.baidu.com/it/u=2754208607,630952272&fm=72',
//                 type: 'link', // 分享类型,music、video或link，不填默认为link
//                 dataUrl: '',
//                 success: function () {}
//             };
//             wx.onMenuShareTimeline(funcObj);
//             wx.onMenuShareAppMessage(funcObj);
//             wx.onMenuShareQQ(funcObj);
//             wx.onMenuShareQZone(funcObj);
//         });
//         wx.error(function (res) {
//             alert(res)
//             //window.location.reload();
//         });
//         //QQ分享
//         setShareInfo({
//             title: '测试标题',
//             summary: '测试标题mianshu',
//             url: 'https://tm.kbao123.com/h5/dt/product',
//             pic: 'https://f12.baidu.com/it/u=2754208607,630952272&fm=72'
//         });
//     })
// }
export default{
	showAppShareButton,
	transformData,
	h5ShareJs
}