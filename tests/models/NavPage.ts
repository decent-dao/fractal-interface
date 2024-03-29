import { FractalPage } from './FractalPage';

/**
 * A Fractal page that contains the standard left and top navigation menus, which
 * could include context dependent buttons such as Home, DAO Hierarchy, Proposals,
 * and Treasury.
 */
export abstract class NavPage extends FractalPage {
  async clickFractalLogo() {
    await this.click('a[href="/"]');
  }

  async enterSearchTerm(term: string) {
    await this.fillTextByTestId('search-input', term);
    await this.waitForIdle();
  }

  async clickSearchViewDAO() {
    await this.click('search-viewDAO');
  }

  async clickFavoritesMenu() {
    await this.clickTestId('header-favoritesLink');
  }

  async clickFavoriteMenuFavorite(displayName: string) {
    await this.clickTestId('favorites-' + displayName);
  }

  async clickAccountMenu() {
    await this.clickTestId('header-accountMenu');
  }

  async clickAccountCopyAddress() {
    await this.clickTestId('walletMenu-accountDisplay');
  }

  async clickAccountAvatar() {
    await this.clickTestId('walletMenu-avatar');
  }

  async clickAccountConnect() {
    await this.clickTestId('accountMenu-connect');
  }

  async clickAccountDisconnect() {
    await this.clickTestId('accountMenu-disconnect');
  }

  //
  // Left menu options
  //

  async clickNavHome() {
    await this.clickTestId('navigation-daoHomeLink');
  }

  async clickNavDAOHierarchy() {
    await this.clickTestId('navigation-hierarchy');
  }

  async clickNavProposals() {
    await this.clickTestId('navigation-proposalsLink');
  }

  async clickNavTreasury() {
    await this.clickTestId('navigation-treasuryLink');
  }

  async clickNavFAQ() {
    await this.clickTestId('navigation-treasuryLink');
  }

  async clickNavDiscord() {
    await this.clickTestId('navigationExternal-discord');
  }

  async clickNavDocs() {
    await this.clickTestId('navigationExternal-documentation');
  }

  async clickNavLanguage() {
    await this.clickTestId('navigation-language');
  }

  async clickNavLanguageOption(language: string) {
    await this.clickTestId('optionMenu-' + language);
  }
}
