import { runInThisContext } from "vm";


export const calculateRatingXlsx = (academicYear,btsNo, day, schoolId) => {
    let gradesFirstDay = ["7","8","9","10"]
    let gradesSecondDay = ["8","9"]
    var counter = 0;
    console.log("================================================================");

    calculateBtsRatingForGrade = (academicYear,btsNo,schoolId,grade) => {
        var ratingObj = {};
        if(day == '1'){
          ratingObj = {
              academicYear:academicYear,
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
              totalNawarCount: 0
          }
        }else if(day == '2'){
          ratingObj = {
              academicYear:academicYear,
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
              totalNawarCount: 0
          }
        }

        let records = BtsResults.find({academicYear:academicYear,btsNo:btsNo,grade:grade,schoolId:schoolId}).fetch()


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

        if (ratingObj.grade == '7'){
            _.each(records,(record) => {
                if (record.day_1_total){

                  ratingObj.mathematic += (record.mathematic || 0)
                  ratingObj.mathematicA += (record.mathematicA || 0)
                  ratingObj.mathematicB += (record.mathematicB || 0)

                  if(record.mathematic >= 11) ratingObj.mathematicJaksiCount++;
                  else if(record.mathematic >= 8 && record.mathematic <= 11) ratingObj.mathematicOrtawaCount++;
                  else ratingObj.mathematicNawarCount++;

                  if (btsNo == '1' || btsNo == '2'){

                    ratingObj.kazakh_lang += (record.kazakh_lang || 0)
                    ratingObj.kazakh_langA += (record.kazakh_langA || 0)
                    ratingObj.kazakh_langB += (record.kazakh_langB || 0)

                    if(record.kazakh_lang >= 11)  ratingObj.kazakh_langJaksiCount++;
                    else if(record.kazakh_lang >= 8 && record.kazakh_lang <= 11) ratingObj.kazakh_langOrtawaCount++;
                    else ratingObj.kazakh_langNawarCount++;


                    ratingObj.turkish_lang += (record.turkish_lang || 0)
                    ratingObj.turkish_langA += (record.turkish_langA || 0)
                    ratingObj.turkish_langB += (record.turkish_langB || 0)


                    if(record.turkish_lang >= 11)  ratingObj.turkish_langJaksiCount++;
                    else if(record.turkish_lang >= 8 && record.turkish_lang <= 11) ratingObj.turkish_langOrtawaCount++;
                    else ratingObj.turkish_langNawarCount++;


                  }
                  else if(btsNo == '3'){
                    ratingObj.physics   += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    if(record.physics >= 11)  ratingObj.physicsJaksiCount++;
                    else if(record.physics >= 8 && record.physics <= 11) ratingObj.physicsOrtawaCount++;
                    else ratingObj.physicsNawarCount++;

                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)

                    if(record.chemistry >= 11)  ratingObj.chemistryJaksiCount++;
                    else if(record.chemistry >= 8 && record.chemistry <= 11) ratingObj.chemistryOrtawaCount++;
                    else ratingObj.chemistryNawarCount++;

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)

                    if(record.biology >= 11)  ratingObj.biologyJaksiCount++;
                    else if(record.biology >= 8 && record.biology <= 11) ratingObj.biologyOrtawaCount++;
                    else ratingObj.biologyNawarCount++;
                  }

                  firstDayCounter++;
                  firstDayTotal += (record.day_1_total || 0)
                }
            })

        }else if(ratingObj.grade == '8'){
            _.each(records,(record) => {

                if (day == '1') {

                    ratingObj.mathematic += (record.mathematic || 0)
                    ratingObj.mathematicA += (record.mathematicA || 0)
                    ratingObj.mathematicB += (record.mathematicB || 0)

                    if(record.mathematic >= 11) ratingObj.mathematicJaksiCount++;
                    else if(record.mathematic >= 8 && record.mathematic <= 11) ratingObj.mathematicOrtawaCount++;
                    else ratingObj.mathematicNawarCount++;

                    ratingObj.physics  += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    // console.log('physics: ' + ratingObj.physics);

                    if(record.physics >= 11)  ratingObj.physicsJaksiCount++;
                    else if(record.physics >= 8 && record.physics <= 11) ratingObj.physicsOrtawaCount++;
                    else ratingObj.physicsNawarCount++;

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)


                    if(record.biology >= 11)  ratingObj.biologyJaksiCount++;
                    else if(record.biology >= 8 && record.biology <= 11) ratingObj.biologyOrtawaCount++;
                    else ratingObj.biologyNawarCount++;

                    firstDayCounter++;
                    firstDayTotal += (record.day_1_total || 0)

                }else if (day == '2') {

                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    if(record.geography >= 11)  ratingObj.geographyJaksiCount++;
                    else if(record.geography >= 8 && record.geography <= 11) ratingObj.geographyOrtawaCount++;
                    else ratingObj.geographyNawarCount++;

                    ratingObj.physics  += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    if(record.physics >= 11)  ratingObj.physicsJaksiCount++;
                    else if(record.physics >= 8 && record.physics <= 11) ratingObj.physicsOrtawaCount++;
                    else ratingObj.physicsNawarCount++;

                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)


                    if(record.chemistry >= 11)  ratingObj.chemistryJaksiCount++;
                    else if(record.chemistry >= 8 && record.chemistry <= 11) ratingObj.chemistryOrtawaCount++;
                    else ratingObj.chemistryNawarCount++;

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)


                    if(record.biology >= 11)  ratingObj.biologyJaksiCount++;
                    else if(record.biology >= 8 && record.biology <= 11) ratingObj.biologyOrtawaCount++;
                    else ratingObj.biologyNawarCount++;

                    secondDayCounter++;
                    secondDayTotal += (record.day_2_total || 0)

                }

              })
        }else if(ratingObj.grade == '9'){
          _.each(records,(record) => {

              if (day == '1') {

                  ratingObj.mathematic += (record.mathematic || 0)
                  ratingObj.mathematicA += (record.mathematicA || 0)
                  ratingObj.mathematicB += (record.mathematicB || 0)

                  if(record.mathematic >= 11) ratingObj.mathematicJaksiCount++;
                  else if(record.mathematic >= 8 && record.mathematic <= 11) ratingObj.mathematicOrtawaCount++;
                  else ratingObj.mathematicNawarCount++;

                  ratingObj.physics  += (record.physics || 0)
                  ratingObj.physicsA += (record.physicsA || 0)
                  ratingObj.physicsB += (record.physicsB || 0)

                  if(record.physics >= 11)  ratingObj.physicsJaksiCount++;
                  else if(record.physics >= 8 && record.physics <= 11) ratingObj.physicsOrtawaCount++;
                  else ratingObj.physicsNawarCount++;

                  ratingObj.chemistry += (record.chemistry ||0)
                  ratingObj.chemistryA += (record.chemistryA ||0)
                  ratingObj.chemistryB += (record.chemistryB ||0)


                  if(record.chemistry >= 11)  ratingObj.chemistryJaksiCount++;
                  else if(record.chemistry >= 8 && record.chemistry <= 11) ratingObj.chemistryOrtawaCount++;
                  else ratingObj.chemistryNawarCount++;

                  firstDayCounter++;
                  firstDayTotal += (record.day_1_total || 0)

              }else if (day == '2') {

                  ratingObj.geography += (record.geography || 0)
                  ratingObj.geographyA += (record.geographyA || 0)
                  ratingObj.geographyB += (record.geographyB || 0)

                  if(record.geography >= 11)  ratingObj.geographyJaksiCount++;
                  else if(record.geography >= 8 && record.geography <= 11) ratingObj.geographyOrtawaCount++;
                  else ratingObj.geographyNawarCount++;

                  ratingObj.physics  += (record.physics || 0)
                  ratingObj.physicsA += (record.physicsA || 0)
                  ratingObj.physicsB += (record.physicsB || 0)

                  if(record.physics >= 11)  ratingObj.physicsJaksiCount++;
                  else if(record.physics >= 8 && record.physics <= 11) ratingObj.physicsOrtawaCount++;
                  else ratingObj.physicsNawarCount++;

                  ratingObj.chemistry += (record.chemistry ||0)
                  ratingObj.chemistryA += (record.chemistryA ||0)
                  ratingObj.chemistryB += (record.chemistryB ||0)


                  if(record.chemistry >= 11)  ratingObj.chemistryJaksiCount++;
                  else if(record.chemistry >= 8 && record.chemistry <= 11) ratingObj.chemistryOrtawaCount++;
                  else ratingObj.chemistryNawarCount++;

                  ratingObj.biology += (record.biology || 0)
                  ratingObj.biologyA += (record.biologyA || 0)
                  ratingObj.biologyB += (record.biologyB || 0)


                  if(record.biology >= 11)  ratingObj.biologyJaksiCount++;
                  else if(record.biology >= 8 && record.biology <= 11) ratingObj.biologyOrtawaCount++;
                  else ratingObj.biologyNawarCount++;

                  secondDayCounter++;
                  secondDayTotal += (record.day_2_total || 0)

              }

            })
      }
        else if (ratingObj.grade == '10') {
          _.each(records,(record) => {

              if (record.day_1_total) {

                  ratingObj.mathematic += (record.mathematic || 0)
                  ratingObj.mathematicA += (record.mathematicA || 0)
                  ratingObj.mathematicB += (record.mathematicB || 0)

                  if(record.mathematic >= 11)  ratingObj.mathematicJaksiCount++;
                  else if(record.mathematic >= 8 && record.mathematic <= 11) ratingObj.mathematicOrtawaCount++;
                  else ratingObj.mathematicNawarCount++;


                  if(record.electiveGroup == "01"){

                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    if(record.geography >= 11)  ratingObj.geographyJaksiCount++;
                    else if(record.geography >= 8 && record.geography <= 11) ratingObj.geographyOrtawaCount++;
                    else ratingObj.geographyNawarCount++;

                    ratingObj.physics   += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    if(record.physics >= 11)  ratingObj.physicsJaksiCount++;
                    else if(record.physics >= 8 && record.physics <= 11) ratingObj.physicsOrtawaCount++;
                    else ratingObj.physicsNawarCount++;

                    electiveGroup_1_Count++;
                  }else if(record.electiveGroup == "02"){


                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    if(record.geography >= 11)  ratingObj.geographyJaksiCount++;
                    else if(record.geography >= 8 && record.geography <= 11) ratingObj.geographyOrtawaCount++;
                    else ratingObj.geographyNawarCount++;

                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)

                    if(record.chemistry >= 11)  ratingObj.chemistryJaksiCount++;
                    else if(record.chemistry >= 8 && record.chemistry <= 11) ratingObj.chemistryOrtawaCount++;
                    else ratingObj.chemistryNawarCount++;

                    electiveGroup_2_Count++;

                  }else if(record.electiveGroup == "03"){

                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    if(record.geography >= 11)  ratingObj.geographyJaksiCount++;
                    else if(record.geography >= 8 && record.geography <= 11) ratingObj.geographyOrtawaCount++;
                    else ratingObj.geographyNawarCount++;

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)

                    if(record.biology >= 11)  ratingObj.biologyJaksiCount++;
                    else if(record.biology >= 8 && record.biology <= 11) ratingObj.biologyOrtawaCount++;
                    else ratingObj.biologyNawarCount++;
                    electiveGroup_3_Count++;

                  }else if(record.electiveGroup == "04"){

                    ratingObj.physics   += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    if(record.physics >= 11)  ratingObj.physicsJaksiCount++;
                    else if(record.physics >= 8 && record.physics <= 11) ratingObj.physicsOrtawaCount++;
                    else ratingObj.physicsNawarCount++;

                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)

                    if(record.chemistry >= 11)  ratingObj.chemistryJaksiCount++;
                    else if(record.chemistry >= 8 && record.chemistry <= 11) ratingObj.chemistryOrtawaCount++;
                    else ratingObj.chemistryNawarCount++;
                    electiveGroup_4_Count++;

                  }else if(record.electiveGroup == "05"){

                    ratingObj.physics   += (record.physics || 0)
                    ratingObj.physicsA += (record.physicsA || 0)
                    ratingObj.physicsB += (record.physicsB || 0)

                    if(record.physics >= 11)  ratingObj.physicsJaksiCount++;
                    else if(record.physics >= 8 && record.physics <= 11) ratingObj.physicsOrtawaCount++;
                    else ratingObj.physicsNawarCount++;

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)

                    if(record.biology >= 11)  ratingObj.biologyJaksiCount++;
                    else if(record.biology >= 8 && record.biology <= 11) ratingObj.biologyOrtawaCount++;
                    else ratingObj.biologyNawarCount++;

                    electiveGroup_5_Count++;

                  }else if(record.electiveGroup == "06"){
                    ratingObj.chemistry += (record.chemistry ||0)
                    ratingObj.chemistryA += (record.chemistryA ||0)
                    ratingObj.chemistryB += (record.chemistryB ||0)

                    if(record.chemistry >= 11)  ratingObj.chemistryJaksiCount++;
                    else if(record.chemistry >= 8 && record.chemistry <= 11) ratingObj.chemistryOrtawaCount++;
                    else ratingObj.chemistryNawarCount++;

                    ratingObj.biology += (record.biology || 0)
                    ratingObj.biologyA += (record.biologyA || 0)
                    ratingObj.biologyB += (record.biologyB || 0)

                    if(record.biology >= 11)  ratingObj.biologyJaksiCount++;
                    else if(record.biology >= 8 && record.biology <= 11) ratingObj.biologyOrtawaCount++;
                    else ratingObj.biologyNawarCount++;
                    electiveGroup_6_Count++;

                  }else if(record.electiveGroup == "07"){
                    ratingObj.geography += (record.geography || 0)
                    ratingObj.geographyA += (record.geographyA || 0)
                    ratingObj.geographyB += (record.geographyB || 0)

                    if(record.geography >= 11)  ratingObj.geographyJaksiCount++;
                    else if(record.geography >= 8 && record.geography <= 11) ratingObj.geographyOrtawaCount++;
                    else ratingObj.geographyNawarCount++;

                    ratingObj.world_history += (record.world_history || 0)
                    ratingObj.world_historyA += (record.world_historyA || 0)
                    ratingObj.world_historyB += (record.world_historyB || 0)

                    if(record.world_history >= 11)  ratingObj.world_historyJaksiCount++;
                    else if(record.world_history >= 8 && record.world_history <= 11) ratingObj.world_historyOrtawaCount++;
                    else ratingObj.world_historyNawarCount++;

                    electiveGroup_7_Count++;
                  }

                  firstDayCounter++;
                  firstDayTotal += (record.day_1_total || 0)

              }
            })
        }

        if (ratingObj.grade == '7'){
            if (firstDayCounter != 0) {

              ratingObj.mathematic = (ratingObj.mathematic / firstDayCounter)
              ratingObj.mathematicA = (ratingObj.mathematicA / firstDayCounter)
              ratingObj.mathematicB = (ratingObj.mathematicB / firstDayCounter)

                if(btsNo == '1' || btsNo == '2'){

                  ratingObj.kazakh_lang = (ratingObj.kazakh_lang / firstDayCounter)
                  ratingObj.kazakh_langA = (ratingObj.kazakh_langA / firstDayCounter)
                  ratingObj.kazakh_langB = (ratingObj.kazakh_langB / firstDayCounter)

                  ratingObj.turkish_lang = (ratingObj.turkish_lang / firstDayCounter)
                  ratingObj.turkish_langA = (ratingObj.turkish_langA / firstDayCounter)
                  ratingObj.turkish_langB = (ratingObj.turkish_langB / firstDayCounter)

                  // ratingObj.russian_lang = (ratingObj.russian_lang / firstDayCounter)

                }else if(btsNo == '3'){

                  ratingObj.physics   += (ratingObj.physics / firstDayCounter)
                  ratingObj.physicsA += (ratingObj.physicsA / firstDayCounter)
                  ratingObj.physicsB += (ratingObj.physicsB / firstDayCounter)

                  ratingObj.chemistry += (ratingObj.chemistry / firstDayCounter)
                  ratingObj.chemistryA += (ratingObj.chemistryA / firstDayCounter)
                  ratingObj.chemistryB += (ratingObj.chemistryB / firstDayCounter)

                  ratingObj.biology += (ratingObj.biology / firstDayCounter)
                  ratingObj.biologyA += (ratingObj.biologyA / firstDayCounter)
                  ratingObj.biologyB += (ratingObj.biologyB / firstDayCounter)

                }

                // ratingObj.total += firstDayTotal/firstDayCounter
                ratingObj.total += (ratingObj.mathematic + ratingObj.kazakh_lang + ratingObj.turkish_lang)/3/20*100
                // console.log(firstDayTotal + ' ' + firstDayCounter);
                // firstDayCounter = 37
                // 4Lessons = 37 * 4 = 148
                // 148 - 100
                // 89  - x
                // x = 89 * 100 / 148
                // console.log("7 grade count: "+firstDayCounter);

                ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0; 
                ratingObj.totalJaksiCount += ratingObj.kazakh_langJaksiCount || 0; 
                ratingObj.totalJaksiCount += ratingObj.turkish_langJaksiCount || 0;
                
                ratingObj.totalOrtawaCount += ratingObj.mathematicOrtawaCount || 0; 
                ratingObj.totalOrtawaCount += ratingObj.kazakh_langOrtawaCount || 0;
                ratingObj.totalOrtawaCount += ratingObj.turkish_langOrtawaCount || 0;

                ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0; 
                ratingObj.totalNawarCount += ratingObj.kazakh_langNawarCount || 0;
                ratingObj.totalNawarCount += ratingObj.turkish_langNawarCount || 0;

                ratingObj.totalJaksiCount = (ratingObj.totalJaksiCount * 100) / (firstDayCounter * 3);
                ratingObj.totalOrtawaCount = (ratingObj.totalOrtawaCount * 100) / (firstDayCounter * 3);
                ratingObj.totalNawarCount = (ratingObj.totalNawarCount * 100) / (firstDayCounter * 3);

            }
        }else if(ratingObj.grade == '8'){
            if (firstDayCounter != 0) {
                ratingObj.mathematic = (ratingObj.mathematic / firstDayCounter)
                ratingObj.mathematicA = (ratingObj.mathematicA / firstDayCounter)
                ratingObj.mathematicB = (ratingObj.mathematicB / firstDayCounter)
                ratingObj.physics   = (ratingObj.physics / firstDayCounter)
                  ratingObj.physicsA = (ratingObj.physicsA / firstDayCounter)
                  ratingObj.physicsB = (ratingObj.physicsB / firstDayCounter)

                  ratingObj.biology = (ratingObj.biology / firstDayCounter)
                  ratingObj.biologyA = (ratingObj.biologyA / firstDayCounter)
                  ratingObj.biologyB = (ratingObj.biologyB / firstDayCounter)

                // ratingObj.total += firstDayTotal/firstDayCounter
                ratingObj.total += (ratingObj.mathematic + ratingObj.physics + ratingObj.biology)/3/20*100

                ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0; 
                ratingObj.totalJaksiCount += ratingObj.physicsJaksiCount || 0; 
                ratingObj.totalJaksiCount += ratingObj.biologyJaksiCount || 0;
                
                ratingObj.totalOrtawaCount += ratingObj.mathematicOrtawaCount || 0; 
                ratingObj.totalOrtawaCount += ratingObj.physicsOrtawaCount || 0;
                ratingObj.totalOrtawaCount += ratingObj.biologyOrtawaCount || 0;

                ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0; 
                ratingObj.totalNawarCount += ratingObj.physicsNawarCount || 0;
                ratingObj.totalNawarCount += ratingObj.biologyNawarCount || 0;
            }
            else if (secondDayCounter != 0) {

                  ratingObj.geography = (ratingObj.geography / secondDayCounter)
                  ratingObj.geographyA = (ratingObj.geographyA / secondDayCounter)
                  ratingObj.geographyB = (ratingObj.geographyB / secondDayCounter)

                  ratingObj.physics   = (ratingObj.physics / secondDayCounter)
                  ratingObj.physicsA = (ratingObj.physicsA / secondDayCounter)
                  ratingObj.physicsB = (ratingObj.physicsB / secondDayCounter)

                  ratingObj.chemistry = (ratingObj.chemistry / secondDayCounter)
                  ratingObj.chemistryA = (ratingObj.chemistryA / secondDayCounter)
                  ratingObj.chemistryB = (ratingObj.chemistryB / secondDayCounter)

                  ratingObj.biology = (ratingObj.biology / secondDayCounter)
                  ratingObj.biologyA = (ratingObj.biologyA / secondDayCounter)
                  ratingObj.biologyB = (ratingObj.biologyB / secondDayCounter)

                  let totalSecondDay = BtsRatings.findOne({academicYear:academicYear,btsNo:btsNo,grade:'8',schoolId:schoolId})

                  ratingObj.total = secondDayTotal/secondDayCounter + totalSecondDay.total

                  ratingObj.totalJaksiCount = ratingObj.geographyJaksiCount + ratingObj.physicsJaksiCount + ratingObj.chemistryJaksiCount + ratingObj.biologyJaksiCount + totalSecondDay.totalJaksiCount
                  ratingObj.totalOrtawaCount = ratingObj.geographyOrtawaCount + ratingObj.physicsOrtawaCount + ratingObj.chemistryOrtawaCount + ratingObj.biologyOrtawaCount + totalSecondDay.totalOrtawaCount
                  ratingObj.totalNawarCount = ratingObj.geographyNawarCount + ratingObj.physicsNawarCount + ratingObj.chemistryNawarCount + ratingObj.biologyNawarCount + totalSecondDay.totalNawarCount


            }
            // console.log("8 grade count: "+(firstDayCounter+secondDayCounter));
            var sCount = (firstDayCounter+secondDayCounter);

            ratingObj.totalJaksiCount = (ratingObj.totalJaksiCount * 100) / (sCount * 3);
            ratingObj.totalOrtawaCount = (ratingObj.totalOrtawaCount * 100) / (sCount * 3);
            ratingObj.totalNawarCount = (ratingObj.totalNawarCount * 100) / (sCount * 3);
        }
        else if(ratingObj.grade == '9'){
            if (firstDayCounter != 0) {
              ratingObj.mathematic = (ratingObj.mathematic / firstDayCounter)
              ratingObj.mathematicA = (ratingObj.mathematicA / firstDayCounter)
              ratingObj.mathematicB = (ratingObj.mathematicB / firstDayCounter)
              ratingObj.physics   = (ratingObj.physics / firstDayCounter)
                ratingObj.physicsA = (ratingObj.physicsA / firstDayCounter)
                ratingObj.physicsB = (ratingObj.physicsB / firstDayCounter)

                ratingObj.chemistry = (ratingObj.chemistry / firstDayCounter)
                ratingObj.chemistryA = (ratingObj.chemistryA / firstDayCounter)
                ratingObj.chemistryB = (ratingObj.chemistryB / firstDayCounter)

              // ratingObj.total += firstDayTotal/firstDayCounter
              ratingObj.total += (ratingObj.mathematic + ratingObj.physics + ratingObj.chemistry)/3/20*100

              ratingObj.totalJaksiCount += ratingObj.mathematicJaksiCount || 0; 
              ratingObj.totalJaksiCount += ratingObj.physicsJaksiCount || 0; 
              ratingObj.totalJaksiCount += ratingObj.chemistryJaksiCount || 0;
              
              ratingObj.totalOrtawaCount += ratingObj.mathematicOrtawaCount || 0; 
              ratingObj.totalOrtawaCount += ratingObj.physicsOrtawaCount || 0;
              ratingObj.totalOrtawaCount += ratingObj.chemistryOrtawaCount || 0;

              ratingObj.totalNawarCount += ratingObj.mathematicNawarCount || 0; 
              ratingObj.totalNawarCount += ratingObj.physicsNawarCount || 0;
              ratingObj.totalNawarCount += ratingObj.chemistryNawarCount || 0;
            }
            else if (secondDayCounter != 0) {

                  ratingObj.geography = (ratingObj.geography / secondDayCounter)
                  ratingObj.geographyA = (ratingObj.geographyA / secondDayCounter)
                  ratingObj.geographyB = (ratingObj.geographyB / secondDayCounter)

                  ratingObj.physics   = (ratingObj.physics / secondDayCounter)
                  ratingObj.physicsA = (ratingObj.physicsA / secondDayCounter)
                  ratingObj.physicsB = (ratingObj.physicsB / secondDayCounter)

                  ratingObj.chemistry = (ratingObj.chemistry / secondDayCounter)
                  ratingObj.chemistryA = (ratingObj.chemistryA / secondDayCounter)
                  ratingObj.chemistryB = (ratingObj.chemistryB / secondDayCounter)

                  ratingObj.biology = (ratingObj.biology / secondDayCounter)
                  ratingObj.biologyA = (ratingObj.biologyA / secondDayCounter)
                  ratingObj.biologyB = (ratingObj.biologyB / secondDayCounter)


                  let totalSecondDay = BtsRatings.findOne({academicYear:academicYear,btsNo:btsNo,grade:'9',schoolId:schoolId})

                  ratingObj.total = secondDayTotal/secondDayCounter + totalSecondDay.total

                  ratingObj.totalJaksiCount = ratingObj.geographyJaksiCount + ratingObj.physicsJaksiCount + ratingObj.chemistryJaksiCount + ratingObj.biologyJaksiCount + totalSecondDay.totalJaksiCount
                  ratingObj.totalOrtawaCount = ratingObj.geographyOrtawaCount + ratingObj.physicsOrtawaCount + ratingObj.chemistryOrtawaCount + ratingObj.biologyOrtawaCount + totalSecondDay.totalOrtawaCount
                  ratingObj.totalNawarCount = ratingObj.geographyNawarCount + ratingObj.physicsNawarCount + ratingObj.chemistryNawarCount + ratingObj.biologyNawarCount + totalSecondDay.totalNawarCount

                  

            }
            // console.log("9 grade count: "+(firstDayCounter+secondDayCounter));
                  var sCount = (firstDayCounter+secondDayCounter);
                  ratingObj.totalJaksiCount = (ratingObj.totalJaksiCount * 100) / (sCount * 3);
                  ratingObj.totalOrtawaCount = (ratingObj.totalOrtawaCount * 100) / (sCount * 3);
                  ratingObj.totalNawarCount = (ratingObj.totalNawarCount * 100) / (sCount * 3);
        }
        else if(ratingObj.grade == '10'){
          if (firstDayCounter != 0) {

              ratingObj.mathematic = (ratingObj.mathematic / firstDayCounter)
              ratingObj.mathematicA = (ratingObj.mathematicA / firstDayCounter)
              ratingObj.mathematicB = (ratingObj.mathematicB / firstDayCounter)

              ratingObj.geography = ratingObj.geography / (electiveGroup_1_Count+electiveGroup_2_Count+electiveGroup_3_Count+electiveGroup_7_Count)
              ratingObj.geographyA = ratingObj.geographyA / (electiveGroup_1_Count+electiveGroup_2_Count+electiveGroup_3_Count+electiveGroup_7_Count)
              ratingObj.geographyB = ratingObj.geographyB / (electiveGroup_1_Count+electiveGroup_2_Count+electiveGroup_3_Count+electiveGroup_7_Count)

              ratingObj.physics   = ratingObj.physics / (electiveGroup_1_Count+electiveGroup_4_Count+electiveGroup_5_Count)
              ratingObj.physicsA = ratingObj.physicsA / (electiveGroup_1_Count+electiveGroup_4_Count+electiveGroup_5_Count)
              ratingObj.physicsB = ratingObj.physicsB / (electiveGroup_1_Count+electiveGroup_4_Count+electiveGroup_5_Count)

              ratingObj.chemistry = ratingObj.chemistry / (electiveGroup_2_Count+electiveGroup_4_Count+electiveGroup_6_Count)
              ratingObj.chemistryA = ratingObj.chemistryA / (electiveGroup_2_Count+electiveGroup_4_Count+electiveGroup_6_Count)
              ratingObj.chemistryB = ratingObj.chemistryB / (electiveGroup_2_Count+electiveGroup_4_Count+electiveGroup_6_Count)

              ratingObj.biology = ratingObj.biology / (electiveGroup_3_Count+electiveGroup_5_Count+electiveGroup_6_Count)
              ratingObj.biologyA = ratingObj.biologyA / (electiveGroup_3_Count+electiveGroup_5_Count+electiveGroup_6_Count)
              ratingObj.biologyB = ratingObj.biologyB / (electiveGroup_3_Count+electiveGroup_5_Count+electiveGroup_6_Count)

              ratingObj.world_history = ratingObj.world_history / electiveGroup_7_Count
              ratingObj.world_historyA = (ratingObj.world_historyA / electiveGroup_7_Count)
              ratingObj.world_historyB = (ratingObj.world_historyB / electiveGroup_7_Count)

              // console.log('math: ' + ratingObj.mathematic
              // + ',geography: ' + ratingObj.geography
              // + ',physics: ' + ratingObj.physics
              // + ',biology: ' + ratingObj.biology
              // + ',chemistry: ' + ratingObj.chemistry
              // + ',w_history: ' + ratingObj.world_history)
              // ratingObj.total = firstDayTotal/firstDayCounter
              //ratingObj.total += (ratingObj.mathematic + ratingObj.geography + ratingObj.physics + ratingObj.biology + ratingObj.chemistry + ratingObj.world_history)/20*100
              
              ratingObj.total = 0;
              if(ratingObj.mathematic) ratingObj.total += ratingObj.mathematic;
              if(ratingObj.geography) ratingObj.total += ratingObj.geography;
              if(ratingObj.physics) ratingObj.total += ratingObj.physics;
              if(ratingObj.biology) ratingObj.total += ratingObj.biology;
              if(ratingObj.chemistry) ratingObj.total += ratingObj.chemistry;
              if(ratingObj.world_history) ratingObj.total += ratingObj.world_history;
              //w_history, geography, physics, chemistry, biology
              let electiveCountFlags = [0,0,0,0,0];
              if(electiveGroup_1_Count > 0) {
                electiveCountFlags[1] = 1;
                electiveCountFlags[2] = 1;
              }
              if(electiveGroup_2_Count > 0) {
                electiveCountFlags[1] = 1;
                electiveCountFlags[3] = 1;
              }
              if(electiveGroup_3_Count > 0) {
                electiveCountFlags[1] = 1;
                electiveCountFlags[4] = 1;
              }              
              if(electiveGroup_4_Count > 0) {
                electiveCountFlags[2] = 1;
                electiveCountFlags[3] = 1;
              }
              if(electiveGroup_5_Count > 0) {
                electiveCountFlags[2] = 1;
                electiveCountFlags[4] = 1;
              }
              if(electiveGroup_6_Count > 0) {
                electiveCountFlags[3] = 1;
                electiveCountFlags[4] = 1;
              }
              if(electiveGroup_7_Count > 0) {
                electiveCountFlags[0] = 1;
                electiveCountFlags[1] = 1;
              }
              
              let electiveCount = electiveCountFlags.filter(x => x == 1).length;
              // console.log('TOTALIS: ' + ratingObj.total + ', ' + electiveCount);
              ratingObj.total = ratingObj.total/(electiveCount+1)/20*100;

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

             var sCount = electiveGroup_1_Count + electiveGroup_2_Count + electiveGroup_3_Count+
             electiveGroup_4_Count + electiveGroup_5_Count + electiveGroup_6_Count + electiveGroup_7_Count;

             ratingObj.totalJaksiCount = (ratingObj.totalJaksiCount * 100) / (sCount * 3);
             ratingObj.totalOrtawaCount = (ratingObj.totalOrtawaCount * 100) / (sCount * 3);
             ratingObj.totalNawarCount = (ratingObj.totalNawarCount * 100) / (sCount * 3);
          }
        }

        // insert rating to db
        var sameRating = BtsRatings.findOne({
            btsNo: btsNo,
            academicYear: academicYear,
            schoolId: schoolId,
            grade: grade
        })

        if (!sameRating){
            BtsRatings.insert(ratingObj)
          }
        else {
            BtsRatings.update({_id:sameRating._id}, {
                $set: ratingObj
            })
        }

        return ratingObj
    }

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

    if(day == '1'){
        grades = gradesFirstDay;

        totalRating = {
            academicYear:academicYear,
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
            totalB: 0
        }

    }else{
        grades = gradesSecondDay;

        totalRating = {
            academicYear:academicYear,
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
            totalB: 0
        }
    }

    _.each(grades,(grade) => {
        let gradeRating = calculateBtsRatingForGrade(academicYear,btsNo,schoolId,grade)

        if(grade == '7'){
            if(btsNo == '1' || btsNo == '2'){
                totalRating.mathematic += (gradeRating.mathematic || 0)
                totalRating.mathematicA += (gradeRating.mathematicA || 0)
                totalRating.mathematicB += (gradeRating.mathematicB || 0)

                totalRating.kazakh_lang += (gradeRating.kazakh_lang || 0)
                totalRating.kazakh_langA += (gradeRating.kazakh_langA || 0)
                totalRating.kazakh_langB += (gradeRating.kazakh_langB || 0)

                totalRating.turkish_lang += (gradeRating.turkish_lang || 0)
                totalRating.turkish_langA += (gradeRating.turkish_langA || 0)
                totalRating.turkish_langB += (gradeRating.turkish_langB || 0)

                //totalRating.russian_lang += (gradeRating.russian_lang || 0)

            }else if(btsNo == '3'){

                totalRating.mathematic += (gradeRating.mathematic || 0)
                totalRating.mathematicA += (gradeRating.mathematicA || 0)
                totalRating.mathematicB += (gradeRating.mathematicB || 0)

                totalRating.physics += (gradeRating.physics || 0)
                totalRating.physicsA += (gradeRating.physicsA || 0)
                totalRating.physicsB += (gradeRating.physicsB || 0)

                totalRating.chemistry += (gradeRating.chemistry || 0)
                totalRating.chemistryA += (gradeRating.chemistryA || 0)
                totalRating.chemistryB += (gradeRating.chemistryB || 0)

                totalRating.biology += (gradeRating.biology || 0)
                totalRating.biologyA += (gradeRating.biologyA || 0)
                totalRating.biologyB += (gradeRating.biologyB || 0)

                // totalRating.total += (gradeRating.total || 0)
                // totalRating.totalA += (gradeRating.totalA || 0)
                // totalRating.totalB += (gradeRating.totalB || 0)
            }
        }
        else if(grade == '8'){
            if(day == '1'){
                totalRating.mathematic += (gradeRating.mathematic || 0)
                totalRating.mathematicA += (gradeRating.mathematicA || 0)
                totalRating.mathematicB += (gradeRating.mathematicB || 0)
                
                totalRating.physics += (gradeRating.physics || 0)
                totalRating.physicsA += (gradeRating.physicsA || 0)
                totalRating.physicsB += (gradeRating.physicsB || 0)

                totalRating.biology += (gradeRating.biology || 0)
                totalRating.biologyA += (gradeRating.biologyA || 0)
                totalRating.biologyB += (gradeRating.biologyB || 0)

            }
            if(day == '2'){
              totalRating.geography += (gradeRating.geography || 0)
              totalRating.geographyA += (gradeRating.geographyA || 0)
              totalRating.geographyB += (gradeRating.geographyB || 0)

              totalRating.physics += (gradeRating.physics || 0)
              totalRating.physicsA += (gradeRating.physicsA || 0)
              totalRating.physicsB += (gradeRating.physicsB || 0)

              totalRating.chemistry += (gradeRating.chemistry || 0)
              totalRating.chemistryA += (gradeRating.chemistryA || 0)
              totalRating.chemistryB += (gradeRating.chemistryB || 0)

              totalRating.biology += (gradeRating.biology || 0)
              totalRating.biologyA += (gradeRating.biologyA || 0)
              totalRating.biologyB += (gradeRating.biologyB || 0)

            }

        }
        else if(grade == '9'){
          if(day == '1'){
              totalRating.mathematic += (gradeRating.mathematic || 0)
              totalRating.mathematicA += (gradeRating.mathematicA || 0)
              totalRating.mathematicB += (gradeRating.mathematicB || 0)
              
              totalRating.physics += (gradeRating.physics || 0)
              totalRating.physicsA += (gradeRating.physicsA || 0)
              totalRating.physicsB += (gradeRating.physicsB || 0)


              totalRating.chemistry += (gradeRating.chemistry || 0)
              totalRating.chemistryA += (gradeRating.chemistryA || 0)
              totalRating.chemistryB += (gradeRating.chemistryB || 0)
  
          }
          if(day == '2'){
            totalRating.geography += (gradeRating.geography || 0)
            totalRating.geographyA += (gradeRating.geographyA || 0)
            totalRating.geographyB += (gradeRating.geographyB || 0)

            totalRating.physics += (gradeRating.physics || 0)
            totalRating.physicsA += (gradeRating.physicsA || 0)
            totalRating.physicsB += (gradeRating.physicsB || 0)

            totalRating.chemistry += (gradeRating.chemistry || 0)
            totalRating.chemistryA += (gradeRating.chemistryA || 0)
            totalRating.chemistryB += (gradeRating.chemistryB || 0)

            totalRating.biology += (gradeRating.biology || 0)
            totalRating.biologyA += (gradeRating.biologyA || 0)
            totalRating.biologyB += (gradeRating.biologyB || 0)

          }

      }else if(grade == '10'){
          totalRating.mathematic += (gradeRating.mathematic || 0)
          totalRating.mathematicA += (gradeRating.mathematicA || 0)
          totalRating.mathematicB += (gradeRating.mathematicB || 0)

          // totalRating.kazakh_lang += (gradeRating.kazakh_lang || 0)
          // totalRating.kazakh_langA += (gradeRating.kazakh_langA || 0)
          // totalRating.kazakh_langB += (gradeRating.kazakh_langB || 0)

          // totalRating.kazakh_history += (gradeRating.kazakh_history || 0)
          // totalRating.kazakh_historyA += (gradeRating.kazakh_historyA || 0)
          // totalRating.kazakh_historyB += (gradeRating.kazakh_historyB || 0)

          totalRating.geography += (gradeRating.geography || 0)
          totalRating.geographyA += (gradeRating.geographyA || 0)
          totalRating.geographyB += (gradeRating.geographyB || 0)

          totalRating.physics += (gradeRating.physics || 0)
          totalRating.physicsA += (gradeRating.physicsA || 0)
          totalRating.physicsB += (gradeRating.physicsB || 0)

          totalRating.chemistry += (gradeRating.chemistry || 0)
          totalRating.chemistryA += (gradeRating.chemistryA || 0)
          totalRating.chemistryB += (gradeRating.chemistryB || 0)

          totalRating.biology += (gradeRating.biology || 0)
          totalRating.biologyA += (gradeRating.biologyA || 0)
          totalRating.biologyB += (gradeRating.biologyB || 0)

          totalRating.world_history += (gradeRating.world_history || 0)
          totalRating.world_historyA += (gradeRating.world_historyA || 0)
          totalRating.world_historyB += (gradeRating.world_historyB || 0)

        }

        mathematicCount += gradeRating.mathematic ? 1 : 0;
        turkish_langCount += gradeRating.turkish_lang? 1 : 0;
        russian_langCount += gradeRating.russian_lang? 1 : 0;
        kazakh_langCount  += gradeRating.kazakh_lang? 1 : 0;
        kazakh_historyCount += gradeRating.kazakh_history? 1 : 0;
        geographyCount  += gradeRating.geography? 1 : 0;
        physicsCount  += gradeRating.physics? 1 : 0;
        chemistryCount  += gradeRating.chemistry? 1 : 0;
        biologyCount += gradeRating.biology? 1 : 0;
        world_historyCount += gradeRating.world_history? 1 : 0;

            // russianTotal += gradeRating.russian_lang;
            // russianCount++;
    })

    var sameSchoolRating2 = BtsRatings.findOne({
        btsNo: btsNo,
        schoolId: schoolId,
        academicYear: academicYear,
        grade: 'all'
    });

    if(day == '1'){

      totalRating.mathematic     /= (mathematicCount|| 1);
      totalRating.mathematicA    /= (mathematicCount|| 1);
      totalRating.mathematicB    /= (mathematicCount|| 1);

      totalRating.kazakh_lang /= (kazakh_langCount || 1);
      totalRating.kazakh_langA /= (kazakh_langCount || 1);
      totalRating.kazakh_langB /= (kazakh_langCount || 1);

      totalRating.turkish_lang   /= (turkish_langCount|| 1);
      totalRating.turkish_langA    /= (turkish_langCount|| 1);
      totalRating.turkish_langB    /= (turkish_langCount|| 1);

      // totalRating.kazakh_history /= (kazakh_historyCount || 1);
      // totalRating.kazakh_historyA /= (kazakh_historyCount || 1);
      // totalRating.kazakh_historyB /= (kazakh_historyCount || 1);

      totalRating.geography /= (geographyCount || 1);
      totalRating.geographyA /= (geographyCount || 1);
      totalRating.geographyB /= (geographyCount || 1);
      totalRating.physics /= (physicsCount || 1);
      totalRating.physicsA /= (physicsCount || 1);
      totalRating.physicsB /= (physicsCount || 1);
      totalRating.chemistry /= (chemistryCount || 1);
      totalRating.chemistryA /= (chemistryCount || 1);
      totalRating.chemistryB /= (chemistryCount || 1);
      totalRating.biology /= (biologyCount || 1);
      totalRating.biologyA /= (biologyCount || 1);
      totalRating.biologyB /= (biologyCount || 1);
      totalRating.world_history /= (world_historyCount || 1);

      // console.log(totalRating);

      totalRating.total += totalRating.mathematic || 0; 
      totalRating.total += totalRating.turkish_lang || 0; 
      totalRating.total += totalRating.geography || 0;
      totalRating.total += totalRating.physics || 0; 
      totalRating.total += totalRating.chemistry || 0;
      totalRating.total += totalRating.biology || 0; 
      totalRating.total += totalRating.kazakh_lang || 0;
      totalRating.total += totalRating.world_history || 0;

      let totalCount = 0;
      console.log('1: ' + mathematicCount
      + ', 2: ' + kazakh_langCount
      + ', 3: ' + turkish_langCount
      + ', 4: ' + geographyCount
      + ', 5: ' + physicsCount
      + ', 6: ' + chemistryCount
      + ', 7: ' + biologyCount
      + ', 8: ' + world_historyCount)
      totalCount += (mathematicCount > 0) ? 1 : 0;
      totalCount += (kazakh_langCount > 0) ? 1 : 0;
      totalCount += (turkish_langCount > 0) ? 1 : 0;
      totalCount += (geographyCount > 0) ? 1 : 0;
      totalCount += (physicsCount > 0) ? 1 : 0;
      totalCount += (chemistryCount > 0) ? 1 : 0;
      totalCount += (biologyCount > 0) ? 1 : 0;
      totalCount += (world_historyCount > 0) ? 1 : 0;
      console.log('Total sum and count: ' + totalRating.total + ", " + totalCount);
      totalRating.total /= totalCount;
      totalRating.total = totalRating.total/20 * 100;
      // totalRating.total_1_day = totalRating.total
      // totalRating.totalInProcent = 999;

      totalRating.totalA += totalRating.mathematicA || 0; 
      totalRating.totalA += totalRating.turkish_langA || 0; 
      totalRating.totalA += totalRating.geographyA || 0;
      totalRating.totalA += totalRating.physicsA || 0; 
      totalRating.totalA += totalRating.chemistryA || 0;
      totalRating.totalA += totalRating.biologyA || 0; 
      totalRating.totalA += totalRating.kazakh_langA || 0;
      totalRating.totalA += totalRating.world_historyA || 0;

      console.log('TotalA sum and count: ' + totalRating.totalA + ", " + totalCount);
      totalRating.totalA /= totalCount;
      

      totalRating.totalB += totalRating.mathematicB || 0; 
      totalRating.totalB += totalRating.turkish_langB || 0; 
      totalRating.totalB += totalRating.geographyB || 0;
      totalRating.totalB += totalRating.physicsB || 0; 
      totalRating.totalB += totalRating.chemistryB || 0;
      totalRating.totalB += totalRating.biologyB || 0; 
      totalRating.totalB += totalRating.kazakh_langB || 0;
      totalRating.totalB += totalRating.world_historyB || 0;

      console.log('TotalB sum and count: ' + totalRating.totalB + ", " + totalCount);
      totalRating.totalB /= totalCount;
      

    }

    else if(day == '2'){
      totalRating.geography /= (geographyCount || 1);
      totalRating.geographyA /= (geographyCount || 1);
      totalRating.geographyB /= (geographyCount || 1);
      totalRating.physics /= (physicsCount || 1);
      totalRating.physicsA /= (physicsCount || 1);
      totalRating.physicsB /= (physicsCount || 1);
      totalRating.chemistry /= (chemistryCount || 1);
      totalRating.chemistryA /= (chemistryCount || 1);
      totalRating.chemistryB /= (chemistryCount || 1);
      totalRating.biology /= (biologyCount || 1);
      totalRating.biologyA /= (biologyCount || 1);
      totalRating.biologyB /= (biologyCount || 1);

      // total_1_day = totalRating.mathematic + totalRating.turkish_lang + totalRating.kazakh_lang + totalRating.kazakh_history;

      // totalRating.total =  (sameSchoolRating2["total_1_day"] || 0)
      totalRating.totalInProcent = 888;
    }

    // let totalOfTotal = (mathTotalProcent + tTotalProcent + rTotalProcent) / 3;
    var sameSchoolRating = BtsRatings.findOne({
        btsNo: btsNo,
        schoolId: schoolId,
        academicYear: academicYear,
        grade: 'all'
    })

    if (sameSchoolRating) {
        BtsRatings.update({_id:sameSchoolRating._id},{$set:totalRating})
    } else {
        BtsRatings.insert(totalRating)
    }

    console.log("================================================================");
}
