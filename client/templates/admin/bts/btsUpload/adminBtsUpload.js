import XLSX from 'xlsx';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminBtsUpload.html';

Template.adminBtsUpload.onCreated(function() {
    let template = this
    template.results = new ReactiveVar([])
    template.errors = new ReactiveVar(false)
    template.btsNo = new ReactiveVar("0")
    template.day = new ReactiveVar("0")
    template.grade = new ReactiveVar("0");
    template.subscribe("students")
    template.subscribe("btsSchoolKeys",academicYear.get())

})

Template.adminBtsUpload.helpers({
    results() {
        return Template.instance().results.get()
    }
});

Template.adminBtsUpload.events({
    "click #save"(event, template) {
        event.preventDefault()

        if(template.btsNo.get() == "0"){
          alert("БТС номері таңдалмады")
        }else if (template.day.get() == "0") {
          alert("Күн таңдалмады")
        }else if (template.grade.get() == "0") {
            alert("Күн таңдалмады")
        }else if (template.results.get().length == 0 ) {
          alert("Файл таңдалмады")

        }else if (template.errors.get()) {
          alert("Қателер табылды, басынан жүктеу жасаңыз!")
          // window.location.reload();
        }else {
            SUIBlock.block('Жүктелуде...');
            Meteor.call("BtsResults.UploadXlsx",academicYear.get(),template.btsNo.get(),template.day.get(),template.grade.get(),template.results.get(),function (err) {
                if (err) {
                    alert(err.reason)
                    SUIBlock.unblock();
                } else {
                    template.results.set([])
                    SUIBlock.unblock();
                    alert("Сақталды")
                    FlowRouter.redirect('/admin/bts/rating/'+template.btsNo.get())
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
    "change #grade"(event,template) {
        template.grade.set(event.target.value)
    },
    "change #file"(event,template) {
        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            const name = file.name;

            Meteor.call('upload', data, name, function(err, wb) {
                if(err) alert(err);
                else {
                    // res = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header : ['studentId', 'grade', 'studentSurname', 'studentName', 'ubt1','ubt2','ubt3','ubt4','ubt5','ubt6','ubt7','ubt8','ubt9','ubt10',
                    // 'ubt11','ubt12','ubt13','ubt14','ubt15','ubt16','ubt17','ubt18','ubt19','ubt20','ubt21','ubt22','ubt23','ubt24','ubt25','ubt26','ubt27','ubt28','ubt29','ubt30','ubt31','ubt32','ubt33','ubt34']})
                    res = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header : 0})
                    template.results.set(res)
                }
            });
        };
        reader.readAsBinaryString(file);
    }
})
