/*
* возвращает ответы для теста в виде массива символов
* */
export const parseAnswerKeyForStudent = (keys) => {
    let keysArray = [];
    let current = [];
    let inStack = false
    for(let i=0; i<keys.length;i++) {
        if (keys[i]=="[") {
            current = [];
            inStack = true;
        }
        else if (keys[i]=="]") {
            keysArray.push(current);
            current = [];
            inStack=false;
        } else {
            if (inStack) {
                current.push(keys[i]);
            } else {
                keysArray.push([keys[i]])
                current=[]
            }
        }
    }
    return keysArray;
}

/*
* возвращает правильные ответы для теста
* */
export const parseStudentKey = (ansKeys,studentKeys) => {
    
    studentArray = [];

    for (let i = 0; i < ansKeys.length; i++) {

        let stKeys=studentKeys.slice(i*5,i*5+5)
        stKeys = stKeys.replace(/\s/g,'').split("")

        studentArray.push(stKeys)

    }

    //console.log(studentArray)
    return studentArray;
}

