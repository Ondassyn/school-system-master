import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./btsLevels.html";
Template.btsLevels.onCreated(function() {
    let template = this;

    if (localStorage.getItem("btsNo")) {
        template.btsNo = new ReactiveVar(localStorage.getItem("btsNo"));
    } else {
        localStorage.setItem("btsNo", "1");
        template.btsNo = new ReactiveVar("1");
    }

    template.autorun(() => {
        template.subscribe("btsLevels", academicYear.get(), template.btsNo.get());
    });
});

Template.btsLevels.helpers({
    levels() {
        return BtsLevels.find({}, { sort: { day: 1, grade: 1 } });
    }
});

Template.btsLevels.events({
    "change #btsNo"(event, template) {
        template.btsNo.set(event.target.value);
        localStorage.setItem("btsNo", event.target.value);
    },
    "click #delete"(event, template) {
        if (confirm("Категорияны өшіргіңіз келеді ме?")) {
            Meteor.call("BtsLevels.Delete", this._id, function(err) {
                if (err) {
                    alert(err.reason);
                } else {
                    FlowRouter.redirect("/admin/bts/levels");
                }
            });
        }
    }
});
