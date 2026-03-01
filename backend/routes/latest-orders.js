router.get("/latest-orders", authMiddleware, async (req, res) => {
  const orders = await Booking.find({ status: "COMPLETED" })
    .sort({ updatedAt: -1 })
    .limit(5)
    .select("name finalAmount updatedAt");

  res.json(orders);
});
