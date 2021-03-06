const OPERE = require('./opere.js');
const COMMENT = require('./comment.js');
const PROF = require('./prof.js');
const fs = require('fs');
// const path = require('path')

const data = OPERE.map((opr) => {
    
     
    let IT = {};
    let EN = {};
    // const exp = {
    //     it:{
    //         prof:[
    //             {name:'XXX',comment:['...','...'],Assessorato:'...',wix:'...'},
    //             {name:'XXX',comment:['...','...'],Assessorato:'...',wix:'...'}],
    //         mat:'XXXX',
    //         title:'XXXX'},
    //     en:{
    //         prof:[
    //             {name:'XXX',comment:['...','...'],Assessorato:'...',wix:'...'},
    //             {name:'XXX',comment:['...','...'],Assessorato:'...',wix:'...'}],
    //         mat:'XXXX',
    //         title:'XXXX'
    //     }}
    IT['prof']=[];
    EN['prof']=[];
    const index=opr['index']
    const comment_about_opere = COMMENT.filter((c)=>c.index==index)
    // const comment_it = comment_about_opere.filter(i=>i.lan == 'it')
    // const comment_en = comment_about_opere.filter(i=>i.lan == 'en')
    const profs = PROF.map((i)=>(i.name));
    // ['CRISTINA ACIDINI','DARIO NARDELLA','FAN DI’AN','SHANG HUI','SHAO DAZHEN','TOMMASO SACCHI','VINCENZO VACCARO',]
   
    for (let i = 0; i < profs.length; i++) {
        // if(=='TOMMASO SACCHI')
        const p = profs[i];
        const prof_detail = PROF.filter(j=>j.name==p)[0]
        
        const p_comment = comment_about_opere.filter((c)=>c.prof_name==p)
        console.log(`${opr.title_it}\t${p}\tcomment\t${p_comment.length}\t个`)
        if (p_comment.length==0) continue;
        
        const p_comment_it = p_comment.filter((c)=>c.lan=='it');
        const p_comment_en = p_comment.filter((c)=>c.lan=='en');
        if(p_comment_it.length!==0) IT['prof'].push({
            'name':p,
            'assessorato':prof_detail.asso_it,
            'wix':prof_detail.wix,
            'comment':p_comment_it.map((o)=>
            // 意大利语不支持问题 MSDF
            o.comment.replace("à","a'")
            .replace("ò","o'")
            .replace("è","e'")
            .replace("ì","i")
            .replace("ù","u'")
            .replace("À","A'")
            .replace("Ò","O'")
            .replace("È","E'")
            .replace("Ì","I")
            .replace("Ù","U'")
            .replace("-","")
            .replace("’","'")
            )
        })
        if(p_comment_en.length!==0) EN['prof'].push({
            'name':p,'comment':p_comment_en.map((o)=>o.comment),'assessorato':prof_detail.asso_en,'wix':prof_detail.wix
        })
        

        
    }

   
    
    
    IT['mat']=opr['mat_it'];
    EN['mat']=opr['mat_en'];
    IT['title']=opr['title_it'];
    EN['title']=opr['title_en'];
    return ({
        it:IT,
        en:EN,
        year: opr['year'],
        wix_name: opr['wix_name'],
        width: opr['width'],
        height: opr['height'],
        camera_id: opr['camera_id'],
        // blender_name: opr['blender_name'],
        location: opr['location'].split(',').map(Number),
        rotation: opr['rotation'].split(',').map(Number),
        quaternion: opr['quaternion'].split(',').map(Number),
        dimension: opr['dimension'].split(',').map(Number),
    })
})


// const prof

console.log(data)

let write_data = `module.exports =${JSON.stringify(data)}`;  
fs.writeFileSync(`./src/static/opere_package.js`, write_data);