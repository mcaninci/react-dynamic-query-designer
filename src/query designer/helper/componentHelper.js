
import { Brackets } from '../components/brackets.js';
import { FunctionComponent } from '../components/functionComponent.js';
import { Operator } from '../components/operator.js';
import { FixedValue } from '../components/fixedValue';

import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import includes from 'lodash/includes';

import { stackPush, stackPop } from './designerHelper';
import { forEach } from 'min-dash';
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
//#########################Style Helper ######################
function getGridCellStyle() {
  return {
    margin: '10px',
    marginRight: '-10px',
    marginLeft: '-10px',
    padding: '10px',
    borderBottom: '1px',
    borderTop: '1px',
    borderBottomStyle: 'dashed ',
    borderTopStyle: 'dashed ',
    borderColor: '#BDBDBD',
    opacity: 1,
    minHeight: '50px',
    display: 'flex'
  };
}

function getDropStyle() {
  return {
    margin: '10px',
    padding: '10px',
    opacity: 1,
    maxHeight: '50px',
    Height: '50px',
    display: 'flex',
    overflow: 'hidden'
  };
}
const getListStyle = isDraggingOver => ({

  userSelect: 'none',
  padding: 4,
  color: 'gray',
  width: '330px',
  height: '620px',
  overflowY: 'scroll',
  marginRight: '10px'

});

const getItemStyle = (isDragging, draggableStyle) => ({

  ...draggableStyle,
  userSelect: 'none',
  padding: 4,
  overflow: 'hidden',
  border: isDragging ? '1px solid #C3C3C3' : 'none',
  fontWeight: isDragging ? 'bold' : 'normal',
  background: "white",
  backgroundImage: isDragging ? 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0IDI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6bm9uZTt9PC9zdHlsZT48cGF0aCBkPSJNMTEuMywxNi4yYzAsMC44LTAuNiwxLjQtMS40LDEuNGMtMC44LDAtMS40LTAuNi0xLjQtMS40YzAtMC44LDAuNi0xLjQsMS40LTEuNEMxMC43LDE0LjgsMTEuMywxNS40LDExLjMsMTYuMnogTTkuOSwxMC42Yy0wLjgsMC0xLjQsMC42LTEuNCwxLjRzMC42LDEuNCwxLjQsMS40YzAuOCwwLDEuNC0wLjYsMS40LTEuNFMxMC43LDEwLjYsOS45LDEwLjZ6IE05LjksNi40QzkuMSw2LjQsOC41LDcsOC41LDcuOHMwLjYsMS40LDEuNCwxLjRjMC44LDAsMS40LTAuNiwxLjQtMS40UzEwLjcsNi40LDkuOSw2LjR6IE0xNC4xLDkuMmMwLjgsMCwxLjQtMC42LDEuNC0xLjRzLTAuNi0xLjQtMS40LTEuNGMtMC44LDAtMS40LDAuNi0xLjQsMS40UzEzLjMsOS4yLDE0LjEsOS4yeiBNMTQuMSwxMC42Yy0wLjgsMC0xLjQsMC42LTEuNCwxLjRzMC42LDEuNCwxLjQsMS40YzAuOCwwLDEuNC0wLjYsMS40LTEuNFMxNC45LDEwLjYsMTQuMSwxMC42eiBNMTQuMSwxNC44Yy0wLjgsMC0xLjQsMC42LTEuNCwxLjRjMCwwLjgsMC42LDEuNCwxLjQsMS40YzAuOCwwLDEuNC0wLjYsMS40LTEuNEMxNS41LDE1LjQsMTQuOSwxNC44LDE0LjEsMTQuOHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCwwaDI0djI0SDBWMHoiLz48L3N2Zz4=)' : 'none',
  backgroundPosition: 'left',
  backgroundSize: '24px',
  backgroundRepeat: 'no-repeat',
  height: '25px',
  paddingLeft: isDragging ? '24px' : '0px',
  boxShadow: isDragging ? '2px 2px #C3C3C3' : 'none',
  maxWidth: '175px',
  minWidth: '120px',
  width: 'auto',
  marginLeft: '30px',
  textAlign: 'left'


});
const getQuickPanelStyle = (isDragging, draggableStyle) => ({

  ...draggableStyle,
  userSelect: 'none',
  padding: 4,
  margin: `0 0 ${4}px 0`,

  overflow: 'hidden',
  border: isDragging ? '1px solid #C3C3C3' : 'none',
  fontWeight: isDragging ? 'bold' : 'normal',
  background: '#f0f0f0',
  backgroundImage: isDragging ? 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI0IDI0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6bm9uZTt9PC9zdHlsZT48cGF0aCBkPSJNMTEuMywxNi4yYzAsMC44LTAuNiwxLjQtMS40LDEuNGMtMC44LDAtMS40LTAuNi0xLjQtMS40YzAtMC44LDAuNi0xLjQsMS40LTEuNEMxMC43LDE0LjgsMTEuMywxNS40LDExLjMsMTYuMnogTTkuOSwxMC42Yy0wLjgsMC0xLjQsMC42LTEuNCwxLjRzMC42LDEuNCwxLjQsMS40YzAuOCwwLDEuNC0wLjYsMS40LTEuNFMxMC43LDEwLjYsOS45LDEwLjZ6IE05LjksNi40QzkuMSw2LjQsOC41LDcsOC41LDcuOHMwLjYsMS40LDEuNCwxLjRjMC44LDAsMS40LTAuNiwxLjQtMS40UzEwLjcsNi40LDkuOSw2LjR6IE0xNC4xLDkuMmMwLjgsMCwxLjQtMC42LDEuNC0xLjRzLTAuNi0xLjQtMS40LTEuNGMtMC44LDAtMS40LDAuNi0xLjQsMS40UzEzLjMsOS4yLDE0LjEsOS4yeiBNMTQuMSwxMC42Yy0wLjgsMC0xLjQsMC42LTEuNCwxLjRzMC42LDEuNCwxLjQsMS40YzAuOCwwLDEuNC0wLjYsMS40LTEuNFMxNC45LDEwLjYsMTQuMSwxMC42eiBNMTQuMSwxNC44Yy0wLjgsMC0xLjQsMC42LTEuNCwxLjRjMCwwLjgsMC42LDEuNCwxLjQsMS40YzAuOCwwLDEuNC0wLjYsMS40LTEuNEMxNS41LDE1LjQsMTQuOSwxNC44LDE0LjEsMTQuOHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCwwaDI0djI0SDBWMHoiLz48L3N2Zz4=)' : 'none',
  backgroundPosition: 'left',
  backgroundSize: '24px',
  backgroundRepeat: 'no-repeat',
  height: '30px',
  paddingLeft: isDragging ? '20px' : '0px',
  boxShadow: isDragging ? '2px 2px #C3C3C3' : 'none',
  maxWidth: '150px',
  width: '45px',
  textAlign: isDragging ? 'right' : 'center'

});


//#########################Component Create Helper ######################
var componentIndex = 1;
function getDraggableItem(draggableId, thisMain) {
  var item = null;
  if (draggableId.includes('Functions_Number')) {
    item = thisMain.state.NumberFunctionItem.filter(x => x.id == draggableId.split('_')[3])[0];

  }
  else if (draggableId.includes('QuickPanel')) {
    item = thisMain.state.QuickPanel.filter(x => x.id == draggableId.split('_')[1])[0];

  }
  else if (draggableId.includes('Functions_String')) {
    item = thisMain.state.stringFunctionItem.filter(x => x.id == draggableId.split('_')[3])[0];

  }
  else if (draggableId.includes('Functions_Date')) {
    item = thisMain.state.dateFunctionItem.filter(x => x.id == draggableId.split('_')[3])[0];

  }
  else if (draggableId.includes('Functions_Date')) {
    item = thisMain.state.dateFunctionItem.filter(x => x.id == draggableId.split('_')[3])[0];

  }
  else if (draggableId.includes('Operator_Relational')) {
    item = thisMain.state.relationalOperatorsItem.filter(x => x.id == draggableId.split('_')[3])[0];

  }
  else if (draggableId.includes('Operator_Logical_Item_')) {
    item = thisMain.state.logicalOperatorsItem.filter(x => x.id == draggableId.split('_')[3])[0];

  }
  else if (draggableId.includes('Operator_Expression_Item_')) {
    item = thisMain.state.expressionOperatorsItem.filter(x => x.id == draggableId.split('_')[3])[0];

  }

  else if (draggableId.includes('Operands_Fixed_Value_')) {
    item = thisMain.state.FixedValueItem.filter(x => x.id == draggableId.split('_')[3])[0];

  }
 
  else if (draggableId.includes('Operands_Custom_Item_')) {
    item = thisMain.state.customOperandsItem.filter(x => x.id == draggableId.split('_')[3])[0];

  }



  return item;
}

function createComponentJsonData(source, destination, draggableId, thisMain) {
  var item = null;

  var componentObj = null;
  var guidId = guid();
  if (destination.droppableId == 'main') {
    destination.droppableId = 'jsonChildData';
  }
  else {
    destination.droppableId = destination.droppableId + "Json";
  }
  item = getDraggableItem(draggableId, thisMain);

  if (item.component == 'And' || item.component == 'Or') {
    var itemBrackets = thisMain.state.QuickPanel.filter(x => x.component == "Brackets")[0];
    var andOrComponent = [];
    var samelogical = false;

    var leftBracketsGuid = guid();
    var leftObj = thisMain.designerState[destination.droppableId];
    if (leftObj) {
      var leftObjIndex = leftObj.length;
    }
    else {
      var parent = findParent(thisMain.designerState['jsonChildData'], destination.droppableId.split('Json')[0]);
      leftObj = parent.child;
      leftObjIndex = leftObj.length;
    }

    var rightBracketsGuid = guid();

    var andGuid = guid();
    var componentObjMid = {
      guidId: andGuid,
      itemContent: item.content,
      componentType: item.componentType,
      component: item.component,
      type: item.type,
      child: []
    };
    var componentObjRight = {
      guidId: rightBracketsGuid,
      itemContent: itemBrackets.content,
      componentType: itemBrackets.componentType,
      component: itemBrackets.component,
      type: itemBrackets.type,
      child: []
    };

    //Aynı parantez içinde daha önceden and yada or  eklenmiş mi
    if (((Array.isArray(leftObj[leftObjIndex - 1]) && leftObj[leftObjIndex - 1].find(x => x.component == item.component)) || ((!Array.isArray(leftObj[leftObjIndex - 1])) && leftObj.find(x => x.component == item.component)))) {

      leftObj.push(componentObjMid);
      leftObj.push(componentObjRight);
      andOrComponent = leftObj;
      samelogical = true;

    }
    else {
      samelogical = false;
      updateChildDepth(leftObj);

      var componentObjLeft = {
        guidId: leftBracketsGuid,
        itemContent: itemBrackets.content,
        componentType: itemBrackets.componentType,
        component: itemBrackets.component,
        type: itemBrackets.type,
        child: cloneDeep(leftObj)
      };
      andOrComponent.push(componentObjLeft);

      andOrComponent.push(componentObjMid);


      andOrComponent.push(componentObjRight);

    }


  }
  else if (item.componentType == 'Function') {
    var functionGuid = guid();
    thisMain.designerState[functionGuid + "Json"] = [];

    thisMain.designerState[functionGuid + "Value"] = {};
    componentObj = {
      order: componentIndex,
      guidId: functionGuid,
      itemContent: item.content,
      componentType: item.componentType,
      component: item.component,
      type: item.type,
      returnType: item.returnType,
      valueType: item.valueType,
      parameter: item.parameter,
      returnValue: thisMain.designerState[functionGuid + "Value"],
      child: thisMain.designerState[functionGuid + "Json"]
    };
    componentIndex++;

  }
  else if (item.component == 'Brackets') {
    var newBrackets = guid();
    thisMain.designerState[newBrackets + "Json"] = [];
    thisMain.designerState[newBrackets + "Css"] = [];
    componentObj = {
      order: componentIndex,
      guidId: newBrackets,
      itemContent: item.content,
      componentType: item.componentType,
      component: item.component,
      type: item.type,
      child: thisMain.designerState[newBrackets + "Json"],
      customStyle: thisMain.designerState[newBrackets + "Css"]
    };
    componentIndex++;

  }
  else if (item.type == "Operator" || item.type == "Custom") {
    componentObj = {
      order: componentIndex,
      guidId: guidId,
      itemContent: item.content,
      componentType: item.componentType,
      component: item.component,
      type: item.type,
      child: []


    };
    if (item.type == "Custom") { componentObj.valueType = item.valueType }
    componentIndex++;

  }
  else if (item.componentType == 'FixedValue') {

    thisMain.designerState[guidId + "Value"] = {};
    componentObj = {
      order: componentIndex,
      guidId: guidId,
      itemContent: item.content,
      componentType: item.componentType,
      component: item.component,
      type: item.type,
      child: [],
      value: thisMain.designerState[guidId + "Value"]
    };
    componentIndex++;

  }

  else {
    componentObj = {
      order: componentIndex,
      guidId: guidId,
      itemContent: item.content,
      componentType: item.componentType,
      component: item.component,
      type: item.type,
      child: []


    };
    componentIndex++;

  }

  if (destination.droppableId != 'jsonChildData') {
    let parent = findParent(thisMain.designerState['jsonChildData'], destination.droppableId.split('Json')[0]);

    if (item.component == 'And' || item.component == 'Or') {

      if (samelogical) {
        updateChildDepth(andOrComponent, parent.depthIndex, true);
      }
      else {
        updateChildDepth(andOrComponent, parent.depthIndex);
      }
      parent.child = (andOrComponent);
    }
    else {
      if (componentObj.componentType == 'FixedValue') {
        if (parent.componentType && parent.componentType == 'Function') {
          if (parent.parameter.length == 0) { componentObj.componentType = parent.valueType; }
          else {
            componentObj.componentType = parent.parameter[parent.child.length];
          }

        }
        else if (parent.component && parent.child && parent.component == 'Brackets') {
          let preOperand = parent.child[parent.child.length - 2];
          if (preOperand) {
            if (preOperand.componentType == "Function") {

              componentObj.componentType = preOperand.returnType;
              componentObj.valueType = preOperand.returnType;
            }
            else {
             
                componentObj.componentType = preOperand.valueType;
                componentObj.valueType = preOperand.valueType;
              
            }

          }

        }


      }
      componentObj.depthIndex = parent.depthIndex + 1;
      parent.child.push(componentObj);


    }
    stackPush('Undo', cloneDeep(thisMain.designerState['jsonChildData']));

  }

  else {

    if (item.component == 'And' || item.component == 'Or') {

      andOrComponent.forEach((item, index) => {
        item.depthIndex = 2;

      });

      thisMain.designerState[destination.droppableId] = (andOrComponent);
    }
    else {
      if (componentObj.componentType == 'FixedValue') {
        var length = thisMain.designerState['jsonChildData'].length;
        var preOperand = thisMain.designerState['jsonChildData'][length - 2];
        if (preOperand) {
          if (preOperand.componentType == "Function") {

            componentObj.componentType = preOperand.returnType;
            componentObj.valueType = preOperand.returnType;
          }
          else {
           
              componentObj.componentType = preOperand.valueType;
              componentObj.valueType = preOperand.valueType;
            
          }

        }
      }
      componentObj.depthIndex = 2;
      thisMain.designerState[destination.droppableId].push(componentObj);

    }
    stackPush('Undo', cloneDeep(thisMain.designerState[destination.droppableId]));

  }

  drawDesign(thisMain.designerState['jsonChildData'], thisMain);

}


function findParent(objects, droppableId) {

  if (objects && !Array.isArray(objects) && objects.guidId == droppableId) {


    return objects;
  }
  else if (!objects) {


    return null;
  }
  else {
    var i;
    var arrayResponse;
    var response;
    if (objects && Array.isArray(objects)) {
      for (i = 0; i < objects.length; i++) {


        arrayResponse = findParent(objects[i], droppableId);
        if (arrayResponse) {
          response = arrayResponse;
        }
      }


    }
    else {
      var j;
      var localresponse;
      for (j = 0; j < objects.child.length; j++) {

        localresponse = findParent(objects.child[j], droppableId);
        if (localresponse) {
          response = localresponse;
        }
      }
    }

    return response;
  }

}
function updateChildDepth(objects, parentDepth, crushDepth) {

  if (!Array.isArray(objects) && objects.child.length == 0) {
    if (objects.depthIndex) {
      if (crushDepth) {

        objects.depthIndex = parentDepth + 1;

      }
      else {
        objects.depthIndex++;
      }
    }
    else {
      objects.depthIndex = parentDepth + 1;
    }
    return objects;
  }
  else {
    var i;
    if (Array.isArray(objects)) {
      for (i = 0; i < objects.length; i++) {

        updateChildDepth(objects[i], parentDepth, crushDepth);
      }

    }
    else {
      var j;
      var localresponse;
      if (objects.depthIndex) {
        if (crushDepth) {

          objects.depthIndex = parentDepth + 1;

        }
        else {
          objects.depthIndex++;
        }
      }
      else {
        objects.depthIndex = parentDepth + 1;
      }
      for (j = 0; j < objects.child.length; j++) {

        updateChildDepth(objects.child[j], objects.depthIndex, crushDepth);

      }


    }

    return objects;
  }

}

function drawDesign(jsonData, thisMain) {

  var main = [];
  thisMain.designerState.jsonChildData = [];
  var queryText = "";
  var displayQueryText = "";
  var query = [];
  var displayQuery = [];
  jsonData.forEach((item, index) => {

    var response = createComponent(item, thisMain, queryText);

    main.push(response.child);
    thisMain.designerState.jsonChildData.push(response.jsondata);
    queryText = queryText + response.queryObj;
    displayQueryText = displayQueryText + response.displayQueryObj;
    displayQueryText = displayQueryText + response.queryObj;
    query.push(response.queryObj);
    displayQuery.push(response.displayQueryObj);
  });
  operatorsFunctionConvert(thisMain, query);

  queryText = query.join("");
  queryText = queryText.replaceAll("{replace}", "");
  displayQueryText = displayQuery.join("\n\t");
  displayQueryText = displayQueryText.replaceAll("{replace}", "");
  thisMain.designerState['main'] = [];
  //React Beautiful Dnd have a bug when render  dynamic dnd componenet. Because of that we using forceUpdate() function in setstate callback.
  //However we created  github issue fro react beatiful dnd. If they solve issue,we apply the solution and delete forceupdate function
  //https://github.com/atlassian/react-beautiful-dnd/issues/1191
  thisMain.setState({ queryText: queryText, displayQueryText: displayQueryText, jsonChildData: thisMain.designerState.jsonChildData }, () => {
    thisMain.designerState['main'] = main;
    thisMain.forceUpdate();

  });

}

//operatorsFunctionConvertTypelar için etc == conver to equal
function operatorsFunctionConvert(thisMain, query) {

  thisMain.state.operatorsFunctionConvertType.map((item, index) => {
    var customOperatorIndex = query.findIndex(x => x == item.operatorName);
    var itemFormula = item.operatorFormula;
    if (customOperatorIndex >= 0) {
      var leftOperand = query[customOperatorIndex - 1];
      var rightOperand = query[customOperatorIndex + 1];
      query[customOperatorIndex] = itemFormula;
      // if (rightOperand) {
      //   query[customOperatorIndex] = query[customOperatorIndex].replace('{rightOperand}', rightOperand);

      //   query.splice(customOperatorIndex + 1, 1);

      // }
      // if (leftOperand) {
      //   query[customOperatorIndex] = query[customOperatorIndex].replace('{leftOperand}', leftOperand);

      //   query.splice(customOperatorIndex - 1, 1);
      //   customOperatorIndex--;

      // }
      // if (!leftOperand || !rightOperand) {
      //   query[customOperatorIndex] = query[customOperatorIndex].replace('{rightOperand}', '').replace('{leftOperand}', '');

      // }


    }

  });

  return query;

}

function createComponent(item, thisMain, queryText) {
  if (item && item.child && item.child.length == 0) {
    var comp = componentBuilder(item, thisMain);
    return comp;

  } else if (item && item.child ? item.child.length : 0 != 0) {
    var i;
    var components = [];
    var jsonData = [];
    var childquery = [];
    var displaychildquery = [];
    var result = null;
    for (i = 0; i < item.child.length; i++) {
      result = createComponent(item.child[i], thisMain, queryText);

      components.push(result.child);
      jsonData.push(result.jsondata);
      childquery.push(result.queryObj);
      displaychildquery.push(result.displayQueryObj);
    }

    item.jsonData = jsonData;
    var parentcomp = componentBuilder(item, thisMain, components || []);
    var functionItem = thisMain.state.functionConvertType.find(x => x.functionName == item.component);
    if (functionItem) {
      var query = functionItem.functionFormula;
      childquery.forEach((child, index) => {
        query = query.replace('param' + (index + 1), child);
      });
      parentcomp.queryObj = query;
    }
    else {
      operatorsFunctionConvert(thisMain, childquery);
      var childqueryString =item.componentType=="Function"? childquery.join(","):childquery.join("");
      parentcomp.queryObj = parentcomp.queryObj.replace('{replace}', childqueryString);
    }
    var displaychildqueryString =item.componentType=="Function"? displaychildquery.join(","):displaychildquery.join("");
    parentcomp.displayQueryObj = parentcomp.displayQueryObj.replace('{replace}', displaychildqueryString);
    return parentcomp;
  }

  else if (Array.isArray(item)) {
    var main = [];
    var jsonChildData = [];
    var subqueryText = "";
    var displaysubqueryText = "";

    item.forEach((itemElement, index) => {
      var response = createComponent(itemElement, thisMain, queryText);
      main.push(response.child);
      jsonChildData.push(response.jsondata);
      subqueryText += response.queryObj;
      displaysubqueryText += response.displayQueryObj;

    });

    return { child: main, jsondata: jsonChildData, queryObj: subqueryText, displayQueryObj: displaysubqueryText };
  }

  return { child: null, jsondata: null, queryObj: null, displayQueryObj: null };
}

function componentBuilder(item, thisMain, childcomp) {

  var childItem = null;
  var componentObj = null;
  var queryObj;
  var displayQueryObj;

  if (item.componentType == 'Function') {

    componentObj = {
      guidId: item.guidId,
      depthIndex: item.depthIndex,
      componentType: item.componentType,
      component: item.component,
      type: item.type,
      returnType: item.returnType,
      parameter: item.parameter,
      valueType: item.valueType,
      returnValue: thisMain.designerState[item.guidId + "Value"],
      child: item.jsonData || []
    };
    queryObj = item.component + "({replace})";
    displayQueryObj = item.component + "({replace})";

    childItem = (<FunctionComponent dropMouseOutComponent={thisMain.dropMouseOutComponent} dropMouseOverComponent={thisMain.dropMouseOverComponent} parameter={item.parameter} depth={item.depthIndex} component={item.component} componentType={item.componentType} type={item.type} context={thisMain.props.context} droppableId={item.guidId} child={childcomp || []} />);

  }
  else if (item.component == 'Brackets') {

    thisMain.designerState[item.guidId + "Css"] = item.customStyle || [];
    componentObj = {
      guidId: item.guidId,
      depthIndex: item.depthIndex,
      itemContent: item.itemContent,
      type: item.type,
      componentType: item.componentType,
      component: item.component,
      child: item.jsonData || [],
      customStyle: thisMain.designerState[item.guidId + "Css"],
    };
    queryObj = "({replace})";
    displayQueryObj = "({replace})";
    childItem = (<Brackets bracketsMouseDown={thisMain.bracketsMouseDown} dropMouseOutComponent={thisMain.dropMouseOutComponent} dropMouseOverComponent={thisMain.dropMouseOverComponent} depth={item.depthIndex} customStyle={item.customStyle} type={item.type} context={thisMain.props.context} droppableId={item.guidId} child={childcomp || []} />);

  }
  else if (item.type == "Operator" || item.type == "Custom") {

    childItem = (<Operator depth={item.depthIndex} type={item.type} context={thisMain.props.context} draggableId={item.guidId} itemContent={item.itemContent} component={item.component} />
    );
    componentObj = {
      guidId: item.guidId,
      depthIndex: item.depthIndex,
      componentType: item.componentType,
      itemContent: item.itemContent,
      component: item.component,
      type: item.type,
      child: []
    };
    displayQueryObj = item.component;
    if (item.type == "Custom") {
      componentObj.valueType = item.valueType;
      if (thisMain.props.customQueryFormula != null) {
        queryObj = thisMain.props.customQueryFormula.replace('{customItem}', item.component);
      }
      else {
        queryObj = item.component;
      }
    }
    else {
      var functionItem = thisMain.state.operatorsConvertType.find(x => x.operatorName == item.component);
      queryObj = functionItem ? functionItem.operatorFormula : item.component;

    }
  }

  else if (item.component == "FixedValue") {

    thisMain.designerState[item.guidId + "Value"] = item.value;

    componentObj = {
      guidId: item.guidId,
      depthIndex: item.depthIndex,
      itemContent: item.itemContent,
      componentType: item.componentType,
      valueType: item.componentType,
      component: item.component,
      type: item.type,
      child: [],
      value: thisMain.designerState[item.guidId + "Value"]
    };
  

      componentObj.preItemGuId = item.preItemGuId;
    


    queryObj = componentObj.value.value ? item.componentType == 'String' ? '"' + componentObj.value.value + '"' : componentObj.value.value : item.itemContent;
    displayQueryObj = queryObj;
    childItem = (<FixedValue fixedValue={componentObj.value.value} onChangeComponentValue={thisMain.onChangeComponentValue} componentType={item.componentType} depth={item.depthIndex} type={item.type} context={thisMain.props.context} draggableId={item.guidId} itemContent={item.itemContent} />
    );

  }



  return { child: childItem, jsondata: componentObj, queryObj: queryObj, displayQueryObj: displayQueryObj };
}

function designerRuleController(thisMain, draggableId, destination, itemIncoming) {
  //TODO Tüm rulelar belirlenince tekrardan aktif hale getirilecek
  return true;
  if (destination.droppableId == 'main') {
    var destinationId = 'jsonChildData';
  }
  else {
    destinationId = destination.droppableId + "Json";
  }
  if (draggableId) {
    var item = getDraggableItem(draggableId, thisMain);
  }
  else if (itemIncoming) {

    item = itemIncoming;
  }
  else {
    return false;
  }
  var destinationItem = findParent(thisMain.state['jsonChildData'], destination.droppableId);
  var destinationItemChild = thisMain.state[destinationId];
  var childlength = destinationItemChild ? destinationItemChild.length : 0;
  //function rule kontrolleri
  if (destinationItem && destinationItem.componentType == "Function") {
    var nextParameterIndex = destinationItem.child.length;
    if (destinationItem.parameter.length == 0 && (item.valueType == destinationItem.valueType || item.component == 'FixedValue')) { return true; }
    else if (nextParameterIndex == destinationItem.parameter.length) {
      if (destinationItem.child.findIndex(x => x == null) >= 0) { return true; }
      return false;

    }
    else if (destinationItem.parameter[nextParameterIndex] && destinationItem.parameter[nextParameterIndex] == item.valueType) { return true; }
    else if (destinationItem.parameter[nextParameterIndex] && destinationItem.parameter[nextParameterIndex] == "List" && item.isList == 1) { return true; }
    else if (nextParameterIndex != destinationItem.parameter.length && item.component == 'FixedValue') { return true; }
    return false;
  }

  //boş parantez içine operator eklenemez Rule Operand Operator Operand
  if (childlength == 0 && item.type == 'Operator') {
    return false;

  }
  //boş parantez içine Operand eklenebilir Rule Operand Operator Operand
  else if (childlength == 0 && (item.type == 'Operands' || item.type == 'Custom')) {
    //sola tek başına fixed value ekleneez.Fixed valuenun sonunda her zaman value type olan bir değer olmalı
    if (item.component == 'FixedValue') { return false; }
    return true;

  }
  else {
    // Rule Operand Operator Operand kontrollü
    var childOperators = destinationItemChild.filter(x => x.componentType == 'Operator');
    var childOperatorComponents = [];
    if (childOperators && childOperators.length > 0) {
      childOperatorComponents = childOperators.map(function (x) { return x.component; });
    }

    let preItem = destinationItemChild[childlength - 1];
    if (preItem.type == item.type) {
      return false;
    }
    //sol taraf ve yeni gelen item valuetype kontrolü
    else if (preItem.type == 'Operator' && (item.type == 'Operands' || item.type == 'Custom')) {
      let operatorLeftSide = destinationItemChild[childlength - 2];
      if (operatorLeftSide && operatorLeftSide.valueType == item.valueType) {
        return true;
      }
      else if (operatorLeftSide && operatorLeftSide.valueType && item.component == 'FixedValue') { return true; }
      else { return false; }

    }
    else if ((preItem.type == 'Operands' || preItem.type == 'Custom') && item.type == 'Operator') {
      //Aynı parantez içine sadece bir  relationalOperators eklenebilir.

      if (thisMain.state.relationalOperatorsItem.find(x => x.component == item.component)) {
        var relationalOperatorsComponents = thisMain.state.relationalOperatorsItem.map(function (x) { return x.component; });

        if (childOperatorComponents.some(x => relationalOperatorsComponents.includes(x))) {
          return false;
        }
        //Stringlerden sonra sadece == gelebilir
        else if (preItem.valueType == 'String' && item.component != '==') {
          return false;
        }
        else { return true; }

      }
      //expressionOperators kontrolü İşlem önceliği +,- ve *,/ aynı parantezde kullanılamaz
      else if (thisMain.state.expressionOperatorsItem.find(x => x.component == item.component)) {
        var expressionOperatorsComponents = thisMain.state.expressionOperatorsItem.map(function (x) { return x.component; });

        var expressionPlusGroup = ["+", "-"];
        var expressionDivideGroup = ["*", "/"];
        var expressionOtherGroup = ["MOD", "="];

        if (childOperatorComponents.some(x => expressionOperatorsComponents.includes(x))) {
          if (childOperatorComponents.some(x => expressionPlusGroup.includes(x)) &&
            expressionPlusGroup.find(x => x == item.component)) {
            return true;
          }
          else if (childOperatorComponents.some(x => expressionDivideGroup.includes(x)) &&
            expressionDivideGroup.find(x => x == item.component)) {
            return true;
          }
          else if (
            expressionOtherGroup.find(x => x == item.component)) {
            return true;
          }

          return false;
        }
        else { return true; }

      }
      return true;
    }

  }
  return true;


}


export { guid, getGridCellStyle, getDropStyle, createComponentJsonData, drawDesign, getListStyle, getItemStyle, getQuickPanelStyle, designerRuleController, findParent, updateChildDepth };
