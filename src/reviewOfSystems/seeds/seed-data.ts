import { ANSWER_TYPE, QuestionType, TemplateType } from "src/lib/constants";

//templates
export const TEMPLATE_NAMES = [
  {
    title: "COVID-19 Symptoms May 2020",
    templateType: TemplateType.HPI
  }
]

//section Names
const UPPER_RESPIRATORY_SYSTEMS = 'Upper Respiratory Systems'

//questions
const COVID_19_SYMPTOMS_SIGNS = 'COVID-19 Signs and Symptoms'
const CONTACTS_EXPOSURE = 'Contacts and Exposure'
const QUALITY = 'Quality'
const SEVERITY = 'Severity'
const DURATION = 'Duration'
const ONSET_TIMING = "Onset/Timing"
const CONTEXT = "Context"
const ASSOCIATED_SYMPTOMS = "Associated Symptoms"
const PRIOR_LABS_IMAGING = "Prior Labs and Imaging"
const SUITABILITY_OF_RESIDENTIAL_SETTING = "Suitability of residential setting"

//answers
const COUGH_RESOLVED = "cough resolved"
const FEVER_RESOLVED = "fever resolved"
const SHORTNESS_OF_BIRTH_RESOLVED = "shortness of breath resolved"
const REPEATED_SHAKING_RESOLVED = "repeated shaking with chills resolved"
const MUSCLE_PAIN_RESOLVED = "muscle pain resolved"
const HEADACHE_RESOLVED = "headache resolved"
const SORE_THROAT_RESOLVED = "sore throat resolved"
const LOSS_OF_TASTE_RESOLVED = "loss of taste or smell resolved"
const VOMITING_RESOLVED = "vomiting or diarrhea resolved"
const FATIGUE_RESOLVED = "fatigue resolved"
const ANOREXIA_RESOLVED = "anorexia resolved"
const COUGH_IMPROVING = "cough improving"
const COUGH_SAME = "cough same"
const FEVER_IMPROVING = "fever improving"
const FEVER_SAME = "fever same"
const SHORTNESS_OF_BIRTH_IMPROVING = "shortness of breath improving"
const SHORTNESS_OF_BIRTH_SAME = "shortness of breath same"
const CHILLS_IMPROVING = "chills improving"
const CHILLS_SAME = "chills same"
const REPEATED_SHAKING_IMPROVING = "repeated shaking with chills improving"
const REPEATED_SHAKING_SAME = "repeated shaking with chills same"
const MUSCLE_PAIN_IMPROVING = "muscle pain improving"
const MUSCLE_PAIN_SAME = "muscle pain same"
const HEADACHE_IMPROVING = "headache improving"
const HEADACHE_SAME = "headache same"
const SORE_THROAT_IMPROVING = "sore throat improving"
const SORE_THROAT_SAME = "sore throat same"
const VOMITING_IMPROVING = "vomiting or diarrhea improving"
const VOMITING_SAME = "vomiting or diarrhea same"
const FATIGUE_IMPROVING = "fatigue improving"
const FATIGUE_SAME = "fatigue same"
const ANOREXIA_IMPROVING = "anorexia improving"
const ANOREXIA_SAME = "anorexia same"
const COUGH_WORSENING = "cough worsening"
const FEVER_WORSENING = "fever worsening"
const SHORTNESS_OF_BIRTH_WORSENING = "shortness of breath worsening"
const REPEATED_SHAKING_WORSENING = "repeated shaking with chills worsening"
const MUSCLE_PAIN_WORSENING = "muscle pain worsening"
const HEADACHE_WORSENING = "headache worsening"
const SORE_THROAT_WORSENING = "sore throat worsening"
const LOSS_OF_TASTE_WORSENING = "loss of taste or smell worsening"
const VOMITING_WORSENING = "vomiting or diarrhea worsening"
const FATIGUE_WORSENING = "fatigue worsening"
const ANOREXIA_WORSENING = "anorexia worsening"
const CLOSE_CONTACT = "close contact with a confirmed or suspected case of COVID-19"
const CLOSE_PROXIMITY = "close proximity with person with COVID-19"
const HEALTHCARE_EXPOSURE = "healthcare-associated exposure"
const PERSON_LIVES = "lives in the same household as a person with COVID-19"
const HEALTHCARE_PERSONAL = "patient is healthcare personnel"
const SPECIFIC_SETTING_EXPOSURE = "potential exposure in specific settings where COVID-19 cases have been reported"
const WIDESPREAD_COMMUNITY_TRANSMISSION = "reside in or traveled to areas where widespread community transmission has been reported"
const PRODUCTIVE_COUGH = "productive cough"
const DRY_COUGH = "dry cough"
const WHEEZY_COUGH = "wheezy cough"
const NO_PAIN = "no pain"
const MILD = "mild"
const MODERATE = "moderate"
const SEVERE = "Severe"
const PAIN_LEVEL = "pain level fill/10"
const IMPROVING = "improving"
const WORSENING = "worsening"
const UNCHANGED = "unchanged"
const CANNOT_IDENTIFY = "cannot Identify"
const SYMPTOMS_LASTING = "symptoms lasting fill days"
const DATE_OF_ONSET = "date of symptoms onset"
const ALLERGIES = "allergies"
const ASTHMA = "asthma"
const CHRONIC_BRONCHITIS = "chronic bronchitis"
const COPD = "COPD"
const NO_SPUTUM_PRODUCTION = "no sputum production"
const NO_WHEEZING = "no wheezing"
const NO_RUNNY_NOSE = "no runny nose"
const NO_VOMITING = "no vomiting"
const NO_DIARRHEA = "no diarrhea"
const NO_BODY_ACHES = "no body aches"
const NO_NAUSEA = "no nausea"
const NO_CHANGE_MENTAL = "no change in mental status"
const NO_HYPERTENSION = "no hypotension"
const NO_TACHYCARDIA = "no tachycardia"
const CHEST_PAIN = "chest pain"
const YELLOW_GREEN_SPUTUM = "yellow-green, thick sputum"
const RUST_COLORED_SPUTUM = "rust colored sputum"
const GREEN_SPUTUM = "green sputum"
const YELLOW_SPUTUM = "yellow sputum"
const BLOOD_STREAKED_SPUTUM = "blood-streaked sputum"
const WHEEZING = "wheezing"
const CYANOSIS = "cyanosis"
const FATIGUE = "fatigue"
const SWEATS = "sweats"
const VOMITING = "vomiting"
const DIARRHEA = "diarrhea"
const NAUSEA = "nausea"
const RUNNY_NOSE = "runny nose"
const BODY_ACHES = "body aches"
const CHANGE_IN_MENTAL_STATUS = "change in mental status"
const HYPOTENSION = "hypotension"
const TACHYCARDIA = "tachycardia"
const COVID_19_SWAB = "COVID-19 nasopharyngeal swab"
const CHEST_CT_SCAN = "chest CT scan"
const CHEST_RADIOGRAPH = "chest radiograph"
const CHEST_ULTRASOUND = "chest ultrasound"
const CAREGIVER_AT_HOME = "patient fill have caregiver at home"
const FACE_MASKS_AVAILABLE = "patient fill have gloves and face masks available"
const HOUSEHOLD_COMPLICATIONS = "patient fill have members of the household at increased risk of complications"
const ACCESS_FOOD = "patient fill have resources to access food and other necessities"
const BEDROOM_AND_BATHROOM = "patient fill have separate bedroom and bathroom for patient"
const ETIQUETTE_PRACTICES = "patient fill able to adhere to hand hygiene and cough etiquette practices"


export const TEMPLATE_SECTIONS = [
  {
    templateName: TEMPLATE_NAMES[0].title,
    sections: [UPPER_RESPIRATORY_SYSTEMS]
  }
]

export const SECTIONS_QUESTIONS = [
  {
    sectionName: UPPER_RESPIRATORY_SYSTEMS,
    questions: [
      COVID_19_SYMPTOMS_SIGNS,
      CONTACTS_EXPOSURE,
      QUALITY,
      SEVERITY,
      DURATION,
      ONSET_TIMING,
      CONTEXT,
      ASSOCIATED_SYMPTOMS,
      PRIOR_LABS_IMAGING,
      SUITABILITY_OF_RESIDENTIAL_SETTING
    ]
  }
]

const DOES_OPTIONS_MAPPED = [
  { id: "DOES", name: "does" },
  { id: "DOES_NOT", name: "does not" },
]

export const QUESTION_ANSWERS = [
  {
    questionTitle: COVID_19_SYMPTOMS_SIGNS,
    answers: [
      {
        title: COUGH_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: FEVER_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: SHORTNESS_OF_BIRTH_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: REPEATED_SHAKING_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: MUSCLE_PAIN_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: HEADACHE_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: SORE_THROAT_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: LOSS_OF_TASTE_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: VOMITING_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: FATIGUE_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: ANOREXIA_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: COUGH_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: COUGH_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: FEVER_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: FEVER_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: SHORTNESS_OF_BIRTH_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: SHORTNESS_OF_BIRTH_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: CHILLS_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: CHILLS_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: REPEATED_SHAKING_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: REPEATED_SHAKING_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: MUSCLE_PAIN_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: MUSCLE_PAIN_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: HEADACHE_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: HEADACHE_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: SORE_THROAT_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: SORE_THROAT_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: VOMITING_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: VOMITING_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: FATIGUE_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: FATIGUE_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: ANOREXIA_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: ANOREXIA_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: COUGH_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: FEVER_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: SHORTNESS_OF_BIRTH_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: REPEATED_SHAKING_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: MUSCLE_PAIN_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: HEADACHE_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: SORE_THROAT_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: LOSS_OF_TASTE_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: VOMITING_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: FATIGUE_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: ANOREXIA_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
    ]
  },
  {
    questionTitle: CONTACTS_EXPOSURE,
    answers: [
      {
        title: CLOSE_CONTACT,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: CLOSE_PROXIMITY,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: HEALTHCARE_EXPOSURE,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: PERSON_LIVES,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: HEALTHCARE_PERSONAL,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: SPECIFIC_SETTING_EXPOSURE,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: WIDESPREAD_COMMUNITY_TRANSMISSION,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    questionTitle: QUALITY,
    answers: [
      {
        title: PRODUCTIVE_COUGH,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: DRY_COUGH,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: WHEEZY_COUGH,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
    ]
  },
  {
    questionTitle: SEVERITY,
    answers: [
      {
        title: NO_PAIN,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: MILD,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: MODERATE,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: PAIN_LEVEL,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.NUMBER
      },
      {
        title: SEVERE,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: WORSENING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: UNCHANGED,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    questionTitle: DURATION,
    answers: [
      {
        title: CANNOT_IDENTIFY,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: SYMPTOMS_LASTING,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.NUMBER
      },
    ]
  },
  {
    questionTitle: ONSET_TIMING,
    answers: [
      {
        title: CANNOT_IDENTIFY,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: DATE_OF_ONSET,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    questionTitle: CONTEXT,
    answers: [
      {
        title: ALLERGIES,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: ASTHMA,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: CHRONIC_BRONCHITIS,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: COPD,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    questionTitle: ASSOCIATED_SYMPTOMS,
    answers: [
      {
        title: NO_SPUTUM_PRODUCTION,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: NO_WHEEZING,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: NO_RUNNY_NOSE,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: NO_VOMITING,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: NO_DIARRHEA,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: NO_BODY_ACHES,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: NO_NAUSEA,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: NO_CHANGE_MENTAL,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: NO_HYPERTENSION,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: NO_TACHYCARDIA,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        title: CHEST_PAIN,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: YELLOW_GREEN_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: RUST_COLORED_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: GREEN_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: YELLOW_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: BLOOD_STREAKED_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: WHEEZING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: CYANOSIS,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: FATIGUE,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: SWEATS,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: VOMITING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: DIARRHEA,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: NAUSEA,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: RUNNY_NOSE,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: BODY_ACHES,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: CHANGE_IN_MENTAL_STATUS,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: HYPOTENSION,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        title: TACHYCARDIA,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
    ]
  },
  {
    questionTitle: PRIOR_LABS_IMAGING,
    answers: [
      {
        title: COVID_19_SWAB,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: CHEST_CT_SCAN,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: CHEST_RADIOGRAPH,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: CHEST_ULTRASOUND,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    questionTitle: SUITABILITY_OF_RESIDENTIAL_SETTING,
    answers: [
      {
        title: CAREGIVER_AT_HOME,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED
      },
      {
        title: FACE_MASKS_AVAILABLE,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED
      },
      {
        title: HOUSEHOLD_COMPLICATIONS,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED
      },
      {
        title: ACCESS_FOOD,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED
      },
      {
        title: BEDROOM_AND_BATHROOM,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED
      },
      {
        title: ETIQUETTE_PRACTICES,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED
      },
    ]
  },
]