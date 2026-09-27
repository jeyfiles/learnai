// Draws the Level 1 certificate as an SVG string. Pure: the page supplies the name, date and fonts.
// The same SVG is shown on screen, printed, and turned into a PNG for download.

export const CERT_W = 1600;
export const CERT_H = 1131; // A4 landscape proportions

const MARK = 'M0.2423203125 0.4807734375V-2.0082421875Q1.006453125 -2.0082421875 1.50890625 -2.10346875Q2.011359375 -2.1986953125 2.292779296875 -2.454955078125Q2.57419921875 -2.71121484375 2.69419921875 -3.20012109375Q2.8141992187500002 -3.6890273437500003 2.8141992187500002 -4.45238671875V-19.44H6.332109375V-4.33006640625Q6.332109375 -2.69961328125 5.953529296875001 -1.63161328125Q5.5749492187500005 -0.56361328125 4.6257890625 -0.04141992187499999Q3.67662890625 0.4807734375 1.9470820312500001 0.4807734375ZM9.380906249999999 0.0V-19.44H12.887203125V0.0Z';

export function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

/** Cleans a typed name: trims, joins spaces, removes control characters, caps the length. */
export function cleanName(raw: string): string {
  return raw.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);
}

/** Returns an error message, or an empty string if the name can go on the certificate. */
export function checkName(raw: string): string {
  const n = cleanName(raw);
  if (n.length < 2) return 'Type your name as you want it to appear. Use at least two letters.';
  if (!/\p{L}/u.test(n)) return 'Your name needs at least one letter.';
  if (/[<>{}[\]\\/|@#$%^*=+~`_]/.test(n) || /\d/.test(n)) return 'Use letters, spaces, hyphens, full stops and apostrophes only.';
  return '';
}

/** Long names get a smaller font so they always fit on one line. */
export function nameSize(name: string): number {
  const n = [...name].length;
  return n <= 22 ? 104 : n <= 32 ? 84 : n <= 44 ? 66 : 52;
}

export function formatCertDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export interface CertOptions {
  name: string;
  date: string;          // Already formatted, for example "26 September 2026"
  levelTitle: string;    // "Foundations"
  lessonCount: number;
  fontCss?: string;      // Optional @font-face rules with embedded fonts (for the PNG download)
}

export function certificateSvg(o: CertOptions): string {
  const name = escapeXml(cleanName(o.name));
  const head = "Oswald, 'Arial Narrow', Arial, sans-serif";
  const body = "'Atkinson Hyperlegible Next', Verdana, Arial, sans-serif";
  const cx = CERT_W / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CERT_W} ${CERT_H}" width="${CERT_W}" height="${CERT_H}" role="img" aria-labelledby="cert-title cert-desc">
<title id="cert-title">Certificate of completion for ${name}</title>
<desc id="cert-desc">${name} completed Level 1: ${escapeXml(o.levelTitle)} of JeyInsights Learn AI on ${escapeXml(o.date)}.</desc>
${o.fontCss ? `<style>${o.fontCss}</style>` : ''}
<rect width="${CERT_W}" height="${CERT_H}" fill="#FBFAF6"/>
<rect x="40" y="40" width="${CERT_W - 80}" height="${CERT_H - 80}" fill="none" stroke="#52745F" stroke-width="6" rx="24"/>
<rect x="64" y="64" width="${CERT_W - 128}" height="${CERT_H - 128}" fill="none" stroke="#A9C1B1" stroke-width="2" rx="14"/>
<circle cx="${CERT_W - 40}" cy="40" r="210" fill="none" stroke="#E7EFE9" stroke-width="44"/>
<g transform="translate(${cx - 44} 118) scale(2)"><circle cx="22" cy="22" r="22" fill="#6F907B"/><path fill="#fff" transform="translate(15.44 31.48)" d="${MARK}"/></g>
<text x="${cx}" y="262" text-anchor="middle" font-family="${head}" font-size="40" fill="#1F2A24">JeyInsights Learn AI</text>
<text x="${cx}" y="370" text-anchor="middle" font-family="${body}" font-size="30" font-weight="700" letter-spacing="6" fill="#52745F">CERTIFICATE OF COMPLETION</text>
<text x="${cx}" y="450" text-anchor="middle" font-family="${body}" font-size="32" fill="#3B4A42">This is to certify that</text>
<text x="${cx}" y="${560 + (104 - nameSize(o.name)) / 3}" text-anchor="middle" font-family="${head}" font-size="${nameSize(o.name)}" font-weight="500" fill="#1F2A24">${name}</text>
<rect x="${cx - 260}" y="596" width="520" height="8" rx="4" fill="#E3A13A"/>
<text x="${cx}" y="680" text-anchor="middle" font-family="${body}" font-size="34" fill="#3B4A42">has completed</text>
<text x="${cx}" y="752" text-anchor="middle" font-family="${head}" font-size="58" fill="#3F6450">Level 1: ${escapeXml(o.levelTitle)}</text>
<text x="${cx}" y="820" text-anchor="middle" font-family="${body}" font-size="28" fill="#3B4A42">${o.lessonCount} hands-on lessons on asking AI tools clearly, checking their answers,</text>
<text x="${cx}" y="860" text-anchor="middle" font-family="${body}" font-size="28" fill="#3B4A42">using them responsibly and building a portfolio.</text>
<line x1="220" y1="920" x2="620" y2="920" stroke="#758A7D" stroke-width="2"/>
<text x="420" y="960" text-anchor="middle" font-family="${body}" font-size="26" font-weight="700" fill="#1F2A24">${escapeXml(o.date)}</text>
<text x="420" y="994" text-anchor="middle" font-family="${body}" font-size="22" fill="#5B6A61">Date</text>
<line x1="980" y1="920" x2="1380" y2="920" stroke="#758A7D" stroke-width="2"/>
<text x="1180" y="960" text-anchor="middle" font-family="${body}" font-size="26" font-weight="700" fill="#1F2A24">jeyinsights.com/learnai</text>
<text x="1180" y="994" text-anchor="middle" font-family="${body}" font-size="22" fill="#5B6A61">Issued by JeyInsights Learn AI</text>
<text x="${cx}" y="1040" text-anchor="middle" font-family="${body}" font-size="20" fill="#5B6A61">Self-paced course. Completion was recorded by the learner.</text>
</svg>`;
}
