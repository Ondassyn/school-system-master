import { Meteor } from 'meteor/meteor';
	Meteor.methods({
	"Teacher.delete": function(teacher_id) {
	        if(Roles.userIsInRole(this.userId,['admin'])) {
	            let teacher = Teachers.findOne({_id:teacher_id})
	            if(teacher) {
	                Teachers.remove({_id:teacher_id})
	            }
	        } else {
	            throw new Meteor.Error('auth-error','School rights required.')
	        }
	    },

	"Teacher.deleteFromList": function(teacher_id) {
	        if(Roles.userIsInRole(this.userId,['admin'])) {
	            let teacher = TeacherTransferList.findOne({_id:teacher_id})
	            if(teacher) {
	                TeacherTransferList.remove({_id:teacher_id})
	            }
	        } else {
	            throw new Meteor.Error('auth-error','School rights required.')
	        }
	    }
	})