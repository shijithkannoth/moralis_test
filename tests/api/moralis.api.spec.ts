// import { test, expect, chromium } from '@playwright/test';
// import LoginPage from '../ui/page/loginPage';


// test('captureAndSetCookies', async () => {
//     let cookies = [];
//     const browser = await chromium.launch({ headless: false });
//     const context = await browser.newContext();
//     try {
//         const page = await context.newPage();
//         await page.goto('BASE_URL');
//         await page.getByTitle('Email').fill('shijith.ssn@gmail.com')
//         await page.getByTitle('Password').fill('Todayis@44')
//         await page.waitForTimeout(3000)
//         await page.locator('//*[@type="submit"]').click()
//         // ... Login codes ...

//         // Get cookies from the current context
//         cookies = await context.cookies();
//         console.log('Cookies after logging in:', cookies);

//     } catch (err) {
//         await browser.close();
//         throw new Error(err.message);
//     }

//     return cookies;
// });