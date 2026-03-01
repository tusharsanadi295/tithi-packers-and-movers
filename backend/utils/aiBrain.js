export function getAIResponse(userMsg, session) {
  userMsg = userMsg.toLowerCase();

  // GREETING
  if (userMsg.includes("hi") || userMsg.includes("hello")) {
    return "Hello 👋 Welcome to Tithi Packers & Movers. How can I help you today?";
  }

  // ABOUT COMPANY
  if (userMsg.includes("about") || userMsg.includes("company")) {
    return "Tithi Packers & Movers provides professional packing, moving and relocation services across Gujarat and India.";
  }

  // SERVICES INFO
  if (userMsg.includes("service")) {
    return "We provide House Shifting, Office Relocation, Local Moving, Intercity Moving and Storage services.";
  }

  // START BOOKING MODE
  if (userMsg.includes("book") || userMsg.includes("shift") || userMsg.includes("moving")) {
    session.mode = "BOOKING";
    return "Great 👍 Which service do you need? (House / Office / Local / Intercity)";
  }

  // DEFAULT FALLBACK
  return "Sorry, I didn’t understand. You can ask about services, price, booking or company details.";
}
