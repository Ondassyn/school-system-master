import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import './btsRatingByCategory.html';
import { Meteor } from 'meteor/meteor';
import XLSX from 'xlsx';
Template.btsRatingByCategory.onCreated(function(){
    let template = this
    Session.setDefault('Sort',{total:-1});
    document.title = "БТС Рейтинг по категорий";
    template.grade = new ReactiveVar("all")
    template.filter = new ReactiveVar("filter1")
    template.subscribe("schools")
    template.autorun(()=>{
        template.subscribe("btsRating",academicYear.get(),template.grade.get(),FlowRouter.getParam("btsNo"))
    })
})

Template.btsRatingByCategory.helpers({
    filter1() {
      // Жалпы
        return Template.instance().filter.get() == "filter1"
    },

    filter2() {
      // Категория А
        return Template.instance().filter.get() == "filter2"
    },

    filter3() {
      // Категория B
        return Template.instance().filter.get() == "filter3"
    },

    filter4() {
      // Жалпы - Категория А
        return Template.instance().filter.get() == "filter4"
    },

    filter5() {
      // Жалпы - Категория B
        return Template.instance().filter.get() == "filter5"
    },

    filter6() {
      // Категория А  - Категория B
        return Template.instance().filter.get() == "filter6"
    },

    filter7() {
      // Жалпы - Категория А  - Категория B
        return Template.instance().filter.get() == "filter7"
    },
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    btsNo3() {
        return FlowRouter.getParam("btsNo") == "3"
    },
    btsNo1_or_2(){
      return FlowRouter.getParam("btsNo") == "1" || FlowRouter.getParam("btsNo") == "2"
    },

    gradeTotal(){
        return Template.instance().grade.get() == 'all'
    },
    grade7(){
        return "7" == Template.instance().grade.get()
    },
    grade8_or_9(){
        return "8" == Template.instance().grade.get() || "9" == Template.instance().grade.get()
    },
    grade10(){
        return "10" == Template.instance().grade.get()
    },
    results() {
        return BtsRatings.find({},{sort: Session.get('Sort')});
    },
})

var filterN = 'filter1';

Template.btsRatingByCategory.events({
    "change #select"(event,template) {
        template.grade.set(template.find('[name=grade]').value)
        let grade = FlowRouter.getParam('_id')
    },
    "change #selectFilter"(event,template) {
        template.filter.set(template.find('[name=filter]').value)
        filterN = template.find('[name=filter]').value

        if(filterN == 'filter1'){
          Session.set('Sort',{total:-1});

        }else if(filterN == 'filter2'){
          Session.set('Sort',{totalA:-1});

        }else if(filterN == 'filter3'){
          Session.set('Sort',{totalB:-1});

        }else if(filterN == 'filter4'){
          Session.set('Sort',{totalA:-1});

        }else if(filterN == 'filter5'){
          Session.set('Sort',{totalB:-1});

        }else if(filterN == 'filter6'){
          Session.set('Sort',{totalB:-1});

        }else if(filterN == 'filter7'){
          Session.set('Sort',{total:-1});
        }
    },

    "click #export"(event,template) {
      document.getElementById('out').innerHTML;
      var data = [];
      let btsNo = FlowRouter.getParam('btsNo');
      var selectedLesson = "Жалпы";

      if(template.grade.get() != "all"){
        let lessons = ["7 cынып", "8 cынып", "9 cынып", "10 cынып"];
        selectedLesson = lessons[parseInt(template.grade.get()) - 7]
      }

      var headers = ["#", "Оқу жылы", "Мектеп аты",
      "Математика", "Қазақ тілі", "Түрік тілі", "Қазақcтан тарихы", "Дүние тарихы",
      "География", "Физика", "Химия", "Биология"];

      data.push(headers);
      var btsStore = BtsRatings.find({},{sort:Session.get('Sort')}).fetch();
      let mektepAty;
      let okuJyly = academicYear.get();

      for(var i = 0; i < btsStore.length; i++){
        let idN = i+1;

        let mektepAty  = Schools.findOne({schoolId: btsStore[i].schoolId}) ? Schools.findOne({schoolId: btsStore[i].schoolId}).shortName : undefined;
        let mathematic = btsStore[i].mathematic?btsStore[i].mathematic.toFixed(2):0;
        let kazakh_lang = btsStore[i].kazakh_lang?btsStore[i].kazakh_lang.toFixed(2):0;
        let turkish_lang = btsStore[i].turkish_lang?btsStore[i].turkish_lang.toFixed(2):0;
        let kazakh_history = btsStore[i].kazakh_history?btsStore[i].kazakh_history.toFixed(2):0;
        let world_history = btsStore[i].world_history?btsStore[i].world_history.toFixed(2):0;
        let geography = btsStore[i].geography?btsStore[i].geography.toFixed(2):0;
        let physics = btsStore[i].physics?btsStore[i].physics.toFixed(2):0;
        let chemistry = btsStore[i].chemistry?btsStore[i].chemistry.toFixed(2):0;
        let biology = btsStore[i].biology?btsStore[i].biology.toFixed(2):0;

        let content = [idN, okuJyly, mektepAty,
          mathematic*5,
          kazakh_lang*5,
          turkish_lang*5,
          kazakh_history*5,
          world_history*5,
          geography*5,
          physics*5,
          chemistry*5,
          biology*5
        ];

        data.push(content);

        let mathematicA = btsStore[i].mathematicA?btsStore[i].mathematicA.toFixed(2):0;
        let kazakh_langA = btsStore[i].kazakh_langA?btsStore[i].kazakh_langA.toFixed(2):0;
        let turkish_langA = btsStore[i].turkish_langA?btsStore[i].turkish_langA.toFixed(2):0;
        let kazakh_historyA = btsStore[i].kazakh_historyA?btsStore[i].kazakh_historyA.toFixed(2):0;
        let world_historyA = btsStore[i].world_historyA?btsStore[i].world_historyA.toFixed(2):0;
        let geographyA = btsStore[i].geographyA?btsStore[i].geographyA.toFixed(2):0;
        let physicsA = btsStore[i].physicsA?btsStore[i].physicsA.toFixed(2):0;
        let chemistryA = btsStore[i].chemistryA?btsStore[i].chemistryA.toFixed(2):0;
        let biologyA = btsStore[i].biologyA?btsStore[i].biologyA.toFixed(2):0;

        let contentA = [' ', ' ', 'Категория A',
          mathematicA,
          kazakh_langA,
          turkish_langA,
          kazakh_historyA,
          world_historyA,
          geographyA,
          physicsA,
          chemistryA,
          biologyA];

        data.push(contentA);


        let mathematicB = btsStore[i].mathematicB?btsStore[i].mathematicB.toFixed(2):0;
        let kazakh_langB = btsStore[i].kazakh_langB?btsStore[i].kazakh_langB.toFixed(2):0;
        let turkish_langB = btsStore[i].turkish_langB?btsStore[i].turkish_langB.toFixed(2):0;
        let kazakh_historyB = btsStore[i].kazakh_historyB?btsStore[i].kazakh_historyB.toFixed(2):0;
        let world_historyB = btsStore[i].world_historyB?btsStore[i].world_historyB.toFixed(2):0;
        let geographyB = btsStore[i].geographyB?btsStore[i].geographyB.toFixed(2):0;
        let physicsB = btsStore[i].physicsB?btsStore[i].physicsB.toFixed(2):0;
        let chemistryB = btsStore[i].chemistryB?btsStore[i].chemistryB.toFixed(2):0;
        let biologyB = btsStore[i].biologyB?btsStore[i].biologyB.toFixed(2):0;

        let contentB = [' ', ' ', 'Категория B',
          mathematicB,
          kazakh_langB,
          turkish_langB,
          kazakh_historyB,
          world_historyB,
          geographyB,
          physicsB,
          chemistryB,
          biologyB];

        data.push(contentB);
      }

      if(data.length == 1){
          alert("Keep calm, there is no data to export");
      }else{
        Meteor.call('download', data, (err, wb) => {
          if (err) throw err;

          let sName = 'BTS-'+btsNo+' rating by category '+selectedLesson+' '+okuJyly+'.xlsx';
          XLSX.Cells["A1"].FillColor = Color.Yellow;
          XLSX.writeFile(wb, sName);
        });
      }

    },

    'click #sortMath'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{mathematic:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{mathematicA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{mathematicB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{mathematicA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{mathematicB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{mathematicA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{mathematic:-1});
      }
    },

    'click #sortKazakh'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{kazakh_lang:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{kazakh_langA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{kazakh_langB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{kazakh_langA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{kazakh_langB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{kazakh_langA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{kazakh_lang:-1});
      }
    },
    'click #sortTur'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{turkish_lang:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{turkish_langA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{turkish_langB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{turkish_langA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{turkish_langB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{turkish_langA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{turkish_lang:-1});
      }
    },
    'click #sortKZHistory'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{kazakh_history:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{kazakh_historyA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{kazakh_historyB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{kazakh_historyA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{kazakh_historyB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{kazakh_historyA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{kazakh_history:-1});
      }
    },
    'click #sortWorlHistory'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{world_history:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{world_historyA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{world_historyB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{world_historyA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{world_historyB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{world_historyA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{world_history:-1});
      }
    },
    'click #sortGeography'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{geography:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{geographyA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{geographyB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{geographyA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{geographyB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{geographyA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{geography:-1});
      }
    },
    'click #sortPhysics'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{physics:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{physicsA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{physicsB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{physicsA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{physicsB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{physicsA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{physics:-1});
      }
    },
    'click #sortChemistry'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{chemistry:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{chemistryA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{chemistryB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{chemistryA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{chemistryB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{chemistryA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{chemistry:-1});
      }
    },
    'click #sortBio'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{biology:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{biologyA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{biologyB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{biologyA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{biologyB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{biologyA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{biology:-1});
      }
    },
    'click #sortTotal'(event,template) {
      if(filterN == 'filter1'){
        Session.set('Sort',{total:-1});
      }else if(filterN == 'filter2'){
        Session.set('Sort',{totalA:-1});
      }else if(filterN == 'filter3'){
        Session.set('Sort',{totalB:-1});
      }else if(filterN == 'filter4'){
        Session.set('Sort',{totalA:-1});
      }else if(filterN == 'filter5'){
        Session.set('Sort',{totalB:-1});
      }else if(filterN == 'filter6'){
        Session.set('Sort',{totalA:-1});
      }else if(filterN == 'filter7'){
        Session.set('Sort',{total:-1});
      }
    },
})
