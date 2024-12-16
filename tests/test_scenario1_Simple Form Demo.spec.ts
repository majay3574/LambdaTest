import { expect } from '@playwright/test';
import { LambdaTestPage } from '../page/lambdaTestPage';
import test from "../lambdatest-setup";


test('Scenario 1: Simple Form Demo', async ({ page }) => {
    const lambdaTestPage = new LambdaTestPage(page);
    await lambdaTestPage.goToPlayground();
    await lambdaTestPage.clickSimpleFormDemo();
    await expect(page).toHaveURL(/simple-form-demo/);
    const testMessage = 'Welcome to LambdaTest';
    await lambdaTestPage.fillMessage(testMessage);
    await lambdaTestPage.clickShowInputButton();
    const displayedMessage = await lambdaTestPage.getDisplayedMessage();
    expect(displayedMessage).toBe(testMessage);
})

