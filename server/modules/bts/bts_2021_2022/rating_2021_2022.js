export const calculateRating_2021_2022 = (
  academicYear,
  btsNo,
  day,
  schoolId
) => {
  const btsStructure = [
    {
      btsNo: "1",
      grade: "7",
      day: "1",
      subjects: ["kazakh_lang", "geography", "kazakh_history"],
    },
    {
      btsNo: "1",
      grade: "7",
      day: "2",
      subjects: ["mathematic", "russian_lang"],
    },
    {
      btsNo: "1",
      grade: "8",
      day: "1",
      subjects: ["mathematic", "chemistry", "geography"],
    },
    {
      btsNo: "1",
      grade: "8",
      day: "2",
      subjects: ["physics", "biology", "kazakh_lang"],
    },
    {
      btsNo: "1",
      grade: "9",
      day: "1",
      subjects: ["mathematic", "chemistry", "geography"],
    },
    {
      btsNo: "1",
      grade: "9",
      day: "2",
      subjects: ["physics", "biology", "turkish_lang"],
    },
    {
      btsNo: "1",
      grade: "10",
      day: "1",
      subjects: ["mathematic", "kazakh_history", "turkish_lang"],
    },
  ];

  if (day === "1") {
    BtsRatings.remove({ academicYear, btsNo, schoolId });
  } else if (day === "2") {
    const rating = BtsRatings.find({
      academicYear,
      btsNo,
      schoolId,
      grade: "all",
    });
    if (rating) {
      if (rating["secondSubmission"] && rating["secondSubmission"] === true) {
        BtsRatings.remove({ academicYear, btsNo, schoolId });
      }
    }
  }

  const gradesList = btsStructure
    .filter((item) => item.btsNo === btsNo && item.day === day)
    .map((item) => item.grade)
    .filter((value, index, self) => self.indexOf(value) === index);

  let allSubjectsList = [];

  let totalStudentsPassed = 0;
  let totalStudentsN = 0;

  btsStructure
    .filter((item) => item.btsNo === btsNo)
    .map((item) => {
      allSubjectsList = [...allSubjectsList, ...item.subjects];
    });

  allSubjectsList = [...new Set(allSubjectsList)];

  gradesList.map((grade) => {
    let records = BtsResults.find({
      academicYear,
      btsNo,
      grade,
      schoolId,
    }).fetch();

    const recordsN = records.length;
    totalStudentsN += recordsN;

    ratingObj = {
      academicYear,
      btsNo,
      schoolId,
      grade,
    };

    const subjectsList = btsStructure.find(
      (item) => item.btsNo === btsNo && item.grade === grade && item.day === day
    ).subjects;

    let counters = [
      { day: "1", counter: 0, total: 0 },
      { day: "2", counter: 0, total: 0 },
    ];

    let totalSubjectsN = 0;
    if (
      btsStructure.find(
        (s) => s.btsNo === btsNo && s.grade === grade && s.day === "1"
      )
    )
      totalSubjectsN += btsStructure.find(
        (s) => s.btsNo === btsNo && s.grade === grade && s.day === "1"
      ).subjects.length;

    if (
      btsStructure.find(
        (s) => s.btsNo === btsNo && s.grade === grade && s.day === "2"
      )
    )
      totalSubjectsN += btsStructure.find(
        (s) => s.btsNo === btsNo && s.grade === grade && s.day === "2"
      ).subjects.length;

    records.map((record) => {
      subjectsList.map((subject) => {
        if (ratingObj[subject]) ratingObj[subject] += record[subject] || 0;
        else ratingObj[subject] = record[subject] || 0;

        if (ratingObj[subject + "A"])
          ratingObj[subject + "A"] += record[subject + "A"] || 0;
        else ratingObj[subject + "A"] += record[subject + "A"] || 0;

        if (ratingObj[subject + "B"])
          ratingObj[subject + "B"] += record[subject + "B"] || 0;
        else ratingObj[subject + "B"] += record[subject + "B"] || 0;

        if (ratingObj[subject + "C"])
          ratingObj[subject + "C"] += record[subject + "C"] || 0;
        else ratingObj[subject + "C"] += record[subject + "C"] || 0;

        if (record[subject] >= 10) {
          if (ratingObj[subject + "JaksiCount"])
            ratingObj[subject + "JaksiCount"]++;
          else ratingObj[subject + "JaksiCount"] = 1;
        } else {
          if (ratingObj[subject + "NawarCount"])
            ratingObj[subject + "NawarCount"]++;
          else ratingObj[subject + "NawarCount"] = 1;
        }
      });
      counters.find((c) => c.day === day).counter++;
      counters.find((c) => c.day === day).total +=
        record["day_" + day + "_total"] || 0;

      if (totalSubjectsN === 6 && record["subjectsPassed"] >= 4) {
        totalStudentsPassed++;
        if (ratingObj["studentsPassed"]) ratingObj["studentsPassed"]++;
        else ratingObj["studentsPassed"] = 1;
      } else if (totalSubjectsN === 5 && record["subjectsPassed"] >= 4) {
        totalStudentsPassed++;
        if (ratingObj["studentsPassed"]) ratingObj["studentsPassed"]++;
        else ratingObj["studentsPassed"] = 1;
      } else if (totalSubjectsN === 4 && record["subjectsPassed"] >= 3) {
        totalStudentsPassed++;
        if (ratingObj["studentsPassed"]) ratingObj["studentsPassed"]++;
        else ratingObj["studentsPassed"] = 1;
      } else if (totalSubjectsN === 3 && record["subjectsPassed"] >= 2) {
        totalStudentsPassed++;
        if (ratingObj["studentsPassed"]) ratingObj["studentsPassed"]++;
        else ratingObj["studentsPassed"] = 1;
      }
    });

    const dayCounter = counters.find((c) => c.day === day).counter;

    if (dayCounter !== 0) {
      subjectsList.map((subject) => {
        ratingObj[subject] = ratingObj[subject] / dayCounter;

        ratingObj[subject + "A"] = ratingObj[subject] / dayCounter;
        ratingObj[subject + "B"] = ratingObj[subject] / dayCounter;
        ratingObj[subject + "C"] = ratingObj[subject] / dayCounter;

        if (ratingObj["totalJaksiCount"])
          ratingObj["totalJaksiCount"] +=
            ratingObj[subject + "JaksiCount"] || 0;
        else
          ratingObj["totalJaksiCount"] = ratingObj[subject + "JaksiCount"] || 0;

        if (ratingObj["totalNawarCount"])
          ratingObj["totalNawarCount"] +=
            ratingObj[subject + "NawarCount"] || 0;
        else
          ratingObj["totalNawarCount"] = ratingObj[subject + "NawarCount"] || 0;
      });

      if (day === "1") {
        ratingObj["total"] =
          counters.find((c) => c.day === day).total / dayCounter;
      } else if (day === "2") {
        const firstDayRating = BtsRatings.findOne({
          academicYear,
          btsNo,
          grade,
          schoolId,
        });

        ratingObj["total"] =
          counters.find((c) => c.day === day).total / dayCounter +
          firstDayRating.total;

        ratingObj["totalJaksiCount"] += firstDayRating["totalJaksiCount"] || 0;
        ratingObj["totalNawarCount"] += firstDayRating["totalNawarCount"] || 0;

        const totalCounter =
          counters.find((c) => c.day === "1").counter +
          counters.find((c) => c.day === "2").counter;

        if (totalCounter && totalSubjectsN) {
          ratingObj["totalJaksiCount"] =
            (ratingObj["totalJaksiCount"] * 100) /
            totalCounter /
            totalSubjectsN;
          ratingObj["totalNawarCount"] =
            (ratingObj["totalNawarCount"] * 100) /
            totalCounter /
            totalSubjectsN;
        }
      }
    }

    if (recordsN) {
      ratingObj["studentsPassedPercentage"] =
        (ratingObj["studentsPassed"] / recordsN) * 100;
      ratingObj["studentsFailedPercentage"] =
        100 - ratingObj["studentsPassedPercentage"];
    }

    // insert rating to db
    const ratingInDb = BtsRatings.findOne({
      btsNo,
      academicYear,
      schoolId,
      grade,
    });

    if (!ratingInDb) {
      BtsRatings.insert(ratingObj);
    } else {
      BtsRatings.update(
        { _id: ratingInDb._id },
        {
          $set: ratingObj,
        }
      );
    }
  });

  const gradeRatings = BtsRatings.find({
    academicYear,
    btsNo,
    schoolId,
    grade: { $ne: "all" },
  });
  // calculate total rating
  //
  let totalRating = {
    academicYear,
    btsNo,
    schoolId,
    grade: "all",
  };

  let subjectCounters = [];
  allSubjectsList.map((subject) => {
    let counter = 0;
    gradeRatings.map((rating) => {
      if (rating[subject]) {
        if (totalRating[subject]) {
          totalRating[subject] += rating[subject];
        } else {
          totalRating[subject] = rating[subject];
        }
        counter++;
      }

      if (rating[subject + "A"]) {
        if (totalRating[subject + "A"]) {
          totalRating[subject + "A"] += rating[subject + "A"];
        } else {
          totalRating[subject + "A"] = rating[subject + "A"];
        }
      }

      if (rating[subject + "B"]) {
        if (totalRating[subject + "B"]) {
          totalRating[subject + "B"] += rating[subject + "B"];
        } else {
          totalRating[subject + "B"] = rating[subject + "B"];
        }
      }

      if (rating[subject + "C"]) {
        if (totalRating[subject + "C"]) {
          totalRating[subject + "C"] += rating[subject + "C"];
        } else {
          totalRating[subject + "C"] = rating[subject + "C"];
        }
      }
    });

    if (counter) subjectCounters.push({ subject, counter });

    if (
      subjectCounters.find((c) => c.subject === subject) &&
      subjectCounters.find((c) => c.subject === subject).counter
    ) {
      totalRating[subject] /= subjectCounters.find(
        (c) => c.subject === subject
      ).counter;

      totalRating[subject + "A"] /= subjectCounters.find(
        (c) => c.subject === subject
      ).counter;
      totalRating[subject + "B"] /= subjectCounters.find(
        (c) => c.subject === subject
      ).counter;
      totalRating[subject + "C"] /= subjectCounters.find(
        (c) => c.subject === subject
      ).counter;

      if (totalRating["total"]) {
        totalRating["total"] += totalRating[subject];
        totalRating["totalA"] += totalRating[subject + "A"];
        totalRating["totalB"] += totalRating[subject + "B"];
        totalRating["totalC"] += totalRating[subject + "C"];
      } else {
        totalRating["total"] = totalRating[subject];
        totalRating["totalA"] = totalRating[subject + "A"];
        totalRating["totalB"] = totalRating[subject + "B"];
        totalRating["totalC"] = totalRating[subject + "C"];
      }
    }
  });

  const subjectCount = subjectCounters.length;
  if (subjectCount) {
    totalRating["total"] /= subjectCount;
    totalRating["total"] = (totalRating["total"] * 100) / 20;

    totalRating["totalA"] /= subjectCount;

    totalRating["totalB"] /= subjectCount;

    totalRating["totalC"] /= subjectCount;
  }

  if (day === "1") {
    totalRating["firstSubmission"] = true;
  } else if (day === "2") {
    totalRating["secondSubmission"] = true;
  }

  totalRating["totalStudentsPassed"] = totalStudentsPassed;
  if (totalStudentsN) {
    totalRating["totalStudentsPassedPercentage"] =
      totalRating["totalStudentsPassed"] / totalStudentsN;
    totalRating["totalStudentsFailedPercentage"] =
      100 - totalRating["totalStudentsPassed"];
  }

  const totalRatingInDb = BtsRatings.findOne({
    btsNo,
    schoolId,
    academicYear,
    grade: "all",
  });

  if (totalRatingInDb) {
    BtsRatings.update({ _id: totalRatingInDb._id }, { $set: totalRating });
  } else {
    BtsRatings.insert(totalRating);
  }
};
