# 酒仙应用配置
class JiuxianConfig:
    # 应用基本信息
    APP_NAME = "酒仙"
    VERSION = "9.2.13"
    APP_KEY = "ad96ade2-b918-3e05-86b8-ba8c34747b0c"
    DEVICE_ID = "ad96ade2-b918-3e05-86b8-ba8c34747b0c"
    
    # API接口
    LOGIN_URL = "https://newappuser.jiuxian.com/user/loginUserNamePassWd.htm"
    MEMBER_INFO_URL = "https://newappuser.jiuxian.com/memberChannel/memberInfo.htm"
    RECEIVE_REWARD_URL = "https://newappuser.jiuxian.com/memberChannel/receiveRewards.htm"
    TASK_COMPLETE_URL = "https://shop.jiuxian.com/show/wap/addJinBi.htm"
    SHARE_REPORT_URL = "https://log.umsns.com/share/multi_add/51ff1ac356240b6fb20a2156/-1/"
    SIGN_URL = "https://newappuser.jiuxian.com/memberChannel/userSign.htm"
    
    # 请求头
    HEADERS = {
        "User-Agent": "okhttp/3.14.9",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "newappuser.jiuxian.com",
        "Connection": "Keep-Alive",
        "Accept-Encoding": "gzip"
    }
    
    # 设备信息
    DEVICE_INFO = {
        "appVersion": VERSION,
        "areaId": "500",
        "channelCode": "0", 
        "cpsId": "xiaomi",
        "deviceIdentify": DEVICE_ID,
        "deviceType": "ANDROID",
        "deviceTypeExtra": "0",
        "equipmentType": "M2011K2C",
        "netEnv": "wifi",
        "screenReslolution": "1080x2297",
        "supportWebp": "1",
        "sysVersion": "14"
    }
    
    # Token存储文件路径
    TOKEN_FILE = "/ql/data/scripts/jiuxian_tokens.json"