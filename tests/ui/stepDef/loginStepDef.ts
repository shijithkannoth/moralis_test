import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber"
import { pageFixture } from "../../utils/pagefixture"
import { test, expect, Page, request } from "@playwright/test";
import LoginPage from "../page/loginPage";
import DashboardPage from "../page/dashboardPage";



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

    } else {
        console.log('Take the action')
    }
    await dashboardPage.createNewNode().click()
    await pageFixture.page.waitForTimeout(1000)

});

Then('I should be able to see the create new node page', async function () {
    console.log('The Node button is Visible', await dashboardPage.createNodeButton().isVisible())
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
    console.log('The Node URL Created ', api_uri.length)
})

Then('I verify the API using the new node url', async () => {
    const apiRequestContext = await request.newContext({});
    api_uri.forEach(async function (value) {
        console.log(value)
        console.log('SITE URL FROM THE APP', value)
        const response = await apiRequestContext.post(value, {
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            data: {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "eth_getBlockByNumber",
                "params": [
                    "latest",
                    true
                ]
            }
        });
        console.log(response.ok())
        expect(response.ok()).toBeTruthy();
    });

})
