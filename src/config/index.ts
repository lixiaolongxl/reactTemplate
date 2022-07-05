import LayoutDemo from '../component/Layoutcus'
import asyncComponent from '../utils/asyncComponent';
import {
    ACom3,
    Child
} from '../pags/B'
const Login = asyncComponent(()=>import("../pags/Login/index"));
const Register = asyncComponent(()=>import("../pags/Register/index"));
const Home = asyncComponent(()=>import("../pags/Home/index"));

const Error = asyncComponent(()=>import("../pags/Error/index"));

export const asyncrouter = [{
        path: '/home/com1',
        name: 'A com1',
        icon: 'smile',
        component: Login,
    },
    {
        path: '/home/com2',
        name: 'A com2',
        icon: 'smile',
        component: Home,
    },
    {
        path: '/home/com3',
        name: 'A com3',
        icon: 'smile',
        component: ACom3,
        routes: [{
                path: '/home/com3/c',
                name: '测试1',
                icon: 'crown',
                component: Child,
            },
            {
                path: '/home/com3/d',
                name: '测试2',
                icon: 'crown',
                component: Register,
            },
            {
                path: '/home/com3',
                redirect: '/home/com3/c',
            },
            {
                component: Error,
            },
        ]
    },
    {
        path: '/home',
        redirect: '/home/com1',
    },
    {
        component: Error,
    },
]
const routerList = [{
        path: '/home',
        name: '首页',
        icon: 'crown',
        component: LayoutDemo,
        layout: false,
        routes: [
            ...asyncrouter
        ]
    },
    {
        path: '/register',
        name: '注册',
        component: Register,
    },
    {
        path: '/login',
        name: '登录',
        component: Login,
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        component: Error,
    },
];

export default routerList;