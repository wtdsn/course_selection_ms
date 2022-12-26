import{f as w,aH as B,aI as I,e as D,E as N}from"./index-7e481cc7.js";import{E as S,a as T}from"./el-form-item-9e57f358.js";import"./el-input-5fe85962.js";import{E as $,a as H}from"./el-select-c2bd30dd.js";import{d as J,D as y,I as V,o as d,W as b,X as E,a as t,w as o,ab as c,ap as g,u as a,J as L,am as x,c as q,ao as M}from"./_plugin-vue_export-helper-1f852bcb.js";const O={class:"add_user_con"},R={class:"header"},W={class:"add_form"},X=J({__name:"admin-add-user",setup(z){function j(){w.info("开发中")}const p=y("student"),v=y(),k=y(),r=V({name:"",number:"",gender:"",majorClass:"",school:"",session:""}),n=V({name:"",number:"",gender:""}),U=V({name:[{required:!0,trigger:"blur"}],number:[{required:!0,trigger:"blur"}],gender:[{required:!0,trigger:"blur"}],majorClass:[{required:!0,trigger:"blur"}],school:[{required:!0,trigger:"blur"}],session:[{required:!0,trigger:"blur"}]}),F=(i,l)=>{l&&l.validate(async m=>{if(m)await A(i)&&l.resetFields();else return!1})};async function A(i){let l;return i==="student"?l=await B(r):l=await I(n),l.code===1?(w.success("增加成功"),!0):!1}return(i,l)=>{const m=$,f=H,_=D,s=N,u=S,C=T;return d(),b("div",O,[E("header",R,[t(f,{modelValue:a(p),"onUpdate:modelValue":l[0]||(l[0]=e=>L(p)?p.value=e:null),placeholder:"请选择添加类型"},{default:o(()=>[(d(),b(c,null,g([{type:"student",lable:"学生"},{type:"teacher",lable:"教师"}],e=>t(m,{key:e.type,label:e.lable,value:e.type},null,8,["label","value"])),64))]),_:1},8,["modelValue"]),t(_,{type:"primary",onClick:j},{default:o(()=>[x("批量添加")]),_:1})]),E("div",W,[a(p)==="student"?(d(),q(C,{key:0,ref_key:"stuFrom",ref:v,model:a(r),"status-icon":"",rules:a(U),"label-width":"120px"},{default:o(()=>[t(u,{label:"姓名",prop:"name"},{default:o(()=>[t(s,{modelValue:a(r).name,"onUpdate:modelValue":l[1]||(l[1]=e=>a(r).name=e),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),t(u,{label:"学号",prop:"number"},{default:o(()=>[t(s,{modelValue:a(r).number,"onUpdate:modelValue":l[2]||(l[2]=e=>a(r).number=e),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),t(u,{label:"性别",prop:"gender"},{default:o(()=>[t(f,{modelValue:a(r).gender,"onUpdate:modelValue":l[3]||(l[3]=e=>a(r).gender=e),placeholder:"请选择性别"},{default:o(()=>[(d(),b(c,null,g([{type:"男",lable:"男"},{type:"女",lable:"女"}],e=>t(m,{key:e.type,label:e.lable,value:e.type},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1}),t(u,{label:"专业班级",prop:"majorClass"},{default:o(()=>[t(s,{modelValue:a(r).majorClass,"onUpdate:modelValue":l[4]||(l[4]=e=>a(r).majorClass=e),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),t(u,{label:"学院",prop:"school"},{default:o(()=>[t(s,{modelValue:a(r).school,"onUpdate:modelValue":l[5]||(l[5]=e=>a(r).school=e),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),t(u,{label:"入学届期",prop:"session"},{default:o(()=>[t(s,{modelValue:a(r).session,"onUpdate:modelValue":l[6]||(l[6]=e=>a(r).session=e),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),t(u,null,{default:o(()=>[t(_,{type:"primary",style:{width:"100px"},onClick:l[7]||(l[7]=e=>F("student",a(v)))},{default:o(()=>[x("提交")]),_:1})]),_:1})]),_:1},8,["model","rules"])):(d(),q(C,{key:1,ref_key:"teaFrom",ref:k,model:a(n),"status-icon":"",rules:a(U),"label-width":"120px"},{default:o(()=>[t(u,{label:"姓名",prop:"name"},{default:o(()=>[t(s,{modelValue:a(n).name,"onUpdate:modelValue":l[8]||(l[8]=e=>a(n).name=e),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),t(u,{label:"工号",prop:"number"},{default:o(()=>[t(s,{modelValue:a(n).number,"onUpdate:modelValue":l[9]||(l[9]=e=>a(n).number=e),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),t(u,{label:"性别",prop:"gender"},{default:o(()=>[t(f,{modelValue:a(n).gender,"onUpdate:modelValue":l[10]||(l[10]=e=>a(n).gender=e),placeholder:"请选择性别"},{default:o(()=>[(d(),b(c,null,g([{type:"男",lable:"男"},{type:"女",lable:"女"}],e=>t(m,{key:e.type,label:e.lable,value:e.type},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1}),t(u,null,{default:o(()=>[t(_,{type:"primary",style:{width:"100px"},onClick:l[11]||(l[11]=e=>F("teacher",a(k)))},{default:o(()=>[x("提交")]),_:1})]),_:1})]),_:1},8,["model","rules"]))])])}}});const Z=M(X,[["__scopeId","data-v-1e0c05be"]]);export{Z as default};
