// lambdaTestPage.ts
import { Page } from '@playwright/test';

export class LambdaTestPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToPlayground() {
        await this.page.goto('https://www.lambdatest.com/selenium-playground');
    }

    async clickSimpleFormDemo() {
        await this.page.click('text=Simple Form Demo');
    }

    async clickDragAndDropSliders() {
        await this.page.click('text=Drag & Drop Sliders');
    }

    async clickInputFormSubmit() {
        await this.page.click('text=Input Form Submit');
    }

    async fillMessage(message: string) {
        await this.page.fill('#user-message', message);
    }

    async clickShowInputButton() {
        await this.page.click('#showInput');
    }

    async getDisplayedMessage() {
        await this.page.waitForTimeout(3000);
        return await this.page.locator('#message').textContent();
    }

    async getSlider() {
        return this.page.locator('input[value="15"]');
    }

    async setSliderValue(value: string | Number) {
        let sliderSelector: string = "#slider3"
        const slider = this.page.locator(sliderSelector);
        await this.page.waitForTimeout(1000);
        await slider.getByRole('slider').fill(value.toString());
        await this.page.waitForTimeout(1000);
    }


    async clickSubmitButton() {
        const submitBtn = 'button:text-is("Submit")'
        await this.page.waitForLoadState('load');
        await this.page.locator(submitBtn).waitFor({ state: 'visible' });
        await this.page.click(submitBtn);
    }

    async fillForm() {
        await this.page.fill('input[name="name"]', 'Test User');
        await this.page.fill('input[placeholder="Email"]', 'test@example.com');
        await this.page.fill('input[name="password"]', 'password123');
        await this.page.fill('input[name="company"]', 'Test Company');
        await this.page.fill('input[name="website"]', 'https://example.com');
        await this.page.selectOption('select[name="country"]', { label: 'United States' });
        await this.page.fill('input[name="city"]', 'Chennai');
        await this.page.fill('input[name="address_line1"]', '123 Test St');
        await this.page.fill('input[name="address_line2"]', 'Suite 100');
        await this.page.fill('input[id="inputState"]', 'Tamil Nadu');
        await this.page.fill('input[name="zip"]', '12345');
    }

    async getErrorMessage() {
        // The page is pretty good. I just use this wait to ensure the browser shows the element as visible for user
        await this.page.waitForTimeout(2000);
        const nameErrorMessage = await this.page.locator('input[name="name"]:invalid').evaluate((inputElement) => {
            if (inputElement instanceof HTMLInputElement) {
                return inputElement.validationMessage;
            }
            return null;
        });
        console.log(`Name Validation Error Message: ${nameErrorMessage}`);
        return nameErrorMessage
    }

    async getSuccessMessage() {
        await this.page.hover('.success-msg');
        await this.page.waitForTimeout(3000);
        return this.page.locator('.success-msg').textContent();
    }
}
