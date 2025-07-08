export function splitIntoSections(text) {
  const sections = {};
  const regex = /##\s*\d+\.\s*(.+)\n([\s\S]*?)(?=##\s*\d+\.|$)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const title = match[1].trim();     // "Overview"
    const content = match[2].trim();   // content under that section
    sections[title] = content;
  }
  return sections;
}
