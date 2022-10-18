const data = [
  {
    cptCode: 90281,
    cptDescription: "Immune globulin (Ig), human, for intramuscular use",
    cvxDescription: "IG",
    cvxCode: "86",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90283,
    cptDescription: "Immune globulin (IgIV), human, for intravenous use",
    cvxDescription: "IGIV",
    cvxCode: "87",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90287,
    cptDescription: "Botulinum antitoxin, equine, any route",
    cvxDescription: "botulinum antitoxin",
    cvxCode: "27",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90291,
    cptDescription:
      "Cytomegalovirus immune globulin (CMV-IgIV), human, for intravenous use",
    cvxDescription: "CMVIG",
    cvxCode: "29",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90296,
    cptDescription: "Diphtheria antitoxin, equine, any route",
    cvxDescription: "diphtheria antitoxin",
    cvxCode: "12",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90371,
    cptDescription:
      "Hepatitis B immune globulin (HBIg), human, for intramuscular use",
    cvxDescription: "HBIG",
    cvxCode: "30",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90375,
    cptDescription:
      "Rabies immune globulin (RIg), human, for intramuscular and/or subcutaneous use",
    cvxDescription: "RIG",
    cvxCode: "34",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90376,
    cptDescription:
      "Rabies immune globulin, heat-treated (RIg-HT), human, for intramuscular and/or subcutaneous use",
    cvxDescription: "RIG",
    cvxCode: "34",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90378,
    cptDescription:
      "Respiratory syncytial virus, monoclonal antibody, recombinant, for intramuscular use, 50 mg, each",
    cvxDescription: "RSV-MAb",
    cvxCode: "93",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90379,
    cptDescription:
      "Respiratory syncytial virus immune globulin (RSV-IgIV), human, for intravenous use",
    cvxDescription: "RSV-IGIV",
    cvxCode: "71",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90389,
    cptDescription:
      "Tetanus immune globulin (TIg), human, for intramuscular use",
    cvxDescription: "TIG",
    cvxCode: "13",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90393,
    cptDescription: "Vaccinia immune globulin, human, for intramuscular use",
    cvxDescription: "vaccinia immune globulin",
    cvxCode: "79",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90396,
    cptDescription:
      "Varicella-zoster immune globulin, human, for intramuscular use",
    cvxDescription: "VZIG",
    cvxCode: "36",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90470,
    cptDescription:
      "H1N1 immunization administration (intramuscular, intranasal), including counseling when performed",
    cvxDescription: "Novel Influenza-H1N1-09, all formulations",
    cvxCode: "128",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90476,
    cptDescription: "Adenovirus vaccine, type 4, live, for oral use",
    cvxDescription: "adenovirus, type 4",
    cvxCode: "54",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90477,
    cptDescription: "Adenovirus vaccine, type 7, live, for oral use",
    cvxDescription: "adenovirus, type 7",
    cvxCode: "55",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90581,
    cptDescription: "Anthrax vaccine, for subcutaneous or intramuscular use",
    cvxDescription: "anthrax",
    cvxCode: "24",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90585,
    cptDescription:
      "Bacillus Calmette-Guerin vaccine (BCG) for tuberculosis, live, for percutaneous use",
    cvxDescription: "BCG",
    cvxCode: "19",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90611,
    cptDescription:
      "Smallpox and monkeypox vaccine, attenuated vaccinia virus, live, non-replicating, preservative free, 0.5 mL dosage, suspension, for subcutaneous use",
    cvxDescription:
      "Vaccinia, smallpox monkeypox vaccine live, PF, SQ or ID injection",
    cvxCode: "206",
    comment: "CPT Code to be used for JYNNEOS vaccine",
    last_updated: "27-Jul-22",
  },
  {
    cptCode: 90619,
    cptDescription:
      "Meningococcal conjugate vaccine, serogroups A, C, W, Y, quadrivalent, tetanus toxoid carrier (MenACWY-TT), for intramuscular use",
    cvxDescription:
      "meningococcal polysaccharide (groups A, C, Y, W-135) TT conjugate",
    cvxCode: "203",
    comment: "",
    last_updated: "28-Jul-20",
  },
  {
    cptCode: 90620,
    cptDescription:
      "Meningococcal recombinant protein and outer membrane vesicle vaccine, serogroup B (MenB-4C), 2 dose schedule, for intramuscular use",
    cvxDescription: "meningococcal B, OMV",
    cvxCode: "163",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90621,
    cptDescription:
      "Meningococcal recombinant lipoprotein vaccine, serogroup B (MenB-FHbp), 2 or 3 dose schedule, for intramuscular use",
    cvxDescription: "meningococcal B, recombinant",
    cvxCode: "162",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90622,
    cptDescription:
      "Vaccinia (smallpox) virus vaccine, live, lyophilized, 0.3 mL dosage, for percutaneous use",
    cvxDescription: "vaccinia (smallpox)",
    cvxCode: "75",
    comment: "CPT Code to be used for ACAM2000 vaccine",
    last_updated: "27-Jul-22",
  },
  {
    cptCode: 90625,
    cptDescription:
      "Cholera vaccine, live, adult dosage, 1 dose schedule, for oral use",
    cvxDescription: "cholera, live attenuated",
    cvxCode: "174",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90626,
    cptDescription:
      "Tick-borne encephalitis virus vaccine, inactivated; 0.25 mL dosage, for intramuscular use",
    cvxDescription: "Tick-borne encephalitis, inactivated, PF, 0.25mL",
    cvxCode: "223",
    comment: "",
    last_updated: "13-Sep-21",
  },
  {
    cptCode: 90627,
    cptDescription:
      "Tick-borne encephalitis virus vaccine, inactivated; 0.5 mL dosage, for intramuscular use",
    cvxDescription: "Tick-borne encephalitis, inactivated, PF, 0.5mL",
    cvxCode: "224",
    comment: "",
    last_updated: "13-Sep-21",
  },
  {
    cptCode: 90630,
    cptDescription:
      "Influenza virus vaccine, quadrivalent (IIV4), split virus, preservative free, for intradermal use",
    cvxDescription:
      "influenza, intradermal, quadrivalent, preservative free",
    cvxCode: "166",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90632,
    cptDescription:
      "Hepatitis A vaccine (HepA), adult dosage, for intramuscular use",
    cvxDescription: "Hep A, adult",
    cvxCode: "52",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90633,
    cptDescription:
      "Hepatitis A vaccine (HepA), pediatric/adolescent dosage-2 dose schedule, for intramuscular use",
    cvxDescription: "Hep A, ped/adol, 2 dose",
    cvxCode: "83",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90634,
    cptDescription:
      "Hepatitis A vaccine (HepA), pediatric/adolescent dosage-3 dose schedule, for intramuscular use",
    cvxDescription: "Hep A, ped/adol, 3 dose",
    cvxCode: "84",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90636,
    cptDescription:
      "Hepatitis A and hepatitis B vaccine (HepA-HepB), adult dosage, for intramuscular use",
    cvxDescription: "Hep A-Hep B",
    cvxCode: "104",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90644,
    cptDescription:
      "Meningococcal conjugate vaccine, serogroups C & Y and Haemophilus influenzae type b vaccine (Hib-MenCY), 4 dose schedule, when administered to children 6 weeks-18 months of age, for intramuscular use",
    cvxDescription: "Meningococcal C/Y-HIB PRP",
    cvxCode: "148",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90645,
    cptDescription:
      "Hemophilus influenza b vaccine (Hib), HbOC conjugate (4 dose schedule), for intramuscular use",
    cvxDescription: "Hib (HbOC)",
    cvxCode: "47",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90646,
    cptDescription:
      "Hemophilus influenza b vaccine (Hib), PRP-D conjugate, for booster use only, intramuscular use",
    cvxDescription: "Hib (PRP-D)",
    cvxCode: "46",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90647,
    cptDescription:
      "Haemophilus influenzae type b vaccine (Hib), PRP-OMP conjugate, 3 dose schedule, for intramuscular use",
    cvxDescription: "Hib (PRP-OMP)",
    cvxCode: "49",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90648,
    cptDescription:
      "Haemophilus influenzae type b vaccine (Hib), PRP-T conjugate, 4 dose schedule, for intramuscular use",
    cvxDescription: "Hib (PRP-T)",
    cvxCode: "48",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90649,
    cptDescription:
      "Human Papillomavirus vaccine, types 6, 11, 16, 18, quadrivalent (4vHPV), 3 dose schedule, for intramuscular use",
    cvxDescription: "HPV, quadrivalent",
    cvxCode: "62",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90650,
    cptDescription:
      "Human Papillomavirus vaccine, types 16, 18, bivalent (2vHPV), 3 dose schedule, for intramuscular use",
    cvxDescription: "HPV, bivalent",
    cvxCode: "118",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90651,
    cptDescription:
      "Human Papillomavirus vaccine types 6, 11, 16, 18, 31, 33, 45, 52, 58, nonavalent (9vHPV), 2 or 3 dose schedule, for intramuscular use",
    cvxDescription: "HPV9",
    cvxCode: "165",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90653,
    cptDescription:
      "Influenza vaccine, inactivated (IIV), subunit, adjuvanted, for intramuscular use",
    cvxDescription: "influenza, trivalent, adjuvanted",
    cvxCode: "168",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90654,
    cptDescription:
      "Influenza virus vaccine, trivalent (IIV3), split virus, preservative-free, for intradermal use",
    cvxDescription:
      "influenza, seasonal, intradermal, preservative free",
    cvxCode: "144",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90655,
    cptDescription:
      "Influenza virus vaccine, trivalent (IIV3), split virus, preservative free, 0.25 mL dosage, for intramuscular use",
    cvxDescription:
      "Influenza, seasonal, injectable, preservative free",
    cvxCode: "140",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90656,
    cptDescription:
      "Influenza virus vaccine, trivalent (IIV3), split virus, preservative free, 0.5 mL dosage, for intramuscular use",
    cvxDescription:
      "Influenza, seasonal, injectable, preservative free",
    cvxCode: "140",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90657,
    cptDescription:
      "Influenza virus vaccine, trivalent (IIV3), split virus, 0.25 mL dosage, for intramuscular use",
    cvxDescription: "Influenza, seasonal, injectable",
    cvxCode: "141",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90658,
    cptDescription:
      "Influenza virus vaccine, trivalent (IIV3), split virus, 0.5 mL dosage, for intramuscular use",
    cvxDescription: "Influenza, seasonal, injectable",
    cvxCode: "141",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90659,
    cptDescription:
      "Influenza virus vaccine, whole virus, for intramuscular or jet injection use",
    cvxDescription: "influenza, whole",
    cvxCode: "16",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90660,
    cptDescription:
      "Influenza virus vaccine, trivalent, live (LAIV3), for intranasal use",
    cvxDescription: "influenza, live, intranasal",
    cvxCode: "111",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90661,
    cptDescription:
      "Influenza virus vaccine, trivalent (ccIIV3), derived from cell cultures, subunit, preservative and antibiotic free, 0.5 mL dosage, for intramuscular use",
    cvxDescription: "Influenza, injectable, MDCK, preservative free",
    cvxCode: "153",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90662,
    cptDescription:
      "Influenza virus vaccine (IIV), split virus, preservative free, enhanced immunogenicity via increased antigen content, for intramuscular use",
    cvxDescription: "Influenza, high dose seasonal",
    cvxCode: "135",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90662,
    cptDescription:
      "Influenza virus vaccine (IIV), split virus, preservative free, enhanced immunogenicity via increased antigen content, for intramuscular use",
    cvxDescription: "influenza, high-dose, quadrivalent",
    cvxCode: "197",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90663,
    cptDescription: "Influenza virus vaccine, pandemic formulation, H1N1",
    cvxDescription: "Novel Influenza-H1N1-09, all formulations",
    cvxCode: "128",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90664,
    cptDescription:
      "Influenza virus vaccine, live (LAIV), pandemic formulation, for intranasal use",
    cvxDescription: "Novel Influenza-H1N1-09, nasal",
    cvxCode: "125",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90665,
    cptDescription:
      "Lyme disease vaccine, adult dosage, for intramuscular use",
    cvxDescription: "Lyme disease",
    cvxCode: "66",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90666,
    cptDescription:
      "Influenza virus vaccine (IIV), pandemic formulation, split virus, preservative free, for intramuscular use",
    cvxDescription: "Novel influenza-H1N1-09, preservative-free",
    cvxCode: "126",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90668,
    cptDescription:
      "Influenza virus vaccine (IIV), pandemic formulation, split virus, for intramuscular use",
    cvxDescription: "Novel influenza-H1N1-09",
    cvxCode: "127",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90669,
    cptDescription:
      "Pneumococcal conjugate vaccine, 7 valent, for intramuscular use",
    cvxDescription: "pneumococcal conjugate PCV 7",
    cvxCode: "100",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90670,
    cptDescription:
      "Pneumococcal conjugate vaccine, 13 valent (PCV13), for intramuscular use",
    cvxDescription: "Pneumococcal conjugate PCV 13",
    cvxCode: "133",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90671,
    cptDescription:
      "Pneumococcal conjugate vaccine, 15 valent (PCV15), for intramuscular use",
    cvxDescription:
      "Pneumococcal conjugate PCV15, polysaccharide CRM197 conjugate, adjuvant, PF",
    cvxCode: "215",
    comment: "",
    last_updated: "13-Sep-21",
  },
  {
    cptCode: 90672,
    cptDescription:
      "Influenza virus vaccine, quadrivalent, live (LAIV4), for intranasal use",
    cvxDescription: "influenza, live, intranasal, quadrivalent",
    cvxCode: "149",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90673,
    cptDescription:
      "Influenza virus vaccine, trivalent (RIV3), derived from recombinant DNA, hemagglutinin (HA) protein only, preservative and antibiotic free, for intramuscular use",
    cvxDescription:
      "influenza, recombinant, injectable, preservative free",
    cvxCode: "155",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90674,
    cptDescription:
      "Influenza virus vaccine, quadrivalent (ccIIV4), derived from cell cultures, subunit, preservative and antibiotic free, 0.5 mL dosage, for intramuscular use",
    cvxDescription:
      "Influenza, injectable, MDCK, preservative free, quadrivalent",
    cvxCode: "171",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90675,
    cptDescription: "Rabies vaccine, for intramuscular use",
    cvxDescription: "rabies, unspecified formulation",
    cvxCode: "90",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90676,
    cptDescription: "Rabies vaccine, for intradermal use",
    cvxDescription: "rabies, intradermal injection",
    cvxCode: "40",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90677,
    cptDescription:
      "Pneumococcal conjugate vaccine, 20 valent (PCV20), for intramuscular use",
    cvxDescription:
      "Pneumococcal conjugate PCV20, polysaccharide CRM197 conjugate, adjuvant, PF",
    cvxCode: "216",
    comment: "",
    last_updated: "13-Sep-21",
  },
  {
    cptCode: 90680,
    cptDescription:
      "Rotavirus vaccine, pentavalent (RV5), 3 dose schedule, live, for oral use",
    cvxDescription: "rotavirus, pentavalent",
    cvxCode: "116",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90681,
    cptDescription:
      "Rotavirus vaccine, human, attenuated (RV1), 2 dose schedule, live, for oral use",
    cvxDescription: "rotavirus, monovalent",
    cvxCode: "119",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90682,
    cptDescription:
      "Influenza virus vaccine, quadrivalent (RIV4), derived from recombinant DNA, hemagglutinin (HA) protein only, preservative and antibiotic free, for intramuscular use",
    cvxDescription:
      "influenza, recombinant, quadrivalent,injectable, preservative free",
    cvxCode: "185",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90685,
    cptDescription:
      "Influenza virus vaccine, quadrivalent (IIV4), split virus, preservative free, 0.25 mL dosage, for intramuscular use",
    cvxDescription:
      "Influenza, injectable,quadrivalent, preservative free, pediatric",
    cvxCode: "161",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90686,
    cptDescription:
      "Influenza virus vaccine, quadrivalent (IIV4), split virus, preservative free, 0.5 mL dosage, for intramuscular use",
    cvxDescription:
      "influenza, injectable, quadrivalent, preservative free",
    cvxCode: "150",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90687,
    cptDescription:
      "Influenza virus vaccine, quadrivalent (IIV4), split virus, 0.25 mL dosage, for intramuscular use",
    cvxDescription: "influenza, injectable, quadrivalent",
    cvxCode: "158",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90688,
    cptDescription:
      "Influenza virus vaccine, quadrivalent (IIV4), split virus, 0.5 mL dosage, for intramuscular use",
    cvxDescription: "influenza, injectable, quadrivalent",
    cvxCode: "158",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90690,
    cptDescription: "Typhoid vaccine, live, oral",
    cvxDescription: "typhoid, oral",
    cvxCode: "25",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90691,
    cptDescription:
      "Typhoid vaccine, Vi capsular polysaccharide (ViCPs), for intramuscular use",
    cvxDescription: "typhoid, ViCPs",
    cvxCode: "101",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90692,
    cptDescription:
      "Typhoid vaccine, heat- and phenol-inactivated (H-P), for subcutaneous or intradermal use",
    cvxDescription: "typhoid, parenteral",
    cvxCode: "41",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90693,
    cptDescription:
      "Typhoid vaccine, acetone-killed, dried (AKD), for subcutaneous use (U.S. military)",
    cvxDescription: "typhoid, parenteral, AKD (U.S. military)",
    cvxCode: "53",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90694,
    cptDescription:
      "Influenza virus vaccine, quadrivalent (aIIV4), inactivated, adjuvanted, preservative free, 0.5 mL dosage, for intramuscular use",
    cvxDescription: "Influenza vaccine, quadrivalent, adjuvanted",
    cvxCode: "205",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90696,
    cptDescription:
      "Diphtheria, tetanus toxoids, acellular pertussis vaccine and inactivated poliovirus vaccine (DTaP-IPV), when administered to children 4 through 6 years of age, for intramuscular use",
    cvxDescription: "DTaP-IPV",
    cvxCode: "130",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90697,
    cptDescription:
      "Diphtheria, tetanus toxoids, acellular pertussis vaccine, inactivated poliovirus vaccine, Haemophilus influenzae type b PRP-OMP conjugate vaccine, and hepatitis B vaccine (DTaP-IPV-Hib-HepB), for intramuscular use",
    cvxDescription: "DTaP,IPV,Hib,HepB",
    cvxCode: "146",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90698,
    cptDescription:
      "Diphtheria, tetanus toxoids, acellular pertussis vaccine, Haemophilus influenzae type b, and inactivated poliovirus vaccine, (DTaP-IPV/Hib), for intramuscular use",
    cvxDescription: "DTaP-Hib-IPV",
    cvxCode: "120",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90700,
    cptDescription:
      "Diphtheria, tetanus toxoids, and acellular pertussis vaccine (DTaP), when administered to individuals younger than 7 years, for intramuscular use",
    cvxDescription: "DTaP",
    cvxCode: "20",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90701,
    cptDescription:
      "Diphtheria, tetanus toxoids, and whole cell pertussis vaccine (DTP), for intramuscular use",
    cvxDescription: "DTP",
    cvxCode: "01",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90702,
    cptDescription:
      "Diphtheria and tetanus toxoids adsorbed (DT) when administered to individuals younger than 7 years, for intramuscular use",
    cvxDescription: "DT (pediatric)",
    cvxCode: "28",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90703,
    cptDescription: "Tetanus toxoid adsorbed, for intramuscular use",
    cvxDescription: "tetanus toxoid, adsorbed",
    cvxCode: "35",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90704,
    cptDescription: "Mumps virus vaccine, live, for subcutaneous use",
    cvxDescription: "mumps",
    cvxCode: "07",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90705,
    cptDescription: "Measles virus vaccine, live, for subcutaneous use",
    cvxDescription: "measles",
    cvxCode: "05",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90706,
    cptDescription: "Rubella virus vaccine, live, for subcutaneous use",
    cvxDescription: "rubella",
    cvxCode: "06",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90707,
    cptDescription:
      "Measles, mumps and rubella virus vaccine (MMR), live, for subcutaneous use",
    cvxDescription: "MMR",
    cvxCode: "03",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90708,
    cptDescription:
      "Measles and rubella virus vaccine, live, for subcutaneous use",
    cvxDescription: "M/R",
    cvxCode: "04",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90710,
    cptDescription:
      "Measles, mumps, rubella, and varicella vaccine (MMRV), live, for subcutaneous use",
    cvxDescription: "MMRV",
    cvxCode: "94",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90712,
    cptDescription:
      "Poliovirus vaccine, (any type[s]) (OPV), live, for oral use",
    cvxDescription: "OPV, Unspecified",
    cvxCode: "182",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90713,
    cptDescription:
      "Poliovirus vaccine, inactivated (IPV), for subcutaneous or intramuscular use",
    cvxDescription: "IPV",
    cvxCode: "10",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90714,
    cptDescription:
      "Tetanus and diphtheria toxoids adsorbed (Td), preservative free, when administered to individuals 7 years or older, for intramuscular use",
    cvxDescription:
      "Td (adult), 2 Lf tetanus toxoid, preservative free, adsorbed",
    cvxCode: "09",
    comment:
      "Beginning in 2005, this CPT code maps to TD preservative free. Remapped to CVX code 09 10/2021 to support active products mapped to that code.",
    last_updated: "8-Oct-21",
  },
  {
    cptCode: 90715,
    cptDescription:
      "Tetanus, diphtheria toxoids and acellular pertussis vaccine (Tdap), when administered to individuals 7 years or older, for intramuscular use",
    cvxDescription: "Tdap",
    cvxCode: "115",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90716,
    cptDescription:
      "Varicella virus vaccine (VAR), live, for subcutaneous use",
    cvxDescription: "varicella",
    cvxCode: "21",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90717,
    cptDescription: "Yellow fever vaccine, live, for subcutaneous use",
    cvxDescription: "Yellow fever, unspecified formulation",
    cvxCode: "184",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90720,
    cptDescription:
      "Diphtheria, tetanus toxoids, and whole cell pertussis vaccine and Hemophilus influenza B vaccine (DTP-Hib), for intramuscular use",
    cvxDescription: "DTP-Hib",
    cvxCode: "22",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90721,
    cptDescription:
      "Diphtheria, tetanus toxoids, and acellular pertussis vaccine and Hemophilus influenza B vaccine (DTaP/Hib), for intramuscular use",
    cvxDescription: "DTaP-Hib",
    cvxCode: "50",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90723,
    cptDescription:
      "Diphtheria, tetanus toxoids, acellular pertussis vaccine, hepatitis B, and inactivated poliovirus vaccine (DTaP-HepB-IPV), for intramuscular use",
    cvxDescription: "DTaP-Hep B-IPV",
    cvxCode: "110",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90724,
    cptDescription: "Influenza virus vaccine",
    cvxDescription: "influenza, unspecified formulation",
    cvxCode: "88",
    comment: "",
    last_updated: "3-Mar-17",
  },
  {
    cptCode: 90725,
    cptDescription: "Cholera vaccine for injectable use",
    cvxDescription: "cholera, unspecified formulation",
    cvxCode: "26",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90726,
    cptDescription: "Rabies vaccine",
    cvxDescription: "rabies, unspecified formulation",
    cvxCode: "90",
    comment: "",
    last_updated: "3-Mar-17",
  },
  {
    cptCode: 90727,
    cptDescription: "Plague vaccine, for intramuscular use",
    cvxDescription: "plague",
    cvxCode: "23",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90728,
    cptDescription: "BCG vaccine",
    cvxDescription: "BCG",
    cvxCode: "19",
    comment: "",
    last_updated: "3-Mar-17",
  },
  {
    cptCode: 90730,
    cptDescription: "Hepatitis A vaccine",
    cvxDescription: "Hep A, unspecified formulation",
    cvxCode: "85",
    comment: "",
    last_updated: "3-Mar-17",
  },
  {
    cptCode: 90731,
    cptDescription: "Hepatitis B vaccine",
    cvxDescription: "Hep B, unspecified formulation",
    cvxCode: "45",
    comment: "",
    last_updated: "3-Mar-17",
  },
  {
    cptCode: 90732,
    cptDescription:
      "Pneumococcal polysaccharide vaccine, 23-valent (PPSV23), adult or immunosuppressed patient dosage, when administered to individuals 2 years or older, for subcutaneous or intramuscular use",
    cvxDescription: "pneumococcal polysaccharide PPV23",
    cvxCode: "33",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90733,
    cptDescription:
      "Meningococcal polysaccharide vaccine, serogroups A, C, Y, W-135, quadrivalent (MPSV4), for subcutaneous use",
    cvxDescription: "meningococcal MPSV4",
    cvxCode: "32",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90734,
    cptDescription:
      "Meningococcal conjugate vaccine, serogroups A, C, W, Y, quadrivalent, diphtheria toxoid carrier (MenACWY-D) or CRM197 carrier (MenACWY-CRM), for intramuscular use",
    cvxDescription: "meningococcal MCV4P",
    cvxCode: "114",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90735,
    cptDescription:
      "Japanese encephalitis virus vaccine, for subcutaneous use",
    cvxDescription: "Japanese encephalitis SC",
    cvxCode: "39",
    comment: "",
    last_updated: "28-Feb-17",
  },
  {
    cptCode: 90736,
    cptDescription:
      "Zoster (shingles) vaccine (HZV), live, for subcutaneous injection",
    cvxDescription: "zoster live",
    cvxCode: "121",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90737,
    cptDescription: "Hemophilus influenza B",
    cvxDescription: "Hib, unspecified formulation",
    cvxCode: "17",
    comment: "",
    last_updated: "3-Mar-17",
  },
  {
    cptCode: 90738,
    cptDescription:
      "Japanese encephalitis virus vaccine, inactivated, for intramuscular use",
    cvxDescription: "Japanese Encephalitis IM",
    cvxCode: "134",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90739,
    cptDescription:
      "Hepatitis B vaccine (HepB), adult dosage, 2 dose schedule, for intramuscular use",
    cvxDescription: "HepB-CpG",
    cvxCode: "189",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90740,
    cptDescription:
      "Hepatitis B vaccine (HepB), dialysis or immunosuppressed patient dosage, 3 dose schedule, for intramuscular use",
    cvxDescription: "Hep B, dialysis",
    cvxCode: "44",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90741,
    cptDescription:
      "Immunization, passive; immune serum globulin, human (ISG)",
    cvxDescription: "IG, unspecified formulation",
    cvxCode: "14",
    comment: "",
    last_updated: "3-Mar-17",
  },
  {
    cptCode: 90743,
    cptDescription:
      "Hepatitis B vaccine (HepB), adolescent, 2 dose schedule, for intramuscular use",
    cvxDescription: "Hep B, adult",
    cvxCode: "43",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90744,
    cptDescription:
      "Hepatitis B vaccine (HepB), pediatric/adolescent dosage, 3 dose schedule, for intramuscular use",
    cvxDescription: "Hep B, adolescent or pediatric",
    cvxCode: "08",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90745,
    cptDescription:
      "Hepatitis B vaccine, adolescent/high risk infant dosage, for intramuscular use",
    cvxDescription: "Hep B, adolescent/high risk infant",
    cvxCode: "42",
    comment: "",
    last_updated: "3-Mar-17",
  },
  {
    cptCode: 90746,
    cptDescription:
      "Hepatitis B vaccine (HepB), adult dosage, 3 dose schedule, for intramuscular use",
    cvxDescription: "Hep B, adult",
    cvxCode: "43",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90747,
    cptDescription:
      "Hepatitis B vaccine (HepB), dialysis or immunosuppressed patient dosage, 4 dose schedule, for intramuscular use",
    cvxDescription: "Hep B, dialysis",
    cvxCode: "44",
    comment:
      "Note that the NDCs for Engerix-B are mapped to CVX 43 which is not specific to dialysis use",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90748,
    cptDescription:
      "Hepatitis B and Haemophilus influenzae type b vaccine (Hib-HepB), for intramuscular use",
    cvxDescription: "Hib-Hep B",
    cvxCode: "51",
    comment: "",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90750,
    cptDescription:
      "Zoster (shingles) vaccine (HZV), recombinant, subunit, adjuvanted, for intramuscular use",
    cvxDescription: "zoster recombinant",
    cvxCode: "187",
    comment: "",
    last_updated: "25-Jun-18",
  },
  {
    cptCode: 90756,
    cptDescription:
      "Influenza virus vaccine, quadrivalent (ccIIV4), derived from cell cultures, subunit, antibiotic free, 0.5 mL dosage, for intramuscular use",
    cvxDescription:
      "Influenza, injectable, MDCK, quadrivalent, preservative",
    cvxCode: "186",
    comment: "Effective 1/1/2018",
    last_updated: "14-Apr-20",
  },
  {
    cptCode: 90758,
    cptDescription: "Zaire ebolavirus vaccine, live, for intramuscular use",
    cvxDescription: "Ebola Zaire vaccine, live, recombinant, 1mL dose",
    cvxCode: "204",
    comment: "",
    last_updated: "13-Sep-21",
  },
  {
    cptCode: 90759,
    cptDescription:
      "Hepatitis B vaccine (HepB), 3-antigen (S, Pre-S1, Pre-S2), 10 mcg dosage, 3 dose schedule, for intramuscular use",
    cvxDescription: "HepB recombinant, 3-antigen, Al(OH)3",
    cvxCode: "220",
    comment: "",
    last_updated: "13-Sep-21",
  },
  {
    cptCode: 91300,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 30 mcg/0.3 mL dosage, diluent reconstituted, for intramuscular use",
    cvxDescription: "COVID-19, mRNA, LNP-S, PF, 30 mcg/0.3 mL dose",
    cvxCode: "208",
    comment: "COVID-19 Vaccine - EUA authorized 12/11/2020",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91301,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 100 mcg/0.5 mL dosage, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, PF, 100 mcg/0.5mL dose or 50 mcg/0.25mL dose",
    cvxCode: "207",
    comment: "COVID-19 Vaccine - BLA Licensed and EUA authorized",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91302,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, DNA, spike protein, chimpanzee adenovirus Oxford 1 (ChAdOx1) vector, preservative free, 5x1010 viral particles/0.5 mL dosage, for intramuscular use",
    cvxDescription:
      "COVID-19 vaccine, vector-nr, rS-ChAdOx1, PF, 0.5 mL",
    cvxCode: "210",
    comment: "COVID-19 Vaccine - EUA submission withdrawn",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91303,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, DNA, spike protein, adenovirus type 26 (Ad26) vector, preservative free, 5x1010 viral particles/0.5 mL dosage, for intramuscular use",
    cvxDescription: "COVID-19 vaccine, vector-nr, rS-Ad26, PF, 0.5 mL",
    cvxCode: "212",
    comment: "COVID-19 Vaccine - EUA authorized 2/27/2021",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91304,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, recombinant spike protein nanoparticle, saponin-based adjuvant, preservative free, 5 mcg/0.5 mL dosage, for intramuscular use",
    cvxDescription:
      "COVID-19, subunit, rS-nanoparticle+Matrix-M1 Adjuvant, PF, 0.5 mL",
    cvxCode: "211",
    comment: "COVID-19 Vaccine - EUA authorized for ages 12+ yrs",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91305,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 30 mcg/0.3 mL dosage, tris-sucrose formulation, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, PF, 30 mcg/0.3 mL dose, tris-sucrose",
    cvxCode: "217",
    comment:
      "COVID-19 Vaccine - EUA authorized for primary series and IC, EUA rescinded 8/31/202 for monovalent boosters",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91306,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 50 mcg/0.25 mL dosage, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, PF, 100 mcg/0.5mL dose or 50 mcg/0.25mL dose",
    cvxCode: "207",
    comment:
      "COVID-19 Vaccine - EUA authorization rescinded 8/31/2022 for adult monovalent booster dose",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91307,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 10 mcg/0.2 mL dosage, diluent reconstituted, tris-sucrose formulation, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, PF, 10 mcg/0.2 mL dose, tris-sucrose",
    cvxCode: "218",
    comment:
      "COVID-19 Vaccine - EUA authorized, pediatric 5 yrs through 11 yrs dose requires dilution",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91308,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 3 mcg/0.2 mL dosage, diluent reconstituted, tris-sucrose formulation, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, PF, 3 mcg/0.2 mL dose, tris-sucrose",
    cvxCode: "219",
    comment: "COVID-19 Vaccine - EUA authorized for children under 5 yrs",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91309,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 50 mcg/0.5 mL dosage, for intramuscular use",
    cvxDescription: "COVID-19, mRNA, LNP-S, PF, 50 mcg/0.5 mL dose",
    cvxCode: "221",
    comment:
      "COVID-19 Vaccine - EUA authorized for pediatric, EUA rescinded 8/31/2022 for adult monovalent booster dose",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91310,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, monovalent, preservative free, 5 mcg/0.5 mL dosage, adjuvant AS03 emulsion, for intramuscular use",
    cvxDescription:
      "COVID-19, D614, recomb, preS dTM, AS03 adjuvant add, PF, 5mcg/0.5mL",
    cvxCode: "225",
    comment: "COVID-19 Vaccine - Potential EUA authorization booster dose",
    last_updated: "30-Aug-22",
  },
  {
    cptCode: 91311,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 25 mcg/0.25 mL dosage, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, PF, pediatric 25 mcg/0.25 mL dose",
    cvxCode: "228",
    comment: "COVID-19 Vaccine - EUA authorized for ages 6 mo through 5 yrs",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91312,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, bivalent spike protein, preservative free, 30 mcg/0.3 mL dosage, tris-sucrose formulation, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, bivalent booster, PF, 30 mcg/0.3 mL dose",
    cvxCode: "300",
    comment:
      "COVID-19 Vaccine - EUA authorized 8/31/2022 bivalent booster ages 12+ yrs",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91313,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, bivalent, preservative free, 50 mcg/0.5 mL dosage, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, bivalent booster, PF, 50 mcg/0.5 mL or 25mcg/0.25 mL dose",
    cvxCode: "229",
    comment:
      "COVID-19 Vaccine - EUA authorized 8/31/2022 bivalent booster for ages 18+ yrs, potential EUA ages 6 yrs through 17 yrs",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91314,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, bivalent, preservative free, 25 mcg/0.25 mL dosage, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, bivalent booster, PF, 50 mcg/0.5 mL or 25mcg/0.25 mL dose",
    cvxCode: "229",
    comment:
      "COVID-19 Vaccine - Potential EUA authorization bivalent booster for ages 6 yrs through 11 yrs",
    last_updated: "2-Sep-22",
  },
  {
    cptCode: 91315,
    cptDescription:
      "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, bivalent spike protein, preservative free, 10 mcg/0.2 mL dosage, diluent reconstituted, tris-sucrose formulation, for intramuscular use",
    cvxDescription:
      "COVID-19, mRNA, LNP-S, bivalent booster, PF, 10 mcg/0.2 mL dose",
    cvxCode: "301",
    comment:
      "COVID-19 Vaccine - Potential EUA authorization bivalent booster for ages 5 yrs through 11 yrs",
    last_updated: "2-Sep-22",
  },
];


export const cptCvxData = data?.map(({ cptCode, cptDescription, cvxCode, cvxDescription }) => ({ cptCode: `${cptCode}`, cptDescription, cvxCode, cvxDescription }))