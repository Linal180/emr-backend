import { PracticeType } from "src/facilities/entities/facility.entity"
import { DAYS, seedPractice } from "src/lib/constants"

export const PracticeInfo = { name: 'Express Healthcare', npi: '1598994733', taxId: '010788495', active: true, practiceId: seedPractice.EXPRESS_HEALTH_CARE }
export const PracticeAdminInfo = { email: 'anegeda+ehc@alxtel.com', firstName: 'Alaa', lastName: 'Negeda' }

export const FacilitiesData = [
  {
    name: 'College Park',
    practiceType: PracticeType.CLINIC,
    phone: '3013454400',
    address: '4701 Melbourne Place',
    address2: 'College Park, MD',
    zipCode: '20740-2540',
    city: 'College Park',
    state: "Maryland"
  },
  {
    name: 'New Carrolton',
    practiceType: PracticeType.CLINIC,
    phone: '3013457800',
    address: '8500 Annapolis Rd Suite',
    address2: '200 New Carrolton, MD',
    zipCode: '20601',
    city: 'New Carrolton',
    state: "Maryland"
  },
  {
    name: 'Waldorf MD',
    practiceType: PracticeType.CLINIC,
    phone: '2408657106',
    address: '3050 Crain Hwy',
    address2: '#100, Waldorf, MD',
    zipCode: '20740-2540',
    city: 'Waldorf',
    state: "Maryland"
  },
  {
    name: 'Falls Church',
    practiceType: PracticeType.CLINIC,
    phone: '7034360156',
    address: '6305 Castle Place Suite',
    address2: '2D Falls Church, VA',
    zipCode: '22044',
    city: 'Falls Church',
    state: "Virginia"
  },
  {
    name: 'Tysons Corner',
    practiceType: PracticeType.CLINIC,
    phone: ' 7034360203',
    address: '1980 Gallows Rd Vienna',
    address2: 'Unit 100, VA',
    zipCode: '22182',
    city: 'Tysons Corner',
    state: "Virginia"
  },
  {
    name: 'Skyline VA',
    practiceType: PracticeType.CLINIC,
    phone: '7034360204',
    address: '5870 Leesburg Pike',
    address2: 'Falls Church, VA',
    zipCode: '22041',
    city: 'Skyline',
    state: "Virginia"
  },
]

export const PracticeUsersData = [
  {
    name: 'Noubar Semerjian',
    phone: '5712679962',
    email: 'noubar.semerjian@gmail.com',
    role: 'office-manager',
    facility: 'Falls Church'
  },
  {
    name: 'Shahd Abbas',
    phone: '2167673094',
    email: 'sabuelriesh@hotmail.co.uk',
    role: 'staff',
    facility: 'Falls Church'
  },
  {
    name: 'Sergio Ampuero',
    phone: '5713550829',
    email: 'orientep611@gmail.com',
    role: 'staff',
    facility: 'Falls Church'
  },
  {
    name: 'Muna Bushra',
    phone: '5713517704',
    email: 'muna@medpedhealthcare.com',
    role: 'staff',
    facility: 'Falls Church'
  },
  {
    name: 'Tiba Hadi',
    phone: '2407283466',
    email: 'tiba.hadi2@gmail.com',
    role: 'front-desk',
    facility: 'Falls Church'
  },
  {
    name: 'Malka Khan',
    phone: '7035203682',
    email: 'malka245@yahoo.com',
    role: 'front-desk',
    facility: 'Falls Church'
  },
  {
    name: 'Aus (Kyle) Musa',
    phone: '4433268433',
    email: 'kylemusa@yahoo.com',
    role: 'staff',
    facility: 'Falls Church'
  },
  {
    name: 'Siriluk Ngarmdee',
    phone: '7034707979',
    email: 'siriluk.n58@rsu.ac.th',
    role: 'staff',
    facility: 'Falls Church'
  },
  {
    name: 'Steven Ricaldi',
    phone: '5713266638',
    email: 'stvnrica@gmail.com',
    role: 'staff',
    facility: 'Falls Church'
  },
  {
    name: 'Homa Safi',
    phone: '7034731808',
    email: 'homasafi53@gmail.com',
    role: 'front-desk',
    facility: 'Falls Church'
  },
  {
    name: 'Aziza Alam',
    suffix: 'MD',
    phone: '2022366942',
    email: 'azizaalam1@aol.com',
    role: 'doctor',
    facility: 'Falls Church'
  },
  {
    name: 'Zuhdi Dajani',
    suffix: 'MD',
    phone: '8145900097',
    email: 'zmdajani@hotmail.com',
    role: 'doctor',
    facility: 'Falls Church'
  },
  {
    name: 'Angela Fasanella',
    suffix: 'NP',
    phone: '7036264406',
    email: 'afasanella486@gmail.com',
    role: 'doctor',
    facility: 'Falls Church'
  },
  {
    name: 'Pragya Gangele',
    suffix: 'NP',
    phone: '2026696259',
    email: 'psgangele@gmail.com',
    role: 'doctor',
    facility: 'Falls Church'
  },
  {
    name: 'Mitra Hafezi',
    suffix: 'MD',
    phone: '5717893285',
    email: 'bssbp@yahoo.com',
    role: 'doctor',
    facility: 'Falls Church'
  },
  {
    name: 'Abdukareem Kraidy',
    suffix: 'MD',
    phone: '5715751027',
    email: 'kraidy@yahoo.com',
    role: 'doctor',
    facility: 'Falls Church'
  },
  {
    name: 'Daniel Mesfin',
    suffix: 'NP',
    phone: '2022766696',
    email: 'dmesfin1627@gmail.com',
    role: 'doctor',
    facility: 'Falls Church'
  },
  {
    name: 'Njidka Onu',
    suffix: 'NP',
    phone: '2404866516',
    email: 'juzmell@yahoo.com',
    role: 'doctor',
    facility: 'Falls Church'
  },
  {
    name: 'Kimberly Washborne',
    phone: '5409313239',
    email: 'k.washbourne@yahoo.com',
    role: 'doctor',
    facility: 'Falls Church'
  },
  {
    name: 'Sura Abdullaziz',
    phone: '9173309098',
    email: 'sura@medpedhealthcare.com',
    role: 'office-manager',
    facility: 'Tysons Corner'
  },
  {
    name: 'Mawadda Saidahmed',
    phone: '571-334-3352',
    email: 'mawadda96@gmail.com',
    role: 'front-desk',
    facility: 'Tysons Corner'
  },
  {
    name: 'Saja Aljanabi',
    phone: '2407036787',
    email: 'saja@medpedhealthcare.com',
    role: 'front-desk',
    facility: 'Tysons Corner'
  },
  {
    name: 'Rosana Jenkins',
    phone: '2403537132',
    email: 'rosanajenkins@gmail.com',
    role: 'staff',
    facility: 'Tysons Corner'
  },
  {
    name: 'Abdul Youssef',
    phone: '5712949653',
    email: 'Abdulyoussef42@gmail.com',
    role: 'front-desk',
    facility: 'Tysons Corner'
  },
  {
    name: 'Sydney Monserrate',
    phone: '5712011915',
    email: 'sydneymonserrate@gmail.com',
    role: 'front-desk',
    facility: 'Tysons Corner'
  },
  {
    name: 'Teiondre Jones',
    phone: '7243208207',
    email: 'teiondrejones@gmail.com',
    role: 'front-desk',
    facility: 'Tysons Corner'
  },
  {
    name: 'Pouya Susanabadifarahani',
    phone: '3012506314',
    email: 'psusanabadi@gmail.com',
    role: 'staff',
    facility: 'Tysons Corner'
  },
  {
    name: 'Kawther Aljanabi',
    phone: '3013778388',
    email: 'kaljanabi04@gmail.com',
    role: 'staff',
    facility: 'Tysons Corner'
  },
  {
    name: 'Ismail Bengana',
    phone: '5712438958',
    email: 'iben4888@gmail.com',
    role: 'staff',
    facility: 'Tysons Corner'
  },
]


export const FacilitiesServices = [
  {
    name: "COVID Testing - Asymptomatic",
    duration: "30"
  },
  {
    name: "COVID Testing - Symptomatic",
    duration: "30"
  },
  {
    name: "Follow-Up Visit",
    duration: "30"
  },
  {
    name: "Motor Vehicle Accident",
    duration: "30"
  },
  {
    name: "New Patient Non-COVID",
    duration: "30"
  },
  {
    name: "Sick Visit",
    duration: "30"
  },
  {
    name: "Traveler Non - COVID",
    duration: "30"
  },
  {
    name: "Worker Compensation",
    duration: "30"
  },
  {
    name: "Other",
    duration: "30"

  }
]


export const FacilitiesSchedules = [
  {
    day: DAYS.Monday,
    endAt: "2022-08-29T12:00:00+05:00",
    startAt: "2022-08-29T01:00:00+05:00"
  },
  {
    day: DAYS.Tuesday,
    endAt: "2022-08-29T12:00:00+05:00",
    startAt: "2022-08-29T01:00:00+05:00"
  },
  {
    day: DAYS.Wednesday,
    endAt: "2022-08-29T12:00:00+05:00",
    startAt: "2022-08-29T01:00:00+05:00"
  },
  {
    day: DAYS.Thursday,
    endAt: "2022-08-29T12:00:00+05:00",
    startAt: "2022-08-29T01:00:00+05:00"
  },
  {
    day: DAYS.Friday,
    endAt: "2022-08-29T12:00:00+05:00",
    startAt: "2022-08-29T01:00:00+05:00"
  },
  {
    day: DAYS.Saturday,
    endAt: "2022-08-29T12:00:00+05:00",
    startAt: "2022-08-29T01:00:00+05:00"
  },
  {
    day: DAYS.Sunday,
    endAt: "2022-08-29T12:00:00+05:00",
    startAt: "2022-08-29T01:00:00+05:00"
  }
]