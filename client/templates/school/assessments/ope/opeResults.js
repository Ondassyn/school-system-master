import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './opeResults.html';
import {ReactiveDict} from 'meteor/reactive-dict'

Template.opeResults.onCreated(function() {
    let template = this
    document.title = "OPE Нәтижелері";
    template.subjectId = new ReactiveVar('01')
    template.grade = new ReactiveVar('7')
    template.subscribe('opes');

    template.autorun(() => {
        template.subscribe("opeResults", template.subjectId.get(), template.grade.get())
    })
})

Template.opeResults.helpers({
  students(){
    return Students.find({},{sort:{surname:-1, division:1}})
  },
  editing(){
    return Session.equals('editItemId', this._id);
  }
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

  Meteor.call('Ope.updateOpeResults',Session.get('editItemId'),editItem)
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
