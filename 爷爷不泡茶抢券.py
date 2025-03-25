"""
name: 爷爷不泡茶
Author: MK集团本部
抓包等说明qm-user-token
export yybpc="id#token"
cron: 0 0,5 * * *
const $ = new Env("爷爷不泡茶");
"""
# -*- coding: utf-8 -*-
import requests, json, re, os, sys, time, random, datetime, notify, threading
response = requests.get("https://mkjt.jdmk.xyz/mkjt.txt")
response.encoding = 'utf-8'
txt = response.text
print(txt)

session = requests.session()

def qiangquan(i, mobile, appid, token):
    #周二抢券
    today = datetime.datetime.now().weekday()
    #if today == 1:
    if True:
        goodsId = item(appid, token)
        now = datetime.datetime.now()
        target_time = datetime.datetime(now.year, now.month, now.day, 12, 00, 00)
        remaining_time = (target_time - now).total_seconds()
        if remaining_time >= 240:
            print("wait")
            pass
        else:
            while remaining_time > 0.41:
                now = datetime.datetime.now()
                remaining_time = (target_time - now).total_seconds()
                countdown_time = remaining_time / 2
                time.sleep(countdown_time)
        for _ in range(250):
            url = "https://webapi.qmai.cn/web/mall-apiserver/integral/order/create"
            header = {
                "Host": "webapi.qmai.cn",
                "Connection": "keep-alive",
                "qm-from-type": "catering",
                "accept": "v=1.0",
                "qm-from": "wechat",
                "qm-user-token": token,
                "content-type": "application/json",
                "Referer": "https://servicewechat.com/wx3423ef0c7b7f19af/48/page-frame.html",
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.188 Mobile Safari/537.36 XWEB/1260093 MMWEBSDK/20240501 MMWEBID/9494 MicroMessenger/8.0.50.2701(0x28003256) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
            }
            data = {"goodsId":goodsId,"channelCode":"","appid":appid}
            try:
                response = session.post(url=url, headers=header, json=data)
                response = json.loads(response.text)
                mes = response["message"]
                if "ok" in  mes:
                    print(f"🍉{mobile}：抢券成功")
                    break
                elif "售罄" in  mes:
                    print(f"🍉{mobile}：{mes}")
                    break
                elif "不在时间段内售卖" in mes:
                    #print(f"🍉{mobile}：{mes}")
                    pass
                else:
                    print(f"🍉{mobile}：{response}")
                time.sleep(0.01)
            except Exception as e:
                return


def item(appid, token):
    url_item = "https://webapi.qmai.cn/web/mall-apiserver/integral/item/goods"
    header = {
        "Connection": "keep-alive",
        "qm-from": "wechat",
        "qm-user-token": token,
        "accept": "v=1.0",
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.188 Mobile Safari/537.36 XWEB/1260093 MMWEBSDK/20240501 MMWEBID/9494 MicroMessenger/8.0.50.2701(0x28003256) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    }
    data_item = {
        "categoryId": 0,
        "page": 1,
        "pageSize": 10,
        "appid": appid
    }
    try:
        response_item = session.post(url=url_item, headers=header, json=data_item)
        response_item = json.loads(response_item.text)
        lenth = len(response_item["data"]["data"])
        if response_item["message"] == "ok":
            for i in range(lenth):
                one = response_item["data"]["data"][i]["goodsName"]
                if "饮品免单券" in one:
                    nob = response_item["data"]["data"][i]["id"]
                    return nob
    except Exception as e:
        print(e)


if __name__ == '__main__':
    TOKEN = ""
    if TOKEN == "":
        if os.environ.get("yybpc"):
            TOKEN = os.environ.get("yybpc")
        else:
            print("请设置变量")
            sys.exit()

    TOKEN_Run = TOKEN.split('\n')
    print(f"{' ' * 10}꧁༺ 爷爷༒抢券 ༻꧂\n")
    threads = []
    for i, TOKEN_Run_N in enumerate(TOKEN_Run):
        TOKEN_Run_Num = TOKEN_Run_N.split('#')
        thread = threading.Thread(target=qiangquan, args=(i,TOKEN_Run_Num[0], "10086",TOKEN_Run_Num[1]))
        threads.append(thread)
        thread.start()
    for thread in threads:
        thread.join()

    print(f'\n----------- 🎊 执 行  结 束 🎊 -----------')