const OPERE = require('./static/opere_package.js');


AFRAME.registerState({
  initialState: {
    onProf: ``,
    language: 'it',
    room: 1,
  },

  handlers: {
    activeProf: function (state, action) {
      state.onProf = action.onProf;
      for (let i = 0; i < OPERE.length; i++) {
        const element = OPERE[i];

      }
      console.log(`state.onProf:${state.onProf}`)
    },
    changeRoom: function (state, action) {

    },
    changeLanguage: function (state, action) {
      console.log(`activeProf:${state.onProf}`)
      state.language = action.value
      const $opereELs = document.querySelector('a-scene').querySelectorAll('[o_opere]')
      for (let i = 0; i < $opereELs.length; i++) {
        
        const el = $opereELs[i];
        el.emit('changeLanguage', {
          value: action.value
        }, false)
      }

    },
  },


});