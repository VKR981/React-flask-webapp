(this.webpackJsonpbookreview=this.webpackJsonpbookreview||[]).push([[0],{156:function(e,t,a){e.exports=a.p+"static/media/loading.b710acbd.gif"},209:function(e,t,a){e.exports=a.p+"static/media/book.4f9cf305.jpg"},239:function(e,t,a){e.exports=a(420)},244:function(e,t,a){},382:function(e,t,a){e.exports=a.p+"static/media/pp.64d6eaa3.png"},415:function(e,t,a){e.exports=a.p+"static/media/pp.64d6eaa3.png"},416:function(e,t,a){e.exports=a.p+"static/media/loading.b710acbd.gif"},419:function(e,t,a){},420:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(33),l=a.n(i),s=(a(244),a(101)),o=a(19),c=a(39),m=a(40),u=a(43),d=a(42),h=a(441),p=a(432),g=a(438),v=a(447),f=a(444),b=a(436),E=a(422),y=a(435),w=a(434),k=a(437),S=a(445),C=a(25),j=a.n(C),x=a(27),O=a(442),I=a(433),R=a(102),F=a.n(R);var P=a(29),D=(a(156),Object(P.b)(),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).handleItemClick=function(e,t){var a=t.name;return n.setState({activeItem:a})},n.state={activeItem:"home",loginstatus:!1,email:"",query:"",username:""},n.logout=n.logout.bind(Object(x.a)(n)),n.handleFormSubmit=n.handleFormSubmit.bind(Object(x.a)(n)),n.handleChange=n.handleChange.bind(Object(x.a)(n)),n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("usertoken");if(e){var t=F()(e);this.setState({email:t.email,username:t.username,loginstatus:!0})}}},{key:"handleFormSubmit",value:function(e,t){var a="/explore/"+this.state.query;console.log(this.state.query),this.props.history.push(a)}},{key:"handleChange",value:function(e,t){this.setState({query:t.value}),console.log(this.state.query)}},{key:"render",value:function(){var e=this;this.state.activeItem;return r.a.createElement("asd",{style:{backgroundcolor:"black"}},r.a.createElement(h.a,{inverted:!0,color:"black"},r.a.createElement(O.a,{inverted:!0,fixed:null,pointing:!0,secondary:!0,size:"small"},r.a.createElement(p.a,null,r.a.createElement(O.a.Item,{as:"a",active:!0,onClick:function(t){e.props.history.push("/home")}},"Home"),r.a.createElement(O.a.Item,{as:"a"},"Recomendations"),r.a.createElement(O.a.Item,{as:"a"},"Latest"),r.a.createElement(O.a.Item,null),r.a.createElement(O.a.Item,{position:"right"},r.a.createElement(y.a,{onSubmit:this.handleFormSubmit},r.a.createElement(I.a,{icon:"search",size:"small",placeholder:"Search...",value:this.state.query,onChange:this.handleChange},r.a.createElement("input",{style:{borderRadius:"17.345px"},icon:"search"}))),this.state.loginstatus&&r.a.createElement(E.a,{as:"a",inverted:!0,style:{marginLeft:"0.5em"}},this.state.username),this.state.loginstatus&&r.a.createElement(E.a,{as:"a",onClick:function(t){localStorage.clear(),e.setState({loginstatus:!1}),e.props.history.push("/login")},inverted:!0,primary:!1,style:{marginLeft:"0.5em"}},"Log out"),!this.state.loginstatus&&r.a.createElement(E.a,{as:"a",onClick:function(t){e.props.history.push("/login")},inverted:!0,style:{marginLeft:"0.5em"}},"Log in"),!this.state.loginstatus&&r.a.createElement(E.a,{as:"a",onClick:function(t){e.props.history.push("/register")},inverted:!0,primary:!1,style:{marginLeft:"0.5em"}},"Sign Up"))))))}},{key:"logout",value:function(){localStorage.removeItem("usertoken"),this.props.history.push("/login")}}]),a}(n.Component)),q=Object(o.e)(D),A=(a(382),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).handleRate=function(e,t){var n=t.rating;t.maxRating;a.setState({rating:n})},a.state={data:[],open:!1,review:"",email:"",token:"",isbn:"",loginstatus:!1},a}return Object(m.a)(n,[{key:"componentWillMount",value:function(){var e=this;j.a.get("/reviews/"+this.props.match.params.isbn).then((function(t){e.setState({data:t.data})}));var t=localStorage.usertoken;if(t){var a=F()(t);this.setState({email:a.email,token:t,isbn:this.props.match.params.isbn,loginstatus:!0})}}},{key:"imgurlgen",value:function(e){return"http://covers.openlibrary.org/b/isbn/"+e+"-L.jpg"}},{key:"handlechange",value:function(e,t){this.setState({review:t.value})}},{key:"handlereviewsubmit",value:function(e,t){var a=this,n=new FormData;n.append("email",this.state.email),n.append("review",this.state.review),n.append("rating",this.state.rating),n.append("token",this.state.token),n.append("isbn",this.state.isbn),j.a.post("/submitreview",n).then((function(e){e.data&&a.state.data.push({userid:a.state.email,review:a.state.review,rating:a.state.rating})}))}},{key:"render",value:function(){var e=this,t=this.props.match.params,n=this.state.open;return r.a.createElement("div",null,r.a.createElement(q,{style:{marginbottom:"2em"}}),r.a.createElement(h.a,{basic:!0}),r.a.createElement(p.a,null,r.a.createElement(h.a,{compact:!0},r.a.createElement(g.a.Group,{divided:!0,inverted:!0},r.a.createElement(g.a,null,r.a.createElement(g.a.Image,{size:"small",src:this.imgurlgen(t.isbn)}),r.a.createElement(g.a.Content,null,r.a.createElement(g.a.Header,{as:"a"},t.title),r.a.createElement(g.a.Meta,null,r.a.createElement("p",null,"Author:",t.author)),r.a.createElement(g.a.Extra,null,r.a.createElement("p",null,"Average rating:",t.avgrating," "),r.a.createElement("p",null,"Total ratings:",t.totalratings),r.a.createElement(v.a,{icon:"star",defaultRating:Math.round(t.avgrating),maxRating:5,disabled:!0})),r.a.createElement(f.a,{open:n,openOnTriggerClick:!0,trigger:r.a.createElement(b.a,{disabled:this.state.loginstatus,trigger:r.a.createElement(E.a,{content:"Write review",labelPosition:"left",icon:"edit",primary:!0,onClick:function(t){e.state.loginstatus&&e.setState({open:!0})}}),content:"You have to sign in first.",basic:!0})},r.a.createElement(h.a,{style:{left:"40%",position:"fixed",top:"30%",zIndex:1e3},size:"massive"},r.a.createElement(y.a,null,r.a.createElement(y.a.Field,{width:"16",control:w.a,onChange:function(t,a){e.setState({open:!0}),e.handlechange(t,a)},label:"press submit when you are done",placeholder:"Less than 300 charaters..."}),r.a.createElement(v.a,{icon:"star",defaultRating:this.state.rating,maxRating:5,onRate:this.handleRate}),r.a.createElement(E.a,{onClick:function(t,a){e.setState({open:!1}),e.handlereviewsubmit(t,a)}},"Submit"))))))))),r.a.createElement(p.a,null,r.a.createElement(k.a.Group,null,r.a.createElement(S.a,{as:"h3",dividing:!0,style:{margin:"1em "}},"Reviews"),this.state.data.map((function(e){return r.a.createElement(k.a,null,r.a.createElement(k.a.Avatar,{src:a(415)}),r.a.createElement(k.a.Content,null,r.a.createElement(k.a.Author,{as:"a"},e.userid),r.a.createElement(k.a.Metadata,null,r.a.createElement("div",null,e.time)),r.a.createElement(k.a.Text,null,e.review),r.a.createElement(k.a.Actions,null,r.a.createElement(v.a,{icon:"star",defaultRating:e.rating,maxRating:5,disabled:!0}))))})))),r.a.createElement(h.a,{basic:!0}))}}]),n}(n.Component)),L=a(443),T=a(231),z=a(448),M=a(439),H=a(53),W=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={page:0,data2:[],email:"",open:!1,active:!0,search:!1},a.PageChange=a.PageChange.bind(Object(x.a)(a)),a}return Object(m.a)(n,[{key:"componentWillMount",value:function(){var e=this;this.props.match.params.query?(this.setState({active:!0,search:!0}),j.a.get("/search/"+this.props.match.params.query+"/"+this.state.page).then((function(t){e.setState({data2:t.data}),e.setState({active:!1})}))):(this.setState({active:!0}),j.a.get("/books/"+this.state.page).then((function(t){e.setState({data2:t.data}),e.setState({active:!1})})))}},{key:"componentWillReceiveProps",value:function(e){var t=this;this.props.match.params.query?(this.setState({active:!0,search:!0,page:0}),j.a.get("/search/"+e.match.params.query+"/"+this.state.page).then((function(e){t.setState({data2:e.data}),t.setState({active:!1})}))):(this.setState({active:!0}),j.a.get("/books/"+this.state.page).then((function(e){t.setState({data2:e.data}),t.setState({active:!1})})))}},{key:"PageChange",value:function(e,t){var a=this;this.state.search?(this.setState({active:!0}),this.setState({data2:[],page:t.activePage-1}),j.a.get("/search/"+this.props.match.params.query+"/"+(t.activePage-1)).then((function(e){a.setState({data2:e.data}),a.setState({active:!1})}))):(this.setState({active:!0}),this.setState({page:t.activePage-1}),this.setState({data2:[]}),j.a.get("/books/"+(t.activePage-1)).then((function(e){a.setState({data2:e.data}),a.setState({active:!1})})))}},{key:"genurl",value:function(e){return"http://covers.openlibrary.org/b/isbn/"+e+"-L.jpg"}},{key:"genbookurl",value:function(e,t,a,n,r,i){return"/reviews/"+e+"/"+t+"/"+a+"/"+n+"/"+r+"/"+i}},{key:"render",value:function(){var e=this,t=this.state.active;return r.a.createElement("div",null,r.a.createElement(L.a,{active:t,page:!0},r.a.createElement(T.a,{src:a(416)}),r.a.createElement("p",null,"Fetching data")),r.a.createElement(q,{style:{marginbottom:"2em"}}),r.a.createElement("style",null,"\n       body {\n        \n  \n      }\n      \n    }\n    "),r.a.createElement(h.a,{basic:!0}),r.a.createElement(p.a,null,r.a.createElement("div",{style:{padding:"0em 0em",textAlign:"center"}},r.a.createElement("div",{style:{textAlign:"center",padding:"4rem"}},r.a.createElement(z.a,{defaultActivePage:1,activePage:this.state.page+1,totalPages:10,onPageChange:this.PageChange})),r.a.createElement(M.a.Group,{stackable:!0,doubling:!0},this.state.data2.map((function(t){return r.a.createElement(M.a,{href:e.genbookurl(t.isbn,t.title,t.author,t.average_rating.toFixed(2),t.ratings_count,t.reviews),style:{width:"250px"}},r.a.createElement(T.a,{src:e.genurl(t.isbn),size:"massive",wrapped:!0,style:{width:"250px"}}),r.a.createElement(M.a.Content,null,r.a.createElement(M.a.Header,null,t.title),r.a.createElement(M.a.Meta,null,r.a.createElement("span",{className:"date"},"Author:",t.author)),r.a.createElement(M.a.Content,null,r.a.createElement(v.a,{icon:"star",defaultRating:Math.round(t.average_rating,2),maxRating:5,disabled:!0})),r.a.createElement(M.a.Description,null,t.average_rating.toFixed(2)," Avg rating, ",t.ratings_count," total ratings.")),r.a.createElement(M.a.Content,null,r.a.createElement("a",null,r.a.createElement(H.a,{name:"pencil alternate"}),t.reviews," Reviews")))})))),r.a.createElement("div",{style:{textAlign:"center",padding:"4rem"}},r.a.createElement(z.a,{defaultActivePage:1,activePage:this.state.page+1,totalPages:10,onPageChange:this.PageChange}))))}}]),n}(n.Component),X=a(108);j.a.defaults.xsrfCookieName="csrftoken",j.a.defaults.xsrfHeaderName="X-CSRFToken";var _=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={username:"",email:"",pwd:"",cpwd:"",error:""},a.handleSubmit=a.handleSubmit.bind(Object(x.a)(a)),a.handleChange=a.handleChange.bind(Object(x.a)(a)),a}return Object(m.a)(n,[{key:"handleChange",value:function(e){this.setState(Object(X.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){console.log(e.target);var t=this.state,a=t.username,n=t.email,r=t.pwd,i=t.cpwd,l=new FormData;l.append("username",a),l.append("email",n),l.append("password",r),l.append("cpassword",i),l.append("X-CSRFToken","ghjgjhg");var s=new FormData;s.append("X-CSRFToken","ghjgjhg"),""===a||""===n||""===r||""===i?alert("please fill all the fields"):r!==i?alert("passwords do not match"):r.length<8?alert("passwords should be atleast 8 characters"):j.a.post("/register",l,s).then((function(e){alert(e.data)}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("style",null,"\n       body {\n        background-image: url(".concat(a(209),"); !important;\n  background-size: 100% 120%; !important;\n      }\n      \n    }\n    ")),r.a.createElement(h.a,{basic:!0,style:{margin:"6em"}}),r.a.createElement("div",{id:"loginform",class:"wrapper fadeInDown my-auto"},r.a.createElement("div",null,r.a.createElement("div",{id:"formContent"},r.a.createElement("div",{class:"fadeIn first"}),r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.handleSubmit(t)}},r.a.createElement("input",{type:"username",value:this.state.username,onChange:this.handleChange,id:"login",class:"fadeIn second",name:"username",placeholder:"User name"}),r.a.createElement("input",{type:"email",value:this.state.email,onChange:this.handleChange,id:"login",class:"fadeIn second mt-4",name:"email",placeholder:"Email"}),r.a.createElement("input",{type:"password",value:this.state.pwd,onChange:this.handleChange,id:"password",class:"fadeIn third",name:"pwd",placeholder:"password"}),r.a.createElement("input",{type:"password",value:this.state.cpwd,onChange:this.handleChange,id:"password",class:"fadeIn third",name:"cpwd",placeholder:" confirm password"}),r.a.createElement("input",{type:"submit",onSubmit:function(t){t.preventDefault(),e.handleSubmit(t)},class:"fadeIn fourth",value:"Register"})),r.a.createElement("div",{id:"formFooter"},r.a.createElement("a",{class:"underlineHover",href:"/login"},"Login"))))))}},{key:"switchform",value:function(){l.a.render(r.a.createElement(B,null),document.getElementById("root"))}}]),n}(n.Component),B=(a(419),function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).state={email:"",pwd:"",error:""},a.handleSubmit=a.handleSubmit.bind(Object(x.a)(a)),a.handleChange=a.handleChange.bind(Object(x.a)(a)),a}return Object(m.a)(n,[{key:"handleChange",value:function(e){this.setState(Object(X.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){var t=this;console.log(e.target);var a=this.state,n=a.email,r=a.pwd,i=new FormData;i.append("email",n),i.append("password",r),i.append("X-CSRFToken","ghjgjhg");var l=new FormData;l.append("X-CSRFToken","ghjgjhg"),console.log("formdata",i.keys()),""===n||""===r?alert("please fill all the fields"):r.length<2?alert("passwords should be atleast 8 characters"):j.a.post("/login",i,l).then((function(e){e.data.token?(localStorage.setItem("usertoken",e.data.token),console.log(e.data.token),t.props.history.push("/home")):alert("invalid credentials")}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("style",null,"\n       body {\n        background-image: url(".concat(a(209),"); !important;\n  background-size: 100% 120%; !important;\n      }\n      \n    }\n    ")),r.a.createElement(h.a,{basic:!0,style:{margin:"6em"}}),r.a.createElement("div",{id:"loginform",class:"wrapper fadeInDown my-auto",style:{marginTop:"4em"}},r.a.createElement("div",null,r.a.createElement("div",{id:"formContent"},r.a.createElement("div",{class:"fadeIn first"}),r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.handleSubmit(t)}},r.a.createElement("input",{type:"email",value:this.state.email,onChange:this.handleChange,id:"login",class:"fadeIn second",name:"email",placeholder:"Email"}),r.a.createElement("input",{type:"password",value:this.state.pwd,onChange:this.handleChange,id:"password",class:"fadeIn third",name:"pwd",placeholder:"password"}),r.a.createElement("input",{type:"submit",onSubmit:function(t){t.preventDefault(),e.handleSubmit(t)},class:"fadeIn fourth",value:"Log In"})),r.a.createElement("div",{id:"formFooter"},r.a.createElement("a",{class:"underlineHover",href:"#"},"Forgot Password?"),r.a.createElement("a",{class:"underlineHover",href:"/register"},"Sign up"))))))}},{key:"switchform",value:function(){l.a.render(r.a.createElement(_,null),document.getElementById("root"))}}]),n}(n.Component));var G=function(e){return r.a.createElement("div",null,r.a.createElement(s.a,null,r.a.createElement(o.a,{exact:!0,path:"/reviews/:isbn/:title/:author/:avgrating/:totalratings/:reviews",component:A}),r.a.createElement(o.a,{exact:!0,path:"/explore/:query",component:W}),r.a.createElement(o.a,{exact:!0,path:"/home",component:W}),r.a.createElement(o.a,{exact:!0,path:"/",component:W}),r.a.createElement(o.a,{exact:!0,path:"/login",component:B}),r.a.createElement(o.a,{exact:!0,path:"/register",component:_})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var N=document.createElement("link");N.rel="stylesheet",N.href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css",document.head.appendChild(N),l.a.render(r.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[239,1,2]]]);
//# sourceMappingURL=main.ef466994.chunk.js.map