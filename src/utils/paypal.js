import Paypal from '@paypal/checkout-server-sdk';

const isProduction = process.env.NODE_ENV === 'production';

const Environment = isProduction
  ? Paypal.core.LiveEnvironment
  : Paypal.core.SandboxEnvironment;

export const paypalClient = new Paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

const { CLIENT_ID, APP_SECRET } = process.env;
const base = 'https://api-m.sandbox.paypal.com';

export async function createOrder(body = []) {
  const request = new Paypal.orders.OrdersCreateRequest();
  const total = body.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: total,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: total,
            },
          },
        },
        items: body.map((item) => {
          return {
            name: item.name,
            unit_amount: {
              currency_code: 'USD',
              value: item.price,
            },
            quantity: item.quantity,
          };
        }),
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    return { id: order.result.id };
  } catch (error) {
    return { error: error.message };
  }
}

export async function capturePayment(orderId) {
  const request = new Paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  let response = await paypalClient.execute(request);
  console.log(`Response: ${JSON.stringify(response)}`);

  console.log(`Capture: ${JSON.stringify(response.result)}`);
}

async function generateAccessToken() {
  const response = await fetch(base + '/v1/oauth2/token', {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization:
        'Basic ' + Buffer.from(CLIENT_ID + ':' + APP_SECRET).toString('base64'),
    },
  });
  const data = await response.json();
  return data.access_token;
}
