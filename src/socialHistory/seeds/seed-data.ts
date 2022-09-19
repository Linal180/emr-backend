// social selectors

export const ABLE_WALK_MAPPED = [
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
