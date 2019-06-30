

require('./o_plane.js');
require('./o_title.js');

AFRAME.registerComponent("o_marker",{
	// dependencies: ['o_lang'],
	// multipel:true,
	schema: {
		camera_id: {  type: "int" },
		position: {  type: "array" },
		rotation: {  type: "array" },
		scale: { type: "array" },
		quaternion: {  type: "array" },
		oid: {type:'number'},
		year: {type:'string'},
		height: {type:'number'},
		width: {type:'number'},
		mat_it: {type:'string'},
		mat_en: {type:'string'},
		mat_cn: {type:'string'},
		title_en: {type:'string'},
		title_cn: {type:'string'},
		title_it: {type:'string'},
		language:{type:'string',default:'it'},
	},
	init: function() {
		this.oid = this.data.oid;
		const position = this.data.position.map(Number)
		// const quaternion = this.data.quaternion.map(Number)
		const rotation = this.data.rotation.map(Number)
		const scale = this.data.scale.map(Number)
		this.title = this.data.title_it;
		
		// const matrix = new THREE.Matrix4().set(...this.data.matrix);
		// this.el.object3D.applyMatrix(matrix);
		
		// const matrix = new THREE.Matrix4()
		// this.position = new THREE.Vector3(position[0],position[1],position[2])
		// this.quaternion = new THREE.Quaternion(quaternion[3],quaternion[0],quaternion[1],quaternion[2])
		// this.scale = new THREE.Vector3(scale[0],scale[1],scale[2]);
		// debugger
		// this.el.object3D.applyMatrix(matrix.compose(this.position, this.quaternion, this.scale));
		this.el.object3D.position.set(position[0],position[1],position[2])
		this.el.object3D.rotation.set(rotation[0],rotation[1],rotation[2])
		// this.el.object3D.scale = {x:scale[0],y:scale[1],z:scale[2]};
		// debugger
		
		
		// Create title  
		this.$title = document.createElement("a-entity");
		this.$title.setAttribute("o_title", {
			value: this.title.toUpperCase(),
		});
		
		//create plane
		this.plane = document.createElement('a-entity');
		this.plane.setAttribute('o_plane',{});
		// this.plane.setAttribute('scale',Object.values(this.scale))
		// this.plane.object3D.scale.x = this.scale
		this.plane.object3D.scale.set(scale[0],scale[1],scale[2])
		// Add 'em up
		this.el.appendChild( this.$title );
		this.el.appendChild( this.plane );
		
		// 隐藏听命
		if(this.data.camera_id === 1){
			this.el.setAttribute('visible', true);
		}else{
			this.el.setAttribute('visible', false);
		}
		

		this.el.addEventListener("mouseenter", (evt )=> {
			console.log("omarker hover");
			
			// this.plane.emit("ohover",null,false)
			// this.plane.emit("omarkerhover",null,false)
		});

		this.el.addEventListener("onRoom", (evt )=> {
			// debugger
			if(this.data.camera_id === evt.detail.id){
				this.el.setAttribute('visible', true);
			}else{
				this.el.setAttribute('visible', false);
			}
		})


		this.el.addEventListener("changeLanguage", (evt )=> {
			// console.log(`o_mark_change_language to ${evt.detail.value}`);
			// console.log(`o_mark_change_language to ${this.$title}`);
			const data=this.data
			this.title = `title_${evt.detail.value}`
			this.$title.setAttribute("text", {
				value: data[`title_${evt.detail.value}`].toUpperCase(),
			});
		});
	},

	// update:()=>{
	// 	// if(this.el.is!='undifined' && this.el.is('en')){
	// 	// 	this.title = this.data.title_en
	// 	// }else if(this.el.is('cn')){
	// 	// 	this.title = this.data.title_cn
	// 	// }else{
	// 	// 	this.title = this.data.title_it
	// 	// }
	// }
});

