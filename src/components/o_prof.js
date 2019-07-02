// require('./o_title.js');
const wix = require('./wix.js')

// "title_it": "STRADA DEL PELLEGRINAGGIO",
// "title_en": "PILGRIMAGE ROUTE",
// "title_cn": "朝拜行列",
// "prof_name": "CRISTINA ACIDINI",
// "comment": "In Strada del pellegrinaggio, la discesa dei personaggi verso di noi, in un sentiero innevato tra costoni d’erba arida, è motivo di esercizio prospettico: mentre i primi della fila appaiono dipinti con rigoroso nitore, via via che lo sguardo si allontana nella profondità del sentiero, gli ultimi rimpiccioliscono e si sfocano nella polvere di nevischio interposta.",
// "lan": "it",
// "index": 1

AFRAME.registerComponent("o_prof", {
    schema: {
        value:{type:'array'}
    },
    init: function (){
        

        // create name
        for (let i = 0; i < this.data.value.length; i++) {
            const element = this.data.value[i];
            //avatar
            const $avatar = document.createElement('a-image');
            // $avatar.setAttribute('src', wix(`${element['wix']}`,100));
            $avatar.setAttribute('src', `#${element['name'].replace(' ','').replace("’",'')}`);
            
            $avatar.setAttribute('position', `${0.5*i} 0 0`);
            $avatar.setAttribute('width',0.3);
            $avatar.setAttribute('height',0.3);
            $avatar.setAttribute('look-at','');
            this.el.appendChild( $avatar );
            
            const $name= document.createElement('a-entity');
		    $name.setAttribute('text',{value:element['name']});
            this.el.appendChild( $name );
        
        
        }
		
    }
})