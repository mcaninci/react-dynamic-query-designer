import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';



import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
var styles = theme => ({
  expandIconRL: {
    left: theme.spacing.unit,
    right: 'auto',
  },
  contentRL: {
    margin: '12px 0',
    '& > :last-child': {
      paddingRight: 0,
    },
  }
});


export class Expander extends React.Component {
  static propTypes = {


    children: PropTypes.node,		      // The content of the expansion panel.
    classes: PropTypes.object,		    // Useful to extend the style applied to components.
    CollapseProps: PropTypes.object,	//	Properties applied to the Collapse element.
    defaultExpanded: PropTypes.bool, //	false	If true, expands the panel by default.
    isExpanded: PropTypes.bool,         //	If true, expands the panel, otherwise collapse it. Setting this prop enables control over the panel.
    onChange: PropTypes.func,         //	Callback fired when the expand/collapse state is changed.
    justButtonCanExpand:PropTypes.bool,
    overridesClasses:PropTypes.object,
    header: PropTypes.any
  };
  static defaultProps = {
    children: <div />,
    isExpanded: false,
    justButtonCanExpand: false
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isExpanded: this.props.isExpanded,
      disabled: props.disabled || this.props.disabled,
      children:props.children 
    };

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isExpanded != nextProps.isExpanded || nextProps.disabled !== this.props.disabled || nextProps.children !== this.props.children)
      this.setState({ isExpanded: nextProps.isExpanded, disabled: nextProps.disabled ,children: nextProps.children});
  }



  render() {
    var theme = createMuiTheme({
      overrides: {
        MuiPaper: (this.props.overridesClasses && this.props.overridesClasses.MuiPaper) ? this.props.overridesClasses.MuiPaper : {},
        MuiExpansionPanelSummary: (this.props.overridesClasses && this.props.overridesClasses.MuiExpansionPanelSummary) ? this.props.overridesClasses.MuiExpansionPanelSummary : {},
        MuiExpansionPanelDetails:(this.props.overridesClasses && this.props.overridesClasses.MuiExpansionPanelDetails) ? this.props.overridesClasses.MuiExpansionPanelDetails : {},
        MuiIconButton: (this.props.overridesClasses && this.props.overridesClasses.MuiIconButton) ? this.props.overridesClasses.MuiIconButton : {},
        MuiSvgIcon: (this.props.overridesClasses && this.props.overridesClasses.MuiSvgIcon) ? this.props.overridesClasses.MuiSvgIcon : {},
      },
      typography: { useNextVariants: true },
    });

    var expansionPanel=(
      <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography >{this.props.header}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        {this.state.children}
        </Typography>
      </AccordionDetails>
    </Accordion>);

       var expender = (<MuiThemeProvider theme={theme} children={expansionPanel}>
      </MuiThemeProvider>);

      return (
    
        { ...expender }
        
  
      );
  }
}
export default Expander;
