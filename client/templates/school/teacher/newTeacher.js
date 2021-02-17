import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./newTeacher.html";

Template.newTeacher.onCreated(function () {
  let template = this;
  template.subscribe("subjects");
});

Template.newTeacher.helpers({
  subjects() {
    return Subjects.find({}, { sort: { subjectId: 1 } });
  },
});

Template.newTeacher.events({
  "click #save"(event, template) {
    event.preventDefault();

    let name = template.find("[name=name]").value.trim();
    let surname = template.find("[name=surname]").value.trim();
    let subjectId = template.find("[name=subjectId]").value;
    let iin = template.find("[name=iin]").value.trim();

    if (name && surname) {
      Meteor.call("Teacher.insert", {
        name: name,
        surname: surname,
        iin: iin,
        subjectId: subjectId,
      });
    }
    FlowRouter.redirect("/school/teachers");
  },
});
