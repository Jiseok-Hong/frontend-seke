import React, { useEffect, useState } from 'react';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import NewApi from 'services/api/NewApi';
import NavList from 'components/NavList';
import SearchResult from 'components/SearchResult';
import { stemmer } from 'stemmer';
import stopwords from 'services/stopWords';

const New = ({ searchVal, lib }) => {
    const [results, setResults] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const collection = new Map();
    let result;
    const stopWordRemoval = (str) => {
        const res = [];
        const words = str.split(' ');
        for (let i = 0; i < words.length; i++) {
            const wordClean = words[i].split('.').join('');
            if (!stopwords.includes(wordClean)) {
                res.push(wordClean);
            }
        }
        return res.join(' ');
    };
    const fetchResultList = async () => {
        try {
            console.log(lib[0].times);
            setLoading(true);
            result = await NewApi.searchNew(searchVal, page);

            setResults(result);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
            const mappedCategorize = result?.data?.hits?.forEach((element) => {
                element._source.category.forEach((cate) => {
                    const categorytoWord = stopWordRemoval(cate).split(/[.\-=/_\s]/);
                    categorytoWord.forEach((e) => {
                        const valueLower = stemmer(e).toLowerCase();
                        if (collection.get(valueLower) !== undefined) {
                            const count = collection.get(valueLower) + 1;
                            collection.set(valueLower, count);
                        } else {
                            collection.set(valueLower, 1);
                        }
                    });
                });
            });
            collection.forEach((value, key, mapObject) => {
                if (collection.get(key) < 6) {
                    collection.delete(key);
                } else {
                    console.log('value: ' + value + ' key: ' + key);
                }
            });

            // console.log(collection.size);
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

const mapStateToProps = ({ search, history }) => {
    return { searchVal: search.searchValue, lib: history.searchHistory };
};

export default withConnect(mapStateToProps)(withRouter(New));
