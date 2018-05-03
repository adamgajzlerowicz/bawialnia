import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators(CounterActions, dispatch);
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
