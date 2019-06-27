AFRAME.registerComponent("o_plane", {
	schema: {
		color: { default: "red", type: "color" },
	},
	init: function() {
		this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
		this.material = new THREE.LineBasicMaterial({
			color: this.data.color,
			linewidth: 5,
			transparent: true,
			opacity: 0.2
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.el.setObject3D("mesh", this.mesh);

		this.el.addEventListener("omarkerhover",()=>{
            // this.onClick();
            // console.log(`emitting...change_lan to:${this.data.text}`);            
            console.log(` oplane heared omarkerhover`);            
            this.el.emit("changeLanguage",null)
            // this.el.emit("changeLanguage",{value:this.data.text},true)
            // debug
        })

		this.el.addEventListener("click", () =>{
            // console.log("un oplane clicked");
            this.el.emit('oclick',{},false);
			// this.el.setAttribute();
		});
		this.el.addEventListener("mouseenter", (evt) =>{
			console.log("zai   hover");
		});
	}
});