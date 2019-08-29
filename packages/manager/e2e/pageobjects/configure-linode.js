const crypto = require('crypto');
const { constants } = require('../constants');

import Page from './page';

class ConfigureLinode extends Page {
  get createHeader() {
    return $('[data-qa-create-linode-header]');
  }

  /** parent headers */
  get createFromDistribution() {
    return $('[data-qa-create-from="Distributions"]');
  }
  get createFromOneClick() {
    return $('[data-qa-create-from=One-Click]');
  }
  get createFromMyImage() {
    return $('[data-qa-create-from="My Images"]');
  }

  /** subtabs under One-Click */
  get createFromOneClickApp() {
    return $('[data-qa-create-from="One-Click Apps"]');
  }
  get createFromCommunityStackScript() {
    return $('[data-qa-create-from="Community StackScripts"]');
  }

  /** subtabs under My Images */
  get createFromImage() {
    return $('[data-qa-create-from="Images"]');
  }
  get createFromBackups() {
    return $('[data-qa-create-from="Backups"]');
  }
  get createFromClone() {
    return $('[data-qa-create-from="Clone Linode"]');
  }
  get createFromMyStackScript() {
    return $('[data-qa-create-from="Account StackScripts"]');
  }

  get selectLinodeHeader() {
    return $('[data-qa-select-linode-header]');
  }
  get noCompatibleImages() {
    return $('[data-qa-no-compatible-images]');
  }

  get showOlderImages() {
    return $('[data-qa-show-more-expanded]');
  }

  get stackScriptSearch() {
    return $('[data-qa-debounced-search] input');
  }

  get selectStackScriptPanel() {
    return $('[data-qa-panel="Select a StackScript"]');
  }
  get myStackScriptTab() {
    return $('[data-qa-tab="Account StackScripts"]');
  }
  get linodeStackScriptTab() {
    return $('[data-qa-tab="Linode StackScripts"]');
  }
  get communityStackScriptTab() {
    return $('[data-qa-tab="Community StackScripts"]');
  }

  get stackScriptTableHeader() {
    return $('[data-qa-stackscript-table-header]');
  }
  get stackScriptDeploysHeader() {
    return $('[data-qa-stackscript-active-deploy-header]');
  }
  get stackScriptRevisionsHeader() {
    return $('[data-qa-stackscript-revision-header]');
  }
  get stackScriptCompatibleImagesHeader() {
    return $('[data-qa-stackscript-compatible-images]');
  }

  get stackScriptRow() {
    return $('[data-qa-table-row]');
  }
  get stackScriptRows() {
    return $$('[data-qa-table-row]');
  }
  get stackScriptTitle() {
    return $('[data-qa-stackscript-title]');
  }
  get stackScriptDeploys() {
    return $('[data-qa-stackscript-deploys]');
  }
  get stackScriptRevision() {
    return $('[data-qa-stackscript-revision]');
  }
  get stackScriptEmptyMsg() {
    return $('[data-qa-stackscript-empty-msg]');
  }

  get userDefinedFieldsHeader() {
    return $('[data-qa-user-defined-field-header]');
  }
  // User defined text field
  // user defined boolean

  get selectRegionHeader() {
    return $('[data-qa-tp="Region"]');
  }

  get regionSelect() { return $('[data-qa-enhanced-select="Regions"] input'); }

  get planHeader() {
    return $('[data-qa-tp="Linode Plan"]');
  }
  get planTabs() {
    return $$('[data-qa-tp="Linode Plan"] [data-qa-tab]');
  }
  get plans() {
    return $$('[data-qa-tp="Linode Plan"] [data-qa-selection-card]');
  }
  get planNames() {
    return $$(
      '[data-qa-tp="Linode Plan"] [data-qa-selection-card] [data-qa-select-card-heading]'
    );
  }

  get labelHeader() {
    return $('[data-qa-label-header]');
  }
  get label() {
    return $('[data-qa-label-header] input');
  }

  get passwordHeader() {
    return $('[data-qa-password-input]');
  }
  get password() {
    return $('[data-qa-password-input] input');
  }

  get sshHeader() {
    return $('[data-qa-table="SSH Keys"]');
  }
  get sshKeys() {
    return $$('[data-qa-ssh-public-key]');
  }

  get addonsHeader() {
    return $('[data-qa-add-ons]');
  }
  get addons() {
    return $$('[data-qa-add-ons] [data-qa-checked]');
  }
  get backupsCheckBox() {
    return $('[data-qa-check-backups]');
  }
  get privateIpCheckbox() {
    return $('[data-qa-check-private-ip]');
  }

  get orderSummary() {
    return $('[data-qa-order-summary]');
  }
  get total() {
    return $('[data-qa-total-price]');
  }
  get deploy() {
    return $('[data-qa-deploy-linode]');
  }

  cloneBaseElemsDisplay() {
    this.notice.waitForDisplayed();
    const notices = $$(this.notice.selector);

    const cloneSLA =
      'This newly created Linode will be created with the same password and SSH Keys (if any) as the original Linode.';
    const cloneFromHeader = 'Select Linode to Clone From';
    const selectLinodePanelText = $$('[data-qa-select-linode-header]').map(h =>
      h.getText()
    );

    expect(notices.map(n => n.getText()))
      .withContext(`text should contain: ${cloneSLA}`)
      .toContain(cloneSLA);
    expect($$('[data-qa-select-linode-header]').length)
      .withContext(``)
      .toBe(1);
    expect(selectLinodePanelText)
      .withContext(``)
      .toContain(cloneFromHeader);
    expect(this.total.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(this.total.getText())
      .withContext(``)
      .toBe('$0.00/mo');
    expect(this.deploy.isDisplayed())
      .withContext(``)
      .toBe(true);
  }

  stackScriptsBaseElemsDisplay(stackScriptTab) {
    this.selectStackScriptPanel.waitForDisplayed(constants.wait.normal);
    expect(stackScriptTab.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(stackScriptTab.getAttribute('aria-selected'))
      .withContext(``)
      .toBe('true');
    expect(this.regionSelect).toBeVisible();
    expect(this.selectRegionHeader.isDisplayed())
      .withContext(``)
      .toBe(true);

    expect(this.planHeader.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(this.planTabs.length)
      .withContext(``)
      .toBe(4);
    expect(this.plans.length)
      .withContext(``)
      .toBeGreaterThan(0);

    expect(this.label.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(this.labelHeader.isDisplayed())
      .withContext(``).toBe(true);

    expect(this.passwordHeader.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(this.password.isDisplayed())
      .withContext(``)
      .toBe(true);

    expect(this.addonsHeader.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(this.addons.length)
      .withContext(``)
      .toBe(2);
  }

  selectFirstStackScript() {
    return $(`${this.stackScriptRow.selector} [data-qa-radio]`);
  }

  stackScripShowDetails(title) {
    const selector = this.stackScriptRow.selector.replace(']', '');
    if (title) {
      $(`${selector}="${title}"] button`).click();
    } else {
      $$(`${this.stackScriptRow.selector} button`)[0].click();
    }
  }

  stackScriptTableDisplay() {
    this.stackScriptTableHeader.waitForDisplayed(constants.wait.normal);
    if (browser.getUrl().includes('/stackscripts')) {
      this.stackScriptDeploysHeader.waitForDisplayed(constants.wait.normal);
      this.stackScriptRevisionsHeader.waitForDisplayed(constants.wait.normal);
      this.stackScriptCompatibleImagesHeader.waitForDisplayed(
        constants.wait.normal
      );
    }
  }

  stackScriptMetadataDisplay() {
    this.stackScriptRows.forEach(r => {
      expect(r.$(this.stackScriptTitle.selector).getText())
        .withContext(``)
        .toMatch(/./g);
      expect(r.$(this.stackScriptDeploys.selector).getText())
        .withContext(``)
        .toMatch(/./g);
      expect(r.$(this.stackScriptRevision.selector).getText())
        .withContext(``)
        .toMatch(/./g);
    });
  }

  baseDisplay() {
    expect(this.createHeader.waitForDisplayed(constants.wait.normal))
      .withContext(``)
      .toBe(true);

    expect(this.createFromDistribution.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(this.createFromOneClick.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(this.createFromMyImage.isDisplayed())
      .withContext(``)
      .toBe(true);

    expect(this.selectImageHeader.isDisplayed())
      .withContext(``)
      .toBe(true);
    this.imageTabs.forEach(tab =>
      expect(tab.isDisplayed())
        .withContext(``)
        .toBe(true));
    this.images.forEach(i =>
      expect(i.isDisplayed())
        .withContext(``)
        .toBe(true));
    expect(this.showOlderImages.isDisplayed())
      .withContext(``)
      .toBe(true);
    console.log('checking region')
    expect(this.regionSelect.isDisplayed())
      .withContext(``)
      .toBe(true);
    console.log('checking plan options')
    expect(this.planHeader.isDisplayed())
      .withContext(``)
      .toBe(true);
    this.planTabs.forEach(tab =>
      expect(tab.isDisplayed())
      .withContext(``)
      .toBe(true));
    this.plans.forEach(p =>
      expect(p.isDisplayed())
        .withContext(``)
        .toBe(true));
    console.log('checking label')
    expect(this.labelHeader.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(this.label.isDisplayed())
      .withContext(``)
      .toBe(true);

    expect(this.multiSelect.isDisplayed())
      .withContext(``)
      .toBe(true);

    expect(this.passwordHeader.isDisplayed())
      .withContext(``)
      .toBe(true);
    expect(this.password.isDisplayed())
      .withContext(``)
      .toBe(true);

    expect(this.addonsHeader.isDisplayed()).toBe(true);
    this.addons.forEach(a =>
      expect(a.isDisplayed())
        .withContext(``)
        .toBe(true));
  }
  // Configure a basic linode, selecting all the default options
  generic(label = `Test-Linode${new Date().getTime()}`) {
    this.images[0].click();
    this.regionSelect.setValue('us-east');
    browser.keys("\uE007");

    this.plans[0].click();
    this.label.setValue(label);
    this.password.setValue(`SomeTimeStamp${new Date().getTime()}`);
  }

  selectRegion(region) {
    this.generic();
    this.regionSelect.setValue(region);
    browser.keys("\uE007");
  }

  selectImage(imageName) {
    const requestedImage = $(`[data-qa-select-card-heading="${imageName}"]`);
    requestedImage.click();
  }

  selectPlanTab(planType) {
    const initialPlans = this.plans.length;

    this.planHeader.$(`[data-qa-tab="${planType}"]`).click();

    browser.waitUntil(function() {
      return (
        $$('[data-qa-tp="Linode Plan"] [data-qa-selection-card]').length !==
        initialPlans
      );
    }, 5000);
  }

  selectPlan(planIndex = 0) {
    const planElement = this.plans[planIndex];
    planElement.click();
    browser.waitUntil(
      function() {
        return planElement
          .$('[data-qa-checked]')
          .getAttribute('data-qa-checked')
          .includes('true');
      },
      5000,
      'Failed to select plan'
    );
  }

  cloneSelectSource(linodeLabel) {
    const sourceSection = $$('[data-qa-select-linode-panel]');
    expect(sourceSection[0].$('[data-qa-select-linode-header]').getText())
      .withContext(``)
      .toBe('Select Linode to Clone From');
    // const targetSection = $$('[data-qa-select-linode-panel]')
    // .filter(s => s.$('[data-qa-select-linode-header]').getText() === 'Select Target Linode');

    let linodes = sourceSection[0].$$('[data-qa-selection-card]');
    let sourceLinode = linodes[0];
    let sourceLabel = sourceLinode.$('[data-qa-select-card-heading]').getText();
    sourceLinode.click();

    // let targetLinodeCard = targetSection[0].$$('[data-qa-selection-card]')
    // .filter(c => c.$('[data-qa-select-card-heading]').getText() === sourceLabel);
    // expect(targetLinodeCard[0].getAttribute('class')).toContain('disabled');

    if (linodeLabel) {
      linodes = sourceSection[0]
        .$$('[data-qa-selection-card]')
        .filter(
          l => l.$('[data-qa-select-card-heading]').getText() === linodeLabel
        );
      sourceLinode = linodes[0];
      sourceLabel = sourceLinode.$('[data-qa-select-card-heading]').getText();

      sourceLinode.click();

      // targetLinodeCard = targetSection[0].$$('[data-qa-selection-card]')
      // .filter(c => c.$('[data-qa-select-card-heading]').getText() === sourceLabel);

      // expect(targetLinodeCard[0].getAttribute('class')).toContain('disabled');
    }
  }

  cloneSelectTarget(linodeLabel) {
    if (linodeLabel) {
      const targetSection = $$('[data-qa-select-linode-panel]').filter(
        s =>
          s.$('[data-qa-select-linode-header]').getText() ===
          'Select Target Linode'
      );
      const linodes = targetSection[0]
        .$$('[data-qa-selection-card]')
        .filter(
          l => l.$('[data-qa-select-card-heading]').getText() === linodeLabel
        );
      linodes[0].click();
    } else {
      const cloneToNewCard = $('[data-qa-select-card-heading="New Linode"]');
      cloneToNewCard.click();
      $('[data-qa-tp="Region"]').waitForDisplayed();
      $('[data-qa-tp="Linode Plan"]').waitForDisplayed();
      $('[data-qa-label-header]').waitForDisplayed();
    }
  }

  createFrom(source) {
    const sourceSelector = `[data-qa-create-from="${source}"]`;
    $(sourceSelector).waitForDisplayed(constants.wait.normal);
    $(sourceSelector).click();
    browser.waitUntil(
      function() {
        return browser
          .getAttribute(sourceSelector, 'aria-selected')
          .includes('true');
      },
      constants.wait.normal,
      'Failed to change tab of linode create source'
    );
  }

  randomPassword() {
    this.password.setValue(crypto.randomBytes(20).toString('hex'));
  }
}
export default new ConfigureLinode();
