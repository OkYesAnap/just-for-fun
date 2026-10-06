export const TAG = {
    code: '\n```',
    table: '\n|',
    starThree: '***',
    starTwoBold: '**',
    starOneItalic: '*',
    headOne: '\n# ',
    headTwo: '\n## ',
    headThree: '\n### ',
    headFour: '\n#### ',
    headFive: '\n##### ',
    headSix: '\n###### ',
    link: '[',
};

export const TEMP_TAGS = {
    [TAG.code]: `_THEE_APOSTROPHE_CODE_`,
    [TAG.table]: '_TABLE_',
    [TAG.starThree]: '_STAR_THREE_',
    [TAG.starTwoBold]: '_STARS_TWO_BOLD_',
    [TAG.starOneItalic]: '_STAR_ONE_ITALIC_',
    [TAG.headOne]: '_HASH_ONE_HEADER_',
    [TAG.headTwo]: '_HASH_TWO_HEADER_',
    [TAG.headThree]: '_HASH_THREE_HEADER_',
    [TAG.headFour]: '_HASH_FOUR_HEADER_',
    [TAG.headFive]: '_HASH_FIVE_HEADER_',
    [TAG.headSix]: '_HASH_SIX_HEADER_',
    [TAG.link]: '_LINK_',
};