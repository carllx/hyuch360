// require('./o_title.js');
// const wix = require('./wix.js')
// require('./o_boardo.js');

// "title_it": "STRADA DEL PELLEGRINAGGIO",
// "title_en": "PILGRIMAGE ROUTE",
// "title_cn": "朝拜行列",
// "prof_name": "CRISTINA ACIDINI",
// "comment": "In Strada del pellegrinaggio, la discesa dei personaggi verso di noi, in un sentiero innevato tra costoni d’erba arida, è motivo di esercizio prospettico: mentre i primi della fila appaiono dipinti con rigoroso nitore, via via che lo sguardo si allontana nella profondità del sentiero, gli ultimi rimpiccioliscono e si sfocano nella polvere di nevischio interposta.",
// "lan": "it",
// "index": 1
require('./o_boardo.js');
AFRAME.registerComponent("o_prof", {
    schema: {
        value:{type:'array'}
    },
    // init:function(){},
    init: function (){
        
        // debugger
        for (let i = 0; i < this.data.value.length; i++) {
            const element = this.data.value[i];
            // EL  name
            const $name= document.createElement('a-entity');
		    $name.setAttribute('text',{value:element['name'],align:'center'});
		    $name.setAttribute('position', `${0.5*i} -0.2 0`);
            this.el.appendChild( $name );
            // EL broado
            const $boardo = document.createElement('a-entity');
            $boardo.setAttribute('o_boardo',{'scrive':element['comment']});
            $boardo.setAttribute('visible', false);
            $boardo.setAttribute('position', `0 0 2`);
            $boardo.setAttribute('look-at', "[camera]");
            $name.appendChild( $boardo );

            //EL avatar
            const $avatar = document.createElement('a-image');
            // $avatar.setAttribute('src', wix(`${element['wix']}`,100));
            $avatar.setAttribute('src', `#${element['name'].replace(' ','').replace("’",'')}`);
            $avatar.setAttribute('position', `${0.5*i} 0 0`);//一字排开
            $avatar.setAttribute('width',0.3);
            $avatar.setAttribute('height',0.3);
            $avatar.setAttribute('look-at','');
            $avatar.setAttribute('raycastable','')
            $avatar.addEventListener('click',(evt)=>{
                // this.$boardo.emit('scrive',{words:element['comment']})
                // debugger
                // $close
                console.log(evt.detail.intersection.distance)
                $boardo.childNodes[$boardo.childNodes.length-1].setAttribute('raycastable','')
                $boardo.setAttribute('visible',true)
                $boardo.setAttribute('position', `0 0 ${evt.detail.intersection.distance*0.6}`);
            },false)
            this.el.appendChild( $avatar );
            

            

            // const $COMMENTS = document.createElement('a-entity');
            // this.el.appendChild( $COMMENTS );
            // for (let j = 0; j < element['comment'].length; j++) {
            //     const $comment = document.createElement('a-entity');
            //     const content = element['comment'][j];
            //     $comment.setAttribute('text',{value:content,color:'#000000'});
            //     $COMMENTS.appendChild( $comment );
                
            // }
            
        
        
        }
		
    },
    // update:function(oldData){
    //     if(oldData!==this.data) {debugger}
    //     for (let i = 0; i < this.data.value.length; i++) {
    //         const element = this.data.value[i];
    //     }
        
    // },
    
})