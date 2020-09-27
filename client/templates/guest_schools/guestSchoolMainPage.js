import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './guestSchoolMainPage.html';
Template.guestSchoolMainPage.onCreated(function() {
    let template = this
    document.title = "Басты бет";

    template.autorun(()=>{
      template.subscribe('currentGuestSchools', Meteor.userId())
    })
})

Template.guestSchoolMainPage.helpers({
  guestSchool() {
      let gg = GuestSchools.find().fetch()
      console.log(gg);

      return GuestSchools.find().fetch()
  },
});

Template.guestSchoolMainPage.events({

})
