(this.webpackJsonpwator=this.webpackJsonpwator||[]).push([[0],{11:function(e,n,t){e.exports=t(17)},16:function(e,n,t){},17:function(e,n,t){"use strict";t.r(n);var i=t(0),a=t.n(i),o=t(8),r=t.n(o),c=t(6),s=t(1),l=t(10),u=t(4),h=t(2),f=t(5),g=t(3),d=function e(){Object(s.a)(this,e),this.type=void 0,this.progressSimulation=void 0},p=function(e){function n(e){var t,i=e.tile;return Object(s.a)(this,n),(t=Object(u.a)(this,Object(h.a)(n).call(this))).tile=void 0,t.die=function(){t.getTile().removeContent(Object(f.a)(t))},t.getTile=function(){return t.tile},t.setTile=function(e){t.tile=e},t.tile=i,t}return Object(g.a)(n,e),n}(d),m=function e(n){var t=this;Object(s.a)(this,e),this.contents=[],this.coordinates=void 0,this.isEmpty=function(){return 0===t.contents.length||t.hasContent("plankton")},this.hasContent=function(e){return void 0!==t.contents.find((function(n){return n.type===e}))},this.getContents=function(){return t.contents},this.progressSimulation=function(){t.contents.forEach((function(e){return e.progressSimulation()}))},this.addContent=function(e){t.contents=[].concat(Object(l.a)(t.contents),[e]),e instanceof p&&e.setTile(t)},this.removeContent=function(e){t.contents=t.contents.filter((function(n){return n!==e}))},this.coordinates=n},v=["NORTH","NORTH_EAST","EAST","SOUTH_EAST","SOUTH","SOUTH_WEST","WEST","NORTH_WEST"],O=function(e){function n(e){var t,i=e.age,a=e.weight,o=e.ageWhenAnimalIsDying,r=e.ageWhenAnimalIsBreeding,c=e.tile;return Object(s.a)(this,n),(t=Object(u.a)(this,Object(h.a)(n).call(this,{tile:c}))).age=void 0,t.ageWhenAnimalIsDying=void 0,t.weight=void 0,t.ageWhenAnimalIsBreeding=void 0,t.moveIntoTile=function(e){t.getTile().removeContent(Object(f.a)(t)),e.addContent(Object(f.a)(t))},t.move=void 0,t.breed=function(){if(t.getAge()===t.ageWhenAnimalIsBreeding){var e=E.getOcean().findNeighboringOceanTiles(t.getTile().coordinates).find((function(e){return e.isEmpty()}));if(e){var n=Math.floor(t.getWeight()/2),i=Math.ceil(t.getWeight()/2),a=t.getTile();t.die(),"fish"===t.type?(a.addContent(new y({tile:a,weight:n})),e.addContent(new y({tile:e,weight:i}))):"shark"===t.type&&(a.addContent(new T({tile:a,weight:n})),e.addContent(new T({tile:e,weight:i})))}}},t.getAge=function(){return t.age},t.getWeight=function(){return t.weight},t.gainWeight=function(){t.weight=t.weight+1},t.progressSimulation=function(){t.age=t.age+1,t.age===t.ageWhenAnimalIsDying?t.die():(t.move(),t.breed(),t.weight=t.weight-1,0===t.weight&&t.die())},t.age=i,t.ageWhenAnimalIsDying=o,t.ageWhenAnimalIsBreeding=r,t.weight=a,t}return Object(g.a)(n,e),n}(p),T=function(e){function n(e){var t,i=e.tile,a=e.weight,o=void 0===a?20:a;return Object(s.a)(this,n),(t=Object(u.a)(this,Object(h.a)(n).call(this,{tile:i,weight:o,age:1,ageWhenAnimalIsDying:20,ageWhenAnimalIsBreeding:15}))).type="shark",t.move=function(){var e=E.getOcean().findNeighboringOceanTiles(t.getTile().coordinates).filter((function(e){return e.hasContent("fish")||e.hasContent("plankton")||e.isEmpty()}));if(void 0!==e.find((function(e){return e.hasContent("fish")}))){var n=e.find((function(e){return e.hasContent("fish")}));n.getContents().find((function(e){return"fish"===e.type})).beEaten(),t.gainWeight(),t.moveIntoTile(n)}else{var i=e.find((function(e){return e.isEmpty()}));void 0!==i&&t.moveIntoTile(i)}},t}return Object(g.a)(n,e),n}(O),y=function(e){function n(e){var t,i=e.tile,a=e.weight,o=void 0===a?15:a;return Object(s.a)(this,n),(t=Object(u.a)(this,Object(h.a)(n).call(this,{age:1,ageWhenAnimalIsDying:15,ageWhenAnimalIsBreeding:12,tile:i,weight:o}))).type="fish",t.calculatePreferredDirection=function(){return v[Math.floor(Math.random()*v.length)]},t.move=function(){var e=E.getOcean().findOceanTileInDirection({fromCoordinates:t.getTile().coordinates,inDirection:t.calculatePreferredDirection()});null!==e&&e.isEmpty()&&(t.moveIntoTile(e),e.hasContent("plankton")&&(e.getContents().find((function(e){return"plankton"===e.type})).beEaten(),t.gainWeight()))},t.beEaten=function(){t.die()},t}return Object(g.a)(n,e),n}(O),b=function(e){function n(e){var t,i=e.tile;return Object(s.a)(this,n),(t=Object(u.a)(this,Object(h.a)(n).call(this,{tile:i}))).type="plankton",t.progressSimulation=function(){},t.beEaten=function(){t.die()},t}return Object(g.a)(n,e),n}(p),w=function(e){function n(){var e,t;Object(s.a)(this,n);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return(t=Object(u.a)(this,(e=Object(h.a)(n)).call.apply(e,[this].concat(a)))).type="rock",t.progressSimulation=function(){},t}return Object(g.a)(n,e),n}(d);var E=function e(n){var t=this;Object(s.a)(this,e),this.oceanTiles=void 0,this.oceanDimensions=void 0,this.populateTile=function(e,n){var t=Math.floor(100*Math.random()),i={lower:0,upper:n.fish},a={lower:n.fish,upper:n.fish+n.sharks},o={lower:n.fish+n.sharks,upper:n.fish+n.sharks+n.plankton},r={lower:n.fish+n.sharks+n.plankton,upper:n.fish+n.sharks+n.plankton+n.rocks};t>i.lower&&t<=i.upper?e.addContent(new y({tile:e})):t>a.lower&&t<=a.upper?e.addContent(new T({tile:e})):t>o.lower&&t<=o.upper?e.addContent(new b({tile:e})):t>r.lower&&t<=r.upper&&e.addContent(new w)},this.getOceanTiles=function(){return t.oceanTiles},this.progressSimulation=function(){var e=[],n=!0,i=!1,a=void 0;try{for(var o,r=t.oceanTiles.flat()[Symbol.iterator]();!(n=(o=r.next()).done);n=!0){var c=o.value,s=!0,l=!1,u=void 0;try{for(var h,f=c.getContents()[Symbol.iterator]();!(s=(h=f.next()).done);s=!0){var g=h.value;"fish"!==g.type&&"shark"!==g.type||e.push(g)}}catch(d){l=!0,u=d}finally{try{s||null==f.return||f.return()}finally{if(l)throw u}}}}catch(d){i=!0,a=d}finally{try{n||null==r.return||r.return()}finally{if(i)throw a}}return e.forEach((function(e){e.progressSimulation()})),t.oceanTiles},this.findOceanTileInDirection=function(e){var n=function(e,n){var t=e.x,i=e.y;switch(n){case"NORTH":return{x:t,y:i-1};case"NORTH_EAST":return{x:t+1,y:i-1};case"EAST":return{x:t+1,y:i};case"SOUTH_EAST":return{x:t+1,y:i+1};case"SOUTH":return{x:t,y:i+1};case"SOUTH_WEST":return{x:t-1,y:i+1};case"WEST":return{x:t-1,y:i};case"NORTH_WEST":return{x:t-1,y:i-1}}}(e.fromCoordinates,e.inDirection),i=n.x,a=n.y;return i<0||a<0?null:i>=t.oceanDimensions.width||a>=t.oceanDimensions.height?null:t.oceanTiles[a][i]},this.findNeighboringOceanTiles=function(e){return v.map((function(n){return t.findOceanTileInDirection({fromCoordinates:e,inDirection:n})})).filter((function(e){return null!==e}))},this.oceanDimensions=n.dimensions,this.oceanTiles=new Array;for(var i=0;i<this.oceanDimensions.height;i++){this.oceanTiles[i]=new Array;for(var a=0;a<this.oceanDimensions.width;a++){var o=new m({x:a,y:i});this.oceanTiles[i][a]=o,this.populateTile(o,n.population)}}};E.oceanInstance=void 0,E.createOcean=function(e){return E.oceanInstance=new E(e),E.oceanInstance},E.getOcean=function(){if(null===E.oceanInstance)throw new Error("You have to call createOcean before you can get an instance of Ocean");return E.oceanInstance};var C=function e(n){var t=this;Object(s.a)(this,e),this.ocean=void 0,this.progressSimulation=function(){return t.ocean.progressSimulation()},this.getOceanTiles=function(){return t.ocean.getOceanTiles()},this.ocean=E.createOcean(n)};C.createSimulation=function(e){return new C(e)};var j=t(9),S=t.n(j),k=(t(16),C.createSimulation({dimensions:{width:25,height:25},population:{fish:20,sharks:5,plankton:40,rocks:10}})),I=function(e){var n,t=e.oceanTile,i=S()("tile",{water:t.isEmpty(),plankton:t.hasContent("plankton"),fish:t.hasContent("fish"),shark:t.hasContent("shark"),rock:t.hasContent("rock")});return t.hasContent("fish")?n=a.a.createElement(a.a.Fragment,null,"\ud83d\udc1f"):t.hasContent("shark")&&(n=a.a.createElement(a.a.Fragment,null,"\ud83e\udd88")),a.a.createElement("div",{className:i},n)},W=function(e,n){return"tile-".concat(e,"-").concat(n.getContents().map((function(e){return e.type})).join("-"))},A=function(){var e=a.a.useState(!1),n=Object(c.a)(e,2),t=n[0],i=n[1],o=a.a.useState(1),r=Object(c.a)(o,2),s=r[0],l=r[1],u=a.a.useState((function(){return k.getOceanTiles()})),h=Object(c.a)(u,2),f=h[0],g=h[1],d=a.a.useCallback((function(){var e=k.progressSimulation();g(e),l((function(e){return e+1}))}),[]);return a.a.useEffect((function(){if(t){var e=setInterval((function(){d()}),350);return function(){clearInterval(e)}}}),[t,d]),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,f.map((function(e,n){return a.a.createElement("div",{key:"row-".concat(n),style:{display:"flex",flexDirection:"row"}},e.map((function(e,n){return a.a.createElement(I,{key:W(n,e),oceanTile:e})})))}))),a.a.createElement("div",null,a.a.createElement("button",{disabled:t,onClick:function(){d()}},"progress by one step"),a.a.createElement("button",{onClick:function(){i((function(e){return!e}))}},t?"stop simulation":"start simulation"),a.a.createElement("span",null,"Year: ",s)))};r.a.render(a.a.createElement(A,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.5e6803e4.chunk.js.map