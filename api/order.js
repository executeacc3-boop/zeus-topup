async function submitOrder() {
  const orderData = {
    userId: "customer-unique-id",       // কাস্টমারের ইউজার আইডি
    productId: "prod_mlbb_pass",        // সিলেক্ট করা প্রোডাক্টের আইডি
    playerId: document.getElementById("playerIdInput").value, // MLBB User ID
    zoneId: document.getElementById("zoneIdInput").value      // MLBB Zone ID
  };

  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Success: " + data.message);
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    alert("Server error occurred while submitting order.");
  }
}
