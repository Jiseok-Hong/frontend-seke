import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withConnect from 'utils/withConnect';
import LoadingBar from 'react-top-loading-bar';

class TopLoadingBar extends PureComponent {
    render() {
        const { showBar, progress, height, color } = this.props;
        if (!showBar) return null;
        return (
            <LoadingBar
                progress={progress}
                height={height}
                color={color}
            />
        );
    }
}

TopLoadingBar.defaultProps = {
    showBar: false,
    progress: 10,
    height: 5,
    color: "rgba(255, 152, 0, 1)",
};

TopLoadingBar.propTypes = {
    showBar: PropTypes.bool,
    progress: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
};

const mapStateToProps = state => ({
    ...state.global.topLoadingBar,
});

export default withConnect(mapStateToProps)(TopLoadingBar);
