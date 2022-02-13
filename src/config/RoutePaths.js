import KnowledgeDatabase from 'pages/KnowledgeDatabase';
import New from 'pages/New';
import Old from 'pages/Old';

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
