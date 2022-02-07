import React, { useEffect } from 'react';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import NewApi from 'services/api/NewApi';
import NavList from 'components/NavList';

function New(props) {
    const fetchProductList = async () => {
        const health = await NewApi.checkHealth();
    };
    useEffect(() => {
        async function getData() {
            fetchProductList();
        }
        getData();
    }, []);

    return <NavList />;
}

export default withConnect()(withRouter(New));
