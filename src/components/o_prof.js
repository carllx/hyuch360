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
        value:{type:'array'},
        title:{type:'string'}
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
        // BUG: 不能使用 this.position
        // this.position = $EL.object3D.position
        // position.copy( $EL.object3D.position );
        // const position = this.position.copy( $EL.object3D.position );
        // const position = $EL.object3D.position;

        // AERA  professore
        // ===============
        const AERA_professore_w = 0.7
        const $area_prof = document.createElement('a-entity');
        $EL.appendChild( $area_prof );
        $EL.setAttribute('look-at', "[camera]");
        
        //EL avatar  
        const $avatar = document.createElement('a-image');
        $avatar.setAttribute('src', `#${element['name'].replace(' ','').replace("’",'')}`);
        $avatar.setAttribute('width',0.4);
        $avatar.setAttribute('height',0.4);
        $avatar.setAttribute('raycastable','')
        $avatar.addEventListener('click',(evt)=>{
            debugger
            $EL.emit('open',{onProf:evt.detail.intersection.object.geometry.uuid,distance:evt.detail.intersection.distance})
            $close.setAttribute('raycastable','')
            // $avatar[$area_comment.childNodes.length-1].setAttribute('raycastable','')
        },false)
        $area_prof.appendChild( $avatar );
        // EL  name
        const $name= document.createElement('a-entity');
        $name.setAttribute('text',{value:element['name'],width:AERA_professore_w,wrapCount:15,xOffset:0.18});
        $name.setAttribute('position', `0 -0.3 0`);
        $area_prof.appendChild( $name );
        // assessorato
        const $assor = document.createElement('a-entity');
        $assor.setAttribute('text',{font:'sourcecodepro',value:`${element['assessorato']}`,baseline:'top',width:AERA_professore_w,wrapCount:20,xOffset:0.18,opacity:0,transparent: true});
        $assor.setAttribute('position','0 -0.37 0');
        $area_prof.appendChild( $assor );
        // ReadMore
        const $btn = document.createElement('a-plane');
        $btn.setAttribute('height',0.25);
        $btn.setAttribute('width',0.5);
        $btn.setAttribute('color','#05000b');
        $btn.setAttribute('material',{opacity:0,transparent: true});
        $btn.setAttribute('text',{value:`Read More`,width:0.4,wrapCount:9,align:'center',opacity:0,transparent: true});
        $btn.setAttribute('position','0 -0.7 0');
        $area_prof.setAttribute('look-at', "[camera]");
        $area_prof.appendChild( $btn );

        // AERA _comment
        // ===============
        const $area_comment = document.createElement('a-entity');
        $area_comment.setAttribute('visible', false);
        $EL.appendChild( $area_comment );
        let c_width_total=0// layout
        const c_width = 2
        // $title
        const $title= document.createElement('a-entity');
        $title.setAttribute('text',{value:this.data.title,opacity:0,transparent: true,width:c_width,wrapCount:28,align:'left'});
        $title.setAttribute('position', `0 0.1 0`);
        $area_comment.appendChild( $title );
        
        
        
        //EL $comments
        
        for (let i = 0; i < element['comment'].length; i++) {

            const $pane = document.createElement('a-entity');
            $pane.setAttribute('position', `${2.1*i} 0 0`);
            $area_comment.appendChild($pane )
            // $pane.setAttribute('text',{font:'sourcecodepro',value:`${element['comment'][i]}..`,opacity:0,transparent: true});
            $pane.setAttribute('look-at', "[camera]");
            $pane.setAttribute('text',{value:`${element['comment'][i]}`,opacity:0,transparent: true,wrapCount:40,baseline:'top'});
            //get text height&width
            $pane.setAttribute('geometry',{primitive: 'plane', height: 1.2, width: c_width});
            $pane.setAttribute('material',{shader: 'flat',color:'#565182',opacity:0,transparent: true});
            c_width_total+=$pane.components.geometry.attrValue.width;
            
        }
            // const h = el.components.geometry.attrValue.height
            // const w = el.components.geometry.attrValue.width
            // console.log(`h:${h}\nw:${w}`)
        // AERA close
        // ===============
        const  $close = document.createElement('a-entity');
        $close.setAttribute('text',{value:'x',align:'center',color:'#ffffff',width:0.1,wrapCount:1.38,opacity:0,transparent: true});
        $close.setAttribute('geometry', {primitive: 'circle', radius: 0.1});
        $close.setAttribute('material', {shader: 'flat', color: '#1f1f1f',opacity:0,transparent: true});
        $close.setAttribute('look-at', "[camera]");
        this.el.appendChild( $close )
        
        $close.addEventListener("click", (evt)=> {
            evt.target.removeAttribute('raycastable','')
            $EL.emit('close','')
        },false)
        
        


        $EL.addEventListener("open", (evt)=> {
            // debugger
            console.log('open');
            const distance = evt.detail.distance
            // 已经打开的 prof 关闭
            if (document.querySelector('#opened')) document.querySelector('#opened').emit('close')
            AFRAME.scenes[0].emit('activeProf', {onProf:$EL.object3D.uuid})
            // Animation
            let tl = AFRAME.ANIME.timeline({
                easing: 'easeOutExpo',
                duration: 250,
                // delay: function(el, i) { return i * 100; },
                begin:function(){
                    $area_comment.setAttribute('visible', true);
                    $area_comment.setAttribute('id', 'opened');
                },complete:function(){
                    $close.setAttribute('raycastable','')
                }
            },'-=100');
            tl
            .add({targets: document.querySelector('a-sky').components.material.material.color,r: 0.5, g: 0.5, b: 0.5,duration: 1000})
            .add({targets: $EL.object3D.position,x: 0,y: 0,z: distance-2.5},'-=900')
            .add({targets: $area_prof.object3D.position,x: -(c_width-0.4),y: 0.15,z: 0},'-=900')
            .add({targets: $assor.components.text.shaderObject.uniforms.opacity,value:1})
            .add({targets: $title.components.text.shaderObject.uniforms.opacity,value:1})
            $area_comment.querySelectorAll('[text]').forEach(item => {
                tl.add({targets: item.components.text.shaderObject.uniforms.opacity, value:1});
            });
            tl
            .add({targets: $btn.components.text.shaderObject.uniforms.opacity,value:1})
            .add({targets: $btn.components.material.material,opacity:1})
            .add({targets: $close.object3D.position,x: c_width_total-(c_width/3),y: 0,z: 0})
            .add({targets: $close.components.text.shaderObject.uniforms.opacity,value:1},'-=250')
            .add({targets: $close.components.material.material,opacity:1})
        });
        // Debug Layout
        // $area_prof.setAttribute('position', `-${c_width-0.4} 0.25 0`);
        // $assor.setAttribute('text',{opacity:1});
        // $title.setAttribute('text',{opacity:1});
        // $area_comment.setAttribute('visible', true);
        // $area_comment.querySelectorAll('[text]').forEach(item => {
            //     item.setAttribute('text',{opacity:1});
            // });
        // $btn.setAttribute('material',{opacity:1,transparent: true});
        // $btn.setAttribute('text',{opacity:1});
        // $close.setAttribute('position', `${c_width_total-(c_width/3)} 0 0`);
        // $close.setAttribute('text',{opacity:1});
        // $close.setAttribute('material', {opacity:1});
        // $close.setAttribute('raycastable','')
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
                    $close.removeAttribute('raycastable','')
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