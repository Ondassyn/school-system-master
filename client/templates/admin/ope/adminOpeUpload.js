import XLSX from 'xlsx';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminOpeUpload.html';

Template.adminOpeUpload.onCreated(function() {
    let template = this
    document.title = "OPE жүктеу";
    template.results = new ReactiveVar([])
    template.subjectId = new ReactiveVar('01');
    template.opeNumber = new ReactiveVar('1');

    template.subscribe("students")
    template.subscribe('schools')
})

Template.adminOpeUpload.helpers({
    results() {
        return Template.instance().results.get()
    }
});

Template.adminOpeUpload.events({
    'change #upload' (event,template) {

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
  },
  'click #download' () {
      const html = document.getElementById('out').innerHTML;

      var data = [];
      var headers = ['schoolId', 'studentId', 'studentSurname', 'studentName', 'opeResult'];

      data.push(headers);
        data.push(['001', '00001', 'Абаев', 'Абай', '10']);

      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;

        let sName = 'ope_example.xlsx';
        XLSX.writeFile(wb, sName);
      });

  },
  "click #save"(event,template) {
        event.preventDefault()
        if(template.results.get().length > 0) {
            SUIBlock.block('Жүктелуде...');
            Meteor.call("OpeResults.Upload", academicYear.get(), template.subjectId.get(), template.opeNumber.get(), template.results.get(),function (err, res) {
                if (err) {
                    bootbox.alert(err.reason);
                    SUIBlock.unblock();
                } else {
                    template.results.set([])
                    SUIBlock.unblock();
                    if(res) bootbox.alert(res);
                    else bootbox.alert("Сақталды");
                    FlowRouter.redirect('/admin/ope/results')
                }
            });

            return
        }
        alert("Файл таңдалмады немесе қателер табылды")
    },

    "change #subjectId"(event,template) {
        template.subjectId.set(event.target.value);
    },
    "change #opeNumber"(event, template) {
        template.opeNumber.set(event.target.value);
    }
})