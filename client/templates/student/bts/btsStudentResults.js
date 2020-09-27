import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './btsStudentResults.html';
import { parseStudentKey } from "./parseAnswerKeyForStudent";;
import { parseAnswerKeyForStudent } from "./parseAnswerKeyForStudent";

Template.btsStudentResults.onCreated(function(){
    let template = this
    template.day = new ReactiveVar('1');
    template.autorun(()=>{
        template.subscribe("btsStudentResults",academicYear.get(),FlowRouter.getParam("btsNo"))
        template.subscribe("btsKeys",academicYear.get(),FlowRouter.getParam("btsNo"))
    })
})

Template.btsStudentResults.helpers({
    answerPhysicsKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay2 = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let parsePhysicsKeys = parseAnswerKeyForStudent(answerKeysDay2.physics)
        let correctKeys = {};

        correctKeys.first = parsePhysicsKeys[0];
        correctKeys.second = parsePhysicsKeys[1];
        correctKeys.third = parsePhysicsKeys[2];
        correctKeys.fourth = parsePhysicsKeys[3];
        correctKeys.fifth = parsePhysicsKeys[4];
        correctKeys.sixth = parsePhysicsKeys[5];
        correctKeys.seventh = parsePhysicsKeys[6];
        correctKeys.eighth = parsePhysicsKeys[7];
        correctKeys.ninth = parsePhysicsKeys[8];
        correctKeys.tenth = parsePhysicsKeys[9];
        correctKeys.eleven = parsePhysicsKeys[10];
        correctKeys.twelve = parsePhysicsKeys[11];
        correctKeys.thirteen = parsePhysicsKeys[12];
        correctKeys.fourteen = parsePhysicsKeys[13];
        correctKeys.fifteen = parsePhysicsKeys[14];
        correctKeys.sixteen = parsePhysicsKeys[15];
        correctKeys.seventeen = parsePhysicsKeys[16];
        correctKeys.eighteen = parsePhysicsKeys[17];
        correctKeys.nineteen = parsePhysicsKeys[18];
        correctKeys.twenty = parsePhysicsKeys[19];

        return correctKeys;
    },
    answerChemistryKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay2 = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let parseChemistryKeys = parseAnswerKeyForStudent(answerKeysDay2.chemistry)
        let correctKeys = {};

        correctKeys.first = parseChemistryKeys[0];
        correctKeys.second = parseChemistryKeys[1];
        correctKeys.third = parseChemistryKeys[2];
        correctKeys.fourth = parseChemistryKeys[3];
        correctKeys.fifth = parseChemistryKeys[4];
        correctKeys.sixth = parseChemistryKeys[5];
        correctKeys.seventh = parseChemistryKeys[6];
        correctKeys.eighth = parseChemistryKeys[7];
        correctKeys.ninth = parseChemistryKeys[8];
        correctKeys.tenth = parseChemistryKeys[9];
        correctKeys.eleven = parseChemistryKeys[10];
        correctKeys.twelve = parseChemistryKeys[11];
        correctKeys.thirteen = parseChemistryKeys[12];
        correctKeys.fourteen = parseChemistryKeys[13];
        correctKeys.fifteen = parseChemistryKeys[14];
        correctKeys.sixteen = parseChemistryKeys[15];
        correctKeys.seventeen = parseChemistryKeys[16];
        correctKeys.eighteen = parseChemistryKeys[17];
        correctKeys.nineteen = parseChemistryKeys[18];
        correctKeys.twenty = parseChemistryKeys[19];

        return correctKeys;
    },
    answerBiologyKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay2 = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let parseBiologyKeys = parseAnswerKeyForStudent(answerKeysDay2.biology)
        let correctKeys = {};

        correctKeys.first = parseBiologyKeys[0];
        correctKeys.second = parseBiologyKeys[1];
        correctKeys.third = parseBiologyKeys[2];
        correctKeys.fourth = parseBiologyKeys[3];
        correctKeys.fifth = parseBiologyKeys[4];
        correctKeys.sixth = parseBiologyKeys[5];
        correctKeys.seventh = parseBiologyKeys[6];
        correctKeys.eighth = parseBiologyKeys[7];
        correctKeys.ninth = parseBiologyKeys[8];
        correctKeys.tenth = parseBiologyKeys[9];
        correctKeys.eleven = parseBiologyKeys[10];
        correctKeys.twelve = parseBiologyKeys[11];
        correctKeys.thirteen = parseBiologyKeys[12];
        correctKeys.fourteen = parseBiologyKeys[13];
        correctKeys.fifteen = parseBiologyKeys[14];
        correctKeys.sixteen = parseBiologyKeys[15];
        correctKeys.seventeen = parseBiologyKeys[16];
        correctKeys.eighteen = parseBiologyKeys[17];
        correctKeys.nineteen = parseBiologyKeys[18];
        correctKeys.twenty = parseBiologyKeys[19];

        return correctKeys;
    },
    answerEnglishKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay1 = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        let parseEnglishKeys = parseAnswerKeyForStudent(answerKeysDay1.english)
        let correctKeys = {};

        correctKeys.first = parseEnglishKeys[0];
        correctKeys.second = parseEnglishKeys[1];
        correctKeys.third = parseEnglishKeys[2];
        correctKeys.fourth = parseEnglishKeys[3];
        correctKeys.fifth = parseEnglishKeys[4];
        correctKeys.sixth = parseEnglishKeys[5];
        correctKeys.seventh = parseEnglishKeys[6];
        correctKeys.eighth = parseEnglishKeys[7];
        correctKeys.ninth = parseEnglishKeys[8];
        correctKeys.tenth = parseEnglishKeys[9];
        correctKeys.eleven = parseEnglishKeys[10];
        correctKeys.twelve = parseEnglishKeys[11];
        correctKeys.thirteen = parseEnglishKeys[12];
        correctKeys.fourteen = parseEnglishKeys[13];
        correctKeys.fifteen = parseEnglishKeys[14];
        correctKeys.sixteen = parseEnglishKeys[15];
        correctKeys.seventeen = parseEnglishKeys[16];
        correctKeys.eighteen = parseEnglishKeys[17];
        correctKeys.nineteen = parseEnglishKeys[18];
        correctKeys.twenty = parseEnglishKeys[19];

        return correctKeys;
    },
    answerKazakhKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay1 = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        let parseKazakhKeys = {}
        if (cursor.languageGroup == 'kaz'){
            parseKazakhKeys = parseAnswerKeyForStudent(answerKeysDay1.kazakh_kaz)
        }
        else {
            parseKazakhKeys = parseAnswerKeyForStudent(answerKeysDay1.kazakh_rus)
        }
        let correctKeys = {};

        correctKeys.first = parseKazakhKeys[0];
        correctKeys.second = parseKazakhKeys[1];
        correctKeys.third = parseKazakhKeys[2];
        correctKeys.fourth = parseKazakhKeys[3];
        correctKeys.fifth = parseKazakhKeys[4];
        correctKeys.sixth = parseKazakhKeys[5];
        correctKeys.seventh = parseKazakhKeys[6];
        correctKeys.eighth = parseKazakhKeys[7];
        correctKeys.ninth = parseKazakhKeys[8];
        correctKeys.tenth = parseKazakhKeys[9];
        correctKeys.eleven = parseKazakhKeys[10];
        correctKeys.twelve = parseKazakhKeys[11];
        correctKeys.thirteen = parseKazakhKeys[12];
        correctKeys.fourteen = parseKazakhKeys[13];
        correctKeys.fifteen = parseKazakhKeys[14];
        correctKeys.sixteen = parseKazakhKeys[15];
        correctKeys.seventeen = parseKazakhKeys[16];
        correctKeys.eighteen = parseKazakhKeys[17];
        correctKeys.nineteen = parseKazakhKeys[18];
        correctKeys.twenty = parseKazakhKeys[19];

        return correctKeys;
    },
    answerKazLitKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay1 = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        let parseKazLitKeys = {}
        if (cursor.languageGroup == 'kaz'){
            parseKazLitKeys = parseAnswerKeyForStudent(answerKeysDay1.kazakh_literature_kaz)
        }
        else {
            parseKazLitKeys = parseAnswerKeyForStudent(answerKeysDay1.kazakh_literature_rus)
        }
        let correctKeys = {};

        correctKeys.first = parseKazLitKeys[0];
        correctKeys.second = parseKazLitKeys[1];
        correctKeys.third = parseKazLitKeys[2];
        correctKeys.fourth = parseKazLitKeys[3];
        correctKeys.fifth = parseKazLitKeys[4];
        correctKeys.sixth = parseKazLitKeys[5];
        correctKeys.seventh = parseKazLitKeys[6];
        correctKeys.eighth = parseKazLitKeys[7];
        correctKeys.ninth = parseKazLitKeys[8];
        correctKeys.tenth = parseKazLitKeys[9];

        return correctKeys;
    },
    answerRussianKeys() {
        let cursor = BtsResults.findOne()
        // if (cursor.grade == '7' || cursor.grade == '8'){
        //     let answerKeysDay1 = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        //     let parseRussianKeys = parseAnswerKeyForStudent(answerKeysDay1.russian)
        // }else {
            let answerKeysDay2 = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
            let parseRussianKeys = parseAnswerKeyForStudent(answerKeysDay2.russian)
        //}
        let correctKeys = {};

        correctKeys.first = parseRussianKeys[0];
        correctKeys.second = parseRussianKeys[1];
        correctKeys.third = parseRussianKeys[2];
        correctKeys.fourth = parseRussianKeys[3];
        correctKeys.fifth = parseRussianKeys[4];
        correctKeys.sixth = parseRussianKeys[5];
        correctKeys.seventh = parseRussianKeys[6];
        correctKeys.eighth = parseRussianKeys[7];
        correctKeys.ninth = parseRussianKeys[8];
        correctKeys.tenth = parseRussianKeys[9];
        correctKeys.eleven = parseRussianKeys[10];
        correctKeys.twelve = parseRussianKeys[11];
        correctKeys.thirteen = parseRussianKeys[12];
        correctKeys.fourteen = parseRussianKeys[13];
        correctKeys.fifteen = parseRussianKeys[14];
        correctKeys.sixteen = parseRussianKeys[15];
        correctKeys.seventeen = parseRussianKeys[16];
        correctKeys.eighteen = parseRussianKeys[17];
        correctKeys.nineteen = parseRussianKeys[18];
        correctKeys.twenty = parseRussianKeys[19];

        return correctKeys;
    },
    answerAlgebraKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay1 = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        let parseAlgebraKeys = parseAnswerKeyForStudent(answerKeysDay1.algebra)
        let correctKeys = {};

        correctKeys.first = parseAlgebraKeys[0];
        correctKeys.second = parseAlgebraKeys[1];
        correctKeys.third = parseAlgebraKeys[2];
        correctKeys.fourth = parseAlgebraKeys[3];
        correctKeys.fifth = parseAlgebraKeys[4];
        correctKeys.sixth = parseAlgebraKeys[5];
        correctKeys.seventh = parseAlgebraKeys[6];
        correctKeys.eighth = parseAlgebraKeys[7];
        correctKeys.ninth = parseAlgebraKeys[8];
        correctKeys.tenth = parseAlgebraKeys[9];
        correctKeys.eleven = parseAlgebraKeys[10];
        correctKeys.twelve = parseAlgebraKeys[11];
        correctKeys.thirteen = parseAlgebraKeys[12];
        correctKeys.fourteen = parseAlgebraKeys[13];
        correctKeys.fifteen = parseAlgebraKeys[14];
        correctKeys.sixteen = parseAlgebraKeys[15];
        correctKeys.seventeen = parseAlgebraKeys[16];
        correctKeys.eighteen = parseAlgebraKeys[17];
        correctKeys.nineteen = parseAlgebraKeys[18];
        correctKeys.twenty = parseAlgebraKeys[19];

        return correctKeys;
    },
    answerGeometryKeys() {
        let cursor = BtsResults.findOne()
        // if (cursor.grade == '7' || cursor.grade == '8'){
        //     let answerKeysDay2 = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        //     let parseGeometryKeys = parseAnswerKeyForStudent(answerKeysDay2.geometry)
        // }else {
             let answerKeysDay1 = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
             let parseGeometryKeys = parseAnswerKeyForStudent(answerKeysDay1.geometry)
        // }
        let correctKeys = {};

        correctKeys.first = parseGeometryKeys[0];
        correctKeys.second = parseGeometryKeys[1];
        correctKeys.third = parseGeometryKeys[2];
        correctKeys.fourth = parseGeometryKeys[3];
        correctKeys.fifth = parseGeometryKeys[4];
        correctKeys.sixth = parseGeometryKeys[5];
        correctKeys.seventh = parseGeometryKeys[6];
        correctKeys.eighth = parseGeometryKeys[7];
        correctKeys.ninth = parseGeometryKeys[8];
        correctKeys.tenth = parseGeometryKeys[9];
        correctKeys.eleven = parseGeometryKeys[10];
        correctKeys.twelve = parseGeometryKeys[11];
        correctKeys.thirteen = parseGeometryKeys[12];
        correctKeys.fourteen = parseGeometryKeys[13];
        correctKeys.fifteen = parseGeometryKeys[14];
        correctKeys.sixteen = parseGeometryKeys[15];
        correctKeys.seventeen = parseGeometryKeys[16];
        correctKeys.eighteen = parseGeometryKeys[17];
        correctKeys.nineteen = parseGeometryKeys[18];
        correctKeys.twenty = parseGeometryKeys[19];
        

        return correctKeys;
    },
    answerComputerKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay2 = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let parseComputerKeys = parseAnswerKeyForStudent(answerKeysDay2.computer)
        let correctKeys = {};

        correctKeys.first = parseComputerKeys[0];
        correctKeys.second = parseComputerKeys[1];
        correctKeys.third = parseComputerKeys[2];
        correctKeys.fourth = parseComputerKeys[3];
        correctKeys.fifth = parseComputerKeys[4];
        correctKeys.sixth = parseComputerKeys[5];
        correctKeys.seventh = parseComputerKeys[6];
        correctKeys.eighth = parseComputerKeys[7];
        correctKeys.ninth = parseComputerKeys[8];
        correctKeys.tenth = parseComputerKeys[9];
        correctKeys.eleven = parseComputerKeys[10];
        correctKeys.twelve = parseComputerKeys[11];
        correctKeys.thirteen = parseComputerKeys[12];
        correctKeys.fourteen = parseComputerKeys[13];
        correctKeys.fifteen = parseComputerKeys[14];
        correctKeys.sixteen = parseComputerKeys[15];
        correctKeys.seventeen = parseComputerKeys[16];
        correctKeys.eighteen = parseComputerKeys[17];
        correctKeys.nineteen = parseComputerKeys[18];
        correctKeys.twenty = parseComputerKeys[19];

        return correctKeys;
    },
    answerTurkishKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay2 = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let parseTurkishKeys = parseAnswerKeyForStudent(answerKeysDay2.turkish)
        let correctKeys = {};

        correctKeys.first = parseTurkishKeys[0];
        correctKeys.second = parseTurkishKeys[1];
        correctKeys.third = parseTurkishKeys[2];
        correctKeys.fourth = parseTurkishKeys[3];
        correctKeys.fifth = parseTurkishKeys[4];
        correctKeys.sixth = parseTurkishKeys[5];
        correctKeys.seventh = parseTurkishKeys[6];
        correctKeys.eighth = parseTurkishKeys[7];
        correctKeys.ninth = parseTurkishKeys[8];
        correctKeys.tenth = parseTurkishKeys[9];
        correctKeys.eleven = parseTurkishKeys[10];
        correctKeys.twelve = parseTurkishKeys[11];
        correctKeys.thirteen = parseTurkishKeys[12];
        correctKeys.fourteen = parseTurkishKeys[13];
        correctKeys.fifteen = parseTurkishKeys[14];
        correctKeys.sixteen = parseTurkishKeys[15];
        correctKeys.seventeen = parseTurkishKeys[16];
        correctKeys.eighteen = parseTurkishKeys[17];
        correctKeys.nineteen = parseTurkishKeys[18];
        correctKeys.twenty = parseTurkishKeys[19];

        return correctKeys;
    },
    answerWHistoryKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay2 = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let parseWHistoryKeys = parseAnswerKeyForStudent(answerKeysDay2.world_history)
        let correctKeys = {};

        correctKeys.first = parseWHistoryKeys[0];
        correctKeys.second = parseWHistoryKeys[1];
        correctKeys.third = parseWHistoryKeys[2];
        correctKeys.fourth = parseWHistoryKeys[3];
        correctKeys.fifth = parseWHistoryKeys[4];
        correctKeys.sixth = parseWHistoryKeys[5];
        correctKeys.seventh = parseWHistoryKeys[6];
        correctKeys.eighth = parseWHistoryKeys[7];
        correctKeys.ninth = parseWHistoryKeys[8];
        correctKeys.tenth = parseWHistoryKeys[9];
        correctKeys.eleven = parseWHistoryKeys[10];
        correctKeys.twelve = parseWHistoryKeys[11];
        correctKeys.thirteen = parseWHistoryKeys[12];
        correctKeys.fourteen = parseWHistoryKeys[13];
        correctKeys.fifteen = parseWHistoryKeys[14];
        correctKeys.sixteen = parseWHistoryKeys[15];
        correctKeys.seventeen = parseWHistoryKeys[16];
        correctKeys.eighteen = parseWHistoryKeys[17];
        correctKeys.nineteen = parseWHistoryKeys[18];
        correctKeys.twenty = parseWHistoryKeys[19];

        return correctKeys;
    },
    answerKazHistoryKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay1 = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        let parseKazHistoryKeys = parseAnswerKeyForStudent(answerKeysDay1.kazakh_history)
        let correctKeys = {};

        correctKeys.first = parseKazHistoryKeys[0];
        correctKeys.second = parseKazHistoryKeys[1];
        correctKeys.third = parseKazHistoryKeys[2];
        correctKeys.fourth = parseKazHistoryKeys[3];
        correctKeys.fifth = parseKazHistoryKeys[4];
        correctKeys.sixth = parseKazHistoryKeys[5];
        correctKeys.seventh = parseKazHistoryKeys[6];
        correctKeys.eighth = parseKazHistoryKeys[7];
        correctKeys.ninth = parseKazHistoryKeys[8];
        correctKeys.tenth = parseKazHistoryKeys[9];
        correctKeys.eleven = parseKazHistoryKeys[10];
        correctKeys.twelve = parseKazHistoryKeys[11];
        correctKeys.thirteen = parseKazHistoryKeys[12];
        correctKeys.fourteen = parseKazHistoryKeys[13];
        correctKeys.fifteen = parseKazHistoryKeys[14];
        correctKeys.sixteen = parseKazHistoryKeys[15];
        correctKeys.seventeen = parseKazHistoryKeys[16];
        correctKeys.eighteen = parseKazHistoryKeys[17];
        correctKeys.nineteen = parseKazHistoryKeys[18];
        correctKeys.twenty = parseKazHistoryKeys[19];

        return correctKeys;
    },
    answerGeographyKeys() {
        let cursor = BtsResults.findOne()
        let answerKeysDay2 = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let parseGeographyKeys = parseAnswerKeyForStudent(answerKeysDay2.geography)
        let correctKeys = {};

        correctKeys.first = parseGeographyKeys[0];
        correctKeys.second = parseGeographyKeys[1];
        correctKeys.third = parseGeographyKeys[2];
        correctKeys.fourth = parseGeographyKeys[3];
        correctKeys.fifth = parseGeographyKeys[4];
        correctKeys.sixth = parseGeographyKeys[5];
        correctKeys.seventh = parseGeographyKeys[6];
        correctKeys.eighth = parseGeographyKeys[7];
        correctKeys.ninth = parseGeographyKeys[8];
        correctKeys.tenth = parseGeographyKeys[9];
        correctKeys.eleven = parseGeographyKeys[10];
        correctKeys.twelve = parseGeographyKeys[11];
        correctKeys.thirteen = parseGeographyKeys[12];
        correctKeys.fourteen = parseGeographyKeys[13];
        correctKeys.fifteen = parseGeographyKeys[14];
        correctKeys.sixteen = parseGeographyKeys[15];
        correctKeys.seventeen = parseGeographyKeys[16];
        correctKeys.eighteen = parseGeographyKeys[17];
        correctKeys.nineteen = parseGeographyKeys[18];
        correctKeys.twenty = parseGeographyKeys[19];

        return correctKeys;
    },

    studentPhysicsKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let studentKeysPhysics = parseStudentKey(parseAnswerKeyForStudent(answerKeys.physics),cursor.day_2_keys.slice(0,100))
        let studentKeys = {};

        studentKeys.first = studentKeysPhysics[0];
        studentKeys.second = studentKeysPhysics[1];
        studentKeys.third = studentKeysPhysics[2];
        studentKeys.fourth = studentKeysPhysics[3];
        studentKeys.fifth = studentKeysPhysics[4];
        studentKeys.sixth = studentKeysPhysics[5];
        studentKeys.seventh = studentKeysPhysics[6];
        studentKeys.eighth = studentKeysPhysics[7];
        studentKeys.ninth = studentKeysPhysics[8];
        studentKeys.tenth = studentKeysPhysics[9];
        studentKeys.eleven = studentKeysPhysics[10];
        studentKeys.twelve = studentKeysPhysics[11];
        studentKeys.thirteen = studentKeysPhysics[12];
        studentKeys.fourteen = studentKeysPhysics[13];
        studentKeys.fifteen = studentKeysPhysics[14];
        studentKeys.sixteen = studentKeysPhysics[15];
        studentKeys.seventeen = studentKeysPhysics[16];
        studentKeys.eighteen = studentKeysPhysics[17];
        studentKeys.nineteen = studentKeysPhysics[18];
        studentKeys.twenty = studentKeysPhysics[19];

        return studentKeys;
    },
    studentChemistryKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let studentKeysChemistry = parseStudentKey(parseAnswerKeyForStudent(answerKeys.chemistry),cursor.day_2_keys.slice(100,200))
        let studentKeys = {};

        studentKeys.first = studentKeysChemistry[0];
        studentKeys.second = studentKeysChemistry[1];
        studentKeys.third = studentKeysChemistry[2];
        studentKeys.fourth = studentKeysChemistry[3];
        studentKeys.fifth = studentKeysChemistry[4];
        studentKeys.sixth = studentKeysChemistry[5];
        studentKeys.seventh = studentKeysChemistry[6];
        studentKeys.eighth = studentKeysChemistry[7];
        studentKeys.ninth = studentKeysChemistry[8];
        studentKeys.tenth = studentKeysChemistry[9];
        studentKeys.eleven = studentKeysChemistry[10];
        studentKeys.twelve = studentKeysChemistry[11];
        studentKeys.thirteen = studentKeysChemistry[12];
        studentKeys.fourteen = studentKeysChemistry[13];
        studentKeys.fifteen = studentKeysChemistry[14];
        studentKeys.sixteen = studentKeysChemistry[15];
        studentKeys.seventeen = studentKeysChemistry[16];
        studentKeys.eighteen = studentKeysChemistry[17];
        studentKeys.nineteen = studentKeysChemistry[18];
        studentKeys.twenty = studentKeysChemistry[19];

        return studentKeys;
    },
    studentBiologyKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let studentKeysBiology = parseStudentKey(parseAnswerKeyForStudent(answerKeys.biology),cursor.day_2_keys.slice(200,300))
        let studentKeys = {};

        studentKeys.first = studentKeysBiology[0];
        studentKeys.second = studentKeysBiology[1];
        studentKeys.third = studentKeysBiology[2];
        studentKeys.fourth = studentKeysBiology[3];
        studentKeys.fifth = studentKeysBiology[4];
        studentKeys.sixth = studentKeysBiology[5];
        studentKeys.seventh = studentKeysBiology[6];
        studentKeys.eighth = studentKeysBiology[7];
        studentKeys.ninth = studentKeysBiology[8];
        studentKeys.tenth = studentKeysBiology[9];
        studentKeys.eleven = studentKeysBiology[10];
        studentKeys.twelve = studentKeysBiology[11];
        studentKeys.thirteen = studentKeysBiology[12];
        studentKeys.fourteen = studentKeysBiology[13];
        studentKeys.fifteen = studentKeysBiology[14];
        studentKeys.sixteen = studentKeysBiology[15];
        studentKeys.seventeen = studentKeysBiology[16];
        studentKeys.eighteen = studentKeysBiology[17];
        studentKeys.nineteen = studentKeysBiology[18];
        studentKeys.twenty = studentKeysBiology[19];

        return studentKeys;
    },
    studentEnglishKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        let studentKeysEnglish = parseStudentKey(parseAnswerKeyForStudent(answerKeys.english),cursor.day_1_keys.slice(300,400))
        let studentKeys = {};

        studentKeys.first = studentKeysEnglish[0];
        studentKeys.second = studentKeysEnglish[1];
        studentKeys.third = studentKeysEnglish[2];
        studentKeys.fourth = studentKeysEnglish[3];
        studentKeys.fifth = studentKeysEnglish[4];
        studentKeys.sixth = studentKeysEnglish[5];
        studentKeys.seventh = studentKeysEnglish[6];
        studentKeys.eighth = studentKeysEnglish[7];
        studentKeys.ninth = studentKeysEnglish[8];
        studentKeys.tenth = studentKeysEnglish[9];
        studentKeys.eleven = studentKeysEnglish[10];
        studentKeys.twelve = studentKeysEnglish[11];
        studentKeys.thirteen = studentKeysEnglish[12];
        studentKeys.fourteen = studentKeysEnglish[13];
        studentKeys.fifteen = studentKeysEnglish[14];
        studentKeys.sixteen = studentKeysEnglish[15];
        studentKeys.seventeen = studentKeysEnglish[16];
        studentKeys.eighteen = studentKeysEnglish[17];
        studentKeys.nineteen = studentKeysEnglish[18];
        studentKeys.twenty = studentKeysEnglish[19];

        return studentKeys;
    },
    studentKazakhKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        let parseKazakhKeys = {}
        if (cursor.languageGroup == 'kaz'){
            parseKazakhKeys = parseAnswerKeyForStudent(answerKeys.kazakh_kaz)
        }
        else {
            parseKazakhKeys = parseAnswerKeyForStudent(answerKeys.kazakh_rus)
        }
        let studentKeysKazakh = parseStudentKey(parseKazakhKeys,cursor.day_1_keys.slice(0,100))
        let studentKeys = {};

        studentKeys.first = studentKeysKazakh[0];
        studentKeys.second = studentKeysKazakh[1];
        studentKeys.third = studentKeysKazakh[2];
        studentKeys.fourth = studentKeysKazakh[3];
        studentKeys.fifth = studentKeysKazakh[4];
        studentKeys.sixth = studentKeysKazakh[5];
        studentKeys.seventh = studentKeysKazakh[6];
        studentKeys.eighth = studentKeysKazakh[7];
        studentKeys.ninth = studentKeysKazakh[8];
        studentKeys.tenth = studentKeysKazakh[9];
        studentKeys.eleven = studentKeysKazakh[10];
        studentKeys.twelve = studentKeysKazakh[11];
        studentKeys.thirteen = studentKeysKazakh[12];
        studentKeys.fourteen = studentKeysKazakh[13];
        studentKeys.fifteen = studentKeysKazakh[14];
        studentKeys.sixteen = studentKeysKazakh[15];
        studentKeys.seventeen = studentKeysKazakh[16];
        studentKeys.eighteen = studentKeysKazakh[17];
        studentKeys.nineteen = studentKeysKazakh[18];
        studentKeys.twenty = studentKeysKazakh[19];

        return studentKeys;
    },
    // studentKazLitKeys() {
    //     let cursor = BtsResults.findOne();
    //     let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
    //     let parseKazLitKeys = {}
    //     if (cursor.languageGroup == 'kaz'){
    //         parseKazLitKeys = parseAnswerKeyForStudent(answerKeys.kazakh_literature_kaz)
    //     }
    //     else {
    //         parseKazLitKeys = parseAnswerKeyForStudent(answerKeys.kazakh_literature_rus)
    //     }
    //     let studentKeysKazLit = parseStudentKey(parseKazLitKeys,cursor.day_1_keys.slice(300,350))
    //     let studentKeys = {};

    //     studentKeys.first = studentKeysKazLit[0];
    //     studentKeys.second = studentKeysKazLit[1];
    //     studentKeys.third = studentKeysKazLit[2];
    //     studentKeys.fourth = studentKeysKazLit[3];
    //     studentKeys.fifth = studentKeysKazLit[4];
    //     studentKeys.sixth = studentKeysKazLit[5];
    //     studentKeys.seventh = studentKeysKazLit[6];
    //     studentKeys.eighth = studentKeysKazLit[7];
    //     studentKeys.ninth = studentKeysKazLit[8];
    //     studentKeys.tenth = studentKeysKazLit[9];

    //     return studentKeys;
    // },
    studentRussianKeys() {
        // let cursor = BtsResults.findOne();
        // if (cursor.grade == '7' || cursor.grade == '8'){
        //     let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        //     let studentKeysRussian = parseStudentKey(parseAnswerKeyForStudent(answerKeys.russian),cursor.day_1_keys.slice(100,200))
        // }else{
            let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
            let studentKeysRussian = parseStudentKey(parseAnswerKeyForStudent(answerKeys.russian),cursor.day_2_keys.slice(100,200))
        //}
        let studentKeys = {};

        studentKeys.first = studentKeysRussian[0];
        studentKeys.second = studentKeysRussian[1];
        studentKeys.third = studentKeysRussian[2];
        studentKeys.fourth = studentKeysRussian[3];
        studentKeys.fifth = studentKeysRussian[4];
        studentKeys.sixth = studentKeysRussian[5];
        studentKeys.seventh = studentKeysRussian[6];
        studentKeys.eighth = studentKeysRussian[7];
        studentKeys.ninth = studentKeysRussian[8];
        studentKeys.tenth = studentKeysRussian[9];
        studentKeys.eleven = studentKeysRussian[10];
        studentKeys.twelve = studentKeysRussian[11];
        studentKeys.thirteen = studentKeysRussian[12];
        studentKeys.fourteen = studentKeysRussian[13];
        studentKeys.fifteen = studentKeysRussian[14];
        studentKeys.sixteen = studentKeysRussian[15];
        studentKeys.seventeen = studentKeysRussian[16];
        studentKeys.eighteen = studentKeysRussian[17];
        studentKeys.nineteen = studentKeysRussian[18];
        studentKeys.twenty = studentKeysRussian[19];

        return studentKeys;
    },
    studentAlgebraKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        let studentKeysAlgebra = parseStudentKey(parseAnswerKeyForStudent(answerKeys.algebra),cursor.day_1_keys.slice(200,300))        
        let studentKeys = {};

        studentKeys.first = studentKeysAlgebra[0];
        studentKeys.second = studentKeysAlgebra[1];
        studentKeys.third = studentKeysAlgebra[2];
        studentKeys.fourth = studentKeysAlgebra[3];
        studentKeys.fifth = studentKeysAlgebra[4];
        studentKeys.sixth = studentKeysAlgebra[5];
        studentKeys.seventh = studentKeysAlgebra[6];
        studentKeys.eighth = studentKeysAlgebra[7];
        studentKeys.ninth = studentKeysAlgebra[8];
        studentKeys.tenth = studentKeysAlgebra[9];
        studentKeys.eleven = studentKeysAlgebra[10];
        studentKeys.twelve = studentKeysAlgebra[11];
        studentKeys.thirteen = studentKeysAlgebra[12];
        studentKeys.fourteen = studentKeysAlgebra[13];
        studentKeys.fifteen = studentKeysAlgebra[14];
        studentKeys.sixteen = studentKeysAlgebra[15];
        studentKeys.seventeen = studentKeysAlgebra[16];
        studentKeys.eighteen = studentKeysAlgebra[17];
        studentKeys.nineteen = studentKeysAlgebra[18];
        studentKeys.twenty = studentKeysAlgebra[19];


        return studentKeys;
    },
    studentGeometryKeys() {
        let cursor = BtsResults.findOne();
        // if (cursor.grade == '7' || cursor.grade == '8'){
        //     let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        //     let studentKeysGeometry = parseStudentKey(parseAnswerKeyForStudent(answerKeys.geometry),cursor.day_2_keys.slice(300,400))
        // }else{
            let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
            let studentKeysGeometry = parseStudentKey(parseAnswerKeyForStudent(answerKeys.geometry),cursor.day_1_keys.slice(300,400))
        //}
        let studentKeys = {};

        studentKeys.first = studentKeysGeometry[0];
        studentKeys.second = studentKeysGeometry[1];
        studentKeys.third = studentKeysGeometry[2];
        studentKeys.fourth = studentKeysGeometry[3];
        studentKeys.fifth = studentKeysGeometry[4];
        studentKeys.sixth = studentKeysGeometry[5];
        studentKeys.seventh = studentKeysGeometry[6];
        studentKeys.eighth = studentKeysGeometry[7];
        studentKeys.ninth = studentKeysGeometry[8];
        studentKeys.tenth = studentKeysGeometry[9];
        studentKeys.eleven = studentKeysGeometry[10];
        studentKeys.twelve = studentKeysGeometry[11];
        studentKeys.thirteen = studentKeysGeometry[12];
        studentKeys.fourteen = studentKeysGeometry[13];
        studentKeys.fifteen = studentKeysGeometry[14];
        studentKeys.sixteen = studentKeysGeometry[15];
        studentKeys.seventeen = studentKeysGeometry[16];
        studentKeys.eighteen = studentKeysGeometry[17];
        studentKeys.nineteen = studentKeysGeometry[18];
        studentKeys.twenty = studentKeysGeometry[19];

        return studentKeys;
    },
    studentComputerKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let studentKeysComputer = parseStudentKey(parseAnswerKeyForStudent(answerKeys.computer),cursor.day_2_keys.slice(0,100))
        let studentKeys = {};

        studentKeys.first = studentKeysComputer[0];
        studentKeys.second = studentKeysComputer[1];
        studentKeys.third = studentKeysComputer[2];
        studentKeys.fourth = studentKeysComputer[3];
        studentKeys.fifth = studentKeysComputer[4];
        studentKeys.sixth = studentKeysComputer[5];
        studentKeys.seventh = studentKeysComputer[6];
        studentKeys.eighth = studentKeysComputer[7];
        studentKeys.ninth = studentKeysComputer[8];
        studentKeys.tenth = studentKeysComputer[9];
        studentKeys.eleven = studentKeysComputer[10];
        studentKeys.twelve = studentKeysComputer[11];
        studentKeys.thirteen = studentKeysComputer[12];
        studentKeys.fourteen = studentKeysComputer[13];
        studentKeys.fifteen = studentKeysComputer[14];
        studentKeys.sixteen = studentKeysComputer[15];
        studentKeys.seventeen = studentKeysComputer[16];
        studentKeys.eighteen = studentKeysComputer[17];
        studentKeys.nineteen = studentKeysComputer[18];
        studentKeys.twenty = studentKeysComputer[19];

        return studentKeys;
    },
    studentTurkishKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let studentKeysTurkish = parseStudentKey(parseAnswerKeyForStudent(answerKeys.turkish),cursor.day_2_keys.slice(100,200))
        let studentKeys = {};

        studentKeys.first = studentKeysTurkish[0];
        studentKeys.second = studentKeysTurkish[1];
        studentKeys.third = studentKeysTurkish[2];
        studentKeys.fourth = studentKeysTurkish[3];
        studentKeys.fifth = studentKeysTurkish[4];
        studentKeys.sixth = studentKeysTurkish[5];
        studentKeys.seventh = studentKeysTurkish[6];
        studentKeys.eighth = studentKeysTurkish[7];
        studentKeys.ninth = studentKeysTurkish[8];
        studentKeys.tenth = studentKeysTurkish[9];
        studentKeys.eleven = studentKeysTurkish[10];
        studentKeys.twelve = studentKeysTurkish[11];
        studentKeys.thirteen = studentKeysTurkish[12];
        studentKeys.fourteen = studentKeysTurkish[13];
        studentKeys.fifteen = studentKeysTurkish[14];
        studentKeys.sixteen = studentKeysTurkish[15];
        studentKeys.seventeen = studentKeysTurkish[16];
        studentKeys.eighteen = studentKeysTurkish[17];
        studentKeys.nineteen = studentKeysTurkish[18];
        studentKeys.twenty = studentKeysTurkish[19];

        return studentKeys;
    },
    studentWHistoryKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let studentKeysWHistory = parseStudentKey(parseAnswerKeyForStudent(answerKeys.world_history),cursor.day_2_keys.slice(200,300))
        let studentKeys = {};

        studentKeys.first = studentKeysWHistory[0];
        studentKeys.second = studentKeysWHistory[1];
        studentKeys.third = studentKeysWHistory[2];
        studentKeys.fourth = studentKeysWHistory[3];
        studentKeys.fifth = studentKeysWHistory[4];
        studentKeys.sixth = studentKeysWHistory[5];
        studentKeys.seventh = studentKeysWHistory[6];
        studentKeys.eighth = studentKeysWHistory[7];
        studentKeys.ninth = studentKeysWHistory[8];
        studentKeys.tenth = studentKeysWHistory[9];
        studentKeys.eleven = studentKeysWHistory[10];
        studentKeys.twelve = studentKeysWHistory[11];
        studentKeys.thirteen = studentKeysWHistory[12];
        studentKeys.fourteen = studentKeysWHistory[13];
        studentKeys.fifteen = studentKeysWHistory[14];
        studentKeys.sixteen = studentKeysWHistory[15];
        studentKeys.seventeen = studentKeysWHistory[16];
        studentKeys.eighteen = studentKeysWHistory[17];
        studentKeys.nineteen = studentKeysWHistory[18];
        studentKeys.twenty = studentKeysWHistory[19];

        return studentKeys;
    },
    studentKazHistoryKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_1})
        let studentKeysKazHistory = parseStudentKey(parseAnswerKeyForStudent(answerKeys.kazakh_history),cursor.day_1_keys.slice(300,400))
        let studentKeys = {};

        studentKeys.first = studentKeysKazHistory[0];
        studentKeys.second = studentKeysKazHistory[1];
        studentKeys.third = studentKeysKazHistory[2];
        studentKeys.fourth = studentKeysKazHistory[3];
        studentKeys.fifth = studentKeysKazHistory[4];
        studentKeys.sixth = studentKeysKazHistory[5];
        studentKeys.seventh = studentKeysKazHistory[6];
        studentKeys.eighth = studentKeysKazHistory[7];
        studentKeys.ninth = studentKeysKazHistory[8];
        studentKeys.tenth = studentKeysKazHistory[9];
        studentKeys.eleven = studentKeysKazHistory[10];
        studentKeys.twelve = studentKeysKazHistory[11];
        studentKeys.thirteen = studentKeysKazHistory[12];
        studentKeys.fourteen = studentKeysKazHistory[13];
        studentKeys.fifteen = studentKeysKazHistory[14];
        studentKeys.sixteen = studentKeysKazHistory[15];
        studentKeys.seventeen = studentKeysKazHistory[16];
        studentKeys.eighteen = studentKeysKazHistory[17];
        studentKeys.nineteen = studentKeysKazHistory[18];
        studentKeys.twenty = studentKeysKazHistory[19];

        return studentKeys;
    },
    studentGeographyKeys() {
        let cursor = BtsResults.findOne();
        let answerKeys = BtsAnswerKeys.findOne({variant:cursor.variant_day_2})
        let studentGeography = parseStudentKey(parseAnswerKeyForStudent(answerKeys.geography),cursor.day_2_keys.slice(0,100))
        let studentKeys = {};

        studentKeys.first = studentGeography[0];
        studentKeys.second = studentGeography[1];
        studentKeys.third = studentGeography[2];
        studentKeys.fourth = studentGeography[3];
        studentKeys.fifth = studentGeography[4];
        studentKeys.sixth = studentGeography[5];
        studentKeys.seventh = studentGeography[6];
        studentKeys.eighth = studentGeography[7];
        studentKeys.ninth = studentGeography[8];
        studentKeys.tenth = studentGeography[9];
        studentKeys.eleven = studentGeography[10];
        studentKeys.twelve = studentGeography[11];
        studentKeys.thirteen = studentGeography[12];
        studentKeys.fourteen = studentGeography[13];
        studentKeys.fifteen = studentGeography[14];
        studentKeys.sixteen = studentGeography[15];
        studentKeys.seventeen = studentGeography[16];
        studentKeys.eighteen = studentGeography[17];
        studentKeys.nineteen = studentGeography[18];
        studentKeys.twenty = studentGeography[19];

        return studentKeys;
    },
    dayOne() {
        return '1' == Template.instance().day.get();
    },
    btsNo() {
        return FlowRouter.getParam("btsNo")
    },
    results() {
        return BtsResults.findOne()
    }
    // grade7or8() {
    //     return '7' == BtsResults.grade()
    //     return '8' == Template.instance().grade.get();
    // }

})

Template.btsStudentResults.events({
    'change #select'(event,template) {
        template.day.set(template.find('[name=day]').value)

        let day = FlowRouter.getParam('_id')
    }
})
