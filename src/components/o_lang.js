AFRAME.registerComponent("o_lang", {
    schema: {
        text:{type:"string"}
    },
    init: function() {
        
        this.el.setAttribute("text",{
            value:this.data.text.toUpperCase(),
            width:0.6,
            zOffset: 0.6,
            wrapCount: 10,
            align:'center',
        })
        
        this.el.addEventListener("click",()=>{
            const l = this.data.text === 'ENGLISH'?'en':'it'
            AFRAME.scenes[0].emit('changeLanguage', {value:l },false)
        })
    
    },
    
});