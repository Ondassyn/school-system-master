import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminSettings.html';
Template.adminSettings.onCreated(function() {
    let template = this
    template.reportPeriod = new ReactiveVar('16.11 - 30.11')
    document.title = "Баптаулар";
    template.subscribe('subjects')
    template.subscribe('schools')
    template.subscribe("configs")
    template.subscribe('kboKeysGeneral')
    template.subscribe('ketPetRating');
    // template.subscribe('userList');
    template.subscribe('kboGenelResults',academicYear.get())
    Session.set('editItemAdmin', null);
    Session.set('editItemEdlight', null);
    Session.equals('editSchoolAccount', null);
    template.autorun(()=>{
        // template.subscribe("configAccounts")
        // return Configs.find({_id: "accounts"})
    })

})

Template.adminSettings.helpers({
    isAdmin() {
        return Roles.userIsInRole(Meteor.userId(),['admin'])
    },
    accounts() {
        return Configs.find({_id: "accounts"})
    },
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    schools() {
        return Schools.find({},{sort:{schoolId:1}})
    },
    selected(id,num,val) {
        let conf = Configs.findOne({_id:id})
        if (conf)
            return conf[num] == val ? "selected" : ""
    },
    selectedPeriod(){
      var idd = Template.instance().reportPeriod.get().replace(/[.*+?^${}()|[\]\\]/g, "_");
      let conf = Configs.findOne({_id:"opeUpload"})

      if (conf)
          return conf[idd] == "enabled"

      // return Template.instance().reportPeriod.get()
    },
    editingAdmin(){
      return Session.equals('editItemAdmin', this._id);
    },

    editingEdlight(){
      return Session.equals('editItemEdlight', this._id);
    },

    editingSchoolAccount(){
      return Session.equals('editSchoolAccount', this._id);
    }
});

Template.adminSettings.events({
    'click #saveSchoolAccount'(event,template) {
      event.preventDefault()
      let passwordTxt = template.find("[id=editSchoolPassword]").value

      if (confirm("Are u sure?"))
          Meteor.call('resetSchoolPassword',this.schoolId, passwordTxt, (err,res) => {
          if (err) {
              alert(err.reason)
          } else {
              alert('Сақталды')
          }
      })

    },

    'click #saveCoordinatorAccount'(event,template) {
      event.preventDefault()
      let passwordTxt = template.find("[id=editCoordinatorPassword]").value

      if (confirm("Are u sure?"))
          Meteor.call('resetSchoolCoordinatorPassword',this.schoolId, passwordTxt, (err,res) => {
          if (err) {
              alert(err.reason)
          } else {
              alert('Сақталды')
          }
      })

    },

    'click #addCoordinatorAccount'(event,template) {
      event.preventDefault()
      let passwordTxt = template.find("[id=editCoordinatorPassword]").value
      console.log('addCoordinatorAccount');

      if (confirm("Are u sure?"))
          Meteor.call('addSchoolCoordinatorPassword',this.schoolId, passwordTxt, (err,res) => {
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

    'click #editAdmin': function(){
      Session.set('editItemAdmin', this._id);
    },

    'click #cancelItemAdmin': function(){
      Session.set('editItemAdmin', null);
    },

    'click #addAdmin'(event,template) {
      event.preventDefault()
      let passwordTxt = "qwerty123"
      console.log('addAdmin');

      if (confirm("Are you sure, to add new admin?"))
          Meteor.call('addAdminPassword', passwordTxt, (err,res) => {
          if (err) {
              alert(err.reason)
          } else {
              alert('Сақталды')
          }
      })
    },


    'click #saveItemAdmin'(event,template) {
      event.preventDefault()
      let passwordTxt = template.find("[id=editAdminPassword]").value
      if(passwordTxt)
        if (confirm("Are you sure, to edit Admin password?"))
            Meteor.call('editAdminPassword', passwordTxt, (err,res) => {
            if (err) {
                alert(err.reason)
            } else {
                alert('Сақталды')
            }
        })
      else
        alert("Enter password")
    },


    'click #editEdlight': function(){
      Session.set('editItemEdlight', this._id);
    },

    'click #cancelItemEdlight': function(){
      Session.set('editItemEdlight', null);
    },

    'click #addEdlight'(event,template) {
      event.preventDefault()
      let passwordTxt = "qwerty123"
      console.log('addEdlight');

      if (confirm("Are you sure, to add new admin?"))
          Meteor.call('addEdlightPassword', passwordTxt, (err,res) => {
          if (err) {
              alert(err.reason)
          } else {
              Session.set('editItemEdlight', null);
              alert('Сақталды')
          }
      })
    },

    'click #saveItemEdlight'(event,template) {
      event.preventDefault()
      let passwordTxt = template.find("[id=editEdlightPassword]").value

      if (confirm("Are you sure, Admin?"))
          Meteor.call('editEdlightPassword', passwordTxt, (err,res) => {
          if (err) {
              alert(err.reason)
          } else {
              Session.set('editItemEdlight', null);
              alert('Сақталды')
          }
      })
    },

    'click #totalKetPetRating'(event,template) {
      Meteor.call("KetPet.totalRating", academicYear.get(), function (err) {
          if (err) {
              alert(err.reason)
              SUIBlock.unblock();
          } else {
              SUIBlock.unblock();
              alert("Жасалды")
          }
      });
    },

    "click #reCalc"() {
          SUIBlock.block('Саналуда...');
          Meteor.call("UbtResults.reCalcRating", academicYear.get(),function (err) {
              if (err) {
                  bootbox.alert(err.reason);
                  SUIBlock.unblock();
              } else {
                  SUIBlock.unblock();
                  bootbox.alert("Жасалынды");
              }
          });
    },

    'click #resetpassword'() {
        if (confirm("Are u sure?"))
            Meteor.call('resetSchoolPassword',this.schoolId,(err,res) => {
            if (err) {
                alert(err.reason)
            } else {
                alert('Сақталды')
            }
        })
    },

    'click #reCalcTotalRating1'(event,template) {
      SUIBlock.block('Саналуда...');
      Meteor.call("BtsResults.calcTotalRating", academicYear.get(),"1", function (err) {
          if (err) {
              alert(err.reason)
              SUIBlock.unblock();
          } else {
              SUIBlock.unblock();
              alert("Сақталды")
          }
      });
    },

    'click #reCalcSubjectRating2'(event,template) {
      SUIBlock.block('Саналуда...');
      Meteor.call("BtsResults.calcSubjectRating", academicYear.get(), "2", function (err) {
          if (err) {
              alert(err.reason)
              SUIBlock.unblock();
          } else {
              SUIBlock.unblock();
              alert("Сақталды")
          }
      });
    },

    'click #reCalcSubjectRating1'(event,template) {
      SUIBlock.block('Саналуда...');
      Meteor.call("BtsResults.calcSubjectRating", academicYear.get(), "1", function (err) {
          if (err) {
              alert(err.reason)
              SUIBlock.unblock();
          } else {
              SUIBlock.unblock();
              alert("Сақталды")
          }
      });
    },


    'click #reCalcTotalRating2'(event,template) {
      SUIBlock.block('Саналуда...');
      Meteor.call("BtsResults.calcTotalRating", academicYear.get(),"2", function (err) {
          if (err) {
              alert(err.reason)
              SUIBlock.unblock();
          } else {
              SUIBlock.unblock();
              alert("Сақталды")
          }
      });
    },

    'click #reCalcTotalRating3'(event,template) {
      SUIBlock.block('Саналуда...');
      Meteor.call("BtsResults.calcTotalRating", academicYear.get(),"3", function (err) {
          if (err) {
              alert(err.reason)
              SUIBlock.unblock();
          } else {
              SUIBlock.unblock();
              alert("Сақталды")
          }
      });
    },
    'click #reCalcTotalRating4'(event,template) {
      SUIBlock.block('Саналуда...');
      Meteor.call("BtsResults.calcTotalRating", academicYear.get(), "4", function (err) {
          if (err) {
              alert(err.reason)
              SUIBlock.unblock();
          } else {
              SUIBlock.unblock();
              alert("Сақталды")
          }
      });
    },

    'click #addNew'(event,template) {
        event.preventDefault()

        if (confirm("Жаңа мектепті қосуыңыз келеді ме?")) {

        let schoolId = template.find("[name=schoolId]").value
        let schoolName = template.find("[name=schoolName]").value

            if (schoolId && schoolName) {
                alert("Мектеп тізімге қосылды")
                Meteor.call('addUsers',{
                    schoolId:schoolId,
                    shortName:schoolName
                })
            }
            else {
                alert("Ақпарат толтырылмаған")
            }
        }
    },

    "change #bts1"(event,template) {
        Meteor.call("editConfig","btsUpload","1",event.target.value)
    },
    "change #bts2"(event,template) {
        Meteor.call("editConfig","btsUpload","2",event.target.value)
    },
    "change #bts3"(event,template) {
        Meteor.call("editConfig","btsUpload","3",event.target.value)
    },
    "change #bts4"(event,template) {
        Meteor.call("editConfig","btsUpload","4",event.target.value)
    },
    "change #kbo1"(event,template) {
        Meteor.call("editConfig","kboUpload","1",event.target.value)
    },
    "change #kbo2"(event,template) {
        Meteor.call("editConfig","kboUpload","2",event.target.value)
    },
    "change #kbo3"(event,template) {
        Meteor.call("editConfig","kboUpload","3",event.target.value)
    },
    "change #tat1"(event,template) {
        Meteor.call("editConfig","tatUpload","1",event.target.value)
    },
    "change #tat2"(event,template) {
        Meteor.call("editConfig","tatUpload","2",event.target.value)
    },

    "change #ketPet2"(event,template) {
        Meteor.call("editConfig","ketPetUpload","2",event.target.value)
    },

    "change #ketPet4"(event,template) {
        Meteor.call("editConfig","ketPetUpload","4",event.target.value)
    },


    'change #opePeriod'(event,template) {
        event.preventDefault();
        template.reportPeriod.set(event.target.value)
        // console.log(template.reportPeriod.get());
    },

    "change #opePeriodPermission"(event,template) {
        var period = template.reportPeriod.get().replace(/[.*+?^${}()|[\]\\]/g, "_");
        Meteor.call("editConfig", "opeUpload", period, event.target.value)
    }
})

// editConfig: function(id,num,val) {
//     if (!this.userId)
//         return
//
//     if (!Roles.userIsInRole(this.userId,"admin"))
//         return
//
//     let conf = Configs.findOne({_id:id})
//     if(conf) {
//         conf[num] = val
//         console.log(conf)
//         Configs.update({_id:conf._id},{$set:conf})
//     }
// },
