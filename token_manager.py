import json
import os
from typing import Dict, Optional

class TokenManager:
    def __init__(self, token_file: str):
        self.token_file = token_file
        self.tokens = self._load_tokens()
    
    def _load_tokens(self) -> Dict:
        """从文件加载Token数据"""
        try:
            if os.path.exists(self.token_file):
                with open(self.token_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            print(f"❌ 加载Token文件失败: {e}")
        return {}
    
    def _save_tokens(self):
        """保存Token数据到文件"""
        try:
            os.makedirs(os.path.dirname(self.token_file), exist_ok=True)
            with open(self.token_file, 'w', encoding='utf-8') as f:
                json.dump(self.tokens, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"❌ 保存Token文件失败: {e}")
    
    def get_token(self, username: str) -> Optional[Dict]:
        """获取指定账号的Token信息"""
        return self.tokens.get(username)
    
    def save_token(self, username: str, token_data: Dict):
        """保存账号的Token信息"""
        self.tokens[username] = {
            "token": token_data.get("token"),
            "uid": token_data.get("uid"),
            "nickname": token_data.get("nickname"),
            "update_time": token_data.get("update_time")
        }
        self._save_tokens()
    
    def delete_token(self, username: str):
        """删除账号的Token信息"""
        if username in self.tokens:
            del self.tokens[username]
            self._save_tokens()
    
    def is_token_valid(self, username: str) -> bool:
        """检查Token是否有效"""
        return username in self.tokens and self.tokens[username].get("token")