import type { Question } from "@/types/question";

const BASE_QUESTIONS: Omit<Question, "id" | "blockId">[] = [
  {
    stem: "A patient presents with acute chest discomfort and dyspnea during exertion. Which diagnosis should be ruled out first in a high-risk setting?",
    choices: [
      { label: "A", text: "Gastroesophageal reflux disease" },
      { label: "B", text: "Acute coronary syndrome" },
      { label: "C", text: "Panic disorder" },
      { label: "D", text: "Costochondritis" },
    ],
    correctAnswer: "B",
    explanation:
      "Potentially life-threatening causes such as acute coronary syndrome must be considered first.",
    educationalObjective:
      "Prioritize dangerous differentials when evaluating chest pain.",
    topic: "Cardiology",
    difficulty: "easy",
  },
  {
    stem: "A patient with fever, cough, and focal crackles has lobar consolidation on chest imaging. What is the most likely diagnosis?",
    choices: [
      { label: "A", text: "Viral bronchiolitis" },
      { label: "B", text: "Community-acquired pneumonia" },
      { label: "C", text: "Pulmonary embolism" },
      { label: "D", text: "Sarcoidosis" },
    ],
    correctAnswer: "B",
    explanation:
      "Fever with focal findings and lobar infiltrate supports bacterial community-acquired pneumonia.",
    educationalObjective:
      "Use clinical and imaging clues to diagnose common pulmonary infections.",
    topic: "Pulmonology",
    difficulty: "easy",
  },
  {
    stem: "A patient with diabetes has persistent hyperglycemia despite first-line therapy. Which management principle is most appropriate?",
    choices: [
      { label: "A", text: "Delay intensification for 12 months" },
      { label: "B", text: "Escalate therapy based on comorbid risk" },
      { label: "C", text: "Stop all oral medications" },
      { label: "D", text: "Treat only with diet changes forever" },
    ],
    correctAnswer: "B",
    explanation:
      "Escalation should be individualized based on glycemic control and comorbidity profile.",
    educationalObjective:
      "Apply risk-based therapeutic intensification in chronic disease management.",
    topic: "Endocrinology",
    difficulty: "medium",
  },
  {
    stem: "A hospitalized patient develops watery diarrhea after antibiotic exposure. What initial approach is most appropriate?",
    choices: [
      { label: "A", text: "Ignore symptoms unless severe dehydration occurs" },
      { label: "B", text: "Evaluate for C difficile and begin indicated therapy" },
      { label: "C", text: "Start antidiarrheal monotherapy immediately" },
      { label: "D", text: "Continue inciting antibiotic without reassessment" },
    ],
    correctAnswer: "B",
    explanation:
      "Recent antibiotic use with hospital-onset diarrhea should trigger evaluation and treatment for C difficile.",
    educationalObjective:
      "Identify and manage healthcare-associated infectious diarrhea.",
    topic: "Infectious Disease",
    difficulty: "medium",
  },
  {
    stem: "A patient reports sudden focal neurologic deficit that resolves within an hour. What does this most likely represent?",
    choices: [
      { label: "A", text: "Chronic tension headache" },
      { label: "B", text: "Transient ischemic attack" },
      { label: "C", text: "Mild dehydration" },
      { label: "D", text: "Seasonal allergy flare" },
    ],
    correctAnswer: "B",
    explanation:
      "Brief focal neurologic symptoms without persistent deficit are concerning for transient ischemic attack.",
    educationalObjective:
      "Recognize transient cerebrovascular events requiring urgent prevention.",
    topic: "Neurology",
    difficulty: "easy",
  },
];

const TOTAL_PLACEHOLDER_QUESTIONS = 300;

export const questions: Question[] = Array.from(
  { length: TOTAL_PLACEHOLDER_QUESTIONS },
  (_, index) => {
    const base = BASE_QUESTIONS[index % BASE_QUESTIONS.length];
    const blockNumber = Math.floor(index / 50) + 1;

    return {
      ...base,
      id: `q-${String(index + 1).padStart(4, "0")}`,
      blockId: `placeholder-block-${String(blockNumber).padStart(2, "0")}`,
      stem: `${base.stem} (Placeholder #${index + 1})`,
    };
  },
);
