import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./btsLevelsNew_2021_2022.html";
Template.btsLevelsNew_2021_2022.onCreated(function () {
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

Template.btsLevelsNew_2021_2022.helpers({
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

Template.btsLevelsNew_2021_2022.events({
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
      let answerLevels = {
        academicYear: academicYear.get(),
        grade: template.grade.get(),
        day: template.day.get(),
        quarter: template.btsNo.get(),
        variant: variantInput.value,
      };

      let gradeNo = template.grade.get();
      let dayNo = template.day.get();
      let btsNo = template.btsNo.get();

      if (gradeNo == "7") {
        if (dayNo == "1") {
          answerLevels["kazakh_history"] = template.find(
            "[name=kazakh_history]"
          ).value;
          answerLevels["kazakh_lang_kaz"] = template.find(
            "[name=kazakh_lang_kaz]"
          ).value;
          answerLevels["kazakh_lang_rus"] = template.find(
            "[name=kazakh_lang_rus]"
          ).value;
          answerLevels["geography"] = template.find("[name=geography]").value;
        } else if (dayNo === "2") {
          answerLevels["mathematic"] = template.find("[name=mathematic]").value;
          answerLevels["russian_lang"] = template.find(
            "[name=russian_lang]"
          ).value;
        }
      } else if (gradeNo == "8") {
        if (dayNo == "1") {
          answerLevels["mathematic"] = template.find("[name=mathematic]").value;
          answerLevels["chemistry"] = template.find("[name=chemistry]").value;
          answerLevels["geography"] = template.find("[name=geography]").value;
        } else if (dayNo == "2") {
          answerLevels["physics"] = template.find("[name=physics]").value;
          answerLevels["biology"] = template.find("[name=biology]").value;
          answerLevels["kazakh_lang_kaz"] = template.find(
            "[name=kazakh_lang_kaz]"
          ).value;
          answerLevels["kazakh_lang_rus"] = template.find(
            "[name=kazakh_lang_rus]"
          ).value;
        }
      } else if (gradeNo == "9") {
        if (dayNo == "1") {
          answerLevels["mathematic"] = template.find("[name=mathematic]").value;
          answerLevels["geography"] = template.find("[name=geography]").value;
          answerLevels["chemistry"] = template.find("[name=chemistry]").value;
        } else if (dayNo == "2") {
          answerLevels["physics"] = template.find("[name=physics]").value;
          answerLevels["turkish_lang"] = template.find(
            "[name=turkish_lang]"
          ).value;
          answerLevels["biology"] = template.find("[name=biology]").value;
        }
      } else if (gradeNo == "10") {
        if (dayNo == "1") {
          answerLevels["mathematic"] = template.find("[name=mathematic]").value;

          answerLevels["kazakh_history"] = template.find(
            "[name=kazakh_history]"
          ).value;
          answerLevels["turkish_lang"] = template.find(
            "[name=turkish_lang]"
          ).value;
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
