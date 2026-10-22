export type ScreeningInput = {
  companyStatus?: string; employees?: string; country?: string; english?: string;
  documentation?: string; workflows?: string; communications?: string;
  systems?: string[]; rights?: string;
};
const defunct = new Set(["United States","United Kingdom","Canada","India","Australia","Singapore","Ireland","Netherlands","Germany","France"]);
const western = new Set(["United States","United Kingdom","Canada","Australia","Ireland","Netherlands","Germany","France"]);
export function assessCompany(f: ScreeningInput) {
  const blockers: string[] = [], checks: string[] = [];
  const closed = f.companyStatus === "closed";
  const size = f.employees || "";
  const small = ["1–10","11–24"].includes(size);
  if (size === "Prefer not to say" || !size) checks.push("Employee count needs confirmation.");
  else if (closed && small) blockers.push("Defunct-company program lists a minimum historic size of 25+ employees.");
  else if (closed && size === "25–29") checks.push("The defunct listing shows 25+ in the summary but 30+ in detailed requirements. Manual confirmation is needed.");
  else if (!closed && (small || size === "25–29")) blockers.push("Enterprise opportunities typically require at least 30 employees.");
  if (f.english === "No") blockers.push("The programs currently seek predominantly English-language business records.");
  else if (f.english !== "Yes") checks.push("English-language data coverage requires confirmation.");
  if (f.rights === "No / restricted") blockers.push("Your company currently lacks authority to explore data licensing.");
  else if (f.rights !== "Yes, subject to review") checks.push("Data licensing authority or permission is not yet confirmed.");
  if (closed) {
    if (!defunct.has(f.country || "")) blockers.push("The defunct-company opportunity currently lists specific countries.");
    if (!["Substantial","Extensive"].includes(f.communications || "") || !(f.systems || []).some(s => ["Slack","Microsoft Teams"].includes(s))) blockers.push("Substantial Slack or Microsoft Teams history is required for the defunct opportunity.");
  } else {
    if (!western.has(f.country || "")) checks.push("Opportunities often prioritize the United States and other Western markets.");
    if (f.documentation === "Very little") blockers.push("The enterprise program expects substantial established documentation.");
    else if (f.documentation !== "Strong / established") checks.push("The depth of the documentation requires review.");
    if (f.workflows === "No") blockers.push("Repeatable, mature operational workflows are required.");
    else if (f.workflows !== "Yes") checks.push("Defined repeatable workflows need confirmation.");
  }
  const status = blockers.length ? "unlikely" : checks.length ? "review" : "likely";
  const label = status === "likely" ? "Potential preliminary match" : status === "review" ? "Additional review needed" : "Not a standard match";
  return {status, label, blockers, checks, program: closed ? "Defunct Company Data Partnership" : "Enterprise Data Partnership"};
}
