import { Meteor } from 'meteor/meteor';
Meteor.methods({
    "Teacher.insert": function(teacherObject) {
        if(Roles.userIsInRole(this.userId,['school', 'schoolCoordinator'])) {
            let school = Schools.findOne({userId:this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})
            if(school) {
                let id = IdCounter.findOne()
                teacherId = id['teacherId']+1
                IdCounter.update({_id:id._id},{$set:{teacherId:teacherId}})

                let teacher = teacherObject
                teacher.teacherId = teacherId
                teacher.schoolId = school.schoolId

                Teachers.insert(teacher)
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.update": function(teacherObject,teacher_id) {
        if(Roles.userIsInRole(this.userId,['school', 'admin'])) {
            let teacher = Teachers.findOne({_id:teacher_id})
            if(teacher) {
                Teachers.update({_id:teacher_id},{$set:teacherObject})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.transfer": function(teacher_id) {
        if(Roles.userIsInRole(this.userId,['school', 'admin'])) {
            let teacher = Teachers.findOne({_id:teacher_id})
            if(teacher) {
                Teachers.remove({_id:teacher_id})
                TeacherTransferList.insert(teacher)
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.acceptToSchool": function(teacher_id) {
        if(Roles.userIsInRole(this.userId,'school')) {
            let teacher = TeacherTransferList.findOne({_id:teacher_id})
            if(teacher) {
                TeacherTransferList.remove({_id:teacher_id})
                let school = Schools.findOne({userId:this.userId})
                teacher.schoolId = school.schoolId
                Teachers.insert(teacher)
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.constructRatingAll": function(academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,'school')) {

            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

            if(school) {
                teachers = Teachers.find({schoolId:school.schoolId,position:{$ne:"intern"}}).fetch()

                _.each(teachers,teacher => {
                    let sameTeacher = TeacherPerformaRating.findOne({teacherId:teacher.teacherId,quarter:quarter})
                    if (sameTeacher) {
                        throw new Meteor.Error('Duplicate Error','The rating already exists')
                    }
                    else {
                        var counter;

                        if (quarter == '1' || quarter == '2' || quarter == '4') {
                            counter = 8;
                        }
                        if (quarter == '3') {
                            counter = 10;
                        }

                        for (var i = 1; i <= counter; i++) {
                            TeacherPerformaRating.insert({
                                academicYear: academicYear,
                                quarter: quarter,
                                week: String(i),
                                schoolId: school.schoolId,
                                teacherId: teacher.teacherId,
                                name: teacher.name,
                                surname: teacher.surname,
                                subjectId: teacher.subjectId,
                                extra_lesson: 0,
                                olympiad_preparation: 0,
                                ubt_preparation: 0,
                                lesson_attend: 0,
                                event_school: 0,
                                event_city: 0,
                                event_republic: 0,
                                pbl_prepare: 0,
                                pbl_present: 0,
                                total: 0
                            })
                        }

                        TeacherPerformaRating.insert({
                                academicYear: academicYear,
                                quarter: quarter,
                                week: 'all',
                                schoolId: school.schoolId,
                                teacherId: teacher.teacherId,
                                name: teacher.name,
                                surname: teacher.surname,
                                subjectId: teacher.subjectId,
                                extra_lesson: 0,
                                olympiad_preparation: 0,
                                ubt_preparation: 0,
                                lesson_attend: 0,
                                event_school: 0,
                                event_city: 0,
                                event_republic: 0,
                                pbl_prepare: 0,
                                pbl_present: 0,
                                total: 0
                            })
                    }
                })
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.deleteRating": function(academicYear, quarter) {
        if(Roles.userIsInRole(this.userId,'school')) {

            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

            if(school) {
                TeacherPerformaRating.remove({schoolId:school.schoolId,quarter:quarter})
            }
        }
            else {
                throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.addExtraLesson": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.extra_lesson++;
                    teacher.total++;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.extra_lesson++;
                    teacherGeneral.total++;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.reduceExtraLesson": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.extra_lesson--;
                    teacher.total--;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.extra_lesson--;
                    teacherGeneral.total--;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.addOlympiad": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                        if (teacher.olympiad_preparation < 3) {
                            teacher.olympiad_preparation++;
                            teacher.total++;

                            let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                            teacherGeneral.olympiad_preparation++;
                            teacherGeneral.total++;
                            TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})

                        }
                        else {
                            throw new Meteor.Error('limit-error','Артық ұпай берілмейді')
                        }

                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.reduceOlympiad": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.olympiad_preparation--;
                    teacher.total--;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.olympiad_preparation--;
                    teacherGeneral.total--;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.addUbt": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.ubt_preparation++;
                    teacher.total++;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.ubt_preparation++;
                    teacherGeneral.total++;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.reduceUbt": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.ubt_preparation--;
                    teacher.total--;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.ubt_preparation--;
                    teacherGeneral.total--;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})

                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.addAttend": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.lesson_attend++;
                    teacher.total++;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.lesson_attend++;
                    teacherGeneral.total++;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.reduceAttend": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.lesson_attend--;
                    teacher.total--;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.lesson_attend--;
                    teacherGeneral.total--;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.addSchoolEvent": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.event_school++;
                    teacher.total +=3;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.event_school++;
                    teacherGeneral.total +=3;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.reduceSchoolEvent": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.event_school--;
                    teacher.total -=3;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.event_school--;
                    teacherGeneral.total -=3;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.addCityEvent": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.event_city++;
                    teacher.total +=9;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.event_school++;
                    teacherGeneral.total +=9;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.reduceCityEvent": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.event_city--;
                    teacher.total -=9;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.event_school--;
                    teacherGeneral.total -=9;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.addRepEvent": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.event_republic++;
                    teacher.total +=18;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.event_school++;
                    teacherGeneral.total +=18;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.reduceRepEvent": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.event_republic--;
                    teacher.total -=18;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.event_school--;
                    teacherGeneral.total -=18;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.addPblPrepare": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {

                        if (teacher.pbl_prepare < 3) {
                            teacher.pbl_prepare++;
                            teacher.total+=3;

                            let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                            teacherGeneral.pbl_prepare++;
                            teacherGeneral.total +=3;
                            TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                        }
                        else {
                            throw new Meteor.Error('limit-error','Артық ұпай берілмейді')
                        }

                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.reducePblPrepare": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.pbl_prepare--;
                    teacher.total -=3;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.pbl_prepare--;
                    teacherGeneral.total -=3;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.addPblPresent": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.pbl_present++;
                    teacher.total +=5;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.pbl_prepare++;
                    teacherGeneral.total +=5;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },
    "Teacher.reducePblPresent": function(teacher_id, academicYear, quarter, week) {
        if(Roles.userIsInRole(this.userId,['school'])) {
            let school = Schools.findOne({userId: this.userId})
            if(!school) school = Schools.findOne({coordinatorId:this.userId})

                let teacher = TeacherPerformaRating.findOne({_id:teacher_id, academicYear:academicYear, quarter:quarter, week:week})

                if (teacher) {
                    teacher.pbl_present--;
                    teacher.total -=5;
                    TeacherPerformaRating.update({_id:teacher_id},{$set:teacher})

                    let teacherGeneral = TeacherPerformaRating.findOne({teacherId:parseInt(teacher.teacherId), academicYear:academicYear, quarter:quarter, week:'all'})

                    teacherGeneral.pbl_prepare--;
                    teacherGeneral.total -=5;
                    TeacherPerformaRating.update({teacherId:parseInt(teacher.teacherId),academicYear:academicYear, quarter:quarter, week:'all'},{$set:teacherGeneral})
                }

        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

})
