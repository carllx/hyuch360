
const rooms = require('../static/camera')

AFRAME.registerComponent("o_door", {
    schema: {
        index:{type:'int'},
        onRoomId:{type:'int'},
    },
    init:function(){
        this.markerELs= this.el.sceneEl.querySelectorAll('[o_marker]')
        this.doorELs= this.el.sceneEl.querySelectorAll('[o_door]')
        this.sky = this.el.sceneEl.querySelector('#background');
        this.cam = this.el.sceneEl.querySelector('#cam');
        const sky = this.sky
        const cam = this.cam
        // const this = this;

        // Create text  
		this.el.setAttribute("text",{
            value:this.data.index,
            width:0.5,
            zOffset: 0.6,
            wrapCount:  3,
            align:'center',
            
        })
        

        // 隐藏听命
		if(this.data.onRoomId === 1){
			this.el.setAttribute('visible', true);
		}else{
			this.el.setAttribute('visible', false);
        }
        this.el.addEventListener("onRoom", (evt )=> {
                
            if(this.data.onRoomId === evt.detail.id){
                // debugger
                this.el.setAttribute('visible', true);
            }else{
                this.el.setAttribute('visible', false);
            }
        })

        this.el.addEventListener('click',(evt)=>{
            const cam_data = rooms.filter(i=>(i.cam_index===this.data.index))
            // debugger
            const cam_loc = cam_data[0]['cam_loc'].split(',')
            console.log(`on Room ${this.data.index}`)
            console.log(`cam_loc`)
            
            sky.setAttribute('src', `#room${this.data.index}`)
            // cam.object3D.position = {x :cam_loc[0],y :cam_loc[1],z :cam_loc[2]}
            cam.setAttribute('position', {x :cam_loc[0],y :cam_loc[1],z :cam_loc[2]})

            
            for (let i = 0; i < this.markerELs.length; i++) {
                const el = this.markerELs[i];
                el.emit('onRoom',{id:this.data.index},false)
            }

            for (let i = 0; i < this.doorELs.length; i++) {
                const el = this.doorELs[i];
                el.emit('onRoom',{id:this.data.index},false)
            }


            
            // debugger
            // if(this.data.onRoomId === this.data.index){
            //     debugger
            //     this.el.setAttribute('visible', true);
            // }else{
            //     this.el.setAttribute('visible', false);
            // }


        }) 
    }

    
})