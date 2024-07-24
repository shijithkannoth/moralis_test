import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { pageFixture } from "../../utils/pagefixture"
import { test, expect, Page, request } from "@playwright/test";
import LoginPage from "../page/loginPage";
import DashboardPage from "../page/dashboardPage";
import exp from "constants";
import { isArray } from "util";



setDefaultTimeout(50000);

let loginPage = new LoginPage()
let dashboardPage = new DashboardPage()
const api_uri: string[] = []


Given('I logged in and landed to dashboard page', async function () {
    await pageFixture.page.getByTitle('Home').click()

});

When('I click on the create node button', async function () {
    await dashboardPage.nodes().click()
    await pageFixture.page.waitForTimeout(2000)
    if (await dashboardPage.newNode().isVisible()) {
        const check = dashboardPage.newNode()
        await check.click()
        const deleteButtons = await dashboardPage.deleteButton()
        for (let button of deleteButtons) {
            await button.click()
            await dashboardPage.confirmDelete().click()
        }
    }
    await dashboardPage.createNewNode().click()
    await pageFixture.page.waitForTimeout(1000)

});

Then('I should be able to see the create new node page', async function () {
    await dashboardPage.createNodeButton().isVisible()
    await pageFixture.page.waitForTimeout(2000)

});

Then('I select {string} and {string} from the dropdown', async function (protocol, network) {
    await dashboardPage.selectProtocol().selectOption(protocol)
    await dashboardPage.selectNetwork().selectOption(network)
});

// Then('I select {protocol} and {network} from the dropdown', async function (protocol, network) {

// })

Then('I click on Create node and should see new node created', async () => {
    await dashboardPage.createNodeButton().nth(1).click()
    await pageFixture.page.waitForTimeout(1500)
    const selectors = await pageFixture.page.$$('//*[@data-testid="mui-input"]');
    for (let tr of selectors) {
        const trText = await pageFixture.page.evaluate(el => el.getAttribute('value'), tr);
        api_uri.push(trText!)
    }
})

Then('I verify the API using  {string} {string} new node url', async (id, methodName) => {
    const apiRequestContext = await request.newContext({});
    api_uri.forEach(async function (value) {
        const response = await apiRequestContext.post(value, {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            data: {
                "jsonrpc": "2.0",
                "id": id,
                "method": methodName,
                "params": [
                    "latest",
                    true
                ]
            }
        });
        expect(response.ok()).toBeTruthy();
        const data = await response.json()
        validate_response(data)

    });

})

Then('I get the API Key from portal', async () => {
    await pageFixture.page.waitForTimeout(1000)
    const api_key = await dashboardPage.apiKey().getAttribute('id')!
    process.env.API_KEY = api_key!

})

Then('I validate the API with inputs', async function () {
    const apiRequestContext = await request.newContext({});
    const response = await apiRequestContext.post(api_uri[1], {
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        data: {
            "jsonrpc": "2.0",
            "id": "",
            "method": "getBlockByNumber",
            "params": [
                "latest",
                true
            ]
        }
    });
});


Then('I validate the getTransactionByHash endpoint with new node url', async function () {
    const apiRequestContext = await request.newContext({});
    const response = await apiRequestContext.post(api_uri[1], {
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        data: {
            "jsonrpc": "2.0",
            "id": 1.0,
            "method": "eth_getTransactionByHash",
            "params": [
                "0x18173058d45f8aa984181fdfbfece01a93a971ea63e008231b2e15f151e0903f"
            ]
        }
    });

    const data = await response.json()
    expect(data.jsonrpc == 'string')
    expect(data.result != null)
    expect(data.id == 1)


});

Then('I validate the blockNumber endpoint with newly created node', async () => {
    const apiRequestContext = await request.newContext({});
    const response = await apiRequestContext.post(api_uri[1], {
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        data: {
            "jsonrpc": "2.0",
            "id": 1.0,
            "method": "eth_blockNumber",
        }
    });
    const data = await response.json()
    expect(data.jsonrpc != null)
    expect(data.id == 1 && data.id != null)
    expect(data.result != null && data.result.startsWith('0x'))
})

function validate_response(response_data: any) {
    const data = response_data
    expect(data.id == 1)
    expect(data.result != null)
    expect(data.result == 'object')
    expect(data.jsonrpc == 'string')
    expect((data.result.transactions) == 'object')
    expect(typeof (data.result.number) == 'string')
    expect(typeof (data.result.hash) == 'string')
    expect(typeof (data.result.parentHash) == 'string')
    expect(typeof (data.result.sha3Uncles) == 'string')
    expect(typeof (data.result.logsBloom) == 'string')
    expect(typeof (data.result.transactionsRoot) == 'string')
    expect(typeof (data.result.stateRoot) == 'string')
    expect(typeof (data.result.receiptsRoot) == 'string')
    expect(typeof (data.result.miner) == 'string')
    expect(typeof (data.result.difficulty) == 'string')
    expect(typeof (data.result.totalDifficulty) == 'string')
    expect(typeof (data.result.extraData) == 'string')
    expect(typeof (data.result.size) == 'string')
    expect(typeof (data.result.gasLimit) == 'string')
    expect(typeof (data.result.gasUsed) == 'string')
    expect(typeof (data.result.timestamp) == 'string')
    expect(typeof (data.result.uncles) == 'object')
}

Then('I validate the getNFTWallet endpoint', async () => {
    const apiRequestContext = await request.newContext({});
    let address = '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e'
    const response = await apiRequestContext.get('https://deep-index.moralis.io/api/v2.2/' + address + '/nft', {
        headers: {
            'Accept': "application/json",
            'X-API-Key': process.env.API_KEY!
        }
    });

    let responseData = await response.json()
    expect(response.ok()).toBeTruthy();
    expect(responseData.status == 'SYNCED' || responseData.status == 'SYNCING')
    expect(typeof (responseData.number) == 'number')
    expect(typeof (responseData.page) == 'number')
    expect(typeof (responseData.page_size) == 'number')
    expect(typeof (responseData.cursor) == 'string')
    expect(typeof (responseData.result) == 'object')
})

When('I request NFT endpoint with incorrect apieky to validate inorrect token in response messsage', async () => {
    const apiRequestContext = await request.newContext({});
    let address = '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3'
    const response = await apiRequestContext.get('https://deep-index.moralis.io/api/v2.2/' + address + '/nft', {
        headers: {
            'Accept': "application/json",
            'X-API-Key': address
        }
    });

    let responseData = await response.json()
    expect(response.status() == 401);
    expect(responseData.message.includes('invalid token'))
})

When('I request NFT endpoint with incorrect address to validate response address not valid', async () => {
    const apiRequestContext = await request.newContext({});
    let address = '0xff3879b8a363aed92a6eaba8f61f1a96a9ec3'
    const response = await apiRequestContext.get('https://deep-index.moralis.io/api/v2.2/' + address + '/nft', {
        headers: {
            'Accept': "application/json",
            'X-API-Key': process.env.API_KEY!
        }
    });

    let responseData = await response.json()
    expect(response.status() == 400);
    expect(responseData.message.includes('is not a valid hex address'))
})

Given('I get the api key from node url', async () => {
    await dashboardPage.nodes().click()
    await dashboardPage.newNode().click()
    await pageFixture.page.waitForTimeout(1000)
    const selectors = await pageFixture.page.$$('//*[@data-testid="mui-input"]');
    for (let tr of selectors) {
        const trText = await pageFixture.page.evaluate(el => el.getAttribute('value'), tr);
        api_uri.push(trText!)
    }
})


Then('I validate blockNumber endpoint with incorrect inputs', async () => {
    const apiRequestContext = await request.newContext({});
    const response = await apiRequestContext.post(api_uri[1] + "incorrect", {
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        data: {
            "jsonrpc": "2.0",
            "params": [
                "latest",
                true
            ],
            "id": "1",
            "method": "eth_getBlockByNumber"
        }
    });
    let responseData = await response.json()
    expect(response.status() == 401);
    expect(responseData.message).toContain('Token is invalid format')
    const response_ = await apiRequestContext.post(api_uri[1], {
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        data: {
            "jsonrpc": "2.0",
            "params": [
                "latest",
                true
            ],
            "id": "1",
            "method": "incorrect_name"
        }
    });
    let responseData_ = await response_.json()
    expect(response_.status()).toBe(400);
    expect(responseData_.message).toContain('is not supported on chain')

})

Then('I validate getTransactionByHash endpoint with incorrect inputs', async () => {
    const apiRequestContext = await request.newContext({});
    const uri = api_uri[1].replace(/.$/, "a")
    const response = await apiRequestContext.post(uri, {
        data: {
            "jsonrpc": "2.0",
            "id": 1.0,
            "method": "eth_getTransactionByHash",
            "params": [
                "0x18173058d45f8aa984181fdfbfece01a93a971ea63e008231b2e15f151e0903f"
            ]
        }
    });
    let responseData = await response.json()
    expect(response.status() == 401);
    expect(responseData.message).toContain('Node Key not valid')
    const response_ = await apiRequestContext.post(api_uri[1], {
        data: {
            "jsonrpc": "2.0",
            "id": 1.0,
            "method": "getTransactionByHash",
            "params": [
                "0x18173058d45f8aa984181fdfbfece01a93a971ea63e008231b2e15f151e0903f"
            ]
        }
    });
    let responseData_ = await response_.json()
    expect(response_.status()).toBe(400);
    expect(responseData_.message).toContain('is not supported on chain')
})


Then('I validate getBlockByNumber endpoint with incorrect inputs', async () => {
    const apiRequestContext = await request.newContext({});
    let uri = api_uri[1].replace(/.$/, "z")
    const response = await apiRequestContext.post(uri, {
        data: {
            "jsonrpc": "2.0",
            "params": [
                "latest",
                true
            ],
            "id": "1",
            "method": "eth_getBlockBNumber"
        }
    });
    let responseData = await response.json()
    expect(response.status()).toBe(401);
    expect(responseData.message).toContain('Token is invalid format')
    const response1 = await apiRequestContext.post(api_uri[1], {
        data: {
            "jsonrpc": "2.0",
            "params": [
                "latest",
                true
            ],
            "id": "1",
            "method": "getBlockBNumber"
        }
    });
    let responseData1 = await response1.json()
    expect(response1.status()).toBe(400);
    expect(responseData1.message).toContain('is not supported on chain')
})