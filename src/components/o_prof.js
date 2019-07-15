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
// require('./o_boardo.js');



AFRAME.registerComponent("o_prof", {
    schema: {
        value:{type:'array'}
    },
    multiple:true,
    // position : new THREE.Vector3(0, 0, 0),
    
    // init:function(){},
    init: function (){
        // debugger
        const element = this.data.value[0];
        const $EL = this.el
        $EL.setAttribute('look-at', "[camera]");
        let position = new THREE.Vector3(0, 0, 0);
        position = position.copy($EL.object3D.position)
        // this.position = $EL.object3D.position
        // position.copy( $EL.object3D.position );
        // debugger
        
        // const position = this.position.copy( $EL.object3D.position );
        // const position = $EL.object3D.position;
        // EL area professore
        const $area_prof = document.createElement('a-entity');
        // $area_prof.setAttribute('position', `0 2 0`);
        $EL.appendChild( $area_prof );
        // EL  name
        const $name= document.createElement('a-entity');
        $name.setAttribute('text',{value:element['name'],align:'center',width:1.5});
        $name.setAttribute('position', `0 -0.3 0`);
        $area_prof.appendChild( $name );
        //EL avatar  
        const $avatar = document.createElement('a-image');
        $avatar.setAttribute('src', `#${element['name'].replace(' ','').replace("’",'')}`);
        $avatar.setAttribute('width',0.4);
        $avatar.setAttribute('height',0.4);
        $avatar.setAttribute('raycastable','')
        $avatar.addEventListener('click',(evt)=>{
            // debugger
            $EL.emit('open',{onProf:evt.detail.intersection.object.geometry.uuid,distance:evt.detail.intersection.distance})
            
            // EL $close
            $close.setAttribute('raycastable','')
            // $avatar[$area_comment.childNodes.length-1].setAttribute('raycastable','')
        },false)
        $area_prof.appendChild( $avatar );


        // EL area_comment
        const $area_comment = document.createElement('a-entity');
        $area_comment.setAttribute('visible', false);
        // $area_comment.setAttribute('position', `0 0 0`);
        $EL.appendChild( $area_comment );

        //EL $comments
        for (let i = 0; i < element['comment'].length; i++) {

            const $pane = document.createElement('a-entity');
            $pane.setAttribute('position', `${2.1*i} 0 0`);
            $area_comment.appendChild($pane )
            // $pane.setAttribute('text',{font:'sourcecodepro',value:`${element['comment'][i]}..`,opacity:0,transparent: true});
            $pane.setAttribute('look-at', "[camera]");
            $pane.setAttribute('text',{value:`${element['comment'][i]}`,opacity:0,transparent: true,wrapCount:30});
            //get text height&width
            $pane.setAttribute('geometry',{primitive: 'plane', height: 1.2, width: 2});
            $pane.setAttribute('material',{shader: 'flat',color:'#565182',opacity:0,transparent: true});
            const $product = document.createElement('a-entity');
            $product.setAttribute('text',{font:'sourcecodepro',value:`---<IL REGNO DELLA PUREZZA>`});
        }


        // EL close
        const  $close = document.createElement('a-entity');
        $close.setAttribute('text',{value:'X',align:'center',color:'#ffffff',width:0.1,wrapCount:1.38});
        $close.setAttribute('position', `0 -0.5 0`);
        $close.setAttribute('geometry', {primitive: 'circle', radius: 0.1});
        $close.setAttribute('material', {shader: 'flat', color: '#1f1f1f',opacity:0,transparent: true});
        $close.setAttribute('raycastable','')
        $area_comment.appendChild( $close )
        
        $close.addEventListener("click", (evt)=> {

            
            evt.target.removeAttribute('raycastable','')
            $EL.emit('close','')
            // const h = el.components.geometry.attrValue.height
            // const w = el.components.geometry.attrValue.width
            // console.log(`h:${h}\nw:${w}`)
            
        },false)
        
        

        $EL.addEventListener("open", (evt)=> {
            
            // debugger
            console.log('open');
            const distance = evt.detail.distance
            //clean
            AFRAME.scenes[0].emit('activeProf', {onProf:$EL.object3D.uuid})
            if (document.querySelector('#opened')) document.querySelector('#opened').emit('close')

            $area_comment.setAttribute('visible', true);
            $area_comment.setAttribute('id', 'opened');

            
            // Animation
            let tl = AFRAME.ANIME.timeline({
                easing: 'easeOutExpo',
                // delay: function(el, i) { return i * 100; },
                duration: 250
            });
            tl.add({targets: document.querySelector('a-sky').components.material.material.color,r: 0.5, g: 0.5, b: 0.5,duration: 1000})
            .add({targets: $EL.object3D.position,x: 0,y: 0,z: distance-3},'-=600')
            .add({targets: $area_prof.object3D.position,x: -0.5,y: 0.7,z: 0})
            $area_comment.querySelectorAll('[text]').forEach(item => {
                tl.add({targets: item.components.text.shaderObject.uniforms.opacity, value:1});
            });
        });
        
        const animeClose=evt=>{
            console.log('close')
            // debugger
            // Animation
            let tl = AFRAME.ANIME.timeline({
                easing: 'easeOutExpo',
                // delay: function(el, i) { return i * 100; },
                duration: 150,
                complete:function(){
                    console.log(this.position)
                    $area_comment.setAttribute('visible', false);
                    $area_comment.removeAttribute('id', 'opened');
                }
            })
            $area_comment.querySelectorAll('[text]').forEach(item => {
                tl.add({targets: item.components.text.shaderObject.uniforms.opacity, value:0,duration: 100});
            })
            tl
            .add({targets: document.querySelector('a-sky').components.material.material.color,r: 1, g: 1, b: 1})
            .add({targets: $EL.object3D.position,...position})
            .add({targets: $area_prof.object3D.position,x: 0,y: 0,z: 0,duration: 700},'-=150');
        }
        $EL.addEventListener("close", animeClose)
    }
    // update:function(oldData){
    //     if(oldData!==this.data) {debugger}
    //     for (let i = 0; i < this.data.value.length; i++) {
    //         const element = this.data.value[i];
    //     }
        
    // },
    
})