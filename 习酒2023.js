/*

域名
请求头里的login_code
变量
export xjhd='login_code'
比如
export xjhd='login_code@login_code1'
多号@隔开

*/
const $ = new Env('习酒');
const axios = require('axios');
let request = require("request");
const fs = require('fs');
const path = require('path');
const xpath = require('xpath')
request = request.defaults({
    jar: true
});
const {
    log
} = console;
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
let xjhd = ($.isNode() ? process.env.xjhd : $.getdata("xjhd")) || ""
let xjauth = ($.isNode() ? process.env.xjauth : $.getdata("xjauth")) || ""
let xjhdArr = [];
let xjauthArr = [];
let data = '';
let msg = '';
var hours = new Date().getMonth();
let jwts=''
var timestamp = Math.round(new Date().getTime()).toString();
!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite();
    } else {
        if (!(await Envs()))
            return;
        else {

            log(`\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000).toLocaleString()} \n=============================================\n`);



            log(`\n============ 小程序：柠檬玩机 ============`)
            log(`\n=================== 共找到 ${xjhdArr.length} 个账号 ===================`)
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${xjhdArr}`);
            }
            for (let index = 0; index < xjhdArr.length; index++) {

                let num = index + 1
                addNotifyStr(`\n==== 开始【第 ${num} 个账号】====\n`, true)

                xjhd = xjhdArr[index]; 
                
               
                          
await hasDataMsCenterUser()
await banners()
await getJwt()
await open()
await open1()
await banner()
await hasDataMsCenterUser()
await statistics()
await Gardenmemberwine()
await sorghum1()
await dailySign()
await tasks()
await sorghumindex()
await getMemberInfo()
await recommend()

}

            await SendMsg(msg);
        }
    }
})()
.catch((e) => log(e))
    .finally(() => $.done())
async function hasDataMsCenterUser() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: 'https://xcx.exijiu.com/anti-channeling/public/index.php/api/v2/Member/hasDataMsCenterUser',
  headers: {
    Host: 'xcx.exijiu.com',
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'charset':'utf-8',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.code==0){
                    log(data.msg)
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

} 

async function getJwt() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: 'https://xcx.exijiu.com/anti-channeling/public/index.php/api/v2/Member/getJwt',
  headers: {
    Host: 'xcx.exijiu.com',
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',

  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.code==0){
                    ids = data.data.member_id 
                    xjauth = data.data.jwt

                   
                  
                  
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function sorghumindex() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: 'https://apimallwm.exijiu.com/garden/sorghum/index',
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 indexlist = data.data

                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function getMemberInfo() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: 'https://apimallwm.exijiu.com/garden/Gardenmemberinfo/getMemberInfo',
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 log('积分：'+data.data.integration)
                 msg+='\n积分：'+data.data.integration
                 water = data.data.water
                 manure = data.data.manure
                 sorghum = data.data.sorghum
                 wheat = data.data.wheat
                 wine_yeast = data.data['wine_yeast']
                 wine = data.data.wine
                 log('高粱：'+sorghum)
                 log('小麦：'+wheat)
                 log('肥料：'+manure)
                 log('酒曲：'+wine_yeast)
                 log('水：'+water)
                 log('酒：'+wine)
                 msg+='\n高粱：'+sorghum+'\n小麦：'+wheat+'\n肥料：'+manure+'\n酒曲：'+wine_yeast+'\n水：'+water+'\n酒：'+wine
                 for(i in indexlist){
                 if(indexlist[i].status !== -1){
                 id = indexlist[i].id
                 member_id = indexlist[i].member_id
                 volumn = indexlist[i].volumn
                 water_num = indexlist[i].water_num
                 create_time = indexlist[i].create_time
                 crop_time = indexlist[i].crop_time
                 serial_number = indexlist[i].serial_number
                 statuss = indexlist[i].status
                 type = indexlist[i].type

                 if(type ==1){
                 log(serial_number+'号田'+' 高粱 \n种植时间：'+create_time+'\n成熟时间：'+crop_time)
                 msg+='\n'+serial_number+'号田'+' 高粱 \n种植时间：'+create_time+'\n成熟时间：'+crop_time
                 }else
                 if(type ==2){
                 log(serial_number+'号田'+' 小麦 \n种植时间：'+create_time+'\n成熟时间：'+crop_time)
                 msg+='\n'+serial_number+'号田'+' 小麦 \n种植时间：'+create_time+'\n成熟时间：'+crop_time    
                 }
                  
                 log('id:'+id+'\nmember_id：'+member_id)
                 if(water > 0){
                 for(let i=0;i<water;i++){
                 await watering(id)
                 if(i ==10){
                  break
                 }

                 } 
                 } 

                 if(statuss == 2){
                     
                 await harvestAll()
                 }
                 if(statuss !== 11 && statuss !== 10){
                 if(wine_yeast == 0){
                 await seed(id,2)
                 }else 
                 await seed(id,1)    
                 } 
                 }              
                }    
                 

                 if(wine > 0){
                 await exchange(wine)    
                 }

                 if(wheat >= 100){
                 await makeWineYeast()     
                 }    
                 await gardenmemberwine()
                 if(total == 0){             
                 if(sorghum >= 200 && wine_yeast > 0){
                 await makeWine()    
                 }
                 }
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function dailySign() {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: 'https://apimallwm.exijiu.com/garden/sign/dailySign',
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },
data:{}
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 if(data.data.isTodayFirstSign == false){
                     log('今日已签到')
                 }else 
                 if(data.data.isTodayFirstSign == true){
                 log('签到')
                 await Sign()
                 }
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function Sign() {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: 'https://apimallwm.exijiu.com/member/signin/sign',
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },
data:'from=miniprogram_index'
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 log("signin："+data.msg) 
                 
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function tasks() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: 'https://apimallwm.exijiu.com/garden/tasks/index',
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 if(data.data[0].is_complete ==1){
                  log('今日已答题')    
                 }else
                 if(data.data[0].is_complete ==0){
                 await questiontask() 
                 }
                 if(data.data[1].is_complete ==1){
                  log('今日已分享')    
                 } else
                 if(data.data[1].is_complete ==0){
                 await dailyShare()
                 }
                 if(data.data[2].is_complete ==1){
                  log('今日已查看')    
                 }else
                 if(data.data[2].is_complete ==0){ 
                  await realscene()
                 }                                    
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function questiontask() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: 'https://apimallwm.exijiu.com/garden/Gardenquestiontask/index',
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 ansid = data.data[0].id
                 answer = data.data[0].answer
                 console.log(data.data[0].title)  
                 console.log("答案为："+answer)  
                 await answerResults(ansid,answer)                                 
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function answerResults(a,b) {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/garden/Gardenquestiontask/answerResults?answer=%5B%7B%22itemid%22%3A${a}%2C%22selected%22%3A%22${b}%22%7D%5D`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 console.log("答题："+data.msg)                                 
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function dailyShare() {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: `https://apimallwm.exijiu.com/garden/gardenmemberinfo/dailyShare`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth,
    'Accept': 'application/json, text/plain, */*'
  },
data:{}
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 console.log("分享："+data.msg)                                  
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function realscene() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/garden/realscene/reward`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 console.log("查看："+data.msg)                                  
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function harvestAll() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/garden/Sorghum/harvestAll`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 console.log("收取："+data.msg)                                  
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function watering(a) {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: `https://apimallwm.exijiu.com/garden/sorghum/watering`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },
data:{"id":a}
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 console.log("浇水："+data.msg) 
                 if(data.data.status == 2){
                 await statistics()  
                 await harvestAll()
                 }                                 
                 }else 
                 if(data.err==4032){
                 if(data.data.status !== 11 && data.data.status !== 10){
                 if(data.total == 0){
                 if(wine_yeast == 0){
                 await seed(id,2)
                 }else 
                 await seed(id,1)    
                 }
                 } 
                 }else
                 log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function makeWineYeast() {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: `https://apimallwm.exijiu.com/garden/wheat/makeWineYeast`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth,
    'Accept': 'application/json, text/plain, */*'
  },
data:'volumn=100'
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 console.log("制曲："+data.msg)                                  
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function makeWine() {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: `https://apimallwm.exijiu.com/garden/gardenmemberwine/makeWine`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth,
    'Accept': 'application/json, text/plain, */*'
  },
data:'volumn=200'
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 console.log("制酒："+data.msg)                                  
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function seed(a,b) {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: `https://apimallwm.exijiu.com/garden/sorghum/seed`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth,
    'Accept': 'application/json, text/plain, */*'
  },
data:{"id":a,"type":b}
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 console.log("种植："+data.msg)                                  
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function exchange(a) {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/garden/Gardenjifenshop/exchange?wine=`+a,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 console.log("积分："+data.msg)                                  
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function recommend() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/member/recommend/personal_center?phone_no=13573393088`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                                                  
                 }

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function gardenmemberwine() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/garden/Gardenmemberwine/index`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                    
                 total = data.total 
                 if(total == 1){
                 volumns = data.data[0].volumn    
                 log('酿酒成熟时间：'+data.data[0]['crop_time'])
                 if(data.data[0].status ==4){
                 await harvestWine(data.data[0].id)
                 if(sorghum >= 200 && wine_yeast > 0){
                 await makeWine()    
                 } 
                 } 
                 }                              
                 }

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function harvestWine(a) {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/garden/gardenmemberwine/harvestWine?id=${a}`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 log('酿酒收取：'+data.msg) 
                 await exchange(volumns)                             
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function statistics() {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: `https://apimallwm.exijiu.com/statistics`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 MicroMessenger/7.0.4.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },
data:`{"event_id":104,"membaer_id":${ids},"resolution":""}`
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 log(data.msg) 
                                             
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function Gardenmemberwine() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/garden/Gardenmemberwine/index`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 log(data.msg) 
                                             
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function sorghum1() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/garden/sorghum/index`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 log(data.msg) 
                                             
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function banners() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://apimallwm.exijiu.com/banners?limit=0`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.err==0){
                 log(data.msg) 
                                             
                 }else log(data.msg)

                    
                
            } catch (e) {
                log(`异常：${data}，原因：${data.msg}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function open() {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: `https://zhdl-dl.gzxijiu.com/api/open/event-log/E0`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },
data:`{"vipId":${ids},"eventName":"进入首页页面"}`
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.code==A00000){
                 log(data.message) 
                                             
                 }else log(data.message)

                    
                
            } catch (e) {
                log(`${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function open1() {
    return new Promise((resolve) => {
        var options = {
  method: 'POST',
  url: `https://zhdl-dl.gzxijiu.com/api/open/event-log/E1`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },
data:`{"vipId":${ids}}`
};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.code==A00000){
                 log(data.message) 
                                             
                 }else log(data.message)

                    
                
            } catch (e) {
                log(`${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function banner() {
    return new Promise((resolve) => {
        var options = {
  method: 'GET',
  url: `https://zhdl-dl.gzxijiu.com/api/open/banner/page/top/3`,
  headers: {
    
    Connection: 'keep-alive',
    referer: 'https://servicewechat.com/wx489f950decfeb93e/242/page-frame.html',
    xweb_xhr: '1',
    login_code: xjhd,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF XWEB/6500',
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Accept-Language': 'zh-CN,zh',
    'Accept-Encoding': 'gzip, deflate',
    'Authorization':xjauth
  },

};
    if (debug) {
            log(`\n【debug】=============== 这是  请求 url ===============`);
            log(JSON.stringify(options));
        }
        axios.request(options).then(async function(response) {
            try {
                 data = response.data;
                if (debug) {
                    log(`\n\n【debug】===============这是 返回data==============`);
                    log(JSON.stringify(response.data));
                }
                 if(data.code==A00000){
                 log(data.message) 
                                             
                 }else log(data.message)

                    
                
            } catch (e) {
                log(`${data.message}`)
            }
        }).catch(function(error) {
            console.error(error);
        }).then(res => {
            //这里处理正确返回
            resolve();
        });
    })

}
async function Envs() {
    if (xjhd) {
        if (xjhd.indexOf("@") != -1) {
            xjhd.split("@").forEach((item) => {

                xjhdArr.push(item);
            });
        } else if (xjhd.indexOf("\n") != -1) {
            xjhd.split("\n").forEach((item) => {
                xjhdArr.push(item);
            });
        } else {
            xjhdArr.push(xjhd);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 xjhd`)
        return;
    }

    return true;
}
function addNotifyStr(str, is_log = true) {
    if (is_log) {
        log(`${str}\n`)
    }
    msg += `${str}\n`
}

function conversionTimestamp(timestamp) {
let date = new Date(timestamp * 1000)
let Year = date.getFullYear() + '-'
let Month = (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';

function format(time) {
return time < 10? '0' + time:time;
}
let D = format(date.getDate()) + ' ';
let h = format(date.getHours()) + ':'; // 小时
let m = format(date.getMinutes())+ ':';; // 分钟
let s = format(date.getSeconds()); // 秒
return Year + Month +D+ h + m + s;
}
// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        log(message);
    }
}
var MD5=function(string){function RotateLeft(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits));}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8);}if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8);}else{return(lResult^0x40000000^lX8^lY8);}}else{return(lResult^lX8^lY8);}}function F(x,y,z){return(x&y)|((~x)&z);}function G(x,y,z){return(x&z)|(y&(~z));}function H(x,y,z){return(x^y^z);}function I(x,y,z){return(y^(x|(~z)));}function FF(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function GG(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function HH(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function II(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b);}function ConvertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++;}lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray;}function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);}return WordToHexValue;}function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;}var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=ConvertToWordArray(string);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD);}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase();}
function randomString(m) {
    for (var e = m > 0 && void 0 !== m ? m : 21, t = ""; t.length < e;) t += Math.random().toString(36).slice(2);
    return t.slice(0, e)
}
function randomnum(e) {
    e = e || 32;
    var t = "1234567890",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}   