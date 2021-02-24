import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Brackets } from './brackets'
import cloneDeep from 'lodash/cloneDeep';
import { guid, getGridCellStyle, getDropStyle } from '../helper/componentHelper'
const getItemStyle = (isDragging, draggableStyle,Depth) => ({
  userSelect: 'none',
  padding: 8/Depth+"px",
  margin: `0 0 ${4}px 0`,
  background: isDragging ? 'lightgreen' : '',
  color: 'gray',
  marginTop: 'auto',
  marginBottom: 'auto',
  ...draggableStyle

});

//@BComponentComposer
export class Operator extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {


    };
  }

  componentDidMount() {

  }

  render() {
    var Depth = this.props.depth;
    var dropFontSize = 22 / (Depth-1) + 'px';
    return (

            <div

              style={getItemStyle(
              '','',
                Depth
              )}>
              <div style={{ fontSize: dropFontSize }}>
                {this.props.component}
              </div>
              </div>
    );

  }
}
export default Operator;
