import React, { Component } from 'react';

import { FlexPanel } from './flexPanel/index';

import Bracket from './utilities/bracketSVG'



import { DropHere } from './dropHere';



// @BComponentComposer
export class Brackets extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {

      child: this.props.child,
      visibility: 'hidden',
      divColor: 'transparent'
    };
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log(nextProps);

    this.setState({ child: nextProps.child });
     //this.forceUpdate();
  }

  onbracketsMouseDown = (e) => {
    e.preventDefault();


    if (this.props.bracketsMouseDown) {
      this.props.bracketsMouseDown(e, this);
    }
    console.log(e.clientX, e.clientY);
  }

  render() {
    var Depth = this.props.depth;
    var isExpression = this.props.isExpression || false;
    var heightBracket = 102 / Depth + 'px';
    var widthBracket = 45 / Depth + 'px';
    var droppableAreaHeight = (102 / Depth) - (20 / Depth) + 'px';
    var droppableAreaMargin = 10 / Depth + 'px';
    var dropFontSize = 22 / Depth + 'px';
    var flexPanelMargin = Depth < 4 ? Depth : 3;
    var defaultStyleBracketsDiv = {
      marginTop: droppableAreaMargin,
      marginRight: '-' + droppableAreaMargin,
      marginLeft: '-' + droppableAreaMargin,
      //padding: droppableAreaMargin,
      borderBottom: '1px',
      borderTop: '1px',
      borderRight: isExpression ? '1px' : '0px',
      borderLeft: isExpression ? '1px' : '0px',
      borderRightStyle: isExpression ? 'dashed ' : 'none',
      borderLeftStyle: isExpression ? 'dashed ' : 'none',
      borderBottomStyle: 'dashed ',
      borderTopStyle: 'dashed ',
      borderColor: '#BDBDBD',
      opacity: 1,
      // minHeight: '50px',
      height: droppableAreaHeight,
      display: 'flex',
      backgroundColor: this.state.divColor,
      zIndex: '15000'

    };
    var customStyle = this.props.customStyle ? this.props.customStyle[0] : {};
    var styleBracketsDiv = Object.assign({}, customStyle, defaultStyleBracketsDiv);
    var withIsStaticDrop = this.state.child ? this.state.child.length > 0 ? false : true : true;
    return (
      <FlexPanel direction="horizontal" context={this.props.context} responsive={false} style={{
        marginTop: '-' + flexPanelMargin + 'px'
      }}  >

        <div style={{ display: isExpression ? 'none' : 'flex', height: heightBracket, width: widthBracket }}>
        <Bracket style={{ height: heightBracket, width: widthBracket  }}>
        
        </Bracket>
 
        </div>

        <div style={styleBracketsDiv} onContextMenu={this.onbracketsMouseDown}>

          < div
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              opacity: 1,
              maxHeight: '50px',
              Height: '50px',
              display: 'flex'
            }}>

            {this.state.child}


          </div>

          <DropHere depth={Depth} droppableId={this.props.droppableId} withIsStatic={withIsStaticDrop} onMouseOut={this.props.dropMouseOutComponent} onMouseOver={this.props.dropMouseOverComponent} />


        </div>


        <div style={{ display: isExpression ? 'none' : 'flex', height: heightBracket, width: widthBracket }}>  
        <Bracket style={{ height: heightBracket, width: widthBracket, transform: 'rotate(-180deg)' }}>
        
        </Bracket>
        

         
        </div>
      </FlexPanel >
    );
  }
}
export default Brackets;
