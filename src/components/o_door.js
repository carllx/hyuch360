
const rooms = require('../static/camera')

AFRAME.registerComponent("o_door", {
    schema: {
        index:{type:'int'},
        onRoomId:{type:'int'},
    },
    init:function(){
        this.opereELs= this.el.sceneEl.querySelectorAll('[o_opere]')
        // this.filterEls= this.el.sceneEl.querySelectorAll('[room_filter]')
        this.doorELs= this.el.sceneEl.querySelectorAll('[o_door]')
        this.sky = this.el.sceneEl.querySelector('#background');
        this.cam = this.el.sceneEl.querySelector('#cam');
        const sky = this.sky
        const cam = this.cam
        
        
        this.el.setAttribute('look-at',"[camera]")
        this.el.setAttribute('bind',`visible:room_at === ${this.data.onRoomId}`)

        // Create text  
		this.el.setAttribute("text",{
            value:this.data.index,
            width:0.3,
            zOffset: 0.1,
            wrapCount:  3,
            align:'center',
        })
        

        // create Loc icon
        const $loc = document.createElement('a-image');
        $loc.setAttribute('src', `#LOC1`);
        $loc.setAttribute('width',0.7);
        $loc.setAttribute('height',0.7);
        $loc.setAttribute('position','0 -0.1 0');
        $loc.setAttribute('look-at',"[camera]")
        $loc.setAttribute('bind-toggle__raycastable',`room_at === ${this.data.onRoomId}`)
        // $loc.setAttribute('bind__visible',`room_at === ${this.data.onRoomId}`)

        this.el.appendChild( $loc );

        //create arrow
        const $arrow = document.createElement('a-curvedimage');
        $arrow.setAttribute('src', `#LOC2`);
        $arrow.setAttribute('radius',0.2);
        $arrow.setAttribute('height',0.3);
        $arrow.setAttribute('position',"0 -0.2 0");
        $arrow.setAttribute('theta-length',270);
        $arrow.setAttribute('rotation',"0 0 0");
        // $arrow.setAttribute('bind__visible',`room_at === ${this.data.onRoomId}`);
        $arrow.setAttribute('animation',{property: 'rotation', to: '0 -360 0', loop: true, dur: 1500,easing:'linear'})
        this.el.appendChild( $arrow );

        // 隐藏听命
		// if(this.data.onRoomId === 1){
        //     this.el.setAttribute('visible', true);
        //     this.el.setAttribute('raycastable','')
		// }else{
		// 	this.el.setAttribute('visible', false);
        // }


        // this.el.addEventListener("onRoom", (evt )=> {
                
        //     if(this.data.onRoomId === evt.detail.id){
        //         // debugger
        //         this.el.setAttribute('visible', true);
		// 		this.el.setAttribute('raycastable','')
                
        //     }else{
        //         this.el.setAttribute('visible', false);
		// 		this.el.removeAttribute('raycastable','')
                
        //     }
        // })

        $loc.addEventListener('click',(evt)=>{
            const cam_data = rooms.filter(i=>(i.cam_index===this.data.index))
            // debugger
            const cam_loc = cam_data[0]['cam_loc'].split(',')
            
            sky.setAttribute('src', `#room${this.data.index}`)
            cam.setAttribute('position', {x :cam_loc[0],y :cam_loc[1],z :cam_loc[2]})
            AFRAME.scenes[0].emit('changeRoom', {room_at:this.data.index})
            
            // for (let i = 0; i < this.filterEls.length; i++) {
            for (let i = 0; i < this.opereELs.length; i++) {
                const el = this.opereELs[i];
                el.emit('onRoom',{id:this.data.index},false)
            }

            if (ga) {
                console.log('ga-enter_room')
                ga('send', {
                    hitType: 'event',
                    eventCategory: '360',
                    eventAction: 'enter_room',
                    eventLabel: `sala_${this.data.index}`
                    });
            };

            // for (let i = 0; i < this.doorELs.length; i++) {
            //     const el = this.doorELs[i];
            //     el.emit('onRoom',{id:this.data.index},false)
            // }
            

            
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