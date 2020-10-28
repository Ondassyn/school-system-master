import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './opeResults.html';
import {ReactiveDict} from 'meteor/reactive-dict'

Template.opeResults.onCreated(function() {
    let template = this
    document.title = "OPE Нәтижелері";
    template.subjectId = new ReactiveVar('all')
    template.grade = new ReactiveVar('all')
    template.schoolId = new ReactiveVar('all');
    
    template.subscribe('configs');

    template.autorun(() => {
        template.subscribe("schoolOpeResults", academicYear.get(), template.subjectId.get(), template.grade.get());
        template.subscribe('schoolStudents', template.subjectId.get(), template.grade.get());
    })
})

Template.opeResults.helpers({
  students(){
    return Students.find({},{sort:{surname:-1, division:1}})
  },
  opeList(){
    return OpeResults.find().fetch();
  },
  editing(){
    return Session.equals('editItemId', this._id);
  },
  opeThresholds() {
    return Configs.findOne({_id: 'opeThresholds'});
  },
  level(studentId) {
    let student = Students.findOne({studentId});
    return (!student.level) || student.level === 'none' ? '' : Students.findOne({studentId}).level;
  },
  getLevelStyle(studentId, opeNo) {
    let opeResult = OpeResults.findOne({studentId});
    if(!opeResult) return;
    let points = parseFloat(opeResult['ope' + opeNo]);
    let thresholds = Template.adminOpeResults.__helpers.get('opeThresholds').call();
    let student = Students.findOne({studentId});
    let level = (!student.level) || student.level === 'none' ? '' : Students.findOne({studentId}).level;

    if(level) {
        if(level === 'Область') {
            if(thresholds.region && points){
                if(+points >= +thresholds.region) return 'text-align: center; white-space: nowrap; background-color: #b2fab4';
                return 'text-align: center; white-space: nowrap; background-color: #ff867c';
            }
        }
        if(level === 'Республика') {
            if(thresholds.republic && points){
                if(+points >= +thresholds.republic) return 'text-align: center; white-space: nowrap; background-color: #b2fab4';
                return 'text-align: center; white-space: nowrap; background-color: #ff867c';
            }
        }
    }
    return 'text-align: center; white-space: nowrap';
 },
  thresholdRatioRegion(no) {
    let thresholds = Template.adminOpeResults.__helpers.get('opeThresholds').call();
    if(!thresholds.region) return '';
    let list = Template.adminOpeResults.__helpers.get('opeList').call();
    let n = 0;
    let m = 0;
    list.map((item) => {
        if(item['ope' + no]) {
            let level = Students.findOne({studentId : item.studentId}).level;
            if(level && (level === 'Область' || level === 'Республика')){
                n++;
                if(+item['ope' + no] >= +thresholds.region) m++;
            }
        }
    })

    if(+n > 0) return (m/n).toFixed(2);
  },
  thresholdRatioRepublic(no) {
    let thresholds = Template.adminOpeResults.__helpers.get('opeThresholds').call();
    if(!thresholds.republic) return '';
    let list = Template.adminOpeResults.__helpers.get('opeList').call();
    let n = 0;
    let m = 0;
    list.map((item) => {
        if(item['ope' + no]) {
            let level = Students.findOne({studentId : item.studentId}).level;
            if(level && level === 'Республика'){
                n++;
                if(+item['ope' + no] >= +thresholds.republic) m++;
            }
        }
    })

    if(+n > 0) return (m/n).toFixed(2);
  },
  getLabelStyle(opeNo, level) {
    if(level === 'region')
        if(Template.adminOpeResults.__helpers.get('thresholdRatioRegion')(opeNo))
            return "padding: 2px; background-color: #ccffff";
    if(level === 'republic')
        if(Template.adminOpeResults.__helpers.get('thresholdRatioRepublic')(opeNo))
            return "padding: 2px; background-color: #cce5ff";
 },
});

var saveItem = function(){
  var editItem = {
    ope1: $("#editOpe1").val(),
    ope2: $("#editOpe2").val(),
    ope3: $("#editOpe3").val(),
    ope4: $("#editOpe4").val(),
    ope5: $("#editOpe5").val(),
    ope6: $("#editOpe6").val(),
  }

  Meteor.call('Ope.updateOpeResults',academicYear.get(), Session.get('editItemId'),editItem)
  Session.set('editItemId', null);
}

Template.opeResults.events({
  'click .editItem': function(){
    Session.set('editItemId', this._id);
  },
  'click .cancelItem': function(){
    Session.set('editItemId', null);
  },
  'click .saveItem': function(){
    saveItem();
  },
    'keypress input': function(e){
      if(e.keyCode === 13){
        saveItem();
      }
      else if(e.keyCode === 27){
        Session.set('editItemId', null);
      }
    },
    'change #subjectId'(event,template) {
        template.subjectId.set(event.target.value)
    },
    'change #grade'(event,template) {
        template.grade.set(event.target.value)
    },
})

Template.opeResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
