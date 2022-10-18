import { ANSWER_TYPE, QuestionType, TemplateQuestionType, TemplatesType, TemplateType } from "src/lib/constants";
import { SelectorType } from "src/socialHistory/payloads/questions.payload";

//template names

//section Names
const UPPER_RESPIRATORY_SYSTEMS = "Upper Respiratory Systems";
const UPPER_RESPIRATORY_SYMPTOMS = "Upper Respiratory Symptoms";
const GERIATRIC_INDEPENDENCE = "Geriatric independence";

//brief cardiology ROS

const CARDIO_BASIC = "Cardio Basic";
const CONSTITUTIONAL = "Constitutional";
const EYES = "Eyes";
const ENMT = "ENMT";
const RESPIRATORY = "Respiratory";
const MUSCULAOSKELETAL = "Musculoskeletal";
const NEUROLOGIC = "Neurologic";
const PSYCHIATRIC = "Psychiatric";
const HEMATOLOGIC_LYMPHATIC = "Hematologic/Lymphatic";

//questions
const COVID_19_SYMPTOMS_SIGNS = "COVID-19 Signs and Symptoms";
const CONTACTS_EXPOSURE = "Contacts and Exposure";
const QUALITY = "Quality";
const SEVERITY = "Severity";
const DURATION = "Duration";
const ONSET_TIMING = "Onset/Timing";
const CONTEXT = "Context";
const ASSOCIATED_SYMPTOMS = "Associated Symptoms";
const PRIOR_LABS_IMAGING = "Prior Labs and Imaging";
const SUITABILITY_OF_RESIDENTIAL_SETTING = "Suitability of residential setting";
const FALLING = "Falling";
const USE_OF_ASSISTIVE_DEVICES = "Use of assistive devices";
const ACTIVITIES_OF_DAILY_LIVING = "Activities of Daily Living";
const INSTRUMENTAL_ACTIVITIES_OF_DAILY_LIVING =
  "Instrumental activities of daily living";
const FUNCTIONAL_CAPACITY = "Functional capacity";
const SENSORY = "Sensory";
const EARS = "Ears"
const NOSE = "Nose"
const MOUTH_OR_ThROAT = "Mouth/Throat"
const PSYH = 'Psyh'

//cardio basic questions
const CARDIOVASCULAR_SYMPTOMS = "Cardiovascular Symptoms";

//march 2020 questions

//answers
const COUGH_RESOLVED = "cough resolved";
const FEVER_RESOLVED = "fever resolved";
const SHORTNESS_OF_BIRTH_RESOLVED = "shortness of breath resolved";
const REPEATED_SHAKING_RESOLVED = "repeated shaking with chills resolved";
const MUSCLE_PAIN_RESOLVED = "muscle pain resolved";
const HEADACHE_RESOLVED = "headache resolved";
const SORE_THROAT_RESOLVED = "sore throat resolved";
const LOSS_OF_TASTE_RESOLVED = "loss of taste or smell resolved";
const VOMITING_RESOLVED = "vomiting or diarrhea resolved";
const FATIGUE_RESOLVED = "fatigue resolved";
const ANOREXIA_RESOLVED = "anorexia resolved";
const COUGH_IMPROVING = "cough improving";
const COUGH_SAME = "cough same";
const FEVER_IMPROVING = "fever improving";
const FEVER_SAME = "fever same";
const SHORTNESS_OF_BIRTH_IMPROVING = "shortness of breath improving";
const SHORTNESS_OF_BIRTH_SAME = "shortness of breath same";
const CHILLS_IMPROVING = "chills improving";
const CHILLS_SAME = "chills same";
const REPEATED_SHAKING_IMPROVING = "repeated shaking with chills improving";
const REPEATED_SHAKING_SAME = "repeated shaking with chills same";
const MUSCLE_PAIN_IMPROVING = "muscle pain improving";
const MUSCLE_PAIN_SAME = "muscle pain same";
const HEADACHE_IMPROVING = "headache improving";
const HEADACHE_SAME = "headache same";
const SORE_THROAT_IMPROVING = "sore throat improving";
const SORE_THROAT_SAME = "sore throat same";
const VOMITING_IMPROVING = "vomiting or diarrhea improving";
const VOMITING_SAME = "vomiting or diarrhea same";
const FATIGUE_IMPROVING = "fatigue improving";
const FATIGUE_SAME = "fatigue same";
const ANOREXIA_IMPROVING = "anorexia improving";
const ANOREXIA_SAME = "anorexia same";
const COUGH_WORSENING = "cough worsening";
const FEVER_WORSENING = "fever worsening";
const SHORTNESS_OF_BIRTH_WORSENING = "shortness of breath worsening";
const REPEATED_SHAKING_WORSENING = "repeated shaking with chills worsening";
const MUSCLE_PAIN_WORSENING = "muscle pain worsening";
const HEADACHE_WORSENING = "headache worsening";
const SORE_THROAT_WORSENING = "sore throat worsening";
const LOSS_OF_TASTE_WORSENING = "loss of taste or smell worsening";
const VOMITING_WORSENING = "vomiting or diarrhea worsening";
const FATIGUE_WORSENING = "fatigue worsening";
const ANOREXIA_WORSENING = "anorexia worsening";
const CLOSE_CONTACT =
  "close contact with a confirmed or suspected case of COVID-19";
const CLOSE_PROXIMITY = "close proximity with person with COVID-19";
const HEALTHCARE_EXPOSURE = "healthcare-associated exposure";
const PERSON_LIVES = "lives in the same household as a person with COVID-19";
const HEALTHCARE_PERSONAL = "patient is healthcare personnel";
const SPECIFIC_SETTING_EXPOSURE =
  "potential exposure in specific settings where COVID-19 cases have been reported";
const WIDESPREAD_COMMUNITY_TRANSMISSION =
  "reside in or traveled to areas where widespread community transmission has been reported";
const PRODUCTIVE_COUGH = "productive cough";
const DRY_COUGH = "dry cough";
const WHEEZY_COUGH = "wheezy cough";
const NO_PAIN = "no pain";
const MILD = "mild";
const MODERATE = "moderate";
const SEVERE = "Severe";
const PAIN_LEVEL = "pain level fill/10";
const IMPROVING = "improving";
const WORSENING = "worsening";
const UNCHANGED = "unchanged";
const CANNOT_IDENTIFY = "cannot Identify";
const SYMPTOMS_LASTING = "symptoms lasting fill days";
const DATE_OF_ONSET = "date of symptoms onset";
const ALLERGIES = "allergies";
const ASTHMA = "asthma";
const CHRONIC_BRONCHITIS = "chronic bronchitis";
const COPD = "COPD";
const NO_SPUTUM_PRODUCTION = "no sputum production";
const NO_WHEEZING = "no wheezing";
const NO_RUNNY_NOSE = "no runny nose";
const NO_VOMITING = "no vomiting";
const NO_DIARRHEA = "no diarrhea";
const NO_BODY_ACHES = "no body aches";
const NO_NAUSEA = "no nausea";
const NO_CHANGE_MENTAL = "no change in mental status";
const NO_HYPERTENSION = "no hypotension";
const NO_TACHYCARDIA = "no tachycardia";
const CHEST_PAIN = "chest pain";
const YELLOW_GREEN_SPUTUM = "yellow-green, thick sputum";
const RUST_COLORED_SPUTUM = "rust colored sputum";
const GREEN_SPUTUM = "green sputum";
const YELLOW_SPUTUM = "yellow sputum";
const BLOOD_STREAKED_SPUTUM = "blood-streaked sputum";
const WHEEZING = "wheezing";
const CYANOSIS = "cyanosis";
const FATIGUE = "fatigue";
const SWEATS = "sweats";
const VOMITING = "vomiting";
const DIARRHEA = "diarrhea";
const NAUSEA = "nausea";
const RUNNY_NOSE = "runny nose";
const BODY_ACHES = "body aches";
const CHANGE_IN_MENTAL_STATUS = "change in mental status";
const HYPOTENSION = "hypotension";
const TACHYCARDIA = "tachycardia";
const COVID_19_SWAB = "COVID-19 nasopharyngeal swab";
const CHEST_CT_SCAN = "chest CT scan";
const CHEST_RADIOGRAPH = "chest radiograph";
const CHEST_ULTRASOUND = "chest ultrasound";
const CAREGIVER_AT_HOME = "patient fill have caregiver at home";
const FACE_MASKS_AVAILABLE =
  "patient fill have gloves and face masks available";
const HOUSEHOLD_COMPLICATIONS =
  "patient fill have members of the household at increased risk of complications";
const ACCESS_FOOD =
  "patient fill have resources to access food and other necessities";
const BEDROOM_AND_BATHROOM =
  "patient fill have separate bedroom and bathroom for patient";
const ETIQUETTE_PRACTICES =
  "patient fill able to adhere to hand hygiene and cough etiquette practices";
const NO_FALL = "no fall in the past year";
const NO_FALL_SINCE_LAST_VISIT = "no fall since last visit";
const FALLS_IN_THE_PAST_YEAR = "fall(s) in the past year";
const FALLS_IN_THE_LAST_VISIT = "fall(s) since last visit";
const INJURY_WITH_FALL = "injury with fall";
const FEAR_OF_FALLING = "fear of falling";
const NONE = "none";
const CANE = "cane";
const CRUTCHES = "crutches";
const WALKER = "walker";
const WHEELCHAIR = "wheelchair";
const BATH_INDEPENDENTLY = "fill to bathe independently";
const DRESS_INDEPENDENTLY = "fill to dress independently";
const CHAIR_INDEPENDENTLY = "fill to get out of chair independently";
const GROOM_INDEPENDENTLY = "fill to groom independently";
const TOILET_INDEPENDENTLY = "fill to toilet independently";
const PREP_MEAL_INDEPENDENTLY = "fill to meal prep independently";
const GROCERY_INDEPENDENTLY = "fill to grocery shop independently";
const MONEY_INDEPENDENTLY = "fill to manage money independently";
const MEDICATION_INDEPENDENTLY = "fill to manage medications independently";
const PHONE_INDEPENDENTLY = "fill to use the phone independently";
const HOUSE_WORK_INDEPENDENTLY = "fill to do house work independently";
const ABLE_TO_WALK = "able to walk 1/4 mile";
const ABLE_TO_CLIMB = "able to climb a flight of stairs";
const UNABLE_TO_WALK = "unable to walk 1/4 mile";
const UNABLE_TO_CLIMB = "unable to climb a flight of stairs";
const NORMAL_HEARING = "normal hearing";
const NORMAL_VISION = "normal vision";
const LOSS_OF_HEARING = "loss of hearing";
const LOSS_OF_VISION = "loss of vision";

const DOES_OPTIONS_MAPPED: SelectorType[] = [
  { id: "DOES", name: "does" },
  { id: "DOES_NOT", name: "does not" },
];

const ABLE_OPTIONS_MAPPED: SelectorType[] = [
  { id: "able", name: "able" },
  { id: "unable", name: "unable" },
];

const CLAUDICATION_MAPPED: SelectorType[] = [
  { id: "+1", name: "+1" },
  { id: "+2", name: "+2" },
  { id: "+3", name: "+3" },
]

const COVID_SYMPTOMS_QUESTIONS: TemplateQuestionType[] = [
  {
    name: COVID_19_SYMPTOMS_SIGNS,
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
    name: CONTACTS_EXPOSURE,
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
    name: QUALITY,
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
    name: SEVERITY,
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
        questionType: QuestionType.NUMBER,
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
    name: DURATION,
    answers: [
      {
        title: CANNOT_IDENTIFY,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        title: SYMPTOMS_LASTING,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.NUMBER,
      },
    ]
  },
  {
    name: ONSET_TIMING,
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
    name: CONTEXT,
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
    name: ASSOCIATED_SYMPTOMS,
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
    name: PRIOR_LABS_IMAGING,
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
    name: SUITABILITY_OF_RESIDENTIAL_SETTING,
    answers: [
      {
        title: CAREGIVER_AT_HOME,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        title: FACE_MASKS_AVAILABLE,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        title: HOUSEHOLD_COMPLICATIONS,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        title: ACCESS_FOOD,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        title: BEDROOM_AND_BATHROOM,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        title: ETIQUETTE_PRACTICES,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
    ]
  },
]

//templates
export const TEMPLATE_DATA: TemplatesType[] = [
  {
    title: "COVID-19 Symptoms May 2020",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: UPPER_RESPIRATORY_SYSTEMS,
        questions: COVID_SYMPTOMS_QUESTIONS
      },
    ],
  },
  {
    title: "Geriatric Annual Well Visit",
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: GERIATRIC_INDEPENDENCE,
        questions: [
          {

            name: FALLING,
            answers: [
              {
                title: NO_FALL,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                title: NO_FALL_SINCE_LAST_VISIT,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                title: FALLS_IN_THE_PAST_YEAR,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                title: FALLS_IN_THE_LAST_VISIT,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                title: INJURY_WITH_FALL,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                title: FEAR_OF_FALLING,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {

            name: USE_OF_ASSISTIVE_DEVICES,
            answers: [
              {
                title: NONE,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                title: CANE,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                title: CRUTCHES,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                title: WALKER,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                title: WHEELCHAIR,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {

            name: ACTIVITIES_OF_DAILY_LIVING,
            answers: [
              {
                title: BATH_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                title: DRESS_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                title: CHAIR_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                title: GROOM_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                title: TOILET_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
            ]
          },
          {

            name: INSTRUMENTAL_ACTIVITIES_OF_DAILY_LIVING,
            answers: [
              {
                title: PREP_MEAL_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                title: GROCERY_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                title: MONEY_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                title: MEDICATION_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                title: PHONE_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                title: HOUSE_WORK_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
            ]
          },
          {

            name: FUNCTIONAL_CAPACITY,
            answers: [
              {
                title: ABLE_TO_WALK,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                title: ABLE_TO_CLIMB,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                title: UNABLE_TO_WALK,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                title: UNABLE_TO_CLIMB,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {

            name: SENSORY,
            answers: [
              {
                title: NORMAL_HEARING,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                title: NORMAL_VISION,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                title: LOSS_OF_HEARING,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                title: LOSS_OF_VISION,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
        ]
      },
    ],
  },
  {
    title: "COVID-19 Symptoms March 2020",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: UPPER_RESPIRATORY_SYMPTOMS,
        questions: COVID_SYMPTOMS_QUESTIONS
      },
    ],
  },
  {
    title: "Brief Cardiology ROS",
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: CARDIO_BASIC,
        questions: [
          {
            name: CARDIOVASCULAR_SYMPTOMS,
            answers: [
              { title: "no chest pressure", answerType: ANSWER_TYPE.NORMAL },
              { title: "no lightheadedness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no chest pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no dyspnea on exertion", answerType: ANSWER_TYPE.NORMAL },
              { title: "no fatigue", answerType: ANSWER_TYPE.NORMAL },
              { title: "no leg edema", answerType: ANSWER_TYPE.NORMAL },
              { title: "no syncope", answerType: ANSWER_TYPE.NORMAL },
              { title: "no orthopnea", answerType: ANSWER_TYPE.NORMAL },
              { title: "no palpitations", answerType: ANSWER_TYPE.NORMAL },
              { title: "no PND", answerType: ANSWER_TYPE.NORMAL },
              { title: "no shortness of breath", answerType: ANSWER_TYPE.NORMAL },
              { title: "no claudication", answerType: ANSWER_TYPE.NORMAL },
              { title: "chest pressure", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "lightheadedness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "chest pain", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "dyspnea on exertion", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "fatigue", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "leg edema", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "syncope", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "orthopnea", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "palpitations", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "PND", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "shortness of breath", answerType: ANSWER_TYPE.ABNORMAL },
              {
                title: "claudication fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: CLAUDICATION_MAPPED,
              }
            ]
          },
        ]
      },
      {
        name: CONSTITUTIONAL,
        questions: [
          {
            name: CONSTITUTIONAL,
            answers: [
              { title: "no fever", answerType: ANSWER_TYPE.NORMAL },
              { title: "no night sweats", answerType: ANSWER_TYPE.NORMAL },
              { title: "no significant weight gain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no significant weight loss", answerType: ANSWER_TYPE.NORMAL },
              { title: "no exercise intolerance", answerType: ANSWER_TYPE.NORMAL },
              { title: "fever", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "night sweats", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "weight gain fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { title: "weight loss fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { title: "exercise intolerance", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
        ]
      },
      {
        name: EYES,
        questions: [
          {
            name: EYES,
            answers: [
              { title: "no dry eyes", answerType: ANSWER_TYPE.NORMAL },
              { title: "no irritation", answerType: ANSWER_TYPE.NORMAL },
              { title: "no vision change", answerType: ANSWER_TYPE.NORMAL },
              { title: "dry eyes", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "irritation", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "vision change", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
        ]
      },
      {
        name: ENMT,
        questions: [
          {
            name: EARS,
            answers: [
              { title: "no difficulty hearing", answerType: ANSWER_TYPE.NORMAL },
              { title: "no ear pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "difficulty hearing", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "ear pain", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: NOSE,
            answers: [
              { title: "no frequent nosebleeds", answerType: ANSWER_TYPE.NORMAL },
              { title: "no nose/sinus problems", answerType: ANSWER_TYPE.NORMAL },
              { title: "frequent nosebleeds", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "nose/sinus problems", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: MOUTH_OR_ThROAT,
            answers: [
              { title: "no sore throat", answerType: ANSWER_TYPE.NORMAL },
              { title: "no bleeding gums", answerType: ANSWER_TYPE.NORMAL },
              { title: "no snoring", answerType: ANSWER_TYPE.NORMAL },
              { title: "no dry mouth", answerType: ANSWER_TYPE.NORMAL },
              { title: "no mouth ulcers", answerType: ANSWER_TYPE.NORMAL },
              { title: "no oral abnormalities", answerType: ANSWER_TYPE.NORMAL },
              { title: "no teeth problems", answerType: ANSWER_TYPE.NORMAL },
              { title: "sore throat", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "bleeding gums", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "snoring", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "dry mouth", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "mouth ulcers", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "oral abnormalities", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "teeth problems", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "mouth breathing", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: RESPIRATORY,
        questions: [
          {
            name: RESPIRATORY,
            answers: [
              { title: "no cough", answerType: ANSWER_TYPE.NORMAL },
              { title: "no wheezing", answerType: ANSWER_TYPE.NORMAL },
              { title: "no coughing up blood", answerType: ANSWER_TYPE.NORMAL },
              { title: "no sleep apnea", answerType: ANSWER_TYPE.NORMAL },
              { title: "cough", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "wheezing", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "coughing up blood", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "sleep apnea", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: MUSCULAOSKELETAL,
        questions: [
          {
            name: MUSCULAOSKELETAL,
            answers: [
              { title: "no muscle aches", answerType: ANSWER_TYPE.NORMAL },
              { title: "no muscle weakness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no arthralgias/joint pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no back pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no swelling in the extremities", answerType: ANSWER_TYPE.NORMAL },
              { title: "muscle aches", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "muscle weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "arthralgias/joint pain", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "back pain", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "swelling in the extremities", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: NEUROLOGIC,
        questions: [
          {
            name: NEUROLOGIC,
            answers: [
              { title: "no loss of consciousness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no weakness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no numbness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no seizures", answerType: ANSWER_TYPE.NORMAL },
              { title: "no dizziness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no headaches", answerType: ANSWER_TYPE.NORMAL },
              { title: "loss of consciousness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "numbness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "seizures", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "dizziness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "frequent or severe headaches", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "migraines", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "restless legs", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: PSYCHIATRIC,
        questions: [
          {
            name: PSYH,
            answers: [
              { title: "no depression", answerType: ANSWER_TYPE.NORMAL },
              { title: "no sleep disturbances", answerType: ANSWER_TYPE.NORMAL },
              { title: "feeling safe in relationship", answerType: ANSWER_TYPE.NORMAL },
              { title: "no alcohol abuse", answerType: ANSWER_TYPE.NORMAL },
              { title: "depression", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "sleep disturbances", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "restless sleep", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "feeling unsafe in relationship", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "alcohol abuse", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: HEMATOLOGIC_LYMPHATIC,
        questions: [
          {
            name: HEMATOLOGIC_LYMPHATIC,
            answers: [
              { title: "no swollen glands", answerType: ANSWER_TYPE.NORMAL },
              { title: "no bruising", answerType: ANSWER_TYPE.NORMAL },
              { title: "swollen glands", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "easy bruising", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "excessive bleeding", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
    ],
  },
  {
    title: "Brief Endocrinology ROS",
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: CONSTITUTIONAL,
        questions: [{
          name: CONSTITUTIONAL,
          answers: [
            {
              title: "no constitutional symptoms",
              answerType: ANSWER_TYPE.NORMAL
            },
            {
              title: "excess weight gain",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "excess weight loss",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "loss of appetite",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "fever",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "fussy",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "diminished activity",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: FATIGUE,
              answerType: ANSWER_TYPE.ABNORMAL
            },
          ]
        }]
      },
      {
        name: EYES,
        questions: [
          {
            name: EYES,
            answers: [
              {
                title: 'no eye symptoms',
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                title: 'eye pain',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'blurry vision',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'double vision',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'eye redness',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'eye itchiness',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'eye swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'eye discharge',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'protruding eyes',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'dry eyes',
                answerType: ANSWER_TYPE.ABNORMAL
              },
            ]
          },
        ]
      },
      {
        name: ENMT,
        questions: [{
          name: ENMT,
          answers: [
            {
              title: "no ENMT symptoms",
              answerType: ANSWER_TYPE.NORMAL
            },
            {
              title: "ear pain",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "ear discharge",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "hearing loss",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "sinus pressure",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "drooling",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "swelling",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "congestion",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "sore throat",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "hoarseness",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "mouth lesions",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "foul smelling breath",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "sneezing",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "runny nose",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "neck mass",
              answerType: ANSWER_TYPE.ABNORMAL
            },
          ]
        }]
      }, {
        name: 'Cardiovascular',
        questions: [
          {
            name: 'Cardiovascular',
            answers: [
              {
                title: 'no cardiovascular symptoms',
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                title: 'chest pain',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'rapid heart rate',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'cyanosis',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'pallor',
                answerType: ANSWER_TYPE.ABNORMAL
              },
            ]
          }
        ]
      }, {
        name: RESPIRATORY,
        questions: [{
          name: RESPIRATORY,
          answers: [
            {
              title: 'no respiratory symptoms',
              answerType: ANSWER_TYPE.NORMAL
            },
            {
              title: 'cough',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: 'bark-like cough',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: 'wheezing',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: 'chest tightness',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: 'pain with respiration',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: 'noisy breathing',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: 'rapid respirations',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: 'difficulty breathing',
              answerType: ANSWER_TYPE.ABNORMAL
            },
          ]
        }]
      }, {
        name: 'Gastrointestinal',
        questions: [
          {
            name: 'GI',
            answers: [
              {
                title: "no gastrointestinal symptoms",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                title: "difficulty swallowing",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "abdominal pain",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "nausea",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "vomiting",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "loose stools",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "diarrhea",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "constipation",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "blood in stools",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "mucus in stool",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "heartburn",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "ulcer(s)",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {

                title: "pancreatitis",
                answerType: ANSWER_TYPE.ABNORMAL
              },
            ]
          }
        ]
      }, {
        name: "Genitourinary",
        questions: [
          {
            name: 'GU General',
            answers: [
              {
                title: "no genitourinary symptoms",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                title: "no bedwetting/accidents",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                title: "normal menses",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                title: "LMP: fill",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.INPUT
              },
              {
                title: "discharge",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "blood in the urine",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "pain during urination",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "increased frequency of urination",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "voiding urgency",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "vaginal discharge",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "heavy menses",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "irregular menses",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "no menses",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "pelvic pain",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "bedwetting/accidents",
                answerType: ANSWER_TYPE.ABNORMAL
              },
            ]
          }
        ]
      },
      {
        name: "Musculoskeletal",
        questions: [
          {
            name: "Musculoskeletal",
            answers: [
              {
                title: 'no musculoskeletal symptoms',
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                title: 'soft tissue swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'joint swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'limb swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'limb swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'limited motion',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'previous injuries',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'myalgia',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'arthritis',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'weakness',
                answerType: ANSWER_TYPE.ABNORMAL
              }
            ]
          }
        ]
      }, {
        name: "Skin",
        questions: [
          {
            name: "Skin",
            answers: [
              {
                title: "no skin symptoms",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                title: "pain",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "itchiness",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "dry skin",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "flaking",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "redness",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "rash",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "diaper rash",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "hives",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "skin lesions",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "swelling",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "bruising",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: "insect bites",
                answerType: ANSWER_TYPE.ABNORMAL
              }, {
                title: "acanthosis nigricans",
                answerType: ANSWER_TYPE.ABNORMAL
              }, {
                title: "nail changes",
                answerType: ANSWER_TYPE.ABNORMAL
              },
            ]
          }
        ]
      }, {
        name: "Neurological symptoms",
        questions: [{
          name: "Neuro",
          answers: [
            {
              title: "no neurological symptoms",
              answerType: ANSWER_TYPE.NORMAL
            },
            {
              title: "numbness",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "weakness",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "tingling",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "burning",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "shooting pain",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              title: "headache",
              answerType: ANSWER_TYPE.ABNORMAL
            }, {
              title: "dizziness",
              answerType: ANSWER_TYPE.ABNORMAL
            }, {
              title: "loss of conciousness",
              answerType: ANSWER_TYPE.ABNORMAL
            }, {
              title: "tremor(s)",
              answerType: ANSWER_TYPE.ABNORMAL
            }
          ]
        }]
      }, {
        name: "Endocrine",
        questions: [
          {
            name: "Endocrine",
            answers: [
              {
                title: 'no endocrine symptoms',
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                title: 'increased thirst',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                title: 'temperature intolerance',
                answerType: ANSWER_TYPE.ABNORMAL
              },
            ]
          }
        ]
      }
    ]
  }, {
    title: 'Brief Geriatric ROS',
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: CONSTITUTIONAL,
        questions: [
          {
            name: CONSTITUTIONAL,
            answers: [
              { title: "no fatigue", answerType: ANSWER_TYPE.NORMAL },
              { title: "no fever", answerType: ANSWER_TYPE.NORMAL },
              { title: "no night sweats", answerType: ANSWER_TYPE.NORMAL },
              { title: "no significant weight gain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no significant weight loss", answerType: ANSWER_TYPE.NORMAL },
              { title: "no excessive sleepiness during the day (daytime somnolence)", answerType: ANSWER_TYPE.NORMAL },
              { title: "fatigue", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "fever", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "night sweats", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "weight gain fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { title: "weight loss fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { title: "excessive sleepiness during the day (daytime somnolence)", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
        ]
      },
      {
        name: EYES,
        questions: [
          {
            name: EYES,
            answers: [
              { title: "no dry eyes", answerType: ANSWER_TYPE.NORMAL },
              { title: "no irritation", answerType: ANSWER_TYPE.NORMAL },
              { title: "no vision change", answerType: ANSWER_TYPE.NORMAL },
              { title: "no scotoma", answerType: ANSWER_TYPE.NORMAL },
              { title: "no diplopia", answerType: ANSWER_TYPE.NORMAL },
              { title: "dry eyes", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "irritation", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "vision change", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "scotoma", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "diplopia", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
        ]
      },
      {
        name: ENMT,
        questions: [
          {
            name: EARS,
            answers: [
              { title: "no ear pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no nose/sinus problems", answerType: ANSWER_TYPE.NORMAL },
              { title: "no sore throat", answerType: ANSWER_TYPE.NORMAL },
              { title: "no loss of hearing", answerType: ANSWER_TYPE.NORMAL },
              { title: "no tinnitus", answerType: ANSWER_TYPE.NORMAL },
              { title: "ear pain", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "nose/sinus problems", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "sore throat", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "loss of hearing", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "tinnitus", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: RESPIRATORY,
        questions: [
          {
            name: RESPIRATORY,
            answers: [
              { title: "no cough", answerType: ANSWER_TYPE.NORMAL },
              { title: "no shortness of breath", answerType: ANSWER_TYPE.NORMAL },
              { title: "no sputum production", answerType: ANSWER_TYPE.NORMAL },
              { title: "no coughing up blood", answerType: ANSWER_TYPE.NORMAL },
              { title: "no wheezing", answerType: ANSWER_TYPE.NORMAL },
              { title: "cough", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "shortness of breath", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "sputum production", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "coughing up blood", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "wheezing", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "sleep apnea", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: 'Cardiovascular',
        questions: [
          {
            name: 'Cardiovascular',
            answers: [
              { title: 'no chest pain', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no palpitations', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no edema', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no cyanosis', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no known heart murmur', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no orthopnea', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no paroxysmal nocturnal dyspnea', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no syncope', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no lightheadedness', answerType: ANSWER_TYPE.NORMAL },
              { title: 'chest pain', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'palpitations', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'edema', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'cyanosis', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'known heart murmur', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'orthopnea', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'paroxysmal nocturnal dyspnea', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'syncope', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'lightheadedness', answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: 'Gastrointestinal',
        questions: [
          {
            name: 'Gastrointestinal',
            answers: [
              { title: "no heartburn", answerType: ANSWER_TYPE.NORMAL },
              { title: "no dysphagia", answerType: ANSWER_TYPE.NORMAL },
              { title: "no nausea", answerType: ANSWER_TYPE.NORMAL },
              { title: "no vomiting", answerType: ANSWER_TYPE.NORMAL },
              { title: "no diarrhea", answerType: ANSWER_TYPE.NORMAL },
              { title: "no blood stools", answerType: ANSWER_TYPE.NORMAL },
              { title: "no rectal bleed", answerType: ANSWER_TYPE.NORMAL },
              { title: "no recent change in bowel habits", answerType: ANSWER_TYPE.NORMAL },
              { title: "no constipation", answerType: ANSWER_TYPE.ABNORMAL },

              { title: "heartburn", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "dysphagia", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "nausea", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "vomiting", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "diarrhea", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "blood stools", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "rectal bleed", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "recent change in bowel habits", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "constipation", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: "Genitourinary",
        questions: [
          {
            name: 'Genitourinary',
            answers: [
              { title: "no impotence", answerType: ANSWER_TYPE.NORMAL },
              { title: "no hematuria", answerType: ANSWER_TYPE.NORMAL },
              { title: "no abnormal bleeding", answerType: ANSWER_TYPE.NORMAL },
              { title: "no difficulty urinating", answerType: ANSWER_TYPE.NORMAL },
              { title: "no increased frequency", answerType: ANSWER_TYPE.NORMAL },
              { title: "no abnormal urethral discharge", answerType: ANSWER_TYPE.NORMAL },
              { title: "no feelings of urgency", answerType: ANSWER_TYPE.NORMAL },
              { title: "no incontinence", answerType: ANSWER_TYPE.NORMAL },
              { title: "normal lubrication of vaginal mucosa", answerType: ANSWER_TYPE.NORMAL },


              { title: "impotence", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "hematuria", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "abnormal bleeding", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "difficulty urinating", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "abnormal urethral discharge", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "increased urinary frequency", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "urinary loss of control", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "incomplete emptying", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "feelings of urgency", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "inadequacy of lubrication of vaginal mucosa", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: MUSCULAOSKELETAL,
        questions: [
          {
            name: MUSCULAOSKELETAL,
            answers: [
              { title: "no muscle aches", answerType: ANSWER_TYPE.NORMAL },
              { title: "no muscle weakness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no arthralgias/joint pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no back pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no swelling in the extremities", answerType: ANSWER_TYPE.NORMAL },
              { title: "no stiffness", answerType: ANSWER_TYPE.NORMAL },

              { title: "muscle aches", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "muscle weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "arthralgias/joint pain", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "back pain", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "swelling in the extremities", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "stiffness", answerType: ANSWER_TYPE.ABNORMAL },

            ]
          }
        ]
      },
      {
        name: NEUROLOGIC,
        questions: [
          {
            name: NEUROLOGIC,
            answers: [
              { title: "no headaches", answerType: ANSWER_TYPE.NORMAL },
              { title: "no dizziness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no loss of consciousness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no weakness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no numbness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no slurred speech", answerType: ANSWER_TYPE.NORMAL },
              { title: "no seizures", answerType: ANSWER_TYPE.NORMAL },

              { title: "headaches", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "migraines", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "dizziness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "loss of consciousness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "numbness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "slurred speech", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "seizures", answerType: ANSWER_TYPE.ABNORMAL },

            ]
          }
        ]
      },
    ]
  }, {
    title: "Brief Infusion ROS",
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: "Systemic",
        questions: [
          {
            name: CONSTITUTIONAL,
            answers: [
              { title: "no active infection ", answerType: ANSWER_TYPE.NORMAL },
              { title: "no fever", answerType: ANSWER_TYPE.NORMAL },
              { title: "no night sweats", answerType: ANSWER_TYPE.NORMAL },
              { title: "no significant weight gain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no significant weight loss", answerType: ANSWER_TYPE.NORMAL },
              { title: "infection of fill", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.INPUT },
              { title: "fever", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "night sweats", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "weight gain fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { title: "weight loss fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
            ]
          },
        ]
      },
      {
        name: 'Cardiovascular',
        questions: [
          {
            name: 'Cardiovascular',
            answers: [
              { title: 'no chest pain', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no shortness of breath when walking', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no shortness of breath when lying down', answerType: ANSWER_TYPE.NORMAL },
              { title: 'no palpitations', answerType: ANSWER_TYPE.NORMAL },

              { title: 'chest pain', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'shortness of breath when walking', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'shortness of breath when lying down', answerType: ANSWER_TYPE.ABNORMAL },
              { title: 'palpitations', answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: 'Pulmonary',
        questions: [
          {
            name: RESPIRATORY,
            answers: [
              { title: "no cough", answerType: ANSWER_TYPE.NORMAL },
              { title: "no wheezing", answerType: ANSWER_TYPE.NORMAL },
              { title: "no shortness of breath", answerType: ANSWER_TYPE.NORMAL },
              { title: "cough", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "wheezing", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "shortness of breath", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: 'Skin',
        questions: [
          {
            name: 'Skin',
            answers: [
              { title: "no rash", answerType: ANSWER_TYPE.NORMAL },
              { title: "rash", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: "Neurological",
        questions: [{
          name: "Neurological",
          answers: [
            { title: "no weakness", answerType: ANSWER_TYPE.NORMAL },
            { title: "no headache", answerType: ANSWER_TYPE.NORMAL },
            { title: "no dizziness", answerType: ANSWER_TYPE.NORMAL },
            { title: "weakness", answerType: ANSWER_TYPE.ABNORMAL },
            { title: "headache", answerType: ANSWER_TYPE.ABNORMAL },
            { title: "dizziness", answerType: ANSWER_TYPE.ABNORMAL },
          ]
        }]
      },
      {
        name: 'Gastrointestinal',
        questions: [
          {
            name: 'Gastrointestinal',
            answers: [
              { title: "no abdominal pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no vomiting", answerType: ANSWER_TYPE.NORMAL },
              { title: "normal appetite", answerType: ANSWER_TYPE.NORMAL },
              { title: "no diarrhea", answerType: ANSWER_TYPE.NORMAL },
              { title: "no blood vomiting", answerType: ANSWER_TYPE.NORMAL },
              { title: "no dysphagia", answerType: ANSWER_TYPE.NORMAL },
              { title: "no GERD", answerType: ANSWER_TYPE.NORMAL },

              { title: "abdominal pain", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "vomiting", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "change in appetite", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "black or tarry stools", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "frequent diarrhea", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "blood vomiting", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "dysphagia", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "GERD", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: MUSCULAOSKELETAL,
        questions: [
          {
            name: MUSCULAOSKELETAL,
            answers: [
              { title: "no muscle aches", answerType: ANSWER_TYPE.NORMAL },
              { title: "no muscle weakness", answerType: ANSWER_TYPE.NORMAL },
              { title: "no arthralgias/joint pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no back pain", answerType: ANSWER_TYPE.NORMAL },
              { title: "no swelling in the extremities", answerType: ANSWER_TYPE.NORMAL },
              { title: "muscle aches", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "muscle weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "arthralgias/joint pain", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "back pain", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "swelling in the extremities", answerType: ANSWER_TYPE.ABNORMAL },

            ]
          }
        ]
      },
      {
        name: "Endocrine",
        questions: [
          {
            name: "Endocrine",
            answers: [
              { title: "no fatigue", answerType: ANSWER_TYPE.NORMAL },
              { title: "fatigue", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "increased thirst", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "hair loss", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "increased hair growth", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "cold intolerance", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: "Genitourinary",
        questions: [
          {
            name: 'Genitourinary',
            answers: [
              { title: "no incontinence", answerType: ANSWER_TYPE.NORMAL },
              { title: "no difficulty urinating", answerType: ANSWER_TYPE.NORMAL },
              { title: "no hematuria", answerType: ANSWER_TYPE.NORMAL },
              { title: "no increased frequency", answerType: ANSWER_TYPE.NORMAL },
              { title: "urinary loss of control", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "difficulty urinating", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "increased urinary frequency", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "hematuria", answerType: ANSWER_TYPE.ABNORMAL },
              { title: "incomplete emptying", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
    ]
  }
];