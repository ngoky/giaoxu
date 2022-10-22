const path = require(`path`)

module.exports = {
    entry: './src/index.ts',
    webpack: {
        alias: {
            '@/*': path.resolve(__dirname, 'src/*'),
            '@/Components/*': path.resolve(__dirname, 'src/components/*'),
            '@/pages/*': path.resolve(__dirname, 'src/pages/*'),
            '@/admin/*': path.resolve(__dirname, 'src/admin/*'),
            '@/constants/*': path.resolve(__dirname, 'src/constants/*')
        },
        resolve: { modulesDirectories: ['node_modules', 'src'], extension: ['.js', '.jsx', '.tsx', '.ts', '.scss'] },
    }
}
