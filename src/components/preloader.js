
/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}


/**
 * Visual preloader system for A-Frame.
 *
 * When applied to the <scene> will automatically display a preloader modal that reflects the current loading progress
 * of resources in <a-assets> that have been flagged for preloading and will auto-close the modal when it reaches 100%.
 * Alternately, the modal can be manually closed
 *
 * Emits a 'preloading-complete' event when done.
 */
AFRAME.registerSystem('preloader', {
    schema: {
        type: { type: 'string', default: 'bootstrap' }, //type of CSS framework to use - acceptable values are: 'bootstrap' or 'custom'
        id: {type: 'string', default: 'preloader-modal'}, //ID of the auto injected preloader modal
        bar: { type: 'selector', default: '#preloader-modal .progress-bar'}, //html class of progress bar in preloader - used to set the width
        label: { type: 'selector', default: '#preloader-modal .progress-label'}, //html class of label in preloader - used to set the percentage
        labelText: { type: 'string', default: '{0}% Complete'}, //loading text format {0} will be replaced with the percent progress e.g. 30%
        autoClose: { type: 'boolean', default: true}, //automatically close preloader by default - not supported if clickToClose is set to 'true'
        clickToClose: { type: 'boolean', default: false}, //whether the user must click a button to close the modal when preloading is finished
        closeLabelText: { type: 'string', default: 'Continue'}, //default label text of click to close button
        doneLabelText: { type: 'string', default: 'Done'}, //text to set on label when loading is complete
        debug:{ type: 'boolean', default: true}
    },
    // this
    loadedAssetCount: 0, //total number of assets loaded
    totalAssetCount: 0, //total number of assets to load

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function () {
        
        this.cameraPosition = document.querySelector('#cam').getAttribute('position').split(' ');
        // debugger
        this.$loaderEl  = document.createElement('a-entity');
        this.$loaderEl.setAttribute('text',{value:'00',align:'center',color:'#ffffff',width:0.1,wrapCount:4});
        this.$loaderEl.setAttribute('position',`${this.cameraPosition[0]} ${this.cameraPosition[1]} ${this.cameraPosition[2]-0.4}`);
        // this.$loaderEl.setAttribute('animation',{property:'scale',to:'5 5 5',dur:1000,easing:'easeOutQuart',startEvents:'onComplete'})
        this.$loaderEl.setAttribute('animation__fade',{property:'text.opacity',to:0,dur:1000,easing:'easeOutQuart',startEvents:'onComplete'})
        this.$loaderEl.addEventListener('animationcomplete',   (evt)=> {
            // debugger
            evt.target.remove();//Cannot read property 'removeChild' of null
            // evt.currentTarget.remove();//Cannot read property 'removeChild' of null
            // this.$loaderEl.remove();//Cannot read property 'removeChild' of null
            // evt.target.parentNode.removeChild(evt.target);
        });
        this.el.sceneEl.appendChild(this.$loaderEl)



        document.querySelector('a-assets').addEventListener('loaded',function(){
            if(this.data.debug){console.info('All assets loaded')}
        }.bind(this));

        const assetItems = document.querySelectorAll('a-assets a-asset-item,a-assets img,a-assets audio,a-assets video');
        this.totalAssetCount = assetItems.length;

        this.watchPreloadProgress(assetItems);
    },

    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update: function (oldData) { },

    /**
     *
     * @param assetItems A NodeList with a list of <a-asset-item> elements that you wish to watch
     */
    
    watchPreloadProgress: function(assetItems){
        for (let i = 0; i < assetItems.length; i++) {

            let eventName;

            switch(assetItems[i].nodeName.toLowerCase()){
                case 'a-asset-item':
                    eventName = 'loaded';
                    break;
                case 'img':
                    eventName = 'load';
                    break;
                case 'audio':// 省略 loadeddata
                case 'video':
                    eventName = 'loadeddata';  
                    break;
            }

            assetItems[i].addEventListener(eventName,function(e){
                this.loadedAssetCount++;
                if(this.data.debug) {
                    console.info('Loaded ' + this.loadedAssetCount + '/' + this.totalAssetCount + ' asset items');
                }
                this.onAssetLoaded();
            }.bind(this));
        }
    },

    
    onAssetLoaded: function(){
        if(this.loadedAssetCount === this.totalAssetCount){
            
            this.triggerProgressComplete();
        }else{
            this.$loaderEl.setAttribute('text',{value:`${Math.floor(this.loadedAssetCount/this.totalAssetCount*100)}%`})
        }
            
    },
    
    triggerProgressComplete: function(){
        // setAtribute 
        this.$loaderEl.emit('animationcomplete')
        // this.$loaderEl.remove();
    },


    triggerPreloadingComplete: function(){
        if(this.data.debug){
            console.info('Preloading complete');
        }

        this.sceneEl.emit('preloading-complete');
    },

    closeModal: function(){
        switch(this.data.type){
            case 'bootstrap':
                $(this.data.target).modal('hide');
                break;
            default:
                //do nothing
                break;
        }
    }
});