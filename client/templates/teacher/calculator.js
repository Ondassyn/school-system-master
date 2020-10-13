import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { TAPi18n } from 'meteor/tap:i18n';
import { CurrentLanguage } from '../../../lib/language/current-language';

import './calculator.html';

const BASE_SALARY = 120000;
const EXPERIENCE_COEFFICIENT_1 = 640;
const EXPERIENCE_COEFFICIENT_2 = 80;
const FORMMASTER = 16000;
const HEADMASTER = 40000;
const VICE_HEADMASTER = 20000;
const KIDS_1 = 8400;
const KIDS_2 = 12600;
const KIDS_3 = 16800;
const BACHELOR = 4000;
const MASTER = 8000;
const PHD = 16800;
const REGION_A_MARRIED_EMPLOYED = 48800;
const REGION_B_MARRIED_EMPLOYED = 48800;
const REGION_C_MARRIED_EMPLOYED = 48800;
const REGION_D_MARRIED_EMPLOYED = 21600;
const REGION_A_MARRIED_UNEMPLOYED = 81600;
const REGION_B_MARRIED_UNEMPLOYED = 65600;
const REGION_C_MARRIED_UNEMPLOYED = 65600;
const REGION_D_MARRIED_UNEMPLOYED = 29600;
const REGION_A_WIDOWED = 17600;
const REGION_B_WIDOWED = 17600;
const REGION_C_WIDOWED = 17600;
const REGION_D_WIDOWED = 0;
const REGION_A_SINGLE = 17600;
const REGION_B_SINGLE = 17600;
const REGION_C_SINGLE = 17600;
const REGION_D_SINGLE = 17600;
const HOUSING_A_MARRIED_EMPLOYED = 16000;
const HOUSING_B_MARRIED_EMPLOYED = 16000;
const HOUSING_C_MARRIED_EMPLOYED = 12000;
const HOUSING_D_MARRIED_EMPLOYED = 0;
const HOUSING_A_MARRIED_UNEMPLOYED = 48000;
const HOUSING_B_MARRIED_UNEMPLOYED = 48000;
const HOUSING_C_MARRIED_UNEMPLOYED = 32000;
const HOUSING_D_MARRIED_UNEMPLOYED = 32000;
const HOUSING_A_WIDOWED = 12000;
const HOUSING_B_WIDOWED = 12000;
const HOUSING_C_WIDOWED = 0;
const HOUSING_D_WIDOWED = 0;
const HOUSING_A_SINGLE = 12000;
const HOUSING_B_SINGLE = 12000;
const HOUSING_C_SINGLE = 0;
const HOUSING_D_SINGLE = 0;
const ENGLISH_1 = 5600;
const ENGLISH_2 = 8400;
const ENGLISH_3 = 11200;
const ENGLISH_4 = 14000;
const ENGLISH_5_1 = 20000;
const ENGLISH_5_2 = 16800;
const ENGLISH_6_1 = 24000;
const ENGLISH_6_2 = 20000;
const TAT_1 = 5600;
const TAT_2 = 8400;
const TAT_3 = 11200;
const TAT_4 = 14000;
const KINDERGARDEN_COEFFICIENT = 0.2;
const ROTATION = 0.25;


Template.calculator.onCreated(function() {
    let template = this;

    //TAPi18n.setLanguage('kz');

    template.workExperience = new ReactiveVar('');
    template.specialPosition = new ReactiveVar('');
    template.kids_6 = new ReactiveVar('');
    template.kids_7_16 = new ReactiveVar('');
    template.kids_17_22 = new ReactiveVar('');
    template.degree = new ReactiveVar('');
    template.maritalStatus = new ReactiveVar('');
    template.workRegion = new ReactiveVar('');
    template.housing = new ReactiveVar('');
    template.ielts = new ReactiveVar('');
    template.englishOption = new ReactiveVar('');
    template.tat = new ReactiveVar('');
    template.rotation = new ReactiveVar('');
    template.kindergarden = new ReactiveVar('');
    template.currentSalary = new ReactiveVar('');
})

Template.calculator.helpers({
  	value1: function() {
        let workExperience = Template.instance().workExperience.get();

        return (BASE_SALARY + ((workExperience-1)*(EXPERIENCE_COEFFICIENT_1 + workExperience*EXPERIENCE_COEFFICIENT_2)));
    }, 
    value2: function() {
        let specialPosition = Template.instance().specialPosition.get();
        
        if(specialPosition !== 'form-master') return 0;

        return FORMMASTER;
    },
    value3: function() {
        // =IF(((E3*$Лист1.C11)+($Сумма.E3*$Лист1.C9)+
        // ((E4*$Лист1.C12)+($Сумма.E4*$Лист1.C9)))>
        // 56000,56000,((E3*$Лист1.C11)+($Сумма.E3*$Лист1.C9)+
        // ((E4*$Лист1.C12)+($Сумма.E4*$Лист1.C9))))

        let specialPosition = Template.instance().specialPosition.get();
        let rotation = Template.instance().rotation.get();

        if(specialPosition === 'head') {
            if((HEADMASTER + FORMMASTER) > 56000){
                return 56000;
            } else {
                return (HEADMASTER + FORMMASTER)
            }
        } else if(specialPosition === 'vice-head') {
            let bonus = (rotation === 'yes') ? VICE_HEADMASTER + FORMMASTER : VICE_HEADMASTER;
            if(bonus > 56000){
                return 56000;
            } else {
                return bonus;
            }
        } else {
            return 0;
        }
    }, 
    value4: function() {
        let sum = 0;

        let kids_6 = Template.instance().kids_6.get();
        let kids_7_16 = Template.instance().kids_7_16.get();
        let kids_17_22 = Template.instance().kids_17_22.get();
        
        if(kids_6) sum += KIDS_1*(+kids_6);
        if(kids_7_16) sum += KIDS_2*(+kids_7_16);
        if(kids_17_22) sum += KIDS_3*(+kids_17_22);

        return sum;
    }, 
    value5: function() {
        let degree = Template.instance().degree.get();

        if(degree === 'bachelor') return BACHELOR;
        else if(degree === 'master') return MASTER;
        else if(degree === 'phd' || degree === 'doctor') return PHD;
        else return 0;
    },
    value6: function() {
        let workingRegion = Template.instance().workRegion.get();
        let maritalStatus = Template.instance().maritalStatus.get();

        if(workingRegion === 'regionA' && maritalStatus === 'married-to-employed')
            return REGION_A_MARRIED_EMPLOYED;
        if(workingRegion === 'regionB' && maritalStatus === 'married-to-employed')
            return REGION_B_MARRIED_EMPLOYED;
        if(workingRegion === 'regionC' && maritalStatus === 'married-to-employed')
            return REGION_C_MARRIED_EMPLOYED;
        if(workingRegion === 'regionD' && maritalStatus === 'married-to-employed')
            return REGION_D_MARRIED_EMPLOYED;
        if(workingRegion === 'regionA' && maritalStatus === 'married-to-unemployed')
            return REGION_A_MARRIED_UNEMPLOYED;
        if(workingRegion === 'regionB' && maritalStatus === 'married-to-unemployed')
            return REGION_B_MARRIED_UNEMPLOYED;
        if(workingRegion === 'regionC' && maritalStatus === 'married-to-unemployed')
            return REGION_C_MARRIED_UNEMPLOYED;
        if(workingRegion === 'regionD' && maritalStatus === 'married-to-unemployed')
            return REGION_D_MARRIED_UNEMPLOYED;
        if(workingRegion === 'regionA' && maritalStatus === 'widowed-divorced')
            return REGION_A_WIDOWED;
        if(workingRegion === 'regionB' && maritalStatus === 'widowed-divorced')
            return REGION_B_WIDOWED;
        if(workingRegion === 'regionC' && maritalStatus === 'widowed-divorced')
            return REGION_C_WIDOWED;
        if(workingRegion === 'regionD' && maritalStatus === 'widowed-divorced')
            return REGION_D_WIDOWED;
        if(workingRegion === 'regionA' && maritalStatus === 'single')
            return REGION_A_SINGLE;
        if(workingRegion === 'regionB' && maritalStatus === 'single')
            return REGION_B_SINGLE;
        if(workingRegion === 'regionC' && maritalStatus === 'single')
            return REGION_C_SINGLE;
        if(workingRegion === 'regionD' && maritalStatus === 'single')
            return REGION_D_SINGLE;
        return 0;
    }, 
    value7: function () {
        let housing = Template.instance().housing.get();
        let maritalStatus = Template.instance().maritalStatus.get();
        let rotation = Template.instance().rotation.get();

        if(rotation !== 'yes') return 0;

        if(housing === 'regionA' && maritalStatus === 'married-to-employed')
            return HOUSING_A_MARRIED_EMPLOYED;
        if(housing === 'regionB' && maritalStatus === 'married-to-employed')
            return HOUSING_B_MARRIED_EMPLOYED;
        if(housing === 'regionC' && maritalStatus === 'married-to-employed')
            return HOUSING_C_MARRIED_EMPLOYED;
        if(housing === 'regionD' && maritalStatus === 'married-to-employed')
            return HOUSING_D_MARRIED_EMPLOYED;
        if(housing === 'regionA' && maritalStatus === 'married-to-unemployed')
            return HOUSING_A_MARRIED_UNEMPLOYED;
        if(housing === 'regionB' && maritalStatus === 'married-to-unemployed')
            return HOUSING_B_MARRIED_UNEMPLOYED;
        if(housing === 'regionC' && maritalStatus === 'married-to-unemployed')
            return HOUSING_C_MARRIED_UNEMPLOYED;
        if(housing === 'regionD' && maritalStatus === 'married-to-unemployed')
            return HOUSING_D_MARRIED_UNEMPLOYED;
        if(housing === 'regionA' && maritalStatus === 'widowed-divorced')
            return HOUSING_A_WIDOWED;
        if(housing === 'regionB' && maritalStatus === 'widowed-divorced')
            return HOUSING_B_WIDOWED;
        if(housing === 'regionC' && maritalStatus === 'widowed-divorced')
            return HOUSING_C_WIDOWED;
        if(housing === 'regionD' && maritalStatus === 'widowed-divorced')
            return HOUSING_D_WIDOWED;
        if(housing === 'regionA' && maritalStatus === 'single')
            return HOUSING_A_SINGLE;
        if(housing === 'regionB' && maritalStatus === 'single')
            return HOUSING_B_SINGLE;
        if(housing === 'regionC' && maritalStatus === 'single')
            return HOUSING_C_SINGLE;
        if(housing === 'regionD' && maritalStatus === 'single')
            return HOUSING_D_SINGLE;
        return 0;
    },
    value8: function() {
        let englishOption = Template.instance().englishOption.get();
        let ielts = Template.instance().ielts.get();

        if(englishOption === 'option1' && ielts === '6.0')
            return ENGLISH_1;
        if(englishOption === 'option1' && ielts === '6.5')
            return ENGLISH_2;
        if(englishOption === 'option1' && ielts === '7.0')
            return ENGLISH_3;
        if(englishOption === 'option1' && ielts === '7.5')
            return ENGLISH_4;
        if(englishOption === 'option1' && ielts === '8.0')
            return ENGLISH_5_1;
        if(englishOption === 'option1' && ielts === 'celta')
            return ENGLISH_6_1;
        if(englishOption === 'option2' && ielts === '5.0')
            return ENGLISH_1;
        if(englishOption === 'option2' && ielts === '5.5')
            return ENGLISH_2;
        if(englishOption === 'option2' && ielts === '6.0')
            return ENGLISH_3;
        if(englishOption === 'option2' && ielts === '6.5')
            return ENGLISH_4;
        if(englishOption === 'option2' && ielts === '7.0')
            return ENGLISH_5_2;
        if(englishOption === 'option2' && (ielts === '7.5' || ielts === '8.0'))
            return ENGLISH_6_2;
        if(englishOption === 'option3' && ielts === '4.0')
            return ENGLISH_1;
        if(englishOption === 'option3' && ielts === '4.5')
            return ENGLISH_2;
        if(englishOption === 'option3' && ielts === '5.0')
            return ENGLISH_3;
        if(englishOption === 'option3' && ielts === '5.5')
            return ENGLISH_4;
        if(englishOption === 'option3' && ielts === '6.0')
            return ENGLISH_5_2;
        if(englishOption === 'option3' && (ielts === '6.5' || ielts === '7.0' || ielts === '7.5' || ielts === '8.0'))
            return ENGLISH_6_2;
        return 0;            
    }, 
    value9: function() {
        let tat = Template.instance().tat.get();

        if(tat === 'group1') return TAT_4;
        if(tat === 'group2') return TAT_3;
        if(tat === 'group3') return TAT_2;
        if(tat === 'group4') return TAT_1;
        
        return 0;
    },
    value10: function() {
        let rotation = Template.instance().rotation.get();
        let kindergarden = Template.instance().kindergarden.get();

        if(rotation === 'yes') {
            if((+kindergarden)*KINDERGARDEN_COEFFICIENT > 20000) return 20000;
            else return (+kindergarden)*KINDERGARDEN_COEFFICIENT;
        }

        return 0;
    },
    value11: function() {
        let rotation = Template.instance().rotation.get();

        if(rotation !== 'yes') return 0;

        let sum = 0;

        sum += Template.calculator.__helpers.get('value1').call();
        sum += Template.calculator.__helpers.get('value2').call();
        sum += Template.calculator.__helpers.get('value3').call();
        sum += Template.calculator.__helpers.get('value4').call();
        sum += Template.calculator.__helpers.get('value5').call();
        sum += Template.calculator.__helpers.get('value6').call();
        sum += Template.calculator.__helpers.get('value7').call();
        sum += Template.calculator.__helpers.get('value8').call();
        sum += Template.calculator.__helpers.get('value9').call();
        sum += Template.calculator.__helpers.get('value10').call();

        return sum*ROTATION;
    }, 
    value12: function() {
        let total = 0;
        total += Template.calculator.__helpers.get('value1').call();
        total += Template.calculator.__helpers.get('value2').call();
        total += Template.calculator.__helpers.get('value3').call();
        total += Template.calculator.__helpers.get('value4').call();
        total += Template.calculator.__helpers.get('value5').call();
        total += Template.calculator.__helpers.get('value6').call();
        total += Template.calculator.__helpers.get('value7').call();
        total += Template.calculator.__helpers.get('value8').call();
        total += Template.calculator.__helpers.get('value9').call();
        total += Template.calculator.__helpers.get('value10').call();
        total += Template.calculator.__helpers.get('value11').call();

        return total;
    },
    value13: function() {
        let currentSalary = Template.instance().currentSalary.get();
        let actualSalary = Template.calculator.__helpers.get('value12').call();

        if(actualSalary - currentSalary < 0) return 0;
        else return (actualSalary - currentSalary);
    }
});

Template.calculator.events({
    "keyup #input"(event, template) {
        template.workExperience.set(template.find('[name=workExperience]').value);
        template.kids_6.set(template.find('[name=kids_6]').value);
        template.kids_7_16.set(template.find('[name=kids_7_16]').value);
        template.kids_17_22.set(template.find('[name=kids_17_22]').value);
        template.kindergarden.set(template.find('[name=kindergardenFee]').value);
        template.currentSalary.set(template.find('[name=currentSalary]').value);
    },
    'change #select' (event, template) {
        template.specialPosition.set(template.find('[name=specialPosition]').value);
        template.degree.set(template.find('[name=academicDegree]').value);
        template.housing.set(template.find('[name=housing]').value);
        template.maritalStatus.set(template.find('[name=maritalStatus]').value);
        template.workRegion.set(template.find('[name=workRegion]').value);
        template.englishOption.set(template.find('[name=englishOption]').value);
        template.ielts.set(template.find('[name=ielts]').value);
        template.tat.set(template.find('[name=tat]').value);
        template.rotation.set(template.find('[name=rotation]').value);
    }
})
