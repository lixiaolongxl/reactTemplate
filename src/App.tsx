import { useEffect } from 'react';
import './App.less';
import { appTitle} from "./config/event"
import routerList from './config/index'
import RouteComp from './component/RouteComp'
function App() {
	useEffect(()=>{
		changeTitle();

		window.onhashchange = ()=>{
			changeTitle();
		}
	},[])
	const changeTitle = ()=>{
		let name=""
		let hash = window.location.hash.replace(/#/,"")
		TitToRouter(hash,routerList)
		document.title = `${appTitle} | ${name|| "Error"}`; 
		// 递归判断比对标题
		function TitToRouter(path:string,routerList:any[]){
			for(let i=0; i<routerList.length; i++){
				if(routerList[i].path == path){
					name = routerList[i].name;
					break;
				}else {
					if(routerList[i].routes&& routerList[i].routes.length>0){
						TitToRouter(path,routerList[i].routes);
					}
				}
			}
		}
	}
	return (
		<div className="App">
			<RouteComp/>
		</div>
	);
}
export default App;
