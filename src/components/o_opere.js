require('./o_plane.js');
require('./o_prof.js');



AFRAME.registerComponent("o_opere",{
	// dependencies: ['o_lang'],
	// multipel:true,
	schema: {
		camera_id: {type:"int"},
		position: {type:"array"},
		rotation: {type:"array"},
		scale: {type:"array"},
		quaternion: {type:"array"},
		oid: {type:'number'},
		year: {type:'string'},
		height: {type:'number'},
		width: {type:'number'},
		language:{type:'string',default :'en'},
		prof_it: {type:"array"},
		prof_en: {type:"array"},
		mat_it: {type:'string'},
		mat_en: {type:'string'},
		title_en: {type:'string'},
		title_it: {type:'string'},
	},
	init: function() {
		this.oid = this.data.oid;
		const position = this.data.position
		const rotation = this.data.rotation
		const scale = this.data.scale
		this.el.object3D.position.set(position[0],position[1],position[2])
		this.el.object3D.rotation.set(rotation[0],rotation[1],rotation[2])
		this.el.object3D.updateMatrixWorld()
		

		// Create title  
		this.$title = document.createElement("a-entity");
		this.$title.setAttribute('text',{value:this.data[`title_${this.data.language}`],wrapCount:15})
		// this.$title.setAttribute('bind__text',`value:this.data["title_language"]`)
		this.el.appendChild( this.$title );
		this.el.setAttribute('bind',`visible:room_at === ${this.data.camera_id}`)
		

		
		//create plane
		// this.plane = document.createElement('a-entity');
		// this.plane.setAttribute('o_plane',{});
		// this.plane.object3D.scale.set(scale[0],scale[1],scale[2])
		// this.el.appendChild( this.plane );

		// create Prof
		this.creatProf('en',this.data.camera_id)
		
		
		
		// 隐藏听命
		// if(this.data.camera_id === 1){

		// 	this.el.setAttribute('visible', true);
		// }else{
		// 	this.el.setAttribute('visible', false);
		// }

		// this.el.addEventListener("onRoom", (evt )=> {

		// 	if(this.data.camera_id === evt.detail.id){
		// 		this.el.setAttribute('visible', true);
		// 	}else{
		// 		this.el.setAttribute('visible', false);
		// 	}
		// })


		this.el.addEventListener("changeLanguage", (evt )=> {
			const data=this.data
			// debugger
			this.$title.setAttribute("text", {value: data[`title_${evt.detail.value}`].toUpperCase()});
			// EL prof -remove
			this.$prof_group.remove()

			// create Prof
			// const camera_id = AFRAME.scenes[0].systems.state.state.room_at
			this.creatProf(evt.detail.value,this.data.camera_id)

		});
	},//init 
	update:function(){
		// this.$title.setAttribute('text',{value:this.data[`title_${this.data.language}`]})
	},
	creatProf:function(language,camera_id){
		this.$prof_group = document.createElement('a-entity');
		for (let i = 0; i < this.data[`prof_${language}`].length; i++) {
			// debugger
			const prof_item = this.data[`prof_${language}`][i];
			const $prof = document.createElement('a-entity');
			$prof.setAttribute(`o_prof`,{value:[prof_item],title:this.data[`title_${this.data.language}`],'camera_id':camera_id});
			$prof.setAttribute('position', `${0.7*i} -1 0.1`);//一字排开
			$prof.setAttribute('look-at', "[camera]");
			this.$prof_group.appendChild( $prof );
			
		}
		this.el.appendChild( this.$prof_group );
	}
	
});

