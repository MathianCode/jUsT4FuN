        /*Enhancement_Object
            ChangesToBeMade:{}

            CasesToBeHandled:{
                Parse the given string  -   replace '\' literal if the inp is string ;)
                Circular json(cycle)    -   var x = {"data":12,"data1":null,"data2":"[...]","isCycle":true}
            }
        */
        var treeLevel = 0;
        var formatedJSONFrame = null;
        var data = null;

        function renderJson(json){
            data = fetchData(json);
            if(data !== null){
                init();
                traverse(data);
                console.log("********-----DONE-----*********");
            } else 
                console.log("no data to render!!");
        }

        function init(){
            treeLevel = 0;
            frameReset("formatedJsonBody");
        }

        function fetchData(json){
            if(json === null || (typeof json !== typeof null)){
                /*var data = document.getElementById("jsondata").value;
                if(data === null || data === "") return null;*/
                json = {};
                return JSON.parse(data);
            }
            return json;
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
                formatedJSONFrame.appendChild(element);
            });
        }

        function createQuoteObject(){
            return null;
        }


        function frameReset(frameName){
            var curFrame = document.getElementsByClassName(frameName)[0];
            document.querySelectorAll("."+frameName).forEach(function(frame){
                document.body.removeChild(frame);
            });
            var frame = document.createElement("div");
            frame.setAttribute("class",frameName);
            frame.setAttribute("id","223-A1H");
            //frame.setAttribute("id","formatedJsonBody");
            document.body.appendChild(frame);
            formatedJSONFrame = frame;
        }


    function CopyToClipboard(containerName) {
        containerName="formatedJsonBody";
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