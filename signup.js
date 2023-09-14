function OnCognitoSignUp() {

	var poolData = {
		UserPoolId: 'ap-southeast-2_6s1cA5M6j', // Your user pool id here
		ClientId: '6qsefi57b62s007roqncr9huvo', // Your client id here
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

	var username = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	userPool.signUp(username, password, null, null, function(
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

