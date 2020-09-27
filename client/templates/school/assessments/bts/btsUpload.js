import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsUpload.html';

Template.btsUpload.onCreated(function() {
    let template = this
    template.results = new ReactiveVar([])
    template.errors = new ReactiveVar(false)
    template.btsNo = new ReactiveVar("0")
    template.day = new ReactiveVar("0")
    template.subscribe("students")
    template.subscribe("btsSchoolKeys",academicYear.get())

})

Template.btsUpload.helpers({
    results() {
        return Template.instance().results.get()
    }
});

Template.btsUpload.events({
    "click #save"(event, template) {
        event.preventDefault()

        if(template.btsNo.get() == "0"){
          alert("БТС номері таңдалмады")
        }else if (template.day.get() == "0") {
          alert("Күн таңдалмады")

        }else if (template.results.get().length == 0 ) {
          alert("Файл таңдалмады")

        }else if (template.errors.get()) {
          alert("Қателер табылды, басынан жүктеу жасаңыз!")
          // window.location.reload();
        }else {
            SUIBlock.block('Жүктелуде...');
            Meteor.call("BtsResults.Upload",academicYear.get(),template.btsNo.get(),template.day.get(),template.results.get(),function (err) {
                if (err) {
                    alert(err.reason)
                    SUIBlock.unblock();
                } else {
                    template.results.set([])
                    SUIBlock.unblock();
                    alert("Сақталды")
                    FlowRouter.redirect('/school/bts/results/'+template.btsNo.get())
                }
            });
            return
        }
    },
    "change #btsNo"(event,template) {
        template.btsNo.set(event.target.value)
    },
    "change #day"(event,template) {
        template.day.set(event.target.value)
    },
    "change #file"(event,template) {
        let btsNo = Template.instance().btsNo.get()
        let dayNo = Template.instance().day.get()

        function handleFiles(files) {
            // Check for the various File API support.
            if (window.FileReader) {
                // FileReader are supported.
                getAsText(files[0]);
            } else {
                alert('FileReader are not supported in this browser.');
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
            for (var i=0; i<txtlines.length; i++) {
                if (txtlines[i] != "") {
                  let studObj = {
                      studentId: txtlines[i].slice(3,8),
                      variant: txtlines[i].slice(8,12),
                      name: txtlines[i].slice(12,29),
                      surname: txtlines[i].slice(29,39),
                      keys: txtlines[i].slice(39),
                      isValid: true
                  }

                  let variant = BtsAnswerKeys.findOne({variant: studObj.variant, quarter:btsNo, day:dayNo, academicYear:academicYear.get()});
                  let student = Students.findOne({studentId: parseInt(studObj.studentId)})

                  // console.log("dayNo");
                  // console.log(dayNo);
                  //
                  // console.log("=================");
                  // console.log("btsNo");
                  // console.log(btsNo);
                  // console.log("variant.quarter");
                  // console.log(variant.quarter);
                  //
                  // console.log("=================");
                  // console.log("student.grade");
                  // console.log(student.grade);
                  // console.log("variant.grade");
                  // console.log(variant.grade);
                  // console.log("=================");

                  if (!student) {
                      studObj.isValid = false
                      template.errors.set(true)
                      alert("Келесі окушының id нөмірі дұрыс емес \n" + studObj.studentId + " " + studObj.name + " " + studObj.surname)
                  }

                  else if (!variant || btsNo != variant.quarter || student.grade != variant.grade) {
                      studObj.isValid = false
                      template.errors.set(true)
                      alert("Окушының БТС номері, таңдалға күн немесе варианты дұрыс емес \n" + studObj.studentId + " " + studObj.name + " " + studObj.surname)

                  }else if (!variant || btsNo != variant.quarter || (student.grade == 10 && !student.electiveGroup)) {
                      studObj.isValid = false
                      template.errors.set(true)
                      alert("Келесі окушының БТС сабақтары таңдалмады \n" + studObj.studentId + " " + studObj.name + " " + studObj.surname)

                  }else if (variant.day != dayNo) {
                      studObj.isValid = false
                      template.errors.set(true)
                      alert("Келесі окушыға күн дұрыс таңдалмады \n" + studObj.studentId + " " + studObj.name + " " + studObj.surname)
                  }

                  res.push(studObj);

                }
            }
            //console.log(res)
            template.results.set(res)
        }

        function errorHandler(evt) {
            if(evt.target.error.name == "NotReadableError") {
                alert("Can not read file!");
            }
        }

        handleFiles(event.target.files)
    }
})
