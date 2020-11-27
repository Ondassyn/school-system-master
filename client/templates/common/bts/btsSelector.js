import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './btsSelector.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

Template.btsSelector.onCreated(function(){
    let template = this
    document.title = "БТС Оқушыларды таңдау";
    
    //Session.set('btsNo', FlowRouter.getParam('btsNo'));
    template.btsNo = new ReactiveVar();
    //template.btsNo.set(FlowRouter.getParam('btsNo'));

    template.subscribe("schools")
    template.subscribe('btsResultsForSelection', '2019-2020', '2');
    
    template.autorun(() => {
        template.btsNo.set(FlowRouter.getParam('btsNo'))
        template.subscribe("btsSelected",academicYear.get(), template.btsNo.get());
        template.subscribe("btsSelectedExtra", academicYear.get(), template.btsNo.get());
    })
})

Template.btsSelector.helpers({
    btsNo() {
        //return Session.get('btsNo');
        return Template.instance().btsNo.get();
    },
    schools() {
        // schoolStore.delete("033");
        // schoolStore.delete("028");
        // schoolStore.delete("032");
        // schoolStore.delete("041");
        // schoolStore.delete("042");
        return Schools.find(
                {schoolId: {$nin: ['028', '032', '033', '041', '042', '043']}}, 
                {sort: {schoolId:1}}
            ).fetch();
    },
    exists(schoolId, grade) {
        let results = BtsSelected.find({schoolId, grade}).fetch();
        if(results.length > 0) {
            return true;
        }
        return false;
    },
    existsAll(schoolId) {
        let results = BtsSelected.find({schoolId}).fetch();
        let flags = [false, false, false];
        results.map(result => {
            if(result.grade === '8') {
                flags[0] = true;
            } else if(result.grade === '9') {
                flags[1] = true;
            } else if(result.grade === '10') {
                flags[2] = true;
            }
        })
        flags.map(flag => {
            if(flag === false)
                return false;
        })
        return true;
    },
    generatedExtraList(schoolId) {
        let results = BtsSelectedExtra.find({schoolId}).fetch();
        if(results.length > 0) {
            return true;
        }
        return false;
    }
})

Template.btsSelector.events({
    'click .btn-info' (event, template) {
        let params = (event.target.id).split('_');
        
        let schoolId = params[0];
        let grade = params[1];
        let previousGrade = (+grade - 1).toString();
        
        if(grade === 'extra') {
            let selected = [];

            let duplicate = BtsSelectedExtra.findOne({
                schoolId
            })

            if(duplicate) {
                alert(schoolId + ' is not generated');
            } else {
                for(let i = 8; i <= 10; i++){
                    grade = i.toString();
                    let previousGrade = (i-1).toString();
                    
                    try {
                        let selectedDocument = BtsSelected.findOne({
                            schoolId,
                            grade
                        })
                        if(!selectedDocument) {
                            return;
                        }

                        let selectedIds = selectedDocument.selected;

                        let results = BtsResults.find({schoolId, grade: previousGrade}, {sort: {total: -1}}).fetch();

                        let n = results.length;
                        let third = Math.floor(0.3*n);
                        let tenth = 4;
                        if(tenth < 1) {
                            if(n >= 3) {
                                tenth = 1;
                                third = 3;
                            }
                        }
                        let i = 0;
                        let infPrevention = 0;
                        while(i < tenth){
                            if(i === 3*tenth) break;
                            let randomId = results[Math.floor(Math.random() * third)].studentId;
                            if(!selectedIds.includes(randomId) && !selected.includes(randomId)) {
                                selected.push(randomId);
                                i++;
                            }
                            infPrevention++;
                            if(infPrevention > 1000) break;
                        }
                        infPrevetion = 0;
                        while(i < 2*tenth) {
                            if(i === 3*tenth) break;
                            let randomId = results[Math.floor(Math.random() * third) + third].studentId;
                            if(!selectedIds.includes(randomId) && !selected.includes(randomId)) {
                                selected.push(randomId);
                                i++;
                            }
                            infPrevention++;
                            if(infPrevention > 1000) break;
                        }
                        infPrevetion = 0;
                        while(i < 3*tenth) {
                            if(i === 3*tenth) break;
                            let randomId = results[Math.floor(Math.random() * (n-2*third)) + 2*third].studentId;
                            if(!selectedIds.includes(randomId) && !selected.includes(randomId)) {
                                selected.push(randomId);
                                i++;
                            }
                            infPrevention++;
                            if(infPrevention > 1000) break;
                        }
                        //check
                        
                        // console.log(schoolId + ' - ' + grade);
                        // console.log('The actual number is: ' + selected.length);
                        
                        // selected.map((id) => {
                        //     if(selectedIds.includes(id)) {
                        //         console.log('Duplicate ID: ' + id);
                        //     }
                        // })
                    } catch(err) {
                        console.log(err);
                    }
                }
            }

            let btsNo = template.btsNo.get();
            Meteor.call('BtsSelectedExtra.addSet', academicYear.get(), btsNo, schoolId, selected, (err, res) => {
                if(err) {
                    throw err.message;
                }
            })

            return;
        }

        let results = BtsResults.find({schoolId, grade: previousGrade}, {sort: {total: -1}}).fetch();

        let n = results.length;
        let third = Math.floor(n/3);
        let tenth = Math.floor(n/10);
        
        let selected = [];
        let i = 0;
        let infPrevention = 0;
        while(i < tenth){
            let randomId = results[Math.floor(Math.random() * third)].studentId;
            if(!selected.includes(randomId)) {
                selected.push(randomId);
                i++;
            }
            infPrevention++;
            if(infPrevention > 1000) break;
        }
        infPrevetion = 0;
        while(i < 2*tenth) {
            let randomId = results[Math.floor(Math.random() * third) + third].studentId;
            if(!selected.includes(randomId)) {
                selected.push(randomId);
                i++;
            }
            infPrevention++;
            if(infPrevention > 1000) break;
        }
        infPrevetion = 0;
        while(i < third) {
            let randomId = results[Math.floor(Math.random() * (n-2*third)) + 2*third].studentId;
            if(!selected.includes(randomId)) {
                selected.push(randomId);
                i++;
            }
            infPrevention++;
            if(infPrevention > 1000) break;
        }

        //check
        /*
        console.log('The number must be around: ' + (0.3*n).toFixed(2));
        console.log('The actual number is: ' + selected.length);
        
        let totalSum = 0;
        let totalN = 0;
        let actualSum = 0;
        let actualN = 0;
        results.map((result) => {
            totalSum +=+ result.total;
            totalN++;
            if(selected.includes(result.studentId)){
                actualSum +=+ result.total;
                actualN++;
            }
        })
        console.log('The expected average: ' + (+totalSum/+totalN));
        console.log('The actual average: ' + (+actualSum/+actualN));
        */

        let btsNo = template.btsNo.get();
        Meteor.call('BtsSelected.addSet', academicYear.get(), btsNo, schoolId, grade, selected, (err, res) => {
            if(err) {
                alert(err.message);
            }
        })
    },

    'click .btn-warning'(event, template) {
        let params = (event.target.id).split('_');
        
        let schoolId = params[0];
        let grade = params[1];

        let selected;

        if(grade === 'extra') {
            selected = BtsSelectedExtra.findOne({schoolId}).selected;       
        } else {
            selected = BtsSelected.findOne({schoolId, grade}).selected;
        }
        if(!selected || selected.length === 0) {
            alert('Data has not been retrieved');
            return;
        } 

        let data = [];
        let headers = ['grade', 'division',  'studentId', 'studentSurname', 'studentName'];

        data.push(headers);
        
        selected.map((studentId) => {
            let student = BtsResults.findOne({studentId});
            if(student){
                let dataRow = [+student.grade+1, student.division, student.studentId, student.surname, student.name];
                data.push(dataRow);
            }
        })
        
        Meteor.call('download', data, (err, wb) => {
            if (err) throw err;

            let sName;
            if(grade === 'extra') {
                sName = academicYear.get() + '_' + template.btsNo.get() + '_' + schoolId + '_extra_students.xlsx';
            } else {
                sName = academicYear.get() + '_' + template.btsNo.get() + '_' + schoolId + + '_' + grade + '_selected_students.xlsx';
            }
            XLSX.writeFile(wb, sName);
        });
    },

    'click #generate_all'(event, template) {
        let schools = Schools.find(
            {schoolId: {$nin: ['028', '032', '033', '041', '042', '043']}}, 
            {sort: {schoolId:1}}
        ).fetch();

        let btsNo = template.btsNo.get();

        schools.map((school) => {
            let schoolId = school.schoolId;
            for(let i = 8; i <= 10; i++){
                let grade = i.toString();
                let previousGrade = (i-1).toString();
                
                try {
                    let duplicate = BtsSelected.findOne({
                        academicYear: academicYear.get(), 
                        btsNo,
                        schoolId,
                        grade
                    })
                    if(!duplicate) {
                        let results = BtsResults.find({schoolId, grade: previousGrade}, {sort: {total: -1}}).fetch();
                            
                        let n = results.length;
                        let third = Math.floor(0.3*n);
                        let tenth = Math.floor(n/10);
                        if(tenth < 1) {
                            if(n >= 3) {
                                tenth = 1;
                                third = 3;
                            }
                        }
                        
                        let selected = [];
                        let i = 0;
                        let infPrevention = 0;
                        while(i < tenth){
                            let randomId = results[Math.floor(Math.random() * third)].studentId;
                            if(!selected.includes(randomId)) {
                                selected.push(randomId);
                                i++;
                            }
                            infPrevention++;
                            if(infPrevention > 1000) break;
                        }
                        infPrevetion = 0;
                        while(i < 2*tenth) {
                            let randomId = results[Math.floor(Math.random() * third) + third].studentId;
                            if(!selected.includes(randomId)) {
                                selected.push(randomId);
                                i++;
                            }
                            infPrevention++;
                            if(infPrevention > 1000) break;
                        }
                        infPrevetion = 0;
                        while(i < third) {
                            let randomId = results[Math.floor(Math.random() * (n-2*third)) + 2*third].studentId;
                            if(!selected.includes(randomId)) {
                                selected.push(randomId);
                                i++;
                            }
                            infPrevention++;
                            if(infPrevention > 1000) break;
                        }


                        //check
                        
                        console.log(schoolId + ' - ' + grade);
                        console.log('The number must be around: ' + (0.3*n).toFixed(2));
                        console.log('The actual number is: ' + selected.length);
                        
                        let totalSum = 0;
                        let totalN = 0;
                        let actualSum = 0;
                        let actualN = 0;
                        results.map((result) => {
                            totalSum +=+ result.total;
                            totalN++;
                            if(selected.includes(result.studentId)){
                                actualSum +=+ result.total;
                                actualN++;
                            }
                        })
                        console.log('The expected average: ' + (+totalSum/+totalN));
                        console.log('The actual average: ' + (+actualSum/+actualN));
                        

                        Meteor.call('BtsSelected.addSet', academicYear.get(), btsNo, schoolId, grade, selected, (err, res) => {
                            if(err) {
                                throw err.message;
                            }
                        })
                    }
                } catch(err) {
                    console.log(err);
                }
            }
        })
    },
    'click #generate_extras' (event, template) {
        let schools = Schools.find(
            {schoolId: {$nin: ['028', '032', '033', '041', '042', '043']}}, 
            {sort: {schoolId:1}}
        ).fetch();

        let btsNo = template.btsNo.get();

        schools.map((school) => {
            let schoolId = school.schoolId;
            let selected = [];

            let duplicate = BtsSelectedExtra.findOne({
                schoolId
            })

            if(duplicate) {
            } else {
                for(let i = 8; i <= 10; i++){
                    grade = i.toString();
                    let previousGrade = (i-1).toString();
                    
                    try {
                        let selectedDocument = BtsSelected.findOne({
                            schoolId,
                            grade
                        })
                        if(!selectedDocument) {
                            return;
                        }

                        let selectedIds = selectedDocument.selected;

                        let results = BtsResults.find({schoolId, grade: previousGrade}, {sort: {total: -1}}).fetch();

                        let n = results.length;
                        let third = Math.floor(0.3*n);
                        let tenth = 4;
                        if(tenth < 1) {
                            if(n >= 3) {
                                tenth = 1;
                                third = 3;
                            }
                        }
                            
                        let i = 0;
                        let infPrevention = 0;
                        while(i < tenth){
                            if(i === n) break;
                            let randomId = results[Math.floor(Math.random() * third)].studentId;
                            if(!selectedIds.includes(randomId) && !selected.includes(randomId)) {
                                selected.push(randomId);
                                i++;
                            }
                            infPrevention++;
                            if(infPrevention > 1000) break;
                        }
                        infPrevetion = 0;
                        while(i < 2*tenth) {
                            if(i === n) break;
                            let randomId = results[Math.floor(Math.random() * third) + third].studentId;
                            if(!selectedIds.includes(randomId) && !selected.includes(randomId)) {
                                selected.push(randomId);
                                i++;
                            }
                            infPrevention++;
                            if(infPrevention > 1000) break;
                        }
                        infPrevetion = 0;
                        while(i < 3*tenth) {
                            if(i === n) break;
                            let randomId = results[Math.floor(Math.random() * (n-2*third)) + 2*third].studentId;
                            if(!selectedIds.includes(randomId) && !selected.includes(randomId)) {
                                selected.push(randomId);
                                i++;
                            }
                            infPrevention++;
                            if(infPrevention > 1000) break;
                        }

                        //check
                        
                        console.log(schoolId + ' - ' + grade);
                        console.log('The actual number is: ' + selected.length);
                        
                        selected.map((id) => {
                            if(selectedIds.includes(id)) {
                                console.log('Duplicate ID: ' + id);
                            }
                        })
                    } catch(err) {
                        console.log(err);
                    }
                }
            }

            Meteor.call('BtsSelectedExtra.addSet', academicYear.get(), btsNo, schoolId, selected, (err, res) => {
                if(err) {
                    throw err.message;
                }
            })
        })
    },

    'click #download_all' (event, template) {
        let btsSelected = BtsSelected.find({}, {sort: {schoolId: 1, grade: 1}}).fetch();
        if(!btsSelected || btsSelected.length === 0){
            alert('No generated students to download');
            return;
        }

        let data = [];
        let headers = ['schoolId', 'grade', 'division', 'studentId', 'studentSurname', 'studentName'];

        data.push(headers);

        btsSelected.map((selected) => {
            let selectedIds = selected.selected;
            if(selectedIds.length === 0) return;
            selectedIds.map((selectedId) => {        
                let student = BtsResults.findOne({studentId:selectedId});
                if(student){
                    let dataRow = [selected.schoolId, +student.grade+1, student.division, student.studentId, student.surname, student.name];
                    data.push(dataRow);
                }
            })
        })

        Meteor.call('download', data, (err, wb) => {
            if (err) throw err;

            let sName = academicYear.get() + '_' + template.btsNo.get() + '_all_selected_students.xlsx';
            XLSX.writeFile(wb, sName);
        });
    },
    'click #download_extras' (event, template) {
        let btsSelected = BtsSelectedExtra.find({}).fetch();
        if(!btsSelected || btsSelected.length === 0){
            alert('No generated students to download');
            return;
        }

        let data = [];
        let headers = ['schoolId', 'grade', 'division', 'studentId', 'studentSurname', 'studentName'];

        data.push(headers);

        btsSelected.map((selected) => {
            let selectedIds = selected.selected;
            if(selectedIds.length === 0) return;
            selectedIds.map((selectedId) => {        
                let student = BtsResults.findOne({studentId:selectedId});
                if(student){
                    let dataRow = [selected.schoolId, +student.grade+1, student.division, student.studentId, student.surname, student.name];
                    data.push(dataRow);
                }
            })
        })

        Meteor.call('download', data, (err, wb) => {
            if (err) throw err;

            let sName = academicYear.get() + '_' + template.btsNo.get() + '_extra_selected_students.xlsx';
            XLSX.writeFile(wb, sName);
        });
    }
})
