import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./btsKeysEdit_2021_2022.html";

Template.btsKeysEdit_2021_2022.onCreated(function () {
  let template = this;
  template.subscribe("btsKey", FlowRouter.getParam("id"));
});

Template.btsKeysEdit_2021_2022.helpers({
  keys() {
    return BtsAnswerKeys.findOne({ _id: FlowRouter.getParam("id") });
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

Template.btsKeysEdit_2021_2022.events({
  "click #save"(event, template) {
    event.preventDefault();
    let keys = BtsAnswerKeys.findOne({ _id: FlowRouter.getParam("id") });

    if (template.find("[name=mathematic]"))
      keys["mathematic"] = template.find("[name=mathematic]").value;
    if (template.find("[name=kazakh_lang_kaz]"))
      keys["kazakh_lang_kaz"] = template.find("[name=kazakh_lang_kaz]").value;
    if (template.find("[name=kazakh_lang_rus]"))
      keys["kazakh_lang_rus"] = template.find("[name=kazakh_lang_rus]").value;
    if (template.find("[name=kazakh_history]"))
      keys["kazakh_history"] = template.find("[name=kazakh_history]").value;
    if (template.find("[name=geography]"))
      keys["geography"] = template.find("[name=geography]").value;
    if (template.find("[name=chemistry]"))
      keys["chemistry"] = template.find("[name=chemistry]").value;
    if (template.find("[name=turkish_lang]"))
      keys["turkish_lang"] = template.find("[name=turkish_lang]").value;
    if (template.find("[name=russian_lang]"))
      keys["russian_lang"] = template.find("[name=russian_lang]").value;
    if (template.find("[name=physics]"))
      keys["physics"] = template.find("[name=physics]").value;
    if (template.find("[name=biology]"))
      keys["biology"] = template.find("[name=biology]").value;

    Meteor.call("BtsAnswerKeys.Update", keys._id, keys, function (err) {
      if (err) {
        alert(err.reason);
      } else {
        alert("Сақталды!");
      }
    });
    alert("Идет пересчет рейтинга школ");
    FlowRouter.redirect("/admin/bts/keys");
  },
});
