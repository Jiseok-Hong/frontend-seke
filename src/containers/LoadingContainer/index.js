import React, { PureComponent } from 'react';
import withConnect from 'utils/withConnect';
import TopLoadingBar from 'components/TopLoadingBar';


class LoadingContainer extends PureComponent {
    render() {
        const { topLoadingBar } = this.props;
        return (
            <React.Fragment>
                <TopLoadingBar {...topLoadingBar} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ...state.global,
});

export default withConnect(mapStateToProps)(LoadingContainer);
