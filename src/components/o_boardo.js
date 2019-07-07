AFRAME.registerComponent("o_boardo", {

    schema: {
        scrive:{type:'array'},
    },
    init:function(){
        
        // this.camera = this.el.sceneEl.querySelector('#cam')
        
        //EL $content
        for (let i = 0; i < this.data.scrive.length; i++) {

            const $pane = document.createElement('a-entity');
            $pane.setAttribute('position', `0 ${0.5*i} 0`);
            this.el.appendChild($pane )
            const $content = document.createElement('a-entity');
            $content.setAttribute('text',{font:'sourcecodepro',value:`${this.data.scrive[i]}..`});
            // $content.setAttribute('position', `0 ${0.5*i} 0`);
            $pane.appendChild($content ) 
            // debugger
            // const totalWidth = $content.data.value.length * ($content.data.width / $content.data.wrapCount)
            
            const $product = document.createElement('a-entity');
            $product.setAttribute('text',{font:'sourcecodepro',value:`---<IL REGNO DELLA PUREZZA>`});
            // $product.setAttribute('position', `0 ${0.5*i} 0`);
            
            
            
            $pane.appendChild($product )
            
        }
        
        // EL close
        const  $close = document.createElement('a-entity');
        $close.setAttribute('text',{value:'X',align:'center',color:'#ffffff',width:0.1,wrapCount:1.38});
        $close.setAttribute('position', `0 -0.5 0`);
        $close.setAttribute('geometry', {primitive: 'circle', radius: 0.1});
        $close.setAttribute('material', {shader: 'flat', color: '#1f1f1f'});
        $close.setAttribute('raycastable','')
        this.el.appendChild( $close )
        
        $close.addEventListener("click", (evt)=> {

            // console.log(this.el.children[0].components.text.attrValue)
            console.log(evt.target.parentEl.children[0].components.text.attrValue)
            // debugger
            evt.target.removeAttribute('raycastable','')
            // $close.removeAttribute('raycastable','')
            evt.target.parentEl.setAttribute('visible', false);
        },false)
        
        

        
    }

    
})