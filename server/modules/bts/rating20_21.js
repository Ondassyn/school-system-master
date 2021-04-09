import { runInThisContext } from "vm";

export const calculateRating = (academicYear, btsNo, day, schoolId) => {
  let gradesFirstDay = ["7", "8", "9", "10"];
  let gradesSecondDay = ["8", "9"];
  var counter = 0;

  console.log(
    "================================================================"
  );

  calculateBtsRatingForGrade = (academicYear, btsNo, schoolId, grade) => {
    var ratingObj = {};

    if (day == "1") {
      ratingObj = {
        academicYear: academicYear,
        btsNo: btsNo,
        schoolId: schoolId,
        grade: grade,
        mathematic: 0,
        mathematicA: 0,
        mathematicB: 0,
        mathematicJaksiCount: 0,
        mathematicOrtawaCount: 0,
        mathematicNawarCount: 0,
        turkish_lang: 0,
        turkish_langA: 0,
        turkish_langB: 0,
        turkish_langJaksiCount: 0,
        turkish_langOrtawaCount: 0,
        turkish_langNawarCount: 0,
        kazakh_history: 0,
        kazakh_historyA: 0,
        kazakh_historyB: 0,
        kazakh_historyJaksiCount: 0,
        kazakh_historyOrtawaCount: 0,
        kazakh_historyNawarCount: 0,
        world_history: 0,
        world_historyA: 0,
        world_historyB: 0,
        world_historyJaksiCount: 0,
        world_historyOrtawaCount: 0,
        world_historyNawarCount: 0,
        geography: 0,
        geographyA: 0,
        geographyB: 0,
        geographyJaksiCount: 0,
        geographyOrtawaCount: 0,
        geographyNawarCount: 0,
        physics: 0,
        physicsA: 0,
        physicsB: 0,
        physicsJaksiCount: 0,
        physicsOrtawaCount: 0,
        physicsNawarCount: 0,
        chemistry: 0,
        chemistryA: 0,
        chemistryB: 0,
        chemistryJaksiCount: 0,
        chemistryOrtawaCount: 0,
        chemistryNawarCount: 0,
        biology: 0,
        biologyA: 0,
        biologyB: 0,
        biologyJaksiCount: 0,
        biologyOrtawaCount: 0,
        biologyNawarCount: 0,
        kazakh_lang: 0,
        kazakh_langA: 0,
        kazakh_langB: 0,
        kazakh_langJaksiCount: 0,
        kazakh_langOrtawaCount: 0,
        kazakh_langNawarCount: 0,
        russian_lang: 0,
        russian_langJaksiCount: 0,
        russian_langOrtawaCount: 0,
        russian_langNawarCount: 0,
        total: 0,
        totalA: 0,
        totalB: 0,
        totalJaksiCount: 0,
        totalOrtawaCount: 0,
        totalNawarCount: 0,
        // mathematicBonus: 0,
        // mathematicBonusA: 0,
        // mathematicBonusB: 0,
        // mathematicJaksiCountBonus: 0,
        // mathematicOrtawaCountBonus: 0,
        // mathematicNawarCountBonus: 0,
        // turkish_langBonus: 0,
        // turkish_langBonusA: 0,
        // turkish_langBonusB: 0,
        // turkish_langJaksiCountBonus: 0,
        // turkish_langOrtawaCountBonus: 0,
        // turkish_langNawarCountBonus: 0,
        // kazakh_historyBonus: 0,
        // kazakh_historyBonusA: 0,
        // kazakh_historyBonusB: 0,
        // kazakh_historyJaksiCountBonus: 0,
        // kazakh_historyOrtawaCountBonus: 0,
        // kazakh_historyNawarCountBonus: 0,
        // world_historyBonus: 0,
        // world_historyBonusA: 0,
        // world_historyBonusB: 0,
        // world_historyJaksiCountBonus: 0,
        // world_historyOrtawaCountBonus: 0,
        // world_historyNawarCountBonus: 0,
        // geographyBonus: 0,
        // geographyBonusA: 0,
        // geographyBonusB: 0,
        // geographyJaksiCountBonus: 0,
        // geographyOrtawaCountBonus: 0,
        // geographyNawarCountBonus: 0,
        // physicsBonus: 0,
        // physicsBonusA: 0,
        // physicsBonusB: 0,
        // physicsJaksiCountBonus: 0,
        // physicsOrtawaCountBonus: 0,
        // physicsNawarCountBonus: 0,
        // chemistryBonus: 0,
        // chemistryBonusA: 0,
        // chemistryBonusB: 0,
        // chemistryJaksiCountBonus: 0,
        // chemistryOrtawaCountBonus: 0,
        // chemistryNawarCountBonus: 0,
        // biologyBonus: 0,
        // biologyBonusA: 0,
        // biologyBonusB: 0,
        // biologyJaksiCountBonus: 0,
        // biologyOrtawaCountBonus: 0,
        // biologyNawarCountBonus: 0,
        // kazakh_langBonus: 0,
        // kazakh_langBonusA: 0,
        // kazakh_langBonusB: 0,
        // kazakh_langJaksiCountBonus: 0,
        // kazakh_langOrtawaCountBonus: 0,
        // kazakh_langNawarCountBonus: 0,
        // russian_langBonus: 0,
        // russian_langJaksiCountBonus: 0,
        // russian_langOrtawaCountBonus: 0,
        // russian_langNawarCountBonus: 0,
        // totalBonus: 0,
        // totalBonusA: 0,
        // totalBonusB: 0,
        // totalJaksiCountBonus: 0,
        // totalOrtawaCountBonus: 0,
        // totalNawarCountBonus: 0,
      };
    } else if (day == "2") {
      ratingObj = {
        academicYear: academicYear,
        btsNo: btsNo,
        schoolId: schoolId,
        grade: grade,
        geography: 0,
        geographyA: 0,
        geographyB: 0,
        geographyJaksiCount: 0,
        geographyOrtawaCount: 0,
        geographyNawarCount: 0,
        physics: 0,
        physicsA: 0,
        physicsB: 0,
        physicsJaksiCount: 0,
        physicsOrtawaCount: 0,
        physicsNawarCount: 0,
        chemistry: 0,
        chemistryA: 0,
        chemistryB: 0,
        chemistryJaksiCount: 0,
        chemistryOrtawaCount: 0,
        chemistryNawarCount: 0,
        biology: 0,
        biologyA: 0,
        biologyB: 0,
        biologyJaksiCount: 0,
        biologyOrtawaCount: 0,
        biologyNawarCount: 0,
        total: 0,
        totalA: 0,
        totalB: 0,
        totalJaksiCount: 0,
        totalOrtawaCount: 0,
        totalNawarCount: 0,
      };
    }

    let records = BtsResults.find({
      academicYear: academicYear,
      btsNo: btsNo,
      grade: grade,
      schoolId: schoolId,
    }).fetch();

    let firstDayCounter = 0;
    let secondDayCounter = 0;
    let firstDayTotal = 0;
    let secondDayTotal = 0;
    let electiveGroup_1_Count = 0;
    let electiveGroup_2_Count = 0;
    let electiveGroup_3_Count = 0;
    let electiveGroup_4_Count = 0;
    let electiveGroup_5_Count = 0;
    let electiveGroup_6_Count = 0;
    let electiveGroup_7_Count = 0;

    let mathematicJaksiCount = 0;
    let mathematicOrtawaCount = 0;
    let mathematicNawarCount = 0;

    let kazakh_langJaksiCount = 0;
    let kazakh_langOrtawaCount = 0;
    let kazakh_langNawarCount = 0;

    if (ratingObj.grade == "7") {
      _.each(records, (record) => {
        if (record.day_1_total) {
          ratingObj.mathematic += record.mathematic || 0;
          ratingObj.mathematicA += record.mathematicA || 0;
          ratingObj.mathematicB += record.mathematicB || 0;

          // ratingObj.mathematicBonus += record.mathematicBonus || 0;
          // ratingObj.mathematicBonusA += record.mathematicBonusA || 0;
          // ratingObj.mathematicBonusB += record.mathematicBonusB || 0;

          if (record.mathematic >= 11) ratingObj.mathematicJaksiCount++;
          else if (record.mathematic >= 8 && record.mathematic <= 11)
            ratingObj.mathematicOrtawaCount++;
          else ratingObj.mathematicNawarCount++;

          // if (record.mathematicBonus >= 4)
          //   ratingObj.mathematicJaksiCountBonus++;
          // else if (record.mathematicBonus >= 2 && record.mathematicBonus <= 3)
          //   ratingObj.mathematicOrtawaCountBonus++;
          // else ratingObj.mathematicNawarCountBonus++;

          if (btsNo == "1" || btsNo == "2" || btsNo == "3") {
            ratingObj.kazakh_lang += record.kazakh_lang || 0;
            ratingObj.kazakh_langA += record.kazakh_langA || 0;
            ratingObj.kazakh_langB += record.kazakh_langB || 0;

            if (record.kazakh_lang >= 11) ratingObj.kazakh_langJaksiCount++;
            else if (record.kazakh_lang >= 8 && record.kazakh_lang <= 11)
              ratingObj.kazakh_langOrtawaCount++;
            else ratingObj.kazakh_langNawarCount++;

            // ratingObj.kazakh_langBonus += record.kazakh_langBonus || 0;
            // ratingObj.kazakh_langBonusA += record.kazakh_langBonusA || 0;
            // ratingObj.kazakh_langBonusB += record.kazakh_langBonusB || 0;

            // if (record.kazakh_langBonus >= 4)
            //   ratingObj.kazakh_langJaksiCountBonus++;
            // else if (
            //   record.kazakh_langBonus >= 2 &&
            //   record.kazakh_langBonus <= 3
            // )
            //   ratingObj.kazakh_langOrtawaCountBonus++;
            // else ratingObj.kazakh_langNawarCountBonus++;

            ratingObj.geography += record.geography || 0;
            ratingObj.geographyA += record.geographyA || 0;
            ratingObj.geographyB += record.geographyB || 0;

            if (record.geography >= 11) ratingObj.geographyJaksiCount++;
            else if (record.geography >= 8 && record.geography <= 11)
              ratingObj.geographyOrtawaCount++;
            else ratingObj.geographyNawarCount++;

            // ratingObj.geographyBonus += record.geographyBonus || 0;
            // ratingObj.geographyBonusA += record.geographyBonusA || 0;
            // ratingObj.geographyBonusB += record.geographyBonusB || 0;

            // if (record.geographyBonus >= 4)
            //   ratingObj.geographyJaksiCountBonus++;
            // else if (record.geographyBonus >= 2 && record.geographyBonus <= 3)
            //   ratingObj.geographyOrtawaCountBonus++;
            // else ratingObj.geographyNawarCountBonus++;
          }

          firstDayCounter++;
          firstDayTotal += record.day_1_total || 0;
        }
      });
    } else if (ratingObj.grade == "8") {
      _.each(records, (record) => {
        if (day == "1") {
          ratingObj.mathematic += record.mathematic || 0;
          ratingObj.mathematicA += record.mathematicA || 0;
          ratingObj.mathematicB += record.mathematicB || 0;

          if (record.mathematic >= 11) ratingObj.mathematicJaksiCount++;
          else if (record.mathematic >= 8 && record.mathematic <= 11)
            ratingObj.mathematicOrtawaCount++;
          else ratingObj.mathematicNawarCount++;

          // ratingObj.mathematicBonus += record.mathematicBonus || 0;
          // ratingObj.mathematicBonusA += record.mathematicBonusA || 0;
          // ratingObj.mathematicBonusB += record.mathematicBonusB || 0;

          // if (record.mathematicBonus >= 4)
          //   ratingObj.mathematicJaksiCountBonus++;
          // else if (record.mathematicBonus >= 2 && record.mathematicBonus <= 3)
          //   ratingObj.mathematicOrtawaCountBonus++;
          // else ratingObj.mathematicNawarCountBonus++;

          ratingObj.physics += record.physics || 0;
          ratingObj.physicsA += record.physicsA || 0;
          ratingObj.physicsB += record.physicsB || 0;

          if (record.physics >= 11) ratingObj.physicsJaksiCount++;
          else if (record.physics >= 8 && record.physics <= 11)
            ratingObj.physicsOrtawaCount++;
          else ratingObj.physicsNawarCount++;

          // ratingObj.physicsBonus += record.physicsBonus || 0;
          // ratingObj.physicsBonusA += record.physicsBonusA || 0;
          // ratingObj.physicsBonusB += record.physicsBonusB || 0;

          // if (record.physicsBonus >= 4) ratingObj.physicsJaksiCountBonus++;
          // else if (record.physicsBonus >= 2 && record.physicsBonus <= 3)
          //   ratingObj.physicsOrtawaCountBonus++;
          // else ratingObj.physicsNawarCountBonus++;

          ratingObj.biology += record.biology || 0;
          ratingObj.biologyA += record.biologyA || 0;
          ratingObj.biologyB += record.biologyB || 0;

          if (record.biology >= 11) ratingObj.biologyJaksiCount++;
          else if (record.biology >= 8 && record.biology <= 11)
            ratingObj.biologyOrtawaCount++;
          else ratingObj.biologyNawarCount++;

          // ratingObj.biologyBonus += record.biologyBonus || 0;
          // ratingObj.biologyBonusA += record.biologyBonusA || 0;
          // ratingObj.biologyBonusB += record.biologyBonusB || 0;

          // if (record.biologyBonus >= 4) ratingObj.biologyJaksiCountBonus++;
          // else if (record.biologyBonus >= 2 && record.biologyBonus <= 3)
          //   ratingObj.biologyOrtawaCountBonus++;
          // else ratingObj.biologyNawarCountBonus++;

          firstDayCounter++;
          firstDayTotal += record.day_1_total || 0;
        } else if (day == "2") {
          ratingObj.geography += record.geography || 0;
          ratingObj.geographyA += record.geographyA || 0;
          ratingObj.geographyB += record.geographyB || 0;

          if (record.geography >= 11) ratingObj.geographyJaksiCount++;
          else if (record.geography >= 8 && record.geography <= 11)
            ratingObj.geographyOrtawaCount++;
          else ratingObj.geographyNawarCount++;

          ratingObj.physics += record.physics || 0;
          ratingObj.physicsA += record.physicsA || 0;
          ratingObj.physicsB += record.physicsB || 0;

          if (record.physics >= 11) ratingObj.physicsJaksiCount++;
          else if (record.physics >= 8 && record.physics <= 11)
            ratingObj.physicsOrtawaCount++;
          else ratingObj.physicsNawarCount++;

          ratingObj.chemistry += record.chemistry || 0;
          ratingObj.chemistryA += record.chemistryA || 0;
          ratingObj.chemistryB += record.chemistryB || 0;

          if (record.chemistry >= 11) ratingObj.chemistryJaksiCount++;
          else if (record.chemistry >= 8 && record.chemistry <= 11)
            ratingObj.chemistryOrtawaCount++;
          else ratingObj.chemistryNawarCount++;

          ratingObj.biology += record.biology || 0;
          ratingObj.biologyA += record.biologyA || 0;
          ratingObj.biologyB += record.biologyB || 0;

          if (record.biology >= 11) ratingObj.biologyJaksiCount++;
          else if (record.biology >= 8 && record.biology <= 11)
            ratingObj.biologyOrtawaCount++;
          else ratingObj.biologyNawarCount++;

          secondDayCounter++;
          secondDayTotal += record.day_2_total || 0;
        }
      });
    } else if (ratingObj.grade == "9") {
      _.each(records, (record) => {
        if (day == "1") {
          ratingObj.mathematic += record.mathematic || 0;
          ratingObj.mathematicA += record.mathematicA || 0;
          ratingObj.mathematicB += record.mathematicB || 0;

          if (record.mathematic >= 11) ratingObj.mathematicJaksiCount++;
          else if (record.mathematic >= 8 && record.mathematic <= 11)
            ratingObj.mathematicOrtawaCount++;
          else ratingObj.mathematicNawarCount++;

          ratingObj.physics += record.physics || 0;
          ratingObj.physicsA += record.physicsA || 0;
          ratingObj.physicsB += record.physicsB || 0;

          if (record.physics >= 11) ratingObj.physicsJaksiCount++;
          else if (record.physics >= 8 && record.physics <= 11)
            ratingObj.physicsOrtawaCount++;
          else ratingObj.physicsNawarCount++;

          // ratingObj.mathematicBonus += record.mathematicBonus || 0;
          // ratingObj.mathematicBonusA += record.mathematicBonusA || 0;
          // ratingObj.mathematicBonusB += record.mathematicBonusB || 0;

          // if (record.mathematicBonus >= 4)
          //   ratingObj.mathematicJaksiCountBonus++;
          // else if (record.mathematicBonus >= 2 && record.mathematicBonus <= 3)
          //   ratingObj.mathematicOrtawaCountBonus++;
          // else ratingObj.mathematicNawarCountBonus++;

          // ratingObj.physicsBonus += record.physicsBonus || 0;
          // ratingObj.physicsBonusA += record.physicsBonusA || 0;
          // ratingObj.physicsBonusB += record.physicsBonusB || 0;

          // if (record.physicsBonus >= 4) ratingObj.physicsJaksiCountBonus++;
          // else if (record.physicsBonus >= 2 && record.physicsBonus <= 3)
          //   ratingObj.physicsOrtawaCountBonus++;
          // else ratingObj.physicsNawarCountBonus++;

          ratingObj.chemistry += record.chemistry || 0;
          ratingObj.chemistryA += record.chemistryA || 0;
          ratingObj.chemistryB += record.chemistryB || 0;

          if (record.chemistry >= 11) ratingObj.chemistryJaksiCount++;
          else if (record.chemistry >= 8 && record.chemistry <= 11)
            ratingObj.chemistryOrtawaCount++;
          else ratingObj.chemistryNawarCount++;

          // ratingObj.chemistryBonus += record.chemistryBonus || 0;
          // ratingObj.chemistryBonusA += record.chemistryBonusA || 0;
          // ratingObj.chemistryBonusB += record.chemistryBonusB || 0;

          // if (record.chemistryBonus >= 4) ratingObj.chemistryJaksiCountBonus++;
          // else if (record.chemistryBonus >= 2 && record.chemistryBonus <= 3)
          //   ratingObj.chemistryOrtawaCountBonus++;
          // else ratingObj.chemistryNawarCountBonus++;

          firstDayCounter++;
          firstDayTotal += record.day_1_total || 0;
        } else if (day == "2") {
          ratingObj.geography += record.geography || 0;
          ratingObj.geographyA += record.geographyA || 0;
          ratingObj.geographyB += record.geographyB || 0;

          if (record.geography >= 11) ratingObj.geographyJaksiCount++;
          else if (record.geography >= 8 && record.geography <= 11)
            ratingObj.geographyOrtawaCount++;
          else ratingObj.geographyNawarCount++;

          ratingObj.physics += record.physics || 0;
          ratingObj.physicsA += record.physicsA || 0;
          ratingObj.physicsB += record.physicsB || 0;

          if (record.physics >= 11) ratingObj.physicsJaksiCount++;
          else if (record.physics >= 8 && record.physics <= 11)
            ratingObj.physicsOrtawaCount++;
          else ratingObj.physicsNawarCount++;

          ratingObj.chemistry += record.chemistry || 0;
          ratingObj.chemistryA += record.chemistryA || 0;
          ratingObj.chemistryB += record.chemistryB || 0;

          if (record.chemistry >= 11) ratingObj.chemistryJaksiCount++;
          else if (record.chemistry >= 8 && record.chemistry <= 11)
            ratingObj.chemistryOrtawaCount++;
          else ratingObj.chemistryNawarCount++;

          ratingObj.biology += record.biology || 0;
          ratingObj.biologyA += record.biologyA || 0;
          ratingObj.biologyB += record.biologyB || 0;

          if (record.biology >= 11) ratingObj.biologyJaksiCount++;
          else if (record.biology >= 8 && record.biology <= 11)
            ratingObj.biologyOrtawaCount++;
          else ratingObj.biologyNawarCount++;

          secondDayCounter++;
          secondDayTotal += record.day_2_total || 0;
        }
      });
    } else if (ratingObj.grade == "10") {
      _.each(records, (record) => {
        if (record.day_1_total) {
          ratingObj.mathematic += record.mathematic || 0;
          ratingObj.mathematicA += record.mathematicA || 0;
          ratingObj.mathematicB += record.mathematicB || 0;

          if (record.mathematic >= 11) ratingObj.mathematicJaksiCount++;
          else if (record.mathematic >= 8 && record.mathematic <= 11)
            ratingObj.mathematicOrtawaCount++;
          else ratingObj.mathematicNawarCount++;

          // ratingObj.mathematicBonus += record.mathematicBonus || 0;
          // ratingObj.mathematicBonusA += record.mathematicBonusA || 0;
          // ratingObj.mathematicBonusB += record.mathematicBonusB || 0;

          // if (record.mathematicBonus >= 4)
          //   ratingObj.mathematicJaksiCountBonus++;
          // else if (record.mathematicBonus >= 2 && record.mathematicBonus <= 3)
          //   ratingObj.mathematicOrtawaCountBonus++;
          // else ratingObj.mathematicNawarCountBonus++;

          if (record.electiveGroup == "01") {
            ratingObj.geography += record.geography || 0;
            ratingObj.geographyA += record.geographyA || 0;
            ratingObj.geographyB += record.geographyB || 0;

            if (record.geography >= 11) ratingObj.geographyJaksiCount++;
            else if (record.geography >= 8 && record.geography <= 11)
              ratingObj.geographyOrtawaCount++;
            else ratingObj.geographyNawarCount++;

            // ratingObj.geographyBonus += record.geographyBonus || 0;
            // ratingObj.geographyBonusA += record.geographyBonusA || 0;
            // ratingObj.geographyBonusB += record.geographyBonusB || 0;

            // if (record.geographyBonus >= 4)
            //   ratingObj.geographyJaksiCountBonus++;
            // else if (record.geographyBonus >= 2 && record.geographyBonus <= 3)
            //   ratingObj.geographyOrtawaCountBonus++;
            // else ratingObj.geographyNawarCountBonus++;

            ratingObj.physics += record.physics || 0;
            ratingObj.physicsA += record.physicsA || 0;
            ratingObj.physicsB += record.physicsB || 0;

            if (record.physics >= 11) ratingObj.physicsJaksiCount++;
            else if (record.physics >= 8 && record.physics <= 11)
              ratingObj.physicsOrtawaCount++;
            else ratingObj.physicsNawarCount++;

            // ratingObj.physicsBonus += record.physicsBonus || 0;
            // ratingObj.physicsBonusA += record.physicsBonusA || 0;
            // ratingObj.physicsBonusB += record.physicsBonusB || 0;

            // if (record.physicsBonus >= 4) ratingObj.physicsJaksiCountBonus++;
            // else if (record.physicsBonus >= 2 && record.physicsBonus <= 3)
            //   ratingObj.physicsOrtawaCountBonus++;
            // else ratingObj.physicsNawarCountBonus++;

            electiveGroup_1_Count++;
          } else if (record.electiveGroup == "02") {
            ratingObj.geography += record.geography || 0;
            ratingObj.geographyA += record.geographyA || 0;
            ratingObj.geographyB += record.geographyB || 0;

            if (record.geography >= 11) ratingObj.geographyJaksiCount++;
            else if (record.geography >= 8 && record.geography <= 11)
              ratingObj.geographyOrtawaCount++;
            else ratingObj.geographyNawarCount++;

            // ratingObj.geographyBonus += record.geographyBonus || 0;
            // ratingObj.geographyBonusA += record.geographyBonusA || 0;
            // ratingObj.geographyBonusB += record.geographyBonusB || 0;

            // if (record.geographyBonus >= 4)
            //   ratingObj.geographyJaksiCountBonus++;
            // else if (record.geographyBonus >= 2 && record.geographyBonus <= 3)
            //   ratingObj.geographyOrtawaCountBonus++;
            // else ratingObj.geographyNawarCountBonus++;

            ratingObj.chemistry += record.chemistry || 0;
            ratingObj.chemistryA += record.chemistryA || 0;
            ratingObj.chemistryB += record.chemistryB || 0;

            if (record.chemistry >= 11) ratingObj.chemistryJaksiCount++;
            else if (record.chemistry >= 8 && record.chemistry <= 11)
              ratingObj.chemistryOrtawaCount++;
            else ratingObj.chemistryNawarCount++;

            // ratingObj.chemistryBonus += record.chemistryBonus || 0;
            // ratingObj.chemistryBonusA += record.chemistryBonusA || 0;
            // ratingObj.chemistryBonusB += record.chemistryBonusB || 0;

            // if (record.chemistryBonus >= 4)
            //   ratingObj.chemistryJaksiCountBonus++;
            // else if (record.chemistryBonus >= 2 && record.chemistryBonus <= 3)
            //   ratingObj.chemistryOrtawaCountBonus++;
            // else ratingObj.chemistryNawarCountBonus++;

            electiveGroup_2_Count++;
          } else if (record.electiveGroup == "03") {
            ratingObj.geography += record.geography || 0;
            ratingObj.geographyA += record.geographyA || 0;
            ratingObj.geographyB += record.geographyB || 0;

            if (record.geography >= 11) ratingObj.geographyJaksiCount++;
            else if (record.geography >= 8 && record.geography <= 11)
              ratingObj.geographyOrtawaCount++;
            else ratingObj.geographyNawarCount++;

            // ratingObj.geographyBonus += record.geographyBonus || 0;
            // ratingObj.geographyBonusA += record.geographyBonusA || 0;
            // ratingObj.geographyBonusB += record.geographyBonusB || 0;

            // if (record.geographyBonus >= 4)
            //   ratingObj.geographyJaksiCountBonus++;
            // else if (record.geographyBonus >= 2 && record.geographyBonus <= 3)
            //   ratingObj.geographyOrtawaCountBonus++;
            // else ratingObj.geographyNawarCountBonus++;

            ratingObj.biology += record.biology || 0;
            ratingObj.biologyA += record.biologyA || 0;
            ratingObj.biologyB += record.biologyB || 0;

            if (record.biology >= 11) ratingObj.biologyJaksiCount++;
            else if (record.biology >= 8 && record.biology <= 11)
              ratingObj.biologyOrtawaCount++;
            else ratingObj.biologyNawarCount++;
            electiveGroup_3_Count++;

            // ratingObj.biologyBonus += record.biologyBonus || 0;
            // ratingObj.biologyBonusA += record.biologyBonusA || 0;
            // ratingObj.biologyBonusB += record.biologyBonusB || 0;

            // if (record.biologyBonus >= 4) ratingObj.biologyJaksiCountBonus++;
            // else if (record.biologyBonus >= 2 && record.biologyBonus <= 3)
            //   ratingObj.biologyOrtawaCountBonus++;
            // else ratingObj.biologyNawarCountBonus++;

            electiveGroup_3_Count++;
          } else if (record.electiveGroup == "04") {
            ratingObj.physics += record.physics || 0;
            ratingObj.physicsA += record.physicsA || 0;
            ratingObj.physicsB += record.physicsB || 0;

            if (record.physics >= 11) ratingObj.physicsJaksiCount++;
            else if (record.physics >= 8 && record.physics <= 11)
              ratingObj.physicsOrtawaCount++;
            else ratingObj.physicsNawarCount++;

            // ratingObj.physicsBonus += record.physicsBonus || 0;
            // ratingObj.physicsBonusA += record.physicsBonusA || 0;
            // ratingObj.physicsBonusB += record.physicsBonusB || 0;

            // if (record.physicsBonus >= 4) ratingObj.physicsJaksiCountBonus++;
            // else if (record.physicsBonus >= 2 && record.physicsBonus <= 3)
            //   ratingObj.physicsOrtawaCountBonus++;
            // else ratingObj.physicsNawarCountBonus++;

            ratingObj.chemistry += record.chemistry || 0;
            ratingObj.chemistryA += record.chemistryA || 0;
            ratingObj.chemistryB += record.chemistryB || 0;

            if (record.chemistry >= 11) ratingObj.chemistryJaksiCount++;
            else if (record.chemistry >= 8 && record.chemistry <= 11)
              ratingObj.chemistryOrtawaCount++;
            else ratingObj.chemistryNawarCount++;
            electiveGroup_4_Count++;

            // ratingObj.chemistryBonus += record.chemistryBonus || 0;
            // ratingObj.chemistryBonusA += record.chemistryBonusA || 0;
            // ratingObj.chemistryBonusB += record.chemistryBonusB || 0;

            // if (record.chemistryBonus >= 4)
            //   ratingObj.chemistryJaksiCountBonus++;
            // else if (record.chemistryBonus >= 2 && record.chemistryBonus <= 3)
            //   ratingObj.chemistryOrtawaCountBonus++;
            // else ratingObj.chemistryNawarCountBonus++;
          } else if (record.electiveGroup == "05") {
            ratingObj.physics += record.physics || 0;
            ratingObj.physicsA += record.physicsA || 0;
            ratingObj.physicsB += record.physicsB || 0;

            if (record.physics >= 11) ratingObj.physicsJaksiCount++;
            else if (record.physics >= 8 && record.physics <= 11)
              ratingObj.physicsOrtawaCount++;
            else ratingObj.physicsNawarCount++;

            // ratingObj.physicsBonus += record.physicsBonus || 0;
            // ratingObj.physicsBonusA += record.physicsBonusA || 0;
            // ratingObj.physicsBonusB += record.physicsBonusB || 0;

            // if (record.physicsBonus >= 4) ratingObj.physicsJaksiCountBonus++;
            // else if (record.physicsBonus >= 2 && record.physicsBonus <= 3)
            //   ratingObj.physicsOrtawaCountBonus++;
            // else ratingObj.physicsNawarCountBonus++;

            ratingObj.biology += record.biology || 0;
            ratingObj.biologyA += record.biologyA || 0;
            ratingObj.biologyB += record.biologyB || 0;

            if (record.biology >= 11) ratingObj.biologyJaksiCount++;
            else if (record.biology >= 8 && record.biology <= 11)
              ratingObj.biologyOrtawaCount++;
            else ratingObj.biologyNawarCount++;

            // ratingObj.biologyBonus += record.biologyBonus || 0;
            // ratingObj.biologyBonusA += record.biologyBonusA || 0;
            // ratingObj.biologyBonusB += record.biologyBonusB || 0;

            // if (record.biologyBonus >= 4) ratingObj.biologyJaksiCountBonus++;
            // else if (record.biologyBonus >= 2 && record.biologyBonus <= 3)
            //   ratingObj.biologyOrtawaCountBonus++;
            // else ratingObj.biologyNawarCountBonus++;

            electiveGroup_5_Count++;
          } else if (record.electiveGroup == "06") {
            ratingObj.chemistry += record.chemistry || 0;
            ratingObj.chemistryA += record.chemistryA || 0;
            ratingObj.chemistryB += record.chemistryB || 0;

            if (record.chemistry >= 11) ratingObj.chemistryJaksiCount++;
            else if (record.chemistry >= 8 && record.chemistry <= 11)
              ratingObj.chemistryOrtawaCount++;
            else ratingObj.chemistryNawarCount++;

            // ratingObj.chemistryBonus += record.chemistryBonus || 0;
            // ratingObj.chemistryBonusA += record.chemistryBonusA || 0;
            // ratingObj.chemistryBonusB += record.chemistryBonusB || 0;

            // if (record.chemistryBonus >= 4)
            //   ratingObj.chemistryJaksiCountBonus++;
            // else if (record.chemistryBonus >= 2 && record.chemistryBonus <= 3)
            //   ratingObj.chemistryOrtawaCountBonus++;
            // else ratingObj.chemistryNawarCountBonus++;

            ratingObj.biology += record.biology || 0;
            ratingObj.biologyA += record.biologyA || 0;
            ratingObj.biologyB += record.biologyB || 0;

            if (record.biology >= 11) ratingObj.biologyJaksiCount++;
            else if (record.biology >= 8 && record.biology <= 11)
              ratingObj.biologyOrtawaCount++;
            else ratingObj.biologyNawarCount++;
            electiveGroup_6_Count++;

            // ratingObj.biologyBonus += record.biologyBonus || 0;
            // ratingObj.biologyBonusA += record.biologyBonusA || 0;
            // ratingObj.biologyBonusB += record.biologyBonusB || 0;

            // if (record.biologyBonus >= 4) ratingObj.biologyJaksiCountBonus++;
            // else if (record.biologyBonus >= 2 && record.biologyBonus <= 3)
            //   ratingObj.biologyOrtawaCountBonus++;
            // else ratingObj.biologyNawarCountBonus++;
          } else if (record.electiveGroup == "07") {
            ratingObj.geography += record.geography || 0;
            ratingObj.geographyA += record.geographyA || 0;
            ratingObj.geographyB += record.geographyB || 0;

            if (record.geography >= 11) ratingObj.geographyJaksiCount++;
            else if (record.geography >= 8 && record.geography <= 11)
              ratingObj.geographyOrtawaCount++;
            else ratingObj.geographyNawarCount++;

            // ratingObj.geographyBonus += record.geographyBonus || 0;
            // ratingObj.geographyBonusA += record.geographyBonusA || 0;
            // ratingObj.geographyBonusB += record.geographyBonusB || 0;

            // if (record.geographyBonus >= 4)
            //   ratingObj.geographyJaksiCountBonus++;
            // else if (record.geographyBonus >= 2 && record.geographyBonus <= 3)
            //   ratingObj.geographyOrtawaCountBonus++;
            // else ratingObj.geographyNawarCountBonus++;

            ratingObj.world_history += record.world_history || 0;
            ratingObj.world_historyA += record.world_historyA || 0;
            ratingObj.world_historyB += record.world_historyB || 0;

            if (record.world_history >= 11) ratingObj.world_historyJaksiCount++;
            else if (record.world_history >= 8 && record.world_history <= 11)
              ratingObj.world_historyOrtawaCount++;
            else ratingObj.world_historyNawarCount++;

            // ratingObj.world_historyBonus += record.world_historyBonus || 0;
            // ratingObj.world_historyBonusA += record.world_historyBonusA || 0;
            // ratingObj.world_historyBonusB += record.world_historyBonusB || 0;

            // if (record.world_historyBonus >= 4)
            //   ratingObj.world_historyJaksiCountBonus++;
            // else if (
            //   record.world_historyBonus >= 2 &&
            //   record.world_historyBonus <= 3
            // )
            //   ratingObj.world_historyOrtawaCountBonus++;
            // else ratingObj.world_historyNawarCountBonus++;

            electiveGroup_7_Count++;
          }

          firstDayCounter++;
          firstDayTotal += record.day_1_total || 0;
        }
      });
    }

    if (ratingObj.grade == "7") {
      if (firstDayCounter != 0) {
        ratingObj.mathematic = ratingObj.mathematic / firstDayCounter;
        ratingObj.mathematicA = ratingObj.mathematicA / firstDayCounter;
        ratingObj.mathematicB = ratingObj.mathematicB / firstDayCounter;

        // ratingObj.mathematicBonus = ratingObj.mathematicBonus / firstDayCounter;
        // ratingObj.mathematicBonusA =
        //   ratingObj.mathematicBonusA / firstDayCounter;
        // ratingObj.mathematicBonusB =
        //   ratingObj.mathematicBonusB / firstDayCounter;

        if (btsNo == "1" || btsNo == "2" || btsNo == "3") {
          ratingObj.kazakh_lang = ratingObj.kazakh_lang / firstDayCounter;
          ratingObj.kazakh_langA = ratingObj.kazakh_langA / firstDayCounter;
          ratingObj.kazakh_langB = ratingObj.kazakh_langB / firstDayCounter;

          // ratingObj.kazakh_langBonus =
          //   ratingObj.kazakh_langBonus / firstDayCounter;
          // ratingObj.kazakh_langBonusA =
          //   ratingObj.kazakh_langBonusA / firstDayCounter;
          // ratingObj.kazakh_langBonusB =
          //   ratingObj.kazakh_langBonusB / firstDayCounter;

          ratingObj.geography = ratingObj.geography / firstDayCounter;
          ratingObj.geographyA = ratingObj.geographyA / firstDayCounter;
          ratingObj.geographyB = ratingObj.geographyB / firstDayCounter;

          // ratingObj.geographyBonus = ratingObj.geographyBonus / firstDayCounter;
          // ratingObj.geographyBonusA =
          //   ratingObj.geographyBonusA / firstDayCounter;
          // ratingObj.geographyBonusB =
          //   ratingObj.geographyBonusB / firstDayCounter;

          // ratingObj.russian_lang = (ratingObj.russian_lang / firstDayCounter)
        }

        // ratingObj.total += firstDayTotal/firstDayCounter
        let count = 0;
        if (ratingObj.mathematic > 0) count++;
        if (ratingObj.kazakh_lang > 0) count++;
        if (ratingObj.geography > 0) count++;
        ratingObj.total +=
          ((ratingObj.mathematic +
            ratingObj.kazakh_lang +
            ratingObj.geography) /
            count /
            20) *
          100;
        // ratingObj.totalBonus +=
        //   ((ratingObj.mathematicBonus +
        //     ratingObj.kazakh_langBonus +
        //     ratingObj.geographyBonus) /
        //     count /
        //     5) *
        //   100;

        // console.log(firstDayTotal + ' ' + firstDayCounter);
        // firstDayCounter = 37
        // 4Lessons = 37 * 4 = 148
        // 148 - 100
        // 89  - x
        // x = 89 * 100 / 148
        // console.log("7 grade count: "+firstDayCounter);

        ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.kazakh_langJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.geographyJaksiCount || 0;

        ratingObj.totalOrtawaCount += ratingObj.mathematicOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.kazakh_langOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.geographyOrtawaCount || 0;

        ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.kazakh_langNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.geographyNawarCount || 0;

        ratingObj.totalJaksiCount =
          (ratingObj.totalJaksiCount * 100) / (firstDayCounter * 3);
        ratingObj.totalOrtawaCount =
          (ratingObj.totalOrtawaCount * 100) / (firstDayCounter * 3);
        ratingObj.totalNawarCount =
          (ratingObj.totalNawarCount * 100) / (firstDayCounter * 3);

        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.mathematicJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.kazakh_langJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.geographyJaksiCountBonus || 0;

        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.mathematicOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.kazakh_langOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.geographyOrtawaCountBonus || 0;

        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.mathematicNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.kazakh_langNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.geographyNawarCountBonus || 0;

        // ratingObj.totalJaksiCountBonus =
        //   (ratingObj.totalJaksiCountBonus * 100) / (firstDayCounter * 3);
        // ratingObj.totalOrtawaCountBonus =
        //   (ratingObj.totalOrtawaCountBonus * 100) / (firstDayCounter * 3);
        // ratingObj.totalNawarCountBonus =
        //   (ratingObj.totalNawarCountBonus * 100) / (firstDayCounter * 3);
      }
    } else if (ratingObj.grade == "8") {
      if (firstDayCounter != 0) {
        ratingObj.mathematic = ratingObj.mathematic / firstDayCounter;
        ratingObj.mathematicA = ratingObj.mathematicA / firstDayCounter;
        ratingObj.mathematicB = ratingObj.mathematicB / firstDayCounter;

        ratingObj.physics = ratingObj.physics / firstDayCounter;
        ratingObj.physicsA = ratingObj.physicsA / firstDayCounter;
        ratingObj.physicsB = ratingObj.physicsB / firstDayCounter;

        ratingObj.biology = ratingObj.biology / firstDayCounter;
        ratingObj.biologyA = ratingObj.biologyA / firstDayCounter;
        ratingObj.biologyB = ratingObj.biologyB / firstDayCounter;

        // ratingObj.mathematicBonus = ratingObj.mathematicBonus / firstDayCounter;
        // ratingObj.mathematicBonusA =
        //   ratingObj.mathematicBonusA / firstDayCounter;
        // ratingObj.mathematicBonusB =
        //   ratingObj.mathematicBonusB / firstDayCounter;

        // ratingObj.physicsBonus = ratingObj.physicsBonus / firstDayCounter;
        // ratingObj.physicsBonusA = ratingObj.physicsBonusA / firstDayCounter;
        // ratingObj.physicsBonusB = ratingObj.physicsBonusB / firstDayCounter;

        // ratingObj.biologyBonus = ratingObj.biologyBonus / firstDayCounter;
        // ratingObj.biologyBonusA = ratingObj.biologyBonusA / firstDayCounter;
        // ratingObj.biologyBonusB = ratingObj.biologyBonusB / firstDayCounter;

        // ratingObj.total += firstDayTotal/firstDayCounter
        ratingObj.total +=
          ((ratingObj.mathematic + ratingObj.physics + ratingObj.biology) /
            3 /
            20) *
          100;
        // ratingObj.totalBonus +=
        //   ((ratingObj.mathematicBonus +
        //     ratingObj.physicsBonus +
        //     ratingObj.biologyBonus) /
        //     3 /
        //     5) *
        //   100;

        ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.physicsJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.biologyJaksiCount || 0;

        ratingObj.totalOrtawaCount += ratingObj.mathematicOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.physicsOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.biologyOrtawaCount || 0;

        ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.physicsNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.biologyNawarCount || 0;

        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.mathematicJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus += ratingObj.physicsJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus += ratingObj.biologyJaksiCountBonus || 0;

        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.mathematicOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.physicsOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.biologyOrtawaCountBonus || 0;

        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.mathematicNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus += ratingObj.physicsNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus += ratingObj.biologyNawarCountBonus || 0;
      } else if (secondDayCounter != 0) {
        ratingObj.geography = ratingObj.geography / secondDayCounter;
        ratingObj.geographyA = ratingObj.geographyA / secondDayCounter;
        ratingObj.geographyB = ratingObj.geographyB / secondDayCounter;

        ratingObj.physics = ratingObj.physics / secondDayCounter;
        ratingObj.physicsA = ratingObj.physicsA / secondDayCounter;
        ratingObj.physicsB = ratingObj.physicsB / secondDayCounter;

        ratingObj.chemistry = ratingObj.chemistry / secondDayCounter;
        ratingObj.chemistryA = ratingObj.chemistryA / secondDayCounter;
        ratingObj.chemistryB = ratingObj.chemistryB / secondDayCounter;

        ratingObj.biology = ratingObj.biology / secondDayCounter;
        ratingObj.biologyA = ratingObj.biologyA / secondDayCounter;
        ratingObj.biologyB = ratingObj.biologyB / secondDayCounter;

        let totalSecondDay = BtsRatings.findOne({
          academicYear: academicYear,
          btsNo: btsNo,
          grade: "8",
          schoolId: schoolId,
        });

        ratingObj.total =
          secondDayTotal / secondDayCounter + totalSecondDay.total;

        ratingObj.totalJaksiCount =
          ratingObj.geographyJaksiCount +
          ratingObj.physicsJaksiCount +
          ratingObj.chemistryJaksiCount +
          ratingObj.biologyJaksiCount +
          totalSecondDay.totalJaksiCount;
        ratingObj.totalOrtawaCount =
          ratingObj.geographyOrtawaCount +
          ratingObj.physicsOrtawaCount +
          ratingObj.chemistryOrtawaCount +
          ratingObj.biologyOrtawaCount +
          totalSecondDay.totalOrtawaCount;
        ratingObj.totalNawarCount =
          ratingObj.geographyNawarCount +
          ratingObj.physicsNawarCount +
          ratingObj.chemistryNawarCount +
          ratingObj.biologyNawarCount +
          totalSecondDay.totalNawarCount;
      }
      // console.log("8 grade count: "+(firstDayCounter+secondDayCounter));
      var sCount = firstDayCounter + secondDayCounter;

      ratingObj.totalJaksiCount =
        (ratingObj.totalJaksiCount * 100) / (sCount * 3);
      ratingObj.totalOrtawaCount =
        (ratingObj.totalOrtawaCount * 100) / (sCount * 3);
      ratingObj.totalNawarCount =
        (ratingObj.totalNawarCount * 100) / (sCount * 3);

      // ratingObj.totalJaksiCountBonus =
      //   (ratingObj.totalJaksiCountBonus * 100) / (sCount * 3);
      // ratingObj.totalOrtawaCountBonus =
      //   (ratingObj.totalOrtawaCountBonus * 100) / (sCount * 3);
      // ratingObj.totalNawarCountBonus =
      //   (ratingObj.totalNawarCountBonus * 100) / (sCount * 3);
    } else if (ratingObj.grade == "9") {
      if (firstDayCounter != 0) {
        ratingObj.mathematic = ratingObj.mathematic / firstDayCounter;
        ratingObj.mathematicA = ratingObj.mathematicA / firstDayCounter;
        ratingObj.mathematicB = ratingObj.mathematicB / firstDayCounter;
        ratingObj.physics = ratingObj.physics / firstDayCounter;
        ratingObj.physicsA = ratingObj.physicsA / firstDayCounter;
        ratingObj.physicsB = ratingObj.physicsB / firstDayCounter;

        ratingObj.chemistry = ratingObj.chemistry / firstDayCounter;
        ratingObj.chemistryA = ratingObj.chemistryA / firstDayCounter;
        ratingObj.chemistryB = ratingObj.chemistryB / firstDayCounter;

        // ratingObj.mathematicBonus = ratingObj.mathematicBonus / firstDayCounter;
        // ratingObj.mathematicBonusA =
        //   ratingObj.mathematicBonusA / firstDayCounter;
        // ratingObj.mathematicBonusB =
        //   ratingObj.mathematicBonusB / firstDayCounter;

        // ratingObj.physicsBonus = ratingObj.physicsBonus / firstDayCounter;
        // ratingObj.physicsBonusA = ratingObj.physicsBonusA / firstDayCounter;
        // ratingObj.physicsBonusB = ratingObj.physicsBonusB / firstDayCounter;

        // ratingObj.chemistryBonus = ratingObj.chemistryBonus / firstDayCounter;
        // ratingObj.chemistryBonusA = ratingObj.chemistryBonusA / firstDayCounter;
        // ratingObj.chemistryBonusB = ratingObj.chemistryBonusB / firstDayCounter;

        // ratingObj.total += firstDayTotal/firstDayCounter
        ratingObj.total +=
          ((ratingObj.mathematic + ratingObj.physics + ratingObj.chemistry) /
            3 /
            20) *
          100;
        // ratingObj.totalBonus +=
        //   ((ratingObj.mathematicBonus +
        //     ratingObj.physicsBonus +
        //     ratingObj.chemistryBonus) /
        //     3 /
        //     5) *
        //   100;

        ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.physicsJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.chemistryJaksiCount || 0;

        ratingObj.totalOrtawaCount += ratingObj.mathematicOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.physicsOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.chemistryOrtawaCount || 0;

        ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.physicsNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.chemistryNawarCount || 0;

        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.mathematicJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus += ratingObj.physicsJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.chemistryJaksiCountBonus || 0;

        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.mathematicOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.physicsOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.chemistryOrtawaCountBonus || 0;

        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.mathematicNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus += ratingObj.physicsNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.chemistryNawarCountBonus || 0;
      } else if (secondDayCounter != 0) {
        ratingObj.geography = ratingObj.geography / secondDayCounter;
        ratingObj.geographyA = ratingObj.geographyA / secondDayCounter;
        ratingObj.geographyB = ratingObj.geographyB / secondDayCounter;

        ratingObj.physics = ratingObj.physics / secondDayCounter;
        ratingObj.physicsA = ratingObj.physicsA / secondDayCounter;
        ratingObj.physicsB = ratingObj.physicsB / secondDayCounter;

        ratingObj.chemistry = ratingObj.chemistry / secondDayCounter;
        ratingObj.chemistryA = ratingObj.chemistryA / secondDayCounter;
        ratingObj.chemistryB = ratingObj.chemistryB / secondDayCounter;

        ratingObj.biology = ratingObj.biology / secondDayCounter;
        ratingObj.biologyA = ratingObj.biologyA / secondDayCounter;
        ratingObj.biologyB = ratingObj.biologyB / secondDayCounter;

        let totalSecondDay = BtsRatings.findOne({
          academicYear: academicYear,
          btsNo: btsNo,
          grade: "9",
          schoolId: schoolId,
        });

        ratingObj.total =
          secondDayTotal / secondDayCounter + totalSecondDay.total;

        ratingObj.totalJaksiCount =
          ratingObj.geographyJaksiCount +
          ratingObj.physicsJaksiCount +
          ratingObj.chemistryJaksiCount +
          ratingObj.biologyJaksiCount +
          totalSecondDay.totalJaksiCount;
        ratingObj.totalOrtawaCount =
          ratingObj.geographyOrtawaCount +
          ratingObj.physicsOrtawaCount +
          ratingObj.chemistryOrtawaCount +
          ratingObj.biologyOrtawaCount +
          totalSecondDay.totalOrtawaCount;
        ratingObj.totalNawarCount =
          ratingObj.geographyNawarCount +
          ratingObj.physicsNawarCount +
          ratingObj.chemistryNawarCount +
          ratingObj.biologyNawarCount +
          totalSecondDay.totalNawarCount;
      }
      // console.log("9 grade count: "+(firstDayCounter+secondDayCounter));
      var sCount = firstDayCounter + secondDayCounter;

      ratingObj.totalJaksiCount =
        (ratingObj.totalJaksiCount * 100) / (sCount * 3);
      ratingObj.totalOrtawaCount =
        (ratingObj.totalOrtawaCount * 100) / (sCount * 3);
      ratingObj.totalNawarCount =
        (ratingObj.totalNawarCount * 100) / (sCount * 3);

      // ratingObj.totalJaksiCountBonus =
      //   (ratingObj.totalJaksiCountBonus * 100) / (sCount * 3);
      // ratingObj.totalOrtawaCountBonus =
      //   (ratingObj.totalOrtawaCountBonus * 100) / (sCount * 3);
      // ratingObj.totalNawarCountBonus =
      //   (ratingObj.totalNawarCountBonus * 100) / (sCount * 3);
    } else if (ratingObj.grade == "10") {
      if (firstDayCounter != 0) {
        ratingObj.mathematic = ratingObj.mathematic / firstDayCounter;
        ratingObj.mathematicA = ratingObj.mathematicA / firstDayCounter;
        ratingObj.mathematicB = ratingObj.mathematicB / firstDayCounter;

        ratingObj.geography =
          ratingObj.geography /
          (electiveGroup_1_Count +
            electiveGroup_2_Count +
            electiveGroup_3_Count +
            electiveGroup_7_Count);
        ratingObj.geographyA =
          ratingObj.geographyA /
          (electiveGroup_1_Count +
            electiveGroup_2_Count +
            electiveGroup_3_Count +
            electiveGroup_7_Count);
        ratingObj.geographyB =
          ratingObj.geographyB /
          (electiveGroup_1_Count +
            electiveGroup_2_Count +
            electiveGroup_3_Count +
            electiveGroup_7_Count);

        ratingObj.physics =
          ratingObj.physics /
          (electiveGroup_1_Count +
            electiveGroup_4_Count +
            electiveGroup_5_Count);
        ratingObj.physicsA =
          ratingObj.physicsA /
          (electiveGroup_1_Count +
            electiveGroup_4_Count +
            electiveGroup_5_Count);
        ratingObj.physicsB =
          ratingObj.physicsB /
          (electiveGroup_1_Count +
            electiveGroup_4_Count +
            electiveGroup_5_Count);

        ratingObj.chemistry =
          ratingObj.chemistry /
          (electiveGroup_2_Count +
            electiveGroup_4_Count +
            electiveGroup_6_Count);
        ratingObj.chemistryA =
          ratingObj.chemistryA /
          (electiveGroup_2_Count +
            electiveGroup_4_Count +
            electiveGroup_6_Count);
        ratingObj.chemistryB =
          ratingObj.chemistryB /
          (electiveGroup_2_Count +
            electiveGroup_4_Count +
            electiveGroup_6_Count);

        ratingObj.biology =
          ratingObj.biology /
          (electiveGroup_3_Count +
            electiveGroup_5_Count +
            electiveGroup_6_Count);
        ratingObj.biologyA =
          ratingObj.biologyA /
          (electiveGroup_3_Count +
            electiveGroup_5_Count +
            electiveGroup_6_Count);
        ratingObj.biologyB =
          ratingObj.biologyB /
          (electiveGroup_3_Count +
            electiveGroup_5_Count +
            electiveGroup_6_Count);

        ratingObj.world_history =
          ratingObj.world_history / electiveGroup_7_Count;
        ratingObj.world_historyA =
          ratingObj.world_historyA / electiveGroup_7_Count;
        ratingObj.world_historyB =
          ratingObj.world_historyB / electiveGroup_7_Count;

        // ratingObj.mathematicBonus = ratingObj.mathematicBonus / firstDayCounter;
        // ratingObj.mathematicBonusA =
        //   ratingObj.mathematicBonusA / firstDayCounter;
        // ratingObj.mathematicBonusB =
        //   ratingObj.mathematicBonusB / firstDayCounter;

        // ratingObj.geographyBonus =
        //   ratingObj.geographyBonus /
        //   (electiveGroup_1_Count +
        //     electiveGroup_2_Count +
        //     electiveGroup_3_Count +
        //     electiveGroup_7_Count);
        // ratingObj.geographyBonusA =
        //   ratingObj.geographyBonusA /
        //   (electiveGroup_1_Count +
        //     electiveGroup_2_Count +
        //     electiveGroup_3_Count +
        //     electiveGroup_7_Count);
        // ratingObj.geographyBonusB =
        //   ratingObj.geographyBonusB /
        //   (electiveGroup_1_Count +
        //     electiveGroup_2_Count +
        //     electiveGroup_3_Count +
        //     electiveGroup_7_Count);

        // ratingObj.physicsBonus =
        //   ratingObj.physicsBonus /
        //   (electiveGroup_1_Count +
        //     electiveGroup_4_Count +
        //     electiveGroup_5_Count);
        // ratingObj.physicsBonusA =
        //   ratingObj.physicsBonusA /
        //   (electiveGroup_1_Count +
        //     electiveGroup_4_Count +
        //     electiveGroup_5_Count);
        // ratingObj.physicsBonusB =
        //   ratingObj.physicsBonusB /
        //   (electiveGroup_1_Count +
        //     electiveGroup_4_Count +
        //     electiveGroup_5_Count);

        // ratingObj.chemistryBonus =
        //   ratingObj.chemistryBonus /
        //   (electiveGroup_2_Count +
        //     electiveGroup_4_Count +
        //     electiveGroup_6_Count);
        // ratingObj.chemistryBonusA =
        //   ratingObj.chemistryBonusA /
        //   (electiveGroup_2_Count +
        //     electiveGroup_4_Count +
        //     electiveGroup_6_Count);
        // ratingObj.chemistryBonusB =
        //   ratingObj.chemistryBonusB /
        //   (electiveGroup_2_Count +
        //     electiveGroup_4_Count +
        //     electiveGroup_6_Count);

        // ratingObj.biologyBonus =
        //   ratingObj.biologyBonus /
        //   (electiveGroup_3_Count +
        //     electiveGroup_5_Count +
        //     electiveGroup_6_Count);
        // ratingObj.biologyBonusA =
        //   ratingObj.biologyBonusA /
        //   (electiveGroup_3_Count +
        //     electiveGroup_5_Count +
        //     electiveGroup_6_Count);
        // ratingObj.biologyBonusB =
        //   ratingObj.biologyBonusB /
        //   (electiveGroup_3_Count +
        //     electiveGroup_5_Count +
        //     electiveGroup_6_Count);

        // ratingObj.world_historyBonus =
        //   ratingObj.world_historyBonus / electiveGroup_7_Count;
        // ratingObj.world_historyBonusA =
        //   ratingObj.world_historyBonusA / electiveGroup_7_Count;
        // ratingObj.world_historyBonusB =
        //   ratingObj.world_historyBonusB / electiveGroup_7_Count;

        // console.log('math: ' + ratingObj.mathematic
        // + ',geography: ' + ratingObj.geography
        // + ',physics: ' + ratingObj.physics
        // + ',biology: ' + ratingObj.biology
        // + ',chemistry: ' + ratingObj.chemistry
        // + ',w_history: ' + ratingObj.world_history)
        // ratingObj.total = firstDayTotal/firstDayCounter
        //ratingObj.total += (ratingObj.mathematic + ratingObj.geography + ratingObj.physics + ratingObj.biology + ratingObj.chemistry + ratingObj.world_history)/20*100

        ratingObj.total = 0;
        if (ratingObj.mathematic) ratingObj.total += ratingObj.mathematic;
        if (ratingObj.geography) ratingObj.total += ratingObj.geography;
        if (ratingObj.physics) ratingObj.total += ratingObj.physics;
        if (ratingObj.biology) ratingObj.total += ratingObj.biology;
        if (ratingObj.chemistry) ratingObj.total += ratingObj.chemistry;
        if (ratingObj.world_history) ratingObj.total += ratingObj.world_history;

        // ratingObj.totalBonus = 0;
        // if (ratingObj.mathematicBonus)
        //   ratingObj.totalBonus += ratingObj.mathematicBonus;
        // if (ratingObj.geographyBonus)
        //   ratingObj.totalBonus += ratingObj.geographyBonus;
        // if (ratingObj.physicsBonus)
        //   ratingObj.totalBonus += ratingObj.physicsBonus;
        // if (ratingObj.biologyBonus)
        //   ratingObj.totalBonus += ratingObj.biologyBonus;
        // if (ratingObj.chemistryBonus)
        //   ratingObj.totalBonus += ratingObj.chemistryBonus;
        // if (ratingObj.world_historyBonus)
        //   ratingObj.totalBonus += ratingObj.world_historyBonus;

        //w_history, geography, physics, chemistry, biology
        let electiveCountFlags = [0, 0, 0, 0, 0];
        if (electiveGroup_1_Count > 0) {
          electiveCountFlags[1] = 1;
          electiveCountFlags[2] = 1;
        }
        if (electiveGroup_2_Count > 0) {
          electiveCountFlags[1] = 1;
          electiveCountFlags[3] = 1;
        }
        if (electiveGroup_3_Count > 0) {
          electiveCountFlags[1] = 1;
          electiveCountFlags[4] = 1;
        }
        if (electiveGroup_4_Count > 0) {
          electiveCountFlags[2] = 1;
          electiveCountFlags[3] = 1;
        }
        if (electiveGroup_5_Count > 0) {
          electiveCountFlags[2] = 1;
          electiveCountFlags[4] = 1;
        }
        if (electiveGroup_6_Count > 0) {
          electiveCountFlags[3] = 1;
          electiveCountFlags[4] = 1;
        }
        if (electiveGroup_7_Count > 0) {
          electiveCountFlags[0] = 1;
          electiveCountFlags[1] = 1;
        }

        let electiveCount = electiveCountFlags.filter((x) => x == 1).length;
        // console.log('TOTALIS: ' + ratingObj.total + ', ' + electiveCount);
        ratingObj.total = (ratingObj.total / (electiveCount + 1) / 20) * 100;
        // ratingObj.totalBonus =
        //   (ratingObj.totalBonus / (electiveCount + 1) / 5) * 100;

        ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.physicsJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.biologyJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.chemistryJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.geographyJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.world_historyJaksiCount || 0;

        ratingObj.totalOrtawaCount += ratingObj.mathematicOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.physicsOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.biologyOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.chemistryOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.geographyOrtawaCount || 0;
        ratingObj.totalOrtawaCount += ratingObj.world_historyOrtawaCount || 0;

        ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.physicsNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.biologyNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.chemistryNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.geographyNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.world_historyNawarCount || 0;

        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.mathematicJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus += ratingObj.physicsJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus += ratingObj.biologyJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.chemistryJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.geographyJaksiCountBonus || 0;
        // ratingObj.totalJaksiCountBonus +=
        //   ratingObj.world_historyJaksiCountBonus || 0;

        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.mathematicOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.physicsOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.biologyOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.chemistryOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.geographyOrtawaCountBonus || 0;
        // ratingObj.totalOrtawaCountBonus +=
        //   ratingObj.world_historyOrtawaCountBonus || 0;

        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.mathematicNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus += ratingObj.physicsNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus += ratingObj.biologyNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.chemistryNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.geographyNawarCountBonus || 0;
        // ratingObj.totalNawarCountBonus +=
        //   ratingObj.world_historyNawarCountBonus || 0;

        var sCount =
          electiveGroup_1_Count +
          electiveGroup_2_Count +
          electiveGroup_3_Count +
          electiveGroup_4_Count +
          electiveGroup_5_Count +
          electiveGroup_6_Count +
          electiveGroup_7_Count;

        ratingObj.totalJaksiCount =
          (ratingObj.totalJaksiCount * 100) / (sCount * 3);
        ratingObj.totalOrtawaCount =
          (ratingObj.totalOrtawaCount * 100) / (sCount * 3);
        ratingObj.totalNawarCount =
          (ratingObj.totalNawarCount * 100) / (sCount * 3);

        // ratingObj.totalJaksiCountBonus =
        //   (ratingObj.totalJaksiCountBonus * 100) / (sCount * 3);
        // ratingObj.totalOrtawaCountBonus =
        //   (ratingObj.totalOrtawaCountBonus * 100) / (sCount * 3);
        // ratingObj.totalNawarCountBonus =
        //   (ratingObj.totalNawarCountBonus * 100) / (sCount * 3);
      }
    }

    // insert rating to db
    var sameRating = BtsRatings.findOne({
      btsNo: btsNo,
      academicYear: academicYear,
      schoolId: schoolId,
      grade: grade,
    });

    if (!sameRating) {
      BtsRatings.insert(ratingObj);
    } else {
      BtsRatings.update(
        { _id: sameRating._id },
        {
          $set: ratingObj,
        }
      );
    }

    return ratingObj;
  };

  var mathematicCount = 0;
  var turkish_langCount = 0;
  var russian_langCount = 0;
  var kazakh_langCount = 0;
  var kazakh_historyCount = 0;
  var world_historyCount = 0;
  var geographyCount = 0;
  var physicsCount = 0;
  var chemistryCount = 0;
  var biologyCount = 0;

  var totalRating = {};

  if (day == "1") {
    grades = gradesFirstDay;

    totalRating = {
      academicYear: academicYear,
      btsNo: btsNo,
      schoolId: schoolId,
      grade: "all",
      mathematic: 0,
      mathematicA: 0,
      mathematicB: 0,
      turkish_lang: 0,
      turkish_langA: 0,
      turkish_langB: 0,
      kazakh_history: 0,
      kazakh_historyA: 0,
      kazakh_historyB: 0,
      world_history: 0,
      world_historyA: 0,
      world_historyB: 0,
      geography: 0,
      geographyA: 0,
      geographyB: 0,
      physics: 0,
      physicsA: 0,
      physicsB: 0,
      chemistry: 0,
      chemistryA: 0,
      chemistryB: 0,
      biology: 0,
      biologyA: 0,
      biologyB: 0,
      kazakh_lang: 0,
      kazakh_langA: 0,
      kazakh_langB: 0,
      russian_lang: 0,
      total_1_day: 0,
      total: 0,
      totalInProcent: 0,
      totalA: 0,
      totalB: 0,
      // mathematicBonus: 0,
      // mathematicBonusA: 0,
      // mathematicBonusB: 0,
      // turkish_langBonus: 0,
      // turkish_langBonusA: 0,
      // turkish_langBonusB: 0,
      // kazakh_historyBonus: 0,
      // kazakh_historyBonusA: 0,
      // kazakh_historyBonusB: 0,
      // world_historyBonus: 0,
      // world_historyBonusA: 0,
      // world_historyBonusB: 0,
      // geographyBonus: 0,
      // geographyBonusA: 0,
      // geographyBonusB: 0,
      // physicsBonus: 0,
      // physicsBonusA: 0,
      // physicsBonusB: 0,
      // chemistryBonus: 0,
      // chemistryBonusA: 0,
      // chemistryBonusB: 0,
      // biologyBonus: 0,
      // biologyBonusA: 0,
      // biologyBonusB: 0,
      // kazakh_langBonus: 0,
      // kazakh_langBonusA: 0,
      // kazakh_langBonusB: 0,
      // russian_langBonus: 0,
      // total_1_dayBonus: 0,
      // totalBonus: 0,
      // totalInProcentBonus: 0,
      // totalBonusA: 0,
      // totalBonusB: 0,
    };
  } else {
    grades = gradesSecondDay;

    totalRating = {
      academicYear: academicYear,
      btsNo: btsNo,
      schoolId: schoolId,
      grade: "all",
      geography: 0,
      geographyA: 0,
      geographyB: 0,
      physics: 0,
      physicsA: 0,
      physicsB: 0,
      chemistry: 0,
      chemistryA: 0,
      chemistryB: 0,
      biology: 0,
      biologyA: 0,
      biologyB: 0,
      total: 0,
      totalInProcent: 0,
      totalA: 0,
      totalB: 0,
    };
  }

  _.each(grades, (grade) => {
    let gradeRating = calculateBtsRatingForGrade(
      academicYear,
      btsNo,
      schoolId,
      grade
    );

    if (grade == "7") {
      if (btsNo == "1" || btsNo == "2" || btsNo == "3") {
        totalRating.mathematic += gradeRating.mathematic || 0;
        totalRating.mathematicA += gradeRating.mathematicA || 0;
        totalRating.mathematicB += gradeRating.mathematicB || 0;

        totalRating.kazakh_lang += gradeRating.kazakh_lang || 0;
        totalRating.kazakh_langA += gradeRating.kazakh_langA || 0;
        totalRating.kazakh_langB += gradeRating.kazakh_langB || 0;

        totalRating.geography += gradeRating.geography || 0;
        totalRating.geographyA += gradeRating.geographyA || 0;
        totalRating.geographyB += gradeRating.geographyB || 0;

        // totalRating.mathematicBonus += gradeRating.mathematicBonus || 0;
        // totalRating.mathematicBonusA += gradeRating.mathematicBonusA || 0;
        // totalRating.mathematicBonusB += gradeRating.mathematicBonusB || 0;

        // totalRating.kazakh_langBonus += gradeRating.kazakh_langBonus || 0;
        // totalRating.kazakh_langBonusA += gradeRating.kazakh_langBonusA || 0;
        // totalRating.kazakh_langBonusB += gradeRating.kazakh_langBonusB || 0;

        // totalRating.geographyBonus += gradeRating.geographyBonus || 0;
        // totalRating.geographyBonusA += gradeRating.geographyBonusA || 0;
        // totalRating.geographyBonusB += gradeRating.geographyBonusB || 0;

        //totalRating.russian_lang += (gradeRating.russian_lang || 0)
      }
    } else if (grade == "8") {
      if (day == "1") {
        totalRating.mathematic += gradeRating.mathematic || 0;
        totalRating.mathematicA += gradeRating.mathematicA || 0;
        totalRating.mathematicB += gradeRating.mathematicB || 0;

        totalRating.physics += gradeRating.physics || 0;
        totalRating.physicsA += gradeRating.physicsA || 0;
        totalRating.physicsB += gradeRating.physicsB || 0;

        totalRating.biology += gradeRating.biology || 0;
        totalRating.biologyA += gradeRating.biologyA || 0;
        totalRating.biologyB += gradeRating.biologyB || 0;

        // totalRating.mathematicBonus += gradeRating.mathematicBonus || 0;
        // totalRating.mathematicBonusA += gradeRating.mathematicBonusA || 0;
        // totalRating.mathematicBonusB += gradeRating.mathematicBonusB || 0;

        // totalRating.physicsBonus += gradeRating.physicsBonus || 0;
        // totalRating.physicsBonusA += gradeRating.physicsBonusA || 0;
        // totalRating.physicsBonusB += gradeRating.physicsBonusB || 0;

        // totalRating.biologyBonus += gradeRating.biologyBonus || 0;
        // totalRating.biologyBonusA += gradeRating.biologyBonusA || 0;
        // totalRating.biologyBonusB += gradeRating.biologyBonusB || 0;
      }
      if (day == "2") {
        totalRating.geography += gradeRating.geography || 0;
        totalRating.geographyA += gradeRating.geographyA || 0;
        totalRating.geographyB += gradeRating.geographyB || 0;

        totalRating.physics += gradeRating.physics || 0;
        totalRating.physicsA += gradeRating.physicsA || 0;
        totalRating.physicsB += gradeRating.physicsB || 0;

        totalRating.chemistry += gradeRating.chemistry || 0;
        totalRating.chemistryA += gradeRating.chemistryA || 0;
        totalRating.chemistryB += gradeRating.chemistryB || 0;

        totalRating.biology += gradeRating.biology || 0;
        totalRating.biologyA += gradeRating.biologyA || 0;
        totalRating.biologyB += gradeRating.biologyB || 0;
      }
    } else if (grade == "9") {
      if (day == "1") {
        totalRating.mathematic += gradeRating.mathematic || 0;
        totalRating.mathematicA += gradeRating.mathematicA || 0;
        totalRating.mathematicB += gradeRating.mathematicB || 0;

        totalRating.physics += gradeRating.physics || 0;
        totalRating.physicsA += gradeRating.physicsA || 0;
        totalRating.physicsB += gradeRating.physicsB || 0;

        totalRating.chemistry += gradeRating.chemistry || 0;
        totalRating.chemistryA += gradeRating.chemistryA || 0;
        totalRating.chemistryB += gradeRating.chemistryB || 0;

        // totalRating.mathematicBonus += gradeRating.mathematicBonus || 0;
        // totalRating.mathematicBonusA += gradeRating.mathematicBonusA || 0;
        // totalRating.mathematicBonusB += gradeRating.mathematicBonusB || 0;

        // totalRating.physicsBonus += gradeRating.physicsBonus || 0;
        // totalRating.physicsBonusA += gradeRating.physicsBonusA || 0;
        // totalRating.physicsBonusB += gradeRating.physicsBonusB || 0;

        // totalRating.chemistryBonus += gradeRating.chemistryBonus || 0;
        // totalRating.chemistryBonusA += gradeRating.chemistryBonusA || 0;
        // totalRating.chemistryBonusB += gradeRating.chemistryBonusB || 0;
      }
      if (day == "2") {
        totalRating.geography += gradeRating.geography || 0;
        totalRating.geographyA += gradeRating.geographyA || 0;
        totalRating.geographyB += gradeRating.geographyB || 0;

        totalRating.physics += gradeRating.physics || 0;
        totalRating.physicsA += gradeRating.physicsA || 0;
        totalRating.physicsB += gradeRating.physicsB || 0;

        totalRating.chemistry += gradeRating.chemistry || 0;
        totalRating.chemistryA += gradeRating.chemistryA || 0;
        totalRating.chemistryB += gradeRating.chemistryB || 0;

        totalRating.biology += gradeRating.biology || 0;
        totalRating.biologyA += gradeRating.biologyA || 0;
        totalRating.biologyB += gradeRating.biologyB || 0;
      }
    } else if (grade == "10") {
      totalRating.mathematic += gradeRating.mathematic || 0;
      totalRating.mathematicA += gradeRating.mathematicA || 0;
      totalRating.mathematicB += gradeRating.mathematicB || 0;

      totalRating.geography += gradeRating.geography || 0;
      totalRating.geographyA += gradeRating.geographyA || 0;
      totalRating.geographyB += gradeRating.geographyB || 0;

      totalRating.physics += gradeRating.physics || 0;
      totalRating.physicsA += gradeRating.physicsA || 0;
      totalRating.physicsB += gradeRating.physicsB || 0;

      totalRating.chemistry += gradeRating.chemistry || 0;
      totalRating.chemistryA += gradeRating.chemistryA || 0;
      totalRating.chemistryB += gradeRating.chemistryB || 0;

      totalRating.biology += gradeRating.biology || 0;
      totalRating.biologyA += gradeRating.biologyA || 0;
      totalRating.biologyB += gradeRating.biologyB || 0;

      totalRating.world_history += gradeRating.world_history || 0;
      totalRating.world_historyA += gradeRating.world_historyA || 0;
      totalRating.world_historyB += gradeRating.world_historyB || 0;

      // totalRating.mathematicBonus += gradeRating.mathematicBonus || 0;
      // totalRating.mathematicBonusA += gradeRating.mathematicBonusA || 0;
      // totalRating.mathematicBonusB += gradeRating.mathematicBonusB || 0;

      // totalRating.geographyBonus += gradeRating.geographyBonus || 0;
      // totalRating.geographyBonusA += gradeRating.geographyBonusA || 0;
      // totalRating.geographyBonusB += gradeRating.geographyBonusB || 0;

      // totalRating.physicsBonus += gradeRating.physicsBonus || 0;
      // totalRating.physicsBonusA += gradeRating.physicsBonusA || 0;
      // totalRating.physicsBonusB += gradeRating.physicsBonusB || 0;

      // totalRating.chemistryBonus += gradeRating.chemistryBonus || 0;
      // totalRating.chemistryBonusA += gradeRating.chemistryBonusA || 0;
      // totalRating.chemistryBonusB += gradeRating.chemistryBonusB || 0;

      // totalRating.biologyBonus += gradeRating.biologyBonus || 0;
      // totalRating.biologyBonusA += gradeRating.biologyBonusA || 0;
      // totalRating.biologyBonusB += gradeRating.biologyBonusB || 0;

      // totalRating.world_historyBonus += gradeRating.world_historyBonus || 0;
      // totalRating.world_historyBonusA += gradeRating.world_historyBonusA || 0;
      // totalRating.world_historyBonusB += gradeRating.world_historyBonusB || 0;
    }

    mathematicCount += gradeRating.mathematic ? 1 : 0;
    russian_langCount += gradeRating.russian_lang ? 1 : 0;
    kazakh_langCount += gradeRating.kazakh_lang ? 1 : 0;
    kazakh_historyCount += gradeRating.kazakh_history ? 1 : 0;
    geographyCount += gradeRating.geography ? 1 : 0;
    physicsCount += gradeRating.physics ? 1 : 0;
    chemistryCount += gradeRating.chemistry ? 1 : 0;
    biologyCount += gradeRating.biology ? 1 : 0;
    world_historyCount += gradeRating.world_history ? 1 : 0;
  });

  var sameSchoolRating2 = BtsRatings.findOne({
    btsNo: btsNo,
    schoolId: schoolId,
    academicYear: academicYear,
    grade: "all",
  });

  if (day == "1") {
    totalRating.mathematic /= mathematicCount || 1;
    totalRating.mathematicA /= mathematicCount || 1;
    totalRating.mathematicB /= mathematicCount || 1;

    totalRating.kazakh_lang /= kazakh_langCount || 1;
    totalRating.kazakh_langA /= kazakh_langCount || 1;
    totalRating.kazakh_langB /= kazakh_langCount || 1;

    totalRating.geography /= geographyCount || 1;
    totalRating.geographyA /= geographyCount || 1;
    totalRating.geographyB /= geographyCount || 1;
    totalRating.physics /= physicsCount || 1;
    totalRating.physicsA /= physicsCount || 1;
    totalRating.physicsB /= physicsCount || 1;
    totalRating.chemistry /= chemistryCount || 1;
    totalRating.chemistryA /= chemistryCount || 1;
    totalRating.chemistryB /= chemistryCount || 1;
    totalRating.biology /= biologyCount || 1;
    totalRating.biologyA /= biologyCount || 1;
    totalRating.biologyB /= biologyCount || 1;
    totalRating.world_history /= world_historyCount || 1;
    totalRating.world_historyA /= world_historyCount || 1;
    totalRating.world_historyB /= world_historyCount || 1;

    // console.log(totalRating);

    totalRating.total += totalRating.mathematic || 0;
    totalRating.total += totalRating.turkish_lang || 0;
    totalRating.total += totalRating.geography || 0;
    totalRating.total += totalRating.physics || 0;
    totalRating.total += totalRating.chemistry || 0;
    totalRating.total += totalRating.biology || 0;
    totalRating.total += totalRating.kazakh_lang || 0;
    totalRating.total += totalRating.world_history || 0;

    // totalRating.mathematicBonus /= mathematicCount || 1;
    // totalRating.mathematicBonusA /= mathematicCount || 1;
    // totalRating.mathematicBonusB /= mathematicCount || 1;

    // totalRating.kazakh_langBonus /= kazakh_langCount || 1;
    // totalRating.kazakh_langBonusA /= kazakh_langCount || 1;
    // totalRating.kazakh_langBonusB /= kazakh_langCount || 1;

    // totalRating.geographyBonus /= geographyCount || 1;
    // totalRating.geographyBonusA /= geographyCount || 1;
    // totalRating.geographyBonusB /= geographyCount || 1;
    // totalRating.physicsBonus /= physicsCount || 1;
    // totalRating.physicsBonusA /= physicsCount || 1;
    // totalRating.physicsBonusB /= physicsCount || 1;
    // totalRating.chemistryBonus /= chemistryCount || 1;
    // totalRating.chemistryBonusA /= chemistryCount || 1;
    // totalRating.chemistryBonusB /= chemistryCount || 1;
    // totalRating.biologyBonus /= biologyCount || 1;
    // totalRating.biologyBonusA /= biologyCount || 1;
    // totalRating.biologyBonusB /= biologyCount || 1;
    // totalRating.world_historyBonus /= world_historyCount || 1;
    // totalRating.world_historyBonusA /= world_historyCount || 1;
    // totalRating.world_historyBonusB /= world_historyCount || 1;

    // console.log(totalRating);

    // totalRating.totalBonus += totalRating.mathematicBonus || 0;
    // totalRating.totalBonus += totalRating.turkish_langBonus || 0;
    // totalRating.totalBonus += totalRating.geographyBonus || 0;
    // totalRating.totalBonus += totalRating.physicsBonus || 0;
    // totalRating.totalBonus += totalRating.chemistryBonus || 0;
    // totalRating.totalBonus += totalRating.biologyBonus || 0;
    // totalRating.totalBonus += totalRating.kazakh_langBonus || 0;
    // totalRating.totalBonus += totalRating.world_historyBonus || 0;

    let totalCount = 0;
    // console.log('1: ' + mathematicCount
    // + ', 2: ' + kazakh_langCount
    // + ', 3: ' + turkish_langCount
    // + ', 4: ' + geographyCount
    // + ', 5: ' + physicsCount
    // + ', 6: ' + chemistryCount
    // + ', 7: ' + biologyCount
    // + ', 8: ' + world_historyCount)
    totalCount += mathematicCount > 0 ? 1 : 0;
    totalCount += kazakh_langCount > 0 ? 1 : 0;
    totalCount += turkish_langCount > 0 ? 1 : 0;
    totalCount += geographyCount > 0 ? 1 : 0;
    totalCount += physicsCount > 0 ? 1 : 0;
    totalCount += chemistryCount > 0 ? 1 : 0;
    totalCount += biologyCount > 0 ? 1 : 0;
    totalCount += world_historyCount > 0 ? 1 : 0;
    //console.log('Total sum and count: ' + totalRating.total + ", " + totalCount);
    totalRating.total /= totalCount;
    totalRating.total = (totalRating.total / 20) * 100;
    // totalRating.total_1_day = totalRating.total
    // totalRating.totalInProcent = 999;

    // totalRating.totalBonus /= totalCount;
    // totalRating.totalBonus = (totalRating.totalBonus / 5) * 100;

    totalRating.totalA += totalRating.mathematicA || 0;
    totalRating.totalA += totalRating.turkish_langA || 0;
    totalRating.totalA += totalRating.geographyA || 0;
    totalRating.totalA += totalRating.physicsA || 0;
    totalRating.totalA += totalRating.chemistryA || 0;
    totalRating.totalA += totalRating.biologyA || 0;
    totalRating.totalA += totalRating.kazakh_langA || 0;
    totalRating.totalA += totalRating.world_historyA || 0;

    //console.log('TotalA sum and count: ' + totalRating.totalA + ", " + totalCount);
    totalRating.totalA /= totalCount;

    // totalRating.totalBonusA += totalRating.mathematicBonusA || 0;
    // totalRating.totalBonusA += totalRating.turkish_langBonusA || 0;
    // totalRating.totalBonusA += totalRating.geographyBonusA || 0;
    // totalRating.totalBonusA += totalRating.physicsBonusA || 0;
    // totalRating.totalBonusA += totalRating.chemistryBonusA || 0;
    // totalRating.totalBonusA += totalRating.biologyBonusA || 0;
    // totalRating.totalBonusA += totalRating.kazakh_langBonusA || 0;
    // totalRating.totalBonusA += totalRating.world_historyBonusA || 0;

    //console.log('TotalA sum and count: ' + totalRating.totalA + ", " + totalCount);
    // totalRating.totalBonusA /= totalCount;

    totalRating.totalB += totalRating.mathematicB || 0;
    totalRating.totalB += totalRating.turkish_langB || 0;
    totalRating.totalB += totalRating.geographyB || 0;
    totalRating.totalB += totalRating.physicsB || 0;
    totalRating.totalB += totalRating.chemistryB || 0;
    totalRating.totalB += totalRating.biologyB || 0;
    totalRating.totalB += totalRating.kazakh_langB || 0;
    totalRating.totalB += totalRating.world_historyB || 0;

    //console.log('TotalB sum and count: ' + totalRating.totalB + ", " + totalCount);
    totalRating.totalB /= totalCount;

    // totalRating.totalBonusB += totalRating.mathematicBonusB || 0;
    // totalRating.totalBonusB += totalRating.turkish_langBonusB || 0;
    // totalRating.totalBonusB += totalRating.geographyBonusB || 0;
    // totalRating.totalBonusB += totalRating.physicsBonusB || 0;
    // totalRating.totalBonusB += totalRating.chemistryBonusB || 0;
    // totalRating.totalBonusB += totalRating.biologyBonusB || 0;
    // totalRating.totalBonusB += totalRating.kazakh_langBonusB || 0;
    // totalRating.totalBonusB += totalRating.world_historyBonusB || 0;

    //console.log('TotalB sum and count: ' + totalRating.totalB + ", " + totalCount);
    // totalRating.totalBonusB /= totalCount;
  } else if (day == "2") {
    totalRating.geography /= geographyCount || 1;
    totalRating.geographyA /= geographyCount || 1;
    totalRating.geographyB /= geographyCount || 1;
    totalRating.physics /= physicsCount || 1;
    totalRating.physicsA /= physicsCount || 1;
    totalRating.physicsB /= physicsCount || 1;
    totalRating.chemistry /= chemistryCount || 1;
    totalRating.chemistryA /= chemistryCount || 1;
    totalRating.chemistryB /= chemistryCount || 1;
    totalRating.biology /= biologyCount || 1;
    totalRating.biologyA /= biologyCount || 1;
    totalRating.biologyB /= biologyCount || 1;

    // total_1_day = totalRating.mathematic + totalRating.turkish_lang + totalRating.kazakh_lang + totalRating.kazakh_history;

    // totalRating.total =  (sameSchoolRating2["total_1_day"] || 0)
    totalRating.totalInProcent = 888;
  }

  // let totalOfTotal = (mathTotalProcent + tTotalProcent + rTotalProcent) / 3;
  var sameSchoolRating = BtsRatings.findOne({
    btsNo: btsNo,
    schoolId: schoolId,
    academicYear: academicYear,
    grade: "all",
  });

  if (sameSchoolRating) {
    BtsRatings.update({ _id: sameSchoolRating._id }, { $set: totalRating });
  } else {
    BtsRatings.insert(totalRating);
  }

  console.log(
    "================================================================"
  );
};
