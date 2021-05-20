import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./turkishA18Keys.html";
Template.turkishA18Keys.onCreated(function () {
  let template = this;
  template.no = new ReactiveVar("");
  template.autorun(() => {
    template.subscribe("turkishA18Keys", academicYear.get(), template.no.get());
  });
});

Template.turkishA18Keys.helpers({
  keys() {
    return TurkishA18Keys.find({}, { sort: { variant: 1 } });
  },
});

Template.turkishA18Keys.events({
  "change #no"(event, template) {
    template.no.set(event.target.value);
  },
  "click #delete"(event, template) {
    if (confirm("Жауап кілтін өшіргіңіз келеді ме?")) {
      Meteor.call("TurkishA18Keys.Delete", this._id, function (err) {
        if (err) {
          alert(err.reason);
        } else {
          FlowRouter.redirect("/admin/turkishA18/keys");
        }
      });
    }
  },
});
