import * as React from 'react';
interface ApiResponseData {
    id: number;
    title: string;
    body: string;
    [key: string]: any;
}
interface ApiComponentProps {
    endpoint?: string;
    renderItem?: (item: ApiResponseData) => React.ReactNode;
    loading?: React.ReactNode;
    error?: React.ReactNode;
}
declare const ApiComponent: React.FC<ApiComponentProps>;
export default ApiComponent;
