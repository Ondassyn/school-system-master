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

        failNumberPreviousYear = 0;
        if (grade !== "8")
          failNumberPreviousYear += ratingPreviousYear.grade7Fail
            ? +ratingPreviousYear.grade7Fail
            : 0;
        if (grade !== "7")
          failNumberPreviousYear += ratingPreviousYear.grade8Fail
            ? +ratingPreviousYear.grade8Fail
            : 0;

        failPercentagePreviousYear = totalNumberPreviousYear
          ? (failNumberPreviousYear / totalNumberPreviousYear) * 100
          : 0;

        a1NumberPreviousYear = 0;
        if (grade !== "8")
          a1NumberPreviousYear += ratingPreviousYear.grade7A1
            ? ratingPreviousYear.grade7A1
            : 0;
        if (grade !== "7")
          a1NumberPreviousYear += ratingPreviousYear.grade8A2
            ? ratingPreviousYear.grade8A2
            : 0;

        a2PassNumberPreviousYear = 0;
        if (grade !== "8")
          a2PassNumberPreviousYear += ratingPreviousYear.grade7PassA2
            ? ratingPreviousYear.grade7PassA2
            : 0;
        if (grade !== "7")
          a2PassNumberPreviousYear += ratingPreviousYear.grade8PassB1
            ? ratingPreviousYear.grade8PassB1
            : 0;

        a2MeritNumberPreviousYear = 0;
        if (grade !== "8")
          a2MeritNumberPreviousYear += ratingPreviousYear.grade7MeritA2
            ? ratingPreviousYear.grade7MeritA2
            : 0;
        if (grade !== "7")
          a2MeritNumberPreviousYear += ratingPreviousYear.grade8MeritB1
            ? ratingPreviousYear.grade8MeritB1
            : 0;

        b1DistinctionNumberPreviousYear = 0;
        if (grade !== "8")
          b1DistinctionNumberPreviousYear += ratingPreviousYear.grade7DistB1
            ? ratingPreviousYear.grade7DistB1
            : 0;
        if (grade !== "7")
          b1DistinctionNumberPreviousYear += ratingPreviousYear.grade8DistB2
            ? ratingPreviousYear.grade8DistB2
            : 0;
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

        failNumberCurrentYear = 0;
        if (grade !== "8")
          failNumberCurrentYear += ratingCurrentYear.grade7Fail
            ? +ratingCurrentYear.grade7Fail
            : 0;
        if (grade !== "7")
          failNumberCurrentYear += ratingCurrentYear.grade8Fail
            ? +ratingCurrentYear.grade8Fail
            : 0;

        failPercentageCurrentYear = totalNumberCurrentYear
          ? (failNumberCurrentYear / totalNumberCurrentYear) * 100
          : 0;

        a1NumberCurrentYear = 0;
        if (grade !== "8")
          a1NumberCurrentYear += ratingCurrentYear.grade7A1
            ? ratingCurrentYear.grade7A1
            : 0;
        if (grade !== "7")
          a1NumberCurrentYear += ratingCurrentYear.grade8A2
            ? ratingCurrentYear.grade8A2
            : 0;

        a2PassNumberCurrentYear = 0;
        if (grade !== "8")
          a2PassNumberCurrentYear += ratingCurrentYear.grade7PassA2
            ? ratingCurrentYear.grade7PassA2
            : 0;
        if (grade !== "7")
          a2PassNumberCurrentYear += ratingCurrentYear.grade8PassB1
            ? ratingCurrentYear.grade8PassB1
            : 0;

        a2MeritNumberCurrentYear = 0;
        if (grade !== "8")
          a2MeritNumberCurrentYear += ratingCurrentYear.grade7MeritA2
            ? ratingCurrentYear.grade7MeritA2
            : 0;
        if (grade !== "7")
          a2MeritNumberCurrentYear += ratingCurrentYear.grade8MeritB1
            ? ratingCurrentYear.grade8MeritB1
            : 0;

        b1DistinctionNumberCurrentYear = 0;
        if (grade !== "8")
          b1DistinctionNumberCurrentYear += ratingCurrentYear.grade7DistB1
            ? ratingCurrentYear.grade7DistB1
            : 0;
        if (grade !== "7")
          b1DistinctionNumberCurrentYear += ratingCurrentYear.grade8DistB2
            ? ratingCurrentYear.grade8DistB2
            : 0;
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
  // "click #export"(event, template) {
  //   const html = document.getElementById("out").innerHTML;

  //   var data = [];
  //   let okuJyly = academicYear.get();

  //   headers = [
  //     "#",
  //     "Оқу жылы",
  //     "Тоқсан",
  //     "Мектеп ID",
  //     "Мектеп аты",
  //     "KET (7 сынып) Орта балл",
  //     "Average level KET ",
  //     "PET (8 сынып) Орта балл",
  //     "Average level PET",
  //     "Жалпы",
  //   ];

  //   data.push(headers);
  //   var resultStore = KetPetRatings.find({}, { sort: { total: -1 } }).fetch();

  //   for (var i = 0; i < resultStore.length; i++) {
  //     let idN = i + 1;
  //     let examPeriod = resultStore[i].examPeriod;
  //     let schoolId = resultStore[i].schoolId;
  //     let mektepAty = Schools.findOne({ schoolId: resultStore[i].schoolId })
  //       ? Schools.findOne({ schoolId: resultStore[i].schoolId }).shortName
  //       : undefined;

  //     let total7Grade = resultStore[i].total7Grade;
  //     let total7Level = resultStore[i].total7Level;
  //     let total8Grade = resultStore[i].total8Grade;
  //     let total8Level = resultStore[i].total8Level;
  //     let total = resultStore[i].total;

  //     let content = [
  //       idN,
  //       okuJyly,
  //       examPeriod,
  //       schoolId,
  //       mektepAty,
  //       total7Grade,
  //       total7Level,
  //       total8Grade,
  //       total8Level,
  //       total,
  //     ];

  //     data.push(content);
  //   }

  //   Meteor.call("download", data, (err, wb) => {
  //     if (err) throw err;

  //     let sName =
  //       "KET-PET rating " +
  //       template.examPeriod.get() +
  //       "токсан " +
  //       okuJyly +
  //       ".xlsx";
  //     XLSX.writeFile(wb, sName);
  //   });
  // },

  // "click #sortTotal"(event, template) {
  //   Session.set("Sort", { total: -1 });
  // },
  // "click #reportType1"(event, template) {
  //   Session.set("Sort", { reportType1: -1 });
  // },
});

Template.ketPetCompare.onRendered(function () {
  this.$('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});
