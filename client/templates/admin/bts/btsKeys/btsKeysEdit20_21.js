import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./btsKeysEdit20_21.html";

Template.btsKeysEdit20_21.onCreated(function () {
  let template = this;
  template.subscribe("btsKey", FlowRouter.getParam("id"));
});

var mathematic_keys = [""];
var kazakh_lang_keys = [""];
var turkish_lang_keys = [""];
var russian_lang_keys = [""];

Template.btsKeysEdit20_21.helpers({
  keys() {
    return BtsAnswerKeys.findOne({ _id: FlowRouter.getParam("id") });
  },

  mathKeysStore() {
    console.log("mathKeysStore");
    var schoolStore = new Map();
    var btsStore = BtsAnswerKeys.find({
      _id: FlowRouter.getParam("id"),
    }).fetch();
    // console.log(btsStore);

    btsStore.forEach((bts) => {
      schoolStore.set("mathematic", bts.mathematic);
      schoolStore.set("kazakh_lang_kaz", bts.kazakh_lang_kaz);
      schoolStore.set("turkish_lang_rus", bts.turkish_lang_rus);
      //schoolStore.set("russian_lang", bts.russian_lang);
    });

    if (schoolStore.get("mathematic"))
      mathematic_keys = schoolStore.get("mathematic").split("");
    if (schoolStore.get("kazakh_lang_kaz"))
      kazakh_lang_keys_kaz = schoolStore.get("kazakh_lang_kaz").split("");
    if (schoolStore.get("kazakh_lang_rus"))
      kazakh_lang_keys_rus = schoolStore.get("kazakh_lang_rus").split("");
    if (schoolStore.get("turkish_lang"))
      turkish_lang_keys = schoolStore.get("turkish_lang").split("");
    if (schoolStore.get("russian_lang"))
      russian_lang_keys = schoolStore.get("russian_lang").split("");

    return mathematic_keys;
  },
  kazakhKeysStoreKaz() {
    return kazakh_lang_keys_kaz;
  },
  kazakhKeysStoreRus() {
    return kazakh_lang_keys_rus;
  },
  turkishKeysStore() {
    return turkish_lang_keys;
  },
  russianKeysStore() {
    return russian_lang_keys;
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

Template.btsKeysEdit20_21.events({
  "click #saveKeys"(event, template) {
    event.preventDefault();

    let keys = BtsAnswerKeys.findOne({ _id: FlowRouter.getParam("id") });
    // console.log(keys)
    let answerKeys = {};
    if (keys.grade == "7") {
      if (keys.day == "1") {
        if (keys.day == "1" && (keys.quarter == "1" || keys.quarter == "2")) {
          for (var i = 1; i <= mathematic_keys.length; i++) {
            if (i == 1) {
              answerKeys["mathematic"] = template.find(
                "[id=mathematic" + i + "]"
              ).value;
              answerKeys["kazakh_lang_kaz"] = template.find(
                "[id=kazakh_lang_kaz" + i + "]"
              ).value;
              answerKeys["kazakh_lang_rus"] = template.find(
                "[id=kazakh_lang_rus" + i + "]"
              ).value;
              answerKeys["turkish_lang"] = template.find(
                "[id=turkish_lang" + i + "]"
              ).value;
            } else {
              answerKeys["mathematic"] += template.find(
                "[id=mathematic" + i + "]"
              ).value;
              answerKeys["kazakh_lang_kaz"] += template.find(
                "[id=kazakh_lang_kaz" + i + "]"
              ).value;
              answerKeys["kazakh_lang_rus"] += template.find(
                "[id=kazakh_lang_rus" + i + "]"
              ).value;
              answerKeys["turkish_lang"] += template.find(
                "[id=turkish_lang" + i + "]"
              ).value;
              //answerKeys["russian_lang"] += template.find("[id=russian_lang"+i+"]").value
            }
          }

          console.log("answerKeys");
          console.log(answerKeys);
          // answerKeys["mathematic"] = template.find("[name=mathematic]").value;
          // answerKeys["kazakh_lang"] = template.find("[name=kazakh_lang]").value;
          // answerKeys["turkish_lang"] = template.find("[name=turkish_lang]").value;
          // answerKeys["russian_lang"] = template.find("[name=russian_lang]").value;
        }
      }
      Meteor.call("BtsAnswerKeys.Update", keys._id, answerKeys, function (err) {
        if (err) {
          alert(err.reason);
        } else {
          alert("Сақталды!");
        }
      });
      alert("Идет пересчет рейтинга школ");
      FlowRouter.redirect("/admin/bts/keys");
    }
  },

  "change #btsNo"(event, template) {
    template.btsNo.set(event.target.value);
    localStorage.setItem("btsNo", event.target.value);
  },
  "click #save"(event, template) {
    console.log("##");
    event.preventDefault();
    let keys = BtsAnswerKeys.findOne({ _id: FlowRouter.getParam("id") });
    // console.log(keys)
    let answerKeys = {};
    if (keys.grade == "7") {
      if (keys.day == "1") {
        if (
          keys.day == "1" &&
          (keys.quarter == "1" || keys.quarter == "2" || keys.quarter == "3")
        ) {
          answerKeys["mathematic"] = template.find("[name=mathematic]").value;
          answerKeys["kazakh_lang_kaz"] = template.find(
            "[name=kazakh_lang_kaz]"
          ).value;
          answerKeys["kazakh_lang_rus"] = template.find(
            "[name=kazakh_lang_rus]"
          ).value;
          answerKeys["turkish_lang"] = template.find(
            "[name=turkish_lang]"
          ).value;
        } else if (keys.quarter == "3") {
          answerKeys["mathematic"] = template.find("[name=mathematic]").value;
          answerKeys["physics"] = template.find("[name=physics]").value;
          answerKeys["chemistry"] = template.find("[name=chemistry]").value;
          answerKeys["biology"] = template.find("[name=biology]").value;
        }
      }
    } else if (keys.grade == "8") {
      if (keys.day == "1") {
        answerKeys["mathematic"] = template.find("[name=mathematic]").value;
        answerKeys["physics"] = template.find("[name=physics]").value;
        answerKeys["biology"] = template.find("[name=biology]").value;
      } else if (keys.day == "2") {
        answerKeys["geography"] = template.find("[name=geography]").value;
        answerKeys["physics"] = template.find("[name=physics]").value;
        answerKeys["chemistry"] = template.find("[name=chemistry]").value;
        answerKeys["biology"] = template.find("[name=biology]").value;
      }
    } else if (keys.grade == "8" || keys.grade == "9") {
      if (keys.day == "1") {
        answerKeys["mathematic"] = template.find("[name=mathematic]").value;
        answerKeys["physics"] = template.find("[name=physics]").value;
        answerKeys["chemistry"] = template.find("[name=chemistry]").value;
      } else if (keys.day == "2") {
        answerKeys["geography"] = template.find("[name=geography]").value;
        answerKeys["physics"] = template.find("[name=physics]").value;
        answerKeys["chemistry"] = template.find("[name=chemistry]").value;
        answerKeys["biology"] = template.find("[name=biology]").value;
      }
    } else if (keys.grade == "10") {
      if (keys.day == "1") {
        answerKeys["mathematic"] = template.find("[name=mathematic]").value;

        answerKeys["geography"] = template.find("[name=geography]").value;
        answerKeys["physics"] = template.find("[name=physics]").value;
        answerKeys["chemistry"] = template.find("[name=chemistry]").value;
        answerKeys["biology"] = template.find("[name=biology]").value;
        answerKeys["world_history"] = template.find(
          "[name=world_history]"
        ).value;
      }
    }

    Meteor.call("BtsAnswerKeys.Update", keys._id, answerKeys, function (err) {
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
