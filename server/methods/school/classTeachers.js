import { Meteor } from 'meteor/meteor';
Meteor.methods({

	"classTeacher.editGrade": function(id,val) {
        if (!this.userId)
            return

				if(!Roles.userIsInRole(this.userId,'school') ||
						!Roles.userIsInRole(this.userId,'schoolCoordinator'))

            return
        let teacher = Teachers.findOne({_id:id})
        if(teacher) {
            teacher.grade = val
            Teachers.update({_id:teacher._id},{$set:teacher})
        }
    },
    "classTeacher.constructRating": function(academicYear) {
        if(Roles.userIsInRole(this.userId,'school')) {

            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

            if(school) {
                teachers = Teachers.find({schoolId:school.schoolId,grade:'yes',position:{$ne:"intern"}}).fetch()

                teachersToDelete = Teachers.find({schoolId:school.schoolId,grade:'no'}).fetch()

                _.each(teachersToDelete,teacherToDel => {

                    TeacherAssessments.remove({teacherId:teacherToDel.teacherId,schoolId:school.schoolId,academicYear:academicYear})

                    })

                _.each(teachers,teacher => {
                    let sameTeacher = TeacherAssessments.findOne({teacherId:teacher.teacherId,academicYear:academicYear})
                    if (sameTeacher) {
                        //throw new Meteor.Error('Duplicate Error','The teacher\'s rating already exists')
                        return
                    }
                    else {
                        var counter = 12;

                        for (var i = 1; i <= counter; i++) {

                            i = String(i)
                            if (i.length == 1)  {
                                i = '0' + i;
                            }

                            TeacherAssessments.insert({
                                academicYear: academicYear,
                                month: i,
                                schoolId: school.schoolId,
                                teacherId: teacher.teacherId,
                                name: teacher.name,
                                surname: teacher.surname,
                                subjectId: teacher.subjectId,
                                visit: 0,
                                parent_hour: 0,
                                eleven_grade_meeting: 0,
                                admin_meeting: 0,
                                principal_meeting: 0,
                                tutor_seminar: 0,
                                teacher_seminar: 0,
                                total: 0
                            })
                        }

                        TeacherAssessments.insert({
                                academicYear: academicYear,
                                month: 'all',
                                schoolId: school.schoolId,
                                teacherId: teacher.teacherId,
                                name: teacher.name,
                                surname: teacher.surname,
                                subjectId: teacher.subjectId,
                                visit: 0,
                                parent_hour: 0,
                                eleven_grade_meeting: 0,
                                admin_meeting: 0,
                                principal_meeting: 0,
                                tutor_seminar: 0,
                                teacher_seminar: 0,
                                total: 0
                            })
                    }
                })
            }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.deleteRating": function(academicYear) {
        if(Roles.userIsInRole(this.userId,'school')) {

            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

            if(school) {
                TeacherAssessments.remove({schoolId:school.schoolId,academicYear:academicYear})
            }
        }
            else {
                throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "classTeacher.addVisit": function(teacher_id, academicYear, month) {ƒƒ
				if(!Roles.userIsInRole(this.userId,'school') ||
						!Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.visit++;
                    teacher.total++;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.visit++;
                    teacherGeneral.total++;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.reduceVisit": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.visit--;
                    teacher.total--;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.visit--;
                    teacherGeneral.total--;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.addParentHour": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.parent_hour++;
                    teacher.total++;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.parent_hour++;
                    teacherGeneral.total++;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.reduceParentHour": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.parent_hour--;
                    teacher.total--;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.parent_hour--;
                    teacherGeneral.total--;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.add11GradeMeeting": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.eleven_grade_meeting++;
                    teacher.total++;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.eleven_grade_meeting++;
                    teacherGeneral.total++;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.reduce11GradeMeeting": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.eleven_grade_meeting--;
                    teacher.total--;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.eleven_grade_meeting--;
                    teacherGeneral.total--;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.addAdminMeeting": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.admin_meeting++;
                    teacher.total++;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.admin_meeting++;
                    teacherGeneral.total++;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.reduceAdminMeeting": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.admin_meeting--;
                    teacher.total--;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.admin_meeting--;
                    teacherGeneral.total--;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.addPrincipalMeeting": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.principal_meeting++;
                    teacher.total++;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.principal_meeting++;
                    teacherGeneral.total++;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.reducePrincipalMeeting": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.principal_meeting--;
                    teacher.total--;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.principal_meeting--;
                    teacherGeneral.total--;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.addTutorSeminar": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.tutor_seminar++;
                    teacher.total++;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.tutor_seminar++;
                    teacherGeneral.total++;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.reduceTutorSeminar": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.tutor_seminar--;
                    teacher.total--;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.tutor_seminar--;
                    teacherGeneral.total--;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.addTeacherSeminar": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
        if(!school) school = Schools.findOne({coordinatorId:this.userId})
            let school = Schools.findOne({userId: this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.teacher_seminar++;
                    teacher.total++;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.teacher_seminar++;
                    teacherGeneral.total++;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "classTeacher.reduceTeacherSeminar": function(teacher_id, academicYear, month) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
		        if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherAssessments.findOne({_id:teacher_id, academicYear:academicYear, month:month})

                if (teacher) {
                    teacher.teacher_seminar--;
                    teacher.total--;
                    TeacherAssessments.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherAssessments.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, month:'all'})

                    teacherGeneral.teacher_seminar--;
                    teacherGeneral.total--;
                    TeacherAssessments.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, month:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

})
