
export type Theme = {

    /**Main colors
     */
    background: string,
    signatureFont: string,
    textFont: string,
    
    /**Button fonts
     */
    buttonFont: string,
    buttonFontHover: string,

    /**Accent colors for the containers
     */
    accent1: string,
    accent1Hover: string,
    accent2: string,
    accent2Hover: string,
    accent3: string,
    accent3Hover: string,

    /**Category list items
     */
    categoryBackground: string,
    categoryFont: string,

    /**Colors for the funniness controller
     */
    like: string,
    likeHover: string,
    likeClicked: string,
    dislike: string,
    dislikeHover: string,
    dislikeClicked: string,
    funninessFont: string,

    /**Error banner colors
     */
    errorBackground: string,
    errorFont: string,
    errorCloseButtonBackground: string,
    errorCloseButtonFont: string,
    errorCloseButtonBackgroundHover: string
}