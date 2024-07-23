import { pageFixture } from "../../utils/pagefixture"

export default class DashboardPage {
    nodes() {
        return pageFixture.page.getByTitle('Nodes')
    }

    createNewNode() {
        return pageFixture.page.locator('//*[text()="Create a New Node"]')
    }

    selectProtocol() {
        return pageFixture.page.locator('css=#select-protoccol')
    }

    selectNetwork() {
        return pageFixture.page.locator('css=#select-network')
    }

    createNodeButton() {
        return pageFixture.page.locator('//button[text()="Create Node"]')
    }

    deleteButton() {
        return pageFixture.page.$$('//*[@data-icon="trash"]')
    }

    confirmDelete() {
        return pageFixture.page.locator('//*[@data-testid="mui-button-destructive"]')
    }

    newNode() {
        return pageFixture.page.locator('//*[text()="Ethereum"]')
    }


}