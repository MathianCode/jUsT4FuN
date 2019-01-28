//Non-Recursive Approach

var objectStack = new Array();
var indexStack = new Array();

function traverseJsonTree(json){            
    objectStack.push(json);
    indexStack.push(0);
    var result = traverseJsonTreeHelper(json,0);

    do{
        if(result != -1){
            result = traverseJsonTreeHelper(objectStack[objectStack.length - 1],indexStack[indexStack.length - 1]);
        }
        else if(objectStack.length > 1){
            objectStack.pop();
            indexStack.pop();
            result = traverseJsonTreeHelper(objectStack[objectStack.length - 1],indexStack[indexStack.length - 1]+1);
        }
    }while(objectStack != null && objectStack.length > 1);
}

function traverseJsonTreeHelper(json,curIndex){
    var curObject = Object.getOwnPropertyNames(json);
    if(curObject.length == 0) return -1;
    var i=curIndex;
    for(; i < curObject.length; i++){
        var selectedObj = json[curObject[i]];
        if(typeof selectedObj === typeof null && selectedObj != null){
            indexStack[indexStack.length - 1] = i;
            objectStack.push(selectedObj);
            indexStack.push(0);
            console.log(curObject[i]+" : "+(selectedObj.constructor === [].constructor ? "[" : "{"));
            return i;
        }
        console.log(curObject[i]+" : "+selectedObj+(curObject.length > 1 ? ",":""));
    }
    indexStack[indexStack.length - 1] = i;
    console.log(objectStack[objectStack.length - 2].length == indexStack[indexStack.length - 2] + 1 ? "}" : "},");//differentiate here...
    return -1;
}