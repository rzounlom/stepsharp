import type { Question } from "@/types/question";

export const questions: Question[] = [
  {
    id: "q-001",
    blockId: "cardio-01",
    stem: "A 63-year-old man presents with crushing substernal chest pain for 45 minutes. ECG shows ST-segment elevations in leads II, III, and aVF. Which coronary artery is most likely occluded?",
    choices: [
      { label: "A", text: "Left anterior descending artery" },
      { label: "B", text: "Right coronary artery" },
      { label: "C", text: "Left circumflex artery" },
      { label: "D", text: "Posterior descending artery" },
    ],
    correctAnswer: "B",
    explanation:
      "Inferior STEMI (II, III, aVF) is most commonly due to right coronary artery occlusion.",
    educationalObjective:
      "Recognize ECG territory patterns to localize culprit vessels in acute MI.",
    topic: "Cardiology",
    difficulty: "easy",
  },
  {
    id: "q-002",
    blockId: "cardio-01",
    stem: "A 72-year-old woman with atrial fibrillation suddenly develops painful left leg pallor and absent distal pulses. What is the best next step?",
    choices: [
      { label: "A", text: "Compression ultrasound of leg veins" },
      { label: "B", text: "Start heparin and urgent vascular consultation" },
      { label: "C", text: "Immediate high-dose statin therapy only" },
      { label: "D", text: "Observe and reassess in 24 hours" },
    ],
    correctAnswer: "B",
    explanation:
      "Acute limb ischemia from embolus requires immediate anticoagulation and urgent revascularization planning.",
    educationalObjective:
      "Identify acute arterial occlusion and prioritize time-sensitive intervention.",
    topic: "Cardiology",
    difficulty: "medium",
  },
  {
    id: "q-003",
    blockId: "pulm-01",
    stem: "A 24-year-old woman has recurrent wheezing and nighttime cough twice weekly. FEV1 is 85% predicted between episodes. Which maintenance therapy is most appropriate?",
    choices: [
      { label: "A", text: "Daily oral prednisone" },
      { label: "B", text: "Short-acting beta agonist only" },
      { label: "C", text: "Low-dose inhaled corticosteroid" },
      { label: "D", text: "Long-acting muscarinic antagonist monotherapy" },
    ],
    correctAnswer: "C",
    explanation:
      "Persistent asthma symptoms warrant controller therapy, with low-dose inhaled corticosteroid as first-line treatment.",
    educationalObjective:
      "Choose evidence-based step therapy for persistent asthma control.",
    topic: "Pulmonology",
    difficulty: "easy",
  },
  {
    id: "q-004",
    blockId: "pulm-01",
    stem: "A 67-year-old smoker with COPD exacerbation has increased dyspnea and purulent sputum. Which finding most strongly supports giving antibiotics?",
    choices: [
      { label: "A", text: "Wheezing on auscultation" },
      { label: "B", text: "Productive cough with purulent sputum" },
      { label: "C", text: "Respiratory rate of 18/min" },
      { label: "D", text: "Mild hyperinflation on chest x-ray" },
    ],
    correctAnswer: "B",
    explanation:
      "Purulent sputum in COPD exacerbation suggests bacterial involvement and supports antibiotic therapy.",
    educationalObjective:
      "Apply exacerbation criteria to treatment decisions in COPD.",
    topic: "Pulmonology",
    difficulty: "medium",
  },
  {
    id: "q-005",
    blockId: "endo-01",
    stem: "A 34-year-old woman reports weight loss, palpitations, and heat intolerance. Labs show low TSH and high free T4. Which diagnosis is most likely?",
    choices: [
      { label: "A", text: "Primary hypothyroidism" },
      { label: "B", text: "Secondary hypothyroidism" },
      { label: "C", text: "Primary hyperthyroidism" },
      { label: "D", text: "Euthyroid sick syndrome" },
    ],
    correctAnswer: "C",
    explanation:
      "Low TSH with elevated free T4 indicates thyroid hormone excess from a primary thyroid source.",
    educationalObjective:
      "Interpret thyroid function tests to distinguish primary from central disorders.",
    topic: "Endocrinology",
    difficulty: "easy",
  },
  {
    id: "q-006",
    blockId: "endo-01",
    stem: "A patient with type 2 diabetes has persistent A1c elevation despite metformin. He has established ASCVD. Which medication class has proven cardiovascular benefit?",
    choices: [
      { label: "A", text: "Sulfonylureas" },
      { label: "B", text: "DPP-4 inhibitors" },
      { label: "C", text: "GLP-1 receptor agonists" },
      { label: "D", text: "Meglitinides" },
    ],
    correctAnswer: "C",
    explanation:
      "GLP-1 receptor agonists have demonstrated cardiovascular risk reduction in patients with type 2 diabetes and ASCVD.",
    educationalObjective:
      "Select glucose-lowering therapy based on comorbidity-driven outcome data.",
    topic: "Endocrinology",
    difficulty: "medium",
  },
  {
    id: "q-007",
    blockId: "id-01",
    stem: "A 29-year-old woman presents with dysuria and urinary frequency without flank pain or fever. Urinalysis shows leukocyte esterase and nitrites. Most likely diagnosis?",
    choices: [
      { label: "A", text: "Acute uncomplicated cystitis" },
      { label: "B", text: "Acute pyelonephritis" },
      { label: "C", text: "Interstitial nephritis" },
      { label: "D", text: "Nephrolithiasis" },
    ],
    correctAnswer: "A",
    explanation:
      "Lower urinary tract symptoms with positive nitrites and no systemic features indicate uncomplicated cystitis.",
    educationalObjective:
      "Distinguish uncomplicated cystitis from upper urinary tract infection.",
    topic: "Infectious Disease",
    difficulty: "easy",
  },
  {
    id: "q-008",
    blockId: "id-01",
    stem: "A hospitalized patient develops watery diarrhea after broad-spectrum antibiotics. Stool toxin assay is positive. What is first-line treatment?",
    choices: [
      { label: "A", text: "Loperamide only" },
      { label: "B", text: "Oral vancomycin" },
      { label: "C", text: "Metronidazole IV only" },
      { label: "D", text: "Immediate fecal transplant" },
    ],
    correctAnswer: "B",
    explanation:
      "Initial episodes of C difficile infection are treated with oral vancomycin in most current practice settings.",
    educationalObjective:
      "Choose guideline-concordant treatment for C difficile infection.",
    topic: "Infectious Disease",
    difficulty: "medium",
  },
  {
    id: "q-009",
    blockId: "neuro-01",
    stem: "A 58-year-old man develops sudden right arm weakness and aphasia lasting 20 minutes, now resolved. Brain CT is normal. What is the best description of this event?",
    choices: [
      { label: "A", text: "Complex migraine" },
      { label: "B", text: "Transient ischemic attack" },
      { label: "C", text: "Partial seizure" },
      { label: "D", text: "Subdural hematoma" },
    ],
    correctAnswer: "B",
    explanation:
      "Transient focal neurologic deficits without infarction on imaging are consistent with TIA.",
    educationalObjective:
      "Recognize high-risk transient neurologic events requiring urgent secondary prevention.",
    topic: "Neurology",
    difficulty: "easy",
  },
  {
    id: "q-010",
    blockId: "neuro-01",
    stem: "A 31-year-old woman has unilateral throbbing headache with photophobia and nausea, worsened by activity. Which acute therapy is most appropriate for moderate to severe attacks?",
    choices: [
      { label: "A", text: "Triptan at symptom onset" },
      { label: "B", text: "Daily beta blocker at attack onset" },
      { label: "C", text: "Oral antibiotic therapy" },
      { label: "D", text: "Lumbar puncture immediately" },
    ],
    correctAnswer: "A",
    explanation:
      "Triptans are effective acute treatment for moderate to severe migraine when no contraindication exists.",
    educationalObjective:
      "Differentiate acute migraine abortive therapy from preventive strategies.",
    topic: "Neurology",
    difficulty: "medium",
  },
];
