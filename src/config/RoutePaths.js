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

export default {
    NewPaths,
    OldPaths,
};
