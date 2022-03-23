import KnowledgeDatabase from 'pages/UserFeedback';
import New from 'pages/BRF';
import Old from 'pages/CategoryFeedback';

const NewPaths = {
    NewTable: {
        path: '/',
        name: 'New Table',
        component: New,
    },
};

const OldPaths = {
    OldTable: {
        path: '/Old',
        name: 'Old Table',
        component: Old,
    },
};

const KDPaths = {
    KDTable: {
        path: '/kd',
        name: 'KD Table',
        component: KnowledgeDatabase,
    },
};

export default {
    NewPaths,
    OldPaths,
    KDPaths,
};
