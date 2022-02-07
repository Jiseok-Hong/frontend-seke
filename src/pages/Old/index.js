import React, { useEffect, useState } from 'react';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import NavList from 'components/NavList';
import orderLists from 'services/api/OldApi';

function Old() {
    const [orderList, setOrderList] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const createData = (id, c_one, c_two, c_three, c_four) => {
        return { id, c_one, c_two, c_three, c_four };
    };
    const convertStatus = (value) => {
        switch (value) {
            case 1:
                return 'Preparing';
            case 2:
                return 'Sending';
            case 3:
                return 'Available';
            default:
                return 'N/A';
        }
    };

    const fetchOrderList = () => {
        let orderList = orderLists;
        const rows = [];
        try {
            orderList.forEach((element) => {
                const temp = createData(
                    element.id,
                    element.phon_num,
                    element.address.detail,
                    convertStatus(element.status),
                    element.receiver.name.firstname + ' ' + element.receiver.name.lastname
                );
                rows.push(temp);
            });
            setOrderList(rows);
        } catch {
            setError('Cannot find information');
        } finally {
            setLoading(false);
            setOrderList(rows);
        }
    };
    useEffect(() => {
        async function getData() {
            fetchOrderList();
        }
        getData();
    }, []);

    return <NavList />;
}

export default withConnect()(withRouter(Old));
