import React, { useEffect, useState } from 'react';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import NewApi from 'services/api/NewApi';
import NavList from 'components/NavList';
import SearchResult from 'components/SearchResult';

const New = ({ searchVal }) => {
    const [results, setResults] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const fetchResultList = async () => {
        try {
            setLoading(true);
            const result = await NewApi.searchNew(searchVal, page);
            setResults(result);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (searchVal !== null) fetchResultList();
    }, [searchVal]);

    return (
        <NavList>
            <SearchResult
                result={results}
                loading={loading}
                page={page}
                setPage={setPage}
                fetchResultList={fetchResultList}
            />
        </NavList>
    );
};

const mapStateToProps = ({ search }) => {
    return { searchVal: search.searchValue };
};

export default withConnect(mapStateToProps)(withRouter(New));
