const Config = { 
    apiPath : !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://127.0.0.1:5000/api/" : "http://kektrophies.co.uk/api/"
}

export default Config;