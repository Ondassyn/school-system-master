import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import './gSchoolSettings.html';

Template.gSchoolSettings.onCreated(function() {
    let template = this
    document.title = "Баптаулар";
    template.subscribe('guestSchools')
    Session.equals('editSchoolAccount', null);
    template.autorun(()=>{

    })

})

Template.gSchoolSettings.helpers({
    isAdmin() {
        return Roles.userIsInRole(Meteor.userId(),['admin'])
    },
    accounts() {
        return Configs.find({_id: "accounts"})
    },
    guestSchools() {
        return GuestSchools.find({},{sort:{schoolId:1}})
    },
    selected(id,num,val) {
        let conf = Configs.findOne({_id:id})
        if (conf)
            return conf[num] == val ? "selected" : ""
    },
    editingSchoolAccount(){
      return Session.equals('editSchoolAccount', this._id);
    }
});

Template.gSchoolSettings.events({
    'click #saveSchoolAccount'(event,template) {
      event.preventDefault()
      let passwordTxt = template.find("[id=editSchoolPassword]").value

      if (confirm("Are u sure?"))
          Meteor.call('resetGuestSchoolPassword',this.schoolId, passwordTxt, (err,res) => {
          if (err) {
              alert(err.reason)
          } else {
              alert('Сақталды')
          }
      })

    },

    'click #editSchoolAccount': function(){
      Session.set('editSchoolAccount', this._id);
    },

    'click #editSchoolAccountClose': function(){
      Session.set('editSchoolAccount', null);
    },

    'click #addNew'(event,template) {
        event.preventDefault()

        if (confirm("Жаңа қонақ мектепті қосуыңыз келеді ме?")) {

        let schoolId = template.find("[name=schoolId]").value
        let schoolName = template.find("[name=schoolName]").value

        if (schoolId && schoolName) {
          alert("Мектеп тізімге қосылды")
          Meteor.call('addGuestSchool',{
              schoolId:schoolId,
              gSchoolName:schoolName
          })
        }
        else {
            alert("Ақпарат толтырылмаған")
        }
        }
    },

    "change #tat1"(event,template) {
        Meteor.call("editConfig","tatUpload","1",event.target.value)
    },
    "change #tat2"(event,template) {
        Meteor.call("editConfig","tatUpload","2",event.target.value)
    },

})
