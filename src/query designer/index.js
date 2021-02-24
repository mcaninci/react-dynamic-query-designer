import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import { FlexPanel } from './components/flexPanel/index';
import { Expander } from './components/expander/index';

import { Brackets } from './components/brackets.js';

import ReactDOMServer from 'react-dom/server';
import { guid, getGridCellStyle, getDropStyle, createComponentJsonData, getListStyle, getItemStyle, drawDesign, getQuickPanelStyle, designerRuleController, findParent, updateChildDepth } from './helper/componentHelper';
import { getLeftTab, stackPush, stackPop, getleftPaneContent, filter, fieldFilter, getRightPaneContent, getcodeModeContent, getUpBarContent, getquickPanel, getRightClickMenu } from './helper/designerHelper';
import { forEach } from 'min-dash';
import PropTypes, { element } from 'prop-types';
import { Card } from '@material-ui/core';
var meta = require('./helper/designerMetaData.js');


var componentIndex = 1;
var minZoom = 1, maxZoom = 5;
var currentDrophere;
var designerRuleResponse = false;
var _that;
var rightClickElement = null;
var pasteButtonRuleResponse = true;
var leftPaneContent;
var rightPaneContent;
var codeModeContent;
var UpBarContent;
var quickPanelContent;
var rightClickMenu;

var jsonChildData = [];
var mainCustomCSS = [];
const fields = [];

export class BBreDesigner extends Component {

  static propTypes = {
    queryLanguange: PropTypes.string,
    isExpression: PropTypes.bool,
    fieldQueryFormula: PropTypes.string,
    customQueryFormula: PropTypes.string,
    customOperandsItem: PropTypes.array,
    queryTextFormula: PropTypes.string,
    operatorsFunctionConvertType: PropTypes.string,
    fieldDefinitionIdList: PropTypes.array,
    showDisplayQuery: PropTypes.bool,
    workWithFieldProperty: PropTypes.bool

  };

  static defaultProps = {

    queryLanguange: 'c#',
    isExpression: false,
    fieldQueryFormula: null,
    customQueryFormula: "{customItem}",
    queryTextFormula: "{query}",
    showDisplayQuery: true,
    codeModeExpanded: false,
    leftTabOperandsFixedValue: false,
    leftTabOperandAllFunction: false,
    leftTabOperatorAllField: false,
    leftTabOperatorCustom: false,
    leftTabOperandsFunctionNumber: false,
    leftTabOperandsFunctionString: false,
    leftTabOperatorsRelational: false,
    leftTabOperatorsExpression: false,
    leftTabOperatorFieldString: false,
    leftTabOperatorFieldInt: false,
    leftTabOperatorFieldDate: false,
    leftTabOperatorFieldModel: false,
    workWithFieldProperty: false,
    fieldDefinitionIdList: []
  };

  constructor(props, context) {
    super(props, context);
    this.designerState = null;
    this.state = {

      canvasZoom: 2,
      queryText: "",
      displayQueryText: "",
      currentLeftTab: 0,
      queryLanguange: this.props.queryLanguange,
      isExpression: this.props.isExpression,
      rightClickMenuTop: 0,
      rightClickMenuLeft: 0,
      isRightClickMenuOpen: false,
      copiedElement: null,
      copyButtonDisabled: false,
      deleteButtonDisabled: false,
      pasteButtonDisabled: false,
      queryTextFormula: this.props.queryTextFormula,
      functionSearchItem: ['NumberFunctionItem', 'stringFunctionItem', 'dateFunctionItem'],
      fieldSearchItem: ['integerFieldsSearch', 'stringFieldsSearch', 'dateFieldsSearch', 'modelFieldsSearch'],
      operatorSearchItem: ['relationalOperatorsItem', 'logicalOperatorsItem', 'expressionOperatorsItem'],
      customSearchItem: ['customOperandsItem']


    };
    _that = this;
    this.state.NumberFunctionItem = meta.data.props.NumberFunctionItem;
    this.state.QuickPanel = meta.data.props.QuickPanel;
    this.state.stringFunctionItem = meta.data.props.stringFunctionItem;
    this.state.dateFunctionItem = meta.data.props.dateFunctionItem;
    this.state.relationalOperatorsItem = meta.data.props.relationalOperatorsItem;
    this.state.logicalOperatorsItem = meta.data.props.logicalOperatorsItem;
    this.state.expressionOperatorsItem = meta.data.props.expressionOperatorsItem;
    this.state.FixedValueItem = meta.data.props.FixedValueItem;
    this.state.functionConvertType = meta.data.props.functionConvertType.find(x => x.language == this.state.queryLanguange).functions;
    this.state.operatorsConvertType = meta.data.props.operatorsConvertType.find(x => x.language == this.state.queryLanguange).operators;

    this.state.operatorsFunctionConvertType = meta.data.props.operatorsFunctionConvertType.find(x => x.language == this.state.queryLanguange);
    if (!this.state.operatorsFunctionConvertType) {
      this.state.operatorsFunctionConvertType = [];
    }
    else {
      this.state.operatorsFunctionConvertType = this.state.operatorsFunctionConvertType.operators;
    }

    var externalConvertType = this.props.operatorsFunctionConvertType;
    if (externalConvertType) {
      if (typeof externalConvertType == 'string' && externalConvertType.length > 0) {
        externalConvertType = JSON.parse(externalConvertType);
      }
      externalConvertType.map((item) => {
        var operatorConvertType = this.state.operatorsFunctionConvertType.find(x => x.operatorName == item.operatorName);
        if (operatorConvertType) {
          operatorConvertType.operatorFormula = item.operatorFormula;
        }
        else {
          this.state.operatorsFunctionConvertType.push(item);
        }
      });
    }

    this.state.customOperandsItem = this.props.customOperandsItem || meta.data.props.customOperandsItem;
  }

  componentWillMount() {

    this.designerState = {
      main: [],
      jsonChildData: []
    };
    // this.getAllField();
    this.leftTab = getLeftTab(this);

    rightPaneContent = getRightPaneContent(this);

  }


  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  dropMouseOverComponent(e) {
    console.log("dropMouseOverComponent");
    console.log(e);
    currentDrophere = e;
    // e.state.color='lightpink' ;
    // e.forceUpdate();

  }

  dropMouseOutComponent(e) {
    console.log("dropMouseOutComponent");
    // console.log(e);
    e.state.color = 'transparent';
    e.forceUpdate();

  }


  onChangeComponentValue(e, item, value, draggableId, componentType) {
    var componentVal = _that.designerState[draggableId + "Value"];
    if (componentType == 'fixedValue') {

      componentVal.value = value;
    }
    else {
      var fieldItem = findParent(_that.designerState['jsonChildData'], draggableId);


      componentVal.property = value;
      if (item) {
        var itemSearchArray;
        var targetField = "";
        if ([3, 4, 5, 6, 10, 12, 13, 14].includes(Number(item.DataTypeId))) {
          targetField = "integerFields";
        }
        else if ([7].includes(Number(item.DataTypeId))) {
          targetField = "stringFields";
        }
        else if ([663, 9].includes(Number(item.DataTypeId))) {
          targetField = "dateFields";
        }
        else if ([663, 9, 7, 4, 5, 6, 10, 12, 13, 14].includes(Number(item.DataTypeId))) {
          targetField = "modelFields";
        }
        itemSearchArray = _that.fields[targetField];
        var selectedItem = itemSearchArray.find(x => x.fieldCode == item.FieldCode);
        componentVal.value = item.FieldCode;
        fieldItem.itemContent = item.FieldName;

        fieldItem.component = item.FieldName;
        fieldItem.fieldCode = item.FieldCode;
        fieldItem.fieldComponentProperty = selectedItem ? selectedItem.fieldComponentProperty : item.fieldComponentProperty;
        componentVal.property = fieldItem.fieldComponentProperty && fieldItem.fieldComponentProperty.find((x) => x.uiProperty.name == "value").uiProperty.name;
      }
    }


    drawDesign(_that.designerState['jsonChildData'], _that);

  }
  onDragUpdate = result => {
    const { source, destination, draggableId } = result;
    if (destination != null) {
      console.log(destination);
      if (designerRuleController(this, draggableId, destination)) {

        designerRuleResponse = true;
      }
      else {
        if (currentDrophere) {
          currentDrophere.state.color = 'lightpink';
          currentDrophere.forceUpdate();
          designerRuleResponse = false;
        }

        console.log("uygunsuz atama00");
      }
    }

  };

  onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (currentDrophere) {
      currentDrophere.state.color = 'transparent';
      currentDrophere.forceUpdate();

    }

    // dropped outside the list
    if (!destination) {
      return;
    }
    //mainden menülere gönderiyorsa birşey yapma
    if (source.droppableId == "main" && destination.droppableId.includes('drop')) {
      return;
    }
    //source ve destination aynıysa birşey yapma
    if (source.droppableId === destination.droppableId) {

      return;

    }
    // destination menüler ise bir işlem yapma
    if (destination.droppableId.includes('LeftTab') || destination.droppableId.includes('RightTab')) {

      return;

    }
    if (destination.droppableId == "QuickPanel") {

      return;
    }
    else {


      if (designerRuleResponse) {


        createComponentJsonData(source, destination, draggableId, this);

      }


    }


  };
  //b-slider componentti yapılmamış yapılması gerekli

  zoom(e, value) {
    var zoomVal = value;

    if (zoomVal < minZoom || zoomVal > maxZoom) {
      return;
    }
    this.setState({ canvasZoom: zoomVal });


  }


  clearDesigner() {
    this.designerState = {
      main: [],
      jsonChildData: []
    };
    this.setState({
      canvasZoom: 2,
      queryText: "",
      displayQueryText: "",
      jsonChildData: []
    });


  }
  handleChangeLeftTab(event, value) {
    this.setState({ currentLeftTab: value });
  }

  undo() {
    var popObject = stackPop('Undo');
    stackPush('Redo', popObject.popItem);
    if (popObject.currentJson) {
      drawDesign(popObject.currentJson, this);
    }


  }
  redo() {
    var popObject = stackPop('Redo');
    stackPush('Undo', popObject.popItem);
    if (popObject.currentJson) {
      drawDesign(popObject.currentJson, this);
    }
  }

  setValue(value) {
    stackPush('Undo', cloneDeep(value));
    drawDesign(value, this);
  }

  getValue() {
    var jsondata = JSON.stringify(this.state.jsonChildData);
    var query = this.props.isExpression == false ? this.state.queryTextFormula.replace('{query}', this.state.queryText) : this.state.queryText;
    return {
      jsonData: jsondata,
      queryText: query
    };
  }
  changeElementGuid(item) {

    if (!Array.isArray(item)) {

      if (item.child && item.child.length == 0) {
        item.guidId = guid();
        if (item.component == 'Brackets' || item.componentType == 'Function') {
          this.state[item.guidId + "Json"] = [];
          item.child = this.state[item.guidId + "Json"];
        }
        return item;
      }
      else {
        var j;
        var childItem;
        var childElements = [];
        for (j = 0; j < item.child.length; j++) {

          childItem = this.changeElementGuid(item.child[j]);
          if (childItem) {
            childElements.push(childItem);
          }
        }
        item.guidId = guid();
        if (item.component == 'Brackets' || item.componentType == 'Function') {
          this.state[item.guidId + "Json"] = childElements;
          item.child = this.state[item.guidId + "Json"];
        }
      }

      return item;
    }
    else {
      var i;
      var arrayResponse;
      var elements = [];
      if (Array.isArray(item)) {
        for (i = 0; i < item.length; i++) {

          arrayResponse = this.changeElementGuid(item[i]);
          if (arrayResponse) {
            elements.push(arrayResponse);
          }
        }

      }


      return elements;
    }

  }

  bracketsMouseDown(e, brackets) {
    _that.setState({ isRightClickMenuOpen: true });
    var rightclick;
    if (!e) var e = window.event;
    if (e.which) rightclick = (e.which == 3);
    else if (e.button) rightclick = (e.button == 2);


    if (rightclick && rightClickElement == null) {
      console.log(e.clientX, e.clientY);
      brackets.setState({ divColor: 'lightblue' });
      rightClickElement = brackets;
      if (brackets.state.child.length == 0) {
        var copyButtonDisabled = true;
        var deleteButtonDisabled = true;
        var pasteButtonDisabled = false;
      }
      else {
        copyButtonDisabled = false;
        deleteButtonDisabled = false;
        pasteButtonDisabled = false;
      }

      if (_that.state.copiedElement && _that.state.copiedElement != null) {
        var droppableId = rightClickElement.props.droppableId;
        var destination = { droppableId: droppableId };
        var element = cloneDeep(_that.state.copiedElement);
        if (Array.isArray(element)) {
          var copiedElement = element[0];
        }
        else {
          copiedElement = element;
        }

        if (!designerRuleController(_that, null, destination, copiedElement)) {
          pasteButtonRuleResponse = false;
          pasteButtonDisabled = true;
        }
        else {
          pasteButtonRuleResponse = true;
        }
      }
      else {
        pasteButtonDisabled = true;
      }
      _that.setState({ isRightClickMenuOpen: true, rightClickMenuTop: e.clientY, rightClickMenuLeft: e.clientX, copyButtonDisabled: copyButtonDisabled, deleteButtonDisabled: deleteButtonDisabled, pasteButtonDisabled: pasteButtonDisabled });


    }

  }


  handleClose(operationType) {
   
    if (rightClickElement) {
      var droppableId = rightClickElement.props.droppableId;

      if (operationType == 'copy') {
        if (droppableId == 'main') {
          var copiedElement = this.designerState['jsonChildData'];
          let element = cloneDeep(copiedElement);
          this.setState({ copiedElement: element }, () => { this.onPopoverClose() });
        } else {
          copiedElement = findParent(this.designerState['jsonChildData'], droppableId);
          if (copiedElement && copiedElement.child) {
            let element = cloneDeep(copiedElement.child);
            this.setState({ copiedElement: element }, () => { this.onPopoverClose() });
          }
        }


      }
      else if (operationType == 'delete') {

        if (droppableId != 'main') {
          var parent = findParent(this.state['jsonChildData'], droppableId);
          parent.child = [];
          var jsonChild = this.designerState[droppableId + 'Json'];
          jsonChild = [];
          drawDesign(this.state['jsonChildData'], this);
        }
        else {
          this.state['jsonChildData'] = [];
          drawDesign(this.state['jsonChildData'], this);
        }
        this.setState({ isRightClickMenuOpen: false }, () => { rightClickElement.setState({ divColor: 'transparent' }, () => { rightClickElement = null }) });

      }
      else if (operationType == 'paste') {
        if (this.state.copiedElement != null) {
          var copiedElementJson = cloneDeep(this.state.copiedElement);
          copiedElementJson = this.changeElementGuid(copiedElementJson);
          if (droppableId == 'main') {
            var item = this.designerState['jsonChildData'];
            let updatedcopiedElement = updateChildDepth(copiedElementJson, 1, true);
            var jsonChildData = item.concat(updatedcopiedElement);
            this.designerState['jsonChildData'] = jsonChildData;
          }
          else {
            var parentItem = findParent(this.designerState['jsonChildData'], droppableId);
            let updatedcopiedElement = updateChildDepth(copiedElementJson, parentItem.depthIndex, true);
            parentItem.child.push(updatedcopiedElement);
          }
          //bazen iç parantezde nuklamıyor bunu konterol et
          rightClickElement.state.divColor='transparent' ;
          this.setState({ isRightClickMenuOpen: false }, () => { rightClickElement && rightClickElement.setState({ divColor: 'transparent' }, () => { rightClickElement = null }) });
          
          drawDesign(this.designerState['jsonChildData'], this);
        }
        rightClickElement.state.divColor='transparent' ;
        this.setState({ isRightClickMenuOpen: false }, () => { rightClickElement && rightClickElement.setState({ divColor: 'transparent' }, () => { rightClickElement = null }) });
        rightClickElement = null 
      }


    }

  }
  expenderOnchange(stateName) {

    this.setState({ [stateName]: !this.state[stateName] }, () => {
      this.leftTab = getLeftTab(this);
      this.forceUpdate();
    });

  }

  onPopoverClose() {
    this.setState({ isRightClickMenuOpen: false }, () => {
      if (rightClickElement)
        rightClickElement.setState({ divColor: 'transparent' }, () => { rightClickElement = null })

    });

  }
  render() {
    leftPaneContent = getleftPaneContent(this, this.leftTab);
    codeModeContent = getcodeModeContent(this);
    UpBarContent = getUpBarContent(this);
    quickPanelContent = getquickPanel(this);
    rightClickMenu = getRightClickMenu(this, pasteButtonRuleResponse);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}>
        <div className="main" style={{ height: '700px', display: 'flex' }}>
          <div id="leftPanel" style={{ height: '700px', maxWidth: '350px', minWidth: '350px', display: 'flex', flex: 9 }} >
            {leftPaneContent}
          </div>
          <div id="canvas" style={{ height: '100%', minWidth: '810px',height:'700px',width: "100%", display: 'flex', flex: '9 1 auto', flexDirection: 'row' }}
            onContextMenu={(e) => { e.preventDefault(); }}>
            <FlexPanel style={{ height: '100%', width: "100%" }} direction="vertical" context={this.props.context} responsive={false}  >
              {UpBarContent}
              <FlexPanel direction="horizontal" style={{ height: '100%', width: "100%" }} context={this.props.context} responsive={false}  >

                <Card context={this.props.context} column={0} style={{ height: '109%', minHeight: '500px', minWidth: '750px', width: "100%", marginLeft: "5px", paddingTop: '0px', paddingBottom: '0px', textAlign: 'center', float: 'left' }}>

                  <FlexPanel direction="vertical" style={{ minHeight: '350px', overflowX: 'scroll', overflowY: 'scroll' }} context={this.props.context} responsive={false}  >
                    <div style={{
                      minHeight: '70px', width: '100%', transform: 'scale(' + this.state.canvasZoom + ')'
                      , marginTop: (10 * this.state.canvasZoom * this.state.canvasZoom) + 'px', marginLeft: (165 * this.state.canvasZoom * this.state.canvasZoom) + 'px'
                    }}>
                      {rightClickMenu}
                      <Brackets bracketsMouseDown={this.bracketsMouseDown.bind(this)} isExpression={this.state.isExpression} dropMouseOutComponent={this.dropMouseOutComponent} dropMouseOverComponent={this.dropMouseOverComponent} depth={1} context={this.props.context} droppableId={'main'} child={this.designerState['main']} customStyle={this.mainCustomCSS} />
                    </div>
                  </FlexPanel>

                  <FlexPanel direction="vertical" style={{  width: "100%" }} context={this.props.context} responsive={false}  >

                    <div style={{
                      float: 'left', marginRight: '5px',
                    
                      width: '100%',
                      paddingRight: '60px',

                    }}>

                      {codeModeContent}

                    </div>
                  </FlexPanel>
                </Card>


                <div id='quickPanel' style={{
                  float: 'left',
                  width: '54px',
                  background: '#f0f0f0'
                  , height: '100%',
                  minHeight: '633px',
                  minWidth:'55px'
                }}>
                  {quickPanelContent}
                </div>

              </FlexPanel>

            </FlexPanel>
          </div>


        </div>

      </DragDropContext>

    );

  }


}
export default BBreDesigner;
