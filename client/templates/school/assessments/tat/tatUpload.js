import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./tatUpload.html";

Template.tatUpload.onCreated(function () {
  let template = this;
  template.results = new ReactiveVar([]);
  template.errors = new ReactiveVar(false);
  template.tatNo = new ReactiveVar("1");
  template.subscribe("subjects");
  template.subscribe("teachers");
  template.subscribe("tatSchoolKeys", academicYear.get());
});

Template.tatUpload.helpers({
  results() {
    return Template.instance().results.get();
  },
});

Template.tatUpload.events({
  "click #save"(event, template) {
    event.preventDefault();
    if (template.results.get().length > 0 && !template.errors.get()) {
      SUIBlock.block("Жүктелуде...");
      Meteor.call(
        "TatResults.Upload",
        academicYear.get(),
        template.tatNo.get(),
        template.results.get(),
        function (err) {
          if (err) {
            alert(err.reason);
            SUIBlock.unblock();
          } else {
            template.results.set([]);
            SUIBlock.unblock();
            alert("Сақталды");
            FlowRouter.redirect("/school/tat/results/" + template.tatNo.get());
          }
        }
      );
      return;
    }
    alert("Файл таңдалмады немесе қателер табылды");
  },
  "change #tatNo"(event, template) {
    template.tatNo.set(event.target.value);
  },
  "change #file"(event, template) {
    let tatNo = Template.instance().tatNo.get();

    function handleFiles(files) {
      // Check for the various File API support.
      if (window.FileReader) {
        // FileReader are supported.
        getAsText(files[0]);
      } else {
        alert("FileReader are not supported in this browser.");
      }
    }

    function getAsText(fileToRead) {
      var reader = new FileReader();
      // Read file into memory as UTF-8
      reader.readAsText(fileToRead);
      // Handle errors load
      reader.onload = loadHandler;
      reader.onerror = errorHandler;
    }

    function loadHandler(event) {
      var txt = event.target.result;
      processData(txt);
    }

    function processData(csv) {
      var txtlines = csv.split(/\r\n|\n/);
      var res = [];
      for (var i = 0; i < txtlines.length; i++) {
        if (txtlines[i].trim() != "") {
          let teacherObj = {
            teacherIin: txtlines[i].slice(0, 12),
            variant: txtlines[i].slice(12, 16),
            surname: txtlines[i].slice(16, 33),
            name: txtlines[i].slice(33, 43),
            keys: txtlines[i].slice(43),
            isValid: true,
          };

          let variant = TatAnswerKeys.findOne({
            variant: teacherObj.variant,
            academicYear: academicYear.get(),
            tatNo: tatNo,
          });
          if (!variant) {
            teacherObj.isValid = false;
            template.errors.set(true);
            alert(
              "Келесі мұғалімнің варианты дұрыс емес \n" +
                teacherObj.teacherIin +
                " " +
                teacherObj.name +
                " " +
                teacherObj.surname +
                " " +
                teacherObj.variant
            );
          }

          let teacher = Teachers.findOne({ iin: teacherObj.teacherIin });
          if (!teacher) {
            teacherObj.isValid = false;
            template.errors.set(true);
            alert(
              "Келесі мұғалімнің iin нөмірі дұрыс емес \n" +
                teacherObj.teacherIin +
                " " +
                teacherObj.name +
                " " +
                teacherObj.surname
            );
          }

          if (variant.subjectId != teacher.subjectId) {
            teacherObj.isValid = false;
            template.errors.set(true);
            alert(
              "Келесі мұғалімнің пәні дұрыс таңдалмаған: \n" +
                teacherObj.teacherIin +
                " " +
                teacherObj.name +
                " " +
                teacherObj.surname
            );
          }

          res.push(teacherObj);
        }
      }
      template.results.set(res);
    }

    function errorHandler(evt) {
      if (evt.target.error.name == "NotReadableError") {
        alert("Can not read file!");
      }
    }

    handleFiles(event.target.files);
  },
});
