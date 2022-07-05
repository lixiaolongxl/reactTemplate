import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actionType from "../store/actionType";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

import img from '@/static/pdf.png'

export function B(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) {
	return (
	<div>
		我是 B 组件
		<ul>
			<li><Link to="/">B com1</Link></li>
			<li><Link to="/b/com2">B com2</Link></li>
			<li><Link to="/b/com3">B com3</Link></li>
		</ul>

		{props.children}
	</div>
	)
}

export function ACom1() {
	const status = useSelector((state:any) => {
        return state.countReducer
    })
	const dispatch = useDispatch()
	return (
		<div>
			A Com1 组件 {status.count}

			{/* <img src={img}  /> */}
			<button onClick={()=>dispatch({type:actionType.DECREMENT,payload:-2})}>更新</button>
		</div>
	)
}
export function ACom2() {
	return (
		<div>
		A Com2 组件
		</div>
	)
}
export function ACom3(props: { children: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; }) {
	return (
		<div>
		A Com3 组件
		<br/>
		{props.children}
		</div>
	)
}

export function BCom1() {
	return (
		<div>
		B Com1 组件
		</div>
	)
}
export function BCom2(props: { children: string | number | boolean | ReactFragment | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined; }) {
	return (
		<div>
		B Com2 组件
		<br/>
		{props.children}
		</div>
	)
}
export function BCom3() {
	return (
		<div>
			B Com3 组件
		</div>
	)
}
export function Error() {
    return (
        <div>
            Error Page
        </div>
    );
}
export function Child() {
    return (
        <div>
            Child
        </div>
    );
}