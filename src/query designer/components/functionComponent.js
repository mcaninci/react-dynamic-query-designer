import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Brackets } from './brackets'
import cloneDeep from 'lodash/cloneDeep';
import { guid, getGridCellStyle, getDropStyle } from '../helper/componentHelper'
import { DropHere } from './dropHere';
import { forEach } from 'min-dash';


const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 4 * 2,
  margin: `0 0 ${4}px 0`,
  background: isDragging ? 'lightgreen' : '',
  color: 'gray',
  ...draggableStyle

});

//@BComponentComposer
export class FunctionComponent extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {

      child: this.props.child
    };
  }

  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log(nextProps);

    this.setState({ child: nextProps.child });
    this.forceUpdate();
  }
  render() {
    var Depth = this.props.depth;
    var dropFontSize = 22 / (Depth - 1) + 'px';
    var droppableAreaMargin = 10 / Depth + 'px';
    var paramCount = this.props.parameter ? this.props.parameter.length : 1;
    var childSize = this.state.child ? this.state.child.length ? this.state.child.filter(x => x != null).length : 0 : 0;
    var dropCount = paramCount <= 0 ? 1 : paramCount - childSize;
    var drophereCompText = [];
    var childComp = [];

    for (var i = 0; i < dropCount; i++) {

      var droptxt = this.props.parameter[i + childSize];


      drophereCompText.push(droptxt);
      drophereCompText.push(",");
    }
    drophereCompText.pop();
    drophereCompText=paramCount<= 0 ?null:drophereCompText;
    if (this.state.child) {
      this.state.child.forEach((item, index) => {

        childComp.push(item);
        if (paramCount != childSize || index != childSize - 1)
          childComp.push(",");
      });

    }
    var drophereComp = dropCount != 0 ? (<div style={{ display: 'flex' }}> <DropHere dropHereText={drophereCompText} depth={Depth} droppableId={this.props.droppableId} withIsStatic={true} onMouseOut={this.props.dropMouseOutComponent} onMouseOver={this.props.dropMouseOverComponent} /></div>) : (<div> </div>);


    return (
      <div style={{ float: 'left', fontSize: dropFontSize, display: 'flex', marginTop: 'auto', marginBottom: 'auto', maxHeight: '50px' }}>
        <div style={{ float: 'left', fontSize: dropFontSize, display: 'flex', maxHeight: '50px', marginTop: 'auto', marginBottom: 'auto' }}>{this.props.component + "("} </div>

        <div style={{ padding: droppableAreaMargin, maxHeight: '50px', display: 'flex', marginTop: 'auto', marginBottom: 'auto' }}>

          <div

            style={{ float: 'left', display: 'flex', maxHeight: '50px' }}>
            {childComp}
            {drophereComp}


          </div>

        </div>

        <div style={{ float: 'left', fontSize: dropFontSize, display: 'flex', maxHeight: '50px', marginTop: 'auto', marginBottom: 'auto' }} > {")"}</div>
      </div>


    );
  }
}
export default FunctionComponent;
