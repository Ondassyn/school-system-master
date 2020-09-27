import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './studentMainPage.html';
Template.studentMainPage.onCreated(function() {
    let template = this

    //template.imageClicked = new ReactiveVar("no")

    template.subscribe("subjects")
    template.subscribe("schools")
    template.subscribe('studentPage')
    //template.subscribe('ProfileImages')
    //template.subscribe('UserImages')

})
Template.studentMainPage.helpers({
    /*imageClicked() {
        return "yes"==Template.instance().imageClicked.get()
    },
    */
    subjects() {
        return Subjects.find({},{sort:{subjectId:1}})
    },
    student() {
    	return Students.find()
    },
    /*UserImages: function() {
        var username = Meteor.user().username;
        var userId = Meteor.userId();
        var URL = UserImages.findOne({username:username},{userId:userId});
        return URL;
    }
    */
});

Template.studentMainPage.events({
    /*
    "click #profile-btn": function(event) {
        event.preventDefault()
        var file = $('#profileImage').get(0).files[0];

        if (file) {

            if (file.size <= 5242880) {
            
                fsFile = new FS.File(file);
    
                ProfileImages.insert(fsFile, function(err, result) {
                    if (err) {
                        throw new Meteor.Error(err);
                    } else {

                        var imageLoc = '/cfs/files/ProfileImages/'+result._id;

                        previousImage = UserImages.findOne({userId:Meteor.userId()})
                        
                        if (previousImage) {
                            UserImages.update({_id:previousImage._id},{$set:{image: imageLoc}})
                        } else {
                            UserImages.insert({
                                userId: Meteor.userId(),
                                username: Meteor.user().username,
                                image: imageLoc
                            })
                        }
                    }
                        Bert.alert("Photo Update Successful", "success", "growl-top-right") 
                })
            } else {
                Bert.alert("Please upload an image file less than 5 MB", "danger", "growl-top-right") 
            }
        }
        
        //return false // prevent submit

    },
    
    "click #imageClick"(event,template) {
        imageState = Template.instance().imageClicked.get()

        if (imageState == 'no') {
            Template.instance().imageClicked.set('yes')
        } else {
            Template.instance().imageClicked.set('no')
        }
    }
    */
})
