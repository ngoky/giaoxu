// eslint-disable-next-line import/no-import-module-exports
import path from 'path'

module.exports = {
    resolve: {
        extensions: ['.jsx', '.js'],
        alias: {
            '@/*': path.resolve(__dirname, './src/*')
        },
    }
}
