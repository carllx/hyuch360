// const $tag = document.querySelector("#tag");
// import _ from 'lodash';
// import AFRAME from 'aframe';

import * as OPERE from './opere';

// user components
require('./components/o_marker.js');
require('./components/o_lang.js');




const opere = OPERE.map(
	item => `
<a-entity 
	o_marker="
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

window.onload = ()=>{
	const $opere = document.querySelector("#opere");
	$opere.innerHTML = opere.join("")
}



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