import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import './ubtResults.html';
import XLSX from 'xlsx';

Template.ubtResults.onCreated(function(){
    let template = this
    document.title = "ҰБТ Нәтижелері";
    template.state = new ReactiveVar("results")
    template.subscribe("schools")
    template.subscribe('school')

    template.autorun(()=>{
        template.subscribe("uhdResults", academicYear.get())
    })
})

Template.ubtResults.helpers({
    resultButton() {
        return 'results' == Template.instance().state.get()
    },
    results() {
        return UhdResults.find({},{sort:{total:-1}})
    }
})

Template.ubtResults.events({
    "click #window1"(event,template) {
        Template.instance().state.set("notResults")

    },
    "click #window2"(event,template) {
        Template.instance().state.set("results")
    },

    "click #export"(event,template) {
      const html = document.getElementById('out').innerHTML;

      var resultStore = UhdResults.findOne({},{sort:{total:-1}});

      var row = new Array();
      var data = new Array();

      var i = 0;
      for (var key in resultStore) {
          row[i] = key;
          i += 1;
      }

      data.push(row);

      var ubtArray = UhdResults.find({},{sort:{total:-1}}).fetch();

      for(var i = 0; i < ubtArray.length; i++){
        let array = [];
        let values = Object.values(ubtArray[i]);
        Array.prototype.push.apply(array, values);
        data.push(array);
      }

      var id0 = 0;
      var id2 = 2;

      for(var i = 0 ; i < data.length ; i++)
      {
         data[i].splice(id0,1);
         data[i].splice(id2,1);
      }
      
      let year = academicYear.get();

      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;

        let sName = 'Ubt natizheleri '+year+'.xlsx';
        XLSX.writeFile(wb, sName);
      });

    }
})

      // var data = [
      //   ["studentId", "grade" , "surname", "name","ubt1","ubt2","ubt3","ubt4","ubt5","ubt6","ubt7","ubt8","ubt9","ubt10"],
      //   [ "007" ,"11A", "Kanatov" , name, html, 60, 70, 80, 90, 100, 110, 120, 130, 140 ]
      // ];

// 0: (14) ["studentId", "grade", "surname", "name", "ubt1", "ubt2", "ubt3", "ubt4", "ubt5", "ubt6", "ubt7", "ubt8", "ubt9", "ubt10"]
// 1: (14) ["007", "11A", "Kanatov", "Vasya", "50", 60, 70, 80, 90, 100, 110, 120, 130, 140]
// length: 2

// 0: (42) ["_id", "academicYear", "studentId", "schoolId", "name", "surname", "grade", "total", "ubt1", "ubt2", "ubt3", "ubt4", "ubt5", "ubt6", "ubt7", "ubt8", "ubt9", "ubt10", "ubt11", "ubt12", "ubt13", "ubt14", "ubt15", "ubt16", "ubt17", "ubt18", "ubt19", "ubt20", "ubt21", "ubt22", "ubt23", "ubt24", "ubt25", "ubt26", "ubt27", "ubt28", "ubt29", "ubt30", "ubt31", "ubt32", "ubt33", "ubt34"]
