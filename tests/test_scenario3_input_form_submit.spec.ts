import { expect } from "@playwright/test";
import test from "../lambdatest-setup";
import { LambdaTestPage } from "../page/lambdaTestPage";

test('Scenario 3: Input Form Submit', async ({ page }) => {
   const lambdaTestPage = new LambdaTestPage(page);
   await lambdaTestPage.goToPlayground();
   await lambdaTestPage.clickInputFormSubmit();
   await lambdaTestPage.clickSubmitButton();
   const errorMessage = await lambdaTestPage.getErrorMessage();
   //note:
   // Actually, you have mentioned 'Please fill in the fields,' but it is 'Please fill out this field.'
   expect(errorMessage).toContain('Please fill out this field.');
   await lambdaTestPage.fillForm();
   await lambdaTestPage.clickSubmitButton();
   const successMessage = await lambdaTestPage.getSuccessMessage();
   expect(successMessage).toContain('Thanks for contacting us, we will get back to you shortly.');

})