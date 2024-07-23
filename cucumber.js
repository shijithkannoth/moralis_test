const path = require("path");
module.exports = {
    default: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/test/ui/feature/"
        ],
        publishQuite: true,
        dryRun: false,
        require: [
            "src/test/ui/stepDef/*.ts",
            "src/utility/hooks.ts",
            "src/utility/global.setup.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],

        format: [
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            path.resolve("src/reports", "reports.ts")
        ]
    }

}