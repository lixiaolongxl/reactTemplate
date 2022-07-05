// @ts-nocheck
import React from 'react';

import routerList from '../config/index'
// import { useLocation} from 'react-router-dom';
import { Route, Switch ,BrowserRouter as Router ,Redirect,HashRouter} from 'react-router-dom';

function RouteComp(prop) {
    function routerMap(List) {
            return (
                <HashRouter>
                    <Switch>
                        {
                            List.map((item,index)=>{
                                if(item.component){
                                    if(item.routes && item.routes.length>0){
                                        return (
                                            <Route  key={index} path={item.path} render={()=>(
                                                <item.component>
                                                    { routerMap(item.routes) }
                                                </item.component>
                                            )}/>
                                        )
                                    }else {
                                        return  <Route  key={index} path={item.path} component={item.component}/>
                                    }
                                }else {
                                    if(item.redirect){
                                        return <Redirect key={index} exact from={item.path} to={item.redirect}/>
                                    }else {
                                        return routerMap(item.routes)
                                    }
                                }
                            })
                        }
                    </Switch>
                </HashRouter>
            )
    }
    
	return (
		<>
		    {routerMap(routerList)}
		</>
	)
}
export default React.memo(RouteComp)