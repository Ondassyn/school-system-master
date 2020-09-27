/*
* возвращает ответы для теста в виде массива символов
* */
export const parseAnswerKey = (keys) => {
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

export const parseLevelKey = (keys) => {
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

export const checkA = (ansKeys,studentKeys,levelKeys) => {

    let s=0
    let percentA=0
    let countA=0
    for(let i=0;i<levelKeys.length;i++){

        if(levelKeys[i] == "A"){
            countA++
            let stKeys=studentKeys.slice(i*5,i*5+5)
            stKeys = stKeys.replace(/\s/g,'').split("")

            let p=0
            let sum=0

            if (ansKeys[i].length == 5) {
                p=1
            } else if (stKeys.length <= ansKeys[i].length) {
                for(let j=0;j<stKeys.length;j++) {
                    if(ansKeys[i].includes(stKeys[j]))
                        sum+=1
                }
                if(sum == ansKeys[i].length) {
                    p=1
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
    }

    percentA = (s/countA)*100
    return percentA;
}

export const checkB = (ansKeys,studentKeys,levelKeys) => {

    let s=0
    let percentB=0
    let countB=0

    for(let i=0;i<levelKeys.length;i++){

        if(levelKeys[i] == "B"){
            countB++
            let stKeys=studentKeys.slice(i*5,i*5+5)
            stKeys = stKeys.replace(/\s/g,'').split("")

            let p=0
            let sum=0

            if (ansKeys[i].length == 5) {
                p=1
            } else if (stKeys.length <= ansKeys[i].length) {
                for(let j=0;j<stKeys.length;j++) {
                    if(ansKeys[i].includes(stKeys[j]))
                        sum+=1
                }
                if(sum == ansKeys[i].length) {
                    p=1
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
    }

    percentB = (s/countB)*100
    return percentB;
}

export const checkC = (ansKeys,studentKeys,levelKeys) => {

    let s=0
    let percentC=0
    let countC=0
    for(let i=0;i<levelKeys.length;i++){

        if(levelKeys[i] == "C"){
            countC++
            let stKeys=studentKeys.slice(i*5,i*5+5)
            stKeys = stKeys.replace(/\s/g,'').split("")

            let p=0
            let sum=0

            if (ansKeys[i].length == 5) {
                p=1
            } else if (stKeys.length <= ansKeys[i].length) {
                for(let j=0;j<stKeys.length;j++) {
                    if(ansKeys[i].includes(stKeys[j]))
                        sum+=1
                }
                if(sum == ansKeys[i].length) {
                    p=1
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
    }

    percentC = (s/countC)*100
    return percentC;
}

export const check = (ansKeys,studentKeys) => {
    let s=0;
    for (let i = 0; i < ansKeys.length; i++) {

        let stKeys=studentKeys.slice(i*5,i*5+5)
        stKeys = stKeys.replace(/\s/g,'').split("")
        
        let p=0
        let sum=0

        if (ansKeys[i].length == 5) {
            p=1
        } else if (stKeys.length <= ansKeys[i].length) {
            for(let j=0;j<stKeys.length;j++) {
                if(ansKeys[i].includes(stKeys[j]) || ansKeys[i] == 'T'){
                    sum+=1
                }
            }
            if(sum == ansKeys[i].length) {
                p=1
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

export const checkTurkish = (ansKeys,studentKeys) => {
    let s=0;
    for (let i=0;i<ansKeys.length;i++) {

        let stKeys=studentKeys.slice(i*5,i*5+5)
        stKeys = stKeys.replace(/\s/g,'').split("")

        let p=0
        let sum=0
        let empty=0

        if (ansKeys[i].length == 5) {
            p=1
        } else if (stKeys.length <= ansKeys[i].length) {
            for(let j=0;j<stKeys.length;j++) {
                if(ansKeys[i].includes(stKeys[j]))
                    sum+=1
            }
            if(sum == ansKeys[i].length) {
                p=1
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

export const checkTurkishEmpty = (ansKeys,studentKeys) => {
    let empty=0
    for (let i=0;i<ansKeys.length;i++) {

        let stKeys=studentKeys.slice(i*5,i*5+5)
        stKeys = stKeys.replace(/\s/g,'').split("")

        let p=0
        let sum=0
        if(stKeys.length == 0){
            empty+=1
        }


    //     if (ansKeys[i].length == 5) {
    //         p=1
    //     } else if (stKeys.length <= ansKeys[i].length) {
    //         for(let j=0;j<stKeys.length;j++) {
    //             if(ansKeys[i].includes(stKeys[j])){
    //                 sum+=1
    //             }else{
    //                 empty+=1
    //             }
    //         }
    //         if(sum == ansKeys[i].length) {
    //             p=1
    //         } else if(sum < ansKeys[i].length) {
    //             if (ansKeys[i].length == 2 && sum == 1) {
    //                 p=1
    //             } else if (sum > 1) {
    //                 p=1
    //             }
    //         } else {
    //             p=0
    //         }

    //     }

     }
    return empty;
}
