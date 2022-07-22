module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      height: {
        header: '76px',
        rHeader: 'calc(100% - 76px)',
        adHeader: '50px',
        rAdHeader: 'calc(100% - 50px)',

      },
      width: {
        '300': '30rem'
      },
      minWidth: {
        '200': '200px'
      },
      maxWidth: {
        '800': '800px',
        '1000': '1000px',
      },
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
        yellowtail: ['Yellowtail', 'cursive'],
        baloo: ['Bellota', 'cursive'],
      },
      textColor: {
        'red': '#dc4535'
      },
      backgroundColor: {
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
        blackOverlay2: 'rgba(0, 0 ,0 ,0.3)',
        'red': '#dc4535',
        'blue': '#228F80',
        'green': '#47BE2E',
        'orange': '#E47F37'
      },
      boxShadow: {
        'md-white': '0 4px 6px -1px rgba(200 ,200 ,200,0.2), 0 2px 4px -2px rgba(200, 200 ,200,0.2);'
      },
      flex: {
        '3': '3 3 0%',
        '4': '4 4 0%',
        '2': '2 2 0%',
        '5': '5 5 0%',
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(-200px)',
            transform: 'translateX(-200px)',
          },
          '100%': {
            '-webkit-transform': 'translateX(0px)',
            transform: 'translateX(0px)',
          },
        },
        'rotate-scale-up': {
          '0%': {
            '-webkit-transform': 'scale(1) rotateZ(0)',
            transform: "scale(1) rotateZ(0)",
          },
          "50%": {
            '-webkit-transform': "scale(2) rotateZ(180deg)",
            transform: 'scale(2) rotateZ(180deg)',
          },
          "100%": {
            '-webkit-transform': 'scale(1) rotateZ(360deg)',
            transform: 'scale(1) rotateZ(360deg)',
          }
        },
        'rotate-scale-up-diag-2': {
          '0%': {
            '-webkit-transform': 'scale(1) rotate3d(-1, 1, 0, 0deg)',
            transform: 'scale(1) rotate3d(-1, 1, 0, 0deg)',
          },
          '50%': {
            '-webkit-transform': 'scale(2) rotate3d(-1, 1, 0, 180deg)',
            transform: 'scale(2) rotate3d(-1, 1, 0, 180deg)',
          },
          '100%': {
            '-webkit-transform': 'scale(1) rotate3d(-1, 1, 0, 360deg)',
            transform: 'scale(1) rotate3d(-1, 1, 0, 360deg)'
          }
        },
        'scale-up-center': {
          '0%': {
            '-webkit-transform': 'scale(0)',
            transform: 'scale(0)'
          },
          '100% ': {
            ' -webkit-transform': ' scale(1)',
            transform: 'scale(1)'
          }
        },
        'scale-up-hor-right': {
          '0%': {
            '-webkit-transform': 'scaleX(0)',
            transform: 'scaleX(0)',
            '-webkit-transform-origin': '100% 100%',
            'transform-origin': '100% 100%',
          },
          '100%': {
            '-webkit-transform': 'scaleX(1)',
            transform: 'scaleX(1)',
            '-webkit-transform-origin': '100% 100%',
            'transform-origin': '100% 100%'
          }
        },
        'scale-image': {
          '0%': {
            '-webkit-transform': 'scale(1)',
            transform: 'scale(1)'
          },
          '100% ': {
            ' -webkit-transform': ' scale(1.2)',
            transform: 'scale(1.2)'
          }
        }


      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'rotate-scale-up': 'rotate-scale-up 0.65s linear both',
        'rotate-scale-up-diag-2': 'rotate-scale-up-diag-2 0.7s linear both',
        'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'scale-up-hor-right': 'scale-up-hor-right 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'scale-image': 'scale-image 0.3s ease-in-out both'

      },
    },
    cursor: {
      'zoom-in': 'zoom-in',
      pointer: 'pointer',
    },
    screen: {
      '2xl': '1536px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  mode: 'jit'
}
