import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./btsLevelsEdit_2021_2022.html";

Template.btsLevelsEdit_2021_2022.onCreated(function () {
  let template = this;
  template.subscribe("btsLevel", FlowRouter.getParam("id"));
});

Template.btsLevelsEdit_2021_2022.helpers({
  levels() {
    return BtsLevels.findOne({ _id: FlowRouter.getParam("id") });
  },

  day1(day) {
    return day == "1";
  },
  day2(day) {
    return day == "2";
  },
  grade7(grade) {
    return grade == "7";
  },
  grade8(grade) {
    return grade == "8";
  },
  grade9(grade) {
    return grade == "9";
  },
  grade10(grade) {
    return grade == "10";
  },
  btsNo1_or_2_or_3(btsNo) {
    return btsNo == "1" || btsNo == "2" || btsNo == "3";
  },
  btsNo3(btsNo) {
    return btsNo == "3";
  },
});

Template.btsLevelsEdit_2021_2022.events({
  "click #save"(event, template) {
    event.preventDefault();
    let levels = BtsLevels.findOne({ _id: FlowRouter.getParam("id") });

    if (template.find("[name=mathematic]"))
      levels["mathematic"] = template.find("[name=mathematic]").value;
    if (template.find("[name=kazakh_lang_kaz]"))
      levels["kazakh_lang_kaz"] = template.find("[name=kazakh_lang_kaz]").value;
    if (template.find("[name=kazakh_lang_rus]"))
      levels["kazakh_lang_rus"] = template.find("[name=kazakh_lang_rus]").value;
    if (template.find("[name=kazakh_history]"))
      levels["kazakh_history"] = template.find("[name=kazakh_history]").value;
    if (template.find("[name=geography]"))
      levels["geography"] = template.find("[name=geography]").value;
    if (template.find("[name=chemistry]"))
      levels["chemistry"] = template.find("[name=chemistry]").value;
    if (template.find("[name=turkish_lang]"))
      levels["turkish_lang"] = template.find("[name=turkish_lang]").value;
    if (template.find("[name=russian_lang]"))
      levels["russian_lang"] = template.find("[name=russian_lang]").value;
    if (template.find("[name=physics]"))
      levels["physics"] = template.find("[name=physics]").value;
    if (template.find("[name=biology]"))
      levels["biology"] = template.find("[name=biology]").value;

    Meteor.call("BtsLevels.Update", levels._id, levels, function (err) {
      if (err) {
        alert(err.reason);
      } else {
        alert("Сақталды!");
      }
    });
    alert("Идет пересчет рейтинга школ");
    FlowRouter.redirect("/admin/bts/levels");
  },
});
