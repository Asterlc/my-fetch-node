const http = require('http');

const fetch = (uri, options) => {
    return new Promise((resolve, reject) => {
        const req = http.request(uri, options, (res) => {
            res.setEncoding('utf8');
            let data = '';
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
