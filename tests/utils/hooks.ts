import { After, AfterAll, AfterStep, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pagefixture"
import LoginPage from "../ui/page/loginPage";
import DashboardPage from "../ui/page/dashboardPage";


let browser: Browser
let context: BrowserContext
let loginPage = new LoginPage()

BeforeAll(async function () {
    console.log(' I am here')
    browser = await chromium.launch({ headless: false })
    process.env.URI = 'https://admin.moralis.io/login'
    context = await browser.newContext()
    context.browser()
    const page = await context.newPage()
    pageFixture.page = page
    await page.goto(process.env.URI)
    await page.waitForTimeout(1000)
    await loginPage.acceptCookies().click()
    await loginPage.email().fill('shijith.ssn@gmail.com')
    await loginPage.password().fill('Todayis@44')
    await loginPage.submitButton().click()
    try {
        await pageFixture.page.locator('//*[@class="recaptcha-checkbox-checkmark"]').click()
        await loginPage.submitButton().click()
    } catch (error) {
        // if (await loginPage.submitButton().isVisible()) {
        //     loginPage.submitButton().click()
        // }
        await loginPage.submitButton().click()
    }
    await pageFixture.page.getByTitle('Home').click()
    await pageFixture.page.waitForTimeout(4000)
})

Before(async function () {
    console.log('isdie the before only')
    await pageFixture.page.goto('https://admin.moralis.io');
    await pageFixture.page.waitForTimeout(2000)

})

AfterStep(async function ({ pickle, result }) {

    if (result?.status == Status.FAILED) {
        let scenario_name = pickle.name
        const img = await pageFixture.page.screenshot({ path: './test-results/screenshot/' + scenario_name + '}.png', type: "png" })
        this.attach(img, "image/png")
    }

})

After(async function (pickle) {
    // Add Screenshot after each step

})

AfterAll(async function () {
    await browser.close()
})



