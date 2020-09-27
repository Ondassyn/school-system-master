import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatTop10Results.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

Template.tatTop10Results.onCreated(function(){
    let template = this
    document.title = "ТАТ Топ 10";
    template.subjectId = new ReactiveVar('01')
    template.subscribe('schools')
    template.autorun(()=>{
        template.subscribe('tatAllSeparateResults',academicYear.get(),template.subjectId.get(),FlowRouter.getParam('tatNo'))
    })

})

var totalCount = 0;
var ave = 0;

Set.prototype.getByIdx = function(idx){
  if(typeof idx !== 'number') throw new TypeError('Argument idx must be a Number. Got [${idx}]');

  let i = 0;
  for( let iter = this.keys(), curs = iter.next(); !curs.done; curs = iter.next(), i++ )
    if(idx === i) return curs.value;

  throw new RangeError('Index [${idx}] is out of range [0-${i-1}]');
}

var points = new Set();
var oryndar = [];
var oryndar2 = [];

Template.tatTop10Results.helpers({
    tatNo() {
        return FlowRouter.getParam('tatNo')
    },
    results() {
      var tatResults = TatResults.find({},{sort:{result:-1}});

      /*points.clear();
      oryndar = [];
      oryndar2 = [];



      var btsStore = tatResults.fetch();
      btsStore.forEach(res =>{
        points.add(res.result)
      });

      // console.log(points);

      for(var i = 0; i < btsStore.length; i++){

        var number = 0;
        for(var index = 0; index < points.size; index++){
          if(btsStore[i])
            if(btsStore[i].result == points.getByIdx(index)){
              number = index;
            }
        }
        oryndar.push((number+1))
      }
      console.log(oryndar);

      var previous = 0;
      var count = 0;
      for(var j = 0; j < oryndar.length; j++){
        if(previous < oryndar[j]){
          if(oryndar[j]!=1 && oryndar[j]!=2 && oryndar[j]!=3){
              oryndar2.push(j+1);
              count++;
          }else{
            oryndar2.push(oryndar[j]);
            count++;
          }
        }else{
          oryndar2.push(oryndar2[count-1]);
          count++;
        }

        previous = oryndar[j];
      }
      */
      return tatResults;
    },
    
    placeNumber(lvalue, operator, rvalue, options){
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        var index =  {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue,
            "<": lvalue < rvalue,
            ">": lvalue > rvalue
        }[operator];
        return oryndar2[index-1];
    },
    getTotalCount(){
      totalCount = 0;
      ave = 0;

      var tatResults = TatResults.find({position: { $not: /^intern.*/ }},{sort:{result:-1}}).fetch();
      totalCount = tatResults.length;

      return totalCount;
    },

    getAve(){
      totalCount = 0;
      ave = 0;
      var tatResults = TatResults.find({position: { $not: /^intern.*/}},{sort:{result:-1}}).fetch();

      tatResults.forEach(tat =>{
        ave += tat.result;
      });

      totalCount = tatResults.length;
      ave = ave / totalCount;

      return ave;
    }
})

Template.tatTop10Results.events({
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      var selectedLesson = "Алгебра";
      let tatN = FlowRouter.getParam('tatNo');

      let lessons = [" ", "Алгебра", "Физика", "Химия", "Биология", "Ағылшын тілі", "География", " ",
       "Информатика", "Қазақ тілі", "Түрік тілі", "Орыс тілі", "Қазақстан тарихы", "Дене шынықтыру" ];

      if(template.subjectId.get() == "23"){
        selectedLesson = "Дене шынықтыру";
      }else{
        selectedLesson = lessons[parseInt(template.subjectId.get())]
      }

      var headers = ["#", "Оқу жылы", "Мектеп аты", "Пән", "Мұғалім ID",
      "Аты	Жөні", "Лауазымы", "Нәтиже", "%"];
      data.push(headers);

      var resultStore = TatResults.find({},{sort:{result:-1}}).fetch();
      // console.log(resultStore.length);

      console.log(resultStore);
      var size = 0;
      if(resultStore.length > 10){
        size = 10;
      }else{
        size = resultStore.length;
      }

      for(var i = 0; i < size; i++){
        let mektepAty  = Schools.findOne({schoolId: resultStore[i].schoolId}) ? Schools.findOne({schoolId: resultStore[i].schoolId}).shortName : undefined;

        let idN = i+1;
        let okuJyly = resultStore[i].academicYear;
        let mugalimId = resultStore[i].teacherId;
        let mugalimInfo = resultStore[i].teacherSurname+" "+resultStore[i].teacherName;
        let lauazim = resultStore[i].position;
        let natizhe = resultStore[i].result;
        let procentN = resultStore[i].percent;

        let content = [idN, okuJyly, mektepAty, selectedLesson, mugalimId, mugalimInfo,
          lauazim, natizhe, procentN];

        data.push(content);
      }

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{
        let year = academicYear.get();
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;

          let sName = 'Tat'+tatN+' Top10 '+selectedLesson+' '+year+'.xlsx';
          XLSX.writeFile(wb, sName);
        });
      }
    }
})
