import React from 'react';
import styles from './styles.scss';

const SearchResult = ({ result }) => {
    const toPage = () => {
        console.log('hui');
    };
    return (
        <div className={styles.container}>
            <div className={styles.resultCount}>Search Result: 2302</div>
            {result.map((e, index) => {
                return (
                    <div className={styles.resultContainer} key={index} onClick={toPage}>
                        <div className={styles.resultListNumber}>
                            <span className={styles.number}>{index + 1}</span>
                        </div>
                        <div className={styles.resultbody}>
                            <span className={styles.resultTitle}>{e.title}</span>
                            <p>{e.text}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchResult;
