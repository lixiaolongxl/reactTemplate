let baseUrl: string = '';
let fileUrl: string = ''
let appTitle:string = "App"
if (process.env.NODE_ENV === 'development') {
    fileUrl = "http://52.80.185.166:80/imgs"
    baseUrl = "http://192.168.1.105:8091/"
} else {
    baseUrl = "http://52.80.185.166:8091/"
    fileUrl = "http://52.80.185.166:80/imgs"
}
export {
    fileUrl,
    baseUrl,
    appTitle
};