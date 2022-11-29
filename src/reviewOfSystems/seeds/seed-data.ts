import { ANSWER_TYPE, QuestionType, TemplateQuestionType, TemplatesType, TemplateType } from "src/lib/constants";
import { SelectorType } from "src/socialHistory/payloads/questions.payload";
import { templates } from './seedData'

//template names

//section Names
const UPPER_RESPIRATORY_SYSTEMS = "Upper Respiratory Systems";
const UPPER_RESPIRATORY_SYMPTOMS = "Upper Respiratory Symptoms";
const GERIATRIC_INDEPENDENCE = "Geriatric independence";
const PRENATAL_NUTRITION_INITIAL_VISIT = "Prenatal Nutrition Initial Visit"

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
const APPETITE = "Appetite"
const MODIFYING_FACTORS = "Modifying Factors"

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

        name: COUGH_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: FEVER_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: SHORTNESS_OF_BIRTH_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: REPEATED_SHAKING_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: MUSCLE_PAIN_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: HEADACHE_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: SORE_THROAT_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: LOSS_OF_TASTE_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: VOMITING_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: FATIGUE_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: ANOREXIA_RESOLVED,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {

        name: COUGH_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: COUGH_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: FEVER_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: FEVER_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: SHORTNESS_OF_BIRTH_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: SHORTNESS_OF_BIRTH_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: CHILLS_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: CHILLS_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: REPEATED_SHAKING_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: REPEATED_SHAKING_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: MUSCLE_PAIN_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: MUSCLE_PAIN_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: HEADACHE_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: HEADACHE_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: SORE_THROAT_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: SORE_THROAT_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: VOMITING_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: VOMITING_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: FATIGUE_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: FATIGUE_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: ANOREXIA_IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: ANOREXIA_SAME,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: COUGH_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: FEVER_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: SHORTNESS_OF_BIRTH_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: REPEATED_SHAKING_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: MUSCLE_PAIN_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: HEADACHE_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: SORE_THROAT_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: LOSS_OF_TASTE_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: VOMITING_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: FATIGUE_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {

        name: ANOREXIA_WORSENING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
    ]
  },
  {
    name: CONTACTS_EXPOSURE,
    answers: [
      {

        name: CLOSE_CONTACT,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: CLOSE_PROXIMITY,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: HEALTHCARE_EXPOSURE,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: PERSON_LIVES,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: HEALTHCARE_PERSONAL,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: SPECIFIC_SETTING_EXPOSURE,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {

        name: WIDESPREAD_COMMUNITY_TRANSMISSION,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    name: QUALITY,
    answers: [
      {
        name: PRODUCTIVE_COUGH,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: DRY_COUGH,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: WHEEZY_COUGH,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
    ]
  },
  {
    name: SEVERITY,
    answers: [
      {
        name: NO_PAIN,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: MILD,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: MODERATE,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: PAIN_LEVEL,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.NUMBER,
      },
      {
        name: SEVERE,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: IMPROVING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: WORSENING,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: UNCHANGED,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    name: DURATION,
    answers: [
      {
        name: CANNOT_IDENTIFY,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: SYMPTOMS_LASTING,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.NUMBER,
      },
    ]
  },
  {
    name: ONSET_TIMING,
    answers: [
      {
        name: CANNOT_IDENTIFY,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: DATE_OF_ONSET,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    name: CONTEXT,
    answers: [
      {
        name: ALLERGIES,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: ASTHMA,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: CHRONIC_BRONCHITIS,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: COPD,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    name: ASSOCIATED_SYMPTOMS,
    answers: [
      {
        name: NO_SPUTUM_PRODUCTION,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: NO_WHEEZING,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: NO_RUNNY_NOSE,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: NO_VOMITING,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: NO_DIARRHEA,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: NO_BODY_ACHES,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: NO_NAUSEA,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: NO_CHANGE_MENTAL,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: NO_HYPERTENSION,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: NO_TACHYCARDIA,
        answerType: ANSWER_TYPE.NORMAL,
      },
      {
        name: CHEST_PAIN,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: YELLOW_GREEN_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: RUST_COLORED_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: GREEN_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: YELLOW_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: BLOOD_STREAKED_SPUTUM,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: WHEEZING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: CYANOSIS,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: FATIGUE,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: SWEATS,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: VOMITING,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: DIARRHEA,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: NAUSEA,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: RUNNY_NOSE,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: BODY_ACHES,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: CHANGE_IN_MENTAL_STATUS,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: HYPOTENSION,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
      {
        name: TACHYCARDIA,
        answerType: ANSWER_TYPE.ABNORMAL,
      },
    ]
  },
  {
    name: PRIOR_LABS_IMAGING,
    answers: [
      {
        name: COVID_19_SWAB,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: CHEST_CT_SCAN,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: CHEST_RADIOGRAPH,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
      {
        name: CHEST_ULTRASOUND,
        answerType: ANSWER_TYPE.NEUTRAL,
      },
    ]
  },
  {
    name: SUITABILITY_OF_RESIDENTIAL_SETTING,
    answers: [
      {
        name: CAREGIVER_AT_HOME,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        name: FACE_MASKS_AVAILABLE,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        name: HOUSEHOLD_COMPLICATIONS,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        name: ACCESS_FOOD,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        name: BEDROOM_AND_BATHROOM,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
      {
        name: ETIQUETTE_PRACTICES,
        answerType: ANSWER_TYPE.NEUTRAL,
        questionType: QuestionType.SELECT,
        options: DOES_OPTIONS_MAPPED,
      },
    ]
  },
]

//templates
const templateData: TemplatesType[] = [
  {
    name: "COVID-19 Symptoms May 2020",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: UPPER_RESPIRATORY_SYSTEMS,
        questions: COVID_SYMPTOMS_QUESTIONS
      },
    ],
  },
  {
    name: "Geriatric Annual Well Visit",
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: GERIATRIC_INDEPENDENCE,
        questions: [
          {

            name: FALLING,
            answers: [
              {
                name: NO_FALL,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: NO_FALL_SINCE_LAST_VISIT,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: FALLS_IN_THE_PAST_YEAR,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: FALLS_IN_THE_LAST_VISIT,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: INJURY_WITH_FALL,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: FEAR_OF_FALLING,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {

            name: USE_OF_ASSISTIVE_DEVICES,
            answers: [
              {
                name: NONE,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: CANE,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: CRUTCHES,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: WALKER,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: WHEELCHAIR,
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {

            name: ACTIVITIES_OF_DAILY_LIVING,
            answers: [
              {
                name: BATH_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                name: DRESS_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                name: CHAIR_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                name: GROOM_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                name: TOILET_INDEPENDENTLY,
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
                name: PREP_MEAL_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                name: GROCERY_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                name: MONEY_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                name: MEDICATION_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                name: PHONE_INDEPENDENTLY,
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: ABLE_OPTIONS_MAPPED,
              },
              {
                name: HOUSE_WORK_INDEPENDENTLY,
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
                name: ABLE_TO_WALK,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: ABLE_TO_CLIMB,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: UNABLE_TO_WALK,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: UNABLE_TO_CLIMB,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {

            name: SENSORY,
            answers: [
              {
                name: NORMAL_HEARING,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: NORMAL_VISION,
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: LOSS_OF_HEARING,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: LOSS_OF_VISION,
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
        ]
      },
    ],
  },
  {
    name: "COVID-19 Symptoms March 2020",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: UPPER_RESPIRATORY_SYMPTOMS,
        questions: COVID_SYMPTOMS_QUESTIONS
      },
    ],
  },
  {
    name: "Brief Cardiology ROS",
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: CARDIO_BASIC,
        questions: [
          {
            name: CARDIOVASCULAR_SYMPTOMS,
            answers: [
              { name: "no chest pressure", answerType: ANSWER_TYPE.NORMAL },
              { name: "no lightheadedness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no chest pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no dyspnea on exertion", answerType: ANSWER_TYPE.NORMAL },
              { name: "no fatigue", answerType: ANSWER_TYPE.NORMAL },
              { name: "no leg edema", answerType: ANSWER_TYPE.NORMAL },
              { name: "no syncope", answerType: ANSWER_TYPE.NORMAL },
              { name: "no orthopnea", answerType: ANSWER_TYPE.NORMAL },
              { name: "no palpitations", answerType: ANSWER_TYPE.NORMAL },
              { name: "no PND", answerType: ANSWER_TYPE.NORMAL },
              { name: "no shortness of breath", answerType: ANSWER_TYPE.NORMAL },
              { name: "no claudication", answerType: ANSWER_TYPE.NORMAL },
              { name: "chest pressure", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "lightheadedness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "chest pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "dyspnea on exertion", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "fatigue", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "leg edema", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "syncope", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "orthopnea", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "palpitations", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "PND", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "shortness of breath", answerType: ANSWER_TYPE.ABNORMAL },
              {
                name: "claudication fill",
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
              { name: "no fever", answerType: ANSWER_TYPE.NORMAL },
              { name: "no night sweats", answerType: ANSWER_TYPE.NORMAL },
              { name: "no significant weight gain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no significant weight loss", answerType: ANSWER_TYPE.NORMAL },
              { name: "no exercise intolerance", answerType: ANSWER_TYPE.NORMAL },
              { name: "fever", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "night sweats", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "weight gain fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { name: "weight loss fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { name: "exercise intolerance", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no dry eyes", answerType: ANSWER_TYPE.NORMAL },
              { name: "no irritation", answerType: ANSWER_TYPE.NORMAL },
              { name: "no vision change", answerType: ANSWER_TYPE.NORMAL },
              { name: "dry eyes", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "irritation", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "vision change", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no difficulty hearing", answerType: ANSWER_TYPE.NORMAL },
              { name: "no ear pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "difficulty hearing", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "ear pain", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: NOSE,
            answers: [
              { name: "no frequent nosebleeds", answerType: ANSWER_TYPE.NORMAL },
              { name: "no nose/sinus problems", answerType: ANSWER_TYPE.NORMAL },
              { name: "frequent nosebleeds", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "nose/sinus problems", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: MOUTH_OR_ThROAT,
            answers: [
              { name: "no sore throat", answerType: ANSWER_TYPE.NORMAL },
              { name: "no bleeding gums", answerType: ANSWER_TYPE.NORMAL },
              { name: "no snoring", answerType: ANSWER_TYPE.NORMAL },
              { name: "no dry mouth", answerType: ANSWER_TYPE.NORMAL },
              { name: "no mouth ulcers", answerType: ANSWER_TYPE.NORMAL },
              { name: "no oral abnormalities", answerType: ANSWER_TYPE.NORMAL },
              { name: "no teeth problems", answerType: ANSWER_TYPE.NORMAL },
              { name: "sore throat", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "bleeding gums", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "snoring", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "dry mouth", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "mouth ulcers", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "oral abnormalities", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "teeth problems", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "mouth breathing", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no cough", answerType: ANSWER_TYPE.NORMAL },
              { name: "no wheezing", answerType: ANSWER_TYPE.NORMAL },
              { name: "no coughing up blood", answerType: ANSWER_TYPE.NORMAL },
              { name: "no sleep apnea", answerType: ANSWER_TYPE.NORMAL },
              { name: "cough", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "wheezing", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "coughing up blood", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "sleep apnea", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no muscle aches", answerType: ANSWER_TYPE.NORMAL },
              { name: "no muscle weakness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no arthralgias/joint pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no back pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no swelling in the extremities", answerType: ANSWER_TYPE.NORMAL },
              { name: "muscle aches", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "muscle weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "arthralgias/joint pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "back pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "swelling in the extremities", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no loss of consciousness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no weakness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no numbness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no seizures", answerType: ANSWER_TYPE.NORMAL },
              { name: "no dizziness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no headaches", answerType: ANSWER_TYPE.NORMAL },
              { name: "loss of consciousness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "numbness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "seizures", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "dizziness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "frequent or severe headaches", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "migraines", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "restless legs", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no depression", answerType: ANSWER_TYPE.NORMAL },
              { name: "no sleep disturbances", answerType: ANSWER_TYPE.NORMAL },
              { name: "feeling safe in relationship", answerType: ANSWER_TYPE.NORMAL },
              { name: "no alcohol abuse", answerType: ANSWER_TYPE.NORMAL },
              { name: "depression", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "sleep disturbances", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "restless sleep", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "feeling unsafe in relationship", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "alcohol abuse", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no swollen glands", answerType: ANSWER_TYPE.NORMAL },
              { name: "no bruising", answerType: ANSWER_TYPE.NORMAL },
              { name: "swollen glands", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "easy bruising", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "excessive bleeding", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
    ],
  },
  {
    name: "Brief Endocrinology ROS",
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: CONSTITUTIONAL,
        questions: [{
          name: CONSTITUTIONAL,
          answers: [
            {
              name: "no constitutional symptoms",
              answerType: ANSWER_TYPE.NORMAL
            },
            {
              name: "excess weight gain",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "excess weight loss",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "loss of appetite",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "fever",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "fussy",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "diminished activity",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: FATIGUE,
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
                name: 'no eye symptoms',
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                name: 'eye pain',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'blurry vision',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'double vision',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'eye redness',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'eye itchiness',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'eye swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'eye discharge',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'protruding eyes',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'dry eyes',
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
              name: "no ENMT symptoms",
              answerType: ANSWER_TYPE.NORMAL
            },
            {
              name: "ear pain",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "ear discharge",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "hearing loss",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "sinus pressure",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "drooling",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "swelling",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "congestion",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "sore throat",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "hoarseness",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "mouth lesions",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "foul smelling breath",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "sneezing",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "runny nose",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "neck mass",
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
                name: 'no cardiovascular symptoms',
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                name: 'chest pain',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'rapid heart rate',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'cyanosis',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'pallor',
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
              name: 'no respiratory symptoms',
              answerType: ANSWER_TYPE.NORMAL
            },
            {
              name: 'cough',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: 'bark-like cough',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: 'wheezing',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: 'chest tightness',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: 'pain with respiration',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: 'noisy breathing',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: 'rapid respirations',
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: 'difficulty breathing',
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
                name: "no gastrointestinal symptoms",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                name: "difficulty swallowing",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "abdominal pain",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "nausea",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "vomiting",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "loose stools",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "diarrhea",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "constipation",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "blood in stools",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "mucus in stool",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "heartburn",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "ulcer(s)",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {

                name: "pancreatitis",
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
                name: "no genitourinary symptoms",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                name: "no bedwetting/accidents",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                name: "normal menses",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                name: "LMP: fill",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "discharge",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "blood in the urine",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "pain during urination",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "increased frequency of urination",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "voiding urgency",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "vaginal discharge",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "heavy menses",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "irregular menses",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "no menses",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "pelvic pain",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "bedwetting/accidents",
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
                name: 'no musculoskeletal symptoms',
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                name: 'soft tissue swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'joint swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'limb swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'limb swelling',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'limited motion',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'previous injuries',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'myalgia',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'arthritis',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'weakness',
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
                name: "no skin symptoms",
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                name: "pain",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "itchiness",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "dry skin",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "flaking",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "redness",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "rash",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "diaper rash",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "hives",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "skin lesions",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "swelling",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "bruising",
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: "insect bites",
                answerType: ANSWER_TYPE.ABNORMAL
              }, {
                name: "acanthosis nigricans",
                answerType: ANSWER_TYPE.ABNORMAL
              }, {
                name: "nail changes",
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
              name: "no neurological symptoms",
              answerType: ANSWER_TYPE.NORMAL
            },
            {
              name: "numbness",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "weakness",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "tingling",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "burning",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "shooting pain",
              answerType: ANSWER_TYPE.ABNORMAL
            },
            {
              name: "headache",
              answerType: ANSWER_TYPE.ABNORMAL
            }, {
              name: "dizziness",
              answerType: ANSWER_TYPE.ABNORMAL
            }, {
              name: "loss of conciousness",
              answerType: ANSWER_TYPE.ABNORMAL
            }, {
              name: "tremor(s)",
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
                name: 'no endocrine symptoms',
                answerType: ANSWER_TYPE.NORMAL
              },
              {
                name: 'increased thirst',
                answerType: ANSWER_TYPE.ABNORMAL
              },
              {
                name: 'temperature intolerance',
                answerType: ANSWER_TYPE.ABNORMAL
              },
            ]
          }
        ]
      }
    ]
  }, {
    name: 'Brief Geriatric ROS',
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: CONSTITUTIONAL,
        questions: [
          {
            name: CONSTITUTIONAL,
            answers: [
              { name: "no fatigue", answerType: ANSWER_TYPE.NORMAL },
              { name: "no fever", answerType: ANSWER_TYPE.NORMAL },
              { name: "no night sweats", answerType: ANSWER_TYPE.NORMAL },
              { name: "no significant weight gain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no significant weight loss", answerType: ANSWER_TYPE.NORMAL },
              { name: "no excessive sleepiness during the day (daytime somnolence)", answerType: ANSWER_TYPE.NORMAL },
              { name: "fatigue", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "fever", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "night sweats", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "weight gain fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { name: "weight loss fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { name: "excessive sleepiness during the day (daytime somnolence)", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no dry eyes", answerType: ANSWER_TYPE.NORMAL },
              { name: "no irritation", answerType: ANSWER_TYPE.NORMAL },
              { name: "no vision change", answerType: ANSWER_TYPE.NORMAL },
              { name: "no scotoma", answerType: ANSWER_TYPE.NORMAL },
              { name: "no diplopia", answerType: ANSWER_TYPE.NORMAL },
              { name: "dry eyes", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "irritation", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "vision change", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "scotoma", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "diplopia", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no ear pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no nose/sinus problems", answerType: ANSWER_TYPE.NORMAL },
              { name: "no sore throat", answerType: ANSWER_TYPE.NORMAL },
              { name: "no loss of hearing", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tinnitus", answerType: ANSWER_TYPE.NORMAL },
              { name: "ear pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "nose/sinus problems", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "sore throat", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "loss of hearing", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tinnitus", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no cough", answerType: ANSWER_TYPE.NORMAL },
              { name: "no shortness of breath", answerType: ANSWER_TYPE.NORMAL },
              { name: "no sputum production", answerType: ANSWER_TYPE.NORMAL },
              { name: "no coughing up blood", answerType: ANSWER_TYPE.NORMAL },
              { name: "no wheezing", answerType: ANSWER_TYPE.NORMAL },
              { name: "cough", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "shortness of breath", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "sputum production", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "coughing up blood", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "wheezing", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "sleep apnea", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: 'no chest pain', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no palpitations', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no edema', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no cyanosis', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no known heart murmur', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no orthopnea', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no paroxysmal nocturnal dyspnea', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no syncope', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no lightheadedness', answerType: ANSWER_TYPE.NORMAL },
              { name: 'chest pain', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'palpitations', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'edema', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'cyanosis', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'known heart murmur', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'orthopnea', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'paroxysmal nocturnal dyspnea', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'syncope', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'lightheadedness', answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no heartburn", answerType: ANSWER_TYPE.NORMAL },
              { name: "no dysphagia", answerType: ANSWER_TYPE.NORMAL },
              { name: "no nausea", answerType: ANSWER_TYPE.NORMAL },
              { name: "no vomiting", answerType: ANSWER_TYPE.NORMAL },
              { name: "no diarrhea", answerType: ANSWER_TYPE.NORMAL },
              { name: "no blood stools", answerType: ANSWER_TYPE.NORMAL },
              { name: "no rectal bleed", answerType: ANSWER_TYPE.NORMAL },
              { name: "no recent change in bowel habits", answerType: ANSWER_TYPE.NORMAL },
              { name: "no constipation", answerType: ANSWER_TYPE.NORMAL },

              { name: "heartburn", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "dysphagia", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "nausea", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "vomiting", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "diarrhea", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "blood stools", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "rectal bleed", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "recent change in bowel habits", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "constipation", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no impotence", answerType: ANSWER_TYPE.NORMAL },
              { name: "no hematuria", answerType: ANSWER_TYPE.NORMAL },
              { name: "no abnormal bleeding", answerType: ANSWER_TYPE.NORMAL },
              { name: "no difficulty urinating", answerType: ANSWER_TYPE.NORMAL },
              { name: "no increased frequency", answerType: ANSWER_TYPE.NORMAL },
              { name: "no abnormal urethral discharge", answerType: ANSWER_TYPE.NORMAL },
              { name: "no feelings of urgency", answerType: ANSWER_TYPE.NORMAL },
              { name: "no incontinence", answerType: ANSWER_TYPE.NORMAL },
              { name: "normal lubrication of vaginal mucosa", answerType: ANSWER_TYPE.NORMAL },


              { name: "impotence", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "hematuria", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "abnormal bleeding", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "difficulty urinating", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "abnormal urethral discharge", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "increased urinary frequency", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "urinary loss of control", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "incomplete emptying", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "feelings of urgency", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "inadequacy of lubrication of vaginal mucosa", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no muscle aches", answerType: ANSWER_TYPE.NORMAL },
              { name: "no muscle weakness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no arthralgias/joint pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no back pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no swelling in the extremities", answerType: ANSWER_TYPE.NORMAL },
              { name: "no stiffness", answerType: ANSWER_TYPE.NORMAL },

              { name: "muscle aches", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "muscle weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "arthralgias/joint pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "back pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "swelling in the extremities", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "stiffness", answerType: ANSWER_TYPE.ABNORMAL },

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
              { name: "no headaches", answerType: ANSWER_TYPE.NORMAL },
              { name: "no dizziness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no loss of consciousness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no weakness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no numbness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no slurred speech", answerType: ANSWER_TYPE.NORMAL },
              { name: "no seizures", answerType: ANSWER_TYPE.NORMAL },

              { name: "headaches", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "migraines", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "dizziness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "loss of consciousness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "numbness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "slurred speech", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "seizures", answerType: ANSWER_TYPE.ABNORMAL },

            ]
          }
        ]
      },
    ]
  }, {
    name: "Brief Infusion ROS",
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: "Systemic",
        questions: [
          {
            name: CONSTITUTIONAL,
            answers: [
              { name: "no active infection ", answerType: ANSWER_TYPE.NORMAL },
              { name: "no fever", answerType: ANSWER_TYPE.NORMAL },
              { name: "no night sweats", answerType: ANSWER_TYPE.NORMAL },
              { name: "no significant weight gain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no significant weight loss", answerType: ANSWER_TYPE.NORMAL },
              { name: "infection of fill", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.INPUT },
              { name: "fever", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "night sweats", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "weight gain fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
              { name: "weight loss fill lbs", answerType: ANSWER_TYPE.ABNORMAL, questionType: QuestionType.NUMBER },
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
              { name: 'no chest pain', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no shortness of breath when walking', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no shortness of breath when lying down', answerType: ANSWER_TYPE.NORMAL },
              { name: 'no palpitations', answerType: ANSWER_TYPE.NORMAL },

              { name: 'chest pain', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'shortness of breath when walking', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'shortness of breath when lying down', answerType: ANSWER_TYPE.ABNORMAL },
              { name: 'palpitations', answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no cough", answerType: ANSWER_TYPE.NORMAL },
              { name: "no wheezing", answerType: ANSWER_TYPE.NORMAL },
              { name: "no shortness of breath", answerType: ANSWER_TYPE.NORMAL },
              { name: "cough", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "wheezing", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "shortness of breath", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no rash", answerType: ANSWER_TYPE.NORMAL },
              { name: "rash", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: "Neurological",
        questions: [{
          name: "Neurological",
          answers: [
            { name: "no weakness", answerType: ANSWER_TYPE.NORMAL },
            { name: "no headache", answerType: ANSWER_TYPE.NORMAL },
            { name: "no dizziness", answerType: ANSWER_TYPE.NORMAL },
            { name: "weakness", answerType: ANSWER_TYPE.ABNORMAL },
            { name: "headache", answerType: ANSWER_TYPE.ABNORMAL },
            { name: "dizziness", answerType: ANSWER_TYPE.ABNORMAL },
          ]
        }]
      },
      {
        name: 'Gastrointestinal',
        questions: [
          {
            name: 'Gastrointestinal',
            answers: [
              { name: "no abdominal pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no vomiting", answerType: ANSWER_TYPE.NORMAL },
              { name: "normal appetite", answerType: ANSWER_TYPE.NORMAL },
              { name: "no diarrhea", answerType: ANSWER_TYPE.NORMAL },
              { name: "no blood vomiting", answerType: ANSWER_TYPE.NORMAL },
              { name: "no dysphagia", answerType: ANSWER_TYPE.NORMAL },
              { name: "no GERD", answerType: ANSWER_TYPE.NORMAL },

              { name: "abdominal pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "vomiting", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "change in appetite", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "black or tarry stools", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "frequent diarrhea", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "blood vomiting", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "dysphagia", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "GERD", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no muscle aches", answerType: ANSWER_TYPE.NORMAL },
              { name: "no muscle weakness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no arthralgias/joint pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no back pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no swelling in the extremities", answerType: ANSWER_TYPE.NORMAL },
              { name: "muscle aches", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "muscle weakness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "arthralgias/joint pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "back pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "swelling in the extremities", answerType: ANSWER_TYPE.ABNORMAL },

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
              { name: "no fatigue", answerType: ANSWER_TYPE.NORMAL },
              { name: "fatigue", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "increased thirst", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "hair loss", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "increased hair growth", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "cold intolerance", answerType: ANSWER_TYPE.ABNORMAL },
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
              { name: "no incontinence", answerType: ANSWER_TYPE.NORMAL },
              { name: "no difficulty urinating", answerType: ANSWER_TYPE.NORMAL },
              { name: "no hematuria", answerType: ANSWER_TYPE.NORMAL },
              { name: "no increased frequency", answerType: ANSWER_TYPE.NORMAL },
              { name: "urinary loss of control", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "difficulty urinating", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "increased urinary frequency", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "hematuria", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "incomplete emptying", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
    ]
  },
  {
    name: "Prenatal Nutrition Initial Visit",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: PRENATAL_NUTRITION_INITIAL_VISIT,
        questions: [
          {

            name: APPETITE,
            answers: [
              {
                name: "good",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "fair",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "poor",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {
            name: "Diet",
            answers: [
              {
                name: "breast-feeding",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "eats adequate fruits and vegetables",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "eats all whole grains",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "eats low fat protein sources",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "eats low glycemic choices",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "eats healthy snacks",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "not breast-feeding",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "eats no fruits and vegetables",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "eats all refined grains",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "eats high fat protein sources",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "eats high glycemic choices",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "eats fried carb snacks",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "favorite foods:",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "meals:",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "snacks:",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Fluid Intake",
            answers: [
              {
                name: "drinks calorie free beverages",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "drinks adequet fluids",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "never drinks coffee",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "never drinks alcohol",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "drinks excessive amount of sugary beverages",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "drinks very little fluids",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "fill drinks per week",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.NUMBER,
              },
              {
                name: "drinks coffee",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "drinks fill soda",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'regular', name: 'regular' }, { id: 'diet', name: 'diet' }],
              },
            ]
          },
          {
            name: "24 hour diet recall",
            answers: [
              {
                name: "breakfast",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "lunch",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "dinner",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Eating Disorders",
            answers: [
              {
                name: "no eating disorder",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "anorexia",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "bulemia",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "binge eating",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {
            name: "Weight History",
            answers: [
              {
                name: "high weight: fill pounds",
                answerType: ANSWER_TYPE.NORMAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "low weight: fill pounds",
                answerType: ANSWER_TYPE.NORMAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "desired/goal weight: fill pounds",
                answerType: ANSWER_TYPE.NORMAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "past diets",
                answerType: ANSWER_TYPE.NORMAL,
              },
            ]
          },
          {
            name: "GI",
            answers: [
              {
                name: "no heartburn",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no bloating",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no constipation",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no diarrhea",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no vomiting",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "heartburn",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "bloating",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "constipation",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "diarrhea",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "vomiting",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "bowel movements: fill per day",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "bowel movements: fill per week",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              },
            ]
          },
          {
            name: "Social",
            answers: [
              {
                name: "eats breakfast",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "cooks meals",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "food shops",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "likes to cook",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "does not eat breakfast",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "does not cook meals",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "does not food shop",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "does not like to cook",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "level of cooking skill",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "other special diets in the house",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "food budget fill",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "bowel movements: fill per week",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "fill meals per week taken away from home",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              }
            ]
          },
          {
            name: "Food Allergies or Intolerances",
            answers: [
              {
                name: "no food allergies",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no lactose intolerance",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no aversions/dislikes",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "food allergy to: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "lactose intolerance",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "aversions/dislikes",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {
            name: "Activity",
            answers: [
              {
                name: "exercises fill times per week",
                answerType: ANSWER_TYPE.NORMAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "sufficient activity",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "does not exercise",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "typical work out lasts fill minutes",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "typical work out consists of",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "active gym membership",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Lifestyle",
            answers: [
              {
                name: "motivated to make changes",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "losing weight",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "making dietary changes",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "does not eat when emotional",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "not very motivated to make changes",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "not losing weight",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "not making dietary changes",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "eats when emotional",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "barriers include",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Supplements",
            answers: [
              {
                name: "currently taking dietary supplement",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "currently taking vitamin supplement",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "High Risk Pregnancy",
            answers: [
              {
                name: "normal pregnancy",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "high-risk pregnancy",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
        ]
      },
    ],
  },
  {
    name: "Breast Pain",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: 'HPI',
        questions: [
          {

            name: "Location",
            answers: [
              {
                name: "right",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "left",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "bilateral",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "in the axilla",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "at the nipple",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "upper fill quadrant",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'inner', name: 'inner' }, { id: 'outer', name: 'outer' }]
              },
              {
                name: "lower fill quadrant",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'inner', name: 'inner' }, { id: 'outer', name: 'outer' }]
              },
            ]
          },
          {
            name: "Onset/Timing",
            answers: [
              {
                name: "1 day",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "2-7 days",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "1-2 weeks",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "2-4 weeks",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: ">1 month",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "morning",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "noon",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "evening",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "nighttime",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Duration",
            answers: [
              {
                name: "rare",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "constant",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "intermittent",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "fluctuates with menses",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Quality",
            answers: [
              {
                name: "sharp",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "dull",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "throbbing",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "burning",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "aching",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "stabbing",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "tingling",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "generalized",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "localized",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Severity",
            answers: [
              {
                name: "mild",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "moderate",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "severe",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Context",
            answers: [
              {
                name: "premenstrual",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "menstruating",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "premenopausal",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "post menopause",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "change in contraceptives",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "post partum",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "breastfeeding",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "miscarriage",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "abortion",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "breast cysts",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "benign breast tumor",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "fibrocystic breasts",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "sexually active",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "performs breast self examination",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "current estrogen use",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "history of estrogen use",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "history of ovaries removed",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "history of fertility treatments",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "history of fill prior biopsies",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "family history of breast cancer",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "history of fill breast cancer",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'right', name: 'right' }, { id: 'left', name: 'left' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "radiation treatment",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "mastectomy",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "lumpectomy",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Modifying Factors",
            answers: [
              {
                name: "touch",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "exercise",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "pressure",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Associated Symptoms",
            answers: [
              {
                name: "no fever",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no chills",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no skin redness",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no nipple discharge",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no sore nipples",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "breasts not full, sore, unable to express milk",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no breast swelling",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no arm pain",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no arm swelling",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "no chest pain",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "no malaise",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no breast lump",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "fever",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "redness of the skin",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "nipple discharge",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "sore nipples",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "breasts full, sore, unable to express milk",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "breast swelling",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "arm pain",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "arm swelling",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "chest pain",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "malaise",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "breast lump",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          }
        ]
      },
    ],
  },
  {
    name: "Joint & Soft Tissue Pain",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: 'HPI',
        questions: [
          {

            name: "Location",
            answers: [
              {
                name: "right",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "left",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "bilateral",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "anterior",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "posterior",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "medial",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "lateral",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "deep",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "superficial",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "joint pain",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "muscle aches",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "muscle spasms",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "diffuse nonspecific pain, swelling, and stiffness",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Quality",
            answers: [
              {
                name: "aching",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "burning",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "throbbing",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "sharp",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "dull",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "superficial",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "deep",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "trend is resolved",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "trend is not changing",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "trend is not improving",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "trend is not worsening",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {
            name: "Timing",
            answers: [
              {
                name: "occasional",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "frequent",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "constant",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Duration",
            answers: [
              {
                name: "fill days",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "fill weeks",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "fill months",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "fill years",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.NUMBER
              },
            ]
          },
          {
            name: "Severity",
            answers: [
              {
                name: "no pain",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "mild",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "moderate",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "severe",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "variable",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "pain level fill/10",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.NUMBER
              },
              {
                name: "worst pain fill/10",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.NUMBER
              },
            ]
          },
          {
            name: "Context",
            answers: [
              {
                name: "bending",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "lifting",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "twisting",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "sports injury",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "work injury",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "overuse",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Alleviating Factors",
            answers: [
              {
                name: "nothing helps",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "sitting",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "standing",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "lying down",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "position change",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "heat",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "ice",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "rest",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "elevation",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "exercise",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "stretching",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "limited weight bearing",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "PT/OT",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "chiropractic care",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "OTC medications",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "narcotics",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "NSAIDS",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "cortisone injection",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "vicosupplement injection",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "orthotics",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "previous surgery",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "brace",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "crutches",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "cane",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "wheelchair",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "walker",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Aggravating Factors",
            answers: [
              {
                name: "cannot identify",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "sitting",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "standing",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "lying down",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "walking",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "lifting",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "carrying",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "twisting",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "bending/squatting",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "pushing/pulling",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "throwing",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "ROM",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "weightbearing",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "exercise",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "getting out of bed",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "going from sit to stand",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "upstairs",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "downstairs",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "cold weather",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "damp weather",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {
            name: "Associated Symptoms",
            answers: [
              {
                name: "no weakness",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no numbness",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no tingling",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no swelling",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no redness",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no warmth",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no ecchymosis",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no catching/locking",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no popping/clicking",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no buckling",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no grinding",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no instability",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no radiation down leg",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no fever/chills",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no weight loss",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no change in bowel/bladder habits",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "weakness",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "numbness",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "tingling",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "swelling",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "redness",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "warmth",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "ecchymosis",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "catching/locking",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "popping/clicking",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "buckling",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "grinding",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "instability",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "radiation down leg",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "fever/chills",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "weight loss",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "change in bladder/bowel habits",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          }
        ]
      },
    ],
  },
  {
    name: "Concussion/Head Injury",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: 'HPI',
        questions: [
          {

            name: "Mechanism of Injury",
            answers: [
              {
                name: "fall with head contact with ground",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "fall with head contact with object",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "struck in head by object, type of object: fill",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.INPUT
              },
            ]
          },
          {
            name: "Onset/Timing",
            answers: [
              {
                name: "date fill",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "game",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "practice",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "other: fill",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.INPUT
              },
            ]
          },
          {
            name: "Context",
            answers: [
              {
                name: "no prior concussions",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no amnesic for events prior to injury",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no amnesic for events after injury",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "fill prior concussion(s)",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "date of occurrence fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "amnesic for events prior to injury",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "amnesic for events after injury lasting fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "unable to go to school",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "other symptoms fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "seen at ER fill",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "seen at urgent care fill",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.INPUT
              },
              {
                name: "evaluated by athletic trainer",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "evaluated by team physician",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "no medical attention",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "CT of head",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "plain film x-ray of head",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "plain film x-ray of neck",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
              {
                name: "no imaging studies performed",
                answerType: ANSWER_TYPE.NEUTRAL,
              },
            ]
          },
          {
            name: "Symptoms",
            answers: [
              {
                name: "no loss of consciousness",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "loss of consciousness",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "headache",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "pressure in head",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "neck pain",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "nausea/vomiting",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "dizziness",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "blurred vision",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "balance problems",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "sensitivity to light",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "sensitivity to noise",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "feeling slowed down",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "feeling like in a fog",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "don't feel right",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "difficulty concentrating",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "difficulty remembering",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "fatigue",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "confusion",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "drowsiness",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "trouble falling asleep",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "more emotional",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "irritability",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "sadness",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "nervous",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "anxiety",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          },
          {
            name: "Modifying Factors",
            answers: [
              {
                name: "no increase with physical activity",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "no increase with mental activity",
                answerType: ANSWER_TYPE.NORMAL,
              },
              {
                name: "increase with physical activity",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
              {
                name: "increase with mental activity",
                answerType: ANSWER_TYPE.ABNORMAL,
              },
            ]
          }
        ]
      },
    ],
  },
  {
    name: "Fever",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: "HPI",
        questions: [
          {
            name: QUALITY,
            answers: [
              { name: "cannot identify", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "symptoms worse during the day", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "symptoms worse in the evening", answerType: ANSWER_TYPE.NEUTRAL }
            ]
          },
          {
            name: SEVERITY,
            answers: [
              { name: "highest fever", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "improving", answerType: ANSWER_TYPE.NORMAL },
              { name: "worsening", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "same", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "pain fill", answerType: ANSWER_TYPE.NEUTRAL, questionType: QuestionType.NUMBER },
            ]
          },
          {
            name: DURATION,
            answers: [
              { name: "constant", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "intermittent", answerType: ANSWER_TYPE.NEUTRAL, },
              {
                name: "fever typically lasts fill", answerType: ANSWER_TYPE.NEUTRAL, questionType: QuestionType.SELECT, options:
                  [
                    {
                      id: "less_than_30_minutes", name: "<30 minutes"
                    },
                    {
                      id: "greater_than_30-60_minutes",
                      name: ">30-60 minutes"
                    },
                    {
                      id: "greater_than_1_hour",
                      name: ">1 hour"
                    },
                  ]
              },
              {
                name: "symptoms started fill",
                answerType: ANSWER_TYPE.NEUTRAL,
                questionType: QuestionType.SELECT,
                options: [
                  {
                    id: "days",
                    name: "days"
                  },
                  {
                    id: "weeks",
                    name: "weeks"
                  },
                  {
                    id: "months",
                    name: "months"
                  },
                ]
              },
            ]
          },
          {
            name: ONSET_TIMING,
            answers: [
              { name: "first recorded", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "random onset", answerType: ANSWER_TYPE.NEUTRAL, },
              { name: "occurs in a pattern", answerType: ANSWER_TYPE.NEUTRAL, },
              { name: "fill days/week", answerType: ANSWER_TYPE.NEUTRAL, questionType: QuestionType.INPUT },
            ]
          },
          {
            name: CONTEXT,
            answers: [
              { name: "no recent travel", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tick/insect bites", answerType: ANSWER_TYPE.NORMAL, },
              { name: "no new medications", answerType: ANSWER_TYPE.NORMAL, },
              { name: "no animal exposure", answerType: ANSWER_TYPE.NORMAL, },
              { name: "no recent surgery/procedure", answerType: ANSWER_TYPE.NORMAL, },
              { name: "no recent dental work", answerType: ANSWER_TYPE.NORMAL, },
              { name: "no IV drug use", answerType: ANSWER_TYPE.NORMAL, },
              { name: "no immunocompromise", answerType: ANSWER_TYPE.NORMAL, },
              { name: "recent travel", answerType: ANSWER_TYPE.ABNORMAL, },
              { name: "recent tick/insect bites", answerType: ANSWER_TYPE.ABNORMAL, },
              { name: "new medications", answerType: ANSWER_TYPE.ABNORMAL, },
              { name: "animal exposure", answerType: ANSWER_TYPE.ABNORMAL, },
              { name: "recent surgery/procedure", answerType: ANSWER_TYPE.ABNORMAL, },
              { name: "recent dental work", answerType: ANSWER_TYPE.ABNORMAL, },
              { name: "IV drug use", answerType: ANSWER_TYPE.ABNORMAL, },
              { name: "immunocompromise", answerType: ANSWER_TYPE.ABNORMAL, },
            ]
          },
          {
            name: MODIFYING_FACTORS,
            answers: [
              { name: "nothing gives relief", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "nothing makes it worse", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "OTC medication", answerType: ANSWER_TYPE.NEUTRAL },

            ]
          },
          {
            name: ASSOCIATED_SYMPTOMS,
            answers: [
              { name: "no rash", answerType: ANSWER_TYPE.NORMAL },
              { name: "no lethargy", answerType: ANSWER_TYPE.NORMAL },
              { name: "no night sweats", answerType: ANSWER_TYPE.NORMAL },
              { name: "no headache", answerType: ANSWER_TYPE.NORMAL },
              { name: "no cold symptoms", answerType: ANSWER_TYPE.NORMAL },
              { name: "no diarrhea", answerType: ANSWER_TYPE.NORMAL },
              { name: "no vomiting", answerType: ANSWER_TYPE.NORMAL },
              { name: "no palpitations", answerType: ANSWER_TYPE.NORMAL },
              { name: "no unintentional weight loss", answerType: ANSWER_TYPE.NORMAL },
              { name: "no lower extremity edema", answerType: ANSWER_TYPE.NORMAL },
              { name: "no pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no chills", answerType: ANSWER_TYPE.NORMAL },
              { name: "no shortness of breath", answerType: ANSWER_TYPE.NORMAL },
              { name: "no nasal congestion/discharge", answerType: ANSWER_TYPE.NORMAL },
              { name: "no sore throat", answerType: ANSWER_TYPE.NORMAL },
              { name: "no abdominal pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "rash", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "lethargy", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "night sweats", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "headache", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "cold symptoms", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "diarrhea", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "vomiting", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "rapid or irregular heartbeat (palpitations)", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "weight loss (abnormal)", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "lower extremity edema", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "generalized pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "chills", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "shortness of breath", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "nasal congestion/discharge", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "sore throat", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "flank pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "abdominal pain", answerType: ANSWER_TYPE.ABNORMAL },

            ]
          }
        ]
      }
    ]
  },
  {
    name: "Breast Mass",
    templateType: TemplateType.HPI,
    sections: [
      {
        name: "HPI",
        questions: [
          {
            name: "Location",
            answers: [
              { name: "right", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "left", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "bilateral", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "upper fill quadrant", answerType: ANSWER_TYPE.NEUTRAL, questionType: QuestionType.SELECT, options: [{ id: "inner", name: "inner" }, { id: "outer", name: "outer" }] },
              { name: "lower fill quadrant", answerType: ANSWER_TYPE.NEUTRAL, questionType: QuestionType.SELECT, options: [{ id: "inner", name: "inner" }, { id: "outer", name: "outer" }] },
              { name: "nipple", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "areola", answerType: ANSWER_TYPE.NEUTRAL }
            ]
          },
          {
            name: ONSET_TIMING,
            answers: [
              { name: "1 day", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "2-7 days", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "1-2 weeks", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "2-4 weeks", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "1-4 months", answerType: ANSWER_TYPE.NEUTRAL },
              { name: ">4 months", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "morning", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "evening", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "nighttime", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "sudden", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "gradual", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "after starting new medication", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "associated with change in diet", answerType: ANSWER_TYPE.NEUTRAL },
            ]
          },
          {
            name: QUALITY,
            answers: [
              { name: "size fill", answerType: ANSWER_TYPE.NEUTRAL, questionType: QuestionType.INPUT, },
              { name: "unit fill", answerType: ANSWER_TYPE.NEUTRAL, questionType: QuestionType.SELECT, options: [{ id: "cm", name: "cm" }, { id: "mm", name: "mm" }] },
              { name: "asymptomatic", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "painful", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "sharp", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "dull", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "localized", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "radiating", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "soft", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "firm", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "tender", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "fixed", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "mobile", answerType: ANSWER_TYPE.NEUTRAL },
            ]
          },
          {
            name: SEVERITY,
            answers: [
              { name: "mild", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "moderate", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "severe", answerType: ANSWER_TYPE.NEUTRAL },
            ]
          },
          {
            name: DURATION,
            answers: [
              { name: "intermittent", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "constant", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "persistent", answerType: ANSWER_TYPE.NEUTRAL },
            ]
          },
          {
            name: CONTEXT,
            answers: [
              { name: "performs breast self examination", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "fill prior biopsies", answerType: ANSWER_TYPE.NEUTRAL, questionType: QuestionType.INPUT },
              { name: "fibrocystic breasts", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "breast cysts", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "benign breast tumor", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "prior fill prior", answerType: ANSWER_TYPE.NEUTRAL, questionType: QuestionType.SELECT, options: [{ id: "right", name: "right" }, { id: "left", name: "left" }, { id: "bilateral", name: "bilateral" }] },
              { name: "lumpectomy", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "mastectomy", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "radiation treatment", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "history of estrogen use", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "current estrogen use", answerType: ANSWER_TYPE.NEUTRAL },
            ]
          },
          {
            name: MODIFYING_FACTORS,
            answers: [
              { name: "touch", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "pressure", answerType: ANSWER_TYPE.NEUTRAL },
            ]
          },
          {
            name: ASSOCIATED_SYMPTOMS,
            answers: [
              { name: "no fever", answerType: ANSWER_TYPE.NORMAL },
              { name: "no skin redness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no nipple discharge", answerType: ANSWER_TYPE.NORMAL },
              { name: "no breast swelling", answerType: ANSWER_TYPE.NORMAL },
              { name: "no arm pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no arm swelling", answerType: ANSWER_TYPE.NORMAL },
              { name: "no chest pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "fever", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "redness of the skin", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "nipple discharge", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "breast swelling", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "arm pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "arm swelling", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "chest pain", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Brief Pediatric Obesity ROS",
    templateType: TemplateType.REVIEW_OF_SYSTEM,
    sections: [
      {
        name: 'General',
        questions: [
          {
            name: "General",
            answers: [
              { name: "no malaise", answerType: ANSWER_TYPE.NORMAL },
              { name: "no fatigue", answerType: ANSWER_TYPE.NORMAL },
              { name: "no lethargy", answerType: ANSWER_TYPE.NORMAL },
              { name: "no anxiety", answerType: ANSWER_TYPE.NORMAL },
              { name: "no depression", answerType: ANSWER_TYPE.NORMAL },
              { name: "no hyperactivity", answerType: ANSWER_TYPE.NORMAL },
              { name: "malaise", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "fatigue", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "lethargy", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "anxiety", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "depression", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "hyperactivity", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
        ]
      }, {
        name: 'Skin',
        questions: [
          {
            name: 'Skin',
            answers: [
              { name: "no pruritus", answerType: ANSWER_TYPE.NORMAL },
              { name: "no rash", answerType: ANSWER_TYPE.NORMAL },
              { name: "no sleep apnea", answerType: ANSWER_TYPE.NORMAL },
              { name: "no snoring", answerType: ANSWER_TYPE.NORMAL },
              { name: "no daytime sleepiness", answerType: ANSWER_TYPE.NORMAL },
              { name: "no nasal congestion", answerType: ANSWER_TYPE.NORMAL },

              { name: "pruritus", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "rash", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "sleep apnea", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "snoring", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "daytime sleepiness", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "nasal congestion", answerType: ANSWER_TYPE.ABNORMAL },

            ]
          }
        ]
      },
      {
        name: 'Cardiovascular',
        questions: [
          {
            name: 'Cardiopulmonary',
            answers: [
              { name: "no palpitations", answerType: ANSWER_TYPE.NORMAL },
              { name: "no chest pain", answerType: ANSWER_TYPE.NORMAL },

              { name: "palpitations", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "chest pain", answerType: ANSWER_TYPE.ABNORMAL },

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
              { name: "no cough", answerType: ANSWER_TYPE.NORMAL },
              { name: "no wheezing", answerType: ANSWER_TYPE.NORMAL },
              { name: "no shortness of breath", answerType: ANSWER_TYPE.NORMAL },
              { name: "no coughing up blood", answerType: ANSWER_TYPE.NORMAL },
              { name: "cough", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "wheezing", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "shortness of breath", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "coughing up blood", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      }, {
        name: 'Gastrointestinal',
        questions: [
          {
            name: 'GI',
            answers: [
              { name: "no abdominal pain", answerType: ANSWER_TYPE.NORMAL },
              { name: "no heartburn", answerType: ANSWER_TYPE.NORMAL },
              { name: "no nausea", answerType: ANSWER_TYPE.NORMAL },
              { name: "no vomiting", answerType: ANSWER_TYPE.NORMAL },
              { name: "no constipation", answerType: ANSWER_TYPE.NORMAL },
              { name: "no blood stools", answerType: ANSWER_TYPE.NORMAL },

              { name: "abdominal pain", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "heartburn", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "nausea", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "vomiting", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "constipation", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "blood stools", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: "Genitourinary",
        questions: [
          {
            name: 'GU',
            answers: [
              { name: "no polyuria", answerType: ANSWER_TYPE.NORMAL },
              { name: "no polydipsia", answerType: ANSWER_TYPE.NORMAL },
              { name: "no nocturnal enuresis", answerType: ANSWER_TYPE.NORMAL },
              { name: "no oligomenorrhea", answerType: ANSWER_TYPE.NORMAL },
              { name: "no amenorrhea", answerType: ANSWER_TYPE.NORMAL },
              { name: "polyuria", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "polydipsia", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "nocturnal enuresis", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "oligomenorrhea", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "amenorrhea", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      },
      {
        name: "Neuromuscular",
        questions: [{
          name: "Neuromuscular",
          answers: [
            { name: "no headache", answerType: ANSWER_TYPE.NORMAL },
            { name: "no syncope", answerType: ANSWER_TYPE.NORMAL },
            { name: "no weakness", answerType: ANSWER_TYPE.NORMAL },
            { name: "no hip/knee pain", answerType: ANSWER_TYPE.NORMAL },
            { name: "no restricted ROM", answerType: ANSWER_TYPE.NORMAL },
            { name: "headache", answerType: ANSWER_TYPE.ABNORMAL },
            { name: "fainting (syncope)", answerType: ANSWER_TYPE.ABNORMAL },
            { name: "weakness", answerType: ANSWER_TYPE.ABNORMAL },
            { name: "hip/knee pain", answerType: ANSWER_TYPE.ABNORMAL },
            { name: "restricted ROM", answerType: ANSWER_TYPE.ABNORMAL },
          ]
        }]
      },
      {
        name: PSYCHIATRIC,
        questions: [
          {
            name: PSYH,
            answers: [
              { name: "no sleep disturbances", answerType: ANSWER_TYPE.NORMAL },
              { name: "feeling safe in relationship", answerType: ANSWER_TYPE.NORMAL },
              { name: "no alcohol abuse", answerType: ANSWER_TYPE.NORMAL },
              { name: "sleep disturbances", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "restless sleep", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "feeling unsafe in relationship", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "alcohol abuse", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      }, {
        name: HEMATOLOGIC_LYMPHATIC,
        questions: [
          {
            name: HEMATOLOGIC_LYMPHATIC,
            answers: [
              { name: "no swollen glands", answerType: ANSWER_TYPE.NORMAL },
              { name: "no bruising", answerType: ANSWER_TYPE.NORMAL },
              { name: "swollen glands", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "easy bruising", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "excessive bleeding", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Fibromyalgia Exam",
    templateType: TemplateType.PHYSICAL_EXAM,
    sections: [
      {
        name: 'Positive tender points using 4 kg force',
        questions: [
          {
            name: "Method",
            answers: [
              { name: "using finger", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "using algometer", answerType: ANSWER_TYPE.NEUTRAL },
            ]
          },
          {
            name: "Right Muscles",
            answers: [
              { name: "no tender points on suboccpital muscles", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on low cervical at CS-7 level", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on trapezius", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on supraspinatus", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on 2nd costochondral junction", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on lateral epicondyle", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on gluteal", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on greater trochanter", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on medial knee", answerType: ANSWER_TYPE.NORMAL },
              { name: "tender points on suboccpital muscles", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on low cervical at CS-7 level", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on trapezius", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on supraspinatus", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on 2nd costochondral junction", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on lateral epicondyle", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on gluteal", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on greater trochanter", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on medial knee", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Left Muscles",
            answers: [
              { name: "no tender points on suboccpital muscles", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on low cervical at CS-7 level", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on trapezius", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on supraspinatus", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on 2nd costochondral junction", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on lateral epicondyle", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on gluteal", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on greater trochanter", answerType: ANSWER_TYPE.NORMAL },
              { name: "no tender points on medial knee", answerType: ANSWER_TYPE.NORMAL },
              { name: "tender points on suboccpital muscles", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on low cervical at CS-7 level", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on trapezius", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on supraspinatus", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on 2nd costochondral junction", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on lateral epicondyle", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on gluteal", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on greater trochanter", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tender points on medial knee", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Findings",
            answers: [
              { name: "no tender points", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "total fibromyalgia tender points: fill/18",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: Array.from({ length: 10 }, (_, i) => i + 1).map((value) => {
                  return {
                    id: String(value),
                    name: String(value)
                  }
                })
              },
            ]
          },
        ]
      }
    ]
  },
  {
    name: "Mental Status Exam",
    templateType: TemplateType.PHYSICAL_EXAM,
    sections: [
      {
        name: 'Mental Status Exam',
        questions: [
          {
            name: "Appearance",
            answers: [
              { name: "well-groomed", answerType: ANSWER_TYPE.NORMAL },
              { name: "clean", answerType: ANSWER_TYPE.NORMAL },
              { name: "normal weight", answerType: ANSWER_TYPE.NORMAL },
              { name: "disheveled", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "body odor", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "soiled clothing", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "underweight", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "overweight", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "obesity", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "appears fatigued", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Behavior",
            answers: [
              { name: "eye contact", answerType: ANSWER_TYPE.NORMAL },
              { name: "cooperative", answerType: ANSWER_TYPE.NORMAL },
              { name: "calm", answerType: ANSWER_TYPE.NORMAL },
              { name: "pleasant", answerType: ANSWER_TYPE.NORMAL },
              { name: "active", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "hyperactive", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "agitated", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "impulsive", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "disruptive", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "oppositional", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "guarded", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "aggressive", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Speech",
            answers: [
              { name: "fluent", answerType: ANSWER_TYPE.NORMAL },
              { name: "clear", answerType: ANSWER_TYPE.NORMAL },
              { name: "normal volume", answerType: ANSWER_TYPE.NORMAL },
              { name: "soft", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "loud", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "lisp", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "slow", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "pressured", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "stutter", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "impediment", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "speech delay", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "absent speech", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "speech refusal", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "monotone", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "reciprocal", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Perception",
            answers: [
              { name: "no hallucinations", answerType: ANSWER_TYPE.NORMAL },
              { name: "visual hallucinations", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "auditory hallucinations", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "olfactory hallucinations", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tactile hallucinations", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Cognition",
            answers: [
              { name: "alert", answerType: ANSWER_TYPE.NORMAL },
              { name: "oriented to situation", answerType: ANSWER_TYPE.NORMAL },
              { name: "oriented to time", answerType: ANSWER_TYPE.NORMAL },
              { name: "oriented to person", answerType: ANSWER_TYPE.NORMAL },
              { name: "memory intact", answerType: ANSWER_TYPE.NORMAL },
              { name: "normal concentrating ability", answerType: ANSWER_TYPE.NORMAL },
              { name: "normal attention", answerType: ANSWER_TYPE.NORMAL },
              { name: "disoriented to situation", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "disoriented to time", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "disoriented to place", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "disoriented to person", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "memory impaired", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "impaired concentration", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "impaired attention", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Intelligence",
            answers: [
              { name: "above average", answerType: ANSWER_TYPE.NORMAL },
              { name: "below average", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "average", answerType: ANSWER_TYPE.NEUTRAL },
            ]
          },
          {
            name: "Memory",
            answers: [
              { name: "remote", answerType: ANSWER_TYPE.NEUTRAL },
              { name: "recent", answerType: ANSWER_TYPE.NEUTRAL },
            ]
          },
          {
            name: "Mood",
            answers: [
              { name: "euthymic", answerType: ANSWER_TYPE.NORMAL },
              { name: "sad", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "irritable", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "labile", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "apathetic", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "elated", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "angry", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Affect",
            answers: [
              { name: "pleasant", answerType: ANSWER_TYPE.NORMAL },
              { name: "happy", answerType: ANSWER_TYPE.NORMAL },
              { name: "congruent to thought content", answerType: ANSWER_TYPE.NORMAL },
              { name: "anxious", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "angry", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "hostile", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "sullen", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "sad", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tearful", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "flat", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "constricted", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "incongruent to thought content", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "expansive", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "euphoric", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Insight",
            answers: [
              { name: "intact", answerType: ANSWER_TYPE.NORMAL },
              { name: "impaired", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Judgment",
            answers: [
              { name: "intact", answerType: ANSWER_TYPE.NORMAL },
              { name: "impaired", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Thought Processes",
            answers: [
              { name: "intact", answerType: ANSWER_TYPE.NORMAL },
              { name: "perseveration", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "circumstantial", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "tangential", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "loose", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "flight of ideas", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "thought blocking", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Thought Content",
            answers: [
              { name: "unremarkable", answerType: ANSWER_TYPE.NORMAL },
              { name: "thoughts of self-harm", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "suicidal ideation", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "homicidal ideation", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "delusions", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "obsessions", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
          {
            name: "Thought Content",
            answers: [
              { name: "intact", answerType: ANSWER_TYPE.NORMAL },
              { name: "tremor", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "vocal tic", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "motor tics", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "EPS", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "unsteady", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "abnormal movements", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
        ]
      }
    ]
  },
  {
    name: "Brief Eye Exam",
    templateType: TemplateType.PHYSICAL_EXAM,
    sections: [
      {
        name: 'Constitutional',
        questions: [
          {
            name: "General Appearance",
            answers: [
              { name: "healthy-appearing", answerType: ANSWER_TYPE.NORMAL },
              { name: "well-nourished", answerType: ANSWER_TYPE.NORMAL },
              { name: "well-developed", answerType: ANSWER_TYPE.NORMAL },
              { name: "cachectic", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "too thin", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "overweight", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "obese", answerType: ANSWER_TYPE.ABNORMAL },
              { name: "morbidly obese", answerType: ANSWER_TYPE.ABNORMAL },
            ]
          },
        ]
      },
      {
        name: 'Eyes',
        questions: [
          {
            name: 'Lids',
            answers: [
              { name: "no erythema", answerType: ANSWER_TYPE.NORMAL },
              { name: "no swelling", answerType: ANSWER_TYPE.NORMAL },
              { name: "no lesions", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "erythema: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "swelling: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "lesions: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "ptosis: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "xanthelasma: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
            ]
          },
          {
            name: 'Conjunctivae',
            answers: [
              { name: "non-injected", answerType: ANSWER_TYPE.NORMAL },
              { name: "no discharge", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "injected: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'generalized', name: 'generalized' }, { id: 'localized', name: 'localized' }]
              },
              {
                name: "injected: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "clear discharge: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "purulent discharge: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "mucoid discharge: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "exophthalmos: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "chemosis: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
            ]
          },
          {
            name: 'Pupils',
            answers: [
              { name: "PERRLA", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "nonreactive to light: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'generalized', name: 'generalized' }, { id: 'localized', name: 'localized' }]
              },
              {
                name: "anisocoria: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
            ]
          },
          {
            name: 'Corneas',
            answers: [
              { name: "grossly intact", answerType: ANSWER_TYPE.NORMAL },
              { name: "fluorescein stain--normal", answerType: ANSWER_TYPE.NORMAL },
              { name: "no abrasion", answerType: ANSWER_TYPE.NORMAL },
              { name: "no opacity", answerType: ANSWER_TYPE.NORMAL },
              { name: "no ulceration", answerType: ANSWER_TYPE.NORMAL },
              { name: "no foreign body", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "fluorescein stain--abnormal: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "abrasion: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "opacity: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "ulceration: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "hazy: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "arcus senilis: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "foreign body: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
            ]
          },
          {
            name: 'EOM',
            answers: [
              { name: "EOMI", answerType: ANSWER_TYPE.NORMAL },
              { name: "no discharge", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "dysconjugated: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "strabismus: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "nystagmus: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
            ]
          },
          {
            name: 'Lens',
            answers: [
              { name: "clear", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "cataract: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
            ]
          },
          {
            name: 'Sclerae',
            answers: [
              { name: "non-icteric", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "injected: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "icteric: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "abrasion: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "hypopyon: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "ciliary flush: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "hemorrhage: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
            ]
          },
          {
            name: 'Vision',
            answers: [
              { name: "peripheral vision grossly intact", answerType: ANSWER_TYPE.NORMAL },
              { name: "acuity grossly intact", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "field cut: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "acuity impaired: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
            ]
          },
          {
            name: 'Optic Disc',
            answers: [
              { name: "no blurred margins", answerType: ANSWER_TYPE.NORMAL },
              { name: "no hemorrhages", answerType: ANSWER_TYPE.NORMAL },
              { name: "no papilledema", answerType: ANSWER_TYPE.NORMAL },
              { name: "no optic cupping", answerType: ANSWER_TYPE.NORMAL },
              { name: "no AV nicking", answerType: ANSWER_TYPE.NORMAL },
              { name: "no exudates", answerType: ANSWER_TYPE.NORMAL },
              {
                name: "blurred margins: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "hemorrhages: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "papilledema: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "optic cupping: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "AV nicking: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
              {
                name: "exudates: fill",
                answerType: ANSWER_TYPE.ABNORMAL,
                questionType: QuestionType.SELECT,
                options: [{ id: 'left', name: 'left' }, { id: 'right', name: 'right' }, { id: 'bilateral', name: 'bilateral' },]
              },
            ]
          },
        ]
      },
    ]
  },
];


export const TEMPLATE_DATA: TemplatesType[] = [...templateData, ...templates] 