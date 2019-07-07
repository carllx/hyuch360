

require('./o_plane.js');
require('./o_title.js');
require('./o_prof.js');



AFRAME.registerComponent("o_marker",{
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
		language:{type:'string',default:'it'},
		// it_obj:{type:'object'},
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
		
		
		// Create title  
		this.$title = document.createElement("a-entity");
		this.$title.setAttribute("o_title", {
			value: this.data.title_it.toUpperCase(),
		});
		this.el.appendChild( this.$title );
		
		//create plane
		this.plane = document.createElement('a-entity');
		this.plane.setAttribute('o_plane',{});
		this.plane.object3D.scale.set(scale[0],scale[1],scale[2])
		this.el.appendChild( this.plane );

		// create Prof
		this.$prof = document.createElement('a-entity');
		this.$prof.setAttribute('o_prof',{value:this.data.prof_it});
		this.$prof.setAttribute('position', `0 -1 0.3`);
		this.$prof.setAttribute('look-at', "[camera]");
		this.el.appendChild( this.$prof );

		
		
		// 隐藏听命
		if(this.data.camera_id === 1){

			this.el.setAttribute('visible', true);
			this.plane.setAttribute('raycastable','')
		}else{
			this.el.setAttribute('visible', false);
		}

		this.el.addEventListener("onRoom", (evt )=> {

			if(this.data.camera_id === evt.detail.id){
				this.el.setAttribute('visible', true);
				this.plane.setAttribute('raycastable','')
			}else{
				this.el.setAttribute('visible', false);
				this.plane.removeAttribute('raycastable','')
			}
		})


		this.el.addEventListener("changeLanguage", (evt )=> {

			const data=this.data
			this.$title.setAttribute("text", {value: data[`title_${evt.detail.value}`].toUpperCase()});
			// EL prof
			// this.$prof.setAttribute("o_prof", {value: data[`prof_${evt.detail.value}`]});
			this.$prof.remove()

			// create Prof
			this.$prof = document.createElement('a-entity');
			this.$prof.setAttribute('o_prof',{value: data[`prof_${evt.detail.value}`]});
			this.$prof.setAttribute('position', `0 -1 0.3`);
			this.$prof.setAttribute('look-at', "[camera]");
			this.el.appendChild( this.$prof );

		});
	},//init 
	update:function(){
		// create Prof
		// debugger
		// this.$prof = document.createElement('a-entity');
		// this.$prof.setAttribute('o_prof',{value:this.data.prof_it});
		// this.$prof.setAttribute('position', `0 -1 0.3`);
		// this.$prof.setAttribute('look-at', "[camera]");
		// this.el.appendChild( this.$prof );
	}
});

