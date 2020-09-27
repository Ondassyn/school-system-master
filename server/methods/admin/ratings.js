import { Meteor } from 'meteor/meteor';
import { calculateTotalGradeSubjectOlymp } from "../../modules/olympiadRating/olympiadRating"
import { calculateTotalGradeSubjectJoba } from "../../modules/jobaRating/jobaRating"

Meteor.methods({
	"calculateSchoolRating": function() {
        results = SchoolPerformaRatings.find().fetch()
        _.each(results,(result) => {
            result.total_points = (result.ubt_points || 0) + (result.seminar_points || 0) + (result.meeting_points || 0) + (result.outdoor_event_points || 0) + (result.indoorEvent_points || 0) + (result.pbl_points || 0) + (result.olympiad_points || 0) + (result.subject_week_points || 0) + (result.admin_participate_points || 0)

            SchoolPerformaRatings.update({_id:result._id},{$set:{total_points:result.total_points}})
        })
    },

    "deleteEvent": function(event_id) {
        console.log(event_id)
        assess = SchoolAssessments.findOne({_id:event_id})
        schoolRating = SchoolPerformaRatings.findOne({schoolId:assess.schoolId,month:assess.month})
        schoolAnnualRating = SchoolPerformaRatings.findOne({schoolId:assess.schoolId,month:'annual'})

        if (assess.event == 'meeting') {
        	SchoolAssessments.remove(assess);
        	schoolRating.meeting--;
        	schoolRating.meeting_points -= 9;
        	schoolRating.total_points -= 9;

        	schoolAnnualRating.meeting--;
        	schoolAnnualRating.meeting_points -= 9;
        	schoolAnnualRating.total_points -= 9;

        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:schoolRating.month},{$set:schoolRating});
        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:'annual'},{$set:schoolAnnualRating});
        }
        if (assess.event == 'seminar') {
        	SchoolAssessments.remove(assess);
        	schoolRating.seminar--;
        	schoolRating.seminar_points -= 3;
        	schoolRating.total_points -= 3;

        	schoolAnnualRating.meeting--;
        	schoolAnnualRating.meeting_points -= 3;
        	schoolAnnualRating.total_points -= 3;

        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:schoolRating.month},{$set:schoolRating});
        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:'annual'},{$set:schoolAnnualRating});
        }
        if (assess.event == 'indoorEvent') {
        	SchoolAssessments.remove(assess);
        	schoolRating.indoorEvent--;
        	schoolRating.indoorEvent_points -= 3;
        	schoolRating.total_points -= 3;

        	schoolAnnualRating.indoorEvent--;
        	schoolAnnualRating.indoorEvent_points -= 3;
        	schoolAnnualRating.total_points -= 3;

        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:schoolRating.month},{$set:schoolRating});
        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:'annual'},{$set:schoolAnnualRating});
        }
        if (assess.event == 'ubt') {
        	SchoolAssessments.remove(assess);
        	schoolRating.ubt--;
        	schoolRating.ubt_points -= 3;
        	schoolRating.total_points -= 3;

        	schoolAnnualRating.ubt--;
        	schoolAnnualRating.ubt_points -= 3;
        	schoolAnnualRating.total_points -= 3;

        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:schoolRating.month},{$set:schoolRating});
        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:'annual'},{$set:schoolAnnualRating});
        }
        if (assess.event == 'pbl') {
        	SchoolAssessments.remove(assess);
        	schoolRating.pbl--;
        	schoolRating.pbl_points -= 3;
        	schoolRating.total_points -= 3;

        	schoolAnnualRating.pbl--;
        	schoolAnnualRating.pbl_points -= 3;
        	schoolAnnualRating.total_points -= 3;

        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:schoolRating.month},{$set:schoolRating});
        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:'annual'},{$set:schoolAnnualRating});
        }
        if (assess.event == 'olympiad') {
        	SchoolAssessments.remove(assess);
        	schoolRating.olympiad--;
        	schoolRating.olympiad_points -= 3;
        	schoolRating.total_points -= 3;

        	schoolAnnualRating.olympiad--;
        	schoolAnnualRating.olympiad_points -= 3;
        	schoolAnnualRating.total_points -= 3;

        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:schoolRating.month},{$set:schoolRating});
        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:'annual'},{$set:schoolAnnualRating});
        }
        if (assess.event == 'subject_week') {
        	SchoolAssessments.remove(assess);
        	schoolRating.subject_week--;
        	schoolRating.subject_week_points -= 3;
        	schoolRating.total_points -= 3;

        	schoolAnnualRating.subject_week--;
        	schoolAnnualRating.subject_week_points -= 3;
        	schoolAnnualRating.total_points -= 3;

        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:schoolRating.month},{$set:schoolRating});
        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:'annual'},{$set:schoolAnnualRating});
        }
        if (assess.event == 'outdoor_event') {
        	SchoolAssessments.remove(assess);

        	if (assess.scope == 'city') {
                schoolRating.outdoor_event--;
                schoolRating.outdoor_event_points -= 9;
                schoolRating.total_points -= 9

                schoolAnnualRating.outdoor_event--;
        		schoolAnnualRating.outdoor_event_points -= 9;
        		schoolAnnualRating.total_points -= 9;
            }
            else if (assess.scope == 'republic') {
                schoolRating.outdoor_event--;
                schoolRating.outdoor_event_points -= 18;
                schoolRating.total_points -= 18;

                schoolAnnualRating.outdoor_event--;
        		schoolAnnualRating.outdoor_event_points -= 18;
        		schoolAnnualRating.total_points -= 18;
            }

        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:schoolRating.month},{$set:schoolRating});
        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:'annual'},{$set:schoolAnnualRating});
        }
        if (assess.event == 'admin_participate') {
        	SchoolAssessments.remove(assess);

        	if (assess.scope == 'vice-principal') {
                schoolRating.admin_participate--;
                schoolRating.admin_participate_points -= 0.5;
                schoolRating.total_points -= 0.5;

                schoolAnnualRating.admin_participate--;
        		schoolAnnualRating.admin_participate_points -= 0.5;
        		schoolAnnualRating.total_points -= 0.5;
            }
            else if (assess.scope == 'principal') {
                schoolRating.admin_participate--;
                schoolRating.admin_participate_points -= 1;
                schoolRating.total_points -= 1;

                schoolAnnualRating.admin_participate--;
        		schoolAnnualRating.admin_participate_points -= 1;
        		schoolAnnualRating.total_points -= 1;
            }

        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:schoolRating.month},{$set:schoolRating});
        	SchoolPerformaRatings.update({schoolId:schoolRating.schoolId,month:'annual'},{$set:schoolAnnualRating});
        }
    },

	"calculateOlympiadRating": function(academicYear) {
        schools = Schools.find().fetch()
        _.each(schools,(school) => {

        	let grades = ['7','8','9','10','11']

        	// average olympiad rating for all grades and all subjects
        	let olympiadGradeTotalRating = {
		                    schoolId:school.schoolId,
		                    academicYear:academicYear,
		                    subjectId: 'all',
		                    grade:'all',
		                    regBronzeOlymp: 0,
		                    regSilverOlymp: 0,
		                    regGoldOlymp: 0,
		                    regTotalOlymp: 0,
		                    natBronzeOlymp: 0,
		                    natSilverOlymp: 0,
		                    natGoldOlymp: 0,
												natTotalOlymp: 0,
												regJunBronzeOlymp: 0,
		                    regJunSilverOlymp: 0,
		                    regJunGoldOlymp: 0,
		                    regJunTotalOlymp: 0,
		                    natJunBronzeOlymp: 0,
		                    natJunSilverOlymp: 0,
		                    natJunGoldOlymp: 0,
		                    natJunTotalOlymp: 0,
												jautBronzeOlymp: 0,
		                    jautSilverOlymp: 0,
		                    jautGoldOlymp: 0,
												jautTotalOlymp: 0,
												mendBronzeOlymp: 0,
		                    mendSilverOlymp: 0,
		                    mendGoldOlymp: 0,
												mendTotalOlymp: 0,
												aphoBronzeOlymp: 0,
		                    aphoSilverOlymp: 0,
		                    aphoGoldOlymp: 0,
							aphoTotalOlymp: 0,
							allrusBronzeOlymp: 0,
		                    allrusSilverOlymp: 0,
		                    allrusGoldOlymp: 0,
							allrusTotalOlymp: 0,
							eugBronzeOlymp: 0,
		                    eugSilverOlymp: 0,
		                    eugGoldOlymp: 0,
							eugTotalOlymp: 0,
							wcBronzeOlymp: 0,
		                    wcSilverOlymp: 0,
		                    wcGoldOlymp: 0,
							wcTotalOlymp: 0,
							bmoBronzeOlymp: 0,
		                    bmoSilverOlymp: 0,
		                    bmoGoldOlymp: 0,
							bmoTotalOlymp: 0,
							jbmoBronzeOlymp: 0,
		                    jbmoSilverOlymp: 0,
		                    jbmoGoldOlymp: 0,
							jbmoTotalOlymp: 0,
							tuyBronzeOlymp: 0,
		                    tuySilverOlymp: 0,
		                    tuyGoldOlymp: 0,
							tuyTotalOlymp: 0,
							imoBronzeOlymp: 0,
		                    imoSilverOlymp: 0,
		                    imoGoldOlymp: 0,
							imoTotalOlymp: 0,
							iranBronzeOlymp: 0,
		                    iranSilverOlymp: 0,
		                    iranGoldOlymp: 0,
							iranTotalOlymp: 0,
							apmoBronzeOlymp: 0,
		                    apmoSilverOlymp: 0,
		                    apmoGoldOlymp: 0,
							apmoTotalOlymp: 0,
							swBronzeOlymp: 0,
		                    swSilverOlymp: 0,
		                    swGoldOlymp: 0,
							swTotalOlymp: 0,
							megaBronzeOlymp: 0,
		                    megaSilverOlymp: 0,
		                    megaGoldOlymp: 0,
							megaTotalOlymp: 0,
							chemBronzeOlymp: 0,
		                    chemSilverOlymp: 0,
		                    chemGoldOlymp: 0,
							chemTotalOlymp: 0,
							apioBronzeOlymp: 0,
		                    apioSilverOlymp: 0,
		                    apioGoldOlymp: 0,
							apioTotalOlymp: 0,
							euinfBronzeOlymp: 0,
		                    euinfSilverOlymp: 0,
		                    euinfGoldOlymp: 0,
							euinfTotalOlymp: 0,
							ijsoBronzeOlymp: 0,
		                    ijsoSilverOlymp: 0,
		                    ijsoGoldOlymp: 0,
		                    ijsoTotalOlymp: 0,
		                    regBronzeProject: 0,
		                    regSilverProject: 0,
		                    regGoldProject: 0,
		                    regTotalProject: 0,
		                    natBronzeProject: 0,
		                    natSilverProject: 0,
		                    natGoldProject: 0,
		                    natTotalProject: 0,
		                    interBronzeProject: 0,
		                    interSilverProject: 0,
		                    interGoldProject: 0,
		                    interTotalProject: 0,
		                }
		    var cGrade = 0;
        	_.each(grades, (grade) => {

	        	var cTotal = 0;
	        	// calculates average olympiad rating for each grade and all subjects
	        	let olympiadTotalRating = {
		                    schoolId:school.schoolId,
		                    academicYear:academicYear,
		                    subjectId: 'all',
		                    grade:grade,
		                    regBronzeOlymp: 0,
		                    regSilverOlymp: 0,
		                    regGoldOlymp: 0,
		                    regTotalOlymp: 0,
		                    natBronzeOlymp: 0,
		                    natSilverOlymp: 0,
		                    natGoldOlymp: 0,
							natTotalOlymp: 0,
							regJunBronzeOlymp: 0,
		                    regJunSilverOlymp: 0,
		                    regJunGoldOlymp: 0,
		                    regJunTotalOlymp: 0,
		                    natJunBronzeOlymp: 0,
		                    natJunSilverOlymp: 0,
		                    natJunGoldOlymp: 0,
		                    natJunTotalOlymp: 0,
							jautBronzeOlymp: 0,
		                    jautSilverOlymp: 0,
		                    jautGoldOlymp: 0,
							jautTotalOlymp: 0,
							mendBronzeOlymp: 0,
		                    mendSilverOlymp: 0,
		                    mendGoldOlymp: 0,
							mendTotalOlymp: 0,
							aphoBronzeOlymp: 0,
		                    aphoSilverOlymp: 0,
		                    aphoGoldOlymp: 0,
							aphoTotalOlymp: 0,
							allrusBronzeOlymp: 0,
		                    allrusSilverOlymp: 0,
		                    allrusGoldOlymp: 0,
							allrusTotalOlymp: 0,
							eugBronzeOlymp: 0,
		                    eugSilverOlymp: 0,
		                    eugGoldOlymp: 0,
							eugTotalOlymp: 0,
							wcBronzeOlymp: 0,
		                    wcSilverOlymp: 0,
		                    wcGoldOlymp: 0,
							wcTotalOlymp: 0,
							bmoBronzeOlymp: 0,
		                    bmoSilverOlymp: 0,
		                    bmoGoldOlymp: 0,
							bmoTotalOlymp: 0,
							jbmoBronzeOlymp: 0,
		                    jbmoSilverOlymp: 0,
		                    jbmoGoldOlymp: 0,
							jbmoTotalOlymp: 0,
							tuyBronzeOlymp: 0,
		                    tuySilverOlymp: 0,
		                    tuyGoldOlymp: 0,
							tuyTotalOlymp: 0,
							imoBronzeOlymp: 0,
		                    imoSilverOlymp: 0,
		                    imoGoldOlymp: 0,
							imoTotalOlymp: 0,
							iranBronzeOlymp: 0,
		                    iranSilverOlymp: 0,
		                    iranGoldOlymp: 0,
							iranTotalOlymp: 0,
							apmoBronzeOlymp: 0,
		                    apmoSilverOlymp: 0,
		                    apmoGoldOlymp: 0,
							apmoTotalOlymp: 0,
							swBronzeOlymp: 0,
		                    swSilverOlymp: 0,
		                    swGoldOlymp: 0,
							swTotalOlymp: 0,
							megaBronzeOlymp: 0,
		                    megaSilverOlymp: 0,
		                    megaGoldOlymp: 0,
							megaTotalOlymp: 0,
							chemBronzeOlymp: 0,
		                    chemSilverOlymp: 0,
		                    chemGoldOlymp: 0,
							chemTotalOlymp: 0,
							apioBronzeOlymp: 0,
		                    apioSilverOlymp: 0,
		                    apioGoldOlymp: 0,
							apioTotalOlymp: 0,
							euinfBronzeOlymp: 0,
		                    euinfSilverOlymp: 0,
		                    euinfGoldOlymp: 0,
							euinfTotalOlymp: 0,
							ijsoBronzeOlymp: 0,
		                    ijsoSilverOlymp: 0,
		                    ijsoGoldOlymp: 0,
		                    ijsoTotalOlymp: 0,
		                    regBronzeProject: 0,
		                    regSilverProject: 0,
		                    regGoldProject: 0,
		                    regTotalProject: 0,
		                    natBronzeProject: 0,
		                    natSilverProject: 0,
		                    natGoldProject: 0,
		                    natTotalProject: 0,
		                    interBronzeProject: 0,
		                    interSilverProject: 0,
		                    interGoldProject: 0,
		                    interTotalProject: 0,
		                }

	        	subjects = KboCourses.find().fetch()
	        	_.each(subjects,(subject) => {

	        		var c = 0;
	        		// average olympiad rating for each grade and each subject
		            let olympiadRating = {
		                    schoolId:school.schoolId,
		                    academicYear:academicYear,
		                    subjectId: subject.subjectId,
		                    grade:grade,
		                    regBronzeOlymp: 0,
		                    regSilverOlymp: 0,
		                    regGoldOlymp: 0,
		                    regTotalOlymp: 0,
		                    natBronzeOlymp: 0,
		                    natSilverOlymp: 0,
		                    natGoldOlymp: 0,
							natTotalOlymp: 0,
							regJunBronzeOlymp: 0,
		                    regJunSilverOlymp: 0,
		                    regJunGoldOlymp: 0,
		                    regJunTotalOlymp: 0,
		                    natJunBronzeOlymp: 0,
		                    natJunSilverOlymp: 0,
		                    natJunGoldOlymp: 0,
		                    natJunTotalOlymp: 0,
							jautBronzeOlymp: 0,
		                    jautSilverOlymp: 0,
		                    jautGoldOlymp: 0,
							jautTotalOlymp: 0,
							mendBronzeOlymp: 0,
		                    mendSilverOlymp: 0,
		                    mendGoldOlymp: 0,
							mendTotalOlymp: 0,
							aphoBronzeOlymp: 0,
		                    aphoSilverOlymp: 0,
		                    aphoGoldOlymp: 0,
							aphoTotalOlymp: 0,
							allrusBronzeOlymp: 0,
		                    allrusSilverOlymp: 0,
		                    allrusGoldOlymp: 0,
							allrusTotalOlymp: 0,
							eugBronzeOlymp: 0,
		                    eugSilverOlymp: 0,
		                    eugGoldOlymp: 0,
							eugTotalOlymp: 0,
							wcBronzeOlymp: 0,
		                    wcSilverOlymp: 0,
		                    wcGoldOlymp: 0,
							wcTotalOlymp: 0,
							bmoBronzeOlymp: 0,
		                    bmoSilverOlymp: 0,
		                    bmoGoldOlymp: 0,
							bmoTotalOlymp: 0,
							jbmoBronzeOlymp: 0,
		                    jbmoSilverOlymp: 0,
		                    jbmoGoldOlymp: 0,
							jbmoTotalOlymp: 0,
							tuyBronzeOlymp: 0,
		                    tuySilverOlymp: 0,
		                    tuyGoldOlymp: 0,
							tuyTotalOlymp: 0,
							imoBronzeOlymp: 0,
		                    imoSilverOlymp: 0,
		                    imoGoldOlymp: 0,
							imoTotalOlymp: 0,
							iranBronzeOlymp: 0,
		                    iranSilverOlymp: 0,
		                    iranGoldOlymp: 0,
							iranTotalOlymp: 0,
							apmoBronzeOlymp: 0,
		                    apmoSilverOlymp: 0,
		                    apmoGoldOlymp: 0,
							apmoTotalOlymp: 0,
							swBronzeOlymp: 0,
		                    swSilverOlymp: 0,
		                    swGoldOlymp: 0,
							swTotalOlymp: 0,
							megaBronzeOlymp: 0,
		                    megaSilverOlymp: 0,
		                    megaGoldOlymp: 0,
							megaTotalOlymp: 0,
							chemBronzeOlymp: 0,
		                    chemSilverOlymp: 0,
		                    chemGoldOlymp: 0,
							chemTotalOlymp: 0,
							apioBronzeOlymp: 0,
		                    apioSilverOlymp: 0,
		                    apioGoldOlymp: 0,
							apioTotalOlymp: 0,
							euinfBronzeOlymp: 0,
		                    euinfSilverOlymp: 0,
		                    euinfGoldOlymp: 0,
							euinfTotalOlymp: 0,
							ijsoBronzeOlymp: 0,
		                    ijsoSilverOlymp: 0,
		                    ijsoGoldOlymp: 0,
		                    ijsoTotalOlymp: 0,
		                    regBronzeProject: 0,
		                    regSilverProject: 0,
		                    regGoldProject: 0,
		                    regTotalProject: 0,
		                    natBronzeProject: 0,
		                    natSilverProject: 0,
		                    natGoldProject: 0,
		                    natTotalProject: 0,
		                    interBronzeProject: 0,
		                    interSilverProject: 0,
		                    interGoldProject: 0,
		                    interTotalProject: 0,
		                }

		            results = OlympiadResults.find({schoolId:school.schoolId, academicYear:academicYear, subjectId:subject.subjectId, attendedFor:grade}).fetch()
		            _.each(results,(result) => {

		                if (result.olympiadType == 'science') {
		                	if (result.olympiadRegion == 'regional') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.regBronzeOlymp++
		                			olympiadTotalRating.regBronzeOlymp++
		                			olympiadGradeTotalRating.regBronzeOlymp++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.regSilverOlymp++
		                			olympiadTotalRating.regSilverOlymp++
		                			olympiadGradeTotalRating.regSilverOlymp++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.regGoldOlymp++
		                			olympiadTotalRating.regGoldOlymp++
		                			olympiadGradeTotalRating.regGoldOlymp++
		                		}
		                		olympiadRating.regTotalOlymp++;
		                		olympiadTotalRating.regTotalOlymp++
		                		olympiadGradeTotalRating.regTotalOlymp++ // all, all


										}
										if (result.olympiadRegion == 'regionalJunior') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.regJunBronzeOlymp++
		                			olympiadTotalRating.regJunBronzeOlymp++
		                			olympiadGradeTotalRating.regJunBronzeOlymp++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.regJunSilverOlymp++
		                			olympiadTotalRating.regJunSilverOlymp++
		                			olympiadGradeTotalRating.regJunSilverOlymp++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.regJunGoldOlymp++
		                			olympiadTotalRating.regJunGoldOlymp++
		                			olympiadGradeTotalRating.regJunGoldOlymp++
		                		}
		                		olympiadRating.regJunTotalOlymp++;
		                		olympiadTotalRating.regJunTotalOlymp++
		                		olympiadGradeTotalRating.regJunTotalOlymp++
		                	}

							if (result.olympiadRegion == 'national') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.natBronzeOlymp++
		                			olympiadTotalRating.natBronzeOlymp++
		                			olympiadGradeTotalRating.natBronzeOlymp++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.natSilverOlymp++
		                			olympiadTotalRating.natSilverOlymp++
		                			olympiadGradeTotalRating.natSilverOlymp++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.natGoldOlymp++
		                			olympiadTotalRating.natSilverOlymp++
		                			olympiadGradeTotalRating.natSilverOlymp++
		                		}
		                		olympiadRating.natTotalOlymp++;
		                		olympiadTotalRating.natTotalOlymp++
		                		olympiadGradeTotalRating.natTotalOlymp++
							}

							if (result.olympiadRegion == 'nationalJunior') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.natJunBronzeOlymp++
		                			olympiadTotalRating.natJunBronzeOlymp++
		                			olympiadGradeTotalRating.natJunBronzeOlymp++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.natJunSilverOlymp++
		                			olympiadTotalRating.natJunSilverOlymp++
		                			olympiadGradeTotalRating.natJunSilverOlymp++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.natJunGoldOlymp++
		                			olympiadTotalRating.natJunSilverOlymp++
		                			olympiadGradeTotalRating.natJunSilverOlymp++
		                		}
		                		olympiadRating.natJunTotalOlymp++;
		                		olympiadTotalRating.natJunTotalOlymp++
		                		olympiadGradeTotalRating.natJunTotalOlymp++
		                	}

		                	if (result.olympiadRegion == 'international') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.jautBronzeOlymp++
		                			olympiadTotalRating.jautBronzeOlymp++
									olympiadGradeTotalRating.jautBronzeOlymp++
									olympiadRating.mendBronzeOlymp++
		                			olympiadTotalRating.mendBronzeOlymp++
									olympiadGradeTotalRating.mendBronzeOlymp++
									olympiadRating.aphoBronzeOlymp++
		                			olympiadTotalRating.aphoBronzeOlymp++
									olympiadGradeTotalRating.aphoBronzeOlymp++
									olympiadRating.allrusBronzeOlymp++
		                			olympiadTotalRating.allrusBronzeOlymp++
									olympiadGradeTotalRating.allrusBronzeOlymp++
									olympiadRating.eugBronzeOlymp++
		                			olympiadTotalRating.eugBronzeOlymp++
									olympiadGradeTotalRating.eugBronzeOlymp++
									olympiadRating.wcBronzeOlymp++
		                			olympiadTotalRating.wcBronzeOlymp++
									olympiadGradeTotalRating.wcBronzeOlymp++
									olympiadRating.bmoBronzeOlymp++
		                			olympiadTotalRating.bmoBronzeOlymp++
									olympiadGradeTotalRating.bmoBronzeOlymp++
									olympiadRating.jbmoBronzeOlymp++
		                			olympiadTotalRating.jbmoBronzeOlymp++
									olympiadGradeTotalRating.jbmoBronzeOlymp++
									olympiadRating.tuyBronzeOlymp++
		                			olympiadTotalRating.tuyBronzeOlymp++
									olympiadGradeTotalRating.tuyBronzeOlymp++
									olympiadRating.imoBronzeOlymp++
		                			olympiadTotalRating.imoBronzeOlymp++
									olympiadGradeTotalRating.imoBronzeOlymp++
									olympiadRating.iranBronzeOlymp++
		                			olympiadTotalRating.iranBronzeOlymp++
									olympiadGradeTotalRating.iranBronzeOlymp++
									olympiadRating.apmoBronzeOlymp++
		                			olympiadTotalRating.apmoBronzeOlymp++
									olympiadGradeTotalRating.apmoBronzeOlymp++
									olympiadRating.swBronzeOlymp++
		                			olympiadTotalRating.swBronzeOlymp++
									olympiadGradeTotalRating.swBronzeOlymp++
									olympiadRating.megaBronzeOlymp++
		                			olympiadTotalRating.megaBronzeOlymp++
									olympiadGradeTotalRating.megaBronzeOlymp++
									olympiadRating.chemBronzeOlymp++
		                			olympiadTotalRating.chemBronzeOlymp++
									olympiadGradeTotalRating.chemBronzeOlymp++
									olympiadRating.apioBronzeOlymp++
		                			olympiadTotalRating.apioBronzeOlymp++
									olympiadGradeTotalRating.apioBronzeOlymp++
									olympiadRating.euinfBronzeOlymp++
		                			olympiadTotalRating.euinfBronzeOlymp++
									olympiadGradeTotalRating.euinfBronzeOlymp++
									olympiadRating.ijsoBronzeOlymp++
		                			olympiadTotalRating.ijsoBronzeOlymp++
		                			olympiadGradeTotalRating.ijsoBronzeOlymp++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.jautSilverOlymp++
		                			olympiadTotalRating.jautSilverOlymp++
									olympiadGradeTotalRating.jautSilverOlymp++
									olympiadRating.mendSilverOlymp++
		                			olympiadTotalRating.mendSilverOlymp++
									olympiadGradeTotalRating.mendSilverOlymp++
									olympiadRating.aphoSilverOlymp++
		                			olympiadTotalRating.aphoSilverOlymp++
									olympiadGradeTotalRating.aphoSilverOlymp++
									olympiadRating.allrusSilverOlymp++
		                			olympiadTotalRating.allrusSilverOlymp++
									olympiadGradeTotalRating.allrusSilverOlymp++
									olympiadRating.eugSilverOlymp++
		                			olympiadTotalRating.eugSilverOlymp++
									olympiadGradeTotalRating.eugSilverOlymp++
									olympiadRating.wcSilverOlymp++
		                			olympiadTotalRating.wcSilverOlymp++
									olympiadGradeTotalRating.wcSilverOlymp++
									olympiadRating.bmoSilverOlymp++
		                			olympiadTotalRating.bmoSilverOlymp++
									olympiadGradeTotalRating.bmoSilverOlymp++
									olympiadRating.jbmoSilverOlymp++
		                			olympiadTotalRating.jbmoSilverOlymp++
									olympiadGradeTotalRating.jbmoSilverOlymp++
									olympiadRating.tuySilverOlymp++
		                			olympiadTotalRating.tuySilverOlymp++
									olympiadGradeTotalRating.tuySilverOlymp++
									olympiadRating.imoSilverOlymp++
		                			olympiadTotalRating.imoSilverOlymp++
									olympiadGradeTotalRating.imoSilverOlymp++
									olympiadRating.iranSilverOlymp++
		                			olympiadTotalRating.iranSilverOlymp++
									olympiadGradeTotalRating.iranSilverOlymp++
									olympiadRating.apmoSilverOlymp++
		                			olympiadTotalRating.apmoSilverOlymp++
									olympiadGradeTotalRating.apmoSilverOlymp++
									olympiadRating.swSilverOlymp++
		                			olympiadTotalRating.swSilverOlymp++
									olympiadGradeTotalRating.swSilverOlymp++
									olympiadRating.megaSilverOlymp++
		                			olympiadTotalRating.megaSilverOlymp++
									olympiadGradeTotalRating.megaSilverOlymp++
									olympiadRating.chemSilverOlymp++
		                			olympiadTotalRating.chemSilverOlymp++
									olympiadGradeTotalRating.chemSilverOlymp++
									olympiadRating.apioSilverOlymp++
		                			olympiadTotalRating.apioSilverOlymp++
									olympiadGradeTotalRating.apioSilverOlymp++
									olympiadRating.euinfSilverOlymp++
		                			olympiadTotalRating.euinfSilverOlymp++
									olympiadGradeTotalRating.euinfSilverOlymp++
									olympiadRating.ijsoSilverOlymp++
		                			olympiadTotalRating.ijsoSilverOlymp++
		                			olympiadGradeTotalRating.ijsoSilverOlymp++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.jautGoldOlymp++
		                			olympiadTotalRating.jautGoldOlymp++
									olympiadGradeTotalRating.jautGoldOlymp++
									olympiadRating.mendGoldOlymp++
		                			olympiadTotalRating.mendGoldOlymp++
									olympiadGradeTotalRating.mendGoldOlymp++
									olympiadRating.aphoGoldOlymp++
		                			olympiadTotalRating.aphoGoldOlymp++
									olympiadGradeTotalRating.aphoGoldOlymp++
									olympiadRating.allrusGoldOlymp++
		                			olympiadTotalRating.allrusGoldOlymp++
									olympiadGradeTotalRating.allrusGoldOlymp++
									olympiadRating.eugGoldOlymp++
		                			olympiadTotalRating.eugGoldOlymp++
									olympiadGradeTotalRating.eugGoldOlymp++
									olympiadRating.wcGoldOlymp++
		                			olympiadTotalRating.wcGoldOlymp++
									olympiadGradeTotalRating.wcGoldOlymp++
									olympiadRating.bmoGoldOlymp++
		                			olympiadTotalRating.bmoGoldOlymp++
									olympiadGradeTotalRating.bmoGoldOlymp++
									olympiadRating.jbmoGoldOlymp++
		                			olympiadTotalRating.jbmoGoldOlymp++
									olympiadGradeTotalRating.jbmoGoldOlymp++
									olympiadRating.tuyGoldOlymp++
		                			olympiadTotalRating.tuyGoldOlymp++
									olympiadGradeTotalRating.tuyGoldOlymp++
									olympiadRating.imoGoldOlymp++
		                			olympiadTotalRating.imoGoldOlymp++
									olympiadGradeTotalRating.imoGoldOlymp++
									olympiadRating.iranGoldOlymp++
		                			olympiadTotalRating.iranGoldOlymp++
									olympiadGradeTotalRating.iranGoldOlymp++
									olympiadRating.apmoGoldOlymp++
		                			olympiadTotalRating.apmoGoldOlymp++
									olympiadGradeTotalRating.apmoGoldOlymp++
									olympiadRating.swGoldOlymp++
		                			olympiadTotalRating.swGoldOlymp++
									olympiadGradeTotalRating.swGoldOlymp++
									olympiadRating.megaGoldOlymp++
		                			olympiadTotalRating.megaGoldOlymp++
									olympiadGradeTotalRating.megaGoldOlymp++
									olympiadRating.chemGoldOlymp++
		                			olympiadTotalRating.chemGoldOlymp++
									olympiadGradeTotalRating.chemGoldOlymp++
									olympiadRating.apioGoldOlymp++
		                			olympiadTotalRating.apioGoldOlymp++
									olympiadGradeTotalRating.apioGoldOlymp++
									olympiadRating.euinfGoldOlymp++
		                			olympiadTotalRating.euinfGoldOlymp++
									olympiadGradeTotalRating.euinfGoldOlymp++
									olympiadRating.ijsoGoldOlymp++
		                			olympiadTotalRating.ijsoGoldOlymp++
		                			olympiadGradeTotalRating.ijsoGoldOlymp++
		                		}
								olympiadRating.jautTotalOlymp++
								olympiadTotalRating.jautTotalOlymp++
								olympiadGradeTotalRating.jautTotalOlymp++
								olympiadRating.mendTotalOlymp++
								olympiadTotalRating.mendTotalOlymp++
								olympiadGradeTotalRating.mendTotalOlymp++
								olympiadRating.aphoTotalOlymp++
								olympiadTotalRating.aphoTotalOlymp++
								olympiadGradeTotalRating.aphoTotalOlymp++
								olympiadRating.allrusTotalOlymp++
								olympiadTotalRating.allrusTotalOlymp++
								olympiadGradeTotalRating.allrusTotalOlymp++
								olympiadRating.eugTotalOlymp++
								olympiadTotalRating.eugTotalOlymp++
								olympiadGradeTotalRating.eugTotalOlymp++
								olympiadRating.wcTotalOlymp++
								olympiadTotalRating.wcTotalOlymp++
								olympiadGradeTotalRating.wcTotalOlymp++
								olympiadRating.bmoTotalOlymp++
								olympiadTotalRating.bmoTotalOlymp++
								olympiadGradeTotalRating.bmoTotalOlymp++
								olympiadRating.jbmoTotalOlymp++
								olympiadTotalRating.jbmoTotalOlymp++
								olympiadGradeTotalRating.jbmoTotalOlymp++
								olympiadRating.tuyTotalOlymp++
								olympiadTotalRating.tuyTotalOlymp++
								olympiadGradeTotalRating.tuyTotalOlymp++
								olympiadRating.imoTotalOlymp++
								olympiadTotalRating.imoTotalOlymp++
								olympiadGradeTotalRating.imoTotalOlymp++
								olympiadRating.iranTotalOlymp++
								olympiadTotalRating.iranTotalOlymp++
								olympiadGradeTotalRating.iranTotalOlymp++
								olympiadRating.apmoTotalOlymp++
								olympiadTotalRating.apmoTotalOlymp++
								olympiadGradeTotalRating.apmoTotalOlymp++
								olympiadRating.swTotalOlymp++
								olympiadTotalRating.swTotalOlymp++
								olympiadGradeTotalRating.swTotalOlymp++
								olympiadRating.megaTotalOlymp++
								olympiadTotalRating.megaTotalOlymp++
								olympiadGradeTotalRating.megaTotalOlymp++
								olympiadRating.chemTotalOlymp++
								olympiadTotalRating.chemTotalOlymp++
								olympiadGradeTotalRating.chemTotalOlymp++
								olympiadRating.apioTotalOlymp++
								olympiadTotalRating.apioTotalOlymp++
								olympiadGradeTotalRating.apioTotalOlymp++
								olympiadRating.euinfTotalOlymp++
								olympiadTotalRating.euinfTotalOlymp++
								olympiadGradeTotalRating.euinfTotalOlymp++
								olympiadRating.ijsoTotalOlymp++
								olympiadTotalRating.ijsoTotalOlymp++
								olympiadGradeTotalRating.ijsoTotalOlymp++
		                	}
		                	c++;
		                	cTotal++;
		                	cGrade++;
		                }
		                else {
		                	if (result.olympiadRegion == 'regional') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.regBronzeProject++
		                			olympiadTotalRating.regBronzeProject++
		                			olympiadGradeTotalRating.regBronzeProject++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.regSilverProject++
		                			olympiadTotalRating.regSilverProject++
		                			olympiadGradeTotalRating.regSilverProject++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.regGoldProject++
		                			olympiadTotalRating.regGoldProject++
		                			olympiadGradeTotalRating.regGoldProject++
		                		}
		                		olympiadRating.regTotalProject++;
		                		olympiadTotalRating.regTotalProject++;
		                		olympiadGradeTotalRating.regTotalProject++;
		                	}

							if (result.olympiadRegion == 'national') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.natBronzeProject++
		                			olympiadTotalRating.natBronzeProject++
		                			olympiadGradeTotalRating.natBronzeProject++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.natSilverProject++
		                			olympiadTotalRating.natSilverProject++
		                			olympiadGradeTotalRating.natSilverProject++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.natGoldProject++
		                			olympiadTotalRating.natGoldProject++
		                			olympiadGradeTotalRating.natGoldProject++
		                		}
		                		olympiadRating.natTotalProject++;
		                		olympiadTotalRating.natTotalProject++;
		                		olympiadGradeTotalRating.natTotalProject++;
		                	}

		                	if (result.olympiadRegion == 'international') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.interBronzeProject++
		                			olympiadTotalRating.interBronzeProject++
		                			olympiadGradeTotalRating.interBronzeProject++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.interSilverProject++
		                			olympiadTotalRating.interSilverProject++
		                			olympiadGradeTotalRating.interSilverProject++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.interGoldProject++
		                			olympiadTotalRating.interGoldProject++
		                			olympiadGradeTotalRating.interGoldProject++
		                		}
		                		olympiadRating.interTotalProject++;
		                		olympiadTotalRating.interTotalProject++;
		                		olympiadGradeTotalRating.interTotalProject++;
		                	}
		                	c++;
		                	cTotal++;
		                	cGrade++;
		                }
		            })

		            let sameRating = OlympiadRatings.findOne({academicYear:academicYear, schoolId:school.schoolId, subjectId:subject.subjectId, grade:grade})

		            if (sameRating) {
		                OlympiadRatings.update({_id:sameRating._id},{$set:olympiadRating})
		            }
		            else {
		            	if (c > 0)
		            		OlympiadRatings.insert(olympiadRating)
		            }
		        })

				let sameTotalRating = OlympiadRatings.findOne({academicYear:academicYear, schoolId:school.schoolId, subjectId:'all', grade:grade})

		            if (sameTotalRating) {
		                OlympiadRatings.update({_id:sameTotalRating._id},{$set:olympiadTotalRating})
		            }
		            else {
		            	if (cTotal > 0)
		            		OlympiadRatings.insert(olympiadTotalRating)
		            }
		    })

			olympiadGradeTotalRating["totalPoint"] = olympiadGradeTotalRating.regGoldOlymp*4 + olympiadGradeTotalRating.regSilverOlymp*2 + olympiadGradeTotalRating.regBronzeOlymp;

			let sameGradeTotalRating = OlympiadRatings.findOne({academicYear:academicYear, schoolId:school.schoolId, subjectId:'all', grade:'all'})

		            if (sameGradeTotalRating) {
		                OlympiadRatings.update({_id:sameGradeTotalRating._id},{$set:olympiadGradeTotalRating})
		            }
		            else {
		            	if (cGrade > 0)
		            		OlympiadRatings.insert(olympiadGradeTotalRating)
		            }

       		// calculates average olympiad rating for all grades but each subject
		    calculateTotalGradeSubjectOlymp(school.schoolId,academicYear)

        })
	},

	"calculateJobaRating": function(academicYear) {
        schools = Schools.find().fetch()
        _.each(schools,(school) => {

        	let grades = ['7','8','9','10','11']

        	// average olympiad rating for all grades and all subjects
        	let jobaGradeTotalRating = {
		                    schoolId:school.schoolId,
		                    academicYear:academicYear,
		                    subjectId: 'all',
		                    grade:'all',
		                    regBronzeJoba: 0,
		                    regSilverJoba: 0,
		                    regGoldJoba: 0,
		                    regTotalJoba: 0,
		                    natBronzeJoba: 0,
		                    natSilverJoba: 0,
		                    natGoldJoba: 0,
		                    natTotalJoba: 0,
		                    interBronzeJoba: 0,
		                    interSilverJoba: 0,
		                    interGoldJoba: 0,
		                    interTotalJoba: 0,
		                    regBronzeProject: 0,
		                    regSilverProject: 0,
		                    regGoldProject: 0,
		                    regTotalProject: 0,
		                    natBronzeProject: 0,
		                    natSilverProject: 0,
		                    natGoldProject: 0,
		                    natTotalProject: 0,
		                    interBronzeProject: 0,
		                    interSilverProject: 0,
		                    interGoldProject: 0,
		                    interTotalProject: 0,
		                }
		    var cGrade = 0;
        	_.each(grades, (grade) => {

	        	var cTotal = 0;
	        	// calculates average olympiad rating for each grade and all subjects
	        	let jobaTotalRating = {
		                    schoolId:school.schoolId,
		                    academicYear:academicYear,
		                    subjectId: 'all',
		                    grade:grade,
		                    regBronzeJoba: 0,
		                    regSilverJoba: 0,
		                    regGoldJoba: 0,
		                    regTotalJoba: 0,
		                    natBronzeJoba: 0,
		                    natSilverJoba: 0,
		                    natGoldJoba: 0,
		                    natTotalJoba: 0,
		                    interBronzeJoba: 0,
		                    interSilverJoba: 0,
		                    interGoldJoba: 0,
		                    interTotalJoba: 0,
		                    regBronzeProject: 0,
		                    regSilverProject: 0,
		                    regGoldProject: 0,
		                    regTotalProject: 0,
		                    natBronzeProject: 0,
		                    natSilverProject: 0,
		                    natGoldProject: 0,
		                    natTotalProject: 0,
		                    interBronzeProject: 0,
		                    interSilverProject: 0,
		                    interGoldProject: 0,
		                    interTotalProject: 0,
		                }

	        	subjects = KboCourses.find().fetch()
	        	_.each(subjects,(subject) => {

	        		var c = 0;
	        		// average olympiad rating for each grade and each subject
		            let jobaRating = {
		                    schoolId:school.schoolId,
		                    academicYear:academicYear,
		                    subjectId: subject.subjectId,
		                    grade:grade,
		                    regBronzeJoba: 0,
		                    regSilverJoba: 0,
		                    regGoldJoba: 0,
		                    regTotalJoba: 0,
		                    natBronzeJoba: 0,
		                    natSilverJoba: 0,
		                    natGoldJoba: 0,
		                    natTotalJoba: 0,
		                    interBronzeJoba: 0,
		                    interSilverJoba: 0,
		                    interGoldJoba: 0,
		                    interTotalJoba: 0,
		                    regBronzeProject: 0,
		                    regSilverProject: 0,
		                    regGoldProject: 0,
		                    regTotalProject: 0,
		                    natBronzeProject: 0,
		                    natSilverProject: 0,
		                    natGoldProject: 0,
		                    natTotalProject: 0,
		                    interBronzeProject: 0,
		                    interSilverProject: 0,
		                    interGoldProject: 0,
		                    interTotalProject: 0,
		                }

		            results = JobaResults.find({schoolId:school.schoolId, academicYear:academicYear, subjectId:subject.subjectId, attendedFor:grade}).fetch()
		            _.each(results,(result) => {

		                if (result.jobaType == 'science') {
		                	if (result.jobaRegion == 'regional') {
		                		if (result.medal == 'bronze') {
		                			jobaRating.regBronzeJoba++
		                			jobaTotalRating.regBronzeJoba++
		                			jobaGradeTotalRating.regBronzeJoba++
		                		}
		                		if (result.medal == 'silver') {
		                			jobaRating.regSilverJoba++
		                			jobaTotalRating.regSilverJoba++
		                			jobaGradeTotalRating.regSilverJoba++
		                		}
		                		if (result.medal == 'gold') {
		                			jobaRating.regGoldJoba++
		                			jobaTotalRating.regGoldJoba++
		                			jobaGradeTotalRating.regGoldJoba++
		                		}
		                		jobaRating.regTotalJoba++;
		                		jobaTotalRating.regTotalJoba++
		                		jobaGradeTotalRating.regTotalJoba++
		                	}

							if (result.jobaRegion == 'national') {
		                		if (result.medal == 'bronze') {
		                			jobaRating.natBronzeJoba++
		                			jobaTotalRating.natBronzeJoba++
		                			jobaGradeTotalRating.natBronzeJoba++
		                		}
		                		if (result.medal == 'silver') {
		                			jobaRating.natSilverJoba++
		                			jobaTotalRating.natSilverJoba++
		                			jobaGradeTotalRating.natSilverJoba++
		                		}
		                		if (result.medal == 'gold') {
		                			jobaRating.natGoldJoba++
		                			jobaTotalRating.natSilverJoba++
		                			jobaGradeTotalRating.natSilverJoba++
		                		}
		                		jobaRating.natTotalJoba++;
		                		jobaTotalRating.natTotalJoba++
		                		jobaGradeTotalRating.natTotalJoba++
		                	}

		                	if (result.jobaRegion == 'international') {
		                		if (result.medal == 'bronze') {
		                			jobaRating.interBronzeJoba++
		                			jobaTotalRating.interBronzeJoba++
		                			jobaGradeTotalRating.interBronzeJoba++
		                		}
		                		if (result.medal == 'silver') {
		                			jobaRating.interSilverJoba++
		                			jobaTotalRating.interSilverJoba++
		                			jobaGradeTotalRating.interSilverJoba++
		                		}
		                		if (result.medal == 'gold') {
		                			jobaRating.interGoldJoba++
		                			jobaTotalRating.interGoldJoba++
		                			jobaGradeTotalRating.interGoldJoba++
		                		}
		                		jobaRating.interTotalJoba++;
		                		jobaTotalRating.interTotalJoba++;
		                		jobaGradeTotalRating.interTotalJoba++;
		                	}
		                	c++;
		                	cTotal++;
		                	cGrade++;
		                }
		                else {
		                	if (result.olympiadRegion == 'regional') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.regBronzeProject++
		                			olympiadTotalRating.regBronzeProject++
		                			olympiadGradeTotalRating.regBronzeProject++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.regSilverProject++
		                			olympiadTotalRating.regSilverProject++
		                			olympiadGradeTotalRating.regSilverProject++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.regGoldProject++
		                			olympiadTotalRating.regGoldProject++
		                			olympiadGradeTotalRating.regGoldProject++
		                		}
		                		olympiadRating.regTotalProject++;
		                		olympiadTotalRating.regTotalProject++;
		                		olympiadGradeTotalRating.regTotalProject++;
		                	}

							if (result.olympiadRegion == 'national') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.natBronzeProject++
		                			olympiadTotalRating.natBronzeProject++
		                			olympiadGradeTotalRating.natBronzeProject++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.natSilverProject++
		                			olympiadTotalRating.natSilverProject++
		                			olympiadGradeTotalRating.natSilverProject++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.natGoldProject++
		                			olympiadTotalRating.natGoldProject++
		                			olympiadGradeTotalRating.natGoldProject++
		                		}
		                		olympiadRating.natTotalProject++;
		                		olympiadTotalRating.natTotalProject++;
		                		olympiadGradeTotalRating.natTotalProject++;
		                	}

		                	if (result.olympiadRegion == 'international') {
		                		if (result.medal == 'bronze') {
		                			olympiadRating.interBronzeProject++
		                			olympiadTotalRating.interBronzeProject++
		                			olympiadGradeTotalRating.interBronzeProject++
		                		}
		                		if (result.medal == 'silver') {
		                			olympiadRating.interSilverProject++
		                			olympiadTotalRating.interSilverProject++
		                			olympiadGradeTotalRating.interSilverProject++
		                		}
		                		if (result.medal == 'gold') {
		                			olympiadRating.interGoldProject++
		                			olympiadTotalRating.interGoldProject++
		                			olympiadGradeTotalRating.interGoldProject++
		                		}
		                		olympiadRating.interTotalProject++;
		                		olympiadTotalRating.interTotalProject++;
		                		olympiadGradeTotalRating.interTotalProject++;
		                	}
		                	c++;
		                	cTotal++;
		                	cGrade++;
		                }
		            })

		            let sameRating = JobaRatings.findOne({academicYear:academicYear, schoolId:school.schoolId, subjectId:subject.subjectId, grade:grade})

		            if (sameRating) {
		                JobaRatings.update({_id:sameRating._id},{$set:jobaRating})
		            }
		            else {
		            	if (c > 0)
		            		JobaRatings.insert(jobaRating)
		            }
		        })

				let sameTotalRating = JobaRatings.findOne({academicYear:academicYear, schoolId:school.schoolId, subjectId:'all', grade:grade})

		            if (sameTotalRating) {
		                JobaRatings.update({_id:sameTotalRating._id},{$set:jobaTotalRating})
		            }
		            else {
		            	if (cTotal > 0)
		            		JobaRatings.insert(jobaTotalRating)
		            }
		    })

			let sameGradeTotalRating = JobaRatings.findOne({academicYear:academicYear, schoolId:school.schoolId, subjectId:'all', grade:'all'})

		            if (sameGradeTotalRating) {
		                JobaRatings.update({_id:sameGradeTotalRating._id},{$set:jobaGradeTotalRating})
		            }
		            else {
		            	if (cGrade > 0)
		            		JobaRatings.insert(jobaGradeTotalRating)
		            }

       		// calculates average olympiad rating for all grades but each subject
		    calculateTotalGradeSubjectJoba(school.schoolId,academicYear)

        })
    }
})
