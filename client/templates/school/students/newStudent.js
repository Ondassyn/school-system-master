import { Template } from "meteor/templating";
import { ReactiveVar } from "meteor/reactive-var";
import "./newStudent.html";
import XLSX from "xlsx";

Template.newStudent.onCreated(function () {
  let template = this;
  document.title = "Жаңа оқушылар жүктеу";
  template.subscribe("kboSubjects");
  template.results = new ReactiveVar([]);
  template.quarter = new ReactiveVar("1");
});

Template.newStudent.helpers({
  subjects() {
    return KboCourses.find({}, { sort: { subjectId: 1 } });
  },
  results() {
    return Template.instance().results.get();
  },
});

Template.newStudent.events({
  "click .btn"(event, template) {
    if (
      template.find("[name = dropdown-icon]").className ==
      "fa fa-caret-square-o-down"
    ) {
      template.find("[name = dropdown-icon]").className =
        "fa fa-caret-square-o-up";
    } else {
      template.find("[name = dropdown-icon]").className =
        "fa fa-caret-square-o-down";
    }
  },

  "click #save"(event, template) {
    event.preventDefault();
    var dictLang = {
      kaz: "Қазақ тобы",
      rus: "Орыс тобы",
    };

    let name = template.find("[name=name]").value;
    let surname = template.find("[name=surname]").value;
    let iin = template.find("[name=iin]").value;
    let grade = template.find("[name=grade]").value;
    let division = template.find("[name=division]").value;
    let languageGroup = dictLang[template.find("[name=languageGroup]").value];
    console.log(languageGroup);

    if (name && surname && grade && division && iin) {
      Meteor.call("Student.insert", {
        name: name,
        surname: surname,
        iin,
        grade: grade,
        division: division,
        languageGroup: languageGroup,
      });
      FlowRouter.redirect("/school/students");
    } else {
      if (!name) template.find("[name=name]").style.background = "Red";
      if (!surname) template.find("[name=surname]").style.background = "Red";
      if (!grade) template.find("[name=grade]").style.background = "Red";
      if (!division) template.find("[name=division]").style.background = "Red";
      if (!iin) template.find("[name=iin]").style.background = "Red";

      bootbox.confirm(
        "Оқушының барлық ақпаратын толық толтырыңыз",
        function (result) {
          template.find("[name=name]").style.background = "White";
          template.find("[name=surname]").style.background = "White";
          template.find("[name=grade]").style.background = "White";
          template.find("[name=division]").style.background = "White";
          template.find("[name=iin]").style.background = "White";
        }
      );
    }
  },
  "click .collapsible"(event, template) {
    event.preventDefault();
    var content = template.find("[name = divContent]");
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  },
  "click #uploadSave"(event, template) {
    event.preventDefault();
    if (template.results.get().length > 0) {
      SUIBlock.block("Жүктелуде...");
      Meteor.call("Student.Upload", template.results.get(), function (err) {
        if (err) {
          alert(err.reason);
          SUIBlock.unblock();
        } else {
          template.results.set([]);
          SUIBlock.unblock();
          bootbox.alert("Сақталды", function (result) {
            FlowRouter.redirect("/school/students");
          });
        }
      });
      return;
    }
    alert("Файл таңдалмады немесе қателер табылды");
  },
  "change #uploadS"(event, template) {
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
  "click #download"() {
    const html = document.getElementById("out").innerHTML;

    var data = [];
    var headers = [
      "grade",
      "division",
      "surname",
      "name",
      "iin",
      "languageGroup",
    ];

    listGrade = ["7", "8"];
    listDivision = ["A", "B"];
    listSurname = ["Абаев", "Алиева"];
    listName = ["Абай", "Алия"];
    let listIin = ["000000000001", "000000000002"];
    listLang = ["Қазақ тобы", "Орыс тобы"];

    data.push(headers);
    count = 0;
    listDivision.forEach((item) => {
      let gradeItem = listGrade[count];
      let divItem = listDivision[count];
      let surnameItem = listSurname[count];
      let nameItem = listName[count];
      let langItem = listLang[count];
      let iinItem = listIin[count];
      let content = [
        gradeItem,
        divItem,
        surnameItem,
        nameItem,
        iinItem,
        langItem,
      ];
      data.push(content);

      count++;
    });

    /*
        let subjects = KboCourses.find({},{sort:{subjectId:1}}).fetch();
        count = 0;
        subjects.forEach(item =>{
          let divItem = listDivision[count]
          let langItem = listLang[count]
          let content = [ '', '','', divItem,item.name,item.name,langItem];
          data.push(content);

          count++;
        });

        console.log(data);
        */

    // var tempContent = ['Vasya', 'Pupkin', '7', 'C', 'Info','Algebra','kaz']
    // var tempContent1 = ['Vasya1', 'Pupkin1', '8', 'A', 'Info1','Geomatrya','rus']
    // var tempContent2 = ['Vasya2', 'Pupkin2', '9', 'B', 'Info2','History','kaz']
    // data.push(tempContent);
    // data.push(tempContent1);
    // data.push(tempContent2);

    Meteor.call("download", data, (err, wb) => {
      if (err) throw err;

      let sName = "news_student_list_template.xlsx";
      XLSX.writeFile(wb, sName);
    });
  },
  "change #select"(event, template) {
    template.quarter.set(template.find("[name=quarter]").value);

    let quarter = FlowRouter.getParam("_id");
  },
});
