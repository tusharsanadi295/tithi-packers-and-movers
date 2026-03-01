export function calculateFinalPrice(s) {
  let base = 2000;
  let itemTotal = s.items.reduce((sum,i)=> sum + i.qty * 500, 0);
  let floorCharge = 0;

  if (!s.pickupLiftAvailable) floorCharge += s.pickupFloorNo * 200;
  if (!s.dropLiftAvailable) floorCharge += s.dropFloorNo * 200;

  let distanceCharge = s.distance * 20;
  let addons = s.addonsTotal || 0;

  return {
    grandTotal: base + itemTotal + floorCharge + distanceCharge + addons
  };
}

