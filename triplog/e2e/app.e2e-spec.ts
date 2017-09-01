import { TriplogPage } from './app.po';

describe('triplog App', function() {
  let page: TriplogPage;

  beforeEach(() => {
    page = new TriplogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
