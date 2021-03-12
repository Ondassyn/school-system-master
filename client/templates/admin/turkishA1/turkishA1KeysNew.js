import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./turkishA1KeysNew.html";
Template.turkishA1KeysNew.onCreated(function () {
  let template = this;
});

Template.turkishA1KeysNew.helpers({});

Template.turkishA1KeysNew.events({
  "click #save"(event, template) {
    event.preventDefault();
    let variant = template.find("[name=variant]").value;
    let listening = template.find("[name=listening]").value;
    let reading = template.find("[name=listening]").value;

    Meteor.call(
      "TurkishA1Keys.Insert",
      academicYear.get(),
      variant,
      listening,
      reading,
      function (err) {
        if (err) {
          alert(err.reason);
        } else {
          alert("Сақталды!");
        }
      }
    );
    FlowRouter.redirect("/admin/turkishA1/keys");
  },
});
