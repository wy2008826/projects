(function(){


	BottomMenuComponent=React.createClass({displayName: "BottomMenuComponent",

		getInitialState:function(){
			return {
				color:"#f33"
			}
		},
		render:function(){
			return (
				React.createElement("div", null, "hello ", this.state.color)
			);
		}
	});

	React.render(React.createElement(BottomMenuComponent, null),document.getElementById("bottomMenu"));
})();