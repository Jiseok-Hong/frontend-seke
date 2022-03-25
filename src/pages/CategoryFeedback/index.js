import React, { useEffect, useState } from 'react';
import withConnect from 'utils/withConnect';
import { withRouter } from 'react-router-dom';
import NewApi from 'services/api/BlindApi';
import historyActions from 'store/searchHistory/actions';
import searchActions from 'store/search/actions';
import NavList from 'components/NavList';
import SearchResult from 'components/SearchResult';
import { stemmer } from 'stemmer';
import stopwords from 'services/stopWords';

const CategoryFeedback = ({ dispatch, searchVal, lib }) => {
    const [results, setResults] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [relevantCollection, setrelevantCollection] = useState(new Map());
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

    const categoryCollection = () => {
        const collection = new Set();
        for (let element of result?.data?.hits) {
            const categoryResult = element._source.category.forEach((cate) => {
                const categorytoWord = stopWordRemoval(cate).split(/[.\-=/_\s]/);
                categorytoWord.forEach((e) => {
                    const valueLower = stemmer(e).toLowerCase();
                    if (!collection.has(valueLower)) {
                        collection.add(valueLower);
                    }
                });
            });
        }
        collection.delete('wikidata');
        collection.delete('articl');
        collection.delete('wikipedia');
        let relevantDoc = [];
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
            relevantDoc.push({ documentId, count });
        });
        const relevantDocument = relevantDoc
            .sort((a, b) => {
                if (a.count > b.count) {
                    return 1;
                }
                if (a.count < b.count) {
                    return -1;
                }
                return 0;
            })
            .slice(0, 10);
        const CollectDoc = new Set();
        for (let element of relevantDocument) {
            CollectDoc.add(element.documentId);
        }
        relevantCollection.clear();
        for (let element of result?.data?.hits) {
            if (CollectDoc.has(element._id)) {
                const categoryResult = element._source.category.forEach((cate) => {
                    const categorytoWord = stopWordRemoval(cate).split(/[.\-=/_\s]/);
                    categorytoWord.forEach((e) => {
                        const valueLower = stemmer(e).toLowerCase();
                        if (relevantCollection.get(valueLower) !== undefined) {
                            const count = relevantCollection.get(valueLower) + 1;
                            relevantCollection.set(valueLower, count);
                        } else {
                            relevantCollection.set(valueLower, 1);
                        }
                    });
                });
            }
        }
        relevantCollection.delete('wikidata');
        relevantCollection.delete('articl');
        relevantCollection.delete('wikipedia');
        relevantCollection.forEach((value, key, mapObject) => {
            if (relevantCollection.get(key) < 5) {
                relevantCollection.delete(key);
            }
        });
    };

    const setCategoryNum = () => {
        const allCateSet = result?.data?.hits.forEach((element) => {
            let count = 0;
            let documentId = element._id;
            element._source.category.forEach((cate) => {
                const categorytoWord = stopWordRemoval(cate).split(/[.\-=/_\s]/);
                categorytoWord.forEach((e) => {
                    const valueLower = stemmer(e).toLowerCase();
                    if (relevantCollection.has(valueLower)) {
                        count++;
                    }
                });
            });
            // console.log('documentID: ' + documentId + ' count: ' + count);
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
            if (result.status === 0) {
                throw 'data is not found';
            } else {
                categoryCollection();
                setCategoryNum();
            }
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

const mapStateToProps = ({ search, history }) => {
    return { searchVal: search.searchValue, lib: history.searchHistory };
};

export default withConnect(mapStateToProps)(withRouter(CategoryFeedback));
