import React, { useEffect, useState } from 'react';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import NavList from 'components/NavList';

const CategoryFeedback = () => {
    return <NavList />;
};

export default withConnect()(withRouter(CategoryFeedback));
