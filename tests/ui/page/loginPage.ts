import { pageFixture } from "../../utils/pagefixture"

export default class LoginPage {

    email() {
        return pageFixture.page.getByTitle('Email')
    }

    password() {
        return pageFixture.page.getByTitle('Password')
    }

    acceptCookies() {
        return pageFixture.page.locator('//*[@id="cookiescript_accept"]')
    }

    submitButton() {
        return pageFixture.page.locator('//*[@type="submit"]')
    }
}