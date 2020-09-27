import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./turkishKeys.html";
Template.turkishKeys.onCreated(function() {
    let template = this;
    template.autorun(() => {
        template.subscribe("turkishKeys", academicYear.get());
    });
});

Template.turkishKeys.helpers({
    keys() {
        return TurkishAnswerKeys.find({}, { sort: { grade: 1 } });
    }
});

Template.turkishKeys.events({
    "click #delete"(event, template) {
        if (confirm("Жауап кілтін өшіргіңіз келеді ме?")) {
            Meteor.call("TurkishAnswerKeys.Delete", this._id, function(err) {
                if (err) {
                    alert(err.reason);
                } else {
                    FlowRouter.redirect("/admin/turkish/keys");
                }
            });
        }
    }
});
