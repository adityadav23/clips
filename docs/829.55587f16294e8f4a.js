(self.webpackChunkclips=self.webpackChunkclips||[]).push([[829],{8292:(_,y,a)=>{a(5555);const{devDependencies:e}=a(3681);_.exports={corePath:`https://unpkg.com/@ffmpeg/core@${e["@ffmpeg/core"].substring(1)}/dist/ffmpeg-core.js`}},2187:(_,y,a)=>{var h=a(7156).default;const e=a(5555);_.exports=function(){var c=h(function*(u){let v=u;return typeof u>"u"?new Uint8Array:("string"==typeof u?v=/data:_data\/([a-zA-Z]*);base64,([^"]*)/.test(u)?atob(u.split(",")[1]).split("").map(x=>x.charCodeAt(0)):yield(yield fetch(e(u))).arrayBuffer():(u instanceof File||u instanceof Blob)&&(v=yield(c=>new Promise((u,v)=>{const x=new FileReader;x.onload=()=>{u(x.result)},x.onerror=({target:{error:{code:w}}})=>{v(Error(`File could not be read! Code=${w}`))},x.readAsArrayBuffer(c)}))(u)),new Uint8Array(v))});return function(u){return c.apply(this,arguments)}}()},9965:(_,y,a)=>{var h=a(7156).default;const e=a(5555),{log:m}=a(6945),c=function(){var u=h(function*(v,x){m("info",`fetch ${v}`);const w=yield(yield fetch(v)).arrayBuffer();m("info",`${v} file size = ${w.byteLength} bytes`);const b=new Blob([w],{type:x}),Z=URL.createObjectURL(b);return m("info",`${v} blob URL = ${Z}`),Z});return function(x,w){return u.apply(this,arguments)}}();_.exports=function(){var u=h(function*({corePath:v}){if("string"!=typeof v)throw Error("corePath should be a string!");const x=e(v),w=yield c(x,"application/javascript"),b=yield c(x.replace("ffmpeg-core.js","ffmpeg-core.wasm"),"application/wasm"),Z=yield c(x.replace("ffmpeg-core.js","ffmpeg-core.worker.js"),"application/javascript");return typeof createFFmpegCore>"u"?new Promise(Y=>{const G=document.createElement("script"),Q=()=>{G.removeEventListener("load",Q),m("info","ffmpeg-core.js script loaded"),Y({createFFmpegCore,corePath:w,wasmPath:b,workerPath:Z})};G.src=w,G.type="text/javascript",G.addEventListener("load",Q),document.getElementsByTagName("head")[0].appendChild(G)}):(m("info","ffmpeg-core.js script is loaded already"),Promise.resolve({createFFmpegCore,corePath:w,wasmPath:b,workerPath:Z}))});return function(v){return u.apply(this,arguments)}}()},1346:(_,y,a)=>{const h=a(8292),e=a(9965),m=a(2187);_.exports={defaultOptions:h,getCreateFFmpegCore:e,fetchFile:m}},6151:_=>{_.exports={defaultArgs:["./ffmpeg","-nostdin","-y"],baseOptions:{log:!1,logger:()=>{},progress:()=>{},corePath:""}}},9639:(_,y,a)=>{var h=a(7156).default;const{defaultArgs:e,baseOptions:m}=a(6151),{setLogging:c,setCustomLogger:u,log:v}=a(6945),x=a(5542),w=a(8333),{defaultOptions:b,getCreateFFmpegCore:Z}=a(1346),{version:Y}=a(3681),G=Error("ffmpeg.wasm is not ready, make sure you have completed load().");_.exports=(Q={})=>{const{log:ie,logger:B,progress:I,...H}={...m,...b,...Q};let S=null,R=null,U=null,D=!1,N=I;const T=({type:C,message:i})=>{v(C,i),x(i,N),(C=>{"FFMPEG_END"===C&&null!==U&&(U(),U=null,D=!1)})(i)},$=function(){var C=h(function*(){if(v("info","load ffmpeg-core"),null!==S)throw Error("ffmpeg.wasm was loaded, you should not load it again, use ffmpeg.isLoaded() to check next time.");{v("info","loading ffmpeg-core");const{createFFmpegCore:i,corePath:n,workerPath:s,wasmPath:g}=yield Z(H);S=yield i({mainScriptUrlOrBlob:n,printErr:l=>T({type:"fferr",message:l}),print:l=>T({type:"ffout",message:l}),locateFile:(l,f)=>{if(typeof window<"u"){if(typeof g<"u"&&l.endsWith("ffmpeg-core.wasm"))return g;if(typeof s<"u"&&l.endsWith("ffmpeg-core.worker.js"))return s}return f+l}}),R=S.cwrap("proxy_main","number",["number","number"]),v("info","ffmpeg-core loaded")}});return function(){return C.apply(this,arguments)}}();return c(ie),u(B),v("info",`use ffmpeg.wasm v${Y}`),{setProgress:C=>{N=C},setLogger:C=>{u(C)},setLogging:c,load:$,isLoaded:()=>null!==S,run:(...C)=>{if(v("info",`run ffmpeg command: ${C.join(" ")}`),null===S)throw G;if(D)throw Error("ffmpeg.wasm can only run one command at a time");return D=!0,new Promise(i=>{const n=[...e,...C].filter(s=>0!==s.length);U=i,R(...w(S,n))})},exit:()=>{if(null===S)throw G;D=!1,S.exit(1),S=null,R=null,U=null},FS:(C,...i)=>{if(v("info",`run FS.${C} ${i.map(n=>"string"==typeof n?n:`<${n.length} bytes binary file>`).join(" ")}`),null===S)throw G;{let n=null;try{n=S.FS[C](...i)}catch{throw Error("readdir"===C?`ffmpeg.FS('readdir', '${i[0]}') error. Check if the path exists, ex: ffmpeg.FS('readdir', '/')`:"readFile"===C?`ffmpeg.FS('readFile', '${i[0]}') error. Check if the path exists`:"Oops, something went wrong in FS operation.")}return n}}}}},260:(_,y,a)=>{a(7854);const h=a(9639),{fetchFile:e}=a(1346);_.exports={createFFmpeg:h,fetchFile:e}},6945:_=>{let y=!1,a=()=>{};_.exports={logging:y,setLogging:c=>{y=c},setCustomLogger:c=>{a=c},log:(c,u)=>{a({type:c,message:u}),y&&console.log(`[${c}] ${u}`)}}},8333:_=>{_.exports=(y,a)=>{const h=y._malloc(a.length*Uint32Array.BYTES_PER_ELEMENT);return a.forEach((e,m)=>{const c=y._malloc(e.length+1);y.writeAsciiToMemory(e,c),y.setValue(h+Uint32Array.BYTES_PER_ELEMENT*m,c,"i32")}),[a.length,h]}},5542:_=>{let y=0,a=0;const h=e=>{const[m,c,u]=e.split(":");return 60*parseFloat(m)*60+60*parseFloat(c)+parseFloat(u)};_.exports=(e,m)=>{if("string"==typeof e)if(e.startsWith("  Duration")){const c=e.split(", ")[0].split(": ")[1],u=h(c);m({duration:u,ratio:a}),(0===y||y>u)&&(y=u)}else if(e.startsWith("frame")||e.startsWith("size")){const c=e.split("time=")[1].split(" ")[0],u=h(c);a=u/y,m({ratio:a,time:u})}else e.startsWith("video:")&&(m({ratio:1}),y=0)}},1829:(_,y,a)=>{"use strict";a.r(y),a.d(y,{VideoModule:()=>ne});var h=a(6895),e=a(4650),m=a(9062),c=a(9635),u=a(4004),v=a(5698),x=a(1205),w=a(9260);const b=(0,u.U)(o=>!!o);let Z=(()=>{class o{constructor(r,p){this.router=r,this.auth=p,this.canActivate=(d,F)=>{const M=d.data.authGuardPipe||(()=>b);return this.auth.user.pipe((0,v.q)(1),M(d,F),(0,u.U)(A=>"boolean"==typeof A?A:Array.isArray(A)?this.router.createUrlTree(A):this.router.parseUrl(A)))}}}return o.\u0275fac=function(r){return new(r||o)(e.LFG(m.F0),e.LFG(x.zQ))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"any"}),o})();var U=a(5861),D=a(1135),N=a(8293),k=a(1609),T=a(4006),$=a(3446),ee=a(235),V=a(8549);function se(o,t){if(1&o&&(e.TgZ(0,"app-alert",9)(1,"p"),e._uU(2),e.qZA()()),2&o){const r=e.oxw();e.Q6J("color",r.alertColor),e.xp6(2),e.hij(" ",r.alertMsg," ")}}const z=function(o,t){return{"opacity-50":o,"hover:bg-indigo-700":t}};class j{constructor(t,r){this.modal=t,this.clipService=r,this.activeClip=null,this.showAlert=!1,this.inSubmission=!1,this.alertMsg="Please wait! Updating clip.",this.alertColor="blue",this.update=new e.vpe,this.clipId=new T.NI(""),this.title=new T.NI("",[T.kI.required,T.kI.minLength(3)]),this.editForm=new T.cw({title:this.title,id:this.clipId})}ngOnInit(){this.modal.register("editClip")}ngOnDestroy(){this.modal.unregister("editClip")}ngOnChanges(){!this.activeClip||(this.clipId.setValue(this.activeClip.docId),this.title.setValue(this.activeClip.title),this.inSubmission=!1,this.showAlert=!1)}submit(){var t=this;return(0,U.Z)(function*(){if(t.activeClip&&(t.showAlert=!0,t.inSubmission=!0,t.alertMsg="Please wait! Updating clip.",t.alertColor="blue",t.clipId.value&&t.title.value)){try{yield t.clipService.updateClip(t.clipId.value,t.title.value)}catch{return t.inSubmission=!1,t.alertMsg="Something went wrong! Try again later",void(t.alertColor="red")}t.inSubmission=!1,t.alertMsg="Success",t.alertColor="green",t.activeClip.title=t.title.value,t.update.emit(t.activeClip)}})()}}function W(o,t){if(1&o){const r=e.EpF();e.TgZ(0,"div",10)(1,"a",11),e._UZ(2,"img",12),e.qZA(),e.TgZ(3,"div",13)(4,"a",14),e._uU(5),e.qZA(),e.TgZ(6,"a",15),e.NdJ("click",function(d){const M=e.CHM(r).$implicit,A=e.oxw();return e.KtG(A.copyToClipboard(d,M.docId))}),e._uU(7," Copy Link "),e.qZA()(),e.TgZ(8,"div",16)(9,"a",17),e.NdJ("click",function(d){const M=e.CHM(r).$implicit,A=e.oxw();return e.KtG(A.openModal(d,M))}),e.TgZ(10,"span",18),e._uU(11,"build"),e.qZA()(),e.TgZ(12,"a",19),e.NdJ("click",function(d){const M=e.CHM(r).$implicit,A=e.oxw();return e.KtG(A.deleteClip(d,M))}),e.TgZ(13,"span",18),e._uU(14,"delete"),e.qZA()()()()}if(2&o){const r=t.$implicit;e.xp6(2),e.Q6J("src",r.screenshotUrl,e.LSH),e.xp6(3),e.hij(" ",r.title," ")}}j.\u0275fac=function(t){return new(t||j)(e.Y36(k.Z),e.Y36(N.Y))},j.\u0275cmp=e.Xpm({type:j,selectors:[["app-edit"]],inputs:{activeClip:"activeClip"},outputs:{update:"update"},features:[e.TTD],decls:12,vars:8,consts:[["modalID","editClip"],[1,"text-2xl","font-bold"],[3,"color",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"mt-4"],[1,"block","text-xl","mb-4"],["placeholder","Enter title",3,"control"],[1,"mt-4","text-right"],["type","submit",1,"inline-flex","justify-center","py-2","px-4","border","border-transparent","shadow-sm","rounded-md","text-white","bg-indigo-600","focus:outline-none",3,"disabled","ngClass"],[3,"color"]],template:function(t,r){1&t&&(e.TgZ(0,"app-modal",0)(1,"p",1),e._uU(2,"Edit Video"),e.qZA(),e.YNc(3,se,3,2,"app-alert",2),e.TgZ(4,"form",3),e.NdJ("ngSubmit",function(){return r.submit()}),e.TgZ(5,"div",4)(6,"label",5),e._uU(7,"Title"),e.qZA(),e._UZ(8,"app-input",6),e.qZA(),e.TgZ(9,"div",7)(10,"button",8),e._uU(11," Update "),e.qZA()()()()),2&t&&(e.xp6(3),e.Q6J("ngIf",r.showAlert),e.xp6(1),e.Q6J("formGroup",r.editForm),e.xp6(4),e.Q6J("control",r.title),e.xp6(2),e.Q6J("disabled",r.inSubmission)("ngClass",e.WLB(5,z,r.inSubmission,!r.inSubmission)))},dependencies:[h.mk,h.O5,$.z,ee.a,V.w,T._Y,T.JL,T.sg]});class C{constructor(t,r,p,d){this.router=t,this.route=r,this.clipService=p,this.modal=d,this.videoOrder="1",this.clips=[],this.activeClip=null,this.sort$=new D.X(this.videoOrder)}ngOnInit(){this.route.queryParams.subscribe(t=>{this.videoOrder="2"===t.sort?t.sort:"1",this.sort$.next(this.videoOrder)}),this.clipService.getUserClips(this.sort$).subscribe(t=>{this.clips=[],t.forEach(r=>{this.clips.push({docId:r.id,...r.data()})})})}sort(t){const{value:r}=t.target;this.router.navigate([],{relativeTo:this.route,queryParams:{sort:r}})}openModal(t,r){t.preventDefault(),this.activeClip=r,this.modal.toggleModal("editClip")}update(t){this.clips.forEach((r,p)=>{r.docId==t.docId&&(this.clips[p].title=t.title)})}deleteClip(t,r){var p=this;return(0,U.Z)(function*(){t.preventDefault(),yield p.clipService.deleteClip(r),p.clips.forEach((d,F)=>{d.docId==r.docId&&p.clips.splice(F,1)})})()}copyToClipboard(t,r){return(0,U.Z)(function*(){if(t.preventDefault(),!r)return;const p=`${location.origin}/clip/${r}`;yield navigator.clipboard.writeText(p),alert("Link Copied!")})()}}C.\u0275fac=function(t){return new(t||C)(e.Y36(m.F0),e.Y36(m.gz),e.Y36(N.Y),e.Y36(k.Z))},C.\u0275cmp=e.Xpm({type:C,selectors:[["app-manage"]],decls:13,vars:4,consts:[[1,"container","mx-auto","my-8","bg-secondary","p-6"],[1,"rounded","relative","flex","justify-between"],["routerLink","/upload",1,"bg-indigo-400","text-white","py-4","px-10","text-xl"],[1,"text-black","px-8","text-xl","outline-none","appearance-none",3,"change"],["value","1",3,"selected"],["value","2",3,"selected"],[1,"container","mx-auto","my-8"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-4"],["class","mt-6 rounded-tl-2xl rounded-br-2xl shadow-xl bg-secondary flex flex-col justify-start",4,"ngFor","ngForOf"],[3,"activeClip","update"],[1,"mt-6","rounded-tl-2xl","rounded-br-2xl","shadow-xl","bg-secondary","flex","flex-col","justify-start"],["href","#"],["crossorigin","",1,"card-img-top","rounded-tl-2xl","w-full",3,"src"],[1,"p-6","text-2xl"],["href","#",1,"font-bold","mb-2"],["href","#",1,"bg-gray-400","text-white","px-2","py-1","ml-2","text-sm","rounded",3,"click"],[1,"flex","text-center","text-2xl","bg-gray-800","p-2","mt-auto"],["href","#",1,"flex-1","p-2","border-right","border-r-2","border-gray-700","transition","hover:text-indigo-400",3,"click"],[1,"material-icons","text-base"],["href","#",1,"flex-1","p-2","rounded-br-2xl","transition","hover:text-indigo-400",3,"click"]],template:function(t,r){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"a",2),e._uU(3,"Upload Videos"),e.qZA(),e.TgZ(4,"select",3),e.NdJ("change",function(d){return r.sort(d)}),e.TgZ(5,"option",4),e._uU(6,"Recent Uploads"),e.qZA(),e.TgZ(7,"option",5),e._uU(8,"Oldest Uploads"),e.qZA()()()(),e.TgZ(9,"div",6)(10,"div",7),e.YNc(11,W,15,2,"div",8),e.qZA()(),e.TgZ(12,"app-edit",9),e.NdJ("update",function(d){return r.update(d)}),e.qZA()),2&t&&(e.xp6(5),e.Q6J("selected","1"===r.videoOrder),e.xp6(2),e.Q6J("selected","2"===r.videoOrder),e.xp6(4),e.Q6J("ngForOf",r.clips),e.xp6(1),e.Q6J("activeClip",r.activeClip))},dependencies:[h.sg,m.rH,T.YN,T.Kr,j]});const n={randomUUID:typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let s;const g=new Uint8Array(16);function l(){if(!s&&(s=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!s))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return s(g)}const f=[];for(let o=0;o<256;++o)f.push((o+256).toString(16).slice(1));const ae=function L(o,t,r){if(n.randomUUID&&!t&&!o)return n.randomUUID();const p=(o=o||{}).random||(o.rng||l)();if(p[6]=15&p[6]|64,p[8]=63&p[8]|128,t){r=r||0;for(let d=0;d<16;++d)t[r+d]=p[d];return t}return function E(o,t=0){return(f[o[t+0]]+f[o[t+1]]+f[o[t+2]]+f[o[t+3]]+"-"+f[o[t+4]]+f[o[t+5]]+"-"+f[o[t+6]]+f[o[t+7]]+"-"+f[o[t+8]]+f[o[t+9]]+"-"+f[o[t+10]]+f[o[t+11]]+f[o[t+12]]+f[o[t+13]]+f[o[t+14]]+f[o[t+15]]).toLowerCase()}(p)};var K=a(3900),J=a(9841),de=a(4128),me=a(377),fe=a(260);class te{constructor(){this.isRunning=!1,this.isReady=!1,this.ffmpeg=(0,fe.createFFmpeg)({log:!1})}init(){var t=this;return(0,U.Z)(function*(){!t.ffmpeg||(yield t.ffmpeg.load(),t.isReady=!0)})()}getScreenshots(t){var r=this;return(0,U.Z)(function*(){r.isRunning=!0;const p=yield(0,fe.fetchFile)(t);r.ffmpeg.FS("writeFile",t.name,p);const d=[1,2,3],F=[];d.forEach(A=>{F.push("-i",t.name,"-ss",`00:00:0${A}`,"-frames:v","1","-filter:v","scale=510:-1",`output_0${A}.png`)}),yield r.ffmpeg.run(...F);const M=[];return d.forEach(A=>{const oe=r.ffmpeg.FS("readFile",`output_0${A}.png`),X=new Blob([oe.buffer],{type:"image/png"}),q=URL.createObjectURL(X);M.push(q)}),r.isRunning=!1,M})()}blobFromURL(t){return(0,U.Z)(function*(){return yield(yield fetch(t)).blob()})()}}te.\u0275fac=function(t){return new(t||te)},te.\u0275prov=e.Yz7({token:te,factory:te.\u0275fac,providedIn:"root"});class le{handleEvent(t){t.preventDefault()}}le.\u0275fac=function(t){return new(t||le)},le.\u0275dir=e.lG2({type:le,selectors:[["","app-event-blocker",""]],hostBindings:function(t,r){1&t&&e.NdJ("drop",function(d){return r.handleEvent(d)})("dragover",function(d){return r.handleEvent(d)})}});var he=a(1481);class ce{constructor(t){this.sanitizer=t}transform(t){return this.sanitizer.bypassSecurityTrustUrl(t)}}function ve(o,t){1&o&&(e.TgZ(0,"span",5),e._uU(1," settings "),e.qZA())}function ye(o,t){1&o&&(e.TgZ(0,"span",5),e._uU(1," autorenew "),e.qZA())}ce.\u0275fac=function(t){return new(t||ce)(e.Y36(he.H7,16))},ce.\u0275pipe=e.Yjl({name:"safeURL",type:ce,pure:!0});const _e=function(o){return{"bg-indigo-400 border-indigo-400 border-solid":o}};function be(o,t){if(1&o){const r=e.EpF();e.ynx(0),e.TgZ(1,"div",8),e.NdJ("dragend",function(){e.CHM(r);const d=e.oxw(2);return e.KtG(d.isDragOver=!1)})("dragover",function(){e.CHM(r);const d=e.oxw(2);return e.KtG(d.isDragOver=!0)})("dragenter",function(){e.CHM(r);const d=e.oxw(2);return e.KtG(d.isDragOver=!0)})("dragleave",function(){e.CHM(r);const d=e.oxw(2);return e.KtG(d.isDragOver=!1)})("mouseleave",function(){e.CHM(r);const d=e.oxw(2);return e.KtG(d.isDragOver=!1)})("drop",function(d){e.CHM(r);const F=e.oxw(2);return e.KtG(F.storeFile(d))}),e.TgZ(2,"h5"),e._uU(3,"Drop your file here (mp4 only!)"),e.qZA(),e.YNc(4,ye,2,0,"span",9),e.qZA(),e.TgZ(5,"input",10),e.NdJ("change",function(d){e.CHM(r);const F=e.oxw(2);return e.KtG(F.storeFile(d))}),e.qZA(),e.BQk()}if(2&o){const r=e.oxw(2);e.xp6(1),e.Q6J("ngClass",e.VKq(2,_e,r.isDragOver)),e.xp6(3),e.Q6J("ngIf",r.ffmpegService.isRunning)}}function xe(o,t){if(1&o&&(e.TgZ(0,"p"),e._uU(1),e.ALo(2,"percent"),e.qZA()),2&o){const r=e.oxw(4);e.xp6(1),e.Oqu(e.lcZ(2,1,r.percentage))}}function we(o,t){if(1&o&&(e.TgZ(0,"app-alert",21)(1,"p"),e._uU(2),e.qZA(),e.YNc(3,xe,3,3,"p",22),e.qZA()),2&o){const r=e.oxw(3);e.Q6J("color",r.alertColor),e.xp6(2),e.hij(" ",r.alertMsg," "),e.xp6(1),e.Q6J("ngIf",r.showPercentage)}}const Ce=function(o,t){return{"border-green-400":o,"border-transparent":t}};function Te(o,t){if(1&o){const r=e.EpF();e.TgZ(0,"div",23)(1,"img",24),e.NdJ("click",function(){const F=e.CHM(r).$implicit,M=e.oxw(3);return e.KtG(M.selectedScreenshot=F)}),e.ALo(2,"safeURL"),e.qZA()()}if(2&o){const r=t.$implicit,p=e.oxw(3);e.Q6J("ngClass",e.WLB(4,Ce,p.selectedScreenshot===r,p.selectedScreenshot!==r)),e.xp6(1),e.Q6J("src",e.lcZ(2,2,r),e.LSH)}}const Fe=function(o,t){return{"opacity-50":o,"hover:bg-indigo-700":t}};function Ue(o,t){if(1&o){const r=e.EpF();e.YNc(0,we,4,3,"app-alert",11),e.TgZ(1,"form",12),e.NdJ("ngSubmit",function(){e.CHM(r);const d=e.oxw(2);return e.KtG(d.uploadFile())}),e.TgZ(2,"h2",13),e._uU(3,"Select a Thumbnail"),e.qZA(),e.TgZ(4,"div",14),e.YNc(5,Te,3,7,"div",15),e.qZA(),e.TgZ(6,"div",16)(7,"label",17),e._uU(8,"Title"),e.qZA(),e._UZ(9,"app-input",18),e.qZA(),e.TgZ(10,"div",19)(11,"button",20),e._uU(12," Publish "),e.qZA()()()}if(2&o){const r=e.oxw(2);e.Q6J("ngIf",r.showAlert),e.xp6(1),e.Q6J("formGroup",r.uploadForm),e.xp6(4),e.Q6J("ngForOf",r.screenshots),e.xp6(4),e.Q6J("control",r.title),e.xp6(2),e.Q6J("disabled",r.inSubmission)("ngClass",e.WLB(6,Fe,r.inSubmission,!r.inSubmission))}}function Ae(o,t){if(1&o&&(e.YNc(0,be,6,4,"ng-container",6),e.YNc(1,Ue,13,9,"ng-template",null,7,e.W1O)),2&o){const r=e.MAs(2),p=e.oxw();e.Q6J("ngIf",!p.nextStep)("ngIfElse",r)}}class ue{constructor(t,r,p,d,F){this.storage=t,this.auth=r,this.clipsService=p,this.router=d,this.ffmpegService=F,this.isDragOver=!1,this.file=null,this.nextStep=!1,this.showAlert=!1,this.alertColor="blue",this.alertMsg="Please wait! Your File is being uploaded.",this.inSubmission=!1,this.percentage=0,this.showPercentage=!1,this.user=null,this.screenshots=[],this.selectedScreenshot="",this.title=new T.NI("",[T.kI.required,T.kI.minLength(3)]),this.uploadForm=new T.cw({title:this.title}),r.user.subscribe(M=>this.user=M),this.ffmpegService.init()}ngOnDestroy(){this.task?.cancel()}storeFile(t){var r=this;return(0,U.Z)(function*(){r.ffmpegService.isRunning||(r.isDragOver=!1,r.file=t.dataTransfer?.files.item(0)?t.dataTransfer?.files.item(0)??null:t.target.files?.item(0)??null,r.file&&"video/mp4"===r.file.type&&(r.screenshots=yield r.ffmpegService.getScreenshots(r.file),r.selectedScreenshot=r.screenshots[0],r.title.setValue(r.file.name.replace(/\.[^/.]+$/,"")),r.nextStep=!0))})()}uploadFile(){var t=this;return(0,U.Z)(function*(){t.uploadForm.disable(),t.showAlert=!0,t.alertColor="blue",t.alertMsg="Please wait! Your File is being uploaded.",t.inSubmission=!0,t.showPercentage=!0;const r=ae(),p=`clips/${r}.mp4`,d=yield t.ffmpegService.blobFromURL(t.selectedScreenshot),F=`screenshots/${r}.png`;t.task=t.storage.upload(p,t.file);const M=t.storage.ref(p);t.screenshotTask=t.storage.upload(F,d);const A=t.storage.ref(F);var oe;(0,J.a)([t.task.percentageChanges(),t.screenshotTask.percentageChanges()]).subscribe(oe=>{const[X,q]=oe;X&&q&&(t.percentage=(X+q)/200)}),(0,de.D)([t.task.snapshotChanges(),t.screenshotTask.snapshotChanges()]).pipe((0,K.w)(()=>(0,de.D)([M.getDownloadURL(),A.getDownloadURL()]))).subscribe({next:(oe=(0,U.Z)(function*(X){const[q,pe]=X,Ze={uid:t.user?.uid,displayName:t.user?.displayName,title:t.title.value,fileName:`${r}.mp4`,url:q,screenshotUrl:pe,screenshotFileName:`${r}.png`,timestamp:w.Z.firestore.FieldValue.serverTimestamp()},Le=yield t.clipsService.createClip(Ze);t.alertColor="green",t.alertMsg="Success! Your file is uploaded.",t.showPercentage=!1,setTimeout(()=>{t.router.navigate(["clip",Le.id])},1e3)}),function(q){return oe.apply(this,arguments)}),error:oe=>{t.uploadForm.enable(),t.alertColor="red",t.alertMsg="Failed! Your file is not uploaded.",t.showPercentage=!1,t.inSubmission=!0}})})()}}ue.\u0275fac=function(t){return new(t||ue)(e.Y36(me.Q1),e.Y36(x.zQ),e.Y36(N.Y),e.Y36(m.F0),e.Y36(te))},ue.\u0275cmp=e.Xpm({type:ue,selectors:[["app-upload"]],decls:8,vars:2,consts:[[1,"container","mx-auto","my-8","bg-secondary","p-6"],[1,"rounded","relative","flex","flex-col"],[1,"font-bold","mb-6"],["class","material-icons text-center text-6xl p-8 animate-spin",4,"ngIf","ngIfElse"],["uploadEditorCtrl",""],[1,"material-icons","text-center","text-6xl","p-8","animate-spin"],[4,"ngIf","ngIfElse"],["uploadFormCtr",""],["app-event-blocker","",1,"w-full","px-10","py-40","rounded","text-center","cursor-pointer","border","border-dashed","border-gray-400","transition","duration-500","hover:text-white","hover:bg-indigo-400","hover:border-indigo-400","hover:border-solid","text-xl",3,"ngClass","dragend","dragover","dragenter","dragleave","mouseleave","drop"],["class","material-icons text-center text-6xl p-8 animate-spin",4,"ngIf"],["type","file",1,"mt-4",3,"change"],[3,"color",4,"ngIf"],[3,"formGroup","ngSubmit"],[1,"mb-4","text-xl"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-4"],["class","border-8 cursor-pointer",3,"ngClass",4,"ngFor","ngForOf"],[1,"mt-4"],[1,"block","text-xl","mb-4"],["placeholder","Enter Title",3,"control"],[1,"mt-4","text-right"],["type","submit",1,"inline-flex","justify-center","py-2","px-4","border","border-transparent","shadow-sm","rounded-md","text-white","bg-indigo-600","focus:outline-none",3,"disabled","ngClass"],[3,"color"],[4,"ngIf"],[1,"border-8","cursor-pointer",3,"ngClass"],[3,"src","click"]],template:function(t,r){if(1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2),e._uU(3,"Upload Video"),e.qZA(),e.ynx(4),e.YNc(5,ve,2,0,"span",3),e.BQk(),e.YNc(6,Ae,3,2,"ng-template",null,4,e.W1O),e.qZA()()),2&t){const p=e.MAs(7);e.xp6(5),e.Q6J("ngIf",!r.ffmpegService.isReady)("ngIfElse",p)}},dependencies:[h.mk,h.sg,h.O5,ee.a,V.w,le,T._Y,T.JL,T.sg,h.Zx,ce]});const ge=()=>("/",(0,c.z)(b,(0,u.U)(t=>t||"/"))),Se=[{path:"manage",component:C,data:{authOnly:!0,authGuardPipe:ge},canActivate:[Z]},{path:"upload",component:ue,data:{authOnly:!0,authGuardPipe:ge},canActivate:[Z]},{path:"manage-clips",redirectTo:"manage"}];class re{}re.\u0275fac=function(t){return new(t||re)},re.\u0275mod=e.oAB({type:re}),re.\u0275inj=e.cJS({imports:[m.Bz.forChild(Se),m.Bz]});var Ee=a(4466);class ne{}ne.\u0275fac=function(t){return new(t||ne)},ne.\u0275mod=e.oAB({type:ne}),ne.\u0275inj=e.cJS({imports:[h.ez,re,Ee.m,T.UX]})},7854:_=>{var y=function(a){"use strict";var c,h=Object.prototype,e=h.hasOwnProperty,m=Object.defineProperty||function(i,n,s){i[n]=s.value},u="function"==typeof Symbol?Symbol:{},v=u.iterator||"@@iterator",x=u.asyncIterator||"@@asyncIterator",w=u.toStringTag||"@@toStringTag";function b(i,n,s){return Object.defineProperty(i,n,{value:s,enumerable:!0,configurable:!0,writable:!0}),i[n]}try{b({},"")}catch{b=function(n,s,g){return n[s]=g}}function Z(i,n,s,g){var f=Object.create((n&&n.prototype instanceof H?n:H).prototype),E=new j(g||[]);return m(f,"_invoke",{value:ee(i,s,E)}),f}function Y(i,n,s){try{return{type:"normal",arg:i.call(n,s)}}catch(g){return{type:"throw",arg:g}}}a.wrap=Z;var G="suspendedStart",ie="executing",B="completed",I={};function H(){}function S(){}function R(){}var U={};b(U,v,function(){return this});var D=Object.getPrototypeOf,N=D&&D(D(W([])));N&&N!==h&&e.call(N,v)&&(U=N);var k=R.prototype=H.prototype=Object.create(U);function T(i){["next","throw","return"].forEach(function(n){b(i,n,function(s){return this._invoke(n,s)})})}function $(i,n){function s(f,E,O,P){var L=Y(i[f],i,E);if("throw"!==L.type){var ae=L.arg,K=ae.value;return K&&"object"==typeof K&&e.call(K,"__await")?n.resolve(K.__await).then(function(J){s("next",J,O,P)},function(J){s("throw",J,O,P)}):n.resolve(K).then(function(J){ae.value=J,O(ae)},function(J){return s("throw",J,O,P)})}P(L.arg)}var g;m(this,"_invoke",{value:function l(f,E){function O(){return new n(function(P,L){s(f,E,P,L)})}return g=g?g.then(O,O):O()}})}function ee(i,n,s){var g=G;return function(f,E){if(g===ie)throw new Error("Generator is already running");if(g===B){if("throw"===f)throw E;return C()}for(s.method=f,s.arg=E;;){var O=s.delegate;if(O){var P=V(O,s);if(P){if(P===I)continue;return P}}if("next"===s.method)s.sent=s._sent=s.arg;else if("throw"===s.method){if(g===G)throw g=B,s.arg;s.dispatchException(s.arg)}else"return"===s.method&&s.abrupt("return",s.arg);g=ie;var L=Y(i,n,s);if("normal"===L.type){if(g=s.done?B:"suspendedYield",L.arg===I)continue;return{value:L.arg,done:s.done}}"throw"===L.type&&(g=B,s.method="throw",s.arg=L.arg)}}}function V(i,n){var s=n.method,g=i.iterator[s];if(g===c)return n.delegate=null,"throw"===s&&i.iterator.return&&(n.method="return",n.arg=c,V(i,n),"throw"===n.method)||"return"!==s&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+s+"' method")),I;var l=Y(g,i.iterator,n.arg);if("throw"===l.type)return n.method="throw",n.arg=l.arg,n.delegate=null,I;var f=l.arg;return f?f.done?(n[i.resultName]=f.value,n.next=i.nextLoc,"return"!==n.method&&(n.method="next",n.arg=c),n.delegate=null,I):f:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,I)}function se(i){var n={tryLoc:i[0]};1 in i&&(n.catchLoc=i[1]),2 in i&&(n.finallyLoc=i[2],n.afterLoc=i[3]),this.tryEntries.push(n)}function z(i){var n=i.completion||{};n.type="normal",delete n.arg,i.completion=n}function j(i){this.tryEntries=[{tryLoc:"root"}],i.forEach(se,this),this.reset(!0)}function W(i){if(i){var n=i[v];if(n)return n.call(i);if("function"==typeof i.next)return i;if(!isNaN(i.length)){var s=-1,g=function l(){for(;++s<i.length;)if(e.call(i,s))return l.value=i[s],l.done=!1,l;return l.value=c,l.done=!0,l};return g.next=g}}return{next:C}}function C(){return{value:c,done:!0}}return S.prototype=R,m(k,"constructor",{value:R,configurable:!0}),m(R,"constructor",{value:S,configurable:!0}),S.displayName=b(R,w,"GeneratorFunction"),a.isGeneratorFunction=function(i){var n="function"==typeof i&&i.constructor;return!!n&&(n===S||"GeneratorFunction"===(n.displayName||n.name))},a.mark=function(i){return Object.setPrototypeOf?Object.setPrototypeOf(i,R):(i.__proto__=R,b(i,w,"GeneratorFunction")),i.prototype=Object.create(k),i},a.awrap=function(i){return{__await:i}},T($.prototype),b($.prototype,x,function(){return this}),a.AsyncIterator=$,a.async=function(i,n,s,g,l){void 0===l&&(l=Promise);var f=new $(Z(i,n,s,g),l);return a.isGeneratorFunction(n)?f:f.next().then(function(E){return E.done?E.value:f.next()})},T(k),b(k,w,"Generator"),b(k,v,function(){return this}),b(k,"toString",function(){return"[object Generator]"}),a.keys=function(i){var n=Object(i),s=[];for(var g in n)s.push(g);return s.reverse(),function l(){for(;s.length;){var f=s.pop();if(f in n)return l.value=f,l.done=!1,l}return l.done=!0,l}},a.values=W,j.prototype={constructor:j,reset:function(i){if(this.prev=0,this.next=0,this.sent=this._sent=c,this.done=!1,this.delegate=null,this.method="next",this.arg=c,this.tryEntries.forEach(z),!i)for(var n in this)"t"===n.charAt(0)&&e.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=c)},stop:function(){this.done=!0;var n=this.tryEntries[0].completion;if("throw"===n.type)throw n.arg;return this.rval},dispatchException:function(i){if(this.done)throw i;var n=this;function s(P,L){return f.type="throw",f.arg=i,n.next=P,L&&(n.method="next",n.arg=c),!!L}for(var g=this.tryEntries.length-1;g>=0;--g){var l=this.tryEntries[g],f=l.completion;if("root"===l.tryLoc)return s("end");if(l.tryLoc<=this.prev){var E=e.call(l,"catchLoc"),O=e.call(l,"finallyLoc");if(E&&O){if(this.prev<l.catchLoc)return s(l.catchLoc,!0);if(this.prev<l.finallyLoc)return s(l.finallyLoc)}else if(E){if(this.prev<l.catchLoc)return s(l.catchLoc,!0)}else{if(!O)throw new Error("try statement without catch or finally");if(this.prev<l.finallyLoc)return s(l.finallyLoc)}}}},abrupt:function(i,n){for(var s=this.tryEntries.length-1;s>=0;--s){var g=this.tryEntries[s];if(g.tryLoc<=this.prev&&e.call(g,"finallyLoc")&&this.prev<g.finallyLoc){var l=g;break}}l&&("break"===i||"continue"===i)&&l.tryLoc<=n&&n<=l.finallyLoc&&(l=null);var f=l?l.completion:{};return f.type=i,f.arg=n,l?(this.method="next",this.next=l.finallyLoc,I):this.complete(f)},complete:function(i,n){if("throw"===i.type)throw i.arg;return"break"===i.type||"continue"===i.type?this.next=i.arg:"return"===i.type?(this.rval=this.arg=i.arg,this.method="return",this.next="end"):"normal"===i.type&&n&&(this.next=n),I},finish:function(i){for(var n=this.tryEntries.length-1;n>=0;--n){var s=this.tryEntries[n];if(s.finallyLoc===i)return this.complete(s.completion,s.afterLoc),z(s),I}},catch:function(i){for(var n=this.tryEntries.length-1;n>=0;--n){var s=this.tryEntries[n];if(s.tryLoc===i){var g=s.completion;if("throw"===g.type){var l=g.arg;z(s)}return l}}throw new Error("illegal catch attempt")},delegateYield:function(i,n,s){return this.delegate={iterator:W(i),resultName:n,nextLoc:s},"next"===this.method&&(this.arg=c),I}},a}(_.exports);try{regeneratorRuntime=y}catch{"object"==typeof globalThis?globalThis.regeneratorRuntime=y:Function("r","regeneratorRuntime = r")(y)}},5555:function(_,y,a){var h,e;h=function(){return function m(){var c=arguments.length;if(0===c)throw new Error("resolveUrl requires at least one argument; got none.");var u=document.createElement("base");if(u.href=arguments[0],1===c)return u.href;var v=document.getElementsByTagName("head")[0];v.insertBefore(u,v.firstChild);for(var w,x=document.createElement("a"),b=1;b<c;b++)x.href=arguments[b],u.href=w=x.href;return v.removeChild(u),w}},void 0!==(e=h.call(y,a,y,_))&&(_.exports=e)},7156:_=>{function y(h,e,m,c,u,v,x){try{var w=h[v](x),b=w.value}catch(Z){return void m(Z)}w.done?e(b):Promise.resolve(b).then(c,u)}_.exports=function a(h){return function(){var e=this,m=arguments;return new Promise(function(c,u){var v=h.apply(e,m);function x(b){y(v,c,u,x,w,"next",b)}function w(b){y(v,c,u,x,w,"throw",b)}x(void 0)})}},_.exports.__esModule=!0,_.exports.default=_.exports},3681:_=>{"use strict";_.exports=JSON.parse('{"name":"@ffmpeg/ffmpeg","version":"0.10.1","description":"FFmpeg WebAssembly version","main":"src/index.js","types":"src/index.d.ts","directories":{"example":"examples"},"scripts":{"start":"node scripts/server.js","build":"rimraf dist && webpack --config scripts/webpack.config.prod.js","prepublishOnly":"npm run build","lint":"eslint src","wait":"rimraf dist && wait-on http://localhost:3000/dist/ffmpeg.dev.js","test":"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:ffmpeg test:node:all","test:node":"node --experimental-wasm-threads --experimental-wasm-bulk-memory node_modules/.bin/_mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser":"mocha-headless-chrome -a allow-file-access-from-files -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:ffmpeg":"npm run test:browser -- -f ./tests/ffmpeg.test.html"},"browser":{"./src/node/index.js":"./src/browser/index.js"},"repository":{"type":"git","url":"git+https://github.com/ffmpegwasm/ffmpeg.wasm.git"},"keywords":["ffmpeg","WebAssembly","video"],"author":"Jerome Wu <jeromewus@gmail.com>","license":"MIT","bugs":{"url":"https://github.com/ffmpegwasm/ffmpeg.wasm/issues"},"engines":{"node":">=12.16.1"},"homepage":"https://github.com/ffmpegwasm/ffmpeg.wasm#readme","dependencies":{"is-url":"^1.2.4","node-fetch":"^2.6.1","regenerator-runtime":"^0.13.7","resolve-url":"^0.2.1"},"devDependencies":{"@babel/core":"^7.12.3","@babel/preset-env":"^7.12.1","@ffmpeg/core":"^0.10.0","@types/emscripten":"^1.39.4","babel-loader":"^8.1.0","chai":"^4.2.0","cors":"^2.8.5","eslint":"^7.12.1","eslint-config-airbnb-base":"^14.1.0","eslint-plugin-import":"^2.22.1","express":"^4.17.1","mocha":"^8.2.1","mocha-headless-chrome":"^2.0.3","npm-run-all":"^4.1.5","wait-on":"^5.3.0","webpack":"^5.3.2","webpack-cli":"^4.1.0","webpack-dev-middleware":"^4.0.0"}}')}}]);