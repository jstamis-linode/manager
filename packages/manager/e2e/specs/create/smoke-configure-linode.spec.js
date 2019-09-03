const { constants } = require('../../constants');
import Create from '../../pageobjects/create';
import ConfigureLinode from '../../pageobjects/configure-linode';
import CheckoutSummary from '../../pageobjects/checkout-summary';
import { browserCommands } from '../../config/custom-commands';

describe('Create Linode - Configure Linode Suite', () => {
  beforeAll(() => {
    ConfigureLinode.selectGlobalCreateItem('Linode');
  });

  beforeEach(() => {
    browser.refresh()
    $('[data-qa-create-linode-header]').waitForDisplayed(constants.wait.short);
  })

  it('should display configure elements', () => {
    ConfigureLinode.baseDisplay();
  });

  it('should update cost summary on plan selection', () => {
    $('[data-qa-tp="Linode Plan"] [data-qa-selection-card]').waitForDisplayed();
    ConfigureLinode.plans.forEach(p => {
      const originalPrice = CheckoutSummary.costSummary.getText();
      p.click();
      const updatedPrice = CheckoutSummary.costSummary.getText();
      expect(updatedPrice)
        .withContext(`incorrect summary price`)
        .not.toBe(originalPrice);
    });
  });

  it('should configure a generic linode and update cost summary', () => {

    const genericPrice = CheckoutSummary.costSummary.getText()
    const genericImage = ConfigureLinode.imageNames[0].getText();
    const genericType = ConfigureLinode.planNames[0].getText();

    ConfigureLinode.generic();

    expect(CheckoutSummary.costSummary.getText())
      .withContext(`incorrect cost summary value`)
      .toBeGreaterThan(genericPrice);
    expect(CheckoutSummary.subheaderDisplays(genericImage))
      .withContext(`subheader ${genericImage} image should be displayed`)
      .toBe(true);
    expect(CheckoutSummary.subheaderDisplays(genericType))
      .withContext(`subheader ${genericType} type should be displayed`)
      .toBe(true);
  });

  it('should display a region select', () => {

    expect(ConfigureLinode.regionSelect.isDisplayed())
      .withContext(`region select should be displayed`)
      .toBe(true);
  });

  it('should select a specific image', () => {
    const imageName = 'Debian';
    ConfigureLinode.selectImage(imageName);

    expect(CheckoutSummary.subheaderDisplays(imageName))
      .withContext(`subheader name ${imageName} should be displayed`)
      .toBe(true);
  });
});
