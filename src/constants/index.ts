const PRODUCTION = 'production';

/** native to webpack build */
export const isProductionBuild = process.env.NODE_ENV === PRODUCTION;

export const allowedHTMLAttr = ['href', 'lang', 'title', 'align'];

export const allowedHTMLTags = [
    'a',
    'abbr',
    'acronym',
    'b',
    'blockquote',
    'br',
    'code',
    'del',
    'em',
    'hr',
    'i',
    'li',
    'ol',
    'ul',
    'p',
    'pre',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'span',
    'strong',
    'table',
    'tbody',
    'td',
    'th',
    'thead',
    'tr'
  ];