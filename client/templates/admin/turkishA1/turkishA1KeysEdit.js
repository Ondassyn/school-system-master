import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./turkishA1KeysEdit.html";
Template.turkishA1KeysEdit.onCreated(function () {
  let template = this;
  template.no = new ReactiveVar("");
  template.subscribe("turkishA1Keys", academicYear.get());
});

Template.turkishA1KeysEdit.helpers({
  keys() {
    return TurkishA1Keys.findOne({ _id: FlowRouter.getParam("id") });
  },
});

Template.turkishA1KeysEdit.events({
  "change #no"(event, template) {
    template.no.set(event.target.value);
  },
  "click #save"(event, template) {
    event.preventDefault();
    let keys = TurkishA1Keys.findOne({ _id: FlowRouter.getParam("id") });
    let updatedKeys = {
      listening: template.find("[name=listening]").value,
      reading: template.find("[name=reading]").value,
    };
    if (template.no.get()) {
      updatedKeys["no"] = template.no.get();
    }

    Meteor.call("TurkishA1Keys.Update", keys._id, updatedKeys, function (err) {
      if (err) {
        alert(err.reason);
      } else {
        alert("Сақталды!");
      }
    });
    // alert("Идет пересчет рейтинга школ");
    FlowRouter.redirect("/admin/turkishA1/keys");
  },
});
