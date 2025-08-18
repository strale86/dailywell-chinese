const crypto = require('crypto');

exports.handler = async (event, context) => {
  try {
    // Parse WeChat Pay notification
    const notification = JSON.parse(event.body);
    
    // Verify signature (in production, you should verify WeChat Pay signature)
    // const signature = event.headers['x-wechatpay-signature'];
    // const timestamp = event.headers['x-wechatpay-timestamp'];
    // const nonce = event.headers['x-wechatpay-nonce'];
    
    // For now, we'll trust the notification
    const { 
      result_code, 
      out_trade_no, 
      total_fee, 
      transaction_id,
      openid 
    } = notification;

    if (result_code === 'SUCCESS') {
      // Payment successful
      console.log(`Payment successful for order: ${out_trade_no}`);
      console.log(`Transaction ID: ${transaction_id}`);
      console.log(`Amount: ${total_fee} cents`);
      
      // Here you would:
      // 1. Update user's premium status in database
      // 2. Send confirmation email
      // 3. Log the transaction
      
      // For now, we'll just log it
      const paymentData = {
        orderId: out_trade_no,
        transactionId: transaction_id,
        amount: total_fee,
        userId: out_trade_no.split('_')[2], // Extract userId from orderId
        status: 'completed',
        timestamp: new Date().toISOString()
      };
      
      console.log('Payment data:', paymentData);
      
      // Return success response to WeChat Pay
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/xml'
        },
        body: `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`
      };
    } else {
      // Payment failed
      console.log(`Payment failed for order: ${out_trade_no}`);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/xml'
        },
        body: `<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>`
      };
    }

  } catch (error) {
    console.error('Webhook error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/xml'
      },
      body: `<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[${error.message}]]></return_msg></xml>`
    };
  }
};





