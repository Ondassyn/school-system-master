import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./turkishA1Keys.html";
Template.turkishA1Keys.onCreated(function () {
  let template = this;
  template.no = new ReactiveVar("");
  template.autorun(() => {
    template.subscribe("turkishA1Keys", academicYear.get(), template.no.get());
  });
});

Template.turkishA1Keys.helpers({
  keys() {
    return TurkishA1Keys.find({}, { sort: { variant: 1 } });
  },
});

Template.turkishA1Keys.events({
  "change #no"(event, template) {
    template.no.set(event.target.value);
  },
  "click #delete"(event, template) {
    if (confirm("Жауап кілтін өшіргіңіз келеді ме?")) {
      Meteor.call("TurkishA1Keys.Delete", this._id, function (err) {
        if (err) {
          alert(err.reason);
        } else {
          FlowRouter.redirect("/admin/turkishA1/keys");
        }
      });
    }
  },
});
