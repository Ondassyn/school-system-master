import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./teacherDetail.html";

Template.teacherDetail.onCreated(function () {
  let template = this;
  template.subscribe("subjects");
  template.subscribe("teacher", FlowRouter.getParam("_id"));
});

Template.teacherDetail.helpers({
  subjects() {
    return Subjects.find({}, { sort: { subjectId: 1 } });
  },
  teacher() {
    return Teachers.findOne({ _id: FlowRouter.getParam("_id") });
  },
  selector(identificator, value) {
    let teacher = Teachers.findOne({ _id: FlowRouter.getParam("_id") });
    if (teacher) {
      return teacher[identificator] == value ? "selected" : "";
    }
  },
});

Template.teacherDetail.events({
  "click #save"(event, template) {
    event.preventDefault();

    let teacher_id = FlowRouter.getParam("_id");

    let name = template.find("[name=name]").value.trim();
    let surname = template.find("[name=surname]").value.trim();
    let subjectId = template.find("[name=subjectId]").value;
    let academicDegree = template.find("[name=academicDegree]").value;
    let workExperience = template.find("[name=workExperience]").value;
    let position = template.find("[name=position]").value;
    let ielts = template.find("[name=ielts]").value;
    let category = template.find("[name=category]").value;
    let iin = template.find("[name=iin]").value.trim();

    let teacherObject = {
      name: name,
      surname: surname,
      iin: iin,
      subjectId: subjectId,
      academicDegree: academicDegree,
      workExperience: workExperience,
      ielts: ielts,
      position: position,
      category: category,
    };

    if (name && surname && subjectId && position) {
      Meteor.call("Teacher.update", teacherObject, teacher_id, function (err) {
        if (err) {
          alert(err.reason);
        } else {
          FlowRouter.redirect("/school/teachers");
        }
      });
    }
  },
  "click #transfer"(event, template) {
    event.preventDefault();

    if (confirm("Мұғалімді трансфер тізіміне аударғыңыз келеді ме?")) {
      Meteor.call(
        "Teacher.transfer",
        FlowRouter.getParam("_id"),
        function (err) {
          if (err) {
            alert(err.reason);
          } else {
            FlowRouter.redirect("/school/teachers");
          }
        }
      );
    }
  },
});
