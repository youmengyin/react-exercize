const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities }) {
    addUtilities({
        '.tag': {
          background: 'lightblue',
          color: 'yellow'
        },
        '.tag-f': {
            'font-size': '18px'
        }
    })
})
