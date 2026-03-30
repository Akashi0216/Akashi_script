/**
 * FakerClaw 每日签到（青龙面板）
 */

const https = require('https');
const http = require('http');

const JOB_NAME = 'FakerClaw 每日签到';
const BASE_URL = process.env.FAKERCLAW_BASE_URL || 'https://api.fakerclaw.online';
const COOKIE_ACCOUNTS_RAW = process.env.FAKERCLAW_COOKIE_ACCOUNTS || '';
const ACCOUNTS_RAW = process.env.FAKERCLAW_ACCOUNTS || '';

let sendNotify = null;
try {
  sendNotify = require('./sendNotify').sendNotify;
} catch (_) {
  try {
    sendNotify = require('../sendNotify').sendNotify;
  } catch (_) {}
}

function parsePasswordAccounts(raw) {
  return raw
    .split(/\n|&|@/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const [username, ...rest] = line.split('#');
      const password = rest.join('#');
      return { type: 'password', username: (username || '').trim(), password: (password || '').trim() };
    })
    .filter((x) => x.username && x.password);
}

function normalizeCookie(cookie) {
  const c = (cookie || '').trim();
  if (!c) return '';
  return c.startsWith('session=') ? c : `session=${c}`;
}

function parseCookieAccounts(raw) {
  return raw
    .split(/\n|&|@/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split('#');
      if (parts.length >= 3) {
        const [remark, uid, ...rest] = parts;
        return {
          type: 'cookie',
          remark: (remark || '').trim(),
          uid: String(uid || '').trim(),
          cookie: normalizeCookie(rest.join('#')),
        };
      }
      if (parts.length === 2) {
        const [uid, cookie] = parts;
        return {
          type: 'cookie',
          remark: '',
          uid: String(uid || '').trim(),
          cookie: normalizeCookie(cookie),
        };
      }
      return null;
    })
    .filter((x) => x && x.uid && x.cookie);
}

function request({ method = 'GET', url, headers = {}, body = '' }) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const lib = u.protocol === 'https:' ? https : http;
    const req = lib.request(
      {
        protocol: u.protocol,
        hostname: u.hostname,
        port: u.port || (u.protocol === 'https:' ? 443 : 80),
        path: `${u.pathname}${u.search}`,
        method,
        headers,
        timeout: 20000,
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf8'),
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy(new Error('请求超时'));
    });
    req.on('error', reject);

    if (body) req.write(body);
    req.end();
  });
}

function tryJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}

async function login(username, password) {
  const payload = JSON.stringify({ username, password });
  const res = await request({
    method: 'POST',
    url: `${BASE_URL}/api/user/login`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
    },
    body: payload,
  });

  const data = tryJsonParse(res.body);
  if (!data || !data.success || !data.data || !data.data.id) {
    throw new Error(`登录失败：${(data && data.message) || `HTTP ${res.statusCode}`}`);
  }

  const setCookie = res.headers['set-cookie'] || [];
  const cookie = setCookie
    .map((c) => c.split(';')[0])
    .filter(Boolean)
    .join('; ');

  if (!cookie) {
    throw new Error('登录成功但未获取到 Cookie');
  }

  return {
    uid: data.data.id,
    displayName: data.data.display_name || data.data.username || username,
    cookie,
  };
}

// ====================== 【已按你最新抓包修复】签到接口 ======================
async function doCheckin(uid, cookie) {
  const res = await request({
    method: 'POST',
    url: `${BASE_URL}/api/user/checkin`,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Cookie': cookie,
      'new-api-user': String(uid), // 你抓包是小写！
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
      'sec-ch-ua-platform': '"Windows"',
      'cache-control': 'no-store',
      'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
      'sec-ch-ua-mobile': '?0',
      'origin': 'https://api.fakerclaw.online',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://api.fakerclaw.online/console/personal',
      'Content-Length': '0'
    },
    body: ''
  });

  const data = tryJsonParse(res.body) || {};
  return {
    ok: !!data.success,
    message: data.message || (data.success ? '签到成功' : `HTTP ${res.statusCode}`),
  };
}

// ====================== 【已按你最新抓包修复】查询签到状态 ======================
async function getCheckinStats(uid, cookie) {
  const res = await request({
    method: 'GET',
    url: `${BASE_URL}/api/user/checkin`,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Cookie': cookie,
      'new-api-user': String(uid),
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
      'sec-ch-ua-platform': '"Windows"',
      'cache-control': 'no-store',
      'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
      'sec-ch-ua-mobile': '?0',
      'origin': 'https://api.fakerclaw.online',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://api.fakerclaw.online/console/personal',
    },
  });

  const data = tryJsonParse(res.body);
  if (!data || !data.success || !data.data) return null;
  return data.data.stats || data.data;
}

// ====================== 【已按你最新抓包修复】用户信息 ======================
async function getUserProfile(uid, cookie) {
  const res = await request({
    method: 'GET',
    url: `${BASE_URL}/api/user/self`,
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Cookie': cookie,
      'new-api-user': String(uid),
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
      'sec-ch-ua-platform': '"Windows"',
      'cache-control': 'no-store',
      'sec-ch-ua': '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
      'sec-ch-ua-mobile': '?0',
      'origin': 'https://api.fakerclaw.online',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://api.fakerclaw.online/console/personal',
    },
  });

  const data = tryJsonParse(res.body);
  if (!data || !data.success || !data.data) return null;
  return data.data;
}

async function getStatusConfig() {
  return { quotaPerUnit: 500000 };
}

function formatQuota(v) {
  if (v === null || v === undefined || v === '') return '未知';
  const n = Number(v);
  return Number.isNaN(n) ? String(v) : n.toLocaleString('en-US');
}

function formatUsdFromQuota(quota, statusConfig) {
  const q = Number(quota);
  return !q ? '未知' : `$${(q / (statusConfig?.quotaPerUnit || 500000)).toFixed(2)}`;
}

async function runPasswordAccount({ username, password }, statusConfig) {
  const result = { label: username, ok: false, message: '', detail: '' };
  try {
    const loginInfo = await login(username, password);
    const checkinRes = await doCheckin(loginInfo.uid, loginInfo.cookie);
    const stats = await getCheckinStats(loginInfo.uid, loginInfo.cookie);
    const profile = await getUserProfile(loginInfo.uid, loginInfo.cookie);

    let quotaToday = '未知';
    if (stats?.records?.length > 0) quotaToday = stats.records[0].quota_awarded ?? '未知';

    const totalQuota = formatQuota(profile?.quota);
    const totalUsd = formatUsdFromQuota(profile?.quota, statusConfig);
    const usedQuota = formatQuota(profile?.used_quota);
    const usedUsd = formatUsdFromQuota(profile?.used_quota, statusConfig);
    const requestCount = profile?.request_count ?? '未知';
    const already = /已签到/.test(checkinRes.message || '');
    
    result.ok = checkinRes.ok || already;
    result.message = already ? '今日已签到' : checkinRes.message || '签到完成';
    result.detail = `用户:${loginInfo.displayName} | 今日奖励:${quotaToday} | 累计签到:${stats?.total_checkins ?? '未知'} | 余额:${totalUsd}(${totalQuota}) | 已用:${usedUsd}(${usedQuota}) | 请求数:${requestCount}`;
  } catch (e) {
    result.ok = false;
    result.message = e.message || String(e);
    result.detail = `用户:${username}`;
  }
  return result;
}

async function runCookieAccount({ remark, uid, cookie }, statusConfig) {
  const label = remark || `UID:${uid}`;
  const result = { label, ok: false, message: '', detail: '' };
  try {
    const checkinRes = await doCheckin(uid, cookie);
    const stats = await getCheckinStats(uid, cookie);
    const profile = await getUserProfile(uid, cookie);

    let quotaToday = '未知';
    if (stats?.records?.length > 0) quotaToday = stats.records[0].quota_awarded ?? '未知';

    const totalQuota = formatQuota(profile?.quota);
    const totalUsd = formatUsdFromQuota(profile?.quota, statusConfig);
    const usedQuota = formatQuota(profile?.used_quota);
    const usedUsd = formatUsdFromQuota(profile?.used_quota, statusConfig);
    const requestCount = profile?.request_count ?? '未知';
    const already = /已签到/.test(checkinRes.message || '');
    
    result.ok = checkinRes.ok || already;
    result.message = already ? '今日已签到' : checkinRes.message || '签到完成';
    result.detail = `账户:${label} | 今日奖励:${quotaToday} | 累计签到:${stats?.total_checkins ?? '未知'} | 余额:${totalUsd}(${totalQuota}) | 已用:${usedUsd}(${usedQuota}) | 请求数:${requestCount}`;
  } catch (e) {
    result.ok = false;
    result.message = e.message || String(e);
    result.detail = `账户:${label}`;
  }
  return result;
}

async function main() {
  const cookieAccounts = parseCookieAccounts(COOKIE_ACCOUNTS_RAW);
  const passwordAccounts = parsePasswordAccounts(ACCOUNTS_RAW);
  const useCookieMode = cookieAccounts.length > 0;
  const accounts = useCookieMode ? cookieAccounts : passwordAccounts;

  if (accounts.length === 0) throw new Error('未配置账号');

  const statusConfig = await getStatusConfig();
  const lines = [];
  let successCount = 0;

  for (const acc of accounts) {
    const r = useCookieMode ? await runCookieAccount(acc, statusConfig) : await runPasswordAccount(acc, statusConfig);
    if (r.ok) successCount++;
    lines.push(`${r.ok ? '✅' : '❌'} ${r.detail}\n结果:${r.message}`);
  }

  const title = `${JOB_NAME} ${successCount}/${accounts.length}`;
  const content = `认证模式：${useCookieMode ? 'Cookie' : '账号密码'}\n\n${lines.join('\n\n')}`;
  console.log(title);
  console.log(content);
  if (sendNotify) await sendNotify(title, content);
}

main().catch(async (err) => {
  const msg = err.message || String(err);
  console.log(`${JOB_NAME} 失败: ${msg}`);
  if (sendNotify) await sendNotify(`${JOB_NAME} 失败`, msg);
  process.exit(1);
});
