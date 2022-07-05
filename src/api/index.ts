import request from '../utils/request'
export interface IResponse<S> {
    status_code: number | string;

    result: any | S;
    msg: string;
}

// 用户登录
export const Login = (data: any): Promise<IResponse<any>> => {
    return request.post('login/register', data);
};

// 通过id查找项目
export function findProjectById<T>(params: T): Promise<IResponse<any>> {
    return request.get('project/findProjectById', { params: params });
};