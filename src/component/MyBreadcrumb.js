// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { withRouter, Link,useLocation  } from 'react-router-dom'
import {
    HomeOutlined,
} from '@ant-design/icons';
import { regexp, arrnb } from "../utils/index"

import routerList from '../config/index'
function MyBreadcrumb(props) {

    // const Location = useLocation();
    

    const [pathList, setPathList] = useState([])
    useEffect(() => {
        let paths = arrnb(regexp(props.location.pathname))
        setPathList(filtpathlist(paths, routerList))
        let UNLISTEN = props.history.listen((reute, methed) => {
            
            let paths = arrnb(regexp(reute.pathname))
            
            setPathList(filtpathlist(paths, routerList))
        })
        return ()=>{
            UNLISTEN &&  UNLISTEN();
        }
    }, [])
    /*
     *@Author: 李小龙
     *@Date: 2021-09-18 11:46:58
     *@Description: 返回 [{path:'/'，name:'首页'，active:false}]
    */
    function filtpathlist(pathList, routerList) {
        var arr = []
        recursion(pathList, routerList, arr)
        arr.forEach((item, index) => {
            if (item.path == props.location.pathname) {
                
                item.active = true
                // document.title = item.name || ""
            };
        })
        return arr
    }
    /*
     *@Author: 李小龙
     *@Date: 2021-09-18 13:05:39
     *@Description: 递归调用
    */
    function recursion(pathList, routerList, arr) {
        pathList.forEach((path, index) => {
            if (routerList.length > 0) {
                routerList.forEach((router, ind) => {
                    if (path == router.path) {
                        var arrlist = pathList.slice(index + 1);
                        arr.push({ path: path, name: router.name, active: false })
                        if (arrlist.length > 0) {
                            recursion(pathList.slice(index + 1), router.routes, arr)
                        }
                    }
                })
            }

        })
    }
    return (
        <>
            <Breadcrumb className="Breadcrumbbox"> 
                {
                    pathList.map(({ path, name, active }, index) => {
                        if (index == 0) {
                            return (
                                <Breadcrumb.Item href="/"  key={index}>
                                    <HomeOutlined />
                                </Breadcrumb.Item>
                            )
                        }
                        if (!active) {
                            return (
                                <Breadcrumb.Item key={index}>
                                    <Link to={path}><span>{name}</span></Link>
                                </Breadcrumb.Item>
                            )
                        } else {
                            return (
                                <Breadcrumb.Item key={index}>{name}</Breadcrumb.Item>
                            )
                        }
                    })
                }
            </Breadcrumb>
        </>
    );
}

export default withRouter(MyBreadcrumb);
