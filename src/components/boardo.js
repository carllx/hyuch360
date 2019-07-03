AFRAME.registerComponent("boardo", {
    schema: {
        // open:{type:'boolean'},
        // comments:{type:'array'},
    },
    init:function(){
        // this.markerELs= this.el.sceneEl.querySelectorAll('[o_marker]')
        this.el.setAttribute('visible', false);
        this.camera = this.el.sceneEl.querySelector('#cam')
        
        
        
        // EL close
        const  $close = document.createElement('a-entity');
        $close.setAttribute('text',{value:'X',align:'center'});
        $close.setAttribute('position', `0 -0.5 0`);
        $close.setAttribute('geometry', {primitive: 'plane', height: 'auto', width: 'auto'});
        $close.setAttribute('raycastable','')
        $close.addEventListener("click", ()=> {
            // $close.removeAttribute('raycastable','')
            this.el.emit('scrive',{words:[]})
        },false)
        
        this.el.appendChild( $close )

        


        this.el.addEventListener("scrive", ( evt )=> {
            // debugger
            // 隐藏听命
            if(evt.detail.words.length >0  ){
                
                const position = this.camera.object3D.position
                // position.z += -1
                // debugger
               
                this.el.object3D.position.set(position.x, position.y, position.z-1)
                // this.el.setAttribute('position', position );
                this.el.setAttribute('visible', true);
                $close.setAttribute('raycastable','')
                // debugger
                
                // EL messages group
                this.msgEl = document.createElement('a-entity');
                this.msgEl.setAttribute('id', `msg`);
                this.el.appendChild( this.msgEl )

                for (let i = 0; i < evt.detail.words.length; i++) {
                    
                    const  $content = document.createElement('a-entity');
                    $content.setAttribute('text',{value:evt.detail.words[i]});
                    $content.setAttribute('position', `0 ${0.5*i} 0`);
                    this.msgEl.appendChild($content )
                }
            }else{
                this.el.setAttribute('visible', false);
                $close.removeAttribute('raycastable','')
                this.el.removeChild(this.msgEl)
            }
        })

        
    }

    
})