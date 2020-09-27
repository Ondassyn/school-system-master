/*
* parse a string of questions and returns as an array
* */
export const parseQuestions = (questions) => {
    let questionsArray = [];
    //let current = [];
    let c = 0;
    for(let i = 0; i < questions.length; i++) {
        
        if (questions[i] != ',') {
            c += questions[i]
        } else if (questions[i] == ',') {
            questionsArray.push(parseInt(c));
            c = 0;
        }
    }
    return questionsArray;
}


export const checkObj = (ansKeys,studentKeys) => {
    let s=0;
    for (let i=0;i<ansKeys.length;i++) {

    //console.log("ansKeys: ",ansKeys)
    //console.log("studentKeys: ",studentKeys)

        let p=0
        let sum=0

        if (ansKeys[i].length == 5) {
            p=2
        } else if (studentKeys.length <= ansKeys[i].length) {
            for(let j=0;j<studentKeys.length;j++) {
                if(ansKeys[i].includes(studentKeys[j]))
                    sum+=1
            }
            if(sum == ansKeys[i].length) {
                p=2
            } else if(sum < ansKeys[i].length) {
                if (ansKeys[i].length == 2 && sum == 1) {
                    p=1
                } else if (sum > 1) {
                    p=1
                }
            } else {
                p=0
            }

        }
        s+=p;
    }
    return s;
}