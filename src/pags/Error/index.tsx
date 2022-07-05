import { FunctionComponent } from "react";
import { Button, Result } from 'antd';
import './index.less';

interface ErrorProps {
    
}
 
const Error: FunctionComponent<ErrorProps> = () => {
    return ( <div className="ErrorPage">
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            // extra={<Button type="primary">Back Home</Button>}
        />
    </div> );
}
 
export default Error;