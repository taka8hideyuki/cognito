function OnCognitoSignUp() {

	var poolData = {
		UserPoolId: 'ap-southeast-2_y9PaY8sso', // Your user pool id here
		ClientId: '40nctkvdpbgqapunrht8ltru6t', // Your client id here
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

	var username = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	userPool.signUp(email, password, null, null, function(
		err,
		result
	) {
		if (err) {
			alert(err.message || JSON.stringify(err));
			return;
		}
		var cognitoUser = result.user;
		console.log('user name is ' + cognitoUser.getUsername());
	});
}

