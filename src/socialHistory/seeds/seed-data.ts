import { QuestionType } from "src/lib/constants";

//sections name
const ACTIVITIES_OF_DAILY_LIVING = 'Activities of Daily Living';
const PUBLIC_HEALTH_TRAVEL = "Public Health and Travel";

// social selectors

const ABLE_WALK_MAPPED = [
  { id: "RESTRICTIONS", name: "Yes: walks without restrictions" },
  { id: "ASSISTIVE", name: "Yes: walks with assistive device(s)" },
  { id: "SELF_MOBILITY", name: "Yes: limited self-mobility with assistive device(s); generally relies on wheeled mobility" },
  { id: "CONFINED", name: "No: Confined to chair" },
  { id: "INDEPENDENT_WHEELCHAIR", name: "No: Independent in wheelchair" },
  { id: "HELP_WHEELCHAIR", name: "No: Requires minimal help in wheelchair" },
  { id: "PUSHING_WHEELCHAIR", name: "No: Dependent on helper pushing wheelchair" },
  { id: "UNABLE_WALK", name: "No: Unable to walk" },
  { id: "UNABLE_INITIATE_WALKING", name: "No: Unable to initiate walking" },
  { id: "BED_RIDDEN", name: "No: Bed-ridden" },
]

export const SMOKED_TOBACCO_MAPPED = [
  { id: "NEVER_SMOKER", name: "Never smoker" },
  { id: "FORMER_SMOKER", name: "Former smoker" },
  { id: "EVERYDAY_SMOKER", name: "Current every day smoker" },
  { id: "SOME_DAY_SMOKER", name: "Current some days smoker" },
  { id: "STATUS_UNKNOWN", name: "Smoker - current status unknown" },
  { id: "EVER_SMOKED", name: "Unknown if ever smoked" },
  { id: "NOT_TOLERATED", name: "Not tolerated" },
  { id: "PATIENT_REFUSED", name: "Patient refused" },
  { id: "NOT_INDICATED", name: "Not indicated" },
]

export const ALCOHOL_CONSUMPTION_MAPPED = [
  { id: "NONE", name: "None" },
  { id: "OCCASIONAL", name: "Occasional" },
  { id: "MODERATE", name: "Moderate" },
  { id: "HEAVY", name: "Heavy" },
]

export const CAFFEINE_CONSUMPTION_MAPPED = [
  { id: "NONE", name: "None" },
  { id: "OCCASIONAL", name: "Occasional" },
  { id: "MODERATE", name: "Moderate" },
  { id: "HEAVY", name: "Heavy" },
]

export const CHILD_CARE_MAPPED = [
  { id: "NONE", name: "None" },
  { id: "RELATIVE", name: "Relative" },
  { id: "PRIVATE_SITTER", name: "Private sitter" },
  { id: "DAYCARE", name: "Daycare/preschool" },
]

export const FLUORIDE_STATUS_MAPPED = [
  { id: "FLUORIDATED", name: "Fluoridated" },
  { id: "NON_FLUORIDATED", name: "Non-fluoridated" },
  { id: "UNKNOWN", name: "Unknown" },
]

export const FEEL_STRESSED_MAPPED = [
  { id: "NOT_AT_ALL", name: "Not at all" },
  { id: "ONLY_LITTLE", name: "Only a little" },
  { id: "SOME_CONTEXT", name: "To some extent" },
  { id: "RATHER_MUCH", name: "Rather much" },
  { id: "VERY_MUCH", name: "Very much" },
]

export const HIGHEST_GRADE_MAPPED = [
  { id: "NEVER_ATTEND", name: "Never attended/kindergarten only" },
  { id: "FIRST_GRADE", name: "1st grade" },
  { id: "SECOND_GRADE", name: "2nd grade" },
  { id: "THIRD_GRADE", name: "3rd grade" },
  { id: "FORTH_GRADE", name: "4th grade" },
  { id: "FIFTH_GRADE", name: "5th grade" },
  { id: "SIXTH_GRADE", name: "6th grade" },
  { id: "SEVENTH_GRADE", name: "7th grade" },
  { id: "EIGHTH_GRADE", name: "8th grade" },
  { id: "NINTH_GRADE", name: "9th grade" },
  { id: "TENTH_GRADE", name: "10th grade" },
  { id: "ELEVENTH_GRADE", name: "11th grade" },
  { id: "TWELVE_GRADE", name: "12th grade, no diploma" },
  { id: "GED_EQUIVALENT", name: "GED or equivalent" },
  { id: "HIGH_SCHOOL_GRADUATE", name: "High school graduate" },
  { id: "NO_DEGREE", name: "Some college, no degree" },
  { id: "ASSOCIATE_DEGREE_VOCATIONAL", name: "Associate degree: occupational, technical, or vocational program" },
  { id: "ASSOCIATE_DEGREE_ACADEMIC", name: "Associate degree: academic program" },
  { id: "BACHELORS_DEGREE", name: "Bachelor's degree (e.g., BA, AB, BS)" },
  { id: "MASTERS_DEGREE", name: "Master's degree (e.g., MA, MS, MEng, MEd, MSW, MBA)" },
  { id: "PROFESSIONAL_SCHOOL_DEGREE", name: "Professional school degree (example: MD, DDS, DVM, JD)" },
  { id: "DOCTOR_DEGREE", name: "Doctoral degree (example:PhD, EdD)" },
  { id: "DONT_KNOW", name: "Don't know" },
  { id: "REFUSED", name: "Refused" },
]

export const RELATIONSHIP_STATUS_MAPPED = [
  { id: "UNKNOWN", name: "Unknown" },
  { id: "MARRIED", name: "Married" },
  { id: "SINGLE", name: "Single" },
  { id: "DIVORCED", name: "Divorced" },
  { id: "SEPARATED", name: "Separated" },
  { id: "WIDOWED", name: "Widowed" },
  { id: "DOMESTIC_PARTNER", name: "Domestic partner" },
  { id: "OTHER", name: "Other" },
]

export const DIET_TYPE_MAPPED = [
  { id: "REGULAR", name: "Regular" },
  { id: "VEGETARIAN", name: "Vegetarian" },
  { id: "VEGAN", name: "Vegan" },
  { id: "GLUTEN_FREE", name: "Gluten free" },
  { id: "SPECIFIC", name: "Specific" },
  { id: "CARBOHYDRATE", name: "Carbohydrate" },
  { id: "CARDIAC", name: "Cardiac" },
  { id: "DIABETIC", name: "Diabetic" },
]

export const EXERCISE_LEVEL_MAPPED = [
  { id: "NONE", name: "None" },
  { id: "OCCASIONAL", name: "Occasional" },
  { id: "MODERATE", name: "Moderate" },
  { id: "HEAVY", name: "Heavy" },
]

export const GENDER_IDENTITY_MAPPED = [
  { id: "MALE_IDENTIFIES", name: "Identifies as Male" },
  { id: "FEMALE_IDENTIFIES", name: "Identifies as Female" },
  { id: "TRANSGENDER_FTM", name: "Transgender Male/Female-to-Male (FTM)" },
  { id: "TRANSGENDER_MTF", name: "Transgender Female/Male-to-Female (MTF)" },
  { id: "GENDER_NON_CONFIRM", name: "Gender non-conforming (neither exclusively male nor female)" },
  { id: "GENDER_CATEGORY", name: "Additional gender category / other, please specify" },
  { id: "NOT_DISCLOSE", name: "Choose not to disclose" },
]

export const SEX_AT_BIRTH_MAPPED = [
  { id: "MALE", name: "Male" },
  { id: "FEMALE", name: "Female" },
  { id: "NOT_DISCLOSE", name: "Choose not to disclose" },
  { id: "UNKNOWN", name: "Unknown" },
]

export const PRONOUNS_MAPPED = [
  { id: "HE", name: "he/him" },
  { id: "SHE", name: "she/her" },
  { id: "THEY", name: "they/them" },
]

export const SEXUAL_ORIENTATION_MAPPED = [
  { id: "LESBIAN", name: "Lesbian, gay or homosexual" },
  { id: "STRAIGHT", name: "Straight or heterosexual" },
  { id: "BISEXUAL", name: "Bisexual" },
  { id: "SOMETHING_ELSE", name: "Something else, please describe" },
  { id: "DONT_KNOW", name: "Don't know" },
  { id: "NOT_DISCLOSE", name: "Choose not to disclose" },
]

export const CIGARETTE_LEVEL_MAPPED = [
  {
    id: 'never_used_electronic_cigarettes',
    name: "Never used electronic cigarettes"
  },
  {
    name: "Former user of electronic cigarettes",
    id: 'former_user_of_electronic_cigarettes'
  },
  {
    id: 'current_user_of_electronic_cigarettes',
    name: "Current user of electronic cigarettes"
  }
]

export const SMOKELESS_TOBACCO_MAPPED = [
  {
    id: "never_used_smokeless_tobacco",
    name: "Never used smokeless tobacco",
  },
  {
    name: "Former smokeless tobacco user",
    id: "former_smokeless_tobacco_user",
  },
  {
    id: "currently_uses_moist_powdered_tobacco",
    name: "Currently uses moist powdered tobacco",
  },
  {
    id: "not_tolerated",
    name: "Not tolerated",
  },
  {
    id: "patient_refused",
    name: "Patient refused",
  },
  {
    id: "not_indicated",
    name: "Not indicated",
  },
];


export const SEX_PROTECTION_MAPPED = [
  {
    id: "always",
    name: "Always",
  },
  {
    id: "usually",
    name: "Usually",
  },
  {
    id: "no",
    name: "No",
  },
];

//activities questions 

const ABLE_TO_CARE_YOURSELF = "Are you able to care for yourself?";
const BLIND_OR_DO_YOU_HAVE_DIFFICULTY_SEEING = "Are you blind or do you have difficulty seeing?";
const DEAF_OR_DO_YOU_HAVE_DIFFICULTY_SEEING = "Are you deaf or do you have serious difficulty hearing?";
const DIFFICULTY_CONCENTRATING_MAKING_DECISION = "Do you have difficulty concentrating, remembering or making decisions?";
const DIFFICULTY_WALKING_CLIMBING = "Do you have difficulty walking or climbing stairs?";
const DIFFICULTY_DRESSING_BATHING = "Do you have difficulty dressing or bathing?";
const DIFFICULTY_DOING_ERRANDS_ALONE = "Do you have difficulty doing errands alone?";
const ARE_YOU_ABLE_TO_WALK = "Are you able to walk?";
const DO_YOU_HAVE_TRANSPORTATION_DIFFICULTIES = "Do you have transportation difficulties?";

//public health travel 

const HAVE_YOU_BEEN_TO_AN_AREA_KNOWN_HIGH_RISK = "Have you been to an area known to be high risk for COVID-19?";
const IN_THE_14_DAYS_BEFORE_SYMPTOM_ONSET_CASE_ILL = "In the 14 days before symptom onset, have you had close contact with a laboratory-confirmed COVID-19 while that case was ill?";
const IN_THE_14_DAYS_BEFORE_SYMPTOM_ONSET_PERSON_ILL = "In the 14 days before symptom onset, have you had close contact with a person who is under investigation for COVID-19 while that person was ill?";
const RESIDE_IN_OR_HAVE_YOU_TRAVELED = "Do you reside in or have you traveled to an area where Ebola virus transmission is active?";
const HAVE_YOU_PROCESSED_BLOOD_BODY_FLUIDS = "Have you processed blood or body fluids from an Ebola virus disease patient without appropriate PPE?";
const HAVE_YOU_RECENTLY_PLANNING_TO_TRAVEL = "Have you recently or are you planning to travel to an area with Zika virus?";

//activities questions

const activitiesQuestions = [
  {
    title: ABLE_TO_CARE_YOURSELF,
    note: '',
    questionType: QuestionType.SWITCH,
  },
  {
    title: BLIND_OR_DO_YOU_HAVE_DIFFICULTY_SEEING,
    note: '',
    questionType: QuestionType.SWITCH,
  },
  {
    title: DEAF_OR_DO_YOU_HAVE_DIFFICULTY_SEEING,
    note: '',
    questionType: QuestionType.SWITCH,
  },
  {
    title: DIFFICULTY_CONCENTRATING_MAKING_DECISION,
    note: '',
    questionType: QuestionType.SWITCH,
  },
  {
    title: DIFFICULTY_WALKING_CLIMBING,
    note: '',
    questionType: QuestionType.SWITCH,
  },
  {
    title: DIFFICULTY_DRESSING_BATHING,
    note: '',
    questionType: QuestionType.SWITCH,
  },
  {
    title: DIFFICULTY_DOING_ERRANDS_ALONE,
    note: '',
    questionType: QuestionType.SWITCH,
  },
  {
    title: ARE_YOU_ABLE_TO_WALK,
    note: '',
    questionType: QuestionType.SELECT,
    options: ABLE_WALK_MAPPED
  },
  {
    title: DO_YOU_HAVE_TRANSPORTATION_DIFFICULTIES,
    note: '',
    questionType: QuestionType.SWITCH,
  },

]

//public health questions

const publicQuestions = [
  {
    title: HAVE_YOU_BEEN_TO_AN_AREA_KNOWN_HIGH_RISK,
    note: '',
    questionType: QuestionType.SWITCH,
    // dependentQuestions: 
  },
]

const Sections = [
  {
    name: ACTIVITIES_OF_DAILY_LIVING,
    questions: activitiesQuestions
  },
  {
    name: PUBLIC_HEALTH_TRAVEL,
    questions: publicQuestions
  }
] 