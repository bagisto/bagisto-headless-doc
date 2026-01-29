import { defineConfig } from "vitepress";
import { redirects, makeRedirectHtml } from "./_redirects";
import fs from "fs";
import path from "path";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    lang: "en-US",
    cleanUrls: true,
    title: "Bagisto Headless",
    description: "Bagisto GraphQL API Integration with Next.js - Complete Developer Guide",
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
      siteTitle: false,
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
                  text: "Hotwire & Turbo Native",
                  link: "/bagisto-native/concepts-architecture/hotwire-turbo-native.md",
                },
                {
                  text: "Why WebView + Native Bridge",
                  link: "/bagisto-native/concepts-architecture/why-webview-native-bridge.md",
                },
              ],
            },

            // 3. Integration Guide
            {
              text: "Integration Guide",
              collapsed: true,
              items: [
                {
                  text: "Getting Started",
                  link: "/bagisto-native/integration-guide/getting-started.md",
                },
                {
                  text: "Installing Packages",
                  collapsed: true,
                  link: "/bagisto-native/integration-guide/installing-packages.md",
                  items: [
                    {
                      text: "Installing Core",
                      link: "/bagisto-native/integration-guide/installation/installing-core.md",
                    },
                    {
                      text: "Installing React Wrappers",
                      link: "/bagisto-native/integration-guide/installation/installing-react-wrappers.md",
                    },
                    {
                      text: "Package Dependency Rules",
                      link: "/bagisto-native/integration-guide/installation/package-dependency-rules.md",
                    },
                  ],
                },
                {
                  text: "Hotwire Bridge Bundle",
                  collapsed: true,
                  link: "/bagisto-native/integration-guide/hotwire-bridge-bundle.md",
                  items: [
                    {
                      text: "What is bundle.js",
                      link: "/bagisto-native/integration-guide/hotwire-bridge-bundle/what-bundlejs-is.md",
                    },
                    {
                      text: "Why It Is Required",
                      link: "/bagisto-native/integration-guide/hotwire-bridge-bundle/why-it-is-required.md",
                    },
                    {
                      text: "How to Include It Safely",
                      link: "/bagisto-native/integration-guide/hotwire-bridge-bundle/how-to-include-it-safely.md",
                    },
                    {
                      text: "Production vs Development Notes",
                      link: "/bagisto-native/integration-guide/hotwire-bridge-bundle/production-vs-development-notes.md",
                    },
                  ],
                },
                {
                  text: "Implementing Native Behaviors",
                  collapsed: true,
                  link: "/bagisto-native/integration-guide/making-app-native-ready.md",
                  items: [
                    {
                      text: "Registering Bridge Components",
                      link: "/bagisto-native/integration-guide/native-ready/registering-bridge-components.md",
                    },
                    {
                      text: "Enabling Native Events",
                      link: "/bagisto-native/integration-guide/native-ready/enabling-native-events.md",
                    },
                    {
                      text: "Native-safe Routing Rules",
                      link: "/bagisto-native/integration-guide/native-ready/native-safe-routing-rules.md",
                    },
                    {
                      text: "SSR vs Client-side Considerations",
                      link: "/bagisto-native/integration-guide/native-ready/ssr-vs-client-side-considerations.md",
                    },
                  ],
                },
                {
                  text: "Quick Integration Note",
                  link: "/bagisto-native/integration-guide/summary.md",
                },
              ],
            },

            // 4. SDK Reference
            {
              text: "SDK Reference",
              collapsed: true,
              items: [
                {
                  text: "@bagisto-native/core",
                  link: "/bagisto-native/sdk-reference/core-package.md",
                  collapsed: true,
                  items: [
                    {
                      text: "What it provides",
                      link: "/bagisto-native/sdk-reference/bagisto-native-core/what-it-provides.md",
                    },
                    {
                      text: "When to use",
                      link: "/bagisto-native/sdk-reference/bagisto-native-core/when-to-use.md",
                    },
                    {
                      text: "Overview",
                      link: "/bagisto-native/sdk-reference/bagisto-native-core/core-overview.md",
                      collapsed: true,
                      items: [
                        {
                          text: "Purpose of Core Module",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/overview/purpose-of-core-module.md",
                        },
                        {
                          text: "What Problems It Solves",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/overview/what-problems-it-solves.md",
                        },
                      ],
                    },
                    {
                      text: "Web Components",
                      link: "/bagisto-native/sdk-reference/bagisto-native-core/web-components.md",
                      collapsed: true,
                      items: [
                        {
                          text: "DynamicButton",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/web-components/dynamic-button.md",
                        },
                        {
                          text: "HotwireToast",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/web-components/hotwire-toast.md",
                        },
                        {
                          text: "HotwireSearch",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/web-components/hotwire-search.md",
                        },
                        {
                          text: "HotwireLocation",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/web-components/hotwire-location.md",
                        },
                        {
                          text: "HotwireHistorySync",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/web-components/hotwire-history-sync.md",
                        },
                        {
                          text: "HotwireThemeMode",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/web-components/hotwire-theme-mode.md",
                        },
                        {
                          text: "When to Use Directly vs React Wrappers",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/web-components/when-to-use-directly-vs-react-wrappers.md",
                        },
                      ],
                    },
                    {
                      text: "Utility Functions",
                      link: "/bagisto-native/sdk-reference/bagisto-native-core/utility-functions.md",
                      collapsed: true,
                      items: [
                        {
                          text: "Toast Events",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/utility-functions/toast-events.md",
                        },
                        {
                          text: "History Sync",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/utility-functions/history-sync.md",
                        },
                        {
                          text: "Theme Sync",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/utility-functions/theme-sync.md",
                        },
                        {
                          text: "Cart Count Sync",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/utility-functions/cart-count-sync.md",
                        },
                        {
                          text: "Turbo Native Detection",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/utility-functions/turbo-native-detection.md",
                        },
                        {
                          text: "Server vs Client Usage",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/utility-functions/server-vs-client-usage.md",
                        },
                      ],
                    },
                    {
                      text: "Best Practices",
                      link: "/bagisto-native/sdk-reference/bagisto-native-core/best-practices.md",
                      collapsed: true,
                      items: [
                        {
                          text: "Performance",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/best-practices/performance.md",
                        },
                        {
                          text: "Event Safety",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/best-practices/event-safety.md",
                        },
                        {
                          text: "Avoiding Duplicate Native Actions",
                          link: "/bagisto-native/sdk-reference/bagisto-native-core/best-practices/avoiding-duplicate-native-actions.md",
                        },
                      ],
                    },
                  ]
                },
                {
                  text: "@bagisto-native/react",
                  link: "/bagisto-native/sdk-reference/react-package.md",
                  collapsed: true,
                  items: [
                    {
                      text: "React / Next.js wrappers",
                      link: "/bagisto-native/sdk-reference/bagisto-native-react/react-nextjs-wrappers.md",
                    },
                    {
                      text: "Relationship with core",
                      link: "/bagisto-native/sdk-reference/bagisto-native-react/relationship-with-core.md",
                    },
                    {
                      text: "Overview",
                      link: "/bagisto-native/sdk-reference/bagisto-native-react/react-overview.md",
                      collapsed: true,
                      items: [
                        {
                          text: "Why React Wrappers Exist",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/overview/why-react-wrappers-exist.md",
                        },
                        {
                          text: "Relationship with Core",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/overview/relationship-with-core.md",
                        },
                      ],
                    },
                    {
                      text: "Usage Rules",
                      link: "/bagisto-native/sdk-reference/bagisto-native-react/usage-rules.md",
                      collapsed: true,
                      items: [
                        {
                          text: "Client-only Components",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/usage-rules/client-only-components.md",
                        },
                        {
                          text: "Dynamic Imports",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/usage-rules/dynamic-imports.md",
                        },
                        {
                          text: "SSR Limitations",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/usage-rules/ssr-limitations.md",
                        },
                      ],
                    },
                    {
                      text: "Components Reference",
                      link: "/bagisto-native/sdk-reference/bagisto-native-react/components-reference.md",
                      collapsed: true,
                      items: [
                        {
                          text: "DynamicButton",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/components-reference/dynamic-button.md",
                        },
                        {
                          text: "HotwireToast",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/components-reference/hotwire-toast.md",
                        },
                        {
                          text: "HotwireSearch",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/components-reference/hotwire-search.md",
                        },
                        {
                          text: "HotwireLocation",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/components-reference/hotwire-location.md",
                        },
                        {
                          text: "HotwireHistorySync",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/components-reference/hotwire-history-sync.md",
                        },
                        {
                          text: "HotwireThemeMode",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/components-reference/hotwire-theme-mode.md",
                        },
                      ],
                    },
                    {
                      text: "Integration Patterns",
                      link: "/bagisto-native/sdk-reference/bagisto-native-react/integration-patterns.md",
                      collapsed: true,
                      items: [
                        {
                          text: "App-level Providers",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/common-integration-patterns/app-level-providers.md",
                        },
                        {
                          text: "Page-level Integration",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/common-integration-patterns/page-level-integration.md",
                        },
                        {
                          text: "Layout-level Integration",
                          link: "/bagisto-native/sdk-reference/bagisto-native-react/common-integration-patterns/layout-level-integration.md",
                        },
                      ],
                    },
                  ]
                },
                {
                  text: "Versioning & Compatibility",
                  link: "/bagisto-native/sdk-reference/versioning-compatibility.md",
                },
              ],
            },

            // 5. Native Integration
            {
              text: "Mobile App Integration",
              collapsed: true,
              items: [
                {
                  text: "Integration with IOS App",
                  collapsed: true,
                  items: [
                    { text: "Introduction", link: "/bagisto-native/native-integration/ios/introduction.md" },
                    { text: "Hotwire vs. Native", link: "/bagisto-native/native-integration/ios/hotwire-vs-native.md" },
                    { text: "Integration Guide", link: "/bagisto-native/native-integration/ios/index.md" },
                    {
                      text: "Project URL Concept",
                      collapsed: true,
                      items: [
                        { text: "What is Project URL", link: "/bagisto-native/native-integration/ios/project-url-concept/what-is-project-url.md" },
                        { text: "Local vs Production URLs", link: "/bagisto-native/native-integration/ios/project-url-concept/local-vs-production-urls.md" },
                        { text: "Network Considerations", link: "/bagisto-native/native-integration/ios/project-url-concept/network-considerations.md" },
                      ]
                    },
                    {
                      text: "iOS App Setup",
                      collapsed: true,
                      items: [
                        { text: "Repository Overview", link: "/bagisto-native/native-integration/ios/ios-app-setup/repository-overview.md" },
                        { text: "Project Structure", link: "/bagisto-native/native-integration/ios/ios-app-setup/project-structure.md" },
                        { text: "Xcode Setup", link: "/bagisto-native/native-integration/ios/ios-app-setup/xcode-setup.md" },
                        { text: "Configuration Example", link: "/bagisto-native/native-integration/ios/ios-app-setup/configuration-example.md" },
                        { text: "Simulator vs Device", link: "/bagisto-native/native-integration/ios/ios-app-setup/simulator-vs-device.md" },
                      ]
                    },
                    {
                      text: "Base URL Configuration",
                      collapsed: true,
                      items: [
                        { text: "Where to Set", link: "/bagisto-native/native-integration/ios/base-url-configuration/where-to-set.md" },
                        { text: "Common Mistakes", link: "/bagisto-native/native-integration/ios/base-url-configuration/common-mistakes.md" },
                        { text: "Environment Switching", link: "/bagisto-native/native-integration/ios/base-url-configuration/environment-switching.md" },
                      ]
                    },
                    {
                      text: "Build & Run",
                      collapsed: true,
                      items: [
                        { text: "How to Run", link: "/bagisto-native/native-integration/ios/build-and-run/how-to-run.md" },
                        { text: "First Launch Checklist", link: "/bagisto-native/native-integration/ios/build-and-run/first-launch-checklist.md" },
                        { text: "Verifying Native-Web Communication", link: "/bagisto-native/native-integration/ios/build-and-run/verifying-native-web-communication.md" },
                        { text: "Debugging Basics", link: "/bagisto-native/native-integration/ios/build-and-run/debugging-basics.md" },
                      ]
                    },
                    {
                      text: "Bridge Components",
                      collapsed: true,
                      items: [
                        { text: "Overview", link: "/bagisto-native/native-integration/ios/bridge-components/overview.md" },
                        { text: "Component Registration", link: "/bagisto-native/native-integration/ios/bridge-components/registration.md" },
                        {
                          text: "Available Components",
                          collapsed: true,
                          items: [
                            { text: "Overview", link: "/bagisto-native/native-integration/ios/bridge-components/available-components" },
                            // { text: "Alert", link: "/bagisto-native/native-integration/ios/bridge-components/alert" },
                            { text: "Barcode Scanner", link: "/bagisto-native/native-integration/ios/bridge-components/barcode-scanner.md" },
                            // { text: "Button / NavBar", link: "/bagisto-native/native-integration/ios/bridge-components/button.md" },
                            // { text: "Download File", link: "/bagisto-native/native-integration/ios/bridge-components/download-file.md" },
                            // { text: "Form", link: "/bagisto-native/native-integration/ios/bridge-components/form.md" },
                            // { text: "Haptic", link: "/bagisto-native/native-integration/ios/bridge-components/haptic.md" },
                            { text: "Image Search", link: "/bagisto-native/native-integration/ios/bridge-components/image-search.md" },
                            { text: "Location", link: "/bagisto-native/native-integration/ios/bridge-components/location.md" },
                            // { text: "Menu / Drawer", link: "/bagisto-native/native-integration/ios/bridge-components/menu.md" },
                            { text: "Navigation History", link: "/bagisto-native/native-integration/ios/bridge-components/navigation-history.md" },
                            // { text: "Review Prompt", link: "/bagisto-native/native-integration/ios/bridge-components/review-prompt.md" },
                            { text: "Search", link: "/bagisto-native/native-integration/ios/bridge-components/search.md" },
                            { text: "Theme Sync", link: "/bagisto-native/native-integration/ios/bridge-components/theme.md" },
                            { text: "Toast", link: "/bagisto-native/native-integration/ios/bridge-components/toast.md" },
                            { text: "Dynamic Button", link: "/bagisto-native/native-integration/ios/bridge-components/custom-button-view.md" },
                          ]
                        },
                      ],
                    },
                    {
                      text: "How-to Guides",
                      collapsed: true,
                      items: [
                        { text: "Install Xcode", link: "/bagisto-native/native-integration/ios/how-to-guides/install-xcode.md" },
                        { text: "Create iOS Project", link: "/bagisto-native/native-integration/ios/how-to-guides/create-project.md" },
                        { text: "Install SPM Package", link: "/bagisto-native/native-integration/ios/how-to-guides/install-spm-package.md" },
                        { text: "Use SPM Package", link: "/bagisto-native/native-integration/ios/how-to-guides/use-spm-package.md" },
                        { text: "Run iOS App", link: "/bagisto-native/native-integration/ios/how-to-guides/run-app.md" },
                        { text: "Archive iOS App", link: "/bagisto-native/native-integration/ios/how-to-guides/archive-app.md" },
                        { text: "Apple Account Setup", link: "/bagisto-native/native-integration/ios/how-to-guides/apple-account-setup.md" },
                        { text: "Publish to App Store", link: "/bagisto-native/native-integration/ios/how-to-guides/publish-to-app-store.md" },
                        { text: "Add Custom Component", link: "/bagisto-native/native-integration/ios/how-to-guides/add-new-component.md" },
                      ]

                    },
                  ]
                },
              ],
            },

            // 6. How to Guides
            {
              text: "How to Guides",
              collapsed: true,
              items: [
                {
                  text: "Integration with Bagisto Headless",
                  collapsed: false,
                  items: [
                    {
                      text: "Overview of the Setup Flow",
                      link: "/bagisto-native/getting-started/integration-with-bagisto-headless/setup-flow-overview.md",
                    },
                    {
                      text: "Step 1: Install Bagisto Headless",
                      link: "/bagisto-native/getting-started/integration-with-bagisto-headless/integrate-bagisto-native.md",
                      collapsed: true,
                      items: [
                        {
                          text: "Headless concept",
                          link: "/bagisto-native/getting-started/integration-with-bagisto-headless/create/headless-concept.md",
                        },
                        {
                          text: "CLI command",
                          link: "/bagisto-native/getting-started/integration-with-bagisto-headless/create/cli-command.md",
                        },
                        {
                          text: "Generated project structure",
                          link: "/bagisto-native/getting-started/integration-with-bagisto-headless/create/generate-project-structure.md",
                        },
                        {
                          text: "Repository reference",
                          link: "/bagisto-native/getting-started/integration-with-bagisto-headless/create/repository-reference.md",
                        }
                      ]
                    },
                    {
                      text: "Step 2: API & Environment Configuration",
                      link: "/bagisto-native/getting-started/integration-with-bagisto-headless/configure-run-headless-storefront.md",
                      collapsed: true,
                      items: [
                        {
                          text: "Environment variables",
                          link: "/bagisto-native/getting-started/integration-with-bagisto-headless/configure-and-run/environment-variables.md",
                        },
                        {
                          text: "Development server",
                          link: "/bagisto-native/getting-started/integration-with-bagisto-headless/configure-and-run/development-server.md",
                        },
                        {
                          text: "API connectivity check",
                          link: "/bagisto-native/getting-started/integration-with-bagisto-headless/configure-and-run/api-connectivity-check.md",
                        }
                      ]
                    },
                    {
                      text: "Step 3: Connect Bagisto Native",
                      link: "/bagisto-native/getting-started/integration-with-bagisto-headless/step-3-connect-bagisto-native.md",
                    },
                    {
                      text: "Step 4: Component & Bridge Integration",
                      link: "/bagisto-native/getting-started/integration-with-bagisto-headless/component-integration-guide.md",
                    },
                    {
                      text: "Limitations & Common Pitfalls",
                      link: "/bagisto-native/getting-started/integration-with-bagisto-headless/limitations.md",
                    },
                  ]
                },
              ],
            },
            // 7. Deployment & Environments
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
