// const $tag = document.querySelector("#tag");
const $opere = document.querySelector("#opere");
// const OPERE = require('opere.js');
import * as OPERE from './opere';
// import _ from 'lodash';
// import AFRAME from 'aframe';

AFRAME.registerComponent("o_lang", {
    schema: {
        text:{type:"string"}
    },
    init: function() {
        this.el.setAttribute("text",{
            value:this.data.text.toUpperCase(),
            width:0.5,
            zOffset: 0.6,
            wrapCount:  3,
            align:'center',
        })
        this.el.addEventListener("click",()=>{
            // this.onClick();
            console.log(`emitting...change_lan to:${this.data.text}`);
            this.el.emit("change_lan",{value:this.data.text})
        })
    
    },
    
});



AFRAME.registerComponent("o_marker",{
	schema: {
		title: {type: "string" },
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
	},
	init: function() {
		
		this.oid = this.data.oid;
		const matrix = new THREE.Matrix4().set(...this.data.matrix);
		this.el.object3D.applyMatrix(matrix);
		this.translation = new THREE.Vector3()
		this.rotation = new THREE.Quaternion()
		this.scale = new THREE.Vector3();
		matrix.decompose(this.translation, this.rotation, this.scale);
		
		
		// Create title  
		this.title = document.createElement("a-entity");
		this.title.setAttribute("o_title", {
			value: this.data.title.toUpperCase(),
		});
		
		//create plane
		this.plane = document.createElement('a-entity');
		this.plane.setAttribute('o_plane',{
			zOffset: 1
		})
		// this.plane.setAttribute('scale',Object.values(this.scale))
		// this.plane.object3D.scale.x = this.scale
		this.plane.object3D.scale.copy(this.scale)
		// Add 'em up
		this.el.appendChild( this.title );
		this.el.appendChild( this.plane );

		this.el.addEventListener("click", () => {
			console.log("una opere e' clicked");
			this.plane.emit('oclick',{},false);
			// this.el.setAttribute();
		});
		this.el.addEventListener("mouseenter", (evt )=> {
			console.log("zai   hover");
			this.plane.emit("ohover",{},false)
		});
	}
});



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

		

		this.el.addEventListener("click", function() {
			console.log("zai here");
			this.el.setAttribute();
		});
		this.el.addEventListener("mouseenter", function(evt) {
			console.log("zai   hover");
		});
	}
});

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
			startEvents: "mouseenter",
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
	}
});

const opere = OPERE.map(
	item => `
<a-entity o_marker="
	oid:${item.id};
	year:${item.year};
	height:${item.height};
	width:${item.width};
	mat_it:${item.mat_it};
	mat_en:${item.mat_en};
	mat_cn:${item.mat_cn};
	matrix:${JSON.parse(item.matrix)};
	title_en:${item.title_en};
	title_cn:${item.title_cn};
	title_it:${item.title_it}">
</a-entity>
`
);

$opere.innerHTML = opere.join("");


// AFRAME.registerComponent("spot", {
// 	schema: {
// 		linkto: { type: "string", default: "" },
// 		spotgroup: { type: "string", default: "" }
// 	},
// 	init: function() {
// 		//add image source of hotspot icon
// 		this.el.setAttribute("src", "#hotspot");
// 		//make the icon look at the camera all the time
// 		this.el.setAttribute("look-at", "#cam");

// 		var data = this.data;

// 		this.el.addEventListener("click", function() {
// 			//set the skybox source to the new image as per the spot
// 			var sky = document.getElementById("skybox");
// 			sky.setAttribute("src", data.linkto);

// 			var spotcomp = document.getElementById("spots");
// 			var currspots = this.parentElement.getAttribute("id");
// 			//create event for spots component to change the spots data
// 			spotcomp.emit("reloadspots", {
// 				newspots: data.spotgroup,
// 				currspots: currspots
// 			});
// 		});
// 	}
// });