import React from 'react';
import styles from './styles.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const SearchResult = ({ result, loading, setPage, page, fetchResultList }) => {
    const toPage = () => {
        console.log('hui');
    };
    console.log(result?.data);

    const resultArray = result?.data?.hits;

    const backHandle = () => {
        if (page > 0) {
            setPage(page - 1);
            fetchResultList();
        }
    };

    const forthHandle = () => {
        console.log(result?.data.total.value / 10, page);
        if (page < result?.data.total.value / 10) {
            setPage(page + 1);
            fetchResultList();
        }
    };
    if (loading) {
        return (
            <div className={styles.container}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {resultArray?.length !== 0 ? (
                <>
                    {resultArray?.length > 0 && (
                        <>
                            <div className={styles.back} role="button" onClick={backHandle}>
                                <KeyboardArrowLeftIcon fontSize="large" />
                            </div>
                            <div className={styles.forth} role="button" onClick={forthHandle}>
                                <ChevronRightIcon fontSize="large" />
                            </div>
                        </>
                    )}
                    {resultArray?.map((e, index) => {
                        return (
                            <div key={index}>
                                <div className={styles.resultCount}>
                                    Search Result: {page * 10} - {page * 10 + 10} / {result?.data.total.value}
                                </div>
                                <div className={styles.resultContainer} onClick={toPage}>
                                    <div className={styles.resultListNumber}>
                                        <span className={styles.number}>{index + 1 + page * 10}</span>
                                    </div>
                                    <div className={styles.resultbody}>
                                        <h5 className={styles.resultTitle}>{e._source.title}</h5>
                                        <p>{e._source.text.substr(0, 700) + '...'}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <h3>No results</h3>
            )}
        </div>
    );
};

export default SearchResult;
