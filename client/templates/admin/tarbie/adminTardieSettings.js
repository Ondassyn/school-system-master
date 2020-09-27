import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminTardieSettings.html';
Template.adminTardieSettings.onCreated(function() {
    let template = this
    document.title = "ТЖО Баптаулар";
    template.subscribe('schoolsTjo')
})

Template.adminTardieSettings.helpers({
    schools() {
        return SchoolsTjo.find({},{sort:{schoolId:1}})
    },
});

Template.adminTardieSettings.events({
    'click #resetTjopassword'() {
        if (confirm("Are u sure?"))
            Meteor.call('resetSchoolTjoPassword',this.schoolId,(err,res) => {
            if (err) {
                alert(err.reason)
            } else {
                alert('Сақталды')
            }
        })
    },

    'click #addNewTjo'(event,template) {
        event.preventDefault()

        if (confirm("Жаңа мектепті қосуыңыз келеді ме?")) {

        let schoolId = template.find("[name=schoolId]").value
        let schoolName = template.find("[name=schoolName]").value

            if (schoolId && schoolName) {
                alert("Мектеп тізімге қосылды")
                Meteor.call('addNewTJO',{
                    schoolId:schoolId,
                    shortName:schoolName
                })
            }
            else {
                alert("Ақпарат толтырылмаған")
            }
        }
    },
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
