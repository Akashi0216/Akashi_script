/**
 * 微信授权相关功能模块
 * 1.0.4版本
 * 加了operateWXData
 * 加了updateStep
 */
const request = require('request');
let headers = { "Content-Type": "application/json" }
let xieyi = process.env.WECHAT_SERVER 
let xueyi = xieyi + '/api/v1/wx/';
process.env.LOGS = 0;
// 获取小程序的code
async function getWxCode(wxid, appid) {
    let data = await task(
        'post',
        `${xueyi}app/get/code`,
        headers,
        `{"wxid": "${wxid}","appid": "${appid}"}`
    );

    if (data.Code == 0) {
        return {
            success: true,
            code: data.Data.code,
            appid: appid
        };
    } else {
        return {
            success: false,
            error: data.Message || '获取微信授权码失败'
        };
    }
}

// 获取phonecode
async function getmobile(wxid, appid) {
    const body = JSON.stringify({
        "wxid": wxid,
        "appid": appid,
        "data": "{\"api_name\":\"webapi_getuserwxphone\",\"with_credentials\":true}",
        "opt": 1
    });

    let data = await task(
        'post',
        `${xueyi}app/get/all/mobile`,
        headers,
        body
    );

    if (data.Code == 0) {
        let mobileItem = null;

        // 优先从 ALLMobile 获取
        if (data.Data.ALLMobile && data.Data.ALLMobile.length > 0) {
            mobileItem = data.Data.ALLMobile[0];
        }
        // 尝试从 Data.Data 解析 (针对 ALLMobile 为空的情况)
        else if (data.Data.Data) {
            try {
                const innerData = JSON.parse(data.Data.Data);
                if (innerData.custom_phone_list && innerData.custom_phone_list.length > 0) {
                    // 优先找带有 encryptedData 的手机号
                    mobileItem = innerData.custom_phone_list.find(p => p.encryptedData) || innerData.custom_phone_list[0];

                    // 特殊处理: code可能包裹在 data 字段中
                    if (!mobileItem.code && mobileItem.data) {
                        try {
                            const codeJson = JSON.parse(mobileItem.data);
                            if (codeJson.code) {
                                mobileItem.code = codeJson.code;
                            }
                        } catch (e) { }
                    }
                }
            } catch (e) {
                console.log('解析Data.Data失败:', e.message);
            }
        }

        if (mobileItem) {
            return {
                success: true,
                mobile: mobileItem.mobile,
                encryptedData: mobileItem.encryptedData || '',
                iv: mobileItem.iv || '',
                code: mobileItem.code || ''
            };
        } else {
            return {
                success: false,
                error: '未找到有效的手机号信息 (ALLMobile为空且解析失败)'
            };
        }
    } else {
        return {
            success: false,
            error: data.Message || '获取加密数据失败'
        };
    }
}

// 调用小程序的云函数
async function getUserInfo(wxid, appid, str) {
    const body = JSON.stringify({
        "wxid": wxid,
        "appid": appid,
        "data": str
    });

    let data = await task(
        'post',
        `${xueyi}app/call/function`,
        headers,
        body
    );

    if (data.Code == 0) {
        try {
            let res = JSON.parse(Buffer.from(data.Data.data, 'base64').toString());
            return {
                success: true,
                signature: res.signature,
                encryptedData: res.encryptedData,
                iv: res.iv,
                rawData: res
            };
        } catch (e) {
            return {
                success: false,
                error: '解析用户信息失败: ' + e.message
            };
        }
    } else {
        return {
            success: false,
            error: data.Message || '获取用户信息失败'
        };
    }
}

// 通用小程序操作接口 (operate/wxdata)
async function operateWXData(wxid, appid, str) {
    const body = JSON.stringify({
        "wxid": wxid,
        "appid": appid,
        "data": str,
        "opt": 0
    });

    let data = await task(
        'post',
        `${xueyi}app/operate/wxdata`,
        headers,
        body
    );

    if (data.Code == 0 && data.Data && data.Data.data) {
        try {
            let res = JSON.parse(Buffer.from(data.Data.data, 'base64').toString());
            return {
                success: true,
                encryptedData: res.encryptedData,
                iv: res.iv,
                rawData: res
            };
        } catch (e) {
            return {
                success: true,
                rawData: data.Data.data,
                error: '解码或解析返回数据失败: ' + e.message
            };
        }
    } else {
        return {
            success: false,
            error: data.Message || '小程序操作失败',
            rawResponse: data
        };
    }
}
// 更新步数
async function updateStep(wxid, number) {
    const body = JSON.stringify({
        "wxid": wxid,
        "number": number
    });
    let data = await task(
        'post',
        `${xueyi}tools/update/step`,
        headers,
        body
    );
    if (data.Code == 0) {
        return {
            success: true,
            message: data.Message || '步数更新成功'
        };
    } else {
        return {
            success: false,
            error: data.Message || '步数更新失败'
        };
    }
}
// 获取用户openid
async function getOpenid(wxid, appid) {

    const body = JSON.stringify({
        "wxid": wxid,
        "appid": appid,
        "towxid": wxid
    });

    let data = await task(
        'post',
        `${xueyi}app/get/user/openid`,
        headers,
        body
    );

    if (data.Code == 0) {
        return {
            success: true,
            openid: data.Data.Openid,
            name: data.Data.NickName,
            url: data.Data.HeadImgUrl,
            sign: data.Data.Sign
        };
    } else {
        return {
            success: false,
            error: data.Message || '获取openid失败'
        };
    }
}

// 获取APP code
async function getAppCode(wxid, appid) {

    const body = JSON.stringify({
        "wxid": wxid,
        "appid": appid,
        "url": ""
    });

    let data = await task(
        'post',
        `${xueyi}tools/thrid/app/grant`,
        headers,
        body
    );

    if (data.Code == 0) {
        return {
            success: true,
            code: data.Data
        };
    } else {
        return {
            success: false,
            error: data.Message || '获取APP code失败'
        };
    }
}

// 获取当前所有用户的登录状态
async function status() {

    let data = await task(
        'get',
        `${xueyi}user/status`,
        headers
    );

    if (data.status) {
        return {
            success: true,
            data: data.data
        };
    } else {
        return {
            success: false,
            error: data.Message || '获取当前所有用户的登录状态'
        };
    }
}

function task(method, taskurl, taskheader, taskbody, taskhost) {
    if (method == 'delete') {
        method = method.toUpperCase();
    }

    if (method == 'post') {
        delete taskheader['content-type'];
        delete taskheader['Content-type'];
        delete taskheader['content-Type'];

        if (safeGet(taskbody)) {
            taskheader['Content-Type'] = 'application/json;charset=UTF-8';
        } else {
            taskheader['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (taskbody) {
            taskheader['Content-Length'] = lengthInUtf8Bytes(taskbody);
        }
    }

    if (method == 'get') {
        delete taskheader['content-type'];
        delete taskheader['Content-type'];
        delete taskheader['content-Type'];
        delete taskheader['Content-Length'];
    }

    taskheader['Host'] = taskurl.replace('//', '/').split('/')[1];

    return new Promise(async resolve => {
        var httpget = {
            url: taskurl,
            headers: taskheader,
            body: method.indexOf('T') < 0 ? taskbody : undefined,
            form: method.indexOf('T') >= 0 ? JSON.parse(taskbody) : undefined,
            proxy: taskhost ? 'http://' + taskhost : undefined
        };

        request[method.toLowerCase()](httpget, (err, response, data) => {
            try {
                if (data && process.env.LOGS == 1) {
                    console.log(`================ 请求 ================`);
                    console.log(httpget);
                    console.log(`================ 返回 ================`);
                    if (safeGet(data)) {
                        console.log(JSON.stringify(JSON.parse(data), null, 2));
                    } else {
                        console.log(data);
                    }
                }
            } catch (e) {
                console.log(e, taskurl + '\n' + taskheader);
            } finally {
                let datas = '';
                if (!err) {
                    if (safeGet(data)) {
                        datas = JSON.parse(data);
                    } else {
                        datas = data;
                    }
                } else {
                    datas = taskurl + '   API请求失败，请检查网络重试\n' + err;
                }
                return resolve(datas);
            }
        });
    });
}

function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == 'object') {
            return true;
        }
    } catch (e) {
        return false;
    }
    return false;
}

function lengthInUtf8Bytes(str) {
    let m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + (m ? m.length : 0);
}

module.exports = {
    task,
    safeGet,
    lengthInUtf8Bytes,
    getWxCode,
    getmobile,
    getUserInfo,
    getOpenid,
    getAppCode,
    operateWXData,
    updateStep,
    status
}; 