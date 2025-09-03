# -*- coding: utf-8 -*-
# 泉站订水 - 自动签到 + 钱包查询
# date：2025/09/03

# 环境变量：
# qztoken = token1#账号1 & token2#账号2
# qwbotkey = 企业微信群机器人 key

import json
import requests
from datetime import datetime
import os

qwbotkey = os.getenv('qwbotkey')
qztoken = os.getenv('qztoken')


def ftime():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')


def send(msg, title='泉站签到通知'):
    """企业微信群推送"""
    data = {
        "msgtype": "text",
        "text": {"content": f"{title}\n\n{msg}\n通知时间：{ftime()}"}
    }
    whurl = f'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={qwbotkey}'
    try:
        resp = requests.post(whurl, data=json.dumps(data)).json()
        if resp.get('errcode') != 0:
            print('消息发送失败，请检查key和发送格式')
            return False
        return resp
    except Exception as e:
        print(f"推送异常：{e}")
        return False


class QZQD:
    def __init__(self, ck):
        parts = ck.split('#')
        self.token = parts[0].strip()
        self.name = parts[1].strip() if len(parts) > 1 else "未命名账号"
        self.msg = ''
        self.today_signed = False
        self.headers = {
            "Host": "java-uapi.quanzhan888.com",
            "Connection": "keep-alive",
            "User-Agent": "Mozilla/5.0 (Linux; Android 7.1.2; SM-G9810; wv) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36 "
                          "MicroMessenger/8.0.50.2701(0x2800323C)",
            "content-type": "application/json",
            "authorization": self.token,
            "Accept": "*/*",
            "Referer": "https://servicewechat.com/wxcee27346cf362ba6/134/page-frame.html",
            "Accept-Encoding": "gzip,deflate,br",
            "Accept-Language": "zh-CN,zh;q=0.9"
        }

    def get_user_info(self):
        """获取签到记录并判断今天是否已签到"""
        url = "https://java-uapi.quanzhan888.com/u/user-sign/list"
        today_str = datetime.now().strftime("%Y-%m-%d")
        try:
            resp = requests.get(url, headers=self.headers)
            data = resp.json()
            if data.get("code") == 200:
                cure_date = data["data"].get("cureDate", today_str)

                # 调用签到接口判断今天是否已签到
                sign_url = f"https://java-uapi.quanzhan888.com/u/user-sign/do-sign?signDate={today_str}"
                sign_resp = requests.get(sign_url, headers=self.headers).json()
                if sign_resp.get("code") == 200:
                    # 返回 200 表示签到成功（新签到）
                    self.today_signed = True
                elif "你今日已经签过到了" in sign_resp.get("msg", ""):
                    self.today_signed = True
                else:
                    self.today_signed = False

                status = "已签到" if self.today_signed else "未签到"
                xx = f"{self.name}: 登录成功，今天 {cure_date}（{status}）"
                print(xx)
                self.msg += xx + "\n"
                return True
            else:
                xx = f"{self.name}: 登录失败 {data}"
                print(xx)
                self.msg += xx + "\n"
                return False
        except Exception as e:
            xx = f"{self.name}: 登录异常 {e}"
            print(xx)
            self.msg += xx + "\n"
            return False

    def signing(self):
        """签到"""
        if self.today_signed:
            xx = f"{self.name}: ℹ️ 今天已签到，跳过签到"
            print(xx)
            self.msg += xx + "\n"
            return

        today_str = datetime.now().strftime("%Y-%m-%d")
        url = f"https://java-uapi.quanzhan888.com/u/user-sign/do-sign?signDate={today_str}"
        try:
            resp = requests.get(url, headers=self.headers)
            data = resp.json()
            if data.get("code") == 200:
                if data.get("data"):
                    prize = data["data"].get("prizeMoney", 0)
                    day = data["data"].get("day", 0)
                    xx = f"{self.name}: ✅ 签到成功，连续 {day} 天，奖励 {prize} 元"
                else:
                    xx = f"{self.name}: ℹ️ 今天已经签过到了"
            else:
                if "你今日已经签过到了" in str(data.get("msg", "")):
                    xx = f"{self.name}: ℹ️ 今天已经签过到了"
                else:
                    xx = f"{self.name}: ❌ 签到失败，返回 {data}"
            print(xx)
            self.msg += xx + "\n"
        except Exception as e:
            xx = f"{self.name}: 🚨 签到异常 {e}"
            print(xx)
            self.msg += xx + "\n"

    def get_balance(self):
        """查询红包余额"""
        url = "https://java-uapi.quanzhan888.com/u/user-wallet/info"
        try:
            resp = requests.get(url, headers=self.headers)
            data = resp.json()
            if data.get("code") == 200:
                today_income = data["data"].get("userTodayIncome", 0)
                balance = data["data"].get("userTotalBalance", 0)
                total_income = data["data"].get("userTotalIncome", 0)
                xx = (f"{self.name}: 今日收益 {today_income} 元，当前余额 {balance} 元，累计收益 {total_income} 元")
            else:
                xx = f"{self.name}: 查询余额失败 {data}"
            print(xx)
            self.msg += xx + "\n"
        except Exception as e:
            xx = f"{self.name}: 查询余额异常 {e}"
            print(xx)
            self.msg += xx + "\n"

    def run(self):
        if self.get_user_info():
            self.signing()
            self.get_balance()
        return self.msg


if __name__ == '__main__':
    print('本脚本由“FD”更新（2025版接口）')
    ck_list = qztoken.split('&')
    msgbox = []
    for ck in ck_list:
        qd = QZQD(ck)
        msg = qd.run()
        msgbox.append(msg)
    if qwbotkey:
        a = send('\n'.join(msgbox))
        if a and a.get('errcode') == 0:
            print('企业微信群消息推送成功')
