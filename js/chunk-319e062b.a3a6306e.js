(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-319e062b"],{"21e1":function(t,a,o){"use strict";o("da3b")},da3b:function(t,a,o){},ed3a:function(t,a,o){t.exports=o.p+"img/delete.cfdbafe3.png"},fe55:function(t,a,o){"use strict";o.r(a);var e=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-container",{staticClass:"d-flex"},[e("b-container",{staticClass:"position-absolute text-center mt-4"},[e("h1",[e("strong",{staticClass:"color-secondary"},[t._v("Detalhes da Promoção")])])]),t.promotionData.user?t._e():e("b-spinner",{staticClass:"d-flex mt-5",staticStyle:{"margin-left":"46%","margin-top":"25% !important",padding:"4rem"},attrs:{label:"Text Centered"}}),t.promotionData.user?e("div",{staticClass:"d-flex mt-2 w-100"},[e("b-col",{staticStyle:{"margin-top":"10%"},attrs:{cols:"7"}},[e("b-row",{staticStyle:{"margin-bottom":"3rem !important"}},[e("b-col",{staticClass:"text-center"},[e("span",{staticStyle:{"font-size":"0.9rem"}},[t._v(" Print da promoção: ")]),e("div",[t.promotionData.image?e("img",{staticClass:"uploading-image w-100 mt-3",attrs:{src:t.promotionData.image}}):e("img",{staticClass:"uploading-image w-100 mt-3",attrs:{src:o("0aba")}})])])],1),t.isLoadingData?t._e():e("b-row",{staticClass:"ml-1 mr-1 comment"},[e("b-col",[e("span",{staticClass:"ml-4 ",staticStyle:{"font-size":"0.9rem"}},[t._v(" Comentários: ")]),e("div",{staticClass:"d-flex pl-4"},[e("b-form-input",{staticClass:"input-layout w-100 mr-3",staticStyle:{"background-color":"#F5F8FA"},attrs:{type:"text",placeholder:"Comente aqui"},model:{value:t.comment,callback:function(a){t.comment=a},expression:"comment"}}),e("button",{staticClass:"button button-color send-button w-25",on:{click:function(a){return t.sendCommment()}}},[t.isLoading?e("b-spinner",{attrs:{label:"Text Centered"}}):e("span",[t._v(" Enviar ")])],1)],1),t._l(t.promotionData.comments,(function(a){return e("div",{key:a.id,staticClass:"d-flex mt-4 mb-3 ml-1 mr-3 comments"},[e("b-col",{attrs:{cols:"2"}},[e("span",[t._v(t._s(a.name)+":")])]),e("b-col",{attrs:{cols:"8"}},[t._v(" "+t._s(a.comment))]),e("b-col",{staticClass:"current-date text-center",attrs:{cols:"2"}},[t._v(" "+t._s(a.created_date)+" ")]),t.admin?e("img",{staticStyle:{width:"20px",height:"20px","margin-top":"5px"},attrs:{src:o("ed3a"),alt:"delete",title:"Deletar comentário"},on:{click:function(o){return t.deleteComment(a.id)}}}):t._e()],1)}))],2)],1)],1),e("b-col",{staticStyle:{"margin-top":"20%","margin-left":"5%"},attrs:{cols:"6"}},[e("b-container",[e("b-row",[e("b-col",{staticClass:"mt-3",attrs:{cols:"8"}},[e("label",{attrs:{for:"user"}},[t._v("Postado por:")]),e("b-container",{staticClass:"container-class text-left"},[t.promotionData.user?e("span",{staticClass:"ml-2",attrs:{id:"user"}},[t._v(" "+t._s(t.promotionData.user.name)+" ")]):t._e()])],1)],1),e("b-row",[e("b-col",{staticClass:"mt-4 text-justify",attrs:{cols:"8"}},[e("label",{attrs:{for:"product"}},[t._v("Produto:")]),e("b-container",{staticClass:"container-class"},[e("span",{attrs:{id:"product"}},[t._v(" "+t._s(t.promotionData.description)+" ")])])],1)],1),e("b-row",[e("b-col",{staticClass:"mt-3 mr-3",attrs:{cols:"4"}},[e("label",{attrs:{for:"date"}},[t._v("Válidade:")]),e("b-container",{staticClass:"container-class"},[e("span",{attrs:{id:"date"}},[t._v(" "+t._s(t.promotionData.expiration_date))])])],1),e("b-col",{staticClass:"mt-3 ml-2",attrs:{cols:"4"}},[e("label",{attrs:{for:"price"}},[t._v("Valor:")]),e("b-container",{staticClass:"container-class"},[e("span",{attrs:{id:"price"}},[t._v(" "+t._s(t.currencyFormat(t.promotionData.value)))])])],1)],1),e("b-row",{staticClass:"d-flex"},[e("b-button",{staticClass:"button-color button-site w-25 mt-4",attrs:{variant:"none",href:t.promotionData.promotion_link,target:"_blank"}},[t._v(" Ir para o site ")])],1)],1)],1)],1):t._e()],1)},s=[],n=(o("d3b7"),o("a18c")),i=o("fa33"),r=o("2430"),c=o("db04"),l=o("a6f4"),m=o("c1df"),d=o.n(m),u={component:{Datepicker:i["a"],ptBR:r["ptBR"]},data:function(){return{promotionData:{},comment:"",isLoading:!1,isLoadingData:!1,admin:this.$store.admin}},mounted:function(){var t=this;this.$store.isAuthorization||n["a"].push("/"),Object(l["b"])((function(){return t.$store.admin}),(function(){t.admin=t.$store.admin})),this.loadPromotionData()},methods:{currencyFormat:function(t){return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(t)},loadPromotionData:function(){var t=this;c["a"].get("/offer/get_by_id?id=".concat(this.$route.params.id)).then((function(a){t.promotionData=a.data.offer})).catch().finally()},sendCommment:function(){var t=this;this.comment?(this.isLoading=!0,c["a"].post("/comment/create",{comment:this.comment,user_id:this.promotionData.user_id,offer_id:this.$route.params.id,name:this.$store.userInfo.given_name,created_date:d()(this.date).format("L")+" às "+d()(this.date).format("LT")}).then((function(){t.$bvToast.toast("Comentário realizado com sucesso!!",{title:"Sucesso",autoHideDelay:3e3,variant:"success",solid:!0}),t.loadPromotionData()})).catch((function(a){a&&t.$bvToast.toast("Ocorreu um erro ao comentar a promoção, por favor, tente mais tarde!",{title:"Error",autoHideDelay:2e3,variant:"danger",solid:!0})})).finally((function(){return t.isLoading=!1}))):this.$bvToast.toast("Campo de comentário vázio, por favor, digite algo!",{title:"Campo Vázio",autoHideDelay:2e3,variant:"danger",solid:!0})},deleteComment:function(t){var a=this;c["a"].delete("/comment/delete?id=".concat(t)).then((function(){a.$bvToast.toast("Comentário deletado com sucesso!!",{title:"Sucesso",autoHideDelay:3e3,variant:"success",solid:!0}),a.loadPromotionData()})).catch((function(t){t&&a.$bvToast.toast("Ocorreu um erro ao tentar deletar o comentário, por favor, tente mais tarde!",{title:"Error",autoHideDelay:2e3,variant:"danger",solid:!0})}))}}},p=u,b=(o("21e1"),o("2877")),f=Object(b["a"])(p,e,s,!1,null,"ee31a5e0",null);a["default"]=f.exports}}]);
//# sourceMappingURL=chunk-319e062b.a3a6306e.js.map