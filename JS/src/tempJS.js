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
        if(typeof selectedObj === typeof null && selectedObj != null){
            if(getObjectType(selectedObj) === 1){
                print(object,"[");
            }
            treeLevel++;
            traverse(selectedObj);
            treeLevel--;
        }
        else{    
            if(getObjectType(selectedObj) === 1){
                console.log(typeof object);
                print(object,"]");
            }
            print(object, selectedObj);
        }
    });
}

function getObjectType(object){
    if(object instanceof Array) return 1;
}

function print(key,value,seperator){
    var space = "\u00A0";
    var _4tab = "&Tab;";//"&nbsp;&nbsp;&nbsp;&nbsp;";
    var tabObject = document.createElement("span");
    var objectKey = document.createElement("span");
    var object = document.createElement("span");
    var valueOperator = document.createElement("span");
    var lineBreak = document.createElement("br");
    
    tabObject.setAttribute("class", "gapStruct");

    tabObject.innerHTML = getCharStream(_4tab);
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

function getCharStream(value){
    var valueStream = "";
    for(var i=0; i < treeLevel; i++)
        valueStream += value;
    return valueStream;
}