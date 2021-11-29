import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetState } from '../redux/actions';

class RedirectButton extends Component {
  constructor() {
    super();
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
  }

  goToNextQuestion(history) {
    const { url, reset } = this.props;
    if (url === '/') {
      reset();
    }
    history.push(url);
  }

  render() {
    const { history, name, testId } = this.props;
    return (
      <button
        type="button"
        data-testid={ testId }
        onClick={ () => this.goToNextQuestion(history) }
      >
        {name}
      </button>
    );
  }
}

RedirectButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  reset: (state) => dispatch(resetState(state)),
});

export default connect(null, mapDispatchToProps)(RedirectButton);
