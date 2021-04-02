import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./turkishA18KeysEdit.html";
Template.turkishA18KeysEdit.onCreated(function () {
  let template = this;
  template.subscribe("turkishA18Keys", academicYear.get());
});

Template.turkishA18KeysEdit.helpers({
  keys() {
    return TurkishA18Keys.findOne({ _id: FlowRouter.getParam("id") });
  },
});

Template.turkishA18KeysEdit.events({
  "click #save"(event, template) {
    event.preventDefault();
    let keys = TurkishA18Keys.findOne({ _id: FlowRouter.getParam("id") });
    let updatedKeys = {
      listening: template.find("[name=listening]").value,
      reading: template.find("[name=reading]").value,
    };

    Meteor.call("TurkishA18Keys.Update", keys._id, updatedKeys, function (err) {
      if (err) {
        alert(err.reason);
      } else {
        alert("Сақталды!");
      }
    });
    // alert("Идет пересчет рейтинга школ");
    FlowRouter.redirect("/admin/turkishA18/keys");
  },
});
