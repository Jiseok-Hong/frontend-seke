import React, { useEffect } from 'react';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import NewApi from 'services/api/NewApi';
import NavList from 'components/NavList';
import SearchResult from 'components/SearchResult';

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

    const result = [
        {
            title: 'Wikipedia is test',
            text: "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
        },
        {
            title: 'Wikipedia is test2',
            text: "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
        },
        {
            title: 'Wikipedia is test3',
            text: "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
        },
        {
            title: 'Wikipedia is test4',
            text: "The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
        },
    ];

    return (
        <NavList>
            <SearchResult result={result} />
        </NavList>
    );
}

export default withConnect()(withRouter(New));
