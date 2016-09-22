import { TutorialPage } from './app.po';

describe('tutorial App', function() {
  let page: TutorialPage;

  beforeEach(() => {
    page = new TutorialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
