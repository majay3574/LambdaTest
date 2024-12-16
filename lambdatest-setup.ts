import * as base from "@playwright/test";
import path from "path";
import { chromium, Page } from "playwright";

// LambdaTest capabilities
const capabilities = {
    browserName: "Chrome",
    browserVersion: "latest",
    "LT:Options": {
        platform: "Windows 10",
        build: "Playwright TS Build",
        name: "Playwright Test",
        user: "majay3574",
        accessKey: "YMtvD24I1DMtbzjhKefkLnsINqpHEfj7ynGNTu98I3Vpt3vLk3",
        network: true,
        video: true,
        console: true,
        tunnel: false, // Add tunnel configuration if testing locally hosted webpage
        tunnelName: "", // Optional
        geoLocation: "", // Country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    },
};

/**
 * Modify LambdaTest capabilities based on the project configuration and test name.
 * @param {string} configName - The project configuration name.
 * @param {string} testName - The test name.
 */
const modifyCapabilities = (configName: string, testName: string) => {
    const configParts = configName.split("@lambdatest")[0].split(":");
    capabilities.browserName = configParts[0] || capabilities.browserName;
    capabilities.browserVersion = configParts[1] || capabilities.browserVersion;
    capabilities["LT:Options"]["platform"] = configParts[2] || capabilities["LT:Options"]["platform"];
    capabilities["LT:Options"]["name"] = testName;
};

// Extend the base test to include LambdaTest support
const test = base.test.extend<{
    page: Page;
}>({
    page: async ({ playwright }, use, testInfo) => {
        const fileName = path.basename(testInfo.file || "unknown_file");
        const isLambdaTest = testInfo.project.name.includes("lambdatest");

        if (isLambdaTest) {
            modifyCapabilities(
                testInfo.project.name,
                `${testInfo.title} - ${fileName}`
            );

            const wsEndpoint = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
                JSON.stringify(capabilities)
            )}`;

            const browser = await chromium.connect({ wsEndpoint });
            const ltPage = await browser.newPage();

            try {
                await use(ltPage);

                const testStatus = {
                    action: "setTestStatus",
                    arguments: {
                        status: testInfo.status,
                        remark: testInfo.error?.message || "Test completed successfully",
                    },
                };
                await ltPage.evaluate(
                    () => {},
                    `lambdatest_action: ${JSON.stringify(testStatus)}`
                );
            } finally {
                await ltPage.close();
                await browser.close();
            }
        } else {
            // Use the local page for local configurations
            const browser = await playwright.chromium.launch();
            const localPage = await browser.newPage();
            try {
                await use(localPage);
            } finally {
                await localPage.close();
                await browser.close();
            }
        }
    },
});

export default test;
