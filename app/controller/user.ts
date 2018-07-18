import { bp } from 'egg-blueprint';
import * as crypto from 'crypto';
var parser = require('xml2json');

import Base from '../base/controllerbase';

// 随机字符串产生函数
function createNonceStr() {
  return Math.random()
    .toString(36)
    .substr(2, 15);
}
// 时间戳产生函数
function createTimeStamp() {
  let num = new Date().getTime() / 1000;
  return parseInt(num + '');
}

const key = '7654tyhgftd54retwydujehfbcnvhgjg';
function paysignjsapi(
  appid,
  body,
  mch_id,
  nonce_str,
  notify_url,
  openid,
  out_trade_no,
  spbill_create_ip,
  total_fee,
  trade_type,
  attach
) {
  var ret = {
    appid: appid,
    attach: attach,
    mch_id: mch_id,
    body: body,
    nonce_str: nonce_str,
    notify_url: notify_url,
    openid: openid,
    out_trade_no: out_trade_no,
    spbill_create_ip: spbill_create_ip,
    total_fee: total_fee,
    trade_type: trade_type
  };
  var string = raw(ret);

  string = string + '&key=' + key;
  var sign = crypto
    .createHash('md5')
    .update(string)
    .digest('hex');

  return sign.toUpperCase();
}
'';

function raw(args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function(key) {
    newArgs[key.toLowerCase()] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
}

export default class User extends Base {
  @bp.get('/payment')
  public async PaymentMethod() {
    const nonce_str = createNonceStr() + createTimeStamp(); //随机字符串
    const appid = 'wx04a308ed79815bb9';
    const body = '力量纵横线上支付';
    const attach = '支付';
    const mchID = '1500318112';
    const notice_url = 'https://zh.9uhxir.top/uploads/admin/record.html';
    const out_trade_no = Date.now();
    const ip = '127.0.0.1';
    const fee = '1';
    const type = 'JSAPI';
    const openid = 'oM8Ad0XbiddXFdLJwel4KGdpgr_E';
    const sign = paysignjsapi(
      appid,
      body,
      mchID,
      nonce_str,
      notice_url,
      openid,
      out_trade_no,
      ip,
      fee,
      type,
      attach
    );

    let string = `
    <xml>
   <appid>${appid}</appid>
   <attach>${attach}</attach>
   <body>${body}</body>
   <mch_id>${mchID}</mch_id>
   <nonce_str>${nonce_str}</nonce_str>
   <notify_url>${notice_url}</notify_url>
   <openid>${openid}</openid>
   <out_trade_no>${out_trade_no}</out_trade_no>
   <spbill_create_ip>${ip}</spbill_create_ip>
   <total_fee>${fee}</total_fee>
   <trade_type>${type}</trade_type>
   <sign>${sign}</sign>
</xml>
    `;

    const res = await this.app.curl(
      'https://api.mch.weixin.qq.com/pay/unifiedorder',
      {
        method: 'POST',
        data: string
      }
    );
    const j = res.data;
    const json = parser.toJson(j + '');
    this.RspJson(json);
  }
}
