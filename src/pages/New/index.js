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
    const [collection, setCollection] = useState(new Map());
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

    const categoyCollection = () => {
        collection.clear();
        let count = 1;
        for (let element of result?.data?.hits) {
            count++;
            const categoryResult = element._source.category.forEach((cate) => {
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
            if (count > 10) break;
        }
        collection.delete('wikidata');
        collection.delete('articl');
        collection.delete('wikipedia');
        collection.forEach((value, key, mapObject) => {
            if (collection.get(key) < 10) {
                collection.delete(key);
            }
        });
        // console.log(collection.size);
    };

    const setCategoryNum = () => {
        const allCateSet = result?.data?.hits.forEach((element) => {
            let count = 0;
            let documentId = element._id;
            element._source.category.forEach((cate) => {
                const categorytoWord = stopWordRemoval(cate).split(/[.\-=/_\s]/);
                categorytoWord.forEach((e) => {
                    const valueLower = stemmer(e).toLowerCase();
                    if (collection.has(valueLower)) {
                        count++;
                    }
                });
            });
            console.log('documentID: ' + documentId + ' count: ' + count);
            NewApi.categoryMatchNum(documentId, count);
        });
    };

    const fetchResultList = async () => {
        try {
            console.log('-------------------------------');
            console.log('times: ' + lib[0].times);
            setLoading(true);
            if (lib[0].times > 1) {
                result = await NewApi.searchRelevanceNew(searchVal);
            } else {
                result = await NewApi.searchNew(searchVal);
            }
            setResults(result);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
            categoyCollection();
            setCategoryNum();
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
