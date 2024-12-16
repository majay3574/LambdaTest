import test from "../lambdatest-setup";
import { expect } from "@playwright/test";
import { LambdaTestPage } from "../page/lambdaTestPage";


test('Scenario 2: Drag & Drop Sliders', async ({ page }) => {
  const lambdaTestPage = new LambdaTestPage(page);

  await lambdaTestPage.goToPlayground();
  await lambdaTestPage.clickDragAndDropSliders();
  const slider = await lambdaTestPage.getSlider();
  await lambdaTestPage.setSliderValue(95);
  const output = page.locator("//output[text()='95']");
  await expect(output).toBeVisible();
});
