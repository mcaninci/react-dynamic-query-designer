import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Droppable } from 'react-beautiful-dnd';


// @BComponentComposer
export class DropHere extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      Depth: this.props.depth,
      visibility: 'hidden',
      divWidth: '10px'
    };
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log(nextProps);

    this.setState({ Depth: nextProps.depth });
    // this.forceUpdate();
  }

  dropMouseOver(e) {
    console.log("visibility");
    this.setState({ visibility: 'visible', divWidth: '100px' });
    if (this.props.onMouseOver) { this.props.onMouseOver(this); }
  }

  dropMouseOut(e) {
    console.log("dropMouseOut");
    this.setState({ visibility: 'hidden', divWidth: '10px' });
    if (this.props.onMouseOut) {
      this.props.onMouseOut(this);

    }
  }

  render() {
    var dropFontSize = 22 / this.state.Depth + 'px';
    var droppableAreaMargin = 10 / this.state.Depth + 'px';
    var marginX = 15 / this.state.Depth + 'px';
    var marginY = 15 / this.state.Depth + 'px';
    var drophereText = this.props.dropHereText || "Drop Here";
    var withIsStatic = this.props.withIsStatic;
    var divWidth = withIsStatic ? 100 / this.state.Depth + 'px' : this.state.divWidth;
    if (withIsStatic) {
      var visibility = 'visible';
    }
    else {
      visibility = this.state.visibility;

    }
    return (
      <div onMouseOut={this.dropMouseOut.bind(this)} onMouseOver={this.dropMouseOver.bind(this)}
       style={{  marginTop: 'auto', marginBottom: 'auto',
       marginLeft: marginX, marginRight: marginX, height: 'auto',
       width: 'auto', backgroundColor: visibility == 'hidden' ? 'transparent' : this.state.color }}>
        <Droppable droppableId={this.props.droppableId} >
          {(provided, snapshot) => (


            < div
              {...provided.draggableProps}
              {...provided.dragHandleProps}

              ref={provided.innerRef}
              style={{
                marginTop: 'auto', marginBottom: 'auto',
                opacity: 1,
                maxHeight: '50px',
                Height: '50px',
                display: 'flex',
                width: 'auto'
              }}

            >

              <div style={{
                Height: '50px',
                display: 'flex',
                maxWidth: '100px',
                width: 'auto',
                margin: 'auto', marginTop: 'auto', marginBottom: 'auto',

              }}>
                <div style={{    margin: 'auto',float: 'left', fontSize: dropFontSize, visibility: visibility, width: 'auto'}}> {drophereText}</div>
              </div>
              {provided.placeholder}

            </div>

          )}
        </Droppable>  </div>


    )

  }
}
export default DropHere;
