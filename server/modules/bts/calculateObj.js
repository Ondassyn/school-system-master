import { parseAnswerKey } from "../multipleChoiceChecker";
import { checkObj } from "../questionLister";
import { parseQuestions } from "../questionLister";
import { calculateObjRating } from "./objRating";

export const calculateObj = (academicYear, btsNo, grade) => {
    let objectives = BtsObjectivesList.find({
        academicYear: academicYear,
        quarter: btsNo,
        grade: grade
    }).fetch();
    _.each(objectives, objective => {
        let objResult = {
            academicYear: academicYear,
            quarter: btsNo,
            objective: objective.objectiveId,
            subject: objective.subject,
            objectiveDefinition: objective.objectiveDefinition,
            topic: objective.topic
        };

        let objVariants = [objective.variant1, objective.variant2];
        _.each(objVariants, objVariant => {
            if (
                objVariant.substring(3) == "1" ||
                objVariant.substring(3) == "2"
            ) {
                let results = BtsResults.find({
                    academicYear: academicYear,
                    btsNo: btsNo,
                    grade: grade,
                    variant_day_1: objVariant
                }).fetch();
                _.each(results, result => {
                    let answerKey = BtsAnswerKeys.findOne({
                        academicYear: academicYear,
                        quarter: btsNo,
                        day: "1",
                        variant: objVariant
                    });

                    if (answerKey) {
                        objResult.studentId = result.studentId;
                        objResult.schoolId = result.schoolId;
                        objResult.name = result.name;
                        objResult.surname = result.surname;
                        objResult.grade = result.grade;
                        objResult.division = result.division;
                        objResult.languageGroup = result.languageGroup;

                        if (objResult.subject == "physics") {
                            physicsKeys = result.day_1_keys.slice(0, 50);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;
                            //console.log('student\'s keys= ',physicsKeys)
                            //console.log('answer keys= ',answerKey.physics)

                            _.each(questions, question => {
                                let stKeys = physicsKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.physics)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });

                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );

                            //console.log(objResult.studentId,objResult.name,objResult.surname)
                            //console.log("variant= ",objVariant)
                            //console.log('success= ', objResult.success)
                        }

                        if (objResult.subject == "chemistry") {
                            chemistryKeys = result.day_1_keys.slice(50, 100);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = chemistryKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.chemistry)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        if (objResult.subject == "biology") {
                            biologyKeys = result.day_1_keys.slice(100, 150);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = biologyKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.biology)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        if (objResult.subject == "english") {
                            englishKeys = result.day_1_keys.slice(150, 250);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = englishKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.english)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        if (objResult.subject == "kazakh") {
                            if (result.languageGroup == "kaz") {
                                kazKeys = result.day_1_keys.slice(250, 300);
                                let questions;

                                if (objVariant == objective.variant1) {
                                    questions = parseQuestions(
                                        objective.questions1
                                    );
                                } else {
                                    questions = parseQuestions(
                                        objective.questions2
                                    );
                                }

                                objResult.success = 0;

                                _.each(questions, question => {
                                    let stKeys = kazKeys.slice(
                                        (question - 1) * 5,
                                        question * 5
                                    );
                                    stKeys = stKeys.replace(/\s/g, "");
                                    objResult.success += checkObj(
                                        parseAnswerKey(answerKey.kazakh_kaz)[
                                            question - 1
                                        ],
                                        stKeys
                                    );
                                });
                                objResult.success = parseFloat(
                                    (
                                        objResult.success /
                                        questions.length /
                                        2 *
                                        100
                                    ).toFixed(2)
                                );
                            } else if (result.languageGroup == "rus") {
                                kazKeys = result.day_1_keys.slice(250, 300);
                                let questions;

                                if (objVariant == objective.variant1) {
                                    questions = parseQuestions(
                                        objective.questions1
                                    );
                                } else {
                                    questions = parseQuestions(
                                        objective.questions2
                                    );
                                }

                                objResult.success = 0;

                                _.each(questions, question => {
                                    let stKeys = kazKeys.slice(
                                        (question - 1) * 5,
                                        question * 5
                                    );
                                    stKeys = stKeys.replace(/\s/g, "");
                                    objResult.success += checkObj(
                                        parseAnswerKey(answerKey.kazakh_rus)[
                                            question - 1
                                        ],
                                        stKeys
                                    );
                                });
                                objResult.success = parseFloat(
                                    (
                                        objResult.success /
                                        questions.length /
                                        2 *
                                        100
                                    ).toFixed(2)
                                );
                            }
                        }

                        if (objResult.subject == "kazakh_literature") {
                            if (result.languageGroup == "kaz") {
                                kazLitKeys = result.day_1_keys.slice(300, 350);
                                let questions;

                                if (objVariant == objective.variant1) {
                                    questions = parseQuestions(
                                        objective.questions1
                                    );
                                } else {
                                    questions = parseQuestions(
                                        objective.questions2
                                    );
                                }

                                objResult.success = 0;

                                _.each(questions, question => {
                                    let stKeys = kazLitKeys.slice(
                                        (question - 1) * 5,
                                        question * 5
                                    );
                                    stKeys = stKeys.replace(/\s/g, "");
                                    objResult.success += checkObj(
                                        parseAnswerKey(
                                            answerKey.kazakh_literature_kaz
                                        )[question - 1],
                                        stKeys
                                    );
                                });
                                objResult.success = parseFloat(
                                    (
                                        objResult.success /
                                        questions.length /
                                        2 *
                                        100
                                    ).toFixed(2)
                                );
                            } else if (result.languageGroup == "rus") {
                                kazLitKeys = result.day_1_keys.slice(300, 350);
                                let questions;

                                if (objVariant == objective.variant1) {
                                    questions = parseQuestions(
                                        objective.questions1
                                    );
                                } else {
                                    questions = parseQuestions(
                                        objective.questions2
                                    );
                                }

                                objResult.success = 0;

                                _.each(questions, question => {
                                    let stKeys = kazLitKeys.slice(
                                        (question - 1) * 5,
                                        question * 5
                                    );
                                    stKeys = stKeys.replace(/\s/g, "");
                                    objResult.success += checkObj(
                                        parseAnswerKey(
                                            answerKey.kazakh_literature_rus
                                        )[question - 1],
                                        stKeys
                                    );
                                });
                                objResult.success = parseFloat(
                                    (
                                        objResult.success /
                                        questions.length /
                                        2 *
                                        100
                                    ).toFixed(2)
                                );
                            }
                        }

                        if (objResult.subject == "russian") {
                            russianKeys = result.day_1_keys.slice(350, 400);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = russianKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.russian)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        let recordInDb = BtsObjectivesResults.findOne({
                            academicYear: academicYear,
                            quarter: btsNo,
                            grade: grade,
                            studentId: result.studentId,
                            objective: objective.objectiveId
                        });

                        if (recordInDb) {
                            BtsObjectivesResults.update(
                                { _id: recordInDb._id },
                                { $set: objResult }
                            );
                        } else {
                            BtsObjectivesResults.insert(objResult);
                        }
                    }
                });
            } else {
                let results = BtsResults.find({
                    academicYear: academicYear,
                    btsNo: btsNo,
                    grade: grade,
                    variant_day_2: objVariant
                }).fetch();
                _.each(results, result => {
                    let answerKey = BtsAnswerKeys.findOne({
                        academicYear: academicYear,
                        quarter: btsNo,
                        day: "2",
                        variant: objVariant
                    });

                    if (answerKey) {
                        objResult.studentId = result.studentId;
                        objResult.schoolId = result.schoolId;
                        objResult.name = result.name;
                        objResult.surname = result.surname;
                        objResult.grade = result.grade;
                        objResult.division = result.division;
                        objResult.languageGroup = result.languageGroup;

                        if (objResult.subject == "algebra") {
                            algebraKeys = result.day_2_keys.slice(0, 50);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = algebraKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.algebra)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });

                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        if (objResult.subject == "geometry") {
                            geometryKeys = result.day_2_keys.slice(50, 100);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = geometryKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.geometry)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        if (objResult.subject == "computer") {
                            computerKeys = result.day_2_keys.slice(100, 150);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = computerKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.computer)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        if (objResult.subject == "turkish") {
                            turkishKeys = result.day_2_keys.slice(150, 250);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = turkishKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.turkish)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        if (objResult.subject == "world_history") {
                            world_historyKeys = result.day_2_keys.slice(
                                250,
                                300
                            );
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = world_historyKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.world_history)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        if (objResult.subject == "kazakh_history") {
                            kazakh_historyKeys = result.day_2_keys.slice(
                                300,
                                350
                            );
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = kazakh_historyKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.kazakh_history)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        if (objResult.subject == "geography") {
                            geographyKeys = result.day_2_keys.slice(350, 400);
                            let questions;

                            if (objVariant == objective.variant1) {
                                questions = parseQuestions(
                                    objective.questions1
                                );
                            } else {
                                questions = parseQuestions(
                                    objective.questions2
                                );
                            }

                            objResult.success = 0;

                            _.each(questions, question => {
                                let stKeys = geographyKeys.slice(
                                    (question - 1) * 5,
                                    question * 5
                                );
                                stKeys = stKeys.replace(/\s/g, "");
                                objResult.success += checkObj(
                                    parseAnswerKey(answerKey.geography)[
                                        question - 1
                                    ],
                                    stKeys
                                );
                            });
                            objResult.success = parseFloat(
                                (
                                    objResult.success /
                                    questions.length /
                                    2 *
                                    100
                                ).toFixed(2)
                            );
                        }

                        let recordInDb = BtsObjectivesResults.findOne({
                            academicYear: academicYear,
                            quarter: btsNo,
                            grade: grade,
                            studentId: result.studentId,
                            objective: objective.objectiveId
                        });

                        if (recordInDb) {
                            BtsObjectivesResults.update(
                                { _id: recordInDb._id },
                                { $set: objResult }
                            );
                        } else {
                            BtsObjectivesResults.insert(objResult);
                        }
                    }
                });
            }
        });
    });

    let schools = Schools.find().fetch();
    _.each(schools, school => {
        //console.log("admin: rechek shkol")
        calculateObjRating(academicYear, btsNo, grade, school.schoolId);
    });
};