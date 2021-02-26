import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./ketPetCompare.html";
import { ReactiveDict } from "meteor/reactive-dict";
import XLSX from "xlsx";

Template.ketPetCompare.onCreated(function () {
  let template = this;
  document.title = "KET-PET Рейтинг";
  template.examPeriod = new ReactiveVar("2");
  template.order = new ReactiveVar([]);
  template.grade = new ReactiveVar("7");

  template.subscribe("schools");

  template.autorun(() => {
    template.subscribe(
      "adminKetPetRatingsCompare",
      academicYear.get(),
      template.examPeriod.get()
    );
  });
});

let out = [];

Template.ketPetCompare.helpers({
  currentYear() {
    return academicYear.get().split("-")[1];
  },
  previousYear() {
    return academicYear.get().split("-")[0];
  },
  isGrade7() {
    return Template.instance().grade.get() === "7";
  },
  isGrade8() {
    return Template.instance().grade.get() === "8";
  },
  results() {
    let returnList = [];

    let schools = Schools.find({}).fetch();
    let grade = Template.instance().grade.get();

    let order = Template.instance().order.get();
    if (order.length !== 0) {
      let ordered = _.sortBy(schools, function (o) {
        let index = _.indexOf(order, o.schoolId);
        if (index !== -1) return index;
      });
      schools = ordered;
    }

    schools.map((school) => {
      let schoolId = school.schoolId;

      let ratingCurrentYear = KetPetRatings.findOne({
        academicYear: academicYear.get(),
        schoolId,
      });
      let ratingPreviousYear = KetPetRatings.findOne({
        academicYear: previousYear.get(),
        schoolId,
      });

      if (!ratingCurrentYear && !ratingPreviousYear) return;

      let totalNumberPreviousYear;
      let totalNumberCurrentYear;
      let failNumberPreviousYear;
      let failNumberCurrentYear;
      let failPercentagePreviousYear;
      let failPercentageCurrentYear;
      let a1NumberPreviousYear;
      let a1NumberCurrentYear;
      let a2PassNumberPreviousYear;
      let a2PassNumberCurrentYear;
      let a2MeritNumberPreviousYear;
      let a2MeritNumberCurrentYear;
      let b1DistinctionNumberPreviousYear;
      let b1DistinctionNumberCurrentYear;

      let outArray = [];

      if (ratingPreviousYear) {
        totalNumberPreviousYear = 0;

        if (grade !== "8")
          totalNumberPreviousYear += ratingPreviousYear.sCount7Grade
            ? +ratingPreviousYear.sCount7Grade
            : 0;

        if (grade !== "7")
          totalNumberPreviousYear += ratingPreviousYear.sCount8Grade
            ? +ratingPreviousYear.sCount8Grade
            : 0;

        outArray[0] = totalNumberPreviousYear;

        failNumberPreviousYear = 0;
        if (grade !== "8")
          failNumberPreviousYear += ratingPreviousYear.grade7Fail
            ? +ratingPreviousYear.grade7Fail
            : 0;
        if (grade !== "7")
          failNumberPreviousYear += ratingPreviousYear.grade8Fail
            ? +ratingPreviousYear.grade8Fail
            : 0;

        outArray[2] = failNumberPreviousYear;

        failPercentagePreviousYear = totalNumberPreviousYear
          ? (failNumberPreviousYear / totalNumberPreviousYear) * 100
          : 0;

        outArray[4] = failPercentagePreviousYear;

        a1NumberPreviousYear = 0;
        if (grade !== "8")
          a1NumberPreviousYear += ratingPreviousYear.grade7A1
            ? ratingPreviousYear.grade7A1
            : 0;
        if (grade !== "7")
          a1NumberPreviousYear += ratingPreviousYear.grade8A2
            ? ratingPreviousYear.grade8A2
            : 0;

        outArray[6] = a1NumberPreviousYear;

        a2PassNumberPreviousYear = 0;
        if (grade !== "8")
          a2PassNumberPreviousYear += ratingPreviousYear.grade7PassA2
            ? ratingPreviousYear.grade7PassA2
            : 0;
        if (grade !== "7")
          a2PassNumberPreviousYear += ratingPreviousYear.grade8PassB1
            ? ratingPreviousYear.grade8PassB1
            : 0;

        outArray[8] = a2PassNumberPreviousYear;

        a2MeritNumberPreviousYear = 0;
        if (grade !== "8")
          a2MeritNumberPreviousYear += ratingPreviousYear.grade7MeritA2
            ? ratingPreviousYear.grade7MeritA2
            : 0;
        if (grade !== "7")
          a2MeritNumberPreviousYear += ratingPreviousYear.grade8MeritB1
            ? ratingPreviousYear.grade8MeritB1
            : 0;

        outArray[10] = a2MeritNumberPreviousYear;

        b1DistinctionNumberPreviousYear = 0;
        if (grade !== "8")
          b1DistinctionNumberPreviousYear += ratingPreviousYear.grade7DistB1
            ? ratingPreviousYear.grade7DistB1
            : 0;
        if (grade !== "7")
          b1DistinctionNumberPreviousYear += ratingPreviousYear.grade8DistB2
            ? ratingPreviousYear.grade8DistB2
            : 0;

        outArray[12] = b1DistinctionNumberPreviousYear;
      }

      if (ratingCurrentYear) {
        totalNumberCurrentYear = 0;

        if (grade !== "8")
          totalNumberCurrentYear += ratingCurrentYear.sCount7Grade
            ? +ratingCurrentYear.sCount7Grade
            : 0;

        if (grade !== "7")
          totalNumberCurrentYear += ratingCurrentYear.sCount8Grade
            ? +ratingCurrentYear.sCount8Grade
            : 0;

        outArray[1] = totalNumberCurrentYear;

        failNumberCurrentYear = 0;
        if (grade !== "8")
          failNumberCurrentYear += ratingCurrentYear.grade7Fail
            ? +ratingCurrentYear.grade7Fail
            : 0;
        if (grade !== "7")
          failNumberCurrentYear += ratingCurrentYear.grade8Fail
            ? +ratingCurrentYear.grade8Fail
            : 0;

        outArray[3] = failNumberCurrentYear;

        failPercentageCurrentYear = totalNumberCurrentYear
          ? (failNumberCurrentYear / totalNumberCurrentYear) * 100
          : 0;

        outArray[5] = failPercentageCurrentYear;

        a1NumberCurrentYear = 0;
        if (grade !== "8")
          a1NumberCurrentYear += ratingCurrentYear.grade7A1
            ? ratingCurrentYear.grade7A1
            : 0;
        if (grade !== "7")
          a1NumberCurrentYear += ratingCurrentYear.grade8A2
            ? ratingCurrentYear.grade8A2
            : 0;

        outArray[7] = a1NumberCurrentYear;

        a2PassNumberCurrentYear = 0;
        if (grade !== "8")
          a2PassNumberCurrentYear += ratingCurrentYear.grade7PassA2
            ? ratingCurrentYear.grade7PassA2
            : 0;
        if (grade !== "7")
          a2PassNumberCurrentYear += ratingCurrentYear.grade8PassB1
            ? ratingCurrentYear.grade8PassB1
            : 0;

        outArray[9] = a2PassNumberCurrentYear;

        a2MeritNumberCurrentYear = 0;
        if (grade !== "8")
          a2MeritNumberCurrentYear += ratingCurrentYear.grade7MeritA2
            ? ratingCurrentYear.grade7MeritA2
            : 0;
        if (grade !== "7")
          a2MeritNumberCurrentYear += ratingCurrentYear.grade8MeritB1
            ? ratingCurrentYear.grade8MeritB1
            : 0;

        outArray[11] = a2MeritNumberCurrentYear;

        b1DistinctionNumberCurrentYear = 0;
        if (grade !== "8")
          b1DistinctionNumberCurrentYear += ratingCurrentYear.grade7DistB1
            ? ratingCurrentYear.grade7DistB1
            : 0;
        if (grade !== "7")
          b1DistinctionNumberCurrentYear += ratingCurrentYear.grade8DistB2
            ? ratingCurrentYear.grade8DistB2
            : 0;

        outArray[13] = b1DistinctionNumberCurrentYear;
      }

      let returnObject = {
        schoolId,
        school: school.shortName,
        totalNumberPreviousYear,
        totalNumberCurrentYear,
        failNumberPreviousYear,
        failNumberCurrentYear,
        failPercentagePreviousYear,
        failPercentageCurrentYear,
        a1NumberPreviousYear,
        a1NumberCurrentYear,
        a2PassNumberPreviousYear,
        a2PassNumberCurrentYear,
        a2MeritNumberPreviousYear,
        a2MeritNumberCurrentYear,
        b1DistinctionNumberPreviousYear,
        b1DistinctionNumberCurrentYear,
      };

      var index = out.findIndex((o) => o.schoolId === schoolId);
      if (index === -1) out.push({ schoolId, outArray });
      else out[index] = { schoolId, outArray };
      returnList.push(returnObject);
    });
    return returnList;
  },
});

let dict = {
  total_number_previous_year_7: "sCount7Grade",
  total_number_current_year_7: "sCount7Grade",
  total_number_previous_year_8: "sCount8Grade",
  total_number_current_year_8: "sCount8Grade",
  fail_number_previous_year_7: "grade7Fail",
  fail_number_current_year_7: "grade7Fail",
  fail_number_previous_year_8: "grade8Fail",
  fail_number_current_year_8: "grade8Fail",
  a1_number_previous_year: "grade7A1",
  a1_number_current_year: "grade7A1",
  a2_pass_number_previous_year: "grade7PassA2",
  a2_pass_number_current_year: "grade7PassA2",
  a2_merit_number_previous_year: "grade7MeritA2",
  a2_merit_number_current_year: "grade7MeritA2",
  b1_distinction_number_previous_year: "grade7DistB1",
  b1_distinction_number_current_year: "grade7DistB1",
  a2_number_previous_year: "grade8A2",
  a2_number_current_year: "grade8A2",
  b1_pass_number_previous_year: "grade8PassB1",
  b1_pass_number_current_year: "grade8PassB1",
  b1_merit_number_previous_year: "grade8MeritB1",
  b1_merit_number_current_year: "grade8MeritB1",
  b2_distinction_number_previous_year: "grade8DistB2",
  b2_distinction_number_current_year: "grade8DistB2",
};

Template.ketPetCompare.events({
  "change #exam_period"(event, template) {
    template.examPeriod.set(event.target.value);
  },
  "change #grade"(event, template) {
    template.grade.set(event.target.value);
  },
  "click .subheader"(event, template) {
    let name = event.target.getAttribute("name");
    let grade = template.grade.get();
    let ratings;
    let order;
    if (name.includes("percentage")) {
      let fail_number_arg = "grade" + grade + "Fail";
      let total_number_arg = "sCount" + grade + "Grade";
      if (name.includes("previous")) {
        ratings = KetPetRatings.find(
          { academicYear: previousYear.get() },
          {
            fields: {
              schoolId: 1,
              [fail_number_arg]: 1,
              [total_number_arg]: 1,
              _id: 0,
            },
          }
        ).fetch();
      } else {
        ratings = KetPetRatings.find(
          { academicYear: academicYear.get() },
          {
            fields: {
              schoolId: 1,
              [fail_number_arg]: 1,
              [total_number_arg]: 1,
              _id: 0,
            },
          }
        ).fetch();
      }
      order = [];
      let objects = ratings
        .filter(
          (rating) =>
            (rating[fail_number_arg] || rating[fail_number_arg]) &&
            rating[total_number_arg]
        )
        .map((rating) => {
          return {
            [rating.schoolId]:
              rating[fail_number_arg] / rating[total_number_arg],
          };
        });
      objects.sort(function (a, b) {
        return Object.values(b) - Object.values(a);
      });
      objects.map((o) => {
        order.push(Object.keys(o)[0]);
      });
    } else {
      if (name.includes("previous")) {
        ratings = KetPetRatings.find(
          { academicYear: previousYear.get() },
          {
            sort: { [dict[name]]: -1 },
            fields: { schoolId: 1, [dict[name]]: 1, _id: 0 },
          }
        ).fetch();
      } else {
        ratings = KetPetRatings.find(
          { academicYear: academicYear.get() },
          {
            sort: { [dict[name]]: -1 },
            fields: { schoolId: 1, [dict[name]]: 1, _id: 0 },
          }
        ).fetch();
      }
      order = ratings
        .filter((rating) => rating[dict[name]] || rating[dict[name]] === 0)
        .map((rating) => rating.schoolId);
    }
    let oldOrder = template.order.get();
    if (JSON.stringify(order) === JSON.stringify(oldOrder)) {
      template.order.set(order.reverse());
    } else {
      template.order.set(order);
    }
  },
  "click #export"(event, template) {
    const html = document.getElementById("out").innerHTML;

    var data = [];
    let grade = template.grade.get();

    if (grade === "7") {
      headers = [
        "Оқу жылы",
        "Тоқсан",
        "Мектеп ID",
        "Мектеп аты",
        "Қатысушылар саны (" + previousYear.get() + ")",
        "Қатысушылар саны (" + academicYear.get() + ")",
        "Fail саны (" + previousYear.get() + ")",
        "Fail саны (" + academicYear.get() + ")",
        "Fail пайызы (" + previousYear.get() + ")",
        "Fail пайызы (" + academicYear.get() + ")",
        "A1 (" + previousYear.get() + ")",
        "A1 (" + academicYear.get() + ")",
        "A2 pass (" + previousYear.get() + ")",
        "A2 pass (" + academicYear.get() + ")",
        "A2 pass with merit (" + previousYear.get() + ")",
        "A2 pass with merit (" + academicYear.get() + ")",
        "B1 pass with distinction (" + previousYear.get() + ")",
        "B1 pass with distinction (" + previousYear.get() + ")",
      ];
    } else {
      headers = [
        "Оқу жылы",
        "Тоқсан",
        "Мектеп ID",
        "Мектеп аты",
        "Қатысушылар саны (" + previousYear.get() + ")",
        "Қатысушылар саны (" + academicYear.get() + ")",
        "Fail саны (" + previousYear.get() + ")",
        "Fail саны (" + academicYear.get() + ")",
        "Fail пайызы (" + previousYear.get() + ")",
        "Fail пайызы (" + academicYear.get() + ")",
        "A2 (" + previousYear.get() + ")",
        "A2 (" + academicYear.get() + ")",
        "B1 pass (" + previousYear.get() + ")",
        "B1 pass (" + academicYear.get() + ")",
        "B1 pass with merit (" + previousYear.get() + ")",
        "B1 pass with merit (" + academicYear.get() + ")",
        "B2 pass with distinction (" + previousYear.get() + ")",
        "B2 pass with distinction (" + previousYear.get() + ")",
      ];
    }
    data.push(headers);
    let lines = out;

    lines.map((line) => {
      let schoolId = line.schoolId;
      let schoolName = Schools.findOne({ schoolId }).shortName;
      let outArray = line.outArray;
      let row = [
        academicYear.get(),
        template.examPeriod.get(),
        schoolId,
        schoolName,
        ...outArray,
      ];
      data.push(row);
    });

    Meteor.call("download", data, (err, wb) => {
      if (err) throw err;

      let sName =
        "KET-PET Салыстыру " +
        template.examPeriod.get() +
        " токсан " +
        academicYear.get() +
        ".xlsx";
      XLSX.writeFile(wb, sName);
    });
  },
});

Template.ketPetCompare.onRendered(function () {
  this.$('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});
