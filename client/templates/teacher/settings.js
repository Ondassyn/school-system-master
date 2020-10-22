import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import './settings.html';
Template.teacherSettings.onCreated(function() {
    let template = this;

    template.subscribe("teacherAccounts")
})

Template.teacherSettings.events({
    "click #save"(event,template) {
        event.preventDefault()

        let old = template.find("[name=oldPassword]").value
        let newp = template.find("[name=newPassword]").value

        if (old && newp) {
            Accounts.changePassword(old,newp,function(err) {
                if (err) {
                    alert(err.reason)
                } else {
                    //alert("Құпиясөз өзгертілді")
                    alert('{{_ "password_change_success"}}');

                    let teacher = TeacherAccounts.findOne({userId: Meteor.userId()})

                    template.find("[name=oldPassword]").value = '';
                    template.find("[name=newPassword]").value = '';

                    Meteor.call("teacher.updateTeacherPassword", teacher, newp, function(err) {
                        if (err) {
                            alert(err.reason)
                        }
                    });

                }
            })
        }

    }
})
