// scripts/csv2json.js
const fs = require("fs");
const path = require("path");

function csvToJson(csvString) {
  const lines = csvString.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map(line => {
    const values = line.split(",");
    const entry = {};
    headers.forEach((h, i) => {
      let key = h.trim();
      if (key.toLowerCase().includes("region")) {
        key = "region";
      }
      let val = values[i] ? values[i].trim() : "";
      entry[key] = isNaN(val) || val === "" ? val : Number(val);
    });
    return entry;
  });
}

if (process.argv.length < 5) {
  console.error("Usage: node scripts/csv2json.js <input.csv> <output.json> <sourceURL>");
  process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const source = process.argv[4];

try {
  const csvData = fs.readFileSync(path.resolve(inputFile), "utf8");
  const jsonData = csvToJson(csvData);

  const finalOutput = {
    metadata: {
      source: source,
      convertedAt: new Date().toISOString()
    },
    data: jsonData
  };

  fs.writeFileSync(path.resolve(outputFile), JSON.stringify(finalOutput, null, 2));
  console.log(`✅ JSON saved to ${outputFile}`);
} catch (err) {
  console.error("❌ Error:", err.message);
}