import UserFeedback from 'pages/UserFeedback';
import BRF from 'pages/BRF';
import CategoryFeedback from 'pages/CategoryFeedback';

const NewPaths = {
    NewTable: {
        path: '/',
        name: 'New Table',
        component: BRF,
    },
};

const OldPaths = {
    OldTable: {
        path: '/Old',
        name: 'Old Table',
        component: UserFeedback,
    },
};

const KDPaths = {
    KDTable: {
        path: '/kd',
        name: 'KD Table',
        component: CategoryFeedback,
    },
};

export default {
    NewPaths,
    OldPaths,
    KDPaths,
};
