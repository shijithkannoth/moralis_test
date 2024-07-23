const { CucumberJSAllureFormatter, AllureRuntime } = require("allure-cucumberjs");
const path = require("path");

class Reporter extends CucumberJSAllureFormatter {
    constructor(options: any) {
        super(
            options,
            new AllureRuntime({
                resultsDir: path.resolve("allure-results"),
            }),
            {},
        );
    }
}

module.exports = Reporter;