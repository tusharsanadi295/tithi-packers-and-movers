router.get("/upcoming-orders", authMiddleware, async (req, res) => {
  const today = new Date();

  const upcoming = await Booking.find({
    shiftingDate: { $gte: today },
  })
    .sort({ shiftingDate: 1 })
    .limit(5)
    .select("pickup drop shiftingDate");

  res.json(upcoming);
});
