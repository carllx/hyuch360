// const profs = [
//     {id:"CRISTINAACIDINI",position:"-0.06195 -0.04782 0"},
//     {id:"DARIONARDELLA",position:"0.09 -0.03105 -0.42"},
//     {id:"FANDIAN",position:"-0.30689 -0.19036 -0.32"},
//     {id:"SHANGHUI",position:"-0.34803 -0.14812 -0.31"},
//     {id:"SHAODAZHEN",position:"0.13405 -0.11574 -0.4"},
//     {id:"TOMMASOSACCHI",position:"-0.00396 -0.18007 -0.31"},
//     {id:"VINCENZOVACCARO",position:"-0.19627 -0.10752 -0.25"},
// ]

const profs = [{id:"CRISTINAACIDINI",position:{x:-0.06195,y:-0.04782,z: 0}},
{id:"DARIONARDELLA",position:{x:0.05027,y:-0.03105,z: -0.42}},
{id:"FANDIAN",position:{x:-0.30689,y:-0.19036,z: -0.32}},
{id:"SHANGHUI",position:{x:-0.34803,y:-0.14812,z: -0.31}},
{id:"SHAODAZHEN",position:{x:0.13405,y:-0.11574,z: -0.4}},
{id:"TOMMASOSACCHI",position:{x:-0.00396,y:-0.18007,z: -0.31}},
{id:"VINCENZOVACCARO",position:{x:-0.19627,y:-0.10752,z: -0.25}}]
AFRAME.registerComponent("book", {
    schema: {
        
    },
    init:function(){
        
        this.clickableEls = this.el.sceneEl.querySelectorAll('[raycastable]')
        // debugger
        // this.el.setAttribute('position','5 -1.2 -0.2')
        this.el.setAttribute('look-at', "[camera]");
        //EL book modle
        this.$book = document.createElement('a-gltf-model');
        // this.$book.setAttribute('rotation',"0 -25 0");
        this.$book.setAttribute('position','-0.4 0 -0.3')
        this.$book.setAttribute('src','#book_gltf')
        this.el.appendChild(this.$book);
        this.el.addEventListener("activeBook", open,false)
        //EL prof avatar
        this.$prof_group = document.createElement('a-entity');
        this.el.appendChild(this.$prof_group);
        for (let i = 0; i < profs.length; i++) {
            const p = profs[i];
            const $avatar = document.createElement('a-image');
            $avatar.setAttribute('src', `#${p.id}`);
            $avatar.setAttribute('position', '-10 0 0');
            $avatar.setAttribute('material', {alphaTest:0.5});
            $avatar.setAttribute('width',0.1);
            $avatar.setAttribute('height',0.1);
            $avatar.setAttribute('raycastable','')
            $avatar.setAttribute('prof','')
            this.$prof_group.appendChild( $avatar );
            
            // this.randomValues($avatar.object3D.position)
        }
        // this.randomValues()

        // logos
        const scale = 0.04
        const PalazzoMedci_w = 1024/435 
        const UFFIZI_w = 1024/426 
        const Mandragora_w = 1024/230 
        const $storeText =  document.createElement('a-text');
        $storeText.setAttribute('position','0.247 0.055 0');
        $storeText.setAttribute('text',{value:"Punto di vendita",opacity:1,transparent: true,width:0.15,wrapCount:16,align:'right'});
        const $logo_group = document.createElement('a-entity');
        $logo_group.setAttribute('position', "-0.12 -0.261 0");
        this.el.appendChild($logo_group);
        const $logoMedici = document.createElement('a-image');
        const $logoUffizi = document.createElement('a-image');
        const $logoMandragora = document.createElement('a-image');
        $logoMedici.setAttribute('src', `#logoMedici`);
        $logoUffizi.setAttribute('src', `#logoUffizi`);
        $logoMandragora.setAttribute('src', `#logoMandragora`);
        $logoMedici.setAttribute('material', {alphaTest:0.5});
        $logoUffizi.setAttribute('material', {alphaTest:0.5});
        $logoMandragora.setAttribute('material', {alphaTest:0.5});
        $logoMedici.setAttribute('position', "-0.23025 0 0");
        $logoUffizi.setAttribute('position', "-0.05982 0 0");
        $logoMandragora.setAttribute('position', "0.17261 0 0");
        $logoMedici.setAttribute('width',PalazzoMedci_w*scale);
        $logoUffizi.setAttribute('width',UFFIZI_w*scale);
        $logoMandragora.setAttribute('width',Mandragora_w*scale);
        $logoMedici.setAttribute('height',1*scale);
        $logoUffizi.setAttribute('height',1*scale);
        $logoMandragora.setAttribute('height',1*scale);

        $logo_group.appendChild( $storeText );
        $logo_group.appendChild( $logoMedici );
        $logo_group.appendChild( $logoUffizi );
        $logo_group.appendChild( $logoMandragora );

        //title
        const $title= document.createElement('a-entity');
        $title.setAttribute('text',{value:"IL REGNO DELLA PUREZZA",opacity:1,transparent: true,width:0.8,wrapCount:8,align:'right'});
        $title.setAttribute('position', `0 0 -0.6`);
        this.el.appendChild( $title );

        //Detagli
        const $Detail_group= document.createElement('a-entity');
        $Detail_group.setAttribute('position', `0 0.02 0`);
        this.el.appendChild( $Detail_group );
        const $Detail_L= document.createElement('a-entity');
        $Detail_L.setAttribute('text',{value:"PESO\nDIMENSIONI\nPAGINE\nLINGUA\nISBN",opacity:1,transparent: true,width:0.12,wrapCount:17,align:'left'});
        $Detail_L.setAttribute('position', `-0.23 0 0`);
        $Detail_group.appendChild($Detail_L)
        const $Detail_R= document.createElement('a-entity');
        $Detail_R.setAttribute('text',{value:"1.2 KG\n24.5 × 29 CM\n184\nITALIANO/INGLESE\n978-88-7461-474-5",opacity:1,transparent: true,width:0.12,wrapCount:17,align:'left'});
        $Detail_R.setAttribute('position', `-0.15 0 0`);
        $Detail_group.appendChild($Detail_R);

        //creat sky
        const $sky = document.createElement('a-sphere');
        $sky.setAttribute('material', {opacity: 0.7, side: 'back'});
        $sky.setAttribute('geometry', {radius: 1.12, segmentsHeight: 3, segmentsWidth: 6});
        $sky.setAttribute('position', `0 0 -0.3`);
        $sky.setAttribute('color', `#030004`);
        // $sky.setAttribute('radius', 1.9);
        this.el.appendChild( $sky );

        // create close
        const CloseSize= 0.02
        this.$close = document.createElement('a-entity');
        // this.$close.setAttribute('position','0.28 0 0');
        this.$close.setAttribute('text',{value:'x',align:'center',color:'#1f1f1f',width:CloseSize,wrapCount:1.38,opacity:1,transparent: true});
        this.$close.setAttribute('geometry', {primitive: 'circle', radius: CloseSize});
        this.$close.setAttribute('material', {shader: 'flat', color: '#ffffff',opacity:1,transparent: true});
        this.$close.setAttribute('raycastable', '');
        this.$close.setAttribute('look-at', "[camera]");
        this.el.appendChild( this.$close )
        
        this.$close.addEventListener("click", this.closeBook.bind(this),false)

        // this.el.addEventListener('openBook',this.onOpen,false);
        this.onOpen()




    },
    o_animation:function(){
        // debugger;
        console.log(this.$close.object3D.scale)
        let tl = AFRAME.ANIME.timeline({
            easing: 'easeOutExpo',
            duration: 250,
            complete:()=>{
                AFRAME.ANIME({targets:this.$close.object3D.scale,x:1.5,y:1.5,loop: 8,delay:500,direction: 'alternate'})
            }
        });
        tl
        // .add({targets:this.$book.object3D.position,z:-1})
        .add({targets:this.$book.object3D.position,z:[-1,0.01],duration:1000})
        .add({targets:this.$book.object3D.rotation,y:25},'-=1000')
        this.$prof_group.querySelectorAll('[prof]').forEach((item,i) => {
            // debugger
            tl.add({targets: item.object3D.position, ...profs[i].position},'-=200');
        });
        tl.add({targets:this.$close.object3D.position,x:[0,0.28]},'-=800')
        // .add({targets:this.$close.object3D.scale,x:[1,1.5],y:[1,1.5],loop: 8})
    },
    onOpen: function(){
        console.log('open Book')
        // animation 'open'
        // debugger
        this.o_animation();
        // 将其他 remove 其他的raycastable evt.target.removeAttribute('raycastable','')
    },

    closeBook: function(evt){
        // debugger
        console.log('close Book')
        AFRAME.scenes[0].emit('unzipRay',{})
        this.el.removeAttribute('book');
        while (this.el.firstChild) {
            this.el.removeChild(this.el.firstChild);
        }
        if (ga) {
            console.log('ga-close_book')
            ga('send', {
                hitType: 'event',
                eventCategory: '360',
                eventAction: 'close_book',
                // eventLabel: 'Fall Campaign'
                });
        };
        
    },
    c_animation:function(){

    },
    
    
    
    
    
    // randomValues: function(targe){
    //     // debugger
    //     // console.log(targe)
    //     const animationLoop =function(){
    //         const rdm = function(){return AFRAME.ANIME.random(0, 1)}
    //         // debugger
    //         AFRAME.ANIME({
    //             targets: targe,
    //             x:`+=${rdm()/80}`,
    //             y:`+=${rdm()/80}`,
    //             z:`+=${rdm()/80}`,
    //             easing: 'easeInOutSine',
    //             duration: 10000,
    //             complete: animationLoop
    //             });
    //     } 
    //     animationLoop()
    // }
})
