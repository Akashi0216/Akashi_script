"""
实物收益参考:每3月1箱
1.微信复制打开#小程序://荷叶健康丨您的健康生活管家/4b3DWikNVmWwuUJ
2.然后手机号授权登陆然后打开抓包软件，打开首页后抓https://tuan.api.ybm100.com此域名下的token全部值就是CK。
提交格式:备注#token。格式不对系统是无法提交的。
示列:备注自定义#b3ae06d124e4cbd68bb829aab16ebXXX
"""
import notify
import requests, json, re, os, sys, time, random, datetime, execjs, hashlib, ast
from urllib.parse import quote
environ = "hyjk"
name = "꧁༺ 荷叶༒健康 ༻꧂"
session = requests.session()
#---------------------主代码区块---------------------
choice = "橙子"   #默认选择水果
#---------------------主代码区块---------------------
def random_string(length=6):
    characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    return ''.join(random.choice(characters) for _ in range(length))

def run(mark,token):
    headers["token"] = token
    try:
        allfruit = {2:"柚子"}
        hasplant = False
        #水果树状态
        url = 'https://tuan.api.ybm100.com/api/healthSquare/fruitManor/getMyManorInfo?channelCode=130'
        response = session.get(url=url, headers=headers).json()
        if response.get("code",1) == 0:
            myfruit = response.get("result",{}).get("fruitType")
            if myfruit:
                hasplant = True
        #当季可以种的水果
        url = 'https://tuan.api.ybm100.com/api/healthSquare/fruitManor/getFruitInfo?channelCode=130'
        response = session.get(url=url, headers=headers).json()
        if response.get("code",1) == 0:
            for i in response["result"]["list"]:
                isPlant = i["isPlant"]
                describe = i["describe"]
                fruitType = i["fruitType"]
                fruitName = i["fruitName"]
                allfruit[fruitType] = fruitName
                allfruit[fruitName] = fruitType
        #print(allfruit)
        print(f'☁️水果：{allfruit.get(myfruit,myfruit)}')
        #没种水果开始种植
        if not hasplant:
            choicefruitType = allfruit.get(choice)
            if not choicefruitType:
                print(f"⭕种植：请重新选择水果")
            else:
                #种水果
                url = 'https://tuan.api.ybm100.com/api/healthSquare/user/userOperation'
                #response = session.post(url=url, headers=headers,json={"operateType":1,"operateValue":"{\"novicerStatus\":0,\"fruitType\":3}","channelCode":"130"}).json()
                response = session.post(url=url, headers=headers,json={"operateType":1,"operateValue":f'{{"novicerStatus":0,"fruitType":{choicefruitType}}}',"channelCode":"130"}).json()
                if response["code"] == 0:
                    print(f"☁️种植【{choice}】：成功")
                else:
                    print(f"⭕种植【{choice}】：{response}")
        #水果树状态
        url = 'https://tuan.api.ybm100.com/api/healthSquare/fruitManor/getMyManorInfo?channelCode=130'
        response = session.get(url=url, headers=headers).json()
        signActId = response["result"]["signActId"]
        novicerGuideStatus = response["result"]["novicerGuideStatus"]
        if novicerGuideStatus != -1:
            print(f"☁️新手引导：未过")
        barStagePercent = response["result"]["barStagePercent"]  #进度
        print(f"☁️当阶进度：{int(barStagePercent)}%")
        fruitStatus = response["result"]["fruitStatus"]
        #print(f"☁️果实状态：{fruitStatus}")
        smallTreeStage = response["result"]["smallTreeStage"]
        #print(f"☁️小树阶段：{smallTreeStage}")
        treeStage = response["result"]["treeStage"]
        #print(f"☁️树木阶段：{treeStage}")
        treeStagePercent = response["result"]["treeStagePercent"]
        #print(f"☁️整体进度：{treeStagePercent}%")
        treeId = response["result"]["treeId"]
        userId = response["result"]["userId"]

        print("-------- 签  到-------- ")
        #签到状态
        headers["userId"] = str(userId)
        url = 'https://tuan.api.ybm100.com/miniapp/marketing/signActivity/signRecord'
        response = session.post(url=url, headers=headers,json={"actId": signActId,"sceneId": 6,"channelCode": "130"}).json()
        if response.get("code",1) == 0:
            todaySignStatusDesc = response["result"]["todaySignStatusDesc"]
            if "未" in todaySignStatusDesc:
                url = 'https://tuan.api.ybm100.com/miniapp/marketing/signActivity/sign'
                response = session.post(url=url, headers=headers,json={"actId": signActId,"sceneId": 6,"channelCode": "130"}).json()
                if response.get("success"):
                    print(f"☁️签到状态：签到")
            elif "已" in todaySignStatusDesc:
                print(f"☁️签到状态：已签")
        
        print("-------- 任  务-------- ")
        #获取任务
        url = 'https://tuan.api.ybm100.com/api/healthSquare/fruitManor/getVenueInfo?channelCode=130'
        response = session.get(url=url, headers=headers).json()
        #print(response)
        vlist = response["result"]["list"]
        for i in range(2):
            for item in vlist:
                venueId = item["venueId"]
                url = f'https://tuan.api.ybm100.com/api/healthSquare/task/getTaskList?channelCode=130&venueId={venueId}'
                response = session.get(url=url, headers=headers).json()
                #print(response)
                for taskitem in response["result"]:
                    #print(f"{taskitem}")
                    taskStatus = taskitem["taskStatus"]
                    taskId = taskitem["taskId"]
                    reward = taskitem["reward"]
                    mainTitle = taskitem["mainTitle"]
                    if taskStatus == 0 or taskStatus == 1:
                        #收集水滴
                        body = { "channelCode": "130", "taskId": taskId,"extTask": 0,"eventType": 12,"waterNum": reward, "nonce": random_string() }
                        url = f'https://tuan.api.ybm100.com/api/healthSquare/water/collectWater?secret={quote(enc(body))}'
                        responsec = session.post(url=url, headers=headers,json=body).json()
                        if responsec["result"]["isActive"] == 1:
                            print(f"☁️{mainTitle[:4]}：完成")
                        elif responsec["result"]["isActive"] == 2:
                            print(f"☁️{mainTitle[:4]}：完成")
                        else:
                            if i != 0:
                                print(f"⭕{mainTitle[:4]}：{responsec}")
                    elif taskStatus == 2:
                        if i == 0:
                            print(f"☁️{mainTitle[:4]}：已完成")
                    else:
                        print(f"⭕任务：{taskitem}")

        print("-------- 浇  水-------- ")
        #浇水
        for i in range(100):
            body = { "channelCode": "130", "treeId": treeId, "nonce": random_string() }
            url = f'https://tuan.api.ybm100.com/api/healthSquare/water/watering?secret={quote(enc(body))}'
            response = session.post(url=url, headers=headers,json=body).json()
            if response.get("code",1) == 0:
                #print(f"☁️浇水：成功")
                pass
            elif "水滴不足" in response.get("msg"):
                print(f"☁️浇水次数：{i} 次")
                break
            elif "签名验证失败" in response.get("msg"):
                pass
            else:
                print(f"⭕浇水：{response}")
        
        print("-------- 信  息-------- ")
        #水果树状态
        url = 'https://tuan.api.ybm100.com/api/healthSquare/fruitManor/getMyManorInfo?channelCode=130'
        response = session.get(url=url, headers=headers).json()
        barStagePercent = response["result"]["barStagePercent"]
        print(f"☁️当阶进度：{int(barStagePercent)}%")
        fruitStatus = response["result"]["fruitStatus"]
        treeStagePercent = response["result"]["treeStagePercent"]
        #print(f"☁️整体进度：{treeStagePercent}%")

    except Exception as e:
        print(e)


def enc(body):
    code = """
    if (typeof global !== 'undefined') {
        global.window = {};
        global.navigator = { userAgent: 'Node.js' };
    }
    const JsRsaSign = require("jsrsasign")
    const { JSEncrypt } = require("encryptlong")
    function encrypt(body) {
        const PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiBksv2xaOJdSWblaTQl93HI393gYHqKFs89EIFBWYSmYSV+z8XXzMO/Xyo8EeWRpAjT5TuBf0wN467aBx3nsDfJd7e3+txBS7nf+S7Nyjnxx2J5AKPWx1gVmr/OF3aWqxg+DPCB7avakhj+p0QjoJ7eMqgJl/HSX2Kfb6/O3J9wIDAQAB";
        const PRIVATE_KEY = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKIGSy/bFo4l1JZuVpNCX3ccjf3eBgeooWzz0QgUFZhKZhJX7PxdfMw79fKjwR5ZGkCNPlO4F/TA3jrtoHHeewN8l3t7f63EFLud/5Ls3KOfHHYnkAo9bHWBWav84XdparGD4M8IHtq9qSGP6nRCOgnt4yqAmX8dJfYp9vr87cn3AgMBAAECgYEAlwzbB5Bu5LKsEFppZ/wW2ArM7YIRiQ5TACoGFEv1HfcuVaeXDmdxs02rKzwzDEHxUYDcPFyCKPGtvK5QSBgsAUUBHb6uu0fNGUccGX31NRAfLuQ8fj3W0uvkoYlpDARuokDHhWNqWzI6f8bFHkewJwpjXCO8w1WkogTLiX9Gu3ECQQDd5J4jEDS5+7KaohYRoryyX939mzsZ4RC6ufsfzTJwSlnLyYHEbm0Cs+7gbBxRrioqApBMQPIIoa5ujm1C88MNAkEAuu3htlbpR1ZL9b3wUuf3el/D3i/k9XvSChfHQ1q46Y/eck2yEDH9Kv/ZUxEl4fR8mB2MONm9oc2l+chPd9uQEwJBALcWuNU9vgPoB0tIiuUqXoDgUY+80ltcNi2c3/Uxn3jAIK/iKU0nwJMGXQiYrBVJnEjlrKL+w7cTkZZvtwATmtECQC2JV4vQvkFHj3eMzqeTpKDmBVPx/OekQzV8N2l8B0G2b20O6kqxssevzeRDcCQMJ/HyeL88o8pvy3f+yQUcsosCQQDZXV8K7Ek0R/V3dAdUzoetFSlfjCGy9QKPruz7m+iXBASxiA0R7YGfJzc8jWpuv0pxujtB/awy22K/ggLAhkZU";
        const JAVA_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNQpS4ZeHRiIPFIdZgupShTHFlGOqFkT6XEqByvWqt2BvLo3a+YfzyJHOXyfX41OvbIkuIaycuxU9w7RHI1e7F3O7Io+XxncjyU3GR+ae2DEtLaG3o/rtpONF5q1jTN/Spu4GKXsjhHrP9xxMThLF6134NKAyQZfvOms0gS0zmxwIDAQAB"
        const JAVA_PRIVATE_KEY = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAM1ClLhl4dGIg8Uh1mC6lKFMcWUY6oWRPpcSoHK9aq3YG8ujdr5h/PIkc5fJ9fjU69siS4hrJy7FT3DtEcjV7sXc7sij5fGdyPJTcZH5p7YMS0tobej+u2k40XmrWNM39Km7gYpeyOEes/3HExOEsXrXfg0oDJBl+86azSBLTObHAgMBAAECgYA08JI5CRX4G/SYeIS5SAYjn/qzL3z1XCO/hS9ayJ3mHpH0sMFkkxNRRLOHl7BYMFpwl2TR14kwl/VIU+y9VugRK6Se/gdJ/jwGiMdVkO6tGD7s8TwLcgNjAVbwpZCq40h8dQazzyIsPxyww4AP9fQlo5x3eY9v8icw+U58fj4FcQJBAPk4PPCy54ZHMqSTl4E1z+QzZ51z07PFIbGsT/oAg9GOwFjrPjOTQDEPp3cBeAlKmWdUVAjdGYExwuCw4EkG/XkCQQDS2Cx09pwNwMWIN+u3CVneECXS3iUiRPGJkbliFczwjByk3DnBMW15wGNVtJfsM7YFOIir+hW+QfbCKSBjxTY/AkEArPam9LZ1kO/g6e+0+mwKeGpkwxYcG2v5UoIwj2XEFrBoNk4twUW1C1e99g4C7Q/lH52bJPuuM8gBZEfdoVFEoQJBALZ4CPlsVx973jeGFcPBHvoURXeZcs+WlOY2rBYbwdHHoB54zK7KZPECM7V/Zh8vnW4lP/p9owWVtsTPrM1LZicCQDhgvSmpBy0QoUI+wPS9l+YYuLc2loGoWU97RiFbgKqXBexnSg4UHfU8Ot6N4VbIWEhOZV27P0ktsI3UfjGNS6s="
        // 生成随机串
        function generateRandomString(length) {
            var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // 包含所有字母和数字的字符集合
            var result = '';
            for (var i = 0; i < length; i++) {
                var randomIndex = Math.floor(Math.random() * chars.length); // 获取随机索引值
                var charAtIndex = chars[randomIndex]; // 根据索引值从字符集合中选择对应的字符
                result += charAtIndex; // 将字符添加到最终结果中
            }
            return result;
        }
        // 参数字典表排序
        function sortedKeys(obj) {
            let keys = Object.keys(obj).sort();
            let res = {}
            keys.forEach(key => {
                res[key] = obj[key]
            })
            return res
        }
        function generateRsaKeyWithPKCS8() {
            const keyPair = JsRsaSign.KEYUTIL.generateKeypair("RSA", 1024);
            const privateKey = JsRsaSign.KEYUTIL.getPEM(keyPair.prvKeyObj, "PKCS8PRV");
            const publicKey = JsRsaSign.KEYUTIL.getPEM(keyPair.pubKeyObj);
            return { privateKey, publicKey };
        }
        const { privateKey, publicKey } = generateRsaKeyWithPKCS8()

        function objToStr(data) {
            let str = ""
            for (let i in data) {
                str += `${i}=${data[i]}&`
            }
            str = str.slice(0, str.length - 1)
            return str
        }
        // 生成签名
        function getSign(data) {
            const signature = new JsRsaSign.KJUR.crypto.Signature({
                alg: "SHA1withRSA",
            });
            signature.init("-----BEGIN PRIVATE KEY-----" + PRIVATE_KEY + "-----END PRIVATE KEY-----");
            let sortData = sortedKeys(data)
            let str = objToStr(sortData)
            signature.updateString(str);
            return JsRsaSign.hextob64(signature.sign());
        }
        function getKey() {
            const encryptor = new JSEncrypt()
            encryptor.setPublicKey("-----BEGIN PUBLIC KEY-----" + JAVA_PUBLIC_KEY + "-----END PUBLIC KEY-----") // 设置公钥
            return encryptor
        }
        // 生成加密
        function entryData(data) {
            let encryptor = getKey();
            let str = objToStr(data)
            return encryptor.encryptLong(str);    // 调用封装的方法
        }
        // 解密
        function decrypt(data) {
            const encryptor = new JSEncrypt()
            encryptor.setPrivateKey(PRIVATE_KEY)
            return encryptor.decryptLong(data)
        }
        let sign = getSign(body)
        let timestamp = new Date().getTime()
        return entryData({
            sign: sign,
            timestamp: timestamp
        })
        //通过抓包得到加密JS网址https://www.heyejk.com/game/js/app.87d7f243.js 代码很多 慢慢补环境即可
        //不理解为什么弄两个加密 烦死了
        //smallfawn 2024 / 3 / 23 22.11
        /*const t = body
        const { KJUR, hextob64 } = require("jsrsasign")
        global['window'] = {}
        global['navigator'] = {}
        const { JSEncrypt } = require("encryptlong")
        const te = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKIGSy/bFo4l1JZuVpNCX3ccjf3eBgeooWzz0QgUFZhKZhJX7PxdfMw79fKjwR5ZGkCNPlO4F/TA3jrtoHHeewN8l3t7f63EFLud/5Ls3KOfHHYnkAo9bHWBWav84XdparGD4M8IHtq9qSGP6nRCOgnt4yqAmX8dJfYp9vr87cn3AgMBAAECgYEAlwzbB5Bu5LKsEFppZ/wW2ArM7YIRiQ5TACoGFEv1HfcuVaeXDmdxs02rKzwzDEHxUYDcPFyCKPGtvK5QSBgsAUUBHb6uu0fNGUccGX31NRAfLuQ8fj3W0uvkoYlpDARuokDHhWNqWzI6f8bFHkewJwpjXCO8w1WkogTLiX9Gu3ECQQDd5J4jEDS5+7KaohYRoryyX939mzsZ4RC6ufsfzTJwSlnLyYHEbm0Cs+7gbBxRrioqApBMQPIIoa5ujm1C88MNAkEAuu3htlbpR1ZL9b3wUuf3el/D3i/k9XvSChfHQ1q46Y/eck2yEDH9Kv/ZUxEl4fR8mB2MONm9oc2l+chPd9uQEwJBALcWuNU9vgPoB0tIiuUqXoDgUY+80ltcNi2c3/Uxn3jAIK/iKU0nwJMGXQiYrBVJnEjlrKL+w7cTkZZvtwATmtECQC2JV4vQvkFHj3eMzqeTpKDmBVPx/OekQzV8N2l8B0G2b20O6kqxssevzeRDcCQMJ/HyeL88o8pvy3f+yQUcsosCQQDZXV8K7Ek0R/V3dAdUzoetFSlfjCGy9QKPruz7m+iXBASxiA0R7YGfJzc8jWpuv0pxujtB/awy22K/ggLAhkZU",
            ne = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNQpS4ZeHRiIPFIdZgupShTHFlGOqFkT6XEqByvWqt2BvLo3a+YfzyJHOXyfX41OvbIkuIaycuxU9w7RHI1e7F3O7Io+XxncjyU3GR+ae2DEtLaG3o/rtpONF5q1jTN/Spu4GKXsjhHrP9xxMThLF6134NKAyQZfvOms0gS0zmxwIDAQAB";
        let n = le(t)
        let o = (new Date).getTime()
        return he({ sign: n, timestamp: o })
        function ae(e) { let t = Object.keys(e).sort(), n = {}; return t.forEach(t => { n[t] = e[t] }), n }
        function de() { const e = new JSEncrypt(); return e.setPublicKey("-----BEGIN PUBLIC KEY-----" + ne + "-----END PUBLIC KEY-----"), e }
        function ce(e) { let t = ""; for (let n in e) t += `${n}=${e[n]}&`; return t = t.slice(0, t.length - 1), t }
        function he(e) { let t = de(), n = ce(e); return t.encryptLong(n) }
        function le(e) { const t = new KJUR.crypto.Signature({ alg: "SHA1withRSA" }); t.init("-----BEGIN PRIVATE KEY-----" + te + "-----END PRIVATE KEY-----"); let n = ae(e), o = ce(n); return t.updateString(o), hextob64(t.sign()) }*/
    }
    """
    signcode = execjs.compile(code).call("encrypt",body)
    return signcode

headers = {
    "host": "tuan.api.ybm100.com",
    "apptype": "1",
    "terminal": "h5",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x6309092b) XWEB/9079",
    "content-type": "application/json; charset=UTF-8",
    "accept": "application/json, text/plain, */*",
    "appname": "ykq-xcx",
    "usertype": "groupuser",
    "token": "",
    "appversion": "v3.1.7",
    "origin": "https://www.heyejk.com",
    "sec-fetch-site": "cross-site",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    "referer": "https://www.heyejk.com/",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9"
}

def main():
	response = requests.get("https://mkxc.mkjt.xyz/mkjt.txt")
    response.encoding = 'utf-8'
    txt = response.text
    print(txt)
    global id,messages
    messages = []
    if os.environ.get(environ):
        ck = os.environ.get(environ)
    else:
        ck = ""
        if ck == "":
            print("⭕请设置变量")
            sys.exit()
    ck_run = ck.split('\n')
    ck_run = [item for item in ck_run if item]
    print(f"{' ' * 7}{name}\n\n")
    for i, ck_run_n in enumerate(ck_run):
        print(f" 账号 [{i + 1}/{len(ck_run)}]")
        try:
            id,token = ck_run_n.split('#')
            #id = mark[:3] + "*****" + mark[-3:]
            print(f"☁️当前账号：{id}")
            run(id,token)
            time.sleep(random.randint(1, 2))
        except Exception as e:
            print(e)
    print(f"-------- ☁️ 执 行  结 束 ☁️ --------\n\n")
    if messages:
        output = '\n'.join(num for num in messages)
        notify.send(name, output)

if __name__ == '__main__':
    main()