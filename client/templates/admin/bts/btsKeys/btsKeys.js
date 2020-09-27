import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./btsKeys.html";
Template.btsKeys.onCreated(function() {
    let template = this;

    if (localStorage.getItem("btsNo")) {
        template.btsNo = new ReactiveVar(localStorage.getItem("btsNo"));
    } else {
        localStorage.setItem("btsNo", "1");
        template.btsNo = new ReactiveVar("1");
    }

    template.autorun(() => {
        template.subscribe("btsKeys", academicYear.get(), template.btsNo.get());
    });
});

Template.btsKeys.helpers({
    keys() {
        return BtsAnswerKeys.find({}, { sort: { day: 1, grade: 1 } });
    },
    isAdmin() {
        return Roles.userIsInRole(Meteor.userId(),['admin']) || Roles.userIsInRole(Meteor.userId(),['edlight'])
    },
});

Template.btsKeys.events({
    "change #btsNo"(event, template) {
        template.btsNo.set(event.target.value);
        localStorage.setItem("btsNo", event.target.value);
    },

    "click #delete"(event, template) {
        if (confirm("Жауап кілтін өшіргіңіз келеді ме?")) {
            Meteor.call("BtsAnswerKeys.Delete", this._id, function(err) {
                if (err) {
                    alert(err.reason);
                } else {
                    FlowRouter.redirect("/admin/bts/keys");
                }
            });
        }
    }
});
