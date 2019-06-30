AFRAME.registerComponent("o_lang", {
    schema: {
        text:{type:"string"}
    },
    init: function() {
        
        this.el.setAttribute("text",{
            value:this.data.text.toUpperCase(),
            width:0.5,
            zOffset: 0.6,
            wrapCount:  3,
            align:'center',
            
        })
        
        
        this.el.addEventListener("click",()=>{
            // this.onClick();
            // console.log(`emitting...change_lan to:${this.data.text}`); 
            // this.el.emit("changeLanguage",null)
            // this.$marker.addState(this.data.text)
            this.markerELs= this.el.sceneEl.querySelectorAll('[o_marker]')
            for (let i = 0; i < this.markerELs.length; i++) {
                const el = this.markerELs[i];
                el.emit('changeLanguage',{value:this.data.text},false)
            }
            // this.$marker.emit('changeLanguage',{value:this.data.text},false)
            // this.el.emit("changeLanguage",{value:this.data.text},true)
        })

        
    
    },
    
});