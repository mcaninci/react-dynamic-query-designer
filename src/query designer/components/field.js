import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Brackets } from './brackets'
import cloneDeep from 'lodash/cloneDeep';
import { Popover,Button } from '@material-ui/core';

import { guid, getGridCellStyle, getDropStyle } from '../helper/componentHelper'




const getItemStyle = (isDragging, draggableStyle, Depth) => ({
  userSelect: 'none',
  padding: 8 / Depth + "px",
  margin: `0 0 ${4}px 0`,
  background: isDragging ? 'lightgreen' : '',
  color: 'gray',
  marginTop: 'auto',
  marginBottom: 'auto',
  ...draggableStyle

});
var fieldPropertyComp;
var flag = false;
// @BComponentComposer
export class Field extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      fieldname: 'flex',
      fieldPick: 'none',
      fieldText: "",
      propertyText:this.props.itemProperty,
      parentCode: this.props.parentCode,
      rightClickMenuTop: 0,
      rightClickMenuLeft: 0,
      isRightClickMenuOpen: false,
    };
  }

  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log(nextProps);

    this.setState({ parentCode: nextProps.parentCode });
    this.forceUpdate();
  }

  fieldValueNameClick() {

    this.setState({ fieldname: 'none', fieldPick: 'flex' });


  }


  getFieldProperty(fieldPropertyList) {
if(fieldPropertyList){
    var properties = fieldPropertyList.map((item) => {
      return (<div>  <Button  ref={r => this.onHandleClose = r} context={this.props.context} type="flat"
        text={item.name}
        onClick={this.onHandleClose.bind(this, item)} />  <br /></div>);
    });
  }
    var rightClickProp = (<Popover
      ref={r => this.popoverField = r}
      context={this.props.context}
      anchorEl={this.fieldPopDiv}
      anchorReference={"anchorEl"}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onRequestClose={this.onPopoverClose.bind(this)}
      open={this.state.isRightClickMenuOpen}
    >
      <div>
        {properties}
      </div>
    </Popover>);

    return rightClickProp;
  }

  onPopoverOpen() {
    if (flag == false)
      this.setState({ isRightClickMenuOpen: true });

  }

  onPopoverClose() {
    flag = true;
    this.setState({ isRightClickMenuOpen: false }, () => {
    });

  }


  onHandleClose(item) {
    flag = true;
    this.setState({ isRightClickMenuOpen: false, propertyText: item.name }, () => {
      this.props.onChangeComponentValue(this, null, item.name, this.props.draggableId,'field');
    });

  }

  onParameterSelect(parameter) {
    if (parameter != null) {
      this.setState({ field:parameter.selectedItems[0], fieldText: parameter.selectedItems[0].FieldName, fieldname: 'flex', fieldPick: 'none' }, () => {
        this.props.onChangeComponentValue(this, parameter.selectedItems[0], null, this.props.draggableId,'field');
      });

    }


  }

  render() {
    var Depth = this.props.depth;
    var dropFontSize = 22 / (Depth - 1) + 'px';
    flag = false;
    var fieldPick;
       //picklist viewi değğiştirlmeli fieldComponentProperty olan sorgu kullanılmalı
    // if (this.props.valueType == 'Integer') {
    //   fieldPick = (<div style={{ float: 'left', display: 'flex' }}>
    //     <BPicklistComponent
    //       context={this.props.context}
    //       ref={(r) => this[this.props.draggableId] = r}
    //       code={"FieldDefinitionList"}
    //       multiSelect={false}
    //       labelText={this.state.fieldText}
    //       hintText={this.state.fieldText}
    //       filter={{ DataTypeId: [3, 4, 5, 6, 10, 12, 13, 14] } }
    //       selectedItemIds={[this.state.id]}
    //       onParameterSelect={this.onParameterSelect.bind(this)}
    //     /></div>);


    // }
    // else if (this.props.valueType == 'String') {
    //   fieldPick = (<div style={{ float: 'left', display: 'flex' }}>
    //     <BPicklistComponent
    //       context={this.props.context}
    //       ref={(r) => this[this.props.draggableId] = r}
    //       code={"FieldDefinitionList"}
    //       multiSelect={false}
    //       labelText={this.state.fieldText}
    //       hintText={this.state.fieldText}
    //       filter={{ DataTypeId: [7] }}
    //       selectedItemIds={[this.state.id]}
    //       onParameterSelect={this.onParameterSelect.bind(this)}
    //     /></div>);
    // }
    // else if (this.props.valueType == 'Date') {
    //   fieldPick = (<div style={{ float: 'left', display: 'flex' }}>
    //     <BPicklistComponent
    //       context={this.props.context}
    //       ref={(r) => this[this.props.draggableId] = r}
    //       code={"FieldDefinitionList"}
    //       multiSelect={false}
    //       labelText={this.state.fieldText}
    //       hintText={this.state.fieldText}
    //       filter={{ DataTypeId: [663, 9] }}
    //       selectedItemIds={[this.state.id]}
    //       onParameterSelect={this.onParameterSelect.bind(this)}
    //     /></div>);
    // }
    // else if (this.props.valueType == 'LIST_FIELD_ATTRIBUTE') {
    //   fieldPick = (
    //     <div style={{ float: 'left', display: 'flex' }}>
    //       <BPicklistComponent
    //         context={this.props.context}
    //         ref={(r) => this[this.props.draggableId] = r}
    //         code={"ListFieldAttribute"}
    //         multiSelect={false}
    //         labelText={this.state.fieldText}
    //         hintText={this.state.fieldText}
    //         filter={{ ParentCode: [this.state.parentCode ? this.state.parentCode.value : false] }}
    //         selectedItemIds={[this.state.id]}
    //         onParameterSelect={this.onParameterSelect.bind(this)}
    //       /></div>
    //   );
    // }
    // else if (this.props.valueType == "Model") {
    //   fieldPick = (<div style={{ float: 'left', display: 'flex' }}>
    //     <BPicklistComponent
    //       context={this.props.context}
    //       ref={(r) => this[this.props.draggableId] = r}
    //       code={"FieldDefinitionList"}
    //       multiSelect={false}
    //       labelText={this.state.fieldText}
    //       hintText={this.state.fieldText}
    //       filter={{ '=!': { DataTypeId: [663, 9, 7, 4, 5, 6, 10, 12, 13, 14] } }}
    //       selectedItemIds={[this.state.id]}
    //       onParameterSelect={this.onParameterSelect.bind(this)}
    //     /></div>);


    // }


    fieldPropertyComp = this.getFieldProperty(this.props.fieldComponentProperty);
    return (
      <div>
        <Draggable
          key={this.props.draggableId}
          draggableId={this.props.itemContent + this.props.draggableId}
          index={this.props.draggableId}>
          {(provided, snapshot) => (
            <div style={{ float: 'left', display: 'flex' }}>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style,
                  Depth
                )}>
                <div ref={(r) => { this.fieldName = r; }} style={{ fontSize: dropFontSize, display: this.state.fieldname }} onClick={this.fieldValueNameClick.bind(this)}>
                  {this.state.fieldText.length == 0 ? this.props.itemContent : this.state.fieldText}
                </div>
                <div ref={(r) => { this.fieldPick = r; }} style={{ fontSize: dropFontSize, display: this.state.fieldPick }} >
                  {fieldPick}
                </div>
                {this.props.workWithFieldProperty ? <div style={{ fontSize: dropFontSize,display: 'flex' }} ref={(r) => { this.fieldPopDiv = r; }} onClick={this.onPopoverOpen.bind(this)}>
                {this.state.propertyText}
                {fieldPropertyComp}
                </div> : ""}
              </div>
            </div>
          )}
        </Draggable>

      </div>
    );
  }
}
export default Field;
