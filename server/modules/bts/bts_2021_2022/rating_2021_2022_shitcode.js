export const calculateRating = (academicYear, btsNo, day, schoolId) => {
  let gradesFirstDay = ["7", "8", "9", "10"];
  let gradesSecondDay = ["7", "8", "9"];

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
        mathematicC: 0,
        mathematicJaksiCount: 0,
        mathematicNawarCount: 0,
        turkish_lang: 0,
        turkish_langA: 0,
        turkish_langB: 0,
        turkish_langC: 0,
        turkish_langJaksiCount: 0,
        turkish_langNawarCount: 0,
        kazakh_history: 0,
        kazakh_historyA: 0,
        kazakh_historyB: 0,
        kazakh_historyC: 0,
        kazakh_historyJaksiCount: 0,
        kazakh_historyNawarCount: 0,
        geography: 0,
        geographyA: 0,
        geographyB: 0,
        geographyC: 0,
        geographyJaksiCount: 0,
        geographyNawarCount: 0,
        chemistry: 0,
        chemistryA: 0,
        chemistryB: 0,
        chemistryC: 0,
        chemistryJaksiCount: 0,
        chemistryNawarCount: 0,
        kazakh_lang: 0,
        kazakh_langA: 0,
        kazakh_langB: 0,
        kazakh_langC: 0,
        kazakh_langJaksiCount: 0,
        kazakh_langNawarCount: 0,
        total: 0,
        totalA: 0,
        totalB: 0,
        totalC: 0,
        totalJaksiCount: 0,
        totalNawarCount: 0,
      };
    } else if (day == "2") {
      ratingObj = {
        academicYear: academicYear,
        btsNo: btsNo,
        schoolId: schoolId,
        grade: grade,
        mathematic: 0,
        mathematicA: 0,
        mathematicB: 0,
        mathematicC: 0,
        mathematicJaksiCount: 0,
        mathematicNawarCount: 0,
        russian_lang: 0,
        russian_langA: 0,
        russian_langB: 0,
        russian_langC: 0,
        russian_langJaksiCount: 0,
        russian_langNawarCount: 0,
        physics: 0,
        physicsA: 0,
        physicsB: 0,
        physicsC: 0,
        physicsJaksiCount: 0,
        physicsNawarCount: 0,
        biology: 0,
        biologyA: 0,
        biologyB: 0,
        biologyC: 0,
        biologyJaksiCount: 0,
        biologyNawarCount: 0,
        kazakh_lang: 0,
        kazakh_langA: 0,
        kazakh_langB: 0,
        kazakh_langC: 0,
        kazakh_langJaksiCount: 0,
        kazakh_langNawarCount: 0,
        turkish_lang: 0,
        turkish_langA: 0,
        turkish_langB: 0,
        turkish_langC: 0,
        turkish_langJaksiCount: 0,
        turkish_langNawarCount: 0,
        total: 0,
        totalA: 0,
        totalB: 0,
        totalC: 0,
        totalJaksiCount: 0,
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

    if (ratingObj.grade == "7") {
      _.each(records, (record) => {
        if (day === "1") {
          if (btsNo == "1" || btsNo == "2" || btsNo == "3") {
            ratingObj.kazakh_lang += record.kazakh_lang || 0;
            ratingObj.kazakh_langA += record.kazakh_langA || 0;
            ratingObj.kazakh_langB += record.kazakh_langB || 0;
            ratingObj.kazakh_langC += record.kazakh_langC || 0;

            if (record.kazakh_lang >= 10) {
              ratingObj.kazakh_langJaksiCount++;
            } else ratingObj.kazakh_langNawarCount++;

            ratingObj.geography += record.geography || 0;
            ratingObj.geographyA += record.geographyA || 0;
            ratingObj.geographyB += record.geographyB || 0;
            ratingObj.geographyC += record.geographyC || 0;

            if (record.geography >= 10) ratingObj.geographyJaksiCount++;
            else ratingObj.geographyNawarCount++;

            ratingObj.kazakh_history += record.kazakh_history || 0;
            ratingObj.kazakh_historyA += record.kazakh_historyA || 0;
            ratingObj.kazakh_historyB += record.kazakh_historyB || 0;
            ratingObj.kazakh_historyC += record.kazakh_historyC || 0;

            if (record.kazakh_history >= 10)
              ratingObj.kazakh_historyJaksiCount++;
            else ratingObj.kazakh_historyNawarCount++;
          }

          firstDayCounter++;
          firstDayTotal += record.day_1_total || 0;
        } else if (day === "2") {
          ratingObj.mathematic += record.mathematic || 0;
          ratingObj.mathematicA += record.mathematicA || 0;
          ratingObj.mathematicB += record.mathematicB || 0;
          ratingObj.mathematicC += record.mathematicC || 0;
          console.log(ratingObj.mathematic);

          if (record.mathematic >= 10) ratingObj.mathematicJaksiCount++;
          else ratingObj.mathematicNawarCount++;

          ratingObj.russian_lang += record.russian_lang || 0;
          ratingObj.russian_langA += record.russian_langA || 0;
          ratingObj.russian_langB += record.russian_langB || 0;
          ratingObj.russian_langC += record.russian_langC || 0;

          if (record.russian_lang >= 10) ratingObj.russian_langJaksiCount++;
          else ratingObj.russian_langNawarCount++;

          secondDayCounter++;
          secondDayTotal += record.day_2_total || 0;
        }
      });
    } else if (ratingObj.grade == "8") {
      _.each(records, (record) => {
        if (day == "1") {
          ratingObj.mathematic += record.mathematic || 0;
          ratingObj.mathematicA += record.mathematicA || 0;
          ratingObj.mathematicB += record.mathematicB || 0;
          ratingObj.mathematicC += record.mathematicC || 0;

          if (record.mathematic >= 10) ratingObj.mathematicJaksiCount++;
          else ratingObj.mathematicNawarCount++;

          ratingObj.chemistry += record.chemistry || 0;
          ratingObj.chemistryA += record.chemistryA || 0;
          ratingObj.chemistryB += record.chemistryB || 0;
          ratingObj.chemistryC += record.chemistryC || 0;

          if (record.chemistry >= 10) ratingObj.chemistryJaksiCount++;
          else ratingObj.chemistryNawarCount++;

          ratingObj.geography += record.geography || 0;
          ratingObj.geographyA += record.geographyA || 0;
          ratingObj.geographyB += record.geographyB || 0;
          ratingObj.geographyC += record.geographyC || 0;

          if (record.geography >= 10) ratingObj.geographyJaksiCount++;
          else ratingObj.geographyNawarCount++;

          firstDayCounter++;
          firstDayTotal += record.day_1_total || 0;
        } else if (day == "2") {
          ratingObj.physics += record.physics || 0;
          ratingObj.physicsA += record.physicsA || 0;
          ratingObj.physicsB += record.physicsB || 0;
          ratingObj.physicsC += record.physicsC || 0;

          if (record.physics >= 10) ratingObj.physicsJaksiCount++;
          else ratingObj.physicsNawarCount++;

          ratingObj.biology += record.biology || 0;
          ratingObj.biologyA += record.biologyA || 0;
          ratingObj.biologyB += record.biologyB || 0;
          ratingObj.biologyC += record.biologyC || 0;

          if (record.biology >= 10) ratingObj.biologyJaksiCount++;
          else ratingObj.biologyNawarCount++;

          ratingObj.kazakh_lang += record.kazakh_lang || 0;
          ratingObj.kazakh_langA += record.kazakh_langA || 0;
          ratingObj.kazakh_langB += record.kazakh_langB || 0;
          ratingObj.kazakh_langC += record.kazakh_langC || 0;

          if (record.kazakh_lang >= 10) {
            ratingObj.kazakh_langJaksiCount++;
          } else ratingObj.kazakh_langNawarCount++;

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
          ratingObj.mathematicC += record.mathematicC || 0;

          if (record.mathematic >= 10) ratingObj.mathematicJaksiCount++;
          else ratingObj.mathematicNawarCount++;

          ratingObj.chemistry += record.chemistry || 0;
          ratingObj.chemistryA += record.chemistryA || 0;
          ratingObj.chemistryB += record.chemistryB || 0;
          ratingObj.chemistryC += record.chemistryC || 0;

          if (record.chemistry >= 10) ratingObj.chemistryJaksiCount++;
          else ratingObj.chemistryNawarCount++;

          ratingObj.geography += record.geography || 0;
          ratingObj.geographyA += record.geographyA || 0;
          ratingObj.geographyB += record.geographyB || 0;
          ratingObj.geographyC += record.geographyC || 0;

          if (record.geography >= 10) ratingObj.geographyJaksiCount++;
          else ratingObj.geographyNawarCount++;

          firstDayCounter++;
          firstDayTotal += record.day_1_total || 0;
        } else if (day == "2") {
          ratingObj.physics += record.physics || 0;
          ratingObj.physicsA += record.physicsA || 0;
          ratingObj.physicsB += record.physicsB || 0;
          ratingObj.physicsC += record.physicsC || 0;

          if (record.physics >= 10) ratingObj.physicsJaksiCount++;
          else ratingObj.physicsNawarCount++;

          ratingObj.biology += record.biology || 0;
          ratingObj.biologyA += record.biologyA || 0;
          ratingObj.biologyB += record.biologyB || 0;
          ratingObj.biologyC += record.biologyC || 0;

          if (record.biology >= 10) ratingObj.biologyJaksiCount++;
          else ratingObj.biologyNawarCount++;

          ratingObj.turkish_lang += record.turkish_lang || 0;
          ratingObj.turkish_langA += record.turkish_langA || 0;
          ratingObj.turkish_langB += record.turkish_langB || 0;
          ratingObj.turkish_langC += record.turkish_langC || 0;

          if (record.turkish_lang >= 10) ratingObj.turkish_langJaksiCount++;
          else ratingObj.turkish_langNawarCount++;

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
          ratingObj.mathematicC += record.mathematicC || 0;

          if (record.mathematic >= 10) ratingObj.mathematicJaksiCount++;
          else ratingObj.mathematicNawarCount++;

          ratingObj.kazakh_history += record.kazakh_history || 0;
          ratingObj.kazakh_historyA += record.kazakh_historyA || 0;
          ratingObj.kazakh_historyB += record.kazakh_historyB || 0;
          ratingObj.kazakh_historyC += record.kazakh_historyC || 0;

          if (record.kazakh_history >= 10) ratingObj.kazakh_historyJaksiCount++;
          else ratingObj.kazakh_historyNawarCount++;

          ratingObj.turkish_lang += record.turkish_lang || 0;
          ratingObj.turkish_langA += record.turkish_langA || 0;
          ratingObj.turkish_langB += record.turkish_langB || 0;
          ratingObj.turkish_langC += record.turkish_langC || 0;

          if (record.turkish_lang >= 10) ratingObj.turkish_langJaksiCount++;
          else ratingObj.turkish_langNawarCount++;

          firstDayCounter++;
          firstDayTotal += record.day_1_total || 0;
        }
      });
    }

    if (ratingObj.grade == "7") {
      if (firstDayCounter != 0) {
        if (btsNo == "1" || btsNo == "2" || btsNo == "3") {
          ratingObj.kazakh_lang = ratingObj.kazakh_lang / firstDayCounter;
          ratingObj.kazakh_langA = ratingObj.kazakh_langA / firstDayCounter;
          ratingObj.kazakh_langB = ratingObj.kazakh_langB / firstDayCounter;
          ratingObj.kazakh_langC = ratingObj.kazakh_langC / firstDayCounter;

          ratingObj.geography = ratingObj.geography / firstDayCounter;
          ratingObj.geographyA = ratingObj.geographyA / firstDayCounter;
          ratingObj.geographyB = ratingObj.geographyB / firstDayCounter;
          ratingObj.geographyC = ratingObj.geographyC / firstDayCounter;

          ratingObj.kazakh_history = ratingObj.kazakh_history / firstDayCounter;
          ratingObj.kazakh_historyA =
            ratingObj.kazakh_historyA / firstDayCounter;
          ratingObj.kazakh_historyB =
            ratingObj.kazakh_historyB / firstDayCounter;
          ratingObj.kazakh_historyC =
            ratingObj.kazakh_historyC / firstDayCounter;
        }

        ratingObj.total += firstDayTotal / firstDayCounter;
        // let count = 0;
        // if (ratingObj.mathematic > 0) count++;
        // if (ratingObj.kazakh_lang > 0) count++;
        // if (ratingObj.geography > 0) count++;
        // ratingObj.total +=
        //   ((ratingObj.mathematic +
        //     ratingObj.kazakh_lang +
        //     ratingObj.geography) /
        //     count /
        //     20) *
        //   100;

        ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.kazakh_historyJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.geographyJaksiCount || 0;

        ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.kazakh_historyNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.geographyNawarCount || 0;
      } else if (secondDayCounter !== 0) {
        ratingObj.mathematic = ratingObj.mathematic / firstDayCounter;
        ratingObj.mathematicA = ratingObj.mathematicA / firstDayCounter;
        ratingObj.mathematicB = ratingObj.mathematicB / firstDayCounter;
        ratingObj.mathematicC = ratingObj.mathematicC / firstDayCounter;

        ratingObj.russian_lang = ratingObj.russian_lang / firstDayCounter;
        ratingObj.russian_langA = ratingObj.russian_langA / firstDayCounter;
        ratingObj.russian_langB = ratingObj.russian_langB / firstDayCounter;
        ratingObj.russian_langC = ratingObj.russian_langC / firstDayCounter;

        let totalSecondDay = BtsRatings.findOne({
          academicYear: academicYear,
          btsNo: btsNo,
          grade: "7",
          schoolId: schoolId,
        });

        ratingObj.total =
          secondDayTotal / secondDayCounter + totalSecondDay.total;

        ratingObj.totalJaksiCount =
          ratingObj.mathematicJaksiCount +
          ratingObj.russian_langJaksiCount +
          totalSecondDay.totalJaksiCount;
        ratingObj.totalNawarCount =
          ratingObj.mathematicNawarCount +
          ratingObj.russian_langNawarCount +
          totalSecondDay.totalNawarCount;
      }
      // console.log("8 grade count: "+(firstDayCounter+secondDayCounter));
      var sCount = firstDayCounter + secondDayCounter;

      ratingObj.totalJaksiCount =
        (ratingObj.totalJaksiCount * 100) / (sCount * 5);
      ratingObj.totalNawarCount =
        (ratingObj.totalNawarCount * 100) / (sCount * 5);
    } else if (ratingObj.grade == "8") {
      if (firstDayCounter != 0) {
        ratingObj.mathematic = ratingObj.mathematic / firstDayCounter;
        ratingObj.mathematicA = ratingObj.mathematicA / firstDayCounter;
        ratingObj.mathematicB = ratingObj.mathematicB / firstDayCounter;
        ratingObj.mathematicC = ratingObj.mathematicC / firstDayCounter;

        ratingObj.chemistry = ratingObj.chemistry / firstDayCounter;
        ratingObj.chemistryA = ratingObj.chemistryA / firstDayCounter;
        ratingObj.chemistryB = ratingObj.chemistryB / firstDayCounter;
        ratingObj.chemistryC = ratingObj.chemistryC / firstDayCounter;

        ratingObj.geography = ratingObj.geography / firstDayCounter;
        ratingObj.geographyA = ratingObj.geographyA / firstDayCounter;
        ratingObj.geographyB = ratingObj.geographyB / firstDayCounter;
        ratingObj.geographyC = ratingObj.geographyC / firstDayCounter;

        ratingObj.total += firstDayTotal / firstDayCounter;
        // ratingObj.total +=
        //   ((ratingObj.mathematic + ratingObj.chemistry + ratingObj.geography) /
        //     3 /
        //     20) *
        //   100;

        ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.chemistryJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.geographyJaksiCount || 0;

        ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.chemistryNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.geographyNawarCount || 0;
      } else if (secondDayCounter != 0) {
        ratingObj.physics = ratingObj.physics / secondDayCounter;
        ratingObj.physicsA = ratingObj.physicsA / secondDayCounter;
        ratingObj.physicsB = ratingObj.physicsB / secondDayCounter;
        ratingObj.physicsC = ratingObj.physicsC / secondDayCounter;

        ratingObj.biology = ratingObj.biology / secondDayCounter;
        ratingObj.biologyA = ratingObj.biologyA / secondDayCounter;
        ratingObj.biologyB = ratingObj.biologyB / secondDayCounter;
        ratingObj.biologyC = ratingObj.biologyC / secondDayCounter;

        ratingObj.kazakh_lang = ratingObj.kazakh_lang / secondDayCounter;
        ratingObj.kazakh_langA = ratingObj.kazakh_langA / secondDayCounter;
        ratingObj.kazakh_langB = ratingObj.kazakh_langB / secondDayCounter;
        ratingObj.kazakh_langC = ratingObj.kazakh_langC / secondDayCounter;

        let totalSecondDay = BtsRatings.findOne({
          academicYear: academicYear,
          btsNo: btsNo,
          grade: "8",
          schoolId: schoolId,
        });

        ratingObj.total =
          secondDayTotal / secondDayCounter + totalSecondDay.total;

        ratingObj.totalJaksiCount =
          ratingObj.physicsJaksiCount +
          ratingObj.kazakh_langJaksiCount +
          ratingObj.biologyJaksiCount +
          totalSecondDay.totalJaksiCount;
        ratingObj.totalNawarCount =
          ratingObj.physicsNawarCount +
          ratingObj.kazakh_langNawarCount +
          ratingObj.biologyNawarCount +
          totalSecondDay.totalNawarCount;
      }
      // console.log("8 grade count: "+(firstDayCounter+secondDayCounter));
      var sCount = firstDayCounter + secondDayCounter;

      ratingObj.totalJaksiCount =
        (ratingObj.totalJaksiCount * 100) / (sCount * 6);
      ratingObj.totalNawarCount =
        (ratingObj.totalNawarCount * 100) / (sCount * 6);
    } else if (ratingObj.grade == "9") {
      if (firstDayCounter != 0) {
        ratingObj.mathematic = ratingObj.mathematic / firstDayCounter;
        ratingObj.mathematicA = ratingObj.mathematicA / firstDayCounter;
        ratingObj.mathematicB = ratingObj.mathematicB / firstDayCounter;
        ratingObj.mathematicC = ratingObj.mathematicC / firstDayCounter;

        ratingObj.chemistry = ratingObj.chemistry / firstDayCounter;
        ratingObj.chemistryA = ratingObj.chemistryA / firstDayCounter;
        ratingObj.chemistryB = ratingObj.chemistryB / firstDayCounter;
        ratingObj.chemistryC = ratingObj.chemistryC / firstDayCounter;

        ratingObj.geography = ratingObj.geography / firstDayCounter;
        ratingObj.geographyA = ratingObj.geographyA / firstDayCounter;
        ratingObj.geographyB = ratingObj.geographyB / firstDayCounter;
        ratingObj.geographyC = ratingObj.geographyC / firstDayCounter;

        ratingObj.total += firstDayTotal / firstDayCounter;
        // ratingObj.total +=
        //   ((ratingObj.mathematic + ratingObj.geography + ratingObj.chemistry) /
        //     3 /
        //     20) *
        //   100;

        ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.geographyJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.chemistryJaksiCount || 0;

        ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.geographyNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.chemistryNawarCount || 0;
      } else if (secondDayCounter != 0) {
        ratingObj.physics = ratingObj.physics / secondDayCounter;
        ratingObj.physicsA = ratingObj.physicsA / secondDayCounter;
        ratingObj.physicsB = ratingObj.physicsB / secondDayCounter;
        ratingObj.physicsC = ratingObj.physicsC / secondDayCounter;

        ratingObj.biology = ratingObj.biology / secondDayCounter;
        ratingObj.biologyA = ratingObj.biologyA / secondDayCounter;
        ratingObj.biologyB = ratingObj.biologyB / secondDayCounter;
        ratingObj.biologyC = ratingObj.biologyC / secondDayCounter;

        ratingObj.turkish_lang = ratingObj.turkish_lang / secondDayCounter;
        ratingObj.turkish_langA = ratingObj.turkish_langA / secondDayCounter;
        ratingObj.turkish_langB = ratingObj.turkish_langB / secondDayCounter;
        ratingObj.turkish_langC = ratingObj.turkish_langC / secondDayCounter;

        let totalSecondDay = BtsRatings.findOne({
          academicYear: academicYear,
          btsNo: btsNo,
          grade: "9",
          schoolId: schoolId,
        });

        ratingObj.total =
          secondDayTotal / secondDayCounter + totalSecondDay.total;

        ratingObj.totalJaksiCount =
          ratingObj.physicsJaksiCount +
          ratingObj.turkish_langJaksiCount +
          ratingObj.biologyJaksiCount +
          totalSecondDay.totalJaksiCount;
        ratingObj.totalOrtawaCount =
          ratingObj.physicsOrtawaCount +
          ratingObj.turkish_langOrtawaCount +
          ratingObj.biologyOrtawaCount +
          totalSecondDay.totalOrtawaCount;
        ratingObj.totalNawarCount =
          ratingObj.physicsNawarCount +
          ratingObj.turkish_langNawarCount +
          ratingObj.biologyNawarCount +
          totalSecondDay.totalNawarCount;
      }
      // console.log("9 grade count: "+(firstDayCounter+secondDayCounter));
      var sCount = firstDayCounter + secondDayCounter;

      ratingObj.totalJaksiCount =
        (ratingObj.totalJaksiCount * 100) / (sCount * 6);
      ratingObj.totalNawarCount =
        (ratingObj.totalNawarCount * 100) / (sCount * 6);
    } else if (ratingObj.grade == "10") {
      if (firstDayCounter != 0) {
        ratingObj.mathematic = ratingObj.mathematic / firstDayCounter;
        ratingObj.mathematicA = ratingObj.mathematicA / firstDayCounter;
        ratingObj.mathematicB = ratingObj.mathematicB / firstDayCounter;
        ratingObj.mathematicC = ratingObj.mathematicC / firstDayCounter;

        ratingObj.kazakh_history = ratingObj.kazakh_history / firstDayCounter;
        ratingObj.kazakh_historyA = ratingObj.kazakh_historyA / firstDayCounter;
        ratingObj.kazakh_historyB = ratingObj.kazakh_historyB / firstDayCounter;
        ratingObj.kazakh_historyC = ratingObj.kazakh_historyC / firstDayCounter;

        ratingObj.turkish_lang = ratingObj.turkish_lang / firstDayCounter;
        ratingObj.turkish_langA = ratingObj.turkish_langA / firstDayCounter;
        ratingObj.turkish_langB = ratingObj.turkish_langB / firstDayCounter;
        ratingObj.turkish_langC = ratingObj.turkish_langC / firstDayCounter;

        // console.log('math: ' + ratingObj.mathematic
        // + ',geography: ' + ratingObj.geography
        // + ',physics: ' + ratingObj.physics
        // + ',biology: ' + ratingObj.biology
        // + ',chemistry: ' + ratingObj.chemistry
        // + ',w_history: ' + ratingObj.world_history)

        ratingObj.total = firstDayTotal / firstDayCounter;
        //ratingObj.total += (ratingObj.mathematic + ratingObj.geography + ratingObj.physics + ratingObj.biology + ratingObj.chemistry + ratingObj.world_history)/20*100

        ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.kazakh_historyJaksiCount || 0;
        ratingObj.totalJaksiCount += ratingObj.turkish_langJaksiCount || 0;

        ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.kazakh_historyNawarCount || 0;
        ratingObj.totalNawarCount += ratingObj.turkish_langNawarCount || 0;

        var sCount = firstDayCounter;

        ratingObj.totalJaksiCount =
          (ratingObj.totalJaksiCount * 100) / (sCount * 3);
        ratingObj.totalOrtawaCount =
          (ratingObj.totalOrtawaCount * 100) / (sCount * 3);
        ratingObj.totalNawarCount =
          (ratingObj.totalNawarCount * 100) / (sCount * 3);
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
      mathematicС: 0,
      turkish_lang: 0,
      turkish_langA: 0,
      turkish_langB: 0,
      turkish_langС: 0,
      kazakh_history: 0,
      kazakh_historyA: 0,
      kazakh_historyB: 0,
      kazakh_historyС: 0,
      geography: 0,
      geographyA: 0,
      geographyB: 0,
      geographyС: 0,
      chemistry: 0,
      chemistryA: 0,
      chemistryB: 0,
      chemistryС: 0,
      kazakh_lang: 0,
      kazakh_langA: 0,
      kazakh_langB: 0,
      kazakh_langС: 0,
      total_1_day: 0,
      total: 0,
      totalInProcent: 0,
      totalA: 0,
      totalB: 0,
      totalС: 0,
    };
  } else {
    grades = gradesSecondDay;

    totalRating = {
      academicYear: academicYear,
      btsNo: btsNo,
      schoolId: schoolId,
      grade: "all",
      physics: 0,
      physicsA: 0,
      physicsB: 0,
      physicsС: 0,
      biology: 0,
      biologyA: 0,
      biologyB: 0,
      biologyС: 0,
      mathematic: 0,
      mathematicA: 0,
      mathematicB: 0,
      mathematicC: 0,
      russian_lang: 0,
      russian_langA: 0,
      russian_langB: 0,
      russian_langC: 0,
      kazakh_lang: 0,
      kazakh_langA: 0,
      kazakh_langB: 0,
      kazakh_langC: 0,
      turkish_lang: 0,
      turkish_langA: 0,
      turkish_langB: 0,
      turkish_langC: 0,

      total: 0,
      totalInProcent: 0,
      totalA: 0,
      totalB: 0,
      totalC: 0,
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
      if (day === "1") {
        if (btsNo == "1" || btsNo == "2" || btsNo == "3") {
          totalRating.geography += gradeRating.geography || 0;
          totalRating.geographyA += gradeRating.geographyA || 0;
          totalRating.geographyB += gradeRating.geographyB || 0;
          totalRating.geographyC += gradeRating.geographyC || 0;

          totalRating.kazakh_lang += gradeRating.kazakh_lang || 0;
          totalRating.kazakh_langA += gradeRating.kazakh_langA || 0;
          totalRating.kazakh_langB += gradeRating.kazakh_langB || 0;
          totalRating.kazakh_langC += gradeRating.kazakh_langC || 0;

          totalRating.kazakh_history += gradeRating.kazakh_history || 0;
          totalRating.kazakh_historyA += gradeRating.kazakh_historyA || 0;
          totalRating.kazakh_historyB += gradeRating.kazakh_historyB || 0;
          totalRating.kazakh_historyC += gradeRating.kazakh_historyC || 0;
        }
      }
      if (day === "2") {
        totalRating.mathematic += gradeRating.mathematic || 0;
        totalRating.mathematicA += gradeRating.mathematicA || 0;
        totalRating.mathematicB += gradeRating.mathematicB || 0;
        totalRating.mathematicC += gradeRating.mathematicC || 0;

        totalRating.russian_lang += gradeRating.russian_lang || 0;
        totalRating.russian_langA += gradeRating.russian_langA || 0;
        totalRating.russian_langB += gradeRating.russian_langB || 0;
        totalRating.russian_langC += gradeRating.russian_langC || 0;
      }
    } else if (grade == "8") {
      if (day == "1") {
        totalRating.mathematic += gradeRating.mathematic || 0;
        totalRating.mathematicA += gradeRating.mathematicA || 0;
        totalRating.mathematicB += gradeRating.mathematicB || 0;
        totalRating.mathematicC += gradeRating.mathematicC || 0;

        totalRating.chemistry += gradeRating.chemistry || 0;
        totalRating.chemistryA += gradeRating.chemistryA || 0;
        totalRating.chemistryB += gradeRating.chemistryB || 0;
        totalRating.chemistryC += gradeRating.chemistryC || 0;

        totalRating.geography += gradeRating.geography || 0;
        totalRating.geographyA += gradeRating.geographyA || 0;
        totalRating.geographyB += gradeRating.geographyB || 0;
        totalRating.geographyC += gradeRating.geographyC || 0;
      }
      if (day == "2") {
        totalRating.physics += gradeRating.physics || 0;
        totalRating.physicsA += gradeRating.physicsA || 0;
        totalRating.physicsB += gradeRating.physicsB || 0;
        totalRating.physicsC += gradeRating.physicsC || 0;

        totalRating.kazakh_lang += gradeRating.kazakh_lang || 0;
        totalRating.kazakh_langA += gradeRating.kazakh_langA || 0;
        totalRating.kazakh_langB += gradeRating.kazakh_langB || 0;
        totalRating.kazakh_langC += gradeRating.kazakh_langC || 0;

        totalRating.biology += gradeRating.biology || 0;
        totalRating.biologyA += gradeRating.biologyA || 0;
        totalRating.biologyB += gradeRating.biologyB || 0;
        totalRating.biologyC += gradeRating.biologyC || 0;
      }
    } else if (grade == "9") {
      if (day == "1") {
        totalRating.mathematic += gradeRating.mathematic || 0;
        totalRating.mathematicA += gradeRating.mathematicA || 0;
        totalRating.mathematicB += gradeRating.mathematicB || 0;
        totalRating.mathematicC += gradeRating.mathematicC || 0;

        totalRating.geography += gradeRating.geography || 0;
        totalRating.geographyA += gradeRating.geographyA || 0;
        totalRating.geographyB += gradeRating.geographyB || 0;
        totalRating.geographyC += gradeRating.geographyC || 0;

        totalRating.chemistry += gradeRating.chemistry || 0;
        totalRating.chemistryA += gradeRating.chemistryA || 0;
        totalRating.chemistryB += gradeRating.chemistryB || 0;
        totalRating.chemistryC += gradeRating.chemistryC || 0;
      }
      if (day == "2") {
        totalRating.physics += gradeRating.physics || 0;
        totalRating.physicsA += gradeRating.physicsA || 0;
        totalRating.physicsB += gradeRating.physicsB || 0;
        totalRating.physicsC += gradeRating.physicsC || 0;

        totalRating.turkish_lang += gradeRating.turkish_lang || 0;
        totalRating.turkish_langA += gradeRating.turkish_langA || 0;
        totalRating.turkish_langB += gradeRating.turkish_langB || 0;
        totalRating.turkish_langC += gradeRating.turkish_langC || 0;

        totalRating.biology += gradeRating.biology || 0;
        totalRating.biologyA += gradeRating.biologyA || 0;
        totalRating.biologyB += gradeRating.biologyB || 0;
        totalRating.biologyC += gradeRating.biologyC || 0;
      }
    } else if (grade == "10") {
      totalRating.mathematic += gradeRating.mathematic || 0;
      totalRating.mathematicA += gradeRating.mathematicA || 0;
      totalRating.mathematicB += gradeRating.mathematicB || 0;
      totalRating.mathematicC += gradeRating.mathematicC || 0;

      totalRating.turkish_lang += gradeRating.turkish_lang || 0;
      totalRating.turkish_langA += gradeRating.turkish_langA || 0;
      totalRating.turkish_langB += gradeRating.turkish_langB || 0;
      totalRating.turkish_langC += gradeRating.turkish_langC || 0;

      totalRating.kazakh_history += gradeRating.kazakh_history || 0;
      totalRating.kazakh_historyA += gradeRating.kazakh_historyA || 0;
      totalRating.kazakh_historyB += gradeRating.kazakh_historyB || 0;
      totalRating.kazakh_historyC += gradeRating.kazakh_historyC || 0;
    }

    mathematicCount += gradeRating.mathematic ? 1 : 0;
    russian_langCount += gradeRating.russian_lang ? 1 : 0;
    kazakh_langCount += gradeRating.kazakh_lang ? 1 : 0;
    turkish_langCount += gradeRating.turkish_lang ? 1 : 0;
    kazakh_historyCount += gradeRating.kazakh_history ? 1 : 0;
    geographyCount += gradeRating.geography ? 1 : 0;
    physicsCount += gradeRating.physics ? 1 : 0;
    chemistryCount += gradeRating.chemistry ? 1 : 0;
    biologyCount += gradeRating.biology ? 1 : 0;
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
    totalRating.mathematicC /= mathematicCount || 1;

    totalRating.kazakh_lang /= kazakh_langCount || 1;
    totalRating.kazakh_langA /= kazakh_langCount || 1;
    totalRating.kazakh_langB /= kazakh_langCount || 1;
    totalRating.kazakh_langC /= kazakh_langCount || 1;

    totalRating.turkish_lang /= turkish_langCount || 1;
    totalRating.turkish_langA /= turkish_langCount || 1;
    totalRating.turkish_langB /= turkish_langCount || 1;
    totalRating.turkish_langC /= turkish_langCount || 1;

    totalRating.geography /= geographyCount || 1;
    totalRating.geographyA /= geographyCount || 1;
    totalRating.geographyB /= geographyCount || 1;
    totalRating.geographyC /= geographyCount || 1;

    totalRating.chemistry /= chemistryCount || 1;
    totalRating.chemistryA /= chemistryCount || 1;
    totalRating.chemistryB /= chemistryCount || 1;
    totalRating.chemistryC /= chemistryCount || 1;

    totalRating.kazakh_history /= kazakh_historyCount || 1;
    totalRating.kazakh_historyA /= kazakh_historyCount || 1;
    totalRating.kazakh_historyB /= kazakh_historyCount || 1;
    totalRating.kazakh_historyC /= kazakh_historyCount || 1;

    // console.log(totalRating);

    totalRating.total += totalRating.mathematic || 0;
    totalRating.total += totalRating.turkish_lang || 0;
    totalRating.total += totalRating.geography || 0;
    totalRating.total += totalRating.chemistry || 0;
    totalRating.total += totalRating.kazakh_lang || 0;
    totalRating.total += totalRating.kazakh_history || 0;

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
    totalCount += chemistryCount > 0 ? 1 : 0;
    totalCount += kazakh_historyCount > 0 ? 1 : 0;
    //console.log('Total sum and count: ' + totalRating.total + ", " + totalCount);
    totalRating.total /= totalCount;
    totalRating.total = (totalRating.total / 20) * 100;
    // totalRating.total_1_day = totalRating.total
    // totalRating.totalInProcent = 999;

    totalRating.totalA += totalRating.mathematicA || 0;
    totalRating.totalA += totalRating.turkish_langA || 0;
    totalRating.totalA += totalRating.geographyA || 0;
    totalRating.totalA += totalRating.chemistryA || 0;
    totalRating.totalA += totalRating.kazakh_langA || 0;
    totalRating.totalA += totalRating.kazakh_historyA || 0;

    //console.log('TotalA sum and count: ' + totalRating.totalA + ", " + totalCount);
    totalRating.totalA /= totalCount;

    //console.log('TotalA sum and count: ' + totalRating.totalA + ", " + totalCount);
    // totalRating.totalBonusA /= totalCount;

    totalRating.totalB += totalRating.mathematicB || 0;
    totalRating.totalB += totalRating.turkish_langB || 0;
    totalRating.totalB += totalRating.geographyB || 0;
    totalRating.totalB += totalRating.chemistryB || 0;
    totalRating.totalB += totalRating.kazakh_langB || 0;
    totalRating.totalB += totalRating.kazakh_historyB || 0;

    //console.log('TotalB sum and count: ' + totalRating.totalB + ", " + totalCount);
    totalRating.totalB /= totalCount;

    totalRating.totalC += totalRating.mathematicC || 0;
    totalRating.totalC += totalRating.turkish_langC || 0;
    totalRating.totalC += totalRating.geographyC || 0;
    totalRating.totalC += totalRating.chemistryC || 0;
    totalRating.totalC += totalRating.kazakh_langC || 0;
    totalRating.totalC += totalRating.kazakh_historyC || 0;

    //console.log('TotalC sum and count: ' + totalRating.totalC + ", " + totalCount);
    totalRating.totalC /= totalCount;
  } else if (day == "2") {
    totalRating.mathematic /= mathematicCount || 1;
    totalRating.mathematicA /= mathematicCount || 1;
    totalRating.mathematicB /= mathematicCount || 1;
    totalRating.mathematicC /= mathematicCount || 1;

    totalRating.russian_lang /= russian_langCount || 1;
    totalRating.russian_langA /= russian_langCount || 1;
    totalRating.russian_langB /= russian_langCount || 1;
    totalRating.russian_langC /= russian_langCount || 1;

    totalRating.physics /= physicsCount || 1;
    totalRating.physicsA /= physicsCount || 1;
    totalRating.physicsB /= physicsCount || 1;
    totalRating.physicsC /= physicsCount || 1;

    totalRating.biology /= biologyCount || 1;
    totalRating.biologyA /= biologyCount || 1;
    totalRating.biologyB /= biologyCount || 1;
    totalRating.biologyC /= biologyCount || 1;

    totalRating.kazakh_lang /= kazakh_langCount || 1;
    totalRating.kazakh_langA /= kazakh_langCount || 1;
    totalRating.kazakh_langB /= kazakh_langCount || 1;
    totalRating.kazakh_langC /= kazakh_langCount || 1;

    totalRating.turkish_lang /= turkish_langCount || 1;
    totalRating.turkish_langA /= turkish_langCount || 1;
    totalRating.turkish_langB /= turkish_langCount || 1;
    totalRating.turkish_langC /= turkish_langCount || 1;

    // total_1_day = totalRating.mathematic + totalRating.turkish_lang + totalRating.kazakh_lang + totalRating.kazakh_history;

    // totalRating.total =  (sameSchoolRating2["total_1_day"] || 0)
    totalRating.totalInProcent = 888;
  }

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
  totalCount += chemistryCount > 0 ? 1 : 0;
  totalCount += kazakh_historyCount > 0 ? 1 : 0;
  totalCount += physicsCount > 0 ? 1 : 0;
  totalCount += biologyCount > 0 ? 1 : 0;
  totalCount += russian_langCount > 0 ? 1 : 0;
  //console.log('Total sum and count: ' + totalRating.total + ", " + totalCount);
  totalRating.total /= totalCount;
  totalRating.total = (totalRating.total / 20) * 100;
  // totalRating.total_1_day = totalRating.total
  // totalRating.totalInProcent = 999;

  totalRating.totalA += totalRating.mathematicA || 0;
  totalRating.totalA += totalRating.turkish_langA || 0;
  totalRating.totalA += totalRating.geographyA || 0;
  totalRating.totalA += totalRating.chemistryA || 0;
  totalRating.totalA += totalRating.kazakh_langA || 0;
  totalRating.totalA += totalRating.kazakh_historyA || 0;
  totalRating.totalA += totalRating.physicsA || 0;
  totalRating.totalA += totalRating.biologyA || 0;
  totalRating.totalA += totalRating.russian_langA || 0;

  //console.log('TotalA sum and count: ' + totalRating.totalA + ", " + totalCount);
  totalRating.totalA /= totalCount;

  //console.log('TotalA sum and count: ' + totalRating.totalA + ", " + totalCount);
  // totalRating.totalBonusA /= totalCount;

  totalRating.totalB += totalRating.mathematicB || 0;
  totalRating.totalB += totalRating.turkish_langB || 0;
  totalRating.totalB += totalRating.geographyB || 0;
  totalRating.totalB += totalRating.chemistryB || 0;
  totalRating.totalB += totalRating.kazakh_langB || 0;
  totalRating.totalB += totalRating.kazakh_historyB || 0;
  totalRating.totalB += totalRating.physicsB || 0;
  totalRating.totalB += totalRating.biologyB || 0;
  totalRating.totalB += totalRating.russian_langB || 0;

  //console.log('TotalB sum and count: ' + totalRating.totalB + ", " + totalCount);
  totalRating.totalB /= totalCount;

  totalRating.totalC += totalRating.mathematicC || 0;
  totalRating.totalC += totalRating.turkish_langC || 0;
  totalRating.totalC += totalRating.geographyC || 0;
  totalRating.totalC += totalRating.chemistryC || 0;
  totalRating.totalC += totalRating.kazakh_langC || 0;
  totalRating.totalC += totalRating.kazakh_historyC || 0;
  totalRating.totalC += totalRating.physicsC || 0;
  totalRating.totalC += totalRating.biologyC || 0;
  totalRating.totalC += totalRating.russian_langC || 0;

  //console.log('TotalC sum and count: ' + totalRating.totalC + ", " + totalCount);
  totalRating.totalC /= totalCount;

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
};
