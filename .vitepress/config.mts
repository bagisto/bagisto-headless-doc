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
