	export const calculateTotalGradeSubjectOlymp = (schoolId,academicYear) => {

    	subjects = KboCourses.find().fetch()
    	_.each(subjects,(subject) => {
    		var c = 0;

    		let totalGradeRating = {
		                    schoolId:schoolId,
		                    academicYear:academicYear,
		                    subjectId: subject.subjectId,
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

    		let grades = ['7','8','9','10','11']

    		_.each(grades, (grade) => {
		    	ratings = OlympiadRatings.find({schoolId:schoolId,academicYear:academicYear,grade:grade, subjectId:subject.subjectId}).fetch()
		        _.each(ratings,(rating) => {

		        	totalGradeRating.regBronzeOlymp += rating.regBronzeOlymp
		        	totalGradeRating.regSilverOlymp += rating.regSilverOlymp
		            totalGradeRating.regGoldOlymp += rating.regGoldOlymp
		            totalGradeRating.regTotalOlymp += rating.regTotalOlymp
		            totalGradeRating.natBronzeOlymp += rating.natBronzeOlymp
		            totalGradeRating.natSilverOlymp += rating.natSilverOlymp
		            totalGradeRating.natGoldOlymp += rating.natGoldOlymp
					totalGradeRating.natTotalOlymp += rating.natTotalOlymp
					totalGradeRating.regJunBronzeOlymp += rating.regJunBronzeOlymp
		        	totalGradeRating.regJunSilverOlymp += rating.regJunSilverOlymp
		            totalGradeRating.regJunGoldOlymp += rating.regJunGoldOlymp
		            totalGradeRating.regJunTotalOlymp += rating.regJunTotalOlymp
		            totalGradeRating.natJunBronzeOlymp += rating.natJunBronzeOlymp
		            totalGradeRating.natJunSilverOlymp += rating.natJunSilverOlymp
		            totalGradeRating.natJunGoldOlymp += rating.natJunGoldOlymp
		            totalGradeRating.natJunTotalOlymp += rating.natJunTotalOlymp
		            totalGradeRating.jautBronzeOlymp += rating.jautBronzeOlymp
		            totalGradeRating.jautSilverOlymp += rating.jautSilverOlymp
		            totalGradeRating.jautGoldOlymp += rating.jautGoldOlymp
					totalGradeRating.jautTotalOlymp += rating.jautTotalOlymp
					totalGradeRating.mendBronzeOlymp += rating.mendBronzeOlymp
					totalGradeRating.mendSilverOlymp += rating.mendSilverOlymp
					totalGradeRating.mendGoldOlymp += rating.mendGoldOlymp
					totalGradeRating.mendTotalOlymp += rating.mendTotalOlymp
					totalGradeRating.aphoBronzeOlymp += rating.aphoBronzeOlymp
					totalGradeRating.aphoSilverOlymp += rating.aphoSilverOlymp
					totalGradeRating.aphoGoldOlymp += rating.aphoGoldOlymp
					totalGradeRating.aphoTotalOlymp += rating.aphoTotalOlymp
					totalGradeRating.allrusBronzeOlymp += rating.allrusBronzeOlymp
					totalGradeRating.allrusGoldOlymp += rating.allrusGoldOlymp
					totalGradeRating.allrusSilverOlymp += rating.allrusSilverOlymp
					totalGradeRating.allrusTotalOlymp += rating.allrusTotalOlymp
					totalGradeRating.eugBronzeOlymp += rating.eugBronzeOlymp
					totalGradeRating.eugGoldOlymp += rating.eugGoldOlymp
					totalGradeRating.eugSilverOlymp += rating.eugSilverOlymp
					totalGradeRating.eugTotalOlymp += rating.eugTotalOlymp
					totalGradeRating.wcBronzeOlymp += rating.wcBronzeOlymp
					totalGradeRating.wcGoldOlymp += rating.wcGoldOlymp
					totalGradeRating.wcSilverOlymp += rating.wcSilverOlymp
					totalGradeRating.wcTotalOlymp += rating.wcTotalOlymp
					totalGradeRating.bmoBronzeOlymp += rating.bmoBronzeOlymp
					totalGradeRating.bmoGoldOlymp += rating.bmoGoldOlymp
					totalGradeRating.bmoSilverOlymp += rating.bmoSilverOlymp
					totalGradeRating.bmoTotalOlymp += rating.bmoTotalOlymp
					totalGradeRating.jbmoBronzeOlymp += rating.jbmoBronzeOlymp
					totalGradeRating.jbmoGoldOlymp += rating.jbmoGoldOlymp
					totalGradeRating.jbmoSilverOlymp += rating.jbmoSilverOlymp
					totalGradeRating.jbmoTotalOlymp += rating.jbmoTotalOlymp
					totalGradeRating.tuyBronzeOlymp += rating.tuyBronzeOlymp
					totalGradeRating.tuyGoldOlymp += rating.tuyGoldOlymp
					totalGradeRating.tuySilverOlymp += rating.tuySilverOlymp
					totalGradeRating.tuyTotalOlymp += rating.tuyTotalOlymp
					totalGradeRating.imoBronzeOlymp += rating.imoBronzeOlymp
					totalGradeRating.imoGoldOlymp += rating.imoGoldOlymp
					totalGradeRating.imoSilverOlymp += rating.imoSilverOlymp
					totalGradeRating.imoTotalOlymp += rating.imoTotalOlymp
					totalGradeRating.iranBronzeOlymp += rating.iranBronzeOlymp
					totalGradeRating.iranGoldOlymp += rating.iranGoldOlymp
					totalGradeRating.iranSilverOlymp += rating.iranSilverOlymp
					totalGradeRating.iranTotalOlymp += rating.iranTotalOlymp
					totalGradeRating.apmoBronzeOlymp += rating.apmoBronzeOlymp
					totalGradeRating.apmoGoldOlymp += rating.apmoGoldOlymp
					totalGradeRating.apmoSilverOlymp += rating.apmoSilverOlymp
					totalGradeRating.apmoTotalOlymp += rating.apmoTotalOlymp
					totalGradeRating.swBronzeOlymp += rating.swBronzeOlymp
					totalGradeRating.swGoldOlymp += rating.swGoldOlymp
					totalGradeRating.swSilverOlymp += rating.swSilverOlymp
					totalGradeRating.swTotalOlymp += rating.swTotalOlymp
					totalGradeRating.megaBronzeOlymp += rating.megaBronzeOlymp
					totalGradeRating.megaGoldOlymp += rating.megaGoldOlymp
					totalGradeRating.megaSilverOlymp += rating.megaSilverOlymp
					totalGradeRating.megaTotalOlymp += rating.megaTotalOlymp
					totalGradeRating.chemBronzeOlymp += rating.chemBronzeOlymp
					totalGradeRating.chemGoldOlymp += rating.chemGoldOlymp
					totalGradeRating.chemSilverOlymp += rating.chemSilverOlymp
					totalGradeRating.chemTotalOlymp += rating.chemTotalOlymp
					totalGradeRating.apioBronzeOlymp += rating.apioBronzeOlymp
					totalGradeRating.apioGoldOlymp += rating.apioGoldOlymp
					totalGradeRating.apioSilverOlymp += rating.apioSilverOlymp
					totalGradeRating.apioTotalOlymp += rating.apioTotalOlymp
					totalGradeRating.euinfBronzeOlymp += rating.euinfBronzeOlymp
					totalGradeRating.euinfGoldOlymp += rating.euinfGoldOlymp
					totalGradeRating.euinfSilverOlymp += rating.euinfSilverOlymp
					totalGradeRating.euinfTotalOlymp += rating.euinfTotalOlymp
					totalGradeRating.ijsoBronzeOlymp += rating.ijsoBronzeOlymp
					totalGradeRating.ijsoGoldOlymp += rating.ijsoGoldOlymp
					totalGradeRating.ijsoSilverOlymp += rating.ijsoSilverOlymp
					totalGradeRating.ijsoTotalOlymp += rating.ijsoTotalOlymp
		            totalGradeRating.regBronzeProject += rating.regBronzeProject
		            totalGradeRating.regSilverProject +=  rating.regSilverProject
		            totalGradeRating.regGoldProject += rating.regGoldProject
		            totalGradeRating.regTotalProject += rating.regTotalProject
		            totalGradeRating.natBronzeProject += rating.natBronzeProject
		            totalGradeRating.natSilverProject += rating.natSilverProject
		            totalGradeRating.natGoldProject += rating.natGoldProject
		            totalGradeRating.natTotalProject += rating.natTotalProject
		            totalGradeRating.interBronzeProject += rating.interBronzeProject
		            totalGradeRating.interSilverProject += rating.interSilverProject
		            totalGradeRating.interGoldProject += rating.interGoldProject
		            totalGradeRating.interTotalProject += rating.interTotalProject
		            c++;
		        })
		    })

		    let sameTotalGradeRating = OlympiadRatings.findOne({academicYear:academicYear, schoolId:schoolId, subjectId:subject.subjectId, grade:'all'})

		            if (sameTotalGradeRating) {
		                OlympiadRatings.update({_id:sameTotalGradeRating._id},{$set:totalGradeRating})
		            }
		            else {
						if (c > 0)
							console.log("#")
		            		OlympiadRatings.insert(totalGradeRating)
		            }
	    })
    }