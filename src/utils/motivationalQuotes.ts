export const motivationalQuotes = [
  "Today is your opportunity to build the tomorrow you want.",
  "Small progress is still progress.",
  "You are capable of more than you know.",
  "Every day is a new beginning.",
  "Focus on progress, not perfection.",
  "Your only limit is your mind.",
  "Dream it. Wish it. Do it.",
  "Great things never come from comfort zones.",
  "Don't wait for opportunity. Create it.",
  "Success is the sum of small efforts repeated day after day.",
  "Believe you can and you're halfway there.",
  "The future depends on what you do today."
];

export const getRandomQuote = (): string => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};