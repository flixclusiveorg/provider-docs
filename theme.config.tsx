import {
    defineTheme,
    directory,
    group,
    link,
    siteTemplate,
    social
} from '@neato/guider/theme';
import { Logo } from './components/Logo';
import faviconUrl from "./public/favicon.ico";

const template = siteTemplate({
    github: 'flixclusiveorg/Flixclusive',
    navigation: [
        link('Discord', 'https://discord.gg/CM2GPXgwax', {
            style: 'star',
            newTab: true,
            icon: 'ic:baseline-discord',
        })
    ],
    settings: {
        logo: () => <Logo />,
        backgroundPattern: 'flare',
        colors: {
            primary: '#b39edb',
            primaryLighter: '#d8d1e6',
            primaryDarker: '#6d39d1',
            background: '#151017',
            backgroundLighter: '#271e2b',
            backgroundLightest: '#392d3e',
            backgroundDarker: '#030203',
            line: '#4d3e52',
            text: '#a098a3',
            textLighter: '#b7b3b9',
            textHighlight: '#fff'
        },
    },
    contentFooter: {
        editRepositoryBase: 'https://github.com/flixclusiveorg/provider-docs/tree/main',
        socials: [
            social.discord('https://discord.gg/7yPSPveReu'),
            social.github('https://github.com/flixclusive/Flixclusive'),
        ],
    },
    meta: {
        titleTemplate: '%s - Flixclusive Docs',
        additionalLinkTags: [
            {
                href: faviconUrl.src,
                rel: "icon",
                type: "image/x-icon",
            },
        ],
    },
});

export default defineTheme({
    extends: [template],
    directories: [
        directory('main', {
            sidebar: [
                link('Template repository', 'https://github.com/flixclusiveorg/provider-template', {
                    style: 'star',
                    newTab: true,
                    icon: 'akar-icons:github-fill',
                }),
                link('API reference', 'https://flixclusiveorg.github.io/core-stubs/', {
                    style: 'star',
                    newTab: true,
                    icon: 'carbon:api-1',
                }),
                group('Getting started', [
                    link('Installation', '/getting-started/installation'),
                    link('Development', '/getting-started/development'),
                ]),
                group('Provider', [
                    link('Overview', '/provider/overview'),
                    link('Configuration', '/provider/configuration'),
                    link('Creating a provider', '/provider/create_provider'),
                    link('Testing a provider', '/provider/test_provider'),
                ]),
                group('Implementation', [
                    link('Settings UI', '/impl/impl_settings'),
                    link('Search filters', '/impl/impl_filters'),
                    link('Searching media', '/impl/searching_media'),
                    link('Fetching metadata', '/impl/fetching_metadata'),
                    link('Loading catalogs', '/impl/loading_catalogs'),
                    link('Fetching media links', '/impl/fetching_links'),
                ]),
                group('Best practices', [
                    link('Convenience methods', '/best_practices/convenience_methods'),
                    link('Coding style', '/best_practices/coding_style'),
                    link('Development preferences', '/best_practices/dev_prefs'),
                ]),
                group('Advanced', [
                    link('WebView', '/advanced/webview'),
                    link('Unsupported libraries', '/advanced/unsupported_libs'),
                ]),
            ],
        })
    ]
})