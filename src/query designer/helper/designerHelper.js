import React, { Component } from 'react';
import find from 'lodash/find';


import Search from '@material-ui/icons/Search';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import indexOf from 'lodash/indexOf';


import { Popover,Input,Divider,Button,Card ,Tabs,AppBar,Tab,Slider} from '@material-ui/core';


import { CodeEditor } from '../components/codeEditor/index';


import { Expander } from '../components/expander/index';

import * as SvgIcons from '@material-ui/icons';



import { guid, getGridCellStyle, getDropStyle, createComponentJsonData, getListStyle, getItemStyle, drawDesign, getQuickPanelStyle } from './componentHelper';
import { green } from '@material-ui/core/colors';
const stackUndo = [];
const stackRedo = [];
var meta = require('./designerMetaData.js');

const overridesClasses = (isChild) => ({
  MuiPaper: {
    elevation1: {
      boxShadow: 'none'
    }
  },
  MuiExpansionPanelSummary: {
    root: {
      backgroundColor: isChild ? 'rgb(240,240,240)' : 'white',
      display: 'flex',
      minHeight: '0px !important',
      padding: '5px 12px 5px 12px',
      '&$expanded': {
        padding: '0 12px 0 12px !important',
      }
    },
    content: {
      // backgroundColor: 'rgb(124,252,0)',
      minHeight: '0px !important',
      margin: '0px !important',
      padding: '0px !important',
      '& > :last-child': {
        paddingRight: 32,
      }
    }
  },
  MuiExpansionPanelDetails: {
    root: {
      display: 'flex',
      padding: '5px 20px 0px 20px',
      //backgroundColor: 'rgb(178,34,34)',
    }
  },
  MuiIconButton: {
    root: {
      width: '25px',
      height: '25px'
    }
  },
  MuiSvgIcon: {
    root: {
      width: '25px',
      height: '25px'
    }
  }
});
function stackPush(stackType, jsonData) {
  if (jsonData && jsonData != []) {
    if (stackType == 'Undo') {
      stackUndo.push(jsonData);
    } else if (stackType == 'Redo') {
      stackRedo.push(jsonData);
    }
  }

}


function stackPop(stackType) {

  var currentStack, popItem, currentItem;
  if (stackType == 'Undo') {
    currentStack = stackUndo;
  } else if (stackType == 'Redo') {
    currentStack = stackRedo;
  }

  popItem = currentStack.pop();
  var stackIdex = currentStack.length;
  if (stackIdex == 0) {
    if (stackType == 'Redo') { currentItem = popItem; }
    else {
      currentItem = [];
    }
  }
  else {
    if (stackType == 'Redo') { currentItem = popItem; }
    else {
      currentItem = currentStack[stackIdex - 1];
    }

  }


  return { popItem: popItem, currentJson: currentItem };
}

/*
  String Functions bu ve getuserchild gibi methodlar için bir helper js yaz
*/
function stringUpperCase(name) {
  if (name ==null || name==undefined)
  return null;
  
  name = name.value ? name.value : name;
  if (meta.data.props.languageId == 1) {
    var letters = { 'i': 'İ', 'ş': 'Ş', 'ğ': 'Ğ', 'ü': 'Ü', 'ö': 'Ö', 'ç': 'Ç', 'ı': 'I' };
    name = name.replace(/(([iışğüçö]))/g, function(letter) { return letters[letter]; });
  }
  return name.toUpperCase();
}

function stringLowerCase(name) {
  if (name ==null || name==undefined)
  return null;

  name = name.value ? name.value : name;
  if (meta.data.props.languageId  == 1) {
    var letters = { 'İ': 'i', 'I': 'ı', 'Ş': 'ş', 'Ğ': 'ğ', 'Ü': 'ü', 'Ö': 'ö', 'Ç': 'ç' };
    name = name.replace(/(([İIŞĞÜÇÖ]))/g, function(letter) { return letters[letter]; });
  }
  return name.toLowerCase();
}

function filter(searchText, name, thisMain) {

  if (searchText.length > 0) {

    return meta.data.props[name].filter((item) => stringLowerCase(item.content).indexOf(searchText) !== -1);
  } else {
    return meta.data.props[name];
  }
}
function groupFilter(searchText, thisMain, filterType) {

  if (searchText.length > 0) {
    if (filterType == "Functions") {
      let returnVal = thisMain.state.functionSearchItem.map((item) => { return meta.data.props[item].filter((item) => stringLowerCase(item.content).indexOf(searchText) !== -1); });
      return returnVal;
    }
    else if (filterType == "Fields") {
      let returnVal = thisMain.state.fieldSearchItem.map((item) => { var stateName = item.replace("Search", ""); return thisMain.fields[stateName].filter((item) => stringLowerCase(item.content).indexOf(searchText) !== -1); });
      return returnVal;
    }
    else if (filterType == "Operator") {
      let returnVal = thisMain.state.operatorSearchItem.map((item) => { return meta.data.props[item].filter((item) => stringLowerCase(item.content).indexOf(searchText) !== -1); });
      return returnVal;
    }
    else if (filterType == "Custom") {

      let returnVal = thisMain.state.customSearchItem.map((item) => {
        var searchType;
        if (thisMain.props.item) {
          searchType = thisMain.propss;
        }
        else {
          searchType = meta.data.props;
        }
        return searchType[item].filter((item) => stringLowerCase(item.content).indexOf(searchText) !== -1);

      });
      return returnVal;

    }

  } else {
    if (filterType == "Functions") {
      let returnVal = thisMain.state.functionSearchItem.map((item) => { return meta.data.props[item] });
      return returnVal;
    } else if (filterType == "Fields") {

      let returnVal = thisMain.state.fieldSearchItem.map((item) => { var stateName = item.replace("Search", ""); return thisMain.fields[stateName] });
      return returnVal;

    }
    else if (filterType == "Operator") {

      let returnVal = thisMain.state.operatorSearchItem.map((item) => { return meta.data.props[item] });
      return returnVal;

    }
    else if (filterType == "Custom") {

      let returnVal = thisMain.state.customSearchItem.map((item) => {
        var searchType;
        if (thisMain.props.item) {
          searchType = thisMain.propss;
        }
        else {
          searchType = meta.data.props;
        }
        return searchType[item];

      });
      return returnVal;

    }
  }
}
function onChange(event, name, thisMain) {
  if (event.target.value != undefined) {
    thisMain.setState({
      [name]: filter(stringLowerCase(event.target.value), name, thisMain)
    })

    if (thisMain.props.onChange) {
      thisMain.props.onChange();
    }
  }
}
function onChangeGroupFilter(event, thisMain, filterType) {
  if (event.target.value != undefined) {
    var searchedObj = {};
    var filteredFields = groupFilter(stringLowerCase(event.target.value), thisMain, filterType);
    if (filterType == "Functions") {
      var searchedStateList = thisMain.state.functionSearchItem;
    }
    else if (filterType == "Fields") {
      searchedStateList = thisMain.state.fieldSearchItem;
    }
    else if (filterType == "Operator") {
      searchedStateList = thisMain.state.operatorSearchItem;
    }
    else if (filterType == "Custom") {
      searchedStateList = thisMain.state.customSearchItem;
    }
    filteredFields.forEach((item, index) => {
      if (filterType == "Fields") {
        thisMain.fields[searchedStateList[index]] = item;
      }
      else {
        thisMain.state[searchedStateList[index]] = item;
      }
    });
    thisMain.leftTab = getLeftTab(thisMain);
    thisMain.forceUpdate();


    if (thisMain.props.onChange) {
      thisMain.props.onChange();
    }
  }
}

function renderGroupFilter(thisMain, filterType) {
  return (
    <div>
      <div style={thisMain.state.paperStyle} zdepth={1}>

        <div style={{ display: 'flex' }}>

          <div style={{ display: 'flex' }}>
            <Input
              id="binputsearchId"
           
              ref={r => thisMain.binputsearch = r}
              hintText={'Search'}
              name={'Search'}
              onBlur={thisMain.onBlur}
              onFocus={thisMain.onFocus}
              onChange={(e) => onChangeGroupFilter(e, thisMain, filterType)}
              inputStyle={{
                marginTop: '-2px',
                height: '26px',
                lineHeight: '26px',
                // marginLeft: !this.props.context.localization.isRightToLeft ? '15px' : '0px',
                // marginRight: !this.props.context.localization.isRightToLeft ? '0px' : '15px',
                width: '115px',
                float: 'right' ,

              }}
              underlineShow={false}
            /></div>
          <div style={{ display: 'flex' }}>
            <Search style={thisMain.state.searchIconStyle} viewBox={'0 0 30 30'} /></div>
        </div>
      </div>


    </div>

  )
}

function getSearchArea(thisMain, matchSoruceName) {
  var searchArea = (<div style={thisMain.state.paperStyle} zdepth={1}>

    <div style={{
      display: 'flex',
      marginLeft: '-15px'
    }}>
      <Search style={thisMain.state.searchIconStyle} viewBox={'0 0 30 30'} />
      <Input
        id="binputsearchId"
    
        ref={r => thisMain.binputsearch = r}
        hintText={'Search'}
        name={'Search'}
        onBlur={thisMain.onBlur}
        onFocus={thisMain.onFocus}
        onChange={(e) => onChange(e, matchSoruceName, thisMain)}
        inputStyle={{
          marginTop: '-2px',
          height: '26px',
          lineHeight: '26px',
          // marginLeft: !this.props.context.localization.isRightToLeft ? '15px' : '0px',
          // marginRight: !this.props.context.localization.isRightToLeft ? '0px' : '15px',
          width: '115px',
          float:  'right' ,

        }}
        underlineShow={thisMain.underlineShow}
      />
    </div>
  </div>);

  return searchArea;
}

function renderFilter(matchSoruce, name, matchSoruceName, thisMain, isSearched) {
  var searchArea = getSearchArea(thisMain, matchSoruceName);
  return (
    <div style={{ maxWidth: '175px' }}>
      {isSearched ? searchArea : ""}
      {
        renderMatchSoruce(matchSoruce, name, thisMain)
      }

    </div>

  )
}

function renderMatchSoruce(matchSoruce, name, thisMain) {
  if (matchSoruce != null) {
    return (
      matchSoruce.map((item, index) => {
        var text = item.content.length > 15 ? item.content.substring(0, 15) + "..." : item.content;


        var draggableItem = (<Draggable
          key={item.id}
          draggableId={name + item.id}
          index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}>
              {text}
            </div>
          )}
        </Draggable>);
        // return item.content.length > 15 ? <ToolTip
        //   context={thisMain.props.context}
        //   tooltip={item.content}
        //   placement={'bottom-start'}
        //   children={draggableItem}
        // /> : draggableItem;
        return item.content.length > 15 ? draggableItem: draggableItem;

      })
    )

  }

}


function getLeftTab(thisMain) {
  var leftTabOperandsFixedValue = (<Expander key={(r) => thisMain.FixedValueItem = r} overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperandsFixedValue')} isExpanded={thisMain.state.leftTabOperandsFixedValue} header={<div style={{ width: '200px', display: 'flex' }}>{meta.data.props.FixedValueHeader}</div>} children={
    renderFilter(thisMain.state.FixedValueItem, "Operands_Fixed_Value_", 'FixedValueItem', thisMain, false)
  }

    style={{ boxShadow: 'none' }}
    context={thisMain.props.context}>
  </Expander>);

  var leftTabOperandsFunctionNumber = (<Expander ref={(r) => thisMain.NumberFunctionItem = r} overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperandsFunctionNumber')} isExpanded={thisMain.state.leftTabOperandsFunctionNumber} header={meta.data.props.NumberFunctionHeader} children={
    renderFilter(thisMain.state.NumberFunctionItem, "Operands_Functions_Number_", 'NumberFunctionItem', thisMain, false)
  }

    style={{ boxShadow: 'none' }}
    context={thisMain.props.context}>
  </Expander>);

  var leftTabOperandsFunctionString = (<Expander  ref={(r) => thisMain.stringFunctionItem = r}  overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperandsFunctionString')} isExpanded={thisMain.state.leftTabOperandsFunctionString} header={meta.data.props.stringFunctionHeader} children={
    renderFilter(thisMain.state.stringFunctionItem, "Operands_Functions_String_", 'stringFunctionItem', thisMain, false)
  }

    style={{ boxShadow: 'none' }}
    context={thisMain.props.context}>
  </Expander>);

  var leftTabOperandsFunctionDate = (<Expander ref={(r) => thisMain.dateFunctionItem = r} overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperandsFunctionDate')} isExpanded={thisMain.state.leftTabOperandsFunctionDate} header={meta.data.props.dateFunctionHeader} children={
    renderFilter(thisMain.state.dateFunctionItem, "Operands_Functions_Date_", 'dateFunctionItem', thisMain, false)
  }
    style={{ boxShadow: 'none' }}
    context={thisMain.props.context}>
  </Expander>);

  var leftTabOperatorsRelational = (<Expander ref={(r) => thisMain.relationalOperatorsItem = r}  overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperatorsRelational')} isExpanded={thisMain.state.leftTabOperatorsRelational} header={<div style={{ width: '200px', display: 'flex' }}>{meta.data.props.relationalOperatorsHeader}</div>} children={
    renderFilter(thisMain.state.relationalOperatorsItem, "Operator_Relational_Item_", 'relationalOperatorsItem', thisMain, false)
  }
    style={{ boxShadow: 'none' }}
    context={thisMain.props.context}>
  </Expander>);

  var leftTabOperatorsLogical = (<Expander ref={(r) => thisMain.logicalOperatorsItem = r}  overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperatorsLogical')} isExpanded={thisMain.state.leftTabOperatorsLogical} header={meta.data.props.logicalOperatorsHeader} children={
    renderFilter(thisMain.state.logicalOperatorsItem, "Operator_Logical_Item_", 'logicalOperatorsItem', thisMain, false)
  }
    style={{ boxShadow: 'none' }}
    context={thisMain.props.context}>
  </Expander>);

  var leftTabOperatorsExpression = (<Expander ref={(r) => thisMain.expressionOperatorsItem = r}  overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperatorsExpression')} isExpanded={thisMain.state.leftTabOperatorsExpression} header={meta.data.props.expressionOperatorsHeader} children={
    renderFilter(thisMain.state.expressionOperatorsItem, "Operator_Expression_Item_", 'expressionOperatorsItem', thisMain, false)
  }
    style={{ boxShadow: 'none' }}
    context={thisMain.props.context}>
  </Expander>);
  if (thisMain.fields) {
    var leftTabOperatorFieldInt = (<Expander ref={(r) => thisMain.integerFieldsSearch = r}  overridesClasses={overridesClasses(true)} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperatorFieldInt')} isExpanded={thisMain.state.leftTabOperatorFieldInt} header={"Fields Integer"} children={
      renderFilter(thisMain.fields.integerFieldsSearch, "Operators_Field_Int_", 'integerFieldsSearch', thisMain, false)
    }
      style={{ boxShadow: 'none' }}
      context={thisMain.props.context}>
    </Expander>);
    var leftTabOperatorFieldString = (<Expander ref={(r) => thisMain.stringFieldsSearch = r} overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperatorFieldString')} isExpanded={thisMain.state.leftTabOperatorFieldString} header={"Fields String"} children={
      renderFilter(thisMain.fields.stringFieldsSearch, "Operators_Field_String_", 'stringFieldsSearch', thisMain, false)
    }
      style={{ boxShadow: 'none' }}
      context={thisMain.props.context}>
    </Expander>);
    var leftTabOperatorFieldDate = (<Expander ref={(r) => thisMain.dateFieldsSearch = r}  overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperatorFieldDate')} isExpanded={thisMain.state.leftTabOperatorFieldDate} header={"Fields Date"} children={
      renderFilter(thisMain.fields.dateFieldsSearch, "Operators_Field_Date_", 'dateFieldsSearch', thisMain, false)
    }
      style={{ boxShadow: 'none' }}
      context={thisMain.props.context}>
    </Expander>);

    var leftTabOperatorFieldModel = (<Expander ref={(r) => thisMain.modelFieldsSearch = r}  overridesClasses={overridesClasses(true)} hideShadow={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperatorFieldModel')} isExpanded={thisMain.state.leftTabOperatorFieldModel} header={<div style={{ width: '200px', display: 'flex' }}>Fields Model</div>} children={
      renderFilter(thisMain.fields.modelFieldsSearch, "Operators_Field_Model_", 'modelFieldsSearch', thisMain, false)
    }
      style={{ boxShadow: 'none' }}
      context={thisMain.props.context}>
    </Expander>);
  }
  var leftTabOperandAllField = (<div> {leftTabOperatorFieldInt}  {leftTabOperatorFieldString} {leftTabOperatorFieldDate} {leftTabOperatorFieldModel}</div>);


  var leftTabOperandAllFunction = (<div> {leftTabOperandsFixedValue}   {leftTabOperandsFunctionString}   {leftTabOperandsFunctionNumber}  {leftTabOperandsFunctionDate} </div>);
  if (thisMain.state.customOperandsItem) {
    var leftTabOperatorCustom = (<Expander  ref={(r) => thisMain.customOperandsItem = r} overridesClasses={overridesClasses(false)} hideShadow={true} justButtonCanExpand={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperatorCustom')} isExpanded={thisMain.state.leftTabOperatorCustom} header={<div style={{ width: '250px', display: 'flex' }}><div style={{ float: 'left', marginRight: '5px' }}>{meta.data.props.customOperandsHeader}</div> <div style={{ float: 'right', marginLeft: 'auto', order: '2', marginRight: '5px' }}>  {renderGroupFilter(thisMain, "Custom")}</div></div>} children={
      renderFilter(thisMain.state.customOperandsItem, "Operands_Custom_Item_", 'customOperandsItem', thisMain, false)

    }

      style={{ boxShadow: 'none' }}
      context={thisMain.props.context}>
    </Expander>);
  }


  if (thisMain.state.isExpression) {
    var leftTabOperators = (<div>  {leftTabOperatorsExpression}  </div>);

  }
  else {
    leftTabOperators = (<div >  {leftTabOperatorsRelational} {leftTabOperatorsLogical} {leftTabOperatorsExpression}  </div>);
  }

  var leftTab = [
    {
      text: 'OPERATORS',
      value: 0,
      content: (<Droppable droppableId="Operators_LeftTab">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            <Expander  ref={(r) => thisMain.leftTabOperators = r} overridesClasses={overridesClasses(false)} hideShadow={true} justButtonCanExpand={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperators')} isExpanded={thisMain.state.leftTabOperators} header={<div style={{ width: '250px', display: 'flex' }}><div style={{ float: 'left', marginRight: '5px' }}>Operators</div> <div style={{ float: 'right', marginLeft: 'auto', order: '2', marginRight: '5px' }}> {renderGroupFilter(thisMain, "Operator")}</div></div>} children={
              leftTabOperators

            }

              context={thisMain.props.context}>
            </Expander>


            {provided.placeholder}
          </div>
        )}
      </Droppable>)
    },
    {
      text: 'OPERANDS',
      value: 1,
      content: (<Droppable droppableId="Operands_LeftTab">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              userSelect: 'none',
              padding: 4,
              color: 'gray',
              width: '330px',
              height: '620px',
              overflowY: 'scroll',
              marginRight: '15px'
            }}>
            <Expander  ref={(r) => thisMain.leftTabOperandAllFunction = r} overridesClasses={overridesClasses(false)} hideShadow={true} justButtonCanExpand={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperandAllFunction')} isExpanded={thisMain.state.leftTabOperandAllFunction} header={<div style={{ width: '250px', display: 'flex' }}><div style={{ float: 'left', marginRight: '5px' }}>Functions</div>  <div style={{ float: 'right', marginLeft: 'auto', order: '2', marginRight: '5px' }}>{renderGroupFilter(thisMain, "Functions")}</div></div>} children={
              leftTabOperandAllFunction
            }

              context={thisMain.props.context}>
            </Expander>
            {/* <Expander  ref={(r) => thisMain.leftTabOperandAllField = r}  overridesClasses={overridesClasses(false)} hideShadow={true} justButtonCanExpand={true} onChange={thisMain.expenderOnchange.bind(thisMain, 'leftTabOperatorAllField')} isExpanded={thisMain.state.leftTabOperatorAllField} header={<div style={{ width: '250px', display: 'flex' }}><div style={{ float: 'left', marginRight: '5px' }}>Fields</div > <div style={{ float: 'right', marginLeft: 'auto', order: '2', marginRight: '5px' }}> {renderGroupFilter(thisMain, "Fields")}</div></div>} children={
              leftTabOperandAllField
            }

              context={thisMain.props.context}>
            </Expander> */}
            {
              thisMain.state.customOperandsItem ? leftTabOperatorCustom : ""
            }


            {provided.placeholder}
          </div>
        )}
      </Droppable>)
    }
  ];
  return leftTab;

}

function getleftPaneContent(thisMain, tabItems) {


  let tabs = tabItems.map((item, i) => {

    let text = "";
    if (item.text) {
      if (item.text.value) {
        let splitArray: [] = item.text.value.split('-');
        text = splitArray.length > 0 ? splitArray[0] : item.text.value
      }
      else {
        let splitArray: [] = item.text.split('-');
        text = splitArray.length > 0 ? splitArray[0] : item.text
      }
    }

    // if (item.text.value) {
    //   let splitArray: [] = item.text.value.split('-');
    //   text = splitArray.length > 0 ? splitArray[0] : item.text.value
    // }
    // else if (item.text) {
    //   let splitArray: [] = item.text.split('-');
    //   text = splitArray.length > 0 ? splitArray[0] : item.text
    // }

    let idforAccess = i + '_' + text.replace(/\s/g, '') + "_" + item.value;


    return (
      <Tab
 
    
        key={i}
        id={idforAccess}
        disabled={item.disabled}
        icon={item.icon}
        value={item.value || i}
        label={item.text}
     
        isUsageOfAppBar={true} />
    );
  });

  let tabContents = tabItems.map((item, i) => {
    var style = {};
    if (thisMain.state.currentLeftTab !== item.value) {
      style = { height: 0, overflow: 'hidden' };
    }
    style = Object.assign({},  style);
    return <div key={item.value || i} style={style}>{item.content}</div>;
  });

  let leftPaneContent = (
    <div style={{ width: '100%', height: '100%' }}>
      <Card  column={0} style={{ height: '97%', paddingTop: '0px', paddingBottom: '0px', textAlign: 'center' }}>
           <Tabs
          orientation={'horizontal'}
          ref={r => (thisMain.tabBar = r)}
          onChange={thisMain.handleChangeLeftTab.bind(thisMain)}
          value={thisMain.state.currentLeftTab}
          isRightScrollActive={true}
          style={{backgroundColor:'#f0f0f0',maxWidth:'323px'}}>
        
          {tabs}
        </Tabs>
        {tabContents}
      </Card>
    </div>
  );
  return leftPaneContent;
}

function getRightTab(thisMain) {

  var rightTab = [
    {
      text: 'CONDITIONS',
      value: 0,
      content: <div>Tab Content 1</div>
    },
    {
      text: 'EXPRESSIONS',
      value: 1,
      content: <div>Tab Content 2</div>
    }
  ];
  return rightTab;
}
function getRightPaneContent(thisMain) {
  var rightTab = getRightTab(thisMain);
  let rightPaneContent = (
    <div style={{ width: '100%', height: '100%' }}>
      <Card context={thisMain.props.context} column={0} style={{ minHeight: 650, paddingTop: '0px', paddingBottom: '0px', textAlign: 'center' }}>

         <Tabs value={1} onChange={thisMain.handleChangeTab} aria-label="simple tabs example">
    <Tab label="Item One" >


    </Tab>
    <Tab label="Item Two"/>
    <Tab label="Item Three" />
  </Tabs>


      </Card>
    </div>
  );
  return rightPaneContent;
}

function getcodeModeContent(thisMain) {
  var codeText = thisMain.state.isExpression == false ? 'if(' + (thisMain.props.showDisplayQuery ? thisMain.state.displayQueryText : thisMain.state.queryText) + '){\nreturn true;\n}\nelse{\nreturn false;\n}' : thisMain.state.queryText;
  var codeModeContent = (

<CodeEditor context={thisMain.props.context} mode={thisMain.state.queryLanguange}
    value={codeText} />
   
);

 

  return codeModeContent;

}

function getUpBarContent(thisMain) {
  var UndoIcon = SvgIcons['Undo'];
  var RedoIcon = SvgIcons['Redo'];
  var ClearIcon = SvgIcons['Clear'];
  var upBarContent = (<div style={{
    float: 'left',
    marginLeft: '5px',
    background: '#f0f0f0'
  }}>
    <div style={{ float: 'left', marginTop: '4px' }}>
      <div style={{ float: 'left' }}>
     <Button
        variant="contained"
        color="default"
        ref={r => thisMain.Undo = r} 
        type="raised"
        style={{ boxShadow: 'none', background: '#f0f0f0'}}
        onClick={thisMain.undo.bind(thisMain)} 
        startIcon={<UndoIcon />}
      >
        Undo
      </Button>
      </div>
      <div style={{ float: 'left' }}>
      
     
     <Button
     ref={r => thisMain.Redo = r} 
        variant="contained"
        color="default"
      
        type="raised"
        style={{ boxShadow: 'none', background: '#f0f0f0'}}
        onClick={thisMain.redo.bind(thisMain)} 
        startIcon={<RedoIcon />}
      >
        Redo
      </Button>
      </div>
      <div style={{ float: 'left' }}>
        <Button
     ref={r => thisMain.Clear = r} 
        variant="contained"
        color="default"
      
        type="raised"
        style={{ boxShadow: 'none', background: '#f0f0f0'}}
        onClick={thisMain.clearDesigner.bind(thisMain)} 
        startIcon={<ClearIcon />}
      >
        Clear
      </Button>
      </div>
    </div>
    <div style={{ float: 'right' }}>
      <div style={{
        float: 'left', fontWeight: 'bold', textAlign: 'center', fontSize: '30px', paddingRight: '13px', cursor: 'pointer'
      }} onClick={thisMain.zoom.bind(thisMain, thisMain, thisMain.state.canvasZoom - 0.5)}>  - </div>

      <div style={{ float: 'right', width: '50px', marginRight: '5px', marginLeft: '20px' }}>

        Quick Panel

                </div>
      <div style={{ float: 'right', width: '38px', marginRight: '-34px', marginLeft: 'auto', marginTop: '17px' }}>
        <Divider context={thisMain.props.context} style={{ margin: '2px 0px 2px 0px', transform: 'rotate(90deg)' }} />
      </div>
      <div style={{
        float: 'right', fontWeight: 'bold', textAlign: 'center', fontSize: '30px', paddingLeft: '13px', cursor: 'pointer'
      }} onClick={thisMain.zoom.bind(thisMain, thisMain, thisMain.state.canvasZoom + 0.5)}>  + </div>
      <div style={{ float: 'right' ,width:'100px',
    marginTop: '6px'}}>

             <Slider ref={(r) => thisMain.SliderComponent = r}
          min={1}
          value={thisMain.state.canvasZoom}
          max={5}
          step={0.5}
          vertical={false}
          onChange={thisMain.zoom.bind(thisMain)} aria-labelledby="continuous-slider" />
      </div>
    </div>
  </div>);
  return upBarContent;

}


function getquickPanel(thisMain) {
  var quickPanelComponentList = [];
  quickPanelComponentList.push(<Divider context={thisMain.props.context} style={{ margin: '2px 0px 2px 0px' }} />);
  thisMain.state.QuickPanel.forEach((item, index) => {
    var guidId = guid();
    var quickPanelComponent = (<div><Draggable
      key={guidId}
      draggableId={'QuickPanel_' + item.id}
      index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getQuickPanelStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}>
          <b>  {item.content}</b>
        </div>
      )}
    </Draggable>
      <Divider context={thisMain.props.context} style={{ margin: '2px 0px 2px 0px' }} />
    </div>);
    quickPanelComponentList.push(quickPanelComponent);


  });

  var droppablequickPanel = (<Droppable droppableId="QuickPanel">
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={{
          padding: 4,
          border: '2px'
        }}>
        {quickPanelComponentList}
        {provided.placeholder}
      </div>
    )}
  </Droppable>);

  return droppablequickPanel;
}


function getRightClickMenu(thisMain, pasteButtonRuleResponse) {
 
  var DeleteIcon = SvgIcons['Delete'];
  var DContentCopyIcon = SvgIcons['FileCopy'];
  //var ContentPasteIcon = SvgIcons['Paste'];
  var rightClickMenu = (<Popover
    ref={r => thisMain.popoverMenu = r}


    anchorReference={"anchorPosition"}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    anchorPosition={{ top: thisMain.state.rightClickMenuTop, left: thisMain.state.rightClickMenuLeft }}
    onClose={thisMain.onPopoverClose.bind(thisMain)}
    open={thisMain.state.isRightClickMenuOpen}
  >
    <div>
     
            <Button type="flat"
              startIcon={<DContentCopyIcon />}
        text={'Copy Group'}
        dynamicIcon="ContentCopy"
        ref={r => thisMain.ContentCopy = r} 
        iconProperties={{ color: "green" }}
        onClick={thisMain.handleClose.bind(thisMain, 'copy')}
        disabled={thisMain.state.copyButtonDisabled}
        style={{ width: '100%' }} >
         Copy Group
     </Button>
      <br />
      <Button type="flat"
      startIcon={<DeleteIcon />}
        dynamicIcon="Delete"
        ref={r => thisMain.Delete = r} 
        iconProperties={{ color: "green" }}
        onClick={thisMain.handleClose.bind(thisMain, 'delete')}
        disabled={thisMain.state.deleteButtonDisabled}
        style={{ width: '100%' }} >
          Delete Group
     </Button>
    
        
      <br />
      <Button type="flat"
        startIcon={<DContentCopyIcon />}
        text={'Paste Group'}
        dynamicIcon="ContentPaste"
        ref={r => thisMain.ContentPaste = r} 
        iconProperties={{ color: "green" }}
        onClick={thisMain.handleClose.bind(thisMain, 'paste')}
        style={{ width: '100%', backgroundColor: pasteButtonRuleResponse ? 'transparent' : 'lightpink' }}
        disabled={thisMain.state.pasteButtonDisabled} >
         Paste Group
     </Button>
  
      <br />


    </div>
  </Popover>);

  return rightClickMenu;
}




export { getLeftTab, stackPush, stackPop, getleftPaneContent, getRightPaneContent, getcodeModeContent, getquickPanel, filter, getUpBarContent, getRightClickMenu };
