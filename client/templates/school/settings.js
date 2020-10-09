import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import './settings.html';
Template.schoolSettings.onCreated(function() {
    let template = this
    template.subscribe("subjects")
    template.subscribe("configs")
    // template.subscribe("userList")
    template.subscribe("schools")
})

Template.schoolSettings.events({
    "click #save"(event,template) {
        event.preventDefault()

        let old = template.find("[name=oldPassword]").value
        let newp = template.find("[name=newPassword]").value

        if (old && newp) {
            Accounts.changePassword(old,newp,function(err) {
                if (err) {
                    alert(err.reason)
                } else {
                    alert("Құпиясөз өзгертілді")

                    let school = Schools.findOne({userId: Meteor.userId()})

                    Meteor.call("updateSchoolPassword", school, newp,function(err) {
                        if (err) {
                            alert(err.reason)
                        } else {
                          console.log('good job');
                        }
                    })

                }
            })
        }

    },
    "click #upgrade"(event,template) {
        event.preventDefault()
        let pass = template.find("[name=confirm]").value
        if (pass) {
            Meteor.call('validateSchoolPassword', pass, (err, res) => {
                
                if(err) {
                    alert(err.message);
                } else {
                    
                    if(res) {
                                    
                        if (confirm("Өзгеріс енгізілгеннен кейін қайта калпына келмейді!")) {
                            $('#upgrade').prop('disabled', true);
                            Meteor.call("Student.upgrade",academicYear.get(),function(err) {
                                if (err) {
                                    alert(err.message)
                                } else {
                                    alert("Сыныптан сыныпқа көшіру сәтті аяқталды!")
                                    $('#upgrade').prop('disabled', false);
                                }
                            })
                        }
                    } else {
                        alert('Wrong school password');
                    }
                }
            })
        } else {
            alert('Password field is empty');
        }
    },
    "click #downgrade"(event,template) {
        event.preventDefault()
        let pass = template.find("[name=confirm]").value
        // if (pass) {
        //     if (confirm("Өзгеріс енгізілгеннен кейін қайта калпына келмейді!")) {
        //         $('#downgrade').prop('disabled', true);
        //         Meteor.call("Student.downgrade", academicYear.get(), function(err) {
        //             if (err) {
        //                 alert(err.message)
        //             } else {
        //                 alert("Көшірудің артқа алынуы сәтті аяқталды!")
        //                 $('#downgrade').prop('disabled', false);
        //             }
        //         })
        //     }
        // }

        if(pass) {
            Meteor.call('validateSchoolPassword', pass, (err, res) => {
                
                if(err) {
                    alert(err.message);
                } else {
                    
                    if(res) {
                        
                        if (confirm("Өзгеріс енгізілгеннен кейін қайта калпына келмейді!")) {
                            $('#downgrade').prop('disabled', true);
                            Meteor.call("Student.downgrade", academicYear.get(), function(err) {
                                if (err) {
                                    alert(err.message)
                                } else {
                                    alert("Көшірудің артқа алынуы сәтті аяқталды!")
                                    $('#downgrade').prop('disabled', false);
                                }
                            })
                        }
                    } else {
                        alert('Wrong school password');
                    }
                }
            })
        } else {
            alert('Password field is empty');
        }
    }
})
