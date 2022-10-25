export const textMacrosData = [
  {
    expansion:
      "{{Patient name}} is a {{age}} year old {{profession}} who {{say something about the patient.}} {{Patient name}} a history of {{summary sentence of chronic medical conditions, recent history}} \r\n{{Patient name}} is seen today by Livio Provider for {{symptom of concern.}}\r\n\r\nDisposition:{{Call EMS now|Go to ED Now|Go to UCC|Go to Primary Clinic Now|Care managed at home}}\r\n\r\nFollow Up:{{RNCC phone call follow-up|Follow-up visit planned with Palliative APRN|Follow-up visit planned with Palliative SW|Follow-up planned with Primary Care|Follow-up planned with specialty care}} \r\n\r\n",
    section: "AssessmentAndPlan",
    shortcut: ".PCfocusedvisita/p",
  },
  {
    expansion:
      "{{Patient name}} is an established patient that agreed to a {{Face-to-Face|Hybrid|Telephone|Video}} visit by Livio Health Group for {{symptom of concern}}. {{Patient name}} presents their own story today with additional information provided by their {{son|daughter|granddaughter|grandson|sibling|friend|caregiver}}, {{Full name}}.\r\n\r\nStart time {{24 hour clock}}    Stop time: {{24 our clock}}\r\nProvider located: {{Harding office|at Home|}}\r\nPatient located: Patient Home address.",
    section: "HPI",
    shortcut: ".PCfocusedvisithpi",
  },
  {
    expansion: "<p>I'm an anxiety note, macro me<br></p>",
    providers: "glisch",
    shortcut: ".anxiety",
  },
  {
    expansion: "f",
    providers: "cogletree1",
    shortcut: ".followupclear",
  },
  {
    expansion: "<p>I'm a macro&nbsp;please work<br></p>",
    providers: "glisch",
    shortcut: ".hello",
  },
  {
    expansion:
      "Date: {{DATE}} <br>\r\nDate/Time: {{DATETIME}} <br>\r\nTime: {{TIME}} <br>\r\n;lakjds;lfkajs d;lfkja ;lsdkjf ;laskjdf",
    providers: "sdow2",
    shortcut: "1111",
  },
  {
    expansion: "<p>{{DATE}}</p>",
    section: "AssessmentAndPlan",
    shortcut: "1234",
  },
  {
    expansion: "<p>{{DATE}}</p>",
    providers: "sdow2",
    shortcut: "1235",
  },
  {
    expansion: "<p>{{DATE}}</p>",
    providers: "sdow2",
    shortcut: "1236",
  },
  {
    expansion: "<p>{{DATE}}</p>",
    providers: "sdow2",
    shortcut: "1237",
  },
  {
    expansion: "<p>{{TIME}}</p>",
    providers: "sdow2",
    shortcut: "2222",
  },
  {
    expansion: "<p>{{DATETIME}}</p>",
    providers: "sdow2",
    shortcut: "3333",
  },
  {
    expansion: "<p>{{DATE}}</p>",
    providers: "sdow2",
    shortcut: "5555",
  },
  {
    expansion: "<p>{{DATE}}</p>",
    providers: "sdow2",
    shortcut: "6666",
  },
  {
    expansion: "<p>{{TIME}}</p>",
    providers: "sdow2",
    shortcut: "8888",
  },
  {
    expansion: "<p>{{DATE}}</p>",
    providers: "sdow2",
    shortcut: "999",
  },
  {
    expansion:
      '<p><span style="white-space: nowrap;"></span></p><p><span style="white-space: nowrap;">{{DATE}}</span></p><p></p>',
    providers: "sdow2",
    shortcut: "9999",
  },
  {
    expansion: "Your blood sugar test results look normal.",
    providers: "cbulkley",
    section: "PatientNote",
    shortcut: "A1c",
  },
  {
    expansion: "ADHD is out of control.",
    providers: "ablum",
    section: "AssessmentAndPlan",
    shortcut: "ADHDno",
  },
  {
    expansion: "ADHD is well controlled with medication.",
    providers: "ablum",
    section: "AssessmentAndPlan",
    shortcut: "ADHDwc",
  },
  {
    expansion: "Remind patient to bring in medication to visit",
    providers: "adurso",
    section: "PatientCase",
    shortcut: "ADTESTing",
  },
  {
    expansion:
      "<br> Patient advised on appropriate use of inhalers and avoid environmental irritants to which one is sensitive. No smoking and avoid second hand smoking also. Regular 30 mts exercise daily. </br>",
    providers: "dtester2",
    section: "AssessmentAndPlan",
    shortcut: "Asthma",
  },
  {
    expansion:
      "You test results came back as normal. If you have any further questions you can reach out to the practice.",
    section: "PatientNote",
    shortcut: "Blood Screening",
  },
  {
    expansion:
      "Your blood work results have come back abnormal, please contact the office to schedule a follow up appointment at your earliest convenience.",
    section: "PatientNote",
    shortcut: "Bloodwork",
  },
  {
    expansion:
      "The results of your Bone Density Scan have returned. The results fell within normal ranges and no additional testing is needed at this time. If you have any questions regarding this test please contact our office.",
    providers: "ahoward1",
    section: "PatientNote",
    shortcut: "Bone Density Normal",
  },
  {
    expansion:
      "The results of your CBC blood work have returned from the lab.  The results fell within normal ranges and no additional testing is needed at this time.  If you have any questions regarding this test please contact our office.",
    section: "PatientNote",
    shortcut: "CBC Normal",
  },
  {
    expansion: "This is a test.",
    section: "PatientNote",
    shortcut: "CBC Review",
  },
  {
    expansion: "TEST TEST TEST",
    section: "PatientNote",
    shortcut: "CBC normalllll",
  },
  {
    expansion:
      "<p>ice  This care management plan should be reviewed every ___ days &lt;br&gt;<br>&lt;br&gt;<br>Time Spent: &lt;br&gt;<br>    {{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ &lt;br&gt;<br>    {{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ &lt;br&gt;<br>    {{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ &lt;br&gt;<br>    {{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ &lt;br&gt;</p>",
    providers: "rtolani",
    shortcut: "CHECK",
  },
  {
    expansion:
      "This care management plan should be reviewed every ___ days <br>\r\n<br>\r\nTime Spent: <br>\r\n\t{{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ <br>\r\n\t{{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ <br>\r\n\t{{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ <br>\r\n\t{{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ <br>",
    section: "AssessmentAndPlan",
    shortcut: "Care Management Assessment",
  },
  {
    expansion: "<p>Care Management Assessment</p>",
    providers: "kneuberger",
    shortcut: "CareManagementAssessment",
  },
  {
    expansion:
      "Patient presents with {{chest*|arm|back|jaw}} pain with atypical features. Given the history, exam findings and {{his*|her}} risk factors, I {{feel*|do not feel}} additional investigation is warranted. I have made arrangements for an {{exercise stress test*|echocardiogram|exercise stress test and echocardiogram}} in the near future. Appropriate labwork {{has*|has not}} been performed recently, therefore I {{have not*|have}} made arrangements for further testing. I have {{made no*|made the following}} adjustments to the present medical regimen.",
    section: "AssessmentAndPlan",
    shortcut: "Chest Pain, Atypical",
  },
  {
    expansion:
      "Patient presents with {{chest*|arm|back|jaw}} pain typical of angina. Given the history, exam findings and {{his*|her}} risk factors, I {{feel*|do not feel}} additional investigation is warranted. I have made arrangements for an {{exercise stress test*|echocardiogram|exercise stress test and echocardiogram|cardiac catheterization}} in the near future. Appropriate labwork {{has|has not*}} been preformed recently, therefore I {{have not|have*}} made arrangements for further testing. I have asked {{him*|her}} to curtail exercise and activities until our investigation is complete. I have {{made no|made the following*}} adjustments to the present medical regimen.",
    section: "AssessmentAndPlan",
    shortcut: "Chest Pain, Typical",
  },
  {
    expansion:
      "The result of your recent Cholesterol test has returned from the lab.  Your levels were within normal ranges for both your HDL and LDL.  If you have any additional questions please contact our office.",
    providers:
      "ahoward1\tcach\tksopata\tdharvey3\tssimpson7\tdfenick\tcbulkley1",
    section: "PatientNote",
    shortcut: "Cholesterol Normal",
  },
  {
    expansion: "This was created for the athenaClassroom",
    section: "PatientNote",
    shortcut: "Classroom Testing",
  },
  {
    expansion: "Your labs were clear, everything looks OK!",
    providers: "bgrant6",
    shortcut: "Clear",
  },
  {
    expansion: "Gurrrrrl. You're gonna be a mother!!",
    section: "PatientNote",
    shortcut: "Congratulations! You're Pregnant!",
  },
  {
    expansion: "All my exes live in texas",
    providers: "cbulkley",
    section: "PatientNote",
    shortcut: "Dallas testing",
  },
  {
    expansion:
      "<b> Where is there always money {{in the mattress | in the banana stand* | selling beanie babies on eBay}} </b>\r\n<br>\r\n<br>\r\n<b> My favorite mode of transportation is__</b>\r\n<br>\r\n<br>\r\n<b><i> I do not understand the question and I won't respond to it. </b></i>",
    section: "AssessmentAndPlan",
    shortcut: "Dr. Sarro's Assessment template",
  },
  {
    expansion: "<p><br></p>",
    providers: "kneuberger",
    shortcut: "Dr.Sarro'sAssessmenttemplate",
  },
  {
    expansion: "Your EKG test results look normal.",
    section: "PatientNote",
    shortcut: "EKG",
  },
  {
    expansion:
      "<b>Electrocardiogram Interpretation:</b><br><br>{{The electrocardiogram is normal|The patient's abnormal electrocardiogram is a normal variant and not representative of structural heart disease. No further you cardiac testing or treatment is necessary.|The electrocardiogram shows sinus rhythm with leftward axis.There is a borderline incomplete RBBB pattern.}}<br><br>",
    section: "PatientNote",
    shortcut: "EKG Unstructured",
  },
  {
    expansion:
      "Pt should continue exercise regimen and monitor blood pressure.",
    providers: "abricker1",
    section: "AssessmentAndPlan",
    shortcut: "Exercise/ BP",
  },
  {
    expansion: "Pt is a 35 y/o male with x y z conditions here for checkup",
    providers: "bbrady7",
    section: "AssessmentAndPlan",
    shortcut: "General Male Adult Exam",
  },
  {
    expansion:
      "Please call the office to schedule an appointment to discuss your result.",
    section: "PatientNote",
    shortcut: "Generic Abnormal",
  },
  {
    expansion:
      "You lab results have come back within normal levels. If you want further clarification, do not hesitate to call our office between 8-5 Monday through Friday.",
    section: "PatientNote",
    shortcut: "Generic Lab Results",
  },
  {
    expansion:
      "These results appear to be within normal limits.  Please call the office if you have any questions.\r\nThank you.",
    section: "PatientNote",
    shortcut: "Generic normal",
  },
  {
    expansion:
      "It seems like everything is Ok and good. Nothing to worry about.",
    providers: "dgammell",
    shortcut: "Good",
  },
  {
    expansion:
      "The headaches are doing {{better|about the same|worse}} than when last seen.  The patient has been taking {{Topamax|Depakote|Inderal|Elavil}} to prevent the headaches. Frequency of headaches is approximately {{every|once|twice|three times|more than three times}}  a {{day|week|month}}.  There {{has|have not}} been possible side effects of the medication. The abortive medication,\r\n{{Maxalt|Treximet|Imitrex|Relpax|Axert|Amerge}} {{does successfully|fails to}} get rid of the headache in {{less than thirty minutes|30-60 minutes|after an hour}}. Triggering\r\nfactors remain {{stress|menstrual cycle|foods}} {{and stress|and menstrual cycle|and\r\nfoods}}.  Analgesic intake is {{once|twice|three times|more than three times}} in a\r\n{{day|week|month}}.",
    section: "AssessmentAndPlan",
    shortcut: "Headache Follow Up",
  },
  {
    expansion:
      "Patients blood pressure is {{well controlled*|not well controlled}} on present medical therapy. {{He*|She}} is {{tolerating, without difficulty*|having side effects with}} the current medications. I have made {{no*|the following}} changes to our current regimen.",
    section: "AssessmentAndPlan",
    shortcut: "Hypertension Follow Up",
  },
  {
    expansion: "Make sure to monitor your blood pressure on a daily basis",
    providers: "abricker1",
    section: "PatientInstructions",
    shortcut: "Hypertension reminder",
  },
  {
    expansion:
      "The results indicate that you need practice, I'm gonna let you borrow some sauce, since I keep excra dripping off me.",
    section: "PatientNote",
    shortcut: "Hyposaucetion",
  },
  {
    expansion: "You're results are in. The results from your lab are normal.",
    section: "PatientNote",
    shortcut: "Lab Result",
  },
  {
    expansion:
      "Your lab results are normal. If you have any questions contact the practice",
    section: "PatientNote",
    shortcut: "Lab Test NOrmal",
  },
  {
    expansion: "Stop eating bacon burger dogs and get some exercise.",
    section: "PatientNote",
    shortcut: "Lipid Panel Abnormal",
  },
  {
    expansion:
      "Your lipid panel appears to be within normal limits. Please continue to follow the diet and exercise plan we outlined at your last visit.",
    section: "PatientNote",
    shortcut: "Lipid Panel Normal",
  },
  {
    expansion:
      "Your lipid panel appears to be within normal limits.  Please continue to follow the diet and exercise plan we outlined at your last visit.",
    section: "PatientNote",
    shortcut: "Lipid Panel WNL",
  },
  {
    expansion: "Hello California",
    providers: "abricker1",
    section: "PatientNote",
    shortcut: "Los Angeles",
  },
  {
    expansion:
      "\t\tThis ultrasound falls with within the normal range. There is no follow-up needed at this time.",
    providers: "tpressman",
    section: "PatientNote",
    shortcut: "MOGA_normal_us",
  },
  {
    expansion:
      "<b>Lower Extremity Functional Questionnaire</b><br>\r\n<p>\r\nPlease choose ONE in each section which most closely describes your problem<br>\r\nWalking {{0. Symptoms do not prevent me walking any distance|1. Symptoms prevent me walking more than 1 mile|2. Symptoms prevent me walking more than ½ mile|3. Symptoms prevent me walking more than ¼ mile|4. I can only walk using a stick or crutches|5. I am in bed most of the time and have to crawl to the toilet}}<br>\r\nCarrying/Lifting {{0. I can carry heavy loads without increased symptoms|1. I can carry heavy loads with some increased symptoms|2. I cannot carry heavy loads overhead, but I can manage if they are positioned close to my trunk|3. I cannot carry heavy loads, but I can manage light to medium loads if they are positioned close to my trunk|4. I can carry very light weights with some increased symptoms|5. I cannot lift or carry anything at all}}<br>\r\nStairs {{0. I can walk stairs comfortably without a rail|1. I can walk stairs comfortably, but with a crutch, cane or rail|2. I can walk more than one flight of stairs, but with increased symptoms|3. I can walk less than one flight of stairs|4. I can manage only a single step or curb|5. I am unable to manage even a step or curb}}<br>\r\nUneven Ground {{0. I can walk normally on uneven ground without loss of balance or using a cane or crutches|1. I can walk on uneven ground, but with loss of balance or with the use of a cane or crutches|2. I have to walk very carefully on uneven ground without using a cane or crutches|3. I have to walk very carefully on uneven ground and require physical assistance to manage it|4. I am unable to walk on uneven ground|5.xxxxxxxxxxxxxxx}}<br>\r\nDriving {{0. I can drive my car or travel without any extra symptoms|1. I can drive my car or travel as long as I want with slight symptoms|2. I can drive my car or travel as long as I want with moderate symptoms|3. I cannot drive my car or travel as long as I want because of moderate symptoms|4. I can hardly drive at all or travel because of severe symptoms|5. I cannot drive my car or travel at all}}<br>\r\nStanding {{0. I can stand as long as I want without increased symptoms|1. I can stand as long as I want, but it gives me extra symptoms|2. Symptoms prevent me from standing for more than 1 hour|3. Symptoms prevent me from standing for more than 30 minutes|4. Symptoms prevent me from standing for more than 10 minutes|5. Symptoms prevent me from standing at all}}<br>\r\nSquatting {{0. I can squat fully without the use of my arms for support|1. I can squat fully, but with symptoms or using my arms for support|2. I can squat ¾ of my normal depth, but less than fully|3. I can squat ½ of my normal depth, but less than ¾|4. I can squat ¼ of my normal depth, but less than ½|5. I am unable to squat any distance due to symptoms}}<br>\r\nSitting {{0. I can sit in any chair as long as I like|1. I can only sit in my favorite chair as long as I like|2. My symptoms prevent me sitting more than 1 hour|3. My symptoms prevent me sitting more than 30 minutes|4. My symptoms revent me sitting more than 10 minutes|5. My symptoms prevent me from sitting at all}}<br>\r\nRecreation/Sports {{0. I am able to engage in all my recreational/sports activities without increased symptoms|1. I am able to engage in all my recreational/sports activities with some increased symptoms|2. I am able to engage in most, but not all of my usual recreational/sports activities because of increased symptoms|3.\tI am able to engage in a few of my usual recreational/sports activities because of my increased symptoms|4. I can hardly do any recreational/sports activities because of increased symptoms|5. I cannot do any recreational/sports activities at all}}<br>\r\nScore: _____/45 =  ______ x 100 = _______% impairment<br>\r\nSeverity Modifier:  CH = 0% impairment     CI  =  1-19%<br>\r\n      CJ  =  20 – 39%      CK  = 40 – 59%      CL  =  60 – 79%<br>\r\n      CM =  80 – 99%      CN  =  100% impaired<br>",
    section: "AssessmentAndPlan",
    shortcut: "Medicare Lower extremity Functional Questionnaire",
  },
  {
    expansion:
      "<b>Medicare Neck Functional Questionnaire</b><br>\r\nPlease choose ONE option<br>\r\n<p>Pain Intensity {{0. I have no pain at the moment|1. The pain is very mild at the moment|2. The pain comes and goes and is moderate|3. The pain is fairly severe at the moment|4. The pain is very severe at the moment|5. The pain is the worst imaginable at the moment}}<br>\r\nSleeping {{0. I have no trouble sleeping|1. My sleep is slightly disturbed (less than 1 hour sleepless)|2. My sleep is mildly disturbed (1-2 hours sleepless)|3. My sleep is completely disturbed (5-7 hours sleepless)|4. My sleep is moderately disturbed (2-3 hours sleepless)|\r\n5. My sleep is greatly disturbed (3-5 hours sleepless)}}<br>\r\nReading {{0. I can read as much as I want with no neck pain|1. I can read as much as I want with slight neck pain|2. I can read as much as I want with moderate neck pain|3. I cannot read at all because of neck pain|4. I cannot read as much as I want because of moderate neck pain|\r\n5. I can hardly read at all because of severe neck pain}}<br>\r\nConcentration {{0. I can concentrate fully when I want with no difficulty|1. I can concentrate fully when I want with slight difficulty|2. I have a fair degree of difficulty concentrating when I want|3. I cannot concentrate at all|4. I have a lot of difficulty concentrating when I want|5. I have a great deal of difficulty concentrating when I want}}<br>\r\nWork {{0. I can do as much work as I want|1. I can only do my usual work but no more|2. I can only do most of my usual work but no more|3. I cannot do any work at all|4. I cannot do my usual work|5. I can hardly do any work at all}}<br>\r\nPersonal Care {{0. I can look after myself normally without causing extra pain|1. I can look after myself normally but it causes extra pain|2. It is painful to look after myself and I am slow and careful|3. I need some help but I manage most of my personal care|4. I need help every day in most aspects of self-care|5. I do not get dressed; I wash with difficulty and stay in bed}}<br>\r\nLifting {{0. I can lift heavy weights without extra pain|1. I can lift heavy weights but it causes extra pain|2. I can only lift very light weights|3. Pain prevents me from lifting heavy weights off the floor, but I can manage if they are conveniently positioned (e.g., on a table)|\r\n4. Pain prevents me from lifting heavy weights off the floor, but I can manage light to medium weights if they are conveniently positioned|5. I cannot lift or carry anything at all}}<br>\r\nDriving {{0. I can drive my car without any neck pain|1. I can drive my car as long as I want with slight neck pain|2. I can drive my car as long as I want with moderate neck pain|3. I cannot drive my car at all because of neck pain|4. I cannot drive my car as long as I want because of moderate neck pain|5. I can hardly drive at all because of severe neck pain}}<br>\r\nRecreation {{0. I am able to engage in all my recreation activities without neck pain|1. I am able to engage in all my usual recreation activities with some neck pain|2. I cannot do any recreation activities at all|3. I am only able to engage in a few of my usual recreation activities because of neck pain|4. I can hardly do any recreation activities because of neck pain|\r\n5. I am able to engage in most but not all my usual recreation activities because of neck pain}}<br>\r\nHeadaches {{0. I have no headaches at all|1. I have slight headaches which come infrequently|2. I have moderate headaches which come infrequently|3. I have headaches almost all the time|4. I have moderate headaches which come frequently|5. I have severe headaches which come frequently}}<br>\r\nScore:____/45=____*100=_____%impairment<br>\r\nSeverity Modifier: CH=0% impairement  CI=1-19%<br>\r\nCJ=20-39%  CK 40-59%  CL= 60-79%<br>\r\nCM=80-99%  CN= 100% impaired",
    section: "AssessmentAndPlan",
    shortcut: "Medicare Neck Functional Questionnaire",
  },
  {
    expansion:
      "<b> Medicare Upper Extremity Functional Questionnaire<br></b>\r\n<p>Please choose ONE in each section which most closely describes your problem<br>\r\n<p>Work {{0. I can do as much work as I want to|1. I can only do my usual work, but no more|2. I can do most of my usual work, but no more|3. I cannot do my usual work|4. I can hardly do any work at all ( only light duty)|5. I cannot do any work at all}}<br>\r\nPersonal Care {{0. I can manage all personal care without symptoms|1. I can manage all personal care with some increased symptoms|2. Personal care requires slow, concese movements due to increased symptoms|3. I need help to manage some personal care|4. I need help to manage all personal care|5. I cannot manage any personal care}}<br>\r\nSleeping {{0. I have no trouble sleeping| 1. My sleep is mildly disturbed (less than 1 hr. sleepless|2. My sleep is mildly disturbed (1-2 hrs. sleepless)|3. My sleep is moderately disturbed (2-3 hrs. sleepless)|4. My sleep is greatly disturbed (3-5 hrs sleepless|5. My sleep is completely disturbed (5-7 hrs. sleepless}}<br>\r\nRecreation/Sports  {{0. I am able to engage in all my recreational/sports activities without increased symptoms|I. I am able to engage in all my recreational/sports activities with some increased symptoms|2. I am able to engage in most, but not all of my usual\r\nrecreationa l/sports activities because of increased symptoms|3. I am able to engage in a few of my usual recreational/sports activities because of my increased symptoms|4. I can hardly do any recreational/spons act ivities because of increased symptoms|5. I cannot do any recreational/sports activities at all}}<br>\r\nCarrying/Lifting  {{0. I can carry heavy loads without increased symptoms|I. I can carry heavy loads with some increased symptoms|2. I cannot carry heavy loads overhead, but I can manage if they are positioned close to my trunk|3. I cannot carry heavy loads, but I can manage l ight to medium loads if they are positioned close to my trunk|4. I can carry very light weights with some increased symptoms|5. I cannot lift or carry anything at all}}<br>\r\nDressing {{0. I can put on a shin or blouse with some increased symptoms|I. It is painfu l to put on a shirt or blouse and I am slow and careful|2. I need help but I manage most of my shirt or blouse dressing|3. I need help in most aspects of putting on my shin or blouse|4. I cannot put on a shirt or blouse at all}}<br>\r\nReaching {{0. I can reach to a high shelf to place an empty cup without increased symptoms|I .  I can reach to a high shelf to place an empty cup with some increased symptoms|2. I can reach to a high shelf to place an empty cup with a moderate increase in symptoms|3. I cannot reach to a high shelf to place an empty cup, but I can reach up to a lower shelf without increased symptoms|4. l cannot reach up to a lower shelf without increased symptoms, but I can reach counter height to place an empty cup|5. l cannot reach my hand above waist level without increased symptoms}}<br>\r\nDriving {{0. I can drive my car or travel without any extra symptoms|I. I can drive my car or travel as long as I want with slight symptoms|2. I can drive my car or travel as long as I want with moderate symptoms|3. I cannot drive my car or travel as long as I want because of moderate symptoms|4. I can hardly drive at all or travel because of severe symptoms|5. I cannot drive my car or travel at all}}<br>\r\nScore:\t/45 =\tx 100 =\t% impairment  <br>\r\nSeverity Modifier: CH = 0% impairment\tCl =  1-19%<br>CJ=20-39%  CK=40-59%  CL=60-79%<br>CM 80-99%  CN= 100% impaired",
    section: "AssessmentAndPlan",
    shortcut: "Medicare Upper Extremity Functional Questionnaire",
  },
  {
    expansion:
      "The results of your lab work have returned from the lab. The results fell within normal ranges and no additional testing is needed at this time. If you have any questions regarding this test please contact our office.",
    section: "PatientNote",
    shortcut: "Normal",
  },
  {
    expansion: "The results of your test were great!",
    section: "PatientNote",
    shortcut: "Normal Test",
  },
  {
    expansion:
      "Your lipid panel appears to be within normal limits.  Please continue to follow the diet and exercise routine we outlined at your last visit.",
    section: "PatientNote",
    shortcut: "Normal lipid panel",
  },
  {
    expansion: "The is a great notation!",
    section: "PatientNote",
    shortcut: "Nottingham",
  },
  {
    expansion:
      "Even thought your levels are slightly out of range - we expect this.  See you next time!",
    section: "PatientNote",
    shortcut: "Out of Range",
  },
  {
    expansion:
      "Your PSA screening produced a normal result.  Please click the view results button to see your values.  Given your medical history, we will conduct another screening in one year.  Please contact our office if you have any questions.",
    section: "PatientNote",
    shortcut: "PSA Normal",
  },
  {
    expansion: "test test",
    section: "PatientNote",
    shortcut: "Patient Note Test",
  },
  {
    expansion:
      "Patient remains in persistent atrial {{fibrillation*|flutter}} on a rate control and anticoagulation strategy. {{He*|She}} is {{well*|marginally|poorly}} compensated {{without*|with}} limiting dyspnea and {{unaware*|aware}} of palpitations. Rate control {{is*|is not}} appropriate on present therapy. I have made arrangement for {{no*|the following}} additional testing at this time. I have made {{no*|the following}} changes to the current regimen.",
    section: "AssessmentAndPlan",
    shortcut: "Persistent Atrial Fibrillation Follow Up",
  },
  {
    expansion: "Testing..",
    section: "PatientNote",
    shortcut: "Rebecca's Template",
  },
  {
    expansion:
      "Rest until you feel better. To prevent dehydration drink plenty of water. Thank you",
    providers: "rjohnson92",
    shortcut: "RestHydrate",
  },
  {
    expansion:
      "Rest until you feel better. To prevent dehydration drink plenty of water.",
    providers: "rlumpkin",
    shortcut: "RestHydrate",
  },
  {
    expansion:
      "<b>Risk Factors:</b><br>\r\nSmoker {{Y|N*}}<br>\r\nObesity {{Y|N*}}<br>\r\nSubstance Abuse {{Y|N*}}<br>\r\n<br>\r\n<b>Patient Support/Psychosocial</b><br>\r\nLimited or no family/caregiver support {{Y|N*}}<br>\r\nLack of transportation {{Y|N*}}<br>\r\nLack of financial resources {{Y|N*}}<br>\r\n<br>\r\n<b>Functional Status:</b><br>\r\nModerate or severely impaired {{Y|N*}}<br>\r\nHigh-risk for falls (history of >=1 fall in past year) {{Y|N*}}<br>\r\n<br>\r\n<b>Chronic Conditions:</b><br>\r\nHeart Failure {{Y|N*}}<br>\r\nCOPD {{Y|N*}}<br>\r\nCoronary Artery Disease {{Y|N*}}<br>\r\nHypertension {{Y|N*}}<br>\r\nDiabetes {{Y|N*}}<br>\r\nAsthma (chronic persistent) {{Y|N*}}<br>\r\nDepression {{Y|N*}}<br>\r\nCancer {{Y|N*}}<br>\r\nESRD/dialysis {{Y|N*}}<br>\r\nOther (does this patient have an advanced or progressive serious illness not listed above?) Please Explain: <br>\r\n<br>\r\n<br>\r\n<b>Polypharmacy/Medications:</b><br>\r\n>=5 meds (oral and/or injectables) {{Y|N*}}<br>\r\nPoor medication adherence {{Y|N*}}<br>\r\n<br>\r\n<b>Utilization:</b><br>\r\n<br>\r\nHospital and/or rehab facility admissions <br>\r\n1-3 admissions in past 12 months {{Y|N*}}<br>\r\n>3 admissions in past 12 months {{Y|N*}}<br>\r\nICU stay in past 12 months {{Y|N*}}<br>\r\nReadmit within 30 days {{Y|N*}}<br>\r\n<br>\r\nED and/or UCC visits<br>\r\nFrequent ED visit (>2 ED and/or UCC visits within the past 6 months){{Y|N*}}<br>\r\n<br>\r\n<b>Other:</b><br>\r\nYou wouldn't be surprised if this patient died in the next year {{Y|N*}}<br>\r\nAppropriate for hospice {{Y|N*}}<br>\r\n<br>\r\nComments:<br>\r\n<br>\r\n<br>\r\n<br>\r\n<b>Accepted into Complex Care Management Program</b> {{Y|N*}}<br>\r\nDisciplines:<br>\r\nRN Care Manager {{Y|N*}}<br>\r\nSocial Worker {{Y|N*}}<br>\r\nClinical Pharmacist {{Y|N*}}<br>\r\nCertified Diabetic Educator {{Y|N*}}<br>\r\n<br>\r\n<b>Not eligible for Complex Care Management</b> {{Y|N*}}<br>\r\nReferred to Embedded Care Manager/Clinical Care Team {{Y|N*}}<br>\r\n<br>\r\n<b>Referrals to:</b><br>\r\nBehavioral Health {{Y|N*}}<br>\r\nPalliative Care {{Y|N*}}<br>\r\nHome Care Services (nursing, home health aide services, PT and/or OT) {{Y|N*}}<br>\r\nSAGE GPS Services {{Y|N*}}<br>\r\nSAGE Pilot {{Y|N*}}<br>",
    section: "AssessmentAndPlan",
    shortcut: "Risk Assessment",
  },
  {
    expansion:
      "Discussed potential triggers of acne rosacea including sun, wind, cold, heat exposure, food exacerbators such as alcohol, red wine, spicy foods, hot temperature foods Advised patient to try to identify specific triggers of rosacea flares and emphasized the importance of long term daily sunscreen use to prevent long term progression of rosacea as well as acute flares.",
    section: "AssessmentAndPlan",
    shortcut: "Rosacea",
  },
  {
    expansion:
      "The results of ye Scurvy test have come back negative.  Toughen up and eat more spinach...arrrrggh!",
    providers: "abricker1",
    section: "PatientNote",
    shortcut: "SCURVY",
  },
  {
    expansion:
      "This Lab Looks Terrible You Could Die Before You Make It Into The Office. Sorry Bud.",
    providers: "cgill12",
    shortcut: "Sorry",
  },
  {
    expansion: "Today is Thursday - and I think it might rain",
    providers: "abricker1",
    section: "PatientNote",
    shortcut: "Summit Medical",
  },
  {
    expansion: "You've got it. So sad",
    section: "PatientNote",
    shortcut: "Syphillis",
  },
  {
    expansion: "Test",
    providers: "ksopata",
    section: "PatientNote",
    shortcut: "TEST 1",
  },
  {
    expansion: "Your test results were normal.",
    providers: "cach\tksopata\tdharvey3\tdfenick\tcbulkley1",
    section: "PatientNote",
    shortcut: "Test",
  },
  {
    expansion: "This is a test assessment template",
    providers: "cach",
    section: "AssessmentAndPlan",
    shortcut: "Test 1",
  },
  {
    expansion: "Your lab results are normal",
    section: "PatientNote",
    shortcut: "Test Lab",
  },
  {
    expansion:
      "This is a test template to show how all of the coding works.<br>\r\nSo this will be line 2.<br>\r\nThis is what should be line 3.\r\n\r\nThis is how you make a dropdown: {{choice1|choice 2|choice 3}}<br>\r\nThis is how you make a dropdown with a default option: {{choice 1*|choice 2|choice 3}}.<br>\r\n<br>\r\n<b>This is a bold statement</b>\r\n<i>This is italicized</i>",
    providers: "dfenick",
    section: "AssessmentAndPlan",
    shortcut: "Test Template Classroom",
  },
  {
    expansion: "<b> Test",
    section: "AssessmentAndPlan",
    shortcut: "Test44",
  },
  {
    expansion: "You are good!",
    providers: "abricker1",
    section: "PatientNote",
    shortcut: "Testing",
  },
  {
    expansion: "Testing the system for slownees",
    providers: "abricker1",
    section: "PatientNote",
    shortcut: "Testing1",
  },
  {
    expansion:
      "The results of your Urinalysis have returned from the lab.  The results fell within normal ranges and no additional testing is needed at this time.  If you have any questions regarding this test please contact our office.",
    section: "PatientNote",
    shortcut: "Urinalysis Normal",
  },
  {
    expansion: "Be sure to drink more water with meds.",
    providers: "rlumpkin",
    shortcut: "WaterwithMeds",
  },
  {
    expansion:
      "Your Lipid Profile results have returned.  The results fall within normal ranges and no additional testing is needed at this time.  If you have any questions regarding this test, please contact our office.",
    section: "PatientNote",
    shortcut: "[SPG] Lipid Profile - Normal",
  },
  {
    expansion:
      "Your Lipid Profile results have returned.  Please contact our office to schedule an appointment to discuss these results with your provider at your earliest convenience.",
    section: "PatientNote",
    shortcut: "[SPG] Lipid Profile - abnormal",
  },
  {
    expansion: "testhign",
    shortcut: "asasdf",
  },
  {
    expansion: "testhign",
    providers: "bwilliams114",
    shortcut: "asasdf",
  },
  {
    expansion:
      "This care management plan should be reviewed every ___ days <br>\r\n<br>\r\nTime Spent: <br>\r\n\t{{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ <br>\r\n\t{{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ <br>\r\n\t{{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ <br>\r\n\t{{ *| 5|10|15|20|25|30|35|40|45|50|55|60}} minutes were spent on care management and coordination of care by: ______ <br>",
    providers: "rtolani",
    section: "DiscussionNote",
    shortcut: "asasdf",
  },
  {
    expansion: "<p><br></p>",
    providers: "kneuberger",
    shortcut: "caremanagement",
  },
  {
    expansion: "Your labs were clear",
    providers: "asanders46",
    shortcut: "clear",
  },
  {
    expansion:
      "Patient has ear pain. &nbsp;should use ear drops as directed and return in a week if necessary.&nbsp;",
    providers: "abricker1",
    section: "AssessmentAndPlan",
    shortcut: "ear pain",
  },
  {
    expansion:
      "Patient has ear pain. &nbsp;should use ear drops as directed and return in a week if necessary.&nbsp;",
    providers: "abricker1",
    section: "AssessmentAndPlan",
    shortcut: "ear pain 2",
  },
  {
    expansion:
      "Lab results clear. Please see front office for biannual followups",
    providers: "cogletree1",
    shortcut: "followupclear",
  },
  {
    expansion: "ice and elevate",
    providers: "lwebb3",
    section: "PatientInstructions",
    shortcut: "ice and elevate",
  },
  {
    expansion: "sdfgsdfg sdfg df<div>sdfg</div><div>sdf</div><div>g sdf</div>",
    providers: "rramanagupta",
    shortcut: "meaninglessmacro",
  },
  {
    expansion: "sdfgsdfg sdfg df<div>sdfg</div><div>sdf</div><div>g sdf</div>",
    providers: "eblair6",
    shortcut: "meaninglessmacro",
  },
  {
    expansion: "Your brain is missing, please come into the office ASAP.",
    section: "PatientNote",
    shortcut: "missing brain",
  },
  {
    expansion: "this is the note that will appear in the portal",
    providers: "emchale",
    section: "PatientNote",
    shortcut: "normal",
  },
  {
    expansion:
      "\t\tLab results within normal range. No further action needed at this time.",
    providers: "tpressman",
    section: "PatientNote",
    shortcut: "normal_lab_TP",
  },
  {
    expansion: "test looks normal",
    providers: "ksopata",
    section: "PatientNote",
    shortcut: "pap smear normal",
  },
  {
    expansion: "advised to stay off feet for next six weekstestss",
    providers: "lwebb3",
    section: "DiscussionNote",
    shortcut: "rest ankle",
  },
  {
    expansion: "test test test satya",
    providers: "sgunnam",
    shortcut: "satyatest",
  },
  {
    expansion: "___<br>test {{none*|one|two}}",
    section: "AssessmentAndPlan",
    shortcut: "test",
  },
  {
    expansion: "Test {{1|2|3*}}",
    providers: "mbeers3",
    shortcut: "test",
  },
  {
    expansion: "test 3/16",
    section: "PatientNote",
    shortcut: "test-KC",
  },
];
