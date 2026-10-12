// Single source of truth for the instrument. Question IDs are STABLE: never rename after data collection starts.
export const VERSION = "1.0";

export const S = {
  imp: ["Not important at all", "Slightly important", "Moderately important", "Very important", "Extremely important"],
  sat: ["Very dissatisfied", "Dissatisfied", "Neither satisfied nor dissatisfied", "Satisfied", "Very satisfied"],
  lik: ["Very unlikely", "Unlikely", "Neither likely nor unlikely", "Likely", "Very likely"],
  agr: ["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"],
  cnd: ["Greatly reduce my interest", "Somewhat reduce my interest", "Make no difference", "Somewhat increase my interest", "Greatly increase my interest"],
  opt: ["Very pessimistic", "Pessimistic", "Neither optimistic nor pessimistic", "Optimistic", "Very optimistic"],
};

export const DIMS = [
  ["career", "Career opportunities"],
  ["salary", "Salary and income potential"],
  ["education", "Quality of education"],
  ["research", "Research opportunities"],
  ["entrepreneurship", "Opportunities to start a business"],
  ["infrastructure", "Infrastructure (transport, housing, digital)"],
  ["healthcare", "Healthcare"],
  ["safety", "Public safety"],
  ["worklife", "Work–life balance"],
  ["socialmobility", "Social mobility"],
  ["econstability", "Economic stability"],
  ["environment", "Environmental quality"],
  ["governance", "Government effectiveness"],
  ["youth", "Opportunities for young people"],
];

// Contextual item: wording varies by stream, the construct (field_opportunity) is identical for everyone.
export const FIELD = {
  cs_it: "Career opportunities in India's technology sector (software, AI, data)",
  engineering: "Career opportunities in your engineering field in India",
  medicine: "Medical education and postgraduate training opportunities in India",
  commerce: "Economic and professional opportunities in your field in India",
  sciences: "Research opportunities in your scientific field in India",
  default: "Career opportunities in your field of study in India",
};

const L = (s) => s.split("|").map((x) => [x, x]);

export const STATES = "Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chhattisgarh|Goa|Gujarat|Haryana|Himachal Pradesh|Jharkhand|Karnataka|Kerala|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Odisha|Punjab|Rajasthan|Sikkim|Tamil Nadu|Telangana|Tripura|Uttar Pradesh|Uttarakhand|West Bengal|Delhi|Jammu and Kashmir|Ladakh|Chandigarh|Puducherry|Other UT (Andaman, Lakshadweep, DNH&DD)";

export const STREAMS = [
  ["cs_it", "Computer Science / IT"],
  ["engineering", "Engineering (other)"],
  ["medicine", "Medicine / Health sciences"],
  ["commerce", "Commerce / Management / Economics"],
  ["sciences", "Natural / Physical sciences"],
  ["humanities", "Humanities / Social sciences"],
  ["law", "Law"],
  ["arts_design", "Arts / Design / Architecture"],
  ["other", "Other"],
];

const YN = L("Yes|No|Prefer not to say");

export const PROFILE = [
  { id: "age", t: "Age (years)", k: "num" },
  { id: "gender", t: "Gender", k: "sel", o: L("Woman|Man|Non-binary / other|Prefer not to say") },
  { id: "state", t: "State / Union Territory where you mainly live", k: "sel", o: L(STATES) },
  { id: "college_type", t: "Type of college", k: "sel", o: L("Central / State public university|Private university|Deemed university|Institute of national importance (IIT/NIT/IIIT etc.)|Affiliated / autonomous college|Other") },
  { id: "college_name", t: "College name (optional)", k: "text", opt: 1 },
  { id: "degree", t: "Degree / course (e.g. B.Tech, MBBS, B.Com, MA)", k: "text" },
  { id: "stream", t: "Academic stream", k: "sel", o: STREAMS },
  { id: "year", t: "Current year of study", k: "sel", o: L("1|2|3|4|5 or above") },
  { id: "level", t: "Level of study", k: "sel", o: L("Undergraduate|Postgraduate|Other") },
  { id: "studied_abroad", t: "Have you previously studied abroad?", k: "sel", o: YN },
  { id: "relatives_abroad", t: "Do you have close family or relatives living abroad?", k: "sel", o: YN },
  { id: "considering_study_abroad", t: "Are you currently considering studying abroad?", k: "sel", o: L("Yes|No|Undecided") },
];

export const ABROAD = [
  ["career", "Better career opportunities"],
  ["salary", "Higher salaries"],
  ["working_conditions", "Better working conditions"],
  ["education", "Better education"],
  ["research", "Better research opportunities"],
  ["quality_of_life", "Quality of life"],
  ["infrastructure", "Infrastructure"],
  ["safety", "Public safety"],
  ["healthcare", "Healthcare"],
  ["worklife", "Work–life balance"],
  ["economic_stability", "Economic stability"],
  ["social_environment", "Social environment"],
  ["international_exposure", "International exposure"],
  ["entrepreneurship", "Entrepreneurship opportunities"],
  ["family_connections", "Family or social connections abroad"],
  ["peer_influence", "Plans of friends or peers"],
  ["other", "Other (please specify below)"],
  ["no_intention", "I do not intend to study or work abroad"],
];

export const STAY = [
  ["family_proximity", "Being close to family"],
  ["cultural_belonging", "Cultural and social belonging"],
  ["growing_opportunities", "Growing opportunities in India"],
  ["cost_of_living", "Cost of living"],
  ["entrepreneurship_ecosystem", "Entrepreneurship ecosystem"],
  ["contribute", "Desire to contribute to India's development"],
  ["social_networks", "Friendships and social networks"],
  ["familiarity", "Comfort and familiarity with life in India"],
  ["other", "Other (please specify below)"],
  ["no_preference", "No particular reason / undecided"],
];

export function build(p = {}) {
  const f = FIELD[p.stream] || FIELD.default;
  const D = [...DIMS, ["field", f]];
  const sc = (pre, suf, s) => D.map(([i, t]) => ({
    id: `${pre}_${i}`,
    c: i === "field" ? `field_opportunity_${suf}` : `${i}_${suf}`,
    t,
    k: "scale",
    s,
  }));
  const mig = (id, c, t, s = "lik") => ({ id, c, t, k: "scale", s });

  return [
    {
      id: "B",
      title: "Expectations from India",
      sub: "How important is each of the following to your ideal vision for India's future?",
      qs: sc("imp", "importance", "imp"),
    },
    {
      id: "C",
      title: "Satisfaction with current conditions",
      sub: "How satisfied are you with the current state of each of the following in India?",
      qs: sc("sat", "satisfaction", "sat"),
    },
    {
      id: "D",
      title: "Study, work and migration intentions",
      sub: "There are no right or wrong answers. Please respond based on your current thinking.",
      qs: [
        mig("mig_study", "study_abroad_intention", "How likely are you to pursue higher education outside India in the next five years?"),
        mig("mig_return", "return_intention", "If you were to study abroad, how likely would you be to return to India afterwards?"),
        mig("mig_work_temp", "temporary_migration_intention", "How likely are you to work outside India for a temporary period, with the intention of returning?"),
        mig("mig_settle", "permanent_settlement_intention", "How likely are you to settle outside India permanently?"),
        mig("mig_stay", "stay_intention", "How likely are you to build your long-term career in India?"),
        {
          id: "mig_plan",
          c: "migration_intention",
          k: "single",
          t: "Which of the following best describes your current thinking about your future?",
          o: [
            ["stay_india", "I intend to build my future in India"],
            ["study_return", "I would consider studying abroad and then returning to India"],
            ["work_temp", "I would consider working abroad temporarily and then returning"],
            ["settle_abroad", "I would consider settling abroad permanently"],
            ["undecided", "I am undecided"],
            ["not_considered", "I have not considered moving abroad"],
          ],
        },
        mig("mig_conditional", "conditional_migration", "If the factors that matter most to you were substantially improved in India, how would that affect your interest in studying or working abroad?", "cnd"),
      ],
    },
    {
      id: "E",
      title: "Reasons and influences",
      sub: "What shapes your thinking about the future?",
      qs: [
        {
          id: "reasons_abroad",
          c: "migration_reasons",
          k: "multi",
          x: "no_intention",
          t: "Which factors, if any, would make studying or working abroad attractive to you? Select all that apply.",
          o: ABROAD,
        },
        {
          id: "reasons_stay",
          c: "stay_reasons",
          k: "multi",
          x: "no_preference",
          t: "Which factors, if any, support building your future in India? Select all that apply.",
          o: STAY,
        },
        {
          id: "reasons_other",
          c: "reasons_other_text",
          k: "text1",
          opt: 1,
          t: "If you selected \"Other\" above, please specify (optional).",
        },
        {
          id: "influence_family",
          c: "family_influence",
          k: "scale",
          s: "agr",
          t: "My family's preferences influence my decisions about studying or working abroad.",
        },
        {
          id: "influence_peers",
          c: "peer_influence",
          k: "scale",
          s: "agr",
          t: "The plans of my friends or classmates influence my own thinking about studying or working abroad.",
        },
      ],
    },
    {
      id: "F",
      title: "Vision for India's future",
      sub: "What do you want India to become?",
      qs: [
        {
          id: "vision_priorities",
          c: "national_aspiration_priorities",
          k: "multi",
          max: 3,
          t: "Which three areas do you most want India to strengthen over the next 10 years? Select up to three.",
          o: DIMS,
        },
        {
          id: "vision_optimism",
          c: "national_optimism",
          k: "scale",
          s: "opt",
          t: "How optimistic are you about India's prospects for young people over the next 10 years?",
        },
        {
          id: "vision_changes",
          c: "vision_open_response",
          k: "text3",
          t: "What are the three most important changes you would like to see in India over the next 10 years?",
        },
      ],
    },
  ];
}

// Codebook of every survey question (default wording for the contextual item)
export const allQuestions = () => build({}).flatMap((s) => s.qs.map((q) => ({ ...q, section: s.id })));
