import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./turkishA1Upload.html";
import { ReactiveDict } from "meteor/reactive-dict";
import XLSX from "xlsx";

Template.turkishA1Upload.onCreated(function () {
  let template = this;
  document.title = "Түрік тілі A1 7 сынып жүктеу";
  template.errors = new ReactiveVar(false);
  template.results = new ReactiveVar([]);
  template.isXlsx = new ReactiveVar(false);
  template.no = new ReactiveVar("");
  template.subscribe("schools");
  template.subscribe("gradeStudents", "7");
  template.autorun(() => {
    template.subscribe("turkishA1Keys", academicYear.get(), template.no.get());
    template.subscribe(
      "turkishA1SchoolResults",
      academicYear.get(),
      template.no.get()
    );
  });
});

Template.turkishA1Upload.helpers({
  results() {
    return Template.instance().results.get();
  },
  isXlsx() {
    return Template.instance().isXlsx.get();
  },
});

Template.turkishA1Upload.events({
  "change #no"(event, template) {
    template.no.set(event.target.value);
  },
  "click #save_txt"(event, template) {
    event.preventDefault();

    if (template.results.get().length > 0) {
      SUIBlock.block("Жүктелуде...");
      Meteor.call(
        "TurkishA1Results.UploadTxt",
        academicYear.get(),
        template.no.get(),
        template.results.get(),
        function (err) {
          if (err) {
            alert(err.reason);
            SUIBlock.unblock();
          } else {
            template.results.set([]);
            SUIBlock.unblock();
            alert("Сақталды");
            FlowRouter.redirect("/school/turkishA1/results");
          }
        }
      );
      template.results.set([]);
      return;
    }
    alert("Файл таңдалмады немесе қателер табылды");
  },
  "click #save_xlsx"(event, template) {
    event.preventDefault();

    if (template.results.get().length > 0) {
      SUIBlock.block("Жүктелуде...");

      Meteor.call(
        "TurkishA1Results.UploadXlsx",
        academicYear.get(),
        template.no.get(),
        template.results.get(),
        function (err) {
          if (err) {
            bootbox.alert(err.reason);
            SUIBlock.unblock();
          } else {
            template.results.set([]);
            SUIBlock.unblock();
            bootbox.alert("Сақталды");

            FlowRouter.redirect("/school/turkishA1/results");
          }
        }
      );
      template.results.set([]);
      return;
    }

    alert("Файл таңдалмады немесе қателер табылды");
  },

  "click #download_xlsx"() {
    const html = document.getElementById("out").innerHTML;

    let data = [];

    let headers = [
      "studentId",
      "grade",
      "studentSurname",
      "studentName",
      "Dinleme",
      "Okuma",
      "Yazma",
      "Konusma",
    ];

    let school = Schools.findOne({ userId: Meteor.userId() });

    data.push(headers);
    let students = Students.find(
      { schoolId: school.schoolId },
      { sort: { grade: 1, division: 1 } }
    ).fetch();

    students.forEach((student) => {
      let result = TurkishA1Results.findOne({ studentId: student.studentId });
      let content = [
        student.studentId,
        student.grade + student.division,
        student.surname,
        student.name,
      ];
      if (result) {
        if (result.listening_preliminary || result.listening_preliminary === 0)
          content.push(result.listening_preliminary);
        else content.push("");
      }
      if (result) {
        if (result.reading_preliminary || result.reading_preliminary === 0)
          content.push(result.reading_preliminary);
      }

      data.push(content);
    });

    Meteor.call("download", data, (err, wb) => {
      if (err) throw err;

      let sName = "TurkishA1 " + school.secondaryName + " example.xlsx";
      XLSX.writeFile(wb, sName);
    });
  },

  "change #xlsx_upload"(event, template) {
    if (!template.no.get()) {
      alert("Парақты жаңартыңыз және емтихан нөмірін таңдаңыз");
      return;
    }

    template.isXlsx.set(true);
    const file = event.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      const name = file.name;

      Meteor.call("upload", data, name, function (err, wb) {
        if (err) alert(err);
        else {
          res = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
            header: 0,
          });

          template.results.set(res);
        }
      });
    };
    reader.readAsBinaryString(file);
  },
  "change #txt_upload"(event, template) {
    template.isXlsx.set(false);

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
        if (txtlines[i] != "") {
          let studObj = {
            studentId: txtlines[i].slice(3, 8),
            variant: txtlines[i].slice(8, 12),
            name: txtlines[i].slice(12, 29),
            surname: txtlines[i].slice(29, 39),
            keys: txtlines[i].slice(39),
            isValid: true,
          };

          let variant = TurkishA1Keys.findOne({
            variant: studObj.variant,
            academicYear: academicYear.get(),
            no: template.no.get(),
          });
          let student = Students.findOne({
            studentId: parseInt(studObj.studentId),
          });

          if (!student) {
            studObj.isValid = false;
            template.errors.set(true);
            alert(
              "Келесі окушының id нөмірі дұрыс емес \n" +
                studObj.studentId +
                " " +
                studObj.name +
                " " +
                studObj.surname
            );
          } else if (!variant) {
            studObj.isValid = false;
            template.errors.set(true);
            alert(
              "Окушының варианты дұрыс емес немесе емтихан нөмірін таңдауыңыз керек \n" +
                studObj.studentId +
                " " +
                studObj.name +
                " " +
                studObj.surname
            );
          } else if (!template.no.get()) {
            studObj.isValid = false;
            template.errors.set(true);
            alert("Емтихан нөмірін таңдауыңыз керек");
          }
          res.push(studObj);
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

Template.turkishA1Upload.onRendered(function () {
  this.$('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
});
