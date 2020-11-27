import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './btsSelectedExtra.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';

Template.btsSelectedExtra.onCreated(function(){
    let template = this
    document.title = "БТС Қосалқы тізім";
    
    template.btsNo = new ReactiveVar();

    template.subscribe('btsResultsForSelection', '2019-2020', '2');
    
    template.autorun(() => {
        template.btsNo.set(FlowRouter.getParam('btsNo'))
        template.subscribe("btsSelectedExtra", academicYear.get(), template.btsNo.get());
    })
})

Template.btsSelectedExtra.helpers({
    btsNo() {
        return Template.instance().btsNo.get();
    },
    extraStudents() {
        // schoolStore.delete("033");
        // schoolStore.delete("028");
        // schoolStore.delete("032");
        // schoolStore.delete("041");
        // schoolStore.delete("042");
        let btsSelected = BtsSelectedExtra.findOne();
        
        if(!btsSelected) return;
        
        let selectedIds = btsSelected.selected;
        let btsResults = BtsResults.find().fetch();
        
        let selected = [];
        selectedIds.map((selectedId) => {
            let result = btsResults.find(btsResult => {return btsResult.studentId === selectedId});
            result.grade = (+result.grade+1) + result.division;
            
            if(result) selected.push(result)
        })

        // selected.sort((a, b) => {
        //     if (a.grade.slice(-1) < b.grade.slice(-1)) return -1;
        //     if (a.grade.slice(-1) > b.grade.slice(-1)) return 1;
        //     return 0;
        // })

        return selected;
    },
    existsExtra() {
        let results = BtsSelectedExtra.find().fetch();
        if(results.length > 0) {
            return true;
        }
        return false;
    }
})

Template.btsSelectedExtra.events({
    'click #download_extra'(event, template) {
        let btsNo = template.btsNo.get();

        // let selected = Session.get('selected');
        
        // if(!selected || selected.length === 0) {
        //     alert('Data has not been retrieved');
        //     return;
        // } 

        let eights = Template.btsSelectedExtra.__helpers.get('extraStudents').call();

        let selected = [];
        if(eights) selected = [...selected, ...eights];

        let data = [];
        let headers = ['studentId', 'grade', 'studentName', 'studentSurname'];

        data.push(headers);
        
        selected.map((result) => {
            if(result){
                let dataRow = [result.studentId, result.grade, result.name, result.surname];
                data.push(dataRow);
            }
        })
        
        Meteor.call('download', data, (err, wb) => {
            if (err) throw err;

            let sName = academicYear.get() + '_' + btsNo + '_extra_students.xlsx';
            XLSX.writeFile(wb, sName);
        });
    },
})
