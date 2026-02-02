const fs = require("fs");


const rawText = fs.readFileSync("sample_input.txt", "utf-8");


const unique = (array) => [...new Set(array)];


const results = {
  emails: [],
  urls: [],
  phoneNumbers: [],
  creditCards: [],
  times: []
};


const emailRegex =
  /\b[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b/g;

const emails = rawText.match(emailRegex) || [];
results.emails = unique(emails);


const urlRegex =
  /\bhttps?:\/\/[^\s<>"]+/g;

const urls = rawText.match(urlRegex) || [];
results.urls = unique(urls);


const phoneRegex =
  /\b(\(\d{3}\)\s?|\d{3}[-.])\d{3}[-.]\d{4}\b/g;

const phones = rawText.match(phoneRegex) || [];
results.phoneNumbers = unique(phones);

const creditCardRegex =
  /\b\d{4}([ -])\d{4}\1\d{4}\1\d{4}\b/g;

const maskCard = (card) =>
  card.replace(/\d(?=\d{4})/g, "*");

const cards = rawText.match(creditCardRegex) || [];
results.creditCards = unique(cards.map(maskCard));

const timeRegex =
  /\b([01]?\d|2[0-3]):[0-5]\d\b|\b(1[0-2]|[1-9]):[0-5]\d\s?(AM|PM)\b/gi;

const times = rawText.match(timeRegex) || [];
results.times = unique(times);

fs.writeFileSync(
  "sample_output.json",
  JSON.stringify(results, null, 2)
);

console.log("Extraction complete. Output saved to sample_output.json");
