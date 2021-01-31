const Config = { 
    apiPath : !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://46.252.205.196/plesk-site-preview/kektrophies.co.uk/api/" : "http://127.0.0.1:5000/api/"
}

export default Config;