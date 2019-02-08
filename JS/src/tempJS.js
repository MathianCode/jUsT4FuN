/*Enhancement_Object
    ChangesToBeMade:{}

    CasesToBeHandled:{
        Parse the given string  -   replace '\' literal if the inp is string ;)
        Circular json(cycle)    -   var x = {"data":12,"data1":null,"data2":"[...]","isCycle":true}
    }
*/
var treeLevel = 0;
var formatedJsonBody = null;

function formatter(){
    formatedJsonBody = document.getElementById("formatedJsonBody");
    var data = JSON.parse(document.getElementById("jsondata").value);
    traverse(data);
    console.log("********-----DONE-----*********");
}

function traverse(json){
    var curObjectProperties = Object.getOwnPropertyNames(json);
    if(curObjectProperties.length == 0) return;

    curObjectProperties.forEach(function(object, pos){
        var selectedObj = json[object];
        console.log(typeof object +"\t"+typeof pos+"\t"+typeof selectedObj);
        if(typeof selectedObj === typeof null && selectedObj != null){
            var type = getObjectType(selectedObj);

            switch(type){
                case 1:
                    print(object,"[");
                    break;
                case 2:{
                    if(getObjectType(json) == 1) printElemBracObj("{");
                    else print(object,"{");
                    break;
                }
            }
            treeLevel++;
            traverse(selectedObj);
            treeLevel--;
            if(getObjectType(selectedObj) == 1){
                console.log(typeof object);
                printElemBracObj("]");
            }else printElemBracObj("}");
        }else{    
            print(object, selectedObj);
        }
    });
}

function getObjectType(object){
    if(object instanceof Array) return 1;
    if(object instanceof Object) return 2;
    return 0;
}

function printElemBracObj(bracket){
    
    var _4tab = "&Tab;";
    var lineBreak = document.createElement("br");
    var brackObject = document.createElement("span");
    var tabObject = createTabObject(_4tab, treeLevel);

    tabObject.setAttribute("class", "gapStruct");
    brackObject.innerText = bracket;

    formatedJsonBody.appendChild(tabObject);
    formatedJsonBody.appendChild(brackObject);
    formatedJsonBody.appendChild(lineBreak);
}

function print(key,value,seperator){
    var space = "\u00A0";
    var _4tab = "&Tab;";
    var tabObject = createTabObject(_4tab, treeLevel);
    var objectKey = document.createElement("span");
    var object = document.createElement("span");
    var valueOperator = document.createElement("span");
    var lineBreak = document.createElement("br");
    
    tabObject.setAttribute("class", "gapStruct");

    objectKey.innerText = key + space;
    valueOperator.innerText = space+":"+space;
    object.innerText = space + value;


    formatedJsonBody.appendChild(tabObject);
    formatedJsonBody.appendChild(objectKey);
    formatedJsonBody.appendChild(valueOperator);
    formatedJsonBody.appendChild(object);
    formatedJsonBody.appendChild(lineBreak);
    //console.log(key+" : "+value);
}

function createTabObject(string, repeatCount){
    var docObject = document.createElement("span");
    var valueStream = "";
    for(var i=0; i < repeatCount; i++)
        valueStream += string;
    docObject.innerHTML = valueStream;
    return docObject;
}

function createQuoteObject(){
    return null;
}