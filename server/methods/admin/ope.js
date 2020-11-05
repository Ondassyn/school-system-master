import { Meteor } from 'meteor/meteor';
import { uploadResults } from "../../modules/ope/uploadResults";
//import { calculateRating } from "../../modules/ubt/rating";
//import { ubtResultsAverageCalc } from "../../modules/ubt/ubtResultsAverageCalc";
import XLSX from 'xlsx';

Meteor.methods({
	/* read the data and return the workbook object to the frontend */
	// upload: (bstr, name) => {
	// 	return XLSX.read(bstr, {type:'binary'});
	// },

	'OpeResults.Upload':function(academicYear,subjectId, opeNumber, results) {

		if(!Roles.userIsInRole(this.userId,'admin') &&
				!Roles.userIsInRole(this.userId,'edlight'))

            throw new Meteor.Error('access-denied', 'Access denied!')

		return uploadResults(academicYear,subjectId, opeNumber, results);
  },
});