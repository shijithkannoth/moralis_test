import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
    vus: 10,
    duration: '10s',
};

export default function () {
    const address = '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e'
    const url = 'https://deep-index.moralis.io/api/v2.2/' + address + '/nft'

    const params = {
        headers: {
            'X-API-Key': __ENV.API_KEY
        },
    };

    const response = http.get(url, params);
    check(response, {
        'status is 200': (r) => r.status === 200,
    });

    check(response, {
        'body is not empty': (r) => r.body.length > 0,
    });

    sleep(1);
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}


