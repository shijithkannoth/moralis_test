import { After, AfterAll, AfterStep, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pagefixture"
import LoginPage from "../ui/page/loginPage";


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
    await page.waitForTimeout(1000)

    await loginPage.email().fill('shijith.ssn@gmail.com')
    await loginPage.password().fill('Todayis@44')
    //await loginPage.submitButton().click()
    await pageFixture.page.waitForTimeout(3000)
    // try {
    //     // await pageFixture.page.locator('//*[@class="recaptcha-checkbox-checkmark"]').click()
    // } catch (error) {
    //     console.log('There is no captcha')
    // }
    await loginPage.submitButton().click()
    await pageFixture.page.waitForTimeout(2000)
})

Before(async function () {
    await pageFixture.page.goto('https://admin.moralis.io');

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



