// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with the TypeScript plugin for your editor)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KubeLabs',
  tagline: 'A Curated List of Kubernetes Labs and Tutorials',
  favicon: 'img/favicon.ico',
  url: 'https://kubelabs.ajeetraina.com',
  baseUrl: '/',
  organizationName: 'ajeetraina',
  projectName: 'kubelabs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/ajeetraina/kubelabs/tree/master/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/ajeetraina/kubelabs/tree/master/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/kubernetes-logo.png',
      navbar: {
        title: 'KubeLabs',
        logo: {
          alt: 'KubeLabs Logo',
          src: 'img/kubernetes-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorials',
          },
          {
            href: 'https://github.com/ajeetraina/kubelabs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://launchpass.com/collabnix',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/QEkCXAXYSe',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/collabnix',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'https://collabnix.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/collabnix/kubelabs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} KubeLabs, Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};

module.exports = config;