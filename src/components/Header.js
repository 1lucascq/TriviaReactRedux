import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import defaultGravatar from '../assets/gravatar-default.jpg';
import { resetState } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkPathname(history) {
    if (history) {
      const {
        location: { pathname },
      } = history;
      if (pathname === '/feedback') return true;
    }
    return false;
  }

  handleLogout() {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { name, score, gravatarImage, history } = this.props;
    return (
      <header
        className="bg-fundo
        text-white container-fluid d-flex justify-content-between align-items-center py-3"
      >
        <div className="name-in-header d-flex flex-direction-row align-items-center">
          <img
            className="gravatar-logo rounded-circle me-2"
            data-testid="header-profile-picture"
            src={ gravatarImage || defaultGravatar }
            alt="Player Gravatar"
          />
          <h4 className="navbar-text " data-testid="header-player-name">
            {name}
          </h4>
        </div>

        {this.checkPathname(history) ? (
          ''
        ) : (
          <h2 className="text-center">
            {' '}
            {`Score: ${score}`}
            {' '}
          </h2>
        )}

        <Link
          className="exit-in-header navbar-brand text-warning h1"
          onClick={ this.handleLogout }
          to={ { pathname: '/' } }
        >
          Sair
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  gravatarImage: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};

Header.defaultProps = {
  history: undefined,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  score: state.gameData.player.score,
  gravatarImage: state.login.gravatarImage,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
