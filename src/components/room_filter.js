AFRAME.registerComponent("room_filter",{
    schema: {
        camera_id: {  type: "int" },
    },
    init:function(){
        // 隐藏听命

        

		if(this.data.camera_id === 1){
			this.el.setAttribute('visible', true);
			this.el.setAttribute('raycastable','')
		}else{
			this.el.setAttribute('visible', false);
        }
        
        this.el.addEventListener("onRoom", (evt )=> {
            // debugger
            if(this.data.camera_id === evt.detail.id){
                this.el.setAttribute('visible', true);
                this.el.setAttribute('raycastable','')
                
            }else{
                this.el.setAttribute('visible', false);
                this.el.removeAttribute('raycastable','')
            }
        })
    }

    

})