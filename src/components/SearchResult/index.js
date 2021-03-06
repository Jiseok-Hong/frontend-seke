import React from 'react';
import styles from './styles.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
const SearchResult = ({ result, loading, fetchResultList, userFeedback, relevantDocs, setRelevantDocs }) => {
    const toPage = (path) => {
        // console.log(path);
        const urlPath = 'https://en.wikipedia.org/wiki/' + path.replace(' ', '_');
        window.open(urlPath, '_blank');
    };
    const [value, setValue] = React.useState(Array(50).fill(0));
    const [hover, setHover] = React.useState(Array(50).fill(-1));
    const [page, setPage] = React.useState(0);
    const labels = {
        1: 'Useless+',
        2: 'Poor+',
        3: 'Ok+',
        4: 'Good+',
        5: 'Excellent+',
    };
    const resultArray = result?.data?.hits;
    const backHandle = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const forthHandle = () => {
        // console.log(result?.data.total.value / 10, page);
        if (page < 4) {
            setPage(page + 1);
        }
    };
    React.useEffect(() => {
        if (userFeedback) {
            setValue(Array(50).fill(0));
            setHover(Array(50).fill(-1));
            setRelevantDocs(new Set());
        }
    }, [loading]);
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
                    {resultArray?.slice(page * 10, page * 10 + 10)?.map((e, index) => {
                        return (
                            <div key={index}>
                                <div className={styles.resultCount}>
                                    Search Result: {page > 0 ? page * 10 : 1} - {page * 10 + 10} / 50
                                </div>
                                <div className={styles.resultContainer} onClick={() => toPage(e._source.title)}>
                                    <div className={styles.resultListNumber}>
                                        <span className={styles.number}>{index + 1 + page * 10}</span>
                                    </div>
                                    <div className={styles.resultbody}>
                                        <h5 className={styles.resultTitle}>{e._source.title}</h5>
                                        <p>{e._source.text.substr(0, 400) + '...'}</p>
                                        {e.highlight.text.map((e) => (
                                            <span dangerouslySetInnerHTML={{ __html: e }} />
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.rating}>
                                    {userFeedback && (
                                        <Box
                                            sx={{
                                                width: 200,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Rating
                                                name="hover-feedback"
                                                value={value[index]}
                                                precision={1}
                                                onChange={(event, newValue) => {
                                                    const changearray = value;
                                                    changearray[index] = newValue;
                                                    setValue([...changearray]);
                                                    if (newValue > 2) {
                                                        relevantDocs.add(e._id);
                                                    }
                                                }}
                                                onChangeActive={(event, newHover) => {
                                                    const changearray = hover;
                                                    changearray[index] = newHover;
                                                    setHover([...changearray]);
                                                }}
                                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                            />
                                            {value[index] !== null && (
                                                <Box sx={{ ml: 2 }}>
                                                    {labels[hover[index] !== -1 ? hover[index] : value[index]]}
                                                </Box>
                                            )}
                                        </Box>
                                    )}
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
