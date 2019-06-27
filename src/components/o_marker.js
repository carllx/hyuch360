

require('./o_plane.js');
require('./o_title.js');

AFRAME.registerComponent("o_marker",{
	// dependencies: ['o_lang'],
	// multipel:true,
	schema: {
		matrix: { default: [], type: "array" },
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
		this.title = this.data.title_it;
		
		this.oid = this.data.oid;
		const matrix = new THREE.Matrix4().set(...this.data.matrix);
		this.el.object3D.applyMatrix(matrix);
		this.translation = new THREE.Vector3()
		this.rotation = new THREE.Quaternion()
		this.scale = new THREE.Vector3();
		matrix.decompose(this.translation, this.rotation, this.scale);
		
		
		// Create title  
		this.$title = document.createElement("a-entity");
		this.$title.setAttribute("o_title", {
			value: this.title.toUpperCase(),
		});
		
		//create plane
		this.plane = document.createElement('a-entity');
		this.plane.setAttribute('o_plane',{
			zOffset: 1,
			
		})
		// this.plane.setAttribute('scale',Object.values(this.scale))
		// this.plane.object3D.scale.x = this.scale
		this.plane.object3D.scale.copy(this.scale)
		// Add 'em up
		this.el.appendChild( this.$title );
		this.el.appendChild( this.plane );

		this.el.addEventListener("mouseenter", (evt )=> {
			console.log("omarker hover");
			
			// this.plane.emit("ohover",null,false)
			// this.plane.emit("omarkerhover",null,false)
		});

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

