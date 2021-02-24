import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Draggable } from 'react-beautiful-dnd';
import { Brackets } from './brackets'
import cloneDeep from 'lodash/cloneDeep';



import { Input } from '@material-ui/core';
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
let inputValue;
export class FixedValue extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      fixedname: 'flex',
      fixedInput: 'none',
      fixedText: this.props.fixedValue || "",
      autofocus:false
    };
 
  }

  componentDidMount() {

  }
//TODoMCI onchange methodu lazım oluyor tekrardan değiştirmek için 
  fixedValueNameClick() {

    this.setState({ fixedname: 'none', fixedInput: 'flex' ,autofocus:true}, () => {
     
      if (this.props.componentType != 'Date')
      this[this.props.draggableId].focus();
    });


  }

  fixedValueInputBlur(e) {
  
      var inputText = e.target.value;

    this.setState({ fixedname: 'flex', fixedInput: 'none', fixedText: inputText });
    if (this.props.onChangeComponentValue) {
      this.props.onChangeComponentValue(e,null, inputText, this.props.draggableId,'fixedValue');
    }

  }

  onChangeInput(e, value) {

    if (this.props.componentType == 'Date') {
      var valueStr = value.toDateString();
      this.setState({  fixedText: valueStr });
    }
    else {
      valueStr = value;
      this.setState({ fixedText: valueStr });
    }

  }

  render() {
    var Depth = this.props.depth;
    var dropFontSize = 22 / (Depth - 1) + 'px';
    var displayText = this.state.fixedText || "";
    var fiedInput;
    if (this.props.componentType == 'Integer') {
      fiedInput = (<div style={{ float: 'left', display: 'flex' }}>
        <Input
          floatingLabelText={this.props.itemContent}
          ref={(r) => this[this.props.draggableId] = r}
          context={this.props.context}
          value={this.state.fixedText||null}
          hintText={this.props.itemContent}
          disabled={this.state.Flag}
          maxLength={10}
          onBlur={this.fixedValueInputBlur.bind(this)}
          minValue={0}
          type="number"
          onChange={this.onChangeInput.bind(this)}
      
         
        /></div>);


    }

    else if (this.props.componentType == 'Date') {
      fiedInput = (<div style={{ marginBottom: '10px', width: '256px' }}>
        <Input context={this.props.context}
          ref={(r) => this[this.props.draggableId] = r}
          disabled={this.disabled}
          floatingLabelTextDate='İşlem Tarihi'
          floatingLabelTextTime='İşlem Zamanı'
          style={{ marginRight: '10px' }}
          format='DD/MM/YYYY'
          isAMPMLeadingSpace={true}
          isAMPMCapitilized={true}
          hourFormatId='12'
          seperatorId='.'
          timeFormatId='hhmmss'
          onChange={this.onChangeInput.bind(this)}
          onBlur={this.fixedValueInputBlur.bind(this)}
          type="date"
        />
      </div>);
    }
    else {
      fiedInput = (<div style={{ float: 'left', display: 'flex' }}>
        <Input
          context={this.props.context}
          value={this.state.fixedText||null}
          floatingLabelText={this.props.itemContent}
          ref={(r) => this[this.props.draggableId] = r}
          minValue={1}
          autoFocus={this.state.autofocus}
        onBlur={this.fixedValueInputBlur.bind(this)}
          hintText={this.props.itemContent}
          onChange={this.onChangeInput.bind(this)}
          />
      </div>);
    }

    return (
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
              <div ref={(r) => { this.fixedName = r; }} style={{ fontSize: dropFontSize, display: this.state.fixedname }} onClick={this.fixedValueNameClick.bind(this)}>
                {displayText.length == 0 ? this.props.itemContent : displayText}
              </div>
              <div ref={(r) => { this.fixedInput = r; }} style={{ fontSize: dropFontSize, display: this.state.fixedInput }} >
                {fiedInput}
              </div>
            </div>
          </div>
        )}
      </Draggable>

    );
  }
}
export default FixedValue;
