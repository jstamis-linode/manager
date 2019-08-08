const { navigateToStory, executeInAllStories } = require('../../../e2e/utils/storybook');
const { constants } = require('../../../e2e/constants');

describe('Tags Panel Suite', () => {
    const component = 'Tags Panel';
    const childStories = ['Tags panel with tags', 'Tags panel without tags'];
    const tag = '[data-qa-tag]';
    const deleteTag = '[data-qa-delete-tag]';
    const addTag = '[data-qa-add-tag]';
    const tagsSelect = '[data-qa-enhanced-select]';
    const addTagParagraph = '[data-qa-tag-p]'

    beforeAll(() => {
        navigateToStory(component, childStories[0]);
    });

    it('there should be a tag panel, and icons to add and delete tags', () => {
        $(tag).waitForDisplayed(constants.wait.normal);
        expect($$(tag).length)
          .withContext(`Should be 3 tags`)
          .toBe(3);
        expect($$(deleteTag).length)
          .withContext(`Should be 3 delete tag icons`)
          .toBe(3);
        expect($(addTag).isDisplayed())
          .withContext(`Plus symbol should be visible`)
          .toBe(true);
        expect($(addTagParagraph).isDisplayed())
          .withContext(`'Add New Tag' p element should be displayed`)
    });

    it('a tag can be deleted', () => {
        $('[data-qa-tag="tagTwo"] [data-qa-delete-tag]').click();
        browser.waitUntil(() => {
            return $$(tag).length == 2
        }, constants.wait.normal);
        expect($('[data-qa-tag="tagTwo"]').isExisting())
          .withContext(`Tag Two should not exist in the DOM`)
          .toBe(false)
    });

    it('a tag can be added', () => {
        executeInAllStories(component,childStories, () => {
            $(addTag).waitForDisplayed(constants.wait.normal);
            const startTags = $$(tag).length
            $(addTag).click();
            $(tagsSelect).waitForDisplayed(constants.wait.normal);
            const testTag = "TEST_TAG";
            const createTagSelect = $(tagsSelect).$('..').$('input');
            createTagSelect.waitForDisplayed(constants.wait.normal);
            createTagSelect.setValue(testTag);
            createTagSelect.addValue('\uE007');
            browser.waitUntil(() => {
                return $$(tag).length == startTags + 1
            }, constants.wait.normal);
            expect($$(tag).find(tagName => tagName.getText() === testTag)).not.toBeNull();
        });
    });


});
