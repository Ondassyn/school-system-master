//calculaint ope rating

export const rating = (academicYear, schoolId, reportPeriod) => {

    opeReports = OpeReports.find({academicYear:academicYear, schoolId:schoolId, reportPeriod:reportPeriod}).fetch()

    var totalMathReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalPhysicsReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalChemistryReportType = [0,0,0,0,0,0,0,0,0,0,0];

    var totalBiologyReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalInformaticReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalEnglishReportType = [0,0,0,0,0,0,0,0,0,0,0];

    var totalGeographyReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalKazakh_historyReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalKazakh_langReportType = [0,0,0,0,0,0,0,0,0,0,0];

    var totalTurkish_langReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalRussian_langReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var totalHuhuk_langReportType = [0,0,0,0,0,0,0,0,0,0,0];

    var totalReportType = [0,0,0,0,0,0,0,0,0,0,0];
    var report11 = 0;
    var report12 = 0;
    var report13 = 0;
    var report14 = 0;

    var reportIndex = 1;
    _.each(opeReports,(report) => {

      if(reportIndex == 15){
        reportIndex = 1;
        totalReportType = [0,0,0,0,0,0,0,0,0,0,0];
      }

      if(reportIndex < 11){
      // if(reportIndex <= 4){
        totalMathReportType[reportIndex] += parseInt(report.mathematic)?parseInt(report.mathematic):0
        totalPhysicsReportType[reportIndex] += parseInt(report.physics)?parseInt(report.physics):0
        totalChemistryReportType[reportIndex] += parseInt(report.chemistry)?parseInt(report.chemistry):0

        totalBiologyReportType[reportIndex] += parseInt(report.biology)?parseInt(report.biology):0
        totalInformaticReportType[reportIndex] += parseInt(report.informatic)?parseInt(report.informatic):0
        totalEnglishReportType[reportIndex] += parseInt(report.english)?parseInt(report.english):0

        totalGeographyReportType[reportIndex] += parseInt(report.geography)?parseInt(report.geography):0
        totalKazakh_historyReportType[reportIndex] += parseInt(report.kazakh_history)?parseInt(report.kazakh_history):0
        totalKazakh_langReportType[reportIndex] += parseInt(report.kazakh_lang)?parseInt(report.kazakh_lang):0

        totalTurkish_langReportType[reportIndex] += parseInt(report.turkish_lang)?parseInt(report.turkish_lang):0
        totalRussian_langReportType[reportIndex] += parseInt(report.russian_lang)?parseInt(report.russian_lang):0
        totalHuhuk_langReportType[reportIndex] += parseInt(report.huhuk)?parseInt(report.huhuk):0

        totalReportType[reportIndex] +=

            totalMathReportType[reportIndex] +
            totalPhysicsReportType[reportIndex] +
            totalChemistryReportType[reportIndex]+

            totalBiologyReportType[reportIndex]+
            totalInformaticReportType[reportIndex]+
            totalEnglishReportType[reportIndex]+

            totalGeographyReportType[reportIndex]+
            totalKazakh_historyReportType[reportIndex]+
            totalKazakh_langReportType[reportIndex]+

            totalTurkish_langReportType[reportIndex]+
            totalRussian_langReportType[reportIndex]+
            totalHuhuk_langReportType[reportIndex];

      }else if(reportIndex == 11){
        report11 += parseInt(report.mathematic)

      }else if(reportIndex == 12){
        report12 += parseInt(report.mathematic)

      }else if(reportIndex == 13){
        report13 += parseInt(report.mathematic)

      }else if(reportIndex == 14){
        report14 += parseInt(report.mathematic)
      }

      reportIndex++;

    })

    let subjectIdStore = ['01','02','03','04','05','06','07','08','09','10','11','12']

    _.each(subjectIdStore,(sId) => {
        let reportArray = [];
        if(sId == '01'){
            reportArray = totalMathReportType;
        }else if(sId == '02'){
            reportArray = totalPhysicsReportType;
        }else if(sId == '03'){
            reportArray = totalChemistryReportType;
        }else if(sId == '04'){
            reportArray = totalBiologyReportType;
        }else if(sId == '05'){
            reportArray = totalInformaticReportType;
        }else if(sId == '06'){
            reportArray = totalEnglishReportType;
        }else if(sId == '07'){
            reportArray = totalGeographyReportType;
        }else if(sId == '08'){
            reportArray = totalKazakh_historyReportType;
        }else if(sId == '09'){
            reportArray = totalKazakh_langReportType;
        }else if(sId == '10'){
            reportArray = totalTurkish_langReportType;
        }else if(sId == '11'){
            reportArray = totalRussian_langReportType;
        }else if(sId == '12'){
            reportArray = totalHuhuk_langReportType;
        }

        let totalOfTotal = reportArray[1] * 0.1 + reportArray[2] * 0.1 + reportArray[3] * 0.25 +
                    reportArray[4] * 0.25 + reportArray[5] +
                    reportArray[6] + reportArray[7] * 0.1 + report11 * 2.5 + report12 * 2.5 + report13 * 2 + report14 * 3;

        let subjectRating = {
            academicYear:academicYear,
            schoolId: schoolId,
            reportPeriod: reportPeriod,
            subjectId: sId,
            reportType1: reportArray[1],
            reportType2: reportArray[2],
            reportType3: reportArray[3],
            reportType4: reportArray[4],
            reportType5: reportArray[5],
            reportType6: reportArray[6],
            reportType7: reportArray[7],
            reportType8: reportArray[8],
            reportType9: reportArray[9],
            reportType10: reportArray[10],
            reportType11: report11,
            reportType12: report12,
            reportType13: report13,
            reportType14: report14,
            total: totalOfTotal
        }

        var sameSubjectRating = OpeRatings.findOne({
            academicYear: academicYear,
            schoolId: schoolId,
            reportPeriod: reportPeriod,
            subjectId: sId
        })

        if (sameSubjectRating) {
            OpeRatings.update({_id:sameSubjectRating._id},{$set:subjectRating})
        } else {
            OpeRatings.insert(subjectRating)
        }

    })

    _.each(subjectIdStore,(sId) => {
      let allSubjectRating = {
          academicYear:academicYear,
          schoolId: schoolId,
          reportPeriod: "all",
          subjectId: sId,
          reportType1: 0,
          reportType2: 0,
          reportType3: 0,
          reportType4: 0,
          reportType5: 0,
          reportType6: 0,
          reportType7: 0,
          reportType8: 0,
          reportType9: 0,
          reportType10: 0,
          reportType11: 0,
          reportType12: 0,
          reportType13: 0,
          reportType14: 0,
          total: 0
      }

      var subjectReports = OpeRatings.find({academicYear:academicYear, schoolId:schoolId, subjectId:sId, reportPeriod: { $not: /^all.*/ } }).fetch()

      if(subjectReports){
          _.each(subjectReports,(report) => {

              allSubjectRating.reportType1 += report.reportType1;
              allSubjectRating.reportType2 += report.reportType2;
              allSubjectRating.reportType3 += report.reportType3;
              allSubjectRating.reportType4 += report.reportType4;
              allSubjectRating.reportType5  = report.reportType5;
              allSubjectRating.reportType6  = report.reportType6;
              allSubjectRating.reportType7  = report.reportType7;
              allSubjectRating.reportType8  = report.reportType8;
              allSubjectRating.reportType9  = report.reportType9;
              allSubjectRating.reportType10 = report.reportType10;
              allSubjectRating.reportType11 += report.reportType11;
              allSubjectRating.reportType12 += report.reportType12;
              allSubjectRating.reportType13 += report.reportType13;
              allSubjectRating.reportType14 += report.reportType14;
          })

          allSubjectRating.total = allSubjectRating.reportType1 * 0.1 + allSubjectRating.reportType2 * 0.1 +
                                   allSubjectRating.reportType3 * 0.25 + allSubjectRating.reportType4 * 0.25 +
                                   allSubjectRating.reportType5 + allSubjectRating.reportType6 +
                                   allSubjectRating.reportType7 * 0.1 + allSubjectRating.reportType11 * 2.5 +
                                   allSubjectRating.reportType12 * 2.5 + allSubjectRating.reportType13 * 2 +
                                   allSubjectRating.reportType14 * 3;

          var sameSubjectRating = OpeRatings.findOne({
              academicYear: academicYear,
              schoolId: schoolId,
              reportPeriod: "all",
              subjectId: sId
          })

          if (sameSubjectRating) {
              OpeRatings.update({_id:sameSubjectRating._id},{$set:allSubjectRating})
          } else {
              OpeRatings.insert(allSubjectRating)
          }
      }
    })


    let totalRating = {
        academicYear:academicYear,
        schoolId: schoolId,
        reportPeriod: "all",
        subjectId: "all",
        reportType1: 0,
        reportType2: 0,
        reportType3: 0,
        reportType4: 0,
        reportType5: 0,
        reportType6: 0,
        reportType7: 0,
        reportType8: 0,
        reportType9: 0,
        reportType10: 0,
        reportType11: 0,
        reportType12: 0,
        reportType13: 0,
        reportType14: 0,
        total: 0
    }

    var subjectsTotal = OpeRatings.find({academicYear:academicYear, schoolId:schoolId, reportPeriod: "all", subjectId: { $not: /^all.*/ } }).fetch()

    if(subjectsTotal){
        _.each(subjectsTotal,(subject) => {
          totalRating.reportType1 += subject.reportType1;
          totalRating.reportType2 += subject.reportType2;
          totalRating.reportType3 += subject.reportType3;
          totalRating.reportType4 += subject.reportType4;
          totalRating.reportType5 += subject.reportType5;
          totalRating.reportType6 += subject.reportType6;
          totalRating.reportType7 += subject.reportType7;
          totalRating.reportType8 += subject.reportType8;
          totalRating.reportType9 += subject.reportType9;
          totalRating.reportType10 += subject.reportType10;
          totalRating.reportType11 = subject.reportType11;
          totalRating.reportType12 = subject.reportType12;
          totalRating.reportType13 = subject.reportType13;
          totalRating.reportType14 = subject.reportType14;
        })

        totalRating.total = totalRating.reportType1 * 0.1 + totalRating.reportType2 * 0.1 +
                                 totalRating.reportType3 * 0.25 + totalRating.reportType4 * 0.25 +
                                 totalRating.reportType5 + totalRating.reportType6 +
                                 totalRating.reportType7 * 0.1 + totalRating.reportType11 * 2.5 +
                                 totalRating.reportType12 * 2.5 + totalRating.reportType13 * 2 +
                                 totalRating.reportType14 * 3;

         var sameTotalRating = OpeRatings.findOne({
             academicYear: academicYear,
             schoolId: schoolId,
             reportPeriod: "all",
             subjectId: "all"
         })

         if (sameTotalRating) {
             OpeRatings.update({_id:sameTotalRating._id},{$set:totalRating})
         } else {
             OpeRatings.insert(totalRating)
         }
    }


    let periodList = ['16.11 - 30.11','30.11 - 14.12','14.12 - 28.12','28.12 - 11.01','11.01 - 25.01','25.01 - 08.02','08.02 - 22.02','22.02 - 07.03','07.03 - 21.03','21.03 - 04.04','04.04 - 18.04','18.04 - 02.05','02.05 - 16.05','16.05 - 30.05']

    _.each(periodList,(period) => {

      let allPeriodRating = {
          academicYear:academicYear,
          schoolId: schoolId,
          reportPeriod: period,
          subjectId: "all",
          reportType1: 0,
          reportType2: 0,
          reportType3: 0,
          reportType4: 0,
          reportType5: 0,
          reportType6: 0,
          reportType7: 0,
          reportType8: 0,
          reportType9: 0,
          reportType10: 0,
          reportType11: 0,
          reportType12: 0,
          reportType13: 0,
          reportType14: 0,
          total: 0
      }

      var periodReports = OpeRatings.find({academicYear:academicYear, schoolId:schoolId, reportPeriod:period, subjectId: { $not: /^all.*/ } }).fetch()

      if(periodReports){
          _.each(periodReports,(report) => {

              allPeriodRating.reportType1 += report.reportType1;
              allPeriodRating.reportType2 += report.reportType2;
              allPeriodRating.reportType3 += report.reportType3;
              allPeriodRating.reportType4 += report.reportType4;
              allPeriodRating.reportType5 += report.reportType5;
              allPeriodRating.reportType6 += report.reportType6;
              allPeriodRating.reportType7 += report.reportType7;
              allPeriodRating.reportType8 += report.reportType8;
              allPeriodRating.reportType9 += report.reportType9;
              allPeriodRating.reportType10 = report.reportType10;
              allPeriodRating.reportType11 = report.reportType11;
              allPeriodRating.reportType12 = report.reportType12;
              allPeriodRating.reportType13 = report.reportType13;
              allPeriodRating.reportType14 = report.reportType14;
          })

          allPeriodRating.total = allPeriodRating.reportType1 * 0.1 + allPeriodRating.reportType2 * 0.1 +
                                   allPeriodRating.reportType3 * 0.25 + allPeriodRating.reportType4 * 0.25 +
                                   allPeriodRating.reportType5 + allPeriodRating.reportType6 +
                                   allPeriodRating.reportType7 * 0.1 + allPeriodRating.reportType11 * 2.5 +
                                   allPeriodRating.reportType12 * 2.5 + allPeriodRating.reportType13 * 2 +
                                   allPeriodRating.reportType14 * 3;

          var samePeriodRating = OpeRatings.findOne({
              academicYear: academicYear,
              schoolId: schoolId,
              reportPeriod: period,
              subjectId: "all"
          })

          if (samePeriodRating) {
              OpeRatings.update({_id:samePeriodRating._id},{$set:allPeriodRating})
          } else {
              OpeRatings.insert(allPeriodRating)
          }
      }
    })
}
//end

    /*

          var totalRating = OpeRatings.find({ academicYear: academicYear, schoolId: schoolId }).fetch();
          let periodList = ['16.11 - 30.11',
                            '30.11 - 14.12',
                            '14.12 - 28.12',
                            '28.12 - 11.01',
                            '11.01 - 25.01',
                            '25.01 - 08.02',
                            '08.02 - 22.02',
                            '22.02 - 07.03',
                            '07.03 - 21.03',
                            '21.03 - 04.04',
                            '04.04 - 18.04',
                            '18.04 - 02.05',
                            '02.05 - 16.05',
                            '16.05 - 30.05']

          _.each(periodList,(period) => {

          })

    let totalOfTotal = totalReportType[1] * 0.1  +
                       totalReportType[2] * 0.1  +
                       totalReportType[3] * 0.25 +
                       totalReportType[4] * 0.25 +
                       totalReportType[5] +
                       totalReportType[6] +
                       totalReportType[7] * 0.1 +
                       report11 * 2.5 +
                       report12 * 2.5 +
                       report13 * 2 +
                       report14 * 3;

    var sameAllSchoolsRating = OpeRatings.findOne({
        academicYear: academicYear,
        schoolId: schoolId,
        reportPeriod: reportPeriod
    })

    let allSchoolsRating = {
        academicYear:academicYear,
        schoolId: schoolId,
        reportPeriod: reportPeriod,
        subjectId: "all",
        reportType1: totalReportType[1],
        reportType2: totalReportType[2],
        reportType3: totalReportType[3],
        reportType4: totalReportType[4],
        reportType5: totalReportType[5],
        reportType6: totalReportType[6],
        reportType7: totalReportType[7],
        reportType8: totalReportType[8],
        reportType9: totalReportType[9],
        reportType10: totalReportType[10],
        reportType11: report11,
        reportType12: report12,
        reportType13: report13,
        reportType14: report14,
        total: totalOfTotal
    }

    if (sameAllSchoolsRating) {
        OpeRatings.update({_id:sameAllSchoolsRating._id},{$set:allSchoolsRating})
    } else {
        OpeRatings.insert(allSchoolsRating)
    }
    console.log(totalRating);
    */


    /*
    let allSchoolsRating = {
        academicYear: academicYear,
        schoolId: schoolId,
        reportPeriod: reportPeriod,
        subjectId: "all",
        reportType1: totalRating.totalReportType[1],
        reportType2: totalReportType[2],
        reportType3: totalReportType[3],
        reportType4: totalReportType[4],
        reportType5: totalReportType[5],
        reportType6: totalReportType[6],
        reportType7: totalReportType[7],
        reportType8: totalReportType[8],
        reportType9: totalReportType[9],
        reportType10: totalReportType[10],
        reportType11: report11,
        reportType12: report12,
        reportType13: report13,
        reportType14: report14,
        total: totalOfTotal
    }*/
// Must reat here
// rating by reportPeriod i soninda gana all-ga barin kosip wigartu



/*
let totalOfTotal = (sameAllSchoolsRating.reportType1 + totalReportType[1]) * 0.1  +
                   (sameAllSchoolsRating.reportType2 + totalReportType[2]) * 0.1  +
                   (sameAllSchoolsRating.reportType3 + totalReportType[3]) * 0.25 +
                   (sameAllSchoolsRating.reportType4 + totalReportType[4]) * 0.25 +
                   totalReportType[5] +
                   totalReportType[6] +
                   totalReportType[7] * 0.1 +
                   (sameAllSchoolsRating.reportType11 + report11) * 2.5 +
                   (sameAllSchoolsRating.reportType12 + report12) * 2.5 +
                   (sameAllSchoolsRating.reportType13 + report13) * 2 +
                   (sameAllSchoolsRating.reportType14 + report14) * 3;

  let allSchoolsRating = {
      academicYear:academicYear,
      schoolId: schoolId,
      subjectId: 'all',
      reportType1: sameAllSchoolsRating.reportType1 + totalReportType[1],
      reportType2: sameAllSchoolsRating.reportType2 + totalReportType[2],
      reportType3: sameAllSchoolsRating.reportType3 + totalReportType[3],
      reportType4: sameAllSchoolsRating.reportType4 + totalReportType[4],
      reportType5: totalReportType[5],
      reportType6: totalReportType[6],
      reportType7: totalReportType[7],
      reportType8: totalReportType[8],
      reportType9: totalReportType[9],
      reportType10: totalReportType[10],
      reportType11: sameAllSchoolsRating.reportType11 + report11,
      reportType12: sameAllSchoolsRating.reportType12 + report12,
      reportType13: sameAllSchoolsRating.reportType13 + report13,
      reportType14: sameAllSchoolsRating.reportType14 + report14,
      total: totalOfTotal
  }


*/
