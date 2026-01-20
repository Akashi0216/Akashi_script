#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
@name: 酒仙网全自动任务脚本 (双端适配版)
@date: 2026-01-19
    1. 【新增】支持安卓(Android)和苹果(iOS)双模式切换，解决设备指纹不匹配问题。
    2. 自动识别环境变量配置，调整请求头和设备参数。
    3. 继承 v5.3 的所有修复功能（多重验证、参数对齐）。
    环境变量 JX_TOKEN: 抓包获取的 token 值。
    环境变量 JX_PLATFORM: (可选) 填 "android" 切换为安卓模式；不填默认为苹果模式。
"""

import os
import requests
import time
import ssl
import random
import math
import json
from requests.adapters import HTTPAdapter
from urllib.parse import urlparse

# ================================= SSL 适配 =================================
class LegacyRenegotiationAdapter(HTTPAdapter):
    def init_poolmanager(self, *args, **kwargs):
        context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH)
        context.options |= getattr(ssl, "OP_LEGACY_SERVER_CONNECT", 0x4)
        kwargs['ssl_context'] = context
        return super(LegacyRenegotiationAdapter, self).init_poolmanager(*args, **kwargs)

# ================================= 参数配置 =================================
# 苹果参数 (基于 iPhone 6s Plus / iOS 15.8.5)
IOS_PARAMS = {
    'common': {
        'apiVersion': '1.0', 'appKey': 'D0F0C65E-92E9-4F57-80AA-F9EF52626381',
        'appVersion': '9.2.16', 'areaId': '500', 'channelCode': '0,1',
        'cityName': '北京市', 'consentStatus': '2', 'cpsId': 'appstore',
        'deviceIdentify': 'D0F0C65E-92E9-4F57-80AA-F9EF52626381',
        'deviceType': 'IPHONE', 'deviceTypeExtra': '0', 'equipmentType': 'iPhone 6s Plus',
        'netEnv': 'WIFI', 
        'pushToken': '0eaa91262cff5106e786743f48adb67db2dd5361731d56fb6c72d25ea437e2ce',
        'screenReslolution': '414.00x736.00', 'supportWebp': '1', 'sysVersion': '15.8.5',
    },
    'headers': {
        'Host': 'newappuser.jiuxian.com',
        'User-Agent': 'jiuxian/9.2.16 (iPhone; iOS 15.8.5; Scale/3.00)',
        'Accept-Language': 'zh-Hans-US;q=1',
        'Accept': 'text/html; q=1.0, text/*; q=0.8, image/gif; q=0.6, image/jpeg; q=0.6, image/*; q=0.5, */*; q=0.1',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br'
    },
    'webview_ua': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_8_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)  oadzApp suptwebp/2 jiuxianApp/9.2.16 from/iOS areaId/500'
}

# 安卓参数 (通用安卓配置)
ANDROID_PARAMS = {
    'common': {
        'apiVersion': '1.0', 'appKey': 'android_key_placeholder', # 安卓通常不需要特定Key或通用
        'appVersion': '9.2.16', 'areaId': '500', 'channelCode': '0,1',
        'cityName': '北京市', 'consentStatus': '2', 'cpsId': 'yingyongbao',
        'deviceIdentify': 'android_device_id_mock', # 实际安卓抓包中会有具体ID
        'deviceType': 'ANDROID', 'deviceTypeExtra': '0', 'equipmentType': 'android',
        'netEnv': 'WIFI', 'pushToken': '',
        'screenReslolution': '1080x1920', 'supportWebp': '1', 'sysVersion': '11',
    },
    'headers': {
        'Host': 'newappuser.jiuxian.com',
        'User-Agent': 'jiuxian/9.2.16 (Linux; Android 11; Scale/3.00)',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Accept-Encoding': 'gzip, deflate'
    },
    'webview_ua': 'Mozilla/5.0 (Linux; Android 11; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36 jiuxianApp/9.2.16'
}

# ================================= 工具函数 =================================
def mask_user(username):
    if not username: return "未知账号"
    username = str(username)
    if len(username) == 11 and username.isdigit():
        return f"{username[:3]}****{username[7:]}"
    if len(username) > 4:
        return f"{username[:2]}**{username[-2:]}"
    return username

def print_log(msg):
    print(msg)

# ================================= 核心逻辑 =================================
class JXClient:
    def __init__(self, token, platform='apple'):
        self.token = token
        self.platform = platform
        self.session = requests.Session()
        self.session.mount('https://', LegacyRenegotiationAdapter())
        
        # 根据平台选择配置
        if platform == 'android':
            self.config = ANDROID_PARAMS
            print_log("📱 当前模式: [安卓 Android]")
        else:
            self.config = IOS_PARAMS
            print_log("🍎 当前模式: [苹果 iOS]")
            
        self.session.headers.update(self.config['headers'])
        self.username = "获取中..."
        self.masked_name = "获取中..."

    def validate_token_and_get_info(self):
        """双重接口验证 Token"""
        print_log(f"🔑 正在核对 Token ({self.token[:6]}...)...")
        
        if self._check_winebibber():
            return True
        
        print_log("⚠️ 方案A验证失败，尝试方案B...")
        time.sleep(1)
        
        if self._check_module_data():
            return True
            
        print_log("❌ 验证失败。如果是安卓抓包，请设置环境变量 JX_PLATFORM='android'")
        return False

    def _check_winebibber(self):
        url = "https://newappuser.jiuxian.com/user/myWinebibber.htm"
        params = {**self.config['common'], 'token': self.token}
        try:
            response = self.session.get(url, params=params, timeout=10)
            json_data = response.json()
            
            if str(json_data.get("success")) == "1":
                result = json_data.get("result", {})
                mobile = result.get("userAddressInfo", {}).get("mobile")
                if not mobile:
                    mobile = result.get("bibberInfo", {}).get("userName")
                
                if mobile:
                    self.username = mobile
                    self.masked_name = mask_user(mobile)
                    print_log(f"✅ 方案A验证成功！用户: [{self.masked_name}]")
                    return True
            else:
                print_log(f"   方案A返回错误: {json_data.get('errMsg')}")
        except Exception as e:
            print_log(f"   方案A请求异常: {e}")
        return False

    def _check_module_data(self):
        url = "https://newappuser.jiuxian.com/user/getModuleData.htm"
        data = {**self.config['common'], 'token': self.token}
        try:
            response = self.session.post(url, data=data, timeout=10)
            json_data = response.json()
            if str(json_data.get("success")) == "1":
                print_log(f"✅ 方案B验证成功！(Token有效)")
                self.username = "未知用户"
                self.masked_name = "未知用户"
                return True
        except Exception: pass
        return False

    def query_balance(self, prefix=""):
        if not self.token: return 0
        url = "https://newappuser.jiuxian.com/user/myWinebibber.htm"
        params = {**self.config['common'], 'token': self.token}
        try:
            response = self.session.get(url, params=params, timeout=10)
            result = response.json()
            if result.get("success") == "1":
                bibber_info = result.get("result", {}).get("bibberInfo", {})
                if not isinstance(bibber_info, dict): bibber_info = {}
                gold_money = bibber_info.get("goldMoney", 0)
                print_log(f"💰 {prefix}余额: {gold_money} 金币")
                return int(gold_money)
        except Exception: pass
        return 0

    def do_daily_tasks(self):
        print_log("\n--- 🌟 执行日常任务 ---")
        self.query_balance(prefix="初始")
        
        info_url = "https://newappuser.jiuxian.com/memberChannel/memberInfo.htm"
        params = {**self.config['common'], 'token': self.token}
        
        try:
            response = self.session.get(info_url, params=params, timeout=10)
            json_data = response.json()
            
            if str(json_data.get("success")) != "1":
                print_log(f"⚠️ 无法获取任务列表: {json_data.get('errMsg')}")
                return

            result = json_data.get("result", {})
            if not isinstance(result, dict): return
            
            # 签到
            if not result.get("isSignTody"):
                print_log("📌 执行每日签到...")
                self.do_sign_in()
                time.sleep(random.randint(2, 4))
            else:
                print_log("👍 今日已签到")

            # 重新获取任务
            response = self.session.get(info_url, params=params, timeout=10)
            result = response.json().get("result", {})
            task_info = result.get("taskChannel", {})
            if not isinstance(task_info, dict): task_info = {}

            task_token = task_info.get("taskToken")
            task_list = [task for task in task_info.get("taskList", []) if task.get("state") in [0, 1]]
            
            if not task_list or not task_token:
                print_log("📦 暂无可用任务")
                return

            print_log(f"📋 发现 {len(task_list)} 个待办任务")
            for task in task_list:
                task_name = task.get("taskName")
                task_state = task.get("state")
                print_log(f"▶️ 处理: {task_name}")
                
                if task_state == 0: 
                    if task.get("taskType") == 1:
                        self.do_browse_task(task, task_token)
                    elif task.get("taskType") == 2:
                        self.do_share_task(task, task_token)
                elif task_state == 1: 
                    print_log("   - 补领奖励...")
                    self.claim_task_reward(task.get("id"), task_token)
                time.sleep(random.randint(2, 4))

        except Exception as e:
            print_log(f"❌ 任务执行异常: {e}")

    def do_sign_in(self):
        url = "https://newappuser.jiuxian.com/memberChannel/userSign.htm"
        params = {**self.config['common'], 'token': self.token}
        try:
            res = self.session.get(url, params=params, timeout=10).json()
            if res.get("success") == "1":
                print_log(f"🎉 签到成功: +{res.get('result', {}).get('receivedGoldNums')} 金币")
            else:
                print_log(f"❌ 签到失败: {res.get('errMsg')}")
        except Exception: pass

    def do_browse_task(self, task, task_token):
        try:
            url, countdown = task.get("url"), task.get("countDown", 15)
            host = urlparse(url).netloc
            headers = {**self.config['headers'], 'Host': host, 'User-Agent': self.config['webview_ua']}
            cookies = {'token': self.token}
            
            print_log(f"   - 浏览页面 (等待 {countdown}s)...")
            self.session.get(url, headers=headers, cookies=cookies, timeout=10)
            time.sleep(countdown)
            
            if self.mark_task_as_complete(task, task_token):
                time.sleep(1)
                self.claim_task_reward(task.get("id"), task_token)
        except Exception as e:
            print_log(f"   - ❌ 浏览失败: {e}")

    def do_share_task(self, task, task_token):
        print_log("   - 模拟分享...")
        if self.mark_task_as_complete(task, task_token):
            time.sleep(1)
            self.claim_task_reward(task.get("id"), task_token)

    def mark_task_as_complete(self, task, task_token):
        url = "https://shop.jiuxian.com/show/wap/addJinBi.htm"
        data = {'taskId': task.get("id"), 'taskToken': task_token}
        headers = {
            'Host': 'shop.jiuxian.com', 
            'Accept': '*/*', 
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://shop.jiuxian.com', 
            'Referer': task.get("url"),
            'User-Agent': self.config['webview_ua']
        }
        cookies = {'token': self.token}
        try:
            res = self.session.post(url, data=data, headers=headers, cookies=cookies, timeout=10).json()
            if res.get("code") == 1: return True
        except Exception: pass
        print_log("   - ⚠️ 任务标记失败")
        return False

    def claim_task_reward(self, task_id, task_token):
        url = "https://newappuser.jiuxian.com/memberChannel/receiveRewards.htm"
        params = {**self.config['common'], 'token': self.token, 'taskId': task_id, 'taskToken': task_token}
        try:
            res = self.session.get(url, params=params, timeout=10).json()
            if res.get("success") == "1":
                print_log(f"   - 🎉 获得奖励: +{res.get('result', {}).get('goldNum')} 金币")
            else:
                print_log(f"   - ❌ 领取失败: {res.get('errMsg')}")
        except Exception: pass

    def run(self):
        final_balance = 0
        if self.validate_token_and_get_info():
            time.sleep(random.randint(1, 3))
            self.do_daily_tasks()
            print_log("\n--- 🏁 任务结束统计 ---")
            final_balance = self.query_balance(prefix="最终")
        return self.masked_name, final_balance

def main():
    print_log("====== 🚀 酒仙网全自动任务 v5.4 (双端适配版) 🚀 ======")
    jx_token = os.environ.get("JX_TOKEN")
    platform = os.environ.get("JX_PLATFORM", "apple").lower() # 获取平台设置
    
    if not jx_token:
        print_log("🛑 未找到环境变量 JX_TOKEN，请填入抓包获取的 token 值！")
        return

    tokens = [x for x in jx_token.strip().split("\n") if x.strip()]
    print_log(f"🔧 待执行账号数: {len(tokens)} | 模式: {platform}")
    
    summary_list = [] 

    for i, token in enumerate(tokens):
        print_log(f"\n>>>>>> 正在执行第 {i + 1} 个账号 <<<<<<")
        try:
            # 传入平台参数
            client = JXClient(token.strip(), platform=platform)
            name, balance = client.run()
            if name != "获取中..." and balance > 0:
                summary_list.append({"name": name, "balance": balance})
            
        except Exception as e:
            print_log(f"❌ 运行异常: {e}")
    
    # 打印排行榜
    TARGET_MOUTAI = 53000 
    DAILY_EARNINGS = 210  
    
    if summary_list:
        print_log("\n" + "="*62)
        print_log(f"🏆 账号积分排行榜 (目标: {TARGET_MOUTAI} | 日收: {DAILY_EARNINGS}) 🏆")
        print_log("="*62)
        print_log(f"{'账号':<15} | {'总金币':<10} | {'缺口金币':<12} | {'预计天数':<8}")
        print_log("-" * 62)
        
        summary_list.sort(key=lambda x: x["balance"], reverse=True)
        
        total_gold = 0
        for item in summary_list:
            balance = item['balance']
            total_gold += balance
            diff = TARGET_MOUTAI - balance
            
            if diff > 0:
                status_msg = f"还差 {diff}"
                days_remaining = math.ceil(diff / DAILY_EARNINGS)
                days_msg = f"约 {days_remaining} 天"
            else:
                status_msg = "🎉 可兑换"
                days_msg = "0 天"
                
            print_log(f"{item['name']:<15} | {balance:<10} | {status_msg:<12} | {days_msg:<8}")
        
        print_log("-" * 62)
        print_log(f"💰 今日总收益: {total_gold} 金币")
        print_log("="*62)
    else:
        print_log("\n⚠️ 未能获取有效数据，如果是安卓抓包，请确保设置了 JX_PLATFORM='android'")

if __name__ == "__main__":
    main()
