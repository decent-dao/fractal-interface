import { DaoSafe } from '../page-objects/DaoSafe';
import { delay } from '../page-objects/Helpers/helpers';
import { expect, test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { InputFields } from '../page-objects/InputFields';
import { Navbuttons } from '../page-objects/components/Navbuttons';
import { Notifications } from '../page-objects/Notifications';

test.describe('DAO Creation', () => {
  let daoSafe: DaoSafe;
  let homePage: HomePage;
  let inputFields: InputFields;
  let navButtons: Navbuttons;
  let notifications: Notifications;

  test.beforeEach(async ({ page }) => {
    daoSafe = new DaoSafe(page);
    homePage = new HomePage(page);
    navButtons = new Navbuttons(page);
    notifications = new Notifications(page);
    inputFields = new InputFields(page);
    homePage.visit();
    await delay(3000);
    notifications.closeButton('Close Audit Message');
    await page.waitForLoadState();
    await delay(1500);
    navButtons.clickHeaderConnectWallet();
    await page.waitForLoadState('load');
    await delay(2500);
    await page.click('[data-testid="menu:connect"]');
    await page.waitForLoadState('domcontentloaded');
    navButtons.clickLocalWallet();
    page.waitForSelector('#connected');
    notifications.assertConnected();
    await page.waitForLoadState('networkidle');
  });

  test('Create 1:1 Gnosis Parent DAO and Favorite', async ({ page }) => {
    navButtons.clickCreateAFractal();

    /* Check URL to make sure navigation is correct. */
    await expect(page).toHaveURL('http://localhost:3000/#/daos/new');

    /* Input a Fractal name */
    inputFields.fillField('Insert Fractal Name');
    navButtons.clickNextButton();

    /* Select Gnosis Safe */
    daoSafe.selectSafe('Select Gnosis 1:1 Safe');
    await delay(1300);
    navButtons.clickNextButton();

    /* Add Wallet address */
    inputFields.fillField('Insert Local Node Wallet');
    navButtons.clickDeployButton();

    /* Check toaster message for 'Deploying' text, if this fails deploy did not occur. */
    notifications.assertDeployed();
    await page.waitForLoadState('domcontentloaded');

    /* Check URL to make sure wallet is connected. If this fails wallet is not connected correctly. */
    await expect(page).not.toHaveURL('http://localhost:3000/#/daos/new');

    /* Check header for created DAO title */
    const parentDAO = page.locator('text=Playwright Parent | Home');
    await expect(parentDAO).toContainText('Playwright Parent | Home');

    await page.click('//div[@class="flex items-center"]//button//*[name()="svg"]');
    // await page.hover('//div[@class="flex items-center"]//button//*[name()="svg"]', {
    //   timeout: 500,
    // });
    //await delay(500);
    //await page.waitForLoadState('networkidle');
    // const favTooltip = page.locator('.bg-gray-800.text-white.rounded-lg.py-2.px-4');
    // await expect(favTooltip).toContainText('Remove from favorites');
    navButtons.clickHeaderConnectWallet();
    await page.waitForLoadState('load');
    await delay(2500);
    await page.click('[data-testid="menu:favorites"] div:has-text("Favorites")');
    await page.waitForLoadState('domcontentloaded');
    const favPageHeader = page.locator('h1');
    await expect(favPageHeader).toContainText('Favorite Fractals');
    await page.waitForLoadState('networkidle');

    const favPageDaoTitle = page.locator('.text-sm.font-medium.text-gray-50.pb-1');
    await expect(favPageDaoTitle).toContainText('Playwright Parent');
    await page.click('.visible');

    /* Check header for created DAO title */
    await expect(parentDAO).toContainText('Playwright Parent | Home');
  });
});
