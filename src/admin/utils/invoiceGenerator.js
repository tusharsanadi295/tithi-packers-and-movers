import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function generateInvoicePDF(b) {
  if (!b) {
    alert("Invoice data missing");
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // --- 1. Header & Brand Identity ---
  // Blue accent bar at the top
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, pageWidth, 15, "F");

  doc.setFontSize(22);
  doc.setTextColor(41, 128, 185);
  doc.setFont(undefined, 'bold');
  doc.text("TITHI PACKERS & MOVERS", 14, 30);
  
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(80);
  doc.text("Packing Se Unpacking Tak Tithi He Sabse Alag", 14, 36);
  doc.text("Contact: +91 8160081145 | Email: info@tithipackers.in", 14, 41);
 

  // Invoice Label
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text("INVOICE", pageWidth - 50, 35);
  doc.setFontSize(10);
  doc.text(`No: #TPM-${Date.now().toString().slice(-6)}`, pageWidth - 50, 42);
  doc.text(`Date: ${b.date || "-"}`, pageWidth - 50, 47);

  // --- 2. Customer & Service Details ---
  doc.setDrawColor(230);
  doc.line(14, 55, 196, 55);

  doc.setFont(undefined, 'bold');
  doc.text("CUSTOMER DETAILS:", 14, 65);
  doc.setFont(undefined, 'normal');
  doc.text(`Name: ${b.name || "-"}`, 14, 71);
  doc.text(`Phone: ${b.mobile || "-"}`, 14, 76);
  doc.text(`Email: ${b.email || "-"}`, 14, 81);

  doc.setFont(undefined, 'bold');
  doc.text("SERVICE SUMMARY:", 110, 65);
  doc.setFont(undefined, 'normal');
  doc.text(`Service: ${b.serviceType?.toUpperCase() || "PACKERS"}`, 110, 71);
  doc.text(`Distance: ${b.distance || 0} KM`, 110, 76);
  doc.text(`Status: ${b.status || "PENDING"}`, 110, 81);

  // --- 3. Route Details (Highlighted Box) ---
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 88, 182, 22, 2, 2, "F");
  
  doc.setFontSize(9);
  doc.setFont(undefined, 'bold');
  doc.text("PICKUP FROM:", 18, 95);
  doc.setFont(undefined, 'normal');
  doc.text(`${b.pickup} (Floor: ${b.pickupFloorNo}, Lift: ${b.pickupLift ? "Yes" : "No"})`, 45, 95, { maxWidth: 140 });

  doc.setFont(undefined, 'bold');
  doc.text("DROP TO:", 18, 103);
  doc.setFont(undefined, 'normal');
  doc.text(`${b.drop} (Floor: ${b.dropFloorNo}, Lift: ${b.dropLift ? "Yes" : "No"})`, 45, 103, { maxWidth: 140 });

  // --- 4. Items Table ---
  const tableRows = (b.items || []).map((item, index) => [
    index + 1,
    item.name,
    item.qty,
    
  ]);

  autoTable(doc, {
    startY: 115,
    head: [["#", "Item Description", "Size/Tag"]],
    body: tableRows,
    theme: "striped",
    headStyles: { fillColor: [41, 128, 185], fontSize: 10, cellPadding: 3 },
    bodyStyles: { fontSize: 9 },
    columnStyles: { 4: { halign: 'right' } }
  });

  // --- 5. Summary & Calculations ---
  let finalY = doc.lastAutoTable.finalY + 10;
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Addons Charges:", 140, finalY);
  doc.setTextColor(0);
  doc.text(`INR ${b.addonsTotal || 0}`, 196, finalY, { align: "right" });

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text("Grand Total:", 140, finalY + 8);
  doc.setTextColor(41, 128, 185);
  doc.text(`INR ${b.finalAmount || 0}`, 196, finalY + 8, { align: "right" });

  // --- 6. Terms & Conditions & Signatures ---
  const bottomSectionY = pageHeight - 65;

  // Terms and Conditions (Left Side)
  doc.setFontSize(8);
  doc.setTextColor(50);
  doc.setFont(undefined, 'bold');
  doc.text("TERMS & CONDITIONS:", 14, bottomSectionY);
  doc.setFont(undefined, 'normal');
  const terms = [
    "1. 50% advance payment required at the time of booking.",
    "2. Company is not responsible for jewelry or cash.",
    "3. Any damage must be reported within 24 hours of delivery.",
    "4. Octroi or Toll charges will be extra as per actual receipts."
  ];
  doc.text(terms, 14, bottomSectionY + 5);

  // Customer Acknowledgment (Right Side)
  doc.setDrawColor(200);
  doc.rect(120, bottomSectionY - 5, 76, 45); // Box for signature area
  
  doc.setFontSize(8);
  doc.text("CUSTOMER ACKNOWLEDGMENT", 125, bottomSectionY);
  doc.text("[ ] All items received in good condition", 125, bottomSectionY + 7);
  
  // Signature Lines
  doc.line(125, bottomSectionY + 30, 155, bottomSectionY + 30); // Customer Sign
  doc.line(160, bottomSectionY + 30, 190, bottomSectionY + 30); // Manager Sign
  
  doc.setFontSize(7);
  doc.text("Customer Signature", 125, bottomSectionY + 34);
  doc.text("Auth. Signatory", 160, bottomSectionY + 34);

  // --- 7. Footer ---
  doc.setFontSize(9);
  doc.setFont(undefined, 'italic');
  doc.setTextColor(150);
  doc.text("Thank you for choosing Tithi Packers & Movers!", pageWidth / 2, pageHeight - 10, { align: "center" });

  // Save PDF
  doc.save(`Invoice_${b.name}_${Date.now()}.pdf`);
}