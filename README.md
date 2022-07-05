# 配置json 适配路由

```js
/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Aaron
 * @Date: 2021-09-16 13:42:40
 * @LastEditors: Aaron
 * @LastEditTime: 2021-09-17 16:33:33
 */
import LayoutDemo from '../component/Layout'
import {Error,B,BCom1,BCom2,BCom3,ACom1,ACom2,ACom3,Child} from '../component/B'
export const asyncrouter = [
    {
        path: '/a/com1',
        name: 'A com1',
        icon: 'smile',
        component: ACom1,
    },
    {
        path: '/a/com2',
        name: 'A com2',
        icon: 'smile',
        component: ACom2,
    },
    {
        path: '/a/com3',
        name: 'A com3',
        icon: 'smile',
        component: ACom3,
        routes:[
            {
                path: '/a/com3/c',
                name: '测试',
                icon: 'crown',
                component: Child,
            }
        ]
    },
    {
        path: '/a',
        redirect: '/a/com1',
    },
    {
        component: Error,
    },
]
const  routerList =  [
    {
        path: '/a',
        name:'首页',
        icon: 'crown',
        component: LayoutDemo,
        layout: false,
        routes:[
            ...asyncrouter
        ]
    },
    {
        path: '/b',
        name: '测试登录页',
        icon: 'crown',
        component: B,
        routes: [
            {
                path: '/b/com1',
                name: 'B com1',
                icon: 'smile',
                component: BCom1,
            },
            {
                path: '/b/com2',
                name: 'B com2',
                icon: 'smile',
                // alwaysShow:true,
                component: BCom2,
                routes:[
                    {
                        path: '/b/com2/c',
                        name: '测试',
                        icon: 'crown',
                        component: Child,
                    }
                ]
            },
            {
                path: '/b/com3',
                name: 'B com3',
                icon: 'smile',
                component: BCom3,
            },
            {
                path: '/b',
                redirect: '/b/com1',
            },
            {
                component: Error,
            },
        ],
    },
    {
        path: '/c',
        name: '测试',
        icon: 'crown',
        component: Child,
    },
    {
        path: '/',
        redirect: '/a',
    },
    {
        component: Error,
    },
];

export default  routerList;
```