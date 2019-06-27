AFRAME.registerComponent("o_title", {
	schema: {
		value: { type: 'string' },
		Zoffset: { default: 1, type: "number" },
		align: { default: 'left' },
		anchor: { default: 'center' },
		letterSpacing: { default: -1.360 },
		yOffset: { type: 'number' },
		show: { default: false },
		// showTime: { default: ACTIVE_TIME },
		width: { default: 1 },
		wrapCount: { default: 20 },
		
	},
	init: function() {
		
		this.el.setAttribute( 'text', {
			value: this.data.value,
			align: this.data.align,
			alphaTest: 0.5,
			anchor: this.data.anchor,
			baseline:"top",
			color: new THREE.Color( 0xFFFFFF ),
			// font: 'fonts/NowAlt-Bold.json',
			letterSpacing: this.data.letterSpacing,
			shader: 'msdf',
			transparent: true,
			opacity: this.opacity,
			width: this.data.width,
			wrapCount: this.data.wrapCount
        });
        
        
        

		this.el.setAttribute("animation__mouseenter", {
			property: "position",
			to: "0 .5 0", // to:new THREE.Vector3( 5,5,5 ),
			startEvents: "oclick",
			dur: 500,
			easing: "easeOutQuart"
		});
		this.el.setAttribute("animation__mouseleave", {
			property: "position",
			to: "0 0 0", // to:new THREE.Vector3( 5,5,5 ),
			startEvents: "mouseleave",
			dur: 500,
			easing: "easeOutQuart"
        });
    },
    update:()=>{

    },

    updateSchema:()=>{

    }
});