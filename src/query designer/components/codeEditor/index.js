import React from "react";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import PropTypes from "prop-types";
import {UnControlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');


var optionsCodeMirror;


export class CodeEditor extends React.Component {
  static propTypes = {
 
    mode: PropTypes.string,
    value: PropTypes.string,
   
  };

  static defaultProps = {
  
    mode: "javascript",
    value: "",
   
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.value || "",
    
    };
  }
  componentWillMount() { }

  componentDidMount() {


    if (this.props.mode) {
      if (this.props.mode == "c#") {
        optionsCodeMirror = "text/x-csharp";
      } else if (this.props.mode == "js") {
        optionsCodeMirror = "javascript";
      } else if (this.props.mode == "C") {
        optionsCodeMirror = "text/x-csrc";
      } else if (this.props.mode == "c++") {
        optionsCodeMirror = "text/x-c++src";
      } else if (this.props.mode == "java") {
        optionsCodeMirror = "text/x-java";
      } else if (this.props.mode == "sql") {
        optionsCodeMirror= "text/x-sql";
      } else if (this.props.mode == "mysql") {
        optionsCodeMirror= "text/x-mysql";
      } else if (this.props.mode == "plsql") {
        optionsCodeMirror.mode = "text/x-plsql";
      } else if (this.props.mode == "mssql") {
        optionsCodeMirror = "text/x-mssql";
      } else {
        optionsCodeMirror= this.props.mode;
      }
    }

   
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.value != nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  
  }


  


  setValue(value) {
    this.setState({
      value: value
    });
  }

  getValue() {
   return this.state.value;
  }

  render() {
    
    return (
<div id="codemode" style={{
width:'%100'
  }}>

<CodeMirror
value={this.state.value}
options={{
  mode: {optionsCodeMirror},
  theme: 'material',
  lineNumbers: true,
  readOnly:true
}}
style={{width:'1200px'}}

/>
</div>
    );
  }
}

export default CodeEditor;