// @ts-nocheck
import React, { PureComponent } from 'react';
import {  Menu } from 'antd';
import {withRouter,Link} from 'react-router-dom'
import {
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import routes,{asyncrouter}  from '../config/index'
const { SubMenu } = Menu;
class Menus extends PureComponent {
    state = {
        selectedKey :'/',
        openKeys:[],
        asyncrouter:asyncrouter,
        items:[],
    };
    UNLISTEN = null;
    componentDidMount(){
        
        let items = this.mapItem(asyncrouter,[])
        this.setState({
            items:items
        });
        this.UNLISTEN = this.props.history.listen((reute,methed)=>{
            // console.log(reute,methed);
            this.solutionpath(reute.pathname,true)
        })
        this.solutionpath(this.props.location.pathname,true)
    }
    mapItem(asyncrouter,items){
        if(asyncrouter){
            asyncrouter.forEach(item=>{
                if(item.name){
                    var obj = {}
                    obj.label = item.name;
                    obj.key = item.path;
                    obj.icon = <VideoCameraOutlined />;
                    if(item.routes&& item.routes.length>0){
                        obj.children = this.mapItem(item.routes,[])
                    }
                    items.push(obj);
                }
                
            })
            return items;
        }
    }
    componentWillUnmount(){
        this.UNLISTEN && this.UNLISTEN();
    }

    solutionpath(path,flug){
        let arr = path.split("/");
        let set = this.getDepth(this.state.asyncrouter,1)+1
        let s= arr.slice(0,set)
        const pathname = path.split("/").slice(0,this.getDepth(routes,1)+1).join('/');
        let pathKey = this.getParentPath(routes,pathname,null)
        if(flug){
            this.setState({
                selectedKey:pathname,
                openKeys:[pathKey]
            })
        }else {
            return {
                pathKey
            }
        }
    }
    getParentPath(routes,path,parent){
        var pathKey = "";
        filterPath(routes,path,parent)
        function filterPath(routes,path,parent){
            routes.forEach(element => {
                if(parent){
                    if(element.path === path){
                        pathKey = parent.path;
                    }else {
                        if(element.routes && element.routes.length>0){
                            filterPath(element.routes,path,element)
                        }
                    }
                }else {
                    if(element.path === path){
                        pathKey = ''
                    }else {
                        if(element.routes && element.routes.length>0){
                            filterPath(element.routes,path,element)
                        }
                    }
                }
            });
        }
        return pathKey;
    }
    // 获取数组的最大深度
    getDepth(arr, depth) {
        var flag = false;
        var temp = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].routes instanceof Array) { // 判断是否是数组
                for (let j = 0; j < arr[i].routes.length; j++) {
                temp.push(arr[i].routes[j]); // 解析出arr下第一层
                }
                flag = true;
            }
        }
        if (flag) { // 如果还有数组，则继续解析，直到最后一层有不为数组为止
            depth++;
            return this.getDepth(temp, depth); 
        } else {
            return depth;
        }
    }
    // getSubmenu=(routes)=>{
    //     return routes.map(item=>{
    //         if(!item.routes || item.routes.length===0){
    //             if(item.hidden) return false;
    //                 if(item.name){
    //                     return (
    //                         <Menu.Item key={item.path} >
    //                             <Link to={item.path}>
    //                                 <UserOutlined />
    //                                 <span>{item.name}</span>
    //                             </Link>
    //                         </Menu.Item>
    //                     )
    //                 }
    //         }else if(item.routes && item.routes.length>=1){
    //             if(item.hidden) return false;
    //             if(item.alwaysShow){ //表示显示跟路由是
    //                 return this.getSubmenu(item.routes)
    //             }else {
    //                 if(item.layout ===false){
    //                     return this.getSubmenu(item.routes)  
    //                 }else {
    //                     return (
    //                         <SubMenu key={item.path} title={item.name} icon={<VideoCameraOutlined />}>
    //                             {this.getSubmenu(item.routes)}
    //                         </SubMenu>
    //                     )
    //                 }
    //             }
    //         }
    //     })
    // }
    HandleClick=(item)=>{
        // console.log(this.props.history);
        this.props.history.push({
            pathname: item.key
        })
        this.setState({
            selectedKey:item.key
        })
    }
    render() {
        const {selectedKey,items} = this.state;
        const {pathKey} = this.solutionpath(this.props.location.pathname,false);
        return (
            // <Menu forceSubMenuRender={true}  theme="dark" mode="inline" defaultOpenKeys={[pathKey]}  selectedKeys={[selectedKey]} onClick={this.HandleClick}>
            //     {this.getSubmenu(this.state.asyncrouter)}
            // </Menu>
            <Menu items={items} forceSubMenuRender={true}  theme="dark" mode="inline" defaultOpenKeys={[pathKey]}  selectedKeys={[selectedKey]} onClick={this.HandleClick}>
            
            </Menu>
        );
    }
}

export default withRouter(Menus);