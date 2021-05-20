import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./turkishA18KeysNew.html";
Template.turkishA18KeysNew.onCreated(function () {
  let template = this;
  template.no = new ReactiveVar("");
});

Template.turkishA18KeysNew.helpers({});

Template.turkishA18KeysNew.events({
  "change #no"(event, template) {
    template.no.set(event.target.value);
  },
  "click #save"(event, template) {
    event.preventDefault();
    let variant = template.find("[name=variant]").value;
    let listening = template.find("[name=listening]").value;
    let reading = template.find("[name=reading]").value;

    Meteor.call(
      "TurkishA18Keys.Insert",
      academicYear.get(),
      variant,
      template.no.get(),
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
    FlowRouter.redirect("/admin/turkishA18/keys");
  },
});
