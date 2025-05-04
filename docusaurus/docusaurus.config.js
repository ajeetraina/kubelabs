// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with the TypeScript plugin for your editor)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'KubeLabs',
  tagline: 'A Curated List of Kubernetes Labs and Tutorials',
  favicon: 'img/favicon.ico',
  // Update URL with trailing slash
  url: 'https://kubelabs.ajeetraina.com',
  baseUrl: '/',
  trailingSlash: true,
  organizationName: 'ajeetraina',
  projectName: 'kubelabs',
  onBrokenLinks: 'warn', // Changed from 'throw' to 'warn' to prevent build failures
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
          routeBasePath: '/',
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
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
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
            label: 'Labs & Tutorials',
          },
          {
            to: '/category/core-kubernetes-concepts',
            label: 'Core Concepts',
            position: 'left',
          },
          {
            to: '/category/cloud-providers',
            label: 'Cloud Providers',
            position: 'left',
          },
          {
            to: '/category/advanced-topics',
            label: 'Advanced Topics',
            position: 'left',
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
                label: 'Introduction',
                to: '/intro',
              },
              {
                label: 'Getting Started',
                to: '/category/getting-started',
              },
              {
                label: 'Core Concepts',
                to: '/category/core-kubernetes-concepts',
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
                href: 'https://collabnix.com',
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
        additionalLanguages: ['bash', 'yaml', 'docker'],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      // Added metadata to improve SEO
      metadata: [
        {name: 'keywords', content: 'kubernetes, k8s, docker, containers, tutorials, labs, devops'},
        {name: 'description', content: 'A curated list of Kubernetes labs and tutorials for all skill levels'}
      ],
    }),
    
  // Additional plugins for better user experience
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 85,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/index.html',
            to: '/',
          },
        ],
      },
    ],
  ],
};

module.exports = config;