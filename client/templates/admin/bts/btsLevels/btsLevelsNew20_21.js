import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./btsLevelsNew20_21.html";
Template.btsLevelsNew20_21.onCreated(function () {
  let template = this;

  if (localStorage.getItem("btsNo")) {
    template.btsNo = new ReactiveVar(localStorage.getItem("btsNo"));
  } else {
    localStorage.setItem("btsNo", "1");
    template.btsNo = new ReactiveVar("1");
  }

  if (localStorage.getItem("day")) {
    template.day = new ReactiveVar(localStorage.getItem("day"));
  } else {
    localStorage.setItem("day", "1");
    template.day = new ReactiveVar("1");
  }

  if (localStorage.getItem("grade")) {
    template.grade = new ReactiveVar(localStorage.getItem("grade"));
  } else {
    localStorage.setItem("grade", "7");
    template.grade = new ReactiveVar("7");
  }
});

Template.btsLevelsNew20_21.helpers({
  day1() {
    return "1" == Template.instance().day.get();
  },
  day2() {
    return "2" == Template.instance().day.get();
  },

  btsNo1_or_2_or_3() {
    return (
      "2" == Template.instance().btsNo.get() ||
      "1" == Template.instance().btsNo.get() ||
      "3" == Template.instance().btsNo.get()
    );
  },

  grade7() {
    return "7" == Template.instance().grade.get();
  },
  grade8() {
    return "8" == Template.instance().grade.get();
  },
  grade9() {
    return "9" == Template.instance().grade.get();
  },
  grade10() {
    return "10" == Template.instance().grade.get();
  },
  selected(id, val) {
    let obj = {
      btsNo: Template.instance().btsNo.get(),
      day: Template.instance().day.get(),
      grade: Template.instance().grade.get(),
    };
    let v = obj[id] === val;
    return v ? "selected" : "";
  },
});

Template.btsLevelsNew20_21.events({
  "change #btsNo"(event, template) {
    template.btsNo.set(event.target.value);
    localStorage.setItem("btsNo", event.target.value);
  },
  "change #day"(event, template) {
    template.day.set(event.target.value);
    localStorage.setItem("day", event.target.value);
  },
  "change #grade"(event, template) {
    template.grade.set(event.target.value);
    localStorage.setItem("grade", event.target.value);
  },
  "click #save"(event, template) {
    event.preventDefault();

    let variantInput = template.find("[name=variant]");

    if (!variantInput.value) {
      bootbox.alert("Сақтау жасалмады");
    } else {
      let gradeNo = template.grade.get();
      let dayNo = template.day.get();
      let btsNo = template.btsNo.get();

      let answerLevels = {
        academicYear: academicYear.get(),
        grade: template.grade.get(),
        day: template.day.get(),
        quarter: template.btsNo.get(),
        variant: variantInput.value,
      };

      if (gradeNo == "7") {
        if (dayNo == "1" && (btsNo == "1" || btsNo == "2" || btsNo == "3")) {
          answerLevels["mathematic"] = template.find("[name=mathematic]").value;
          answerLevels["kazakh_lang_kaz"] = template.find(
            "[name=kazakh_lang_kaz]"
          ).value;
          answerLevels["kazakh_lang_rus"] = template.find(
            "[name=kazakh_lang_rus]"
          ).value;
          answerLevels["geography"] = template.find("[name=geography]").value;

          // answerLevels["mathematicBonus"] = template.find(
          //   "[name=mathematicBonus]"
          // ).value;
          // answerLevels["kazakh_lang_kazBonus"] = template.find(
          //   "[name=kazakh_lang_kazBonus]"
          // ).value;
          // answerLevels["kazakh_lang_rusBonus"] = template.find(
          //   "[name=kazakh_lang_rusBonus]"
          // ).value;
          // answerLevels["geographyBonus"] = template.find(
          //   "[name=geographyBonus]"
          // ).value;

          // answerLevels["mathematicBonusTopic1"] = template.find(
          //   "[name=mathematicBonusTopic1]"
          // ).value;
          // answerLevels["kazakh_lang_kazBonusTopic1"] = template.find(
          //   "[name=kazakh_lang_kazBonusTopic1]"
          // ).value;
          // answerLevels["kazakh_lang_rusBonusTopic1"] = template.find(
          //   "[name=kazakh_lang_rusBonusTopic1]"
          // ).value;
          // answerLevels["geographyBonusTopic1"] = template.find(
          //   "[name=geographyBonusTopic1]"
          // ).value;

          // answerLevels["mathematicBonusTopic2"] = template.find(
          //   "[name=mathematicBonusTopic2]"
          // ).value;
          // answerLevels["kazakh_lang_kazBonusTopic2"] = template.find(
          //   "[name=kazakh_lang_kazBonusTopic2]"
          // ).value;
          // answerLevels["kazakh_lang_rusBonusTopic2"] = template.find(
          //   "[name=kazakh_lang_rusBonusTopic2]"
          // ).value;
          // answerLevels["geographyBonusTopic2"] = template.find(
          //   "[name=geographyBonusTopic2]"
          // ).value;
          // answerLevels["russian_lang"] = template.find("[name=russian_lang]").value;
        } else if (btsNo == "3") {
          answerLevels["mathematic"] = template.find("[name=mathematic]").value;
          answerLevels["physics"] = template.find("[name=physics]").value;
          answerLevels["chemistry"] = template.find("[name=chemistry]").value;
          answerLevels["biology"] = template.find("[name=biology]").value;
        }
      } else if (gradeNo == "8") {
        if (dayNo == "1") {
          answerLevels["mathematic"] = template.find("[name=mathematic]").value;
          answerLevels["physics"] = template.find("[name=physics]").value;
          answerLevels["biology"] = template.find("[name=biology]").value;

          // answerLevels["mathematicBonus"] = template.find(
          //   "[name=mathematicBonus]"
          // ).value;
          // answerLevels["physicsBonus"] = template.find(
          //   "[name=physicsBonus]"
          // ).value;
          // answerLevels["biologyBonus"] = template.find(
          //   "[name=biologyBonus]"
          // ).value;

          // answerLevels["mathematicBonusTopic1"] = template.find(
          //   "[name=mathematicBonusTopic1]"
          // ).value;
          // answerLevels["physicsBonusTopic1"] = template.find(
          //   "[name=physicsBonusTopic1]"
          // ).value;
          // answerLevels["biologyBonusTopic1"] = template.find(
          //   "[name=biologyBonusTopic1]"
          // ).value;

          // answerLevels["mathematicBonusTopic2"] = template.find(
          //   "[name=mathematicBonusTopic2]"
          // ).value;
          // answerLevels["physicsBonusTopic2"] = template.find(
          //   "[name=physicsBonusTopic2]"
          // ).value;
          // answerLevels["biologyBonusTopic2"] = template.find(
          //   "[name=biologyBonusTopic2]"
          // ).value;
        } else if (dayNo == "2") {
          answerLevels["geography"] = template.find("[name=geography]").value;
          answerLevels["physics"] = template.find("[name=physics]").value;
          answerLevels["chemistry"] = template.find("[name=chemistry]").value;
          answerLevels["biology"] = template.find("[name=biology]").value;
        }
      } else if (gradeNo == "9") {
        if (dayNo == "1") {
          answerLevels["mathematic"] = template.find("[name=mathematic]").value;
          answerLevels["physics"] = template.find("[name=physics]").value;
          answerLevels["chemistry"] = template.find("[name=chemistry]").value;

          // answerLevels["mathematicBonus"] = template.find(
          //   "[name=mathematicBonus]"
          // ).value;
          // answerLevels["physicsBonus"] = template.find(
          //   "[name=physicsBonus]"
          // ).value;
          // answerLevels["chemistryBonus"] = template.find(
          //   "[name=chemistryBonus]"
          // ).value;

          // answerLevels["mathematicBonusTopic1"] = template.find(
          //   "[name=mathematicBonusTopic1]"
          // ).value;
          // answerLevels["physicsBonusTopic1"] = template.find(
          //   "[name=physicsBonusTopic1]"
          // ).value;
          // answerLevels["chemistryBonusTopic1"] = template.find(
          //   "[name=chemistryBonusTopic1]"
          // ).value;

          // answerLevels["mathematicBonusTopic2"] = template.find(
          //   "[name=mathematicBonusTopic2]"
          // ).value;
          // answerLevels["physicsBonusTopic2"] = template.find(
          //   "[name=physicsBonusTopic2]"
          // ).value;
          // answerLevels["chemistryBonusTopic2"] = template.find(
          //   "[name=chemistryBonusTopic2]"
          // ).value;
        } else if (dayNo == "2") {
          answerLevels["geography"] = template.find("[name=geography]").value;
          answerLevels["physics"] = template.find("[name=physics]").value;
          answerLevels["chemistry"] = template.find("[name=chemistry]").value;
          answerLevels["biology"] = template.find("[name=biology]").value;
        }
      } else if (gradeNo == "10") {
        if (dayNo == "1") {
          answerLevels["mathematic"] = template.find("[name=mathematic]").value;

          answerLevels["geography"] = template.find("[name=geography]").value;
          answerLevels["physics"] = template.find("[name=physics]").value;
          answerLevels["chemistry"] = template.find("[name=chemistry]").value;
          answerLevels["biology"] = template.find("[name=biology]").value;
          answerLevels["world_history"] = template.find(
            "[name=world_history]"
          ).value;

          // answerLevels["mathematicBonus"] = template.find(
          //   "[name=mathematicBonus]"
          // ).value;

          // answerLevels["geographyBonus"] = template.find(
          //   "[name=geographyBonus]"
          // ).value;
          // answerLevels["physicsBonus"] = template.find(
          //   "[name=physicsBonus]"
          // ).value;
          // answerLevels["chemistryBonus"] = template.find(
          //   "[name=chemistryBonus]"
          // ).value;
          // answerLevels["biologyBonus"] = template.find(
          //   "[name=biologyBonus]"
          // ).value;
          // answerLevels["world_historyBonus"] = template.find(
          //   "[name=world_historyBonus]"
          // ).value;

          // answerLevels["mathematicBonusTopic1"] = template.find(
          //   "[name=mathematicBonusTopic1]"
          // ).value;

          // answerLevels["geographyBonusTopic1"] = template.find(
          //   "[name=geographyBonusTopic1]"
          // ).value;
          // answerLevels["physicsBonusTopic1"] = template.find(
          //   "[name=physicsBonusTopic1]"
          // ).value;
          // answerLevels["chemistryBonusTopic1"] = template.find(
          //   "[name=chemistryBonusTopic1]"
          // ).value;
          // answerLevels["biologyBonusTopic1"] = template.find(
          //   "[name=biologyBonusTopic1]"
          // ).value;
          // answerLevels["world_historyBonusTopic1"] = template.find(
          //   "[name=world_historyBonusTopic1]"
          // ).value;

          // answerLevels["mathematicBonusTopic2"] = template.find(
          //   "[name=mathematicBonusTopic2]"
          // ).value;

          // answerLevels["geographyBonusTopic2"] = template.find(
          //   "[name=geographyBonusTopic2]"
          // ).value;
          // answerLevels["physicsBonusTopic2"] = template.find(
          //   "[name=physicsBonusTopic2]"
          // ).value;
          // answerLevels["chemistryBonusTopic2"] = template.find(
          //   "[name=chemistryBonusTopic2]"
          // ).value;
          // answerLevels["biologyBonusTopic2"] = template.find(
          //   "[name=biologyBonusTopic2]"
          // ).value;
          // answerLevels["world_historyBonusTopic2"] = template.find(
          //   "[name=world_historyBonusTopic2]"
          // ).value;
        }
      }

      Meteor.call("BtsLevels.Insert", answerLevels, function (err) {
        if (err) {
          alert(err.reason);
        } else {
          alert("Сақталды!");
        }
      });
      FlowRouter.redirect("/admin/bts/levels");
    }
  },
});
