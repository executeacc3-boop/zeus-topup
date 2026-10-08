export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId, zoneId, packageId, txnId } = req.body;

  if (!txnId || !userId || !zoneId || !packageId) {
    return res.status(400).json({ success: false, message: 'Missing order parameters' });
  }

  const BUSAN_API_URL = process.env.BUSAN_API_URL || "https://busanofficial.com/api/order";
  const BUSAN_API_KEY = process.env.BUSAN_API_KEY || "YOUR_BUSAN_API_KEY";

  try {
    const response = await fetch(BUSAN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BUSAN_API_KEY}`
      },
      body: JSON.stringify({
        api_key: BUSAN_API_KEY,
        user_id: userId,
        zone_id: zoneId,
        product_id: packageId,
        ref_id: txnId
      })
    });

    const result = await response.json();

    return res.status(200).json({
      success: true,
      message: 'Recharge successful!',
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'API Execution Failed: ' + error.message
    });
  }
}
