(function(){


	BottomMenuComponent=React.createClass({

		getInitialState:function(){
			return {
				color:"#f33"
			}
		},
		render:function(){
			return (
				<div>hello {this.state.color}</div>
			);
		}
	});

	React.render(<BottomMenuComponent />,document.getElementById("bottomMenu"));
})();