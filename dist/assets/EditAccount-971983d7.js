import{u as v,c as b,r as w,j as t,a as e,o as g,q as N}from"./index-56b56433.js";import{I as c,a as d,A as y}from"./ApiImages-01d4c88b.js";import{a as C}from"./user-1dd283b0.js";import{B as k}from"./ButtonFrom-f44fb8ca.js";const I=()=>{var r;const a=v(o=>o.user.data.response),f=b(),[l,s]=w.useState({name:(a==null?void 0:a.name)||"",zalo:(a==null?void 0:a.zalo)||"",fbUrl:(a==null?void 0:a.fbUrl)||"",avatar:(a==null?void 0:a.avatar)||""}),h=async()=>{(await g(l)).err===0&&f(N)},p=async o=>{const x=o.target.files[0],i=new FormData;i.append("file",x),i.append("upload_preset","rkmrlorn");const n=await y(i);(n==null?void 0:n.status)===200&&s(u=>{var m;return{...u,avatar:(m=n.data)==null?void 0:m.secure_url}})};return t("div",{className:"flex flex-col items-center md:items-start md:px-3 ",children:[e("h3",{className:"text-start w-full",children:"Cập nhật thông tin cá nhân"}),e("div",{className:"border border-black w-full h-full"}),t("div",{className:"w-[60%] md:w-full flex flex-col gap-4",children:[e(c,{value:(r=a==null?void 0:a.id)==null?void 0:r.slice(0,20),label:"Mã thành viên",direction:"flex-row"}),e(c,{value:a==null?void 0:a.phone,label:"Số điện thoại",direction:"flex-row",editPhone:!0}),e(d,{name:"name",setValue:s,value:l.name,flex:"flex flex-row",label:"Tên hiển thị"}),e(d,{name:"zalo",setValue:s,value:l.zalo,flex:"flex flex-row",label:"Zalo"}),e(d,{name:"fbUrl",setValue:s,value:l.fbUrl,flex:"flex flex-row",label:"Facebook"}),t("div",{children:[e("label",{htmlFor:"password",className:"w-48 flex-none",children:"Mật khẩu"}),e("small",{className:"text-blue-600",children:"Đổi mật khẩu"})]}),t("div",{className:"w-full flex gap-4 md:flex-col",children:[e("label",{className:"w-48 flex-none",htmlFor:"avatar",children:"Ảnh đại diện"}),t("div",{children:[e("img",{className:"w-20 h-20 rounded-full object-cover",src:l.avatar||C,alt:"Ảnh đại diện"}),e("input",{type:"file",className:"my-2",id:"avtar",onChange:p})]})]}),e(k,{text:"Cập nhật",bgColor:"bg-primary",textColor:"text-white",onClick:h})]})]})};export{I as default};
