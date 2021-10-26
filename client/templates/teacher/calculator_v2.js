import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import { TAPi18n } from "meteor/tap:i18n";
import { CurrentLanguage } from "../../../lib/language/current-language";

import "./calculator_v2.html";
import { get } from "core-js/core/dict";

const FOREIGNER = 45000;
const EXPERIENCE = 2500;

const PROLONGATION = 30000;

const GENERAL_DIRECTOR = 100000;
const VICE_GENERAL_DIRECTOR = 75000;
const DORMMASTER = 15000;
const HEADMASTER = 50000;
const VICE_HEADMASTER = 25000;

const BACHELOR = 15000;
const MASTER = 20000;
const PHD = 60000;

const MODERATOR = 15000;
const EXPERT = 20000;
const RESEARCHER = 25000;
const MASTERTEACHER = 30000;

const FORMMASTER = 20000;
const VOCATIONAL_GUIDANCE = 10000;

const CELTA = 45000;
const TESOL = 30000;
const ENGLISH_EN_8 = 25000;
const ENGLISH_EN_7_5 = 17500;
const ENGLISH_EN_7 = 14000;
const ENGLISH_EN_6_5 = 10500;
const ENGLISH_EN_6 = 7000;
const ENGLISH_SS_7_5 = 25000;
const ENGLISH_SS_7 = 21000;
const ENGLISH_SS_6_5 = 17500;
const ENGLISH_SS_6 = 14000;
const ENGLISH_SS_5_5 = 10500;
const ENGLISH_SS_5 = 7000;
const ENGLISH_SZ_6_5 = 25000;
const ENGLISH_SZ_6 = 21000;
const ENGLISH_SZ_5_5 = 17500;
const ENGLISH_SZ_5 = 14000;
const ENGLISH_SZ_4_5 = 10500;
const ENGLISH_SZ_4 = 7000;

const TAT_4 = 7000;
const TAT_3 = 10500;
const TAT_2 = 14000;
const TAT_1 = 17500;

const ADDITIONAL_HOUR = 1000;

const INTERN = 150000;
const TRAINEE = 130000;

const LIVELIHOOD_VALUES = [
  {
    city: "Ақтау",
    rent_1: 75000,
    rent_2: 105000,
    rent_3: 150000,
    person_1: 102883,
    person_2: 83930,
    kids_17: 30865,
    kids_22: 82307,
  },
  {
    city: "Ақтөбе",
    rent_1: 75000,
    rent_2: 100000,
    rent_3: 130000,
    person_1: 91125,
    person_2: 76875,
    kids_17: 27337,
    kids_22: 72900,
  },
  {
    city: "Алматы",
    rent_1: 110000,
    rent_2: 165000,
    rent_3: 200000,
    person_1: 101147,
    person_2: 82888,
    kids_17: 30344,
    kids_22: 80917,
  },
  {
    city: "Арыс",
    rent_1: 80000,
    rent_2: 90000,
    rent_3: 100000,
    person_1: 94458,
    person_2: 78875,
    kids_17: 28337,
    kids_22: 75566,
  },
  {
    city: "Атырау",
    rent_1: 110000,
    rent_2: 160000,
    rent_3: 190000,
    person_1: 91125,
    person_2: 76875,
    kids_17: 27337,
    kids_22: 72900,
  },
  {
    city: "Бурабай",
    rent_1: 95000,
    rent_2: 120000,
    rent_3: 150000,
    person_1: 97577,
    person_2: 80746,
    kids_17: 29273,
    kids_22: 78061,
  },
  {
    city: "Екібастұз",
    rent_1: 60000,
    rent_2: 80000,
    rent_3: 100000,
    person_1: 103263,
    person_2: 84158,
    kids_17: 30979,
    kids_22: 82610,
  },
  {
    city: "Есік",
    rent_1: 50000,
    rent_2: 75000,
    rent_3: 110000,
    person_1: 101155,
    person_2: 82893,
    kids_17: 30347,
    kids_22: 80924,
  },
  {
    city: "Жаңаөзен",
    rent_1: 50000,
    rent_2: 80000,
    rent_3: 115000,
    person_1: 99627,
    person_2: 81976,
    kids_17: 29888,
    kids_22: 79702,
  },
  {
    city: "Жезқазған",
    rent_1: 50000,
    rent_2: 80000,
    rent_3: 110000,
    person_1: 95990,
    person_2: 79794,
    kids_17: 28797,
    kids_22: 76792,
  },
  {
    city: "Кентау",
    rent_1: 60000,
    rent_2: 80000,
    rent_3: 100000,
    person_1: 94497,
    person_2: 78898,
    kids_17: 28349,
    kids_22: 75597,
  },
  {
    city: "Көкшетау",
    rent_1: 90000,
    rent_2: 115000,
    rent_3: 130000,
    person_1: 93748,
    person_2: 78449,
    kids_17: 28124,
    kids_22: 74998,
  },
  {
    city: "Қарағанды",
    rent_1: 90000,
    rent_2: 115000,
    rent_3: 145000,
    person_1: 96019,
    person_2: 79812,
    kids_17: 28806,
    kids_22: 76815,
  },
  {
    city: "Қостанай",
    rent_1: 75000,
    rent_2: 95000,
    rent_3: 115000,
    person_1: 91556,
    person_2: 77133,
    kids_17: 27467,
    kids_22: 73245,
  },
  {
    city: "Құлсары",
    rent_1: 60000,
    rent_2: 95000,
    rent_3: 110000,
    person_1: 100778,
    person_2: 82667,
    kids_17: 30233,
    kids_22: 80622,
  },
  {
    city: "Қызылорда",
    rent_1: 50000,
    rent_2: 85000,
    rent_3: 110000,
    person_1: 89693,
    person_2: 76016,
    kids_17: 26908,
    kids_22: 71755,
  },
  {
    city: "Нұр-Сұлтан",
    rent_1: 120000,
    rent_2: 180000,
    rent_3: 220000,
    person_1: 103772,
    person_2: 84463,
    kids_17: 31132,
    kids_22: 83018,
  },
  {
    city: "Орал",
    rent_1: 75000,
    rent_2: 105000,
    rent_3: 145000,
    person_1: 91710,
    person_2: 77226,
    kids_17: 27513,
    kids_22: 73368,
  },
  {
    city: "Өскемен",
    rent_1: 70000,
    rent_2: 95000,
    rent_3: 142000,
    person_1: 99563,
    person_2: 81938,
    kids_17: 29869,
    kids_22: 79650,
  },
  {
    city: "Павлодар",
    rent_1: 75000,
    rent_2: 95000,
    rent_3: 120000,
    person_1: 94963,
    person_2: 79178,
    kids_17: 28489,
    kids_22: 75971,
  },
  {
    city: "Петропавл",
    rent_1: 73000,
    rent_2: 95000,
    rent_3: 105000,
    person_1: 92044,
    person_2: 77427,
    kids_17: 27613,
    kids_22: 73635,
  },
  {
    city: "Семей",
    rent_1: 55000,
    rent_2: 70000,
    rent_3: 95000,
    person_1: 98191,
    person_2: 81115,
    kids_17: 29457,
    kids_22: 78553,
  },
  {
    city: "Талдықорған",
    rent_1: 70000,
    rent_2: 100000,
    rent_3: 120000,
    person_1: 96100,
    person_2: 79860,
    kids_17: 28830,
    kids_22: 76880,
  },
  {
    city: "Тараз",
    rent_1: 55000,
    rent_2: 75000,
    rent_3: 120000,
    person_1: 92193,
    person_2: 77516,
    kids_17: 27658,
    kids_22: 73754,
  },
  {
    city: "Түркістан",
    rent_1: 85000,
    rent_2: 115000,
    rent_3: 145000,
    person_1: 91915,
    person_2: 77349,
    kids_17: 27575,
    kids_22: 73532,
  },
  {
    city: "Шымкент",
    rent_1: 75000,
    rent_2: 115000,
    rent_3: 150000,
    person_1: 96201,
    person_2: 79921,
    kids_17: 28860,
    kids_22: 76961,
  },
];

const JOB_LANGUAGE = {
  en: ["english"],
  ss: [
    "biology",
    "head",
    "vice-head",
    "dorm-head",
    "cs",
    // "form-head",
    // "curator",
    "math",
    // "vocational-guidance",
    // "communication",
    "mof",
    // "primary",
    "physics",
    "pe",
    "chemistry",
    "economics",
  ],
};

const TAT_RESULTS = [
  { subject: "english", average: 72.44, max: 96 },
  { subject: "primary", average: 54.49, max: 85 },
  { subject: "biology", average: 62.55, max: 91.25 },
  { subject: "geography", average: 61.71, max: 85 },
  { subject: "pe", average: 37.48, max: 64 },
  { subject: "cs", average: 73.64, max: 98 },
  { subject: "kazakh", average: 63.76, max: 93.75 },
  { subject: "kazakh-history", average: 67.06, max: 97 },
  { subject: "math", average: 69.91, max: 100 },
  { subject: "turkish", average: 71.12, max: 98 },
  { subject: "physics", average: 67.25, max: 100 },
  { subject: "chemistry", average: 56.36, max: 95 },
];

Template.calculator_v2.onCreated(function () {
  let template = this;

  //TAPi18n.setLanguage('kz');

  template.workExperience = new ReactiveVar("");
  template.specialPosition = new ReactiveVar("");
  template.additionalPosition = new ReactiveVar("");
  template.kids_6 = new ReactiveVar("");
  template.kids_7_16 = new ReactiveVar("");
  template.kids_17_22 = new ReactiveVar("");
  template.degree = new ReactiveVar("");
  template.maritalStatus = new ReactiveVar("");
  template.ielts = new ReactiveVar("");
  template.tat = new ReactiveVar("");
  template.rotation = new ReactiveVar("");
  template.kindergarden = new ReactiveVar("");
  template.currentSalary = new ReactiveVar("");
  template.gender = new ReactiveVar("");
  template.foreigner = new ReactiveVar("");
  template.moderator = new ReactiveVar("");
  template.celtaTesol = new ReactiveVar("");
  template.additionalHours = new ReactiveVar("");
  template.workingSpouse = new ReactiveVar("");
  template.city = new ReactiveVar("");
  template.qualification = new ReactiveVar("");
  template.job = new ReactiveVar("");
  template.hasHouse = new ReactiveVar("");
  template.prolongation = new ReactiveVar("");
  template.age = new ReactiveVar("");
});

Template.calculator_v2.helpers({
  experience_estimate: function () {
    let workExperience = Template.instance().workExperience.get();

    if (!workExperience) return 0;

    let specialPosition = Template.instance().specialPosition.get();
    if (specialPosition === "intern") return 0;
    if (specialPosition === "trainee") return 0;

    return +workExperience * EXPERIENCE;
  },
  special_position_estimate: function () {
    const specialPosition = Template.instance().specialPosition.get();
    const maritalStatus = Template.instance().maritalStatus.get();

    if (!specialPosition) return 0;

    if (specialPosition === "dorm-head" && maritalStatus !== "single") return 0;

    // if (specialPosition === "general-director") return GENERAL_DIRECTOR;
    // if (specialPosition === "vice-general-director")
    //   return VICE_GENERAL_DIRECTOR;
    if (specialPosition === "head") return HEADMASTER;
    if (specialPosition === "vice-head") return VICE_HEADMASTER;
    if (specialPosition === "dorm-head") return DORMMASTER;

    return 0;
  },
  qualification_estimate: function () {
    let specialPosition = Template.instance().specialPosition.get();
    let qualification = Template.instance().qualification.get();
    if (
      specialPosition === "head" &&
      // ||
      //   specialPosition === "vice-general-director" ||
      //   specialPosition === "general-director"
      (qualification === "" || qualification === "moderator")
    ) {
      return EXPERT;
    }

    if (qualification === "moderator") return MODERATOR;
    if (qualification === "expert") return EXPERT;
    if (qualification === "researcher") return RESEARCHER;
    if (qualification === "master-teacher") return MASTERTEACHER;

    return 0;
  },
  additional_position_estimate: function () {
    let specialPosition = Template.instance().specialPosition.get();
    let additionalPosition = Template.instance().additionalPosition.get();

    if (specialPosition === "trainee") return 0;

    if (
      specialPosition === "dorm-head" ||
      specialPosition === "vice-head" ||
      specialPosition === "head"
      // ||
      // specialPosition === "vice-general-director" ||
      // specialPosition === "general-director"
    ) {
      if (
        additionalPosition === "vocational-guidance" ||
        additionalPosition === "both"
      )
        return FORMMASTER + VOCATIONAL_GUIDANCE;
      return FORMMASTER;
    }

    if (additionalPosition === "vocational-guidance")
      return VOCATIONAL_GUIDANCE;
    if (additionalPosition === "form-head") return FORMMASTER;
    if (additionalPosition === "both") return VOCATIONAL_GUIDANCE + FORMMASTER;

    return 0;
  },
  livelihood_estimate: function () {
    //  =IF(ISBLANK(BE2)=0,0,
    //   IF(H2=3,$'Прож. Минимум'.$AJ$18,
    //     IF(H2=4,$'Прож. Минимум'.$AJ$19,
    //       ((IF(OR(I2=2,AND(F2="М",I2=3)), VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,21,0)+VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,18,0)*100%, VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,21,0)+VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,22,0))

    //     + IF(OR(I2=1,AND(F2="Ж",I2=3)),
    //         IF(COUNTIFS(AL2:AP2,">0",AL2:AP2,"<23")=0,VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,19,0),
    //         IF(COUNTIFS(AL2:AP2,">0",AL2:AP2,"<23")=1,VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,19,0),
    //           IF(COUNTIFS(AL2:AP2,">0",AL2:AP2,"<23")=2,VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,19,0),
    //             IF(COUNTIFS(AL2:AP2,">0",AL2:AP2,"<23")=3,VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,20,0),
    //               IF(COUNTIFS(AL2:AP2,">0",AL2:AP2,"<23")=4,VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,20,0),
    //                 IF(COUNTIFS(AL2:AP2,">0",AL2:AP2,"<23")=5,VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,20,0))))))),0)
    //       * IF(H2=2,$'Прож. Минимум'.$AJ$14,
    //           IF(K2=1,$'Прож. Минимум'.$AJ$13,100%+$'Прож. Минимум'.$AJ$14)))
    //           * IF(OR(AND(J2=1,I2=1),AND(F2="Ж",I2=1)),$'Прож. Минимум'.$AJ$10,100%)
    //     + IF(F2="Ж",0,
    //         COUNTIFS(AL2:AP2,">0",AL2:AP2,"<7")*VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,23,0) + COUNTIFS(AL2:AP2,">6",AL2:AP2,"<17")*VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,24,0) + COUNTIFS(AL2:AP2,">16",AL2:AP2,"<23")*VLOOKUP(B2,$'Прож. Минимум'.$B$5:$Z$30,25,0)))
    //         *IF(H2=2,80%,100%))))

    const specialPosition = Template.instance().specialPosition.get();

    if (specialPosition === "intern") return INTERN;
    if (specialPosition === "trainee") return TRAINEE;

    let result = 0;

    const maritalStatus = Template.instance().maritalStatus.get();
    if (!maritalStatus) return result;
    const workingSpouse = Template.instance().workingSpouse.get();
    const gender = Template.instance().gender.get();
    const city = Template.instance().city.get();
    if (!city) return result;
    const kids_6 = +Template.instance().kids_6.get();
    const kids_7_16 = +Template.instance().kids_7_16.get();
    const kids_17_22 = +Template.instance().kids_17_22.get();

    const age = +Template.instance().age.get();

    const rotation = Template.instance().rotation.get();
    if (!rotation) return result;
    const hasHouse = Template.instance().hasHouse.get();

    const values = LIVELIHOOD_VALUES.find((i) => i.city === city);

    if (
      (maritalStatus === "single" && gender === "female" && age < 28) ||
      (maritalStatus === "single" && gender === "male" && age < 30) ||
      (gender === "male" &&
        maritalStatus === "widowed-divorced" &&
        kids_6 + kids_7_16 + kids_17_22 === 0)
    ) {
      result += values.person_1;
      if (rotation === "no") {
        result += values.rent_1;
        return (0.8 * result).toFixed(0);
      } else {
        if (hasHouse === "yes") {
          result += 0.4 * values.rent_1;
        } else {
          result += values.rent_1;
        }
        return result.toFixed(0);
      }
    }

    if (
      (gender === "male" &&
        maritalStatus === "widowed-divorced" &&
        kids_6 + kids_7_16 + kids_17_22 > 0) ||
      (maritalStatus === "married" && workingSpouse === "yes") ||
      (maritalStatus === "married" &&
        workingSpouse === "no" &&
        gender === "female") ||
      (maritalStatus === "single" && gender === "male" && age > 29) ||
      (maritalStatus === "single" && gender === "female" && age > 27)
    ) {
      result += (values.person_1 + values.person_2) * 0.7;

      if (rotation === "no") {
        if (kids_6 + kids_7_16 + kids_17_22 < 3) {
          result += values.rent_2 * 0.15 * 0.7;
        } else {
          if (maritalStatus === "widowed-divorced" && gender === "male")
            result += values.rent_2 * 0.15 * 0.7;
          else result += values.rent_3 * 0.15 * 0.7;
        }

        if (gender === "male") {
          result += (kids_6 + kids_7_16) * values.kids_17;
          result += kids_17_22 * values.kids_22;
        }

        result *= 0.8;
      } else {
        if (hasHouse === "yes") {
          if (kids_6 + kids_7_16 + kids_17_22 < 3) {
            result += values.rent_2 * 0.4 * 0.7;
          } else {
            if (maritalStatus === "widowed-divorced" && gender === "male")
              result += values.rent_2 * 0.4 * 0.7;
            else result += values.rent_3 * 0.4 * 0.7;
          }
        } else {
          if (kids_6 + kids_7_16 + kids_17_22 < 3) {
            result += (values.rent_2 + 0.15 * values.rent_2) * 0.7;
          } else {
            if (maritalStatus === "widowed-divorced" && gender === "male")
              result += (values.rent_2 + 0.15 * values.rent_2) * 0.7;
            else result += (values.rent_3 + 0.15 * values.rent_3) * 0.7;
          }
        }

        if (gender === "male") {
          result += (kids_6 + kids_7_16) * values.kids_17;
          result += kids_17_22 * values.kids_22;
        }
      }
    }

    if (
      (gender === "female" &&
        maritalStatus === "widowed-divorced" &&
        kids_6 + kids_7_16 + kids_17_22 > 0) ||
      (maritalStatus === "married" &&
        workingSpouse === "no" &&
        gender === "male")
    ) {
      result += values.person_1 + values.person_2;

      if (rotation === "no") {
        if (kids_6 + kids_7_16 + kids_17_22 < 3) {
          result += values.rent_2 * 0.15;
        } else {
          result += values.rent_3 * 0.15;
        }
        if (gender === "male") {
          result += (kids_6 + kids_7_16) * values.kids_17;
          result += kids_17_22 * values.kids_22;
        }

        result *= 0.8;
      } else {
        if (hasHouse === "yes") {
          if (kids_6 + kids_7_16 + kids_17_22 < 3) {
            result += values.rent_2 * 0.4;
          } else {
            result += values.rent_3 * 0.4;
          }
        } else {
          if (kids_6 + kids_7_16 + kids_17_22 < 3) {
            result += values.rent_2 + values.rent_2 * 0.15;
          } else {
            result += values.rent_3 + values.rent_3 * 0.15;
          }
        }
        if (gender === "male") {
          result += (kids_6 + kids_7_16) * values.kids_17;
          result += kids_17_22 * values.kids_22;
        }
      }
    }

    return result.toFixed(0);
  },

  education_estimate: function () {
    let specialPosition = Template.instance().specialPosition.get();
    if (specialPosition === "trainee" || specialPosition === "intern") return 0;

    let degree = Template.instance().degree.get();

    if (degree === "college") return 0;
    if (degree === "bachelor") return BACHELOR;
    else if (degree === "master") return MASTER;
    else if (degree === "phd" || degree === "doctor") return PHD;
    else return 0;
  },

  english_estimate: function () {
    // =IF(ISBLANK(BE2)=0,0,
    //   IFERROR(
    //     IF(AND(Z2="CELTA",AJ2=$'Проф. Показатели'.$C$3),$'Проф. Показатели'.$D$5,
    //       IF(AND(Z2="TESOL",AJ2=$'Проф. ПоказаAY6тели'.$C$3),$'Проф. Показатели'.$D$6,0))

    //     + IF(($A$1-AA2)<1826,IF(AJ2=$'Проф. Показатели'.$C$3,
    //         IF(Y2>=$'Проф. Показатели'.$C$7,$'Проф. Показатели'.$D$7,
    //         IF(Y2=$'Проф. Показатели'.$C$8,$'Проф. Показатели'.$D$8,
    //         IF(Y2=$'Проф. Показатели'.$C$9,$'Проф. Показатели'.$D$9,
    //         IF(Y2=$'Проф. Показатели'.$C$10,$'Проф. Показатели'.$D$10,
    //         IF(Y2=$'Проф. Показатели'.$C$11,$'Проф. Показатели'.$D$11,0))))))

    //         +IF(AJ2=$'Проф. Показатели'.$E$3,
    //           IF(Y2>=$'Проф. Показатели'.$E$6,$'Проф. Показатели'.$F$6,
    //             IF(Y2=$'Проф. Показатели'.$E$7,$'Проф. Показатели'.$F$7,
    //               IF(Y2=$'Проф. Показатели'.$E$8,$'Проф. Показатели'.$F$8,
    //                 IF(Y2=$'Проф. Показатели'.$E$9,$'Проф. Показатели'.$F$9,
    //                   IF(Y2=$'Проф. Показатели'.$E$10,$'Проф. Показатели'.$F$10,
    //                     IF(Y2=$'Проф. Показатели'.$E$11,$'Проф. Показатели'.$F$11,0)))))),0)

    //         +IF(AJ2=$'Проф. Показатели'.$G$3, IF(Y2>=$'Проф. Показатели'.$G$6,$'Проф. Показатели'.$H$6,
    //           IF(Y2=$'Проф. Показатели'.$G$7,$'Проф. Показатели'.$H$7,
    //             IF(Y2=$'Проф. Показатели'.$G$8,$'Проф. Показатели'.$H$8, IF(Y2=$'Проф. Показатели'.$G$9,$'Проф. Показатели'.$H$9,
    //               IF(Y2=$'Проф. Показатели'.$G$10,$'Проф. Показатели'.$H$10, IF(Y2=$'Проф. Показатели'.$G$11,$'Проф. Показатели'.$H$11,0))))))),0),"FALSE"))

    let result = 0;

    let celtaTesol = Template.instance().celtaTesol.get();
    if (celtaTesol === "celta") result += CELTA;
    if (celtaTesol === "tesol") result += TESOL;

    let job = Template.instance().job.get();
    let ielts = Template.instance().ielts.get();

    if (!ielts || !job) return result;

    if (JOB_LANGUAGE.en.includes(job)) {
      if (+ielts >= 8) return result + ENGLISH_EN_8;
      if (+ielts === 7.5) return result + ENGLISH_EN_7_5;
      if (+ielts === 7) return result + ENGLISH_EN_7;
      if (+ielts === 6.5) return result + ENGLISH_EN_6_5;
      if (+ielts === 6) return result + ENGLISH_EN_6;
    } else if (JOB_LANGUAGE.ss.includes(job)) {
      if (+ielts >= 7.5) return result + ENGLISH_SS_7_5;
      if (+ielts === 7) return result + ENGLISH_SS_7;
      if (+ielts === 6.5) return result + ENGLISH_SS_6_5;
      if (+ielts === 6) return result + ENGLISH_SS_6;
      if (+ielts === 5.5) return result + ENGLISH_SS_5_5;
      if (+ielts === 5) return result + ENGLISH_SS_5;
    } else {
      if (+ielts === 6.5) return result + ENGLISH_SZ_6_5;
      if (+ielts === 6) return result + ENGLISH_SZ_6;
      if (+ielts === 5.5) return result + ENGLISH_SZ_5_5;
      if (+ielts === 5) return result + ENGLISH_SZ_5;
      if (+ielts === 4.5) return result + ENGLISH_SZ_4_5;
      if (+ielts === 4) return result + ENGLISH_SZ_4;
    }

    return +result;
  },
  tat_estimate: function () {
    // =IF(ISBLANK(BE2)=0,0,IFERROR(
    //    IF(OR(U2=2,U2=3,U2=4),$'Проф. Показатели'.$W$5,
    //     VLOOKUP(AC2, IF(AND(INDIRECT("'Проф. Показатели'!U"&MATCH(AC2,$'Проф. Показатели'.$J$5:$J$16,0)+4)>=AB2,INDIRECT("'Проф. Показатели'!T"&MATCH(AC2,$'Проф. Показатели'.$J$5:$J$16,0)+4)<=AB2),$'Проф. Показатели'.$AB$5:$AC$16, IF(AND(INDIRECT("'Проф. Показатели'!S"&MATCH(AC2,$'Проф. Показатели'.$J$5:$J$16,0)+4)>AB2,INDIRECT("'Проф. Показатели'!R"&MATCH(AC2,$'Проф. Показатели'.$J$5:$J$16,0)+4)<=AB2),$'Проф. Показатели'.$Z$5:$AA$16, IF(AND(INDIRECT("'Проф. Показатели'!Q"&MATCH(AC2,$'Проф. Показатели'.$J$5:$J$16,0)+4)>AB2,INDIRECT("'Проф. Показатели'!P"&MATCH(AC2,$'Проф. Показатели'.$J$5:$J$16,0)+4)<=AB2),$'Проф. Показатели'.$X$5:$Y$16, IF(AND(INDIRECT("'Проф. Показатели'!O"&MATCH(AC2,$'Проф. Показатели'.$J$5:$J$16,0)+4)>AB2,INDIRECT("'Проф. Показатели'!N"&MATCH(AC2,$'Проф. Показатели'.$J$5:$J$16,0)+4)<=AB2),$'Проф. Показатели'.$V$5:$W$16,"")))),2,0)),0))

    const specialPosition = Template.instance().specialPosition.get();
    if (
      specialPosition === "head"
      // ||
      // specialPosition === "vice-general-director" ||
      // specialPosition === "general-director"
    )
      return TAT_4;

    const tat = Template.instance().tat.get();
    if (!tat) return 0;

    const job = Template.instance().job.get();
    if (!job) return 0;

    if (TAT_RESULTS.map((r) => r.subject).includes(job)) {
      const result = TAT_RESULTS.find((r) => r.subject === job);
      const min = result.average;
      const interval = (result.max - result.average) / 4;
      if (+tat > min && +tat < min + interval) return TAT_4;
      if (+tat > min + interval && +tat < min + interval * 2) return TAT_3;
      if (+tat > min + interval * 2 && +tat < min + interval * 3) return TAT_2;
      if (+tat > min + interval * 3) return TAT_1;
    }

    return 0;
  },
  additional_hours_estimate: function () {
    const additionalHours = Template.instance().additionalHours.get();
    if (!additionalHours) return 0;
    return +additionalHours * ADDITIONAL_HOUR;
  },
  kindergarden_estimate: function () {
    let rotation = Template.instance().rotation.get();
    let kindergarden = Template.instance().kindergarden.get();

    if (!kindergarden) return 0;

    let specialPosition = Template.instance().specialPosition.get();

    if (specialPosition === "trainee") {
      return (+kindergarden * 0.25).toFixed(0);
    }

    if (rotation === "yes") {
      return (+kindergarden * 0.25).toFixed(0);
    }
    return 0;
  },
  prolongation_estimate: function () {
    const prolongation = Template.instance().prolongation.get();
    const rotation = Template.instance().rotation.get();
    const specialPosition = Template.instance().specialPosition.get();

    if (!prolongation) return 0;

    if (specialPosition === "intern") {
      if (rotation !== "no") return 0;
    }

    return +prolongation * PROLONGATION;
  },

  foreigner_estimate: function () {
    let foreigner = Template.instance().foreigner.get();
    if (foreigner !== "yes") return 0;
    return FOREIGNER;
  },

  old_salary: function () {
    let currentSalary = Template.instance().currentSalary.get();

    if (!currentSalary) return 0;
    return currentSalary;
  },
  total: function () {
    let total = 0;
    total += +Template.calculator_v2.__helpers
      .get("livelihood_estimate")
      .call();
    total += +Template.calculator_v2.__helpers
      .get("kindergarden_estimate")
      .call();
    total += +Template.calculator_v2.__helpers
      .get("prolongation_estimate")
      .call();
    total += +Template.calculator_v2.__helpers.get("foreigner_estimate").call();
    total += +Template.calculator_v2.__helpers
      .get("experience_estimate")
      .call();
    total += +Template.calculator_v2.__helpers.get("education_estimate").call();
    total += +Template.calculator_v2.__helpers
      .get("qualification_estimate")
      .call();
    total += +Template.calculator_v2.__helpers
      .get("additional_position_estimate")
      .call();
    total += +Template.calculator_v2.__helpers
      .get("special_position_estimate")
      .call();
    total += +Template.calculator_v2.__helpers.get("english_estimate").call();
    total += +Template.calculator_v2.__helpers.get("tat_estimate").call();
    total += +Template.calculator_v2.__helpers
      .get("additional_hours_estimate")
      .call();

    total = Math.round(total / 1000) * 1000;

    const currentSalary = +Template.calculator_v2.__helpers
      .get("old_salary")
      .call();
    return currentSalary > total ? currentSalary : total;
  },
  isCurrentLanguageKz: function () {
    if (TAPi18n.getLanguage() === "en") return true;
    return false;
  },
});

Template.calculator_v2.events({
  "keyup #input"(event, template) {
    template.workExperience.set(template.find("[name=workExperience]").value);
    template.kids_6.set(template.find("[name=kids_6]").value);
    template.kids_7_16.set(template.find("[name=kids_7_16]").value);
    template.kids_17_22.set(template.find("[name=kids_17_22]").value);
    template.kindergarden.set(template.find("[name=kindergardenFee]").value);
    template.currentSalary.set(template.find("[name=currentSalary]").value);
    template.tat.set(template.find("[name=tat]").value);
    template.age.set(template.find("[name=age]").value);
    template.prolongation.set(template.find("[name=prolongation]").value);
    template.additionalHours.set(template.find("[name=additionalHours]").value);
  },
  "change #select"(event, template) {
    template.specialPosition.set(template.find("[name=specialPosition]").value);
    template.degree.set(template.find("[name=academicDegree]").value);
    template.maritalStatus.set(template.find("[name=maritalStatus]").value);
    template.ielts.set(template.find("[name=ielts]").value);
    template.rotation.set(template.find("[name=rotation]").value);
    template.additionalPosition.set(
      template.find("[name=additionalPosition]").value
    );
    template.foreigner.set(template.find("[name=foreigner]").value);
    template.qualification.set(template.find("[name=qualification]").value);
    template.celtaTesol.set(template.find("[name=celtaTesol]").value);
    template.workingSpouse.set(template.find("[name=workingSpouse]").value);
    template.city.set(template.find("[name=city]").value);
    template.job.set(template.find("[name=job]").value);
    template.hasHouse.set(template.find("[name=hasHouse]").value);
  },
  "change #radio_male"(event, template) {
    template.gender.set(event.target.value);
  },
  "change #radio_female"(event, template) {
    template.gender.set(event.target.value);
  },
});
