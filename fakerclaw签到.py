"""
export fakerclaw="mark#new-api-user#cookie"
"""
import requests,os,time,random

retrycount = 1
environ = "fakerclaw"

def run(arg1, arg2, session):
    headers = {
        "new-api-user": arg1,
        "cookie": arg2,
        "user-agent": "Mozilla/5.0",
        "origin": "https://api.fakerclaw.online",
        "referer": "https://api.fakerclaw.online/console/personal"
    }
    for _ in range(retrycount):
        try:
            res = session.post("https://api.fakerclaw.online/api/user/checkin", headers=headers, json={}).json()
            if "已签到" in res["message"]:
                print("签到状态：今日已签")
            elif "签到成功" in res["message"]:
                print("签到状态：签到成功")
                print("签到奖励：", res['data']['quota_awarded'])

            try:
                stats = session.get("https://api.fakerclaw.online/api/user/checkin", headers=headers).json()
                total = stats.get("data", {}).get("stats", {}).get("total_checkins", "未知")
                print("累计签到：", total)
            except:
                pass

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