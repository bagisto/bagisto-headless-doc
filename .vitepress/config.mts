import { defineConfig } from "vitepress";
import { redirects, makeRedirectHtml } from "./_redirects";
import fs from "fs";
import path from "path";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    lang: "en-US",
    cleanUrls: true,
    title: " ",
    description: " ",
    ignoreDeadLinks: true,
    vite: {
      server: {
        host: "0.0.0.0",
      },
    },

    srcDir: "./src",

    markdown: {
      config: (md) => { },
    },

    mermaid: {},

    themeConfig: {
      logo: {
        light: "/logo.png",
        dark: "/logo.png",
      },

      nav: [
        { text: "User Guide", link: "https://docs.bagisto.com/" },
        { text: "Extensions", link: "https://bagisto.com/en/extensions/" },
        { text: "Community Forum", link: "https://forums.bagisto.com/" },
        { text: "Contact Us", link: "https://bagisto.com/en/contacts/" },
      ],

      editLink: {
        pattern:
          "https://github.com/bagisto/bagisto-headless-doc/edit/main/src/:path",
        text: "Help us improve this page on Github.",
      },

      lastUpdated: {
        text: "Last Updated",
        formatOptions: {
          dateStyle: "full",
        },
      },

      sidebar: [
        {
          text: "Bagisto Headless eCommerce",
          collapsed: true,
          items: [
            {
              text: "Overview",
              collapsed: false,
              items: [
                {
                  text: "Introduction",
                  link: "/bagisto-headless-ecommerce/overview/introduction.md",
                },
                {
                  text: "What is Bagisto Headless?",
                  link: "/bagisto-headless-ecommerce/overview/what-is-bagisto-headless.md",
                },
                { text: "Why GraphQL?", link: "/bagisto-headless-ecommerce/overview/why-graphql.md" },
                { text: "Why Next.js?", link: "/bagisto-headless-ecommerce/overview/why-nextjs.md" },
                {
                  text: "Architecture Overview",
                  link: "/bagisto-headless-ecommerce/overview/architecture-overview.md",
                  items: [
                    {
                      text: "Component Structure",
                      link: "/bagisto-headless-ecommerce/overview/architecture-overview/component-structure.md"
                    },
                    {
                      text: "Reusable Components",
                      link: "/bagisto-headless-ecommerce/overview/architecture-overview/reusable-components.md"
                    },
                    {
                      text: "Layout Components",
                      link: "/bagisto-headless-ecommerce/overview/architecture-overview/layout-components.md"
                    },
                    {
                      text: "Feature Components",
                      link: "/bagisto-headless-ecommerce/overview/architecture-overview/feature-components.md"
                    }
                  ]
                },
                {
                  text: "Prerequisites",
                  link: "/bagisto-headless-ecommerce/overview/prerequisites.md",
                },
              ],
            },
            {
              text: "Getting Started",
              collapsed: false,
              items: [
                {
                  text: "Installation",
                  link: "/bagisto-headless-ecommerce/getting-started/quick-start-guide.md",
                },
                {
                  text: "Project Setup",
                  link: "/bagisto-headless-ecommerce/getting-started/project-setup.md",
                },
                {
                  text: "Environment Variables",
                  link: "/bagisto-headless-ecommerce/getting-started/environment-variables.md",
                },
              ],
            },
            {
              text: "GraphQL Client Configuration",
              collapsed: false,
              items: [
                {
                  text: "Apollo Client Setup",
                  link: "/bagisto-headless-ecommerce/apollo-client/apollo-setup.md",
                },
                {
                  text: "Apollo Wrapper Provider",
                  link: "/bagisto-headless-ecommerce/apollo-client/apollo-wrapper.md",
                },
                {
                  text: "GraphQL Request Utility",
                  link: "/bagisto-headless-ecommerce/apollo-client/request-utility.md",
                },
                {
                  text: "Cache Lifetime Options",
                  link: "/bagisto-headless-ecommerce/apollo-client/cache-options.md",
                },
              ],
            },
            {
              text: "Authentication & Authorization",
              collapsed: false,
              items: [
                {
                  text: "NextAuth.js Integration",
                  link: "/bagisto-headless-ecommerce/authentication/nextauth-setup.md",
                },
                {
                  text: "Authentication Flow",
                  link: "/bagisto-headless-ecommerce/authentication/auth-flow.md",
                },
                {
                  text: "Protected Routes",
                  link: "/bagisto-headless-ecommerce/authentication/protected-routes.md",
                },
                {
                  text: "Customer Authentication",
                  link: "/bagisto-headless-ecommerce/authentication/customer-auth.md",
                },
              ],
            },
            {
              text: "GraphQL Schema & Operations",
              collapsed: false,
              items: [
                {
                  text: "Understanding the Schema",
                  link: "/bagisto-headless-ecommerce/graphql-schema/overview.md",
                },
                {
                  text: "Organizing Operations",
                  link: "/bagisto-headless-ecommerce/graphql-schema/organizing-operations.md",
                },
                {
                  text: "GraphQL Operations",
                  collapsed: true,
                  items: [
                    {
                      text: "Fragments",
                      link: "/bagisto-headless-ecommerce/graphql-schema/graphql-operations/fragments.md",
                    },
                    {
                      text: "Queries",
                      link: "/bagisto-headless-ecommerce/graphql-schema/graphql-operations/queries.md",
                    },
                    {
                      text: "Mutations",
                      link: "/bagisto-headless-ecommerce/graphql-schema/graphql-operations/mutations.md",
                    },
                  ],
                },
              ],
            },
            {
              text: "E-Commerce Features",
              collapsed: false,
              items: [
                {
                  text: "Product Catalog",
                  collapsed: true,
                  items: [
                    {
                      text: "Product Listing",
                      collapsed: true,
                      items: [
                        {
                          text: "Fetching Products",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-listing/fetching-products.md",
                        },
                        {
                          text: "Implementing Filters",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-listing/implementing-filters.md",
                        },
                        {
                          text: "Pagination Strategies",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-listing/pagination-strategies.md",
                        },
                        {
                          text: "Search Functionality",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-listing/search-functionality.md",
                        },
                        {
                          text: "Performance",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-listing/performance.md",
                        },
                        {
                          text: "Best Practices",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-listing/best-practices.md",
                        },
                      ],
                    },
                    {
                      text: "Product Details",
                      collapsed: true,
                      items: [
                        {
                          text: "Fetching single product",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-details/fetching-single-product.md",
                        },
                        {
                          text: "Product variants",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-details/product-variants.md",
                        },
                        {
                          text: "Product images",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-details/product-images.md",
                        },
                        {
                          text: "Related products",
                          link: "/bagisto-headless-ecommerce/features/catalog/product-details/related-products.md",
                        },
                      ],
                    },
                    {
                      text: "Categories",
                      collapsed: true,
                      items: [
                        {
                          text: "Category tree structure",
                          link: "/bagisto-headless-ecommerce/features/catalog/categories/category-tree.md",
                        },
                        {
                          text: "Category products",
                          link: "/bagisto-headless-ecommerce/features/catalog/categories/category-products.md",
                        },
                        {
                          text: "Category filtering",
                          link: "/bagisto-headless-ecommerce/features/catalog/categories/category-filtering.md",
                        },
                      ],
                    },
                  ],
                },
                {
                  text: "Shopping Cart",
                  collapsed: true,
                  items: [
                    {
                      text: "Cart State Management",
                      collapsed: true,
                      items: [
                        {
                          text: "Redux integration",
                          link: "/bagisto-headless-ecommerce/features/cart/state-management/redux-integration.md",
                        },
                        {
                          text: "Cart actions and reducers",
                          link: "/bagisto-headless-ecommerce/features/cart/state-management/actions-reducers.md",
                        },
                        {
                          text: "Cart persistence",
                          link: "/bagisto-headless-ecommerce/features/cart/state-management/cart-persistence.md",
                        },
                        {
                          text: "Cart synchronization",
                          link: "/bagisto-headless-ecommerce/features/cart/state-management/cart-synchronization.md",
                        },
                      ],
                    },
                    {
                      text: "Cart Operations",
                      collapsed: true,
                      items: [
                        {
                          text: "Add to cart",
                          link: "/bagisto-headless-ecommerce/features/cart/cart-operations/add-to-cart.md",
                        },
                        {
                          text: "Update cart item",
                          link: "/bagisto-headless-ecommerce/features/cart/cart-operations/update-cart-item.md",
                        },
                        {
                          text: "Remove from cart",
                          link: "/bagisto-headless-ecommerce/features/cart/cart-operations/remove-from-cart.md",
                        },
                        {
                          text: "Clear cart",
                          link: "/bagisto-headless-ecommerce/features/cart/cart-operations/clear-cart.md",
                        },
                      ],
                    },
                  ],
                },
                {
                  text: "Checkout Process",
                  collapsed: true,
                  items: [
                    {
                      text: "Checkout Flow",
                      collapsed: true,
                      items: [
                        {
                          text: "Multi-step checkout",
                          link: "/bagisto-headless-ecommerce/features/checkout/checkout-flow/multi-step-checkout.md",
                        },
                        {
                          text: "Guest checkout",
                          link: "/bagisto-headless-ecommerce/features/checkout/checkout-flow/guest-checkout.md",
                        },
                        {
                          text: "Registered customer checkout",
                          link: "/bagisto-headless-ecommerce/features/checkout/checkout-flow/registered-customer-checkout.md",
                        },
                        {
                          text: "Checkout validation",
                          link: "/bagisto-headless-ecommerce/features/checkout/checkout-flow/checkout-validation.md",
                        },
                      ],
                    },
                    {
                      text: "Shipping & Billing",
                      collapsed: true,
                      items: [
                        {
                          text: "Address management",
                          link: "/bagisto-headless-ecommerce/features/checkout/shipping-billing/address-management.md",
                        },
                        {
                          text: "Billing information",
                          link: "/bagisto-headless-ecommerce/features/checkout/shipping-billing/billing-information.md",
                        },
                        {
                          text: "Address validation",
                          link: "/bagisto-headless-ecommerce/features/checkout/shipping-billing/address-validation.md",
                        },
                        {
                          text: "Shipping methods",
                          link: "/bagisto-headless-ecommerce/features/checkout/shipping-billing/shipping-methods.md",
                        },
                      ],
                    },
                    {
                      text: "Payment Integration",
                      collapsed: true,
                      items: [
                        {
                          text: "Payment methods",
                          link: "/bagisto-headless-ecommerce/features/checkout/payment-integration/payment-methods.md",
                        },
                        {
                          text: "Payment processing",
                          link: "/bagisto-headless-ecommerce/features/checkout/payment-integration/payment-processing.md",
                        },
                        {
                          text: "Order confirmation",
                          link: "/bagisto-headless-ecommerce/features/checkout/payment-integration/order-confirmation.md",
                        },
                      ]
                    },
                  ],
                },
              ],
            },
            {
              text: "Advanced Topics",
              collapsed: true,
              items: [
                {
                  text: "SEO Optimization",
                  link: "/bagisto-headless-ecommerce/advanced/seo-optimization.md",
                },
                {
                  text: "Performance Optimization",
                  link: "/bagisto-headless-ecommerce/advanced/performance-optimization.md",
                },
                {
                  text: "Caching Strategies",
                  collapsed: true,
                  items: [
                    {
                      text: "Next.js Caching",
                      link: "/bagisto-headless-ecommerce/advanced/caching-strategies/nextjs-caching.md"
                    },
                    {
                      text: "GraphQL Caching",
                      link: "/bagisto-headless-ecommerce/advanced/caching-strategies/graphql-caching.md"
                    },
                    {
                      text: "Revalidation Strategies",
                      link: "/bagisto-headless-ecommerce/advanced/caching-strategies/revalidation-strategies.md"
                    }
                  ]
                },
              ],
            },
            {
              text: "TypeScript",
              collapsed: true,
              items: [
                {
                  text: "Type Definitions",
                  link: "/bagisto-headless-ecommerce/typescript/type-definitions.md"
                },
                {
                  text: "Typed Queries & Mutations",
                  link: "/bagisto-headless-ecommerce/typescript/typed-queries-mutations.md"
                },
                {
                  text: "Component Props Typing",
                  link: "/bagisto-headless-ecommerce/typescript/component-props-typing.md"
                }
              ]
            },
            {
              text: "Best Practices",
              collapsed: true,
              items: [
                {
                  text: "Code Organization",
                  link: "/bagisto-headless-ecommerce/best-practices/code-organization.md"
                },
                {
                  text: "Error Handling",
                  link: "/bagisto-headless-ecommerce/best-practices/error-handling.md"
                },
                {
                  text: "Code Quality",
                  link: "/bagisto-headless-ecommerce/best-practices/code-quality.md"
                }
              ]
            }
          ],
        },
         {
          text: "Bagisto Native Framework",
          collapsed: true,
          items: [
            // 1. Introduction
            {
              text: "Introduction",
              collapsed: true,
              items: [
                {
                  text: "What is Bagisto Native",
                  link: "/bagisto-native/introduction/what-is-bagisto-native.md",
                },
                {
                  text: "Why Bagisto Native",
                  link: "/bagisto-native/introduction/why-bagisto-native.md",
                },
                {
                  text: "When to Use Bagisto Native",
                  link: "/bagisto-native/introduction/when-to-use-bagisto-native.md",
                },
                {
                  text: "Supported Ecosystems",
                  link: "/bagisto-native/introduction/supported-ecosystems.md",
                  items: [
                    {
                      text: "Bagisto Headless",
                      link: "/bagisto-native/introduction/supported-ecosystem/bagisto-headless.md",
                    },
                    {
                      text: "Any Api Driven Backend",
                      link: "/bagisto-native/introduction/supported-ecosystem/any-api-driven-backend.md",
                    }
                  ]
                },
                {
                  text: "Core Philosophy",
                  link: "/bagisto-native/introduction/core-philosophy.md",
                  items: [
                    {
                      text: "Native First",
                      link: "/bagisto-native/introduction/core-philosophy/native-first.md",
                    },
                    {
                      text: "Headless First",
                      link: "/bagisto-native/introduction/core-philosophy/headless-first.md",
                    },
                    {
                      text: "Web → Native bridge",
                      link: "/bagisto-native/introduction/core-philosophy/web-native-bridge.md",
                    }
                  ]
                },
              ],
            },
            // 2. Concepts & Architecture
            {
              text: "Concepts & Architecture",
              collapsed: true,
              items: [
                {
                  text: "High-level Architecture",
                  link: "/bagisto-native/concepts-architecture/high-level-architecture.md",
                },
                {
                  text: "Web ↔ Native Communication Flow",
                  link: "/bagisto-native/concepts-architecture/web-native-communication-flow.md",
                },
                {
                  text: "Roles of Components",
                  link: "/bagisto-native/concepts-architecture/roles-of-components.md",
                  items: [
                    {
                      text: "Bagisto Backend",
                      link: "/bagisto-native/concepts-architecture/role/bagisto-backend.md",
                    },
                    {
                      text: "Bagisto Headless",
                      link: "/bagisto-native/concepts-architecture/role/bagisto-headless.md",
                    },
                    {
                      text: "Bagisto Native Framework",
                      link: "/bagisto-native/concepts-architecture/role/bagisto-native-framework.md",
                    },
                    {
                      text: "Native Apps (iOS / Android)",
                      link: "/bagisto-native/concepts-architecture/role/native-apps.md",
                    }
                  ]
                },
                {
                  text: "Hotwire & Turbo Native",
                  link: "/bagisto-native/concepts-architecture/hotwire-turbo-native.md",
                },
                {
                  text: "Why WebView + Native Bridge",
                  link: "/bagisto-native/concepts-architecture/why-webview-native-bridge.md",
                },
              ],
            },
            // 3. Packages
            {
              text: "Packages",
              collapsed: true,
              items: [
                {
                  text: "@bagisto-native/core",
                  link: "/bagisto-native/packages/core-package.md",
                  items: [
                    {
                      text: "What it provides",
                      link: "/bagisto-native/packages/bagisto-native-core/what-it-provides.md",
                    },
                    {
                      text: "When to use",
                      link: "/bagisto-native/packages/bagisto-native-core/when-to-use.md",
                    }
                  ]
                },
                {
                  text: "@bagisto-native/react",
                  link: "/bagisto-native/packages/react-package.md",
                  items: [
                    {
                      text: "React / Next.js wrappers",
                      link: "/bagisto-native/packages/bagisto-native-react/react-nextjs-wrappers.md",
                    },
                    {
                      text: "Relationship with core",
                      link: "/bagisto-native/packages/bagisto-native-react/relationship-with-core.md",
                    }
                  ]
                },
                {
                  text: "Versioning & Compatibility",
                  link: "/bagisto-native/packages/versioning-compatibility.md",
                },
              ],
            },
            // 4. Prerequisites
            {
              text: "Prerequisites",
              collapsed: true,
              items: [
                {
                  text: "System Requirements",
                  link: "/bagisto-native/prerequisites/system-requirements.md",
                },
                {
                  text: "Node.js & npm",
                  link: "/bagisto-native/prerequisites/node-npm.md",
                },
                {
                  text: "Bagisto Backend Setup",
                  link: "/bagisto-native/prerequisites/bagisto-backend-setup.md",
                },
                {
                  text: "Headless Commerce Knowledge",
                  link: "/bagisto-native/prerequisites/headless-knowledge.md",
                },
                {
                  text: "iOS Requirements",
                  link: "/bagisto-native/prerequisites/ios-requirements.md",
                },
                {
                  text: "Network Requirements",
                  link: "/bagisto-native/prerequisites/network-requirements.md",
                },
              ],
            },
            // 5. Getting Started
            {
              text: "Getting Started",
              collapsed: true,
              items: [
                {
                  text: "Overview of the Setup Flow",
                  link: "/bagisto-native/getting-started/setup-flow-overview.md",
                },
                {
                  text: "Create Bagisto Headless Commerce",
                  link: "/bagisto-native/getting-started/create-headless-commerce.md",
                  items: [
                    {
                      text: "Headless concept",
                      link: "/bagisto-native/getting-started/create/headless-concept.md",
                    },
                    {
                      text: "CLI command",
                      link: "/bagisto-native/getting-started/create/cli-command.md",
                    },
                    {
                      text: "Generated project structure",
                      link: "/bagisto-native/getting-started/create/generate-project-structure.md",
                    },
                    {
                      text: "Repository reference",
                      link: "/bagisto-native/getting-started/create/repository-reference.md",
                    }
                  ]
                },
                {
                  text: "Configure & Run Headless Storefront",
                  link: "/bagisto-native/getting-started/configure-run-headless-storefront.md",
                  items: [
                    {
                      text: "Environment variables",
                      link: "/bagisto-native/getting-started/configure-and-run/environment-variables.md",
                    },
                    {
                      text: "Development server",
                      link: "/bagisto-native/getting-started/configure-and-run/development-server.md",
                    },
                    {
                      text: "API connectivity check",
                      link: "/bagisto-native/getting-started/configure-and-run/api-connectivity-check.md",
                    }
                  ]
                },
                {
                  text: "Limitations & Common Pitfalls",
                  link: "/bagisto-native/getting-started/limitations.md",
                },
              ],
            },
            // 6. Integrating Native Framework
            {
              text: "Integrating Native Framework",
              collapsed: true,
              items: [
                {
                  text: "Installing Packages",
                  link: "/bagisto-native/integrating-native-framework/installing-packages.md",
                  items: [
                    {
                      text: "Installing Core",
                      link: "/bagisto-native/integrating-native-framework/installation/installing-core.md",
                    },
                    {
                      text: "Installing React Wrappers",
                      link: "/bagisto-native/integrating-native-framework/installation/installing-react-wrappers.md",
                    },
                    {
                      text: "Package Dependency Rules",
                      link: "/bagisto-native/integrating-native-framework/installation/package-dependency-rules.md",
                    },
                  ],
                },
                {
                  text: "Hotwire Bridge Bundle",
                  link: "/bagisto-native/integrating-native-framework/hotwire-bridge-bundle.md",
                  items: [
                    {
                      text: "What is bundle.js",
                      link: "/bagisto-native/integrating-native-framework/hotwire-bridge-bundle/what-bundlejs-is.md",
                    },
                    {
                      text: "Why It Is Required",
                      link: "/bagisto-native/integrating-native-framework/hotwire-bridge-bundle/why-it-is-required.md",
                    },
                    {
                      text: "How to Include It Safely",
                      link: "/bagisto-native/integrating-native-framework/hotwire-bridge-bundle/how-to-include-it-safely.md",
                    },
                    {
                      text: "Production vs Development Notes",
                      link: "/bagisto-native/integrating-native-framework/hotwire-bridge-bundle/production-vs-development-notes.md",
                    },
                  ],
                },
                {
                  text: "Making App Native-Ready",
                  link: "/bagisto-native/integrating-native-framework/making-app-native-ready.md",
                  items: [
                    {
                      text: "Registering Bridge Components",
                      link: "/bagisto-native/integrating-native-framework/native-ready/registering-bridge-components.md",
                    },
                    {
                      text: "Enabling Native Events",
                      link: "/bagisto-native/integrating-native-framework/native-ready/enabling-native-events.md",
                    },
                    {
                      text: "Native-safe Routing Rules",
                      link: "/bagisto-native/integrating-native-framework/native-ready/native-safe-routing-rules.md",
                    },
                    {
                      text: "SSR vs Client-side Considerations",
                      link: "/bagisto-native/integrating-native-framework/native-ready/ssr-vs-client-side-considerations.md",
                    },
                  ],
                },
              ],
            },
            // 7. Core Module
            {
              text: "@bagisto-native/core",
              collapsed: true,
              items: [
                {
                  text: "Overview",
                  link: "/bagisto-native/core-module/core-overview.md",
                  items: [
                    {
                      text: "Purpose of Core Module",
                      link: "/bagisto-native/core-module/overview/purpose-of-core-module.md",
                    },
                    {
                      text: "What Problems It Solves",
                      link: "/bagisto-native/core-module/overview/what-problems-it-solves.md",
                    },
                  ],
                },
                {
                  text: "Web Components",
                  link: "/bagisto-native/core-module/web-components.md",
                  items: [
                    {
                      text: "DynamicButton",
                      link: "/bagisto-native/core-module/web-components/dynamic-button.md",
                    },
                    {
                      text: "HotwireToast",
                      link: "/bagisto-native/core-module/web-components/hotwire-toast.md",
                    },
                    {
                      text: "HotwireSearch",
                      link: "/bagisto-native/core-module/web-components/hotwire-search.md",
                    },
                    {
                      text: "HotwireLocation",
                      link: "/bagisto-native/core-module/web-components/hotwire-location.md",
                    },
                    {
                      text: "HotwireHistorySync",
                      link: "/bagisto-native/core-module/web-components/hotwire-history-sync.md",
                    },
                    {
                      text: "HotwireThemeMode",
                      link: "/bagisto-native/core-module/web-components/hotwire-theme-mode.md",
                    },
                    {
                      text: "When to Use Directly vs React Wrappers",
                      link: "/bagisto-native/core-module/web-components/when-to-use-directly-vs-react-wrappers.md",
                    },
                  ],
                },
                {
                  text: "Utility Functions",
                  link: "/bagisto-native/core-module/utility-functions.md",
                  items: [
                    {
                      text: "Toast Events",
                      link: "/bagisto-native/core-module/utility-functions/toast-events.md",
                    },
                    {
                      text: "History Sync",
                      link: "/bagisto-native/core-module/utility-functions/history-sync.md",
                    },
                    {
                      text: "Theme Sync",
                      link: "/bagisto-native/core-module/utility-functions/theme-sync.md",
                    },
                    {
                      text: "Cart Count Sync",
                      link: "/bagisto-native/core-module/utility-functions/cart-count-sync.md",
                    },
                    {
                      text: "Turbo Native Detection",
                      link: "/bagisto-native/core-module/utility-functions/turbo-native-detection.md",
                    },
                    {
                      text: "Server vs Client Usage",
                      link: "/bagisto-native/core-module/utility-functions/server-vs-client-usage.md",
                    },
                  ],
                },
                {
                  text: "Best Practices",
                  link: "/bagisto-native/core-module/best-practices.md",
                  items: [
                    {
                      text: "Performance",
                      link: "/bagisto-native/core-module/best-practices/performance.md",
                    },
                    {
                      text: "Event Safety",
                      link: "/bagisto-native/core-module/best-practices/event-safety.md",
                    },
                    {
                      text: "Avoiding Duplicate Native Actions",
                      link: "/bagisto-native/core-module/best-practices/avoiding-duplicate-native-actions.md",
                    },
                  ],
                },
              ],
            },
            // 8. React Module
            {
              text: "@bagisto-native/react",
              collapsed: true,
              items: [
                {
                  text: "Overview",
                  link: "/bagisto-native/react-module/react-overview.md",
                  items: [
                    {
                      text: "Why React Wrappers Exist",
                      link: "/bagisto-native/react-module/overview/why-react-wrappers-exist.md",
                    },
                    {
                      text: "Relationship with Core",
                      link: "/bagisto-native/react-module/overview/relationship-with-core.md",
                    },
                  ],
                },
                {
                  text: "Usage Rules",
                  link: "/bagisto-native/react-module/usage-rules.md",
                  items: [
                    {
                      text: "Client-only Components",
                      link: "/bagisto-native/react-module/usage-rules/client-only-components.md",
                    },
                    {
                      text: "Dynamic Imports",
                      link: "/bagisto-native/react-module/usage-rules/dynamic-imports.md",
                    },
                    {
                      text: "SSR Limitations",
                      link: "/bagisto-native/react-module/usage-rules/ssr-limitations.md",
                    },
                  ],
                },
                {
                  text: "Components Reference",
                  link: "/bagisto-native/react-module/components-reference.md",
                  items: [
                    {
                      text: "DynamicButton",
                      link: "/bagisto-native/react-module/components-reference/dynamic-button.md",
                    },
                    {
                      text: "HotwireToast",
                      link: "/bagisto-native/react-module/components-reference/hotwire-toast.md",
                    },
                    {
                      text: "HotwireSearch",
                      link: "/bagisto-native/react-module/components-reference/hotwire-search.md",
                    },
                    {
                      text: "HotwireLocation",
                      link: "/bagisto-native/react-module/components-reference/hotwire-location.md",
                    },
                    {
                      text: "HotwireHistorySync",
                      link: "/bagisto-native/react-module/components-reference/hotwire-history-sync.md",
                    },
                    {
                      text: "HotwireThemeMode",
                      link: "/bagisto-native/react-module/components-reference/hotwire-theme-mode.md",
                    },
                  ],
                },
                {
                  text: "Integration Patterns",
                  link: "/bagisto-native/react-module/integration-patterns.md",
                  items: [
                    {
                      text: "App-level Providers",
                      link: "/bagisto-native/react-module/common-integration-patterns/app-level-providers.md",
                    },
                    {
                      text: "Page-level Integration",
                      link: "/bagisto-native/react-module/common-integration-patterns/page-level-integration.md",
                    },
                    {
                      text: "Layout-level Integration",
                      link: "/bagisto-native/react-module/common-integration-patterns/layout-level-integration.md",
                    },
                  ],
                },
              ],
            },
            // 9. Native Integration
            {
              text: "Native App Integration",
              collapsed: true,
              items: [
                {
                  text: "Project URL Concept",
                  link: "/bagisto-native/native-integration/project-url-concept.md",
                  items: [
                    {
                      "text": "What is Project URL",
                      "link": "/bagisto-native/native-integration/project-url-concept/what-is-project-url.md"
                    },
                    {
                      "text": "Local vs Production URLs",
                      "link": "/bagisto-native/native-integration/project-url-concept/local-vs-production-urls.md"
                    },
                    {
                      "text": "Network Considerations",
                      "link": "/bagisto-native/native-integration/project-url-concept/network-considerations.md"
                    }
                  ]
                },
                {
                  text: "iOS App Setup",
                  link: "/bagisto-native/native-integration/ios-app-setup.md",
                  items: [
                    {
                      "text": "Repository Overview",
                      "link": "/bagisto-native/native-integration/ios-app-setup/repository-overview.md"
                    },
                    {
                      "text": "Project Structure",
                      "link": "/bagisto-native/native-integration/ios-app-setup/project-structure.md"
                    },
                    {
                      "text": "Xcode Setup",
                      "link": "/bagisto-native/native-integration/ios-app-setup/xcode-setup.md"
                    },
                    {
                      "text": "Simulator vs Device",
                      "link": "/bagisto-native/native-integration/ios-app-setup/simulator-vs-device.md"
                    }
                  ]
                },
                {
                  text: "Base URL Configuration",
                  link: "/bagisto-native/native-integration/base-url-configuration.md",
                  items: [
                    {
                      "text": "Where to Set",
                      "link": "/bagisto-native/native-integration/configuring-base-url/where-to-set.md"
                    },
                    {
                      "text": "Common Mistakes",
                      "link": "/bagisto-native/native-integration/configuring-base-url/common-mistakes.md"
                    },
                    {
                      "text": "Environment Switching",
                      "link": "/bagisto-native/native-integration/configuring-base-url/environment-switching.md"
                    }
                  ]
                },
                {
                  text: "Build & Run",
                  link: "/bagisto-native/native-integration/build-and-run.md",
                  items: [
                    {
                      "text": "First Launch Checklist",
                      "link": "/bagisto-native/native-integration/build-and-run/first-launch-checklist.md"
                    },
                    {
                      "text": "Verifying Native-Web Communication",
                      "link": "/bagisto-native/native-integration/build-and-run/verifying-native-web-communication.md"
                    },
                    {
                      "text": "Debugging Basics",
                      "link": "/bagisto-native/native-integration/build-and-run/debugging-basics.md"
                    }
                  ]
                },
                {
                  "text": "Bagisto Native Integration with IOS App",
                  "link": "/bagisto-native/native-integration/bagisto-native-integration-with-ios-app.md"
                },
              ],
            },
            // 10. Native Features
            {
              text: "Native Features Mapping",
              collapsed: true,
              items: [
                {
                  text: "Navigation Sync",
                  link: "/bagisto-native/native-features-mapping/navigation-sync.md",
                },
                {
                  text: "Cart Sync",
                  link: "/bagisto-native/native-features-mapping/cart-sync.md",
                },
                {
                  text: "Search Integration",
                  link: "/bagisto-native/native-features-mapping/search-integration.md",
                },
                {
                  text: "Advanced Native Features",
                  link: "/bagisto-native/native-features-mapping/advanced-native-features.md",
                },
              ],
            },
            // 11. Advanced Guides
            {
              text: "Advanced Guides",
              collapsed: true,
              items: [
                {
                  text: "Custom Bridge Components",
                  link: "/bagisto-native/advanced-guides/custom-bridge-components.md",
                },
                {
                  text: "Deep Linking",
                  link: "/bagisto-native/advanced-guides/deep-linking.md",
                },
                {
                  text: "Analytics & Tracking",
                  link: "/bagisto-native/advanced-guides/analytics-tracking.md",
                },
                {
                  text: "Authentication Flows",
                  link: "/bagisto-native/advanced-guides/authentication-flows.md",
                },
                {
                  text: "Checkout Edge Cases",
                  link: "/bagisto-native/advanced-guides/checkout-edge-cases.md",
                },
              ],
            },
            // 12. Multi-Frontend Strategy
            {
              text: "Multi-Frontend Strategy",
              collapsed: true,
              items: [
                {
                  text: "Using with Next.js",
                  link: "/bagisto-native/multi-frontend-strategy/nextjs-usage.md",
                },
                {
                  text: "Using with React SPA",
                  link: "/bagisto-native/multi-frontend-strategy/react-spa-usage.md",
                },
                {
                  text: "Future Support",
                  link: "/bagisto-native/multi-frontend-strategy/future-support.md",
                  items: [
                    {
                      text: "Vue",
                      link: "/bagisto-native/multi-frontend-strategy/future-support/vue.md",
                    },
                    {
                      text: "Angular",
                      link: "/bagisto-native/multi-frontend-strategy/future-support/angular.md",
                    },
                    {
                      text: "Mobile-only apps",
                      link: "/bagisto-native/multi-frontend-strategy/future-support/mobile-only-apps.md",
                    }
                  ]
                },
                {
                  text: "Shared API Strategy",
                  link: "/bagisto-native/multi-frontend-strategy/shared-api-strategy.md",
                },
              ],
            },
            // 13. Deployment
            {
              text: "Deployment & Environments",
              collapsed: true,
              items: [
                {
                  text: "Environments",
                  link: "/bagisto-native/deployment/environments.md",
                },
                {
                  text: "Hosting",
                  link: "/bagisto-native/deployment/hosting.md",
                },
                {
                  text: "CDN Considerations",
                  link: "/bagisto-native/deployment/cdn-considerations.md",
                },
                {
                  text: "Native Release Workflow",
                  link: "/bagisto-native/deployment/native-release-workflow.md",
                },
              ],
            },
          ],
        },
      ],

      outline: {
        level: "deep",
      },

      footer: {
        message:
          'Released under the <a href="https://opensource.org/licenses/mit" target="_blank" class="mit-license">MIT License</a>.',
        copyright: `Copyright © ${new Date().getFullYear()} Webkul`,
      },

      socialLinks: [
        { icon: "github", link: "https://github.com/bagisto/bagisto" },
      ],

      search: {
        provider: "local",
      },
    },

    buildEnd(siteConfig) {
      const outDir = siteConfig.outDir;

      Object.entries(redirects).forEach(([from, to]) => {
        if (from.includes("*")) {
          console.warn(`⚠️ Skipping wildcard redirect: ${from} -> ${to}`);
          return;
        }

        let filePath;

        if (from.endsWith(".html")) {
          filePath = path.join(outDir, from);
        } else {
          filePath = path.join(outDir, from, "index.html");
        }

        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, makeRedirectHtml(to), "utf-8");
        console.log(`✅ Redirect created: ${from} -> ${to}`);
      });
    },
  })
);
