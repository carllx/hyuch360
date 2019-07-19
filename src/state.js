const OPERE = require('./static/opere_package.js');


AFRAME.registerState({
  initialState: {
    onProf: ``,
    language: 'it',
    room: 1,
    raycastable_els:[]
    // scenceEls:
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
    zipRay:function(state, action){
      // store ELs Raycastable > raycastable_els
      console.log('zipRay...')
      state.raycastable_els = document.querySelector('a-scene').querySelectorAll('[raycastable]')
      // loop ELs remove Attribuite [Raycastable]
      for (var i of state.raycastable_els) {
        i.removeAttribute('raycastable','') 
      }
    },
    unzipRay:function(state, action){
      // loop ELs raycastable_els > setAttribute raycastable
      console.log('unzipRay...')
      for (var i of state.raycastable_els) {
        i.setAttribute('raycastable','') 
      }
      //cleanup raycastable_els
      state.raycastable_els = []
    }
  },


});