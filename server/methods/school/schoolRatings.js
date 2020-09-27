import { Meteor } from 'meteor/meteor';
Meteor.methods({
    "ubtAssessments.Insert": function(details) {
      if(Roles.userIsInRole(this.userId,'school') ||
          Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            if(school) {
                sameDetails = SchoolAssessments.findOne({
                    academicYear: details.academicYear,
                    event: 'ubt',
                    month: details.month,
                    date: details.date,
                    detail: details.detail,
                    schoolId: school.schoolId
                });
                if (!sameDetails) {

                    details.schoolId = school.schoolId
                    SchoolAssessments.insert(details)

                    let totalRating = {
                        schoolId: details.schoolId,
                        month: 'annual',
                        academicYear: details.academicYear,
                        ubt: 0,
                        ubt_points: 0,
                        total_points: 0
                    }

                    let rating = {
                        schoolId: details.schoolId,
                        month: details.month,
                        academicYear: details.academicYear,
                        ubt: 0,
                        ubt_points: 0,
                        total_points: 0
                        }

                    let sameRating = SchoolPerformaRatings.findOne({academicYear:rating.academicYear,month:rating.month,schoolId:rating.schoolId})

                    if (sameRating) {

                        if (sameRating.ubt == undefined) {
                            sameRating.ubt = 0;
                            sameRating.ubt_points = 0;

                            if (sameRating.total_points == undefined) {
                                sameRating.total_points = 0;
                            }

                            sameRating.ubt++;
                            sameRating.ubt_points += 3;
                            sameRating.total_points +=3

                        } else {

                            sameRating.ubt++;
                            sameRating.ubt_points += 3;
                            sameRating.total_points +=3
                        }

                        SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                    } else {
                        rating.ubt++;
                        rating.ubt_points += 3;
                        rating.total_points +=3

                        SchoolPerformaRatings.insert(rating)
                    }

                    let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:totalRating.academicYear,month:totalRating.month,schoolId:totalRating.schoolId})

                    if (sameTotalRating) {

                        if (sameTotalRating.ubt == undefined) {
                            sameTotalRating.ubt = 0;
                            sameTotalRating.ubt_points = 0;

                            if (sameTotalRating.total_points == undefined) {
                                sameTotalRating.total_points = 0;
                            }

                            sameTotalRating.ubt++;
                            sameTotalRating.ubt_points += 3;
                            sameTotalRating.total_points += 3;
                        } else {

                            sameTotalRating.ubt++;
                            sameTotalRating.ubt_points += 3;
                            sameTotalRating.total_points += 3;
                        }

                        SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

                    } else {
                        totalRating.ubt++;
                        totalRating.ubt_points += 3;
                        totalRating.total_points += 3;

                        SchoolPerformaRatings.insert(totalRating)
                    }
                } else {
                        throw new Meteor.Error(403, 'Duplicate error');
                    }
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "ubtAssessments.Delete": function(id) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let assessment = SchoolAssessments.findOne({_id:id})
            if(assessment) {
                SchoolAssessments.remove({_id:id})

                let sameRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:assessment.month,schoolId:assessment.schoolId})

                    if (sameRating.ubt <= 0) {
                        sameRating.ubt = 0;
                        sameRating.ubt_points = 0;

                    } else {
                        sameRating.ubt--;
                        sameRating.ubt_points -= 3;
                        sameRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:'annual',schoolId:assessment.schoolId})

                    if (sameTotalRating.ubt <= 0) {
                        sameTotalRating.ubt = 0;
                        sameTotalRating.ubt_points = 0;

                    } else {
                        sameTotalRating.ubt--;
                        sameTotalRating.ubt_points -= 3;
                        sameTotalRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "meetingAssessments.Insert": function(details) {
      if(Roles.userIsInRole(this.userId,'school') ||
          Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            if(school) {
                sameDetails = SchoolAssessments.findOne({
                    academicYear: details.academicYear,
                    event: 'meeting',
                    month: details.month,
                    date: details.date,
                    detail: details.detail,
                    schoolId: school.schoolId
                });
                if (!sameDetails) {

                    details.schoolId = school.schoolId
                    SchoolAssessments.insert(details)

                    let totalRating = {
                        schoolId: details.schoolId,
                        month: 'annual',
                        academicYear: details.academicYear,
                        meeting: 0,
                        meeting_points: 0,
                        total_points: 0
                    }

                    let rating = {
                        schoolId: details.schoolId,
                        month: details.month,
                        academicYear: details.academicYear,
                        meeting: 0,
                        meeting_points: 0,
                        total_points: 0
                        }

                    let sameRating = SchoolPerformaRatings.findOne({academicYear:rating.academicYear,month:rating.month,schoolId:rating.schoolId})

                    if (sameRating) {

                        if (sameRating.meeting == undefined) {
                            sameRating.meeting = 0;
                            sameRating.meeting_points = 0;

                            if (sameRating.total_points == undefined) {
                                sameRating.total_points = 0;
                            }

                            sameRating.meeting++;
                            sameRating.meeting_points += 9;
                            sameRating.total_points += 9;
                        } else {
                            sameRating.meeting++;
                            sameRating.meeting_points += 9 ;
                            sameRating.total_points += 9;
                        }

                        SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                    } else {
                        rating.meeting++;
                        rating.meeting_points += 9;
                        rating.total_points += 9;

                        SchoolPerformaRatings.insert(rating)
                    }

                    let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:totalRating.academicYear,month:totalRating.month,schoolId:totalRating.schoolId})

                    if (sameTotalRating) {

                        if (sameTotalRating.meeting == undefined) {
                            sameTotalRating.meeting = 0;
                            sameTotalRating.meeting_points = 0;

                            if (sameTotalRating.total_points == undefined) {
                                sameTotalRating.total_points = 0;
                            }

                            sameTotalRating.meeting++;
                            sameTotalRating.meeting_points += 9;
                            sameTotalRating.total_points += 9;
                        } else {
                            sameTotalRating.meeting++;
                            sameTotalRating.meeting_points += 9 ;
                            sameTotalRating.total_points += 9;
                        }

                        SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

                    } else {
                        totalRating.meeting++;
                        totalRating.meeting_points += 9;
                        totalRating.total_points += 9;

                        SchoolPerformaRatings.insert(totalRating)
                    }

                } else {
                        throw new Meteor.Error(403, 'Duplicate error');
                    }
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "meetingAssessments.Delete": function(id) {
      if(Roles.userIsInRole(this.userId,'school') ||
          Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let assessment = SchoolAssessments.findOne({_id:id})
            if(assessment) {
                SchoolAssessments.remove({_id:id})

                let sameRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:assessment.month,schoolId:assessment.schoolId})

                    if (sameRating.meeting <= 0) {
                        sameRating.meeting = 0;
                        sameRating.meeting_points = 0;
                    } else {
                        sameRating.meeting--;
                        sameRating.meeting_points -= 9;
                        sameRating.total_points -= 9;
                    }

                    SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:'annual',schoolId:assessment.schoolId})

                    if (sameTotalRating.meeting <= 0) {
                        sameTotalRating.meeting = 0;
                        sameTotalRating.meeting_points = 0;
                    } else {
                        sameTotalRating.meeting--;
                        sameTotalRating.meeting_points -= 9;
                        sameTotalRating.total_points -= 9;
                    }

                    SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "seminarAssessments.Insert": function(details) {
        if(Roles.userIsInRole(this.userId,'school') ||
            Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            if(school) {
                sameDetails = SchoolAssessments.findOne({
                    academicYear: details.academicYear,
                    event: 'seminar',
                    month: details.month,
                    date: details.date,
                    detail: details.detail,
                    schoolId: school.schoolId
                });
                if (!sameDetails) {

                    details.schoolId = school.schoolId
                    SchoolAssessments.insert(details)

                    let totalRating = {
                        schoolId: details.schoolId,
                        month: 'annual',
                        academicYear: details.academicYear,
                        seminar: 0,
                        seminar_points: 0,
                        total_points: 0
                    }

                    let rating = {
                        schoolId: details.schoolId,
                        month: details.month,
                        academicYear: details.academicYear,
                        seminar: 0,
                        seminar_points: 0,
                        total_points: 0
                        }

                    let sameRating = SchoolPerformaRatings.findOne({academicYear:rating.academicYear,month:rating.month,schoolId:rating.schoolId})

                    if (sameRating) {

                        if (sameRating.seminar == undefined) {
                            sameRating.seminar = 0;
                            sameRating.seminar_points = 0;

                            if (sameRating.total_points == undefined) {
                                sameRating.total_points = 0;
                            }

                            sameRating.seminar++;
                            sameRating.seminar_points += 3;
                            sameRating.total_points += 3
                        } else {
                            sameRating.seminar++;
                            sameRating.seminar_points += 3;
                            sameRating.total_points += 3
                        }

                        SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                    } else {
                        rating.seminar++;
                        rating.seminar_points += 3;
                        rating.total_points += 3

                        SchoolPerformaRatings.insert(rating)
                    }

                    let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:totalRating.academicYear,month:totalRating.month,schoolId:totalRating.schoolId})

                    if (sameTotalRating) {

                        if (sameTotalRating.seminar == undefined) {
                            sameTotalRating.seminar = 0;
                            sameTotalRating.seminar_points = 0;

                            if (sameTotalRating.total_points == undefined) {
                                sameTotalRating.total_points = 0;
                            }

                            sameTotalRating.seminar++;
                            sameTotalRating.seminar_points += 3;
                            sameTotalRating.total_points += 3;
                        } else {
                            sameTotalRating.seminar++;
                            sameTotalRating.seminar_points += 3;
                            sameTotalRating.total_points += 3;
                        }

                        SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

                    } else {
                        totalRating.seminar++;
                        totalRating.seminar_points += 3;
                        totalRating.total_points += 3;

                        SchoolPerformaRatings.insert(totalRating)
                    }

                } else {
                        throw new Meteor.Error(403, 'Duplicate error');
                    }
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "seminarAssessments.Delete": function(id) {
        if(Roles.userIsInRole(this.userId,'school') ||
            Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let assessment = SchoolAssessments.findOne({_id:id})
            if(assessment) {
                SchoolAssessments.remove({_id:id})

                let sameRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:assessment.month,schoolId:assessment.schoolId})

                    if (sameRating.seminar <= 0) {
                        sameRating.seminar = 0;
                        sameRating.seminar_points = 0;
                    } else {
                        sameRating.seminar--;
                        sameRating.seminar_points -= 3;
                        sameRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:'annual',schoolId:assessment.schoolId})

                    if (sameTotalRating.seminar <= 0) {
                        sameTotalRating.seminar = 0;
                        sameTotalRating.seminar_points = 0;
                    } else {
                        sameTotalRating.seminar--;
                        sameTotalRating.seminar_points -= 3;
                        sameTotalRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "indoorEventAssessments.Insert": function(details) {
        if(Roles.userIsInRole(this.userId,'school') ||
          Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            if(school) {
                sameDetails = SchoolAssessments.findOne({
                    academicYear: details.academicYear,
                    event: 'indoorEvent',
                    month: details.month,
                    date: details.date,
                    detail: details.detail,
                    schoolId: school.schoolId
                });
                if (!sameDetails) {

                    details.schoolId = school.schoolId
                    SchoolAssessments.insert(details)

                    let totalRating = {
                        schoolId: details.schoolId,
                        month: 'annual',
                        academicYear: details.academicYear,
                        indoorEvent: 0,
                        indoorEvent_points: 0,
                        total_points: 0
                    }

                    let rating = {
                        schoolId: details.schoolId,
                        month: details.month,
                        academicYear: details.academicYear,
                        indoorEvent: 0,
                        indoorEvent_points: 0,
                        total_points: 0
                        }

                    let sameRating = SchoolPerformaRatings.findOne({academicYear:rating.academicYear,month:rating.month,schoolId:rating.schoolId})

                    if (sameRating) {

                        if (sameRating.indoorEvent == undefined) {
                            sameRating.indoorEvent = 0;
                            sameRating.indoorEvent_points = 0;

                            if (sameRating.total_points == undefined) {
                                sameRating.total_points = 0;
                            }

                            sameRating.indoorEvent++;
                            sameRating.indoorEvent_points += 3;
                            sameRating.total_points += 3
                        } else {
                            sameRating.indoorEvent++;
                            sameRating.indoorEvent_points += 3;
                            sameRating.total_points += 3
                        }

                        SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                    } else {
                        rating.indoorEvent++;
                        rating.indoorEvent_points += 3;
                        rating.total_points += 3

                        SchoolPerformaRatings.insert(rating)
                    }

                    let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:totalRating.academicYear,month:totalRating.month,schoolId:totalRating.schoolId})

                    if (sameTotalRating) {

                        if (sameTotalRating.indoorEvent == undefined) {
                            sameTotalRating.indoorEvent = 0;
                            sameTotalRating.indoorEvent_points = 0;

                            if (sameTotalRating.total_points == undefined) {
                                sameTotalRating.total_points = 0;
                            }

                            sameTotalRating.indoorEvent++;
                            sameTotalRating.indoorEvent_points += 3;
                            sameTotalRating.total_points += 3;
                        } else {
                            sameTotalRating.indoorEvent++;
                            sameTotalRating.indoorEvent_points += 3;
                            sameTotalRating.total_points += 3;
                        }

                        SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

                    } else {
                        totalRating.indoorEvent++;
                        totalRating.indoorEvent_points += 3;
                        totalRating.total_points += 3;

                        SchoolPerformaRatings.insert(totalRating)
                    }

                } else {
                        throw new Meteor.Error(403, 'Duplicate error');
                    }
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "indoorEventAssessments.Delete": function(id) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let assessment = SchoolAssessments.findOne({_id:id})
            if(assessment) {
                SchoolAssessments.remove({_id:id})

                let sameRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:assessment.month,schoolId:assessment.schoolId})

                    if (sameRating.indoorEvent <= 0) {
                        sameRating.indoorEvent = 0;
                        sameRating.indoorEvent_points = 0;
                    } else {
                        sameRating.indoorEvent--;
                        sameRating.indoorEvent_points -= 3;
                        sameRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:'annual',schoolId:assessment.schoolId})

                    if (sameTotalRating.indoorEvent <= 0) {
                        sameTotalRating.indoorEvent = 0;
                        sameTotalRating.indoorEvent_points = 0;
                    } else {
                        sameTotalRating.indoorEvent--;
                        sameTotalRating.indoorEvent_points -= 3;
                        sameTotalRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "pblAssessments.Insert": function(details) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            if(school) {
                sameDetails = SchoolAssessments.findOne({
                    academicYear: details.academicYear,
                    event: 'pbl',
                    month: details.month,
                    start_date: details.start_date,
                    end_date: details.end_date,
                    detail: details.detail,
                    schoolId: school.schoolId
                });
                if (!sameDetails) {

                    details.schoolId = school.schoolId
                    SchoolAssessments.insert(details)

                    let totalRating = {
                        schoolId: details.schoolId,
                        month: 'annual',
                        academicYear: details.academicYear,
                        pbl: 0,
                        pbl_points: 0,
                        total_points: 0
                    }

                    let rating = {
                        schoolId: details.schoolId,
                        month: details.month,
                        academicYear: details.academicYear,
                        pbl: 0,
                        pbl_points: 0,
                        total_points: 0
                        }

                    let sameRating = SchoolPerformaRatings.findOne({academicYear:rating.academicYear,month:rating.month,schoolId:rating.schoolId})

                    if (sameRating) {

                        if (sameRating.pbl == undefined) {
                            sameRating.pbl = 0;
                            sameRating.pbl_points = 0;

                            if (sameRating.total_points == undefined) {
                                sameRating.total_points = 0;
                            }

                            sameRating.pbl++;
                            sameRating.pbl_points += 3;
                            sameRating.total_points += 3
                        } else {
                            sameRating.pbl++;
                            sameRating.pbl_points += 3;
                            sameRating.total_points += 3
                        }

                        SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                    } else {
                        rating.pbl++;
                        rating.pbl_points += 3;
                        rating.total_points += 3

                        SchoolPerformaRatings.insert(rating)
                    }

                    let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:totalRating.academicYear,month:totalRating.month,schoolId:totalRating.schoolId})

                    if (sameTotalRating) {

                        if (sameTotalRating.pbl == undefined) {
                            sameTotalRating.pbl = 0;
                            sameTotalRating.pbl_points = 0;

                            if (sameTotalRating.total_points == undefined) {
                                sameTotalRating.total_points = 0;
                            }

                            sameTotalRating.pbl++;
                            sameTotalRating.pbl_points += 3;
                            sameTotalRating.total_points += 3;
                        } else {
                            sameTotalRating.pbl++;
                            sameTotalRating.pbl_points += 3;
                            sameTotalRating.total_points += 3;
                        }

                        SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

                    } else {
                        totalRating.pbl++;
                        totalRating.pbl_points += 3;
                        totalRating.total_points += 3;

                        SchoolPerformaRatings.insert(totalRating)
                    }

                } else {
                        throw new Meteor.Error(403, 'Duplicate error');
                    }
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "pblAssessments.Delete": function(id) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let assessment = SchoolAssessments.findOne({_id:id})
            if(assessment) {
                SchoolAssessments.remove({_id:id})

                let sameRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:assessment.month,schoolId:assessment.schoolId})

                    if (sameRating.pbl <= 0) {
                        sameRating.pbl = 0;
                        sameRating.pbl_points = 0;
                    } else {
                        sameRating.pbl--;
                        sameRating.pbl_points -= 3;
                        sameRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:'annual',schoolId:assessment.schoolId})

                    if (sameTotalRating.pbl <= 0) {
                        sameTotalRating.pbl = 0;
                        sameTotalRating.pbl_points = 0;
                    } else {
                        sameTotalRating.pbl--;
                        sameTotalRating.pbl_points -= 3;
                        sameTotalRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "olympiadAssessments.Insert": function(details) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            if(school) {
                sameDetails = SchoolAssessments.findOne({
                    academicYear: details.academicYear,
                    event: 'olympiad',
                    month: details.month,
                    date: details.date,
                    detail: details.detail,
                    schoolId: school.schoolId
                });
                if (!sameDetails) {

                    details.schoolId = school.schoolId
                    SchoolAssessments.insert(details)

                    let totalRating = {
                        schoolId: details.schoolId,
                        month: 'annual',
                        academicYear: details.academicYear,
                        olympiad: 0,
                        olympiad_points: 0,
                        total_points: 0
                    }

                    let rating = {
                        schoolId: details.schoolId,
                        month: details.month,
                        academicYear: details.academicYear,
                        olympiad: 0,
                        olympiad_points: 0,
                        total_points: 0
                        }

                    let sameRating = SchoolPerformaRatings.findOne({academicYear:rating.academicYear,month:rating.month,schoolId:rating.schoolId})

                    if (sameRating) {

                        if (sameRating.olympiad == undefined) {
                            sameRating.olympiad = 0;
                            sameRating.olympiad_points = 0;

                            if (sameRating.total_points == undefined) {
                                sameRating.total_points = 0;
                            }

                            sameRating.olympiad++;
                            sameRating.olympiad_points += 3;
                            sameRating.total_points += 3
                        } else {
                            sameRating.olympiad++;
                            sameRating.olympiad_points += 3;
                            sameRating.total_points += 3
                        }

                        SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                    } else {
                        rating.olympiad++;
                        rating.olympiad_points += 3;
                        rating.total_points += 3

                        SchoolPerformaRatings.insert(rating)
                    }

                    let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:totalRating.academicYear,month:totalRating.month,schoolId:totalRating.schoolId})

                    if (sameTotalRating) {

                        if (sameTotalRating.olympiad == undefined) {
                            sameTotalRating.olympiad = 0;
                            sameTotalRating.olympiad_points = 0;

                            if (sameTotalRating.total_points == undefined) {
                                sameTotalRating.total_points = 0;
                            }

                            sameTotalRating.olympiad++;
                            sameTotalRating.olympiad_points += 3;
                            sameTotalRating.total_points += 3;
                        } else {
                            sameTotalRating.olympiad++;
                            sameTotalRating.olympiad_points += 3;
                            sameTotalRating.total_points += 3;
                        }

                        SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

                    } else {
                        totalRating.olympiad++;
                        totalRating.olympiad_points += 3;
                        totalRating.total_points += 3;

                        SchoolPerformaRatings.insert(totalRating)
                    }

                } else {
                        throw new Meteor.Error(403, 'Duplicate error');
                    }
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "olympiadAssessments.Delete": function(id) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let assessment = SchoolAssessments.findOne({_id:id})
            if(assessment) {
                SchoolAssessments.remove({_id:id})

                let sameRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:assessment.month,schoolId:assessment.schoolId})

                    if (sameRating.olympiad <= 0) {
                        sameRating.olympiad = 0;
                        sameRating.olympiad_points = 0;
                    } else {
                        sameRating.olympiad--;
                        sameRating.olympiad_points -= 3;
                        sameRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:'annual',schoolId:assessment.schoolId})

                    if (sameTotalRating.olympiad <= 0) {
                        sameTotalRating.olympiad = 0;
                        sameTotalRating.olympiad_points = 0;
                    } else {
                        sameTotalRating.olympiad--;
                        sameTotalRating.olympiad_points -= 3;
                        sameTotalRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "subject_weekAssessments.Insert": function(details) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            if(school) {
                sameDetails = SchoolAssessments.findOne({
                    academicYear: details.academicYear,
                    event: 'subject_week',
                    month: details.month,
                    date: details.date,
                    detail: details.detail,
                    schoolId: school.schoolId
                });
                if (!sameDetails) {

                    details.schoolId = school.schoolId
                    SchoolAssessments.insert(details)

                    let totalRating = {
                        schoolId: details.schoolId,
                        month: 'annual',
                        academicYear: details.academicYear,
                        subject_week: 0,
                        subject_week_points: 0,
                        total_points: 0
                    }

                    let rating = {
                        schoolId: details.schoolId,
                        month: details.month,
                        academicYear: details.academicYear,
                        subject_week: 0,
                        subject_week_points: 0,
                        total_points: 0
                        }

                    let sameRating = SchoolPerformaRatings.findOne({academicYear:rating.academicYear,month:rating.month,schoolId:rating.schoolId})

                    if (sameRating) {

                        if (sameRating.subject_week == undefined) {
                            sameRating.subject_week = 0;
                            sameRating.subject_week_points = 0;

                            if (sameRating.total_points == undefined) {
                                sameRating.total_points = 0;
                            }

                            sameRating.subject_week++;
                            sameRating.subject_week_points += 3;
                            sameRating.total_points += 3
                        } else {
                            sameRating.subject_week++;
                            sameRating.subject_week_points += 3;
                            sameRating.total_points += 3
                        }

                        SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                    } else {
                        rating.subject_week++;
                        rating.subject_week_points += 3;
                        rating.total_points += 3

                        SchoolPerformaRatings.insert(rating)
                    }

                    let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:totalRating.academicYear,month:totalRating.month,schoolId:totalRating.schoolId})

                    if (sameTotalRating) {

                        if (sameTotalRating.subject_week == undefined) {
                            sameTotalRating.subject_week = 0;
                            sameTotalRating.subject_week_points = 0;

                            if (sameTotalRating.total_points == undefined) {
                                sameTotalRating.total_points = 0;
                            }

                            sameTotalRating.subject_week++;
                            sameTotalRating.subject_week_points += 3;
                            sameTotalRating.total_points += 3;
                        } else {
                            sameTotalRating.subject_week++;
                            sameTotalRating.subject_week_points += 3;
                            sameTotalRating.total_points += 3;
                        }

                        SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

                    } else {
                        totalRating.subject_week++;
                        totalRating.subject_week_points += 3;
                        totalRating.total_points += 3;

                        SchoolPerformaRatings.insert(totalRating)
                    }

                } else {
                        throw new Meteor.Error(403, 'Duplicate error');
                    }
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "subject_weekAssessments.Delete": function(id) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let assessment = SchoolAssessments.findOne({_id:id})
            if(assessment) {
                SchoolAssessments.remove({_id:id})

                let sameRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:assessment.month,schoolId:assessment.schoolId})

                    if (sameRating.subject_week <= 0) {
                        sameRating.subject_week = 0;
                        sameRating.subject_week_points = 0;
                    } else {
                        sameRating.subject_week--;
                        sameRating.subject_week_points -= 3;
                        sameRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:'annual',schoolId:assessment.schoolId})

                    if (sameTotalRating.subject_week <= 0) {
                        sameTotalRating.subject_week = 0;
                        sameTotalRating.subject_week_points = 0;
                    } else {
                        sameTotalRating.subject_week--;
                        sameTotalRating.subject_week_points -= 3;
                        sameTotalRating.total_points -= 3;
                    }

                    SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "outdoor_eventAssessments.Insert": function(details) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            if(school) {
                sameDetails = SchoolAssessments.findOne({
                    academicYear: details.academicYear,
                    event: 'outdoor_event',
                    month: details.month,
                    date: details.date,
                    scope: details.scope,
                    detail: details.detail,
                    schoolId: school.schoolId
                });
                if (!sameDetails) {

                    details.schoolId = school.schoolId
                    SchoolAssessments.insert(details)

                    let totalRating = {
                        schoolId: details.schoolId,
                        month: 'annual',
                        academicYear: details.academicYear,
                        scope: details.scope,
                        outdoor_event: 0,
                        outdoor_event_points: 0,
                        total_points: 0
                    }

                    let rating = {
                        schoolId: details.schoolId,
                        month: details.month,
                        academicYear: details.academicYear,
                        scope: details.scope,
                        outdoor_event: 0,
                        outdoor_event_points: 0,
                        total_points: 0
                        }

                    let sameRating = SchoolPerformaRatings.findOne({academicYear:rating.academicYear,month:rating.month,schoolId:rating.schoolId})

                    if (sameRating) {

                        if (sameRating.outdoor_event == undefined) {
                            sameRating.outdoor_event = 0;
                            sameRating.outdoor_event_points = 0;

                            if (sameRating.total_points == undefined) {
                                sameRating.total_points = 0;
                            }

                            if (rating.scope == 'city') {
                                sameRating.outdoor_event++;
                                sameRating.outdoor_event_points += 9;
                                sameRating.total_points += 9
                            } else if (rating.scope == 'republic') {
                                sameRating.outdoor_event++;
                                sameRating.outdoor_event_points += 18;
                                sameRating.total_points += 18
                            }

                        } else {

                            if (rating.scope == 'city') {
                                sameRating.outdoor_event++;
                                sameRating.outdoor_event_points += 9;
                                sameRating.total_points += 9
                            } else if (rating.scope == 'republic') {
                                sameRating.outdoor_event++;
                                sameRating.outdoor_event_points += 18;
                                sameRating.total_points += 18
                            }
                        }

                        SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                    } else {

                        if (rating.scope == 'city') {
                                rating.outdoor_event++;
                                rating.outdoor_event_points += 9;
                                rating.total_points += 9
                        } else if (rating.scope == 'republic') {
                                rating.outdoor_event++;
                                rating.outdoor_event_points += 18;
                                rating.total_points += 18
                        }

                        SchoolPerformaRatings.insert(rating)
                    }

                    let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:totalRating.academicYear,month:totalRating.month,schoolId:totalRating.schoolId})

                    if (sameTotalRating) {

                        if (sameTotalRating.outdoor_event == undefined) {
                            sameTotalRating.outdoor_event = 0;
                            sameTotalRating.outdoor_event_points = 0;

                            if (sameTotalRating.total_points == undefined) {
                                sameTotalRating.total_points = 0;
                            }

                            if (totalRating.scope == 'city') {
                                sameTotalRating.outdoor_event++;
                                sameTotalRating.outdoor_event_points += 9;
                                sameTotalRating.total_points += 9
                            } else if (totalRating.scope == 'republic') {
                                sameTotalRating.outdoor_event++;
                                sameTotalRating.outdoor_event_points += 18;
                                sameTotalRating.total_points += 18
                            }

                        } else {

                            if (totalRating.scope == 'city') {
                                sameTotalRating.outdoor_event++;
                                sameTotalRating.outdoor_event_points += 9;
                                sameTotalRating.total_points += 9
                            } else if (totalRating.scope == 'republic') {
                                sameTotalRating.outdoor_event++;
                                sameTotalRating.outdoor_event_points += 18;
                                sameTotalRating.total_points += 18
                            }
                        }

                        SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

                    } else {

                        if (totalRating.scope == 'city') {
                                totalRating.outdoor_event++;
                                totalRating.outdoor_event_points += 9;
                                totalRating.total_points += 9
                        } else if (totalRating.scope == 'republic') {
                                totalRating.outdoor_event++;
                                totalRating.outdoor_event_points += 18;
                                totalRating.total_points += 18
                        }

                        SchoolPerformaRatings.insert(totalRating)
                    }

                } else {
                        throw new Meteor.Error(403, 'Duplicate error');
                    }
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "outdoor_eventAssessments.Delete": function(id) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let assessment = SchoolAssessments.findOne({_id:id})
            if(assessment) {
                SchoolAssessments.remove({_id:id})

                let sameRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:assessment.month,schoolId:assessment.schoolId})

                    if (sameRating.outdoor_event <= 0) {
                        sameRating.outdoor_event = 0;
                        sameRating.outdoor_event_points = 0;
                    } else {
                        if (assessment.scope == 'city') {
                            sameRating.outdoor_event--;
                            sameRating.outdoor_event_points -= 9;
                            sameRating.total_points -= 9
                        } else if (assessment.scope == 'republic') {
                                sameRating.outdoor_event--;
                                sameRating.outdoor_event_points -= 18;
                                sameRating.total_points -= 18
                        }
                    }

                    SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:'annual',schoolId:assessment.schoolId})

                    if (sameTotalRating.outdoor_event <= 0) {
                        sameTotalRating.outdoor_event = 0;
                        sameTotalRating.outdoor_event_points = 0;
                    } else {
                        if (assessment.scope == 'city') {
                            sameTotalRating.outdoor_event--;
                            sameTotalRating.outdoor_event_points -= 9;
                            sameTotalRating.total_points -= 9
                        } else if (assessment.scope == 'republic') {
                                sameTotalRating.outdoor_event--;
                                sameTotalRating.outdoor_event_points -= 18;
                                sameTotalRating.total_points -= 18
                        }
                    }

                    SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "admin_participateAssessments.Insert": function(details) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){

            let school = Schools.findOne({userId:this.userId})

            if(school) {
                sameDetails = SchoolAssessments.findOne({
                    academicYear: details.academicYear,
                    event: details.event,
                    month: details.month,
                    date: details.date,
                    scope: details.scope,
                    detail: details.detail,
                    schoolId: school.schoolId
                });
                if (!sameDetails) {

                    details.schoolId = school.schoolId
                    SchoolAssessments.insert(details)

                    let totalRating = {
                        schoolId: details.schoolId,
                        month: 'annual',
                        academicYear: details.academicYear,
                        scope: details.scope,
                        admin_participate: 0,
                        admin_participate_points: 0,
                        total_points: 0
                    }

                    let rating = {
                        schoolId: details.schoolId,
                        month: details.month,
                        academicYear: details.academicYear,
                        scope: details.scope,
                        admin_participate: 0,
                        admin_participate_points: 0,
                        total_points: 0
                        }

                    let sameRating = SchoolPerformaRatings.findOne({academicYear:rating.academicYear,month:rating.month,schoolId:rating.schoolId})

                    if (sameRating) {

                        if (sameRating.admin_participate == undefined) {
                            sameRating.admin_participate = 0;
                            sameRating.admin_participate_points = 0;

                            if (sameRating.total_points == undefined) {
                                sameRating.total_points = 0;
                            }

                            if (rating.scope == 'vice-principal') {
                                sameRating.admin_participate++;
                                sameRating.admin_participate_points += 0.5;
                                sameRating.total_points += 0.5;
                            } else if (rating.scope == 'principal') {
                                sameRating.admin_participate++;
                                sameRating.admin_participate_points += 1;
                                sameRating.total_points += 1;
                            }

                        } else {

                            if (rating.scope == 'vice-principal') {
                                sameRating.admin_participate++;
                                sameRating.admin_participate_points += 0.5;
                                sameRating.total_points += 0.5;
                            } else if (rating.scope == 'principal') {
                                sameRating.admin_participate++;
                                sameRating.admin_participate_points += 1;
                                sameRating.total_points += 1;
                            }
                        }

                        SchoolPerformaRatings.update({_id:sameRating._id},{$set:{admin_participate:sameRating.admin_participate,admin_participate_points:sameRating.admin_participate_points,total_points:sameRating.total_points}})

                    } else {

                        if (rating.scope == 'vice-principal') {
                                rating.admin_participate++;
                                rating.admin_participate_points += 0.5;
                                rating.total_points += 0.5;
                        } else if (rating.scope == 'principal') {
                                rating.admin_participate++;
                                rating.admin_participate_points += 1;
                                rating.total_points += 1;
                        }

                        SchoolPerformaRatings.insert(rating)
                    }

                    let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:totalRating.academicYear,month:totalRating.month,schoolId:totalRating.schoolId})

                    if (sameTotalRating) {

                        if (sameTotalRating.admin_participate == undefined) {
                            sameTotalRating.admin_participate = 0;
                            sameTotalRating.admin_participate_points = 0;

                            if (sameTotalRating.total_points == undefined) {
                                sameTotalRating.total_points = 0;
                            }

                            if (totalRating.scope == 'vice-principal') {
                                sameTotalRating.admin_participate++;
                                sameTotalRating.admin_participate_points += 0.5;
                                sameTotalRating.total_points += 0.5;
                            } else if (totalRating.scope == 'principal') {
                                sameTotalRating.admin_participate++;
                                sameTotalRating.admin_participate_points += 1;
                                sameTotalRating.total_points += 1;
                            }

                        } else {

                            if (totalRating.scope == 'vice-principal') {
                                sameTotalRating.admin_participate++;
                                sameTotalRating.admin_participate_points += 0.5;
                                sameTotalRating.total_points += 0.5;
                            } else if (totalRating.scope == 'principal') {
                                sameTotalRating.admin_participate++;
                                sameTotalRating.admin_participate_points += 1;
                                sameTotalRating.total_points += 1;
                            }
                        }

                        SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})

                    } else {

                        if (totalRating.scope == 'vice-principal') {
                                totalRating.admin_participate++;
                                totalRating.admin_participate_points += 0.5;
                                totalRating.total_points += 0.5;
                        } else if (totalRating.scope == 'principal') {
                                totalRating.admin_participate++;
                                totalRating.admin_participate_points += 1;
                                totalRating.total_points += 1;
                        }

                        SchoolPerformaRatings.insert(totalRating)
                    }

                } else {
                        throw new Meteor.Error(403, 'Duplicate error');
                    }
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    },

    "admin_participateAssessments.Delete": function(id) {
        if(Roles.userIsInRole(this.userId,'school') ||
    Roles.userIsInRole(this.userId,'schoolCoordinator')){
            let assessment = SchoolAssessments.findOne({_id:id})
            if(assessment) {
                SchoolAssessments.remove({_id:id})

                let sameRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:assessment.month,schoolId:assessment.schoolId})

                    if (sameRating.admin_participate <= 0) {
                        sameRating.admin_participate = 0;
                        sameRating.admin_participate_points = 0;
                    } else {
                        if (assessment.scope == 'vice-principal') {
                            sameRating.admin_participate--;
                            sameRating.admin_participate_points -= 0.5;
                            sameRating.total_points -= 0.5;
                        } else if (assessment.scope == 'principal') {
                                sameRating.admin_participate--;
                                sameRating.admin_participate_points -= 1;
                                sameRating.total_points -= 1;
                        }
                    }

                    SchoolPerformaRatings.update({_id:sameRating._id},{$set:sameRating})

                let sameTotalRating = SchoolPerformaRatings.findOne({academicYear:assessment.academicYear,month:'annual',schoolId:assessment.schoolId})

                    if (sameTotalRating.admin_participate <= 0) {
                        sameTotalRating.admin_participate = 0;
                        sameTotalRating.admin_participate_points = 0;
                    } else {
                        if (assessment.scope == 'vice-principal') {
                            sameTotalRating.admin_participate--;
                            sameTotalRating.admin_participate_points -= 0.5;
                            sameTotalRating.total_points -= 0.5;
                        } else if (assessment.scope == 'principal') {
                                sameTotalRating.admin_participate--;
                                sameTotalRating.admin_participate_points -= 1;
                                sameTotalRating.total_points -= 1;
                        }
                    }

                    SchoolPerformaRatings.update({_id:sameTotalRating._id},{$set:sameTotalRating})
            }
        } else {
            throw new Meteor.Error('auth-error','School rights required.')
        }
    }

})
