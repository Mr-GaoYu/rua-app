import sanitize from 'sanitize-html';
import { allowedHTMLAttr, allowedHTMLTags } from 'src/constants';

export const sanitizeHTML = (text: string) =>
    sanitize(text, {
        allowedTags: allowedHTMLTags,
        allowedAttributes: {
            '*': allowedHTMLAttr
        },
        allowedClasses: {
            span: ['version']
        },
        disallowedTagsMode: 'escape',
        transformTags: {
            a: (tagName, attribs) => {
                const href = attribs.href ?? '';
                if (href && !isURLValid(href)) {
                    return {
                        tagName: 'span',
                        attribs: {}
                    };
                }
                return {
                    tagName,
                    attribs
                };
            }
        }
    }).trim()

export const isURLValid = (url: string) =>
    offSiteURL.test(url) || onSiteURL.test(url);

export const offSiteURL = /(?=.{1,2000}$)((\s)*((ht|f)tp(s?):\/\/|mailto:)[A-Za-z0-9]+[~a-zA-Z0-9-_\.@\#\$%&amp;;:,\?=/\+!\(\)]*(\s)*)/;
export const onSiteURL = /^([A-Za-z0-9/\.\?=&\-~]){1,2000}$/;