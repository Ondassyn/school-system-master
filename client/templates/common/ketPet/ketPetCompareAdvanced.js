import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./ketPetCompareAdvanced.html";
import { ReactiveDict } from "meteor/reactive-dict";
import XLSX from "xlsx";

Template.ketPetCompareAdvanced.onCreated(function () {
  let template = this;
  document.title = "KET-PET Рейтинг";
  template.previousYear = new ReactiveVar(academicYear.get());
  template.previousPeriod = new ReactiveVar("2");

  template.currentYear = new ReactiveVar(academicYear.get());
  template.currentPeriod = new ReactiveVar("2");

  template.order = new ReactiveVar([]);
  template.grade = new ReactiveVar("7");

  template.showNumbers = new ReactiveVar(false);

  Session.set("maxFailPercentageDifference", Number.MIN_VALUE);
  Session.set("minFailPercentageDifference", Number.MAX_VALUE);
  Session.set("maxFailNumberDifference", Number.MIN_VALUE);
  Session.set("minFailNumberDifference", Number.MAX_VALUE);

  template.subscribe("schools");

  template.subscribe("adminKetPetRatingsCompareAdvanced");
});

let out = [];

Template.ketPetCompareAdvanced.helpers({
  academicYears() {
    return [
      ...new Set(
        KetPetRatings.find({}, { field: "academicYear" })
          .fetch()
          .map((item) => item.academicYear)
      ),
    ];
  },
  isCurrentYear(year) {
    return year === academicYear.get();
  },
  current() {
    return (
      Template.instance().currentYear.get() +
      "<br>" +
      Template.instance().currentPeriod.get() +
      " тоқсан"
    );
  },
  previous() {
    return (
      Template.instance().previousYear.get() +
      "<br>" +
      Template.instance().previousPeriod.get() +
      " тоқсан"
    );
  },
  isGrade7() {
    return Template.instance().grade.get() === "7";
  },
  isGrade8() {
    return Template.instance().grade.get() === "8";
  },
  isValidNumber(number) {
    return number || number === 0;
  },
  isShowNumbers() {
    return Template.instance().showNumbers.get();
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

      let ratingCurrent = KetPetRatings.findOne({
        academicYear: Template.instance().currentYear.get(),
        examPeriod: Template.instance().currentPeriod.get(),
        schoolId,
      });
      let ratingPrevious = KetPetRatings.findOne({
        academicYear: Template.instance().previousYear.get(),
        examPeriod: Template.instance().previousPeriod.get(),
        schoolId,
      });

      if (!ratingCurrent && !ratingPrevious) return;

      let totalNumberPrevious;
      let totalNumberCurrent;
      let failNumberPrevious;
      let failNumberCurrent;
      let failPercentagePrevious;
      let failPercentageCurrent;
      let a1NumberPrevious;
      let a1NumberCurrent;
      let a2PassNumberPrevious;
      let a2PassNumberCurrent;
      let a2MeritNumberPrevious;
      let a2MeritNumberCurrent;
      let b1DistinctionNumberPrevious;
      let b1DistinctionNumberCurrent;
      let a2AndAboveNumberPrevious;
      let a2AndAboveNumberCurrent;

      let a1PercentagePrevious;
      let a1PercentageCurrent;
      let a2AndAbovePercentagePrevious;
      let a2AndAbovePercentageCurrent;

      let outArray = [];

      if (ratingPrevious) {
        totalNumberPrevious = 0;

        if (grade !== "8")
          totalNumberPrevious += ratingPrevious.sCount7Grade
            ? +ratingPrevious.sCount7Grade
            : 0;

        if (grade !== "7")
          totalNumberPrevious += ratingPrevious.sCount8Grade
            ? +ratingPrevious.sCount8Grade
            : 0;

        outArray[0] = totalNumberPrevious;

        failNumberPrevious = 0;
        if (grade !== "8")
          failNumberPrevious += ratingPrevious.grade7Fail
            ? +ratingPrevious.grade7Fail
            : 0;
        if (grade !== "7")
          failNumberPrevious += ratingPrevious.grade8Fail
            ? +ratingPrevious.grade8Fail
            : 0;

        outArray[2] = failNumberPrevious;

        failPercentagePrevious = totalNumberPrevious
          ? (failNumberPrevious / totalNumberPrevious) * 100
          : 0;

        outArray[5] = failPercentagePrevious;

        a1NumberPrevious = 0;
        if (grade !== "8")
          a1NumberPrevious += ratingPrevious.grade7A1
            ? ratingPrevious.grade7A1
            : 0;
        if (grade !== "7")
          a1NumberPrevious += ratingPrevious.grade8A2
            ? ratingPrevious.grade8A2
            : 0;

        outArray[8] = a1NumberPrevious;

        a1PercentagePrevious = totalNumberPrevious
          ? (a1NumberPrevious / totalNumberPrevious) * 100
          : 0;

        outArray[10] = a1PercentagePrevious;

        a2PassNumberPrevious = 0;
        if (grade !== "8")
          a2PassNumberPrevious += ratingPrevious.grade7PassA2
            ? ratingPrevious.grade7PassA2
            : 0;
        if (grade !== "7")
          a2PassNumberPrevious += ratingPrevious.grade8PassB1
            ? ratingPrevious.grade8PassB1
            : 0;

        a2MeritNumberPrevious = 0;
        if (grade !== "8")
          a2MeritNumberPrevious += ratingPrevious.grade7MeritA2
            ? ratingPrevious.grade7MeritA2
            : 0;
        if (grade !== "7")
          a2MeritNumberPrevious += ratingPrevious.grade8MeritB1
            ? ratingPrevious.grade8MeritB1
            : 0;

        b1DistinctionNumberPrevious = 0;
        if (grade !== "8")
          b1DistinctionNumberPrevious += ratingPrevious.grade7DistB1
            ? ratingPrevious.grade7DistB1
            : 0;
        if (grade !== "7")
          b1DistinctionNumberPrevious += ratingPrevious.grade8DistB2
            ? ratingPrevious.grade8DistB2
            : 0;

        a2AndAboveNumberPrevious =
          a2PassNumberPrevious +
          a2MeritNumberPrevious +
          b1DistinctionNumberPrevious;

        outArray[12] = a2AndAboveNumberPrevious;

        a2AndAbovePercentagePrevious = totalNumberPrevious
          ? (a2AndAboveNumberPrevious / totalNumberPrevious) * 100
          : 0;

        outArray[14] = a2AndAbovePercentagePrevious;
      }

      if (ratingCurrent) {
        totalNumberCurrent = 0;

        if (grade !== "8")
          totalNumberCurrent += ratingCurrent.sCount7Grade
            ? +ratingCurrent.sCount7Grade
            : 0;

        if (grade !== "7")
          totalNumberCurrent += ratingCurrent.sCount8Grade
            ? +ratingCurrent.sCount8Grade
            : 0;

        outArray[1] = totalNumberCurrent;

        failNumberCurrent = 0;
        if (grade !== "8")
          failNumberCurrent += ratingCurrent.grade7Fail
            ? +ratingCurrent.grade7Fail
            : 0;
        if (grade !== "7")
          failNumberCurrent += ratingCurrent.grade8Fail
            ? +ratingCurrent.grade8Fail
            : 0;

        outArray[3] = failNumberCurrent;

        failPercentageCurrent = totalNumberCurrent
          ? (failNumberCurrent / totalNumberCurrent) * 100
          : 0;

        outArray[6] = failPercentageCurrent;

        a1NumberCurrent = 0;
        if (grade !== "8")
          a1NumberCurrent += ratingCurrent.grade7A1
            ? ratingCurrent.grade7A1
            : 0;
        if (grade !== "7")
          a1NumberCurrent += ratingCurrent.grade8A2
            ? ratingCurrent.grade8A2
            : 0;

        outArray[9] = a1NumberCurrent;

        a1PercentageCurrent = totalNumberCurrent
          ? (a1NumberCurrent / totalNumberCurrent) * 100
          : 0;

        outArray[11] = a1PercentageCurrent;

        a2PassNumberCurrent = 0;
        if (grade !== "8")
          a2PassNumberCurrent += ratingCurrent.grade7PassA2
            ? ratingCurrent.grade7PassA2
            : 0;
        if (grade !== "7")
          a2PassNumberCurrent += ratingCurrent.grade8PassB1
            ? ratingCurrent.grade8PassB1
            : 0;

        a2MeritNumberCurrent = 0;
        if (grade !== "8")
          a2MeritNumberCurrent += ratingCurrent.grade7MeritA2
            ? ratingCurrent.grade7MeritA2
            : 0;
        if (grade !== "7")
          a2MeritNumberCurrent += ratingCurrent.grade8MeritB1
            ? ratingCurrent.grade8MeritB1
            : 0;

        b1DistinctionNumberCurrent = 0;
        if (grade !== "8")
          b1DistinctionNumberCurrent += ratingCurrent.grade7DistB1
            ? ratingCurrent.grade7DistB1
            : 0;
        if (grade !== "7")
          b1DistinctionNumberCurrent += ratingCurrent.grade8DistB2
            ? ratingCurrent.grade8DistB2
            : 0;

        a2AndAboveNumberCurrent =
          a2PassNumberCurrent +
          a2MeritNumberCurrent +
          b1DistinctionNumberCurrent;

        outArray[13] = a2AndAboveNumberCurrent;

        a2AndAbovePercentageCurrent = totalNumberCurrent
          ? (a2AndAboveNumberCurrent / totalNumberCurrent) * 100
          : 0;
        outArray[15] = a2AndAbovePercentageCurrent;
      }

      let failPercentageDifference;
      if (
        (failPercentagePrevious || failPercentagePrevious === 0) &&
        (failPercentageCurrent || failPercentageCurrent === 0)
      ) {
        failPercentageDifference =
          failPercentageCurrent - failPercentagePrevious;
        if (
          failPercentageDifference > Session.get("maxFailPercentageDifference")
        )
          Session.set("maxFailPercentageDifference", failPercentageDifference);
        if (
          failPercentageDifference < Session.get("minFailPercentageDifference")
        )
          Session.set("minFailPercentageDifference", failPercentageDifference);
      }

      outArray[7] = failPercentageDifference;

      let failNumberDifference;
      if (
        (failNumberPrevious || failNumberPrevious === 0) &&
        (failNumberCurrent || failNumberCurrent === 0)
      ) {
        failNumberDifference = failNumberCurrent - failNumberPrevious;
        if (failNumberDifference > Session.get("maxFailNumberDifference"))
          Session.set("maxFailNumberDifference", failNumberDifference);
        if (failNumberDifference < Session.get("minFailNumberDifference"))
          Session.set("minFailNumberDifference", failNumberDifference);
      }

      outArray[4] = failNumberDifference;

      let returnObject = {
        schoolId,
        school: school.shortName,
        totalNumberPrevious,
        totalNumberCurrent,
        failNumberPrevious,
        failNumberCurrent,
        failNumberDifference,
        failPercentagePrevious,
        failPercentageCurrent,
        failPercentageDifference,
        a1NumberPrevious,
        a1NumberCurrent,
        a2PassNumberPrevious,
        a2PassNumberCurrent,
        a2MeritNumberPrevious,
        a2MeritNumberCurrent,
        b1DistinctionNumberPrevious,
        b1DistinctionNumberCurrent,
        a2AndAboveNumberPrevious,
        a2AndAboveNumberCurrent,
        a1PercentagePrevious,
        a1PercentageCurrent,
        a2AndAbovePercentagePrevious,
        a2AndAbovePercentageCurrent,
      };

      var index = out.findIndex((o) => o.schoolId === schoolId);
      if (index === -1) out.push({ schoolId, outArray });
      else out[index] = { schoolId, outArray };
      returnList.push(returnObject);
    });
    return returnList;
  },
  setGradientStyle(value, type) {
    let minValue, maxValue;

    if (type === "percentage") {
      maxValue = Session.get("maxFailPercentageDifference");
      if (maxValue === Number.MIN_VALUE) return "";
      minValue = Session.get("minFailPercentageDifference");
      if (minValue === Number.MAX_VALUE) return "";
    } else {
      maxValue = Session.get("maxFailNumberDifference");
      if (maxValue === Number.MIN_VALUE) return "";
      minValue = Session.get("minFailNumberDifference");
      if (minValue === Number.MAX_VALUE) return "";
    }
    let red = 0;
    let green = 255;
    let blue = 0;
    let opacity = 0.65;

    let normalizedValue = (value - minValue) / (maxValue - minValue);
    let scaledValue = parseInt(normalizedValue * 255, 10);
    red += scaledValue;
    green -= scaledValue;

    return (
      "background-color: rgb(" +
      red +
      ", " +
      green +
      ", " +
      blue +
      ", " +
      opacity +
      ");"
    );
  },
});

let dict = {
  total_number_previous_7: "sCount7Grade",
  total_number_current_7: "sCount7Grade",
  total_number_previous_8: "sCount8Grade",
  total_number_current_8: "sCount8Grade",
  fail_number_previous_7: "grade7Fail",
  fail_number_current_7: "grade7Fail",
  fail_number_previous_8: "grade8Fail",
  fail_number_current_8: "grade8Fail",
  a1_number_previous: "grade7A1",
  a1_number_current: "grade7A1",
  a2_pass_number_previous: "grade7PassA2",
  a2_pass_number_current: "grade7PassA2",
  a2_merit_number_previous: "grade7MeritA2",
  a2_merit_number_current: "grade7MeritA2",
  b1_distinction_number_previous: "grade7DistB1",
  b1_distinction_number_current: "grade7DistB1",
  a2_number_previous: "grade8A2",
  a2_number_current: "grade8A2",
  b1_pass_number_previous: "grade8PassB1",
  b1_pass_number_current: "grade8PassB1",
  b1_merit_number_previous: "grade8MeritB1",
  b1_merit_number_current: "grade8MeritB1",
  b2_distinction_number_previous: "grade8DistB2",
  b2_distinction_number_current: "grade8DistB2",
};

Template.ketPetCompareAdvanced.events({
  "change #previousYear"(event, template) {
    template.previousYear.set(event.target.value);
  },
  "change #previousPeriod"(event, template) {
    template.previousPeriod.set(event.target.value);
  },
  "change #currentYear"(event, template) {
    template.currentYear.set(event.target.value);
  },
  "change #currentPeriod"(event, template) {
    template.currentPeriod.set(event.target.value);
  },
  "change #grade"(event, template) {
    template.grade.set(event.target.value);
  },
  "change #showNumbers"(event, template) {
    template.showNumbers.set(event.target.checked);
  },
  "click .subheader"(event, template) {
    let name = event.target.getAttribute("name");
    let grade = template.grade.get();
    let ratings;
    let order;
    if (name.includes("percentage")) {
      let relevantIndex = -1;
      if (name.includes("difference")) {
        relevantIndex = 6;
      } else if (name.includes("previous")) {
        relevantIndex = 4;
      } else if (name.includes("current")) {
        relevantIndex = 5;
      }

      order = [];
      out
        .filter(
          (o) => o.outArray[relevantIndex] || o.outArray[relevantIndex] === 0
        )
        .sort((a, b) => b.outArray[relevantIndex] - a.outArray[relevantIndex])
        .map((o) => order.push(o.schoolId));
    } else {
      if (name.includes("previous")) {
        ratings = KetPetRatings.find(
          {
            academicYear: template.previousYear.get(),
            examPeriod: template.previousPeriod.get(),
          },
          {
            sort: { [dict[name]]: -1 },
            fields: { schoolId: 1, [dict[name]]: 1, _id: 0 },
          }
        ).fetch();
      } else {
        ratings = KetPetRatings.find(
          {
            academicYear: template.currentYear.get(),
            examPeriod: template.currentPeriod.get(),
          },
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

    let previousYear = template.previousYear.get();
    let previousPeriod = template.previousPeriod.get();
    let currentYear = template.currentYear.get();
    let currentPeriod = template.currentYear.get();

    var data = [];
    let grade = template.grade.get();

    if (grade === "7") {
      headers = [
        "Мектеп ID",
        "Мектеп аты",
        "Қатысушылар саны (" + previousYear + " " + previousPeriod + " тоқсан)",
        "Қатысушылар саны (" + currentYear + " " + currentPeriod + " тоқсан)",
        "Fail саны (" + previousYear + " " + previousPeriod + " тоқсан)",
        "Fail саны (" + currentYear + " " + currentPeriod + " тоқсан)",
        "Fail сан айырмашылығы",
        "Fail пайызы (" + previousYear + " " + previousPeriod + " тоқсан)",
        "Fail пайызы (" + currentYear + " " + currentPeriod + " тоқсан)",
        "Fail пайыз айырмашылығы",
        "A1 саны (" + previousYear + " " + previousPeriod + " тоқсан)",
        "A1 саны (" + currentYear + " " + currentPeriod + " тоқсан)",
        "A1 пайызы (" + previousYear + " " + previousPeriod + " тоқсан)",
        "A1 пайызы (" + currentYear + " " + currentPeriod + " тоқсан)",
        "A2 and above саны (" +
          previousYear +
          " " +
          previousPeriod +
          " тоқсан)",
        "A2 and above саны (" + currentYear + " " + currentPeriod + " тоқсан)",
        "A2 and above пайызы (" +
          previousYear +
          " " +
          previousPeriod +
          " тоқсан)",
        "A2 and above пайызы (" +
          currentYear +
          " " +
          currentPeriod +
          " тоқсан)",
      ];
    } else {
      headers = [
        "Мектеп ID",
        "Мектеп аты",
        "Қатысушылар саны (" + previousYear + " " + previousPeriod + " тоқсан)",
        "Қатысушылар саны (" + currentYear + " " + currentPeriod + " тоқсан)",
        "Fail саны (" + previousYear + " " + previousPeriod + " тоқсан)",
        "Fail саны (" + currentYear + " " + currentPeriod + " тоқсан)",
        "Fail сан айырмашылығы",
        "Fail пайызы (" + previousYear + " " + previousPeriod + " тоқсан)",
        "Fail пайызы (" + currentYear + " " + currentPeriod + " тоқсан)",
        "Fail пайыз айырмашылығы",
        "A2 саны (" + previousYear + " " + previousPeriod + " тоқсан)",
        "A2 саны (" + currentYear + " " + currentPeriod + " тоқсан)",
        "A2 пайызы (" + previousYear + " " + previousPeriod + " тоқсан)",
        "A2 пайызы (" + currentYear + " " + currentPeriod + " тоқсан)",
        "B1 and above саны (" +
          previousYear +
          " " +
          previousPeriod +
          " тоқсан)",
        "B1 and above саны (" + currentYear + " " + currentPeriod + " тоқсан)",
        "B1 and above пайызы (" +
          previousYear +
          " " +
          previousPeriod +
          " тоқсан)",
        "B1 and above пайызы (" +
          currentYear +
          " " +
          currentPeriod +
          " тоқсан)",
      ];
    }
    data.push(headers);
    let lines = out;

    lines.map((line) => {
      let schoolId = line.schoolId;
      let schoolName = Schools.findOne({ schoolId }).shortName;
      let outArray = line.outArray;
      let row = [schoolId, schoolName, ...outArray];
      data.push(row);
    });

    Meteor.call("download", data, (err, wb) => {
      if (err) throw err;

      let sName = "KET-PET Салыстыру.xlsx";
      XLSX.writeFile(wb, sName);
    });
  },
});

Template.ketPetCompareAdvanced.onRendered(function () {
  this.$('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});
