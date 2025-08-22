const crypto = require('crypto');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { plan, amount, userId } = JSON.parse(event.body);
    
    // WeChat Pay configuration (replace with your actual credentials)
    const config = {
      appId: process.env.WECHAT_APP_ID || 'your_app_id',
      mchId: process.env.WECHAT_MCH_ID || 'your_merchant_id',
      apiKey: process.env.WECHAT_API_KEY || 'your_api_key',
      notifyUrl: process.env.WECHAT_NOTIFY_URL || 'https://your-domain.netlify.app/.netlify/functions/payment-webhook'
    };

    // Generate order ID
    const orderId = `ORDER_${Date.now()}_${userId}`;
    
    // Create payment parameters
    const params = {
      appid: config.appId,
      mch_id: config.mchId,
      nonce_str: crypto.randomBytes(16).toString('hex'),
      body: `Premium ${plan} Plan`,
      out_trade_no: orderId,
      total_fee: amount * 100, // Convert to cents
      spbill_create_ip: event.headers['client-ip'] || '127.0.0.1',
      notify_url: config.notifyUrl,
      trade_type: 'NATIVE' // QR code payment
    };

    // Generate signature
    const signString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&') + `&key=${config.apiKey}`;
    
    params.sign = crypto.createHash('md5').update(signString).digest('hex').toUpperCase();

    // In production, you would make actual API call to WeChat Pay
    // For now, we'll return a mock QR code URL
    const mockQrUrl = `weixin://wxpay/bizpayurl?pr=${crypto.randomBytes(8).toString('hex')}`;
    
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        qrCodeUrl: mockQrUrl,
        orderId: orderId,
        amount: amount,
        plan: plan
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};









