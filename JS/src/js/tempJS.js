    /*Enhancement_Object
        ChangesToBeMade:{}

        CasesToBeHandled:{
            Parse the given string  -   replace '\' literal if the inp is string ;)
            Circular json(cycle)    -   var x = {"data":12,"data1":null,"data2":"[...]","isCycle":true}
        }
    */
    var treeLevel = 0;
    var formattedJSONFrame = null;
    var data = null;
    var bodyFrameName = "formattedJsonFrame";

    function renderJson(json){
        data = fetchData(json);
        if(data !== null){
            init();
            //traverse(data);
            console.log("********-----DONE-----*********");
        } else {
            console.log("no data to render!!");
        }
    }

    function init(){
        treeLevel = 0;
        frameReset(bodyFrameName);
        var openBracket   = null;
        var closeBracket = null;
        if(formattedJSONFrame != null){
            if(data instanceof Array){
                openBracket = BracketType.ARROPN;
                closeBracket =  BracketType.ARRCLS;
            }else if(data instanceof Object){
                openBracket = BracketType.OBJOPN;
                closeBracket =  BracketType.OBJCLS;
            }
            formattedJSONFrame.appendChild(createOpenBracket(openBracket));
            formattedJSONFrame.appendChild(document.createElement("div"));
            var bracketBox = document.createElement("div");
            bracketBox.appendChild(createCloseBracket(closeBracket));
            formattedJSONFrame.appendChild(bracketBox); 
        }
    }

    function fetchData(json){
        if(json === null || (typeof json !== typeof null)){
            var data = document.getElementById("jsondata").value;
            if(data === null || data === "") return null;
            /*json = {};*/
            return JSON.parse(data);
        }
        return json;
    }
//dsad
/*    function traverse(json){    
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
                        createLineBreak();
                        break;
                    case 2:
                        if(getObjectType(json) == 1) printElemBracObj("{");
                        else print(object,"{");
                        createLineBreak();
                        break;
                }
                treeLevel++;
                traverse(selectedObj);
                treeLevel--;
                if(type == 1){
                    console.log(typeof object);
                    printElemBracObj("]");
                    if(curObjectProperties.length !== pos+1)
                        createTrailingDelimeter(",");
                    createLineBreak();
                }else{
                    printElemBracObj("}");
                    if(getObjectType(json) == 1){
                        if(json.length !== pos+1)
                            createTrailingDelimeter(",");
                    }else{
                        if(curObjectProperties.length !== pos+1)
                            createTrailingDelimeter(",");
                    }
                    createLineBreak();
                }
            }else{
                if(getObjectType(json) == 1){
                    if(!(json.length === selectedObj) && !(object === "length")){
                        createArrayElement(selectedObj);
                        if(json.length !== pos+1)
                            createTrailingDelimeter(",");
                        createLineBreak();
                    }
                }
                else {
                    print(object, selectedObj);
                    if(curObjectProperties.length !== pos+1)
                        createTrailingDelimeter(",");
                    createLineBreak();
                }
            }
        });
    }

    function createLineBreak(){
        var lineBreak = document.createElement("br");
        addToBody([lineBreak]);
    }

    function createTrailingDelimeter(delimeter){
        var trailingDelimeter = document.createElement("span");
        trailingDelimeter.innerText = "\u00A0"+delimeter;
        addToBody([trailingDelimeter]);
    }

    function getObjectType(object){
        if(object instanceof Array) return 1;
        if(object instanceof Object) return 2;
        return 0;
    }

    function printElemBracObj(bracket){
        var _4tab = "&Tab;";
        var brackObject = document.createElement("span");
        var tabObject = createTabObject(_4tab);

        brackObject.innerText = bracket;

        addToBody([tabObject, brackObject]);
    }

    function createArrayElement(element){
        var tabObject = createTabObject(null);
        var arrElem = document.createElement("span");

        arrElem.innerText = element;

        addToBody([tabObject, arrElem]);
    }

    function print(key,value,seperator){
        var space = "\u00A0";
        var _4tab = "&Tab;";
        var tabObject = createTabObject(_4tab);
        var objectKey = document.createElement("span");
        var object = document.createElement("span");
        var valueOperator = document.createElement("span");
        
        
        objectKey.innerText = key + space;
        valueOperator.innerText = space+":"+space;
        object.innerText = space + value;

        addToBody([tabObject, objectKey, valueOperator, object]);
    }


    function createTabObject(tabValue){
        tabValue = tabValue === null ? "&Tab;" : tabValue;
        var tabObject = createObjectWithValueStream(tabValue, treeLevel);
        tabObject.setAttribute("class", "gapStruct");
        return tabObject;
    }

    function createObjectWithValueStream(string, repeatCount){
        var docObject = document.createElement("span");
        var valueStream = "";
        for(var i=0; i < repeatCount; i++)
            valueStream += string;
        docObject.innerHTML = valueStream;
        return docObject;
    }


    function addToBody(elements){
        if(elements === null || !elements.length) return;
        elements.forEach(function(element){
            formattedJSONFrame.appendChild(element);
        });
    }

    function createArrayObject(){
        var docObject = document.classreateElement("span");
    }

    function createObject(key, value){
        var docObject = document.createElement("span");

    }

    function createValueString(string){
        if(string === null || string === ""){
            return null;
        }
        var docObject = document.createElement("span");
        docObject.setAttribute("class","valuestring");
        var openQuote = createOpenQuotes("value");
        var closeQuote = createClosedQuotes("value");
        return [openquote, docObject, closequote];
    }

    function createKeyString(string) {
        if(string === null || string === ""){
            return null;
        }
        var docObject = document.createElement("span");
        docObject.setAttribute("class","keystring");
        var openQuote = createOpenQuotes("key");
        var closeQuote = createClosedQuotes("key");
        return [openquote, docObject, closequote];
    }

    function createNumbers(number){
        var docObject = document.createElement("span");
        if(!isNumber(number)){
            return null;
        }
        docObject.setAttribute("class", "number");
        docObject.innerText = number;
        return docObject;
    }

    function createOpenQuotes(quoteType){
        if(!quoteType.match(/key/ig) || !quoteType.match(/value/ig)){
            quoteType = "generalquote"
        }else{
            quoteType += "quoteopen";
        }
        var docObject = document.createElement("span");
        docObject.setAttribute("class", "openquote" + " " + quoteType);
        docObject.innerHTML = "\"";
        return docObject;
    }

    function createClosedQuotes(quoteType){
        if(!quoteType.match(/key/ig) || !quoteType.match(/value/ig)){
            quoteType = "generalquote"
        }else{
            quoteType += "quoteclose";
        }
        var docObject = document.createElement("span");
        docObject.setAttribute("class", "closequote" + " " + quoteType);
        docObject.innerHTML = "\"";
        return docObject;
    }*/

    function createOpenBracket(bracketType){
        if(bracketType === null || bracketType === ""){
            return null;
        }
        var bracketClass = null;
        if(bracketType === BracketType.OBJOPN){
            bracketClass = "objectbracket";
        }else if(bracketType === BracketType.ARROPN){
            bracketClass = "arraybracket"
        }else{
            return null; //can set someother character
        }
        return createElement(Tags.SPAN, Identifier.CLASS, "bracket openbracket" + bracketClass, bracketType, ElementPackType.HTML);
    }

    function createCloseBracket(bracketType){
        var bracketClass = null;
        if(bracketType === null || bracketType === ""){
            return null;
        }
        if(bracketType === BracketType.OBJCLS){
            bracketClass = "objectbracket";
        }else if(bracketType === BracketType.ARRCLS){
            bracketClass = "arraybracket"
        }
        return createElement(Tags.SPAN, Identifier.CLASS, "bracket closebracket " + bracketClass, bracketType, ElementPackType.HTML);
    }

    function createElement(tags, identifier, identifierValue, value, elementPackType) {
        var newElement = document.createElement(tags);
        newElement.setAttribute(identifier, identifierValue);
        if(elementPackType === ElementPackType.HTML){
            newElement.innerHTML = value; 
        }else if(elementPackType === ElementPackType.TEXT){
            newElement.innerText = value;
        }
        return newElement;
    }

    const BracketType = {
        OBJOPN : '{',
        OBJCLS : '}',
        ARROPN : '[',
        ARRCLS : ']'
    }

    const Tags = {
        DIV : 'div',
        SPAN : 'span'
    }

    const Identifier = {
        CLASS : 'class',
        ID : 'id',
        NAME : 'name',
    }

    const ElementPackType = {
        HTML : 'innerHTML',
        TEXT : 'innerText'
    }

    function frameReset(frameName){
        var curFrame = document.getElementsByClassName(frameName)[0];
        document.querySelectorAll("."+frameName).forEach(function(frame){
            document.body.removeChild(frame);
        });
        var frame = document.createElement("div");
        frame.setAttribute("class", frameName);
        frame.setAttribute("id", "223-A1H");
        document.body.appendChild(frame);
        formattedJSONFrame = frame;
    }

    function CopyToClipboard(containerName) {
        containerName=bodyFrameName;
        if (document.selection) { 
            
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementsByClassName(containerName)[0]);
            range.select().createTextRange();
            document.execCommand("copy"); 
        
        } else if (window.getSelection) {
            
            var range = document.createRange();
            range.selectNode(document.getElementsByClassName(containerName)[0]);
            window.getSelection().addRange(range);
            document.execCommand("copy");
        }
    }