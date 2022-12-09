const webpack = require('@nativescript/webpack');
const { ProvidePlugin } = require('webpack');

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    const fallback = config.resolve.get("fallback");
    config.resolve.set(
      "fallback",
      webpack.Utils.merge(fallback || {}, {
        timers: require.resolve("@nativescript/core"),
        fs: require.resolve("@nativescript/core"),
        module: require.resolve("@nativescript/core"),
        path: require.resolve("@nativescript/core"),
        assert: require.resolve("browser-assert"),
        buffer: require.resolve("buffer"),
        events: require.resolve("events"),
        tty: require.resolve("tty-browserify"),
        process: require.resolve('process/browser'),
        os: require.resolve("os-browserify/browser"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("browser-utils"),
        url: require.resolve('url'),
        crypto: require.resolve("crypto-browserify"),
        zlib: require.resolve("browserify-zlib"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        vm: require.resolve("vm-browserify"),
      })
    );

    config.plugin("ProvidePlugin|Polyfills").use(ProvidePlugin, [
      { Buffer: [require.resolve("buffer/"), "Buffer"] }
    ]);

    config.plugin("DefinePlugin").tap(args => {
      Object.assign(args[0], {
        "process.env.NODE_DEBUG": false,
        "process.platform": JSON.stringify("nativescript"),
        "process.env": "global",
        "process.version": JSON.stringify("0.0.0"),
        "process.browser": true,
      });

      return args;
    });
  });


  return webpack.resolveConfig()
}
