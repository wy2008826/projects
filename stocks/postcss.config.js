module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')({
            browsers: ["ie>=8", "last 100 versions"]
        }),

    ]
}