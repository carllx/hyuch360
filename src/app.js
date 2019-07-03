// const $tag = document.querySelector("#tag");
// import _ from 'lodash';
// import AFRAME from 'aframe';

const OPERE = require('./static/opere_package.js');
// const wix = require('./components/wix');

// user components
require('./components/o_marker.js');
require('./components/o_lang.js');
require('./components/o_door.js');
require('./components/boardo.js');



// position:${item.location.split(',').map(Number)};无效在 o_marker内还是
//  ["5.991556167602539", "-1.0102713108062744", "3.742217779159546"]
// [0.8999999761581421, 2.299999952316284, 0.06839580088853836]

const creatMarkers = ()=>{
	
	const $opere = document.querySelector("#opere");
	OPERE.forEach((o)=>{

		const $marker = document.createElement('a-entity');
		$marker.setAttribute('o_marker',{
			position: o.location,
			rotation: o.rotation,
			scale: o.dimension,
			quaternion: o.quaternion,
			camera_id: o.camera_id,
			oid: o.id,
			year: o.year,
			height: o.height,
			width: o.width,
			mat_it: o['it']['mat'],
			mat_en: o['en']['mat'],
			title_it: o['it']['title'],
			title_en: o['en']['title'],
			prof_it: o['it']['prof'],
			prof_en: o['en']['prof'],
		})
		
		$opere.appendChild( $marker );
	})
}


const creatPorta = (index,onRoomId,position)=>{
	const $porta = document.querySelector("#porta");
	const port = document.createElement('a-sphere');
	port.setAttribute('o_door',{'index':index,'onRoomId':onRoomId} )
	port.setAttribute('event-set__click',{'index':index,'onRoomId':onRoomId} )
	port.setAttribute('radius',"0.4" )
	port.setAttribute('position',position )
	port.setAttribute('material',{color: '#131313', shader: 'flat'})
	port.setAttribute('look-at',"[camera]")
	port.setAttribute('geometry',{segmentsHeight: 12,segmentsWidth: 9})
	$porta.appendChild( port );

}


const creatDubuggerCam = (name,position)=>{
	const $scene = document.querySelector("#scene");
	const port = document.createElement('a-sphere');
	// port.setAttribute('o_door',{'index':index} )
	port.setAttribute('radius',"0.4" )
	port.setAttribute('position',position )
	port.setAttribute('material',{color: 'yellow', shader: 'flat'})
	port.setAttribute("text",{value:name, width:0.5, zOffset: 0.6, wrapCount:  3, align:'center',
	})
	// port.setAttribute('look-at',"[camera]")
	port.setAttribute('geometry',{segmentsHeight: 12,segmentsWidth: 9})
	$scene.appendChild( port );

}

window.onload = ()=>{
	// opere_componets
	const $opere = document.querySelector("#opere");
	creatMarkers();
	// door_componets
	creatPorta(1,2,'4.96167 -0.3 -3.42365');
	creatPorta(2,1,'4.96167 0.3 -3.42365');
	creatPorta(3,1,'0.446 0.3 2.81129');
	creatPorta(1,3,'0.446 -0.3 3.81129');
	//debugger Cam
	// creatDubuggerCam('cam1','4.895750045776367 -0.5246499180793762 0.3603135049343109')
	// creatDubuggerCam('cam2','4.56270694732666 -0.5246502161026001 -6.886636734008789')
	// creatDubuggerCam('cam3','-4.5805816650390625 -0.5246499180793762 2.2933177135087135e-8')

	
	
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