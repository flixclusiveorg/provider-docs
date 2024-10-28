import {
    defineTheme,
    directory,
    group,
    link,
    siteTemplate,
    social
} from '@neato/guider/theme';
import { Logo } from './components/Logo';

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
        editRepositoryBase: '',
        socials: [
            social.discord('https://discord.gg/7yPSPveReu'),
            social.github('https://github.com/flixclusive/Flixclusive'),
        ],
    },
    meta: {
        titleTemplate: '%s - Flixclusive Docs',
        additionalLinkTags: [
            {
                rel: 'icon',
                href: '/favicon.png',
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
                link('Stubs repository', 'https://github.com/flixclusiveorg/core-stubs?tab=readme-ov-file#provider-stubs-and-utilities', {
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
                ]),
            ],
        })
    ]
})