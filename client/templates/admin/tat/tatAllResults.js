import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './tatAllResults.html';

Template.tatAllResults.onCreated(function(){
    let template = this
    template.subjectId = new ReactiveVar('01')
    document.title = 'ТАТ-'+FlowRouter.getParam('tatNo')+' Нәтиже';
    template.subscribe('schools')
    template.subscribe('subjects')
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
Template.tatAllResults.helpers({
    allSubjectSelected(){
      return Template.instance().subjectId.get() == "all"
    },
    allSubjectNotSelected(){
      return Template.instance().subjectId.get() != "all"
    },

    tatNo() {
        return FlowRouter.getParam('tatNo')
    },

    results() {
      points.clear();
      oryndar = [];
      oryndar2 = [];

      var tatResults = TatResults.find({},{sort:{result:-1}});

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

      return tatResults;
    },

    // Place calculate functions
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


    // results() {
    //     return TatResults.find({},{sort:{result:-1}}).fetch();;
    // },

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

Template.tatAllResults.events({
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },

    'click #calcPlaces'(event,template){
        var tatResults = TatResults.find({},{sort:{result:-1}}).fetch();
        var i = 0;

        SUIBlock.block('Саналуда...');
        tatResults.forEach(res =>{
            Meteor.call("TatResults.teacherPlace", academicYear.get(), FlowRouter.getParam("tatNo"), res.teacherId, oryndar2[i], function (err) {
                if (err) {
                    bootbox.alert(err.reason);
                    SUIBlock.unblock();
                }
            });

            i++;
        });

        SUIBlock.unblock();
        bootbox.alert("Жасалынды");

    },
    'click #calcSubjectAve'(event,template){
        var tatResults = TatResults.find({},{sort:{result:-1}}).fetch();
        SUIBlock.block('Саналуда...');
        tatResults.forEach(res =>{
            Meteor.call("TatResults.teacherSubjectAve", academicYear.get(), FlowRouter.getParam("tatNo"), res.teacherId, ave, function (err) {
                if (err) {
                    bootbox.alert(err.reason);
                    SUIBlock.unblock();
                }
            });
        });

        SUIBlock.unblock();
        bootbox.alert("Жасалынды");

    },
})
