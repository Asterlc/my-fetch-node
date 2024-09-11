const http = require('http');
const url = require('url');

const fetch = (uri, options, maxRedirects = 5, encoding = 'utf8') => {
    return new Promise((resolve, reject) => {
        const req = http.request(uri, options, (res) => {
            res.setEncoding(encoding);
            let data = '';
            
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && maxRedirects > 0) {
                const newUrl = url.resolve(uri, res.headers.location);
                return resolve(fetch(newUrl, options, maxRedirects - 1));
            }
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    data: data
                });
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end('{}');
    });
}

export default fetch;

