exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
}) => {
    actions.setWebpackConfig({
        devServer: {
            watchOptions: {
                ignored: /\.#|node_modules|~$/,
            },
        },

    })
};

// module: {
//     rules: [
//         {
//             test: /\.m?js$/,
//             exclude: /(node_modules|bower_components)/,
//             // include: [/node_modules\/(react-data-grid|react-data-grid-addons)/],
//             use: {
//                 loader: 'babel-loader',
//                 options: {
//                     presets: ['@babel/preset-env']
//                 }
//             }
//         }
//     ]
// }

// exports.onCreateWebpackConfig = ({ stage, actions }) => {
//     actions.setWebpackConfig({
//         resolve: {
//             modules: [path.resolve(__dirname, "src"), "node_modules"],
//             watchOptions: {
//                 ignored: /\.#|node_modules|~$/,
//             },
//         },
//     })
// }

// module: {
//     rules: [
//         {
//             test: /\.less$/,
//             use: [
//                 // You don't need to add the matching ExtractText plugin
//                 // because gatsby already includes it and makes sure it's only
//                 // run at the appropriate stages, e.g. not in development
//                 loaders.miniCssExtract(),
//                 loaders.css({ importLoaders: 1 }),
//                 // the postcss loader comes with some nice defaults
//                 // including autoprefixer for our configured browsers
//                 loaders.postcss(),
//                 `less-loader`,
//             ],
//         },
//     ],
// },
// plugins: [
//     plugins.define({
//         __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
//     }),
// ],


// any route that starts with /app/ is part of restricted content
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/app/)) {
      page.matchPath = "/app/*"
      // Update the page.
      createPage(page)
    }
  }