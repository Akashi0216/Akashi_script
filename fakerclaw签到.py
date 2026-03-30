"""
export fakerclaw="mark#new-api-user#cookie"
示例：export fakerclaw="测试号#1001#session=xxxxxxxx"
"""
import requests, os, time, random

retrycount = 1
environ = "fakerclaw"

def run(arg1, arg2, session):
    # ====================== 【完全按你抓包修复的请求头】 ======================
    headers = {
        "new-api-user": arg1,
        "cookie": arg2,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "sec-ch-ua-platform": '"Windows"',
        "cache-control": "no-store",
        "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
        "sec-ch-ua-mobile": "?0",
        "origin": "https://api.fakerclaw.online",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "cors",
        "sec-fetch-dest": "empty",
        "referer": "https://api.fakerclaw.online/console/personal",
        "Content-Length": "0"
    }

    for _ in range(retrycount):
        try:
            # 签到（POST 空 body，完全匹配抓包）
            res = session.post(
                "https://api.fakerclaw.online/api/user/checkin",
                headers=headers,
                data=''  # 空内容，抓包就是这样
            ).json()

            # 签到结果
            if "已签到" in res.get("message", ""):
                print("签到状态：今日已签")
            elif "签到成功" in res.get("message", ""):
                print("签到状态：签到成功")
                print("签到奖励：", res.get('data', {}).get('quota_awarded', '0'))

            # 查询签到统计
            try:
                stats = session.get("https://api.fakerclaw.online/api/user/checkin", headers=headers).json()
                total = stats.get("data", {}).get("stats", {}).get("total_checkins", "未知")
                print("累计签到：", total)
            except:
                pass

            # 查询用户信息
            res = session.get("https://api.fakerclaw.online/api/user/self", headers=headers).json()
            print("当前可用：", res['data']['quota'])
            print("已用额度：", res['data'].get("used_quota", 0))
            print("请求次数：", res['data'].get("request_count", "未知"))
            break

        except Exception as e:
            print("错误：", e)

def main():
    ck = os.environ.get(environ, "")
    if not ck:
        print("请设置变量")
        return
    ck_list = [x for x in ck.splitlines() if x.strip()]
    
    for idx, line in enumerate(ck_list, 1):
        try:
            s = requests.Session()
            mark, a1, a2 = line.split('#', 2)
            print("\n===== 账号", idx, "/", len(ck_list), "=====")
            run(a1, a2, s)
            time.sleep(random.randint(1,2))
        except Exception as e:
            print(e)
    print("\n执行完成")

if __name__ == '__main__':
    main()
