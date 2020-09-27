import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './adminOpeReportResults.html';
import {ReactiveDict} from 'meteor/reactive-dict'
import XLSX from 'xlsx';

Template.adminOpeReportResults.onCreated(function() {
    let template = this
    document.title = "OPE Репорт";
    template.reportPeriod = new ReactiveVar('16.11 - 30.11')
    template.grade = new ReactiveVar('7')
    template.results = new ReactiveVar([])
    template.schoolId_select = new ReactiveVar("")
    state = new ReactiveDict();
    state.set('directorClickedYes', false)
    template.subscribe('opes');
    template.subscribe("schools")
    // template.subscribe('opeReport');

    template.autorun(() => {
        template.subscribe("opeAdminReports", academicYear.get(), template.schoolId_select.get(), template.reportPeriod.get())
    })

})

Template.adminOpeReportResults.helpers({
  students(){
    return Students.find({},{sort:{surname:-1, division:1}})
  },
  clickedYes(){
    return !state.get('directorClickedYes')
  },
  results() {
      return OpeReports.find({})
  },
  schools() {
      return Schools.find({},{sort:{schoolId:1}})
  },
});

Template.adminOpeReportResults.events({

  "change #select"(event,template) {
      template.schoolId_select.set(template.find('[name=schoolId_select]').value)

      let schoolId_select = FlowRouter.getParam('_id')

  },

  'change #reportPeriod'(event,template) {
      template.reportPeriod.set(event.target.value)
  },

  'click #dnload' () {
      const html = document.getElementById('out').innerHTML;

      var data = [];
      var headers = ['report_name',	'math', 'physics', 'chemistry', 'biology', 'english', 'geography', 'kazakh_history',
      'informatic', 'kazakh_lang', 'turkish_lang', 'russian_lang', 'huhuk'];
      var reportNameList = ['Мұғалім түсіндірген сабақ сағаты',
                            'Басқа мұғалім түсіндірген сабақ сағаты',
                            'Жасалған емтихан саны',
                            'Мұғалім мотивация программ сағаты',
                            'Мұғалімнің кандидат саны(10 сынып)',
                            'Мұғалімнің кандидат саны(11 сынып)',
                            'Жалпы Олимпиадчик оқушы саны',
                            'Область дәрежесіне жеткен оқушы саны',
                            'Республика дәрежесіне жеткен оқушы саны',
                            'Дүние дәрежесіне жеткен оқушы саны',
                            'Әкімшіліктің мотивация программ сағаты',
                            'Олимпиада мұғалімдерімен жиналыс сағаты']

      data.push(headers);

      reportNameList.forEach(reportName =>{
        let content = [reportName];
        data.push(content);
      });

      Meteor.call('download', data, (err, wb) => {
        if (err) throw err;

        let sName = 'ope_report.xlsx';
        XLSX.writeFile(wb, sName);
      });

  },
})

Template.adminOpeReportResults.onRendered(function() {
    this.$('[data-toggle="tooltip"]').tooltip({trigger: "hover"});
});
