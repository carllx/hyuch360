
const rooms = require('../static/camera')
const profs = [
    {id:"CRISTINAACIDINI",position:"-0.06195 -0.04782 0"},
    {id:"DARIONARDELLA",position:"0.05027 -0.03105 -0.42"},
    {id:"FANDIAN",position:"-0.30689 -0.19036 -0.32"},
    {id:"SHANGHUI",position:"-0.34803 -0.14812 -0.31"},
    {id:"SHAODAZHEN",position:"0.13405 -0.11574 -0.4"},
    {id:"TOMMASOSACCHI",position:"-0.00396 -0.18007 -0.31"},
    {id:"VINCENZOVACCARO",position:"-0.19627 -0.10752 -0.25"},
]

// {id:"CRISTINAACIDINI",x:-0.06195,y:-0.04782,z: 0},
// {id:"DARIONARDELLA",x:0.05027,y:-0.03105,z: -0.42},
// {id:"FANDIAN",x:-0.30689,y:-0.19036,z: -0.32},
// {id:"SHANGHUI",x:-0.34803,y:-0.14812,z: -0.31},
// {id:"SHAODAZHEN",x:0.13405,y:-0.11574,z: -0.4},
// {id:"TOMMASOSACCHI",x:-0.00396,y:-0.18007,z: -0.31},
// {id:"VINCENZOVACCARO",x:-0.19627,y:-0.10752,z: -0.25},
AFRAME.registerComponent("book", {
    schema: {
        
    },
    init:function(){

        
        this.el.setAttribute('position','5 -1.2 -0.2')
        // book
        const $book = document.createElement('a-gltf-model');
        $book.setAttribute('rotation',"0 -25 0");
        $book.setAttribute('position','-0.4 0 0')
        $book.setAttribute('src','#book')
        this.el.appendChild($book);
        this.el.addEventListener("activeBook", open,false)

        // pfof
        //EL avatar
        const $prof_group = document.createElement('a-entity');
        this.el.appendChild($prof_group);
        for (let i = 0; i < profs.length; i++) {
            const p = profs[i];
            const $avatar = document.createElement('a-image');
            $avatar.setAttribute('src', `#${p.id}`);
            $avatar.setAttribute('position', p.position);
            $avatar.setAttribute('width',0.1);
            $avatar.setAttribute('height',0.1);
            $avatar.setAttribute('raycastable','')
            $avatar.setAttribute('profbook','')
            $prof_group.appendChild( $avatar );
            
            // this.randomValues($avatar.object3D.position)
            
            
        }
        // this.randomValues()
        

        // logos


    },
    open: (evt)=>{
        console.log('open Book')
    },
    randomValues: function(targe){
        // debugger
        // const that =this;
        // 
         console.log(targe)
        const animationLoop =function(){
            const rdm = function(){return AFRAME.ANIME.random(0, 1)}
            // debugger
            AFRAME.ANIME({
                targets: targe,
                x:`+=${rdm()/80}`,
                y:`+=${rdm()/80}`,
                z:`+=${rdm()/80}`,
                easing: 'easeInOutSine',
                duration: 10000,
                complete: animationLoop
                });
       
        } 
        animationLoop()
        
        
        
        
      }
      
      

    
})
