import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Search, X } from "lucide-react";

import livingImg from '../assets/png/003-living-room.png';
import bedroomImg from '../assets/png/002-bedroom.png'; 
import kitchenImg from '../assets/png/001-kitchen.png'; 
import boxImg from '../assets/png/004-box.png'; 


import sofaIcon from "../assets/icons/sofa.png";
import acIcon from "../assets/icons/ac.png";
import coolerIcon from "../assets/icons/air-cooler.png";
import purifierIcon from "../assets/icons/air-purifier.png";
import barIcon from "../assets/icons/bar-counter.png";
import cabinateIcon from "../assets/icons/cabinate.png";
import chairIcon from "../assets/icons/chair.png";
import decorativeIcon from "../assets/icons/decorative.png";
import dinningIcon from "../assets/icons/dinning-table.png";
import fanIcon from "../assets/icons/fan.png";
import tableIcon from "../assets/icons/table.png";
import tvIcon from "../assets/icons/tv.png";
import defaultIcon from "../assets/icons/modern.png"
import bedIcon from "../assets/icons/bed.png"
import mattressIcon from "../assets/icons/mattress.png"
import wardrobeIcon from "../assets/icons/wardrobe.png"
import appliencesIcon from "../assets/icons/appliences.png"
import dressingIcon from "../assets/icons/dressing-table.png"
import mandirIcon from "../assets/icons/temple.png"
import fridgeIcon from "../assets/icons/refridgerator.png"
import kitchenitem from "../assets/icons/spatula.png";
import kitchen from "../assets/icons/kitchen.png";
import box from "../assets/icons/box.png";
import tithibox from "../assets/icons/premium-parcel.png";
import gunny from "../assets/icons/garbage-bag.png";
import washing from "../assets/icons/washing-machine.png";
import bathroom from "../assets/icons/bathroom.png";
import home from "../assets/icons/home.png";
import bike from "../assets/icons/motorcycle.png"
import music from "../assets/icons/music-instrument.png"
import plant from "../assets/icons/plant.png"
import bag from "../assets/icons/suitcase.png"
import lights from "../assets/icons/lights.png"
import baby from "../assets/icons/baby-bike.png"
import gym from "../assets/icons/weights.png"
import swing from "../assets/icons/swing.png"

const BLOCK_ICONS = {
  "Sofa": sofaIcon,
  "Dining": dinningIcon,
  "Television": tvIcon,
  "Table": tableIcon,
  "Chair": chairIcon,
  "Air Conditioner": acIcon,
  "Cabinet & Storage": cabinateIcon,
  "Fan":fanIcon,
  "Air Cooler":coolerIcon,
  "Air Purifier":purifierIcon,
  "Bar Furniture" :barIcon,
  "Decorative item" : decorativeIcon,
  "Bed" : bedIcon,  
  "Mattress" : mattressIcon,
  "Almirah / Wardrobe" : wardrobeIcon,
  "Appliances": appliencesIcon,
  "Dressing Table" : dressingIcon,
  "Mandir" : mandirIcon,
  "Refrigerator" : fridgeIcon,
  "Kitchen Items" : kitchenitem,
  "Furniture & Storage" : kitchen,
  "Self Cartoon Boxes (2ft x 1.5ft x 1.5ft)" : box,
  "TITHI Carton Box (1.5ft x 1.5ft x 2ft)" : tithibox,
  "Gunny Bag" : gunny,
  "Washing Machine" :washing,
  "Bathroom Utility" : bathroom,
  "Home Utility" : home,
  "Vehicle" : bike,
  "Musicle Instruments" :music,
  "Plants & Pots" : plant,
  "Suitcase / Trolley": bag,
  "Decorative Items" : lights,
  "Kids Vehicle" : baby,
  "Gym Equipment" : gym,
  "Swing (Baby / Adult)" : swing
};




const BASE_PRICE = 1300;
const DEFAULT_DISCOUNT_PERCENT = 7; 
const BASE_ITEMS_ALLOWANCE = {
  XS: 4,
  S: 3,
  M: 1,
  L: 1,
  XL:1,
  XXL:1
};

const FLOOR_SLABS = [
  { from: 3, to: 5, rate: 170 },
  { from: 6, to: 8, rate: 270 },
  { from: 9, to: 11, rate: 350 },
  { from: 12, to: Infinity, rate: 450 },
];

function calculateFloorCharge(floor) {
  if (floor <= 2) return 0;

  let charge = 0;

  for (let f = 3; f <= floor; f++) {
    const slab = FLOOR_SLABS.find(s => f >= s.from && f <= s.to);
    if (slab) charge += slab.rate;
  }

  return charge;
}

function calculateDistanceCharge(distance) {
  if (distance <= 2) return 0;

  let total = 0;

  // 2–5 km (City Core Competitive)
  if (distance > 2) {
    const upto5 = Math.min(distance, 5);
    total += (upto5 - 2) * 35;
  }

  // 5–30 km (City Outer)
  if (distance > 5) {
    const upto30 = Math.min(distance, 30);
    total += (upto30 - 5) * 22;
  }

  // 30–75 km (Intercity Moderate)
  if (distance > 30) {
    const upto75 = Math.min(distance, 75);
    total += (upto75 - 30) * 26;
  }

  // 75+ km (Highway Premium)
  if (distance > 75) {
    total += (distance - 75) * 26;
  }

  return Math.round(total);
}

function analyzeItems(items) {
  let extraItemCharge = 0;
  let sizeCount = { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0, XXXL: 0 };

  items.forEach(item => {
    sizeCount[item.tag] = (sizeCount[item.tag] || 0) + item.qty;
  });

  // Base allowance check
  Object.keys(sizeCount).forEach(size => {
    const freeQty = BASE_ITEMS_ALLOWANCE[size] || 0;
    const extraQty = Math.max(0, sizeCount[size] - freeQty);

    if (extraQty > 0) {
      items
        .filter(i => i.tag === size)
        .forEach(i => {
          extraItemCharge += i.price * Math.min(extraQty, i.qty);
        });
    }
  });

  const heavyItemsCount = (sizeCount.XXL || 0) + (sizeCount.XXXL || 0);

  return {
    extraItemCharge,
    heavyItemsCount,
  };
}



/* ================= ITEM CATALOG ================= */
const ITEM_CATALOG = [
  {
   section: "Living Room",
blocks:  [
  /* ================= SOFA ================= */
  {
    label: "Sofa",
    expandable: true,
    items:
    [
      { name: "1 Seater Sofa", tag: "L", price: 288 },   // Sofa Single
      { name: "2 Seater Sofa", tag: "XL", price: 324 },  // Sofa Double
      { name: "3 Seater Sofa", tag: "XXL", price: 360 }, // Sofa 3 Seater
      { name: "4 Seater Sofa", tag: "XXL", price: 396 }, // Sofa 4 Seater
      { name: "5 Seater Sofa – L Shape", tag: "XXXL", price: 432 }, // Sofa 5 Seater
      { name: "7 Seater Sofa – L Shape", tag: "XXXL", price: 468 }, // Sofa 6 Seater (closest match)
      { name: "Sofa Cum Bed", tag: "XXL", price: 396 },             // aligned with Sofa 4 Seater
    ],
  },

  /* ================= DINING ================= */
  {
    label: "Dining",
    expandable: true,
    items: [
      { name: "Dining Chair", tag: "M", price: 86 },       // Chair
      { name: "Dining Table – 4 Seater", tag: "XL", price: 288 }, // Dining Table
      { name: "Dining Table – 6 Seater", tag: "XXL", price: 432 },
      { name: "Dining Table – 8 Seater", tag: "XXXL", price: 576 },
    ],
  },

  /* ================= TELEVISION ================= */
  {
    label: "Television / Music",
    expandable: true,
    items: [
      { name: 'TV Upto 28"', tag: "M", price: 216 },
      { name: 'LCD / LED TV 29" – 42"', tag: "L", price: 288 }, // TV 29" to 43"
      { name: 'LCD / LED TV 42" – 50"', tag: "XL", price: 360 }, // TV 49" to 55"
      { name: 'LCD / LED TV 52" – 65"', tag: "XXL", price: 432 }, // TV Above 55"
      { name: 'LCD / LED TV 65" & Above', tag: "XXXL", price: 432 }, // same category
      { name: "Regular TV (Old Model)", tag: "L", price: 288 }, // TV 29" to 43"
      { name: "TV Stand / Trolley", tag: "M", price: 216 },
      { name: "Home Theater", tag: "M", price: 216 },
       { name: "Music / Video System", tag: "M", price: 180 },
    ],
  },

  /* ================= TABLE ================= */
  {
    label: "Table",
    expandable: true,
    items: [
      { name: "Center Table", tag: "M", price: 252 },
      { name: "Coffee Table Large", tag: "M", price: 260 },
      { name: "Coffee Table Small", tag: "S", price: 180 },
      { name: "Folding Table", tag: "S", price: 130 },
    ],
  },

  /* ================= CHAIR ================= */
  {
    label: "Chair",
    expandable: true,
    items: [
      { name: "Arm Chair", tag: "L", price: 180 },       // heavier, needs careful packing
      { name: "Bean Bag / Pouffe", tag: "M", price: 120 }, // light, easy to move
      { name: "Folding Chair", tag: "S", price: 90 },    // compact, minimal effort
      { name: "Plastic Chair", tag: "S", price: 80 },    // very light, stackable
      { name: "Rocking Chair", tag: "M", price: 150 },   // awkward shape, needs care
      { name: "Settee", tag: "L", price: 200 },          // larger, similar to sofa
      { name: "Stool", tag: "XS", price: 70 },           // smallest item
      { name: "Study Chair", tag: "M", price: 120 },     // medium weight
      { name: "Wooden Chair", tag: "M", price: 140 },    // heavier than plastic, sturdy
    ],
  },

  /* ================= AIR CONDITIONER ================= */
  {
    label: "Air Conditioner",
    expandable: true,
    items: [
      { name: "Split Air Conditioner (AC)", tag: "L", price: 288 }, // Cabinet/Storage proxy
      { name: "Window Air Conditioner (AC)", tag: "L", price: 288 },
    ],
  },

  /* ================= CABINET & STORAGE ================= */
  {
    label: "Cabinet & Storage",
    expandable: true,
    items: [
      { name: "Cabinet / Storage", tag: "L", price: 288 },          // baseline
      { name: "Book Shelf Small", tag: "M", price: 180 },           // lighter, compact
      { name: "Book Shelf Medium", tag: "L", price: 240 },          // mid-size
      { name: "Book Shelf Large", tag: "XL", price: 300 },          // heavy, tall
      { name: "Chest of Drawers Small", tag: "M", price: 200 },     // small but solid
      { name: "Chest of Drawers Medium", tag: "L", price: 260 },    // mid-weight
      { name: "Chest of Drawers Large", tag: "XL", price: 320 },    // bulky, heavier
      { name: "Display Cabinet Small", tag: "L", price: 250 },      // glass risk, careful handling
      { name: "Display Cabinet Large", tag: "XL", price: 340 },     // large, fragile
       { name: "TV Table", tag: "M", price: 220 },          // medium size, moderate handling
      { name: "Wall Shelf", tag: "S", price: 120 },        // small, light, easy to pack
      { name: "Plastic Cupboard", tag: "L", price: 260 },
       { name: "Shoe Rack Metal", tag: "M", price: 180 },   // sturdy, mid-weight
      { name: "Shoe Rack Wooden", tag: "M", price: 220 },  // heavier than metal, more effort
    ],
  },

  /* ================= APPLIANCES ================= */
  {
    label: "Fan",
    expandable: true,
    items: [
      { name: "Ceiling Fan", tag: "S", price: 120 },       // light, detachable
      { name: "Table Fan", tag: "S", price: 100 },         // very small, easy handling
    ],
  },
   

  /* ================= BAR FURNITURE ================= */
  {
    label: "Bar Furniture",
    expandable: true,
    items: [
      { name: "Bar Cabinet", tag: "L", price: 240 },        // medium size, moderate handling
      { name: "Bar Cabinet Large", tag: "XL", price: 300 }, // bulky, heavier
      { name: "Bar Chair / Stool", tag: "S", price: 100 },  // small, easy to move
      { name: "Bar Trolley", tag: "M", price: 180 },        // mid-size, wheels but fragile
      { name: "Bar Unit", tag: "XL", price: 320 },          // large, heavy, needs careful packing
      { name: "Wine Rack", tag: "M", price: 150 },          // compact but fragile bottles
    ],
  },

  /* ================= SIMPLE ITEMS ================= */
  { label: "Decorative Item", 
    expandable: true,
     items: [
    { name: "Decorative Item", tag: "S", price: 86 },
    { name: "Lamp", tag: "XS", price: 72 }
  ]
   },

   {
    label: "Air Cooler",
    expandable: false,
    items: [{ name: "Air Cooler", tag: "L", price: 260 },],
  },
  {
    label: "Air Purifier",
    expandable: false,
    items: [{ name: "Air Purifier", tag: "M", price: 200 },],
  },

],
  },

  {
   section: "Bedroom",
blocks: [
  /* ================= BED ================= */
  {
    label: "Bed",
    expandable: true,
    items: [

  { name: "Single Bed (Simple Frame)", tag: "L", price: 252 },
  { name: "Single Bed (Box / Drawer Storage)", tag: "XL", price: 288 },
  { name: "Single Bed (Hydraulic Storage)", tag: "XXL", price: 320 },
  { name: "Double Bed (Simple Frame)", tag: "XXL", price: 324 },
  { name: "Double Bed (Box / Drawer Storage)", tag: "XXXL", price: 360 },
  { name: "Double Bed (Hydraulic Storage)", tag: "4XL", price: 390 },

    ],
  },

  /* ================= MATTRESS ================= */
  {
    label: "Mattress",
    expandable: true,
    items: [
      { name: "Mattress Single Foldable", tag: "M", price: 108 },
      { name: "Mattress Single Non Foldable", tag: "M", price: 144 },
      { name: "Mattress Double Foldable", tag: "M", price: 180 },
      { name: "Mattress Double Non Foldable", tag: "M", price: 216 },
    ],
  },

  /* ================= TABLE ================= */
  {
    label: "Table",
    expandable: true,
    items: [
      { name: "Bed Side Table", tag: "M", price: 144 },
      { name: "Study / Computer Table", tag: "L", price: 216 },
      { name: "Center Table", tag: "M", price: 252 }, // aligned with Living Room Center Table
    ],
  },

  /* ================= CHAIR ================= */
  {
    label: "Chair",
    expandable: true,
    items: [
      { name: "Office Chair", tag: "M", price: 108 },
      { name: "Rocking Chair", tag: "M", price: 144 },
      { name: "Arm Chair", tag: "L", price: 180 }, // aligned with Living Room Arm Chair
      { name: "Bean Bag / Pouffe", tag: "M", price: 120 }, // lighter, easy handling
    ],
  },

  /* ================= AIR CONDITIONER ================= */
  {
    label: "Air Conditioner",
    expandable: true,
    items: [
      { name: "Split Air Conditioner (AC)", tag: "L", price: 288 },
      { name: "Window Air Conditioner (AC)", tag: "L", price: 252 },
      { name: "Air Cooler", tag: "M", price: 144 },
    ],
  },

  /* ================= ALMIRAH / WARDROBE ================= */
  {
    label: "Almirah / Wardrobe",
    expandable: true,
    items: [
      
          { name: "Wooden Wardrobe (Up to 5.5 ft)", tag: "L", price: 252 },
          { name: "Wooden Wardrobe (6 ft)", tag: "XL", price: 324 },
          { name: "Wooden Wardrobe (6.5–8 ft / Sliding)", tag: "XXL", price: 396 },  
          { name: "Steel Almirah (Up to 5.5 ft)", tag: "L", price: 216 },
          { name: "Steel Almirah (6 ft)", tag: "XL", price: 288 },
          { name: "Steel Almirah (6.5+ ft)", tag: "XXL", price: 360 },
          { name: "Wooden Wardrobe (6–7 ft) Dismantale", tag: "XL", price: 324},
    ],
  },

  /* ================= APPLIANCES ================= */
  {
    label: "Appliances",
    expandable: true,
    items: [
      { name: "Ceiling Fan", tag: "S", price: 108 },
      { name: "Table Fan", tag: "M", price: 86 },
      { name: "Air Purifier", tag: "M", price: 180 },
      { name: "Garment Steamer", tag: "S", price: 120 },
    ],
  },

  /* ================= SIMPLE ITEMS ================= */
  {
    label: "Dressing Table",
    expandable: true,
    items: [{ name: "Dressing Table", tag: "M", price: 216 }],
  },
  {
    label: "Mandir",
    expandable: true,
    items: [{ name: "Mandir (Small)", tag: "S", price: 252 },
              { name: "Mandir (Medium)", tag: "M", price: 300 },
              { name: "Mandir (Large)", tag: "L", price: 350 },
              { name: "Religious Items", tag: "M", price: 252 },
    ],
  

  },
],
  },

  {
    section: "Kitchen",
blocks: [

  /* ================= REFRIGERATOR ================= */
  {
    label: "Refrigerator",
    expandable: true,
    items: [
     
  { name: "Fridge (Up to 80L)", tag: "M", price: 216 },

  { name: "Fridge (81L – 200L)", tag: "L", price: 252 },

  { name: "Fridge (201L – 350L)", tag: "XL", price: 288 },

  { name: "Fridge (351L – 450L)", tag: "XXL", price: 360 },

  { name: "Fridge (451L – 600L)", tag: "XXXL", price: 432 },

  { name: "Fridge (Above 600L)", tag: "XXXL", price: 480 }
    ],
  },

  /* ================= KITCHEN ITEMS ================= */
  {
    label: "Kitchen Items",
    expandable: true,
    items: [
      { name: "Gas Stove / Hob", tag: "S", price: 86 },
      { name: "LPG Gas Cylinder", tag: "M", price: 72 },
      { name: "Kitchen Metal Rack", tag: "L", price: 180 },          // aligned with Book Shelf
      { name: "Kitchen Cabinet / Storage", tag: "XL", price: 288 },
      { name: "Water Drum", tag: "M", price: 144 },                  // similar to purifier
      { name: "Exhaust Fan", tag: "S", price: 108 },
      { name: "Chimney", tag: "L", price: 252 },
    ],
  },

  /* ================= APPLIANCES ================= */
  {
    label: "Appliances",
    expandable: true,
    items: [
      { name: "Microwave Oven / OTG", tag: "M", price: 144 },
      { name: "Dish Washer", tag: "L", price: 288 },
      { name: "Water Purifier", tag: "M", price: 144 },
      { name: "Mixer Grinder", tag: "S", price: 108 },               // small appliance
      { name: "Wet Grinder", tag: "M", price: 144 },                 // medium appliance
      { name: "Food Processor", tag: "S", price: 108 },
      { name: "Cooking Range", tag: "L", price: 252 },
      { name: "Domestic Flour Mill / Atta Chakki", tag: "L", price: 252 },
      { name: "Air Fryer", tag: "S", price: 108 },
      { name: "Electric Tandoor", tag: "S", price: 108 },
      { name: "Hood Chimney", tag: "L", price: 252 },
      { name: "Barbeque Grill Small", tag: "M", price: 144 },
      { name: "Barbeque Grill Large", tag: "L", price: 216 },
      { name: "Pressure Cooker Set", tag: "S", price: 86 },
    ],
  },

  /* ================= FURNITURE & STORAGE ================= */
  {
    label: "Furniture & Storage",
    expandable: true,
    items: [
      { name: "Kitchen Rack", tag: "L", price: 180 },   // similar to Book Shelf Small/Medium
      { name: "Serving Trolley", tag: "M", price: 144 },
      { name: "Side Table", tag: "M", price: 144 },     // aligned with Bed Side Table
    ],
  },

],
  },

  {
    section: "Other",
blocks: [

  /* ================= CARTONS & PACKING ================= */
  {
    label: "Self Cartoon Boxes (2ft x 1.5ft x 1.5ft)",
    expandable: false,
    items: [
      { name: "Carton Box ", tag: "S", price: 96 },   // Tithi Carton Box
      { name: "Large Carton", tag: "M", price: 0 },                        // Self Carton Box
      { name: "Medium Carton", tag: "S", price: 0 },                       // Self Carton Box
      { name: "Small Carton", tag: "XS", price: 0 },                       // Self Carton Box
      
    ],
  },
  {
    label: "TITHI Carton Box (1.5ft x 1.5ft x 2ft)",
    expandable: false,
    items: [{ name: "TITHI Carton Box (1.5ft x 1.5ft x 2ft)", tag: "S", price: 96 },],
  },
  {
    label: "TITHI Gunny Bag",
    expandable: false,
    items: [{ name: "Gunny Bag", tag: "XS", price: 40 },],
  },

  /* ================= WASHING MACHINE ================= */
  {
    label: "Washing Machine",
    expandable: true,
    items: [
      { name: "Washing Machine < 6.9 Kg", tag: "L", price: 400 },
      { name: "Washing Machine 7 – 7.9 Kg", tag: "XL", price: 400 },
      { name: "Washing Machine 8 Kg & Above", tag: "XXL", price: 400 },
    ],
  },

  /* ================= BATHROOM UTILITY ================= */
  {
    label: "Bathroom Utility",
    expandable: true,
    items: [
      { name: "Bucket", tag: "XS", price: 32 },
      { name: "Tub", tag: "S", price: 64 },
      { name: "Bath Tub", tag: "XL", price: 480 },
      { name: "Geyser", tag: "M", price: 320 },
      { name: "Mirror (Large)", tag: "M", price: 240 },
    ],
  },

  /* ================= HOME UTILITY ================= */
  {
    label: "Home Utility",
    expandable: true,
    items: [
      { name: "Inverter / UPS", tag: "L", price: 400 },
      { name: "Inverter – With Battery", tag: "XL", price: 400 },
      { name: "Clothes Stand", tag: "S", price: 144 },
      { name: "Foldable Clothes Dryer", tag: "S", price: 160 }, // aligned with Home Utility
      { name: "Iron Board", tag: "S", price: 120 },
      { name: "Storage / Laundry Basket", tag: "S", price: 160 }, // Home Utility
      { name: "Vacuum Cleaner", tag: "S", price: 280 },
      { name: "Ladder / Step Ladder", tag: "M", price: 160 },
      { name: "Sewing Machine", tag: "M", price: 320 },
      { name: "Computer System", tag: "L", price: 400 },   // aligned with Inverter/UPS
      { name: "Printer", tag: "L", price: 200 },           // proxy to Dish Antenna
      { name: "Speaker", tag: "S", price: 160 },           // small electronic, aligned with Home Utility
      { name: "Dish Antenna", tag: "M", price: 200 },      // matches reference list
    ],
  },

  /* ================= VEHICLE ================= */
  {
    label: "Vehicle",
    expandable: true,
    items: [
      { name: "Bicycle – Adult", tag: "L", price: 560 },
      { name: "Bicycle – Kids", tag: "M", price: 560 }, // same category
      { name: "Scooter", tag: "XXXL", price: 1200 },
      { name: "Bike", tag: "XXXL", price: 1600 },
    ],
  },

  /* ================= EQUIPMENT / INSTRUMENTS ================= */
  {
    label: "Musicle Instruments",
    expandable: true,
    items: [
      { name: "Piano", tag: "XXL", price: 960 },            // upright piano, heavy but smaller than grand
      { name: "Grand Piano", tag: "XXXL", price: 1200 },    // very large, requires special handling
      { name: "Guitar", tag: "L", price: 240 },             // light, fragile, easy to carry
      { name: "Harmonium", tag: "M", price: 300 },          // medium size, wooden, delicate
      { name: "Synthesizer", tag: "M", price: 360 },        // electronic, fragile
      { name: "Electronic Keyboard", tag: "M", price: 360 },// similar to synthesizer
      { name: "Tabla", tag: "S", price: 180 },              // small, portable
      { name: "Drum Set (5 Piece)", tag: "XXXL", price: 800 }, // bulky, multiple pieces
      { name: "Foosball", tag: "XL", price: 1600 },         // large, heavy, matches your reference
      { name: "Pool / Snooker", tag: "XXL", price: 2000 },  // very large, matches your reference
    ],
  },

  /* ================= PLANTS & POTS ================= */
  {
    label: "Plants & Pots",
    expandable: true,
    items: [
      { name: "Small Plant (1 ft & below)", tag: "XS", price: 80 },
      { name: "Medium Plant (2 – 5 ft)", tag: "S", price: 200 },
      { name: "Large Plant (6 ft & above)", tag: "L", price: 400 },
      { name: "Small Pots", tag: "S", price: 80 },
      { name: "Big Pots", tag: "M", price: 200 },
    ],
  },

  /* ================= SUITCASE / TROLLEY ================= */
  {
    label: "Suitcase / Trolley",
    expandable: true,
    items: [
      { name: "Cabin / Small Suitcase (Up to 55 cm)", tag: "S", price: 160 },
      { name: "Suitcase Small (7 Kg)", tag: "S", price: 160 },
      { name: "Suitcase Medium (15 Kg)", tag: "M", price: 240 },
      { name: "Suitcase Large (25 Kg)", tag: "L", price: 320 },
      { name: "Medium Suitcase (56 – 69 cm)", tag: "M", price: 240 },
      { name: "Large Suitcase (70 cm & above)", tag: "L", price: 320 },
    ],
  },

  /* ================= DECORATIVE ITEMS ================= */
  {
    label: "Decorative Items",
    expandable: true,
    items: [
    { name: "Aquarium Large", tag: "XL", price: 400 },   // heavy, fragile, aligned with Large Plant
    { name: "Carpet (Rolled)", tag: "M", price: 160 },   // medium handling, proxy to Home Utility
    { name: "Indoor Fountain Small", tag: "M", price: 200 }, // compact but fragile
    { name: "Indoor Fountain Large", tag: "XL", price: 400 }, // bulky, fragile, water risk
    { name: "Mirror", tag: "S", price: 240 },            // fragile glass, matches Mirror Large reference
    { name: "Painting / Photo Small", tag: "XS", price: 80 }, 
    { name: "Painting / Photo Medium", tag: "S", price: 160 },
    { name: "Painting / Photo Large", tag: "M", price: 240 },
    { name: "Pooja Lamp", tag: "XS", price: 80 },        // small, delicate
    { name: "Statue Small", tag: "S", price: 160 },
    { name: "Statue Medium", tag: "M", price: 240 },
    { name: "Statue Large", tag: "L", price: 320 },      // heavy, stone/metal
    { name: "Vase Small", tag: "XS", price: 80 },
    { name: "Vase Large", tag: "S", price: 160 },
    { name: "Wall Frames Medium", tag: "S", price: 160 },
    { name: "Wall Frames Large", tag: "M", price: 240 },
    ],
  },

  /* ================= KIDS VEHICLE ================= */
  {
    label: "Kids Vehicle",
    expandable: true,
    items: [
      { name: "Kids Three Wheeler", tag: "M", price: 240 }, // Baby Stroller proxy
      { name: "Kids Four Wheeler", tag: "L", price: 240 },  // Baby Stroller proxy
    ],
  },

  /* ================= GYM EQUIPMENT ================= */
  {
    label: "Gym Equipment",
    expandable: true,
    items: [
      { name: "Exercise Cycle", tag: "L", price: 800 },       // bulky but lighter than treadmill
      { name: "Treadmill", tag: "XXL", price: 1200 },         // heavy, requires careful handling
      { name: "Treadmill – Foldable", tag: "XL", price: 1000 }, // slightly easier to move than full treadmill
      { name: "Dumble", tag: "M", price: 120 },               // small, portable, easy handling
    ],
  },


    /* ================= SIMPLE ================= */
    {
      label: "Swing (Baby / Adult)",
      expandable: true,
      items: [{ name: "Swing (Baby)", tag: "L" },
              { name: "Swing (Adult)", tag: "XL" },
      ],
      
    },

  ],
  },
];

/* ================= QTY CONTROL ================= */
function Qty({ value, onAdd, onSub }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onSub}
        className="w-8 h-8 rounded-full border text-lg
                   flex items-center justify-center
                   active:scale-95"
      >
        −
      </button>

      <span className="w-6 text-center text-sm font-semibold">
        {value}
      </span>  

      <button
        onClick={onAdd}
        className="w-8 h-8 rounded-full border border-sky-500 text-sky-600
                   flex items-center justify-center
                   active:scale-95"
      >
        +
      </button>
    </div>
  );
}

/* ================= MAIN PAGE ================= */
export default function PackersMover() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const clearAllItems = () => {
  if (window.confirm("Remove all selected items?")) {
    setSelected({});
    setShowSummary(false);
  }
};
  
  const [moveData, setMoveData] = useState(null);
  const [selected, setSelected] = useState(() => {
  const saved = localStorage.getItem("selectedItems");
  return saved ? JSON.parse(saved) : {};
});

  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
  localStorage.setItem("selectedItems", JSON.stringify(selected));
}, [selected]);


  const normalizeSelectedItems = () => {
  const allItems = ITEM_CATALOG.flatMap(sec =>
    sec.blocks.flatMap(b => b.items)
  );

  return Object.entries(selected).map(([name, obj]) => {
    const itemInfo = allItems.find(i => i.name === name);
    return {
      name,
      qty: obj.qty,
      tag: obj.tag,
      price: itemInfo?.price || 0,
    };
  });
};







useEffect(() => {
  if (location.state) {
    setMoveData(location.state);
    localStorage.setItem("shiftData", JSON.stringify(location.state));
  }
}, [location.state]);


  /* LOAD MOVE DATA */
  useEffect(() => {
    if (location.state) {
      setMoveData(location.state);
      localStorage.setItem("shiftData", JSON.stringify(location.state));
    } else {
      const saved = localStorage.getItem("shiftData");
      if (saved) setMoveData(JSON.parse(saved));
    }
  }, [location.state]);
  
  if (!moveData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-sky-600 text-white px-6 py-3 rounded-full"
        >
          Go to Calculator
        </button>
      </div>
    );
  }
   
  /* UPDATE QTY */
  const update = (name, tag, delta) => {
    setSelected((prev) => {
      const qty = Math.max(0, (prev[name]?.qty || 0) + delta);
      if (!qty) {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
      return { ...prev, [name]: { qty, tag } };
    });
  };

  const ALL_ITEMS = ITEM_CATALOG.flatMap(sec =>
  sec.blocks.flatMap(block =>
    block.items.map(it => ({
      name: it.name,
      tag: it.tag,
      section: sec.section,
      block: block.label,
    }))
  )
);

const suggestions =
  search.length > 0
    ? ALL_ITEMS.filter(it =>
        it.name.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 6)
    : [];


  const totalItems = Object.values(selected).reduce((a, b) => a + b.qty, 0);

  
const confirmBooking = async () => {
  if (!moveData?._id) {
    alert("Booking ID missing. Please restart booking.");
    return;
  }

  const items = normalizeSelectedItems();
  const bill = calculateFinalPrice({ items, moveData });

  const payload = {
    items,
    pricing: bill,
  };

  try {
    const res = await fetch(
      `http://localhost:5000/api/bookings/${moveData._id}/items`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert("Failed to save items");
      return;
    }

    navigate("/PackersMoverBooking", {
      state: {
        bookingId: moveData._id,
        items,
        priceBreakup: bill,
      },
    });
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};






  return (

    <>
  <section className="max-w-6xl mx-auto px-3 sm:px-4 pb-32 space-y-6">

{/* ================= PROFESSIONAL ANIMATED STEPPER ================= */}
<div className="w-full max-w-lg mx-auto px-6 pt-4 pb-10">
  <div className="relative flex items-center justify-between">
    
    {/* Background Progress Track */}
    <div className="absolute top-[18px] left-0 w-full h-[3px] bg-slate-100 -z-0 rounded-full" />
    
    {/* Active Progress Fill (Animated) */}
    {/* Since we are at Step 2, the width is 50%. On Step 3, it would be 100% */}
    <div 
      className="absolute top-[18px] left-0 h-[3px] bg-sky-600 -z-0 rounded-full transition-all duration-700 ease-in-out" 
      style={{ width: '50%' }} 
    />

    {[
      { id: 1, label: "Details", status: "complete" },
      { id: 2, label: "Items", status: "active" },
      { id: 3, label: "Booking", status: "pending" }
    ].map((step, idx) => (
      <div key={step.id} className="relative z-10 flex flex-col items-center group">
        
        {/* Step Circle */}
        <div className={`
          w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500
          ${step.status === 'complete' ? 'bg-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.3)]' : 
            step.status === 'active' ? 'bg-white border-2 border-sky-600 shadow-[0_0_15px_rgba(2,132,199,0.2)] scale-110' : 
            'bg-white border-2 border-slate-100 text-slate-300'}
        `}>
          {step.status === 'complete' ? (
            <svg className="w-5 h-5 text-white animate-in zoom-in duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className={`text-xs font-black ${step.status === 'active' ? 'text-sky-600' : 'text-slate-300'}`}>
              0{step.id}
            </span>
          )}
        </div>

        {/* Step Label */}
        <span className={`
          absolute -bottom-7 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.1em] transition-colors duration-300
          ${step.status === 'active' ? 'text-sky-700' : 'text-slate-400'}
        `}>
          {step.label}
        </span>

        {/* Pulsing effect for Active Step */}
        {step.status === 'active' && (
          <span className="absolute top-0 left-0 w-10 h-10 bg-sky-400 rounded-2xl animate-ping opacity-20 -z-10" />
        )}
      </div>
    ))}
  </div>
</div>


    {/* ================= SEARCH ================= */}
<div className="sticky top-0 z-30 bg-white pt-3 pb-2">
  <div className="relative group">

  {/* SEARCH INPUT BOX */}
  <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3.5 shadow-sm transition-all duration-200 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-50">
    <Search size={18} className="text-slate-400 group-focus-within:text-sky-500" />
    
    <input
      type="text"
      placeholder="Search items (e.g. Sofa, Bed, AC...)"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 text-sm outline-none text-slate-700 placeholder:text-slate-400 font-medium"
    />

    {search && (
      <button 
        onClick={() => setSearch("")}
        className="p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
      >
        <X size={16} />
      </button>
    )}
  </div>

  {/* SUGGESTIONS DROPDOWN */}
  {search && (
    <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      
      {suggestions.length > 0 ? (
        <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Matching Items
            </p>
          </div>
          
         {suggestions.map((it) => {
  const isSelected = selected[it.name]?.qty > 0;

  return (
    <div
      key={it.name}
      className={`
        flex items-center justify-between 
        px-5 py-4 
        border-b border-slate-100 
        last:border-0 
        transition-all duration-200 
        hover:bg-sky-50/60 
        ${isSelected ? 'bg-sky-50/40' : ''}
      `}
    >
      {/* LEFT TEXT */}
      <div className="flex flex-col">
        <span className="text-base font-semibold text-slate-800">
          {it.name}
        </span>

        <span className="text-xs text-slate-500 mt-1">
          {it.section} • {it.block}
        </span>
      </div>

      {/* RIGHT QTY */}
      <div className="scale-100">
        <Qty
          value={selected[it.name]?.qty || 0}
          onAdd={() => update(it.name, it.tag, 1)}
          onSub={() => update(it.name, it.tag, -1)}
        />
      </div>
    </div>
  );
})}

        </div>
      ) : (
        /* NO RESULTS STATE */
        <div className="px-6 py-8 text-center">
          <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search size={20} className="text-slate-300" />
          </div>
          <p className="text-sm font-bold text-slate-600">No items found</p>
          <p className="text-xs text-slate-400 mt-1">Try searching for something else</p>
        </div>
      )}
    </div>
  )}
</div>
</div>

{/* ================= REFINED FOOTER NOTICE ================= */}
<div className="mx-4 mt-12 mb-6 p-4 bg-gradient-to-r from-sky-50 to-white rounded-2xl border border-sky-100 shadow-sm transition-all hover:shadow-md">
  <div className="flex items-center gap-4 max-w-3xl mx-auto">
    {/* Icon with Soft Pulse Effect */}
    <div className="flex-shrink-0 w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center border border-sky-200">
      <span className="text-sky-600 text-lg">💡</span>
    </div>

    {/* Content */}
    <div className="flex-1">
      <h4 className="text-[13px] font-semibold text-sky-900 tracking-tight">
        Pro Tip for Savings
      </h4>
      <p className="text-[12px] text-slate-500 leading-relaxed">
        Accuracy ensures the best price. Need to change something? You can 
        <span className="text-sky-600 font-medium"> adjust quantities in the next step.</span>
      </p>
    </div>

    {/* Subtle Decorative Element (Optional) */}
    <div className="hidden sm:block">
       <svg className="w-5 h-5 text-sky-200" fill="currentColor" viewBox="0 0 20 20">
         <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
       </svg>
    </div>
  </div>
</div>



<div className="flex justify-center w-full px-1">
  <div className="grid grid-cols-4 gap-3 w-full max-w-2xl">
    {[
      { id: "Living Room", img: livingImg, color: "bg-orange-50", label: "Living" },
      { id: "Bedroom", img: bedroomImg, color: "bg-blue-50", label: "Bedroom" },
      { id: "Kitchen", img: kitchenImg, color: "bg-emerald-50", label: "Kitchen" },
      { id: "Other", img: boxImg, color: "bg-purple-50", label: "Others" }
    ].map((cat) => (
      <button
        key={cat.id}
        onClick={() => {
          const el = document.getElementById(cat.id);
          const offset = 100;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el ? el.getBoundingClientRect().top : 0;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }}
        className="group flex flex-col items-center justify-center aspect-square rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-sky-500 hover:shadow-md hover:-translate-y-1 active:scale-95"
      >
        {/* Image Container */}
        <div className={`w-10 h-10 md:w-12 md:h-12 mb-2 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${cat.color}`}>
          <img 
            src={cat.img} 
            alt={cat.label} 
            className="w-6 h-6 md:w-8 md:h-8 object-contain" 
          />
        </div>
        
        {/* Text Label */}
        <span className="text-[11px] md:text-[13px] font-semibold capitalize text-slate-600 group-hover:text-sky-600 transition-colors duration-300">
  {cat.label}
</span>
      </button>
    ))}
  </div>
</div>
{totalItems > 0 && (
  <div className="flex justify-end mt-3">
    <button
      onClick={clearAllItems}
      className="
        flex items-center gap-2
        px-4 py-2
        text-[12px] font-semibold
        text-slate-600
        bg-slate-50
        border border-slate-200
        rounded-xl
        hover:bg-red-50
        hover:text-red-600
        hover:border-red-200
        transition-all
        active:scale-95
      "
    >
      <span className="text-sm">🗑️</span>
      Clear all items
    </button>
  </div>
)}

{/* ================= STICKY BAR ================= */}
<div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
  <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

    {/* LEFT INFO */}
    <div>
      <p className="text-base font-extrabold text-slate-900">
        {totalItems} items selected
      </p>

      {totalItems > 0 && (
        <button
          onClick={() => setShowSummary(true)}
          className="text-xs text-sky-600 font-semibold mt-1"
        >
          View items ↑
        </button>
      )}

      
    </div>
      

    {/* CTA BUTTON */}
    <button
  disabled={totalItems === 0}
  onClick={confirmBooking}
  className={`
    group relative overflow-hidden rounded-full px-6 py-3 text-sm font-bold
    transition-all duration-300
    ${
      totalItems === 0
        ? "bg-slate-300 text-white cursor-not-allowed"
        : "bg-sky-600 text-white hover:bg-sky-700 active:scale-95"
    }
  `}
>
  <span className="relative z-10 flex items-center gap-2">
    Continue
    <span className="transition-transform group-hover:translate-x-1">→</span>
  </span>
</button>

  </div>
</div>



{/* ITEMS */}
{
  ITEM_CATALOG.map((sec) => (
    <Section
      key={sec.section}
      sec={sec}
      selected={selected}
      update={update}
    />
))}




  </section>

  {showSummary && (
  <div
    onClick={() => setShowSummary(false)}
    className="fixed inset-0 bg-black/40 z-40"
  />
)}


  {/* ================= SELECTED ITEMS SHEET ================= */}
<div
  className={`
    fixed inset-x-0 bottom-0 z-50 bg-white
    rounded-t-3xl border-t shadow-2xl
    transform transition-transform duration-300
    flex flex-col
    ${showSummary ? "translate-y-0" : "translate-y-full"}
  `}
  style={{ height: "75vh" }}
>
  {/* HEADER */}
  <div className="flex items-center justify-between px-5 py-4 border-b shrink-0">
    <h3 className="text-base font-extrabold">
      Selected Items ({totalItems})
    </h3>

    <button
      onClick={() => setShowSummary(false)}
      className="text-2xl leading-none text-slate-500 hover:text-slate-900"
    >
      ×
    </button>
  </div>

  {/* ITEMS LIST */}
  <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
    {Object.entries(selected).map(([name, obj]) => (
      <div
        key={name}
        className="flex justify-between items-center
                   bg-slate-50 rounded-xl px-4 py-3"
      >
        <span className="text-sm text-slate-800">{name}</span>
        <span className="text-sm font-bold">× {obj.qty}</span>
      </div>
    ))}

    {totalItems === 0 && (
      <p className="text-center text-sm text-slate-500 py-6">
        No items selected
      </p>
    )}
  </div>
</div>

</>
  
);

}
export function calculateFinalPrice({ items, moveData }) {
  const {
    pickupLift,
    dropLift,
    pickupFloorNo,
    dropFloorNo,
    distance,
  } = moveData;

  let total = BASE_PRICE;
  let warnings = [];

  const { extraItemCharge, heavyItemsCount } = analyzeItems(items);
  total += extraItemCharge;

  let floorCharge = 0;
  if (!pickupLift) floorCharge += calculateFloorCharge(pickupFloorNo);
  if (!dropLift) floorCharge += calculateFloorCharge(dropFloorNo);

  total += floorCharge;

  const distanceCharge = calculateDistanceCharge(distance);
  total += distanceCharge;

  // =========================
  // 🔥 DISCOUNT LOGIC
  // =========================
  const discountAmount = Math.round(
    (total * DEFAULT_DISCOUNT_PERCENT) / 100
  );

  const finalTotal = total - discountAmount;

  if (!pickupLift && heavyItemsCount >= 2) {
    warnings.push(
      "Multiple heavy items detected without lift."
    );
  }

  return {
    basePrice: BASE_PRICE,
    extraItemCharge,
    floorCharge,
    distanceCharge,
    discountPercent: DEFAULT_DISCOUNT_PERCENT,
    discountAmount,
    totalBeforeDiscount: total,
    total: finalTotal,
    warnings,
  };
}



/* ================= SECTION ================= */
function Section({ sec, selected, update }) {
  const [openBlock, setOpenBlock] = useState(null);

  return (
    <div 
      id={sec.section} 
      className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm mb-8 scroll-mt-28 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50"
    >
      {/* Header logic same rahegi... */}
      <div className="relative px-6 py-5 bg-gradient-to-r from-slate-50/80 to-transparent border-b border-slate-100 flex items-center gap-3">
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-sky-500 rounded-r-full"></div>
        <div className="flex flex-col">
          <h2 className="text-base md:text-lg font-bold text-slate-800 tracking-tight leading-none">
            {sec.section}
          </h2>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">
            {sec.blocks.length} Categories Available
          </span>
        </div>
      </div>

      {/* --- Items List (Yahan Props pass karna zaroori hai) --- */}
      <div className="divide-y divide-slate-50/60 bg-white">
        {sec.blocks.map((b) => (
          <Block 
            key={b.label} 
            block={b} 
            selected={selected} 
            update={update} 
            // ✅ YE DO LINES ADD KAREIN:
            isOpen={openBlock === b.label} 
            onToggle={() => setOpenBlock(openBlock === b.label ? null : b.label)}
          />
        ))}
      </div>
    </div>
  );
}

 function Block({ block, selected, update, isOpen, onToggle }) {
  const selectedCount = block.items.reduce((acc, it) => acc + (selected[it.name]?.qty || 0), 0);

  const iconSrc = BLOCK_ICONS[block.label] || defaultIcon;

  // ==========================================
  // 1. SIMPLE ITEM (Carton Box, Gunny Bag, etc.)
  // ==========================================
  if (!block.expandable) {
  const it = block.items[0];
  const qtyValue = selected[it.name]?.qty || 0;
  const iconSrc = BLOCK_ICONS[block.label] || defaultIcon;

  return (
    <div className="px-6 py-3 flex items-center justify-between border-b border-slate-100">

      {/* LEFT SIDE */}
    <div className="flex items-center gap-2">
  
  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
    <img
      src={iconSrc}
      alt={block.label}
      className="w-6 h-6 object-contain"
    />
  </div>

  <span className="text-lg font-semibold text-slate-800 leading-none">
    {block.label}
  </span>

</div>


      {/* RIGHT SIDE */}
      <Qty
        value={qtyValue}
        onAdd={() => update(it.name, it.tag, 1)}
        onSub={() => update(it.name, it.tag, -1)}
      />
    </div>
  );
}


  // ==========================================
  // 2. EXPANDABLE ITEM (Dropdowns)
  // ==========================================
  return (
    <>
      <button
        onClick={onToggle}
        className={`w-full px-6 py-4 flex justify-between items-center text-left transition-all ${
          isOpen ? "bg-slate-50/80" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
  <img
    src={iconSrc}
    alt={block.label}
    className="w-6 h-6 object-contain"
  />
</div>

<span className="text-lg font-semibold text-slate-800">
  {block.label}
</span>

          
          {selectedCount > 0 && (
            <div className="flex items-center gap-1.5 bg-sky-50 text-sky-600 px-2 py-0.5 rounded border border-sky-100">
              <span className="text-[10px] font-bold uppercase tracking-wider">{selectedCount} Added</span>
            </div>
          )}
        </div>

        <ChevronDown className={`h-5 w- text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-sky-500" : ""}`} />
      </button>

      {isOpen && (
        <div className="bg-slate-50/50 border-t border-slate-100"> 
          {block.items.map((it, index) => (
  <div
    key={it.name}
    className={`flex justify-between items-center px-4 py-2
      ${index !== block.items.length - 1 ? 'border-b border-slate-100/60' : ''}
    `}
  >
    <p className="text-base font-medium text-slate-700">
      {it.name}
    </p>

    <div className="scale-100 origin-right">
      <Qty
        value={selected[it.name]?.qty || 0}
        onAdd={() => update(it.name, it.tag, 1)}
        onSub={() => update(it.name, it.tag, -1)}
      />
    </div>
  </div>
))}

        </div>
      )}
    </>
  );
}