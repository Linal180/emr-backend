const feeSchedules = [{
  cptCode: "0011A", serviceFee: "50", revenueCode: "Injection", shortDescription: "ADM SARSCOV2 100MCG/0.5ML1ST"
}, {
  cptCode: "0012A", serviceFee: "60", revenueCode: "Injection", shortDescription: "ADM SARSCOV2 100MCG/0.5ML2ND"
}, {
  cptCode: "0241U", serviceFee: "570", revenueCode: "Laboratory", shortDescription: "NFCT DS VIR RESP RNA 4 TRGT"
}, {
  cptCode: "10021", serviceFee: "252", revenueCode: "Surgery", shortDescription: "FNA W/O IMAGE"
}, {
  cptCode: "10060", serviceFee: "300", revenueCode: "Surgery", shortDescription: "DRAINAGE OF SKIN ABSCESS    "
}, {
  cptCode: "10061", serviceFee: "619", revenueCode: "Surgery", shortDescription: "DRAINAGE OF SKIN ABSCESS    "
}, {
  cptCode: "10080", serviceFee: "407", revenueCode: "Surgery", shortDescription: "DRAINAGE OF PILONIDAL CYST  "
}, {
  cptCode: "10120", serviceFee: "218", revenueCode: "Surgery", shortDescription: "REMOVE FOREIGN BODY"
}, {
  cptCode: "10121", serviceFee: "240", revenueCode: "Surgery", shortDescription: "REMOVE FOREIGN BODY"
}, {
  cptCode: "10140", serviceFee: "300", revenueCode: "Surgery", shortDescription: "DRAINAGE OF HEMATOMA/FLUID"
}, {
  cptCode: "10160", serviceFee: "301", revenueCode: "Surgery", shortDescription: "PUNCTURE DRAINAGE OF LESION "
}, {
  cptCode: "11000", serviceFee: "303", revenueCode: "Surgery", shortDescription: "DEBRIDE INFECTED SKIN"
}, {
  cptCode: "11042", serviceFee: "536", revenueCode: "Surgery", shortDescription: "DEB SUBQ TISSUE 20 SQ CM/lt  "
}, {
  cptCode: "11044", serviceFee: "305", revenueCode: "Surgery", shortDescription: "DEB BONE 20 SQ CM/"
}, {
  cptCode: "11055", serviceFee: "220", revenueCode: "Surgery", shortDescription: "TRIM SKIN LESION"
}, {
  cptCode: "1111D", serviceFee: "0", revenueCode: "Misc", shortDescription: "Calc bmi abv up param f/u"
}, {
  cptCode: "11200", serviceFee: "237", revenueCode: "Surgery", shortDescription: "REMOVAL OF SKIN TAGS        "
}, {
  cptCode: "11307", serviceFee: "300", revenueCode: "Surgery", shortDescription: "SHAVE SKIN LESION"
}, {
  cptCode: "11401", serviceFee: "310", revenueCode: "Surgery", shortDescription: "EXC TR-EXT B9+MARG 0.6-1 CM"
}, {
  cptCode: "11402", serviceFee: "400", revenueCode: "Surgery", shortDescription: "EXC TR-EXT B9+MARG 1.1-2 CM"
}, {
  cptCode: "11422", serviceFee: "350", revenueCode: "Surgery", shortDescription: "EXC H-F-NK-SP B9+MARG 1.1-2"
}, {
  cptCode: "11440", serviceFee: "330", revenueCode: "Surgery", shortDescription: "EXC FACE-MM B9+MARG 0.5  CM"
}, {
  cptCode: "11720", serviceFee: "110", revenueCode: "Surgery", shortDescription: "DEBRIDE NAIL, 1-5                  "
}, {
  cptCode: "11721", serviceFee: "147", revenueCode: "Surgery", shortDescription: "DEBRIDE NAIL, 6 OR MORE            "
}, {
  cptCode: "11730", serviceFee: "250", revenueCode: "Surgery", shortDescription: "REMOVAL OF NAIL PLATE"
}, {
  cptCode: "11740", serviceFee: "183", revenueCode: "Surgery", shortDescription: "DRAIN BLOOD FROM UNDER NAIL "
}, {
  cptCode: "11750", serviceFee: "150", revenueCode: "Surgery", shortDescription: "REMOVAL OF NAIL BED"
}, {
  cptCode: "11765", serviceFee: "417", revenueCode: "Surgery", shortDescription: "EXCISION OF NAIL FOLD TOE   "
}, {
  cptCode: "11900", serviceFee: "154", revenueCode: "Surgery", shortDescription: "INJECTION INTO SKIN LESIONS "
}, {
  cptCode: "12001", serviceFee: "418", revenueCode: "Surgery", shortDescription: "REPAIR SUPERFICIAL WOUND(S) "
}, {
  cptCode: "12002", serviceFee: "510", revenueCode: "Surgery", shortDescription: "REPAIR SUPERFICIAL WOUND(S) "
}, {
  cptCode: "12004", serviceFee: "577", revenueCode: "Surgery", shortDescription: "REPAIR SUPERFICIAL WOUND(S) "
}, {
  cptCode: "12011", serviceFee: "521", revenueCode: "Surgery", shortDescription: "REPAIR SUPERFICIAL WOUND(S) "
}, {
  cptCode: "12013", serviceFee: "536", revenueCode: "Surgery", shortDescription: "REPAIR SUPERFICIAL WOUND(S)"
}, {
  cptCode: "12018", serviceFee: "1529", revenueCode: "Surgery", shortDescription: "REPAIR SUPERFICIAL WOUND(S) "
}, {
  cptCode: "12031", serviceFee: "560", revenueCode: "Surgery", shortDescription: "LAYER CLOSURE OF WOUND(S)          "
}, {
  cptCode: "12032", serviceFee: "703", revenueCode: "Surgery", shortDescription: "LAYER CLOSURE OF WOUND(S)          "
}, {
  cptCode: "12041", serviceFee: "576", revenueCode: "Surgery", shortDescription: "LAYER CLOSURE OF WOUND(S)          "
}, {
  cptCode: "12042", serviceFee: "658", revenueCode: "Surgery", shortDescription: "LAYER CLOSURE OF WOUND(S)          "
}, {
  cptCode: "12051", serviceFee: "680", revenueCode: "Surgery", shortDescription: "LAYER CLOSURE OF WOUND(S)          "
}, {
  cptCode: "12052", serviceFee: "774", revenueCode: "Surgery", shortDescription: "LAYER CLOSURE OF WOUND(S)          "
}, {
  cptCode: "13121", serviceFee: "915", revenueCode: "Surgery", shortDescription: "REPAIR OF WOUND OR LESION"
}, {
  cptCode: "13131", serviceFee: "938", revenueCode: "Surgery", shortDescription: "REPAIR OF WOUND OR LESION   "
}, {
  cptCode: "13132", serviceFee: "1546", revenueCode: "Surgery", shortDescription: "REPAIR OF WOUND OR LESION   "
}, {
  cptCode: "15851", serviceFee: "190", revenueCode: "Surgery", shortDescription: "REMOVAL OF SUTURES"
}, {
  cptCode: "15852", serviceFee: "180", revenueCode: "Surgery", shortDescription: "DRESSING CHANGE NOT FOR BURN"
}, {
  cptCode: "16000", serviceFee: "188", revenueCode: "Surgery", shortDescription: "INITIAL TREATMENT OF BURN(S)"
}, {
  cptCode: "16020", serviceFee: "132", revenueCode: "Surgery", shortDescription: "DRESS/DEBRID P-THICK BURN S"
}, {
  cptCode: "16030", serviceFee: "150", revenueCode: "Surgery", shortDescription: "DRESS/DEBRID P-THICK BURN L"
}, {
  cptCode: "17000", serviceFee: "11372", revenueCode: "Surgery", shortDescription: "DESTRUCT PREMALG LESION"
}, {
  cptCode: "17110", serviceFee: "249", revenueCode: "Surgery", shortDescription: "DESTRUCT B9 LESION 1-14     "
}, {
  cptCode: "17250", serviceFee: "253", revenueCode: "Surgery", shortDescription: "CHEMICAL CAUTERY TISSUE"
}, {
  cptCode: "17999", serviceFee: "250", revenueCode: "Surgery", shortDescription: "SKIN TISSUE PROCEDURE"
}, {
  cptCode: "2035F", serviceFee: "583", revenueCode: "Surgery", shortDescription: "TYMP MEMB MOTION EXAMD"
}, {
  cptCode: "20520", serviceFee: "150", revenueCode: "Surgery", shortDescription: "REMOVAL OF FOREIGN BODY"
}, {
  cptCode: "20550", serviceFee: "225", revenueCode: "Surgery", shortDescription: "INJ TENDON SHEATH/LIGAMENT  "
}, {
  cptCode: "20600", serviceFee: "207", revenueCode: "Surgery", shortDescription: "DRAIN/INJECT JOINT/BURSA    "
}, {
  cptCode: "20605", serviceFee: "215", revenueCode: "Surgery", shortDescription: "DRAIN/INJ JOINT/BURSA W/O US"
}, {
  cptCode: "20610", serviceFee: "190", revenueCode: "Surgery", shortDescription: "DRAIN/INJ JOINT/BURSA W/O US"
}, {
  cptCode: "22010", serviceFee: "810", revenueCode: "Surgery", shortDescription: "I and D P-SPINE C/T/CERV-THOR"
}, {
  cptCode: "23930", serviceFee: "507", revenueCode: "Surgery", shortDescription: "DRAINAGE OF ARM LESION"
}, {
  cptCode: "24200", serviceFee: "672", revenueCode: "Surgery", shortDescription: "REMOVAL OF ARM FOREIGN BODY "
}, {
  cptCode: "24600", serviceFee: "1101", revenueCode: "Surgery", shortDescription: "TREAT ELBOW DISLOCATION     "
}, {
  cptCode: "25600", serviceFee: "550", revenueCode: "Surgery", shortDescription: "TREAT FRACTURE RADIUS/ULNA"
}, {
  cptCode: "26010", serviceFee: "225", revenueCode: "Surgery", shortDescription: "DRAINAGE OF FINGER ABSCESS"
}, {
  cptCode: "26755", serviceFee: "220", revenueCode: "Surgery", shortDescription: "TREAT FINGER FRACTURE EACH"
}, {
  cptCode: "26770", serviceFee: "210", revenueCode: "Surgery", shortDescription: "TREAT FINGER DISLOCATION"
}, {
  cptCode: "26775", serviceFee: "250", revenueCode: "Surgery", shortDescription: "TREAT FINGER DISLOCATION"
}, {
  cptCode: "27786", serviceFee: "1137", revenueCode: "Surgery", shortDescription: "TREATMENT OF ANKLE FRACTURE "
}, {
  cptCode: "28024", serviceFee: "1050", revenueCode: "Surgery", shortDescription: "EXPLORATION OF TOE JOINT"
}, {
  cptCode: "28190", serviceFee: "403", revenueCode: "Surgery", shortDescription: "REMOVAL OF FOOT FOREIGN BODY"
}, {
  cptCode: "28490", serviceFee: "475", revenueCode: "Surgery", shortDescription: "TREAT BIG TOE FRACTURE      "
}, {
  cptCode: "28510", serviceFee: "350", revenueCode: "Surgery", shortDescription: "TREATMENT OF TOE FRACTURE"
}, {
  cptCode: "29075", serviceFee: "330", revenueCode: "Surgery", shortDescription: "APPLICATION OF FOREARM CAST"
}, {
  cptCode: "29085", serviceFee: "337", revenueCode: "Surgery", shortDescription: "APPLY HAND/WRIST CAST       "
}, {
  cptCode: "29105", serviceFee: "220", revenueCode: "Supplies", shortDescription: "APPLY LONG ARM SPLINT"
}, {
  cptCode: "29125", serviceFee: "216", revenueCode: "Surgery", shortDescription: "APPLY FOREARM SPLINT        "
}, {
  cptCode: "29130", serviceFee: "148", revenueCode: "Ortho", shortDescription: "APPLICATION OF FINGER SPLINT"
}, {
  cptCode: "29260", serviceFee: "100", revenueCode: "Surgery", shortDescription: "STRAPPING OF ELBOW OR WRIST"
}, {
  cptCode: "29280", serviceFee: "100", revenueCode: "Surgery", shortDescription: "STRAPPING OF HAND OR FINGER"
}, {
  cptCode: "29515", serviceFee: "226", revenueCode: "Surgery", shortDescription: "APPLICATION LOWER LEG SPLINT"
}, {
  cptCode: "29540", serviceFee: "115", revenueCode: "Supplies", shortDescription: "STRAPPING OF ANKLE AND/OR FT"
}, {
  cptCode: "29550", serviceFee: "100", revenueCode: "Surgery", shortDescription: "STRAPPING OF TOES"
}, {
  cptCode: "30300", serviceFee: "560", revenueCode: "Surgery", shortDescription: "REMOVE NASAL FOREIGN BODY"
}, {
  cptCode: "3044F", serviceFee: "0", revenueCode: "Surgery", shortDescription: "HG A1C LEVEL LT 7.0%"
}, {
  cptCode: "36000", serviceFee: "194", revenueCode: "Surgery", shortDescription: "PLACE NEEDLE IN VEIN"
}, {
  cptCode: "36415", serviceFee: "29", revenueCode: "Surgery", shortDescription: "ROUTINE VENIPUNCTURE"
}, {
  cptCode: "36416", serviceFee: "24", revenueCode: "", shortDescription: "CAPILLARY BLOOD DRAW",
}, {
  cptCode: "36475", serviceFee: "876", revenueCode: "Surgery", shortDescription: "ENDOVENOUS RF 1ST VEIN"
}, {
  cptCode: "36970", serviceFee: "107", revenueCode: "Laboratory", shortDescription: "QUANTIFERON GOLD"
}, {
  cptCode: "46050", serviceFee: "501", revenueCode: "Surgery", shortDescription: "INCISION OF ANAL ABSCESS"
}, {
  cptCode: "51798", serviceFee: "166", revenueCode: "", shortDescription: "US URINE CAPACITY MEASURE"
}, {
  cptCode: "54056", serviceFee: "422", revenueCode: "Surgery", shortDescription: "CRYOSURGERY PENIS LESION(S)"
}, {
  cptCode: "56405", serviceFee: "501", revenueCode: "Surgery", shortDescription: "I and D OF VULVA/PERINEUM"
}, {
  cptCode: "56420", serviceFee: "505", revenueCode: "Surgery", shortDescription: "DRAINAGE OF GLAND ABSCESS"
}, {
  cptCode: "57415", serviceFee: "105", revenueCode: "Surgery", shortDescription: "REMOVE VAGINAL FOREIGN BODY"
}, {
  cptCode: "58100", serviceFee: "500", revenueCode: "Surgery", shortDescription: "BIOPSY OF UTERUS LINING"
}, {
  cptCode: "64450", serviceFee: "80", revenueCode: "Surgery", shortDescription: "N BLOCK OTHER PERIPHERAL"
}, {
  cptCode: "65205", serviceFee: "180", revenueCode: "Surgery", shortDescription: "REMOVE FOREIGN BODY FROM EYE"
}, {
  cptCode: "65450", serviceFee: "280", revenueCode: "Surgery", shortDescription: "TREATMENT OF CORNEAL LESION"
}, {
  cptCode: "67935", serviceFee: "2214", revenueCode: "Surgery", shortDescription: "REPAIR EYELID WOUND         "
}, {
  cptCode: "69000", serviceFee: "510", revenueCode: "Surgery", shortDescription: "DRAIN EXTERNAL EAR LESION"
}, {
  cptCode: "69005", serviceFee: "45292", revenueCode: "Surgery", shortDescription: "DRAIN EXTERNAL EAR LESION"
}, {
  cptCode: "69020", serviceFee: "522", revenueCode: "Surgery", shortDescription: "DRAIN OUTER EAR CANAL LESION"
}, {
  cptCode: "69200", serviceFee: "328", revenueCode: "Surgery", shortDescription: "CLEAR OUTER EAR CANAL       "
}, {
  cptCode: "69210", serviceFee: "140", revenueCode: "Surgery", shortDescription: "REMOVE IMPACTED EAR WAX            "
}, {
  cptCode: "70110", serviceFee: "77", revenueCode: "", shortDescription: "X-RAY EXAM OF JAW 4plus VIEWS"
}, {
  cptCode: "70110", serviceFee: "203", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF JAW                  "
}, {
  cptCode: "70140", serviceFee: "58", revenueCode: "", shortDescription: "X-RAY EXAM OF FACIAL BONES"
}, {
  cptCode: "70140", serviceFee: "148", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF FACIAL BONES         "
}, {
  cptCode: "70150", serviceFee: "168", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF FACIAL BONES"
}, {
  cptCode: "70160", serviceFee: "53", revenueCode: "", shortDescription: "X-RAY EXAM OF NASAL BONES"
}, {
  cptCode: "70160", serviceFee: "145", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF NASAL BONES   "
}, {
  cptCode: "70200", serviceFee: "205", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF EYE SOCKETS"
}, {
  cptCode: "70220", serviceFee: "80", revenueCode: "", shortDescription: "X-RAY EXAM OF SINUSES"
}, {
  cptCode: "70220", serviceFee: "212", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF SINUSES              "
}, {
  cptCode: "70250", serviceFee: "66", revenueCode: "", shortDescription: "X-RAY EXAM OF SKULL"
}, {
  cptCode: "70250", serviceFee: "170", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF SKULL                "
}, {
  cptCode: "70260", serviceFee: "97", revenueCode: "", shortDescription: "X-RAY EXAM OF SKULL"
}, {
  cptCode: "70260", serviceFee: "240", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF SKULL                "
}, {
  cptCode: "70328", serviceFee: "134", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF JAW JOINT"
}, {
  cptCode: "70360", serviceFee: "48", revenueCode: "", shortDescription: "X-RAY EXAM OF NECK"
}, {
  cptCode: "70360", serviceFee: "128", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF NECK          "
}, {
  cptCode: "71045", serviceFee: "120", revenueCode: "Radiology", shortDescription: "RADIOLOGIC EXAM, CHEST; SINGLE VIEW"
}, {
  cptCode: "71046", serviceFee: "190", revenueCode: "Radiology", shortDescription: "RADIOLOGIC EXAM, CHEST; 2 VIEWS"
}, {
  cptCode: "71100", serviceFee: "62", revenueCode: "", shortDescription: "X-RAY EXAM RIBS UNI 2 VIEWS"
}, {
  cptCode: "71100", serviceFee: "159", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF RIBS                 "
}, {
  cptCode: "71101", serviceFee: "78", revenueCode: "", shortDescription: "X-RAY EXAM UNILAT RIBS/CHEST"
}, {
  cptCode: "71101", serviceFee: "199", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF RIBS/CHEST           "
}, {
  cptCode: "71110", serviceFee: "81", revenueCode: "", shortDescription: "X-RAY EXAM RIBS BIL 3 VIEWS"
}, {
  cptCode: "71110", serviceFee: "209", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF RIBS                 "
}, {
  cptCode: "71111", serviceFee: "243", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF RIBS/CHEST"
}, {
  cptCode: "71120", serviceFee: "203", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF BREASTBONE"
}, {
  cptCode: "72020", serviceFee: "45", revenueCode: "", shortDescription: "X-RAY EXAM OF SPINE 1 VIEW"
}, {
  cptCode: "72020", serviceFee: "115", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF SPINE         "
}, {
  cptCode: "72040", serviceFee: "120", revenueCode: "", shortDescription: "X-RAY EXAM NECK SPINE 2-3 VW       "
}, {
  cptCode: "72040", serviceFee: "238", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF NECK SPINE           "
}, {
  cptCode: "72050", serviceFee: "92", revenueCode: "", shortDescription: "X-RAY EXAM NECK SPINE 4/5VWS       "
}, {
  cptCode: "72050", serviceFee: "242", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF NECK SPINE           "
}, {
  cptCode: "72070", serviceFee: "70", revenueCode: "", shortDescription: "X-RAY EXAM THORAC SPINE 2VWS"
}, {
  cptCode: "72070", serviceFee: "215", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF THORACIC SPINE       "
}, {
  cptCode: "72100", serviceFee: "104", revenueCode: "", shortDescription: "X-RAY EXAM L-S SPINE 2/3 VWS"
}, {
  cptCode: "72100", serviceFee: "223", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF LOWER SPINE          "
}, {
  cptCode: "72110", serviceFee: "92", revenueCode: "", shortDescription: "X-RAY EXAM L-2 SPINE 4plusVWS"
}, {
  cptCode: "72110", serviceFee: "249", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF LOWER SPINE          "
}, {
  cptCode: "72170", serviceFee: "59", revenueCode: "", shortDescription: "X-RAY EXAM OF PELVIS"
}, {
  cptCode: "72170", serviceFee: "147", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF PELVIS               "
}, {
  cptCode: "72190", serviceFee: "160", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF PELVIS"
}, {
  cptCode: "72200", serviceFee: "58", revenueCode: "", shortDescription: "X-RAY EXAM SI JOINTS"
}, {
  cptCode: "72200", serviceFee: "158", revenueCode: "Radiology", shortDescription: "X-RAY EXAM SACROILIAC JOINTS       "
}, {
  cptCode: "72220", serviceFee: "57", revenueCode: "", shortDescription: "X-RAY EXAM SACRUM TAILBONE"
}, {
  cptCode: "72220", serviceFee: "154", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF TAILBONE             "
}, {
  cptCode: "73000", serviceFee: "46", revenueCode: "", shortDescription: "X-RAY EXAM OF COLLAR BONE"
}, {
  cptCode: "73000", serviceFee: "136", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF COLLAR BONE   "
}, {
  cptCode: "73010", serviceFee: "136", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF SHOULDER BLADE"
}, {
  cptCode: "73020", serviceFee: "46", revenueCode: "", shortDescription: "X-RAY EXAM OF SHOULDER"
}, {
  cptCode: "73020", serviceFee: "118", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF SHOULDER             "
}, {
  cptCode: "73030", serviceFee: "63", revenueCode: "", shortDescription: "X-RAY EXAM OF SHOULDER"
}, {
  cptCode: "73030", serviceFee: "163", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF SHOULDER             "
}, {
  cptCode: "73060", serviceFee: "57", revenueCode: "", shortDescription: "X-RAY EXAM OF HUMERUS"
}, {
  cptCode: "73060", serviceFee: "149", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF HUMERUS              "
}, {
  cptCode: "73070", serviceFee: "138", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF ELBOW"
}, {
  cptCode: "73080", serviceFee: "153", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF ELBOW"
}, {
  cptCode: "73090", serviceFee: "49", revenueCode: "", shortDescription: "X-RAY EXAM OF FOREARM"
}, {
  cptCode: "73090", serviceFee: "249", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF FOREARM              "
}, {
  cptCode: "73100", serviceFee: "43", revenueCode: "", shortDescription: "X-RAY EXAM OF WRIST"
}, {
  cptCode: "73100", serviceFee: "116", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF WRIST                "
}, {
  cptCode: "73110", serviceFee: "51", revenueCode: "", shortDescription: "X-RAY EXAM OF WRIST"
}, {
  cptCode: "73110", serviceFee: "148", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF WRIST                "
}, {
  cptCode: "73120", serviceFee: "62", revenueCode: "", shortDescription: "X-RAY EXAM OF HAND"
}, {
  cptCode: "73120", serviceFee: "138", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF HAND                 "
}, {
  cptCode: "73130", serviceFee: "51", revenueCode: "", shortDescription: "X-RAY EXAM OF HAND"
}, {
  cptCode: "73130", serviceFee: "143", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF HAND                 "
}, {
  cptCode: "73140", serviceFee: "38", revenueCode: "", shortDescription: "X-RAY EXAM OF FINGER(S)"
}, {
  cptCode: "73140", serviceFee: "113", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF FINGER(S)            "
}, {
  cptCode: "73221", serviceFee: "419", revenueCode: "", shortDescription: "MRI JOINT UPR EXTREM W/O DYE"
}, {
  cptCode: "73221", serviceFee: "2097", revenueCode: "", shortDescription: "MRI	MRI JOINT UPR EXTREM W/O DYE"
}, {
  cptCode: "73500", serviceFee: "160", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF HIP"
}, {
  cptCode: "73501", serviceFee: "160", revenueCode: "Radiology", shortDescription: "Xray, hip, unilateral; 1 view"
}, {
  cptCode: "73502", serviceFee: "163", revenueCode: "Radiology", shortDescription: "Xray, hip, unilateral; 2-3 views"
}, {
  cptCode: "73510", serviceFee: "157", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF HIP"
}, {
  cptCode: "73510", serviceFee: "157", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF HIP"
}, {
  cptCode: "73520", serviceFee: "163", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF HIPS"
}, {
  cptCode: "73521", serviceFee: "163", revenueCode: "Radiology", shortDescription: "Xray, hip, bilateral; 2 views"
}, {
  cptCode: "73523", serviceFee: "210", revenueCode: "Radiology", shortDescription: "Xray, hip, bilateral; min 5 views"
}, {
  cptCode: "73551", serviceFee: "173", revenueCode: "Radiology", shortDescription: "Xray, femur; 1 view"
}, {
  cptCode: "73552", serviceFee: "220", revenueCode: "Radiology", shortDescription: "Xray, femur; min 2 views"
}, {
  cptCode: "73560", serviceFee: "60", revenueCode: "", shortDescription: "X-RAY EXAM OF KNEE 1 OR 2"
}, {
  cptCode: "73560", serviceFee: "144", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF KNEE, 1 OR 2         "
}, {
  cptCode: "73562", serviceFee: "59", revenueCode: "", shortDescription: "X-RAY EXAM OF KNEE 3"
}, {
  cptCode: "73562", serviceFee: "161", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF KNEE, 3              "
}, {
  cptCode: "73564", serviceFee: "72", revenueCode: "", shortDescription: "X-RAY EXAM KNEE 4 OR MORE"
}, {
  cptCode: "73564", serviceFee: "193", revenueCode: "Radiology", shortDescription: "X-RAY EXAM, KNEE, 4 OR MORE        "
}, {
  cptCode: "73565", serviceFee: "195", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF KNEES"
}, {
  cptCode: "73590", serviceFee: "60", revenueCode: "", shortDescription: "X-RAY EXAM OF LOWER LEG"
}, {
  cptCode: "73590", serviceFee: "144", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF LOWER LEG            "
}, {
  cptCode: "73600", serviceFee: "70", revenueCode: "", shortDescription: "X-RAY EXAM OF ANKLE"
}, {
  cptCode: "73600", serviceFee: "138", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF ANKLE                "
}, {
  cptCode: "73610", serviceFee: "65", revenueCode: "", shortDescription: "X-RAY EXAM OF ANKLE"
}, {
  cptCode: "73610", serviceFee: "150", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF ANKLE                "
}, {
  cptCode: "73620", serviceFee: "67", revenueCode: "", shortDescription: "X-RAY EXAM OF FOOT"
}, {
  cptCode: "73620", serviceFee: "138", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF FOOT                 "
}, {
  cptCode: "73630", serviceFee: "49", revenueCode: "", shortDescription: "X-RAY EXAM OF FOOT"
}, {
  cptCode: "73630", serviceFee: "146", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF FOOT"
}, {
  cptCode: "73650", serviceFee: "46", revenueCode: "", shortDescription: "X-RAY EXAM OF HEEL"
}, {
  cptCode: "73650", serviceFee: "123", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF HEEL                 "
}, {
  cptCode: "73660", serviceFee: "50", revenueCode: "", shortDescription: "X-RAY EXAM OF TOE(S)"
}, {
  cptCode: "73660", serviceFee: "138", revenueCode: "Radiology", shortDescription: "X-RAY EXAM OF TOE(S)               "
}, {
  cptCode: "74018", serviceFee: "137", revenueCode: "Radiology", shortDescription: "RADIOLOGIC EXAM, ABDOMEN; 1 VIEW"
}, {
  cptCode: "74019", serviceFee: "156", revenueCode: "Radiology", shortDescription: "RADIOLOGIC EXAM, ABDOMEN; 2 VIEWS"
}, {
  cptCode: "74021", serviceFee: "168", revenueCode: "Radiology", shortDescription: "RADIOLOGIC EXAM, ABDOMEN; 3 VIEWS"
}, {
  cptCode: "74022", serviceFee: "180", revenueCode: "Radiology", shortDescription: "X-RAY EXAM SERIES ABDOMEN"
}, {
  cptCode: "76377", serviceFee: "258", revenueCode: "", shortDescription: "3D RENDER W/INTRP POSTPROCES"
}, {
  cptCode: "76377", serviceFee: "664", revenueCode: "", shortDescription: "3D RENDERING W/POSTPROCESS         "
}, {
  cptCode: "76536", serviceFee: "159", revenueCode: "", shortDescription: "US EXAM OF HEAD AND NECK"
}, {
  cptCode: "76536", serviceFee: "429", revenueCode: "Radiology", shortDescription: "US EXAM OF HEAD AND NECK    "
}, {
  cptCode: "76604", serviceFee: "380", revenueCode: "Radiology", shortDescription: "US CHEST/UPPER BACK"
}, {
  cptCode: "76641", serviceFee: "380", revenueCode: "Radiology", shortDescription: "ULTRASOUND BREAST COMPLETE"
}, {
  cptCode: "76642", serviceFee: "380", revenueCode: "Radiology", shortDescription: "ULTRASOUND BREAST LIMITED"
}, {
  cptCode: "76645", serviceFee: "380", revenueCode: "Radiology", shortDescription: "US EXAM BREAST(S)"
}, {
  cptCode: "76700", serviceFee: "189", revenueCode: "", shortDescription: "US EXAM ABDOM COMPLETE"
}, {
  cptCode: "76700", serviceFee: "483", revenueCode: "Radiology", shortDescription: "US EXAM ABDOM COMPLETE      "
}, {
  cptCode: "76705", serviceFee: "145", revenueCode: "", shortDescription: "ECHO EXAM OF ABDOMEN"
}, {
  cptCode: "76705", serviceFee: "370", revenueCode: "Radiology", shortDescription: "ECHO EXAM OF ABDOMEN        "
}, {
  cptCode: "76770", serviceFee: "204", revenueCode: "", shortDescription: "US EXAM ABDO BACK WALL COMP"
}, {
  cptCode: "76770", serviceFee: "522", revenueCode: "Radiology", shortDescription: "US EXAM ABDO BACK WALL COMP "
}, {
  cptCode: "76775", serviceFee: "146", revenueCode: "", shortDescription: "US EXAM ABDO BACK WALL LIM"
}, {
  cptCode: "76775", serviceFee: "385", revenueCode: "Radiology", shortDescription: "US EXAM ABDO BACK WALL LIM  "
}, {
  cptCode: "76830", serviceFee: "450", revenueCode: "Radiology", shortDescription: "TRANSVAGINAL US NON-OB"
}, {
  cptCode: "76856", serviceFee: "180", revenueCode: "", shortDescription: "US EXAM PELVIC COMPLETE"
}, {
  cptCode: "76856", serviceFee: "463", revenueCode: "Radiology", shortDescription: "US EXAM PELVIC COMPLETE     "
}, {
  cptCode: "76857", serviceFee: "108", revenueCode: "", shortDescription: "US EXAM PELVIC LIMITED"
}, {
  cptCode: "76857", serviceFee: "339", revenueCode: "Radiology", shortDescription: "US EXAM PELVIC LIMITED      "
}, {
  cptCode: "76870", serviceFee: "172", revenueCode: "", shortDescription: "US EXAM SCROTUM"
}, {
  cptCode: "76870", serviceFee: "450", revenueCode: "Radiology", shortDescription: "US GENITALIA-SCROTUM AND CNTS"
}, {
  cptCode: "76881", serviceFee: "260", revenueCode: "Radiology", shortDescription: "US XTR NON-VASC COMPLETE"
}, {
  cptCode: "76882", serviceFee: "341", revenueCode: "Radiology", shortDescription: "US XTR NON-VASC LMTD"
}, {
  cptCode: "77081", serviceFee: "71", revenueCode: "", shortDescription: "DXA BONE DENSITY/PERIPHERAL"
}, {
  cptCode: "77081", serviceFee: "191", revenueCode: "", shortDescription: "DXA BONE DENSITY/PERIPHERAL        "
}, {
  cptCode: "77086", serviceFee: "90", revenueCode: "Radiology", shortDescription: "FRACTURE ASSESSMENT VIA DXA"
}, {
  cptCode: "78070", serviceFee: "214", revenueCode: "", shortDescription: "PARATHYROID PLANAR IMAGING         "
}, {
  cptCode: "78070", serviceFee: "670", revenueCode: "Radiology", shortDescription: "PARATHYROID NUCLEAR IMAGING "
}, {
  cptCode: "78452", serviceFee: "0", revenueCode: "", shortDescription: "HT MUSCLE IMAGE SPECT MULT"
}, {
  cptCode: "78452", serviceFee: "1050", revenueCode: "", shortDescription: "	HT MUSCLE IMAGE SPECT, MULT        "
}, {
  cptCode: "80047", serviceFee: "107", revenueCode: "", shortDescription: "METABOLIC PANEL IONIZED CA         "
}, {
  cptCode: "80048", serviceFee: "78", revenueCode: "Laboratory", shortDescription: "BASIC METABOLIC PANEL              "
}, {
  cptCode: "80050", serviceFee: "236", revenueCode: "Laboratory", shortDescription: "GENERAL HEALTH PANEL        "
}, {
  cptCode: "80051", serviceFee: "74", revenueCode: "Laboratory", shortDescription: "ELECTROLYTE PANEL                  "
}, {
  cptCode: "80053", serviceFee: "150", revenueCode: "Laboratory", shortDescription: "COMPREHEN METABOLIC PANEL"
}, {
  cptCode: "80061", serviceFee: "125", revenueCode: "Laboratory", shortDescription: "LIPID PANEL                        "
}, {
  cptCode: "80069", serviceFee: "87", revenueCode: "Laboratory", shortDescription: "RENAL FUNCTION PANEL               "
}, {
  cptCode: "80074", serviceFee: "425", revenueCode: "Laboratory", shortDescription: "ACUTE HEPATITIS PANEL       "
}, {
  cptCode: "80076", serviceFee: "94", revenueCode: "Laboratory", shortDescription: "HEPATIC FUNCTION PANEL      "
}, {
  cptCode: "80100", serviceFee: "143", revenueCode: "Laboratory", shortDescription: "DRUG SCREEN QUALITATE/MULTI "
}, {
  cptCode: "80101", serviceFee: "115", revenueCode: "Laboratory", shortDescription: "DRUG SCREEN SINGLE          "
}, {
  cptCode: "80104", serviceFee: "0", revenueCode: "", shortDescription: "DRUG SCRN 1+ CLASS NONCHROMO"
}, {
  cptCode: "80156", serviceFee: "130", revenueCode: "Laboratory", shortDescription: "ASSAY CARBAMAZEPINE TOTAL   "
}, {
  cptCode: "80164", serviceFee: "134", revenueCode: "Laboratory", shortDescription: "ASSAY DIPROPYLACETIC ACID   "
}, {
  cptCode: "80176", serviceFee: "114", revenueCode: "Laboratory", shortDescription: "ASSAY OF LIDOCAINE          "
}, {
  cptCode: "80184", serviceFee: "121", revenueCode: "Laboratory", shortDescription: "ASSAY OF PHENOBARBITAL      "
}, {
  cptCode: "80301", serviceFee: "125", revenueCode: "Laboratory", shortDescription: "DRUG SCREEN CLASS LIST A"
}, {
  cptCode: "80307", serviceFee: "137", revenueCode: "Laboratory", shortDescription: "DRUG TEST(S) INSTR CHEMISTRY ANALYL"
}, {
  cptCode: "80335", serviceFee: "60", revenueCode: "Laboratory", shortDescription: "ANTIDEPRESSANT TRICYCLIC 1/2"
}, {
  cptCode: "80418", serviceFee: "3272", revenueCode: "Laboratory", shortDescription: "PITUITARY EVALUATION PANEL  "
}, {
  cptCode: "80432", serviceFee: "718", revenueCode: "Laboratory", shortDescription: "INSULIN SUPPRESSION PANEL   "
}, {
  cptCode: "81000", serviceFee: "30", revenueCode: "Laboratory", shortDescription: "URINALYSIS NONAUTO W/SCOPE  "
}, {
  cptCode: "81001", serviceFee: "41", revenueCode: "Laboratory", shortDescription: "URINALYSIS AUTO W/SCOPE     "
}, {
  cptCode: "81002", serviceFee: "25", revenueCode: "Laboratory", shortDescription: "URINALYSIS NONAUTO W/O SCOPE"
}, {
  cptCode: "81003", serviceFee: "34", revenueCode: "Laboratory", shortDescription: "URINALYSIS AUTO W/O SCOPE   "
}, {
  cptCode: "81005", serviceFee: "31", revenueCode: "Laboratory", shortDescription: "URINALYSIS                  "
}, {
  cptCode: "81007", serviceFee: "32", revenueCode: "Laboratory", shortDescription: "URINE SCREEN FOR BACTERIA   "
}, {
  cptCode: "81015", serviceFee: "33", revenueCode: "Laboratory", shortDescription: "MICROSCOPIC EXAM OF URINE   "
}, {
  cptCode: "81025", serviceFee: "55", revenueCode: "Laboratory", shortDescription: "URINE PREGNANCY TEST"
}, {
  cptCode: "82040", serviceFee: "41", revenueCode: "Laboratory", shortDescription: "ASSAY OF SERUM ALBUMIN             "
}, {
  cptCode: "82043", serviceFee: "117", revenueCode: "Laboratory", shortDescription: "MICROALBUMIN QUANTITATIVE   "
}, {
  cptCode: "82105", serviceFee: "153", revenueCode: "Laboratory", shortDescription: "ALPHA-FETOPROTEIN SERUM     "
}, {
  cptCode: "82107", serviceFee: "300", revenueCode: "", shortDescription: "ALPHA-FETOPROTEIN L3        "
}, {
  cptCode: "82150", serviceFee: "58", revenueCode: "Laboratory", shortDescription: "ASSAY OF AMYLASE                   "
}, {
  cptCode: "82157", serviceFee: "280", revenueCode: "Laboratory", shortDescription: "ASSAY OF ANDROSTENEDIONE           "
}, {
  cptCode: "82164", serviceFee: "162", revenueCode: "Laboratory", shortDescription: "ANGIOTENSIN I ENZYME TEST   "
}, {
  cptCode: "82172", serviceFee: "140", revenueCode: "Laboratory", shortDescription: "ASSAY OF APOLIPOPROTEIN     "
}, {
  cptCode: "82232", serviceFee: "186", revenueCode: "Laboratory", shortDescription: "ASSAY OF BETA-2 PROTEIN            "
}, {
  cptCode: "82247", serviceFee: "40", revenueCode: "Laboratory", shortDescription: "BILIRUBIN TOTAL             "
}, {
  cptCode: "82248", serviceFee: "45", revenueCode: "Laboratory", shortDescription: "BILIRUBIN DIRECT"
}, {
  cptCode: "82270", serviceFee: "38", revenueCode: "Laboratory", shortDescription: "OCCULT BLOOD FECES          "
}, {
  cptCode: "82271", serviceFee: "30", revenueCode: "", shortDescription: "OCCULT BLOOD, FECES, SINGLE        "
}, {
  cptCode: "82272", serviceFee: "30", revenueCode: "", shortDescription: "OCCULT BLD FECES 1-3 TESTS  "
}, {
  cptCode: "82274", serviceFee: "98", revenueCode: "Laboratory", shortDescription: "ASSAY TEST FOR BLOOD FECAL  "
}, {
  cptCode: "82306", serviceFee: "281", revenueCode: "Laboratory", shortDescription: "VITAMIN D 25 HYDROXY        "
}, {
  cptCode: "82310", serviceFee: "59", revenueCode: "Laboratory", shortDescription: "ASSAY OF CALCIUM            "
}, {
  cptCode: "82330", serviceFee: "136", revenueCode: "Laboratory", shortDescription: "ASSAY OF CALCIUM            "
}, {
  cptCode: "82374", serviceFee: "130", revenueCode: "Laboratory", shortDescription: "ASSAY BLOOD CARBON DIOXIDE"
}, {
  cptCode: "82378", serviceFee: "154", revenueCode: "Laboratory", shortDescription: "CARCINOEMBRYONIC ANTIGEN    "
}, {
  cptCode: "82397", serviceFee: "121", revenueCode: "Laboratory", shortDescription: "CHEMILUMINESCENT ASSAY             "
}, {
  cptCode: "82435", serviceFee: "116", revenueCode: "Laboratory", shortDescription: "ASSAY OF BLOOD CHLORIDE"
}, {
  cptCode: "82465", serviceFee: "125", revenueCode: "Laboratory", shortDescription: "ASSAY BLD/SERUM CHOLESTEROL"
}, {
  cptCode: "82525", serviceFee: "130", revenueCode: "Laboratory", shortDescription: "ASSAY OF COPPER             "
}, {
  cptCode: "82533", serviceFee: "75", revenueCode: "Laboratory", shortDescription: "TOTAL CORTISOL"
}, {
  cptCode: "82540", serviceFee: "64", revenueCode: "Laboratory", shortDescription: "ASSAY OF CREATINE                  "
}, {
  cptCode: "82550", serviceFee: "73", revenueCode: "Laboratory", shortDescription: "ASSAY OF CK (CPK)           "
}, {
  cptCode: "82552", serviceFee: "133", revenueCode: "Laboratory", shortDescription: "ASSAY OF CPK IN BLOOD       "
}, {
  cptCode: "82553", serviceFee: "97", revenueCode: "Laboratory", shortDescription: "CREATINE MB FRACTION        "
}, {
  cptCode: "82565", serviceFee: "46", revenueCode: "Laboratory", shortDescription: "ASSAY OF CREATININE         "
}, {
  cptCode: "82570", serviceFee: "60", revenueCode: "Laboratory", shortDescription: "ASSAY OF URINE CREATININE   "
}, {
  cptCode: "82607", serviceFee: "150", revenueCode: "Laboratory", shortDescription: "VITAMIN B-12                "
}, {
  cptCode: "82608", serviceFee: "164", revenueCode: "Laboratory", shortDescription: "B-12 BINDING CAPACITY       "
}, {
  cptCode: "82626", serviceFee: "296", revenueCode: "Laboratory", shortDescription: "DEHYDROEPIANDROSTERONE      "
}, {
  cptCode: "82627", serviceFee: "238", revenueCode: "Laboratory", shortDescription: "DEHYDROEPIANDROSTERONE      "
}, {
  cptCode: "82652", serviceFee: "374", revenueCode: "Laboratory", shortDescription: "ASSAY OF DIHYDROXYVITAMIN D        "
}, {
  cptCode: "82670", serviceFee: "211", revenueCode: "Laboratory", shortDescription: "ASSAY OF ESTRADIOL                 "
}, {
  cptCode: "82672", serviceFee: "248", revenueCode: "Laboratory", shortDescription: "ASSAY OF ESTROGEN           "
}, {
  cptCode: "82679", serviceFee: "236", revenueCode: "Laboratory", shortDescription: "ASSAY OF ESTRONE                   "
}, {
  cptCode: "82728", serviceFee: "160", revenueCode: "Laboratory", shortDescription: "ASSAY OF FERRITIN                  "
}, {
  cptCode: "82746", serviceFee: "138", revenueCode: "Laboratory", shortDescription: "BLOOD FOLIC ACID SERUM      "
}, {
  cptCode: "82747", serviceFee: "181", revenueCode: "Laboratory", shortDescription: "ASSAY OF FOLIC ACID RBC     "
}, {
  cptCode: "82784", serviceFee: "153", revenueCode: "Laboratory", shortDescription: "ASSAY IGA/IGD/IGG/IGM EACH"
}, {
  cptCode: "82785", serviceFee: "149", revenueCode: "Laboratory", shortDescription: "ASSAY OF IGE                "
}, {
  cptCode: "82810", serviceFee: "81", revenueCode: "Laboratory", shortDescription: "BLOOD GASES O2 SAT ONLY     "
}, {
  cptCode: "82947", serviceFee: "40", revenueCode: "Laboratory", shortDescription: "ASSAY GLUCOSE BLOOD QUANT   "
}, {
  cptCode: "82948", serviceFee: "28", revenueCode: "Laboratory", shortDescription: "REAGENT STRIP/BLOOD GLUCOSE "
}, {
  cptCode: "82955", serviceFee: "119", revenueCode: "Laboratory", shortDescription: "ASSAY OF G6PD ENZYME        "
}, {
  cptCode: "82962", serviceFee: "29", revenueCode: "Laboratory", shortDescription: "GLUCOSE BLOOD TEST          "
}, {
  cptCode: "82977", serviceFee: "48", revenueCode: "Laboratory", shortDescription: "ASSAY OF GGT                "
}, {
  cptCode: "83001", serviceFee: "173", revenueCode: "Laboratory", shortDescription: "GONADOTROPIN (FSH)          "
}, {
  cptCode: "83002", serviceFee: "172", revenueCode: "Laboratory", shortDescription: "GONADOTROPIN (LH)           "
}, {
  cptCode: "83009", serviceFee: "186", revenueCode: "", shortDescription: "H PYLORI (C-13) BLOOD       "
}, {
  cptCode: "83013", serviceFee: "351", revenueCode: "Laboratory", shortDescription: "H PYLORI (C-13) BREATH      "
}, {
  cptCode: "83020", serviceFee: "114", revenueCode: "", shortDescription: "HEMOGLOBIN ELECTROPHORESIS"
}, {
  cptCode: "83020", serviceFee: "142", revenueCode: "Laboratory", shortDescription: "HEMOGLOBIN ELECTROPHORESIS  "
}, {
  cptCode: "83021", serviceFee: "178", revenueCode: "Laboratory", shortDescription: "HEMOGLOBIN CHROMOTOGRAPHY   "
}, {
  cptCode: "83036", serviceFee: "92", revenueCode: "Laboratory", shortDescription: "GLYCOSYLATED HEMOGLOBIN TEST"
}, {
  cptCode: "83037", serviceFee: "95", revenueCode: "Laboratory", shortDescription: "GLYCOSYLATED HB, HOME DEVICE"
}, {
  cptCode: "83516", serviceFee: "186", revenueCode: "Laboratory", shortDescription: "IMMUNOASSAY NONANTIBODY     "
}, {
  cptCode: "83520", serviceFee: "243", revenueCode: "Laboratory", shortDescription: "IMMUNOASSAY QUANT NOS NONAB "
}, {
  cptCode: "83525", serviceFee: "145", revenueCode: "Laboratory", shortDescription: "ASSAY OF INSULIN            "
}, {
  cptCode: "83527", serviceFee: "158", revenueCode: "Laboratory", shortDescription: "ASSAY OF INSULIN            "
}, {
  cptCode: "83540", serviceFee: "64", revenueCode: "Laboratory", shortDescription: "ASSAY OF IRON                      "
}, {
  cptCode: "83550", serviceFee: "75", revenueCode: "Laboratory", shortDescription: "IRON BINDING TEST           "
}, {
  cptCode: "83615", serviceFee: "51", revenueCode: "Laboratory", shortDescription: "LACTATE (LD) (LDH) ENZYME   "
}, {
  cptCode: "83625", serviceFee: "81", revenueCode: "Laboratory", shortDescription: "ASSAY OF LDH ENZYMES"
}, {
  cptCode: "83655", serviceFee: "101", revenueCode: "Laboratory", shortDescription: "ASSAY OF LEAD                      "
}, {
  cptCode: "83690", serviceFee: "72", revenueCode: "Laboratory", shortDescription: "ASSAY OF LIPASE                    "
}, {
  cptCode: "83695", serviceFee: "130", revenueCode: "Laboratory", shortDescription: "ASSAY OF LIPOPROTEIN(A)            "
}, {
  cptCode: "83701", serviceFee: "203", revenueCode: "Laboratory", shortDescription: "LIPOPROTEIN BLD, HR FRACTION"
}, {
  cptCode: "83704", serviceFee: "271", revenueCode: "", shortDescription: "LIPOPROTEIN, BLD, BY NMR           "
}, {
  cptCode: "83718", serviceFee: "75", revenueCode: "Laboratory", shortDescription: "ASSAY OF LIPOPROTEIN"
}, {
  cptCode: "83719", serviceFee: "80", revenueCode: "Laboratory", shortDescription: "ASSAY OF BLOOD LIPOPROTEIN  "
}, {
  cptCode: "83721", serviceFee: "82", revenueCode: "Laboratory", shortDescription: "ASSAY OF BLOOD LIPOPROTEIN"
}, {
  cptCode: "83735", serviceFee: "77", revenueCode: "Laboratory", shortDescription: "ASSAY OF MAGNESIUM                 "
}, {
  cptCode: "83874", serviceFee: "131", revenueCode: "Laboratory", shortDescription: "ASSAY OF MYOGLOBIN                 "
}, {
  cptCode: "83880", serviceFee: "238", revenueCode: "Laboratory", shortDescription: "NATRIURETIC PEPTIDE                "
}, {
  cptCode: "83883", serviceFee: "60", revenueCode: "Laboratory", shortDescription: "ASSAY NEPHELOMETRY NOT SPEC"
}, {
  cptCode: "83883", serviceFee: "135", revenueCode: "Laboratory", shortDescription: "ASSAY NEPHELOMETRY NOT SPEC "
}, {
  cptCode: "83970", serviceFee: "386", revenueCode: "Laboratory", shortDescription: "ASSAY OF PARATHORMONE       "
}, {
  cptCode: "84075", serviceFee: "47", revenueCode: "Laboratory", shortDescription: "ASSAY ALKALINE PHOSPHATASE  "
}, {
  cptCode: "84100", serviceFee: "45", revenueCode: "Laboratory", shortDescription: "ASSAY OF PHOSPHORUS         "
}, {
  cptCode: "84132", serviceFee: "195", revenueCode: "Laboratory", shortDescription: "ASSAY OF SERUM POTASSIUM"
}, {
  cptCode: "84144", serviceFee: "172", revenueCode: "Laboratory", shortDescription: "ASSAY OF PROGESTERONE       "
}, {
  cptCode: "84146", serviceFee: "186", revenueCode: "Laboratory", shortDescription: "ASSAY OF PROLACTIN                 "
}, {
  cptCode: "84153", serviceFee: "142", revenueCode: "Laboratory", shortDescription: "ASSAY OF PSA TOTAL          "
}, {
  cptCode: "84154", serviceFee: "130", revenueCode: "Laboratory", shortDescription: "ASSAY OF PSA FREE           "
}, {
  cptCode: "84155", serviceFee: "51", revenueCode: "Laboratory", shortDescription: "ASSAY OF PROTEIN, SERUM            "
}, {
  cptCode: "84156", serviceFee: "46", revenueCode: "Laboratory", shortDescription: "ASSAY OF PROTEIN URINE      "
}, {
  cptCode: "84163", serviceFee: "114", revenueCode: "", shortDescription: "PAPPA SERUM                 "
}, {
  cptCode: "84295", serviceFee: "115", revenueCode: "Laboratory", shortDescription: "ASSAY OF SERUM SODIUM"
}, {
  cptCode: "84402", serviceFee: "243", revenueCode: "Laboratory", shortDescription: "ASSAY OF TESTOSTERONE       "
}, {
  cptCode: "84403", serviceFee: "224", revenueCode: "Laboratory", shortDescription: "ASSAY OF TOTAL TESTOSTERONE "
}, {
  cptCode: "84430", serviceFee: "119", revenueCode: "Laboratory", shortDescription: "ASSAY OF THIOCYANATE               "
}, {
  cptCode: "84436", serviceFee: "72", revenueCode: "Laboratory", shortDescription: "ASSAY OF TOTAL THYROXINE    "
}, {
  cptCode: "84439", serviceFee: "127", revenueCode: "Laboratory", shortDescription: "ASSAY OF FREE THYROXINE     "
}, {
  cptCode: "84443", serviceFee: "137", revenueCode: "Laboratory", shortDescription: "ASSAY THYROID STIM HORMONE  "
}, {
  cptCode: "84446", serviceFee: "146", revenueCode: "Laboratory", shortDescription: "ASSAY OF VITAMIN E          "
}, {
  cptCode: "84450", serviceFee: "45", revenueCode: "Laboratory", shortDescription: "TRANSFERASE (AST) (SGOT)    "
}, {
  cptCode: "84460", serviceFee: "48", revenueCode: "Laboratory", shortDescription: "ALANINE AMINO (ALT) (SGPT)  "
}, {
  cptCode: "84478", serviceFee: "49", revenueCode: "Laboratory", shortDescription: "ASSAY OF TRIGLYCERIDES             "
}, {
  cptCode: "84479", serviceFee: "64", revenueCode: "Laboratory", shortDescription: "ASSAY OF THYROID (T3 OR T4) "
}, {
  cptCode: "84480", serviceFee: "145", revenueCode: "Laboratory", shortDescription: "ASSAY TRIIODOTHYRONINE (T3) "
}, {
  cptCode: "84481", serviceFee: "208", revenueCode: "Laboratory", shortDescription: "FREE ASSAY (FT-3)           "
}, {
  cptCode: "84484", serviceFee: "144", revenueCode: "Laboratory", shortDescription: "ASSAY OF TROPONIN QUANT     "
}, {
  cptCode: "84520", serviceFee: "39", revenueCode: "Laboratory", shortDescription: "ASSAY OF UREA NITROGEN      "
}, {
  cptCode: "84550", serviceFee: "47", revenueCode: "Laboratory", shortDescription: "ASSAY OF BLOOD/URIC ACID    "
}, {
  cptCode: "84560", serviceFee: "62", revenueCode: "Laboratory", shortDescription: "ASSAY OF URINE/URIC ACID    "
}, {
  cptCode: "84681", serviceFee: "198", revenueCode: "Laboratory", shortDescription: "ASSAY OF C-PEPTIDE                 "
}, {
  cptCode: "84702", serviceFee: "137", revenueCode: "Laboratory", shortDescription: "CHORIONIC GONADOTROPIN TEST "
}, {
  cptCode: "84703", serviceFee: "90", revenueCode: "Laboratory", shortDescription: "CHORIONIC GONADOTROPIN ASSAY"
}, {
  cptCode: "85004", serviceFee: "25", revenueCode: "Laboratory", shortDescription: "AUTOMATED DIFF WBC COUNT"
}, {
  cptCode: "85014", serviceFee: "31", revenueCode: "Laboratory", shortDescription: "HEMATOCRIT                  "
}, {
  cptCode: "85018", serviceFee: "31", revenueCode: "Laboratory", shortDescription: "HEMOGLOBIN                  "
}, {
  cptCode: "85025", serviceFee: "64", revenueCode: "Laboratory", shortDescription: "COMPLETE CBC W/AUTO DIFF WBC"
}, {
  cptCode: "85027", serviceFee: "54", revenueCode: "Laboratory", shortDescription: "COMPLETE CBC AUTOMATED      "
}, {
  cptCode: "85041", serviceFee: "29", revenueCode: "Laboratory", shortDescription: "AUTOMATED RBC COUNT         "
}, {
  cptCode: "85045", serviceFee: "31", revenueCode: "Laboratory", shortDescription: "AUTOMATED RETICULOCYTE COUNT"
}, {
  cptCode: "85048", serviceFee: "33", revenueCode: "Laboratory", shortDescription: "AUTOMATED LEUKOCYTE COUNT"
}, {
  cptCode: "85049", serviceFee: "63", revenueCode: "Laboratory", shortDescription: "AUTOMATED PLATELET COUNT"
}, {
  cptCode: "85060", serviceFee: "107", revenueCode: "Laboratory", shortDescription: "BLOOD SMEAR INTERPRETATION  "
}, {
  cptCode: "85210", serviceFee: "110", revenueCode: "Laboratory", shortDescription: "BLOOD CLOT FACTOR II TEST   "
}, {
  cptCode: "85230", serviceFee: "110", revenueCode: "Laboratory", shortDescription: "BLOOD CLOT FACTOR VII TEST"
}, {
  cptCode: "85240", serviceFee: "115", revenueCode: "Laboratory", shortDescription: "BLOOD CLOT FACTOR VIII TEST"
}, {
  cptCode: "85270", serviceFee: "120", revenueCode: "Laboratory", shortDescription: "BLOOD CLOT FACTOR XI TEST"
}, {
  cptCode: "85301", serviceFee: "229", revenueCode: "Laboratory", shortDescription: "ANTITHROMBIN III TEST       "
}, {
  cptCode: "85302", serviceFee: "247", revenueCode: "Laboratory", shortDescription: "BLOOD CLOT INHIBITOR ANTIGEN"
}, {
  cptCode: "85305", serviceFee: "236", revenueCode: "Laboratory", shortDescription: "BLOOD CLOT INHIBITOR ASSAY  "
}, {
  cptCode: "85306", serviceFee: "277", revenueCode: "Laboratory", shortDescription: "BLOOD CLOT INHIBITOR TEST   "
}, {
  cptCode: "85378", serviceFee: "100", revenueCode: "Laboratory", shortDescription: "FIBRIN DEGRADE SEMIQUANT    "
}, {
  cptCode: "85379", serviceFee: "125", revenueCode: "Laboratory", shortDescription: "FIBRIN DEGRADATION QUANT    "
}, {
  cptCode: "85610", serviceFee: "43", revenueCode: "Laboratory", shortDescription: "PROTHROMBIN TIME            "
}, {
  cptCode: "85613", serviceFee: "70", revenueCode: "Laboratory", shortDescription: "RUSSELL VIPER VENOM DILUTED"
}, {
  cptCode: "85651", serviceFee: "40", revenueCode: "Laboratory", shortDescription: "RBC SED RATE NONAUTOMATED   "
}, {
  cptCode: "85652", serviceFee: "45", revenueCode: "Laboratory", shortDescription: "RBC SED RATE AUTOMATED      "
}, {
  cptCode: "85660", serviceFee: "65", revenueCode: "Laboratory", shortDescription: "RBC SICKLE CELL TEST        "
}, {
  cptCode: "85670", serviceFee: "72", revenueCode: "Laboratory", shortDescription: "THROMBIN TIME PLASMA"
}, {
  cptCode: "85730", serviceFee: "64", revenueCode: "Laboratory", shortDescription: "THROMBOPLASTIN TIME PARTIAL "
}, {
  cptCode: "86001", serviceFee: "47", revenueCode: "Laboratory", shortDescription: "ALLERGEN SPECIFIC IGG       "
}, {
  cptCode: "86003", serviceFee: "51", revenueCode: "Laboratory", shortDescription: "ALLERGEN SPECIFIC IGE"
}, {
  cptCode: "86038", serviceFee: "134", revenueCode: "Laboratory", shortDescription: "ANTINUCLEAR ANTIBODIES      "
}, {
  cptCode: "86039", serviceFee: "114", revenueCode: "Laboratory", shortDescription: "ANTINUCLEAR ANTIBODIES (ANA)"
}, {
  cptCode: "86060", serviceFee: "88", revenueCode: "Laboratory", shortDescription: "ANTISTREPTOLYSIN O TITER    "
}, {
  cptCode: "86063", serviceFee: "66", revenueCode: "Laboratory", shortDescription: "ANTISTREPTOLYSIN O SCREEN   "
}, {
  cptCode: "86140", serviceFee: "88", revenueCode: "Laboratory", shortDescription: "C-REACTIVE PROTEIN                 "
}, {
  cptCode: "86141", serviceFee: "117", revenueCode: "Laboratory", shortDescription: "C-REACTIVE PROTEIN HS       "
}, {
  cptCode: "86146", serviceFee: "152", revenueCode: "Laboratory", shortDescription: "GLYCOPROTEIN ANTIBODY"
}, {
  cptCode: "86147", serviceFee: "212", revenueCode: "Laboratory", shortDescription: "CARDIOLIPIN ANTIBODY        "
}, {
  cptCode: "86160", serviceFee: "153", revenueCode: "Laboratory", shortDescription: "COMPLEMENT ANTIGEN          "
}, {
  cptCode: "86200", serviceFee: "129", revenueCode: "Laboratory", shortDescription: "CCP ANTIBODY                       "
}, {
  cptCode: "86225", serviceFee: "135", revenueCode: "Laboratory", shortDescription: "DNA ANTIBODY                "
}, {
  cptCode: "86226", serviceFee: "145", revenueCode: "Laboratory", shortDescription: "DNA ANTIBODY SINGLE STRAND  "
}, {
  cptCode: "86235", serviceFee: "154", revenueCode: "Laboratory", shortDescription: "NUCLEAR ANTIGEN ANTIBODY    "
}, {
  cptCode: "86255", serviceFee: "154", revenueCode: "Laboratory", shortDescription: "FLUORESCENT ANTIBODY SCREEN "
}, {
  cptCode: "86255", serviceFee: "101", revenueCode: "", shortDescription: "FLUORESCENT ANTIBODY SCREEN"
}, {
  cptCode: "86256", serviceFee: "152", revenueCode: "Laboratory", shortDescription: "FLUORESCENT ANTIBODY TITER"
}, {
  cptCode: "86308", serviceFee: "64", revenueCode: "Laboratory", shortDescription: "HETEROPHILE ANTIBODIES      "
}, {
  cptCode: "86317", serviceFee: "151", revenueCode: "Laboratory", shortDescription: "IMMUNOASSAY INFECTIOUS AGENT"
}, {
  cptCode: "86328", serviceFee: "168", revenueCode: "Laboratory", shortDescription: "IA NFCT AB SARSCOV2 COVID19"
}, {
  cptCode: "86334", serviceFee: "201", revenueCode: "Laboratory", shortDescription: "IMMUNOFIX E-PHORESIS SERUM"
}, {
  cptCode: "86335", serviceFee: "203", revenueCode: "", shortDescription: "IMMUNFIX E-PHORSIS/URINE/CSF"
}, {
  cptCode: "86335", serviceFee: "112", revenueCode: "", shortDescription: "IMMUNFIX E-PHORSIS/URINE/CSF"
}, {
  cptCode: "86355", serviceFee: "72", revenueCode: "Laboratory", shortDescription: "B CELLS, TOTAL COUNT"
}, {
  cptCode: "86356", serviceFee: "73", revenueCode: "", shortDescription: "MONONUCLEAR CELL ANTIGEN           "
}, {
  cptCode: "86359", serviceFee: "72", revenueCode: "Laboratory", shortDescription: "T CELLS TOTAL COUNT"
}, {
  cptCode: "86360", serviceFee: "72", revenueCode: "Laboratory", shortDescription: "T CELL ABSOLUTE COUNT/RATIO"
}, {
  cptCode: "86376", serviceFee: "160", revenueCode: "Laboratory", shortDescription: "MICROSOMAL ANTIBODY         "
}, {
  cptCode: "86382", serviceFee: "134", revenueCode: "Laboratory", shortDescription: "NEUTRALIZATION TEST VIRAL   "
}, {
  cptCode: "86406", serviceFee: "62", revenueCode: "Laboratory", shortDescription: "PARTICLE AGGLUTINATION TEST"
}, {
  cptCode: "86430", serviceFee: "58", revenueCode: "Laboratory", shortDescription: "RHEUMATOID FACTOR TEST      "
}, {
  cptCode: "86431", serviceFee: "74", revenueCode: "Laboratory", shortDescription: "RHEUMATOID FACTOR QUANT     "
}, {
  cptCode: "86480", serviceFee: "279", revenueCode: "", shortDescription: "TB TEST CELL IMMUN MEASURE  "
}, {
  cptCode: "86580", serviceFee: "42", revenueCode: "Laboratory", shortDescription: "TB INTRADERMAL TEST         "
}, {
  cptCode: "86592", serviceFee: "51", revenueCode: "Laboratory", shortDescription: "SYPHILIS TEST NON-TREP QUAL "
}, {
  cptCode: "86593", serviceFee: "53", revenueCode: "Laboratory", shortDescription: "SYPHILIS TEST NON-TREP QUANT"
}, {
  cptCode: "86617", serviceFee: "212", revenueCode: "Laboratory", shortDescription: "LYME DISEASE ANTIBODY       "
}, {
  cptCode: "86618", serviceFee: "190", revenueCode: "Laboratory", shortDescription: "LYME DISEASE ANTIBODY       "
}, {
  cptCode: "86625", serviceFee: "143", revenueCode: "Laboratory", shortDescription: "CAMPYLOBACTER ANTIBODY      "
}, {
  cptCode: "86644", serviceFee: "138", revenueCode: "Laboratory", shortDescription: "CMV ANTIBODY"
}, {
  cptCode: "86658", serviceFee: "139", revenueCode: "Laboratory", shortDescription: "ENTEROVIRUS ANTIBODY        "
}, {
  cptCode: "86663", serviceFee: "164", revenueCode: "Laboratory", shortDescription: "EPSTEIN-BARR ANTIBODY       "
}, {
  cptCode: "86664", serviceFee: "139", revenueCode: "Laboratory", shortDescription: "EPSTEIN-BARR ANTIBODY       "
}, {
  cptCode: "86665", serviceFee: "170", revenueCode: "Laboratory", shortDescription: "EPSTEIN-BARR ANTIBODY       "
}, {
  cptCode: "86677", serviceFee: "169", revenueCode: "Laboratory", shortDescription: "HELICOBACTER PYLORI         "
}, {
  cptCode: "86689", serviceFee: "211", revenueCode: "Laboratory", shortDescription: "HTLV/HIV CONFIRMATORY TEST  "
}, {
  cptCode: "86694", serviceFee: "173", revenueCode: "Laboratory", shortDescription: "HERPES SIMPLEX TEST         "
}, {
  cptCode: "86695", serviceFee: "148", revenueCode: "Laboratory", shortDescription: "HERPES SIMPLEX TEST         "
}, {
  cptCode: "86696", serviceFee: "157", revenueCode: "Laboratory", shortDescription: "HERPES SIMPLEX TYPE 2       "
}, {
  cptCode: "86701", serviceFee: "136", revenueCode: "Laboratory", shortDescription: "HIV-1                       "
}, {
  cptCode: "86702", serviceFee: "158", revenueCode: "Laboratory", shortDescription: "HIV-2                       "
}, {
  cptCode: "86703", serviceFee: "135", revenueCode: "Laboratory", shortDescription: "HIV-1/HIV-2 SINGLE RESULT          "
}, {
  cptCode: "86704", serviceFee: "145", revenueCode: "Laboratory", shortDescription: "HEP B CORE ANTIBODY TOTAL   "
}, {
  cptCode: "86705", serviceFee: "143", revenueCode: "Laboratory", shortDescription: "HEP B CORE ANTIBODY IGM     "
}, {
  cptCode: "86706", serviceFee: "124", revenueCode: "Laboratory", shortDescription: "HEP B SURFACE ANTIBODY      "
}, {
  cptCode: "86707", serviceFee: "117", revenueCode: "Laboratory", shortDescription: "HEP BE ANTIBODY             "
}, {
  cptCode: "86708", serviceFee: "127", revenueCode: "Laboratory", shortDescription: "HEP A ANTIBODY TOTAL        "
}, {
  cptCode: "86709", serviceFee: "128", revenueCode: "Laboratory", shortDescription: "HEP A ANTIBODY IGM          "
}, {
  cptCode: "86710", serviceFee: "116", revenueCode: "Laboratory", shortDescription: "INFLUENZA VIRUS ANTIBODY    "
}, {
  cptCode: "86735", serviceFee: "173", revenueCode: "Laboratory", shortDescription: "MUMPS ANTIBODY              "
}, {
  cptCode: "86757", serviceFee: "196", revenueCode: "Laboratory", shortDescription: "RICKETTSIA ANTIBODY         "
}, {
  cptCode: "86762", serviceFee: "108", revenueCode: "Laboratory", shortDescription: "RUBELLA ANTIBODY            "
}, {
  cptCode: "86765", serviceFee: "160", revenueCode: "Laboratory", shortDescription: "RUBEOLA ANTIBODY            "
}, {
  cptCode: "86769", serviceFee: "168", revenueCode: "Laboratory", shortDescription: "SARS-COV-2 COVID-19 ANTIBODY"
}, {
  cptCode: "86774", serviceFee: "150", revenueCode: "Laboratory", shortDescription: "TETANUS ANTIBODY"
}, {
  cptCode: "86777", serviceFee: "170", revenueCode: "Laboratory", shortDescription: "TOXOPLASMA ANTIBODY"
}, {
  cptCode: "86778", serviceFee: "180", revenueCode: "Laboratory", shortDescription: "TOXOPLASMA ANTIBODY IGM"
}, {
  cptCode: "86780", serviceFee: "62", revenueCode: "Laboratory", shortDescription: "TREPONEMA PALLIDUM"
}, {
  cptCode: "86787", serviceFee: "189", revenueCode: "Laboratory", shortDescription: "VARICELLA-ZOSTER ANTIBODY   "
}, {
  cptCode: "86800", serviceFee: "150", revenueCode: "Laboratory", shortDescription: "THYROGLOBULIN ANTIBODY      "
}, {
  cptCode: "86803", serviceFee: "161", revenueCode: "Laboratory", shortDescription: "HEPATITIS C AB TEST         "
}, {
  cptCode: "86812", serviceFee: "267", revenueCode: "Laboratory", shortDescription: "HLA TYPING A B OR C         "
}, {
  cptCode: "86900", serviceFee: "46", revenueCode: "Laboratory", shortDescription: "BLOOD TYPING ABO            "
}, {
  cptCode: "86901", serviceFee: "46", revenueCode: "Laboratory", shortDescription: "BLOOD TYPING RH (D)         "
}, {
  cptCode: "86902", serviceFee: "0", revenueCode: "", shortDescription: "BLOOD TYPE ANTIGEN DONOR EA "
}, {
  cptCode: "87040", serviceFee: "107", revenueCode: "Laboratory", shortDescription: "BLOOD CULTURE FOR BACTERIA  "
}, {
  cptCode: "87045", serviceFee: "92", revenueCode: "Laboratory", shortDescription: "FECES CULTURE BACTERIA      "
}, {
  cptCode: "87046", serviceFee: "84", revenueCode: "Laboratory", shortDescription: "STOOL CULTR BACTERIA EACH   "
}, {
  cptCode: "87070", serviceFee: "89", revenueCode: "Laboratory", shortDescription: "CULTURE BACTERIA OTHER      "
}, {
  cptCode: "87071", serviceFee: "79", revenueCode: "Laboratory", shortDescription: "CULTURE BACTERI AEROBIC OTHR"
}, {
  cptCode: "87073", serviceFee: "77", revenueCode: "Laboratory", shortDescription: "CULTURE BACTERIA ANAEROBIC  "
}, {
  cptCode: "87075", serviceFee: "107", revenueCode: "Laboratory", shortDescription: "CULTR BACTERIA EXCEPT BLOOD "
}, {
  cptCode: "87076", serviceFee: "93", revenueCode: "Laboratory", shortDescription: "CULTURE ANAEROBE IDENT EACH "
}, {
  cptCode: "87077", serviceFee: "80", revenueCode: "Laboratory", shortDescription: "CULTURE AEROBIC IDENTIFY    "
}, {
  cptCode: "87081", serviceFee: "73", revenueCode: "Laboratory", shortDescription: "CULTURE SCREEN ONLY         "
}, {
  cptCode: "87086", serviceFee: "76", revenueCode: "Laboratory", shortDescription: "URINE CULTURE/COLONY COUNT  "
}, {
  cptCode: "87088", serviceFee: "72", revenueCode: "Laboratory", shortDescription: "URINE BACTERIA CULTURE      "
}, {
  cptCode: "87101", serviceFee: "90", revenueCode: "Laboratory", shortDescription: "SKIN FUNGI CULTURE"
}, {
  cptCode: "87102", serviceFee: "91", revenueCode: "Laboratory", shortDescription: "FUNGUS ISOLATION CULTURE    "
}, {
  cptCode: "87106", serviceFee: "95", revenueCode: "Laboratory", shortDescription: "FUNGI IDENTIFICATION YEAST"
}, {
  cptCode: "87107", serviceFee: "95", revenueCode: "Laboratory", shortDescription: "FUNGI IDENTIFICATION MOLD"
}, {
  cptCode: "87110", serviceFee: "134", revenueCode: "Laboratory", shortDescription: "CHLAMYDIA CULTURE           "
}, {
  cptCode: "87140", serviceFee: "70", revenueCode: "Laboratory", shortDescription: "CULTURE TYPE IMMUNOFLUORESC "
}, {
  cptCode: "87143", serviceFee: "109", revenueCode: "Laboratory", shortDescription: "CULTURE TYPING GLC/HPLC     "
}, {
  cptCode: "87147", serviceFee: "60", revenueCode: "Laboratory", shortDescription: "CULTURE TYPE IMMUNOLOGIC    "
}, {
  cptCode: "87149", serviceFee: "90", revenueCode: "Laboratory", shortDescription: "DNA/RNA DIRECT PROBE"
}, {
  cptCode: "87177", serviceFee: "99", revenueCode: "Laboratory", shortDescription: "OVA AND PARASITES SMEARS    "
}, {
  cptCode: "87184", serviceFee: "60", revenueCode: "Laboratory", shortDescription: "MICROBE SUSCEPTIBLE DISK    "
}, {
  cptCode: "87185", serviceFee: "80", revenueCode: "Laboratory", shortDescription: "MICROBE SUSCEPTIBLE ENZYME"
}, {
  cptCode: "87186", serviceFee: "79", revenueCode: "Laboratory", shortDescription: "MICROBE SUSCEPTIBLE, MIC           "
}, {
  cptCode: "87190", serviceFee: "55", revenueCode: "Laboratory", shortDescription: "MICROBE SUSCEPT MYCOBACTERI "
}, {
  cptCode: "87205", serviceFee: "45", revenueCode: "Laboratory", shortDescription: "SMEAR GRAM STAIN            "
}, {
  cptCode: "87207", serviceFee: "89", revenueCode: "Laboratory", shortDescription: "SMEAR SPECIAL STAIN         "
}, {
  cptCode: "87207", serviceFee: "71", revenueCode: "", shortDescription: "SMEAR SPECIAL STAIN         "
}, {
  cptCode: "87209", serviceFee: "103", revenueCode: "", shortDescription: "SMEAR, COMPLEX STAIN               "
}, {
  cptCode: "87210", serviceFee: "47", revenueCode: "Laboratory", shortDescription: "SMEAR WET MOUNT SALINE/INK  "
}, {
  cptCode: "87220", serviceFee: "115", revenueCode: "Laboratory", shortDescription: "TISSUE EXAM FOR FUNGI"
}, {
  cptCode: "87255", serviceFee: "227", revenueCode: "Laboratory", shortDescription: "GENET VIRUS ISOLATE HSV     "
}, {
  cptCode: "87275", serviceFee: "97", revenueCode: "Laboratory", shortDescription: "INFLUENZA B AG IF"
}, {
  cptCode: "87276", serviceFee: "97", revenueCode: "Laboratory", shortDescription: "INFLUENZA A AG IF"
}, {
  cptCode: "87290", serviceFee: "105", revenueCode: "Laboratory", shortDescription: "VARICELLA ZOSTER AG IF      "
}, {
  cptCode: "87324", serviceFee: "128", revenueCode: "Laboratory", shortDescription: "CLOSTRIDIUM AG EIA          "
}, {
  cptCode: "87340", serviceFee: "109", revenueCode: "Laboratory", shortDescription: "HEPATITIS B SURFACE AG EIA  "
}, {
  cptCode: "87341", serviceFee: "113", revenueCode: "Laboratory", shortDescription: "HEPATITIS B SURFACE AG EIA"
}, {
  cptCode: "87350", serviceFee: "112", revenueCode: "Laboratory", shortDescription: "HEPATITIS BE AG EIA         "
}, {
  cptCode: "87389", serviceFee: "135", revenueCode: "Laboratory", shortDescription: "HIV-1 AG W/HIV-1 and HIV-2 AB"
}, {
  cptCode: "87400", serviceFee: "98", revenueCode: "Laboratory", shortDescription: "INFLUENZA A/B AG EIA        "
}, {
  cptCode: "87426", serviceFee: "190", revenueCode: "Laboratory", shortDescription: "CORONAVIRUS AG IA"
}, {
  cptCode: "87427", serviceFee: "103", revenueCode: "Laboratory", shortDescription: "SHIGA-LIKE TOXIN AG EIA     "
}, {
  cptCode: "87428", serviceFee: "190", revenueCode: "Laboratory", shortDescription: "SARSCOV & INF VIR A&B AG IA"
}, {
  cptCode: "87430", serviceFee: "72", revenueCode: "Laboratory", shortDescription: "STREP A AG EIA              "
}, {
  cptCode: "87449", serviceFee: "112", revenueCode: "Laboratory", shortDescription: "AG DETECT NOS EIA MULT"
}, {
  cptCode: "87480", serviceFee: "135", revenueCode: "Laboratory", shortDescription: "CANDIDA DNA DIR PROBE       "
}, {
  cptCode: "87481", serviceFee: "272", revenueCode: "Laboratory", shortDescription: "CANDIDA DNA AMP PROBE       "
}, {
  cptCode: "87490", serviceFee: "123", revenueCode: "Laboratory", shortDescription: "CHYLMD TRACH DNA DIR PROBE  "
}, {
  cptCode: "87491", serviceFee: "212", revenueCode: "Laboratory", shortDescription: "CHYLMD TRACH DNA AMP PROBE  "
}, {
  cptCode: "87492", serviceFee: "214", revenueCode: "Laboratory", shortDescription: "CHYLMD TRACH DNA QUANT      "
}, {
  cptCode: "87493", serviceFee: "105", revenueCode: "Laboratory", shortDescription: "C DIFF AMPLIFIED PROBE"
}, {
  cptCode: "87502", serviceFee: "105", revenueCode: "Treatment Services", shortDescription: "INFLUENZA DNA AMP PROBE"
}, {
  cptCode: "87510", serviceFee: "125", revenueCode: "Laboratory", shortDescription: "GARDNER VAG DNA DIR PROBE   "
}, {
  cptCode: "87512", serviceFee: "318", revenueCode: "Laboratory", shortDescription: "GARDNER VAG DNA QUANT       "
}, {
  cptCode: "87517", serviceFee: "373", revenueCode: "Laboratory", shortDescription: "HEPATITIS B DNA QUANT       "
}, {
  cptCode: "87521", serviceFee: "341", revenueCode: "Laboratory", shortDescription: "HEPATITIS C RNA AMP PROBE   "
}, {
  cptCode: "87522", serviceFee: "499", revenueCode: "Laboratory", shortDescription: "HEPATITIS C RNA QUANT       "
}, {
  cptCode: "87561", serviceFee: "307", revenueCode: "Laboratory", shortDescription: "M.AVIUM-INTRA DNA AMP PROB  "
}, {
  cptCode: "87590", serviceFee: "145", revenueCode: "Laboratory", shortDescription: "N.GONORRHOEAE DNA DIR PROB  "
}, {
  cptCode: "87591", serviceFee: "199", revenueCode: "Laboratory", shortDescription: "N.GONORRHOEAE DNA AMP PROB  "
}, {
  cptCode: "87624", serviceFee: "130", revenueCode: "Laboratory", shortDescription: "HPV HIGH-RISK TYPES"
}, {
  cptCode: "87635", serviceFee: "289", revenueCode: "Laboratory", shortDescription: "SARS-COV-2 COVID-19 AMP PRB"
}, {
  cptCode: "87636", serviceFee: "420", revenueCode: "Laboratory", shortDescription: "SARSCOV2 & INF A&B AMP PRB"
}, {
  cptCode: "87637", serviceFee: "360", revenueCode: "Laboratory", shortDescription: "SARSCOV2&INF A&B&RSV AMP PRB"
}, {
  cptCode: "87641", serviceFee: "150", revenueCode: "Laboratory", shortDescription: "MR-STAPH, DNA, AMP PROBE"
}, {
  cptCode: "87651", serviceFee: "200", revenueCode: "Laboratory", shortDescription: "STREP A DNA AMP PROBE"
}, {
  cptCode: "87660", serviceFee: "127", revenueCode: "Laboratory", shortDescription: "TRICHOMONAS VAGIN DIR PROBE "
}, {
  cptCode: "87661", serviceFee: "100", revenueCode: "Laboratory", shortDescription: "TRICHOMONAS VAGINALIS AMPLIF"
}, {
  cptCode: "87798", serviceFee: "251", revenueCode: "Laboratory", shortDescription: "DETECT AGENT NOS DNA AMP    "
}, {
  cptCode: "87799", serviceFee: "338", revenueCode: "Laboratory", shortDescription: "DETECT AGENT NOS DNA QUANT  "
}, {
  cptCode: "87801", serviceFee: "256", revenueCode: "Laboratory", shortDescription: "DETECT AGNT MULT DNA AMPLI  "
}, {
  cptCode: "87802", serviceFee: "79", revenueCode: "Laboratory", shortDescription: "STREP B ASSAY W/OPTIC       "
}, {
  cptCode: "87804", serviceFee: "80", revenueCode: "Laboratory", shortDescription: "INFLUENZA ASSAY W/OPTIC     "
}, {
  cptCode: "87811", serviceFee: "140", revenueCode: "Laboratory", shortDescription: "SARS-COV-2 COVID19 W/OPTIC"
}, {
  cptCode: "87880", serviceFee: "75", revenueCode: "Laboratory", shortDescription: "STREP A ASSAY W/OPTIC       "
}, {
  cptCode: "87899", serviceFee: "79", revenueCode: "Laboratory", shortDescription: "AGENT NOS ASSAY W/OPTIC     "
}, {
  cptCode: "88104", serviceFee: "230", revenueCode: "Laboratory", shortDescription: "CYTOPATH FL NONGYN SMEARS"
}, {
  cptCode: "88108", serviceFee: "234", revenueCode: "Laboratory", shortDescription: "CYTOPATH CONCENTRATE TECH   "
}, {
  cptCode: "88108", serviceFee: "117", revenueCode: "", shortDescription: "CYTOPATH CONCENTRATE TECH"
}, {
  cptCode: "88141", serviceFee: "99", revenueCode: "Laboratory", shortDescription: "CYTOPATH C/V INTERPRET      "
}, {
  cptCode: "88142", serviceFee: "123", revenueCode: "Laboratory", shortDescription: "CYTOPATH C/V THIN LAYER"
}, {
  cptCode: "88175", serviceFee: "153", revenueCode: "", shortDescription: "CYTOPATH C/V AUTO FLUID REDO"
}, {
  cptCode: "88300", serviceFee: "120", revenueCode: "Laboratory", shortDescription: "SURGICAL PATH GROSS"
}, {
  cptCode: "88302", serviceFee: "130", revenueCode: "Laboratory", shortDescription: "TISSUE EXAM BY PATHOLOGIST"
}, {
  cptCode: "88304", serviceFee: "130", revenueCode: "Laboratory", shortDescription: "TISSUE EXAM BY PATHOLOGIST"
}, {
  cptCode: "88305", serviceFee: "140", revenueCode: "Laboratory", shortDescription: "TISSUE EXAM BY PATHOLOGIST"
}, {
  cptCode: "88307", serviceFee: "140", revenueCode: "Laboratory", shortDescription: "TISSUE EXAM BY PATHOLOGIST"
}, {
  cptCode: "88309", serviceFee: "150", revenueCode: "Laboratory", shortDescription: "TISSUE EXAM BY PATHOLOGIST"
}, {
  cptCode: "88342", serviceFee: "299", revenueCode: "Laboratory", shortDescription: "IMMUNOHISTOCHEMISTRY        "
}, {
  cptCode: "88342", serviceFee: "164", revenueCode: "", shortDescription: "IMMUNOHISTO ANTB 1ST STAIN"
}, {
  cptCode: "89051", serviceFee: "250", revenueCode: "Laboratory", shortDescription: "BODY FLUID CELL COUNT"
}, {
  cptCode: "89060", serviceFee: "254", revenueCode: "Laboratory", shortDescription: "EXAM SYNOVIAL FLUID CRYSTALS"
}, {
  cptCode: "90460", serviceFee: "55", revenueCode: "", shortDescription: "IM ADMIN 1ST/ONLY COMPONENT        "
}, {
  cptCode: "90461", serviceFee: "45", revenueCode: "", shortDescription: "IM ADMIN EACH ADDL COMPONENT       "
}, {
  cptCode: "90471", serviceFee: "49", revenueCode: "Medicine", shortDescription: "IMMUNIZATION ADMIN          "
}, {
  cptCode: "90472", serviceFee: "49", revenueCode: "Medicine", shortDescription: "IMMUNIZATION ADMIN EACH ADD "
}, {
  cptCode: "90473", serviceFee: "45", revenueCode: "Medicine", shortDescription: "IMMUNE ADMIN ORAL/NASAL     "
}, {
  cptCode: "90620", serviceFee: "250", revenueCode: "Medicine", shortDescription: "Meningococcal B, OMV 2 dose IM"
}, {
  cptCode: "90632", serviceFee: "154", revenueCode: "Medicine", shortDescription: "HEP A VACCINE ADULT IM      "
}, {
  cptCode: "90633", serviceFee: "114", revenueCode: "Medicine", shortDescription: "HEP A VACC PED/ADOL 2 DOSE  "
}, {
  cptCode: "90636", serviceFee: "155", revenueCode: "Medicine", shortDescription: "HEP A/HEP B VACC ADULT IM"
}, {
  cptCode: "90648", serviceFee: "69", revenueCode: "Medicine", shortDescription: "HIB VACCINE PRP-T IM        "
}, {
  cptCode: "90649", serviceFee: "315", revenueCode: "", shortDescription: "HPV VACCINE 4 VALENT IM     "
}, {
  cptCode: "90650", serviceFee: "140", revenueCode: "Injection", shortDescription: "HPV VACCINE 2 VALENT IM     "
}, {
  cptCode: "90651", serviceFee: "50", revenueCode: "Medicine", shortDescription: "HPV VACCINE NON VALENT IM"
}, {
  cptCode: "90653", serviceFee: "7939", revenueCode: "Medicine", shortDescription: "FLU VACCINE ADJUVANT IM"
}, {
  cptCode: "90656", serviceFee: "43", revenueCode: "", shortDescription: "FLU VAC (IIV3) PRES FREE .5 ML IM"
}, {
  cptCode: "90657", serviceFee: "34", revenueCode: "Medicine", shortDescription: "FLU VACC (IIV3) 0.25 ML IM"
}, {
  cptCode: "90658", serviceFee: "36", revenueCode: "", shortDescription: "FLU VACC (IIV3) 0.5 ML IM"
}, {
  cptCode: "90660", serviceFee: "79", revenueCode: "Medicine", shortDescription: "FLU VACCINE NASAL                  "
}, {
  cptCode: "90661", serviceFee: "0", revenueCode: "", shortDescription: "FLU VAC (CIIV3) 0.5 ML IM"
}, {
  cptCode: "90662", serviceFee: "0", revenueCode: "", shortDescription: "FLU VACC PRSV FREE INC ANTIG       "
}, {
  cptCode: "90670", serviceFee: "120", revenueCode: "Medicine", shortDescription: "PNEUMOCOCCAL VACC, 13 VAL IM"
}, {
  cptCode: "90674", serviceFee: "75", revenueCode: "Medicine", shortDescription: "FLU VAC (CCIIV4) 0.5 ML IM"
}, {
  cptCode: "90675", serviceFee: "160", revenueCode: "Medicine", shortDescription: "RABIES VACCINE IM"
}, {
  cptCode: "90680", serviceFee: "159", revenueCode: "Medicine", shortDescription: "ROTOVIRUS VACC 3 DOSE ORAL  "
}, {
  cptCode: "90685", serviceFee: "40", revenueCode: "Medicine", shortDescription: "FLU VAC (IIV4) 0.25 ML IM"
}, {
  cptCode: "90686", serviceFee: "40", revenueCode: "Medicine", shortDescription: "FLU VAC (IIV4) 0.5 ML IM"
}, {
  cptCode: "90690", serviceFee: "94", revenueCode: "Medicine", shortDescription: "TYPHOID VACCINE ORAL        "
}, {
  cptCode: "90691", serviceFee: "125", revenueCode: "Medicine", shortDescription: "TYPHOID VACCINE IM          "
}, {
  cptCode: "90696", serviceFee: "0", revenueCode: "", shortDescription: "DTAP-IPV VACC 4-6 YR IM"
}, {
  cptCode: "90696", serviceFee: "154", revenueCode: "Medicine", shortDescription: "DTAP-IPV VACC 4-6 YR IM"
}, {
  cptCode: "90698", serviceFee: "129", revenueCode: "Medicine", shortDescription: "DTAP-HIB-IP VACCINE, IM            "
}, {
  cptCode: "90700", serviceFee: "79", revenueCode: "Medicine", shortDescription: "DTAP VACCINE lt 7 YRS IM     "
}, {
  cptCode: "90702", serviceFee: "54", revenueCode: "Medicine", shortDescription: "DT VACCINE lt 7 IM           "
}, {
  cptCode: "90707", serviceFee: "108", revenueCode: "Medicine", shortDescription: "MMR VACCINE SC              "
}, {
  cptCode: "90710", serviceFee: "270", revenueCode: "Medicine", shortDescription: "MMRV VACCINE SC             "
}, {
  cptCode: "90713", serviceFee: "77", revenueCode: "Medicine", shortDescription: "POLIOVIRUS IPV SC/IM        "
}, {
  cptCode: "90714", serviceFee: "59", revenueCode: "", shortDescription: "TD VACCINE NO PRSRV 7+ IM"
}, {
  cptCode: "90715", serviceFee: "97", revenueCode: "Medicine", shortDescription: "TDAP VACCINE gt7 IM          "
}, {
  cptCode: "90716", serviceFee: "173", revenueCode: "Medicine", shortDescription: "CHICKEN POX VACCINE SC      "
}, {
  cptCode: "90717", serviceFee: "163", revenueCode: "Medicine", shortDescription: "YELLOW FEVER VACCINE SC     "
}, {
  cptCode: "90732", serviceFee: "146", revenueCode: "Medicine", shortDescription: "PNEUMOCOCCAL VACCINE"
}, {
  cptCode: "90733", serviceFee: "187", revenueCode: "Medicine", shortDescription: "MENINGOCOCCAL VACCINE SC    "
}, {
  cptCode: "90734", serviceFee: "217", revenueCode: "", shortDescription: "MENGCCL VAC (MCV4/MENACWY)"
}, {
  cptCode: "90743", serviceFee: "114", revenueCode: "Medicine", shortDescription: "HEP B VACC ADOL 2 DOSE IM   "
}, {
  cptCode: "90744", serviceFee: "114", revenueCode: "Medicine", shortDescription: "HEPB VACC PED/ADOL 3 DOSE IM"
}, {
  cptCode: "90746", serviceFee: "148", revenueCode: "Medicine", shortDescription: "HEP B VACC ADULT 3 DOSE IM         "
}, {
  cptCode: "90747", serviceFee: "263", revenueCode: "Medicine", shortDescription: "HEPB VACC ILL PAT 4 DOSE IM "
}, {
  cptCode: "90750", serviceFee: "150", revenueCode: "Medicine", shortDescription: "ZOSTER (SHINGLES) VACC, RECOMB, IM"
}, {
  cptCode: "90756", serviceFee: "30", revenueCode: "Medicine", shortDescription: "FLU VAC (CCIIV4), ABX FREE 0.5ML IM"
}, {
  cptCode: "91301", serviceFee: "1", revenueCode: "Injection", shortDescription: "SARSCOV2 VAC 100MCG/0.5ML IM"
}, {
  cptCode: "92002", serviceFee: "170", revenueCode: "E&M", shortDescription: "EYE EXAM NEW PATIENT"
}, {
  cptCode: "92004", serviceFee: "180", revenueCode: "E&M", shortDescription: "EYE EXAM, NEW PATIENT"
}, {
  cptCode: "92012", serviceFee: "150", revenueCode: "E&M", shortDescription: "EYE EXAM ESTABLISHED PAT"
}, {
  cptCode: "92014", serviceFee: "160", revenueCode: "E&M", shortDescription: "EYE EXAM  TREATMENT"
}, {
  cptCode: "92230", serviceFee: "50", revenueCode: "Medicine", shortDescription: "EYE EXAM WITH PHOTOS"
}, {
  cptCode: "92235", serviceFee: "370", revenueCode: "Medicine", shortDescription: "EYE EXAM WITH PHOTOS"
}, {
  cptCode: "92283", serviceFee: "90", revenueCode: "Medicine", shortDescription: "COLOR VISION EXAMINATION"
}, {
  cptCode: "92285", serviceFee: "125", revenueCode: "Medicine", shortDescription: "EYE PHOTOGRAPHY"
}, {
  cptCode: "92550", serviceFee: "101", revenueCode: "Medicine", shortDescription: "TYMPANOMETRY and REFLEX THRESH"
}, {
  cptCode: "92551", serviceFee: "55", revenueCode: "Medicine", shortDescription: "PURE TONE HEARING TEST AIR  "
}, {
  cptCode: "92552", serviceFee: "64", revenueCode: "Medicine", shortDescription: "PURE TONE AUDIOMETRY AIR    "
}, {
  cptCode: "92553", serviceFee: "95", revenueCode: "Medicine", shortDescription: "AUDIOMETRY AIR and BONE       "
}, {
  cptCode: "92557", serviceFee: "164", revenueCode: "Medicine", shortDescription: "COMPREHENSIVE HEARING TEST  "
}, {
  cptCode: "92562", serviceFee: "67", revenueCode: "Medicine", shortDescription: "LOUDNESS BALANCE TEST"
}, {
  cptCode: "92567", serviceFee: "71", revenueCode: "Medicine", shortDescription: "TYMPANOMETRY                "
}, {
  cptCode: "92587", serviceFee: "168", revenueCode: "Medicine", shortDescription: "EVOKED AUDITORY TEST LIMITED       "
}, {
  cptCode: "92587", serviceFee: "45", revenueCode: "", shortDescription: "EVOKED AUDITORY TEST LIMITED       "
}, {
  cptCode: "93000", serviceFee: "117", revenueCode: "Medicine", shortDescription: "ELECTROCARDIOGRAM COMPLETE  "
}, {
  cptCode: "93005", serviceFee: "90", revenueCode: "Medicine", shortDescription: "ELECTROCARDIOGRAM TRACING   "
}, {
  cptCode: "93010", serviceFee: "68", revenueCode: "Medicine", shortDescription: "ELECTROCARDIOGRAM REPORT    "
}, {
  cptCode: "93015", serviceFee: "581", revenueCode: "Medicine", shortDescription: "CARDIOVASCULAR STRESS TEST         "
}, {
  cptCode: "93224", serviceFee: "629", revenueCode: "Medicine", shortDescription: "ECG MONITOR/REPORT, 24 HRS         "
}, {
  cptCode: "93225", serviceFee: "220", revenueCode: "Medicine", shortDescription: "ECG MONITOR/RECORD, 24 HRS         "
}, {
  cptCode: "93227", serviceFee: "50", revenueCode: "Medicine", shortDescription: "ECG MONIT/REPRT UP TO 48 HRS"
}, {
  cptCode: "93268", serviceFee: "1037", revenueCode: "Medicine", shortDescription: "ECG RECORD/REVIEW                  "
}, {
  cptCode: "93270", serviceFee: "211", revenueCode: "Medicine", shortDescription: "ECG RECORDING                      "
}, {
  cptCode: "93306", serviceFee: "1180", revenueCode: "", shortDescription: "TTE W/DOPPLER, COMPLETE"
}, {
  cptCode: "93306", serviceFee: "389", revenueCode: "", shortDescription: "TTE W/DOPPLER COMPLETE"
}, {
  cptCode: "93880", serviceFee: "783", revenueCode: "Medicine", shortDescription: "EXTRACRANIAL STUDY          "
}, {
  cptCode: "93880", serviceFee: "188", revenueCode: "", shortDescription: "EXTRACRANIAL BILAT STUDY"
}, {
  cptCode: "93922", serviceFee: "431", revenueCode: "Medicine", shortDescription: "UPR/L XTREMITY ART 2 LEVELS        "
}, {
  cptCode: "93922", serviceFee: "99", revenueCode: "", shortDescription: "UPR/L XTREMITY ART 2 LEVELS        "
}, {
  cptCode: "93923", serviceFee: "590", revenueCode: "Medicine", shortDescription: "UPR/LXTR ART STDY 3+ LVLS          "
}, {
  cptCode: "93923", serviceFee: "142", revenueCode: "", shortDescription: "UPR/LXTR ART STDY 3+ LVLS          "
}, {
  cptCode: "93925", serviceFee: "794", revenueCode: "Medicine", shortDescription: "LOWER EXTREMITY STUDY       "
}, {
  cptCode: "93925", serviceFee: "175", revenueCode: "", shortDescription: "LOWER EXTREMITY STUDY"
}, {
  cptCode: "93970", serviceFee: "769", revenueCode: "Medicine", shortDescription: "EXTREMITY STUDY             "
}, {
  cptCode: "93970", serviceFee: "184", revenueCode: "", shortDescription: "EXTREMITY STUDY"
}, {
  cptCode: "93971", serviceFee: "551", revenueCode: "Medicine", shortDescription: "EXTREMITY STUDY             "
}, {
  cptCode: "93971", serviceFee: "132", revenueCode: "", shortDescription: "EXTREMITY STUDY"
}, {
  cptCode: "93975", serviceFee: "1048", revenueCode: "Medicine", shortDescription: "VASCULAR STUDY              "
}, {
  cptCode: "93975", serviceFee: "314", revenueCode: "", shortDescription: "VASCULAR STUDY"
}, {
  cptCode: "93978", serviceFee: "656", revenueCode: "Medicine", shortDescription: "VASCULAR STUDY              "
}, {
  cptCode: "93978", serviceFee: "525", revenueCode: "", shortDescription: "VASCULAR STUDY"
}, {
  cptCode: "94010", serviceFee: "138", revenueCode: "Medicine", shortDescription: "BREATHING CAPACITY TEST     "
}, {
  cptCode: "94010", serviceFee: "42", revenueCode: "", shortDescription: "BREATHING CAPACITY TEST"
}, {
  cptCode: "94060", serviceFee: "237", revenueCode: "Medicine", shortDescription: "EVALUATION OF WHEEZING      "
}, {
  cptCode: "94060", serviceFee: "71", revenueCode: "", shortDescription: "EVALUATION OF WHEEZING"
}, {
  cptCode: "94070", serviceFee: "359", revenueCode: "Medicine", shortDescription: "EVALUATION OF WHEEZING             "
}, {
  cptCode: "94070", serviceFee: "176", revenueCode: "", shortDescription: "EVALUATION OF WHEEZING"
}, {
  cptCode: "94640", serviceFee: "75", revenueCode: "Medicine", shortDescription: "AIRWAY INHALATION TREATMENT        "
}, {
  cptCode: "94760", serviceFee: "55", revenueCode: "Medicine", shortDescription: "MEASURE BLOOD OXYGEN LEVEL  "
}, {
  cptCode: "94761", serviceFee: "102", revenueCode: "Medicine", shortDescription: "MEASURE BLOOD OXYGEN LEVEL  "
}, {
  cptCode: "95004", serviceFee: "16", revenueCode: "Medicine", shortDescription: "PERCUT ALLERGY SKIN TESTS"
}, {
  cptCode: "95115", serviceFee: "50", revenueCode: "Medicine", shortDescription: "IMMUNOTHERAPY ONE INJECTION"
}, {
  cptCode: "95165", serviceFee: "25", revenueCode: "Medicine", shortDescription: "ANTIGEN THERAPY SERVICES"
}, {
  cptCode: "95806", serviceFee: "776", revenueCode: "Medicine", shortDescription: "SLEEP STUDY UNATT and RESP EFFT "
}, {
  cptCode: "95806", serviceFee: "326", revenueCode: "", shortDescription: "SLEEP STUDY UNATTandRESP EFFT"
}, {
  cptCode: "95812", serviceFee: "684", revenueCode: "Medicine", shortDescription: "EEG 41-60 MINUTES           "
}, {
  cptCode: "95812", serviceFee: "198", revenueCode: "", shortDescription: "EEG 41-60 MINUTES"
}, {
  cptCode: "95912", serviceFee: "750", revenueCode: "Medicine", shortDescription: "MOTOR and SEN 11-12 NRV CND TEST"
}, {
  cptCode: "95923", serviceFee: "350", revenueCode: "Medicine", shortDescription: "AUTONOMIC NERV FUNCTION TEST"
}, {
  cptCode: "95992", serviceFee: "70", revenueCode: "Physical Therapy", shortDescription: "CANALITH REPOSITIONING PROC"
}, {
  cptCode: "96110", serviceFee: "164", revenueCode: "Medicine", shortDescription: "DEVELOPMENTAL SCREEN               "
}, {
  cptCode: "96116", serviceFee: "381", revenueCode: "", shortDescription: "NEUROBEHAVIORAL STATUS EXAM        "
}, {
  cptCode: "96127", serviceFee: "81", revenueCode: "Medicine", shortDescription: "BRIEF EMOTIONAL/BEHAV ASSMT"
}, {
  cptCode: "96161", serviceFee: "181", revenueCode: "Medicine", shortDescription: "HEALTH RISK ASSESSMENT, CAREGIVER"
}, {
  cptCode: "96360", serviceFee: "242", revenueCode: "", shortDescription: "HYDRATION IV INFUSION, INIT"
}, {
  cptCode: "96361", serviceFee: "74", revenueCode: "", shortDescription: "HYDRATE IV INFUSION, ADD-ON"
}, {
  cptCode: "96365", serviceFee: "291", revenueCode: "", shortDescription: "THER/PROPH/DIAG IV INF INIT "
}, {
  cptCode: "96367", serviceFee: "70", revenueCode: "Medicine", shortDescription: "TX/PROPH/DG ADDL SEQ IV INF"
}, {
  cptCode: "96372", serviceFee: "64", revenueCode: "", shortDescription: "THER/PROPH/DIAG INJ, SC/IM"
}, {
  cptCode: "96374", serviceFee: "172", revenueCode: "", shortDescription: "THER/PROPH/DIAG INJ, IV PUSH"
}, {
  cptCode: "96375", serviceFee: "86", revenueCode: "", shortDescription: "TX/PRO/DX INJ NEW DRUG ADDON"
}, {
  cptCode: "97010", serviceFee: "60", revenueCode: "Physical Therapy", shortDescription: "HOT OR COLD PACKS THERAPY"
}, {
  cptCode: "97012", serviceFee: "30", revenueCode: "Physical Therapy", shortDescription: "MECHANICAL TRACTION THERAPY"
}, {
  cptCode: "97014", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "ELECTRIC STIMULATION THERAPY"
}, {
  cptCode: "97018", serviceFee: "100", revenueCode: "Physical Therapy", shortDescription: "PARAFFIN BATH THERAPY"
}, {
  cptCode: "97032", serviceFee: "30", revenueCode: "Physical Therapy", shortDescription: "ELECTRICAL STIMULATION"
}, {
  cptCode: "97035", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "ULTRASOUND THERAPY"
}, {
  cptCode: "97110", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "THERAPEUTIC EXERCISES"
}, {
  cptCode: "97112", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "NEUROMUSCULAR REEDUCATION"
}, {
  cptCode: "97116", serviceFee: "79", revenueCode: "Physical Therapy", shortDescription: "GAIT TRAINING THERAPY"
}, {
  cptCode: "97124", serviceFee: "70", revenueCode: "Physical Therapy", shortDescription: "MASSAGE THERAPY"
}, {
  cptCode: "97140", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "MANUAL THERAPY"
}, {
  cptCode: "97161", serviceFee: "200", revenueCode: "Physical Therapy", shortDescription: "PHYSICAL THERAPY EVAL, LOW"
}, {
  cptCode: "97162", serviceFee: "300", revenueCode: "Physical Therapy", shortDescription: "PHYSICAL THERAPY EVAL, MODERATE"
}, {
  cptCode: "97163", serviceFee: "150", revenueCode: "Physical Therapy", shortDescription: "PHYSICAL THERAPY EVAL, HIGH"
}, {
  cptCode: "97164", serviceFee: "300", revenueCode: "Physical Therapy", shortDescription: "RE-EVALUATION OF PHYSICAL THERAPY"
}, {
  cptCode: "97530", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "THERAPEUTIC ACTIVITIES"
}, {
  cptCode: "97535", serviceFee: "70", revenueCode: "Physical Therapy", shortDescription: "SELF CARE MNGMENT TRAINING"
}, {
  cptCode: "97597", serviceFee: "162", revenueCode: "PT", shortDescription: "RMVL DEVITAL TIS 20 CM/lt    "
}, {
  cptCode: "97602", serviceFee: "150", revenueCode: "Treatment Services", shortDescription: "WOUND(S) CARE"
}, {
  cptCode: "97608", serviceFee: "0", revenueCode: "Physical Therapy", shortDescription: "NEG PRESS WOUND TX 50 CM"
}, {
  cptCode: "97610", serviceFee: "70", revenueCode: "Physical Therapy", shortDescription: "LOW FREQUENCY NON-THERMAL US"
}, {
  cptCode: "97802", serviceFee: "50", revenueCode: "Medicine", shortDescription: "MEDICAL NUTRITION INDIV IN"
}, {
  cptCode: "97810", serviceFee: "114", revenueCode: "Medicine", shortDescription: "ACUPUNCT W/O STIMUL 15 MIN"
}, {
  cptCode: "97811", serviceFee: "84", revenueCode: "Medicine", shortDescription: "ACUPUNCT W/O STIMUL ADDL 15M"
}, {
  cptCode: "99000", serviceFee: "40", revenueCode: "Misc", shortDescription: "SPECIMEN HANDLING OFFICE-LAB"
}, {
  cptCode: "99001", serviceFee: "54", revenueCode: "Misc", shortDescription: "SPECIMEN HANDLING PT LAB           "
}, {
  cptCode: "99024", serviceFee: "150", revenueCode: "Medicine", shortDescription: "POSTOP FOLLOW-UP VISIT"
}, {
  cptCode: "99050", serviceFee: "131", revenueCode: "MISC", shortDescription: "	MEDICAL SERVICES AFTER HRS  "
}, {
  cptCode: "99051", serviceFee: "71", revenueCode: "Misc", shortDescription: "MED SERV, EVE/WKEND/HOLIDAY        "
}, {
  cptCode: "99058", serviceFee: "137", revenueCode: "MISC", shortDescription: "	OFFICE EMERGENCY CARE       "
}, {
  cptCode: "99070", serviceFee: "17", revenueCode: "Supplies", shortDescription: "SPECIAL SUPPLIES PHYS/QHP"
}, {
  cptCode: "99071", serviceFee: "12", revenueCode: "Supplies", shortDescription: "PATIENT EDUCATION MATERIALS"
}, {
  cptCode: "99091", serviceFee: "120", revenueCode: "Misc", shortDescription: "COLLECT/REVIEW DATA FROM PT"
}, {
  cptCode: "99172", serviceFee: "81", revenueCode: "Medicine", shortDescription: "OCULAR FUNCTION SCREEN             "
}, {
  cptCode: "99173", serviceFee: "60", revenueCode: "Medicine", shortDescription: "VISUAL ACUITY SCREEN        "
}, {
  cptCode: "99202", serviceFee: "230", revenueCode: "E&M", shortDescription: "OFFICE/OUTPATIENT VISIT NEW"
}, {
  cptCode: "99203", serviceFee: "280", revenueCode: "E&M", shortDescription: "OFFICE/OUTPATIENT VISIT NEW"
}, {
  cptCode: "99204", serviceFee: "380", revenueCode: "E&M", shortDescription: "OFFICE/OUTPATIENT VISIT NEW"
}, {
  cptCode: "99205", serviceFee: "471", revenueCode: "E&M", shortDescription: "OFFICE/OUTPATIENT VISIT NEW"
}, {
  cptCode: "99211", serviceFee: "70", revenueCode: "E&M", shortDescription: "OFFICE/OUTPATIENT VISIT EST"
}, {
  cptCode: "99212", serviceFee: "150", revenueCode: "E&M", shortDescription: "OFFICE/OUTPATIENT VISIT EST"
}, {
  cptCode: "99213", serviceFee: "147", revenueCode: "E&M", shortDescription: "OFFICE/OUTPATIENT VISIT EST"
}, {
  cptCode: "99214", serviceFee: "260", revenueCode: "E&M", shortDescription: "OFFICE/OUTPATIENT VISIT EST"
}, {
  cptCode: "99215", serviceFee: "342", revenueCode: "E&M", shortDescription: "OFFICE/OUTPATIENT VISIT EST"
}, {
  cptCode: "99241", serviceFee: "271", revenueCode: "E&M", shortDescription: "OFFICE CONSULTATION"
}, {
  cptCode: "99242", serviceFee: "282", revenueCode: "E&M", shortDescription: "OFFICE CONSULTATION"
}, {
  cptCode: "99243", serviceFee: "375", revenueCode: "E&M", shortDescription: "OFFICE CONSULTATION"
}, {
  cptCode: "99244", serviceFee: "510", revenueCode: "E&M", shortDescription: "OFFICE CONSULTATION"
}, {
  cptCode: "99245", serviceFee: "667", revenueCode: "E&M", shortDescription: "OFFICE CONSULTATION"
}, {
  cptCode: "99252", serviceFee: "283", revenueCode: "E&M", shortDescription: "INPATIENT CONSULTATION      "
}, {
  cptCode: "99354", serviceFee: "299", revenueCode: "E&M", shortDescription: "PROLONGED SERVICE, OFFICE          "
}, {
  cptCode: "99358", serviceFee: "315", revenueCode: "E&M", shortDescription: "PROLONG SERVICE W/O CONTACT"
}, {
  cptCode: "99381", serviceFee: "271", revenueCode: "E&M", shortDescription: "PREV VISIT, NEW, INFANT"
}, {
  cptCode: "99382", serviceFee: "261", revenueCode: "E&M", shortDescription: "PREV VISIT, NEW, AGE 1-4"
}, {
  cptCode: "99383", serviceFee: "287", revenueCode: "E&M", shortDescription: "PREV VISIT, NEW, AGE 5-11"
}, {
  cptCode: "99384", serviceFee: "316", revenueCode: "E&M", shortDescription: "PREV VISIT, NEW, AGE 12-17"
}, {
  cptCode: "99385", serviceFee: "322", revenueCode: "E&M", shortDescription: "PREV VISIT, NEW, AGE 18-39"
}, {
  cptCode: "99386", serviceFee: "382", revenueCode: "E&M", shortDescription: "PREV VISIT, NEW, AGE 40-64"
}, {
  cptCode: "99387", serviceFee: "404", revenueCode: "E&M", shortDescription: "PREV VISIT, NEW, 65 and OVER"
}, {
  cptCode: "99391", serviceFee: "223", revenueCode: "E&M", shortDescription: "PREV VISIT, EST, INFANT"
}, {
  cptCode: "99392", serviceFee: "240", revenueCode: "E&M", shortDescription: "PREV VISIT, EST, AGE 1-4"
}, {
  cptCode: "99393", serviceFee: "235", revenueCode: "E&M", shortDescription: "PREV VISIT, EST, AGE 5-11"
}, {
  cptCode: "99394", serviceFee: "250", revenueCode: "E&M", shortDescription: "PREV VISIT, EST, AGE 12-17"
}, {
  cptCode: "99395", serviceFee: "275", revenueCode: "E&M", shortDescription: "PREV VISIT, EST, AGE 18-39"
}, {
  cptCode: "99396", serviceFee: "308", revenueCode: "E&M", shortDescription: "PREV VISIT, EST, AGE 40-64"
}, {
  cptCode: "99397", serviceFee: "331", revenueCode: "E&M", shortDescription: "PREV VISIT, EST, 65 and OVER"
}, {
  cptCode: "99401", serviceFee: "53", revenueCode: "E&M", shortDescription: "PREVENTIVE COUNSELING INDIV"
}, {
  cptCode: "99406", serviceFee: "66", revenueCode: "Treatment Services", shortDescription: "BEHAV CHNG SMOKING 3-10 MIN"
}, {
  cptCode: "99407", serviceFee: "46", revenueCode: "Treatment Services", shortDescription: "BEHAV CHNG SMOKING lt 10 MIN"
}, {
  cptCode: "99408", serviceFee: "86", revenueCode: "E&M", shortDescription: "AUDIT/DAST, 15-30 MIN"
}, {
  cptCode: "99429", serviceFee: "0", revenueCode: "E&M", shortDescription: "UNLISTED PREVENTIVE SERVICE "
}, {
  cptCode: "99441", serviceFee: "86", revenueCode: "", shortDescription: "PHONE E/M PHYS/QHP 5-10 MIN        "
}, {
  cptCode: "99442", serviceFee: "130", revenueCode: "", shortDescription: "PHONE E/M PHYS/QHP 11-20 MIN       "
}, {
  cptCode: "99495", serviceFee: "250", revenueCode: "E&M", shortDescription: "TRANS CARE MGMT 14 DAY DISCH"
}, {
  cptCode: "99496", serviceFee: "250", revenueCode: "E&M", shortDescription: "TRANS CARE MGMT 7 DAY DISCH"
}, {
  cptCode: "99499", serviceFee: "0", revenueCode: "E&M", shortDescription: "UNLISTED E and M SERVICE        "
}, {
  cptCode: "A4216", serviceFee: "5", revenueCode: "Supplies", shortDescription: "STERILE WATER/SALINE 10 ML"
}, {
  cptCode: "A4246", serviceFee: "24", revenueCode: "Supplies", shortDescription: "BETADINE/PHISOHEX SOLUTION PER PINT"
}, {
  cptCode: "A4364", serviceFee: "15", revenueCode: "Supplies", shortDescription: "ADHES LIQUID/EQUAL ANY TYPE-OUNCE"
}, {
  cptCode: "A4450", serviceFee: "3", revenueCode: "Supplies", shortDescription: "TAPE NON-WATERPROOF-18 SQUARE IN   "
}, {
  cptCode: "A4452", serviceFee: "15", revenueCode: "Supplies", shortDescription: "TAPE WATERPROOF PER 18 SQUARE IN"
}, {
  cptCode: "A4467", serviceFee: "17", revenueCode: "Supplies", shortDescription: "Belt strap sleev grmnt cover"
}, {
  cptCode: "A4550", serviceFee: "15", revenueCode: "Supplies", shortDescription: "SURGICAL TRAYS                     "
}, {
  cptCode: "A4565", serviceFee: "22", revenueCode: "Supplies", shortDescription: "SLINGS                             "
}, {
  cptCode: "A4566", serviceFee: "140", revenueCode: "Supplies", shortDescription: "SHOULD SLING/VEST/ABRESTRAIN"
}, {
  cptCode: "A4570", serviceFee: "10", revenueCode: "Supplies", shortDescription: "SPLINTS"
}, {
  cptCode: "A4580", serviceFee: "12", revenueCode: "Supplies", shortDescription: "CAST SUPPLIES (E.G. PLASTER)       "
}, {
  cptCode: "A4620", serviceFee: "30", revenueCode: "Supplies", shortDescription: "Variable concentration mask"
}, {
  cptCode: "A4660", serviceFee: "8", revenueCode: "Supplies", shortDescription: "SPHYGMOMANOMETER/BP W/CUFF and STET"
}, {
  cptCode: "A6216", serviceFee: "1", revenueCode: "Supplies", shortDescription: "GAUZE NON-IMPREG NONSTERL 16 SQ/lt "
}, {
  cptCode: "A6221", serviceFee: "5", revenueCode: "Supplies", shortDescription: "GAUZE NON-IMPREG  48 SQ W/ADHES"
}, {
  cptCode: "A6222", serviceFee: "5", revenueCode: "Supplies", shortDescription: "GAUZ IMPREG NOT H2O/HYDRGEL 16 SQ/"
}, {
  cptCode: "A6223", serviceFee: "5", revenueCode: "Supplies", shortDescription: "GAUZ IMPREG NOT H2O/HYDRGL gt16lt=4"
}, {
  cptCode: "A6228", serviceFee: "5", revenueCode: "Supplies", shortDescription: "GAUZ IMPREG WATR/NL SALINE  16 SQ"
}, {
  cptCode: "A6251", serviceFee: "4", revenueCode: "Supplies", shortDescription: "SPCLTY ABSORB DRESS 16SQ/lt NO ADHE"
}, {
  cptCode: "A6253", serviceFee: "15", revenueCode: "Supplies", shortDescription: "SPCLTY ABSORB DRESS 48 SQ NO ADHES"
}, {
  cptCode: "A6402", serviceFee: "1", revenueCode: "Supplies", shortDescription: "GAUZ NON-IMPREG STERL 16 SQ/lt NO A"
}, {
  cptCode: "A6449", serviceFee: "50", revenueCode: "Supplies", shortDescription: "COMPRS BANDGE ELAST KNITTED/WOVE"
}, {
  cptCode: "A6450", serviceFee: "2", revenueCode: "Supplies", shortDescription: "LT COMPRS BANDGE ELAST KNITTED/WOVE"
}, {
  cptCode: "A6453", serviceFee: "3", revenueCode: "Supplies", shortDescription: "SLF-ADHERENT BANDGE ELAST NON-KNITT"
}, {
  cptCode: "A7003", serviceFee: "30", revenueCode: "Supplies", shortDescription: "ADMN SET SM VOL NONFILTR NEB DISPBL"
}, {
  cptCode: "A7005", serviceFee: "30", revenueCode: "Supplies", shortDescription: "ADMN SET SM VOL NONFLTR NEB NONDISP"
}, {
  cptCode: "A7015", serviceFee: "10", revenueCode: "Supplies", shortDescription: "RADPHRM DX IOBGN SULFAT I-131 .5MCI"
}, {
  cptCode: "A9150", serviceFee: "10", revenueCode: "Supplies", shortDescription: "NONPRESCRIPTION DRUG"
}, {
  cptCode: "A9500", serviceFee: "350", revenueCode: "Supplies", shortDescription: "RADOPHRM TECHTUM TC 99M SESTAMIBI"
}, {
  cptCode: "BIOCOVID", serviceFee: "0", revenueCode: "Laboratory", shortDescription: "BIOCOVID PATIENT"
}, {
  cptCode: "C9399", serviceFee: "30", revenueCode: "Medicine", shortDescription: "UNCLASSIFIED DRUGS OR BIOLOGICALS"
}, {
  cptCode: "COMBO", serviceFee: "0", revenueCode: "Laboratory", shortDescription: "Dummy COMBO code"
}, {
  cptCode: "CROWN", serviceFee: "0", revenueCode: "Misc", shortDescription: "Dummy code for Crown pharmacy's pat"
}, {
  cptCode: "E0110", serviceFee: "220", revenueCode: "Supplies", shortDescription: "Crutch forearm pair"
}, {
  cptCode: "E0114", serviceFee: "65", revenueCode: "Supplies", shortDescription: "CRTCHES UNDARM OTH THAN WOOD PAIR  "
}, {
  cptCode: "E0156", serviceFee: "140", revenueCode: "Supplies", shortDescription: "SEAT ATTACHMENT WALKER"
}, {
  cptCode: "EMP", serviceFee: "0", revenueCode: "Misc", shortDescription: "EMP/EPS/FNC/Type E/WC"
}, {
  cptCode: "EVQ", serviceFee: "0", revenueCode: "Misc", shortDescription: "EV query"
}, {
  cptCode: "G0008", serviceFee: "35", revenueCode: "Injection", shortDescription: "ADMN FLU VAC NO FEE SCHED SAME DAY"
}, {
  cptCode: "G0010", serviceFee: "18", revenueCode: "Injection", shortDescription: "ADMN HEP B VAC NO FEE SCHD SAME DAY"
}, {
  cptCode: "G0101", serviceFee: "150", revenueCode: "Treatment Services", shortDescription: "CERV/VAG CANCR SCR;PELVCLN BRST EX"
}, {
  cptCode: "G0168", serviceFee: "200", revenueCode: "Supplies", shortDescription: "WOUND CLOS UTIL TISSUE ADHES ONLY"
}, {
  cptCode: "G0181", serviceFee: "234", revenueCode: "Other", shortDescription: "	PHYS SUPV PT RECV MCR-COVR HOM HLTH"
}, {
  cptCode: "G0282", serviceFee: "30", revenueCode: "Physical Therapy", shortDescription: "E-STIM 1/ AREAS WND CARE NOT G0281"
}, {
  cptCode: "G0283", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "ESTIM 1 GE NOT WND CARE PART TX PLN"
}, {
  cptCode: "G0402", serviceFee: "300", revenueCode: "Medicine", shortDescription: "INITIAL PREVENTIVE EXAM"
}, {
  cptCode: "G0403", serviceFee: "50", revenueCode: "Medicine", shortDescription: "EKG FOR INITIAL PREVENT EXAM"
}, {
  cptCode: "G0438", serviceFee: "270", revenueCode: "E&M", shortDescription: "Ppps, initial visit"
}, {
  cptCode: "G0444", serviceFee: "38", revenueCode: "Medicine", shortDescription: "Depression screen annual"
}, {
  cptCode: "G0446", serviceFee: "100", revenueCode: "Medicine", shortDescription: "INTENS BEHAVE THER CARDIO DX"
}, {
  cptCode: "G0447", serviceFee: "100", revenueCode: "E&M", shortDescription: "Behavior counsel obesity 15m"
}, {
  cptCode: "G2012", serviceFee: "70", revenueCode: "Misc", shortDescription: "Brief check in by md/qhp"
}, {
  cptCode: "G2023", serviceFee: "90", revenueCode: "Misc", shortDescription: "Specimen col COVID19, any source"
}, {
  cptCode: "G8427", serviceFee: "0", revenueCode: "E&M", shortDescription: "Docrev cur meds by elig clin"
}, {
  cptCode: "G8978", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "Mobility current status"
}, {
  cptCode: "G8979", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "Mobility goal status"
}, {
  cptCode: "G8984", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "Carry current status"
}, {
  cptCode: "G8985", serviceFee: "75", revenueCode: "Physical Therapy", shortDescription: "Carry goal status"
}, {
  cptCode: "GRASSAN", serviceFee: "0", revenueCode: "Medicine", shortDescription: "Dr. Grassan's patient"
}, {
  cptCode: "GRASSAN", serviceFee: "0", revenueCode: "Medicine", shortDescription: "Dr. Grassan's patient"
}, {
  cptCode: "HRSA", serviceFee: "0", revenueCode: "Misc", shortDescription: "UHC HRSA Patient"
}, {
  cptCode: "IGT", serviceFee: "0", revenueCode: "Laboratory", shortDescription: "Dummy Antibody code"
}, {
  cptCode: "J0171", serviceFee: "300", revenueCode: "Injection", shortDescription: "Adrenalin epinephrine inject"
}, {
  cptCode: "J0561", serviceFee: "90", revenueCode: "Injection", shortDescription: "Penicillin g benzathine inj"
}, {
  cptCode: "J0696", serviceFee: "75", revenueCode: "Injection", shortDescription: "INJECTION CEFTRIAXONE SODIUM-250 MG"
}, {
  cptCode: "J0698", serviceFee: "96", revenueCode: "Injection", shortDescription: "CEFOTAXIME SODIUM PER G            "
}, {
  cptCode: "J0735", serviceFee: "60", revenueCode: "Injection", shortDescription: "INJ CLONIDINE HYDROCHLORID 1 MG"
}, {
  cptCode: "J1030", serviceFee: "15", revenueCode: "Injection", shortDescription: "INJ METHYLPRDNISOLONE ACTAT 40 MG  "
}, {
  cptCode: "J1040", serviceFee: "20", revenueCode: "Injection", shortDescription: "INJ METHYLPRDNISOLONE ACTAT 80 MG  "
}, {
  cptCode: "J1050", serviceFee: "40", revenueCode: "Injection", shortDescription: "Medroxyprogesterone acetate"
}, {
  cptCode: "J1100", serviceFee: "45", revenueCode: "Injection", shortDescription: "INJ DEXETHOSONE SODIM PHOSHATE 1 MG"
}, {
  cptCode: "J1200", serviceFee: "20", revenueCode: "Injection", shortDescription: "INJ DIPHENHYDRAMINE HCL UP 50 MG   "
}, {
  cptCode: "J1720", serviceFee: "60", revenueCode: "Injection", shortDescription: "INJ HYDROCORTSON SOD SUCC TO 100 MG"
}, {
  cptCode: "J1815", serviceFee: "30", revenueCode: "Injection", shortDescription: "INJECTION INSULIN PER 5 UNITS"
}, {
  cptCode: "J1885", serviceFee: "20", revenueCode: "Injection", shortDescription: "INJ KETOROLAC TROMETHAMINE 15 MG   "
}, {
  cptCode: "J1940", serviceFee: "50", revenueCode: "Injection", shortDescription: "INJECTION FUROSEMIDE UP TO 20 MG"
}, {
  cptCode: "J2001", serviceFee: "25", revenueCode: "Injection", shortDescription: "INJECTION LIDO HCL IV INFUS 10 MG"
}, {
  cptCode: "J2310", serviceFee: "100", revenueCode: "Injection", shortDescription: "INJECTION NALOXONE HCL PER 1 MG"
}, {
  cptCode: "J2405", serviceFee: "60", revenueCode: "Injection", shortDescription: "INJECTION ONDANSETRON HCL PER 1 MG"
}, {
  cptCode: "J2550", serviceFee: "22", revenueCode: "Injection", shortDescription: "INJECTION PROMETHAZINE HCL TO 50 MG"
}, {
  cptCode: "J2920", serviceFee: "50", revenueCode: "Injection", shortDescription: "INJ METHYLPRDNISOLON SODIM TO 40 MG"
}, {
  cptCode: "J2930", serviceFee: "50", revenueCode: "Injection", shortDescription: "INJ METHYLPRDNISLN SODIM  TO 125 MG"
}, {
  cptCode: "J3301", serviceFee: "750", revenueCode: "Injection", shortDescription: "INJ TRIAMCINOLONE ACETONIDE 10 MG  "
}, {
  cptCode: "J3420", serviceFee: "20", revenueCode: "Injection", shortDescription: "INJ VIT B-12 CYNOCOBLMN TO 1000 MCG"
}, {
  cptCode: "J3490", serviceFee: "5", revenueCode: "Injection", shortDescription: "UNCLASSIFIED DRUGS"
}, {
  cptCode: "J7030", serviceFee: "45", revenueCode: "Injection", shortDescription: "INFUS NORMAL SALINE SOL 1000 CC    "
}, {
  cptCode: "J7040", serviceFee: "10", revenueCode: "Injection", shortDescription: "INFUS NORMAL SALINE SOL STERILE    "
}, {
  cptCode: "J7042", serviceFee: "10", revenueCode: "Injection", shortDescription: "5% DEXTROSE/NORMAL SALINE"
}, {
  cptCode: "J7120", serviceFee: "45", revenueCode: "Injection", shortDescription: "RINGERS LACTATE INFUSION UP 1000 CC"
}, {
  cptCode: "J7510", serviceFee: "10", revenueCode: "Injection", shortDescription: "PREDNISOLONE ORAL PER 5 MG"
}, {
  cptCode: "J7613", serviceFee: "3", revenueCode: "Injection", shortDescription: "ALBUTEROL INHAL UNIT DOSE 1 MG     "
}, {
  cptCode: "J7620", serviceFee: "5", revenueCode: "Injection", shortDescription: "Albuterol up to 2.5mg and ipratrop"
}, {
  cptCode: "J8499", serviceFee: "60", revenueCode: "Injection", shortDescription: "PRSC RX ORAL NONCHEMOTHAPEUTIC NOS"
}, {
  cptCode: "J8999", serviceFee: "60", revenueCode: "Injection", shortDescription: "PRSC DRUG ORAL CHEMOTHAPEUTIC NOS"
}, {
  cptCode: "KRAIDY", serviceFee: "0", revenueCode: "Medicine", shortDescription: "Dr. Kraidy's Patient"
}, {
  cptCode: "L0120", serviceFee: "75", revenueCode: "Supplies", shortDescription: "CERVICAL FLEXIBLE NONADJUSTABLE"
}, {
  cptCode: "L1810", serviceFee: "65", revenueCode: "Supplies", shortDescription: "KO ELAST W/JNT PREFAB INCL FIT and "
}, {
  cptCode: "L1820", serviceFee: "70", revenueCode: "Supplies", shortDescription: "KO ELAST W/CONDYLR PADS and JNT PRF"
}, {
  cptCode: "L1830", serviceFee: "200", revenueCode: "Supplies", shortDescription: "KO IMMOBLIZR CANVAS LNGTUDNL PRFAB"
}, {
  cptCode: "L1833", serviceFee: "75", revenueCode: "Supplies", shortDescription: "Ko adj jnt pos r sup pre ots"
}, {
  cptCode: "L1902", serviceFee: "22", revenueCode: "Supplies", shortDescription: "AFO ANK GAUNTLT PREFAB W/FIT and AD"
}, {
  cptCode: "L1906", serviceFee: "65", revenueCode: "Supplies", shortDescription: "AFO MXILIGUS ANK SUPP PRFAB W/FIT a"
}, {
  cptCode: "L1920", serviceFee: "350", revenueCode: "Supplies", shortDescription: "AFO 1 UPRT W/STAT/ADJ STOP CSTM FAB"
}, {
  cptCode: "L3203", serviceFee: "200", revenueCode: "Supplies", shortDescription: "ORTHOPED SHOE OXFRD W/SUPINATR JR"
}, {
  cptCode: "L3260", serviceFee: "48", revenueCode: "Supplies", shortDescription: "SURGICAL BOOT/SHOE EACH            "
}, {
  cptCode: "L3660", serviceFee: "46", revenueCode: "Supplies", shortDescription: "SO FIG 8 DESN ABDUCT RESTRNR CANVAS"
}, {
  cptCode: "L3670", serviceFee: "65", revenueCode: "Supplies", shortDescription: "SO ACROMIO/CLAVICULR PRFAB FIT and "
}, {
  cptCode: "L3702", serviceFee: "64", revenueCode: "Supplies", shortDescription: "Eo w/o joints cf"
}, {
  cptCode: "L3908", serviceFee: "80", revenueCode: "Supplies", shortDescription: "WHO EXT CNTRL COCK-UP NONMOLD PRFB"
}, {
  cptCode: "L3923", serviceFee: "220", revenueCode: "Supplies", shortDescription: "HND FNGR ORTHOS W/O JNT PRFAB"
}, {
  cptCode: "L3927", serviceFee: "50", revenueCode: "Supplies", shortDescription: "FO pip/dip w/o joint/spring"
}, {
  cptCode: "L3931", serviceFee: "65", revenueCode: "Supplies", shortDescription: "WHFO nontorsion joint prefab"
}, {
  cptCode: "L3999", serviceFee: "60", revenueCode: "Supplies", shortDescription: "UPPER LIMB ORTHOSIS NOS"
}, {
  cptCode: "L4350", serviceFee: "80", revenueCode: "Supplies", shortDescription: "ANKLE CNTRL ORTHOSIS STIRRUP PRFAB"
}, {
  cptCode: "L4360", serviceFee: "600", revenueCode: "Supplies", shortDescription: "WALK BOOT PNEUMATC PREFAB W/FIT and"
}, {
  cptCode: "L4361", serviceFee: "600", revenueCode: "Supplies", shortDescription: "Pneuma/vac walk boot pre ots"
}, {
  cptCode: "L4370", serviceFee: "120", revenueCode: "Supplies", shortDescription: "PNEUMAT FULL LEG SPLNT PRFAB"
}, {
  cptCode: "L4386", serviceFee: "0", revenueCode: "Supplies", shortDescription: "Non-pneum walk boot pre cst"
}, {
  cptCode: "L4387", serviceFee: "368", revenueCode: "Supplies", shortDescription: "Non-pneum walk boot pre ots"
}, {
  cptCode: "NOCHARGE", serviceFee: "0", revenueCode: "Misc", shortDescription: "Duplicate- Deleted encounter"
}, {
  cptCode: "PCR", serviceFee: "0", revenueCode: "Laboratory", shortDescription: "Dummy PCR code"
}, {
  cptCode: "Q0091", serviceFee: "105", revenueCode: "Laboratory", shortDescription: "SCR PAP SMER; OBTAIN PREPCONVY-LAB"
}, {
  cptCode: "Q2037", serviceFee: "30", revenueCode: "Injection", shortDescription: "FLUVIRIN VACC, 3 YRS and gt, IM"
}, {
  cptCode: "Q2038", serviceFee: "40", revenueCode: "Injection", shortDescription: "FLUZONE VACC, 3 YRS  , IM"
}, {
  cptCode: "Q2039", serviceFee: "25", revenueCode: "Medicine", shortDescription: "NOS FLU VACC, 3 YRS and gt, IM"
}, {
  cptCode: "Q4009", serviceFee: "45", revenueCode: "Ortho", shortDescription: "CAST SPL SHORT ARM CAST ADLT PLASTR"
}, {
  cptCode: "Q4010", serviceFee: "55", revenueCode: "Ortho", shortDescription: "CAST SPL SHRT ARM CAST ADLT FIBRGLS"
}, {
  cptCode: "Q4038", serviceFee: "55", revenueCode: "Ortho", shortDescription: "CAST SPL SHRT LEG CAST ADLT FIBRGLS"
}, {
  cptCode: "Q4046", serviceFee: "35", revenueCode: "Ortho", shortDescription: "CAST SPL SHRT LEG SPLNT ADLT F-GLSS"
}, {
  cptCode: "Q4049", serviceFee: "13", revenueCode: "Ortho", shortDescription: "FINGER SPLINT STATIC               "
}, {
  cptCode: "Q4051", serviceFee: "4", revenueCode: "Ortho", shortDescription: "SPLINT SUPPLIES MISCELLANEOUS      "
}, {
  cptCode: "RAPID", serviceFee: "0", revenueCode: "Laboratory", shortDescription: "Dummy RAPID code"
}, {
  cptCode: "RECORD", serviceFee: "0", revenueCode: "Misc", shortDescription: "Medical Record Payment"
}, {
  cptCode: "RNFCOMBO", serviceFee: "0", revenueCode: "Laboratory", shortDescription: "Report not found COMBO"
}, {
  cptCode: "RNFIGM", serviceFee: "0", revenueCode: "Laboratory", shortDescription: "Report not found ANTIBODY IG/IM"
}, {
  cptCode: "RNFPCR", serviceFee: "0", revenueCode: "Laboratory", shortDescription: "Report not found PCR"
}, {
  cptCode: "RNFRAPID", serviceFee: "0", revenueCode: "Laboratory", shortDescription: "Report not found RAPID"
}, {
  cptCode: "S0020", serviceFee: "40", revenueCode: "Supplies", shortDescription: "INJ BUPIVICAINE HYDROCHLORID 30 ML"
}, {
  cptCode: "S0028", serviceFee: "40", revenueCode: "Supplies", shortDescription: "INJECTION FAMOTIDINE 20 MG"
}, {
  cptCode: "S0119", serviceFee: "40", revenueCode: "Supplies", shortDescription: "Ondansetron 4 mg"
}, {
  cptCode: "S0610", serviceFee: "150", revenueCode: "Supplies", shortDescription: "ANNUAL GYN EXAMINATION NEW PATIENT"
}, {
  cptCode: "S0612", serviceFee: "150", revenueCode: "Supplies", shortDescription: "ANNUAL GYN EXAMINATION EST PATIENT"
}, {
  cptCode: "S0630", serviceFee: "150", revenueCode: "Supplies", shortDescription: "REMOV SUTS; MD NOT MD WHO CLOS WND"
}, {
  cptCode: "S1015", serviceFee: "50", revenueCode: "Supplies", shortDescription: "IV TUBING EXTENSION SET"
}, {
  cptCode: "S8110", serviceFee: "50", revenueCode: "Supplies", shortDescription: "PEAK EXPIRATORY FLOW RATE"
}, {
  cptCode: "S8430", serviceFee: "5", revenueCode: "Supplies", shortDescription: "PADDING COMPRESSION BANDAGE ROLL"
}, {
  cptCode: "S8451", serviceFee: "30", revenueCode: "Supplies", shortDescription: "SPLINT PREFABRICATED WRIST OR ANKLE"
}, {
  cptCode: "S9083", serviceFee: "100", revenueCode: "Supplies", shortDescription: "GLOBAL FEE URGENT CARE CENTERS"
}, {
  cptCode: "S9088", serviceFee: "100", revenueCode: "E&M", shortDescription: "SERVICES PROV IN URGENT CARE CENTER"
}, {
  cptCode: "SCHOOL", serviceFee: "0", revenueCode: "Medicine", shortDescription: "Dummy code for School patients"
}, {
  cptCode: "SPP", serviceFee: "0", revenueCode: "Misc", shortDescription: "Self Pay"
}, {
  cptCode: "SPSC", serviceFee: "0", revenueCode: "Misc", shortDescription: "SELF PAY SURCHARGE"
}, {
  cptCode: "STREP", serviceFee: "0", revenueCode: "Medicine", shortDescription: "Dummy code for STREP lab"
}, {
  cptCode: "U0003", serviceFee: "610", revenueCode: "Laboratory", shortDescription: "Ia COVID-19 amp prb high thruput"
}, {
  cptCode: "U0005", serviceFee: "90", revenueCode: "Laboratory", shortDescription: "Infec agen detec ampli probe"
}, {
  cptCode: "ZAID", serviceFee: "0", revenueCode: "Medicine", shortDescription: "Dr. Zaid's patient(out side lab)"
}]

export const cptFeeScheduleData = feeSchedules?.map(({ shortDescription, ...rest }) => ({ shortDescription: shortDescription?.trim(), ...rest }))

const covidCPTCodes = [{
  cptCode: "86318",
  shortDescription: "Immunoassay for infectious agent antibody(ies), qualitative or semiquantitative, single-step method (eg, reagent strip);"
},
{
  cptCode: "86408",
  shortDescription: "Neutralizing antibody, severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (Coronavirus disease [COVID-19]); screen"
},
{
  cptCode: "86413",
  shortDescription: "Severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (Coronavirus disease [COVID-19]) antibody, quantitative"
},
{
  cptCode: "86769",
  shortDescription: "Antibody; severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (Coronavirus disease [COVID-19])"
},
{
  cptCode: "87301",
  shortDescription: "Infectious agent antigen detection by immunoassay technique, (eg, enzyme immunoassay [EIA], enzyme-linked immunosorbent assay [ELISA], fluorescence immunoassay [FIA], immunochemiluminometric assay [IMCA]) qualitative or semiquantitative; adenovirus enteric types 40/41"
},
{
  cptCode: "0223U",
  shortDescription: "Infectious disease (bacterial or viral respiratory tract infection), pathogen-specific nucleic acid (DNA or RNA), 22 targets including severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2), qualitative RT-PCR, nasopharyngeal swab, each pathogen reported as detected or not detected"
},
{
  cptCode: "0226U",
  shortDescription: "Surrogate viral neutralization test (sVNT), severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (Coronavirus disease [COVID-19]), ELISA, plasma, serum"
},
{
  cptCode: "0240U",
  shortDescription: "Infectious disease (viral respiratory tract infection), pathogen-specific RNA, 3 targets (severe acute respiratory syndrome coronavirus 2 [SARS-CoV-2], influenza A, influenza B), upper respiratory specimen, each pathogen reported as detected or not detected"
},
{
  cptCode: "99072",
  shortDescription: "Additional supplies, materials, and clinical staff time over and above those usually included in an office visit or other non-facility service(s), when performed during a Public Health Emergency, as defined by law, due to respiratory-transmitted infectious disease"
},
{
  cptCode: "0001A",
  shortDescription: "Immunization administration by intramuscular injection of severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2) (coronavirus disease [COVID-19]) vaccine, mRNA-LNP, spike protein, preservative free, 30 mcg/0.3 mL dosage, diluent reconstituted; first dose"
}]

const feeCPTCodes = cptFeeScheduleData?.map(({ cptCode, shortDescription }) => ({ code: cptCode, shortDescription }));

export const cptCodeData = [...feeCPTCodes, ...covidCPTCodes]

export const modifiersData = [
  {
    code: "17",
    description:
      "Permanent and stationary with permanent disability or a need for future medical care",
  },
  { code: "1D", description: "Designated Provider Enhanced Reimbursement" },
  { code: "22", description: "Increased Procedural Serv" },
  { code: "23", description: "Unusual Anesthesia: Occas" },
  { code: "24", description: "Unrelated Evaluation and " },
  { code: "25", description: "Significant, Separately I" },
  { code: "26", description: "Professional Component: C" },
  {
    code: "27",
    description: "Multiple Outpatient Hospital E/M Encounters on the Same Date",
  },
  { code: "29", description: "Global Procedures, those " },
  { code: "32", description: "Mandated Services: Servic" },
  { code: "33", description: "Preventive Service" },
  { code: "47", description: "Anesthesia by Surgeon: Re" },
  { code: "50", description: "Bilateral Procedure: Unle" },
  { code: "51", description: "Multiple Procedures: When" },
  { code: "52", description: "Reduced Services: Under c" },
  { code: "53", description: "Discontinued Procedure: U" },
  { code: "54", description: "Surgical Care Only: When " },
  { code: "55", description: "Postoperative Management " },
  { code: "56", description: "Preoperative Management O" },
  { code: "57", description: "Decision for Surgery: An " },
  { code: "58", description: "Staged or Related Procedu" },
  { code: "59", description: "Distinct Procedural Servi" },
  { code: "62", description: "Two Surgeons: When two su" },
  { code: "63", description: "Procedure Performed on In" },
  { code: "66", description: "Surgical Team: Under some" },
  { code: "73", description: "Discontinued Outpatient/H" },
  {
    code: "74",
    description:
      "Discontinued Outpatient/ASC Procedure After Administration of Anesthesia",
  },
  { code: "76", description: "Repeat Procedure or Servi" },
  { code: "77", description: "Repeat Procedure by Anoth" },
  { code: "78", description: "Unplanned Return to the O" },
  { code: "79", description: "Unrelated Procedure or Se" },
  { code: "80", description: "Assistant Surgeon: Surgic" },
  { code: "81", description: "Minimum Assistant Surgeon" },
  { code: "82", description: "Assistant Surgeon (when q" },
  { code: "83", description: "Physician Assistant or Nurse" },
  { code: "90", description: "Reference (Outside) Labor" },
  { code: "91", description: "Repeat Clinical Diagnosti" },
  { code: "92", description: "Alternative Laboratory Platform Testing" },
  {
    code: "93",
    description:
      "Synchronous Telemedicine Service Rendered Via Telephone (Audio-Only)",
  },
  { code: "95", description: "Synchronous Telemedicine Service" },
  { code: "96", description: "Habilitative services" },
  { code: "97", description: "Rehabilitative services" },
  { code: "99", description: "Multiple Modifiers: Under" },
  { code: "A1", description: "Dressing for one wound" },
  { code: "A2", description: "Dressing for two wounds" },
  { code: "A3", description: "Dressing for three wounds" },
  { code: "A4", description: "Dressing for four wounds" },
  { code: "A5", description: "Dressing for five wounds" },
  { code: "A6", description: "Dressing for six wounds" },
  { code: "A7", description: "Dressing for seven wounds" },
  { code: "A8", description: "Dressing for eight wounds" },
  { code: "A9", description: "Dressing for 9 or more wound" },
  { code: "AA", description: "Anesthesia perf by anesgst" },
  { code: "AD", description: "MD supervision, &gt;4 anes proc" },
  { code: "AE", description: "Registered dietician" },
  { code: "AF", description: "Specialty physician" },
  { code: "AG", description: "Primary physician" },
  { code: "AH", description: "Clinical psychologist" },
  { code: "AI", description: "Principal Physician of Record" },
  { code: "AI", description: "Principal physician of rec" },
  { code: "AJ", description: "Clinical social worker" },
  { code: "AK", description: "Non participating physician" },
  { code: "AM", description: "Physician, team member svc" },
  { code: "AO", description: "Prov declined alt pmt method" },
  { code: "AP", description: "No dtmn of refractive state" },
  { code: "AQ", description: "Physician service HPSA area" },
  { code: "AR", description: "Physician scarcity area" },
  { code: "AS", description: "Assistant at surgery service" },
  { code: "AT", description: "Acute treatment" },
  { code: "AU", description: "Uro, ostomy or trach item" },
  { code: "AV", description: "Item w prosthetic/orthotic" },
  { code: "AW", description: "Item w a surgical dressing" },
  { code: "AX", description: "Item w dialysis services" },
  { code: "AY", description: "Item/service not for esrd tx" },
  { code: "AZ", description: "Physician serv in dent hpsa" },
  { code: "BA", description: "Item w pen services" },
  { code: "BL", description: "Spec acquisition blood prods" },
  { code: "BO", description: "Nutrition oral admin no tube" },
  { code: "BP", description: "Bene electd to purchase item" },
  { code: "BR", description: "Bene elected to rent item" },
  { code: "BU", description: "Bene undecided on purch/rent" },
  { code: "CA", description: "CARF Accredited programs" },
  { code: "CA", description: "Procedure payable inpatient" },
  { code: "CB", description: "ESRD bene part a snf-sep pay" },
  { code: "CC", description: "Procedure code change" },
  { code: "CD", description: "AMCC test for ESRD or MCP MD" },
  { code: "CE", description: "Med neces AMCC tst sep reimb" },
  { code: "CF", description: "AMCC tst not composite rate" },
  { code: "CG", description: "Policy criteria applied" },
  { code: "CH", description: "0 percent impaired, limit" },
  { code: "CH", description: "0 percent impaired, ltd, res" },
  { code: "CI", description: "At least 1 percent but le" },
  { code: "CI", description: "1 to &lt;20 percent impaired" },
  { code: "CJ", description: "At least 20 percent but l" },
  { code: "CJ", description: "20 to &lt;40 percent impaired" },
  { code: "CK", description: "At least 40 percent but l" },
  { code: "CK", description: "40 to &lt;60 percent impaired" },
  { code: "CL", description: "At least 60 percent but l" },
  { code: "CL", description: "60 to &lt;80 percent impaired" },
  { code: "CM", description: "At least 80 percent but l" },
  { code: "CM", description: "80 to &lt;100 percent impaired" },
  { code: "CN", description: "100 percent impaired, lim" },
  { code: "CN", description: "100 percent impaired, ltd" },
  { code: "CO", description: "Outpatient ot service by ota" },
  { code: "CP", description: "Chronic Pain Management Prog" },
  { code: "CP", description: "C-apc adjunctive service" },
  { code: "CQ", description: "Outpatient pt service by pta" },
  { code: "CR", description: "Catastrophe/disaster related" },
  {
    code: "CS",
    description:
      "Cost-sharing for specified COVID-19 testing-related services that result in an order for or administration of a COVID-19 test",
  },
  { code: "CT", description: "Ct does not meet nema standa" },
  { code: "DA", description: "Oral health assess, not dent" },
  { code: "E1", description: "Upper left eyelid" },
  { code: "E2", description: "Lower left eyelid" },
  { code: "E3", description: "Upper right eyelid" },
  { code: "E4", description: "Lower right eyelid" },
  { code: "EA", description: "ESA, anemia, chemo-induced" },
  { code: "EB", description: "ESA, anemia, radio-induced" },
  { code: "EC", description: "ESA, anemia, non-chemo/radio" },
  { code: "ED", description: "HCT&gt;39% or Hgb&gt;13g&gt;=3 cycle" },
  { code: "EE", description: "HCT&gt;39% or Hgb&gt;13g&lt;3 cycle" },
  { code: "EJ", description: "Subsequent claim" },
  { code: "EM", description: "Emer reserve supply (ESRD)" },
  { code: "EP", description: "Medicaid EPSDT program svc" },
  { code: "ER", description: "Off-campus ed service" },
  { code: "ET", description: "Emergency Services" },
  { code: "EX", description: "Expatriate beneficiary" },
  { code: "EY", description: "No md order for item/service" },
  { code: "F1", description: "Left hand, second digit" },
  { code: "F2", description: "Left hand, third digit" },
  { code: "F3", description: "Left hand, fourth digit" },
  { code: "F4", description: "Left hand, fifth digit" },
  { code: "F5", description: "Right hand, thumb" },
  { code: "F6", description: "Right hand, second digit" },
  { code: "F7", description: "Right hand, third digit" },
  { code: "F8", description: "Right hand, fourth digit" },
  { code: "F9", description: "Right hand, fifth digit" },
  { code: "FA", description: "Left hand, thumb" },
  { code: "FB", description: "Item provided without cost" },
  { code: "FC", description: "Functional Capacity" },
  { code: "FC", description: "Part credit, replaced device" },
  { code: "FP", description: "Svc part of family plan pgm" },
  { code: "FQ", description: "Audio-only service" },
  { code: "FR", description: "Two-way a/v dir supervision" },
  { code: "FX", description: "X-ray taken using film" },
  {
    code: "FY",
    description:
      "X-ray&nbsp;taken&nbsp;using computed radiography technology/cassette-based imaging",
  },
  { code: "G0", description: "Telestroke" },
  { code: "G1", description: "URR reading of less than 60" },
  { code: "G2", description: "URR reading of 60 to 64.9" },
  { code: "G3", description: "URR  reading of 65 to 69.9" },
  { code: "G4", description: "URR reading of 70 to 74.9" },
  { code: "G5", description: "URR reading of 75 or greater" },
  { code: "G6", description: "ESRD patient &lt;6 dialysis/mth" },
  { code: "G7", description: "Payment limits do not apply" },
  { code: "G8", description: "Monitored anesthesia care" },
  { code: "G9", description: "MAC for at risk patient" },
  { code: "GA", description: "Waiver of Liability on file" },
  { code: "GA", description: "Liability waiver ind case" },
  { code: "GB", description: "Claim resubmitted" },
  { code: "GC", description: "Resident/teaching phys serv" },
  { code: "GD", description: "Unit of service &gt; MUE value" },
  { code: "GE", description: "Resident prim care exception" },
  { code: "GF", description: "Nonphysician serv c a hosp" },
  { code: "GG", description: "Payment screen mam + diagmam" },
  { code: "GH", description: "Diag mammo to screening mamo" },
  { code: "GJ", description: "Opt out provider of er srvc" },
  { code: "GK", description: "Actual item/service ordered" },
  { code: "GL", description: "Upgraded item, no charge" },
  { code: "GM", description: "Multiple transports" },
  { code: "GN", description: "OP speech language service" },
  { code: "GO", description: "OP occupational therapy serv" },
  { code: "GP", description: "OP PT services" },
  { code: "GQ", description: "Telehealth store and forward" },
  { code: "GR", description: "Service by va resident" },
  { code: "GS", description: "Epo/darbepoietin reduced 25%" },
  { code: "GT", description: "InteractiveTelecommunication" },
  { code: "GU", description: "Liability waiver rout notice" },
  { code: "GV", description: "Attending phys not hospice" },
  { code: "GW", description: "Service unrelated to term co" },
  { code: "GX", description: "Notice of liability issued" },
  { code: "GX", description: "Voluntary liability notice" },
  { code: "GY", description: "Statutorily excluded" },
  { code: "GZ", description: "Not reasonable and necessary" },
  { code: "H9", description: "Court-ordered" },
  { code: "HA", description: "Child/adolescent program" },
  { code: "HB", description: "Adult program non-geriatric" },
  { code: "HC", description: "Adult program geriatric" },
  { code: "HD", description: "Pregnant/parenting program" },
  { code: "HE", description: "Mental health program" },
  { code: "HF", description: "Substance abuse program" },
  { code: "HG", description: "Opioid addiction tx program" },
  { code: "HH", description: "Mental hlth/substance abs pr" },
  { code: "HI", description: "M hlth/m retrdtn/dev dis pro" },
  { code: "HI", description: "Men hlth intel/dev disab pgm" },
  { code: "HJ", description: "Employee assistance program" },
  { code: "HK", description: "Spec hgh rsk mntl hlth pop p" },
  { code: "HL", description: "intern" },
  { code: "HM", description: "Less than bachelor degree lv" },
  { code: "HN", description: "Bachelors degree level" },
  { code: "HO", description: "Masters degree level" },
  { code: "HP", description: "Doctoral level" },
  { code: "HQ", description: "Group setting" },
  { code: "HR", description: "Family/couple w client prsnt" },
  { code: "HS", description: "Family/couple w/o client prs" },
  { code: "HT", description: "Multi-disciplinary team" },
  { code: "HU", description: "Child welfare agency funded" },
  { code: "HV", description: "Funded state addiction agncy" },
  { code: "HW", description: "State mntl hlth agncy funded" },
  { code: "HX", description: "County/local agency funded" },
  { code: "HY", description: "Funded by juvenile justice" },
  { code: "HZ", description: "Criminal justice agncy fund" },
  { code: "J1", description: "CAP no-pay for prescript num" },
  { code: "J2", description: "CAP restock of emerg drugs" },
  { code: "J3", description: "CAP drug unavail thru cap" },
  { code: "J4", description: "Dmepos comp bid furn by hosp" },
  { code: "JA", description: "Administered intravenously" },
  { code: "JB", description: "Administered subcutaneously" },
  { code: "JC", description: "Skin substitute graft" },
  { code: "JD", description: "Skin sub not used as a graft" },
  { code: "JE", description: "Administered via dialysate" },
  { code: "JF", description: "Compounded drug" },
  {
    code: "JG",
    description:
      "Drug or biological acquired with 340b drug pricing program discount",
  },
  { code: "JW", description: "Discarded drug not administe" },
  { code: "K0", description: "Lwr ext prost functnl lvl 0" },
  { code: "K1", description: "Lwr ext prost functnl lvl 1" },
  { code: "K2", description: "Lwr ext prost functnl lvl 2" },
  { code: "K3", description: "Lwr ext prost functnl lvl 3" },
  { code: "K4", description: "Lwr ext prost functnl lvl 4" },
  { code: "KA", description: "Wheelchair add-on option/acc" },
  { code: "KB", description: "&gt;4 modifiers on claim" },
  { code: "KC", description: "Repl special pwr wc intrface" },
  { code: "KD", description: "Drug/biological DME infused" },
  { code: "KE", description: "Bid under round 1 DMEPOS CB" },
  { code: "KF", description: "FDA class III device" },
  { code: "KG", description: "DMEPOS comp bid prgm no 1" },
  { code: "KH", description: "DMEPOS ini clm, pur/1 mo rnt" },
  { code: "KI", description: "DMEPOS 2nd or 3rd mo rental" },
  { code: "KJ", description: "DMEPOS PEN pmp or 4-15mo rnt" },
  { code: "KK", description: "DMEPOS comp bid prgm no 2" },
  { code: "KL", description: "DMEPOS mailorder comp bid" },
  { code: "KM", description: "Rplc facial prosth new imp" },
  { code: "KN", description: "Rplc facial prosth old mod" },
  { code: "KO", description: "Single drug unit dose form" },
  { code: "KP", description: "First drug of multi drug u d" },
  { code: "KQ", description: "2nd/subsqnt drg multi drg ud" },
  { code: "KR", description: "Rental item partial month" },
  { code: "KS", description: "Glucose monitor supply" },
  { code: "KT", description: "Item from noncontract supply" },
  { code: "KU", description: "DMEPOS comp bid prgm no 3" },
  { code: "KV", description: "DMEPOS item, profession serv" },
  { code: "KW", description: "DMEPOS comp bid prgm no 4" },
  { code: "KX", description: "Documentation on file" },
  { code: "KY", description: "DMEPOS comp bid prgm no 5" },
  { code: "KZ", description: "New cov not implement by m+c" },
  { code: "L1", description: "Separately payable lab test" },
  { code: "LC", description: "Lft circum coronary artery" },
  { code: "LD", description: "Left ant des coronary artery" },
  { code: "LL", description: "Lease/rental (appld to pur)" },
  { code: "LM", description: "Left main coronary artery" },
  { code: "LR", description: "Laboratory round trip" },
  { code: "LS", description: "FDA-monitored IOL implant" },
  { code: "LT", description: "Left side" },
  { code: "M2", description: "Medicare secondary payer" },
  {
    code: "ME",
    description:
      "The order for this service adheres to appropriate use criteria in the clinical decision support mechanism consulted by the ordering professional",
  },
  { code: "MI", description: "Multiple Impairment Ratings" },
  { code: "MR", description: "Outpatient Medical Rehab Prog" },
  { code: "MS", description: "6-mo maint/svc fee parts/lbr" },
  { code: "NB", description: "Drug specific nebulizer" },
  {
    code: "NH",
    description:
      "Ambulance Service from a Skilled Nursing Facility (SNF) (1819 facility) to a Hospital",
  },
  { code: "NM", description: "Not at MMI" },
  { code: "NR", description: "New when rented" },
  { code: "NU", description: "New equipment" },
  { code: "P1", description: "Normal healthy patient" },
  { code: "P2", description: "Patient w/mild syst disease" },
  { code: "P3", description: "Patient w/severe sys disease" },
  { code: "P4", description: "Pt w/sev sys dis threat life" },
  { code: "P5", description: "Pt not expect surv w/o oper" },
  { code: "P6", description: "Brain-dead pt organs removed" },
  { code: "PA", description: "Surgery, wrong body part" },
  { code: "PB", description: "Surgery, wrong patient" },
  { code: "PC", description: "Wrong surgery on patient" },
  { code: "PD", description: "Inp admit w/in 3 days" },
  {
    code: "PE",
    description:
      "Ambulance Service from a Physician's office to a Residential/Domiciliary/Custodial facility",
  },
  { code: "PI", description: "Pet tumor init tx strat" },
  { code: "PL", description: "Progressive addition lenses" },
  { code: "PM", description: "Post mortem" },
  { code: "PN", description: "Non-excepted off-campus svc" },
  { code: "PO", description: "Excepted off-campus service" },
  { code: "PS", description: "Pet tumor subsq tx strategy" },
  { code: "PT", description: "Fact sheet" },
  { code: "PT", description: "Clrctal screen to diagn" },
  { code: "Q0", description: "Invest clinical research" },
  { code: "Q1", description: "Routine clinical research" },
  { code: "Q2", description: "HCFA/ORD demo procedure/svc" },
  { code: "Q2", description: "Demo procedure, service" },
  { code: "Q3", description: "Liver donor surgery/services" },
  { code: "Q3", description: "Live donor surgery/services" },
  { code: "Q4", description: "Svc exempt - ordrg/rfrng MD" },
  { code: "Q5", description: "Subst MD svc, recip bill arr" },
  { code: "Q6", description: "Locum tenens MD service" },
  { code: "Q7", description: "One Class A finding" },
  { code: "Q8", description: "Two Class B findings" },
  { code: "Q9", description: "1 Class B &amp; 2 Class C fndngs" },
  { code: "QA", description: "FDA investigational device" },
  { code: "QA", description: "Avg sta day/night o2 &lt; 1 lpm" },
  { code: "QB", description: "MD prvdg svc in rural HPSA" },
  { code: "QB", description: "Avg day/nite o2 &gt; 4 lpm/port" },
  { code: "QC", description: "Single channel monitoring" },
  { code: "QD", description: "Rcrdg/strg in sld st memory" },
  { code: "QE", description: "Prescribed oxygen &lt; 1 LPM" },
  { code: "QF", description: "Prscrbd oxygen &gt;4 LPM &amp; port" },
  { code: "QG", description: "Prescribed oxygen &gt; 4 LPM" },
  { code: "QH", description: "Oxygen cnsrvg dvc w del sys" },
  { code: "QJ", description: "Patient in state/locl custod" },
  { code: "QK", description: "Med dir 2-4 cncrnt anes proc" },
  { code: "QL", description: "Patient died after amb call" },
  { code: "QM", description: "Ambulance arr by provider" },
  { code: "QN", description: "Ambulance furn by provider" },
  { code: "QP", description: "Individually ordered lab tst" },
  {
    code: "QQ",
    description:
      "Ordering professional consulted a qualified clinical decision support mechanism for this service and the related data was provided to the furnishing professional",
  },
  { code: "QR", description: "Item/serv in medicare study" },
  { code: "QR", description: "Avg sta day/night o2 &gt; 4 lpm" },
  { code: "QS", description: "Monitored anesthesia care" },
  { code: "QT", description: "Rcrdg/strg tape analog recdr" },
  { code: "QU", description: "MD providing svc urban HPSA" },
  { code: "QV", description: "Item or service provided" },
  { code: "QW", description: "CLIA waived test" },
  { code: "QX", description: "CRNA svc w/ MD med direction" },
  { code: "QY", description: "Medically directed CRNA" },
  { code: "QZ", description: "CRNA svc w/o med dir by MD" },
  { code: "RA", description: "Replacement of DME item" },
  { code: "RB", description: "Replacement part, DME item" },
  { code: "RC", description: "Right coronary artery" },
  { code: "RD", description: "Drug admin not incident-to" },
  { code: "RE", description: "Furnish full compliance REMS" },
  { code: "RE", description: "RTW and/or EMC" },
  { code: "RI", description: "Ramus intermedius cor artery" },
  { code: "RP", description: "Replacement &amp; repair(DMEPOS)" },
  { code: "RR", description: "Rental (DME)" },
  { code: "RT", description: "Right side" },
  { code: "SA", description: "Nurse practitioner w physici" },
  { code: "SB", description: "Nurse midwife" },
  { code: "SC", description: "Medically necessary serv/sup" },
  { code: "SD", description: "Serv by home infusion RN" },
  { code: "SE", description: "State/fed funded program/ser" },
  { code: "SF", description: "2nd opinion ordered by PRO" },
  { code: "SG", description: "ASC facility service" },
  { code: "SH", description: "2nd concurrent infusion ther" },
  { code: "SJ", description: "3rd concurrent infusion ther" },
  { code: "SK", description: "High risk population" },
  { code: "SL", description: "State supplied vaccine" },
  { code: "SM", description: "Second opinion" },
  { code: "SN", description: "Third opinion" },
  { code: "SP", description: "Specialty Area" },
  { code: "SQ", description: "Item ordered by home health" },
  { code: "SS", description: "HIT in infusion suite" },
  { code: "ST", description: "Related to trauma or injury" },
  { code: "SU", description: "Performed in phys office" },
  { code: "SV", description: "Drugs delivered not used" },
  { code: "SW", description: "Serv by cert diab educator" },
  { code: "SY", description: "Contact w/high-risk pop" },
  { code: "SZ", description: "Habilitative services" },
  { code: "T1", description: "Left foot, second digit" },
  { code: "T2", description: "Left foot, third digit" },
  { code: "T3", description: "Left foot, fourth digit" },
  { code: "T4", description: "Left foot, fifth digit" },
  { code: "T5", description: "Right foot, great toe" },
  { code: "T6", description: "Right foot, second digit" },
  { code: "T7", description: "Right foot, third digit" },
  { code: "T8", description: "Right foot, fourth digit" },
  { code: "T9", description: "Right foot, fifth digit" },
  { code: "TA", description: "Left foot, great toe" },
  {
    code: "TB",
    description:
      "Drug or biological acquired with 340b drug pricing program&nbsp;discount,&nbsp;reported for informational purposes",
  },
  { code: "TC", description: "Technical component" },
  { code: "TD", description: "RN" },
  { code: "TE", description: "LPN/LVN" },
  { code: "TF", description: "Intermediate level of care" },
  { code: "TG", description: "Complex/High Tech level care" },
  { code: "TH", description: "OB TX/Srvcs prenatl/postpart" },
  { code: "TJ", description: "Child/adolescent program gp" },
  { code: "TK", description: "Extra patient or passenger" },
  { code: "TL", description: "Early intervention IFSP" },
  { code: "TM", description: "Individualized ed prgrm(IEP)" },
  { code: "TN", description: "Rural/out of service area" },
  { code: "TP", description: "Med transprt unloaded vehicl" },
  { code: "TQ", description: "BLS by volunteer amb providr" },
  { code: "TR", description: "School-based IEP out of dist" },
  { code: "TS", description: "Follow-up service" },
  { code: "TT", description: "Additional patient" },
  { code: "TU", description: "Overtime payment rate" },
  { code: "TV", description: "Holiday/weekend payment rate" },
  { code: "TW", description: "Back-up equipment" },
  { code: "TX", description: "Treating dr exam to define compensable injury" },
  { code: "U1", description: "M/caid care lev 1 state def" },
  { code: "U2", description: "M/caid care lev 2 state def" },
  { code: "U3", description: "M/caid care lev 3 state def" },
  { code: "U4", description: "M/caid care lev 4 state def" },
  { code: "U5", description: "M/caid care lev 5 state def" },
  { code: "U6", description: "M/caid care lev 6 state def" },
  { code: "U7", description: "M/caid care lev 7 state def" },
  { code: "U8", description: "M/caid care lev 8 state def" },
  { code: "U9", description: "M/caid care lev 9 state def" },
  { code: "UA", description: "M/caid care lev 10 state def" },
  { code: "UB", description: "M/caid care lev 11 state def" },
  { code: "UC", description: "M/caid care lev 12 state def" },
  { code: "UD", description: "M/caid care lev 13 state def" },
  { code: "UE", description: "Used durable med equipment" },
  { code: "UF", description: "Services provided, morning" },
  { code: "UG", description: "Services provided, afternoon" },
  { code: "UH", description: "Services provided, evening" },
  { code: "UJ", description: "Services provided, night" },
  { code: "UK", description: "Svc on behalf client-collat" },
  { code: "UN", description: "Two patients served" },
  { code: "UP", description: "Three patients served" },
  { code: "UQ", description: "Four patients served" },
  { code: "UR", description: "Five patients served" },
  { code: "US", description: "Six or more patients served" },
  { code: "V1", description: "Level of MMI for Treating Doctor" },
  { code: "V1", description: "Demonstration modifier 1" },
  { code: "V2", description: "Level of MMI for Treating Doctor" },
  { code: "V2", description: "Demonstration modifier 2" },
  { code: "V3", description: "Level of MMI for Treating Doctor" },
  { code: "V3", description: "Demonstration modifier 3" },
  { code: "V4", description: "Level of MMI for Treating Doctor" },
  { code: "V5", description: "Level of MMI for Treating Doctor" },
  { code: "V5", description: "Vascular catheter" },
  { code: "V6", description: "Arteriovenous graft" },
  { code: "V7", description: "Arteriovenous fistula" },
  { code: "V8", description: "Infection present" },
  { code: "V9", description: "No infection present" },
  { code: "VP", description: "Aphakic patient" },
  { code: "VR", description: "Review report" },
  { code: "W1", description: "Case Management for Treating Dr" },
  { code: "W5", description: "Dsgnd Dr Exam for Impairment/Attainment of MMI" },
  { code: "W6", description: "Dsgnd Dr Exam for Extent" },
  { code: "W7", description: "Dsgnd Dr Exam for Disability" },
  { code: "W8", description: "Dsgnd Dr Exam for Return to Work" },
  { code: "W9", description: "Dsgnd Dr Exam for Other Similar Issues" },
  { code: "WC", description: "Work Conditioning" },
  { code: "WC", description: "Work Hardening" },
  { code: "WP", description: "Whole Procedure" },
  { code: "X1", description: "Continuous/broad services" },
  { code: "X2", description: "Continuous/focused services" },
  { code: "X3", description: "Episodic/broad services" },
  { code: "X4", description: "Episodic/focused services" },
  {
    code: "X5",
    description: "Diagnostic services requested by another clinician",
  },
  { code: "XE", description: "Separate encounter" },
  { code: "XP", description: "Separate practitioner" },
  { code: "XS", description: "Separate organ/structure" },
  { code: "XU", description: "Unusual separate service" },
  {
    code: "VM",
    description: "Diagnostic services requested by another clinician",
  },
  { code: "ZA", description: "Novartis/sandoz" },
  { code: "ZB", description: "Pfizer/hospira" },
  { code: "ZL", description: "Visit in 16 weeks after LMP" },
  { code: "ZS", description: "Professional and Technical Component" },
  {
    code: "1P",
    description: "PQRI Perf Measure Exclusion due to medical reason",
  },
  {
    code: "2P",
    description: "PQRI Perf Measure Exclusion due to patient reason",
  },
  {
    code: "3P",
    description: "PQRI Perf Measure Exclusion due to system reason",
  },
  { code: "8P", description: "Action not performed, Reason NOS" },
];

export const expressFeeSchedule = [
  {
    name: "standard"
  },
  {
    name: "self pay"
  }
]