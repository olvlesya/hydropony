(this.webpackJsonphydropony=this.webpackJsonphydropony||[]).push([[0],{201:function(e,t,a){e.exports={controlPanel:"ControlPanel_controlPanel__3iqIv"}},213:function(e,t,a){},349:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(29),c=a.n(i),s=a(18),o=(a(213),a(116),a(2)),l=a(28),u=a(81),b=a(47),d=a(48),h=a(358),f=a(355),j=a(189),O=a(190),p=a(114),v=a(204),y=a(184),x=a(9),m=["#364f6b","#fc5185","#91091e","#007965"],g=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if(e.length<t)return e;var a=Math.floor(e.length/t);return e.filter((function(e,t){return t%a===0}))},A=function(e){Object(b.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={visibleData:g(e.props.data),refAreaLeft:"",refAreaRight:"",top:"dataMax"},e.getAxisYDomain=function(t){var a=e.props.lineKeys,n=-1/0;return t.forEach((function(e){a.forEach((function(t){var a=Number(e[t]);a>n&&(n=a)}))})),n+20|0},e.zoom=function(){var t=e.state,a=t.refAreaLeft,n=t.refAreaRight,r=e.props,i=r.xAxisKey,c=r.data;if(a!==n&&""!==n){if(a>n){var s=[n,a];a=s[0],n=s[1]}var o=c.findIndex((function(e){return e[i]===a}))-1,l=c.findIndex((function(e){return e[i]===n})),u=c.slice(o,l),b=e.getAxisYDomain(u);e.setState((function(){return{visibleData:g(u),refAreaLeft:"",refAreaRight:"",top:b}}))}else e.setState((function(){return{refAreaLeft:"",refAreaRight:""}}))},e}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(e){if(this.props.data===e.data&&this.props.dateLimit===e.dateLimit||this.setState(this.calculateVisibleDataAndLimits()),this.props.lineKeys!==e.lineKeys){var t=this.getAxisYDomain(this.state.visibleData);this.setState({top:t})}}},{key:"calculateVisibleDataAndLimits",value:function(){var e=this.props,t=e.dateLimit,a=e.precision,n=this.props.data;if(t){var r=new Date(this.props.data[this.props.data.length-1].date);"month"===a&&r.setMonth(r.getMonth()-t),"hour"===a&&r.setHours(r.getHours()-t),n=this.props.data.filter((function(e){return new Date(e.date)>r}))}var i=g(n);return{visibleData:i,top:this.getAxisYDomain(i),refAreaLeft:"",refAreaRight:""}}},{key:"render",value:function(){var e=this,t=this.state,a=t.refAreaLeft,n=t.refAreaRight,r=t.top,i=t.visibleData,c=this.props,s=c.xAxisKey,o=c.lineKeys;return i.length>0&&o.length>0&&Object(x.jsxs)(h.a,{width:800,height:400,data:i,onMouseDown:function(t){return e.setState({refAreaLeft:t.activeLabel})},onMouseMove:function(t){return e.state.refAreaLeft&&e.setState({refAreaRight:t.activeLabel})},onMouseUp:this.zoom,children:[Object(x.jsx)(f.a,{fill:"#f5f5f5",strokeDasharray:"3 3"}),Object(x.jsx)(j.a,{allowDataOverflow:!0,dataKey:s,type:"category"}),Object(x.jsx)(O.a,{allowDataOverflow:!0,domain:[0,r],type:"number",yAxisId:"1"}),Object(x.jsx)(p.a,{}),o.map((function(e,t){return Object(x.jsx)(v.a,{yAxisId:"1",type:"natural",dataKey:e,stroke:m[t],animationDuration:300},e)})),a&&n?Object(x.jsx)(y.a,{yAxisId:"1",x1:a,x2:n,strokeOpacity:.3}):null]})}}]),a}(r.a.Component),D=a(63),w=a(16),L=a(356),I=function(e,t,a,n,r,i){var c=Object(o.a)(r,2),s=c[0],l=c[1],u=Object(o.a)(i,2),b=u[0],d=u[1];return function(r){return n(!0),fetch("https://www.alphavantage.co/query?function=".concat(e,"&symbol=").concat(r,"&apikey=").concat("0WGUMXH2681X2FPO")).then((function(e){return e.json()})).then((function(e){var n=e[t];if(n){var i,c=Object(w.a)({},b);Object.keys(n).forEach((function(e){var t=Number(n[e]["4. close"]);c[e]=Object(w.a)(Object(w.a)({},c[e]||{}),{},Object(D.a)({},r,t))})),d(c),l(s.concat(r)),a((i=c,Object.keys(i).map((function(e){return Object(w.a)({date:e},i[e])})).sort((function(e,t){return new Date(e.date).getTime()-new Date(t.date).getTime()}))))}else L.a.error({message:"Cannot fetch data for ".concat(r)})})).then((function(){n(!1)}))}},k=function(e,t,a,r,i){var c=Object(n.useState)([]),l=Object(o.a)(c,2),u=l[0],b=l[1],d=Object(n.useState)(!1),h=Object(o.a)(d,2),f=h[0],j=h[1],O=Object(s.c)(r),p=Object(o.a)(O,2),v=p[0],y=p[1],x=Object(s.c)(i),m=Object(o.a)(x,2),g=m[0],A=m[1],D=I(e,t,b,j,[g,A],[v,y]);return Object(n.useEffect)((function(){var e=a.find((function(e){return!g.includes(e)}));e&&D(e)}),[a]),Object(n.useEffect)((function(){var e=setInterval((function(){a.forEach(D)}),9e5);return function(){clearInterval(e)}}),[a]),[u,f]},C=Object(s.b)({key:"dailyChart/activeEntities",default:[]}),S=Object(s.b)({key:"dailyChart/cachedEntities",default:[]}),E=Object(s.b)({key:"dailyChart/dateRange",default:1}),R=Object(s.b)({key:"dailyChart/normalizedData",default:{}}),M=a(361),K=a(360),T=a(201),B=a.n(T),z=function(e,t){var a,n=(a=e,function(e){var t=e.disabled,n=e.options,r=Object(s.c)(a),i=Object(o.a)(r,2),c=i[0],l=i[1];return Object(x.jsx)(M.a.Group,{options:n,disabled:t,value:c,onChange:function(e){l(e)}})}),r=function(e){return function(t){var a=t.disabled,n=t.options,r=Object(s.c)(e),i=Object(o.a)(r,2),c=i[0],l=i[1];return Object(x.jsx)(K.a.Group,{disabled:a,buttonStyle:"solid",onChange:function(e){l(e.target.value)},value:c,children:n.map((function(e){var t=e.value,a=e.label;return Object(x.jsx)(K.a.Button,{value:t,children:a},t)}))})}}(t);return function(e){var t=e.disabled,a=e.showDateRange,i=e.entities,c=e.dateOptions;return Object(x.jsxs)("section",{className:B.a.controlPanel,children:[Object(x.jsx)(n,{options:i,disabled:t}),a&&Object(x.jsx)(r,{options:c,disabled:t})]})}},F=z(C,E),P=["IBM","TSCO.LON","TESO","BABA"],_=[{value:1,label:"Last month"},{value:12,label:"Last year"},{value:36,label:"3 years"},{value:0,label:"All data"}],Y=function(){var e=Object(s.d)(C),t=Object(s.d)(E),a=k("TIME_SERIES_DAILY&outputsize=full","Time Series (Daily)",e,R,S),n=Object(o.a)(a,2),r=n[0],i=n[1];return Object(x.jsxs)("section",{children:[Object(x.jsx)("h2",{children:"Daily Chart"}),Object(x.jsx)(F,{dateOptions:_,entities:P,disabled:i,showDateRange:r.length>0}),Object(x.jsxs)("p",{children:["For better performance the chart always shows"," ",Object(x.jsx)("b",{children:"not more than 100 values"})," per line at once. Real data size is"," ",Object(x.jsxs)("b",{children:["~",r.length]})," points (possibly per entity)."]}),Object(x.jsxs)("p",{children:["It also ",Object(x.jsx)("b",{children:"caches"})," already fetched data and refetches it once per 15 minutes."]}),Object(x.jsx)(A,{precision:"month",data:r,dateLimit:t,xAxisKey:"date",lineKeys:e})]})},N=Object(s.b)({key:"intradayChart/activeEntities",default:[]}),G=Object(s.b)({key:"intradayChart/cachedEntities",default:[]}),H=Object(s.b)({key:"intradayChart/dateRange",default:1}),U=Object(s.b)({key:"intradayChart/normalizedData",default:{}}),q=z(N,H),J=["IBM","BABA"],V=[{value:1,label:"1 hour"},{value:3,label:"3 hours"},{value:6,label:"6 hours"},{value:0,label:"All data"}],X=function(){var e=Object(s.d)(N),t=Object(s.d)(H),a=k("TIME_SERIES_INTRADAY&interval=5min","Time Series (5min)",e,U,G),n=Object(o.a)(a,2),r=n[0],i=n[1];return Object(x.jsxs)("section",{children:[Object(x.jsx)("h2",{children:"Intraday Chart"}),Object(x.jsx)(q,{dateOptions:V,entities:J,disabled:i,showDateRange:r.length>0}),Object(x.jsxs)("p",{children:["For better performance the chart always shows"," ",Object(x.jsx)("b",{children:"not more than 100 values"})," per line at once. Real data size is"," ",Object(x.jsxs)("b",{children:["~",r.length]})," points (possibly per entity)."]}),Object(x.jsxs)("p",{children:["It also ",Object(x.jsx)("b",{children:"caches"})," already fetched data and refetches it once per 15 minutes."]}),Object(x.jsx)(A,{precision:"hour",data:r,dateLimit:t,xAxisKey:"date",lineKeys:e})]})};var W=function(){return Object(x.jsxs)("section",{children:[Object(x.jsx)(Y,{}),Object(x.jsx)("hr",{}),Object(x.jsx)(X,{})]})},Q=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,362)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;a(e),n(e),r(e),i(e),c(e)}))};c.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(s.a,{children:Object(x.jsx)(W,{})})}),document.getElementById("root")),Q()}},[[349,1,2]]]);
//# sourceMappingURL=main.a2b3128e.chunk.js.map