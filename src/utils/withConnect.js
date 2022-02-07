import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({ dispatch });

const withConnect = (
    mapStateToProps = () => {
        return {};
    }
) => connect(mapStateToProps, mapDispatchToProps);

export default withConnect;
