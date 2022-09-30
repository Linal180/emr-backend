import { QuestionType } from "src/lib/constants";

//enums 

enum TOBACCO_NICOTINE {
  NEVER_USED_SMOKELESS_TOBACCO = 'NEVER_USED_SMOKELESS_TOBACCO',
  FORMER_SMOKELESS_TOBACCO_USER = 'FORMER_SMOKELESS_TOBACCO_USER',
  CURRENT_SNUFF_USER = 'CURRENT_SNUFF_USER',
  CURRENTLY_CHEWS_TOBACCO = 'CURRENTLY_CHEWS_TOBACCO',
  CURRENTLY_USES_MOIST_POWDERED_TOBACCO = 'CURRENTLY_USES_MOIST_POWDERED_TOBACCO',
  NOT_TOLERATED = 'NOT_TOLERATED',
  PATIENT_REFUSED = 'PATIENT_REFUSED',
  NOT_INDICATED = 'NOT_INDICATED',
}

//sections name
const ACTIVITIES_OF_DAILY_LIVING = 'Activities of Daily Living';
const PUBLIC_HEALTH_TRAVEL = "Public Health and Travel";
const ADVANCED_DIRECTIVE = "Advanced Directive";
const HOME_AND_ENVIRONMENT = "Home and Environment";
const LIFESTYLE = "Lifestyle";
const EDUCATION_AND_OCCUPATION = "Education and Occupation";
const MARRIAGE_AND_SEXUALITY = "Marriage and Sexuality";
const DIET_AND_EXERCISE = "Diet and Exercise";
const SUBSTANCE_USE = "Substance Use";

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


const TOBACCO_NICOTINE_MAPPED = [
  { id: TOBACCO_NICOTINE.NEVER_USED_SMOKELESS_TOBACCO, name: "Never used smokeless tobacco" },
  { id: TOBACCO_NICOTINE.FORMER_SMOKELESS_TOBACCO_USER, name: "Former smokeless tobacco user" },
  { id: TOBACCO_NICOTINE.CURRENT_SNUFF_USER, name: "Current snuff user" },
  { id: TOBACCO_NICOTINE.CURRENTLY_CHEWS_TOBACCO, name: "Currently chews tobacco" },
  { id: TOBACCO_NICOTINE.CURRENTLY_USES_MOIST_POWDERED_TOBACCO, name: "Currently uses moist powdered tobacco" },
  { id: TOBACCO_NICOTINE.NOT_TOLERATED, name: "Not tolerated" },
  { id: TOBACCO_NICOTINE.PATIENT_REFUSED, name: "Patient refused" },
  { id: TOBACCO_NICOTINE.NOT_INDICATED, name: "Not indicated" },
]

const SMOKED_TOBACCO_MAPPED = [
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

const ALCOHOL_CONSUMPTION_MAPPED = [
  { id: "NONE", name: "None" },
  { id: "OCCASIONAL", name: "Occasional" },
  { id: "MODERATE", name: "Moderate" },
  { id: "HEAVY", name: "Heavy" },
]

const CAFFEINE_CONSUMPTION_MAPPED = [
  { id: "NONE", name: "None" },
  { id: "OCCASIONAL", name: "Occasional" },
  { id: "MODERATE", name: "Moderate" },
  { id: "HEAVY", name: "Heavy" },
]

const CHILD_CARE_MAPPED = [
  { id: "NONE", name: "None" },
  { id: "RELATIVE", name: "Relative" },
  { id: "PRIVATE_SITTER", name: "Private sitter" },
  { id: "DAYCARE", name: "Daycare/preschool" },
]

const FLUORIDE_STATUS_MAPPED = [
  { id: "FLUORIDATED", name: "Fluoridated" },
  { id: "NON_FLUORIDATED", name: "Non-fluoridated" },
  { id: "UNKNOWN", name: "Unknown" },
]

const FEEL_STRESSED_MAPPED = [
  { id: "NOT_AT_ALL", name: "Not at all" },
  { id: "ONLY_LITTLE", name: "Only a little" },
  { id: "SOME_CONTEXT", name: "To some extent" },
  { id: "RATHER_MUCH", name: "Rather much" },
  { id: "VERY_MUCH", name: "Very much" },
]

const HIGHEST_GRADE_MAPPED = [
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

const RELATIONSHIP_STATUS_MAPPED = [
  { id: "UNKNOWN", name: "Unknown" },
  { id: "MARRIED", name: "Married" },
  { id: "SINGLE", name: "Single" },
  { id: "DIVORCED", name: "Divorced" },
  { id: "SEPARATED", name: "Separated" },
  { id: "WIDOWED", name: "Widowed" },
  { id: "DOMESTIC_PARTNER", name: "Domestic partner" },
  { id: "OTHER", name: "Other" },
]

const DIET_TYPE_MAPPED = [
  { id: "REGULAR", name: "Regular" },
  { id: "VEGETARIAN", name: "Vegetarian" },
  { id: "VEGAN", name: "Vegan" },
  { id: "GLUTEN_FREE", name: "Gluten free" },
  { id: "SPECIFIC", name: "Specific" },
  { id: "CARBOHYDRATE", name: "Carbohydrate" },
  { id: "CARDIAC", name: "Cardiac" },
  { id: "DIABETIC", name: "Diabetic" },
]

const EXERCISE_LEVEL_MAPPED = [
  { id: "NONE", name: "None" },
  { id: "OCCASIONAL", name: "Occasional" },
  { id: "MODERATE", name: "Moderate" },
  { id: "HEAVY", name: "Heavy" },
]

const GENDER_IDENTITY_MAPPED = [
  { id: "MALE_IDENTIFIES", name: "Identifies as Male" },
  { id: "FEMALE_IDENTIFIES", name: "Identifies as Female" },
  { id: "TRANSGENDER_FTM", name: "Transgender Male/Female-to-Male (FTM)" },
  { id: "TRANSGENDER_MTF", name: "Transgender Female/Male-to-Female (MTF)" },
  { id: "GENDER_NON_CONFIRM", name: "Gender non-conforming (neither exclusively male nor female)" },
  { id: "GENDER_CATEGORY", name: "Additional gender category / other, please specify" },
  { id: "NOT_DISCLOSE", name: "Choose not to disclose" },
]

const SEX_AT_BIRTH_MAPPED = [
  { id: "MALE", name: "Male" },
  { id: "FEMALE", name: "Female" },
  { id: "NOT_DISCLOSE", name: "Choose not to disclose" },
  { id: "UNKNOWN", name: "Unknown" },
]

const PRONOUNS_MAPPED = [
  { id: "HE", name: "he/him" },
  { id: "SHE", name: "she/her" },
  { id: "THEY", name: "they/them" },
]

const SEXUAL_ORIENTATION_MAPPED = [
  { id: "LESBIAN", name: "Lesbian, gay or homosexual" },
  { id: "STRAIGHT", name: "Straight or heterosexual" },
  { id: "BISEXUAL", name: "Bisexual" },
  { id: "SOMETHING_ELSE", name: "Something else, please describe" },
  { id: "DONT_KNOW", name: "Don't know" },
  { id: "NOT_DISCLOSE", name: "Choose not to disclose" },
]

const CIGARETTE_LEVEL_MAPPED = [
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

const SMOKELESS_TOBACCO_MAPPED = [
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


const SEX_PROTECTION_MAPPED = [
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

const HOW_MUCH_TOBACCO_MAPPED = [
  { id: "NONE", name: "None" },
  { id: "1_PACK_PER_WEEK", name: "1 pack per week" },
  { id: "2_PACKS_PER_WEEK", name: "2 packs per week" },
  { id: "0.25_PACK_PER_DAY", name: "1/4 pack per day" },
  { id: "0.5_PACK_PER_DAY", name: "1/2 pack per day" },
  { id: "1_PACK_PER_DAY", name: "1 pack per day" },
  { id: "2_PACK_PER_DAY", name: "2 packs per day" },
  { id: "3+_PACK_PER_DAY", name: "3 or more packs per day" },
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

// Substance Use

const DO_YOU_HAVE_EVER_SMOKED_TOBACCO = "Do you or have you ever smoked tobacco?";
const DO_YOU_EVER_USED_TOBACCO_NICOTINE = "Do you or have you ever used any other forms of tobacco or nicotine?";
const WHAT_WAS_DATE_OF_YOUR_MOST_RECENT_TOBACCO_SCREENING = "What was the date of your most recent tobacco screening?";
const WHAT_IS_YOUR_LEVEL_OF_ALCOHOL_CONSUMPTION = "What is your level of alcohol consumption?";
const DO_YOU_USE_ANY_ILLICIT = "Do you use any illicit or recreational drugs?";
const WHAT_IS_YOUR_LEVEL_OF_CAFFEINE_CONSUMPTION = "What is your level of caffeine consumption?";

//advance directive 

const DO_YOU_HAVE_AN_ADVANCED_DIRECTIVE = "Do you have an advanced directive?";
const IS_BLOOD_TRANSFUSION_ACCEPTABLE_IN_AN_EMERGENCY = "Is blood transfusion acceptable in an emergency?";

//home & environment 

const HAVE_THERE_BEEN_ANY_CHANGES_TO_YOUR_FAMILY = "Have there been any changes to your family or social situation?";
const DO_YOU_HAVE_ANY_PETS = "Do you have any pets?";
const DO_YOU_HAVE_SMOKE_AND_CARBON_MONOXIDE = "Do you have smoke and carbon monoxide detectors in your home?";
const ARE_YOU_PASSIVELY_EXPOSED_TO_SMOKE = "Are you passively exposed to smoke?";
const ARE_THERE_ANY_GUNS_PRESENT_HOME = "Are there any guns present in your home?";
const DO_YOU_USE_INSECT_REPELLENT_ROUTINELY = "Do you use insect repellent routinely?";
const DO_YOU_USE_SUNSCREEN = "Do you use sunscreen routinely?";
const WHAT_TYPE_OF_CHILD_CARE_DO_YOU_USE = "What type of child care do you use?";
const WHAT_IS_FLUORIDE_STATUS_OF_YOUR_HOME = "What is the fluoride status of your home?";

// life style

const DO_YOU_FEEL_STRESSED = "Do you feel stressed (tense, restless, nervous, or anxious, or unable to sleep at night)?";
const DO_YOU_WEAR_HELMET = "Do you wear a helmet when biking?";
const DO_YOU_USE_SEAT_BELT = "Do you use your seat belt or car seat routinely?";

// Education and Occupation

const WHAT_IS_THE_HIGHEST_GRADE_OR_LEVEL_OF_SCHOOL_COMPLETED = "What is the highest grade or level of school you have completed or the highest degree you have received?";
const ARE_YOU_CURRENTLY_EMPLOYED = "Are you currently employed?";

// Marriage and Sexuality

const WHAT_IS_YOUR_RELATIONSHIP_STATUS = "What is your relationship status?";
const ARE_YOU_SEXUALLY_ACTIVE = "Are you sexually active?";
const HOW_MANY_CHILDREN_DO_YOU_HAVE = "How many children do you have?";

// Diet and Exercise

const WHAT_TYPE_OF_DIET_FOLLOWING = "What type of diet are you following?";
const WHAT_IS_YOUR_EXERCISE_LEVEL = "What is your exercise level?";
const HOW_MANY_DAYS_OF_MODERATE_TO_STRENUOUS_EXERCISE = "How many days of moderate to strenuous exercise, like a brisk walk, did you do in the last 7 days?";
const WHAT_TYPES_OF_SPORTING_ACTIVITIES_PARTICIPATE = "What types of sporting activities do you participate in?";
const GENDER_IDENTITY_LGBTQ_IDENTITY = "Gender Identity and LGBTQ Identity";
const ASSIGNED_SEX_AT_BIRTH = "Assigned sex at birth";

// traveled dependent questions

const TRAVEL_DEPENDENT_QUESTIONS = [
  {
    title: "Have you had other close contact with an Ebola virus disease patient in health care facilities or community settings?",
    note: '',
    questionType: QuestionType.SWITCH,
    answer: ['yes']
  },
  {
    title: "Have you had household contact with an Ebola virus disease patient?",
    note: '',
    questionType: QuestionType.SWITCH,
    answer: ['yes']
  },
  {
    title: "Have you directly handled bats, rodents, or primates from Ebola endemic areas?",
    note: '',
    questionType: QuestionType.SWITCH,
    answer: ['yes']
  },
  {
    title: "Have you had direct contact with a dead body in an Ebola-affected area without appropriate PPE?",
    note: '',
    questionType: QuestionType.SWITCH,
    answer: ['yes']
  },
  {
    title: "Have you had percutaneous (e.g. needle stick) or mucous membrane exposure to blood or body fluids from an Ebola virus disease patient?",
    note: '',
    questionType: QuestionType.SWITCH,
    answer: ['yes']
  },
]

// traveled dependent questions

const HAVE_YOU_RECENTLY_PLANNING_TO_TRAVEL_FIELDS_MAPPED = [
  {
    note: '',
    questionType: QuestionType.SWITCH,
    answer: ['yes'],
    title: 'Do you have symptoms associated with Zika virus (fever, rash, joint pain, or conjunctivitis)?',
  }
]

// smoke tobacco dependent questions

const SMOKED_TOBACCO_FIELDS_MAPPED = [
  {
    note: '',
    questionType: QuestionType.NUMBER,
    answer: ['EVERYDAY_SMOKER', 'FORMER_SMOKER', 'SOME_DAY_SMOKER'],
    title: 'At what age did you start smoking tobacco?',
  },
  {
    note: '',
    questionType: QuestionType.NUMBER,
    answer: ['EVERYDAY_SMOKER', 'FORMER_SMOKER', 'SOME_DAY_SMOKER'],
    title: 'How many years have you smoked tobacco?',
  },
  {
    note: '',
    questionType: QuestionType.SELECT,
    answer: ['EVERYDAY_SMOKER', 'SOME_DAY_SMOKER'],
    options: HOW_MUCH_TOBACCO_MAPPED,
    title: 'How much tobacco do you smoke?',
  }
]
// tobacco or nicotine dependent questions

const TOBACCO_NICOTINE_FIELDS_MAPPED = [
  {
    title: 'Do you or have you ever used e-cigarettes or vape?',
    options: CHILD_CARE_MAPPED,
    questionType: QuestionType.SELECT,
    answer: ['yes'],
    note: ''
  },
  {
    title: "Do you or have you ever used smokeless tobacco?",
    options: TOBACCO_NICOTINE_MAPPED,
    questionType: QuestionType.SELECT,
    answer: ['yes'],
    note: ''
  }
]

// alcohol consumption dependent questions

const ALCOHOL_CONSUMPTION_FIELDS_MAPPED = [
  {
    title: 'If you are pregnant, what was your level of alcohol consumption prior to pregnancy?',
    options: ALCOHOL_CONSUMPTION_MAPPED,
    questionType: QuestionType.SELECT,
    note: '',
    answer: ['OCCASIONAL', 'MODERATE', 'HEAVY'],
  },
  {
    title: 'How many years have you consumed alcohol?',
    options: ALCOHOL_CONSUMPTION_MAPPED,
    questionType: QuestionType.NUMBER,
    answer: ['MODERATE', 'HEAVY'],
    note: '',
  },
]

// illicit dependent fields

const ANY_ILLICIT_FIELDS_MAPPED = [
  {
    title: 'How many years have you used illicit or recreational drugs?',
    questionType: QuestionType.NUMBER,
    answer: ['yes'],
    note: ''
  },
  {
    title: 'Which illicit or recreational drugs have you used?',
    questionType: QuestionType.INPUT,
    answer: ['yes'],
    note: ''
  },
]

// currently employed dependent field 

const CURRENTLY_EMPLOYED_FIELDS_MAPPED = [
  {
    title: 'Are there any occupational health risks where you work?',
    questionType: QuestionType.INPUT,
    answer: ['yes'],
    note: ''
  },
  {
    title: 'What is your occupation?',
    questionType: QuestionType.INPUT,
    answer: ['yes'],
    note: ''
  },
]

// sexually active dependent fields

const SEXUALLY_ACTIVE_FIELDS_MAPPED = [
  {
    title: 'Do you use protection during sex?',
    questionType: QuestionType.SELECT,
    options: SEX_PROTECTION_MAPPED,
    answer: ['yes'],
    note: ''
  },
]

//activities questions

const activitiesQuestions= [
  {
    title: ABLE_TO_CARE_YOURSELF,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: BLIND_OR_DO_YOU_HAVE_DIFFICULTY_SEEING,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DEAF_OR_DO_YOU_HAVE_DIFFICULTY_SEEING,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DIFFICULTY_CONCENTRATING_MAKING_DECISION,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DIFFICULTY_WALKING_CLIMBING,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DIFFICULTY_DRESSING_BATHING,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DIFFICULTY_DOING_ERRANDS_ALONE,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: ARE_YOU_ABLE_TO_WALK,
    note: '',
    questionType: QuestionType.SELECT,
    options: ABLE_WALK_MAPPED,
    dependentQuestions: []
  },
  {
    title: DO_YOU_HAVE_TRANSPORTATION_DIFFICULTIES,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },

]

//public health questions

const publicQuestions = [
  {
    title: HAVE_YOU_BEEN_TO_AN_AREA_KNOWN_HIGH_RISK,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: IN_THE_14_DAYS_BEFORE_SYMPTOM_ONSET_CASE_ILL,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: IN_THE_14_DAYS_BEFORE_SYMPTOM_ONSET_PERSON_ILL,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: RESIDE_IN_OR_HAVE_YOU_TRAVELED,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: TRAVEL_DEPENDENT_QUESTIONS
  },
  {
    title: HAVE_YOU_PROCESSED_BLOOD_BODY_FLUIDS,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: HAVE_YOU_RECENTLY_PLANNING_TO_TRAVEL,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: HAVE_YOU_RECENTLY_PLANNING_TO_TRAVEL_FIELDS_MAPPED
  }
]

// Substance Use

const substanceQuestions= [
  {
    title: DO_YOU_HAVE_EVER_SMOKED_TOBACCO,
    note: '',
    questionType: QuestionType.SELECT,
    options: SMOKED_TOBACCO_MAPPED,
    dependentQuestions: SMOKED_TOBACCO_FIELDS_MAPPED
  },
  {
    title: DO_YOU_EVER_USED_TOBACCO_NICOTINE,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: TOBACCO_NICOTINE_FIELDS_MAPPED
  },
  {
    title: WHAT_WAS_DATE_OF_YOUR_MOST_RECENT_TOBACCO_SCREENING,
    note: '',
    questionType: QuestionType.DATE,
    dependentQuestions: []
  },
  {
    title: WHAT_IS_YOUR_LEVEL_OF_ALCOHOL_CONSUMPTION,
    note: '',
    questionType: QuestionType.SELECT,
    options: ALCOHOL_CONSUMPTION_MAPPED,
    dependentQuestions: ALCOHOL_CONSUMPTION_FIELDS_MAPPED
  },
  {
    title: DO_YOU_USE_ANY_ILLICIT,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: ANY_ILLICIT_FIELDS_MAPPED
  },
  {
    title: WHAT_IS_YOUR_LEVEL_OF_CAFFEINE_CONSUMPTION,
    note: '',
    questionType: QuestionType.SELECT,
    options: CAFFEINE_CONSUMPTION_MAPPED,
    dependentQuestions: []
  },
]

//advance directives questions

const advanceDirectiveQuestions= [
  {
    title: DO_YOU_HAVE_AN_ADVANCED_DIRECTIVE,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: IS_BLOOD_TRANSFUSION_ACCEPTABLE_IN_AN_EMERGENCY,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
]

//home environment questions

const homeEnvironmentQuestions= [
  {
    title: HAVE_THERE_BEEN_ANY_CHANGES_TO_YOUR_FAMILY,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DO_YOU_HAVE_ANY_PETS,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DO_YOU_HAVE_SMOKE_AND_CARBON_MONOXIDE,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: ARE_YOU_PASSIVELY_EXPOSED_TO_SMOKE,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: ARE_THERE_ANY_GUNS_PRESENT_HOME,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DO_YOU_USE_INSECT_REPELLENT_ROUTINELY,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DO_YOU_USE_SUNSCREEN,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: WHAT_TYPE_OF_CHILD_CARE_DO_YOU_USE,
    note: '',
    questionType: QuestionType.SELECT,
    options: CHILD_CARE_MAPPED,
    dependentQuestions: []
  },
  {
    title: WHAT_IS_FLUORIDE_STATUS_OF_YOUR_HOME,
    note: '',
    questionType: QuestionType.SELECT,
    options: FLUORIDE_STATUS_MAPPED,
    dependentQuestions: []
  },
]

//life style questions

const lifeStyleQuestions= [
  {
    title: DO_YOU_FEEL_STRESSED,
    note: '',
    questionType: QuestionType.SELECT,
    options: FEEL_STRESSED_MAPPED,
    dependentQuestions: []
  },
  {
    title: DO_YOU_WEAR_HELMET,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
  {
    title: DO_YOU_USE_SEAT_BELT,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: []
  },
]

//Education and Occupation questions

const educationQuestions = [
  {
    title: WHAT_IS_THE_HIGHEST_GRADE_OR_LEVEL_OF_SCHOOL_COMPLETED,
    note: '',
    questionType: QuestionType.SELECT,
    options: HIGHEST_GRADE_MAPPED,
    dependentQuestions: []
  },
  {
    title: ARE_YOU_CURRENTLY_EMPLOYED,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: CURRENTLY_EMPLOYED_FIELDS_MAPPED
  },
]

// Marriage and Sexuality questions

const marriageQuestions= [
  {
    title: WHAT_IS_YOUR_RELATIONSHIP_STATUS,
    note: '',
    questionType: QuestionType.SELECT,
    options: RELATIONSHIP_STATUS_MAPPED,
    dependentQuestions: []
  },
  {
    title: ARE_YOU_SEXUALLY_ACTIVE,
    note: '',
    questionType: QuestionType.SWITCH,
    dependentQuestions: SEXUALLY_ACTIVE_FIELDS_MAPPED
  },
  {
    title: HOW_MANY_CHILDREN_DO_YOU_HAVE,
    note: '',
    questionType: QuestionType.NUMBER,
    dependentQuestions: []
  },
]

// Diet and Exercise questions

const dietQuestions= [
  {
    title: WHAT_TYPE_OF_DIET_FOLLOWING,
    note: '',
    questionType: QuestionType.SELECT,
    options: DIET_TYPE_MAPPED,
    dependentQuestions: []
  },
  {
    title: WHAT_IS_YOUR_EXERCISE_LEVEL,
    note: '',
    questionType: QuestionType.SELECT,
    options: EXERCISE_LEVEL_MAPPED,
    dependentQuestions: []
  },
  {
    title: HOW_MANY_DAYS_OF_MODERATE_TO_STRENUOUS_EXERCISE,
    note: '',
    questionType: QuestionType.NUMBER,
    dependentQuestions: []
  },
  {
    title: WHAT_TYPES_OF_SPORTING_ACTIVITIES_PARTICIPATE,
    note: '',
    questionType: QuestionType.INPUT,
    dependentQuestions: []
  },
]

//sections

export const SectionsData = [
  {
    name: ACTIVITIES_OF_DAILY_LIVING,
    questions: activitiesQuestions
  },
  {
    name: PUBLIC_HEALTH_TRAVEL,
    questions: publicQuestions
  },
  {
    name: SUBSTANCE_USE,
    questions: substanceQuestions
  },
  {
    name: ADVANCED_DIRECTIVE,
    questions: advanceDirectiveQuestions
  },
  {
    name: HOME_AND_ENVIRONMENT,
    questions: homeEnvironmentQuestions
  },
  {
    name: LIFESTYLE,
    questions: lifeStyleQuestions
  },
  {
    name: EDUCATION_AND_OCCUPATION,
    questions: educationQuestions
  },
  {
    name: MARRIAGE_AND_SEXUALITY,
    questions: marriageQuestions
  },
  {
    name: DIET_AND_EXERCISE,
    questions: dietQuestions
  },
] 